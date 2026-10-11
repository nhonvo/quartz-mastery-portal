---


title: "01. Complexity Analysis & Memory Overhead"
tags: [dsa, learning-track, algorithms, computer-science, learning-note]
aliases:
  - 01_segment_trees_fenwick_trees_lazy_propagation
---



#### Python 3 Implementation
```python
from typing import List

class FenwickTree:
    def __init__(self, n: int):
        self.n = n
        self.tree = [0] * (n + 1)

    @classmethod
    from_list = classmethod(lambda cls, arr: cls._build(arr))

    @staticmethod
    def _build(arr: List[int]) -> 'FenwickTree':
        n = len(arr)
        bit = FenwickTree(n)
        for i in range(n):
            bit.tree[i + 1] += arr[i]
            parent = (i + 1) + ((i + 1) & -(i + 1))
            if parent <= n:
                bit.tree[parent] += bit.tree[i + 1]
        return bit

    def add(self, idx: int, delta: int) -> None:
        """Add delta to 0-based index idx."""
        i = idx + 1
        while i <= self.n:
            self.tree[i] += delta
            i += i & -i

    def query_prefix(self, idx: int) -> int:
        """Return sum of elements in range [0..idx] (0-based)."""
        s = 0
        i = idx + 1
        while i > 0:
            s += self.tree[i]
            i -= i & -i
        return s

    def query_range(self, left: int, right: int) -> int:
        """Return sum of elements in range [left..right] (0-based)."""
        if left > right:
            return 0
        return self.query_prefix(right) - self.query_prefix(left - 1)


class SegmentTreeLazy:
    def __init__(self, arr: List[int]):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)
        self._build(arr, 0, 0, self.n - 1)

    def _build(self, arr: List[int], node: int, start: int, end: int) -> None:
        if start == end:
            self.tree[node] = arr[start]
            return
        mid = (start + end) // 2
        self._build(arr, 2 * node + 1, start, mid)
        self._build(arr, 2 * node + 2, mid + 1, end)
        self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]

    def _push_down(self, node: int, start: int, end: int) -> None:
        if self.lazy[node] != 0:
            mid = (start + end) // 2
            left, right = 2 * node + 1, 2 * node + 2
            val = self.lazy[node]

            self.tree[left] += val * (mid - start + 1)
            self.lazy[left] += val

            self.tree[right] += val * (end - mid)
            self.lazy[right] += val

            self.lazy[node] = 0

    def update_range(self, ql: int, qr: int, val: int) -> None:
        self._update_range(0, 0, self.n - 1, ql, qr, val)

    def _update_range(self, node: int, start: int, end: int, ql: int, qr: int, val: int) -> None:
        if ql <= start and end <= qr:
            self.tree[node] += val * (end - start + 1)
            self.lazy[node] += val
            return

        self._push_down(node, start, end)
        mid = (start + end) // 2

        if ql <= mid:
            self._update_range(2 * node + 1, start, mid, ql, qr, val)
        if qr > mid:
            self._update_range(2 * node + 2, mid + 1, end, ql, qr, val)

        self.tree[node] = self.tree[2 * node + 1] + self.tree[2 * node + 2]

    def query_range(self, ql: int, qr: int) -> int:
        return self._query_range(0, 0, self.n - 1, ql, qr)

    def _query_range(self, node: int, start: int, end: int, ql: int, qr: int) -> int:
        if ql <= start and end <= qr:
            return self.tree[node]

        self._push_down(node, start, end)
        mid = (start + end) // 2
        total = 0

        if ql <= mid:
            total += self._query_range(2 * node + 1, start, mid, ql, qr)
        if qr > mid:
            total += self._query_range(2 * node + 2, mid + 1, end, ql, qr)

        return total


if __name__ == "__main__":
    arr = [1, 3, 5, 7, 9, 11]
    bit = FenwickTree.from_list(arr)
    print(f"[Python BIT] Sum [1..3]: {bit.query_range(1, 3)}")

    seg_tree = SegmentTreeLazy(arr)
    print(f"[Python SegTree] Sum [1..4]: {seg_tree.query_range(1, 4)}")
    seg_tree.update_range(1, 3, 10)
    print(f"[Python SegTree] Sum [1..4] after +10: {seg_tree.query_range(1, 4)}")
```

