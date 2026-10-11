---
title: "3.Longest-Substring-Without-Repeating-Characters"
tags: [dsa, problem-solving, leetcode, learning-note]
---

# 📌 LeetCode: 3.Longest-Substring-Without-Repeating-Characters

## 📋 Problem Statement

---


title: "LeetCode 3: Longest Substring Without Repeating Characters — Engineering & Algorithmic Solution Note"
problem_number: 3
problem_name: "Longest Substring Without Repeating Characters"
difficulty: "Medium"
category: "dsa_solutions"
tags: [leetcode-3, longest-substring, sliding-window, hash-set, two-pointers, string, medium, csharp, dotnet9, dsa, problem-solving, leetcode, learning-note]
---

# 📘 LeetCode 3: Longest Substring Without Repeating Characters

## 📌 Connected Resource Graph
- 🟢 **Primary Theory Note**: [[01_DSA/01_theory_and_patterns/01_Arrays/04_sliding_window_maximum_minimum_fixed_variable.md]]
- 🟡 **Hash Tables & Sets**: [[01_DSA/01_theory_and_patterns/05_Hashing/00_overview_hash_tables_dictionary_hashmap.md]]
- 📂 **Local Project Companion Files**:
  - 💻 [`Program.cs`](file:///D:/learning/quartz/content/04_dsa_solutions/leetcode_solutions/3.Longest-Substring-Without-Repeating-Characters/Program.cs)
  - ⚡ [`complexity.md`](file:///D:/learning/quartz/content/04_dsa_solutions/leetcode_solutions/3.Longest-Substring-Without-Repeating-Characters/complexity.md)
  - 🚨 [`tips.md`](file:///D:/learning/quartz/content/04_dsa_solutions/leetcode_solutions/3.Longest-Substring-Without-Repeating-Characters/tips.md)

---

## 1. 🎯 Problem Statement & Constraints

Given a string `s`, find the length of the **longest substring** without repeating characters.

### Examples

**Example 1:**
```text
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

**Example 2:**
```text
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

**Example 3:**
```text
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

### Constraints
- $0 \le \text{s.length} \le 5 \times 10^4$
- `s` consists of English letters, digits, symbols and spaces.

---

## 2. 💡 Optimal Implementation (C# Sliding Window)

```csharp
public static int LengthOfLongestSubstring(string s)
{
    if (string.IsNullOrEmpty(s)) return 0;

    var charIndexMap = new Dictionary<char, int>();
    int maxLength = 0;
    int left = 0;

    for (int right = 0; right < s.Length; right++)
    {
        char c = s[right];
        if (charIndexMap.TryGetValue(c, out int lastIndex) && lastIndex >= left)
        {
            left = lastIndex + 1; // Jump left pointer past last duplicate
        }

        charIndexMap[c] = right;
        maxLength = Math.Max(maxLength, right - left + 1);
    }

    return maxLength;
}
```

---

## 💡 Multi-Solution Analysis

---


title: "Complexity Analysis — LeetCode 3: Longest Substring Without Repeating Characters"
tags: [leetcode-3, longest-substring, complexity, big-o, sliding-window, dsa, problem-solving, leetcode, learning-note]
---

# ⚡ Complexity Analysis — LeetCode 3: Longest Substring Without Repeating Characters

## 1. Asymptotic Comparison Matrix

| Approach | Time Complexity | Space Complexity | Notes |
| :--- | :--- | :--- | :--- |
| **Brute Force (Substrings + Set Check)** | $\mathcal{O}(N^3)$ | $\mathcal{O}(\min(N, \Sigma))$ | Extremely slow, TLE |
| **Basic Sliding Window (`left++`)** | $\mathcal{O}(2N) = \mathcal{O}(N)$ | $\mathcal{O}(\min(N, \Sigma))$ | Each character visited at most twice |
| **Optimized Sliding Window (Index Jump)** | $\mathcal{O}(N)$ | $\mathcal{O}(\min(N, \Sigma))$ | Optimal: `left` jumps directly to `lastIndex + 1` |

where $\Sigma$ is the alphabet size (ASCII $\le 128$ or 256).

---

## 🛠️ C# Tips & Common Pitfalls

---


title: "tips"
tags: [dsa, problem-solving, leetcode, learning-note]
---

## Tips & Edge Cases

---

## 🏋️ Space to Practice

---


title: "practice"
tags: [dsa, problem-solving, leetcode, learning-note]
---

## Practice Runs
