---


title: "Zero-Copy Systems Architecture: sendfile, splice, DMA & Kernel Ring Buffers"
description: "Master-level architecture and implementation guide for Zero-Copy Systems Architecture: sendfile, splice, DMA & Kernel Ring Buffers covering core theory, runtime mechanics, and production best practices."
category: "Concurrency, Threading & Performance"
tags: [concurrency, threading, performance, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---
# Zero-Copy Systems Architecture: sendfile, splice, DMA & Kernel Ring Buffers

In high-throughput storage systems, proxy servers, and streaming platforms (such as Apache Kafka, Nginx, HAProxy, and Linux Kernel Network Engines), traditional File and Socket I/O incurs unacceptable CPU context switching and memory bandwidth overhead. 

**Zero-Copy** refers to a set of Linux kernel and hardware engineering techniques designed to transfer data across hardware interfaces and socket buffers **without copying data back and forth between kernel memory space and user-space memory buffers**.

---

## 1. Executive Summary & Under-the-Hood Mechanics

### 1.1 The High Cost of Traditional I/O

Consider a network application streaming a static file from disk over a TCP socket using standard `read(2)` and `write(2)` system calls:

```
TRADITIONAL 4-COPY I/O PATH:
Disk Drive ──(DMA Copy 1)──► Kernel Page Cache ──(CPU Copy 2)──► User Application Buffer
                                                                          │
NIC Network ◄──(DMA Copy 4)── Socket Buffer ◄─────(CPU Copy 3)────────────┘
```

1. **Copy 1 (DMA)**: Hardware DMA engine reads file data from storage controller into kernel **Page Cache**.
2. **Copy 2 (CPU Copy)**: `read()` system call copies data from Kernel Page Cache to **User-Space Memory Buffer** (CPU context switch).
3. **Copy 3 (CPU Copy)**: `write()` system call copies data from User-Space Memory Buffer into **Kernel Socket Buffer** (`sk_buff`) (CPU context switch).
4. **Copy 4 (DMA)**: Hardware DMA engine transfers data from Kernel Socket Buffer to **NIC TX Ring Buffer**.

**Performance Penalty**:
- **4 Context Switches** (User Space $\leftrightarrow$ Kernel Space transitions).
- **4 Data Copies** (2 CPU-driven memory-to-memory copies burning L1/L2 cache and memory bus bandwidth).

---

### 1.2 Zero-Copy Systems Evolution

Zero-copy techniques replace CPU-driven memory copies with kernel page reference passing and hardware Direct Memory Access (DMA) Scatter-Gather transfers.

```
ZERO-COPY via sendfile() + Scatter-Gather DMA:
Disk Drive ──(DMA Copy 1)──► Kernel Page Cache ─────────┐ (No CPU Data Copies)
                                  │ (Buffer Descriptor) │
                                  ▼                     ▼
                             Socket Buffer ──(DMA Copy 2)──► NIC Network
```

#### 1. `mmap(2)` + `write(2)`
- Replaces `read()` with `mmap()`. Maps kernel page cache directly into the user address space.
- Eliminates CPU Copy 2 (Kernel to User). However, CPU Copy 3 (User to Socket Buffer) still occurs.
- Reduces copies from 4 to 3 (2 DMA, 1 CPU copy).

#### 2. `sendfile(2)`
- Transfers data directly between a file descriptor (storage) and a socket descriptor within kernel space.
- **Without Scatter-Gather DMA**: 2 context switches, 3 data copies (1 CPU copy from page cache to socket buffer).
- **With Scatter-Gather DMA**: Hardware NIC supports reading disjoint kernel memory pages directly. `sendfile()` attaches small buffer descriptors (page pointers and lengths) to `sk_buff`. The NIC DMA engine reads data **directly from Kernel Page Cache** into the NIC ring buffer.
- Eliminates **all** CPU data copies (2 context switches, 2 DMA copies, 0 CPU copies).

#### 3. `splice(2)` / `tee(2)` / `vmsplice(2)`
- Moves data between arbitrary file descriptors using **Kernel Pipe Buffers** (`struct pipe_inode_info`) without allocating user-space memory.
- `splice()` passes page references (pointers to `struct page`) along the pipe ring buffer.
- Ideal for proxying network streams (Socket FD $\rightarrow$ Pipe FD $\rightarrow$ Socket FD) with 0 CPU data copies.

#### 4. Modern Ring Buffers: `AF_XDP` & `io_uring`
- **`io_uring` Zero-Copy**: Uses pre-registered user buffers and submission/completion ring buffers shared between user space and kernel space via memory mapping, eliminating system call overhead entirely ($O(0)$ syscall latency).
- **`AF_XDP` UMEM Ring**: Enables high-speed packet bypass directly from NIC RX driver queues to user space using lock-free ring buffers (FILL, RX, TX, COMPLETION).

---

## 2. Production-Grade Code Implementations & Best Practices

Below is a complete, runnable C program demonstrating high-performance zero-copy file transmission using `sendfile(2)` and `splice(2)` over non-blocking socket pipes.

```c
#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/sendfile.h>
#include <sys/socket.h>
#include <netinet/in.h>

#define PORT 9090
#define FILE_PATH "zero_copy_sample.dat"

// Prepare test data file
static void generate_dummy_file(const char *filepath) {
    int fd = open(filepath, O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (fd < 0) return;
    char data[1024];
    memset(data, 'A', sizeof(data));
    for (int i = 0; i < 1000; i++) {
        write(fd, data, sizeof(data)); // Write ~1MB test file
    }
    close(fd);
}

// Zero-copy stream relay using splice() pipe buffers
static ssize_t zero_copy_splice_relay(int in_fd, int out_fd, size_t count) {
    int pipefds[2];
    if (pipe(pipefds) < 0) {
        perror("pipe creation failed");
        return -1;
    }

    size_t total_spliced = 0;
    while (total_spliced < count) {
        // Splice from source FD into Kernel Pipe Buffer
        ssize_t bytes_in = splice(in_fd, NULL, pipefds[1], NULL, 
                                  count - total_spliced, SPLICE_F_MOVE | SPLICE_F_MORE);
        if (bytes_in <= 0) {
            if (bytes_in < 0 && errno == EAGAIN) continue;
            break;
        }

        // Splice from Kernel Pipe Buffer out to destination Socket FD
        ssize_t bytes_out = splice(pipefds[0], NULL, out_fd, NULL, 
                                   bytes_in, SPLICE_F_MOVE | SPLICE_F_MORE);
        if (bytes_out <= 0) {
            if (bytes_out < 0 && errno == EAGAIN) continue;
            break;
        }

        total_spliced += bytes_out;
    }

    close(pipefds[0]);
    close(pipefds[1]);
    return total_spliced;
}

int main(void) {
    generate_dummy_file(FILE_PATH);

    int listen_fd = socket(AF_INET, SOCK_STREAM, 0);
    int opt = 1;
    setsockopt(listen_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(PORT);

    bind(listen_fd, (struct sockaddr *)&addr, sizeof(addr));
    listen(listen_fd, 10);

    printf("⚡ Zero-Copy Server listening on port %d...\n", PORT);

    int client_fd = accept(listen_fd, NULL, NULL);
    if (client_fd >= 0) {
        int file_fd = open(FILE_PATH, O_RDONLY);
        struct stat stat_buf;
        fstat(file_fd, &stat_buf);

        printf("[Server] Transmitting %ld bytes via sendfile() Zero-Copy...\n", stat_buf.st_size);

        off_t offset = 0;
        // Zero-copy transfer directly from Page Cache to NIC DMA
        ssize_t sent = sendfile(client_fd, file_fd, &offset, stat_buf.st_size);
        if (sent >= 0) {
            printf("[Server] Successfully sent %ld bytes with 0 CPU copies!\n", sent);
        } else {
            perror("sendfile failed");
        }

        close(file_fd);
        close(client_fd);
    }

    close(listen_fd);
    unlink(FILE_PATH);
    return 0;
}
```

---

## 3. Performance Benchmark & Big-O Analysis

### 3.1 I/O Subsystem Throughput & Resource Costs

| Architecture Model | Syscall Count per Chunk | Context Switches | CPU Data Copies | Memory Bus Bandwidth Usage | CPU Core Saturation @ 10GbE |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Traditional `read`/`write`** | 2 | 4 | 2 (CPU) | High (Double Memory Copy) | 80% - 100% CPU |
| **`mmap` + `write`** | 2 | 4 | 1 (CPU) | Moderate | 40% - 60% CPU |
| **`sendfile` (SG-DMA)** | 1 | 2 | **0 (CPU)** | **Minimal (Single DMA)** | **< 5% CPU** |
| **`splice` (Pipe Rings)** | 2 | 4 | **0 (CPU)** | **Minimal (Single DMA)** | **< 10% CPU** |
| **`io_uring` Zero-Copy** | **0 (Async)** | **0** | **0 (CPU)** | **Hardware Physical Limit** | **< 1% CPU** |

---

## 4. Anti-Patterns & Bad Practices vs Correct Solutions

### Anti-Pattern 1: Concurrent File Truncation During `mmap` / `sendfile`
- **Bad Practice**: Modifying or truncating a disk file while `sendfile()` or `mmap()` is actively reading page cache references. If the underlying file size shrinks while user space dereferences mapped memory, the kernel throws a `SIGBUS` (Bus Error) signal, crashing the server.
- **Correct Solution**: Intercept `SIGBUS` signals using `sigaction()` or apply `fcntl(fd, F_SETLK)` file locks prior to initiating zero-copy pipelines.

### Anti-Pattern 2: Misinterpreting Pipe Requirements in `splice()`
- **Bad Practice**: Attempting to call `splice(fd_in, NULL, fd_out, NULL, len, flags)` where *neither* `fd_in` nor `fd_out` is a pipe file descriptor. The call fails immediately with `EINVAL`.
- **Correct Solution**: At least one descriptor in a `splice()` call **must** be a pipe descriptor (`struct pipe_inode_info`). For socket-to-socket transfers, construct an intermediate pipe channel (`pipe()`).

---

## 5. Real-World Troubleshooting & Operational Edge Cases

### 5.1 Pipe Buffer Deadlock in `splice()` Chains
Kernel pipe buffers possess a fixed default capacity of **64 KB** (`/proc/sys/fs/pipe-max-size`). If an application splices more bytes into the pipe writing end than the pipe capacity without concurrently reading from the reading end, the `splice()` call will block indefinitely, deadlocking the reactor event loop.

- **Mitigation**: Set pipe non-blocking flags (`SPLICE_F_NONBLOCK`) or use non-blocking epoll triggers on the pipe descriptors.

### 5.2 Zero-Copy & User-Space TLS Encryption Conflicts
Zero-copy primitives like `sendfile()` bypass user-space buffers completely. However, standard TLS protocol implementations (OpenSSL) require encrypting data in user-space buffers before sending TCP packets. This breaks zero-copy pipelines.

- **Kernel TLS (KTLS)**: Modern Linux kernels (Linux 4.13+) support **KTLS** (`SOL_TLS`). Offloads symmetric TLS encryption (AES-GCM) directly to the kernel TCP stack or hardware TLS NICs, re-enabling `sendfile()` zero-copy transfers over encrypted mTLS connections.
