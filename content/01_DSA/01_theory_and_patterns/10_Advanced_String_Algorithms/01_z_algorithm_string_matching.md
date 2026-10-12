---


title: "Advanced String Algorithms: Z-Algorithm for Linear Pattern Matching"
type: "pattern_guide"
category: "dsa"
subcategory: "10_Advanced_String_Algorithms"
created_at: 2026-08-22T00:30:00+07:00
updated_at: 2026-08-22T00:30:00+07:00
tags: [dsa, z-algorithm, string-matching, longest-common-prefix, linear-time, pattern-matching, algorithms, computer-science, learning-note]
---


# Advanced String Algorithms: Z-Algorithm for Linear Pattern Matching

The **Z-Algorithm** is a powerful string processing technique that computes the **Z-array** for a string $S$ of length $N$ in $O(N)$ linear time. The Z-array stores, for each position $i$, the length of the Longest Common Prefix (LCP) between $S$ and the suffix of $S$ starting at index $i$.

Because of its conceptual simplicity compared to Knuth-Morris-Pratt (KMP) failure functions, the Z-Algorithm is the preferred choice in competitive programming for single-pattern matching, string period detection, and prefix-suffix analysis.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 Formal Definition of the Z-Array

Given a 0-indexed string $S$ of length $N$:
- $Z[i]$ is defined as the maximum integer $k$ such that $S[0 \dots k-1] == S[i \dots i + k - 1]$.
- By convention, $Z[0] = 0$ (or $N$, but 0 prevents self-matching loops in pattern search applications).

For string $S = \text{"aabaab"}$:

| Index $i$ | Character | Suffix $S[i \dots]$ | LCP with $S$ | $Z[i]$ |
| :--- | :--- | :--- | :--- | :--- |
| 0 | `a` | `"aabaab"` | N/A (Convention) | 0 |
| 1 | `a` | `"abaab"` | `"a"` | 1 |
| 2 | `b` | `"baab"` | `""` | 0 |
| 3 | `a` | `"aab"` | `"aabaab"` match `"aab"` | 3 |
| 4 | `a` | `"ab"` | `"a"` | 1 |
| 5 | `b` | `"b"` | `""` | 0 |

---

### 1.2 The Z-Box $[L, R]$ Maintenance Mechanism

The algorithm maintains a **Z-box** defined by two indices $[L, R]$, representing the interval of the rightmost substring matching a prefix of $S$ discovered so far:
$$S[L \dots R] == S[0 \dots R - L]$$

For each index $i$ from 1 to $N-1$, we compute $Z[i]$ using previously computed Z-values within $[L, R]$:

1. **Case 1: Outside current Z-box ($i > R$)**
   We have no precomputed information about position $i$. We compare $S[i + k]$ against $S[k]$ starting from $k = 0$. Once character comparisons fail at length $k$, we set $Z[i] = k$ and establish a new Z-box:
   $$L = i, \quad R = i + Z[i] - 1$$

2. **Case 2: Inside current Z-box ($i \le R$)**
   Let $k = i - L$ be the corresponding position in the prefix. By definition of the Z-box, $S[i \dots R] == S[k \dots R - L]$.
   - **Case 2a: $Z[k] < R - i + 1$**
     The match starting at $k$ does not reach or cross the right boundary $R$. By exact symmetry:
     $$Z[i] = Z[k]$$
   - **Case 2b: $Z[k] \ge R - i + 1$**
     The prefix match extends to or beyond $R$. $Z[i]$ is at least $R - i + 1$. We initialize $Z[i] = R - i + 1$ and attempt linear expansion past $R$. If $Z[i]$ grows, we update $[L, R] = [i, i + Z[i] - 1]$.

