---


title: "Link-Cut Tree (LCT) & Dynamic Trees"
type: "pattern_guide"
category: "dsa"
subcategory: "14_Advanced_Tree_Structures_and_Link_Cut_Trees"
created_at: 2026-08-22T00:32:05+07:00
updated_at: 2026-08-22T00:32:05+07:00
tags: [dsa, link-cut-tree, dynamic-trees, splay-tree, dynamic-graph, data-structures, algorithms, computer-science, learning-note]
---


# Link-Cut Tree (LCT) & Dynamic Trees

A **Link-Cut Tree (LCT)** is a self-adjusting data structure designed to represent a dynamic forest of rooted trees under topological modifications. Introduced by Daniel Sleator and Robert Tarjan, Link-Cut Trees maintain a collection of disjoint trees while supporting logarithmic amortized operations such as structural linking, structural cutting, connectivity queries, tree re-rooting, and path aggregate queries.

Unlike static tree structures like [[heavy_light_decomposition_hld_path_queries|Heavy-Light Decomposition (HLD)]] which require fixed tree topologies, Link-Cut Trees support dynamic modifications to edge configurations in $O(\log N)$ amortized time.

---

## 1. Under-the-Hood Intuition & Algorithmic Mechanics

### 1.1 Preferred Paths & Auxiliary Trees

Link-Cut Trees decompose every represented tree in the forest into a set of disjoint node-paths called **Preferred Paths**. 

1. **Preferred Edges**: At any given node $u$, at most one outgoing edge to a child $v$ is designated as a *preferred edge*. The child $v$ is the *preferred child*, representing the node most recently accessed within $u$'s subtree.
2. **Preferred Paths**: A maximal path formed by consecutive preferred edges is a preferred path. Every node in the represented tree belongs to exactly one preferred path.
3. **Auxiliary Splay Trees**: Each preferred path is represented by an auxiliary **Splay Tree** ([[splay_tree_self_balancing_bst|Splay Tree]]). The in-order traversal of an auxiliary Splay Tree corresponds exactly to the top-to-bottom depth order of nodes along the preferred path in the represented tree.
4. **Path-Parent Pointers**: The root of an auxiliary Splay Tree contains a *path-parent pointer* referencing the parent node of the top-most node of that preferred path in the represented tree. Crucially, the parent in the represented tree does **not** maintain a child pointer to the auxiliary tree root.

```
Represented Tree Decomposition:
       (1)                   Auxiliary Splay Trees (Preferred Paths):
      //  \                    [1 - 2 - 4]  (Splay Tree 1)
     (2)  (3)                    Path-parent from root 1 -> Null
    //      \
   (4)      (5)                [3 - 5]      (Splay Tree 2)
                                 Path-parent from root 3 -> Node 1
```

### 1.2 Primitive Operations

#### 1. `Access(u)`
The core fundamental operation of Link-Cut Trees. `Access(u)` changes the preferred path structure so that the path from the root of the represented tree to node $u$ becomes a single contiguous preferred path.
- Splices the path from root to $u$.
- Splays node $u$ to the root of its current auxiliary Splay Tree.
- Disconnects $u$'s right child (nodes deeper than $u$ on the old preferred path).
- Sets $u$'s right child to the root of the auxiliary Splay Tree representing the preferred path directly below $u$.
- Repeats this process up to the represented tree root.

#### 2. `MakeRoot(u)`
Reroots the represented tree at node $u$:
1. Executes `Access(u)`, placing $u$ and the root in the same auxiliary Splay Tree where $u$ is the deepest node.
2. Executes `Splay(u)`, bringing $u$ to the root of the auxiliary tree (where it has no right child).
3. Toggles a lazy reversal flag (`rev`) on $u$, reversing the depth order of all nodes in the path and making $u$ the shallowest node (the root).

#### 3. `FindRoot(u)`
Identifies the root of the represented tree containing node $u$:
1. Executes `Access(u)` and `Splay(u)`.
2. Pushes down lazy tags while traversing left children until reaching the shallowest node in the auxiliary tree.
3. Splays the identified root to preserve $O(\log N)$ amortized complexity.

#### 4. `Link(u, v)`
Adds a directed edge from node $u$ to node $v$, connecting two distinct trees:
1. Calls `MakeRoot(u)` to make $u$ the root of its tree.
2. Verifies connectivity via `FindRoot(v) != u`.
3. Sets the path-parent pointer of $u$ to $v$.

#### 5. `Cut(u, v)`
Removes the edge connecting node $u$ and node $v$:
1. Calls `MakeRoot(u)`.
2. Calls `Access(v)` followed by `Splay(v)`.
3. Checks if $u$ and $v$ are adjacent ($v$'s left child is $u$ and $u$'s right child is null).
4. Disconnects $v$'s left child pointer and $u$'s parent pointer.

---

## 2. Idiomatic Code Implementations

### 2.1 C# Implementation

