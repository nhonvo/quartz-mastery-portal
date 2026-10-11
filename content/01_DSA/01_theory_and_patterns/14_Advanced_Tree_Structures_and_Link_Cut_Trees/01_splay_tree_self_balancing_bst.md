---


title: "Splay Tree: Amortized Self-Balancing Binary Search Tree"
type: "pattern_guide"
category: "dsa"
subcategory: "14_Advanced_Tree_Structures_and_Link_Cut_Trees"
created_at: 2026-08-22T00:32:05+07:00
updated_at: 2026-08-22T00:32:05+07:00
tags: [dsa, splay-tree, binary-search-tree, self-balancing-bst, amortized-analysis, data-structures, algorithms, computer-science, learning-note]
---


# Splay Tree: Amortized Self-Balancing Binary Search Tree

A **Splay Tree** is a self-adjusting binary search tree (BST) invented by Daniel Sleator and Robert Tarjan. Unlike AVL trees or Red-Black trees, a Splay Tree maintains no explicit balance information (such as height or node color). Instead, whenever any node is accessed (searched, inserted, or deleted), it is moved to the root of the tree via a sequence of tree rotations called **splaying**.

Splay Trees guarantee an $O(\log N)$ amortized time bound per operation over any sequence of tree accesses, while automatically adjusting to exploit temporal locality in access patterns.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 Rotation Primitives & Splay Cases

During a `Splay(x)` operation, node $x$ is repeatedly rotated upward until it becomes the root of the BST. The movement depends on the structural relationship between $x$, its parent $p$, and its grandparent $g$.

```
Zig Step (Single Rotation):
      (p)               (x)
     /   \   Splay(x)  /   \
   (x)   C   =======> A    (p)
   / \                     / \
  A   B                   B   C

Zig-Zig Step (Double Rotation - Same Direction):
        (g)                 (x)
       /   \               /   \
     (p)    D  Splay(x)   A    (p)
     / \       =======>        / \
   (x)  C                     B  (g)
   / \                           / \
  A   B                         C   D

Zig-Zag Step (Double Rotation - Opposite Direction):
      (g)                   (x)
     /   \                 /   \
   (p)    D   Splay(x)  (p)    (g)
   / \        =======>  / \    / \
  A  (x)               A   B  C   D
     / \
    B   C
```

1. **Zig Step**: Performed when $p$ is the root of the tree (i.e., $g$ does not exist). A single rotation moves $x$ to the root position.
2. **Zig-Zig Step**: Performed when both $x$ and $p$ are left children or both are right children. **Crucial Rule**: Rotate $p$ around $g$ first, and then rotate $x$ around $p$. This halves the overall tree depth along the access path, converting linear linked lists into balanced subtrees.
3. **Zig-Zag Step**: Performed when $x$ is a left child and $p$ is a right child (or vice-versa). Rotate $x$ around $p$, then rotate $x$ around $g$ (standard double rotation).

### 1.2 Tree Operations via Splaying

- **`Search(key)`**: Search standard BST. Splay the found node (or the last non-null accessed node if key is absent) to the root.
- **`Insert(key)`**: Insert key as in a standard BST, then call `Splay(new_node)`.
- **`Delete(key)`**: 
  1. Call `Search(key)` to move the target node to the root.
  2. If root key matches target, sever left and right subtrees $L$ and $R$.
  3. Find the maximum node in $L$, call `Splay(max_L)` (bringing it to the root of $L$ where it has no right child), and attach $R$ as its right child.
- **`Split(key)`**: Call `Search(key)`. The root's left subtree contains all keys $\le key$ (or $< key$), and right subtree contains remaining keys.
- **`Merge(L, R)`**: Find maximum element in $L$, splay it to the root of $L$, and set its right child to $R$.

---

## 2. Idiomatic Code Implementations

### 2.1 C# Implementation

```csharp
using System;

public class SplayTree
{
    private class Node
    {
        public int Key;
        public Node Left;
        public Node Right;
        public Node Parent;

        public Node(int key)
        {
            Key = key;
        }
    }

    private Node _root;

    private void Rotate(Node x)
    {
        Node p = x.Parent;
        Node g = p.Parent;

        if (p.Left == x)
        {
            p.Left = x.Right;
            if (x.Right != null) x.Right.Parent = p;
            x.Right = p;
        }
        else
        {
            p.Right = x.Left;
            if (x.Left != null) x.Left.Parent = p;
            x.Left = p;
        }

        p.Parent = x;
        x.Parent = g;

        if (g != null)
        {
            if (g.Left == p) g.Left = x;
            else g.Right = x;
        }
        else
        {
            _root = x;
        }
    }

    private void Splay(Node x)
    {
        if (x == null) return;

        while (x.Parent != null)
        {
            Node p = x.Parent;
            Node g = p.Parent;

            if (g != null)
            {
                // Zig-Zig vs Zig-Zag distinction
                if ((g.Left == p) == (p.Left == x))
                {
                    Rotate(p);
                }
                else
                {
                    Rotate(x);
                }
            }
            Rotate(x);
        }
    }

    public bool Search(int key)
    {
        Node curr = _root;
        Node last = null;

        while (curr != null)
        {
            last = curr;
            if (key == curr.Key)
            {
                Splay(curr);
                return true;
            }
            curr = (key < curr.Key) ? curr.Left : curr.Right;
        }

        if (last != null) Splay(last);
        return false;
    }

    public void Insert(int key)
    {
        if (_root == null)
        {
            _root = new Node(key);
            return;
        }

        Node curr = _root;
        Node parent = null;

        while (curr != null)
        {
            parent = curr;
            if (key == curr.Key)
            {
                Splay(curr);
                return; // Duplicate key ignored or handled
            }
            curr = (key < curr.Key) ? curr.Left : curr.Right;
        }

        Node newNode = new Node(key) { Parent = parent };
        if (key < parent.Key) parent.Left = newNode;
        else parent.Right = newNode;

        Splay(newNode);
    }

    public bool Delete(int key)
    {
        if (!Search(key)) return false; // Key not present, last accessed splayed

        Node leftSubtree = _root.Left;
        Node rightSubtree = _root.Right;

        if (leftSubtree != null) leftSubtree.Parent = null;
        if (rightSubtree != null) rightSubtree.Parent = null;

        if (leftSubtree == null)
        {
            _root = rightSubtree;
        }
        else
        {
            // Find max in left subtree
            Node maxLeft = leftSubtree;
            while (maxLeft.Right != null)
            {
                maxLeft = maxLeft.Right;
            }

            // Splay max element of left subtree
            _root = leftSubtree;
            Splay(maxLeft);
            _root.Right = rightSubtree;
            if (rightSubtree != null) rightSubtree.Parent = _root;
        }

        return true;
    }
}
```

