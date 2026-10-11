---


title: "Advanced String Algorithms: Manacher's Algorithm for Palindromic Substrings"
type: "pattern_guide"
category: "dsa"
subcategory: "10_Advanced_String_Algorithms"
created_at: 2026-08-22T00:30:00+07:00
updated_at: 2026-08-22T00:30:00+07:00
tags: [dsa, manachers-algorithm, palindromes, string-processing, linear-time, dynamic-programming, algorithms, computer-science, learning-note]
---


# Advanced String Algorithms: Manacher's Algorithm for Palindromic Substrings

Finding the longest palindromic substring or counting all palindromic substrings within a string $S$ of length $N$ is a fundamental string processing problem. While the naïve expansion around centers takes $O(N^2)$ time, **Manacher's Algorithm** computes the exact palindrome radius centered at every character position in optimal $O(N)$ linear time and $O(N)$ space.

This guide provides deep algorithmic mechanics, mirror symmetry invariants, mathematical proofs of linear time execution, production C# 12 and Python 3.12 implementations, common off-by-one anti-patterns, and LeetCode variant mappings.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 String Preprocessing: Unifying Odd and Even Centers

Palindromes can be centered at a single character (odd length, e.g., `"aba"`) or between two adjacent characters (even length, e.g., `"abba"`). Manacher's Algorithm eliminates case-by-case branching by inserting a unique dummy delimiter character `#` between all characters, as well as distinct boundary sentinels `^` and `$` at the start and end of the string.

For a string $S = \text{"babad"}$:
$$T = \text{"\^\#b\#a\#b\#a\#d\#\$"}$$

- **Transformed Length**: $|T| = 2N + 3$.
- **Key Invariant**: Every palindrome in $S$ corresponds uniquely to an odd-length palindrome in $T$ centered at some index $i$.
- **Radius Radius Correspondence**: The radius $P[i]$ of the palindrome centered at $i$ in $T$ equals the exact length of the corresponding palindrome substring in original string $S$.

---

### 1.2 Mirror Symmetry & Dynamic Window Expansion

The algorithm iterates through string $T$ maintain two variables tracking the rightmost palindrome discovered so far:
1. $C$: The center of the palindrome that extends furthest to the right.
2. $R$: The right boundary index of this palindrome ($R = C + P[C]$).

For current index $i$, we compute its mirror index $i'$ relative to center $C$:
$$i' = 2C - i = C - (i - C)$$

```
String T:  ^ # a # b # a # b # a # $
Index:     0 1 2 3 4 5 6 7 8 9 0 1
                     C       i'  i       R
                     [-------|-------]
```

We evaluate three distinct structural conditions:

