---


title: "Advanced Game Theory: Nim Game & Sprague-Grundy Theorem"
type: "pattern_guide"
category: "dsa"
subcategory: "11_Advanced_Game_Theory_and_Combinatorics"
created_at: 2026-08-22T00:30:43+07:00
updated_at: 2026-08-22T00:30:43+07:00
tags: [dsa, game-theory, nim-game, sprague-grundy, xor-sum, combinatorial-games, mex-function, grundy-values, algorithms, computer-science, learning-note]
---


# Advanced Game Theory: Nim Game & Sprague-Grundy Theorem

Combinatorial Game Theory (CGT) analyzes sequential, deterministic games played under perfect information with no element of chance. The **Sprague-Grundy Theorem** provides a fundamental reduction for impartial games: any state in an impartial game played under the **Normal Play Convention** (where the last player to make a valid move wins) is mathematically isomorphic to a single heap of size $G(s)$ in the classic game of **Nim**.

By mapping arbitrary game states to non-negative integer Grundy values (also called nim-values) using the **Minimum Excluded Value ($\text{mex}$)** operator, complex multi-component games decompose into bitwise XOR arithmetic.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 Impartial Games & Normal Play Convention
An **impartial game** satisfies three core criteria:
1. Two players alternate turns taking valid moves.
2. The set of available moves from any game state $s$ is identical for both players.
3. The game terminates in a finite number of steps with no draw cycles.

Under normal play convention, a player unable to make a move loses, rendering the player who made the final move the winner.

### 1.2 Bouton's Theorem for Classic Nim
In classic Nim, there are $K$ heaps containing $p_1, p_2, \dots, p_K$ tokens. A player on their turn chooses a single non-empty heap and removes any positive number of tokens up to the heap's entire contents.

Charles L. Bouton (1901) proved that a Nim position is a **Loss (P-position)** for the current player if and only if the **Nim-sum** (bitwise XOR sum) of all heap sizes is zero:
$$S = p_1 \oplus p_2 \oplus \dots \oplus p_K = 0$$

- **Winning State (N-position)**: $S \neq 0$. The current player can always choose a heap $p_i$ and reduce it to $p_i' = p_i \oplus S < p_i$, transitioning the game to a position with Nim-sum 0.
- **Losing State (P-position)**: $S = 0$. Any valid move made by the current player on any heap must alter at least one bit of the XOR sum, forcing $S' \neq 0$ for the opponent.

```
       Heap Sizes:  [3, 5, 7]
       3 -> 0 1 1 (binary)
       5 -> 1 0 1 (binary)
       7 -> 1 1 1 (binary)
     ---------------------
 Nim-sum  -> 0 0 1  (S = 1 != 0 => Winning Position)
 Move: Reduce Heap 7 (111_2) to 6 (110_2) -> New Nim-sum = 0
```

### 1.3 The Sprague-Grundy Theorem & Mex Function
The Sprague-Grundy Theorem generalizes Nim logic to *all* finite, impartial games.

1. **Grundy Value Function $G(s)$**:
   For any state $s$, its Grundy value $G(s)$ is the smallest non-negative integer absent from the Grundy values of all immediate reachable successor states $t \in \text{Children}(s)$:
   $$G(s) = \text{mex}\left( \{ G(t) \mid s \to t \} \right)$$
   where $\text{mex}(S) = \min\left( \{ x \in \mathbb{Z}_{\ge 0} \mid x \notin S \} \right)$.

2. **Terminal States**: A terminal state $s_{\text{term}}$ with no valid outgoing moves has $G(s_{\text{term}}) = \text{mex}(\emptyset) = 0$.

3. **Game Composition**:
   If an overall game $S$ consists of $K$ independent subgames $S_1, S_2, \dots, S_K$ where a player on their turn selects exactly one subgame $S_i$ and makes a valid move in it, the total Grundy value of the compound state is:
   $$G(S) = G(S_1) \oplus G(S_2) \oplus \dots \oplus G(S_K)$$

   - If $G(S) \neq 0$, the first player has a guaranteed winning strategy.
   - If $G(S) = 0$, the second player has a guaranteed winning strategy.

---

## 2. Idiomatic Code Implementations (C# & Python)

### 2.1 C# Implementation

