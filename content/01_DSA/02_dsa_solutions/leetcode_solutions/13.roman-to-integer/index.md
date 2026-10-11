---
title: "13.roman-to-integer"
tags: [dsa, problem-solving, leetcode, learning-note]
---

# 📌 LeetCode: 13.roman-to-integer

## 📋 Problem Statement

---


title: "LeetCode 13: Roman to Integer — Engineering & Algorithmic Solution Note"
problem_number: 13
problem_name: "Roman to Integer"
difficulty: "Easy"
category: "dsa_solutions"
tags: [leetcode-13, roman-to-integer, hash-map, string, math, csharp, dotnet9, dsa, problem-solving, leetcode, learning-note]
---

# 📘 LeetCode 13: Roman to Integer — Engineering & Algorithmic Solution Note

## 📌 Connected Resource Graph
- 🟢 **Primary Theory Note**: [[01_DSA/01_theory_and_patterns/05_Hashing/00_overview_hash_tables_dictionary_hashmap.md]]
- 🟡 **String Algorithms**: [[01_DSA/01_theory_and_patterns/02_Strings/00_overview_string_manipulation.md]]
- 📂 **Local Project Companion Files**:
  - 💻 [`Program.cs`](file:///D:/learning/quartz/content/04_dsa_solutions/leetcode_solutions/13.roman-to-integer/Program.cs)
  - ⚡ [`complexity.md`](file:///D:/learning/quartz/content/04_dsa_solutions/leetcode_solutions/13.roman-to-integer/complexity.md)
  - 🚨 [`tips.md`](file:///D:/learning/quartz/content/04_dsa_solutions/leetcode_solutions/13.roman-to-integer/tips.md)

---

## 1. 🎯 Problem Statement & Constraints

Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

| Symbol | Value |
| :--- | :--- |
| `I` | 1 |
| `V` | 5 |
| `X` | 10 |
| `L` | 50 |
| `C` | 100 |
| `D` | 500 |
| `M` | 1000 |

Usually, Roman numerals are written largest to smallest from left to right. However, when a smaller numeral appears before a larger one, subtraction applies:
- `IV` = 4, `IX` = 9
- `XL` = 40, `XC` = 90
- `CD` = 400, `CM` = 900

Given a roman numeral `s`, convert it to an integer.

### Constraints
- $1 \le \text{s.length} \le 15$
- `s` contains only the characters `('I', 'V', 'X', 'L', 'C', 'D', 'M')`.
- It is guaranteed that `s` is a valid roman numeral in the range $[1, 3999]$.

---

## 2. 💡 Optimal Implementation (C#)

```csharp
public static int RomanToInt(string s)
{
    int total = 0;
    int prevValue = 0;

    // Traverse from right to left for simple addition / subtraction logic
    for (int i = s.Length - 1; i >= 0; i--)
    {
        int currValue = s[i] switch
        {
            'I' => 1,
            'V' => 5,
            'X' => 10,
            'L' => 50,
            'C' => 100,
            'D' => 500,
            'M' => 1000,
            _ => 0
        };

        if (currValue < prevValue)
        {
            total -= currValue;
        }
        else
        {
            total += currValue;
            prevValue = currValue;
        }
    }

    return total;
}
```

---

## 💡 Multi-Solution Analysis

---


title: "complexity"
tags: [dsa, problem-solving, leetcode, learning-note]
---

## Complexity Analysis

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
