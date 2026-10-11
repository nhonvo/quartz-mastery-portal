---


title: "Advanced Combinatorics: Burnside's Lemma & Pólya Enumeration Theorem"
type: "pattern_guide"
category: "dsa"
subcategory: "11_Advanced_Game_Theory_and_Combinatorics"
created_at: 2026-08-22T00:30:43+07:00
updated_at: 2026-08-22T00:30:43+07:00
tags: [dsa, combinatorics, burnside-lemma, polya-enumeration, group-theory, permutation-groups, cycle-index, symmetry, algorithms, computer-science, learning-note]
---


# Advanced Combinatorics: Burnside's Lemma & Pólya Enumeration Theorem

Counting symmetric objects up to equivalence (e.g., distinct circular necklaces under rotation, colored 3D cubes under rigid rotations, or graph isomorphism classes) requires abstract algebra and group theory. Standard combinatorial counting over-counts symmetric states that transform into one another under spatial operations.

**Burnside's Lemma** (also called the Cauchy-Frobenius Lemma) and its generalization, the **Pólya Enumeration Theorem (PET)**, provide an exact combinatorial method to count the number of non-equivalent orbits under a permutation group action $G$.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 Group Actions, Orbits, and Stabilizers
Let $X$ be a set of configurations (e.g., all $k^N$ ways to color $N$ beads on a necklace with $k$ colors).
Let $G$ be a finite **permutation group** acting on $X$.

- **Orbit $\text{Orb}(x)$**: The set of all configurations reachable from $x$ by applying group operations:
  $$\text{Orb}(x) = \{ g \cdot x \mid g \in G \}$$
  The set of orbits $X / G$ forms a partition of $X$. Two configurations belong to the same orbit if and only if they are symmetrically identical. Counting "distinct objects up to symmetry" equals calculating the number of orbits $|X / G|$.

- **Fixed Points $\text{Fix}(g)$**: The subset of configurations unchanged by a specific permutation $g \in G$:
  $$\text{Fix}(g) = \{ x \in X \mid g \cdot x = x \}$$

### 1.2 Burnside's Lemma
Burnside's Lemma states that the number of distinct orbits $|X / G|$ is the arithmetic mean of the number of fixed points across all group elements $g \in G$:

$$|X / G| = \frac{1}{|G|} \sum_{g \in G} |\text{Fix}(g)|$$

```
   Group Operations G = {Rot0, Rot90, Rot180, Rot270}
   Configurations X = {All 2x2 binary colorings}

   |X/G| = 1/|G| * ( |Fix(Rot0)| + |Fix(Rot90)| + |Fix(Rot180)| + |Fix(Rot270)| )
```

### 1.3 Pólya Enumeration Theorem (PET)
Pólya generalized Burnside's Lemma by analyzing the **cycle structure** of permutations acting on the elements of a domain (e.g., the $N$ positions of a necklace).

Every permutation $g \in G$ can be uniquely decomposed into disjoint cycles $(c_1)(c_2)\dots(c_{c(g)})$, where $c(g)$ is the total number of disjoint cycles in $g$.

If we color elements using $k$ available colors, a configuration $x$ is fixed under $g$ ($g \cdot x = x$) if and only if **all elements within each cycle of $g$ receive the exact same color**.

Thus, the number of fixed configurations for permutation $g$ is simply:
$$|\text{Fix}(g)| = k^{c(g)}$$

Substituting into Burnside's Lemma yields **Pólya's Enumeration Formula**:

$$|X / G| = \frac{1}{|G|} \sum_{g \in G} k^{c(g)}$$

### 1.4 Special Case: Circular Necklaces (Cyclic & Dihedral Groups)
For a circular necklace of $N$ beads colored with $k$ colors:
1. **Rotations only (Cyclic Group $C_N$)**:
   - Rotations by $r \in \{0, 1, \dots, N-1\}$ have $c(r) = \gcd(r, N)$ cycles.
   - Formula:
     $$|X / C_N| = \frac{1}{N} \sum_{r=0}^{N-1} k^{\gcd(r, N)} = \frac{1}{N} \sum_{d \mid N} \phi(d) \cdot k^{N/d}$$
     where $\phi(d)$ is Euler's totient function.

2. **Rotations + Reflections (Dihedral Group $D_N$)**:
   - Group size $|D_N| = 2N$.
   - Includes $N$ rotations and $N$ reflections:
     - **Odd $N$**: Each of the $N$ reflection axes passes through 1 vertex and 1 opposite edge midpoint, giving $(N-1)/2 + 1 = (N+1)/2$ cycles per reflection.
     - **Even $N$**: $N/2$ axes pass through 2 opposite vertices ($N/2 + 1$ cycles), and $N/2$ axes pass through 2 opposite edge midpoints ($N/2$ cycles).

