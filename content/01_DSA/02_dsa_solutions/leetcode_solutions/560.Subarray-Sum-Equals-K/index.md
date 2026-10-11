---
title: "560.Subarray-Sum-Equals-K"
tags: [dsa, problem-solving, leetcode, learning-note]
---

# 📌 LeetCode: 560.Subarray-Sum-Equals-K

## 📋 Problem Statement

---


title: "note"
tags: [dsa, problem-solving, leetcode, learning-note]
---

# Key Notes & Pattern Insights

## Pattern: Prefix Sum + HashMap Frequency Counter

1. **Why standard 2-Pointers / Sliding Window fails**:
   - Sliding window requires monotonic behavior (e.g., all numbers are positive, so expanding window increases sum, shrinking decreases it).
   - LeetCode 560 permits negative numbers, zeros, and negative values of $k$. Therefore, sliding window cannot decide when to shrink or expand.

2. **Mathematical Formula**:
   $$\text{sum}(i \dots j) = \text{prefixSum}[j] - \text{prefixSum}[i-1] = k$$
   $$\implies \text{prefixSum}[i-1] = \text{prefixSum}[j] - k$$

3. **Base Case `{ 0 : 1 }`**:
   - Must initialize dictionary with `{ 0 : 1 }` to handle subarrays starting at index `0` whose cumulative sum equals `k`.

---

## 💡 Multi-Solution Analysis

---


title: "complexity"
tags: [dsa, problem-solving, leetcode, learning-note]
---

# Complexity Analysis

- **Time Complexity**: $\mathcal{O}(N)$
  - Single pass through the array of length $N$.
  - Dictionary operations (`TryGetValue`, `GetValueOrDefault`, indexer assignment) take average $\mathcal{O}(1)$ time.

- **Space Complexity**: $\mathcal{O}(N)$
  - In the worst case (all prefix sums are unique), the dictionary stores at most $N + 1$ unique prefix sum entries.

---

## 🛠️ C# Tips & Common Pitfalls



---

## 🏋️ Space to Practice


