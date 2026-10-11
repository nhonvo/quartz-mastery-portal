---


title: "01.Duplicate Integer"
tags: [dsa, problem-solving, neetcode, learning-note]
---

# 📌 NeetCode 150: Contains Duplicate (01. Duplicate Integer)

- **NeetCode Link**: [Contains Duplicate - NeetCode](https://neetcode.io/problems/duplicate-integer)
- **LeetCode Link**: [LeetCode 217 - Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)
- **Difficulty**: `Easy`
- **Category**: `Arrays & Hashing`
- **Recommended Complexity**: Time: $\mathcal{O}(n)$ | Space: $\mathcal{O}(n)$
- **C# Project File**: [`01.Duplicate-Integer.csproj`](file:///D:/learning/04_dsa_solutions/neetcode_solutions/01.Duplicate-Integer/01.Duplicate-Integer.csproj)
- **C# Source Code**: [`Program.cs`](file:///D:/learning/04_dsa_solutions/neetcode_solutions/01.Duplicate-Integer/Program.cs)
- **Shared Runner Library**: [`DSA.Common`](file:///D:/learning/04_dsa_solutions/dsa_common/DsaTestRunner.cs)

---

## 📋 Problem Statement

Given an integer array `nums`, return `true` if any value appears **more than once** in the array, otherwise return `false`.

### Examples

**Example 1:**
```text
Input: nums = [1, 2, 3, 3]
Output: true
```

**Example 2:**
```text
Input: nums = [1, 2, 3, 4]
Output: false
```

### Constraints
- \$0 \le \text{nums.length} \le 10^5$
- $-10^9 \le \text{nums}[i] \le 10^9$

---

## 💡 NeetCode Hints & Strategy

> [!TIP]
> - **Hint 1**: A brute force solution would be to check every element against every other element in the array. This would be an $\mathcal{O}(n^2)$ solution. Can you think of a better way?
> - **Hint 2**: Is there a way to check if an element is a duplicate without comparing it to every other element? Maybe there's a data structure that is useful here.
> - **Hint 3**: We can use a hash data structure like a hash set or hash map to store elements we've already seen. This will allow us to check if an element is a duplicate in constant time.

---

## 🏋️ Space to Practice

### 📝 Step-by-Step Self-Solving Framework
1. **Understand Goal**: Return `true` if duplicate exists, `false` if all numbers unique.
2. **Evaluate Constraints**: $N \le 10^5 \implies \mathcal{O}(N^2)$ brute force will TLE on large arrays.
3. **Select Data Structure**: Hash Set allows $\mathcal{O}(1)$ insertion & lookup.
4. **Draft Pseudocode**:
   ```text
   seen = empty set
   for each x in nums:
       if x is in seen:
           return true
       add x to seen
   return false
   ```

### 💻 My C# Code Scratchpad
```csharp
public static bool UserSolution(int[] nums)
{
    // Write your solution here!
    return false;
}
```

---

## 🧪 Test Cases & Benchmark Matrix

| Case # | Input `nums` | Expected Output | Type | Goal Time | Goal Memory |
| :---: | :--- | :---: | :--- | :---: | :---: |
| **1** | `[1, 2, 3, 3]` | `true` | Standard Duplicate | $< 1\text{ ms}$ | Minimal |
| **2** | `[1, 2, 3, 4]` | `false` | All Unique | $< 1\text{ ms}$ | $\mathcal{O}(N)$ set alloc |
| **3** | `[1, 1, 1, 3, 3, 4]` | `true` | Multiple Duplicates | $< 1\text{ ms}$ | Early return |
| **4** | `[]` | `false` | Empty Array | $< 0.1\text{ ms}$ | $0\text{ B}$ |
| **5** | `[7]` | `false` | Single Element | $< 0.1\text{ ms}$ | Minimal |
| **6** | `[-1, -2, -3, -1]` | `true` | Negative Numbers | $< 1\text{ ms}$ | Minimal |

---

## 💡 Multi-Solution Analysis (Deep Step-by-Step Explanations)

### Approach 1: HashSet (Optimal Solution) ⭐

#### Intuition & Concept
A **Hash Set** maintains unique elements with $\mathcal{O}(1)$ average lookup and insertion time. As we iterate through `nums`, we query the set to see if the element was seen previously.

#### Step-by-Step Solving Logic
1. **Initialize Set**: Create `HashSet<int> seen`.
2. **Iterate Array**: Loop over each integer `num` in `nums`.
3. **Add & Check**: In C#, `seen.Add(num)` returns `false` if `num` is **already present** in `seen`.
4. **Early Exit**: If `seen.Add(num)` returns `false`, return `true` immediately.
5. **Completion**: If loop completes, return `false`.

#### C# Source Code
```csharp
public static bool Reference_HashSet(int[] nums)
{
    HashSet<int> seen = new HashSet<int>();
    foreach (int num in nums)
    {
        if (!seen.Add(num)) return true;
    }
    return false;
}
```

#### Complexity Analysis
- **Time Complexity**: $\mathcal{O}(N)$ — Single pass; $\mathcal{O}(1)$ average set insertion.
- **Space Complexity**: $\mathcal{O}(N)$ — Up to $N$ elements stored in set in worst case.

---

### Approach 2: Sorting (Alternative Solution)

#### Intuition & Concept
Sorting rearranges elements into ascending order. Any duplicate values will sit adjacent to each other.

#### Step-by-Step Solving Logic
1. **Base Case**: If `nums.Length <= 1`, return `false`.
2. **Sort**: Call `Array.Sort(nums)`.
3. **Compare Neighbors**: Loop $i$ from `1` to `nums.Length - 1`. If `nums[i] == nums[i - 1]`, return `true`.
4. **Completion**: Return `false`.

#### C# Source Code
```csharp
public static bool Reference_Sorting(int[] nums)
{
    if (nums.Length <= 1) return false;
    Array.Sort(nums);
    for (int i = 1; i < nums.Length; i++)
    {
        if (nums[i] == nums[i - 1]) return true;
    }
    return false;
}
```

#### Complexity Analysis
- **Time Complexity**: $\mathcal{O}(N \log N)$ — Sorting dominates.
- **Space Complexity**: $\mathcal{O}(1)$ auxiliary space if sorted in-place.

---

### Approach 3: Brute Force (Naive Baseline)

#### Intuition & Concept
Compare all pairs $(i, j)$ where $i < j$.

#### Step-by-Step Solving Logic
1. Loop $i$ from $0$ to $N - 1$.
2. Loop $j$ from $i + 1$ to $N - 1$.
3. If `nums[i] == nums[j]`, return `true`.
4. Return `false`.

#### C# Source Code
```csharp
public static bool Reference_BruteForce(int[] nums)
{
    for (int i = 0; i < nums.Length; i++)
    {
        for (int j = i + 1; j < nums.Length; j++)
        {
            if (nums[i] == nums[j]) return true;
        }
    }
    return false;
}
```

#### Complexity Analysis
- **Time Complexity**: $\mathcal{O}(N^2)$ — $\frac{N(N-1)}{2}$ comparisons.
- **Space Complexity**: $\mathcal{O}(1)$ — Zero extra dynamic allocation.

---

## 🛠️ C# Tips & Common Pitfalls

1. **C# `HashSet.Add(x)` Method**:
   - `seen.Add(x)` returns `bool` (`false` if element already existed).
2. **Memory Overhead**:
   - `HashSet<int>` has memory overhead per entry compared to arrays. For ultra-low memory environments, sorting is $O(1)$ space.
3. **Shared Benchmarking**:
   - Use `DSA.Common.DsaTestRunner` to measure execution time (ms) and thread memory allocations (Bytes) automatically!