---

## 📌 01. Complexity Analysis & Memory Overhead

### 3.1 Asymptotic Bounds

| Feature | Naive Array | Fenwick Tree (BIT) | Segment Tree (Point) | Segment Tree (Lazy) |
| :--- | :--- | :--- | :--- | :--- |
| **Build Time** | $O(N)$ | $O(N)$ | $O(N)$ | $O(N)$ |
| **Point Update** | $O(1)$ | $O(\log N)$ | $O(\log N)$ | $O(\log N)$ |
| **Range Query** | $O(N)$ | $O(\log N)$ | $O(\log N)$ | $O(\log N)$ |
| **Range Update** | $O(N)$ | $O(N)$ / $O(\log N)$* | $O(N)$ | $O(\log N)$ |
| **Space Overhead** | $O(N)$ | $O(N)$ flat | $O(4N)$ flat | $O(8N)$ flat (Tree + Lazy) |

*\* Note: Range Update on BIT achieves $O(\log N)$ when combining two BITs for Difference Arrays.*

### 3.2 Cache Locality & Memory Allocation
- **BIT Memory Advantage**: A BIT requires only an array of size $N+1$. It has almost zero pointer dereference overhead and optimal CPU cache spatial locality.
- **Segment Tree $4N$ Rule**: A binary tree with $N$ leaves has height $H = \lceil \log_2 N \rceil$. The total number of nodes in a full tree is at most $2^{H+1} - 1 < 4N$. Allocating $2N$ array slots will cause out-of-bounds index errors when $N$ is not a power of 2!

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

### Pitfall 1: Fenwick Tree 0-Based Indexing Infinite Loop
- ❌ **Wrong**: Passing `i = 0` to `i += i & -i` or `i -= i & -i`.
- ⚡ **Symptom**: `0 & (-0) = 0`, resulting in an **infinite loop** `0 + 0 = 0`!
- ✅ **Correct**: Always map 0-based indices to 1-based internal indices (`i = idx + 1`).

### Pitfall 2: Lazy Tag Scalar Multiplication Missing Interval Length
- ❌ **Wrong (Range Sum Query)**: Updating tree node `tree[node] += lazy[node]`.
- ✅ **Correct**: For sum segment trees, range update of value $V$ across range $[S_L, S_R]$ increases the aggregate sum by $V \times (S_R - S_L + 1)$:
  `tree[node] += val * (end - start + 1)`.

### Pitfall 3: Forgetting to Propagate Pending Lazy Tags Before Querying
- ❌ **Wrong**: Returning `tree[node]` during query without calling `PushDown(node, start, end)`.
- ⚡ **Symptom**: Returns stale / un-updated range sum results.

### Pitfall 4: Coordinate Compression Failure for Sparse Ranges
- ❌ **Wrong**: Instantiating a Segment Tree of size $N = 10^9$ directly.
- ✅ **Correct**: Use **Coordinate Compression** (mapping active query points to discrete indices \$1..M$) or dynamic node pointer Segment Trees.

---

## 5. Related LeetCode Problems & Variant Patterns

| Problem | Difficulty | Structure | Key Pattern / Formula |
| :--- | :--- | :--- | :--- |
| **LC 307**: Range Sum Query - Mutable | Medium | BIT / Segment Tree | Point Update + Range Sum Query |
| **LC 315**: Count of Smaller Numbers After Self | Hard | BIT + Coordinate Compression | Traversal from right to left with BIT counting frequency |
| **LC 715**: Range Module | Hard | Lazy Segment Tree | Dynamic interval assignment (Set bit ranges) |
| **LC 218**: The Skyline Problem | Hard | Segment Tree / BIT | Range Max Query with Coordinate Compression |
| **LC 699**: Falling Squares | Hard | Lazy Segment Tree | Range Max Assignment + Range Max Query |