### 2.2 Python Implementation

```python
class SplayNode:
    def __init__(self, key: int):
        self.key = key
        self.left = None
        self.right = None
        self.parent = None

class SplayTree:
    def __init__(self):
        self.root = None

    def _rotate(self, x: SplayNode) -> None:
        p = x.parent
        g = p.parent

        if p.left == x:
            p.left = x.right
            if x.right:
                x.right.parent = p
            x.right = p
        else:
            p.right = x.left
            if x.left:
                x.left.parent = p
            x.left = p

        p.parent = x
        x.parent = g

        if g:
            if g.left == p:
                g.left = x
            else:
                g.right = x
        else:
            self.root = x

    def _splay(self, x: SplayNode) -> None:
        if not x:
            return
        while x.parent:
            p = x.parent
            g = p.parent
            if g:
                if (g.left == p) == (p.left == x):
                    self._rotate(p)  # Zig-Zig: rotate parent first
                else:
                    self._rotate(x)  # Zig-Zag: rotate self first
            self._rotate(x)

    def search(self, key: int) -> bool:
        curr = self.root
        last = None
        while curr:
            last = curr
            if key == curr.key:
                self._splay(curr)
                return True
            curr = curr.left if key < curr.key else curr.right
        
        if last:
            self._splay(last)
        return False

    def insert(self, key: int) -> None:
        if not self.root:
            self.root = SplayNode(key)
            return

        curr = self.root
        parent = None
        while curr:
            parent = curr
            if key == curr.key:
                self._splay(curr)
                return
            curr = curr.left if key < curr.key else curr.right

        new_node = SplayNode(key)
        new_node.parent = parent
        if key < parent.key:
            parent.left = new_node
        else:
            parent.right = new_node

        self._splay(new_node)

    def delete(self, key: int) -> bool:
        if not self.search(key):
            return False

        left_tree = self.root.left
        right_tree = self.root.right

        if left_tree:
            left_tree.parent = None
        if right_tree:
            right_tree.parent = None

        if not left_tree:
            self.root = right_tree
        else:
            max_left = left_tree
            while max_left.right:
                max_left = max_left.right
            self.root = left_tree
            self._splay(max_left)
            self.root.right = right_tree
            if right_tree:
                right_tree.parent = self.root

        return True
```

---

## 3. Complexity Analysis & Memory Overhead

| Operation | Amortized Complexity | Worst-Case Complexity | Auxiliary Space |
| :--- | :--- | :--- | :--- |
| `Search` | $O(\log N)$ | $O(N)$ | $O(1)$ |
| `Insert` | $O(\log N)$ | $O(N)$ | $O(1)$ |
| `Delete` | $O(\log N)$ | $O(N)$ | $O(1)$ |
| `Split / Merge` | $O(\log N)$ | $O(N)$ | $O(1)$ |

### Access Lemma & Potential Function Proof
Let $S(v)$ be the size of the subtree rooted at node $v$, and rank $r(v) = \log_2(S(v))$.
The potential of the tree $T$ is defined as:
$$\Phi(T) = \sum_{v \in T} r(v)$$

For any splay step moving node $x$ to the root, the amortized cost $A$ satisfies:
$$A \le 3(r'(x) - r(x)) + 1$$
Summing across all splay steps along the path yields an amortized bound of $O(\log N)$ per splay operation.

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

1. **Incorrect Zig-Zig Rotation Order**: Executing `Rotate(x)` twice during a Zig-Zig case instead of `Rotate(p)` then `Rotate(x)` breaks the depth-halving guarantee, causing the tree to degenerate into an $O(N)$ linked list over sequential accesses.
2. **Neglecting Splay on Failed Searches**: Failing to splay the last visited non-null node on a search miss invalidates the access potential function.
3. **Parent Pointer Updates**: Forgetting to update `x.parent` or `g.left`/`g.right` when $g$ is null causes orphaned subtrees or missing root pointer updates.

---

## 5. Related LeetCode Problems & Variant Patterns

1. **Self-Balancing BST Alternatives**:
   - [[treap_implicit_treap_rope_data_structure|Treap & Implicit Treap]]: Randomized balancing alternative without amortized rotation cascades.
   - [[link_cut_tree_lct_dynamic_trees|Link-Cut Trees]]: Utilizes Splay Trees as underlying preferred path structures.
2. **LeetCode Variants**:
   - LeetCode 307 (Range Sum Query - Mutable)
   - Dynamic Order Statistics & Reversible Sequences