```csharp
using System;

public class LinkCutTree
{
    private class Node
    {
        public int Id;
        public int Val;
        public int SubtreeMax;
        public Node Left;
        public Node Right;
        public Node Parent;
        public bool Rev;

        public Node(int id, int val)
        {
            Id = id;
            Val = val;
            SubtreeMax = val;
        }
    }

    private readonly Node[] _nodes;

    public LinkCutTree(int n, int[] values)
    {
        _nodes = new Node[n + 1];
        for (int i = 1; i <= n; i++)
        {
            _nodes[i] = new Node(i, values[i - 1]);
        }
    }

    private bool IsRoot(Node x)
    {
        if (x.Parent == null) return true;
        return x.Parent.Left != x && x.Parent.Right != x;
    }

    private void PushUp(Node x)
    {
        if (x == null) return;
        x.SubtreeMax = x.Val;
        if (x.Left != null) x.SubtreeMax = Math.Max(x.SubtreeMax, x.Left.SubtreeMax);
        if (x.Right != null) x.SubtreeMax = Math.Max(x.SubtreeMax, x.Right.SubtreeMax);
    }

    private void PushDown(Node x)
    {
        if (x != null && x.Rev)
        {
            x.Rev = false;
            Node temp = x.Left;
            x.Left = x.Right;
            x.Right = temp;
            if (x.Left != null) x.Left.Rev ^= true;
            if (x.Right != null) x.Right.Rev ^= true;
        }
    }

    private void PushAll(Node x)
    {
        if (!IsRoot(x)) PushAll(x.Parent);
        PushDown(x);
    }

    private void Rotate(Node x)
    {
        Node p = x.Parent;
        Node g = p.Parent;
        bool isLeft = (p.Left == x);

        if (!IsRoot(p))
        {
            if (g.Left == p) g.Left = x;
            else g.Right = x;
        }
        x.Parent = g;

        if (isLeft)
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

        PushUp(p);
        PushUp(x);
    }

    private void Splay(Node x)
    {
        PushAll(x);
        while (!IsRoot(x))
        {
            Node p = x.Parent;
            if (!IsRoot(p))
            {
                Node g = p.Parent;
                if ((g.Left == p) == (p.Left == x)) Rotate(p);
                else Rotate(x);
            }
            Rotate(x);
        }
    }

    public void Access(int uId)
    {
        Node u = _nodes[uId];
        for (Node v = u, last = null; v != null; last = v, v = v.Parent)
        {
            Splay(v);
            v.Right = last;
            PushUp(v);
        }
        Splay(u);
    }

    public void MakeRoot(int uId)
    {
        Access(uId);
        Node u = _nodes[uId];
        u.Rev ^= true;
        PushDown(u);
    }

    public int FindRoot(int uId)
    {
        Access(uId);
        Node curr = _nodes[uId];
        PushDown(curr);
        while (curr.Left != null)
        {
            curr = curr.Left;
            PushDown(curr);
        }
        Splay(curr);
        return curr.Id;
    }

    public bool Link(int uId, int vId)
    {
        MakeRoot(uId);
        if (FindRoot(vId) == uId) return false; // Already connected
        _nodes[uId].Parent = _nodes[vId];
        return true;
    }

    public bool Cut(int uId, int vId)
    {
        MakeRoot(uId);
        if (FindRoot(vId) != uId || _nodes[vId].Parent != _nodes[uId] || _nodes[vId].Left != null)
        {
            return false; // Edge does not exist
        }
        _nodes[vId].Parent = null;
        _nodes[uId].Right = null;
        PushUp(_nodes[uId]);
        return true;
    }

    public int QueryPathMax(int uId, int vId)
    {
        MakeRoot(uId);
        Access(vId);
        return _nodes[vId].SubtreeMax;
    }
}
```

### 2.2 Python Implementation