---

## 2. Idiomatic Code Implementations (C# & Python)

### 2.1 C# Implementation

```csharp
using System;
using System.Collections.Generic;

namespace DSALearning.Combinatorics
{
    /// <summary>
    /// Implements Burnside's Lemma and Pólya Enumeration Theorem for symmetric counting.
    /// </summary>
    public class PolyaEnumerationSolver
    {
        private const int MOD = 1_000_000_007;

        /// <summary>
        /// Calculates distinct necklace colorings under rotations (Cyclic Group C_n) modulo 10^9+7.
        /// </summary>
        /// <param name="n">Number of beads in necklace.</param>
        /// <param name="k">Number of available colors.</param>
        public static long CountNecklacesRotationOnly(int n, int k)
        {
            long sumFix = 0;

            for (int r = 0; r < n; r++)
            {
                int numCycles = Gcd(r, n);
                long fixG = ModPow(k, numCycles, MOD);
                sumFix = (sumFix + fixG) % MOD;
            }

            long nInverse = ModInverse(n, MOD);
            return (sumFix * nInverse) % MOD;
        }

        /// <summary>
        /// Calculates distinct bracelet colorings under rotations + reflections (Dihedral Group D_n).
        /// </summary>
        public static long CountBraceletsRotationAndReflection(int n, int k)
        {
            long sumFixRotations = 0;

            // 1. Rotation symmetries (C_n part)
            for (int r = 0; r < n; r++)
            {
                int numCycles = Gcd(r, n);
                sumFixRotations = (sumFixRotations + ModPow(k, numCycles, MOD)) % MOD;
            }

            // 2. Reflection symmetries
            long sumFixReflections = 0;
            if (n % 2 != 0)
            {
                // Odd n: n axes, each with (n + 1) / 2 cycles
                int numCycles = (n + 1) / 2;
                long fixReflect = ModPow(k, numCycles, MOD);
                sumFixReflections = (n * fixReflect) % MOD;
            }
            else
            {
                // Even n: n/2 vertex-vertex axes ((n/2 + 1) cycles), n/2 edge-edge axes (n/2 cycles)
                long fixVertexVertex = ModPow(k, (n / 2) + 1, MOD);
                long fixEdgeEdge = ModPow(k, n / 2, MOD);
                sumFixReflections = ((n / 2) * fixVertexVertex + (n / 2) * fixEdgeEdge) % MOD;
            }

            long totalSum = (sumFixRotations + sumFixReflections) % MOD;
            long groupSizeInverse = ModInverse(2 * n, MOD);

            return (totalSum * groupSizeInverse) % MOD;
        }

        /// <summary>
        /// Computes exact cycle count for an arbitrary permutation array.
        /// </summary>
        public static int CountPermutationCycles(int[] perm)
        {
            int n = perm.Length;
            bool[] visited = new bool[n];
            int cycles = 0;

            for (int i = 0; i < n; i++)
            {
                if (!visited[i])
                {
                    cycles++;
                    int curr = i;
                    while (!visited[curr])
                    {
                        visited[curr] = true;
                        curr = perm[curr];
                    }
                }
            }

            return cycles;
        }

        private static int Gcd(int a, int b)
        {
            while (b != 0)
            {
                int temp = b;
                b = a % b;
                a = temp;
            }
            return a;
        }

        private static long ModPow(long baseVal, long exp, long mod)
        {
            long res = 1;
            baseVal %= mod;
            while (exp > 0)
            {
                if ((exp & 1) == 1) res = (res * baseVal) % mod;
                baseVal = (baseVal * baseVal) % mod;
                exp >>= 1;
            }
            return res;
        }

        private static long ModInverse(long n, long mod)
        {
            return ModPow(n, mod - 2, mod);
        }
    }
}
```

### 2.2 Python Implementation

