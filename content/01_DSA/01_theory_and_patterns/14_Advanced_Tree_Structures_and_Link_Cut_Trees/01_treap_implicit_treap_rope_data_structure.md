---


title: "Treap, Implicit Treap & Rope Data Structure"
type: "pattern_guide"
category: "dsa"
subcategory: "14_Advanced_Tree_Structures_and_Link_Cut_Trees"
created_at: 2026-08-22T00:32:05+07:00
updated_at: 2026-08-22T00:32:05+07:00
tags: [dsa, treap, implicit-treap, rope-data-structure, cartesian-tree, randomized-data-structures, algorithms, computer-science, learning-note]
---


# Treap, Implicit Treap & Rope Data Structure

A **Treap** (Tree + Heap) is a randomized self-balancing binary search tree. Each node stores a search key $k$ and a randomly generated priority $p$. A Treap maintains the **Binary Search Tree property** with respect to keys $k$, and the **Max-Heap property** with respect to priorities $p$.

An **Implicit Treap** (or Cartesian Tree on sequence indices) replaces explicit search keys with implicit sequence positions derived from node subtree sizes (`size`). This enables dynamic array operations (range insertion, deletion, reversing, and aggregation) in $O(\log N)$ expected time. The **Rope Data Structure** leverages implicit search trees for high-performance string manipulation.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 Standard Treap vs Implicit Treap

```
Standard Treap Node:        Implicit Treap Node (Sequence Indexing):
+---------------------+    +------------------------------------+
| Key: k (BST order)  |    | Implicit Index: 1 + size(Left)     |
| Priority: p (Heap)  |    | Priority: p (Max-Heap order)       |
| Subtree Size: size  |    | Subtree Size: size                 |
+---------------------+    +------------------------------------+
```

1. **Randomized Priority Invariant**: Assigning uniformly random real values (or random 32-bit integers) as node priorities guarantees that a Treap of $N$ nodes has an expected height of $O(\log N)$ with extremely high probability (\$1 - 1/N^c$).
2. **Split & Merge Paradigm**: Instead of tree rotations, modern Treap operations are built upon two functional primitives:
   - **`Split(node, k)`**: Splits the tree into two disjoint Treaps $L$ and $R$, such that $L$ contains all keys $\le k$ (or first $k$ elements in an implicit treap) and $R$ contains all remaining keys.
   - **`Merge(L, R)`**: Merges two Treaps $L$ and $R$ into a single valid Treap, assuming all keys in $L$ precede all keys in $R$.

### 1.2 Sequence Operations with Implicit Treap

In an **Implicit Treap**, the key of node $x$ is not stored explicitly; it is implicitly defined as \$1 + \text{size}(x.\text{left})$. 

- **Range Slicing**: To isolate a range $[L, R]$, split the tree into $T_{left}$ (size $L-1$) and $T_{mid\_right}$ (size $N - L + 1$). Then split $T_{mid\_right}$ into $T_{target}$ (size $R - L + 1$) and $T_{right}$.
- **Range Reversal (`ReverseRange(L, R)`)**: Isolate $T_{target}$, set a lazy flag `rev = true` on its root (which swaps left and right subtrees upon traversal), and merge the components back.
- **Rope Data Structure**: High-performance string data structure representing text as an Implicit Treap of characters or string chunks. Concatenation of strings $S_1 + S_2$ is performed via `Merge(S1, S2)` in $O(\log N)$, and substring extractions are performed via `Split` in $O(\log N)$.

---

## 2. Idiomatic Code Implementations

### 2.1 C# Implementation

