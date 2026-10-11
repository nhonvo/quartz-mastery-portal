---


title: "00. 🥞 Stacks & Queues: Architecture, Monotonic Variants & Systems Engineering"
type: "concept_guide"
category: "dsa"
subcategory: "07_stack_queue"
created_at: 2026-08-22T00:00:00+07:00
updated_at: 2026-08-26T23:45:00+07:00
tags: [dsa, stack, queue, deque, monotonic-stack, monotonic-queue, circular-buffer, memory-layout, algorithms, computer-science, learning-note]
aliases:
  - 00_overview_stacks_queues
---

# 📌 00. 🥞 Stacks & Queues: Architecture, Monotonic Variants & Systems Engineering

Ngăn xếp (Stack) và Hàng đợi (Queue) là hai cấu trúc dữ liệu trừu tượng (Abstract Data Types - ADT) cơ bản nhất nhưng đóng vai trò sống còn trong kiến trúc hệ điều hành, trình biên dịch, runtime call stack, event loops và giải thuật đồ thị. 

---

## 1. Bản chất Kiến trúc & Cơ chế Bộ nhớ

```mermaid
graph TD
    subgraph Stack (LIFO - Last-In, First-Out)
        SP["Push / Pop (Top)"] --> S1["Top Element [30]"]
        S1 --> S2["Element [20]"]
        S2 --> S3["Bottom Element [10]"]
    end
    
    subgraph Queue (FIFO - First-In, First-Out)
        Enqueue["Enqueue (Rear/Tail)"] --> Q3["Rear [30]"]
        Q3 --> Q2["Body [20]"]
        Q2 --> Q1["Front [10]"]
        Q1 --> Dequeue["Dequeue (Front/Head)"]
    end
```

### 1.1 Nguyên lý Hoạt động & Bảng So sánh Hoạt động

| Tiêu chí | Stack (Ngăn xếp) | Queue (Hàng đợi) | Deque (Double-Ended Queue) |
| :--- | :--- | :--- | :--- |
| **Quy tắc Truy xuất** | **LIFO** (Last In, First Out) | **FIFO** (First In, First Out) | Cả hai đầu (Front & Back) |
| **Thao tác Thêm** | `push(x)`: $\mathcal{O}(1)$ | `enqueue(x)` / `push(x)`: $\mathcal{O}(1)$ | `push_front(x)`, `push_back(x)`: $\mathcal{O}(1)$ |
| **Thao tác Xóa** | `pop()`: $\mathcal{O}(1)$ | `dequeue()` / `pop()`: $\mathcal{O}(1)$ | `pop_front()`, `pop_back()`: $\mathcal{O}(1)$ |
| **Đọc phần tử đầu**| `top()` / `peek()`: $\mathcal{O}(1)$ | `front()` / `peek()`: $\mathcal{O}(1)$ | `front()`, `back()`: $\mathcal{O}(1)$ |
| **Kiến trúc Vùng nhớ** | Contiguous Array (`std::vector`) | Circular Ring Buffer hoặc Chunked Block List | Chunked Array Map (`std::deque`) |
| **Ứng dụng Thực tế** | Function Call Stack, Undo/Redo, Syntax Parsing | Task Scheduling, Event Loop, BFS Graph Traversal | Sliding Window Maximum, Work Stealing Scheduler |

---

## 2. Thiết kế Bộ nhớ Đệm Vòng (Circular Ring Buffer Queue)

Sử dụng mảng tuyến tính thông thường để làm Queue sẽ gây lãng phí bộ nhớ khi con trỏ `front` liên tục tiến về phía trước. **Circular Ring Buffer** giải quyết triệt để vấn đề này bằng phép toán modulo $M$:

$$\text{NextTail} = (\text{tail} + 1) \pmod M$$
$$\text{NextHead} = (\text{head} + 1) \pmod M$$
$$\text{IsFull} \iff (\text{tail} + 1) \pmod M == \text{head}$$
$$\text{IsEmpty} \iff \text{tail} == \text{head}$$

