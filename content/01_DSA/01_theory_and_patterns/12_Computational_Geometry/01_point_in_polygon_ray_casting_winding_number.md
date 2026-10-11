---


title: "Computational Geometry: Point-in-Polygon Testing via Ray Casting & Winding Number"
type: "pattern_guide"
category: "dsa"
subcategory: "12_Computational_Geometry"
created_at: 2026-08-22T00:31:06+07:00
updated_at: 2026-08-22T00:31:06+07:00
tags: [dsa, computational-geometry, point-in-polygon, ray-casting, winding-number, cross-product, jordan-curve-theorem, algorithms, computer-science, learning-note]
---


# Computational Geometry: Point-in-Polygon Testing via Ray Casting & Winding Number

Determining whether a 2D query point $P(x, y)$ lies **inside**, **outside**, or on the **boundary** of an arbitrary polygon $V = \{V_0, V_1, \dots, V_{n-1}\}$ is a fundamental query in geometric computing.

Two primary algorithms solve this problem:
1. **Ray Casting Algorithm (Even-Odd Rule)**: Fast, intuitive, and based on the **Jordan Curve Theorem**.
2. **Winding Number Algorithm**: Robust for self-intersecting, non-simple, or complex overlapping polygons.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 Ray Casting Algorithm (Even-Odd Rule)
The **Ray Casting** algorithm relies on the Jordan Curve Theorem: any continuous closed curve divides the 2D plane into two disjoint regions (an "inside" and an "outside").

```
             Ray -> (Horizontal line to +Infinity)
  Outside        |-------> (1 intersection) -> INSIDE
                 |       |-------> (2 intersections) -> OUTSIDE
           +-----+-----+
           |  P (Query)|
           |  *------->|-------> (1 intersection) -> INSIDE
           +-----------+
```

#### Algorithmic Steps:
1. Cast a ray from query point $P(x_p, y_p)$ in an arbitrary direction (typically horizontally rightward along $+x$: $y = y_p, x \ge x_p$).
2. Count the number of polygon edges intersected by the ray.
3. **Parity Check**:
   - If total intersections $K$ is **odd** $\implies P$ is **INSIDE**.
   - If total intersections $K$ is **even** $\implies P$ is **OUTSIDE**.

#### Edge Rules to Prevent Degeneracy:
- **Vertex Intersection**: If the ray intersects an edge at a vertex, it could be counted twice (once for each incident edge).
  - *Rule*: Include an edge $V_i V_{i+1}$ in intersection testing if and only if one endpoint lies strictly above the ray and the other lies at or below the ray ($y_i > y_p \neq y_{i+1} > y_p$).
- **Horizontal Edges**: Edges parallel to the ray ($y_i = y_{i+1} = y_p$) are ignored because they do not cross the ray's $y$-threshold.

---

### 1.2 Winding Number Algorithm
The **Winding Number** $W(P, V)$ measures the total number of times the polygon $V$ wraps counter-clockwise around the point $P$.

Mathematically, it represents the line integral of the subtended angle $\theta$:

$$W(P, V) = \frac{1}{2\pi} \oint_V d\theta = \frac{1}{2\pi} \sum_{i=0}^{n-1} \text{angle}(V_i, P, V_{i+1})$$

- $W(P, V) \neq 0 \implies P$ is **INSIDE**.
- $W(P, V) = 0 \implies P$ is **OUTSIDE**.

```
    Winding = +1 (CCW Wrap)           Winding = 0 (Outside)
       V1 <-- V0                          V1 <-- V0
       |   *   ^                          |       ^
       v  (P)  |                          v       |  * (P)
       V2 --> V3                          V2 --> V3
```

#### Fast Non-Trigonometric Winding Number:
Instead of computing costly inverse trigonometric functions (`atan2`), we track vertical edge crossings relative to $P$:
1. For each edge $V_i V_{i+1}$:
   - If edge crosses from **below to above** ($y_i \le y_p < y_{i+1}$) and $P$ is strictly to the **left** of the directed edge ($\text{CrossProduct}(V_i, V_{i+1}, P) > 0$), increment $W$ by $+1$.
   - If edge crosses from **above to below** ($y_i > y_p \ge y_{i+1}$) and $P$ is strictly to the **right** of the directed edge ($\text{CrossProduct}(V_i, V_{i+1}, P) < 0$), decrement $W$ by $-1$.