```csharp
using System;

public class ImplicitTreap
{
    private class Node
    {
        public int Val;
        public int Priority;
        public int Size;
        public long Sum;
        public bool Rev;
        public Node Left;
        public Node Right;

        public Node(int val, int priority)
        {
            Val = val;
            Priority = priority;
            Size = 1;
            Sum = val;
        }
    }

    private readonly Random _rand = new Random();
    private Node _root;

    private int GetSize(Node node) => node?.Size ?? 0;
    private long GetSum(Node node) => node?.Sum ?? 0;

    private void PushUp(Node node)
    {
        if (node == null) return;
        node.Size = 1 + GetSize(node.Left) + GetSize(node.Right);
        node.Sum = node.Val + GetSum(node.Left) + GetSum(node.Right);
    }

    private void PushDown(Node node)
    {
        if (node != null && node.Rev)
        {
            node.Rev = false;
            Node temp = node.Left;
            node.Left = node.Right;
            node.Right = temp;
            if (node.Left != null) node.Left.Rev ^= true;
            if (node.Right != null) node.Right.Rev ^= true;
        }
    }

    private (Node left, Node right) Split(Node node, int k)
    {
        if (node == null) return (null, null);

        PushDown(node);
        int leftSize = GetSize(node.Left);

        if (leftSize >= k)
        {
            var (ll, lr) = Split(node.Left, k);
            node.Left = lr;
            PushUp(node);
            return (ll, node);
        }
        else
        {
            var (rl, rr) = Split(node.Right, k - leftSize - 1);
            node.Right = rl;
            PushUp(node);
            return (node, rr);
        }
    }

    private Node Merge(Node left, Node right)
    {
        PushDown(left);
        PushDown(right);

        if (left == null) return right;
        if (right == null) return left;

        if (left.Priority > right.Priority)
        {
            left.Right = Merge(left.Right, right);
            PushUp(left);
            return left;
        }
        else
        {
            right.Left = Merge(left, right.Left);
            PushUp(right);
            return right;
        }
    }

    public void InsertAt(int index, int val)
    {
        var (l, r) = Split(_root, index);
        Node newNode = new Node(val, _rand.Next());
        _root = Merge(Merge(l, newNode), r);
    }

    public void DeleteAt(int index)
    {
        var (l, midRight) = Split(_root, index);
        var (mid, r) = Split(midRight, 1);
        _root = Merge(l, r);
    }

    public void ReverseRange(int leftIdx, int rightIdx)
    {
        var (l, midRight) = Split(_root, leftIdx);
        var (mid, r) = Split(midRight, rightIdx - leftIdx + 1);
        if (mid != null) mid.Rev ^= true;
        _root = Merge(Merge(l, mid), r);
    }

    public long QueryRangeSum(int leftIdx, int rightIdx)
    {
        var (l, midRight) = Split(_root, leftIdx);
        var (mid, r) = Split(midRight, rightIdx - leftIdx + 1);
        long res = GetSum(mid);
        _root = Merge(Merge(l, mid), r);
        return res;
    }
}
```

### 2.2 Python Implementation

