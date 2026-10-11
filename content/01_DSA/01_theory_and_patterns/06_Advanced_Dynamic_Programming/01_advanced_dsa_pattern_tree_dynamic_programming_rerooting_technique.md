---


title: "01. Advanced DSA Pattern: Tree Dynamic Programming & Rerooting Technique"
type: "pattern_guide"
category: "dsa"
subcategory: "06_Advanced_Dynamic_Programming"
created_at: 2026-08-22T00:06:16+07:00
updated_at: 2026-08-22T00:06:16+07:00
tags: [dsa, dynamic-programming, tree-dp, rerooting, graph-algorithms, advanced-patterns, competitive-programming, algorithms, computer-science, learning-note]
aliases:
  - 01_tree_dp_rerooting_technique
---


# 📌 01. Advanced DSA Pattern: Tree Dynamic Programming & Rerooting Technique

Tree Dynamic Programming (Tree DP) solves optimization and combinatorial counting problems structured on undirected trees. While standard Tree DP evaluates answers rooted at a fixed node (usually node 0 or 1), the **Rerooting Technique** (also known as Up-and-Down DP or Two-Pass DFS) allows us to compute the optimal answer for **every node in the tree as if it were the root** in $O(N)$ total time, avoiding naive $O(N^2)$ re-computation.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 Problem Paradigm: Sum of Distances / Subtree Aggregations
Consider a tree of $N$ nodes. Suppose we need to compute for *every* node $u \in V$ the sum of distances to all other nodes in the tree:
$$S(u) = \sum_{v \in V} \text{dist}(u, v)$$

A single Depth-First Search (DFS) rooted at node $r$ can compute $S(r)$ in $O(N)$ time by accumulating child subtree sizes and subtree distance sums. If we naively repeat DFS from every node \$0 \dots N-1$, the total time complexity explodes to $O(N^2)$, which fails for $N \ge 10^5$.

### 1.2 The Two-Pass Rerooting Framework

The Rerooting technique leverages the key insight that moving the tree root from a parent node $u$ to an adjacent child node $v$ only changes the subtree partitioning along the edge $(u, v)$. All other subtrees remain identical.

```mermaid
graph TD
    subgraph Pass 1: Bottom-Up DFS (Rooted at 0)
        0((0)) --- 1((1))
        0 --- 2((2))
        1 --- 3((3))
        1 --- 4((4))
    end
```

```
    Rerooting Transition from Node u to Child v:
    
          (u) [Parent]                  (v) [New Root]
         /   \                         /   \
       (v)   Subtrees(u\v)         (u)   Subtrees(v)
      /   \                       /   \
   Subtrees(v)               Subtrees(u\v)
```

#### Mathematical Recurrence & Rerooting Formula
1. **Pass 1 (Bottom-up Post-order DFS)**:
   Fix an arbitrary root (e.g., node 0). For each node $u$, compute:
   - `count[u]`: total number of nodes in $u$'s subtree.
     $$\text{count}[u] = 1 + \sum_{v \in \text{children}(u)} \text{count}[v]$$
   - `dp[u]`: sum of distances from $u$ to all nodes in $u$'s subtree.
     $$\text{dp}[u] = \sum_{v \in \text{children}(u)} (\text{dp}[v] + \text{count}[v])$$

2. **Pass 2 (Top-down Pre-order DFS)**:
   Let `ans[u]` be the total distance sum from node $u$ to ALL nodes in the entire tree. Initialize `ans[0] = dp[0]`.
   When shifting root from parent $u$ to child $v$:
   - The $v$ subtree nodes (size `count[v]`) become 1 unit **closer** to $v$ than they were to $u$.
   - All other $(N - \text{count}[v])$ nodes become 1 unit **further** from $v$ than they were to $u$.
   
   Therefore, the state rerooting transfer equation is:
   $$\text{ans}[v] = \text{ans}[u] - \text{count}[v] + (N - \text{count}[v])$$

---

## 2. Idiomatic Code Implementations

### 2.1 C# 12 Implementation

```csharp
using System;
using System.Collections.Generic;

namespace DSAPatterns.AdvancedDP
{
    /// <summary>
    /// Implements Tree DP with Rerooting Technique to compute sum of distances 
    /// from each node to all other nodes in O(N) time.
    /// LeetCode 834: Sum of Distances in Tree
    /// </summary>
    public class TreeDpRerooting
    {
        private int _n;
        private List<int>[] _adj = null!;
        private int[] _count = null!;
        private int[] _dp = null!;
        private int[] _ans = null!;

        public int[] SumOfDistancesInTree(int n, int[][] edges)
        {
            _n = n;
            _adj = new List<int>[n];
            _count = new int[n];
            _dp = new int[n];
            _ans = new int[n];

            for (int i = 0; i < n; i++)
            {
                _adj[i] = new List<int>();
            }

            foreach (var edge in edges)
            {
                int u = edge[0];
                int v = edge[1];
                _adj[u].Add(v);
                _adj[v].Add(u);
            }

            // Pass 1: Bottom-up Post-order DFS from arbitrary root (0)
            PostOrderDfs(0, -1);

            // Pass 2: Top-down Pre-order DFS to shift root
            _ans[0] = _dp[0];
            PreOrderRerootDfs(0, -1);

            return _ans;
        }

        private void PostOrderDfs(int u, int parent)
        {
            _count[u] = 1; // Count self
            _dp[u] = 0;

            foreach (int v in _adj[u])
            {
                if (v == parent) continue;

                PostOrderDfs(v, u);
                _count[u] += _count[v];
                _dp[u] += _dp[v] + _count[v];
            }
        }

        private void PreOrderRerootDfs(int u, int parent)
        {
            foreach (int v in _adj[u])
            {
                if (v == parent) continue;

                // Reroot state shift equation:
                // ans[v] = ans[u] - count[v] + (N - count[v])
                _ans[v] = _ans[u] - _count[v] + (_n - _count[v]);

                // Recurse into child with v as current parent
                PreOrderRerootDfs(v, u);
            }
        }
    }
}
```

