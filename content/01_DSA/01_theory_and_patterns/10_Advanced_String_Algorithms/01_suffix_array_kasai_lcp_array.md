---


title: "Advanced String Algorithms: Suffix Array & Kasai's LCP Array"
type: "pattern_guide"
category: "dsa"
subcategory: "10_Advanced_String_Algorithms"
created_at: 2026-08-22T00:30:00+07:00
updated_at: 2026-08-22T00:30:00+07:00
tags: [dsa, suffix-array, kasai-algorithm, lcp-array, string-processing, prefix-doubling, distinct-substrings, algorithms, computer-science, learning-note]
---


# Advanced String Algorithms: Suffix Array & Kasai's LCP Array

A **Suffix Array (SA)** is a sorted array of all suffixes of a string $S$. Accompanied by **Kasai's LCP Array**, it provides a space-efficient alternative to Suffix Trees and Suffix Automata for solving advanced string queries such as distinct substring counting, longest duplicate substring search, and multi-pattern matching.

This guide explores $O(N \log N)$ prefix-doubling construction, Kasai's $O(N)$ linear LCP derivation, complete production C# 12 and Python 3.12 implementations, off-by-one anti-patterns, and LeetCode problem mappings.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 Suffix Array & Prefix Doubling $O(N \log N)$

For a string $S$ of length $N$ appended with sentinel `$`:
- **Suffix Array `SA[i]`**: Stores the starting index of the $i$-th lexicographically smallest suffix.
- **Rank Array `Rank[i]`**: Stores the lexicographical rank of suffix starting at index $i$. (`Rank[SA[i]] = i`).

```
String S = "banana$"
Suffixes:
0: banana$
1: anana$
2: nana$
3: ana$
4: na$
5: a$
6: $

Sorted Suffixes (SA):
SA[0] = 6 ($)
SA[1] = 5 (a$)
SA[2] = 3 (ana$)
SA[3] = 1 (anana$)
SA[4] = 0 (banana$)
SA[5] = 4 (na$)
SA[6] = 2 (nana$)
```

#### Prefix Doubling Strategy

Instead of sorting suffixes using string comparison ($O(N^2 \log N)$), prefix doubling sorts prefix chunks of lengths $k = 1, 2, 4, 8, \dots$:

1. At iteration $k$, each suffix $i$ is represented by a tuple of ranks:
   $$\text{Tuple}(i) = (\text{Rank}_k[i], \text{Rank}_k[i + k])$$
2. Sort these 2-tuples in $O(N \log N)$ using comparison sort or $O(N)$ using Radix Sort.
3. Re-assign unique integer ranks to $\text{Rank}_{2k}[i]$ based on sorted order.
4. Repeat until all ranks are unique or $k \ge N$.

```mermaid
flowchart TD
    A[Append sentinel '$' to string S] --> B[Sort single characters k = 1 to assign initial Ranks]
    B --> C[Construct Tuples: Rank[i], Rank[i + k]]
    C --> D[Radix Sort or Pair Sort Tuples]
    D --> E[Update Ranks for length 2k]
    E --> F{All ranks distinct or 2k >= N ?}
    F -- No --> G[k = 2k] --> C
    F -- Yes --> H[Final Suffix Array SA constructed]
```

---

### 1.2 Kasai's $O(N)$ LCP Array Algorithm

The **Longest Common Prefix (LCP) Array** stores the LCP length between adjacent suffixes in `SA`:
$$\text{LCP}[i] = \text{LCP}(S[\text{SA}[i] \dots], S[\text{SA}[i-1] \dots])$$

Kasai's Algorithm constructs the LCP array in $O(N)$ time by exploiting the **Kasai Lemma**:

> **Kasai Lemma**: Let $h$ be the LCP length between the suffix starting at index $i$ and its predecessor in `SA`. When advancing from suffix $i$ to suffix $i+1$, the LCP length between suffix $i+1$ and its predecessor in `SA` is at least $h - 1$.

#### Algorithm Mechanics

1. Maintain variable $h = 0$.
2. Iterate through original string index $i = 0 \dots N-1$:
   - If $\text{Rank}[i] > 0$:
     - Find predecessor in SA: $j = \text{SA}[\text{Rank}[i] - 1]$.
     - Expand $h$ while $S[i + h] == S[j + h]$.
     - Set $\text{LCP}[\text{Rank}[i]] = h$.
     - If $h > 0$, set $h = h - 1$.

