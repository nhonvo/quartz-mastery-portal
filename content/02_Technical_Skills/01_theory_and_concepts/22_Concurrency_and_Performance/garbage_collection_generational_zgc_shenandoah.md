---


title: "Modern Garbage Collection Architecture: Generational Heuristics, Colored Pointers & Low-Latency Collectors (ZGC, Shenandoah, .NET GC)"
description: "Master-level architecture and implementation guide for Modern Garbage Collection Architecture: Generational Heuristics, Colored Pointers & Low-Latency Collectors (ZGC, Shenandoah, .NET GC) covering core theory, runtime mechanics, and production best practices."
category: "Concurrency, Threading & Performance"
tags: [concurrency, threading, performance, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---
# Modern Garbage Collection Architecture: Generational Heuristics, Colored Pointers & Low-Latency Collectors (ZGC, Shenandoah, .NET GC)

Trong thiết kế Runtime cho các ngôn ngữ quản lý bộ nhớ (Managed Languages) như Java và C#, **Garbage Collector (GC)** đóng vai trò tự động thu hồi vùng nhớ không còn được tham chiếu, giúp ngăn chặn lỗi Memory Leak và Dangling Pointers. Tuy nhiên, việc dừng ứng dụng để thu gom bộ nhớ (**Stop-The-World - STW Pause**) luôn là rào cản lớn nhất đối với các hệ thống có độ trễ cực thấp (Ultra-Low Latency Systems) như Financial Trading Engine hay Real-time Microservices.

Sự tiến hóa của thuật toán GC từ mô hình **Generational Mark-Sweep-Compact** cổ điển đến các collector hiện đại như **Java ZGC (Z Garbage Collector)**, **Java Shenandoah**, và **.NET Server GC (Background/Non-concurrent)** đã cắt giảm thời gian tạm dừng STW từ hàng giây xuống **dưới 1 millisecond**, bất chấp dung lượng Heap lên tới hàng Terabytes.

---

## 1. Executive Summary & Under-the-Hood Mechanics

### 1.1 Fundamentals: Weak Generational Hypothesis & Tri-Color Marking

Tất cả các hệ thống GC hiện đại đều dựa trên giả thuyết **Weak Generational Hypothesis**: *Hầu hết các đối tượng mới được tạo ra sẽ "chết" (không còn tham chiếu) rất nhanh sau khi được khởi tạo*.

```
[ Eden Space ] ---> Most objects die young (Gen 0 / Minor GC)
      |
      v (Survived N collections)
[ Tenured / Old Gen ] ---> Long-lived objects (Gen 2 / Major GC)
```

#### Tri-Color Marking Algorithm
Quá trình đánh dấu (Marking Phase) phân loại đối tượng trong Heap thành 3 tập màu:
- **White (Trắng)**: Đối tượng chưa được duyệt. Cuối chu kỳ GC, những đối tượng còn màu trắng là rác (Garbage) và sẽ bị dọn dẹp.
- **Grey (Xám)**: Đối tượng đã được duyệt, nhưng các đối tượng mà nó tham chiếu tới (Children) chưa được duyệt.
- **Black (Đen)**: Đối tượng và toàn bộ cây tham chiếu phụ thuộc của nó đã được duyệt hoàn toàn. Không chứa tham chiếu nào trỏ tới tập Trắng.

```
Root Set ---> [ Black Node ] ---> [ Grey Node ] ---> [ White Node ] (Garbage candidate)
```

### 1.2 Inter-Generational References & Write Barriers (Card Tables)

Khi thu gom thế hệ trẻ (Minor GC / Gen 0 GC), GC không muốn quét toàn bộ Old Generation (Gen 2) để tìm tham chiếu trỏ vào Eden. Để giải quyết, runtime sử dụng **Card Table** và **Write Barrier**:
- Heap được chia thành các mảng bộ nhớ nhỏ gọi là **Cards** (thường là 512 bytes).
- Mỗi khi chương trình thực hiện gán một con trỏ Old-Gen trỏ tới một đối tượng Young-Gen (`oldObj.field = youngObj`), JIT compiler sẽ chèn một đoạn mã **Write Barrier** để đánh dấu Card tương ứng trong Card Table là `Dirty` (0x01).
- Trong Minor GC, GC chỉ cần quét các Card `Dirty` thay vì quét toàn bộ Old Generation.

### 1.3 Ultra-Low Latency Architecture: ZGC & Shenandoah

Để loại bỏ hoàn toàn thời gian ngắt STW khi di chuyển/nén đối tượng (Evacuation Phase), ZGC và Shenandoah áp dụng các cơ chế tiên tiến:

#### Java ZGC: Colored Pointers & Load Barriers
ZGC sử dụng kỹ thuật **Colored Pointers** (Pointer Tagging) nhúng thông tin trạng thái GC trực tiếp vào các bit cao (High-order bits) của con trỏ 64-bit:

```
+-------------------+-----------------------------------------------+
| 16 bits | 4 bits  | 44 bits                                       |
| Unused  | Metadata| Object Virtual Address (Up to 16 Terabytes)   |
+-------------------+-----------------------------------------------+
            | | | |
            | | | +---> Marked0   (Object is live in Mark Phase 0)
            | | +-----> Marked1   (Object is live in Mark Phase 1)
            | +-------> Remapped  (Object has been relocated & updated)
            +---------> Finalizable
```

Khi ứng dụng đọc một tham chiếu (`obj.field`), JIT chèn một **Load Barrier**:
- Nếu bit metadata của con trỏ khớp với trạng thái chu kỳ GC hiện tại (ví dụ: `Remapped`), Load Barrier thực thi zero-cost.
- Nếu con trỏ trỏ tới một đối tượng đang bị di chuyển (Relocating), Load Barrier sẽ can thiệp ngay lập tức: đọc địa chỉ mới từ Forwarding Table, **cập nhật lại con trỏ tại chỗ (Self-Healing)** và trả về đối tượng đã di chuyển. Nhờ đó, việc di chuyển đối tượng diễn ra hoàn toàn song song với ứng dụng (Concurrent Evacuation).

#### Java Shenandoah: Load-Reference Barriers (LRB)
Shenandoah sử dụng **Brooks Pointer** (hoặc Load-Reference Barrier từ JDK 13+): Mỗi đối tượng có một con trỏ tiền tố (Forwarding Pointer) trỏ tới chính nó. Khi đối tượng bị di chuyển sang Region mới, con trỏ forwarding được cập nhật bằng lệnh CAS atomic trỏ sang vị trí mới.

---

## 2. Production-Grade Code Implementations & Best Practices

### 2.1 C# Production Example: Zero-Allocation Buffer Pooling & Memory Pressure Mitigation

Để giảm thiểu tần suất GC thu gom ở Gen 0/Gen 2, các hệ thống C# hiệu năng cao sử dụng `ArrayPool<T>` kết hợp `Span<T>` / `Memory<T>` để tái sử dụng mảng bộ nhớ thay vì cấp phát mới:

```csharp
using System;
using System.Buffers;
using System.IO;
using System.Threading.Tasks;

namespace MemoryInternals.Pooling
{
    public class ZeroAllocationStreamProcessor
    {
        private static readonly ArrayPool<byte> BytePool = ArrayPool<byte>.Shared;

        public async Task ProcessLargeStreamAsync(Stream sourceStream, int contentLength)
        {
            // Cấp phát buffer từ Shared Pool (Zero Garbage Allocation ở Gen 0)
            byte[] buffer = BytePool.Rent(81,920); // 80KB Buffer
            try
            {
                int bytesRead;
                int totalRead = 0;

                // Wrap mảng thành Memory/Span để xử lý an toàn
                Memory<byte> memoryBuffer = buffer;

                while ((bytesRead = await sourceStream.ReadAsync(memoryBuffer.Slice(0, Math.Min(buffer.Length, contentLength - totalRead)))) > 0)
                {
                    totalRead += bytesRead;
                    
                    // Thực thi logic xử lý dữ liệu trực tiếp trên Span (Zero Copy & Zero Allocation)
                    ProcessChunk(memoryBuffer.Span.Slice(0, bytesRead));

                    if (totalRead >= contentLength) break;
                }
            }
            finally
            {
                // Trả buffer về pool để tái sử dụng cho request sau
                BytePool.Return(buffer, clearArray: false);
            }
        }

        private void ProcessChunk(ReadOnlySpan<byte> chunk)
        {
            // Thao tác trực tiếp trên bộ nhớ stack/buffer mà không tạo chuỗi/đối tượng mới
            int hash = 0;
            for (int i = 0; i < chunk.Length; i++)
            {
                hash ^= chunk[i];
            }
        }
    }
}
```

### 2.2 Card Table Write Barrier Simulation (C++)

Mô phỏng lại mã máy JIT phát sinh cho câu lệnh gán con trỏ kèm theo Write Barrier đánh dấu Card Table:

```cpp
#include <iostream>
#include <cstdint>
#include <vector>

// Giả lập Card Table với 1 byte quản lý 512 bytes Heap Memory
constexpr size_t CARD_SHIFT = 9; // 2^9 = 512 bytes
constexpr uint8_t DIRTY_BYTE = 0x01;

uint8_t g_card_table[1024 * 1024]; // Card table cho 512MB Heap

struct HeapObject {
    uint32_t header;
    HeapObject* field;
};

// Giả lập JIT Write Barrier Injection
inline void jit_write_barrier(HeapObject** slot, HeapObject* target) {
    // 1. Thực hiện phép gán con trỏ thực tế
    *slot = target;

    // 2. Tính toán Card Index dựa trên địa chỉ của slot được gán (Old-Gen object field)
    uintptr_t slot_address = reinterpret_cast<uintptr_t>(slot);
    size_t card_index = slot_address >> CARD_SHIFT;

    // 3. Mark card as Dirty (Non-zero)
    g_card_table[card_index] = DIRTY_BYTE;
}

int main() {
    HeapObject oldGenObj{1, nullptr};
    HeapObject youngGenObj{2, nullptr};

    std::cout << "[Card Table] Before assignment card state: " 
              << (int)g_card_table[reinterpret_cast<uintptr_t>(&oldGenObj.field) >> CARD_SHIFT] << "\n";

    // Thực hiện gán con trỏ qua Write Barrier
    jit_write_barrier(&oldGenObj.field, &youngGenObj);

    std::cout << "[Card Table] After assignment card state: " 
              << (int)g_card_table[reinterpret_cast<uintptr_t>(&oldGenObj.field) >> CARD_SHIFT] << " (DIRTY)\n";

    return 0;
}
```

---

## 3. Performance Benchmark & Big-O Analysis

### 3.1 Collector Comparison Matrix

| Collector Engine | Target Use Case | Maximum Heap Size | Avg Pause Time (P99) | CPU Overhead (Barriers) |
| :--- | :--- | :--- | :--- | :--- |
| **Java G1 GC** | Balanced Throughput/Latency | Up to 64 GB | 10ms - 200ms | ~5% (Write Barrier) |
| **Java ZGC (Generational)** | Ultra-Low Latency | Up to 16 TB | **< 1 millisecond** | ~10% (Load Barrier) |
| **Java Shenandoah** | Ultra-Low Latency | Up to 100s GB | **< 10 milliseconds** | ~8% (Load Ref Barrier) |
| **.NET Server Background GC** | High Throughput Web Servers | Terabytes | 5ms - 50ms | ~3% (Card Table Barrier) |

### 3.2 Algorithmic Time & Space Complexity

```
+-----------------------------------------------------------------------------------+
| GC Execution Phase         | Algorithmic Complexity | Dependent Factor            |
+-----------------------------------------------------------------------------------+
| Initial Mark (STW)         | O(RootSet)             | Number of Thread Stacks     |
| Concurrent Marking         | O(LiveObjects)         | Total active reachable graph|
| Concurrent Evacuation      | O(LiveObjectsToReloc)   | Fragmentation & Survivor qty|
| Sweep Phase                | O(HeapSize / Regions)  | Total size of Memory Heap   |
| Load Barrier Lookup (ZGC)  | O(1) Constant          | Bitwise bit-test & Bitmask  |
+-----------------------------------------------------------------------------------+
```

---

## 4. Anti-Patterns & Bad Practices vs Correct Solutions

### Anti-Pattern 1: Large Object Heap (LOH) & Pinned Object Heap (POH) Fragmentation

**Bad Practice**: Trong .NET GC, các đối tượng lớn hơn 85,000 bytes tự động rơi vào **Large Object Heap (LOH)**. LOH mặc định không được compact (thu gom nén) để tránh chi phí copy dữ liệu lớn, dẫn đến hiện tượng Heap Fragmentation làm ứng dụng bị văng OutOfMemoryException dù tổng dung lượng RAM trống còn rất nhiều.

```csharp
// BAD: Continuous allocation of large byte arrays saturates LOH and causes severe fragmentation
public void ReadData() {
    for (int i = 0; i < 1000; i++) {
        byte[] largeBuffer = new byte[90_000]; // Allocation in LOH!
        // ... process buffer ...
    }
}
```

**Correct Solution**: Sử dụng `ArrayPool<byte>.Shared` cho LOH allocations, hoặc kích hoạt chế độ LOH Compact On Next Garbage Collection khi thực sự cần thiết.

```csharp
// GOOD: Force LOH compaction during maintenance window if using unpooled large objects
public void PerformMaintenanceCompaction() {
    System.Runtime.GCSettings.LargeObjectHeapCompactionMode = System.Runtime.GCLargeObjectHeapCompactionMode.CompactOnce;
    GC.Collect(2, GCCollectionMode.Forced, blocking: true, compacting: true);
}
```

### Anti-Pattern 2: Overusing Finalizers (`~ClassName()`) extending Object Lifetimes

**Bad Practice**: Định nghĩa destructor / finalizer cho các đối tượng C#/Java không cần thiết. Các đối tượng chứa Finalizer sẽ không được thu gom ngay khi bị mất tham chiếu ở Gen 0, mà được đẩy vào **Finalization Queue** và thăng cấp (Promote) lên **Generation 1 / Old Gen**, kéo dài tuổi thọ của rác qua nhiều chu kỳ GC.

```csharp
// BAD: Finalizer forces object to survive Gen 0 collection!
public class TempBuffer {
    private byte[] data = new byte[1024];
    ~TempBuffer() { // Unnecessary finalizer!
        // Doing nothing
    }
}
```

**Correct Solution**: Áp dụng chuẩn `IDisposable` pattern kết hợp `GC.SuppressFinalize(this)` để ngăn GC đẩy đối tượng vào Finalization Queue.

```csharp
// GOOD: Suppress finalizer when dispose is explicitly called
public class TempBufferOptimized : IDisposable {
    private byte[] data = new byte[1024];
    public void Dispose() {
        // Release unmanaged resources
        GC.SuppressFinalize(this);
    }
}
```

---

## 5. Real-World Troubleshooting & Operational Edge Cases

### Edge Case 1: ZGC / Shenandoah Allocation Stall (Allocation Spike)

**Hiện tượng**: Khi ứng dụng có tốc độ cấp phát đối tượng (Allocation Rate) quá cao, vượt quá tốc độ thu gom và di chuyển vùng nhớ song song của ZGC Background Threads (Concurrent Mark/Evacuation Rate), ZGC sẽ rơi vào trạng thái **Allocation Stall**: Tất cả các Application Threads đang cấp phát bộ nhớ sẽ bị **STW Pause ép buộc** cho đến khi chu kỳ GC hoàn tất.

**Phương pháp xử lý**:
1. Tăng số lượng GC Concurrent Worker Threads thông qua JVM flag:
   ```bash
   -XX:ConcGCThreads=8 -XX:ParallelGCThreads=16
   ```
2. Theo dõi các chỉ số ZGC Allocation Stall qua GC Logs:
   ```bash
   -Xlog:gc*,gc+phases=debug:file=gc.log:time,uptime,pid:filecount=5,filesize=100M
   ```
   Nếu xuất hiện thông báo `Allocation Stall (ThreadName)`, cần tăng dung lượng Heap (`-Xmx`) hoặc tối ưu giảm tần suất Rent/Allocation trong mã nguồn.

### Edge Case 2: High CPU Consumption caused by Load Barrier Escalation

**Hiện tượng**: Trong ZGC, các ứng dụng có số lượng Thread đọc tham chiếu đối tượng cực kỳ dày đặc có thể gặp hiện tượng CPU usage của ứng dụng tăng từ 10-15% sau khi nâng cấp từ G1 GC sang ZGC, do chi phí kiểm tra Metadata Bits của Load Barrier ở mọi lệnh Dereference con trỏ.

**Phương pháp xử lý**:
1. Đảm bảo ứng dụng chạy trên thế hệ JDK mới nhất (JDK 21+ Generational ZGC) có khả năng tối ưu hóa đè bớt các Load Barrier trùng lặp trong cùng một Basic Block thông qua LLVM/JVM C2 Compiler pass.
2. Bật tính năng Generational ZGC để phân tách xử lý đối tượng mới sinh:
   ```bash
   java -XX:+UseZGC -XX:+ZGenerational -Xms16g -Xmx16g -jar app.jar
   ```