```mermaid
graph LR
    subgraph Circular Array (Capacity = 8)
        B0["0: Free"] --> B1["1: Free"]
        B1 --> B2["2: Head (Data A)"]
        B2 --> B3["3: Data B"]
        B3 --> B4["4: Data C"]
        B4 --> B5["5: Tail (Data D)"]
        B5 --> B6["6: Free"]
        B6 --> B7["7: Free"]
        B7 --> B0
    end
```

---

## 3. Các Biến thể Nâng cao (Monotonic Stack & Monotonic Queue)

### 3.1 Monotonic Stack (Ngăn xếp Đơn điệu)
Ngăn xếp duy trì các phần tử luôn tăng dần hoặc giảm dần nghiêm ngặt từ đáy lên đỉnh.
- **Mục đích**: Tìm **Phần tử Lớn hơn Tiếp theo (Next Greater Element)** hoặc **Phần tử Nhỏ hơn Tiếp theo (Next Smaller Element)** gần nhất cho mọi phần tử trong mảng trong đúng **$\mathcal{O}(N)$ thời gian**.
- **Cơ chế Amortized**: Mỗi phần tử chỉ được `push` vào stack đúng 1 lần và bị `pop` tối đa 1 lần $\implies$ Tổng số thao tác $\le 2N = \mathcal{O}(N)$.

### 3.2 Monotonic Deque (Hàng đợi Đơn điệu)
Duy trì các phần tử trong Deque theo thứ tự đơn điệu giảm dần về giá trị và tăng dần về chỉ số index.
- **Mục đích**: Tìm giá trị lớn nhất/nhỏ nhất trong cửa sổ trượt kích thước $K$ (Sliding Window Maximum) trong $\mathcal{O}(N)$ thời gian và $\mathcal{O}(K)$ không gian.

---

## 4. Triển khai Source Code Đa ngôn ngữ Hoàn chỉnh

### 4.1 C++20 (Circular Ring Buffer Queue & Next Greater Element)

```cpp
#include <iostream>
#include <vector>
#include <stack>
#include <stdexcept>

template <typename T>
class CircularQueue {
private:
    std::vector<T> buffer_;
    size_t head_ = 0;
    size_t tail_ = 0;
    size_t size_ = 0;
    size_t capacity_;

public:
    CircularQueue(size_t capacity) : capacity_(capacity), buffer_(capacity) {}

    bool Enqueue(const T& value) {
        if (IsFull()) return false;
        buffer_[tail_] = value;
        tail_ = (tail_ + 1) % capacity_;
        size_++;
        return true;
    }

    bool Dequeue(T& out_value) {
        if (IsEmpty()) return false;
        out_value = buffer_[head_];
        head_ = (head_ + 1) % capacity_;
        size_--;
        return true;
    }

    nodiscard bool IsEmpty() const { return size_ == 0; }
    nodiscard bool IsFull() const { return size_ == capacity_; }
    nodiscard size_t Size() const { return size_; }
};

class MonotonicStackAlgorithms {
public:
    // LeetCode 496 / 739: Next Greater Element in O(N) Time
    static std::vector<int> NextGreaterElement(const std::vector<int>& nums) {
        int n = static_cast<int>(nums.size());
        std::vector<int> result(n, -1);
        std::stack<int> st; // Stores indices of monotonic decreasing elements

        for (int i = 0; i < n; ++i) {
            while (!st.empty() && nums[i] > nums[st.top()]) {
                result[st.top()] = nums[i];
                st.pop();
            }
            st.push(i);
        }
        return result;
    }
};

int main() {
    CircularQueue<int> cq(5);
    cq.Enqueue(10);
    cq.Enqueue(20);
    cq.Enqueue(30);

    int val;
    cq.Dequeue(val);
    std::cout << "Dequeued: " << val << "
";

    std::vector<int> temperatures = {73, 74, 75, 71, 69, 72, 76, 73};
    auto nge = MonotonicStackAlgorithms::NextGreaterElement(temperatures);
    std::cout << "Next Greater Temperatures: ";
    for (int x : nge) std::cout << x << " ";
    std::cout << "
";
    return 0;
}
```

