---


title: "Computational Geometry: Line Segment Intersection & Bentley-Ottmann Sweep-Line"
type: "pattern_guide"
category: "dsa"
subcategory: "12_Computational_Geometry"
created_at: 2026-08-22T00:31:06+07:00
updated_at: 2026-08-22T00:31:06+07:00
tags: [dsa, computational-geometry, sweep-line, bentley-ottmann, line-segment-intersection, balanced-bst, priority-queue, algorithms, computer-science, learning-note]
---


# Computational Geometry: Line Segment Intersection & Bentley-Ottmann Sweep-Line

Testing for line segment intersections is a foundational computational geometry problem. Checking all pairs among $N$ line segments requires $O(N^2)$ scalar cross-product comparisons. The **Bentley-Ottmann Algorithm** reduces this complexity to $O((N + K) \log N)$ time (where $K$ is the number of intersection points) by maintaining a dynamic sweep line and processing events ordered along the spatial coordinate axes.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 Pairwise Segment Intersection Primitives
Before tackling the multi-segment sweep-line algorithm, determining whether two line segments $AB$ and $CD$ intersect requires two geometric predicates:

1. **Bounding Box Overlap (Quick Rejection Test)**:
   - Segments cannot intersect if their axis-aligned bounding boxes do not overlap.
   - $\max(A_x, B_x) \ge \min(C_x, D_x) \land \max(C_x, D_x) \ge \min(A_x, B_x)$
   - $\max(A_y, B_y) \ge \min(C_y, D_y) \land \max(C_y, D_y) \ge \min(A_y, B_y)$

2. **Straddle Test via Orientation (Cross-Product)**:
   - Segment $AB$ straddles the line containing $CD$ if points $A$ and $B$ lie on opposite sides of $CD$.
   - $\text{CrossProduct}(C, D, A) \times \text{CrossProduct}(C, D, B) \le 0$
   - $\text{CrossProduct}(A, B, C) \times \text{CrossProduct}(A, B, D) \le 0$

If both segments mutually straddle each other's supporting lines (or have collinear endpoint overlaps), they intersect.

---

### 1.2 Bentley-Ottmann Sweep-Line Paradigm
The key intuition behind Bentley-Ottmann is that **two segments can only intersect if they become adjacent along the vertical sweep line** $x = x_{sweep}$ immediately prior to intersecting.

```
       Event Queue Q (Sorted by X)
  X_sweep --->
  |       / S1 (Segment 1)
  |      / 
  |     * <--- Intersection Event
  |    / \
  |   /   \ S2 (Segment 2)
  +---------------------------------> X
  Sweep Status S (BST of active segments ordered by Y at X_sweep)
```

#### Dual Data Structures:
1. **Event Queue ($Q$)**:
   - Priority Queue (Min-Heap) ordered by $x$-coordinate (primary) and $y$-coordinate (secondary).
   - Event Types:
     - **Start Event**: Left endpoint of a segment.
     - **End Event**: Right endpoint of a segment.
     - **Intersection Event**: Point where two adjacent active segments cross.