2. Final $W \neq 0 \implies P$ is inside.

---

## 2. Idiomatic Code Implementations

### 2.1 C# Implementation (Ray Casting & Winding Number with Boundary Check)

```csharp
using System;
using System.Collections.Generic;

public class PointInPolygon
{
    public struct Point
    {
        public double X, Y;
        public Point(double x, double y) { X = x; Y = y; }
    }

    public enum LocationResult
    {
        Outside,
        Inside,
        Boundary
    }

    private static double CrossProduct(Point a, Point b, Point c)
    {
        return (b.X - a.X) * (c.Y - a.Y) - (b.Y - a.Y) * (c.X - a.X);
    }

    /// <summary>
    /// Checks if point P lies on line segment AB.
    /// </summary>
    public static bool IsPointOnSegment(Point p, Point a, Point b)
    {
        double cp = CrossProduct(a, b, p);
        if (Math.Abs(cp) > 1e-9) return false;

        return p.X >= Math.Min(a.X, b.X) - 1e-9 && p.X <= Math.Max(a.X, b.X) + 1e-9 &&
               p.Y >= Math.Min(a.Y, b.Y) - 1e-9 && p.Y <= Math.Max(a.Y, b.Y) + 1e-9;
    }

    /// <summary>
    /// Ray Casting Algorithm (Even-Odd Rule).
    /// Time: O(N), Space: O(1).
    /// </summary>
    public static LocationResult RayCasting(Point p, List<Point> polygon)
    {
        int n = polygon.Count;
        bool inside = false;

        for (int i = 0; i < n; i++)
        {
            Point a = polygon[i];
            Point b = polygon[(i + 1) % n];

            // Check if P lies on polygon boundary
            if (IsPointOnSegment(p, a, b)) return LocationResult.Boundary;

            // Check ray crossing condition (ray extended to right along +X)
            bool intersectCondition = ((a.Y > p.Y) != (b.Y > p.Y)) &&
                (p.X < (b.X - a.X) * (p.Y - a.Y) / (b.Y - a.Y) + a.X);

            if (intersectCondition)
            {
                inside = !inside;
            }
        }

        return inside ? LocationResult.Inside : LocationResult.Outside;
    }

    /// <summary>
    /// Fast Winding Number Algorithm (O(N) time, O(1) space).
    /// Handles self-intersecting and non-simple polygons correctly.
    /// </summary>
    public static LocationResult WindingNumber(Point p, List<Point> polygon)
    {
        int n = polygon.Count;
        int winding = 0;

        for (int i = 0; i < n; i++)
        {
            Point a = polygon[i];
            Point b = polygon[(i + 1) % n];

            if (IsPointOnSegment(p, a, b)) return LocationResult.Boundary;

            if (a.Y <= p.Y)
            {
                // Upward edge
                if (b.Y > p.Y)
                {
                    // P is left of directed edge AB
                    if (CrossProduct(a, b, p) > 0)
                    {
                        winding++;
                    }
                }
            }
            else
            {
                // Downward edge
                if (b.Y <= p.Y)
                {
                    // P is right of directed edge AB
                    if (CrossProduct(a, b, p) < 0)
                    {
                        winding--;
                    }
                }
            }
        }

        return winding != 0 ? LocationResult.Inside : LocationResult.Outside;
    }
}
```

---

### 2.2 Python Implementation (Ray Casting & Fast Winding Number)

