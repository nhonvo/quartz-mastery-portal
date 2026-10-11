---


title: "Advanced Graph Flows & Matching: Hungarian Algorithm for Assignment Problem & Weighted Bipartite Matching"
type: "pattern_guide"
category: "dsa"
subcategory: "13_Advanced_Graph_Flows_and_Matching"
created_at: 2026-08-22T00:31:45+07:00
updated_at: 2026-08-22T00:31:45+07:00
tags: [dsa, graph-theory, bipartite-matching, hungarian-algorithm, assignment-problem, kuhn-munkres, potential-duality, algorithms, computer-science, learning-note]
---


# Advanced Graph Flows & Matching: Hungarian Algorithm for Assignment Problem & Weighted Bipartite Matching

The **Hungarian Algorithm** (also known as the **Kuhn-Munkres Algorithm**) is a combinatorial optimization algorithm that solves the **Linear Assignment Problem** and finds the **Minimum Cost (or Maximum Weight) Perfect Bipartite Matching** in polynomial time. While naive dynamic programming or brute-force permutations require $O(N!)$ or $O(2^N \cdot N)$ time, the Hungarian algorithm computes the optimal assignment in **$O(N^3)$** time by exploiting Linear Programming Duality and dual potential adjustments.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 The Assignment Problem Definition
Given an $N \times N$ cost matrix $C$ where $C_{i, j}$ represents the cost of assigning worker $i$ (\$1 \le i \le N$) to task $j$ (\$1 \le j \le N$), we must find a bijective assignment function $\pi: \{1 \dots N\} \to \{1 \dots N\}$ that minimizes the total cost:

$$\text{Minimize } \sum_{i=1}^N C_{i, \pi(i)}$$

```
          Workers (U)               Tasks (V)
          +-----------+            +-----------+
          | Worker 1  |---C_{1,1}->|  Task 1   |
          | Worker 2  |---C_{2,2}->|  Task 2   |
          |    ...    |            |    ...    |
          | Worker N  |---C_{N,N}->|  Task N   |
          +-----------+            +-----------+
```

### 1.2 Linear Programming Duality & Node Potentials
The LP formulation of the minimum assignment problem is:

$$\text{Minimize } \sum_{i=1}^N \sum_{j=1}^N C_{i, j} \cdot x_{i, j}$$

$$\text{Subject to } \sum_{j=1}^N x_{i, j} = 1 \; (\forall i), \quad \sum_{i=1}^N x_{i, j} = 1 \; (\forall j), \quad x_{i, j} \ge 0$$

By LP Duality, we introduce dual variables (called **potentials**) $u_i$ for workers and $v_j$ for tasks such that:

$$u_i + v_j \le C_{i, j} \quad \forall (i, j)$$

The dual objective function is:

$$\text{Maximize } \sum_{i=1}^N u_i + \sum_{j=1}^N v_j$$

**Complementary Slackness Theorem**: A feasible assignment $\pi$ and feasible dual potentials $(u, v)$ are optimal if and only if every matched edge $(i, \pi(i))$ satisfies the equality condition:

$$u_i + v_{\pi(i)} = C_{i, \pi(i)} \quad \iff \quad C_{i, \pi(i)} - u_i - v_{\pi(i)} = 0$$

The set of edges satisfying $C_{i, j} - u_i - v_j = 0$ is called the **Equality Subgraph** $G_{(u,v)}$.

```
   Feasible Potentials (u_i, v_j) satisfying: u_i + v_j <= C_{i,j}
   Reduced Cost Matrix: R_{i,j} = C_{i,j} - u_i - v_j >= 0
   
   EQUALITY SUBGRAPH = { (i, j) | R_{i,j} == 0 }
   
   If Equality Subgraph contains a Perfect Matching => MATCHING IS OPTIMAL!
   Else => Update potentials u_i and v_j to expand Equality Subgraph.
```

### 1.3 $O(N^3)$ Shortest Augmenting Path Method (Jonker-Volgenant Variant)
Traditional matrix row/column zero-reduction methods require $O(N^4)$ operations due to repeated matrix scans. The modern $O(N^3)$ implementation maintains potentials $u$ and $v$, adding one worker at a time via a BFS-like augmenting tree with **Slack array optimization**:

