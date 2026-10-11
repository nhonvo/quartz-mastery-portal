---


title: "Advanced Graph Flows & Matching: Hopcroft-Karp Algorithm for Maximum Bipartite Matching"
type: "pattern_guide"
category: "dsa"
subcategory: "13_Advanced_Graph_Flows_and_Matching"
created_at: 2026-08-22T00:31:45+07:00
updated_at: 2026-08-22T00:31:45+07:00
tags: [dsa, graph-theory, bipartite-matching, hopcroft-karp, augmenting-paths, max-flow, network-flow, algorithms, computer-science, learning-note]
---


# Advanced Graph Flows & Matching: Hopcroft-Karp Algorithm for Maximum Bipartite Matching

The **Hopcroft-Karp algorithm** is an optimized graph algorithm designed to find the **Maximum Cardinality Bipartite Matching** in an undirected bipartite graph $G = (U, V, E)$. While traditional DFS-based augmenting path methods (such as Kuhn's algorithm or simple Ford-Fulkerson flow) operate in $O(|V| |E|)$ time, Hopcroft-Karp achieves a worst-case time complexity of **$O(|E| \sqrt{|V|})$** by batch-processing multiple shortest augmenting paths in synchronized phases.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 Bipartite Graphs & Matching Definitions
- **Bipartite Graph $G = (U, V, E)$**: A graph whose vertex set can be partitioned into two disjoint sets $U$ and $V$ such that every edge connects a vertex in $U$ to a vertex in $V$.
- **Matching $M \subseteq E$**: A subset of edges such that no two edges share a common vertex. A vertex is **matched** if it is an endpoint of an edge in $M$; otherwise, it is **unmatched** (or **free**).
- **Alternating Path**: A path whose edges alternate between unmatched edges ($E \setminus M$) and matched edges ($M$).
- **Augmenting Path**: An alternating path that starts at an unmatched vertex in $U$ and ends at an unmatched vertex in $V$.

> **Berge's Lemma**: A matching $M$ is of maximum cardinality if and only if there exists **no augmenting path** with respect to $M$.

Symmetric difference ($\oplus$) along an augmenting path $P$ increases the matching size by 1: $M' = M \oplus P = (M \setminus P) \cup (P \setminus M)$.

```
   Augmenting Path Structure:
   (Unmatched U_0) === [Unmatched Edge] ===> (Matched V_1) --- [Matched Edge] ---> (Matched U_1) === [Unmatched Edge] ===> (Unmatched V_2)
   
   After Augmentation (M' = M ⊕ P):
   (Matched U_0) --- [Matched Edge] ---> (Matched V_1) === [Unmatched Edge] ===> (Matched U_1) --- [Matched Edge] ---> (Matched V_2)
```

### 1.2 The Hopcroft-Karp Phase Paradigm
Rather than searching and augmenting **one path at a time** (as Kuhn's algorithm does), Hopcroft-Karp processes paths in **Phases**. Each phase consists of two distinct stages:

1. **BFS Stage (Level Graph Construction & Shortest Distance Discovery)**:
   - Starts a simultaneous Breadth-First Search from **all free vertices** in set $U$.
   - Traverses unmatched edges from $U \to V$ and matched edges from $V \to U$.
   - Builds a layered level graph (`dist[u]`) and identifies the minimum path length $L$ to reach any free vertex in $V$.
   - If no free vertex in $V$ is reachable, no augmenting path exists, and the algorithm terminates.

2. **DFS Stage (Maximal Vertex-Disjoint Augmentation)**:
   - Runs Depth-First Searches from free vertices in $U$, restricted strictly to edges that move along the shortest distance layer: `dist[v] == dist[u] + 1`.
   - Augments the matching along all discovered vertex-disjoint shortest augmenting paths of length $L$.
   - Once a vertex is processed or leads to a dead-end, its `dist[u]` is set to `INF` to prevent re-exploration in the current phase.

```
+-----------------------------------------------------------------------+
| PHASE LOOP                                                            |
|                                                                       |
| 1. BFS(): Layer graph from all free U nodes. Discover min distance L. |
|    If dist[0] == INF (no reachable free V), RETURN Max Matching Count.|
|                                                                       |
| 2. DFS(u): For each free U node, explore path strictly along level:   |
|    dist[pairV[v]] == dist[u] + 1.                                     |
|    If path reaches free V (pairV[v] == 0): Augment & set match!       |
+-----------------------------------------------------------------------+
```

### 1.3 Theoretical Proof of $O(|E| \sqrt{|V|})$ Complexity
- **Property 1**: The length of the shortest augmenting path increases strictly by at least 2 edges (one $U \to V$, one $V \to U$) after each phase.
- **Property 2**: After $k$ phases, the shortest augmenting path length is at least \$2k + 1$.
- If we run the algorithm for $k = \sqrt{|V|}$ phases:
  - Any remaining augmenting paths must have length $\ge 2\sqrt{|V|} + 1$.
  - Because each augmenting path requires at least $2\sqrt{|V|} + 1$ vertices, and all remaining paths in a matching difference are vertex-disjoint, there can be at most $\frac{|V|}{2\sqrt{|V|}} = \frac{\sqrt{|V|}}{2}$ remaining augmenting paths.
  - Each subsequent augmentation takes $O(|E|)$ DFS traversal.
  - Total remaining phases needed: at most $O(\sqrt{|V|})$.
- Total phases across entire execution: $O(\sqrt{|V|})$.
- Work per phase (BFS + DFS): $O(|E|)$.
- **Total Time Complexity**: **$O(|E| \sqrt{|V|})$**.

---

## 2. Idiomatic Code Implementations

### 2.1 C# Implementation

```csharp
using System;
using System.Collections.Generic;

namespace AdvancedGraphFlows
{
    /// <summary>
    /// Implements Hopcroft-Karp algorithm for Maximum Bipartite Matching.
    /// Uses 1-based indexing for vertices. Node 0 acts as a virtual dummy node.
    /// </summary>
    public class HopcroftKarp
    {
        private readonly int _uSize;
        private readonly int _vSize;
        private readonly List<int>[] _adj;
        private readonly int[] _pairU;
        private readonly int[] _pairV;
        private readonly int[] _dist;
        private const int Inf = int.MaxValue;

        public HopcroftKarp(int uSize, int vSize)
        {
            _uSize = uSize;
            _vSize = vSize;

            // 1-based indexing: index 0 is virtual sentinel node
            _adj = new List<int>[_uSize + 1];
            for (int i = 0; i <= _uSize; i++)
            {
                _adj[i] = new List<int>();
            }

            _pairU = new int[_uSize + 1];
            _pairV = new int[_vSize + 1];
            _dist = new int[_uSize + 1];
        }

        /// <summary>
        /// Adds a directed edge from left partition U (1..uSize) to right partition V (1..vSize).
        /// </summary>
        public void AddEdge(int u, int v)
        {
            _adj[u].Add(v);
        }

        /// <summary>
        /// Computes Maximum Bipartite Matching using Hopcroft-Karp BFS/DFS phase traversal.
        /// </summary>
        /// <returns>Number of maximum matched edge pairs.</returns>
        public int GetMaxMatching()
        {
            // Reset match pairings (0 indicates unmatched/free state)
            Array.Clear(_pairU, 0, _pairU.Length);
            Array.Clear(_pairV, 0, _pairV.Length);

            int matching = 0;

            // Phase loop: while shortest augmenting path exists in level graph
            while (Bfs())
            {
                for (int u = 1; u <= _uSize; u++)
                {
                    // If u is free, attempt DFS augmentation along BFS shortest path tree
                    if (_pairU[u] == 0 && Dfs(u))
                    {
                        matching++;
                    }
                }
            }

            return matching;
        }

        /// <summary>
        /// BFS Stage: Layer graph from all free nodes in U. Returns true if free node in V is reached.
        /// </summary>
        private bool Bfs()
        {
            Queue<int> queue = new Queue<int>();

            for (int u = 1; u <= _uSize; u++)
            {
                if (_pairU[u] == 0)
                {
                    // Free node in U: start level distance 0
                    _dist[u] = 0;
                    queue.Enqueue(u);
                }
                else
                {
                    _dist[u] = Inf;
                }
            }

            // Sentinel distance for dummy node 0 (representing free state in V)
            _dist[0] = Inf;

            while (queue.Count > 0)
            {
                int u = queue.Dequeue();

                if (_dist[u] < _dist[0])
                {
                    foreach (int v in _adj[u])
                    {
                        int nextU = _pairV[v];
                        if (_dist[nextU] == Inf)
                        {
                            _dist[nextU] = _dist[u] + 1;
                            queue.Enqueue(nextU);
                        }
                    }
                }
            }

            // If dist[0] is updated from Inf, a free node in V was reached
            return _dist[0] != Inf;
        }

        /// <summary>
        /// DFS Stage: Explores vertex-disjoint augmenting paths along level graph edges.
        /// </summary>
        private bool Dfs(int u)
        {
            if (u == 0) return true; // Reached sentinel free node in V

            foreach (int v in _adj[u])
            {
                int nextU = _pairV[v];
                if (_dist[nextU] == _dist[u] + 1)
                {
                    if (Dfs(nextU))
                    {
                        _pairV[v] = u;
                        _pairU[u] = v;
                        return true;
                    }
                }
            }

            // Mark node u as visited/dead-end for the current phase
            _dist[u] = Inf;
            return false;
        }

        /// <summary>
        /// Gets matched pair for node u in U. Returns 0 if unmatched.
        /// </summary>
        public int GetMatchForU(int u) => _pairU[u];

        /// <summary>
        /// Gets matched pair for node v in V. Returns 0 if unmatched.
        /// </summary>
        public int GetMatchForV(int v) => _pairV[v];
    }
}
```

### 2.2 Python Implementation

```python
from collections import deque
from typing import List, Tuple

class HopcroftKarp:
    """
    Hopcroft-Karp algorithm for Maximum Bipartite Matching.
    Uses 1-based indexing for vertices U (1..u_size) and V (1..v_size).
    Index 0 acts as a virtual dummy sentinel node.
    """
    INF = float('inf')

    def __init__(self, u_size: int, v_size: int):
        self.u_size = u_size
        self.v_size = v_size
        self.adj: List[List[int]] = [[] for _ in range(u_size + 1)]
        self.pair_u: List[int] = [0] * (u_size + 1)
        self.pair_v: List[int] = [0] * (v_size + 1)
        self.dist: List[float] = [self.INF] * (u_size + 1)

    def add_edge(self, u: int, v: int) -> None:
        """Adds a directed edge from left set node u to right set node v."""
        self.adj[u].append(v)

    def bfs(self) -> bool:
        """
        BFS Stage: Builds level graph from all currently unmatched nodes in U.
        Returns True if at least one free node in V is reachable.
        """
        queue = deque()
        for u in range(1, self.u_size + 1):
            if self.pair_u[u] == 0:
                self.dist[u] = 0
                queue.append(u)
            else:
                self.dist[u] = self.INF

        self.dist[0] = self.INF  # Distance to sentinel node 0

        while queue:
            u = queue.popleft()
            if self.dist[u] < self.dist[0]:
                for v in self.adj[u]:
                    next_u = self.pair_v[v]
                    if self.dist[next_u] == self.INF:
                        self.dist[next_u] = self.dist[u] + 1
                        queue.append(next_u)

        return self.dist[0] != self.INF

    def dfs(self, u: int) -> bool:
        """
        DFS Stage: Searches for shortest vertex-disjoint augmenting path.
        """
        if u == 0:
            return True  # Reached free node in V (represented by sentinel 0)

        for v in self.adj[u]:
            next_u = self.pair_v[v]
            if self.dist[next_u] == self.dist[u] + 1:
                if self.dfs(next_u):
                    self.pair_v[v] = u
                    self.pair_u[u] = v
                    return True

        self.dist[u] = self.INF  # Prune dead end node
        return False

    def max_matching(self) -> int:
        """Calculates maximum bipartite matching count."""
        matching = 0
        while self.bfs():
            for u in range(1, self.u_size + 1):
                if self.pair_u[u] == 0 and self.dfs(u):
                    matching += 1
        return matching

    def get_matched_pairs(self) -> List[Tuple[int, int]]:
        """Returns list of (u, v) matched edges."""
        return [(u, self.pair_u[u]) for u in range(1, self.u_size + 1) if self.pair_u[u] != 0]
```

---

## 3. Complexity Analysis & Memory Overhead

| Aspect | Complexity | Details & Bounds |
| :--- | :--- | :--- |
| **Worst-Case Time** | $O(|E| \sqrt{|V|})$ | $|V| = |U| + |V|$ total vertices. Operates in at most $O(\sqrt{|V|})$ phases. |
| **Average Time (Random Graphs)** | $O(|E| \log |V|)$ | Shortest augmenting paths grow rapidly; phase count is empirically very small. |
| **Dinic's Algorithm Alternative** | $O(|E| \sqrt{|V|})$ | Dinic's Max Flow on unit capacity network yields identical bound. |
| **Kuhn's Algorithm Comparison** | $O(|V| |E|)$ | Kuhn's DFS without BFS layer batching is significantly slower on dense graphs. |
| **Auxiliary Space** | $O(|V| + |E|)$ | Adjacency list: $O(|E|)$, arrays `pairU`, `pairV`, `dist`, BFS Queue: $O(|V|)$. |

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

### 4.1 Sentinel Node Indexing Confusion (`dist[0]`)
- **Anti-Pattern**: Using 0-based vertex indexing without shifting sentinel values, causing `pairV[v] == 0` to conflict with vertex `0`.
- **Correct Fix**: Use 1-based indexing for graph vertices (\$1 \dots |U|$ and \$1 \dots |V|$). Reserve index `0` exclusively as the virtual free node sentinel.

### 4.2 Failure to Prune Dead-Ends in DFS Phase
- **Anti-Pattern**: Omitting `_dist[u] = Inf` upon DFS failure.
- **Consequence**: Repeated DFS attempts revisit dead-end nodes, degrading DFS complexity from $O(|E|)$ to $O(|V| |E|)$ per phase.

### 4.3 Mixing Directed & Undirected Edge Representations
- **Anti-Pattern**: Adding bi-directional adjacency entries into `_adj` without partitioning sets $U$ and $V$.
- **Correct Fix**: Edges in `_adj` must only originate from left partition $U$ pointing to right partition $V$. Matching arrays (`pairU` and `pairV`) handle reverse traversal implicitly during BFS/DFS.

---

## 5. Related LeetCode Problems & Variant Patterns

1. **LeetCode 1820: Maximum Number of Accepted Invitations**
   - Direct Maximum Bipartite Matching application where grid mapping represents invitations between boys ($U$) and girls ($V$).

2. **LeetCode 1349: Maximum Students Taking Exam**
   - Reduces to Maximum Independent Set on Bipartite Graph.
   - By **König's Theorem**: $\text{Max Independent Set} = |V_{\text{total}}| - \text{Max Bipartite Matching}$.

3. **Maximum Weight Matching in Bipartite Graph (Assignment Problem)**
   - When edges carry weights, Hopcroft-Karp cannot be applied directly. Transition to the [[hungarian_algorithm_assignment_problem|Hungarian Algorithm (Kuhn-Munkres)]].

4. **Global Minimum Cut in Undirected Graphs**
   - For undirected unweighted or weighted graphs without source/sink constraints, see [[stoer_wagner_min_cut_algorithm|Stoer-Wagner Min-Cut Algorithm]].