```mermaid
flowchart TD
    A[Iterate i from 0 to N-1] --> B{Rank[i] > 0 ?}
    B -- No --> C[Set LCP[0] = 0]
    B -- Yes --> D["j = SA[Rank[i] - 1]"]
    D --> E["Expand while S[i + h] == S[j + h]"]
    E --> F["Set LCP[Rank[i]] = h"]
    F --> G{h > 0 ?}
    G -- Yes --> H["h = h - 1"]
    G -- No --> I[Next i]
    H --> I
    C --> I
```

---

### 1.3 Substring Applications

1. **Distinct Substrings Count**:
   Total substrings of string length $N$ is $\frac{N(N+1)}{2}$.
   $$\text{Distinct Substrings} = \frac{N(N+1)}{2} - \sum_{i=1}^{N-1} \text{LCP}[i]$$

2. **Longest Repeating Substring**:
   The maximum value in the $\text{LCP}$ array corresponds to the length of the longest duplicate substring in $S$.

---

## 2. Idiomatic Code Implementations

### 2.1 C# 12 Implementation

```csharp
using System;
using System.Collections.Generic;

namespace AdvancedStringAlgorithms
{
    /// <summary>
    /// Implements Suffix Array construction via Prefix Doubling and Kasai's LCP algorithm.
    /// </summary>
    public sealed class SuffixArray
    {
        public string Text { get; }
        public int[] SA { get; }
        public int[] Rank { get; }
        public int[] LCP { get; }

        public SuffixArray(string text)
        {
            Text = text ?? throw new ArgumentNullException(nameof(text));
            int n = text.Length;

            SA = BuildSuffixArray(text);
            Rank = new int[n];
            for (int i = 0; i < n; i++)
            {
                Rank[SA[i]] = i;
            }

            LCP = BuildKasaiLCP(text, SA, Rank);
        }

        private static int[] BuildSuffixArray(string s)
        {
            int n = s.Length;
            int[] sa = new int[n];
            int[] rank = new int[n];
            int[] tmp = new int[n];

            for (int i = 0; i < n; i++)
            {
                sa[i] = i;
                rank[i] = s[i];
            }

            for (int k = 1; k < n; k <<= 1)
            {
                Comparison<int> comp = (i, j) =>
                {
                    if (rank[i] != rank[j])
                        return rank[i].CompareTo(rank[j]);
                    int ri = i + k < n ? rank[i + k] : -1;
                    int rj = j + k < n ? rank[j + k] : -1;
                    return ri.CompareTo(rj);
                };

                Array.Sort(sa, comp);

                tmp[sa[0]] = 0;
                for (int i = 1; i < n; i++)
                {
                    tmp[sa[i]] = tmp[sa[i - 1]] + (comp(sa[i - 1], sa[i]) < 0 ? 1 : 0);
                }

                Array.Copy(tmp, rank, n);
                if (rank[sa[n - 1]] == n - 1) break;
            }

            return sa;
        }

        private static int[] BuildKasaiLCP(string s, int[] sa, int[] rank)
        {
            int n = s.Length;
            int[] lcp = new int[n];
            int h = 0;

            for (int i = 0; i < n; i++)
            {
                if (rank[i] > 0)
                {
                    int j = sa[rank[i] - 1];
                    while (i + h < n && j + h < n && s[i + h] == s[j + h])
                    {
                        h++;
                    }
                    lcp[rank[i]] = h;
                    if (h > 0) h--;
                }
            }

            return lcp;
        }

        /// <summary>
        /// Counts total distinct substrings in O(N).
        /// </summary>
        public long CountDistinctSubstrings()
        {
            long n = Text.Length;
            long total = n * (n + 1) / 2;
            long lcpSum = 0;
            for (int i = 0; i < LCP.Length; i++)
            {
                lcpSum += LCP[i];
            }
            return total - lcpSum;
        }
    }
}
```

---

### 2.2 Python 3.12 Implementation