1. **Initialize Potentials**: Set $u_i = 0, v_j = 0$.
2. **Augmenting Step for Worker $i_0$**:
   - Maintain `slack[j] = min_{i in VisitedU} (C_{i, j} - u_i - v_j)` for each task $j$.
   - Search for an augmenting path using a Dijkstra/BFS-like step.
   - If no zero reduced-cost edge leads to an unassigned task, calculate $\delta = \min_{j \notin VisitedV} \text{slack}[j]$.
   - Adjust potentials: increment $u_i$ for visited workers by $\delta$, decrement $v_j$ for visited tasks by $\delta$, and update slacks.
   - Repeat until an unassigned task $j^*$ is reached, then backtrack along the parent path to augment the matching.

---

## 2. Idiomatic Code Implementations

### 2.1 C# Implementation ($O(N^3)$ Hungarian Algorithm)

```csharp
using System;

namespace AdvancedGraphFlows
{
    /// <summary>
    /// Implements Hungarian (Kuhn-Munkres) algorithm for 1-based N x N Minimum Assignment Problem.
    /// Operates in O(N^3) time using dual potential updates and slack arrays.
    /// </summary>
    public class HungarianAlgorithm
    {
        private const long Inf = long.MaxValue / 4;

        /// <summary>
        /// Solves the Minimum Cost Assignment Problem.
        /// </summary>
        /// <param name="n">Dimension N (1-based, matrix size N x N).</param>
        /// <param name="cost">1-based cost matrix cost[1..n, 1..n].</param>
        /// <param name="assignment">Output array where assignment[i] gives assigned column for row i.</param>
        /// <returns>Minimum total assignment cost.</returns>
        public static long SolveMinAssignment(int n, long[,] cost, out int[] assignment)
        {
            long[] u = new long[n + 1]; // Row dual potentials
            long[] v = new long[n + 1]; // Column dual potentials
            int[] p = new int[n + 1];   // Matching: p[j] = row matched to column j
            int[] way = new int[n + 1]; // Backtracking path array

            for (int i = 1; i <= n; i++)
            {
                p[0] = i;
                int j0 = 0;
                long[] minv = new long[n + 1];
                bool[] used = new bool[n + 1];
                
                for (int j = 0; j <= n; j++)
                {
                    minv[j] = Inf;
                    used[j] = false;
                }

                // BFS / Dijkstra path discovery to find augmenting path
                do
                {
                    used[j0] = true;
                    int i0 = p[j0];
                    long delta = Inf;
                    int j1 = 0;

                    for (int j = 1; j <= n; j++)
                    {
                        if (!used[j])
                        {
                            long cur = cost[i0, j] - u[i0] - v[j];
                            if (cur < minv[j])
                            {
                                minv[j] = cur;
                                way[j] = j0;
                            }
                            if (minv[j] < delta)
                            {
                                delta = minv[j];
                                j1 = j;
                            }
                        }
                    }

                    // Update dual potentials for visited nodes in augmenting tree
                    for (int j = 0; j <= n; j++)
                    {
                        if (used[j])
                        {
                            u[p[j]] += delta;
                            v[j] -= delta;
                        }
                        else
                        {
                            minv[j] -= delta;
                        }
                    }

                    j0 = j1;
                } while (p[j0] != 0);

                // Backtrack and update matched pairs
                do
                {
                    int j1 = way[j0];
                    p[j0] = p[j1];
                    j0 = j1;
                } while (j0 != 0);
            }

            // Extract matching array (row -> column assignment)
            assignment = new int[n + 1];
            for (int j = 1; j <= n; j++)
            {
                assignment[p[j]] = j;
            }

            return -v[0]; // Total minimum cost stored at -v[0]
        }

        /// <summary>
        /// Utility to solve Maximum Weight Assignment problem by negating cost matrix.
        /// </summary>
        public static long SolveMaxAssignment(int n, long[,] weight, out int[] assignment)
        {
            long[,] negatedCost = new long[n + 1, n + 1];
            for (int i = 1; i <= n; i++)
            {
                for (int j = 1; j <= n; j++)
                {
                    negatedCost[i, j] = -weight[i, j];
                }
            }

            long minCost = SolveMinAssignment(n, negatedCost, out assignment);
            return -minCost; // Return maximum total weight
        }
    }
}
```

### 2.2 Python Implementation