### 4.2 Python 3.12 (Sliding Window Maximum via `collections.deque`)

```python
from collections import deque
from typing import List

class MonotonicQueueSolutions:
    @staticmethod
    def max_sliding_window(nums: List[int], k: int) -> List[int]:
        # LeetCode 239: Sliding Window Maximum O(N) Time, O(K) Space
        dq = deque() # Stores indices, monotonic decreasing values
        result = []
        
        for i, x in enumerate(nums):
            # 1. Remove elements outside the current window [i - k + 1, i]
            if dq and dq[0] < i - k + 1:
                dq.popleft()
                
            # 2. Maintain monotonic decreasing property
            while dq and nums[dq[-1]] <= x:
                dq.pop()
                
            dq.append(i)
            
            # 3. Append maximum of window
            if i >= k - 1:
                result.append(nums[dq[0]])
                
        return result

if __name__ == "__main__":
    nums = [1, 3, -1, -3, 5, 3, 6, 7]
    print("Sliding Window Max (K=3):", MonotonicQueueSolutions.max_sliding_window(nums, 3))
```

### 4.3 C# (.NET 8 Min Stack with $\mathcal{O}(1)$ `GetMin`)

```csharp
using System;
using System.Collections.Generic;

public class MinStack {
    private readonly Stack<long> _stack = new();
    private long _min;

    public void Push(int val) {
        if (_stack.Count == 0) {
            _stack.Push(0);
            _min = val;
        } else {
            long diff = (long)val - _min;
            _stack.Push(diff);
            if (diff < 0) {
                _min = val; // New minimum
            }
        }
    }

    public void Pop() {
        if (_stack.Count == 0) return;
        long diff = _stack.Pop();
        if (diff < 0) {
            _min = _min - diff; // Restore previous minimum
        }
    }

    public int Top() {
        long diff = _stack.Peek();
        if (diff > 0) return (int)(_min + diff);
        return (int)_min;
    }

    public int GetMin() => (int)_min;
}

public class Program {
    public static void Main() {
        var minStack = new MinStack();
        minStack.Push(-2);
        minStack.Push(0);
        minStack.Push(-3);
        Console.WriteLine($"Current Min: {minStack.GetMin()} (Expected: -3)");
        minStack.Pop();
        Console.WriteLine($"Top: {minStack.Top()} (Expected: 0)");
        Console.WriteLine($"Current Min: {minStack.GetMin()} (Expected: -2)");
    }
}
```

---

## 5. Các Bẫy Thường Gặp & Chiến lược Phỏng vấn

1. **Monotonic Stack Boundary Violations**:
   - Khi tính toán diện tích hình chữ nhật lớn nhất trong biểu đồ cột (Largest Rectangle in Histogram), cần thêm các cột ảo có chiều cao $0$ vào hai đầu mảng để đảm bảo tất cả các phần tử còn sót lại trong stack đều được giải phóng hoàn toàn.
2. **Double-Ended Queue Slicing Overhead**:
   - Trong Python, `list.pop(0)` tốn $\mathcal{O}(N)$ thời gian do phải dịch toàn bộ mảng sang trái. Luôn sử dụng `collections.deque.popleft()`, hoạt động trong $\mathcal{O}(1)$ thông qua danh sách các khối bộ nhớ liên kết đôi.

---

## 🔗 Graph-Linked Knowledge Base
- 📖 Monotonic Stack Deep Guide: Monotonic Stack Deep Guide
- 📖 Deque Deep Guide: Deque Deep Guide
- 💬 Interview Q&A: Monotonic Stack Q&A
- 📝 Module Exam: Stack & Queue Exam