```python
from typing import List, Tuple


class SuffixArray:
    """Suffix Array and Kasai's LCP Array generator."""

    def __init__(self, text: str) -> None:
        self.text: str = text
        self.n: int = len(text)
        self.sa: List[int] = self._build_sa()
        self.rank: List[int] = [0] * self.n
        for i, sa_val in enumerate(self.sa):
            self.rank[sa_val] = i
        self.lcp: List[int] = self._build_kasai_lcp()

    def _build_sa(self) -> List[int]:
        n = self.n
        sa = list(range(n))
        rank = [ord(c) for c in self.text]
        tmp = [0] * n

        k = 1
        while k < n:
            sa.sort(key=lambda i: (rank[i], rank[i + k] if i + k < n else -1))
            tmp[sa[0]] = 0
            for i in range(1, n):
                prev, curr = sa[i - 1], sa[i]
                prev_tuple = (rank[prev], rank[prev + k] if prev + k < n else -1)
                curr_tuple = (rank[curr], rank[curr + k] if curr + k < n else -1)
                tmp[curr] = tmp[prev] + (1 if prev_tuple < curr_tuple else 0)

            rank = tmp[:]
            if rank[sa[-1]] == n - 1:
                break
            k <<= 1

        return sa

    def _build_kasai_lcp(self) -> List[int]:
        n = self.n
        lcp = [0] * n
        h = 0

        for i in range(n):
            if self.rank[i] > 0:
                j = self.sa[self.rank[i] - 1]
                while i + h < n and j + h < n and self.text[i + h] == self.text[j + h]:
                    h += 1
                lcp[self.rank[i]] = h
                if h > 0:
                    h -= 1

        return lcp

    def count_distinct_substrings(self) -> int:
        """Returns the number of unique substrings in O(N)."""
        total = self.n * (self.n + 1) // 2
        return total - sum(self.lcp)
```

---

## 3. Complexity Analysis & Memory Overhead

| Operation | Time Complexity | Space Complexity | Details |
| :--- | :--- | :--- | :--- |
| **Prefix Doubling SA Construction** | $O(N \log N)$ | $O(N)$ | Using comparison sort ($O(N \log^2 N)$) or Radix Sort ($O(N \log N)$). |
| **Kasai LCP Construction** | $O(N)$ | $O(N)$ | Linear scan guaranteed by Kasai Lemma ($h$ decremented at most $N$ times). |
| **Distinct Substrings Query** | $O(N)$ | $O(1)$ | Summing elements in the LCP array. |
| **Pattern Search Query** | $O(M \log N)$ | $O(1)$ | Binary search over Suffix Array for pattern length $M$. |

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

### ❌ Anti-Pattern 1: Confusing Rank and Suffix Array Maps
**Incorrect**: `int j = sa[i - 1];` inside Kasai LCP iteration.
**Consequence**: `i` is the original string position, NOT the suffix array position.
**Fix**: Obtain SA predecessor via inverse array `Rank`:
$$j = \text{SA}[\text{Rank}[i] - 1]$$

### ❌ Anti-Pattern 2: Forgetting to Decrement $h$
**Incorrect**: Omission of `if (h > 0) h--;`.
**Consequence**: Kasai's algorithm degrades to $O(N^2)$ worst-case time by re-comparing characters from scratch.

### ❌ Anti-Pattern 3: LCP Indexing Misalignment
$\text{LCP}[i]$ represents LCP between $\text{SA}[i]$ and $\text{SA}[i-1]$. Thus $\text{LCP}[0] = 0$.

---

## 5. Related LeetCode Problems & Variant Patterns

### 1. LeetCode 1044: Longest Duplicate Substring (Hard)
- **Application**: Construct SA & Kasai LCP array. The answer is the substring corresponding to $\max(\text{LCP})$.

### 2. LeetCode 1163: Last Substring in Lexicographical Order (Hard)
- **Application**: Suffix starting at $\text{SA}[N-1]$ gives the last suffix in alphabetical order.

### 3. LeetCode 1698: Number of Distinct Substrings in a String (Medium)
- **Application**: Compute $\frac{N(N+1)}{2} - \sum \text{LCP}[i]$.

---


- 🔙 **Parent Hub**: [[dsa/📚index_Docs|DSA Master Index]]
- 🔗 [[suffix_automaton_sam_substring_queries|Suffix Automaton (SAM) & Substring Queries]]
- 🔗 [[z_algorithm_string_matching|Z-Algorithm for Linear Pattern Matching]]
- 🔗 [[manacher_algorithm_palindromic_substrings|Manacher's Algorithm]]
