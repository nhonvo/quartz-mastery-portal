---


title: "03. 🔄 Deque (Hàng đợi Hai đầu) — Kiến trúc Bộ nhớ Chunked, Vòng lặp & Ứng dụng Thực chiến"
type: "concept_guide"
category: "dsa"
subcategory: "07_stack_queue"
created_at: 2026-08-22T00:00:00+07:00
updated_at: 2026-08-26T23:45:00+07:00
tags: [dsa, deque, double-ended-queue, chunked-array, sliding-window, work-stealing, ring-buffer, algorithms, computer-science, learning-note]
aliases:
  - 03_deque_double_ended_queue
---

# 📌 03. 🔄 Deque (Hàng đợi Hai đầu) — Kiến trúc Bộ nhớ Chunked, Vòng lặp & Ứng dụng Thực chiến

Hàng đợi hai đầu (Double-Ended Queue hay **Deque**) là cấu trúc dữ liệu tuyến tính tổng quát hóa của cả Ngăn xếp (Stack) và Hàng đợi (Queue), cho phép thực hiện các thao tác thêm mới và loại bỏ phần tử ở cả hai đầu (Head và Tail) với độ phức tạp thời gian hằng số **$\mathcal{O}(1)$**. 

---

## 1. Kiến trúc Bộ nhớ & Cơ chế Hoạt động Bên dưới

Khác với `std::vector` (một mảng liên tiếp đơn lẻ yêu cầu tái phân bổ toàn bộ bộ nhớ khi đầy) và `std::list` (các nút phân tán rời rạc liên kết bằng con trỏ gây Cache Miss liên tục), `std::deque` trong C++ STL được cài đặt theo kiến trúc **Bản đồ Con trỏ tới các Khối Bộ nhớ Cố định (Map of Chunks)**.

```mermaid
graph TD
    subgraph Central Map (Array of Pointers)
        M0["Map[0]: Chunk 0 Pointer"] --> Chunk0["Chunk 0 (512 Bytes): [E0, E1, E2, E3]"]
        M1["Map[1]: Chunk 1 Pointer"] --> Chunk1["Chunk 1 (512 Bytes): [E4, E5, E6, E7]"]
        M2["Map[2]: Chunk 2 Pointer"] --> Chunk2["Chunk 2 (512 Bytes): [E8, E9, E10, E11]"]
    end
```

### 1.1 Lợi ích của Kiến trúc Chunked Array
1. **Không bao giờ phải sao chép lại toàn bộ dữ liệu**: Khi mở rộng dung lượng, `deque` chỉ cấp phát thêm một khối mới (chunk) và cập nhật con trỏ trong mảng Map. Dữ liệu trong các khối cũ giữ nguyên vị trí trong bộ nhớ.
2. **Hỗ trợ Random Access trong $\mathcal{O}(1)$**:
   $$\text{BlockIndex} = \text{index} / \text{BlockSize}$$
   $$\text{OffsetInBlock} = \text{index} \pmod{\text{BlockSize}}$$
   $$\text{ElementAddress} = \text{Map}[\text{BlockIndex}] + \text{OffsetInBlock}$$
3. **Thao tác Thêm/Xóa ở Cả Hai Đầu**: `push_front`, `push_back`, `pop_front`, `pop_back` đều chạy trong $\mathcal{O}(1)$ thời gian.

---

## 2. Bảng So sánh Chi tiết Các Cấu trúc Dữ liệu Tuyến tính

| Tiêu chí | `std::vector` (Dynamic Array) | `std::deque` (Chunked Deque) | `std::list` (Doubly Linked List) |
| :--- | :--- | :--- | :--- |
| **Bố cục Bộ nhớ** | Một khối liên tiếp duy nhất | Nhiều khối cố định 512B liên tiếp | Nút rời rạc phân tán trên Heap |
| **Truy xuất ngẫu nhiên ($A[i]$)** | $\mathcal{O}(1)$ cực nhanh | $\mathcal{O}(1)$ (qua 2 lần gián tiếp) | $\mathcal{O}(N)$ duyệt tuần tự |
| **Thêm/Xóa ở Đầu (Front)** | $\mathcal{O}(N)$ dịch mảng | $\mathcal{O}(1)$ thêm chunk mới | $\mathcal{O}(1)$ cập nhật con trỏ |
| **Thêm/Xóa ở Cuối (Back)** | $\mathcal{O}(1)$ Amortized | $\mathcal{O}(1)$ Amortized | $\mathcal{O}(1)$ |
| **Hiệu năng L1 Cache** | Tối đa | Rất cao bên trong từng khối | Rất thấp (Pointer Chasing) |
| **Memory Overhead** | Tối thiểu (chỉ buffer dư) | Rất nhỏ (mảng con trỏ Map) | Rất lớn (16 byte con trỏ mỗi phần tử) |

