---


title: "11 6 median in data stream"
tags: [dsa, algorithms, computer-science, learning-note]
---

## 11.6 Median in Data Stream

### Bài toán

**LeetCode 295**: Thiết kế cấu trúc dữ liệu hỗ trợ:

- `addNum(num)` — thêm một số từ data stream.
- `findMedian()` — trả về median (trung vị) của tất cả số đã thêm.

**Ví dụ thực tế — Theo dõi lương trung vị công ty:** Công ty tuyển thêm nhân viên liên tục (data stream). Bất cứ lúc nào, HR cần biết mức lương trung vị (median) — không phải trung bình (mean). Median ít bị ảnh hưởng bởi outlier (CEO lương vài tỷ sẽ không kéo median lên).

### Median là gì?

Nếu sort mảng:

- **Số phần tử lẻ**: Median = phần tử giữa. Ví dụ `[1, 2, 3]` → median = 2.
- **Số phần tử chẵn**: Median = trung bình 2 phần tử giữa. Ví dụ `[1, 2, 3, 4]` → median = (2+3)/2 = 2.5.

### Tại sao bài này khó?

| Cách giải                          | addNum       | findMedian | Nhận xét                              |
| :--------------------------------- | :----------- | :--------- | :------------------------------------ |
| Mảng + sort mỗi lần                | O(n log n)   | O(1)       | Quá chậm khi n lớn                    |
| Mảng sorted + binary search insert | O(n)         | O(1)       | Insert vào giữa mảng tốn O(n) do dịch |
| **Two Heaps**                      | **O(log n)** | **O(1)**   | Tối ưu nhất!                          |

### Ý tưởng: Two Heaps

Dùng **2 heap** để chia dữ liệu thành 2 nửa:

- **Max Heap** (`left_half`): Chứa **nửa nhỏ hơn** của dữ liệu. Root = **lớn nhất** trong nửa nhỏ.
- **Min Heap** (`right_half`): Chứa **nửa lớn hơn** của dữ liệu. Root = **nhỏ nhất** trong nửa lớn.

**Bất biến** (invariant) cần duy trì:

1. `left_half.size == right_half.size` hoặc `left_half.size == right_half.size + 1`.
2. Mọi phần tử trong `left_half` ≤ mọi phần tử trong `right_half`.

Khi đó:

- **Số phần tử lẻ**: Median = root của `left_half` (max heap).
- **Số phần tử chẵn**: Median = (root of left_half + root of right_half) / 2.

CóKhôngCóKhôngaddNum(num)Push num vào max_heap
(nửa nhỏ)Pop max từ max_heap
Push vào min_heap
(đảm bảo max_heap root ≤ min_heap root)len(min_heap) >
len(max_heap)?Pop min từ min_heap
Push vào max_heap
(cân bằng kích thước)XongfindMedian()len(max_heap) >
len(min_heap)?Median = root
của max_heap
(số phần tử lẻ)Median = 
(root max_heap + root min_heap) / 2
(số phần tử chẵn)

### Mô phỏng chi tiết

Thêm lần lượt: `[5, 2, 8, 1, 4]`

**Bước 1: addNum(5)**

```
1. Push 5 vào max_heap: max_heap = [-5] (negate)
2. Pop max (-5→5), push vào min_heap: min_heap = [5]
   max_heap = []
3. len(min_heap)=1 > len(max_heap)=0 → cân bằng
   Pop 5 từ min_heap, push vào max_heap
   max_heap = [-5], min_heap = []

Trạng thái: max_heap = [5], min_heap = []
Median = 5 (số phần tử lẻ → root max_heap)
```

**Bước 2: addNum(2)**

```
1. Push 2 vào max_heap: max_heap = [-5, -2] → heapify → [-5, -2]
2. Pop max (-5→5), push vào min_heap: min_heap = [5]
   max_heap = [-2]
3. len(min_heap)=1 == len(max_heap)=1 → OK

Trạng thái: max_heap = [2], min_heap = [5]
Nửa nhỏ: [2], Nửa lớn: [5]
Median = (2 + 5) / 2 = 3.5
```

**Bước 3: addNum(8)**

```
1. Push 8 vào max_heap: max_heap = [-8, -2] → heapify → [-8, -2]
2. Pop max (-8→8), push vào min_heap: min_heap = [5, 8]
   max_heap = [-2]
3. len(min_heap)=2 > len(max_heap)=1 → cân bằng
   Pop 5 từ min_heap, push vào max_heap
   max_heap = [-5, -2], min_heap = [8]

Trạng thái: max_heap = [2, 5], min_heap = [8]
Nửa nhỏ: [2, 5], Nửa lớn: [8]
Median = 5 (root max_heap, số phần tử lẻ)
```

**Bước 4: addNum(1)**

```
1. Push 1 vào max_heap: max_heap = [-5, -2, -1]
2. Pop max (-5→5), push vào min_heap: min_heap = [5, 8]
   max_heap = [-2, -1]
3. len(min_heap)=2 == len(max_heap)=2 → OK

Trạng thái: max_heap = [1, 2], min_heap = [5, 8]
Nửa nhỏ: [1, 2], Nửa lớn: [5, 8]
Median = (2 + 5) / 2 = 3.5

Sorted: [1, 2, 5, 8] → median = (2+5)/2 = 3.5 ✓
```

**Bước 5: addNum(4)**

```
1. Push 4 vào max_heap: max_heap = [-4, -2, -1]
2. Pop max (-4→4), push vào min_heap: min_heap = [4, 5, 8]
   max_heap = [-2, -1]
3. len(min_heap)=3 > len(max_heap)=2 → cân bằng
   Pop 4 từ min_heap, push vào max_heap
   max_heap = [-4, -2, -1], min_heap = [5, 8]

Trạng thái: max_heap = [1, 2, 4], min_heap = [5, 8]
Nửa nhỏ: [1, 2, 4], Nửa lớn: [5, 8]
Median = 4 (root max_heap, số phần tử lẻ)

Sorted: [1, 2, 4, 5, 8] → median = 4 ✓
```

### Python code hoàn chỉnh

