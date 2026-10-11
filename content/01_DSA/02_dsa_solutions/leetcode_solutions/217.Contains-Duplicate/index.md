---
title: "217.Contains-Duplicate"
tags: [dsa, problem-solving, leetcode, learning-note]
---

# 📌 LeetCode: 217.Contains-Duplicate

## 📋 Problem Statement

---


title: "LeetCode 217: Contains Duplicate — Engineering & Algorithmic Solution Note"
problem_number: 217
problem_name: "Contains Duplicate"
difficulty: "Easy"
category: "dsa_solutions"
tags: [leetcode-217, contains-duplicate, hash-set, array, csharp, dotnet9, dsa, problem-solving, leetcode, learning-note]
---

# 📘 LeetCode 217: Contains Duplicate — Engineering & Algorithmic Solution Note

## 📌 Connected Resource Graph
- 🟢 **Primary Theory Note**: [[01_DSA/01_theory_and_patterns/05_Hashing/00_overview_hash_tables_dictionary_hashmap.md]]
- 🟡 **Topic Overview Node**: [[01_DSA/01_theory_and_patterns/01_Arrays/00_overview_array_contiguous_memory.md]]
- 🎓 **Vietnamese DSA Roadmap**: [[01_DSA/01_theory_and_patterns/Lộ trình học DSA - Nền tảng thuật toán.md]]
- 📂 **Local Project Companion Files**:
  - 💻 [`Program.cs`](file:///D:/learning/quartz/content/04_dsa_solutions/leetcode_solutions/217.Contains-Duplicate/Program.cs)
  - ⚡ [`complexity.md`](file:///D:/learning/quartz/content/04_dsa_solutions/leetcode_solutions/217.Contains-Duplicate/complexity.md)
  - 🚨 [`tips.md`](file:///D:/learning/quartz/content/04_dsa_solutions/leetcode_solutions/217.Contains-Duplicate/tips.md)
  - ✍️ [`practice.md`](file:///D:/learning/quartz/content/04_dsa_solutions/leetcode_solutions/217.Contains-Duplicate/practice.md)

---

## 1. 🎯 Problem Statement & Constraints

Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.

### Examples

**Example 1:**
```text
Input: nums = [1, 2, 3, 1]
Output: true
Explanation: The element 1 occurs at the indices 0 and 3.
```

**Example 2:**
```text
Input: nums = [1, 2, 3, 4]
Output: false
Explanation: All elements are distinct.
```

**Example 3:**
```text
Input: nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
Output: true
```

### Constraints
- $1 \le \text{nums.length} \le 10^5$
- $-10^9 \le \text{nums}[i] \le 10^9$

---

## 2. 💡 Optimal Implementation (C# Hash Set)

```csharp
public static bool ContainsDuplicate(int[] nums)
{
    var seen = new HashSet<int>(nums.Length);
    foreach (var num in nums)
    {
        if (!seen.Add(num))
        {
            return true; // Already exists!
        }
    }
    return false;
}
```

### Key Engineering Observations:
1. `HashSet<T>.Add()` returns `false` if the item is already present, allowing single-pass early termination.
2. Initializing with `new HashSet<int>(nums.Length)` prevents costly internal bucket re-allocations for large arrays.

---

## 💡 Multi-Solution Analysis

---


title: "Complexity Analysis — LeetCode 217: Contains Duplicate"
tags: [leetcode-217, contains-duplicate, complexity, big-o, hash-set, dsa, problem-solving, leetcode, learning-note]
---

# ⚡ Complexity Analysis — LeetCode 217: Contains Duplicate

## 1. Asymptotic Comparison Matrix

| Approach | Best Time | Average Time | Worst Time | Space Complexity | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Brute Force (Nested Loops)** | $\mathcal{O}(1)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(1)$ | TLE on $N = 10^5$ |
| **Sorting In-Place** | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(1)$ or $\mathcal{O}(\log N)$ | Mutates input array |
| **Hash Set (Optimal)** | $\mathcal{O}(1)$ | $\mathcal{O}(N)$ | $\mathcal{O}(N)$ | $\mathcal{O}(N)$ | Industry standard, fast lookup |

---

## 2. Deep Dive: Hash Set Tradeoffs

- **Time Complexity**: $\mathcal{O}(N)$ average time. In the worst case where duplicate is at the end or no duplicates exist, we iterate $N$ times with $\mathcal{O}(1)$ set additions.
- **Space Complexity**: $\mathcal{O}(N)$ additional memory to hold up to $N$ distinct integers in the heap.

---

## 🛠️ C# Tips & Common Pitfalls

---


title: "Interview Tips & Traps — LeetCode 217: Contains Duplicate"
tags: [leetcode-217, contains-duplicate, interview-tips, edge-cases, dsa, problem-solving, leetcode, learning-note]
---

# 🚨 Interview Tips & Traps — LeetCode 217: Contains Duplicate

## 💡 Edge Cases to Mention to Interviewer

1. **Array Length 1**: Return `false` immediately since an array with a single element cannot contain duplicates.
2. **All Elements Identical**: E.g. `[7, 7, 7, 7]`. Loop terminates immediately on index 1.
3. **Negative Numbers & Zero**: Sets properly handle sign bits and `0` without special cases.
4. **Memory-Constrained Environments**:
   > If the interviewer says: *"You cannot allocate additional $\mathcal{O}(N)$ heap memory"*, pivot to **In-Place Sorting** ($\mathcal{O}(N \log N)$ time, $\mathcal{O}(1)$ space) and check `nums[i] == nums[i-1]`.

---

## 🏋️ Space to Practice

---


title: "practice"
tags: [dsa, problem-solving, leetcode, learning-note]
---

## Practice Runs