```python
import random

class TreapNode:
    def __init__(self, val: int, priority: int = None):
        self.val = val
        self.priority = priority if priority is not None else random.randint(1, 10**9)
        self.size = 1
        self.sum = val
        self.rev = False
        self.left = None
        self.right = None

class ImplicitTreap:
    def __init__(self):
        self.root = None

    def _get_size(self, node: TreapNode) -> int:
        return node.size if node else 0

    def _get_sum(self, node: TreapNode) -> int:
        return node.sum if node else 0

    def _push_up(self, node: TreapNode) -> None:
        if not node:
            return
        node.size = 1 + self._get_size(node.left) + self._get_size(node.right)
        node.sum = node.val + self._get_sum(node.left) + self._get_sum(node.right)

    def _push_down(self, node: TreapNode) -> None:
        if node and node.rev:
            node.rev = False
            node.left, node.right = node.right, node.left
            if node.left:
                node.left.rev ^= True
            if node.right:
                node.right.rev ^= True

    def split(self, node: TreapNode, k: int) -> tuple[TreapNode, TreapNode]:
        if not node:
            return None, None

        self._push_down(node)
        left_size = self._get_size(node.left)

        if left_size >= k:
            ll, lr = self.split(node.left, k)
            node.left = lr
            self._push_up(node)
            return ll, node
        else:
            rl, rr = self.split(node.right, k - left_size - 1)
            node.right = rl
            self._push_up(node)
            return node, rr

    def merge(self, left: TreapNode, right: TreapNode) -> TreapNode:
        self._push_down(left)
        self._push_down(right)

        if not left:
            return right
        if not right:
            return left

        if left.priority > right.priority:
            left.right = self.merge(left.right, right)
            self._push_up(left)
            return left
        else:
            right.left = self.merge(left, right.left)
            self._push_up(right)
            return right

    def insert_at(self, index: int, val: int) -> None:
        l, r = self.split(self.root, index)
        new_node = TreapNode(val)
        self.root = self.merge(self.merge(l, new_node), r)

    def delete_at(self, index: int) -> None:
        l, mid_right = self.split(self.root, index)
        mid, r = self.split(mid_right, 1)
        self.root = self.merge(l, r)

    def reverse_range(self, left_idx: int, right_idx: int) -> None:
        l, mid_right = self.split(self.root, left_idx)
        mid, r = self.split(mid_right, right_idx - left_idx + 1)
        if mid:
            mid.rev ^= True
        self.root = self.merge(self.merge(l, mid), r)

    def query_range_sum(self, left_idx: int, right_idx: int) -> int:
        l, mid_right = self.split(self.root, left_idx)
        mid, r = self.split(mid_right, right_idx - left_idx + 1)
        res = self._get_sum(mid)
        self.root = self.merge(self.merge(l, mid), r)
        return res
```

---

## 3. Complexity Analysis & Memory Overhead

| Operation | Expected Complexity | Worst-Case Complexity | Auxiliary Space |
| :--- | :--- | :--- | :--- |
| `Split` | $O(\log N)$ | $O(N)$ | $O(\log N)$ stack |
| `Merge` | $O(\log N)$ | $O(N)$ | $O(\log N)$ stack |
| `InsertAt` | $O(\log N)$ | $O(N)$ | $O(\log N)$ |
| `DeleteAt` | $O(\log N)$ | $O(N)$ | $O(\log N)$ |
| `ReverseRange` | $O(\log N)$ | $O(N)$ | $O(\log N)$ |
| `QueryRangeSum`| $O(\log N)$ | $O(N)$ | $O(\log N)$ |

### Randomization Invariant & Treap Height
The probability that a Treap with random priorities has height $> c \log N$ decays exponentially as $N \to \infty$. By standard Cartesian Tree properties, the expected path length between any two nodes is \$2 \ln N \approx 1.386 \log_2 N$.

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

1. **Forgetting `PushDown` Before `Split` or `Merge`**: Interleaved lazy propagation tags (e.g. `rev`) will produce corrupted subtree allocations if pointers are accessed before `PushDown` is invoked.
2. **Off-by-One Index Calculation in `Split`**: In an implicit treap, when `left_size < k`, the right branch recursive call must split on `k - left_size - 1` (subtracting 1 for the current node itself).
3. **Priority Collisions**: Generating priorities from a narrow range (e.g. `rand() % 100`) leads to priority ties, degrading the BST height toward $O(N)$. Use 32-bit or 64-bit random values.

---

## 5. Related LeetCode Problems & Variant Patterns

1. **Dynamic Reversible Array & String Manipulations**:
   - Rope Data Structure (Concatenation and slicing of long strings).
   - LeetCode 715 (Range Module)
   - LeetCode 307 (Range Sum Query - Mutable)
2. **Tree Structural Alternatives**:
   - [[splay_tree_self_balancing_bst|Splay Tree]]: Deterministic self-adjusting alternative.
   - [[segment_trees_fenwick_trees_lazy_propagation|Segment Tree]]: Static range update structure.