```python
class LCTNode:
    def __init__(self, node_id: int, val: int):
        self.id = node_id
        self.val = val
        self.max_val = val
        self.left = None
        self.right = None
        self.parent = None
        self.rev = False

class LinkCutTree:
    def __init__(self, n: int, values: list[int]):
        self.nodes = [None] + [LCTNode(i, values[i - 1]) for i in range(1, n + 1)]

    def _is_root(self, node: LCTNode) -> bool:
        if node.parent is None:
            return True
        return node.parent.left != node and node.parent.right != node

    def _push_up(self, node: LCTNode) -> None:
        if not node:
            return
        node.max_val = node.val
        if node.left:
            node.max_val = max(node.max_val, node.left.max_val)
        if node.right:
            node.max_val = max(node.max_val, node.right.max_val)

    def _push_down(self, node: LCTNode) -> None:
        if node and node.rev:
            node.rev = False
            node.left, node.right = node.right, node.left
            if node.left:
                node.left.rev ^= True
            if node.right:
                node.right.rev ^= True

    def _push_all(self, node: LCTNode) -> None:
        if not self._is_root(node):
            self._push_all(node.parent)
        self._push_down(node)

    def _rotate(self, x: LCTNode) -> None:
        p = x.parent
        g = p.parent
        is_left = (p.left == x)

        if not self._is_root(p):
            if g.left == p:
                g.left = x
            else:
                g.right = x
        x.parent = g

        if is_left:
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

        self._push_up(p)
        self._push_up(x)

    def _splay(self, x: LCTNode) -> None:
        self._push_all(x)
        while not self._is_root(x):
            p = x.parent
            if not self._is_root(p):
                g = p.parent
                if (g.left == p) == (p.left == x):
                    self._rotate(p)
                else:
                    self._rotate(x)
            self._rotate(x)

    def access(self, u_id: int) -> None:
        u = self.nodes[u_id]
        v = u
        last = None
        while v:
            self._splay(v)
            v.right = last
            self._push_up(v)
            last = v
            v = v.parent
        self._splay(u)

    def make_root(self, u_id: int) -> None:
        self.access(u_id)
        u = self.nodes[u_id]
        u.rev ^= True
        self._push_down(u)

    def find_root(self, u_id: int) -> int:
        self.access(u_id)
        curr = self.nodes[u_id]
        self._push_down(curr)
        while curr.left:
            curr = curr.left
            self._push_down(curr)
        self._splay(curr)
        return curr.id

    def link(self, u_id: int, v_id: int) -> bool:
        self.make_root(u_id)
        if self.find_root(v_id) == u_id:
            return False  # Connected cycle prevention
        self.nodes[u_id].parent = self.nodes[v_id]
        return True

    def cut(self, u_id: int, v_id: int) -> bool:
        self.make_root(u_id)
        if self.find_root(v_id) != u_id or self.nodes[v_id].parent != self.nodes[u_id] or self.nodes[v_id].left is not None:
            return False
        self.nodes[v_id].parent = None
        self.nodes[u_id].right = None
        self._push_up(self.nodes[u_id])
        return True

    def query_path_max(self, u_id: int, v_id: int) -> int:
        self.make_root(u_id)
        self.access(v_id)
        return self.nodes[v_id].max_val
```

---

## 3. Complexity Analysis & Memory Overhead

| Operation | Time Complexity (Amortized) | Space Complexity |
| :--- | :--- | :--- |
| `Access(u)` | $O(\log N)$ | $O(1)$ auxiliary |
| `MakeRoot(u)` | $O(\log N)$ | $O(1)$ auxiliary |
| `FindRoot(u)` | $O(\log N)$ | $O(1)$ auxiliary |
| `Link(u, v)` | $O(\log N)$ | $O(1)$ auxiliary |
| `Cut(u, v)` | $O(\log N)$ | $O(1)$ auxiliary |
| `QueryPath(u, v)`| $O(\log N)$ | $O(1)$ auxiliary |
| Overall Storage | N/A | $O(N)$ total space |

### Potential Function Proof Sketch
The potential function for Splay Tree analysis is defined as:
$$\Phi = \sum_{v \in T} \log_2(S(v))$$
where $S(v)$ is the size of the subtree rooted at node $v$ in the auxiliary Splay tree representation.

During an `Access` operation, preferred child pointer changes occur at most $O(\log N)$ times on average due to the Heavy-Light path decomposition bound. Combined with the Splay Access Lemma, the amortized cost per operation across $M$ sequence steps bounded over $N$ elements remains $O(\log N)$.

---

## 4. Common Pitfalls & Off-by-One Anti-Patterns

1. **Forgetting `PushDown` Propagation Before Navigation**: When executing `FindRoot` or traversing down children, lazy reversal tags (`rev`) must be pushed down to children before inspecting left or right pointers.
2. **Conflating `Parent` Pointer with Splay Child Pointers**: In LCT, `node.parent` points to the parent in the auxiliary Splay Tree **or** the path-parent in the represented tree. Checking `IsRoot(node)` is strictly required before determining whether `node.parent.left` or `node.parent.right` refers to `node`.
3. **Omitting `Splay` After `FindRoot`**: Failing to splay the root returned by `FindRoot` degenerates the amortized complexity from $O(\log N)$ to $O(N)$ for long linear paths.
4. **Invalid Cut Verification**: Cutting edge $(u, v)$ without asserting that $u$ is the direct parent of $v$ in the auxiliary tree (`v.parent == u` and `v.left == null`) can disconnect incorrect components when $u$ and $v$ are not directly adjacent.

---

## 5. Related LeetCode Problems & Variant Patterns

1. **Dynamic Connectivity & Spanning Trees**:
   - Spanning Forest Maintenance (Online edge insertion, edge deletion, maximum edge weight removal for dynamic MST).
2. **Tree Path Queries with Topology Changes**:
   - [[heavy_light_decomposition_hld_path_queries|Heavy-Light Decomposition (HLD)]]: Static tree precursor.
   - [[splay_tree_self_balancing_bst|Splay Tree]]: Underlying balanced search tree component.
   - [[disjoint_set_union_dsu_rollback_mechanics|DSU with Rollback]]: Offline alternative when deletions follow LIFO ordering.