```python
from typing import List, Tuple
from enum import Enum

Point = Tuple[float, float]

class Location(Enum):
    OUTSIDE = 0
    INSIDE = 1
    BOUNDARY = 2

def cross_product(a: Point, b: Point, c: Point) -> float:
    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])

def is_on_segment(p: Point, a: Point, b: Point) -> bool:
    """Checks if point P lies on segment AB."""
    cp = cross_product(a, b, p)
    if abs(cp) > 1e-9:
        return False
    return (min(a[0], b[0]) - 1e-9 <= p[0] <= max(a[0], b[0]) + 1e-9 and
            min(a[1], b[1]) - 1e-9 <= p[1] <= max(a[1], b[1]) + 1e-9)

def ray_casting(p: Point, polygon: List[Point]) -> Location:
    """
    Ray Casting Algorithm (Even-Odd Rule).
    Time: O(N), Space: O(1)
    """
    n = len(polygon)
    inside = False
    px, py = p

    for i in range(n):
        a = polygon[i]
        b = polygon[(i + 1) % n]

        if is_on_segment(p, a, b):
            return Location.BOUNDARY

        # Ray extended to +Infinity along X axis at Y = py
        if (a[1] > py) != (b[1] > py):
            # Calculate X coordinate of edge AB at Y = py
            x_intersect = (b[0] - a[0]) * (py - a[1]) / (b[1] - a[1]) + a[0]
            if px < x_intersect:
                inside = not inside

    return Location.INSIDE if inside else Location.OUTSIDE

def winding_number(p: Point, polygon: List[Point]) -> Location:
    """
    Fast Winding Number Algorithm without trigonometric calls.
    Time: O(N), Space: O(1)
    """
    n = len(polygon)
    wn = 0
    px, py = p

    for i in range(n):
        a = polygon[i]
        b = polygon[(i + 1) % n]

        if is_on_segment(p, a, b):
            return Location.BOUNDARY

        if a[1] <= py:
            if b[1] > py:  # Upward edge crossing
                if cross_product(a, b, p) > 0:  # P strictly left of AB
                    wn += 1
        else:
            if b[1] <= py:  # Downward edge crossing
                if cross_product(a, b, p) < 0:  # P strictly right of AB
                    wn -= 1

    return Location.INSIDE if wn != 0 else Location.OUTSIDE
```

---

## 3. Complexity Analysis & Memory Overhead

| Algorithm | Query Time Complexity | Auxiliary Space | Handles Self-Intersecting Polygons? | Numerical Stability |
| :--- | :--- | :--- | :--- | :--- |
| **Ray Casting (Even-Odd)** | $O(N)$ | $O(1)$ | No (Fails on overlapping sub-polygons) | Good (Division only on ray intersection) |
| **Fast Winding Number** | $O(N)$ | $O(1)$ | Yes (Full winding count accuracy) | Excellent (Integer cross-products) |
| **Binary Search (Convex)** | $O(\log N)$ | $O(N)$ | Only for Convex Polygons | Excellent |

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

1. **Ray Vertices Intersection Degeneracy**:
   - *Anti-Pattern*: Checking $y_i \ge y_p$ vs $y_i > y_p$ inconsistently causes rays passing through a vertex to toggle the `inside` state twice.
   - *Fix*: Enforce strict asymmetric inequalities: `(a.Y > p.Y) != (b.Y > p.Y)`.

2. **Skipping Boundary Checks**:
   - *Anti-Pattern*: Performing ray casting directly on points lying on polygon edges or vertices leads to arbitrary boolean results due to floating-point division.
   - *Fix*: Always test `is_on_segment(p, a, b)` using cross product prior to evaluating ray/winding transitions.

3. **Horizontal Segment Division by Zero**:
   - In ray casting, evaluating $x_{intersect}$ when $a_y = b_y$ causes division by zero (`b.Y - a.Y = 0`). Asymmetric inequalities automatically skip horizontal segments because `(a.Y > py) != (b.Y > py)` evaluates to false.

---

## 5. Related LeetCode Problems & Variant Patterns

1. **LeetCode 478: Generate Random Point in a Circle (Medium)**
   - *Pattern*: Rejection sampling using point-in-geometry membership test.
2. **LeetCode 2280: Minimum Lines to Represent a Line Chart (Medium)**
   - *Pattern*: Utilizing 2D cross products for collinear point validation without division.
3. **Point in Convex Polygon in $O(\log N)$ Time**:
   - *Pattern*: Decompose convex polygon vertices into wedges around origin $V_0$. Use binary search to locate the wedge containing query point $P$, then test orientation against the wedge base segment.