```python
"""
Median in Data Stream — Two Heaps Approach
LeetCode 295: Find Median from Data Stream
"""
import heapq


class MedianFinder:
    """
    Tìm median trong data stream bằng Two Heaps.

    max_heap: chứa nửa nhỏ (dùng negate trick)
    min_heap: chứa nửa lớn

    Bất biến:
    - len(max_heap) == len(min_heap) hoặc len(max_heap) == len(min_heap) + 1
    - max(max_heap) <= min(min_heap)

    Time: addNum O(log n), findMedian O(1)
    Space: O(n)
    """

    def __init__(self):
        # max_heap: nửa nhỏ — lưu giá trị âm (negate trick)
        self.max_heap = []
        # min_heap: nửa lớn — lưu giá trị dương
        self.min_heap = []

    def addNum(self, num: int) -> None:
        """Thêm số vào data stream."""
        # Bước 1: Luôn push vào max_heap trước
        heapq.heappush(self.max_heap, -num)

        # Bước 2: Đảm bảo max(max_heap) <= min(min_heap)
        # Pop max từ max_heap, push vào min_heap
        max_of_left = -heapq.heappop(self.max_heap)
        heapq.heappush(self.min_heap, max_of_left)

        # Bước 3: Cân bằng kích thước
        # max_heap được phép lớn hơn min_heap tối đa 1
        if len(self.min_heap) > len(self.max_heap):
            min_of_right = heapq.heappop(self.min_heap)
            heapq.heappush(self.max_heap, -min_of_right)

    def findMedian(self) -> float:
        """Trả về median hiện tại."""
        if len(self.max_heap) > len(self.min_heap):
            # Số phần tử lẻ → median = root của max_heap
            return -self.max_heap[0]
        else:
            # Số phần tử chẵn → median = trung bình 2 root
            return (-self.max_heap[0] + self.min_heap[0]) / 2.0

    def __repr__(self):
        left = sorted([-x for x in self.max_heap])
        right = sorted(self.min_heap)
        return f"Left(max_heap): {left} | Right(min_heap): {right}"


# ========================
#  Phiên bản nâng cao: Sliding Window Median
# ========================
class SlidingWindowMedian:
    """
    Median trong sliding window kích thước k.
    LeetCode 480: Sliding Window Median

    Ý tưởng: Two heaps + lazy deletion.
    Khi phần tử rời khỏi window, đánh dấu "cần xóa" nhưng chỉ xóa thật
    khi nó lên top của heap.

    Time: O(n log k) per window slide
    Space: O(k)
    """

    def __init__(self):
        self.max_heap = []  # Nửa nhỏ (negate)
        self.min_heap = []  # Nửa lớn
        self.delayed = {}   # Counter: phần tử cần xóa
        self.max_heap_size = 0  # Kích thước thật (trừ delayed)
        self.min_heap_size = 0

    def _prune(self, heap, is_max_heap):
        """Xóa các phần tử đã bị đánh dấu ở top heap."""
        while heap:
            val = -heap[0] if is_max_heap else heap[0]
            if val in self.delayed and self.delayed[val] > 0:
                self.delayed[val] -= 1
                if self.delayed[val] == 0:
                    del self.delayed[val]
                heapq.heappop(heap)
            else:
                break

    def _balance(self):
        """Cân bằng kích thước 2 heap."""
        if self.max_heap_size > self.min_heap_size + 1:
            val = -heapq.heappop(self.max_heap)
            heapq.heappush(self.min_heap, val)
            self.max_heap_size -= 1
            self.min_heap_size += 1
            self._prune(self.max_heap, True)
        elif self.min_heap_size > self.max_heap_size:
            val = heapq.heappop(self.min_heap)
            heapq.heappush(self.max_heap, -val)
            self.min_heap_size -= 1
            self.max_heap_size += 1
            self._prune(self.min_heap, False)

    def add(self, num):
        """Thêm phần tử vào window."""
        if not self.max_heap or num <= -self.max_heap[0]:
            heapq.heappush(self.max_heap, -num)
            self.max_heap_size += 1
        else:
            heapq.heappush(self.min_heap, num)
            self.min_heap_size += 1
        self._balance()

    def remove(self, num):
        """Đánh dấu phần tử cần xóa (lazy deletion)."""
        self.delayed[num] = self.delayed.get(num, 0) + 1
        if num <= -self.max_heap[0]:
            self.max_heap_size -= 1
        else:
            self.min_heap_size -= 1
        self._balance()
        self._prune(self.max_heap, True)
        self._prune(self.min_heap, False)

    def find_median(self):
        """Trả về median của window hiện tại."""
        if self.max_heap_size > self.min_heap_size:
            return float(-self.max_heap[0])
        return (-self.max_heap[0] + self.min_heap[0]) / 2.0


def median_sliding_window(nums, k):
    """Tìm median cho mỗi sliding window kích thước k."""
    sw = SlidingWindowMedian()
    result = []

    for i, num in enumerate(nums):
        sw.add(num)

        # Xóa phần tử rời khỏi window
        if i >= k:
            sw.remove(nums[i - k])

        # Window đủ kích thước → lấy median
        if i >= k - 1:
            result.append(sw.find_median())

    return result


# ========================
#  Test & Demo
# ========================
if __name__ == "__main__":
    print("=" * 55)
    print("TEST 1: MedianFinder — Data Stream")
    print("=" * 55)

    mf = MedianFinder()
    stream = [5, 2, 8, 1, 4]

    for num in stream:
        mf.addNum(num)
        median = mf.findMedian()
        print(f"  addNum({num}): {mf}")
        print(f"  → Median = {median}")
        print()

    print("=" * 55)
    print("TEST 2: Kiểm tra với LeetCode example")
    print("=" * 55)

    mf2 = MedianFinder()
    mf2.addNum(1)
    mf2.addNum(2)
    print(f"  [1, 2] → Median = {mf2.findMedian()}")  # 1.5
    mf2.addNum(3)
    print(f"  [1, 2, 3] → Median = {mf2.findMedian()}")  # 2.0

    print(f"
{'=' * 55}")
    print("TEST 3: Sliding Window Median")
    print("=" * 55)

    nums = [1, 3, -1, -3, 5, 3, 6, 7]
    k = 3
    result = median_sliding_window(nums, k)
    print(f"  Input: {nums}, k={k}")
    print(f"  Output: {result}")

    # Kiểm tra thủ công
    print(f"
  Kiểm tra:")
    for i in range(len(nums) - k + 1):
        window = nums[i:i+k]
        sw = sorted(window)
        m = sw[len(sw)//2] if len(sw) % 2 == 1 else (sw[len(sw)//2-1] + sw[len(sw)//2]) / 2
        print(f"    Window {window} → sorted {sw} → median {m}")

    print(f"
{'=' * 55}")
    print("TEST 4: Stress test — nhiều phần tử")
    print("=" * 55)

    import time
    import random

    mf3 = MedianFinder()
    n = 100000
    random.seed(42)

    start = time.perf_counter()
    for _ in range(n):
        mf3.addNum(random.randint(-10000, 10000))
    elapsed = time.perf_counter() - start

    print(f"  {n} addNum operations: {elapsed:.3f}s")
    print(f"  Final median: {mf3.findMedian()}")
    print(f"  Heap sizes: max_heap={len(mf3.max_heap)}, min_heap={len(mf3.min_heap)}")
```

### Chứng minh tính đúng đắn

**Tại sao thuật toán hoạt động?**

Gọi `L` = max_heap (nửa nhỏ), `R` = min_heap (nửa lớn).

**Bất biến 1**: `|L| == |R|` hoặc `|L| == |R| + 1`.

- Sau mỗi `addNum`, bước 3 đảm bảo cân bằng.

**Bất biến 2**: `max(L) ≤ min(R)`.

- Bước 2 luôn chuyển `max(L)` sang `R`, đảm bảo `max(L_mới) ≤ phần tử vừa chuyển ≤ min(R_mới)`.

**Median**:

- Nếu `|L| > |R|`: Tổng `2k+1` phần tử, L có `k+1`, R có `k`. Median = max(L) = root.
- Nếu `|L| == |R|`: Tổng `2k` phần tử, mỗi bên `k`. Median = (max(L) + min(R)) / 2 = (root_L + root_R) / 2.

### Phân tích độ phức tạp

| Phép toán  | Time         | Giải thích                                 |
| :--------- | :----------- | :----------------------------------------- |
| addNum     | **O(log n)** | 3 lần push/pop trên heap, mỗi lần O(log n) |
| findMedian | **O(1)**     | Chỉ đọc root của 1 hoặc 2 heap             |
| Space      | **O(n)**     | Lưu tất cả n phần tử đã thêm               |

### Best / Worst Case

| Case      | addNum                         | findMedian |
| :-------- | :----------------------------- | :--------- |
| Best      | O(1) — khi heap kích thước nhỏ | O(1) luôn  |
| Worst     | O(log n) — khi heap đầy        | O(1) luôn  |
| Amortized | O(log n)                       | O(1)       |

### Ưu và nhược điểm

**Ưu điểm:**

- addNum O(log n) và findMedian O(1) — rất hiệu quả
- Đơn giản, dễ hiểu, dễ triển khai
- Hoạt động trực tiếp với data stream (online algorithm)

**Nhược điểm:**

- Không hỗ trợ xóa phần tử hiệu quả (cần lazy deletion cho sliding window)
- Space O(n) — lưu tất cả phần tử, không thể giảm bớt
- Không thể tìm percentile bất kỳ (chỉ tìm median = 50th percentile)

### Cải tiến

- **Sliding Window Median** (đã implement ở trên): Dùng lazy deletion để hỗ trợ xóa phần tử khỏi window.
- **Order Statistics Tree** (Balanced BST + size): Hỗ trợ tìm phần tử thứ k trong O(log n), linh hoạt hơn two heaps.
- **Approximate Median** (Reservoir Sampling / t-digest): Khi dữ liệu quá lớn, chấp nhận sai số nhỏ để giảm space xuống O(1). Dùng trong hệ thống monitoring (Prometheus, Datadog).

------

## Tổng kết Phần 11: Heaps

### Bảng so sánh các bài toán

| Bài toán       | Loại Heap             | Time            | Space | Key Insight               |
| :------------- | :-------------------- | :-------------- | :---- | :------------------------ |
| Min/Max Heap   | Min hoặc Max          | Build O(n)      | O(n)  | Bottom-up heapify         |
| Priority Queue | Min Heap              | O(log n) per op | O(n)  | Counter trick cho FIFO    |
| Kth Largest    | Min Heap kích thước k | O(n log k)      | O(k)  | Min heap cho Kth largest! |
| Merge K Lists  | Min Heap kích thước k | O(N log k)      | O(k)  | Luôn giữ k head           |
| Top K Frequent | Min Heap kích thước k | O(n log k)      | O(k)  | Count + Heap              |
| Median Stream  | Two Heaps             | O(log n) add    | O(n)  | Max heap + Min heap       |

### Mẹo nhận diện bài Heap trong phỏng vấn

