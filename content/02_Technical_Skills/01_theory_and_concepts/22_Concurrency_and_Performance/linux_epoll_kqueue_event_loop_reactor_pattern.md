---


title: "Linux epoll vs FreeBSD kqueue Event Loops & Reactor Pattern Architecture"
description: "Master-level architecture and implementation guide for Linux epoll vs FreeBSD kqueue Event Loops & Reactor Pattern Architecture covering core theory, runtime mechanics, and production best practices."
category: "Concurrency, Threading & Performance"
tags: [concurrency, threading, performance, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---
# Linux epoll vs FreeBSD kqueue Event Loops & Reactor Pattern Architecture

High-performance network servers (such as Nginx, Redis, Node.js, and Netty) rely on asynchronous, non-blocking I/O multiplexing to handle tens of thousands of concurrent connections (the C10K and C1000K problems). Traditional I/O multiplexing primitives like `select()` and `poll()` degrade to $O(N)$ linear complexity as the number of tracked file descriptors increases.

Modern operating systems solve this bottleneck using event notification subsystems: **`epoll`** on Linux and **`kqueue`** on FreeBSD/macOS. These primitives achieve $O(1)$ event retrieval by maintaining state within the kernel space and notifying user space only when active I/O events occur.

---

## 1. Executive Summary & Under-the-Hood Mechanics

### 1.1 Evolution of I/O Multiplexing

To understand `epoll`, we must trace the structural limitations of historical I/O polling system calls:

1. **`select(2)`**:
   - Uses fixed-size bitmasks (`fd_set`) capped at `FD_SETSIZE` (typically 1024).
   - Requires user space to re-initialize bitmasks before every call.
   - The kernel iterates linearly across all registered descriptors from 0 to `maxfd` ($O(N)$), even if only 1 file descriptor is active.
   - Requires copying bitmasks between user space and kernel space on every invocation.

2. **`poll(2)`**:
   - Replaces fixed bitmasks with a dynamic array of `struct pollfd` structures, removing the 1024 file descriptor hard limit.
   - However, it still suffers from $O(N)$ kernel-side linear scans and continuous memory copying of the `pollfd` array on every iteration.

3. **`epoll(7)` & `kqueue(2)`**:
   - Decouple **interest registration** from **event waiting**.
   - Maintain event state in kernel memory across system calls.
   - `epoll_ctl()` modifies the kernel interest set, while `epoll_wait()` simply harvests ready events in $O(1)$ time relative to active events ($O(K)$ where $K \ll N$).

---

### 1.2 Linux `epoll` Kernel Data Structures

When `epoll_create1(0)` is invoked, the Linux kernel allocates an internal file description (`struct eventpoll`) backed by two primary data structures:

```
                  ┌─────────────────────────────────────────┐
                  │          struct eventpoll (Kernel)      │
                  └────────────────────┬────────────────────┘
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
┌───────────────────────────┐                         ┌───────────────────────────┐
│     Red-Black Tree        │                         │        Ready List         │
│   (rbr: epitem nodes)     │                         │   (rdllist: doubly linked)│
└─────────────┬─────────────┘                         └─────────────┬─────────────┘
              │                                                     │
    ┌─────────┴─────────┐                                 ┌─────────┴─────────┐
    ▼                   ▼                                 ▼                   ▼
[ Socket fd 3 ]   [ Socket fd 4 ]                   [ Socket fd 4 ]   [ Socket fd 7 ]
(Interest State)  (Interest State)                  (Ready Event)     (Ready Event)
```

1. **Red-Black Tree (`struct rb_root_cached rbr`)**:
   - Stores all registered file descriptors (`struct epitem`).
   - Enables fast insertion, deletion, and search of monitored descriptors in $O(\log N)$ time during `epoll_ctl()` calls (`EPOLL_CTL_ADD`, `EPOLL_CTL_DEL`, `EPOLL_CTL_MOD`).
   - Prevents duplicate registration of file descriptors within the same epoll instance.

2. **Ready List (`struct list_head rdllist`)**:
   - A doubly linked list containing references to `epitem` structures that have unhandled I/O readiness events.
   - When network packets arrive at the NIC, hardware interrupts trigger device driver callbacks. The socket's kernel poll callback (`ep_poll_callback`) inserts the corresponding `epitem` directly into `rdllist` and wakes up processes sleeping on `epoll_wait()`.

3. **`epoll_wait(2)` Execution Flow**:
   - Checks if `rdllist` is non-empty. If empty, the calling thread sleeps on the kernel wait queue (`wq`) until a hardware interrupt or timeout fires.
   - Copies ready events directly into the caller's user-space array (`struct epoll_event[]`).
   - Returns the exact number of active descriptors ($K$). User space iterates strictly over active events without scanning idle connections.

---

### 1.3 Level-Triggered (LT) vs Edge-Triggered (ET) Semantics

`epoll` supports two event notification modes:

| Feature | Level-Triggered (LT - Default) | Edge-Triggered (ET - `EPOLLET`) |
| :--- | :--- | :--- |
| **Notification Behavior** | Repeatedly notifies as long as socket buffer has data | Notifies **only once** state transitions from unready to ready |
| **User Space Responsibility** | Can read partial data; will be notified again on next loop | Must loop `read()` until `EAGAIN` / `EWOULDBLOCK` |
| **Socket Configuration** | Works with Blocking or Non-Blocking fds | **Must** use Non-Blocking (`O_NONBLOCK`) fds |
| **System Call Overhead** | Higher (more epoll triggers if buffer remains unread) | Minimal (lowest possible context switch & epoll trigger frequency) |
| **Starvation Risk** | Low | High (if read loop stalls before hitting `EAGAIN`) |

> [!IMPORTANT]
> When using Edge-Triggered (`EPOLLET`) mode, sockets **must** be set to Non-Blocking (`O_NONBLOCK`). If a socket remains in blocking mode, a read loop designed to exhaust the buffer will block forever when the buffer becomes empty, deadlocking the single-threaded Reactor event loop.

---

### 1.4 FreeBSD `kqueue` vs Linux `epoll`

FreeBSD's `kqueue(2)` is a unified event notification framework designed to monitor diverse kernel event sources beyond network sockets:

- **Filter-Based Architecture**: `kqueue` uses `struct kevent` to track network events (`EVFILT_READ`, `EVFILT_WRITE`), file vnode changes (`EVFILT_VNODE`), signals (`EVFILT_SIGNAL`), timers (`EVFILT_TIMER`), and user-defined events (`EVFILT_USER`).
- **Atomic Registration & Fetching**: `kevent()` allows registering new interest filters and fetching pending events in a single system call, reducing kernel transition overhead compared to separate `epoll_ctl` and `epoll_wait` calls.

---

## 2. Production-Grade Code Implementations & Best Practices

Below is a complete, runnable C implementation of a **Single-Threaded Non-Blocking Reactor Event Loop** utilizing Linux `epoll` in Edge-Triggered (`EPOLLET`) mode.

```c
#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <errno.h>
#include <fcntl.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <sys/epoll.h>

#define MAX_EVENTS 64
#define BUFFER_SIZE 1024
#define PORT 8080

// Utility to set file descriptor to non-blocking mode
static int set_nonblocking(int fd) {
    int flags = fcntl(fd, F_GETFL, 0);
    if (flags == -1) {
        perror("fcntl F_GETFL");
        return -1;
    }
    if (fcntl(fd, F_SETFL, flags | O_NONBLOCK) == -1) {
        perror("fcntl F_SETFL O_NONBLOCK");
        return -1;
    }
    return 0;
}

// Drain read buffer for Edge-Triggered (ET) epoll socket
static void handle_client_read(int client_fd) {
    char buffer[BUFFER_SIZE];
    while (1) {
        ssize_t bytes_read = read(client_fd, buffer, sizeof(buffer) - 1);
        if (bytes_read > 0) {
            buffer[bytes_read] = '\0';
            printf("[Client FD %d] Received %ld bytes: %s", client_fd, bytes_read, buffer);
            // Echo back to client
            write(client_fd, buffer, bytes_read);
        } else if (bytes_read == 0) {
            // Client closed connection gracefully
            printf("[Client FD %d] Connection closed by peer.\n", client_fd);
            close(client_fd); // epoll automatically removes closed fds
            break;
        } else {
            if (errno == EAGAIN || errno == EWOULDBLOCK) {
                // Buffer completely drained; safe to return to epoll_wait loop
                break;
            } else {
                perror("read error");
                close(client_fd);
                break;
            }
        }
    }
}

int main(void) {
    int listen_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (listen_fd < 0) {
        perror("socket creation failed");
        exit(EXIT_FAILURE);
    }

    int opt = 1;
    setsockopt(listen_fd, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT, &opt, sizeof(opt));

    struct sockaddr_in address;
    memset(&address, 0, sizeof(address));
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    if (bind(listen_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("bind failed");
        close(listen_fd);
        exit(EXIT_FAILURE);
    }

    if (listen(listen_fd, SOMAXCONN) < 0) {
        perror("listen failed");
        close(listen_fd);
        exit(EXIT_FAILURE);
    }

    set_nonblocking(listen_fd);

    int epoll_fd = epoll_create1(EPOLL_CLOEXEC);
    if (epoll_fd < 0) {
        perror("epoll_create1 failed");
        close(listen_fd);
        exit(EXIT_FAILURE);
    }

    struct epoll_event ev, events[MAX_EVENTS];
    ev.events = EPOLLIN | EPOLLET; // Read readiness + Edge-Triggered
    ev.data.fd = listen_fd;

    if (epoll_ctl(epoll_fd, EPOLL_CTL_ADD, listen_fd, &ev) < 0) {
        perror("epoll_ctl listen_fd failed");
        close(listen_fd);
        close(epoll_fd);
        exit(EXIT_FAILURE);
    }

    printf("🚀 Reactor Event Loop running on port %d...\n", PORT);

    while (1) {
        int nfds = epoll_wait(epoll_fd, events, MAX_EVENTS, -1);
        if (nfds < 0) {
            if (errno == EINTR) continue; // Interrupted by signal
            perror("epoll_wait error");
            break;
        }

        for (int i = 0; i < nfds; i++) {
            int current_fd = events[i].data.fd;

            if (current_fd == listen_fd) {
                // Incoming connection on listening socket
                while (1) {
                    struct sockaddr_in client_addr;
                    socklen_t client_len = sizeof(client_addr);
                    int conn_fd = accept4(listen_fd, (struct sockaddr *)&client_addr, &client_len, SOCK_NONBLOCK | SOCK_CLOEXEC);
                    if (conn_fd < 0) {
                        if (errno == EAGAIN || errno == EWOULDBLOCK) {
                            // All pending connections accepted
                            break;
                        } else {
                            perror("accept4 error");
                            break;
                        }
                    }

                    ev.events = EPOLLIN | EPOLLET | EPOLLRDHUP;
                    ev.data.fd = conn_fd;
                    if (epoll_ctl(epoll_fd, EPOLL_CTL_ADD, conn_fd, &ev) < 0) {
                        perror("epoll_ctl add conn_fd failed");
                        close(conn_fd);
                    } else {
                        printf("[Server] Accepted new connection FD: %d\n", conn_fd);
                    }
                }
            } else {
                // Event on active client socket
                uint32_t ev_flags = events[i].events;
                if (ev_flags & (EPOLLERR | EPOLLHUP | EPOLLRDHUP)) {
                    printf("[Client FD %d] Disconnected or error event.\n", current_fd);
                    close(current_fd);
                } else if (ev_flags & EPOLLIN) {
                    handle_client_read(current_fd);
                }
            }
        }
    }

    close(listen_fd);
    close(epoll_fd);
    return 0;
}
```

---

## 3. Performance Benchmark & Big-O Analysis

### 3.1 Algorithmic Complexity Comparison

| Primitive | Interest Set Registration | Readiness Checking Complexity | Active Event Copy Cost | Scalability Boundary |
| :--- | :--- | :--- | :--- | :--- |
| **`select`** | $O(N)$ per call | $O(N)$ (kernel linear array scan) | Copies whole bitmask ($O(N)$) | Capped at `FD_SETSIZE` (1024) |
| **`poll`** | $O(N)$ per call | $O(N)$ (kernel struct array scan) | Copies whole array ($O(N)$) | Limited by system memory |
| **`epoll` (LT)** | $O(\log N)$ via tree | $O(1)$ via kernel ready list | Copies only active events ($O(K)$) | Millions of open fds |
| **`epoll` (ET)** | $O(\log N)$ via tree | $O(1)$ via kernel ready list | Minimal active event triggers ($O(K)$) | Peak throughput for 1M+ fds |
| **`kqueue`** | $O(1)$ batch register | $O(1)$ via kernel event list | Copies only active events ($O(K)$) | Millions of open fds |
| **`io_uring`** | $O(1)$ lock-free ring | $O(0)$ system-call free submission | Dual lock-free ring buffers | Saturation limit of hardware NIC/CPU |

Where:
- $N$ = Total number of registered file descriptors.
- $K$ = Number of file descriptors currently active/ready ($K \ll N$).

---

## 4. Anti-Patterns & Bad Practices vs Correct Solutions

### Anti-Pattern 1: Partial Reads in Edge-Triggered (ET) Mode
- **Bad Practice**: Executing a single `read()` call when an `EPOLLIN` event fires in ET mode. If 4096 bytes are pending in the socket queue and `read()` fetches only 1024 bytes, `epoll_wait()` will **not** fire another event until *new* data arrives, hanging the connection.
- **Correct Solution**: Loop `read()` inside a `while(1)` block until `read()` returns `-1` with `errno == EAGAIN` or `EWOULDBLOCK`.

### Anti-Pattern 2: Unconditional Registration of `EPOLLOUT`
- **Bad Practice**: Registering `EPOLLOUT` on socket creation and leaving it active continuously. Because writable sockets are almost always ready for writing, `epoll_wait()` will immediately return on every loop iteration, causing 100% CPU spinning (busy-looping).
- **Correct Solution**: Register `EPOLLOUT` **only** when a non-blocking `write()` returns `EAGAIN` (indicating TCP send buffer full). Once remaining buffered data is flushed, disable `EPOLLOUT` via `epoll_ctl(..., EPOLL_CTL_MOD, ...)`.

---

## 5. Real-World Troubleshooting & Operational Edge Cases

### 5.1 Thundering Herd Problem on Multi-Process Accept
When multiple worker processes share a single listening socket via `epoll_wait()`, an incoming TCP SYN packet wakes up **all** sleeping processes simultaneously. However, only one process successfully executes `accept()`, while all others receive `EAGAIN` and waste CPU context switches.

- **Mitigation 1 (`SO_REUSEPORT`)**: Enables kernel-level socket load balancing, assigning incoming connections directly to separate process epoll instances at the socket layer.
- **Mitigation 2 (`EPOLLEXCLUSIVE`)**: Added in Linux 4.5, this epoll flag ensures the kernel wakes up only a single process per incoming connection event.

### 5.2 Leaked File Descriptors and Kernel Limits
If file descriptors are closed without unregistering from `epoll`, the kernel removes them automatically when the underlying `struct file` refcount hits 0. However, if a descriptor is duplicated via `dup()` or `fork()`, the `epitem` remains active in the red-black tree, leading to unexpected event triggers.

**Operational Inspection**:
```bash
# Check maximum system-wide epoll watches limit
cat /proc/sys/fs/epoll/max_user_watches

# Inspect open file descriptors for process PID 1234
ls -l /proc/1234/fd/
```