```python
from typing import List, Tuple, Optional

class HungarianAlgorithm:
    """
    O(N^3) Hungarian Algorithm (Kuhn-Munkres) for minimum cost bipartite assignment.
    Matrix index is 1-based (size N x N).
    """
    INF = float('inf')

    def __init__(self, n: int, cost_matrix: List[List[float]]):
        self.n = n
        # 1-based cost matrix
        self.cost = cost_matrix

    def solve_min_assignment(self) -> Tuple[float, List[int]]:
        """
        Solves minimum assignment problem.
        Returns (min_cost, assignment_array) where assignment[i] is matched column for row i.
        """
        n = self.n
        u = [0.0] * (n + 1)  # Row dual potentials
        v = [0.0] * (n + 1)  # Column dual potentials
        p = [0] * (n + 1)    # Column match pairings: p[j] = matched row
        way = [0] * (n + 1)  # Backtracking pointers

        for i in range(1, n + 1):
            p[0] = i
            j0 = 0
            minv = [self.INF] * (n + 1)
            used = [False] * (n + 1)

            while True:
                used[j0] = True
                i0 = p[j0]
                delta = self.INF
                j1 = 0

                for j in range(1, n + 1):
                    if not used[j]:
                        cur = self.cost[i0][j] - u[i0] - v[j]
                        if cur < minv[j]:
                            minv[j] = cur
                            way[j] = j0
                        if minv[j] < delta:
                            delta = minv[j]
                            j1 = j

                for j in range(0, n + 1):
                    if used[j]:
                        u[p[j]] += delta
                        v[j] -= delta
                    else:
                        minv[j] -= delta

                j0 = j1
                if p[j0] == 0:
                    break

            # Backtrack and augment matching
            while True:
                j1 = way[j0]
                p[j0] = p[j1]
                j0 = j1
                if j0 == 0:
                    break

        assignment = [0] * (n + 1)
        for j in range(1, n + 1):
            assignment[p[j]] = j

        min_total_cost = -v[0]
        return min_total_cost, assignment
```

---

## 3. Complexity Analysis & Memory Overhead

| Approach / Algorithm | Time Complexity | Auxiliary Space | Key Mechanics |
| :--- | :--- | :--- | :--- |
| **Hungarian Algorithm ($O(N^3)$)** | $O(N^3)$ | $O(N^2)$ matrix, $O(N)$ potentials | Slack vector updates + Shortest Augmenting Path tree. |
| **Naive Hungarian Algorithm** | $O(N^4)$ | $O(N^2)$ | Repeated full $N \times N$ matrix line scans per step. |
| **Min-Cost Max-Flow (MCMF)** | $O(N^3 \log N)$ or $O(N^4)$ | $O(N^2)$ residual graph | Successive shortest path using Dijkstra with Johnson potentials. |
| **Bitmask DP / TSP Style** | $O(2^N \cdot N^2)$ | $O(2^N \cdot N)$ | Exponential space/time; limited to $N \le 20$. |

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

### 4.1 Rectangular ($N \neq M$) Cost Matrix Handling
- **Problem**: Hungarian algorithm requires an $N \times N$ square matrix.
- **Fix**: Pad rectangular matrices with dummy rows/columns initialized to `0` (for minimum matching) or `-INF` / `+INF` depending on optimization goals.

### 4.2 Max Weight to Min Cost Reduction Error
- **Anti-Pattern**: Setting $C_{i, j}' = \frac{1}{C_{i, j}}$ or $-C_{i, j}$ without checking for non-negativity assumptions.
- **Correct Transformation**: Find $M = \max_{i, j} (C_{i, j})$. Transform matrix to $C_{i, j}' = M - C_{i, j}$. All elements become non-negative $\ge 0$, and finding min assignment on $C'$ is mathematically identical to finding max assignment on $C$.

### 4.3 Floating Point Precision Underflow
- **Anti-Pattern**: Using `float` equality checks `minv[j] == 0`.
- **Correct Fix**: Use integer costs where possible or double precision with epsilon tolerances `Math.Abs(cur - minv[j]) < 1e-9`.

---

## 5. Related LeetCode Problems & Variant Patterns

1. **LeetCode 1066: Campus Bikes II**
   - $N$ workers and $M$ bikes ($N \le M \le 10$).
   - Can be solved via Bitmask DP ($O(2^M \cdot N)$) or Hungarian algorithm ($O(M^3)$) after padding dummy rows.

2. **LeetCode 1947: Maximum Compatibility Score Sum**
   - $N$ students and $N$ mentors ($N \le 8$). Perfect application for Maximum Weight Bipartite Matching using Hungarian Algorithm.

3. **LeetCode 1879: Minimum XOR Sum of Two Arrays**
   - Pair elements of two arrays to minimize XOR sum. Direct Assignment Problem variant.

4. **Network Flow Alternative**
   - For sparse graphs with $E \ll V^2$, Minimum Cost Maximum Flow (MCMF) via SPFA or Dijkstra potentials may be preferred. See [[min_cost_max_flow_successive_shortest_path|Min-Cost Max-Flow Algorithm]].
