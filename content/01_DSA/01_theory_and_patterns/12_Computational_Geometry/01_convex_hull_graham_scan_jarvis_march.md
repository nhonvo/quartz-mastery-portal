---


title: "Computational Geometry: Convex Hull via Graham Scan & Jarvis March"
type: "pattern_guide"
category: "dsa"
subcategory: "12_Computational_Geometry"
created_at: 2026-08-22T00:31:06+07:00
updated_at: 2026-08-22T00:31:06+07:00
tags: [dsa, computational-geometry, convex-hull, graham-scan, jarvis-march, cross-product, monotone-chain, algorithms, computer-science, learning-note]
---


# Computational Geometry: Convex Hull via Graham Scan & Jarvis March

The **Convex Hull** of a 2D set of points $S$ is the smallest convex polygon that completely encloses all points in $S$. Formally, it is the intersection of all convex sets containing $S$. Mechanically, if you visualize points as nails sticking out of a board, the convex hull is the boundary formed by stretching an elastic rubber band around all the nails and letting it snap tight.

Finding the convex hull is a fundamental primitive in computational geometry with widespread applications in collision detection, geographic information systems (GIS), image processing, and pattern recognition.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 Fundamental Orientation Test (2D Cross Product)
All convex hull algorithms rely on determining the relative orientation of three ordered points $P_1(x_1, y_1)$, $P_2(x_2, y_2)$, and $P_3(x_3, y_3)$. 

The 2D cross product of vectors $\vec{P_1 P_2}$ and $\vec{P_1 P_3}$ measures the signed area of the parallelogram formed by the two vectors:

$$\text{CrossProduct}(P_1, P_2, P_3) = (x_2 - x_1)(y_3 - y_1) - (y_2 - y_1)(x_3 - x_1)$$

- $\text{CrossProduct} > 0$: Counter-clockwise (CCW) turn (left turn from $\vec{P_1 P_2}$ to $\vec{P_1 P_3}$).
- $\text{CrossProduct} < 0$: Clockwise (CW) turn (right turn from $\vec{P_1 P_2}$ to $\vec{P_1 P_3}$).
- $\text{CrossProduct} = 0$: $P_1, P_2, P_3$ are collinear.

```
Counter-Clockwise (CCW > 0)       Clockwise (CW < 0)           Collinear (Cross == 0)
        P3                             P2                        P1 ---- P2 ---- P3
       /                              /
      /                              /
  P1 ---- P2                     P1 ---- P3
```

---

### 1.2 Monotone Chain (Andrew's Algorithm / Graham Scan Variant)
While classical **Graham Scan** sorts points by polar angle around a pivot $P_0$, **Andrew's Monotone Chain algorithm** is generally preferred in production and competitive programming due to superior numerical stability and simpler coordinate sorting.

#### Mechanics:
1. **Sort Points**: Sort all $N$ points lexicographically by $x$-coordinate (primary key) and $y$-coordinate (secondary key).
2. **Build Lower Hull**:
   - Iterate through sorted points from left to right.
   - Maintain a monotonic stack of hull vertices.
   - For each point $P_i$, while the stack has $\ge 2$ elements and the top two elements plus $P_i$ make a non-left turn ($\text{CrossProduct} \le 0$), pop the stack top.
   - Push $P_i$ onto the stack.
3. **Build Upper Hull**:
   - Iterate through sorted points from right to left.
   - Repeat the stack maintenance procedure to construct the top half of the hull.
4. **Combine**: Merge lower and upper hulls (omitting redundant endpoints).

```
Step 1: Sort lexicographically by (x, y)
Step 2: Lower Hull Sweep (Left -> Right)
        Stack pops points that cause right/collinear turns.
Step 3: Upper Hull Sweep (Right -> Left)
        Stack pops points that cause right/collinear turns.
Step 4: Resulting closed convex polygon.
```

---

### 1.3 Jarvis March (Gift Wrapping Algorithm)
**Jarvis March** simulates wrapping a string around the point set.

#### Mechanics:
1. Start at the leftmost point $P_0$ (guaranteed to be on the hull).
2. To find the next hull point $P_{next}$ from current point $P_{curr}$, select candidate point $Q$ such that for all other points $R$, the triplet $(P_{curr}, Q, R)$ forms a left turn (counter-clockwise).
3. Update $P_{curr} \leftarrow P_{next}$.
4. Repeat until $P_{curr}$ returns to $P_0$.