```csharp
using System;
using System.Collections.Generic;

namespace DSALearning.GameTheory
{
    /// <summary>
    /// Implements Sprague-Grundy theorem for composite impartial games and Nim evaluation.
    /// </summary>
    public class SpragueGrundySolver
    {
        private readonly Dictionary<int, int> _memo = new Dictionary<int, int>();
        private readonly int[] _allowedMoves;

        public SpragueGrundySolver(int[] allowedMoves)
        {
            _allowedMoves = allowedMoves;
        }

        /// <summary>
        /// Computes the Grundy value (nim-value) for a single subgame state using DP + Mex.
        /// </summary>
        /// <param name="state">Current pile size or state integer.</param>
        /// <returns>Non-negative Grundy value G(state).</returns>
        public int ComputeGrundy(int state)
        {
            if (state == 0) return 0;
            if (_memo.TryGetValue(state, out int cached)) return cached;

            var reachableGrundyValues = new HashSet<int>();

            foreach (int move in _allowedMoves)
            {
                if (state >= move)
                {
                    int nextState = state - move;
                    reachableGrundyValues.Add(ComputeGrundy(nextState));
                }
            }

            int grundy = ComputeMex(reachableGrundyValues);
            _memo[state] = grundy;
            return grundy;
        }

        /// <summary>
        /// Computes Minimum Excluded Value (mex) of a set of integers.
        /// </summary>
        public static int ComputeMex(HashSet<int> values)
        {
            int mex = 0;
            while (values.Contains(mex))
            {
                mex++;
            }
            return mex;
        }

        /// <summary>
        /// Determines if a multi-pile game state is a winning position for the current player.
        /// </summary>
        /// <param name="heapStates">Array of pile sizes.</param>
        /// <returns>True if current player can guarantee a win, false otherwise.</returns>
        public bool IsWinningPosition(int[] heapStates)
        {
            int totalXorSum = 0;
            foreach (int heap in heapStates)
            {
                totalXorSum ^= ComputeGrundy(heap);
            }
            return totalXorSum != 0;
        }

        /// <summary>
        /// Identifies a optimal winning move if available.
        /// </summary>
        /// <param name="heapStates">Current heap state array.</param>
        /// <returns>Tuple of (heapIndex, targetState) or null if losing position.</returns>
        public (int HeapIndex, int TargetState)? FindWinningMove(int[] heapStates)
        {
            int totalXorSum = 0;
            int[] grundyValues = new int[heapStates.Length];

            for (int i = 0; i < heapStates.Length; i++)
            {
                grundyValues[i] = ComputeGrundy(heapStates[i]);
                totalXorSum ^= grundyValues[i];
            }

            if (totalXorSum == 0) return null; // Losing position

            for (int i = 0; i < heapStates.Length; i++)
            {
                int targetGrundy = grundyValues[i] ^ totalXorSum;
                if (targetGrundy < grundyValues[i])
                {
                    // Find valid move from heapStates[i] that yields targetGrundy
                    foreach (int move in _allowedMoves)
                    {
                        if (heapStates[i] >= move)
                        {
                            int nextState = heapStates[i] - move;
                            if (ComputeGrundy(nextState) == targetGrundy)
                            {
                                return (i, nextState);
                            }
                        }
                    }
                }
            }

            return null;
        }
    }
}
```

### 2.2 Python Implementation

```python
from typing import List, Dict, Set, Optional, Tuple
from functools import lru_cache

class SpragueGrundySolver:
    """
    Implements Sprague-Grundy theorem and Nim-sum XOR evaluation for impartial games.
    """
    def __init__(self, allowed_moves: List[int]):
        self.allowed_moves = tuple(allowed_moves)
        self.memo: Dict[int, int] = {}

    def compute_grundy(self, state: int) -> int:
        """
        Recursively computes the Grundy value G(state) using state transition Mex.
        """
        if state == 0:
            return 0
        if state in self.memo:
            return self.memo[state]

        reachable_grundy: Set[int] = set()
        for move in self.allowed_moves:
            if state >= move:
                next_state = state - move
                reachable_grundy.add(self.compute_grundy(next_state))

        grundy = self._compute_mex(reachable_grundy)
        self.memo[state] = grundy
        return grundy

    @staticmethod
    def _compute_mex(values: Set[int]) -> int:
        """Computes the Minimum Excluded non-negative integer (mex)."""
        mex = 0
        while mex in values:
            mex += 1
        return mex

    def is_winning_position(self, heaps: List[int]) -> bool:
        """
        Evaluates composite game state across multiple heaps.
        Returns True if total Grundy XOR-sum != 0 (Winning position).
        """
        total_xor_sum = 0
        for heap in heaps:
            total_xor_sum ^= self.compute_grundy(heap)
        return total_xor_sum != 0

    def find_winning_move(self, heaps: List[int]) -> Optional[Tuple[int, int]]:
        """
        Identifies a winning move (heap_index, new_heap_state).
        Returns None if position is losing (P-position).
        """
        grundy_values = [self.compute_grundy(h) for h in heaps]
        total_xor_sum = 0
        for g in grundy_values:
            total_xor_sum ^= g

        if total_xor_sum == 0:
            return None  # P-position, no winning move exists

        for i, heap in enumerate(heaps):
            target_grundy = grundy_values[i] ^ total_xor_sum
            if target_grundy < grundy_values[i]:
                for move in self.allowed_moves:
                    if heap >= move:
                        next_state = heap - move
                        if self.compute_grundy(next_state) == target_grundy:
                            return (i, next_state)

        return None
```

