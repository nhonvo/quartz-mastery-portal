---


title: "TCP/IP Protocol Stack & Congestion Control: CUBIC vs BBR Mechanics"
description: "Master-level architecture and implementation guide for TCP/IP Protocol Stack & Congestion Control: CUBIC vs BBR Mechanics covering core theory, runtime mechanics, and production best practices."
category: "Concurrency, Threading & Performance"
tags: [concurrency, threading, performance, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---
# TCP/IP Protocol Stack & Congestion Control: CUBIC vs BBR Mechanics

High-throughput networking in Linux systems relies heavily on how the TCP stack regulates data transmission rate across heterogeneous network paths. TCP congestion control algorithms determine how fast sender nodes increase their congestion window ($cwnd$) and how they react to packet losses or queueing delays.

This document explores the Linux TCP/IP kernel stack architecture, comparing traditional loss-based congestion control (**CUBIC**) with modern model-based congestion control (**BBR - Bottleneck Bandwidth and RTT**).

---

## 1. Executive Summary & Under-the-Hood Mechanics

### 1.1 Linux TCP/IP Stack Traversal Architecture

When an IP packet arrives at a Network Interface Card (NIC), the packet traverses through kernel memory structures (`struct sk_buff`) down to the socket read queue:

```
[ NIC Hardware ]
       │ (Ring Buffer DMA)
       ▼
[ NAPI Polling / Hard IRQ ] ──► napi_gro_receive()
       │
       ▼
[ SoftIRQ (NET_RX_SOFTIRQ) ] ──► netif_receive_skb()
       │
       ▼
[ IP Layer Processing ] ──► ip_rcv() ──► ip_local_deliver()
       │
       ▼
[ TCP Layer Processing ] ──► tcp_v4_rcv() ──► tcp_rcv_established()
       │                                            │
       ▼                                            ▼
[ Congestion Control State Engine ]        [ TCP Receive Queue ]
  (struct tcp_congestion_ops)                       │
                                                    ▼
                                           [ Socket Read Buffer ] ──► recv() / epoll_wait()
```

1. **Driver & NAPI Layer**: NIC receives frames via DMA into a descriptor ring buffer. Hard IRQ signals NAPI (`napi_schedule`), triggering `NET_RX_SOFTIRQ` to poll packets without per-packet interrupt overhead.
2. **IP Layer**: `ip_rcv()` checks IP checksum, options, and routes packet to `ip_local_deliver()` if destined for local host.
3. **TCP Layer Parsing**: `tcp_v4_rcv()` verifies TCP checksum, performs 4-tuple socket lookup (`__inet_lookup_skb`), and locks the socket struct (`struct sock`).
4. **Established State Handling**: `tcp_rcv_established()` updates sequence numbers, processes TCP ACK timestamps, updates TCP window estimations, and invokes the registered congestion control hooks (`struct tcp_congestion_ops`).

---

### 1.2 Kernel `struct tcp_congestion_ops` Interface

The Linux kernel abstracts congestion control algorithms via pluggable operations registered through `tcp_register_congestion_control()`:

```c
struct tcp_congestion_ops {
    struct list_head list;
    char name[TCP_CA_NAME_MAX];

    /* Initialization and cleanup */
    void (*init)(struct sock *sk);
    void (*release)(struct sock *sk);

    /* Congestion window state machine hooks */
    u32  (*ssthresh)(struct sock *sk);
    void (*cong_avoid)(struct sock *sk, u32 ack, u32 acked);
    void (*set_state)(struct sock *sk, u8 new_state);
    void (*cwnd_event)(struct sock *sk, enum tcp_ca_event ev);
    void (*pkts_acked)(struct sock *sk, const struct ack_sample *sample);
    void (*undo_cwnd)(struct sock *sk);

    /* Pacing rate calculation (crucial for BBR) */
    u32  (*sndbuf_expand)(struct sock *sk);
    void (*cong_control)(struct sock *sk, const struct rate_sample *rs);
};
```

Whenever an ACK arrives, `tcp_ack()` delegates calculation of packet pacing and congestion window resizing to `cong_avoid` or `cong_control`.

---

### 1.3 CUBIC Congestion Control Mechanics (Loss-Based)

CUBIC (RFC 8312) is the default loss-based TCP congestion control algorithm in Linux. It decouples window growth from Round-Trip Time (RTT) scaling, using a cubic function of time since the last congestion event:

$$W_{cubic}(t) = C \cdot (t - K)^3 + W_{max}$$

Where:
- $W_{max}$: Congestion window size prior to the last packet loss event.
- $t$: Elapsed time since the last packet loss event.
- $C$: CUBIC scaling parameter (typically \$0.4$).
- $K$: Time period required for the window to grow to $W_{max}$ without loss:

$$K = \sqrt[3]{\frac{W_{max} \cdot \beta}{C}}$$

- $\beta$: Multiplicative decrease factor upon packet loss (typically $\beta = 0.7$, reducing $cwnd$ by $30\%$).

```
cwnd (packets)
  ▲
  │                  Cubic Concave   Cubic Convex
  │                      Phase          Phase
  │                        ┌─────────────┐       ▲ W_max (Target Window)
  │                      ╭─┘             └─╮    ─┼─ ── ── ── ── ── ──
  │                    ╭─┘                 └─╮   │
  │                  ╭─┘                     │   │
  │  Multiplicative ╭┘                           │
  │  Drop (β = 0.7) │                            ▼ Packet Loss Event!
  ├─────────────────┼───────────────────────────► (Drop cwnd to β * W_max)
  │                 │
  └─────────────────┴───────────────────────────────► Time (t)
```

#### CUBIC Growth Phases:
1. **Concave Region**: Immediately following a loss event, $cwnd$ recovers quickly but flattens as it approaches $W_{max}$, offering stability near saturation.
2. **Plateau Region**: Around $t = K$, window growth slows to sample network capacity safely.
3. **Convex Region**: If no loss occurs past $W_{max}$, growth accelerates exponentially to probe for newly available bottleneck bandwidth.

*Critique*: CUBIC assumes packet loss equals link congestion. On high-speed, lossy (e.g., wireless/satellite) links or deep-buffered routers, CUBIC suffers severe throughput drops or causes **Bufferbloat** (high queue latency).

---

### 1.4 BBR Congestion Control Mechanics (Model-Based)

BBR (Bottleneck Bandwidth and RTT) shifts away from loss indication. Instead, it continuously measures two physical constraints of the network path:

1. **$BtlBw$ (Bottleneck Bandwidth)**: Max delivery rate measured over a sliding window.
2. **$RTprop$ (Round-Trip Propagation Delay)**: Minimum RTT observed without buffer queueing.

The maximum amount of in-flight data that maximizes throughput without creating queue delay is the **Bandwidth-Delay Product (BDP)**:

$$\text{BDP} = BtlBw \times RTprop$$

BBR regulates both `cwnd` and the kernel packet **pacing rate**:

$$\text{Pacing Rate} = \text{pacing\_gain} \times BtlBw$$
$$\text{cwnd} = \text{cwnd\_gain} \times \text{BDP}$$

```
                ┌──────────────────────────────────────────────┐
                │                 BBR State Engine             │
                └──────────────────────┬───────────────────────┘
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                          ▼
     ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
     │ BBR_STARTUP  │ ──(Full)─►│  BBR_DRAIN   │ ──(BDP)──►│ BBR_PROBE_BW │
     │ (Gain 2.89x) │           │ (Gain 0.35x) │           │ (8-phase cycle)
     └──────────────┘           └──────────────┘           └──────┬───────┘
                                                                  │
                                   ▲ (Expire)                     │ (Expire)
                                   └──────────── ┌──────────────┐ ◄┘
                                                 │BBR_PROBE_RTT │
                                                 │ (cwnd = 4pkts)
                                                 └──────────────┘
```

#### BBR State Machine Phases:
* **STARTUP**: Exponential search (pacing gain $2/ln(2) \approx 2.89$) to find maximum $BtlBw$.
* **DRAIN**: Reduces pacing gain (\$0.35$) to drain excess queue built up during STARTUP down to 1 BDP.
* **PROBE_BW**: Cycles pacing gain (\$1.25, 0.75, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0$) to continuously test for higher bandwidth while draining queues.
* **PROBE_RTT**: Periodically (every 10 seconds) drops $cwnd$ to 4 packets for $200\text{ ms}$ to measure true propagation delay ($RTprop$) without queue bloat.

---

## 2. Production-Grade Code Implementations & Best Practices

### 2.1 C System Programming: Querying & Toggling Socket Congestion Control

The following runnable C program configures custom socket buffer limits, toggles congestion control between `cubic` and `bbr`, enables TCP Pacing, and queries real-time TCP diagnostic metrics via `struct tcp_info`.

```c
#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <errno.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/tcp.h>
#include <arpa/inet.h>

#define BUFFER_SIZE (4 * 1024 * 1024) // 4MB socket buffer

void print_tcp_info(int sockfd) {
    struct tcp_info info;
    socklen_t len = sizeof(info);

    if (getsockopt(sockfd, IPPROTO_TCP, TCP_INFO, &info, &len) < 0) {
        perror("getsockopt TCP_INFO failed");
        return;
    }

    printf("\n=== Real-Time Kernel TCP Metrics ===\n");
    printf("State:               %u\n", info.tcpi_state);
    printf("RTT:                 %u us (Var: %u us)\n", info.tcpi_rtt, info.tcpi_rttvar);
    printf("SND cwnd:            %u packets\n", info.tcpi_snd_cwnd);
    printf("SND SSTRESH:         %u\n", info.tcpi_snd_ssthresh);
    printf("Pacing Rate:         %llu bytes/sec\n", (unsigned long long)info.tcpi_pacing_rate);
    printf("Delivery Rate:       %llu bytes/sec\n", (unsigned long long)info.tcpi_delivery_rate);
    printf("Retransmitted Pkts:  %u\n", info.tcpi_retrans);
    printf("Total Retransmitted: %u\n", info.tcpi_total_retrans);
    printf("================───────────────────\n");
}

int set_congestion_control(int sockfd, const char *algo_name) {
    socklen_t len = strlen(algo_name) + 1;
    if (setsockopt(sockfd, IPPROTO_TCP, TCP_CONGESTION, algo_name, len) < 0) {
        fprintf(stderr, "Failed to set TCP_CONGESTION to '%s': %s\n", algo_name, strerror(errno));
        return -1;
    }
    printf("Successfully set TCP Congestion Control algorithm to: %s\n", algo_name);
    return 0;
}

int main() {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) {
        perror("Socket creation failed");
        exit(EXIT_FAILURE);
    }

    // 1. Socket Buffer Tuning
    int bufsize = BUFFER_SIZE;
    if (setsockopt(sockfd, SOL_SOCKET, SO_SNDBUF, &bufsize, sizeof(bufsize)) < 0) {
        perror("Failed to set SO_SNDBUF");
    }
    if (setsockopt(sockfd, SOL_SOCKET, SO_RCVBUF, &bufsize, sizeof(bufsize)) < 0) {
        perror("Failed to set SO_RCVBUF");
    }

    // 2. Query Available Engine & Switch to BBR
    char current_algo[32];
    socklen_t len = sizeof(current_algo);
    if (getsockopt(sockfd, IPPROTO_TCP, TCP_CONGESTION, current_algo, &len) == 0) {
        printf("Initial TCP Congestion Control: %s\n", current_algo);
    }

    // Attempt setting to BBR, fallback to cubic
    if (set_congestion_control(sockfd, "bbr") < 0) {
        printf("Fallback to CUBIC...\n");
        set_congestion_control(sockfd, "cubic");
    }

    // 3. Connect to a test destination
    struct sockaddr_in serv_addr;
    memset(&serv_addr, 0, sizeof(serv_addr));
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(80);
    inet_pton(AF_INET, "1.1.1.1", &serv_addr.sin_addr);

    printf("Connecting to 1.1.1.1:80...\n");
    if (connect(sockfd, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0) {
        perror("Connect failed");
        close(sockfd);
        exit(EXIT_FAILURE);
    }

    // Send HTTP GET to trigger TCP packet exchange
    const char *http_req = "GET / HTTP/1.1\r\nHost: 1.1.1.1\r\nConnection: close\r\n\r\n";
    send(sockfd, http_req, strlen(http_req), 0);

    // Give kernel time to process ACKs
    usleep(100000);

    // Read metrics
    print_tcp_info(sockfd);

    close(sockfd);
    return 0;
}
```

---

### 2.2 Linux Kernel Optimization & Sysctl Tuning Script

Production bash configuration script for high-throughput server nodes (10GbE / 100GbE NICs):

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "[+] Tuning Kernel TCP Congestion Control and Buffer Limits for 10G/100G Networks..."

# Enable FQ (Fair Queueing) Packet Scheduler - REQUIRED for BBR Pacing
tc qdisc add dev eth0 root fq 2>/dev/null || tc qdisc replace dev eth0 root fq

# Load BBR Module
modprobe tcp_bbr || true

# System-Wide Sysctl Configurations
cat << 'EOF' > /etc/sysctl.d/99-high-throughput-tcp.conf
# Set Default Congestion Control & QDisc
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr

# TCP Buffer Auto-Tuning (min, default, max in bytes)
# Max: 16MB buffer allows full BDP utilization on high latency links
net.ipv4.tcp_wmem = 4096 65536 16777216
net.ipv4.tcp_rmem = 4096 87380 16777216
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216

# Connection Limits & Window Scaling
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 32768
net.ipv4.tcp_window_scaling = 1

# Timestamps & Selective ACK (SACK)
net.ipv4.tcp_timestamps = 1
net.ipv4.tcp_sack = 1
net.ipv4.tcp_dsack = 1
net.ipv4.tcp_low_latency = 0

# Fast Open & Active Queue Management
net.ipv4.tcp_fastopen = 3
net.ipv4.tcp_moderate_rcvbuf = 1
EOF

sysctl --system
echo "[+] Kernel Tuning Applied Successfully."
```

---

## 3. Performance Benchmark & Big-O Analysis

### 3.1 Algorithmic & Complexity Comparison

| Metric / Dimension | Loss-Based (CUBIC) | Model-Based (BBR v1 / v2) |
| :--- | :--- | :--- |
| **Control Parameter** | Congestion Window ($cwnd$) | Pacing Rate & BDP Window |
| **Primary Signal** | Packet Loss / Duplicate ACKs | Max Delivery Rate ($BtlBw$) & Min RTT ($RTprop$) |
| **Queue Occupancy** | High (Fills router queues until drop) | Minimal (Keeps queue $\approx 0$ BDP) |
| **Bufferbloat Resilience** | Poor (Causes bufferbloat, spikes latency) | Excellent (Mitigates queue delay) |
| **Random Loss Impact** | Degrades throughput dramatically | Maintains full rate up to ~15-20% random loss |
| **CPU Pacing Overhead** | Low | Low to Moderate (Requires kernel `fq` qdisc) |
| **State Complexity** | $O(1)$ scalar window tracking | $O(1)$ sliding window max filter |

```
Latency vs Throughput Saturation Spectrum:

Throughput
   ▲
Max│                  ┌──────────────────────┐  (BBR Target: Bottleneck Bandwidth)
BtlBw              ╭──┘                      │
   │            ╭──┘                         │  (CUBIC Target: Buffer Overflow)
   │         ╭──┘                            │
   └─────────┴───────────────────────────────┴──────────────► In-flight Packets
RTT Delay
   ▲
   │                                         ┌───────────────► High Bufferbloat (CUBIC)
   │                                      ╭──┘
RTprop ───────────────────────────────────┘             (Min RTT Region - BBR)
   └────────────────────────────────────────────────────────► In-flight Packets
             ▲                            ▲
             │                            │
       BDP (1 BDP Point)            Buffer Full Point
```

---

## 4. Anti-Patterns & Bad Practices vs Correct Solutions

### Anti-Pattern 1: Disabling Socket Pacing / Running BBR with `pfifo_fast`
* **Bad Practice**: Switching `tcp_congestion_control` to `bbr` while keeping default `pfifo_fast` packet scheduler.
* **Why it fails**: BBR relies on precise microsecond packet pacing. Without kernel pacing support (`fq` qdisc), BBR outputs bursty packet trains, triggering packet drops on shallow-buffered switches.
* **Correct Solution**: Ensure `net.core.default_qdisc = fq` is loaded in `/etc/sysctl.conf`.

---

### Anti-Pattern 2: Over-Allocating Static Socket Buffers (`SO_SNDBUF` / `SO_RCVBUF`)
* **Bad Practice**: Hardcoding huge buffer values (`setsockopt(fd, SOL_SOCKET, SO_SNDBUF, 64MB)`) on every accepted connection socket.
* **Why it fails**: Overriding dynamic Linux socket buffer auto-tuning (`tcp_wmem`/`tcp_rmem`) disables kernel automatic buffer scaling (`tcp_moderate_rcvbuf`). A server handling 100,000 connections will instantly run out of RAM (\$100,000 \times 64\text{MB} = 6.4\text{ TB}$).
* **Correct Solution**: Leave `SO_SNDBUF` and `SO_RCVBUF` unset in application code, letting Linux auto-tune memory between `tcp_rmem[0]` and `tcp_rmem[2]`.

---

## 5. Real-World Troubleshooting & Operational Edge Cases

### 5.1 Real-Time Diagnostics via `ss`

Use `ss -ti` to inspect living socket congestion metrics:

```bash
# Display detailed TCP statistics for active socket connections
ss -ti dst 1.1.1.1
```

**Sample Output Analysis**:
```text
ESTAB  0  0  192.168.1.50:54210  1.1.1.1:http
   bbr rtt:14.215/0.043 cubic_cwnd:10 ssthresh:14 bytes_acked:15421
   pacing_rate 120.4Mbps delivery_rate 118.2Mbps send 125.1Mbps
   data_segs_out:42 rtt:14.215 rttvar:0.043 rto:200000 minrtt:14.112
```

- **`rtt:14.215/0.043`**: Smoothed RTT (\$14.215\text{ ms}$) and RTT variance (\$0.043\text{ ms}$).
- **`pacing_rate 120.4Mbps`**: Kernel TCP pacing rate calculated by BBR.
- **`delivery_rate 118.2Mbps`**: Real-time bottleneck bandwidth sample ($BtlBw$).

---

### 5.2 BBR vs CUBIC Fair Coexistence Dynamics

When BBR v1 flows compete with CUBIC flows on deep-buffered shallow links:
- **Problem**: BBR v1 probes for max bandwidth aggressively, keeping in-flight data at 1.25 BDP. CUBIC inflates router queues to maximum capacity. BBR interprets CUBIC's queueing delay as structural path RTT ($RTprop$), resulting in BBR under-estimating available bandwidth or CUBIC getting starved.
- **Resolution**: Use **BBR v2** (which incorporates explicit ECN marking signals and loss tolerance) or deploy Active Queue Management (**CoDel** / **FQ-CoDel**) on edge routers.

---

### 5.3 Packet Loss Diagnosis Matrix

| Operational Symptom | Root Cause | Remediation Tool |
| :--- | :--- | :--- |
| High RTT variance & high latency under load | Bufferbloat on router interfaces running CUBIC | Migrate to BBR + `fq_codel` or `fq` |
| Low throughput on high-bandwidth long-haul | Small TCP window bounds or random packet drop on CUBIC | Enable `tcp_window_scaling` & BBR |
| Burst drop at top of rack switch | Microbursts from non-paced TCP socket sending | Enable `net.core.default_qdisc = fq` |

---

## 6. Summary & References

- **CUBIC**: Ideal for low-latency, loss-free local data centers. Loss-based growth $W_{cubic}(t) = C(t-K)^3 + W_{max}$.
- **BBR**: Ideal for high-latency, WAN, edge-cloud, and lossy networks. Model-based control using $BtlBw \times RTprop$.

**Related System Guides**:
- [[linux_epoll_kqueue_event_loop_reactor_pattern|Linux epoll & Reactor Pattern]]
- [[quic_protocol_http3_tls13_0rtt_handshake|QUIC Protocol & HTTP/3 Architecture]]
- [[socket_sharding_so_reuseport_kernel_load_balancing|Socket Sharding & SO_REUSEPORT]]