Jarvis March is an **output-sensitive algorithm**: its runtime depends directly on $H$, the number of vertices on the final hull.

---

## 2. Idiomatic Code Implementations

### 2.1 C# Implementation (Monotone Chain & Jarvis March)

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class ConvexHull
{
    public struct Point : IComparable<Point>
    {
        public long X;
        public long Y;

        public Point(long x, long y)
        {
            X = x;
            Y = y;
        }

        public int CompareTo(Point other)
        {
            if (X != other.X) return X.CompareTo(other.X);
            return Y.CompareTo(other.Y);
        }

        public override string ToString() => $"({X}, {Y})";
    }

    /// <summary>
    /// Computes 2D Cross Product of vector (P1 -> P2) and (P1 -> P3).
    /// > 0 : Counter-Clockwise (Left turn)
    /// < 0 : Clockwise (Right turn)
    /// = 0 : Collinear
    /// </summary>
    public static long CrossProduct(Point p1, Point p2, Point p3)
    {
        return (p2.X - p1.X) * (p3.Y - p1.Y) - (p2.Y - p1.Y) * (p3.X - p1.X);
    }

    /// <summary>
    /// Monotone Chain algorithm for Convex Hull (O(N log N) time, O(N) space).
    /// Returns vertices of convex hull in counter-clockwise order.
    /// </summary>
    public static List<Point> GetConvexHullMonotoneChain(List<Point> points, bool includeCollinear = false)
    {
        int n = points.Count;
        if (n <= 3) return new List<Point>(points);

        // Sort lexicographically by X then Y
        points.Sort();

        List<Point> hull = new List<Point>();

        // Build Lower Hull
        for (int i = 0; i < n; i++)
        {
            while (hull.Count >= 2)
            {
                long cp = CrossProduct(hull[hull.Count - 2], hull[hull.Count - 1], points[i]);
                if (includeCollinear ? cp < 0 : cp <= 0)
                {
                    hull.RemoveAt(hull.Count - 1);
                }
                else
                {
                    break;
                }
            }
            hull.Add(points[i]);
        }

        // Build Upper Hull
        int lowerHullSize = hull.Count;
        for (int i = n - 2; i >= 0; i--)
        {
            while (hull.Count > lowerHullSize)
            {
                long cp = CrossProduct(hull[hull.Count - 2], hull[hull.Count - 1], points[i]);
                if (includeCollinear ? cp < 0 : cp <= 0)
                {
                    hull.RemoveAt(hull.Count - 1);
                }
                else
                {
                    break;
                }
            }
            hull.Add(points[i]);
        }

        // Remove duplicate starting point
        if (hull.Count > 1) hull.RemoveAt(hull.Count - 1);

        return hull;
    }

    /// <summary>
    /// Jarvis March (Gift Wrapping) algorithm (O(N * H) time, O(H) space).
    /// </summary>
    public static List<Point> GetConvexHullJarvisMarch(List<Point> points)
    {
        int n = points.Count;
        if (n <= 3) return new List<Point>(points);

        List<Point> hull = new List<Point>();

        // Find leftmost point (smallest X, tie-break smallest Y)
        int startPoint = 0;
        for (int i = 1; i < n; i++)
        {
            if (points[i].X < points[startPoint].X || 
               (points[i].X == points[startPoint].X && points[i].Y < points[startPoint].Y))
            {
                startPoint = i;
            }
        }

        int current = startPoint;
        do
        {
            hull.Add(points[current]);
            int next = (current + 1) % n;

            for (int i = 0; i < n; i++)
            {
                // If point 'i' is more counter-clockwise than 'next', update 'next'
                long cp = CrossProduct(points[current], points[next], points[i]);
                if (cp < 0) // Right turn means points[i] is to the left of line current->next
                {
                    next = i;
                }
            }

            current = next;
        } while (current != startPoint);

        return hull;
    }
}
```

---

### 2.2 Python Implementation (Monotone Chain & Jarvis March)

```python
from typing import List, Tuple

Point = Tuple[int, int]

def cross_product(p1: Point, p2: Point, p3: Point) -> int:
    """
    Computes 2D Cross Product (P2 - P1) x (P3 - P1).
    > 0: Left turn (CCW)
    < 0: Right turn (CW)
    = 0: Collinear
    """
    return (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0])