---

## 3. Complexity Analysis & Memory Overhead

| Operation | Time Complexity | Auxiliary Space Complexity | Explanation |
| :--- | :--- | :--- | :--- |
| **Grundy Computation $G(s)$** | $O(N \cdot M)$ | $O(N)$ | For $N$ states and $M$ allowed transitions, DP explores each state once. |
| **Mex Set Lookups** | $O(K \log K)$ or $O(K)$ | $O(K)$ | Finding smallest missing non-negative integer among $K$ reachable child states. |
| **Multi-Heap Evaluation** | $O(H \cdot \text{Cost}(G))$ | $O(H + N)$ | Evaluates $H$ heap components using XOR composition. |
| **Winning Move Lookup** | $O(H \cdot M)$ | $O(1)$ | Scans $H$ heaps to find a subgame transition reducing $G_i$ to $G_i \oplus S$. |

### Memory Overhead Breakdown
- **Memoization Table**: Stores $N$ integer key-value pairs in a hash map. Space is proportional to maximal reachable state value $N$.
- **Call Stack Depth**: Max recursion depth is $O(N)$ for linear game step reductions.

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

1. **Misère Play vs Normal Play Misinterpretation**:
   - In **Misère Play** (where the last player to move *loses*), standard Sprague-Grundy XOR sum rules hold for almost all states *until* all heaps contain $\le 1$ token. When all remaining heaps have size $\le 1$, the winning condition flips: the position is winning if and only if an *odd* number of 1-sized heaps remain.

2. **Incorrect Mex Calculation**:
   - Returning `min(values)` instead of `mex(values)`. For instance, if reachable values are $\{1, 2, 3\}$, $\text{min}$ is 1, but $\text{mex}$ is 0 because 0 is absent.

3. **Treating Partisan Games as Impartial**:
   - Sprague-Grundy theorem *only* applies to impartial games where available moves are identical for both players. For partisan games (e.g., Chess, Go, Hex where players control distinct color pieces), Conway's Surreal Number Theory / Game Value theory must be used instead.

4. **Off-by-One in Terminal State Definition**:
   - Declaring $G(1) = 0$ when 1 item can still be taken. Terminal states (0 remaining moves) must evaluate to $G(s) = 0$.

---

## 5. Related LeetCode Problems & Variant Patterns

1. **LeetCode 292 - Nim Game**:
   - *Problem*: Single pile of $n$ stones, players take 1, 2, or 3 stones.
   - *Grundy Pattern*: $G(n) = n \bmod 4$. Winning if $n \bmod 4 \neq 0$.

2. **LeetCode 877 - Stone Game / LeetCode 1406 - Stone Game III**:
   - *Variant*: Minimax DP vs Sprague-Grundy; evaluates game values under score optimization.

3. **Staircase Nim Pattern**:
   - *Variant*: Coins on steps \$1 \dots N$. Moving a coin from step $i$ to $i-1$.
   - *Reduction*: Isomorphic to Nim on **odd-indexed steps** only ($p_1, p_3, p_5, \dots$). Moves on even steps can always be mirrored by the opponent on the subsequent odd step.

4. **Green Hackenbush & Turning Turtles**:
   - Graph/Tree edge deletion games reduced to Grundy values on edge cycles and tree branches using the **Colon Principle**.
