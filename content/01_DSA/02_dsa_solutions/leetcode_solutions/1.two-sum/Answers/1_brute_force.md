---


title: "1 brute force"
tags: [dsa, problem-solving, leetcode, learning-note]
---

# 1. Approach 1: Brute Force Nested Loops

## Intuition
Check every possible pair of elements $(i, j)$ where \$0 \le i < j < N$. If $nums[i] + nums[j] == target$, return $[i, j]$.

## C# Implementation
```csharp
public class Solution
{
    public int[] TwoSum(int[] nums, int target)
    {
        int n = nums.Length;
        for (int i = 0; i < n - 1; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                if (nums[i] + nums[j] == target)
                {
                    return [i, j];
                }
            }
        }
        return [];
    }
}
```

## Complexity Analysis
- **Time Complexity**: $\mathcal{O}(N^2)$
  - Total comparisons: $\frac{N(N-1)}{2}$. For $N = 10^4$, this is approximately \$5 \times 10^7$ iterations.
- **Space Complexity**: $\mathcal{O}(1)$
  - Only loop index variables $i, j$ are stored on the stack.

## Trade-offs
- **Pros**: Zero auxiliary memory overhead; simple to understand and implement.
- **Cons**: Quadratic runtime degrades severely as $N$ grows beyond $10^4$.