1. **"Tìm K phần tử ... nhất"** → Min/Max Heap kích thước K.
2. **"Merge nhiều danh sách sorted"** → Min Heap kích thước K (K = số list).
3. **"Data stream + median/min/max"** → Heap (có thể Two Heaps).
4. **"Priority / scheduling"** → Priority Queue.
5. **"Liên tục thêm + lấy min/max"** → Heap.

### Python `heapq` cheat sheet

```python
import heapq

# Min heap (mặc định)
heap = []
heapq.heappush(heap, 3)       # Push
heapq.heappop(heap)            # Pop min
heap[0]                         # Peek min (không pop)
heapq.heapify(arr)             # Build heap in-place — O(n)
heapq.heapreplace(heap, val)   # Pop + Push (nhanh hơn gọi riêng)
heapq.heappushpop(heap, val)   # Push + Pop (nhanh hơn gọi riêng)

# Max heap → negate trick
heapq.heappush(heap, -val)     # Push
-heapq.heappop(heap)           # Pop max (negate lại)
-heap[0]                        # Peek max

# Top K
heapq.nlargest(k, iterable)   # K phần tử lớn nhất
heapq.nsmallest(k, iterable)  # K phần tử nhỏ nhất

# Merge sorted iterables
heapq.merge(*sorted_iterables) # Merge (trả về iterator)
```

### Bài tập luyện thêm