```python
import math
from typing import List

class PolyaEnumerationSolver:
    """
    Implements Burnside's Lemma and Pólya Enumeration Theorem for symmetric counting.
    """
    MOD = 1_000_000_007

    @classmethod
    def count_necklaces_rotation_only(cls, n: int, k: int) -> int:
        """
        Calculates distinct necklace colorings under rotational symmetry (Cyclic Group C_n).
        """
        sum_fix = 0
        for r in range(n):
            num_cycles = math.gcd(r, n)
            sum_fix = (sum_fix + pow(k, num_cycles, cls.MOD)) % cls.MOD

        n_inv = pow(n, cls.MOD - 2, cls.MOD)
        return (sum_fix * n_inv) % cls.MOD

    @classmethod
    def count_bracelets_rotation_and_reflection(cls, n: int, k: int) -> int:
        """
        Calculates distinct bracelet colorings under rotational + reflectional symmetry (Dihedral Group D_n).
        """
        sum_rotations = 0
        for r in range(n):
            num_cycles = math.gcd(r, n)
            sum_rotations = (sum_rotations + pow(k, num_cycles, cls.MOD)) % cls.MOD

        sum_reflections = 0
        if n % 2 != 0:
            # Odd n: n reflection axes, each having (n + 1) // 2 cycles
            cycles = (n + 1) // 2
            sum_reflections = (n * pow(k, cycles, cls.MOD)) % cls.MOD
        else:
            # Even n: n//2 vertex-to-vertex axes, n//2 edge-to-edge axes
            cycles_vv = (n // 2) + 1
            cycles_ee = n // 2
            sum_reflections = (
                (n // 2) * pow(k, cycles_vv, cls.MOD) +
                (n // 2) * pow(k, cycles_ee, cls.MOD)
            ) % cls.MOD

        total_sum = (sum_rotations + sum_reflections) % cls.MOD
        group_inv = pow(2 * n, cls.MOD - 2, cls.MOD)
        return (total_sum * group_inv) % cls.MOD

    @staticmethod
    def count_permutation_cycles(perm: List[int]) -> int:
        """
        Computes the number of disjoint cycles in a 0-indexed permutation array.
        """
        n = len(perm)
        visited = [False] * n
        cycles = 0

        for i in range(n):
            if not visited[i]:
                cycles += 1
                curr = i
                while not visited[curr]:
                    visited[curr] = True
                    curr = perm[curr]

        return cycles
```

---

## 3. Complexity Analysis & Memory Overhead

| Algorithm / Operation | Time Complexity | Auxiliary Space | Explanation |
| :--- | :--- | :--- | :--- |
| **Necklace Counting ($C_N$)** | $O(N \log N)$ or $O(\sqrt{N} \log N)$ | $O(1)$ | Sums $k^{\gcd(r, N)}$ across $N$ rotations or over divisors using $\phi(d)$. |
| **Bracelet Counting ($D_N$)** | $O(N \log N)$ | $O(1)$ | Combines cyclic rotation sum with $O(1)$ reflection cycle evaluations. |
| **Arbitrary Group Orbit Count** | $O(|G| \cdot N)$ | $O(N)$ | Decomposes $|G|$ group permutations into cycle structures over domain $N$. |
| **Modular Exponentiation** | $O(\log N)$ | $O(1)$ | Computes $k^{c(g)} \bmod M$ via binary exponentiation. |

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

1. **Confusing $C_N$ (Rotations) and $D_N$ (Rotations + Reflections)**:
   - Necklaces strictly model rotational symmetry (Group size $N$). Bracelets model physical flip reflections as well (Group size $2N$). Applying $C_N$ to bracelets over-counts un-flipped equivalents.

2. **Reflection Cycle Count Errors for Even $N$**:
   - Assuming all reflections in $D_N$ have identical cycle counts. For even $N$, vertex-passing reflection axes fix 2 vertices ($N/2 + 1$ cycles), whereas edge-passing axes fix 0 vertices ($N/2$ cycles).

3. **Division by Group Size in Modular Arithmetic**:
   - Performing integer division `sum_fix / |G|` before modulo arithmetic, leading to truncation or incorrect modular values. Division by $|G|$ must be executed via multiplication with modular inverse $|G|^{M-2} \bmod M$.

4. **Zero-Based vs One-Based Permutation Indexing**:
   - In cycle decomposition (`count_permutation_cycles`), failing to map 1-indexed domain elements to 0-indexed array targets leads to infinite loops or invalid indices.

---

## 5. Related LeetCode Problems & Variant Patterns

1. **Necklace / Bracelet Coloring (Codeforces / Hackerrank)**:
   - *Problem*: Count non-isomorphic colorings of an $N$-bead necklace using $K$ colors under rotation and flipping.
   - *Pattern*: Direct Pólya Enumeration with $D_N$.

2. **Grid / Chessboard Rotational Symmetry**:
   - *Variant*: $N \times N$ binary grid states under 90, 180, 270 degree rotations (Group $G = C_4$).
   - *Cycle Counts*:
     - 0°: $N^2$ cycles of size 1.
     - 180°: $\lceil N^2 / 2 \rceil$ cycles of size 2.
     - 90° / 270°: $\lceil N^2 / 4 \rceil$ cycles of size 4 (plus 1 center pixel if $N$ is odd).

3. **Graph Isomorphism Class Counting**:
   - *Pattern*: Applying Burnside's Lemma over the symmetric group $S_V$ acting on $V \times V$ edge slots to count unlabelled simple graphs on $V$ vertices.