1. **Case 1: $i < R$ and $i + P[i'] < R$**
   The palindrome centered at $i'$ is strictly contained within the bounds $[2C - R, R]$. By mirror symmetry, the palindrome centered at $i$ is identical:
   $$P[i] = P[i']$$

2. **Case 2: $i < R$ and $i + P[i'] \ge R$**
   The palindrome centered at $i'$ extends to or beyond the left boundary of center $C$. We can guarantee that the palindrome at $i$ extends at least up to $R$:
   $$P[i] \ge R - i$$
   We initialize $P[i] = R - i$ and then attempt linear expansion beyond $R$.

3. **Case 3: $i \ge R$**
   Index $i$ lies beyond the current rightmost palindrome boundary. No symmetry guarantees apply. We initialize $P[i] = 0$ and attempt linear expansion.

```mermaid
flowchart TD
    A[Start index i from 1 to |T|-2] --> B{i < R ?}
    B -- Yes --> C["Set P[i] = min(R - i, P[2C - i])"]
    B -- No --> D["Set P[i] = 0"]
    C --> E["Expand while T[i + P[i] + 1] == T[i - P[i] - 1]"]
    D --> E
    E --> F{i + P[i] > R ?}
    F -- Yes --> G["Update C = i, R = i + P[i]"]
    F -- No --> H[Next i]
    G --> H
```

---

### 1.3 Amortized Linear Time Complexity Proof

Why is Manacher's algorithm $O(N)$ despite the inner `while` expansion loop?

- In each iteration of the inner `while` loop, the right comparison index `i + P[i] + 1` strictly increases past the current boundary $R$.
- Whenever character comparisons succeed, $R$ is incremented.
- $R$ starts at 0 and is capped at $|T| = 2N + 3$.
- Therefore, the inner `while` loop condition evaluates to `true` at most \$2N + 3$ times across the entire execution of the algorithm.
- Total character comparisons are bounded by $O(N)$, guaranteeing amortized linear runtime $O(N)$.

---

## 2. Idiomatic Code Implementations

### 2.1 C# 12 Implementation

```csharp
using System;
using System.Text;

namespace AdvancedStringAlgorithms
{
    /// <summary>
    /// Implements Manacher's Algorithm for linear time palindromic substring analysis.
    /// </summary>
    public sealed class ManacherAlgorithm
    {
        private readonly string _original;
        private readonly string _transformed;
        private readonly int[] _p;

        public ManacherAlgorithm(string input)
        {
            _original = input ?? throw new ArgumentNullException(nameof(input));
            _transformed = Preprocess(input);
            _p = new int[_transformed.Length];
            BuildPalindromeRadii();
        }

        /// <summary>
        /// Transforms string "aba" into "^#a#b#a#$".
        /// </summary>
        private static string Preprocess(string s)
        {
            if (s.Length == 0) return "^$";

            var sb = new StringBuilder(s.Length * 2 + 3);
            sb.Append('^');
            foreach (char c in s)
            {
                sb.Append('#');
                sb.Append(c);
            }
            sb.Append("#$");
            return sb.ToString();
        }

        private void BuildPalindromeRadii()
        {
            int c = 0, r = 0;
            int n = _transformed.Length;

            for (int i = 1; i < n - 1; i++)
            {
                int iMirror = 2 * c - i;

                // Use mirror symmetry if i is within right boundary r
                if (i < r)
                {
                    _p[i] = Math.Min(r - i, _p[iMirror]);
                }
                else
                {
                    _p[i] = 0;
                }

                // Attempt linear expansion around center i
                while (_transformed[i + 1 + _p[i]] == _transformed[i - 1 - _p[i]])
                {
                    _p[i]++;
                }

                // Update center and boundary if palindrome extends past r
                if (i + _p[i] > r)
                {
                    c = i;
                    r = i + _p[i];
                }
            }
        }

        /// <summary>
        /// Returns the longest palindromic substring.
        /// </summary>
        public string GetLongestPalindromicSubstring()
        {
            int maxLen = 0;
            int centerIndex = 0;

            for (int i = 1; i < _p.Length - 1; i++)
            {
                if (_p[i] > maxLen)
                {
                    maxLen = _p[i];
                    centerIndex = i;
                }
            }

            int start = (centerIndex - maxLen) / 2;
            return _original.Substring(start, maxLen);
        }

        /// <summary>
        /// Returns total count of palindromic substrings in the string.
        /// </summary>
        public long CountAllPalindromicSubstrings()
        {
            long count = 0;
            for (int i = 1; i < _p.Length - 1; i++)
            {
                // Each center i contributes (P[i] + 1) / 2 palindromes to original string
                count += (_p[i] + 1) / 2;
            }
            return count;
        }

        /// <summary>
        /// Checks if substring original[start..end] is a palindrome in O(1).
        /// </summary>
        public bool IsPalindrome(int start, int end)
        {
            if (start < 0 || end >= _original.Length || start > end) return false;

            int len = end - start + 1;
            // Map original start/end to center in transformed string
            int tCenter = start + end + 2;
            return _p[tCenter] >= len;
        }
    }
}
```

---

### 2.2 Python 3.12 Implementation

```python
from typing import Tuple


class Manacher:
    """Manacher's Algorithm for linear-time palindromic substring queries."""

    def __init__(self, s: str) -> None:
        self.original: str = s
        self.transformed: str = f"^#{'#'.join(s)}#$" if s else "^$"
        self.p: list[int] = [0] * len(self.transformed)
        self._build()

    def _build(self) -> None:
        c: int = 0
        r: int = 0
        n: int = len(self.transformed)

        for i in range(1, n - 1):
            i_mirror: int = 2 * c - i

            if i < r:
                self.p[i] = min(r - i, self.p[i_mirror])

            # Expand around center i
            while self.transformed[i + 1 + self.p[i]] == self.transformed[i - 1 - self.p[i]]:
                self.p[i] += 1

            # Adjust boundary
            if i + self.p[i] > r:
                c = i
                r = i + self.p[i]

    def longest_palindrome(self) -> str:
        """Returns the longest palindromic substring in O(N)."""
        if not self.original:
            return ""

        max_len: int = 0
        center_idx: int = 0

        for i in range(1, len(self.p) - 1):
            if self.p[i] > max_len:
                max_len = self.p[i]
                center_idx = i

        start: int = (center_idx - max_len) // 2
        return self.original[start : start + max_len]

    def count_palindromes(self) -> int:
        """Returns the total number of palindromic substrings in O(N)."""
        return sum((radius + 1) // 2 for radius in self.p[1:-1])

    def is_palindrome(self, start: int, end: int) -> bool:
        """Checks whether sub-range s[start:end+1] is a palindrome in O(1)."""
        if start < 0 or end >= len(self.original) or start > end:
            return False
        length: int = end - start + 1
        t_center: int = start + end + 2
        return self.p[t_center] >= length
```

---

## 3. Complexity Analysis & Memory Overhead

| Metric | Complexity | Rationale & Details |
| :--- | :--- | :--- |
| **Preprocessing Time** | $O(N)$ | String delimiter insertion takes linear time. |
| **Radius Array Construction** | $O(N)$ | Amortized proof: Right boundary $R$ increases monotonically up to \$2N + 3$. |
| **Longest Substring Query** | $O(N)$ | Single pass over array $P$ to find maximum element. |
| **Subrange Query `IsPalindrome`** | $O(1)$ | Direct array index lookup `P[start + end + 2] >= length`. |
| **Space Complexity** | $O(N)$ | \$2N + 3$ characters for transformed string $T$ and \$2N + 3$ integers for array $P$. |

### Memory Overhead Breakdown

- **C# Memory Allocations**:
  - `StringBuilder` allocation of size $(2N + 3) \times 2$ bytes (UTF-16 encoding).
  - Array `int[] P` of size $(2N + 3) \times 4$ bytes.
  - Total memory footprint for a string of length $N = 10^6$ is $\approx 12 \text{ MB}$.
- **Python Memory Overhead**:
  - Python `list` of integers requires 8 bytes per pointer + 28 bytes per integer object (unless optimized by CPython small int caching).
  - Total memory footprint for $N = 10^6$ is $\approx 24 \text{ MB}$.

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

### ❌ Anti-Pattern 1: Omission of Unique Boundary Sentinels
**Incorrect**: Transforming $S$ to `"#a#b#a#"` without boundary characters `^` and `$`.
**Consequence**: The inner expansion loop `T[i + 1 + P[i]] == T[i - 1 - P[i]]` will throw an `IndexOutOfRangeException` or `IndexError` at index 0 or $|T|-1$.
**Fix**: Always wrap with distinct characters that do not appear anywhere in $S$ (e.g., `^` at start, `$` at end).

### ❌ Anti-Pattern 2: Confusing Mirror Index Formula
**Incorrect**: `int iMirror = c - i;` or `int iMirror = c - (i - c);`
**Consequence**: Incorrect symmetry index calculation leading to invalid radius bounds and wrong outputs.
**Fix**: The correct midpoint formula is $c - (i - c) = 2c - i$.

### ❌ Anti-Pattern 3: Index Mapping Off-by-One Errors
Mapping back from center index $i$ in transformed string $T$ to start position in original string $S$:

| Variable | Formula |
| :--- | :--- |
| **Original Start Index** | `start = (i - P[i]) / 2` |
| **Original Palindrome Length** | `length = P[i]` |
| **Transformed Center Index for range $[L, R]$** | `tCenter = L + R + 2` |

---

## 5. Related LeetCode Problems & Variant Patterns

### 1. LeetCode 5: Longest Palindromic Substring (Medium)
- **Problem**: Return the longest palindromic substring in $S$.
- **Application**: Direct application of `GetLongestPalindromicSubstring()` in $O(N)$ time.

### 2. LeetCode 647: Palindromic Substrings (Medium)
- **Problem**: Count total palindromic substrings in $S$.
- **Application**: Sum `(P[i] + 1) // 2` for all $i \in [1, |T|-2]$.

### 3. LeetCode 214: Shortest Palindrome (Hard)
- **Problem**: Convert string $S$ into a palindrome by adding characters in front of it.
- **Application**: Find the longest palindromic prefix of $S$. Using Manacher, find center $i$ such that $(i - P[i]) / 2 == 0$. The remaining suffix $S[P[i] \dots]$ reversed is added in front.

### 4. LeetCode 3327: Check if Digits Are Equal in String After Operations II (Hard) / Palindromic Tree (EERTREE)
- **Variant**: For dynamic palindrome queries, palindrome tree (EERTREE) or rolling hash with segment tree is preferred, but Manacher remains the benchmark for static linear queries.

---


- 🔙 **Parent Hub**: [[dsa/📚index_Docs|DSA Master Index]]
- 🔗 [[z_algorithm_string_matching|Z-Algorithm for Linear Pattern Matching]]
- 🔗 [[suffix_automaton_sam_substring_queries|Suffix Automaton (SAM) & Substring Queries]]
- 🔗 [[suffix_array_kasai_lcp_array|Suffix Array & Kasai LCP Array]]
