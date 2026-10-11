---


title: "Prometheus & Metrics (Data Mastering)"
description: "Master-level architecture and implementation guide for Prometheus & Metrics (Data Mastering) covering core theory, runtime mechanics, and production best practices."
category: "Monitoring, Metrics & Telemetry"
tags: [monitoring, metrics, telemetry, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---
# Prometheus & Metrics (Data Mastering)

Prometheus là hệ thống giám sát và cảnh báo mã nguồn mở phổ biến nhất. Nó lưu trữ dữ liệu dưới dạng **Time-Series** (Chuỗi thời gian), biến các tham số kỹ thuật thành các biểu đồ sống động.

---

### 🏛️ 2.1 Prometheus Architecture (Kiến trúc Pull-based)

#### **1. Prometheus Server (The Heart)**
- **TSDB**: Lưu trữ dữ liệu.
- **HTTP Server**: Cung cấp **PromQL** (Ngôn ngữ truy vấn) để lấy số liệu.
- **Scraper**: Định kỳ "gọi" vào APP để lấy `/metrics`.

#### **2. Exporters (Người báo tin)**
Nhiều hệ thống không có endpoint `/metrics` sẵn (như Redis, MySQL, Linux).
- **Node Exporter**: Lấy CPU/RAM từ Hệ điều hành (OS).
- **Postgres Exporter**: Lấy số lượng Connection, Query slow từ DB.

#### **3. Alertmanager (Người báo động)**
Khi 1 chỉ số vượt ngưỡng (VD: CPU > 95%), Prometheus gửi tin đến Alertmanager -> Alertmanager bắn tin sang **Slack, Email, SMS**.

---

### 🧠 2.2 Bốn kiểu Metrics (The Four Types)

Đây là "vốn liếng" để bạn thiết kế hệ thống quan sát:

1.  **Counter (Bộ đếm)**: Chỉ tăng, không giảm (trừ khi reset).
    - **Ví dụ**: Tổng số request nhận được, Tổng số đơn hàng.
2.  **Gauge (Thước đo)**: Có thể tăng hoặc giảm.
    - **Ví dụ**: Số lượng User đang Online, % CPU hiện tại.
3.  **Histogram (Bản đồ tần suất)**: Chia các quan sát vào các "hố" (Buckets).
    - **Ví dụ**: Phân bổ Latency (Có bao nhiêu request < 10ms, bao nhiêu < 50ms, bao nhiêu > 500ms).
4.  **Summary (Tóm tắt)**: Giống Histogram nhưng tính toán ngay lập tức các giá trị phân vị (Percentiles) như P95, P99.

---

### 🚀 2.3 PromQL (Ngôn ngữ truy vấn Prometheus)

Bạn có thể thực hiện các phép tính toán phức tạp ngay trên thanh tìm kiếm.

**Ví dụ lấy tỷ lệ request thành công (HTTP 2xx):**
```promql
sum(rate(http_requests_total{status=~"2.."}[5m])) / sum(rate(http_requests_total[5m]))
```

---

### ⚡ 2.4 Scraping Config (Cấu hình lấy dữ liệu)

Hãy đảm bảo server Prometheus biết chỗ để lấy dữ liệu.

```yaml
scrape_configs:
  - job_name: 'backend_app'
    scrape_interval: 15s   # Cứ 15s lấy 1 lần
    static_configs:
      - targets: ['localhost:5000']
```

---

### 📝 2.5 Bài tập thực hành & Thử thách (Practice)

**Bài 1**: [Lý thuyết] "Tại sao nên dùng Counter cho số lượng Request thay vì dùng Gauge?"
<details><summary>Đáp án</summary>
Gauge rủi ro hơn vì nếu Prometheus bị lỗi 1 nhịp (miss scrape), bạn sẽ mất giá trị thực tế của thời điểm đó. Với Counter (Tổng số), nếu miss 1 nhịp, khi Prometheus quay lại, nó vẫn tính toán được sự chênh lệch (Delta) giữa lần trước và lần sau, đảm bảo tính chính xác cho các phép tính tỷ lệ (rate).
</details>

**Bài 2**: [Kỹ thuật] Viết câu lệnh PromQL để lấy giá trị CPU trung bình của tất cả các server trong 5 phút qua.
<details><summary>Solution</summary>
```promql
avg(rate(node_cpu_seconds_total{mode="idle"}[5m]))
```
(Lưu ý: Bạn lấy CPU idle rồi dùng `1 - idle` để ra CPU thực tế đang dùng).
</details>

---

### 🔗 Tài liệu chuyên sâu (Blog)
- [How Prometheus Scrapes Data from Your Application](file:///c:/Users/TruongNhon/Desktop/back-up/interview/blog/2025-09-06-prometheus-scraping.md)
- [PromQL Mastery: From Basic Queries to Complex Aggregations](file:///c:/Users/TruongNhon/Desktop/back-up/interview/blog/2025-09-06-promql-guide.md)
- [Designing the Perfect Alerting Rules in Alertmanager](file:///c:/Users/TruongNhon/Desktop/back-up/interview/blog/2025-09-06-alertmanager-rules.md)

---

## 🔗 Graph-Linked Knowledge Base

---

## 🔬 4. Metric Types: Counter, Gauge, Histogram, and Summary

### Histogram vs. Summary Trade-off Analysis
- **Histogram**: Buckets observations into pre-configured range bins (`le`). Allows client-side aggregation across multiple service pods using `histogram_quantile()`.
- **Summary**: Calculates streaming quantiles directly on the client instance using sliding-window algorithms. Accurate, but quantiles cannot be aggregated across a multi-node cluster.

---

## 🔬 5. Rate Calculation Algorithms: rate() vs. irate() in PromQL

- `rate()`: Calculates per-second average rate over the specified time window (e.g. `[5m]`). Smooths out temporary spikes and handles counter resets safely.
- `irate()`: Calculates instantaneous rate using only the last two data points in the range. Highly responsive for fast-moving graphs, but sensitive to transient jitter.
---

## 🔬 Advanced Architectural Mechanics & Deep Technical Specification

### 1. Core Operating Principles & Low-Level Mechanics of Prometheus And Metrics
In enterprise-scale distributed systems and high-throughput production environments, **Prometheus And Metrics** plays a critical architectural role. Engineering teams must evaluate the underlying hardware, kernel, network, and storage constraints:

- **Computational Complexity & Resource Overhead**: Understanding the CPU instruction cycles, memory cache line utilization, and network round-trip times (RTT) associated with Prometheus And Metrics.
- **Concurrency & State Synchronization**: Handling race conditions, deadlocks, and consistency anomalies across multi-threaded and distributed topologies.
- **Fault Tolerance & Graceful Degradation**: Designing self-healing mechanisms, exponential backoff with jitter, and circuit breaker protection against cascading infrastructure outages.

```mermaid
graph TD
    Client["Client / Upstream Ingress"] --> Controller["Core Controller / Engine (Prometheus And Metrics)"]
    Controller --> CacheTier["In-Memory State / Cache Layer"]
    Controller --> PersistenceTier["Durable Storage / Log Append Engine"]
    Controller --> Downstream["External Downstream Dependencies"]
    
    Controller -.->|Exception / Timeout| Fallback["Graceful Degradation Routine"]
```

### 2. Production Code Implementation & Robust Design Patterns

```csharp
// Production-grade implementation demonstrating resilience, zero-allocation buffering, and observability
using System;
using System.Buffers;
using System.Threading;
using System.Threading.Tasks;

public sealed class PrometheusAndMetricsManager : IAsyncDisposable
{
    private readonly SemaphoreSlim _concurrencyThrottle = new(100, 100);
    private long _processedOperationsCount;

    public async ValueTask<ReadOnlyMemory<byte>> ExecuteReliableOperationAsync(
        ReadOnlyMemory<byte> inputPayload, 
        CancellationToken cancellationToken = default)
    {
        await _concurrencyThrottle.WaitAsync(cancellationToken).ConfigureAwait(false);
        try
        {
            // Rent memory from ArrayPool to eliminate GC heap allocation overhead
            byte[] rentedBuffer = ArrayPool<byte>.Shared.Rent(inputPayload.Length + 64);
            try
            {
                inputPayload.Span.CopyTo(rentedBuffer);
                Interlocked.Increment(ref _processedOperationsCount);
                
                // Simulate asynchronous non-blocking high-throughput processing
                await Task.Yield();
                return new ReadOnlyMemory<byte>(rentedBuffer, 0, inputPayload.Length);
            }
            finally
            {
                ArrayPool<byte>.Shared.Return(rentedBuffer);
            }
        }
        finally
        {
            _concurrencyThrottle.Release();
        }
    }

    public ValueTask DisposeAsync()
    {
        _concurrencyThrottle.Dispose();
        return ValueTask.CompletedTask;
    }
}
```

### 3. Comprehensive Trade-off Matrix & Failure Modes

| Dimension | Standard Approach | High-Performance Pattern (Prometheus And Metrics) | Trade-offs & Production Risks |
| :--- | :--- | :--- | :--- |
| **Throughput (QPS)** | Baseline (\$5,000\text{ QPS}$) | Optimized (\$100,000+\text{ QPS}$) | Requires zero-allocation buffers & non-blocking I/O multiplexing. |
| **Latency (P99)** | $45\text{ ms}$ | $< 2.5\text{ ms}$ | Requires hardware cache-line alignment and lock-free data structures. |
| **Memory Footprint** | Dynamic Garbage Collected Heap | Pooled Buffer Memory (`ArrayPool` / Off-Heap) | Manual memory lifecycle management prevents GC pause spikes. |
| **Fault Recovery** | Manual Restart / Failover | Automated Leader Election & Circuit Breaking | Requires distributed consensus quorum ($N/2 + 1$). |

### 4. Verification, Benchmarking & Production Checklist
1. **Stress & Chaos Testing**: Validate system behavior under $10\times$ peak traffic spikes and simulate packet loss, network partitions, and node crashes.
2. **Observability Integration**: Export Prometheus counters, gauges, and OpenTelemetry distributed trace spans with unified TraceID propagation.
3. **Security Hardening**: Enforce mTLS encryption in transit, strict RBAC authorization, and least-privilege credential rotation.
4. **SLO & Error Budgeting**: Maintain \$99.99\%$ availability SLO with automated alerts on error budget burn rates.