```mermaid
flowchart TD
    A[Start index i from 1 to N-1] --> B{i > R ?}
    B -- Yes --> C["Initialize Z[i] = 0"]
    B -- No --> D["k = i - L"]
    D --> E{Z[k] < R - i + 1 ?}
    E -- Yes --> F["Set Z[i] = Z[k]"]
    E -- No --> G["Set Z[i] = R - i + 1"]
    C --> H["Expand while i + Z[i] < N and S[Z[i]] == S[i + Z[i]]"]
    G --> H
    H --> I{i + Z[i] - 1 > R ?}
    I -- Yes --> J["Update L = i, R = i + Z[i] - 1"]
    I -- No --> K[Next i]
    J --> K
    F --> K
```

---

### 1.3 Exact Pattern Matching via String Concat ($P + \text{"\$"} + T$)

To find all occurrences of pattern $P$ (length $M$) inside text $T$ (length $N$):
1. Construct combined string $S = P + \text{"\$"} + T$, where `$` is a delimiter sentinel that does not appear in $P$ or $T$.
2. Compute the Z-array for $S$.
3. For any index $i \ge M + 1$:
   If $Z[i] == M$, then $P$ occurs in $T$ starting at index $i - M - 1$.

```
Pattern P = "aba", Text T = "abacaba"
Combined S = "aba$abacaba"
Indices:     01234567890
Z-Array:     00103010301
                ^    ^
                Z[4]=3 => Match at T index 4 - 3 - 1 = 0
                Z[8]=3 => Match at T index 8 - 3 - 1 = 4
```

---

## 2. Idiomatic Code Implementations

### 2.1 C# 12 Implementation

```csharp
using System;
using System.Collections.Generic;

namespace AdvancedStringAlgorithms
{
    /// <summary>
    /// Implements Z-Algorithm for linear-time prefix matching and string search.
    /// </summary>
    public sealed class ZAlgorithm
    {
        /// <summary>
        /// Computes Z-array for string s in O(N) time.
        /// </summary>
        public static int[] ComputeZArray(string s)
        {
            if (string.IsNullOrEmpty(s)) return Array.Empty<int>();

            int n = s.Length;
            int[] z = new int[n];
            int l = 0, r = 0;

            for (int i = 1; i < n; i++)
            {
                if (i <= r)
                {
                    int k = i - l;
                    z[i] = Math.Min(r - i + 1, z[k]);
                }

                // Expand linearly past current boundary
                while (i + z[i] < n && s[z[i]] == s[i + z[i]])
                {
                    z[i]++;
                }

                // Update Z-box if expanded past r
                if (i + z[i] - 1 > r)
                {
                    l = i;
                    r = i + z[i] - 1;
                }
            }

            return z;
        }

        /// <summary>
        /// Finds all 0-based starting indices of pattern in text using Z-algorithm.
        /// </summary>
        public static List<int> SearchPattern(string pattern, string text, char sentinel = '$')
        {
            var matches = new List<int>();
            if (string.IsNullOrEmpty(pattern) || string.IsNullOrEmpty(text)) return matches;

            string combined = string.Concat(pattern, sentinel, text);
            int[] z = ComputeZArray(combined);
            int m = pattern.Length;

            for (int i = m + 1; i < combined.Length; i++)
            {
                if (z[i] == m)
                {
                    matches.Add(i - m - 1);
                }
            }

            return matches;
        }
    }
}
```

---

### 2.2 Python 3.12 Implementation

```python
from typing import List


def compute_z_array(s: str) -> List[int]:
    """Computes the Z-array of string s in O(N) time."""
    n: int = len(s)
    if n == 0:
        return []

    z: List[int] = [0] * n
    l: int = 0
    r: int = 0

    for i in range(1, n):
        if i <= r:
            k: int = i - l
            z[i] = min(r - i + 1, z[k])

        # Linear expansion past current boundary
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1

        # Update Z-box bounds
        if i + z[i] - 1 > r:
            l = i
            r = i + z[i] - 1

    return z


def search_pattern(pattern: str, text: str, sentinel: str = "$") -> List[int]:
    """Returns all 0-based start indices where pattern matches text in O(N + M) time."""
    if not pattern or not text:
        return []

    combined: str = f"{pattern}{sentinel}{text}"
    z: List[int] = compute_z_array(combined)
    m: int = len(pattern)

    matches: List[int] = []
    for i in range(m + 1, len(combined)):
        if z[i] == m:
            matches.append(i - m - 1)

    return matches
```