2. **Sweep Line Status ($S$)**:
   - Self-Balancing Binary Search Tree (`SortedSet` in C#, `std::set` in C++, or balanced BST) holding segments currently intersected by the vertical line $x = x_{sweep}$.
   - Ordered by the $y$-coordinate of the segment at $x = x_{sweep}$.

#### Algorithm Execution Flow:
1. **Initialize**: Insert all $2N$ segment endpoints into $Q$.
2. **Process Events**: While $Q$ is non-empty:
   - Pop next event $E$ at coordinate $(x_E, y_E)$.
   - **Case 1: Start Event of Segment $s$**:
     - Insert $s$ into $S$.
     - Check for intersection between $s$ and its upper neighbor $s_{above}$ in $S$. If found, add intersection event to $Q$.
     - Check for intersection between $s$ and its lower neighbor $s_{below}$ in $S$. If found, add intersection event to $Q$.
   - **Case 2: End Event of Segment $s$**:
     - Locate $s_{above}$ and $s_{below}$ around $s$ in $S$.
     - Remove $s$ from $S$.
     - Check if $s_{above}$ and $s_{below}$ now intersect. If found, add intersection event to $Q$.
   - **Case 3: Intersection Event between $s_1$ and $s_2$**:
     - Report intersection point.
     - Swap positions of $s_1$ and $s_2$ in $S$ (since their relative $y$-order flips past the intersection point).
     - Check for new intersections between $s_1, s_2$ and their new neighbors in $S$.

---

## 2. Idiomatic Code Implementations

### 2.1 C# Implementation (Pairwise Intersection & Sweep-Line Framework)

```csharp
using System;
using System.Collections.Generic;

public class LineSegmentIntersection
{
    public struct Point : IComparable<Point>
    {
        public double X, Y;
        public Point(double x, double y) { X = x; Y = y; }

        public int CompareTo(Point other)
        {
            if (Math.Abs(X - other.X) > 1e-9) return X.CompareTo(other.X);
            return Y.CompareTo(other.Y);
        }

        public override string ToString() => $"({X:F2}, {Y:F2})";
    }

    public class Segment
    {
        public int Id;
        public Point P1, P2;

        public Segment(int id, Point p1, Point p2)
        {
            Id = id;
            // Ensure P1 is the left endpoint
            if (p1.CompareTo(p2) > 0)
            {
                P1 = p2;
                P2 = p1;
            }
            else
            {
                P1 = p1;
                P2 = p2;
            }
        }

        /// <summary>
        /// Calculates Y coordinate at given X on this segment.
        /// </summary>
        public double GetYAtX(double x)
        {
            if (Math.Abs(P2.X - P1.X) < 1e-9) return P1.Y;
            return P1.Y + (x - P1.X) * (P2.Y - P1.Y) / (P2.X - P1.X);
        }
    }

    private static double CrossProduct(Point a, Point b, Point c)
    {
        return (b.X - a.X) * (c.Y - a.Y) - (b.Y - a.Y) * (c.X - a.X);
    }

    private static bool OnSegment(Point p, Point a, Point b)
    {
        return p.X >= Math.Min(a.X, b.X) - 1e-9 && p.X <= Math.Max(a.X, b.X) + 1e-9 &&
               p.Y >= Math.Min(a.Y, b.Y) - 1e-9 && p.Y <= Math.Max(a.Y, b.Y) + 1e-9;
    }

    /// <summary>
    /// Robust pairwise intersection test between two segments.
    /// </summary>
    public static bool DoSegmentsIntersect(Segment s1, Segment s2, out Point intersection)
    {
        intersection = new Point(0, 0);

        double cp1 = CrossProduct(s1.P1, s1.P2, s2.P1);
        double cp2 = CrossProduct(s1.P1, s1.P2, s2.P2);
        double cp3 = CrossProduct(s2.P1, s2.P2, s1.P1);
        double cp4 = CrossProduct(s2.P1, s2.P2, s1.P2);

        // General case: Straddle test
        if (((cp1 > 0 && cp2 < 0) || (cp1 < 0 && cp2 > 0)) &&
            ((cp3 > 0 && cp4 < 0) || (cp3 < 0 && cp4 > 0)))
        {
            // Compute exact intersection coordinates using linear system
            double a1 = s1.P2.Y - s1.P1.Y;
            double b1 = s1.P1.X - s1.P2.X;
            double c1 = a1 * s1.P1.X + b1 * s1.P1.Y;

            double a2 = s2.P2.Y - s2.P1.Y;
            double b2 = s2.P1.X - s2.P2.X;
            double c2 = a2 * s2.P1.X + b2 * s2.P1.Y;

            double det = a1 * b2 - a2 * b1;
            if (Math.Abs(det) > 1e-9)
            {
                intersection.X = (b2 * c1 - b1 * c2) / det;
                intersection.Y = (a1 * c2 - a2 * c1) / det;
                return true;
            }
        }

        // Special Collinear / Boundary cases
        if (Math.Abs(cp1) < 1e-9 && OnSegment(s2.P1, s1.P1, s1.P2)) { intersection = s2.P1; return true; }
        if (Math.Abs(cp2) < 1e-9 && OnSegment(s2.P2, s1.P1, s1.P2)) { intersection = s2.P2; return true; }
        if (Math.Abs(cp3) < 1e-9 && OnSegment(s1.P1, s2.P1, s2.P2)) { intersection = s1.P1; return true; }
        if (Math.Abs(cp4) < 1e-9 && OnSegment(s1.P2, s2.P1, s2.P2)) { intersection = s1.P2; return true; }

        return false;
    }
}
```

---

### 2.2 Python Implementation (Bentley-Ottmann Any-Intersection Detector)

```python
import heapq
from typing import List, Tuple, Optional

class Point:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def __lt__(self, other: 'Point') -> bool:
        if abs(self.x - other.x) > 1e-9:
            return self.x < other.x
        return self.y < other.y

    def __repr__(self):
        return f"({self.x:.2f}, {self.y:.2f})"

class Segment:
    def __init__(self, seg_id: int, p1: Point, p2: Point):
        self.id = seg_id
        if p1 < p2:
            self.p1 = p1
            self.p2 = p2
        else:
            self.p1 = p2
            self.p2 = p1

    def get_y(self, x: float) -> float:
        if abs(self.p2.x - self.p1.x) < 1e-9:
            return self.p1.y
        return self.p1.y + (x - self.p1.x) * (self.p2.y - self.p1.y) / (self.p2.x - self.p1.x)

def cross_product(a: Point, b: Point, c: Point) -> float:
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)

def segments_intersect(s1: Segment, s2: Segment) -> bool:
    """Checks if segment s1 and s2 intersect using straddle and bounding box tests."""
    cp1 = cross_product(s1.p1, s1.p2, s2.p1)
    cp2 = cross_product(s1.p1, s1.p2, s2.p2)
    cp3 = cross_product(s2.p1, s2.p2, s1.p1)
    cp4 = cross_product(s2.p1, s2.p2, s1.p2)

    if ((cp1 > 0 and cp2 < 0) or (cp1 < 0 and cp2 > 0)) and \
       ((cp3 > 0 and cp4 < 0) or (cp3 < 0 and cp4 > 0)):
        return True

    # Check collinear endpoint overlaps
    def on_seg(p: Point, seg: Segment) -> bool:
        return (min(seg.p1.x, seg.p2.x) - 1e-9 <= p.x <= max(seg.p1.x, seg.p2.x) + 1e-9 and
                min(seg.p1.y, seg.p2.y) - 1e-9 <= p.y <= max(seg.p1.y, seg.p2.y) + 1e-9)

    if abs(cp1) < 1e-9 and on_seg(s2.p1, s1): return True
    if abs(cp2) < 1e-9 and on_seg(s2.p2, s1): return True
    if abs(cp3) < 1e-9 and on_seg(s1.p1, s2): return True
    if abs(cp4) < 1e-9 and on_seg(s1.p2, s2): return True

    return False

def check_any_intersection(segments: List[Segment]) -> bool:
    """
    Shamos-Hoey algorithm variant using sweep line to test if any pair intersects.
    Time: O(N log N), Space: O(N)
    """
    events = []
    # Event format: (x, event_type, y, segment_id)
    # event_type: 0 = START, 1 = END
    for seg in segments:
        heapq.heappush(events, (seg.p1.x, 0, seg.p1.y, seg))
        heapq.heappush(events, (seg.p2.x, 1, seg.p2.y, seg))

    active_segments: List[Segment] = []

    while events:
        x_curr, event_type, y_curr, seg = heapq.heappop(events)

        if event_type == 0:  # START event
            # Insert seg into active_segments, maintaining y-order at x_curr
            active_segments.append(seg)
            active_segments.sort(key=lambda s: s.get_y(x_curr))
            idx = active_segments.index(seg)

            # Check neighbors
            if idx > 0 and segments_intersect(active_segments[idx - 1], seg):
                return True
            if idx < len(active_segments) - 1 and segments_intersect(active_segments[idx + 1], seg):
                return True

        else:  # END event
            if seg in active_segments:
                idx = active_segments.index(seg)
                if 0 < idx < len(active_segments) - 1:
                    if segments_intersect(active_segments[idx - 1], active_segments[idx + 1]):
                        return True
                active_segments.remove(seg)

    return False
```

---

## 3. Complexity Analysis & Memory Overhead

| Metric | Naive Pairwise Check | Bentley-Ottmann Sweep-Line | Shamos-Hoey (Any Intersection) |
| :--- | :--- | :--- | :--- |
| **Time Complexity** | $O(N^2)$ | $O((N + K) \log N)$ | $O(N \log N)$ |
| **Space Complexity** | $O(1)$ | $O(N + K)$ | $O(N)$ |
| **Primary Bottleneck** | Pairwise cross products | Dynamic BST ordering & Priority Queue updates | Sorting event queue + BST lookups |

- $N$: Number of line segments.
- $K$: Total number of intersection points found across all segments.

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

1. **Dynamic Comparator Invalidation in BST**:
   - *Anti-Pattern*: Ordering active segments in a BST using $y(x_{sweep})$ when $x_{sweep}$ changes. If two segments cross, their relative order in the tree flips. Updating $x_{sweep}$ without re-balancing or handling swaps corrupts BST properties.
   - *Fix*: Explicitly handle **Intersection Events** where adjacent segments are swapped in the active status structure.

2. **Vertical Segments ($x_1 = x_2$)**:
   - *Anti-Pattern*: Division by zero when evaluating $y(x) = y_1 + (x - x_1) \frac{y_2 - y_1}{x_2 - x_1}$.
   - *Fix*: Treat vertical segments as zero-width bounding boxes or handle $x_1 = x_2$ explicitly by using $y_1$ as the evaluation point.

3. **Multiple Coincident Intersections**:
   - When more than two segments intersect at the exact same point $(x, y)$, standard pair swaps can lead to infinite loops.
   - *Fix*: Group coincident intersection events at $(x, y)$ together, reverse their relative ordering in the active tree, and re-check outer neighbors once.

---

## 5. Related LeetCode Problems & Variant Patterns

1. **LeetCode 850: Rectangle Area II (Hard)**
   - *Pattern*: 1D Sweep line with interval union to compute total area covered by $N$ rectangles in $O(N \log N)$ time.
2. **LeetCode 218: The Skyline Problem (Hard)**
   - *Pattern*: Sweep line over building coordinates maintaining active building heights using a Max-Heap / Multiset.
3. **Shamos-Hoey Algorithm**:
   - *Pattern*: Simplified $O(N \log N)$ sweep line algorithm that halts immediately upon finding the *first* intersection without needing to process all $K$ intersections.
