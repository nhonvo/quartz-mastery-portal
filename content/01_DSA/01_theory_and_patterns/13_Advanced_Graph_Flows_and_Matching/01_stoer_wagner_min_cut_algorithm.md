---


title: "Advanced Graph Flows & Matching: Stoer-Wagner Algorithm for Global Minimum Cut"
type: "pattern_guide"
category: "dsa"
subcategory: "13_Advanced_Graph_Flows_and_Matching"
created_at: 2026-08-22T00:31:45+07:00
updated_at: 2026-08-22T00:31:45+07:00
tags: [dsa, graph-theory, global-min-cut, stoer-wagner, max-adjacency-search, min-cut, weighted-graphs, algorithms, computer-science, learning-note]
---


# Advanced Graph Flows & Matching: Stoer-Wagner Algorithm for Global Minimum Cut

The **Stoer-Wagner Algorithm** is a fundamental graph algorithm that computes the **Global Minimum Cut** of an undirected weighted graph $G = (V, E, w)$ with non-negative edge weights. Unlike standard network flow min-cut algorithms (such as Dinic's or Edmonds-Karp), which require specifying a fixed source $s$ and sink $t$, Stoer-Wagner finds the absolute global minimum cut partitioning $V$ into two non-empty subsets $A$ and $V \setminus A$ **without using flow networks** in **$O(|V|^3)$** time (or **$O(|V| |E| + |V|^2 \log |V|)$** using Fibonacci heaps).

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 Global Min-Cut vs. $s-t$ Min-Cut
- **$s-t$ Minimum Cut**: Separates a specific source node $s$ from a sink node $t$. Solved by Max-Flow Min-Cut Theorem in $O(V^2 E)$ using Dinic's Algorithm.
- **Global Minimum Cut**: Partition of $V$ into two non-empty sets $A$ and $B = V \setminus A$ such that the total weight of edges crossing between $A$ and $B$ is minimized:

$$w(A, B) = \sum_{u \in A, v \in B} w(u, v)$$

To compute Global Min-Cut using $s-t$ min-cut algorithms, one would need to fix an arbitrary node $s$ and run $s-t$ min-cut against all other $|V| - 1$ choices for $t$, resulting in $O(V^3 E)$ total work. Stoer-Wagner eliminates flow networks entirely by using **Maximum Adjacency Search (MAS)**.

```
       Global Minimum Cut Partition:
       
          +-------------------+         +-------------------+
          |     Subset A      |         |     Subset B      |
          |  (u_1, u_2, ...)  |         |  (v_1, v_2, ...)  |
          +-------------------+         +-------------------+
                    \                         /
                     \====== Min Cut Edges ==/
                             w(A, B)
```

### 1.2 Maximum Adjacency Search (MAS) / Minimum Cut Phase
A single phase of the Stoer-Wagner algorithm operates as follows:

1. Start with a set $A = \{a\}$ containing an arbitrary seed vertex $a \in V$.
2. Repeatedly pick the vertex $v \notin A$ that has the maximum weight of edges connected to vertices currently inside $A$:

$$w(A, v) = \sum_{u \in A} w(u, v)$$

3. Add $v$ to set $A$.
4. Repeat step 2 until all vertices in the graph are added to $A$.
5. Record the last two vertices added to $A$ in this phase; call them $s$ (second-to-last) and $t$ (last).

> **Key Lemma (Stoer & Wagner, 1997)**: The cut formed by separating the last vertex $t$ from all other vertices in the current graph, i.e., $w(\{t\}, V \setminus \{t\})$, is a **Minimum $s-t$ Cut** in the current graph.

```
MAXIMUM ADJACENCY SEARCH (MAS) PROGRESSION:
[Seed a] ---> Add v_1 (max w(A, v)) ---> Add v_2 ---> ... ---> Add s (2nd to last) ---> Add t (Last)

Current Phase Min-Cut Candidate: Cut weight w(t, V \ {t})
```

### 1.3 Vertex Contraction & Phase Loop
For the final two nodes $s$ and $t$ discovered in a phase:
- **Case 1**: The Global Min-Cut separates $s$ and $t$. Then the candidate cut $w(\{t\}, V \setminus \{t\})$ computed in this phase is a valid Global Min-Cut candidate.
- **Case 2**: The Global Min-Cut does **not** separate $s$ and $t$ (they belong to the same partition side). Then $s$ and $t$ can be **contracted** into a single combined node $st$.

The algorithm maintains the overall minimum cut value across all phases. In each phase:
1. Run Maximum Adjacency Search to find $s$ and $t$.
2. Update global minimum cut candidate: $\text{min\_cut} = \min(\text{min\_cut}, w(\{t\}, V \setminus \{t\}))$.
3. Merge vertex $t$ into vertex $s$:
   - For all $u \notin \{s, t\}$, update edge weights: $w(s, u) \leftarrow w(s, u) + w(t, u)$.
   - Remove vertex $t$ from the active graph.
4. Repeat for $|V| - 1$ phases until only 1 vertex remains.

---

## 2. Idiomatic Code Implementations

### 2.1 C# Implementation ($O(V^3)$ Stoer-Wagner)

```csharp
using System;
using System.Collections.Generic;

namespace AdvancedGraphFlows
{
    /// <summary>
    /// Implements Stoer-Wagner Algorithm for Global Minimum Cut on undirected weighted graphs.
    /// Operates in O(V^3) time using adjacency matrix representation.
    /// </summary>
    public class StoerWagner
    {
        private readonly int _n;
        private readonly long[,] _g; // Adjacency matrix for edge weights
        private const long Inf = long.MaxValue / 4;

        public StoerWagner(int n)
        {
            _n = n;
            _g = new long[n, n];
        }

        /// <summary>
        /// Adds an undirected edge between u and v with specified weight.
        /// </summary>
        public void AddEdge(int u, int v, long weight)
        {
            _g[u, v] += weight;
            _g[v, u] += weight;
        }

        /// <summary>
        /// Computes the Global Minimum Cut value and optionally partitions vertices.
        /// </summary>
        /// <returns>Weight of the global minimum cut.</returns>
        public long GetGlobalMinCut()
        {
            // Track active vertices remaining in the graph
            List<int> activeNodes = new List<int>();
            for (int i = 0; i < _n; i++)
            {
                activeNodes.Add(i);
            }

            // Copy graph matrix to avoid mutating original
            long[,] w = (long[,])_g.Clone();
            long minCut = Inf;

            // Phase loop: runs |V| - 1 phases
            while (activeNodes.Count > 1)
            {
                int currentVCount = activeNodes.Count;
                long[] wA = new long[currentVCount];
                bool[] inA = new bool[currentVCount];

                int prevNode = 0; // Index of second-to-last node (s)
                int lastNode = 0; // Index of last node (t)

                // Maximum Adjacency Search (MAS)
                for (int phaseStep = 0; phaseStep < currentVCount; phaseStep++)
                {
                    int maxIdx = -1;
                    long maxW = -1;

                    // Select vertex not in A with maximum connection weight to A
                    for (int i = 0; i < currentVCount; i++)
                    {
                        if (!inA[i] && wA[i] > maxW)
                        {
                            maxW = wA[i];
                            maxIdx = i;
                        }
                    }

                    if (maxIdx == -1) break;

                    inA[maxIdx] = true;
                    prevNode = lastNode;
                    lastNode = maxIdx;

                    // Accumulate weights to unvisited nodes
                    for (int i = 0; i < currentVCount; i++)
                    {
                        if (!inA[i])
                        {
                            int uReal = activeNodes[maxIdx];
                            int vReal = activeNodes[i];
                            wA[i] += w[uReal, vReal];
                        }
                    }
                }

                // Cut candidate weight for last node t
                long cutCandidate = wA[lastNode];
                minCut = Math.Min(minCut, cutCandidate);

                // Contract node s (prevNode) and node t (lastNode)
                int sReal = activeNodes[prevNode];
                int tReal = activeNodes[lastNode];

                for (int i = 0; i < currentVCount; i++)
                {
                    if (i != prevNode && i != lastNode)
                    {
                        int otherReal = activeNodes[i];
                        w[sReal, otherReal] += w[tReal, otherReal];
                        w[otherReal, sReal] = w[sReal, otherReal];
                    }
                }

                // Deactivate vertex t from active list
                activeNodes.RemoveAt(lastNode);
            }

            return minCut == Inf ? 0 : minCut;
        }
    }
}
```

### 2.2 Python Implementation

```python
from typing import List, Tuple

class StoerWagner:
    """
    Stoer-Wagner Algorithm for Global Minimum Cut on undirected weighted graphs.
    Time Complexity: O(V^3) using dense adjacency matrix representation.
    """
    INF = float('inf')

    def __init__(self, n: int):
        self.n = n
        self.weights = [[0] * n for _ in range(n)]

    def add_edge(self, u: int, v: int, w: int) -> None:
        """Adds an undirected edge between u and v with non-negative weight w."""
        self.weights[u][v] += w
        self.weights[v][u] += w

    def min_cut(self) -> int:
        """
        Computes Global Minimum Cut value.
        """
        active_nodes = list(range(self.n))
        # Deep copy weight matrix
        w = [row[:] for row in self.weights]
        global_min_cut = self.INF

        while len(active_nodes) > 1:
            current_v_count = len(active_nodes)
            w_a = [0] * current_v_count
            in_a = [False] * current_v_count

            prev_node = 0  # s
            last_node = 0  # t

            # Maximum Adjacency Search (MAS)
            for _ in range(current_v_count):
                max_idx = -1
                max_weight = -1

                for i in range(current_v_count):
                    if not in_a[i] and w_a[i] > max_weight:
                        max_weight = w_a[i]
                        max_idx = i

                if max_idx == -1:
                    break

                in_a[max_idx] = True
                prev_node = last_node
                last_node = max_idx

                for i in range(current_v_count):
                    if not in_a[i]:
                        u_real = active_nodes[max_idx]
                        v_real = active_nodes[i]
                        w_a[i] += w[u_real][v_real]

            # Cut weight of vertex t to set A \ {t}
            cut_candidate = w_a[last_node]
            global_min_cut = min(global_min_cut, cut_candidate)

            # Contract last_node (t) into prev_node (s)
            s_real = active_nodes[prev_node]
            t_real = active_nodes[last_node]

            for i in range(current_v_count):
                if i != prevNode and i != lastNode:
                    other_real = active_nodes[i]
                    w[s_real][other_real] += w[t_real][other_real]
                    w[other_real][s_real] = w[s_real][other_real]

            # Remove contracted node t
            active_nodes.pop(last_node)

        return 0 if global_min_cut == self.INF else global_min_cut
```

---

## 3. Complexity Analysis & Memory Overhead

| Variant / Data Structure | Time Complexity | Auxiliary Space | Key Mechanics |
| :--- | :--- | :--- | :--- |
| **Stoer-Wagner (Array MAS)** | $O(|V|^3)$ | $O(|V|^2)$ matrix | Simple linear search for max $w(A, v)$ in MAS. Preferred for dense graphs. |
| **Stoer-Wagner (Fibonacci Heap)** | $O(|V| |E| + |V|^2 \log |V|)$ | $O(|V| + |E|)$ | Priority queue / Fibonacci heap for key updates in MAS. |
| **Karger's Randomized Algorithm** | $O(|V|^2 \log^3 |V|)$ | $O(|V| + |E|)$ | Monte Carlo randomized edge contractions. |
| **Dinic's $s-t$ All-Pairs** | $O(|V|^3 |E|)$ | $O(|V| + |E|)$ | Fix $s$, run Dinic's against all $|V|-1$ choices of $t$. |

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

### 4.1 Applying Stoer-Wagner to Directed Graphs
- **Critical Violation**: Stoer-Wagner relies strictly on undirected symmetry $w(u, v) = w(v, u)$ for the MAS lemma to hold.
- **Correct Fix**: For directed graphs, Global Minimum Cut must be computed using $s-t$ flow cuts or Hao-Orlin algorithm ($O(|V| |E| \log(|V|^2 / |E|))$).

### 4.2 Incorrect Vertex Contraction Index Mapping
- **Anti-Pattern**: Removing node $t$ before updating merged edge weights for node $s$, or confusing temporary phase indices with real node IDs.
- **Correct Fix**: Maintain explicit mapping array `activeNodes` to translate between internal phase index \$0 \dots |A|-1$ and original vertex indices.

### 4.3 Handling Disconnected Graphs
- If the input graph has $\ge 2$ connected components, the Global Minimum Cut value is `0`. The algorithm naturally discovers a phase where $w_A[t] = 0$.

---

## 5. Related LeetCode Problems & Variant Patterns

1. **Global Minimum Cut in Infrastructure Networks**
   - Reliability modeling: Minimum total edge weight to disconnect a server network into two isolated partitions.

2. **Karger's Min-Cut vs Stoer-Wagner**
   - Karger's algorithm uses randomized edge contraction ($O(V^2 \log^3 V)$), whereas Stoer-Wagner is deterministic and guarantees exact min-cut.

3. **$s-t$ Min-Cut & Max Flow Problems**
   - When specific source $s$ and target $t$ are mandated, use [[network_flow_dinic_edmonds_karp_max_flow|Dinic's Max-Flow Algorithm]].