| #    | Bài                                                          | Difficulty | Gợi ý                           |
| :--- | :----------------------------------------------------------- | :--------- | :------------------------------ |
| 1    | [LeetCode 215](https://leetcode.com/problems/kth-largest-element-in-an-array/) | Medium     | Min heap kích thước k           |
| 2    | [LeetCode 347](https://leetcode.com/problems/top-k-frequent-elements/) | Medium     | Counter + Heap hoặc Bucket Sort |
| 3    | [LeetCode 23](https://leetcode.com/problems/merge-k-sorted-lists/) | Hard       | Min heap kích thước k           |
| 4    | [LeetCode 295](https://leetcode.com/problems/find-median-from-data-stream/) | Hard       | Two heaps                       |
| 5    | [LeetCode 973](https://leetcode.com/problems/k-closest-points-to-origin/) | Medium     | Max heap kích thước k           |
| 6    | [LeetCode 480](https://leetcode.com/problems/sliding-window-median/) | Hard       | Two heaps + lazy deletion       |
| 7    | [LeetCode 703](https://leetcode.com/problems/kth-largest-element-in-a-stream/) | Easy       | Min heap kích thước k           |
| 8    | [LeetCode 378](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/) | Medium     | Min heap hoặc Binary Search     |
| 9    | [LeetCode 767](https://leetcode.com/problems/reorganize-string/) | Medium     | Max heap + greedy               |
| 10   | [LeetCode 1046](https://leetcode.com/problems/last-stone-weight/) | Easy       | Max heap                        |

------

## Giải chi tiết các bài LeetCode về Heaps / Priority Queue

Phần này mình sẽ đi sâu vào 7 bài LeetCode kinh điển nhất về Heap. Mỗi bài mình sẽ phân tích tư duy từng bước, từ cách brute force đến cách tối ưu, kèm dry run chi tiết để bạn thấy heap hoạt động thế nào trong thực tế.

------

### Bài 1: LeetCode #703 — Kth Largest Element in a Stream (Easy)

**Link:** https://leetcode.com/problems/kth-largest-element-in-a-stream/

**Difficulty:** Easy

#### Đề bài

Thiết kế một class nhận một số nguyên `k` và một mảng số nguyên `nums`. Class này có method `add(val)` — thêm phần tử `val` vào stream và trả về phần tử lớn thứ `k` hiện tại trong stream.

**Ví dụ:**

```
KthLargest(3, [4, 5, 8, 2])
add(3) → 4    # [2, 3, 4, 5, 8] → phần tử lớn thứ 3 là 4
add(5) → 5    # [2, 3, 4, 5, 5, 8] → phần tử lớn thứ 3 là 5
add(10) → 5   # [2, 3, 4, 5, 5, 8, 10] → phần tử lớn thứ 3 là 5
add(9) → 8    # [2, 3, 4, 5, 5, 8, 9, 10] → phần tử lớn thứ 3 là 8
add(4) → 8    # [2, 3, 4, 4, 5, 5, 8, 9, 10] → phần tử lớn thứ 3 là 8
```

#### Phân tích tư duy

**Bước 1: Hiểu bài toán**

Mình cần một cấu trúc dữ liệu mà sau mỗi lần thêm phần tử, có thể trả về phần tử lớn thứ k nhanh chóng. Đây là bài toán "streaming" — dữ liệu đến liên tục, không biết trước.

**Bước 2: Cách brute force**

Cách đơn giản nhất: giữ toàn bộ phần tử trong list, mỗi lần `add` thì sort lại rồi lấy phần tử thứ k từ cuối.

- Sort: O(n log n) mỗi lần add → quá chậm nếu add nhiều lần.

**Bước 3: Nhận ra pattern — "Kth Largest" → Min Heap kích thước k**

Đây là pattern cực kỳ quan trọng: **Khi cần tìm phần tử lớn thứ k, hãy dùng Min Heap có đúng k phần tử.**

Tại sao? Hãy tưởng tượng bạn có một "hàng rào" chỉ chứa k phần tử lớn nhất. Phần tử nhỏ nhất trong hàng rào đó chính là phần tử lớn thứ k. Mà phần tử nhỏ nhất trong min heap luôn nằm ở root — lấy ra O(1)!

**Bước 4: Thiết kế**

- Khởi tạo: Đưa tất cả phần tử vào min heap, rồi pop cho đến khi heap chỉ còn k phần tử.
- `add(val)`: Push `val` vào heap. Nếu heap có hơn k phần tử → pop phần tử nhỏ nhất. Root của heap chính là đáp án.

#### Lời giải

```python
import heapq

class KthLargest:
    def __init__(self, k: int, nums: list[int]):
        self.k = k
        self.heap = nums          # Dùng nums làm heap
        heapq.heapify(self.heap)  # Build min heap — O(n)

        # Giữ lại chỉ k phần tử lớn nhất
        # Pop phần tử nhỏ nhất cho đến khi còn k phần tử
        while len(self.heap) > k:
            heapq.heappop(self.heap)

    def add(self, val: int) -> int:
        heapq.heappush(self.heap, val)  # Thêm val vào heap

        # Nếu heap có hơn k phần tử → loại bỏ phần tử nhỏ nhất
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)

        # Root của min heap = phần tử nhỏ nhất trong k phần tử lớn nhất
        # = phần tử lớn thứ k
        return self.heap[0]
```

#### Dry run chi tiết

```
KthLargest(k=3, nums=[4, 5, 8, 2])

Bước khởi tạo:
  heapify([4, 5, 8, 2]) → heap = [2, 4, 8, 5]  (min heap)
  len=4 > k=3 → pop 2 → heap = [4, 5, 8]
  len=3 == k=3 → dừng

add(3):
  push 3 → heap = [3, 4, 8, 5]
  len=4 > k=3 → pop 3 → heap = [4, 5, 8]
  return heap[0] = 4 ✓

add(5):
  push 5 → heap = [4, 5, 8, 5]
  len=4 > k=3 → pop 4 → heap = [5, 5, 8]
  return heap[0] = 5 ✓

add(10):
  push 10 → heap = [5, 5, 8, 10]
  len=4 > k=3 → pop 5 → heap = [5, 8, 10]
  return heap[0] = 5 ✓

add(9):
  push 9 → heap = [5, 8, 10, 9]
  len=4 > k=3 → pop 5 → heap = [8, 9, 10]
  return heap[0] = 8 ✓

add(4):
  push 4 → heap = [4, 8, 10, 9]
  len=4 > k=3 → pop 4 → heap = [8, 9, 10]
  return heap[0] = 8 ✓
```

#### Complexity

- Time:
  - Constructor: O(n log n) trong trường hợp xấu nhất (heapify O(n) + pop n-k lần, mỗi lần O(log n))
  - `add()`: O(log k) — push + pop trên heap kích thước k
- **Space:** O(k) — chỉ giữ k phần tử trong heap

#### Sai lầm thường gặp

1. **Dùng Max Heap thay vì Min Heap** — Nhiều bạn thấy "Kth Largest" nên nghĩ Max Heap, nhưng Max Heap cho phần tử lớn nhất, không phải thứ k. Phải dùng Min Heap kích thước k!
2. **Quên xử lý trường hợp nums ban đầu có ít hơn k phần tử** — Bài cho phép len(nums) < k, khi đó heap sẽ nhỏ hơn k, và add() sẽ push mà không pop cho đến khi đủ k phần tử.
3. **Không heapify mà push từng phần tử** — Push từng phần tử O(n log n), heapify chỉ O(n).

------

### Bài 2: LeetCode #215 — Kth Largest Element in an Array (Medium)

**Link:** https://leetcode.com/problems/kth-largest-element-in-an-array/

**Difficulty:** Medium

#### Đề bài

Cho một mảng số nguyên `nums` và số nguyên `k`, trả về phần tử lớn thứ `k` trong mảng (không phải phần tử lớn thứ k distinct).

**Ví dụ:**

```
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Giải thích: Mảng sắp xếp giảm dần: [6,5,4,3,2,1], phần tử thứ 2 là 5.

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

#### Phân tích tư duy

**Bước 1: So sánh các cách tiếp cận**

Bài này là bài kinh điển có nhiều cách giải:

- **Cách 1: Sort** — Sort giảm dần, lấy phần tử thứ k-1. Đơn giản nhưng O(n log n).
- **Cách 2: Min Heap kích thước k** — Giống bài #703 nhưng chỉ 1 lần, không stream. O(n log k).
- **Cách 3: Max Heap** — Heapify toàn bộ thành max heap, pop k lần. O(n + k log n).
- **Cách 4: Quickselect** — O(n) trung bình (randomized). Nhanh nhất nhưng worst case O(n²).

**Bước 2: Chọn cách nào?**

| Approach              | Time (trung bình) | Time (worst)   | Space          |
| :-------------------- | :---------------- | :------------- | :------------- |
| Sort                  | O(n log n)        | O(n log n)     | O(1) hoặc O(n) |
| Min Heap kích thước k | O(n log k)        | O(n log k)     | O(k)           |
| Max Heap + pop k lần  | O(n + k log n)    | O(n + k log n) | O(n)           |
| Quickselect           | O(n)              | O(n²)          | O(1)           |

Trong phỏng vấn, **Min Heap kích thước k** thường là cách được mong đợi — vừa hiệu quả, vừa thể hiện hiểu biết về heap.

**Bước 3: Tại sao Min Heap kích thước k tốt hơn Max Heap?**

- Min Heap kích thước k: Space O(k), mỗi phần tử xử lý O(log k).
- Max Heap toàn bộ: Space O(n), build O(n) nhưng pop k lần mỗi lần O(log n).
- Khi k << n (ví dụ tìm top 10 trong 1 triệu phần tử), Min Heap kích thước k thắng lợi áp đảo.

#### Lời giải — Cách 1: Min Heap kích thước k

```python
import heapq

def findKthLargest(nums: list[int], k: int) -> int:
    # Tạo min heap từ k phần tử đầu tiên
    heap = nums[:k]
    heapq.heapify(heap)  # O(k)

    # Duyệt các phần tử còn lại
    for num in nums[k:]:
        if num > heap[0]:
            # num lớn hơn phần tử nhỏ nhất trong heap
            # → thay thế (heapreplace = pop + push, nhanh hơn gọi riêng)
            heapq.heapreplace(heap, num)

    # Root = phần tử nhỏ nhất trong k phần tử lớn nhất = kth largest
    return heap[0]
```

#### Lời giải — Cách 2: Quickselect (tối ưu nhất)

```python
import random

def findKthLargest(nums: list[int], k: int) -> int:
    # Kth largest = phần tử tại index (n - k) nếu mảng sorted tăng dần
    target_index = len(nums) - k

    def quickselect(left: int, right: int) -> int:
        # Chọn pivot ngẫu nhiên để tránh worst case O(n²)
        pivot_idx = random.randint(left, right)
        pivot_val = nums[pivot_idx]

        # Đưa pivot về cuối
        nums[pivot_idx], nums[right] = nums[right], nums[pivot_idx]

        # Partition: đưa tất cả phần tử < pivot về bên trái
        store_idx = left
        for i in range(left, right):
            if nums[i] < pivot_val:
                nums[store_idx], nums[i] = nums[i], nums[store_idx]
                store_idx += 1

        # Đưa pivot về đúng vị trí
        nums[store_idx], nums[right] = nums[right], nums[store_idx]

        # Pivot đã ở đúng vị trí store_idx trong mảng sorted
        if store_idx == target_index:
            return nums[store_idx]
        elif store_idx < target_index:
            # Kth largest nằm ở nửa phải
            return quickselect(store_idx + 1, right)
        else:
            # Kth largest nằm ở nửa trái
            return quickselect(left, store_idx - 1)

    return quickselect(0, len(nums) - 1)
```

#### Dry run chi tiết — Min Heap

```
nums = [3, 2, 1, 5, 6, 4], k = 2

Bước 1: heap = [3, 2] → heapify → [2, 3]
  Heap state:    2
                /
               3

Bước 2: Duyệt phần tử còn lại:
  num = 1: 1 > heap[0]=2? Không → bỏ qua
  Heap: [2, 3]

  num = 5: 5 > heap[0]=2? Có → heapreplace(heap, 5)
    Pop 2, push 5 → heap = [3, 5]
  Heap state:    3
                /
               5

  num = 6: 6 > heap[0]=3? Có → heapreplace(heap, 6)
    Pop 3, push 6 → heap = [5, 6]
  Heap state:    5
                /
               6

  num = 4: 4 > heap[0]=5? Không → bỏ qua
  Heap: [5, 6]

Kết quả: heap[0] = 5 ✓
(2 phần tử lớn nhất là [5, 6], nhỏ nhất trong đó = 5 = kth largest)
```

#### Complexity

**Min Heap kích thước k:**

- **Time:** O(k + (n-k) log k) = O(n log k) — heapify O(k), mỗi phần tử còn lại O(log k)
- **Space:** O(k)

**Quickselect:**

- **Time:** O(n) trung bình, O(n²) worst case (randomized giảm xác suất)
- **Space:** O(1) (in-place) — nhưng recursive stack O(log n) trung bình

#### Sai lầm thường gặp

1. **Dùng `heapq.nlargest(k, nums)`** — Tuy đúng kết quả nhưng mất điểm phỏng vấn vì không thể hiện hiểu biết. Interviewer muốn thấy bạn implement.
2. **Quickselect không random pivot** — Nếu pivot luôn chọn phần tử đầu hoặc cuối, worst case O(n²) với mảng sorted. Luôn dùng `random.randint()`.
3. **Nhầm index** — Kth largest trong mảng sorted tăng dần ở index `n - k`, không phải `k - 1`.

------

### Bài 3: LeetCode #347 — Top K Frequent Elements (Medium)

**Link:** https://leetcode.com/problems/top-k-frequent-elements/

**Difficulty:** Medium

#### Đề bài

Cho một mảng số nguyên `nums` và số nguyên `k`, trả về `k` phần tử xuất hiện nhiều nhất. Đáp án có thể trả về theo thứ tự bất kỳ. Đề bảo đảm đáp án là duy nhất.

**Ví dụ:**

```
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

Input: nums = [1], k = 1
Output: [1]
```

#### Phân tích tư duy

**Bước 1: Tách bài toán thành 2 phần**

1. **Đếm tần suất** — dùng hash map (Counter), mất O(n).
2. **Tìm k phần tử có tần suất cao nhất** — đây mới là phần cần tối ưu.

**Bước 2: Các cách tiếp cận cho phần 2**

| Cách                  | Ý tưởng                     | Time           | Space |
| :-------------------- | :-------------------------- | :------------- | :---- |
| Sort theo frequency   | Sort Counter, lấy top k     | O(n log n)     | O(n)  |
| Max Heap              | Heap tất cả, pop k lần      | O(n + k log n) | O(n)  |
| Min Heap kích thước k | Giữ k phần tử freq lớn nhất | O(n log k)     | O(k)  |
| Bucket Sort           | Bucket theo frequency       | O(n)           | O(n)  |

**Bước 3: Min Heap kích thước k — tại sao?**

Min Heap kích thước k tốt khi k << n. Nhưng Bucket Sort cho O(n) — nhanh hơn!

Tuy nhiên, cả hai cách đều quan trọng trong phỏng vấn. Mình sẽ trình bày cả hai.

**Bước 4: Bucket Sort — ý tưởng**

Frequency tối đa của bất kỳ phần tử nào là `n` (mảng có n phần tử). Tạo mảng buckets kích thước `n + 1`, trong đó `buckets[f]` = danh sách phần tử có frequency `f`. Duyệt từ bucket lớn nhất xuống, gom đủ k phần tử.

#### Lời giải — Cách 1: Min Heap kích thước k

```python
import heapq
from collections import Counter

def topKFrequent(nums: list[int], k: int) -> list[int]:
    # Bước 1: Đếm tần suất — O(n)
    count = Counter(nums)
    # Ví dụ: {1: 3, 2: 2, 3: 1}

    # Bước 2: Dùng min heap kích thước k
    # Heap lưu tuple (frequency, number)
    # Min heap sẽ tự so sánh theo frequency (phần tử đầu tuple)
    heap = []
    for num, freq in count.items():
        heapq.heappush(heap, (freq, num))
        # Nếu heap vượt quá k phần tử → loại bỏ phần tử có freq nhỏ nhất
        if len(heap) > k:
            heapq.heappop(heap)

    # Bước 3: Lấy tất cả phần tử từ heap
    return [num for freq, num in heap]
```

#### Lời giải — Cách 2: Bucket Sort (tối ưu nhất)

```python
from collections import Counter

def topKFrequent(nums: list[int], k: int) -> list[int]:
    # Bước 1: Đếm tần suất — O(n)
    count = Counter(nums)

    # Bước 2: Tạo buckets
    # buckets[i] = danh sách phần tử xuất hiện đúng i lần
    n = len(nums)
    buckets = [[] for _ in range(n + 1)]
    for num, freq in count.items():
        buckets[freq].append(num)

    # Bước 3: Duyệt từ frequency lớn nhất xuống, gom đủ k phần tử
    result = []
    for freq in range(n, 0, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == k:
                return result

    return result
```

#### Dry run chi tiết — Min Heap

```
nums = [1, 1, 1, 2, 2, 3], k = 2

Bước 1: count = {1: 3, 2: 2, 3: 1}

Bước 2: Duyệt từng (num, freq):
  (1, 3): push (3, 1) → heap = [(3, 1)]
    len=1 ≤ k=2 → giữ nguyên
    Heap: [(3, 1)]

  (2, 2): push (2, 2) → heap = [(2, 2), (3, 1)]
    len=2 ≤ k=2 → giữ nguyên
    Heap state:  (2,2)
                  /
               (3,1)

  (3, 1): push (1, 3) → heap = [(1, 3), (3, 1), (2, 2)]
    len=3 > k=2 → pop min → pop (1, 3) → heap = [(2, 2), (3, 1)]
    Heap state:  (2,2)
                  /
               (3,1)

Bước 3: result = [2, 1]
(Phần tử 1 xuất hiện 3 lần, phần tử 2 xuất hiện 2 lần → top 2)

Kết quả: [2, 1] ✓ (thứ tự bất kỳ)
```

#### Dry run — Bucket Sort

```
nums = [1, 1, 1, 2, 2, 3], k = 2

Bước 1: count = {1: 3, 2: 2, 3: 1}

Bước 2: Buckets (n=6):
  Index:  0    1    2    3    4    5    6
  Value:  []  [3]  [2]  [1]  []   []   []
  Ý nghĩa: số 3 xuất hiện 1 lần, số 2 xuất hiện 2 lần, số 1 xuất hiện 3 lần

Bước 3: Duyệt từ freq=6 xuống:
  freq=6: buckets[6] = [] → bỏ qua
  freq=5: buckets[5] = [] → bỏ qua
  freq=4: buckets[4] = [] → bỏ qua
  freq=3: buckets[3] = [1] → result = [1], len=1 < k=2
  freq=2: buckets[2] = [2] → result = [1, 2], len=2 == k=2 → RETURN

Kết quả: [1, 2] ✓
```

#### Complexity

**Min Heap kích thước k:**

- **Time:** O(n) đếm + O(m log k) xây heap, trong đó m = số phần tử distinct. Tổng O(n log k) (vì m ≤ n).
- **Space:** O(n) cho Counter + O(k) cho heap = O(n)

**Bucket Sort:**

- **Time:** O(n) — đếm O(n), tạo bucket O(n), duyệt bucket O(n)
- **Space:** O(n) — Counter + buckets

#### Sai lầm thường gặp

1. **Heap lưu nhầm thứ tự tuple** — `(freq, num)` chứ không phải `(num, freq)`. Python so sánh tuple theo phần tử đầu tiên, mình cần so sánh theo frequency.
2. **Bucket Sort quên index 0** — Không phần tử nào có frequency 0, nhưng mảng vẫn cần index 0 để không bị lệch.
3. **Dùng `Counter.most_common(k)`** — Giống `nlargest`, đúng kết quả nhưng mất điểm phỏng vấn.

------

### Bài 4: LeetCode #295 — Find Median from Data Stream (Hard)

**Link:** https://leetcode.com/problems/find-median-from-data-stream/

**Difficulty:** Hard

#### Đề bài

Thiết kế một cấu trúc dữ liệu hỗ trợ hai thao tác:

- `addNum(num)` — thêm số nguyên `num` vào data stream.
- `findMedian()` — trả về median (trung vị) của tất cả phần tử đã thêm.

Median là giá trị ở giữa trong danh sách đã sắp xếp. Nếu danh sách có số lượng chẵn phần tử, median = trung bình cộng của hai phần tử ở giữa.

**Ví dụ:**

```
addNum(1)
addNum(2)
findMedian() → 1.5   # [1, 2], median = (1+2)/2
addNum(3)
findMedian() → 2.0   # [1, 2, 3], median = 2
```

#### Phân tích tư duy

**Bước 1: Cách brute force**

Giữ list, mỗi lần `addNum` thì insert đúng vị trí (binary search để tìm vị trí, insert O(n) do dịch phần tử). `findMedian` O(1). Nhưng `addNum` O(n) — quá chậm.

Hoặc: `addNum` append O(1), `findMedian` sort O(n log n) — còn chậm hơn.

**Bước 2: Insight — chia danh sách làm hai nửa**

Median chia danh sách sorted làm hai nửa bằng nhau:

- **Nửa trái** (nhỏ hơn hoặc bằng median): Mình cần biết **phần tử lớn nhất** của nửa này → **Max Heap**
- **Nửa phải** (lớn hơn hoặc bằng median): Mình cần biết **phần tử nhỏ nhất** của nửa này → **Min Heap**

```
Sorted: [1, 2, 3, 4, 5, 6]
         ←───────→  ←───────→
         Nửa trái    Nửa phải
         Max Heap    Min Heap
         max = 3     min = 4
         Median = (3 + 4) / 2 = 3.5
```

**Bước 3: Quy tắc cân bằng**

Hai heap phải có kích thước xấp xỉ bằng nhau:

- `len(max_heap) == len(min_heap)` hoặc `len(max_heap) == len(min_heap) + 1`
- Mình cho max_heap luôn bằng hoặc nhiều hơn min_heap 1 phần tử.

**Bước 4: Luồng addNum**

1. Luôn push vào max_heap trước.
2. Chuyển max(max_heap) sang min_heap (đảm bảo tất cả phần tử max_heap ≤ tất cả phần tử min_heap).
3. Nếu min_heap nhiều hơn max_heap → chuyển min(min_heap) về max_heap.

Cách này đảm bảo cả hai điều kiện: thứ tự đúng VÀ cân bằng kích thước.

#### Lời giải

```python
import heapq

class MedianFinder:
    def __init__(self):
        # max_heap: nửa trái (phần tử nhỏ hơn) — dùng negate trick vì Python chỉ có min heap
        # Lưu giá trị âm → pop min = pop giá trị lớn nhất (khi negate lại)
        self.max_heap = []  # lưu giá trị âm!

        # min_heap: nửa phải (phần tử lớn hơn) — min heap thường
        self.min_heap = []

    def addNum(self, num: int) -> None:
        # Bước 1: Push vào max_heap (negate để giả lập max heap)
        heapq.heappush(self.max_heap, -num)

        # Bước 2: Chuyển phần tử lớn nhất từ max_heap sang min_heap
        # Đảm bảo mọi phần tử trong max_heap ≤ mọi phần tử trong min_heap
        max_val = -heapq.heappop(self.max_heap)
        heapq.heappush(self.min_heap, max_val)

        # Bước 3: Cân bằng — max_heap phải có kích thước ≥ min_heap
        if len(self.min_heap) > len(self.max_heap):
            min_val = heapq.heappop(self.min_heap)
            heapq.heappush(self.max_heap, -min_val)

    def findMedian(self) -> float:
        if len(self.max_heap) > len(self.min_heap):
            # Tổng số lẻ → median = max(max_heap)
            return -self.max_heap[0]
        else:
            # Tổng số chẵn → median = trung bình max(max_heap) và min(min_heap)
            return (-self.max_heap[0] + self.min_heap[0]) / 2.0
```

#### Dry run chi tiết

```
addNum(1):
  Bước 1: push -1 vào max_heap → max_heap = [-1]
  Bước 2: pop max_heap → max_val = 1, push 1 vào min_heap
    max_heap = [], min_heap = [1]
  Bước 3: len(min_heap)=1 > len(max_heap)=0 → chuyển min(min_heap) về max_heap
    pop 1 từ min_heap, push -1 vào max_heap
    max_heap = [-1], min_heap = []

  State: max_heap = [-1] (max=1), min_heap = []

findMedian():
  len(max_heap)=1 > len(min_heap)=0 → return -(-1) = 1.0

addNum(2):
  Bước 1: push -2 vào max_heap → max_heap = [-2, -1]
  Bước 2: pop max_heap → max_val = 2, push 2 vào min_heap
    max_heap = [-1], min_heap = [2]
  Bước 3: len(min_heap)=1 == len(max_heap)=1 → OK, không cần chuyển

  State: max_heap = [-1] (max=1), min_heap = [2] (min=2)
  Ý nghĩa: nửa trái [1], nửa phải [2]

findMedian():
  len(max_heap)=1 == len(min_heap)=1 → return (-(-1) + 2) / 2 = 1.5 ✓

addNum(3):
  Bước 1: push -3 vào max_heap → max_heap = [-3, -1]
  Bước 2: pop max_heap → max_val = 3, push 3 vào min_heap
    max_heap = [-1], min_heap = [2, 3]
  Bước 3: len(min_heap)=2 > len(max_heap)=1 → chuyển min(min_heap) về max_heap
    pop 2 từ min_heap, push -2 vào max_heap
    max_heap = [-2, -1], min_heap = [3]

  State: max_heap = [-2, -1] (max=2), min_heap = [3] (min=3)
  Ý nghĩa: nửa trái [1, 2], nửa phải [3]

findMedian():
  len(max_heap)=2 > len(min_heap)=1 → return -(-2) = 2.0 ✓

addNum(4):
  Bước 1: push -4 vào max_heap → max_heap = [-4, -1, -2]
  Bước 2: pop max_heap → max_val = 4, push 4 vào min_heap
    max_heap = [-2, -1], min_heap = [3, 4]
  Bước 3: len(min_heap)=2 == len(max_heap)=2 → OK

  State: max_heap = [-2, -1] (max=2), min_heap = [3, 4] (min=3)
  Ý nghĩa: nửa trái [1, 2], nửa phải [3, 4]

findMedian():
  len(max_heap)=2 == len(min_heap)=2 → return (2 + 3) / 2 = 2.5 ✓
```

#### Complexity

- Time:
  - `addNum`: O(log n) — tối đa 3 lần push/pop trên heap, mỗi lần O(log n)
  - `findMedian`: O(1) — chỉ peek root
- **Space:** O(n) — lưu tất cả n phần tử trong hai heap

#### Sai lầm thường gặp

1. **Quên negate cho max_heap** — Python chỉ có min heap, phải lưu `-val` để giả lập max heap. Dễ quên negate khi push hoặc khi trả kết quả.
2. **Cân bằng sai thứ tự** — Phải chuyển max(max_heap) sang min_heap TRƯỚC, rồi mới cân bằng kích thước. Nếu làm ngược, có thể vi phạm thứ tự (max_heap có phần tử > min_heap).
3. **Chia cho 2 thay vì 2.0** — Trong Python 3 thì `/` đã trả float, nhưng ghi `2.0` cho rõ ràng và tránh lỗi ở ngôn ngữ khác.
4. **Không xử lý edge case khi heap rỗng** — `findMedian()` khi chưa add gì sẽ crash. Trong bài LeetCode thì đề đảm bảo sẽ `addNum` trước khi `findMedian`, nhưng trong thực tế cần check.

------

### Bài 5: LeetCode #23 — Merge k Sorted Lists (Hard)

**Link:** https://leetcode.com/problems/merge-k-sorted-lists/

**Difficulty:** Hard

#### Đề bài

Cho một mảng gồm `k` linked list, mỗi list đã được sắp xếp tăng dần. Merge tất cả thành **một** linked list sorted và trả về.

**Ví dụ:**

```
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
```

#### Phân tích tư duy

**Bước 1: Cách brute force**

Lấy tất cả giá trị ra list, sort, rồi tạo linked list mới. Time O(N log N), Space O(N) — N là tổng số node.

**Bước 2: Merge từng cặp (giống merge sort)**

Merge list 1 với list 2, rồi merge kết quả với list 3, rồi merge với list 4... Mỗi lần merge O(n), merge k lần → O(Nk) — chậm.

**Bước 3: Divide and Conquer**

Merge theo cặp: (list1, list2), (list3, list4), ... → giảm từ k list xuống k/2, rồi k/4, ... → log k rounds, mỗi round xử lý tổng N node → O(N log k).

**Bước 4: Min Heap — O(N log k)**

Ý tưởng: Tại mỗi thời điểm, mình cần chọn node nhỏ nhất trong k node đầu (head) của k list. Đây chính xác là việc Min Heap làm tốt nhất!

Luồng:

1. Push head của tất cả k list vào min heap.
2. Pop phần tử nhỏ nhất từ heap → thêm vào kết quả.
3. Nếu node vừa pop có `.next` → push `.next` vào heap.
4. Lặp cho đến khi heap rỗng.

Heap luôn chứa tối đa k phần tử → mỗi push/pop O(log k). Tổng N lần pop → O(N log k).

#### Lời giải

```python
import heapq
from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeKLists(lists: list[Optional[ListNode]]) -> Optional[ListNode]:
    # Dummy node — giúp không cần xử lý edge case khi thêm node đầu tiên
    dummy = ListNode(0)
    current = dummy

    # Min heap lưu (val, index, node)
    # index dùng để tiebreak khi 2 node có cùng val
    # (Python không so sánh được ListNode, nên cần index)
    heap = []

    # Bước 1: Push head của tất cả list vào heap
    for i, node in enumerate(lists):
        if node:  # Bỏ qua list rỗng
            heapq.heappush(heap, (node.val, i, node))

    # Bước 2: Pop phần tử nhỏ nhất, push next nếu có
    idx = len(lists)  # Counter cho index unique (tránh trùng)
    while heap:
        val, _, node = heapq.heappop(heap)

        # Thêm node vào kết quả
        current.next = node
        current = current.next

        # Nếu node có next → push vào heap
        if node.next:
            idx += 1
            heapq.heappush(heap, (node.next.val, idx, node.next))

    return dummy.next
```

#### Dry run chi tiết

```
lists = [[1,4,5], [1,3,4], [2,6]]

Bước 1: Push head của mỗi list:
  push (1, 0, Node1→4→5)
  push (1, 1, Node1→3→4)
  push (2, 2, Node2→6)
  Heap: [(1, 0, N1), (1, 1, N1), (2, 2, N2)]
         min heap → root = (1, 0, N1)

Bước 2: Pop & push next:

  Pop (1, 0, Node1→4→5) → result: 1
    Node1.next = Node4→5 → push (4, 3, Node4→5)
    Heap: [(1, 1, N1), (2, 2, N2), (4, 3, N4)]

  Pop (1, 1, Node1→3→4) → result: 1→1
    Node1.next = Node3→4 → push (3, 4, Node3→4)
    Heap: [(2, 2, N2), (4, 3, N4), (3, 4, N3)]

  Pop (2, 2, Node2→6) → result: 1→1→2
    Node2.next = Node6 → push (6, 5, Node6)
    Heap: [(3, 4, N3), (4, 3, N4), (6, 5, N6)]

  Pop (3, 4, Node3→4) → result: 1→1→2→3
    Node3.next = Node4 → push (4, 6, Node4)
    Heap: [(4, 3, N4), (6, 5, N6), (4, 6, N4)]

  Pop (4, 3, Node4→5) → result: 1→1→2→3→4
    Node4.next = Node5 → push (5, 7, Node5)
    Heap: [(4, 6, N4), (6, 5, N6), (5, 7, N5)]

  Pop (4, 6, Node4) → result: 1→1→2→3→4→4
    Node4.next = None → không push
    Heap: [(5, 7, N5), (6, 5, N6)]

  Pop (5, 7, Node5) → result: 1→1→2→3→4→4→5
    Node5.next = None → không push
    Heap: [(6, 5, N6)]

  Pop (6, 5, Node6) → result: 1→1→2→3→4→4→5→6
    Node6.next = None → không push
    Heap: [] → dừng

Kết quả: 1→1→2→3→4→4→5→6 ✓
```

#### Complexity

- **Time:** O(N log k) — N là tổng số node, mỗi node push/pop heap kích thước k mất O(log k)
- **Space:** O(k) — heap chứa tối đa k node (1 head từ mỗi list)

#### Sai lầm thường gặp

1. **Quên tiebreak index** — Khi 2 node có cùng val, Python cố so sánh phần tử thứ 2 trong tuple. Nếu đó là ListNode (không implement `__lt__`), sẽ crash: `TypeError: '<' not supported between instances of 'ListNode'`. Giải pháp: thêm index làm tiebreaker.
2. **Quên check list rỗng** — `lists` có thể chứa `None` hoặc list rỗng. Cần check `if node:` trước khi push.
3. **Tạo node mới thay vì reuse** — Không cần tạo `ListNode(val)` mới. Chỉ cần trỏ `current.next = node` — tái sử dụng node gốc, tiết kiệm memory.
4. **Dùng index cố định thay vì counter** — Nếu dùng index ban đầu (0, 1, 2) cho tất cả push, có thể trùng khi push `.next`. Dùng counter tăng dần để đảm bảo unique.

------

### Bài 6: LeetCode #373 — Find K Pairs with Smallest Sums (Medium)

**Link:** https://leetcode.com/problems/find-k-pairs-with-smallest-sums/

**Difficulty:** Medium

#### Đề bài

Cho hai mảng số nguyên `nums1` và `nums2` đã sắp xếp tăng dần, và một số nguyên `k`. Tìm `k` cặp `(u, v)` với `u` từ `nums1` và `v` từ `nums2` sao cho tổng `u + v` là nhỏ nhất. Trả về danh sách các cặp theo thứ tự tổng tăng dần.

**Ví dụ:**

```
Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
Output: [[1,2],[1,4],[1,6]]
Giải thích: Các cặp có tổng nhỏ nhất: (1,2)=3, (1,4)=5, (1,6)=7

Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
Output: [[1,1],[1,1]]
```

#### Phân tích tư duy

**Bước 1: Brute force**

Tạo tất cả cặp (u, v) → sort theo tổng → lấy k cặp đầu. Có n×m cặp, sort O(nm log(nm)) → quá chậm.

**Bước 2: Nhận xét quan trọng**

Vì cả hai mảng đều sorted, cặp nhỏ nhất chắc chắn là `(nums1[0], nums2[0])`. Cặp nhỏ thứ 2 chỉ có thể là `(nums1[0], nums2[1])` hoặc `(nums1[1], nums2[0])`.

Đây giống bài Merge K Sorted Lists! Hãy tưởng tượng:

- "List 0": (nums1[0]+nums2[0]), (nums1[0]+nums2[1]), (nums1[0]+nums2[2]), ... — tổng tăng dần
- "List 1": (nums1[1]+nums2[0]), (nums1[1]+nums2[1]), (nums1[1]+nums2[2]), ... — tổng tăng dần
- "List i": (nums1[i]+nums2[0]), (nums1[i]+nums2[1]), (nums1[i]+nums2[2]), ...

Mỗi "list" đã sorted (vì nums2 sorted), và mình cần merge k list sorted → dùng Min Heap!

**Bước 3: Tối ưu — không cần push tất cả head**

Ban đầu chỉ push `(nums1[i] + nums2[0], i, 0)` cho mỗi i. Khi pop `(sum, i, j)`, push `(nums1[i] + nums2[j+1], i, j+1)` — tức là chỉ "mở rộng" theo chiều nums2.

Thêm nữa, không cần push tất cả n head — chỉ cần push `min(n, k)` head vì mình chỉ cần k kết quả.

#### Lời giải

```python
import heapq

def kSmallestPairs(nums1: list[int], nums2: list[int], k: int) -> list[list[int]]:
    if not nums1 or not nums2:
        return []

    result = []

    # Min heap: (sum, index_in_nums1, index_in_nums2)
    heap = []

    # Bước 1: Push head của mỗi "list" — (nums1[i] + nums2[0], i, 0)
    # Chỉ push min(len(nums1), k) phần tử vì không cần nhiều hơn
    for i in range(min(len(nums1), k)):
        heapq.heappush(heap, (nums1[i] + nums2[0], i, 0))

    # Bước 2: Pop k lần (hoặc cho đến khi heap rỗng)
    while heap and len(result) < k:
        total, i, j = heapq.heappop(heap)
        result.append([nums1[i], nums2[j]])

        # Push cặp tiếp theo trong cùng "list" — (nums1[i], nums2[j+1])
        if j + 1 < len(nums2):
            heapq.heappush(heap, (nums1[i] + nums2[j + 1], i, j + 1))

    return result
```

#### Dry run chi tiết

```
nums1 = [1, 7, 11], nums2 = [2, 4, 6], k = 3

Bước 1: Push head (chỉ push min(3, 3) = 3 phần tử):
  push (1+2, 0, 0) = (3, 0, 0)    # cặp (1, 2)
  push (7+2, 1, 0) = (9, 1, 0)    # cặp (7, 2)
  push (11+2, 2, 0) = (13, 2, 0)  # cặp (11, 2)
  Heap: [(3,0,0), (9,1,0), (13,2,0)]

Bước 2:
  Lần 1: Pop (3, 0, 0) → result = [[1, 2]]
    j+1 = 1 < 3 → push (1+4, 0, 1) = (5, 0, 1)
    Heap: [(5,0,1), (9,1,0), (13,2,0)]

  Lần 2: Pop (5, 0, 1) → result = [[1, 2], [1, 4]]
    j+1 = 2 < 3 → push (1+6, 0, 2) = (7, 0, 2)
    Heap: [(7,0,2), (9,1,0), (13,2,0)]

  Lần 3: Pop (7, 0, 2) → result = [[1, 2], [1, 4], [1, 6]]
    j+1 = 3 == 3 → không push
    Heap: [(9,1,0), (13,2,0)]

  len(result) = 3 == k → dừng

Kết quả: [[1, 2], [1, 4], [1, 6]] ✓
```

#### Complexity

- **Time:** O(k log k) — push tối đa min(n, k) phần tử ban đầu, rồi pop k lần, mỗi lần push 1 phần tử. Heap kích thước tối đa min(n, k). Nếu k ≤ n thì O(k log k).
- **Space:** O(k) — heap kích thước tối đa min(n, k)

#### Sai lầm thường gặp

1. **Push tất cả n×m cặp vào heap** — Sẽ TLE (Time Limit Exceeded) với n, m lớn. Chỉ push "theo nhu cầu" — khi pop (i, j) thì mới push (i, j+1).
2. **Push cả hai hướng (i+1, j) và (i, j+1)** — Sẽ tạo cặp trùng! Ví dụ: (0,0) push (1,0) và (0,1). Sau đó (1,0) push (1,1) VÀ (0,1) cũng push (1,1) → trùng. Cách đúng: chỉ push theo 1 chiều (j+1), và ban đầu push tất cả i.
3. **Quên check mảng rỗng** — nums1 hoặc nums2 rỗng thì trả [] ngay.

------

### Bài 7: LeetCode #621 — Task Scheduler (Medium)

**Link:** https://leetcode.com/problems/task-scheduler/

**Difficulty:** Medium

#### Đề bài

Cho một mảng ký tự `tasks` đại diện cho các CPU task (A-Z) và một số nguyên `n` — cooldown giữa hai task **cùng loại**. Mỗi task mất đúng 1 unit time. CPU có thể idle (không làm gì) nếu không có task nào hợp lệ để xử lý. Tìm số unit time **tối thiểu** để hoàn thành tất cả task.

**Ví dụ:**

```
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Giải thích: A → B → idle → A → B → idle → A → B
             1    2    3     4    5    6     7    8

Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
Giải thích: Không cần cooldown → A B A B A B (hoặc bất kỳ thứ tự nào)
```

#### Phân tích tư duy

**Bước 1: Hiểu bài toán**

Mình cần sắp xếp thứ tự thực hiện task sao cho:

- Hai task cùng loại phải cách nhau ít nhất `n` unit time.
- Tổng thời gian (bao gồm idle) là nhỏ nhất.

**Bước 2: Greedy insight — luôn ưu tiên task có số lần xuất hiện nhiều nhất**

Tại sao? Task xuất hiện nhiều nhất tạo ra nhiều khoảng idle nhất. Nếu xử lý chúng trước, các task khác sẽ "lấp" vào khoảng idle, giảm tổng thời gian.

**Bước 3: Dùng Max Heap + Queue**

- **Max Heap**: Lưu số lần xuất hiện còn lại của mỗi task. Pop task có count lớn nhất.
- **Cooldown Queue**: Lưu task đang cooldown — `(thời_điểm_sẵn_sàng, count_còn_lại)`.

Mỗi unit time:

1. Tăng time.
2. Nếu task ở đầu queue đã hết cooldown → đưa lại vào heap.
3. Pop task có count lớn nhất từ heap → "thực hiện" nó (giảm count 1).
4. Nếu count còn lại > 0 → đưa vào queue với thời điểm sẵn sàng = time + n + 1.
5. Nếu cả heap và queue đều rỗng → dừng. Nếu heap rỗng nhưng queue có → CPU idle.

**Bước 4: Tại sao approach này tối ưu?**

Greedy: tại mỗi bước, mình chọn task có count lớn nhất mà sẵn sàng. Điều này tối thiểu hóa idle vì:

- Task count lớn cần nhiều "slot" nhất → xử lý sớm để phân tán chúng.
- Task count nhỏ linh hoạt hơn → dùng để lấp khoảng trống.

#### Lời giải

```python
import heapq
from collections import Counter, deque

def leastInterval(tasks: list[str], n: int) -> int:
    # Bước 1: Đếm tần suất mỗi task — O(len(tasks))
    count = Counter(tasks)

    # Bước 2: Tạo max heap từ tần suất (negate vì Python chỉ có min heap)
    # Chỉ cần lưu count, không cần lưu tên task
    max_heap = [-cnt for cnt in count.values()]
    heapq.heapify(max_heap)

    # Bước 3: Queue cooldown — lưu (thời_điểm_sẵn_sàng, count_còn_lại_đã_negate)
    cooldown_queue = deque()

    time = 0

    # Bước 4: Lặp cho đến khi không còn task nào (heap rỗng VÀ queue rỗng)
    while max_heap or cooldown_queue:
        time += 1

        # Check xem task ở đầu queue đã hết cooldown chưa
        if cooldown_queue and cooldown_queue[0][0] == time:
            ready_count = cooldown_queue.popleft()[1]
            heapq.heappush(max_heap, ready_count)

        if max_heap:
            # Lấy task có count lớn nhất (negate → pop min = max)
            neg_count = heapq.heappop(max_heap)
            remaining = neg_count + 1  # +1 vì đã negate, tương đương giảm |count| đi 1

            # Nếu task này vẫn còn lần thực hiện → đưa vào cooldown queue
            if remaining < 0:  # remaining < 0 nghĩa là |count| > 0 sau khi giảm
                cooldown_queue.append((time + n + 1, remaining))
        # else: CPU idle — time vẫn tăng nhưng không làm gì

    return time
```

#### Dry run chi tiết

```
tasks = ["A","A","A","B","B","B"], n = 2

Bước 1: count = {A: 3, B: 3}
Bước 2: max_heap = [-3, -3] (heapify)
Bước 3: cooldown_queue = []

time=1:
  Queue: [] → không có gì ready
  Heap: [-3, -3] → pop -3, remaining = -3+1 = -2
  remaining < 0 → queue.append((1+2+1, -2)) = (4, -2)
  Heap: [-3], Queue: [(4, -2)]
  >> Thực hiện task (count=3), còn lại count=2, sẵn sàng lại tại time=4

time=2:
  Queue: [(4, -2)] → 4 ≠ 2 → chưa ready
  Heap: [-3] → pop -3, remaining = -2
  remaining < 0 → queue.append((2+2+1, -2)) = (5, -2)
  Heap: [], Queue: [(4, -2), (5, -2)]
  >> Thực hiện task khác (count=3), còn lại count=2, sẵn sàng tại time=5

time=3:
  Queue: [(4, -2)] → 4 ≠ 3 → chưa ready
  Heap: [] → không có task → CPU IDLE
  Queue: [(4, -2), (5, -2)]

time=4:
  Queue: [(4, -2)] → 4 == 4 → ready! push -2 vào heap
  Heap: [-2], Queue: [(5, -2)]
  Pop -2, remaining = -1
  remaining < 0 → queue.append((4+2+1, -1)) = (7, -1)
  Heap: [], Queue: [(5, -2), (7, -1)]

time=5:
  Queue: [(5, -2)] → 5 == 5 → ready! push -2 vào heap
  Heap: [-2], Queue: [(7, -1)]
  Pop -2, remaining = -1
  remaining < 0 → queue.append((5+2+1, -1)) = (8, -1)
  Heap: [], Queue: [(7, -1), (8, -1)]

time=6:
  Queue: [(7, -1)] → 7 ≠ 6 → chưa ready
  Heap: [] → CPU IDLE

time=7:
  Queue: [(7, -1)] → 7 == 7 → ready! push -1 vào heap
  Heap: [-1], Queue: [(8, -1)]
  Pop -1, remaining = 0
  remaining == 0 → task hoàn thành, không push vào queue
  Heap: [], Queue: [(8, -1)]

time=8:
  Queue: [(8, -1)] → 8 == 8 → ready! push -1 vào heap
  Heap: [-1], Queue: []
  Pop -1, remaining = 0
  remaining == 0 → task hoàn thành
  Heap: [], Queue: []

Cả heap và queue đều rỗng → dừng!

Kết quả: time = 8 ✓
Lịch: A → B → idle → A → B → idle → A → B
```

#### Lời giải thay thế — Công thức toán

Có một cách giải bằng công thức toán, không cần simulate:

```python
from collections import Counter

def leastInterval(tasks: list[str], n: int) -> int:
    count = Counter(tasks)
    max_freq = max(count.values())

    # Đếm số task có frequency = max_freq
    num_max_freq = sum(1 for freq in count.values() if freq == max_freq)

    # Công thức: (max_freq - 1) × (n + 1) + num_max_freq
    # Giải thích:
    # - (max_freq - 1) "frame" đầy đủ, mỗi frame dài (n + 1)
    # - Frame cuối chỉ chứa num_max_freq task (những task có freq = max_freq)
    #
    # Ví dụ: A=3, B=3, n=2
    # Frame 1: A B _    (n+1 = 3 slot)
    # Frame 2: A B _    (n+1 = 3 slot)
    # Frame 3: A B      (chỉ 2 task có max_freq)
    # Tổng = 2 × 3 + 2 = 8

    formula_result = (max_freq - 1) * (n + 1) + num_max_freq

    # Edge case: nếu có quá nhiều task khác nhau, idle = 0
    # → tổng time = len(tasks) (chỉ cần xử lý hết, không cần idle)
    return max(formula_result, len(tasks))
```

**Tại sao cần `max(formula_result, len(tasks))`?**

Khi `n` nhỏ và có rất nhiều loại task khác nhau, công thức có thể cho kết quả nhỏ hơn tổng số task. Ví dụ: tasks = [A,B,C,D,E,F,G], n=1 → formula = (1-1)×2 + 7 = 7 = len(tasks). Nhưng nếu tasks = [A,A,B,C,D,E,F,G,H,I], n=1 → formula = 1×2 + 1 = 3, nhưng thực tế cần 10 unit time (đủ task lấp hết idle).

#### Complexity

**Heap + Queue:**

- **Time:** O(len(tasks) × n) trong worst case — mỗi unit time mất O(log 26) = O(1) cho heap (tối đa 26 loại task). Tổng unit time ≤ len(tasks) + idle ≤ len(tasks) × (n+1). Thực tế: O(len(tasks)) vì heap kích thước ≤ 26 → push/pop là O(1).
- **Space:** O(1) — tối đa 26 phần tử trong heap + queue (26 chữ cái)

**Công thức toán:**

- **Time:** O(len(tasks)) — đếm frequency
- **Space:** O(1) — Counter tối đa 26 key

#### Sai lầm thường gặp

1. **Quên `max(formula, len(tasks))`** — Khi idle = 0, tổng time đơn giản là len(tasks), công thức có thể cho giá trị nhỏ hơn.
2. **Nhầm cooldown** — "Cách nhau n" nghĩa là giữa 2 lần chạy cùng task có n slot. Nếu task A chạy tại time 1, task A tiếp theo chạy sớm nhất tại time 1+n+1 = n+2. Nhiều bạn nhầm thành n+1.
3. **Quên trường hợp n=0** — Khi n=0 không cần cooldown, đáp án luôn là len(tasks).
4. **Simulate sai khi heap rỗng nhưng queue còn** — Phải tiếp tục tăng time (CPU idle) cho đến khi task trong queue sẵn sàng.
