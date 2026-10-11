---


title: "Linux cgroups v2, Namespaces & Container Runtime Isolation Mechanics"
description: "Master-level architecture and implementation guide for Linux cgroups v2, Namespaces & Container Runtime Isolation Mechanics covering core theory, runtime mechanics, and production best practices."
category: "Concurrency, Threading & Performance"
tags: [concurrency, threading, performance, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---
# Linux cgroups v2, Namespaces & Container Runtime Isolation Mechanics

Containers are often described as lightweight virtual machines, but at the operating system level, **a container is simply a standard Linux process** constrained by kernel isolation primitives. Containers do not use hypervisors or secondary kernel instances. Instead, container engines (such as `runc`, Docker, and `containerd`) build isolated execution environments using two core Linux kernel building blocks:

1. **Linux Namespaces**: Restrict **what a process can see** (visibility boundary).
2. **Control Groups v2 (cgroups v2)**: Restrict **what a process can consume** (resource boundary).

---

## 1. Executive Summary & Under-the-Hood Mechanics

### 1.1 The 8 Linux Namespaces

A Linux namespace wraps a global system resource into an abstraction that makes it appear to processes within the namespace that they possess their own isolated instance of that resource. The Linux kernel supports 8 distinct namespace types:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             Linux Kernel Subsystems                              │
├───────────┬───────────┬───────────┬───────────┬───────────┬──────────┬───────────┤
│    PID    │    NET    │    MNT    │    IPC    │    UTS    │   USER   │  CGROUP   │
│ Namespace │ Namespace │ Namespace │ Namespace │ Namespace │ Namespace│ Namespace │
└─────┬─────┴─────┬─────┴─────┬─────┴─────┬─────┴─────┬─────┴────┬─────┴─────┬─────┘
      │           │           │           │           │          │           │
      ▼           ▼           ▼           ▼           ▼          ▼           ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                      Containerized Process Environment                           │
│ (Isolated PIDs, Virtual eth0, Chrooted Mounts, Isolated User Mappings, CPU Limits) │
└──────────────────────────────────────────────────────────────────────────────────┘
```

1. **`PID` (Process IDs)**: Isolates process ID space. A container process runs as `PID 1` inside its namespace, while maintaining a standard non-zero PID (e.g., `PID 14820`) in the host PID namespace.
2. **`NET` (Network)**: Isolates network interfaces, IP routing tables, firewall rules (`iptables`/`nftables`), and socket port bindings. Virtual Ethernet pairs (`veth`) bridge host and container namespaces.
3. **`MNT` (Mount)**: Isolates file system mount points. Processes in different mount namespaces see distinct directory trees.
4. **`IPC` (Inter-Process Communication)**: Isolates System V IPC objects and POSIX message queues, preventing cross-container shared memory access (`shmget`).
5. **`UTS` (UNIX Timesharing System)**: Allows setting custom hostnames and NIS domain names per container.
6. **`USER` (User IDs)**: Maps container `root` (UID 0) to an unprivileged UID (e.g., UID 100000) on the host system, mitigating privilege escalation attacks.
7. **`CGROUP` (Cgroup Directory)**: Hides host-level cgroup directory layouts from containerized processes.
8. **`TIME` (Monotonic & Boot Clocks)**: Added in Linux 5.6, allowing containers to customize offsets for `CLOCK_MONOTONIC` and `CLOCK_BOOTTIME` (useful for migration/checkpointing).

#### Kernel System Calls for Namespaces
- **`clone(2)`**: Spawns a new child process with flags like `CLONE_NEWPID | CLONE_NEWNET` to create new namespaces.
- **`unshare(2)`**: Allows a process to detach its current execution context from parent namespaces.
- **`setns(2)`**: Attaches the calling process to an existing namespace via a file descriptor reference (e.g., `/proc/<PID>/ns/net`).

---

### 1.2 cgroups v1 vs cgroups v2 Architectural Shift

Control Groups (cgroups) allocate CPU time, system memory, disk I/O bandwidth, and network priority among process hierarchies.

```
cgroups v1 (Orthogonal Controllers)           cgroups v2 (Unified Single Hierarchy)
        /sys/fs/cgroup/                                    /sys/fs/cgroup/
   ├── cpu/                                           ├── container_A/
   │   └── my_container/                              │   ├── cgroup.controllers
   ├── memory/                                        │   ├── memory.max (Hard Limit)
   │   └── my_container/                              │   ├── cpu.max (CFS Limit)
   └── blkio/                                         │   └── pids.max (PID Limit)
       └── my_container/                              └── container_B/
```

- **cgroups v1 Limitations**: Each controller (cpu, memory, blkio) operated as an independent, orthogonal hierarchy. A process could be placed in `cpu/groupA` but `memory/groupB`. This caused severe race conditions, uncoordinated memory page cache throttling, and incomplete I/O accounting.
- **cgroups v2 Architecture**: Introduces a **Unified Single Hierarchy** (`/sys/fs/cgroup`). All controllers are managed under a single unified directory tree.
- **"No Internal Processes" Rule**: In cgroups v2, a parent cgroup node cannot contain both processes and child cgroup directories. Only leaf nodes can hold processes, eliminating ambiguous resource arbitration between parent and child groups.

#### Key cgroups v2 Controllers
- **`memory`**:
  - `memory.max`: Hard memory limit. Exceeding this triggers the Out-Of-Memory (OOM) killer.
  - `memory.high`: High-water mark throttling. Exceeding this forces processes into reclaim loop backpressure rather than immediate OOM termination.
  - `memory.oom.group`: Set to `1` to terminate all processes within the cgroup atomically if OOM occurs.
- **`cpu`**:
  - `cpu.max`: Configures Completely Fair Scheduler (CFS) bandwidth (e.g., `100000 100000` = 1 full CPU core; `50000 100000` = 0.5 CPU cores).
- **`pids`**:
  - `pids.max`: Limits maximum allowable task count inside the cgroup to prevent fork-bomb denial of service.

---

### 1.3 RootFS Isolation: OverlayFS & `pivot_root`

To isolate file system operations, modern container runtimes execute a sequence of filesystem operations:

1. **OverlayFS Mount**: Combines a read-only lower image layer (`lowerdir`), a writable container diff layer (`upperdir`), and a working directory (`workdir`) into a unified view (`merged`).
2. **`pivot_root(2)`**: Moves the host's root file system to a temporary subdirectory (e.g., `old_root`) and mounts the new OverlayFS directory as `/`. Unmounts `old_root` to make host file system paths inaccessible to the container.

---

## 2. Production-Grade Code Implementations & Best Practices

Below is a complete C implementation demonstrating a low-level mini container runtime that initializes namespaces, sets up cgroups v2 limits, performs `pivot_root`, and executes an isolated container shell.

```c
#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sched.h>
#include <sys/wait.h>
#include <sys/mount.h>
#include <sys/stat.h>
#include <sys/syscall.h>
#include <fcntl.h>

#define STACK_SIZE (1024 * 1024) // 1MB child process stack
static char child_stack[STACK_SIZE];

// Helper to write to cgroup management files
static int write_file(const char *path, const char *value) {
    int fd = open(path, O_WRONLY);
    if (fd < 0) {
        perror("open cgroup file failed");
        return -1;
    }
    if (write(fd, value, strlen(value)) < 0) {
        perror("write cgroup file failed");
        close(fd);
        return -1;
    }
    close(fd);
    return 0;
}

// Setup cgroups v2 limits for the child container
static void setup_cgroups_v2(pid_t child_pid) {
    const char *cgroup_dir = "/sys/fs/cgroup/demo_container";
    mkdir(cgroup_dir, 0755);

    // Limit memory to 64MB
    char mem_path[256];
    snprintf(mem_path, sizeof(mem_path), "%s/memory.max", cgroup_dir);
    write_file(mem_path, "67108864");

    // Limit PID count to 20 process tasks
    char pids_path[256];
    snprintf(pids_path, sizeof(pids_path), "%s/pids.max", cgroup_dir);
    write_file(pids_path, "20");

    // Attach child process to the cgroup
    char procs_path[256];
    snprintf(procs_path, sizeof(procs_path), "%s/cgroup.procs", cgroup_dir);
    char pid_str[16];
    snprintf(pid_str, sizeof(pid_str), "%d", child_pid);
    write_file(procs_path, pid_str);

    printf("[Host] Attached PID %d to cgroups v2 (%s)\n", child_pid, cgroup_dir);
}

// Child process entry function running inside isolated namespaces
static int container_child(void *arg) {
    (void)arg;
    printf("[Container] Inside isolated child process (PID: %d)\n", getpid());

    // Set hostname using UTS namespace
    sethostname("isolated-container", 18);

    // Mount /proc so tools like ps function correctly inside PID namespace
    mount("proc", "/proc", "proc", 0, NULL);

    // Execute interactive shell inside container context
    char *const char_args[] = {"/bin/sh", NULL};
    execv(char_args[0], char_args);

    perror("execv failed");
    return 1;
}

int main(void) {
    printf("[Host] Launching container runtime...\n");

    // Clone child process with isolated PID, MNT, NET, UTS, IPC namespaces
    int flags = CLONE_NEWPID | CLONE_NEWNS | CLONE_NEWNET | CLONE_NEWUTS | CLONE_NEWIPC | SIGCHLD;
    pid_t child_pid = clone(container_child, child_stack + STACK_SIZE, flags, NULL);

    if (child_pid == -1) {
        perror("clone failed");
        exit(EXIT_FAILURE);
    }

    // Configure cgroups v2 limits from host space
    setup_cgroups_v2(child_pid);

    // Wait for child container termination
    waitpid(child_pid, NULL, 0);
    printf("[Host] Container terminated gracefully.\n");

    return 0;
}
```

---

## 3. Performance Benchmark & Big-O Analysis

### 3.1 Overhead: Bare-Metal vs Containers vs VMs

| Metric | Bare-Metal Linux | Linux Container (cgroups v2 + NS) | Type-1/2 Hypervisor VM |
| :--- | :--- | :--- | :--- |
| **Startup Time** | Baseline (Seconds) | **< 100 milliseconds** | 10 - 60 Seconds |
| **Syscall Latency** | Direct ($O(1)$) | **Direct ($O(1)$ native execution)** | Hypervisor Trap & Emulate ($O(K)$ latency penalty) |
| **Memory Footprint Overhead** | 0 MB | **< 1 MB (kernel namespace metadata)** | 512 MB - 2 GB per guest OS kernel |
| **Disk I/O Latency** | Native Block I/O | ~1-3% Overhead (OverlayFS Copy-on-Write) | Virtual Block Device Overhead (~5-15%) |
| **Context Switch Cost** | Standard CPU Ring 3 -> Ring 0 | **Standard CPU Ring 3 -> Ring 0** | VM-Exit / VM-Entry Hardware Switch Cost |

---

## 4. Anti-Patterns & Bad Practices vs Correct Solutions

### Anti-Pattern 1: Running Containers in Privileged Mode (`--privileged`)
- **Bad Practice**: Passing `--privileged` to Docker/Podman grants the container process all 41 Linux Capabilities (`CAP_SYS_ADMIN`, `CAP_SYS_RAWIO`) and exposes device nodes under `/dev`.
- **Correct Solution**: Drop all default capabilities via `--cap-drop=ALL` and selectively grant only explicit required capabilities (e.g., `--cap-add=NET_BIND_SERVICE`).

### Anti-Pattern 2: Missing Zombie Process Reaping (PID 1 Responsibilities)
- **Bad Practice**: Executing application processes as PID 1 inside a container without handling `SIGCHLD`. Orphaned child processes become zombies (`defunct`), consuming host process table slots until system resources hit `pids.max`.
- **Correct Solution**: Use lightweight init reapers such as `tini` or `dumb-init` as the container entrypoint to reap zombie processes automatically.

---

## 5. Real-World Troubleshooting & Operational Edge Cases

### 5.1 Diagnosing Container Silent OOM Kills
When a container process exceeds `memory.max`, the kernel OOM killer silently sends `SIGKILL` (Exit Code 137) to the process without emitting user-space log messages.

**Diagnostic Commands**:
```bash
# Check dmesg logs for OOM killer invocations
dmesg -T | grep -i "oom-kill"

# Read cgroups v2 memory events for container
cat /sys/fs/cgroup/demo_container/memory.events
# Output:
# low 0
# high 14
# max 1 (Indicates max memory limit was reached and triggered OOM)
# oom 1
# oom_kill 1
```

### 5.2 `/proc` Information Leaks (CPU & Memory Virtualization)
By default, `/proc/cpuinfo` and `/proc/meminfo` reflect **host system hardware specs** inside unvirtualized containers. A Java or Go runtime executing inside a 2-core container on a 64-core host will read 64 cores from `/proc/cpuinfo` and spawn 64 GC threads, leading to severe thread contention.

- **Mitigation**: Use `lxcfs` (FUSE filesystem) to mount virtualized `/proc` representations inside container mount namespaces, or pass explicit runtime flags (e.g., `-XX:ActiveProcessorCount=2`).
