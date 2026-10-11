---


title: "01. Time & Space Complexity Analysis"
type: "concept_guide"
category: "dsa"
subcategory: "01_basics"
created_at: 2026-08-22T00:00:00+07:00
updated_at: 2026-08-22T00:00:00+07:00
tags: [dsa, complexity-analysis, big-o, time-complexity, space-complexity, master-theorem, algorithms, computer-science, learning-note]
aliases:
  - 01_time_and_space_complexity
---


# 📌 01. Time & Space Complexity Analysis

Asymptotic complexity analysis is the foundational framework for measuring algorithm performance, memory footprint, and scalability. This master document covers formal asymptotic bounds ($O, \Omega, \Theta$), Master Theorem recurrences, hardware-level CPU/memory execution dynamics, C# & Python benchmarking harnesses, and common complexity pitfalls.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 Asymptotic Bounds ($\mathbf{O}, \mathbf{\Omega}, \mathbf{\Theta}$)

1. **Big-O Notation ($\mathbf{O}$)**: Tight Upper Bound. Formal definition:
   $$f(N) = O(g(N)) \iff \exists c > 0, N_0 > 0 \text{ s.t. } \forall N \ge N_0, f(N) \le c \cdot g(N)$$
   Guarantees algorithm execution will not exceed $c \cdot g(N)$ steps in the worst case.
2. **Big-Omega Notation ($\mathbf{\Omega}$)**: Tight Lower Bound. Formal definition:
   $$f(N) = \Omega(g(N)) \iff \exists c > 0, N_0 > 0 \text{ s.t. } \forall N \ge N_0, f(N) \ge c \cdot g(N)$$
3. **Big-Theta Notation ($\mathbf{\Theta}$)**: Tight Asymptotic Bound. Holds when $f(N) = O(g(N))$ and $f(N) = \Omega(g(N))$.

```
      Execution Steps
            ^
            |       /  Upper Bound c2 * g(N) [Big-O]
            |      /
            |     /--- f(N) Exact Execution
            |    /
            |   /  Lower Bound c1 * g(N) [Big-Omega]
            +-------------------------------------> Problem Size N
```

---

### 1.2 The Master Theorem for Recurrences

For divide-and-conquer recurrences of the form:
$$T(N) = a T\left(\frac{N}{b}\right) + f(N), \quad a \ge 1, b > 1$$

Compare $f(N)$ with $N^{\log_b a}$:
1. **Case 1**: If $f(N) = O\left(N^{\log_b a - \epsilon}\right)$ for $\epsilon > 0$, then $T(N) = \Theta\left(N^{\log_b a}\right)$.
2. **Case 2**: If $f(N) = \Theta\left(N^{\log_b a} \log^k N\right)$ for $k \ge 0$, then $T(N) = \Theta\left(N^{\log_b a} \log^{k+1} N\right)$.
3. **Case 3**: If $f(N) = \Omega\left(N^{\log_b a + \epsilon}\right)$ for $\epsilon > 0$ and $a f(N/b) \le c f(N)$ for $c < 1$, then $T(N) = \Theta(f(N))$.

---

### 1.3 Hardware Execution Mechanics & Memory Overhead

- **L1/L2 Cache Locality**: Sequential memory access (Arrays) has spatial locality, triggering CPU hardware prefetchers. Pointer-based structures (`LinkedList`, `Tree`) incur L1/L2 cache misses ($100\text{--}200$ CPU cycles latency per hop).
- **Auxiliary Space vs Call Stack Overhead**:
  - Auxiliary Space: Additional heap/stack memory allocated explicitly during execution.
  - Recursion Call Stack Space: Maximum depth of recursion call stack frames, $O(D)$.

---

## 2. Idiomatic Code Implementations (C# & Python 3)

### 2.1 Benchmark & Complexity Measurement Harness (C#)