def monotone_chain(points: List[Point], include_collinear: bool = False) -> List[Point]:
    """
    Monotone Chain (Andrew's Algorithm) for Convex Hull.
    Time: O(N log N), Space: O(N)
    """
    n = len(points)
    if n <= 3:
        return list(set(points))

    # Sort lexicographically by x-coordinate, then y-coordinate
    sorted_pts = sorted(points)

    lower = []
    for p in sorted_pts:
        while len(lower) >= 2:
            cp = cross_product(lower[-2], lower[-1], p)
            if cp < 0 or (not include_collinear and cp == 0):
                lower.pop()
            else:
                break
        lower.append(p)

    upper = []
    for p in reversed(sorted_pts):
        while len(upper) >= 2:
            cp = cross_product(upper[-2], upper[-1], p)
            if cp < 0 or (not include_collinear and cp == 0):
                upper.pop()
            else:
                break
        upper.append(p)

    # Concatenate lower and upper hull, dropping duplicate endpoints
    return lower[:-1] + upper[:-1]

def jarvis_march(points: List[Point]) -> List[Point]:
    """
    Jarvis March (Gift Wrapping Algorithm).
    Time: O(N * H), Space: O(H)
    """
    n = len(points)
    if n <= 3:
        return list(set(points))

    # Find the leftmost point
    start_idx = min(range(n), key=lambda i: (points[i][0], points[i][1]))
    
    hull = []
    curr_idx = start_idx

    while True:
        hull.append(points[curr_idx])
        next_idx = (curr_idx + 1) % n

        for i in range(n):
            if i == curr_idx:
                continue
            cp = cross_product(points[curr_idx], points[next_idx], points[i])
            # If points[i] is strictly counter-clockwise relative to next_idx
            if cp < 0:
                next_idx = i

        curr_idx = next_idx
        if curr_idx == start_idx:
            break

    return hull
```

---

## 3. Complexity Analysis & Memory Overhead

| Algorithm | Time Complexity (Best) | Time Complexity (Average/Worst) | Auxiliary Space | Memory Overhead |
| :--- | :--- | :--- | :--- | :--- |
| **Monotone Chain (Graham Scan)** | $O(N \log N)$ | $O(N \log N)$ | $O(N)$ | Array sorting allocation + stack recursion frame |
| **Jarvis March (Gift Wrapping)** | $O(N)$ (if $H=3$) | $O(N \cdot H)$ / $O(N^2)$ (if $H=N$) | $O(H)$ | Minimal output array allocation |
| **Chan's Algorithm** | $O(N \log H)$ | $O(N \log H)$ | $O(N)$ | Partitioning points into groups of size $m$ |

- **Integer Overflow**: Always use `long` (64-bit integer) for cross-product evaluations when coordinate range $[-10^9, 10^9]$ can yield cross-product values up to \$2 \cdot 10^{18}$.

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

1. **Floating Point Roundoff Error**:
   - *Anti-Pattern*: Using `double` slope division $m = (y_2 - y_1) / (x_2 - x_1)$ or `atan2` angle sorting leads to precision loss when points are near-collinear.
   - *Fix*: Always perform orientation tests using exact 64-bit integer cross products `(dx1 * dy2 - dy1 * dx2)`.

2. **Collinear Point Mishandling**:
   - Depending on problem requirements (e.g. LeetCode 587 *Erect the Fence*), collinear points on the boundary must be preserved rather than popped.
   - *Fix*: Modify cross-product condition check: use `cp < 0` to pop non-left turns when including collinear points, vs `cp <= 0` when strictly requiring extreme corner vertices.

3. **Duplicate / Degenerate Point Sets**:
   - If input contains identical points $P_i = P_j$, angle sorting or distance comparisons without deduplication cause infinite loops or invalid hulls.

---

## 5. Related LeetCode Problems & Variant Patterns

1. **LeetCode 587: Erect the Fence (Hard)**
   - *Pattern*: Standard Convex Hull where collinear points on the fence boundary must be included.
2. **Rotating Calipers Technique**:
   - *Pattern*: Computing maximum distance pair (diameter) or minimum bounding rectangle of a point set in $O(N)$ time after constructing the convex hull.
3. **Dynamic Convex Hull (Chan's Algorithm)**:
   - *Pattern*: Combining Graham Scan on subsets with Jarvis March outer wrap to achieve $O(N \log H)$ performance.