---

## 3. Complexity Analysis & Memory Overhead

| Operation | Time Complexity | Space Complexity | Rationale |
| :--- | :--- | :--- | :--- |
| **Z-Array Construction** | $O(N)$ | $O(N)$ | Amortized proof: Right boundary $R$ increases at most $N$ times. |
| **Pattern Search ($P$ in $T$)** | $O(M + N)$ | $O(M + N)$ | Delimiter string concatenation + single Z-array pass. |
| **Period Query** | $O(1)$ | $O(1)$ | $S$ has period $k$ iff $N \pmod k == 0$ and $Z[k] == N - k$. |

### Memory Overhead Analysis

- **C# Memory Overhead**:
  - `ComputeZArray`: Single allocation `int[N]` taking $4N$ bytes.
  - `SearchPattern`: `string.Concat` creates new string of size $(M + N + 1) \times 2$ bytes.
- **Python Overhead**:
  - `compute_z_array`: Python list of size $N$ takes $\approx 8N$ bytes of memory pointers.

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

### ❌ Anti-Pattern 1: Choosing a Sentinel Present in Text/Pattern
**Incorrect**: Using `sentinel = 'a'` when matching `"abc"` in `"ababa"`.

**Consequence**: $Z[i]$ values cross the delimiter boundary into the text, producing false pattern matches or incorrect lengths.

**Fix**: Select a non-alphanumeric sentinel guaranteed not to exist in input (e.g. `$`, `#`, `\0`).

### ❌ Anti-Pattern 2: Off-by-One in Z-box Right Bound
**Incorrect**: Setting `r = i + z[i];` instead of `r = i + z[i] - 1;`.

**Consequence**: $R$ represents an inclusive right bound ($S[L \dots R]$). Miscalculating $R$ by +1 causes invalid string slicing bounds and logical bugs in `r - i + 1`.

### ❌ Anti-Pattern 3: Incorrect Match Index Offset
**Incorrect**: Pattern match starting index in $T$ computed as `i - m`.

**Consequence**: Shifts start index by 1 due to the sentinel character `$`.

**Fix**: Correct index mapping formula:
$$\text{Text Index} = i - M - 1$$

---

## 5. Related LeetCode Problems & Variant Patterns

### 1. LeetCode 28: Find Index of First Occurrence (Easy/Medium)
- **Application**: Compute Z-array for `pattern + "$" + text` and return first index where `Z[i] == len(pattern)`.

### 2. LeetCode 1392: Longest Happy Prefix (Hard)
- **Problem**: Find the longest prefix of $S$ that is also a suffix of $S$ (excluding full string).
- **Application**: Compute $Z[S]$. Find maximum $Z[i]$ such that $i + Z[i] == N$.

### 3. LeetCode 2223: Sum of Scores of Built Strings (Hard)
- **Problem**: Compute $\sum_{i=0}^{N-1} Z[i]$ where $Z[0] = N$.
- **Application**: Direct application of Z-array. Set $Z[0] = N$ and sum all elements.

---


- 🔙 **Parent Hub**: [[dsa/📚index_Docs|DSA Master Index]]
- 🔗 [[manacher_algorithm_palindromic_substrings|Manacher's Algorithm]]
- 🔗 [[trie_aho_corasick_multi_pattern_search|Aho-Corasick Multi-Pattern Search]]
- 🔗 [[suffix_array_kasai_lcp_array|Suffix Array & Kasai LCP Array]]