```csharp
using System;
using System.Diagnostics;

namespace DSABasics
{
    public class ComplexityHarness
    {
        // Linear Time Search O(N)
        public static int LinearSearch(int[] arr, int target)
        {
            for (int i = 0; i < arr.Length; i++)
            {
                if (arr[i] == target) return i;
            }
            return -1;
        }

        // Logarithmic Time Search O(log N)
        public static int BinarySearch(int[] arr, int target)
        {
            int low = 0, high = arr.Length - 1;
            while (low <= high)
            {
                int mid = low + (high - low) / 2;
                if (arr[mid] == target) return mid;
                if (arr[mid] < target) low = mid + 1;
                else high = mid - 1;
            }
            return -1;
        }

        public static void Main()
        {
            int n = 1_000_000;
            int[] data = new int[n];
            for (int i = 0; i < n; i++) data[i] = i;

            var sw = Stopwatch.StartNew();
            LinearSearch(data, 999_999);
            sw.Stop();
            Console.WriteLine($"[C#] O(N) Linear Search Time: {sw.Elapsed.TotalMilliseconds:F4} ms");

            sw.Restart();
            BinarySearch(data, 999_999);
            sw.Stop();
            Console.WriteLine($"[C#] O(log N) Binary Search Time: {sw.Elapsed.TotalMilliseconds:F4} ms");
        }
    }
}
```

---

### 2.2 Benchmark & Complexity Measurement Harness (Python 3)

```python
import time
from typing import List

def linear_search(arr: List[int], target: int) -> int:
    """Linear Search O(N) Time, O(1) Auxiliary Space."""
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

def binary_search(arr: List[int], target: int) -> int:
    """Binary Search O(log N) Time, O(1) Auxiliary Space."""
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

if __name__ == "__main__":
    n = 1_000_000
    data = list(range(n))

    t0 = time.perf_counter()
    linear_search(data, 999_999)
    t1 = time.perf_counter()
    print(f"[Python] O(N) Linear Search Time: {(t1 - t0) * 1000:.4f} ms")

    t0 = time.perf_counter()
    binary_search(data, 999_999)
    t1 = time.perf_counter()
    print(f"[Python] O(log N) Binary Search Time: {(t1 - t0) * 1000:.4f} ms")
```

---

## 3. Complexity Matrix & Memory Overhead

| Asymptotic Class | Operations for $N=10^6$ | Scalability Limit | Typical Algorithms |
| :--- | :--- | :--- | :--- |
| **$O(1)$** | 1 step | Unlimited | Array index lookup, Hash Map average fetch |
| **$O(\log N)$** | ~20 steps | $N \le 10^{18}$ | Binary Search, Balanced BST lookup |
| **$O(N)$** | $10^6$ steps | $N \le 10^7$ | Single loop scan, Kadane's Algorithm |
| **$O(N \log N)$** | ~$2 \times 10^7$ steps | $N \le 10^6$ | Merge Sort, Quick Sort, Priority Queue Sort |
| **$O(N^2)$** | $10^{12}$ steps (TLE!) | $N \le 5 \times 10^3$ | Nested loops, Bubble Sort, Dynamic Programming 2D Grid |
| **$O(2^N)$** | Exponential TLE | $N \le 20$ | Subset backtracking, naive Fibonacci |
| **$O(N!)$** | Factorial TLE | $N \le 11$ | Permutation generation, Traveling Salesman brute force |

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

1. **Ignoring String Concatenation Inefficiencies**:
   - ❌ **Wrong**: `string s += c` inside an $N$-length loop $\implies O(N^2)$ time due to immutable string reallocations.
   - ✅ **Correct**: Use `StringBuilder` in C# or `''.join()` in Python $\implies O(N)$ linear time.
2. **Confusing Auxiliary Space with Input Space**:
   - Array of size $N$ passed into algorithm takes $O(N)$ space, but if algorithm uses only two pointers, auxiliary space is $O(1)$.
3. **Implicit Recurrence Stack Overflow**:
   - Unbounded recursion depth $N$ without base cases causes $O(N)$ stack space overhead and `StackOverflowException`.

---

## 5. Related LeetCode Problems & Variant Patterns

| Problem | Difficulty | Category | Key Asymptotic Analysis |
| :--- | :--- | :--- | :--- |
| **LC 704**: Binary Search | Easy | Binary Search | $O(\log N)$ Time, $O(1)$ Auxiliary Space |
| **LC 53**: Maximum Subarray | Medium | Kadane's DP | $O(N)$ Time, $O(1)$ Auxiliary Space |
| **LC 1**: Two Sum | Easy | Hash Map | $O(N)$ Time trade-off for $O(N)$ Space |
| **LC 912**: Sort an Array | Medium | Merge / Quick Sort | $O(N \log N)$ Time trade-off |
| **LC 51**: N-Queens | Hard | Backtracking | $O(N!)$ Time permutation search space |

---

*This guide forms a core prerequisite node in the DSA track knowledge graph.*