### 2.2 Python 3 Implementation

```python
import sys
from typing import List

# Increase recursion depth for deep tree traversal
sys.setrecursionlimit(200000)

class TreeDpRerooting:
    """
    Implements Tree DP with Rerooting Technique (Two-Pass DFS).
    Computes sum of distances for all nodes in O(N) time.
    """
    def sumOfDistancesInTree(self, n: int, edges: List[List[int]]) -> List[int]:
        adj: List[List[int]] = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        count = [0] * n
        dp = [0] * n
        ans = [0] * n

        def post_order_dfs(u: int, parent: int) -> None:
            """Pass 1: Compute subtree sizes and distance sums rooted at 0."""
            count[u] = 1
            dp[u] = 0
            for v in adj[u]:
                if v == parent:
                    continue
                post_order_dfs(v, u)
                count[u] += count[v]
                dp[u] += dp[v] + count[v]

        def pre_order_reroot_dfs(u: int, parent: int) -> None:
            """Pass 2: Shift root from u to v and propagate global distance sums."""
            for v in adj[u]:
                if v == parent:
                    continue
                # Shift formula: minus subtree v, plus all remaining (N - count[v]) nodes
                ans[v] = ans[u] - count[v] + (n - count[v])
                pre_order_reroot_dfs(v, u)

        # Execute Pass 1
        post_order_dfs(0, -1)
        
        # Base answer for initial root
        ans[0] = dp[0]
        
        # Execute Pass 2
        pre_order_reroot_dfs(0, -1)

        return ans
```

---

## 3. Complexity Analysis & Memory Overhead

| Operation / Metric | Complexity / Size | Detailed Rationale & Hardware Overhead |
| :--- | :--- | :--- |
| **Pass 1 DFS Time** | $O(N)$ | Traverses every node and edge exactly once. |
| **Pass 2 DFS Time** | $O(N)$ | Traverses every node and edge exactly once for rerooting state shift. |
| **Total Time Complexity** | $\mathcal{O}(N)$ | Linear time, optimal for competitive programming ($N = 10^5$). |
| **Call Stack Memory** | $O(N)$ | Recursion depth up to $N$ in a skewed degenerate line tree. |
| **Auxiliary Data Structures** | $O(N)$ | `count`, `dp`, and `ans` flat integer arrays. |
| **Graph Adjacency List** | $O(N + E) = O(N)$ | $2(N-1)$ edge allocations in contiguous dynamic lists. |

### Memory Overhead Trade-offs
- In C#, storing adjacency lists as `List<int>[]` incurs object header overhead (24 bytes per list + array overhead). For high-performance environments, flat packed arrays (`head`, `next`, `to`) reduce garbage collection pressure.
- In Python, recursion depth defaults to 1000. Calling `sys.setrecursionlimit(200000)` is required to prevent `RecursionError` on linear trees. Iterative DFS can be used if call stack limits are enforced.

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

1. **Forgetting Parent Guard in Undirected Graphs**:
   - *Pitfall*: Omitting `if (v == parent) continue;` causes immediate infinite recursion between parent and child.
   - *Fix*: Always pass parent parameter `p` into recursive signatures.

2. **Incorrect Reroot State Reversion in General DP**:
   - *Pitfall*: For associative operations like addition (e.g., sum of distances), subtraction is trivial (`ans[u] - count[v]`). However, for operations without inverse (like $\max$ or $\min$), simple subtraction fails.
   - *Fix*: Maintain prefix and suffix maximums among children, or track top-2 maximum paths (`max1` and `max2`) for each node.

3. **Single Node Base Case Edge Cases ($N = 1$)**:
   - *Pitfall*: When $N=1$, `edges` is empty. Iterating over edges loop can crash if array index bounds are unvalidated.
   - *Fix*: Verify $N=1$ returns `[0]` immediately or handles empty adjacency loops gracefully.

---

## 5. Related LeetCode Problems & Variant Patterns

| LeetCode # | Problem Title | Variant Pattern / Key Twist | Difficulty |
| :--- | :--- | :--- | :--- |
| **LC 834** | [Sum of Distances in Tree](https://leetcode.com/problems/sum-of-distances-in-tree/) | Pure Rerooting technique on undirected tree distance sum. | **Hard** |
| **LC 310** | [Minimum Height Trees](https://leetcode.com/problems/minimum-height-trees/) | Tree diameter / longest path rerooting to find centroids. | **Medium** |
| **LC 2246** | [Longest Path With Different Adjacent Characters](https://leetcode.com/problems/longest-path-with-different-adjacent-characters/) | Tree DP tracking top-2 child path lengths. | **Hard** |
| **LC 2581** | [Count Number of Possible Root Nodes](https://leetcode.com/problems/count-number-of-possible-root-nodes/) | Rerooting DP with Hash Set check for correct guesses. | **Hard** |

---

*This guide forms part of the DSA Track Subdomain Expansion. Protect Obsidian links `[[link]]` during graph traversals.*
