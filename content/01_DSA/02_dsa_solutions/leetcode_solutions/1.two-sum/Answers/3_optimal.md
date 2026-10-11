---


title: "3 optimal"
tags: [dsa, problem-solving, leetcode, learning-note]
---

# 3. Approach 3: One-Pass Hash Map (Optimal)

## Intuition
Rather than inserting all elements upfront and then searching in a second pass, we inspect and register simultaneously:
- For each element $nums[i]$ at index $i$:
  1. Calculate $complement = target - nums[i]$.
  2. If $complement$ is already in the dictionary, return $[dict[complement], i]$.
  3. Otherwise, store $dict[nums[i]] = i$.

Because each element only searches against previously seen elements, an element can never be paired with itself. When duplicate elements form the target sum (e.g., `[3, 3]`, target 6), the solution is returned on the second element before any duplicate insertion error occurs.

## C# Implementation
```csharp
using System.Collections.Generic;

public class Solution
{
    public int[] TwoSum(int[] nums, int target)
    {
        var dict = new Dictionary<int, int>();

        for (int i = 0; i < nums.Length; i++)
        {
            int complement = target - nums[i];

            if (dict.TryGetValue(complement, out int complementIndex))
            {
                return [complementIndex, i];
            }

            dict[nums[i]] = i;
        }

        return [];
    }
}
```

## Complexity Analysis
- **Time Complexity**: $\mathcal{O}(N)$
  - Single pass through the array.
  - At each index, `TryGetValue` and index assignment execute in amortized $\mathcal{O}(1)$ time.
- **Space Complexity**: $\mathcal{O}(N)$
  - Stores at most $N - 1$ key-value pairs in the dictionary before matching.

## Trade-offs
- **Pros**: Optimal runtime, single iteration, natural prevention of self-pairing, minimal cache thrashing.
- **Cons**: Requires $\mathcal{O}(N)$ auxiliary heap memory.