---

## 3. Polyglot Source Code & Benchmarking

### 3.1 C++20 (Sliding Window Maximum & Work-Stealing Scheduling)

```cpp
#include <iostream>
#include <deque>
#include <vector>

class DequeMasterSuite {
public:
    // LeetCode 239: Sliding Window Maximum in O(N) Time
    static std::vector<int> MaxSlidingWindow(const std::vector<int>& nums, int k) {
        std::deque<int> dq; // Stores indices, values monotonically decreasing
        std::vector<int> result;

        for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
            // 1. Remove indices falling out of window [i - k + 1, i]
            if (!dq.empty() && dq.front() < i - k + 1) {
                dq.pop_front();
            }

            // 2. Maintain monotonic decreasing property
            while (!dq.empty() && nums[dq.back()] <= nums[i]) {
                dq.pop_back();
            }

            dq.push_back(i);

            // 3. Record max value for valid windows
            if (i >= k - 1) {
                result.push_back(nums[dq.front()]);
            }
        }
        return result;
    }
};

int main() {
    std::vector<int> data = {1, 3, -1, -3, 5, 3, 6, 7};
    auto max_values = DequeMasterSuite::MaxSlidingWindow(data, 3);
    std::cout << "Sliding Window Max (K=3): ";
    for (int v : max_values) std::cout << v << " ";
    std::cout << "
";
    return 0;
}
```

### 3.2 Python 3.12 (`collections.deque` Internal Mechanics)

```python
from collections import deque
from typing import List

class PythonDequeDemo:
    @staticmethod
    def demonstrate():
        # collections.deque in Python is implemented as a doubly linked list of 64-element blocks
        dq = deque(maxlen=5)
        for i in range(10):
            dq.append(i) # Automatically evicts oldest element from left when full
        print("Deque with maxlen 5:", list(dq)) # [5, 6, 7, 8, 9]

if __name__ == "__main__":
    PythonDequeDemo.demonstrate()
```

### 3.3 C# (.NET 8 Circular Array Deque Implementation)

```csharp
using System;
using System.Collections.Generic;

public class CustomDeque<T> {
    private T[] _buffer;
    private int _head;
    private int _tail;
    private int _count;
    private int _capacity;

    public CustomDeque(int capacity = 8) {
        _capacity = capacity;
        _buffer = new T[_capacity];
        _head = 0;
        _tail = 0;
        _count = 0;
    }

    public void PushFront(T item) {
        if (_count == _capacity) Resize(_capacity * 2);
        _head = (_head - 1 + _capacity) % _capacity;
        _buffer[_head] = item;
        _count++;
    }

    public void PushBack(T item) {
        if (_count == _capacity) Resize(_capacity * 2);
        _buffer[_tail] = item;
        _tail = (_tail + 1) % _capacity;
        _count++;
    }

    public T PopFront() {
        if (_count == 0) throw new InvalidOperationException("Deque is empty");
        T item = _buffer[_head];
        _head = (_head + 1) % _capacity;
        _count--;
        return item;
    }

    public T PopBack() {
        if (_count == 0) throw new InvalidOperationException("Deque is empty");
        _tail = (_tail - 1 + _capacity) % _capacity;
        T item = _buffer[_tail];
        _count--;
        return item;
    }

    private void Resize(int newCapacity) {
        T[] newBuf = new T[newCapacity];
        for (int i = 0; i < _count; i++) {
            newBuf[i] = _buffer[(_head + i) % _capacity];
        }
        _buffer = newBuf;
        _head = 0;
        _tail = _count;
        _capacity = newCapacity;
    }

    public int Count => _count;
}
```

---

## 4. Bẫy Thường Gặp & Chiến lược Phỏng vấn

1. **Python `list.pop(0)` Anti-pattern**:
   - Sử dụng `list.pop(0)` trong Python tốn $\mathcal{O}(N)$ do phải dồn mảng. Luôn dùng `collections.deque.popleft()` với chi phí $\mathcal{O}(1)$.
2. **Work-Stealing Scheduler Pattern**:
   - Trong các hệ thống lập lịch đa luồng (như .NET ThreadPool hoặc Go Runtime Scheduler), mỗi luồng sở hữu một Deque riêng. Luồng thực thi lấy và đẩy tác vụ ở đầu `Tail` (LIFO - tăng Cache Hit), trong khi các luồng rảnh rỗi "đánh cắp" tác vụ ở đầu `Head` (FIFO - giảm tranh chấp khóa).

---

## 🔗 Graph-Linked Knowledge Base
- 📖 Stacks & Queues Overview: [[01_DSA/01_theory_and_patterns/07_Stack_Queue/00_overview_stacks_queues|Stacks & Queues Overview]]
