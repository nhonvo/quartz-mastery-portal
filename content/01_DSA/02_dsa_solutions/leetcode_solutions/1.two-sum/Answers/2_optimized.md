---


title: "2 optimized"
tags: [dsa, problem-solving, leetcode, learning-note]
---

# 2. Approach 2: Two-Pass Hash Map

## Intuition
Break the algorithm into two distinct stages:
1. **Stage 1**: Traverse the array to populate the hash map with each element's value and index.
2. **Stage 2**: Traverse the array again. For each element $nums[i]$, calculate $complement = target - nums[i]$ and check if it exists in the map. Ensure the found index is not $i$ itself.

## C# Implementation
```csharp
using System.Collections.Generic;

public class Solution
{
    public int[] TwoSum(int[] nums, int target)
    {
        var dict = new Dictionary<int, int>();

        // Pass 1: Add all elements to hash map
        for (int i = 0; i < nums.Length; i++)
        {
            dict[nums[i]] = i;
        }

        // Pass 2: Look up complement
        for (int i = 0; i < nums.Length; i++)
        {
            int complement = target - nums[i];
            if (dict.TryGetValue(complement, out int complementIndex) && complementIndex != i)
            {
                return [i, complementIndex];
            }
        }

        return [];
    }
}
```

## Complexity Analysis
- **Time Complexity**: $\mathcal{O}(N)$
  - First loop executes $N$ times; second loop executes at most $N$ times.
  - $N + N = 2N$ operations $\to \mathcal{O}(N)$.
- **Space Complexity**: $\mathcal{O}(N)$
  - Stores up to $N$ entries in the dictionary.

## Trade-offs
- **Pros**: Linear time complexity.
- **Cons**: Requires two passes across the data; requires explicit check `complementIndex != i` to avoid self-pairing; duplicate elements overwrite their previous index in Pass 1.
