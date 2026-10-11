---


title: "11 leetcode practice gii chi tit 10 bi kinh in"
tags: [dsa, algorithms, computer-science, learning-note]
---

## 11. LeetCode Practice — Giải chi tiết 10 bài kinh điển

Phần này mình sẽ đi sâu vào **10 bài LeetCode kinh điển** về Graphs. Mỗi bài mình sẽ phân tích cực kỹ: từ tư duy tiếp cận, nhiều cách giải, dry run từng bước, đến phân tích complexity và các lỗi thường gặp. Nếu bạn nắm vững 10 bài này, bạn có thể tự tin handle hầu hết bài graph trong phỏng vấn!

------

### 11.1 LeetCode #200 — Number of Islands

**Difficulty:** Medium | [Link bài](https://leetcode.com/problems/number-of-islands/)

#### Đề bài

Cho một lưới 2D `grid` kích thước `m x n` gồm các ký tự `'1'` (đất) và `'0'` (nước). Một **island** (đảo) được tạo thành bởi các ô đất `'1'` kề nhau theo **4 hướng** (lên, xuống, trái, phải) và được bao quanh bởi nước. Đếm số lượng đảo trong lưới.

**Ví dụ:**

```
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

#### Phân tích tư duy

Bài này là bài **nền tảng** về graph trên lưới 2D. Mấu chốt là nhận ra:

1. **Mỗi ô `'1'` là một vertex** trong graph
2. **Hai ô `'1'` kề nhau** (lên/xuống/trái/phải) tạo thành edge
3. **Mỗi đảo = 1 connected component** trong graph
4. **Bài toán = đếm số connected components**

**Chiến lược:** Duyệt từng ô. Khi gặp ô `'1'` chưa visited → đây là đảo mới → dùng BFS/DFS "lan" ra toàn bộ đảo, đánh dấu visited → tăng count.

**Tại sao phải đánh dấu visited?** Vì nếu không, khi duyệt đến ô `'1'` khác cùng đảo, ta sẽ đếm lại → sai kết quả.

**Trick tối ưu:** Thay vì dùng mảng `visited[][]` riêng (tốn thêm O(mn) space), ta có thể **sửa trực tiếp** grid: đổi `'1'` thành `'0'` khi visited. Nhưng lưu ý: cách này **modify input**, không phải lúc nào cũng được phép.

#### Cách 1: DFS (Recursive)

```python
from typing import List

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        # Edge case: grid rỗng
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        count = 0  # đếm số đảo

        def dfs(r: int, c: int):
            """DFS lan ra toàn bộ đảo, đánh dấu đã visited bằng cách đổi thành '0'."""
            # Điều kiện dừng: ra ngoài biên HOẶC gặp nước
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
                return

            # Đánh dấu ô hiện tại đã visited (đổi thành nước)
            grid[r][c] = '0'

            # Lan ra 4 hướng
            dfs(r + 1, c)  # xuống
            dfs(r - 1, c)  # lên
            dfs(r, c + 1)  # phải
            dfs(r, c - 1)  # trái

        # Duyệt từng ô trong grid
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':  # Tìm thấy đảo mới!
                    count += 1
                    dfs(r, c)  # "nhấn chìm" toàn bộ đảo

        return count
```

#### Cách 2: BFS (Iterative)

```python
from typing import List
from collections import deque

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        count = 0

        def bfs(r: int, c: int):
            """BFS lan ra toàn bộ đảo từ ô (r, c)."""
            queue = deque([(r, c)])
            grid[r][c] = '0'  # đánh dấu ngay khi đưa vào queue

            while queue:
                cr, cc = queue.popleft()
                # Duyệt 4 hướng
                for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                    nr, nc = cr + dr, cc + dc
                    # Kiểm tra biên VÀ là đất
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == '1':
                        grid[nr][nc] = '0'  # đánh dấu TRƯỚC khi đưa vào queue
                        queue.append((nr, nc))

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    bfs(r, c)

        return count
```

#### Cách 3: Union-Find

```python
from typing import List

class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = 0  # số connected components

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return
        # Union by rank
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        self.count -= 1  # merge 2 components → giảm 1

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        uf = UnionFind(rows * cols)

        # Đếm số ô đất ban đầu
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    uf.count += 1

        # Union các ô đất kề nhau
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    idx = r * cols + c
                    # Chỉ cần check 2 hướng: phải và xuống (tránh union trùng)
                    if c + 1 < cols and grid[r][c + 1] == '1':
                        uf.union(idx, idx + 1)
                    if r + 1 < rows and grid[r + 1][c] == '1':
                        uf.union(idx, idx + cols)

        return uf.count
```

#### Dry run chi tiết

```
grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]

DFS approach:

Bước 1: Duyệt (0,0) → grid[0][0] = '1' → count = 1, bắt đầu DFS
  DFS(0,0): đổi '1' → '0'
  ├── DFS(1,0): đổi '1' → '0'
  │   ├── DFS(2,0): grid = '0' → RETURN
  │   ├── DFS(0,0): grid = '0' (đã visited) → RETURN
  │   ├── DFS(1,1): đổi '1' → '0'
  │   │   ├── DFS(2,1): grid = '0' → RETURN
  │   │   ├── DFS(0,1): đổi '1' → '0'
  │   │   │   └── (tất cả hàng xóm đều '0') → RETURN
  │   │   ├── DFS(1,2): grid = '0' → RETURN
  │   │   └── DFS(1,0): grid = '0' → RETURN
  │   └── DFS(1,-1): ngoài biên → RETURN
  ├── ...
  → Toàn bộ đảo 1 đã "chìm"

Grid sau bước 1:
  ["0","0","0","0","0"],
  ["0","0","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]

Bước 2: Duyệt tiếp... (0,1)..(2,1) đều là '0'
  Đến (2,2) → grid[2][2] = '1' → count = 2, DFS
  DFS(2,2): đổi '1' → '0' → không có hàng xóm '1' → DONE

Grid sau bước 2:
  ["0","0","0","0","0"],
  ["0","0","0","0","0"],
  ["0","0","0","0","0"],
  ["0","0","0","1","1"]

Bước 3: Duyệt đến (3,3) → grid[3][3] = '1' → count = 3, DFS
  DFS(3,3): đổi '1' → '0'
  └── DFS(3,4): đổi '1' → '0' → DONE

Kết quả: count = 3 ✓
```

#### Complexity

| Cách           | Time                        | Space                          |
| :------------- | :-------------------------- | :----------------------------- |
| **DFS**        | O(m x n)                    | O(m x n) worst case call stack |
| **BFS**        | O(m x n)                    | O(min(m, n)) cho queue         |
| **Union-Find** | O(m x n x a(mn)) ~ O(m x n) | O(m x n)                       |

**Giải thích Time:** Mỗi ô được visit tối đa 1 lần (đổi thành '0' rồi không visit lại). Tổng: O(m x n).

**Giải thích Space DFS:** Worst case grid toàn '1', DFS đi thành 1 đường dài → stack depth = m x n.

**Giải thích Space BFS:** Queue chứa tối đa 1 "lớp" BFS. Trong grid, lớp lớn nhất ~ O(min(m, n)).

#### Lỗi thường gặp

1. **Quên đánh dấu visited:** Không đổi grid[r][c] thành '0' → vô hạn lặp (DFS stack overflow).
2. **Đánh dấu SAU khi dequeue (BFS):** Phải đánh dấu NGAY KHI đưa vào queue, không phải khi lấy ra. Nếu không → cùng 1 ô bị đưa vào queue nhiều lần → TLE.
3. **So sánh nhầm kiểu:** `grid[r][c] == 1` (int) thay vì `grid[r][c] == '1'` (string). LeetCode cho input là string!
4. **Quên check biên:** Truy cập `grid[-1][0]` → Python không lỗi nhưng logic sai (wrap around).

------

### 11.2 LeetCode #133 — Clone Graph

**Difficulty:** Medium | [Link bài](https://leetcode.com/problems/clone-graph/)

#### Đề bài

Cho một tham chiếu đến một node trong **connected undirected graph**. Trả về một **deep copy** (clone) của graph. Mỗi node chứa giá trị `val` (int) và danh sách `neighbors` (list các node hàng xóm).

```python
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
```

**Ví dụ:**

```
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Node 1 -- Node 2
|         |
Node 4 -- Node 3

Output: deep copy của graph trên (các node mới, không dùng chung reference)
```

#### Phân tích tư duy

Bài này test khả năng **deep copy** một cấu trúc graph. Thách thức chính:

1. **Tránh vòng lặp vô hạn:** Graph có thể có cycle → khi clone, ta phải nhớ node nào đã clone rồi.

2. Mapping cũ → mới:

    

   Cần 1 hash map:

    

   ```
   {original_node: cloned_node}
   ```

    

   để:

   - Kiểm tra đã clone chưa (tránh lặp)
   - Liên kết neighbors đúng (clone A nối với clone B, không phải original B)

**Chiến lược:**

- **Bước 1:** Duyệt graph (BFS hoặc DFS)
- **Bước 2:** Mỗi khi gặp node chưa clone → tạo node mới, lưu vào map
- **Bước 3:** Nối neighbors của clone node = clone của các neighbors gốc

#### Cách 1: BFS

```python
from collections import deque

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        # Edge case: graph rỗng
        if not node:
            return None

        # Hash map: original node → cloned node
        cloned = {}

        # Clone node đầu tiên
        cloned[node] = Node(node.val)

        # BFS để duyệt tất cả nodes
        queue = deque([node])

        while queue:
            current = queue.popleft()

            # Duyệt từng neighbor của node hiện tại
            for neighbor in current.neighbors:
                if neighbor not in cloned:
                    # Neighbor chưa được clone → clone nó
                    cloned[neighbor] = Node(neighbor.val)
                    queue.append(neighbor)  # thêm vào queue để xử lý tiếp

                # Nối clone của current với clone của neighbor
                cloned[current].neighbors.append(cloned[neighbor])

        return cloned[node]
```

#### Cách 2: DFS (Recursive)

```python
class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        if not node:
            return None

        cloned = {}  # hash map: original → clone

        def dfs(original: 'Node') -> 'Node':
            # Nếu đã clone rồi → trả về clone (tránh lặp vô hạn)
            if original in cloned:
                return cloned[original]

            # Tạo clone mới
            copy = Node(original.val)
            cloned[original] = copy  # LƯU VÀO MAP NGAY, trước khi duyệt neighbors

            # Đệ quy clone từng neighbor
            for neighbor in original.neighbors:
                copy.neighbors.append(dfs(neighbor))

            return copy

        return dfs(node)
```

#### Dry run chi tiết

```
Graph: 1 -- 2
       |    |
       4 -- 3

adjList = [[2,4],[1,3],[2,4],[1,3]]

BFS approach:

Bước 0: cloned = {Node1: Clone1}, queue = [Node1]

Bước 1: Dequeue Node1, xét neighbors [Node2, Node4]
  - Node2 chưa clone → cloned[Node2] = Clone2, queue = [Node2]
  - Clone1.neighbors = [Clone2]
  - Node4 chưa clone → cloned[Node4] = Clone4, queue = [Node2, Node4]
  - Clone1.neighbors = [Clone2, Clone4]

Bước 2: Dequeue Node2, xét neighbors [Node1, Node3]
  - Node1 ĐÃ clone → không tạo mới, không thêm vào queue
  - Clone2.neighbors = [Clone1]
  - Node3 chưa clone → cloned[Node3] = Clone3, queue = [Node4, Node3]
  - Clone2.neighbors = [Clone1, Clone3]

Bước 3: Dequeue Node4, xét neighbors [Node1, Node3]
  - Node1 ĐÃ clone → Clone4.neighbors = [Clone1]
  - Node3 ĐÃ clone → Clone4.neighbors = [Clone1, Clone3]

Bước 4: Dequeue Node3, xét neighbors [Node2, Node4]
  - Node2 ĐÃ clone → Clone3.neighbors = [Clone2]
  - Node4 ĐÃ clone → Clone3.neighbors = [Clone2, Clone4]

Queue rỗng → DONE!

Kết quả: Clone1 -- Clone2
         |         |
         Clone4 -- Clone3

Hoàn toàn tách biệt khỏi graph gốc ✓
```

#### Complexity

| Cách    | Time     | Space                      |
| :------ | :------- | :------------------------- |
| **BFS** | O(V + E) | O(V)                       |
| **DFS** | O(V + E) | O(V) call stack + hash map |

**Giải thích:** Mỗi node được visit 1 lần, mỗi edge được duyệt 2 lần (mỗi đầu 1 lần). Hash map chứa V nodes.

#### Lỗi thường gặp

1. **Quên check `if neighbor not in cloned`:** → Clone lại node đã clone → mất reference → graph sai.
2. **Lưu vào map SAU khi duyệt neighbors (DFS):** Phải lưu TRƯỚC, nếu không khi graph có cycle → duyệt ngược lại → chưa thấy trong map → tạo lại → vô hạn lặp.
3. **Trả về `node` thay vì `cloned[node]`:** → Trả về node gốc, không phải clone!
4. **Quên xử lý `node = None`:** → NullPointerException.

------

### 11.3 LeetCode #207 — Course Schedule

**Difficulty:** Medium | [Link bài](https://leetcode.com/problems/course-schedule/)

#### Đề bài

Có `numCourses` môn học đánh số từ `0` đến `numCourses - 1`. Cho mảng `prerequisites` trong đó `prerequisites[i] = [a, b]` nghĩa là **phải học b trước khi học a**. Hãy kiểm tra xem có thể hoàn thành tất cả các môn hay không.

**Ví dụ:**

```
Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: true
Giải thích: Học theo thứ tự 0 → 1 → 2 → 3 hoặc 0 → 2 → 1 → 3
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Giải thích: 0 yêu cầu 1, 1 yêu cầu 0 → vòng tròn → không thể!
```

#### Phân tích tư duy

Bài này chính là **Cycle Detection trong Directed Graph**:

1. **Mỗi môn học = 1 vertex**
2. **prerequisite [a, b] = edge b → a** (b phải trước a)
3. **Có thể hoàn thành ⟺ Graph KHÔNG có cycle**
4. **Có cycle ⟺ Topological Sort không tồn tại**

**Tại sao cycle = không thể?** Nếu A yêu cầu B, B yêu cầu C, C yêu cầu A → không biết học cái nào trước → deadlock!

**2 cách tiếp cận:**

| Cách               | Thuật toán       | Ý tưởng                                                    |
| :----------------- | :--------------- | :--------------------------------------------------------- |
| **Kahn's (BFS)**   | Topological Sort | Lần lượt loại bỏ node có in-degree = 0                     |
| **DFS + coloring** | Cycle Detection  | 3 màu: WHITE (chưa visit), GRAY (đang visit), BLACK (xong) |

#### Cách 1: Kahn's Algorithm (BFS — Topological Sort)

```python
from typing import List
from collections import deque, defaultdict

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # Bước 1: Xây dựng adjacency list và tính in-degree
        graph = defaultdict(list)  # adjacency list
        in_degree = [0] * numCourses

        for course, prereq in prerequisites:
            graph[prereq].append(course)  # prereq → course
            in_degree[course] += 1  # course cần thêm 1 prerequisite

        # Bước 2: Đưa tất cả node có in-degree = 0 vào queue
        # (những môn không cần prerequisite → học được ngay)
        queue = deque()
        for i in range(numCourses):
            if in_degree[i] == 0:
                queue.append(i)

        # Bước 3: BFS — lần lượt "học" từng môn
        courses_taken = 0  # đếm số môn đã học

        while queue:
            course = queue.popleft()
            courses_taken += 1

            # "Học xong" course → giảm in-degree của các môn phụ thuộc
            for next_course in graph[course]:
                in_degree[next_course] -= 1
                # Nếu in-degree = 0 → tất cả prerequisites đã hoàn thành
                if in_degree[next_course] == 0:
                    queue.append(next_course)

        # Nếu học được hết tất cả môn → không có cycle
        return courses_taken == numCourses
```

#### Cách 2: DFS + 3-Color

```python
from typing import List
from collections import defaultdict

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        graph = defaultdict(list)
        for course, prereq in prerequisites:
            graph[prereq].append(course)

        # 3 trạng thái: 0 = WHITE (chưa visit), 1 = GRAY (đang visit), 2 = BLACK (xong)
        color = [0] * numCourses

        def has_cycle(node: int) -> bool:
            """DFS kiểm tra cycle. Return True nếu phát hiện cycle."""
            if color[node] == 1:  # GRAY → đang trong call stack → CYCLE!
                return True
            if color[node] == 2:  # BLACK → đã xử lý xong → OK
                return False

            color[node] = 1  # Đánh dấu GRAY (bắt đầu visit)

            # Duyệt các node kế tiếp
            for neighbor in graph[node]:
                if has_cycle(neighbor):
                    return True

            color[node] = 2  # Đánh dấu BLACK (hoàn thành visit)
            return False

        # Kiểm tra từ mọi node (graph có thể không liên thông)
        for i in range(numCourses):
            if has_cycle(i):
                return False

        return True
```

#### Dry run chi tiết

```
numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]

Graph (adjacency list):
  0 → [1, 2]
  1 → [3]
  2 → [3]
  3 → []

In-degree: [0, 1, 1, 2]
              0 cần 0 prereq
              1 cần 1 prereq (course 0)
              2 cần 1 prereq (course 0)
              3 cần 2 prereqs (courses 1, 2)

Kahn's BFS:

Bước 0: in_degree[0] = 0 → queue = [0], courses_taken = 0

Bước 1: Dequeue 0, courses_taken = 1
  0 → 1: in_degree[1] = 1-1 = 0 → queue.append(1)
  0 → 2: in_degree[2] = 1-1 = 0 → queue.append(2)
  queue = [1, 2]

Bước 2: Dequeue 1, courses_taken = 2
  1 → 3: in_degree[3] = 2-1 = 1 (chưa = 0, chưa thêm vào queue)
  queue = [2]

Bước 3: Dequeue 2, courses_taken = 3
  2 → 3: in_degree[3] = 1-1 = 0 → queue.append(3)
  queue = [3]

Bước 4: Dequeue 3, courses_taken = 4
  3 không có edge ra → queue rỗng

courses_taken (4) == numCourses (4) → return True ✓

Thứ tự học: 0 → 1 → 2 → 3 (hoặc 0 → 2 → 1 → 3)
```

#### Complexity

| Cách             | Time     | Space    |
| :--------------- | :------- | :------- |
| **Kahn's (BFS)** | O(V + E) | O(V + E) |
| **DFS 3-Color**  | O(V + E) | O(V + E) |

**Giải thích:** V = numCourses, E = len(prerequisites). Xây graph: O(E). Duyệt: mỗi node 1 lần, mỗi edge 1 lần → O(V + E).

#### Lỗi thường gặp

1. **Nhầm chiều edge:** `[a, b]` nghĩa là b → a (b trước a), KHÔNG PHẢI a → b.
2. **Quên xử lý graph không liên thông (DFS):** Phải chạy DFS từ TẤT CẢ nodes, không chỉ node 0.
3. **DFS chỉ dùng 2 trạng thái:** Dùng `visited` boolean → không phân biệt "đang visit" vs "đã xong" → không phát hiện được cycle trong directed graph.
4. **Kahn's: quên kiểm tra `courses_taken == numCourses`:** Nếu có cycle, một số node sẽ không bao giờ có in-degree = 0 → `courses_taken < numCourses`.

------

### 11.4 LeetCode #210 — Course Schedule II

**Difficulty:** Medium | [Link bài](https://leetcode.com/problems/course-schedule-ii/)

#### Đề bài

Giống bài 207, nhưng thay vì chỉ kiểm tra có thể hoàn thành không, hãy **trả về thứ tự học** (topological order). Nếu không thể → trả về mảng rỗng.

**Ví dụ:**

```
Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,1,2,3] hoặc [0,2,1,3] (nhiều đáp án đúng)
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: [] (có cycle → không thể)
```

#### Phân tích tư duy

Bài này là **extension trực tiếp** của bài 207. Sự khác biệt:

| Course Schedule I (#207)    | Course Schedule II (#210)   |
| :-------------------------- | :-------------------------- |
| Return `bool`               | Return `List[int]` (thứ tự) |
| Chỉ cần biết có cycle không | Cần xuất thứ tự topological |

**Kahn's BFS tự nhiên cho ra thứ tự:** Mỗi lần dequeue = 1 môn tiếp theo trong thứ tự học.

**DFS cũng cho ra thứ tự:** Khi node được đánh dấu BLACK (xong) → thêm vào stack. Cuối cùng đảo ngược stack = topological order.

#### Cách 1: Kahn's Algorithm (BFS)

```python
from typing import List
from collections import deque, defaultdict

class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        # Xây graph + in-degree
        graph = defaultdict(list)
        in_degree = [0] * numCourses

        for course, prereq in prerequisites:
            graph[prereq].append(course)
            in_degree[course] += 1

        # Đưa node in-degree = 0 vào queue
        queue = deque()
        for i in range(numCourses):
            if in_degree[i] == 0:
                queue.append(i)

        order = []  # thứ tự topological

        while queue:
            course = queue.popleft()
            order.append(course)  # ← khác bài 207: ghi lại thứ tự

            for next_course in graph[course]:
                in_degree[next_course] -= 1
                if in_degree[next_course] == 0:
                    queue.append(next_course)

        # Nếu order chứa đủ môn → hợp lệ, nếu không → có cycle
        return order if len(order) == numCourses else []
```

#### Cách 2: DFS + Reverse Post-Order

```python
from typing import List
from collections import defaultdict

class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        graph = defaultdict(list)
        for course, prereq in prerequisites:
            graph[prereq].append(course)

        # 0 = WHITE, 1 = GRAY (đang DFS), 2 = BLACK (xong)
        color = [0] * numCourses
        order = []  # sẽ chứa reverse post-order
        has_cycle = [False]  # dùng list để modify trong nested function

        def dfs(node: int):
            if has_cycle[0]:
                return  # đã phát hiện cycle, dừng sớm

            color[node] = 1  # GRAY

            for neighbor in graph[node]:
                if color[neighbor] == 1:  # gặp GRAY → cycle!
                    has_cycle[0] = True
                    return
                if color[neighbor] == 0:  # WHITE → chưa visit
                    dfs(neighbor)
                    if has_cycle[0]:
                        return

            color[node] = 2  # BLACK — hoàn thành
            order.append(node)  # post-order: thêm khi XONG

        for i in range(numCourses):
            if color[i] == 0:
                dfs(i)

        if has_cycle[0]:
            return []

        # Reverse post-order = topological order
        return order[::-1]
```

#### Dry run chi tiết

```
numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]

Graph: 0 → [1, 2], 1 → [3], 2 → [3]

DFS approach:

DFS(0): color[0] = GRAY
├── DFS(1): color[1] = GRAY
│   ├── DFS(3): color[3] = GRAY
│   │   └── no neighbors → color[3] = BLACK, order = [3]
│   └── color[1] = BLACK, order = [3, 1]
├── DFS(2): color[2] = GRAY
│   ├── neighbor 3: color[3] = BLACK → skip
│   └── color[2] = BLACK, order = [3, 1, 2]
└── color[0] = BLACK, order = [3, 1, 2, 0]

Reverse: [0, 2, 1, 3] ← topological order ✓

Kiểm tra: 0 trước 1 ✓, 0 trước 2 ✓, 1 trước 3 ✓, 2 trước 3 ✓
```

#### Complexity

| Cách       | Time     | Space    |
| :--------- | :------- | :------- |
| **Kahn's** | O(V + E) | O(V + E) |
| **DFS**    | O(V + E) | O(V + E) |

#### Lỗi thường gặp

1. **Quên reverse ở DFS:** Post-order cho ra thứ tự **ngược** (node xong sau lại ở đầu). Phải `order[::-1]`.
2. **Trả về `order` khi có cycle:** Phải check cycle trước khi trả kết quả.
3. **Nhầm với bài 207:** Copy paste code mà quên đổi return type từ `bool` sang `List[int]`.

------

### 11.5 LeetCode #743 — Network Delay Time

**Difficulty:** Medium | [Link bài](https://leetcode.com/problems/network-delay-time/)

#### Đề bài

Có một mạng gồm `n` nodes đánh số từ `1` đến `n`. Cho mảng `times` trong đó `times[i] = [u, v, w]` nghĩa là có 1 edge có hướng từ `u` đến `v` với trọng số (thời gian) `w`. Gửi tín hiệu từ node `k`. Hỏi **thời gian tối thiểu** để tất cả các node nhận được tín hiệu. Nếu không thể → trả về `-1`.

**Ví dụ:**

```
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
Giải thích: Từ node 2:
  2 → 1 (time 1)
  2 → 3 (time 1), 3 → 4 (time 1) → tổng time đến 4 = 2
  Tất cả nodes nhận tín hiệu sau 2 đơn vị thời gian
```

#### Phân tích tư duy

Bài này là **Dijkstra's Algorithm** chuẩn:

1. **Bài toán = Single Source Shortest Path (SSSP)** từ node `k`
2. **Trọng số >= 0** (thời gian truyền tín hiệu) → dùng Dijkstra
3. **Đáp án = max(dist[v]) cho tất cả v** (node xa nhất quyết định tổng thời gian)
4. **Nếu có node unreachable (dist = inf)** → trả về -1

**Tại sao lấy max?** Vì tín hiệu truyền **đồng thời** đến nhiều node. Thời gian tổng = thời gian đến node **xa nhất**.

#### Solution: Dijkstra with Min-Heap

```python
from typing import List
import heapq
from collections import defaultdict

class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        # Bước 1: Xây adjacency list
        graph = defaultdict(list)
        for u, v, w in times:
            graph[u].append((v, w))  # u → v với trọng số w

        # Bước 2: Dijkstra
        # dist[node] = khoảng cách ngắn nhất từ k đến node
        dist = {i: float('inf') for i in range(1, n + 1)}
        dist[k] = 0

        # Min-heap: (distance, node)
        min_heap = [(0, k)]

        while min_heap:
            d, u = heapq.heappop(min_heap)

            # Nếu đã tìm được đường ngắn hơn rồi → bỏ qua
            if d > dist[u]:
                continue

            # Relax tất cả edges từ u
            for v, w in graph[u]:
                new_dist = d + w
                if new_dist < dist[v]:
                    dist[v] = new_dist
                    heapq.heappush(min_heap, (new_dist, v))

        # Bước 3: Tìm max distance
        max_dist = max(dist.values())

        # Nếu có node unreachable → -1
        return max_dist if max_dist < float('inf') else -1
```

#### Dry run chi tiết

```
times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2

Graph: 2 → [(1,1), (3,1)], 3 → [(4,1)]

dist = {1: inf, 2: 0, 3: inf, 4: inf}
heap = [(0, 2)]

Bước 1: Pop (0, 2)
  d=0 <= dist[2]=0 → xử lý
  Edge 2→1: new_dist = 0+1 = 1 < inf → dist[1] = 1, push (1, 1)
  Edge 2→3: new_dist = 0+1 = 1 < inf → dist[3] = 1, push (1, 3)
  dist = {1: 1, 2: 0, 3: 1, 4: inf}
  heap = [(1, 1), (1, 3)]

Bước 2: Pop (1, 1)
  d=1 <= dist[1]=1 → xử lý
  Node 1 không có edge ra → skip
  heap = [(1, 3)]

Bước 3: Pop (1, 3)
  d=1 <= dist[3]=1 → xử lý
  Edge 3→4: new_dist = 1+1 = 2 < inf → dist[4] = 2, push (2, 4)
  dist = {1: 1, 2: 0, 3: 1, 4: 2}
  heap = [(2, 4)]

Bước 4: Pop (2, 4)
  d=2 <= dist[4]=2 → xử lý
  Node 4 không có edge ra → skip
  heap = []

max(dist.values()) = max(1, 0, 1, 2) = 2

Return 2 ✓
```

#### Complexity

|                         | Time       | Space    |
| :---------------------- | :--------- | :------- |
| **Dijkstra + Min-Heap** | O(E log V) | O(V + E) |

**Giải thích Time:** Mỗi node được pop từ heap tối đa 1 lần (nhờ check `d > dist[u]`). Mỗi lần pop: O(log V). Tổng pop: O(V log V). Mỗi edge gây tối đa 1 push: O(E log V). Tổng: O((V + E) log V) ~ O(E log V).

#### Lỗi thường gặp

1. **Quên check `d > dist[u]`:** Không bỏ qua entry cũ trong heap → xử lý lại node đã settled → sai kết quả hoặc TLE.
2. **Node đánh số từ 1:** LeetCode cho node từ 1 đến n, không phải 0 đến n-1. Nếu dùng list → size n+1.
3. **Quên trả -1:** Nếu có node unreachable, max dist = inf → phải return -1.
4. **Dùng Dijkstra cho trọng số âm:** Bài này trọng số >= 1 nên OK, nhưng trong bài khác nếu có trọng số âm thì Dijkstra SAI.

------

### 11.6 LeetCode #787 — Cheapest Flights Within K Stops

**Difficulty:** Medium | [Link bài](https://leetcode.com/problems/cheapest-flights-within-k-stops/)

#### Đề bài

Có `n` thành phố và một số chuyến bay. `flights[i] = [from, to, price]`. Tìm **giá rẻ nhất** để bay từ `src` đến `dst` với **tối đa k điểm dừng** (stops). Nếu không có đường → trả -1.

**Lưu ý:** k stops nghĩa là tối đa k+1 edges (k thành phố trung gian + 1 chuyến cuối).

**Ví dụ:**

```
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
       src = 0, dst = 3, k = 1
Output: 700
Giải thích: 0 → 1 → 3 (100 + 600 = 700). Đường 0 → 1 → 2 → 3 rẻ hơn (400) nhưng cần 2 stops > k=1.
```

#### Phân tích tư duy

Bài này **KHÔNG dùng Dijkstra thuần** được vì có **ràng buộc số bước**. Dijkstra greedy lấy đường rẻ nhất mà không quan tâm số bước → có thể bỏ qua đường đắt hơn nhưng ít bước hơn.

**3 cách tiếp cận:**

| Cách                      | Ý tưởng                             | Khi nào dùng      |
| :------------------------ | :---------------------------------- | :---------------- |
| **Bellman-Ford biến thể** | Relax tối đa k+1 lần                | Đơn giản, dễ hiểu |
| **BFS + pruning**         | BFS theo level (mỗi level = 1 stop) | Trực quan         |
| **Modified Dijkstra**     | Thêm chiều "số stops" vào state     | Nhanh hơn thực tế |

#### Cách 1: Bellman-Ford (k+1 iterations)

```python
from typing import List

class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]],
                          src: int, dst: int, k: int) -> int:
        # dist[i] = chi phí rẻ nhất để đến thành phố i
        dist = [float('inf')] * n
        dist[src] = 0

        # Bellman-Ford: relax tối đa k+1 lần (k stops = k+1 edges)
        for _ in range(k + 1):
            # QUAN TRỌNG: copy dist trước mỗi round
            # Nếu không copy → 1 round có thể relax qua nhiều edge (sai!)
            temp = dist[:]

            for u, v, price in flights:
                if dist[u] != float('inf') and dist[u] + price < temp[v]:
                    temp[v] = dist[u] + price

            dist = temp

        return dist[dst] if dist[dst] != float('inf') else -1
```

#### Cách 2: BFS theo level

```python
from typing import List
from collections import deque, defaultdict

class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]],
                          src: int, dst: int, k: int) -> int:
        # Xây adjacency list
        graph = defaultdict(list)
        for u, v, price in flights:
            graph[u].append((v, price))

        # dist[i] = chi phí rẻ nhất để đến i (cập nhật liên tục)
        dist = [float('inf')] * n
        dist[src] = 0

        # BFS theo level: mỗi level = 1 stop
        # queue chứa (node, cost_to_reach_node)
        queue = deque([(src, 0)])
        stops = 0

        while queue and stops <= k:
            # Xử lý hết level hiện tại
            level_size = len(queue)
            for _ in range(level_size):
                u, cost_u = queue.popleft()

                for v, price in graph[u]:
                    new_cost = cost_u + price
                    # Chỉ đi tiếp nếu tìm được đường rẻ hơn
                    if new_cost < dist[v]:
                        dist[v] = new_cost
                        queue.append((v, new_cost))

            stops += 1

        return dist[dst] if dist[dst] != float('inf') else -1
```

#### Dry run chi tiết

```
n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
src=0, dst=3, k=1

Bellman-Ford approach (k+1 = 2 iterations):

Khởi tạo: dist = [0, inf, inf, inf]

Round 1 (edge 1):
  temp = [0, inf, inf, inf] (copy)
  Flight [0,1,100]: dist[0]=0 + 100 = 100 < temp[1]=inf → temp[1] = 100
  Flight [1,2,100]: dist[1]=inf → skip (chưa reach)
  Flight [2,0,100]: dist[2]=inf → skip
  Flight [1,3,600]: dist[1]=inf → skip
  Flight [2,3,200]: dist[2]=inf → skip
  dist = [0, 100, inf, inf]

Round 2 (edge 2):
  temp = [0, 100, inf, inf] (copy)
  Flight [0,1,100]: dist[0]=0 + 100 = 100 = temp[1] → không cải thiện
  Flight [1,2,100]: dist[1]=100 + 100 = 200 < temp[2]=inf → temp[2] = 200
  Flight [2,0,100]: dist[2]=inf → skip
  Flight [1,3,600]: dist[1]=100 + 600 = 700 < temp[3]=inf → temp[3] = 700
  Flight [2,3,200]: dist[2]=inf → skip (dist[2] trong bản GỐC vẫn inf!)
  dist = [0, 100, 200, 700]

dist[3] = 700 → Return 700 ✓

LƯU Ý: Nếu KHÔNG copy dist → Round 2 sẽ dùng dist[2]=200 (vừa update)
  → Flight [2,3,200]: 200+200=400 < 700 → dist[3]=400
  → SAI! Vì đường 0→1→2→3 cần 2 stops, nhưng k=1.
  → Đó là lý do PHẢI copy dist trước mỗi round.
```

#### Complexity

| Cách             | Time                | Space    |
| :--------------- | :------------------ | :------- |
| **Bellman-Ford** | O(k x E)            | O(V)     |
| **BFS**          | O(k x E) worst case | O(V + E) |

**Giải thích:** Bellman-Ford chạy k+1 rounds, mỗi round duyệt E flights. Rất hiệu quả khi k nhỏ.

#### Lỗi thường gặp

1. **QUÊN COPY dist (Bellman-Ford):** Lỗi **cực kỳ phổ biến**. Không copy → relax xuyên qua nhiều edge trong 1 round → vi phạm ràng buộc k stops.
2. **Nhầm k stops vs k edges:** k stops = k+1 edges. Bellman-Ford chạy k+1 lần, KHÔNG PHẢI k lần.
3. **Dùng Dijkstra thuần:** Dijkstra tham lam lấy đường rẻ nhất → có thể bỏ qua đường đắt hơn nhưng ít bước → sai kết quả.
4. **BFS quên check `new_cost < dist[v]`:** Nếu không prune → queue phình to → TLE.

------

### 11.7 LeetCode #684 — Redundant Connection

**Difficulty:** Medium | [Link bài](https://leetcode.com/problems/redundant-connection/)

#### Đề bài

Cho một graph ban đầu là **cây** (n nodes, n-1 edges, connected, không cycle), nhưng được thêm **1 edge dư thừa** tạo thành cycle. Tìm edge đó. Nếu có nhiều đáp án, trả về edge xuất hiện **cuối cùng** trong input.

**Ví dụ:**

```
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
Giải thích: Cây gốc: 1-2, 1-3. Edge [2,3] tạo cycle 1→2→3→1.
Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
Giải thích: Cây gốc: 1-2, 2-3, 3-4, 1-5. Edge [1,4] tạo cycle.
```

#### Phân tích tư duy

Bài này là bài **kinh điển** của Union-Find:

1. **Cây có n nodes, n-1 edges.** Thêm 1 edge → n nodes, n edges → chắc chắn có 1 cycle.
2. **Edge dư thừa = edge mà 2 đầu đã connected.** Khi thêm edge (u,v), nếu u và v đã ở cùng component → edge này tạo cycle.
3. **Dùng Union-Find:** Duyệt từng edge. Trước khi union(u,v), check `find(u) == find(v)`. Nếu bằng → đây là redundant edge.

**Tại sao trả về edge cuối cùng?** Vì đề bài yêu cầu. Duyệt theo thứ tự input, edge redundant **cuối** sẽ là đáp án.

#### Solution: Union-Find

```python
from typing import List

class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)  # n edges = n nodes (vì thêm 1 edge dư)

        # Union-Find với path compression + union by rank
        parent = list(range(n + 1))  # nodes đánh số từ 1
        rank = [0] * (n + 1)

        def find(x: int) -> int:
            """Tìm root của x với path compression."""
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(x: int, y: int) -> bool:
            """
            Union hai node. Return False nếu đã cùng component
            (= edge dư thừa).
            """
            px, py = find(x), find(y)
            if px == py:
                return False  # ĐÃ CONNECTED → redundant edge!

            # Union by rank
            if rank[px] < rank[py]:
                px, py = py, px
            parent[py] = px
            if rank[px] == rank[py]:
                rank[px] += 1
            return True

        # Duyệt từng edge theo thứ tự input
        for u, v in edges:
            if not union(u, v):
                return [u, v]  # edge cuối cùng gây cycle

        return []  # không bao giờ đến đây (đề bài đảm bảo có 1 redundant edge)
```

#### Dry run chi tiết

```
edges = [[1,2],[1,3],[2,3]]

Khởi tạo: parent = [0,1,2,3], rank = [0,0,0,0]

Edge [1,2]:
  find(1) = 1, find(2) = 2 → KHÁC nhau → union OK
  parent[2] = 1 → parent = [0,1,1,3]

Edge [1,3]:
  find(1) = 1, find(3) = 3 → KHÁC nhau → union OK
  parent[3] = 1 → parent = [0,1,1,1]

Edge [2,3]:
  find(2) → parent[2]=1 → find(1) = 1 → return 1
  find(3) → parent[3]=1 → find(1) = 1 → return 1
  find(2) == find(3) == 1 → ĐÃ CONNECTED → REDUNDANT!

Return [2,3] ✓
```

#### Complexity

|                | Time               | Space |
| :------------- | :----------------- | :---- |
| **Union-Find** | O(n x a(n)) ~ O(n) | O(n)  |

**Giải thích:** a(n) là inverse Ackermann function, cực kỳ chậm tăng (<= 5 cho mọi n thực tế). Duyệt n edges, mỗi edge gọi find+union: O(a(n)). Tổng ~ O(n).

#### Lỗi thường gặp

1. **Quên node đánh số từ 1:** `parent = list(range(n + 1))`, KHÔNG PHẢI `range(n)`.
2. **Union trước khi check:** Phải check `find(x) == find(y)` TRƯỚC khi union. Nếu union trước → mất thông tin.
3. **Không dùng path compression:** Không sai nhưng TLE trên input lớn. Always dùng path compression.
4. **Trả về edge đầu tiên thay vì cuối cùng:** Trong trường hợp nhiều edge tạo cycle, đề yêu cầu edge cuối trong input. Duyệt tuần tự → tự nhiên trả edge cuối.

------

### 11.8 LeetCode #127 — Word Ladder

**Difficulty:** Hard | [Link bài](https://leetcode.com/problems/word-ladder/)

#### Đề bài

Cho `beginWord`, `endWord`, và `wordList`. Một **transformation sequence** là dãy các từ `beginWord → s1 → s2 → ... → endWord` sao cho:

- Mỗi cặp từ liên tiếp khác nhau đúng **1 ký tự**
- Mỗi `si` đều nằm trong `wordList`

Trả về **độ dài ngắn nhất** của transformation sequence. Nếu không có → trả về 0.

**Ví dụ:**

```
Input: beginWord = "hit", endWord = "cog",
       wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Giải thích: "hit" → "hot" → "dot" → "dog" → "cog" (5 từ)
```

#### Phân tích tư duy

Bài này trông không liên quan graph, nhưng thực chất là **BFS tìm đường ngắn nhất trong unweighted graph:**

1. **Mỗi từ = 1 vertex**
2. **Hai từ khác 1 ký tự = 1 edge** (biến đổi được)
3. **Tìm đường ngắn nhất từ beginWord → endWord**
4. **Graph unweighted → BFS cho shortest path**

**Thách thức: Xây graph hiệu quả**

Cách naive: So sánh mọi cặp từ → O(n^2 x L). Quá chậm!

Cách thông minh: Dùng **wildcard pattern**. Ví dụ: `"hot"` → `"*ot"`, `"h*t"`, `"ho*"`. Các từ cùng pattern = kết nối với nhau.

**Tối ưu hơn: Bidirectional BFS**

BFS từ 2 phía (beginWord và endWord) đồng thời. Khi 2 phía gặp nhau → tìm được đường.

- BFS thường: O(b^d) với b = branching factor, d = depth
- Bidirectional: O(2 x b^(d/2)) = O(b^(d/2)) → nhanh hơn rất nhiều

#### Cách 1: BFS + Wildcard Pattern

```python
from typing import List
from collections import deque, defaultdict

class Solution:
    def ladderLength(self, beginWord: str, endWord: str,
                     wordList: List[str]) -> int:
        # Edge case: endWord không có trong wordList
        if endWord not in wordList:
            return 0

        word_set = set(wordList)
        L = len(beginWord)  # tất cả từ cùng độ dài

        # Xây pattern map: "*ot" → ["hot", "dot", "lot"]
        pattern_map = defaultdict(list)
        for word in wordList:
            for i in range(L):
                pattern = word[:i] + '*' + word[i+1:]
                pattern_map[pattern].append(word)

        # BFS
        queue = deque([(beginWord, 1)])  # (từ hiện tại, độ dài path)
        visited = {beginWord}

        while queue:
            word, length = queue.popleft()

            # Thử tất cả pattern của word hiện tại
            for i in range(L):
                pattern = word[:i] + '*' + word[i+1:]

                # Tìm các từ match pattern này
                for neighbor in pattern_map[pattern]:
                    if neighbor == endWord:
                        return length + 1  # tìm được!

                    if neighbor not in visited:
                        visited.add(neighbor)
                        queue.append((neighbor, length + 1))

                # Xóa pattern đã xử lý (tối ưu, tránh duyệt lại)
                pattern_map[pattern] = []

        return 0  # không tìm được đường
```

#### Cách 2: BFS thay từng ký tự (không cần pre-build map)

```python
from typing import List
from collections import deque

class Solution:
    def ladderLength(self, beginWord: str, endWord: str,
                     wordList: List[str]) -> int:
        if endWord not in wordList:
            return 0

        word_set = set(wordList)
        L = len(beginWord)

        queue = deque([(beginWord, 1)])
        visited = {beginWord}

        while queue:
            word, length = queue.popleft()

            # Thử đổi từng ký tự thành a-z
            for i in range(L):
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    if c == word[i]:
                        continue  # skip ký tự giống

                    # Tạo từ mới bằng cách đổi vị trí i
                    new_word = word[:i] + c + word[i+1:]

                    if new_word == endWord:
                        return length + 1

                    if new_word in word_set and new_word not in visited:
                        visited.add(new_word)
                        queue.append((new_word, length + 1))

        return 0
```

#### Dry run chi tiết

```
beginWord = "hit", endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]

Pattern map:
  "*ot" → [hot, dot, lot]
  "h*t" → [hot]
  "ho*" → [hot]
  "d*t" → [dot]
  "do*" → [dot, dog]
  "*og" → [dog, log, cog]
  "d*g" → [dog]
  "l*t" → [lot]
  "lo*" → [lot, log]
  "l*g" → [log]
  "c*g" → [cog]
  "co*" → [cog]

BFS:
queue = [("hit", 1)], visited = {"hit"}

Level 1: Dequeue "hit"
  Patterns: "*it", "h*t", "hi*"
  "*it" → [] (không ai match)
  "h*t" → ["hot"] → hot != cog, add hot
  "hi*" → [] (không ai match)
  queue = [("hot", 2)], visited = {"hit", "hot"}

Level 2: Dequeue "hot"
  Patterns: "*ot", "h*t", "ho*"
  "*ot" → [dot, lot] → thêm cả hai
  "h*t" → [] (đã xóa)
  "ho*" → [] (đã xóa)
  queue = [("dot", 3), ("lot", 3)], visited = {hit, hot, dot, lot}

Level 3: Dequeue "dot"
  "d*t" → [] (không match mới)
  "do*" → [dog] → thêm dog
  Dequeue "lot"
  "lo*" → [log] → thêm log
  queue = [("dog", 4), ("log", 4)], visited = {hit, hot, dot, lot, dog, log}

Level 4: Dequeue "dog"
  "*og" → [cog] → CÓ! endWord found!
  Return 4 + 1 = 5 ✓

Path: hit → hot → dot → dog → cog (5 từ)
```

#### Complexity

| Cách               | Time                     | Space      |
| :----------------- | :----------------------- | :--------- |
| **BFS + Pattern**  | O(M^2 x N)               | O(M^2 x N) |
| **BFS + 26 chars** | O(M x 26 x N) = O(M x N) | O(M x N)   |

Trong đó M = độ dài mỗi từ, N = số từ trong wordList.

**Giải thích Cách 1:** Xây pattern map: N từ x M patterns = O(M x N). Mỗi pattern tạo string mới dài M → O(M^2 x N). BFS duyệt tối đa N nodes, mỗi node M patterns → O(M x N).

**Giải thích Cách 2:** Mỗi node thử M vị trí x 26 ký tự. Tạo string mới: O(M). Check trong set: O(M). Tổng mỗi node: O(26 x M^2). Duyệt N nodes → O(M^2 x N).

#### Lỗi thường gặp

1. **Quên check `endWord not in wordList`:** Đề bài nói endWord phải trong wordList. Nếu không → return 0 ngay.
2. **Đếm sai:** Đề hỏi **số từ** trong path (bao gồm beginWord), KHÔNG PHẢI số bước. `"hit" → "cog"` = 5 từ (4 bước).
3. **Không dùng set cho wordList:** Dùng list → check `in` = O(N). Dùng set → O(1). Không dùng set → TLE.
4. **Quên visited check:** BFS mà không check visited → duyệt lại → TLE hoặc vòng lặp vô hạn.

------

### 11.9 LeetCode #994 — Rotting Oranges

**Difficulty:** Medium | [Link bài](https://leetcode.com/problems/rotting-oranges/)

#### Đề bài

Cho grid `m x n` chứa:

- `0` = ô trống
- `1` = cam tươi
- `2` = cam thối

Mỗi phút, cam tươi **kề 4 hướng** với cam thối sẽ bị thối. Hỏi **bao nhiêu phút** để tất cả cam đều thối? Nếu không thể → trả -1.

**Ví dụ:**

```
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1 (cam ở góc trái dưới bị cô lập)
```

#### Phân tích tư duy

Bài này là **Multi-source BFS** — BFS bắt đầu từ **nhiều nguồn** đồng thời:

1. **Tất cả cam thối ban đầu = các nguồn BFS** (đưa hết vào queue trước khi bắt đầu)
2. **Mỗi "level" BFS = 1 phút** (cam thối lan ra 1 lớp)
3. **Khi BFS xong, kiểm tra còn cam tươi không**

**Tại sao Multi-source BFS?**

- Nếu chỉ BFS từ 1 cam thối → phải chạy BFS cho từng cam → O(m^2 x n^2)
- Multi-source: đưa TẤT CẢ cam thối vào queue → chạy 1 lần BFS → O(mn)

**Trực giác:** Giống như nhúng nhiều giọt mực vào nước cùng lúc — tất cả lan ra đồng thời.

#### Solution: Multi-source BFS

```python
from typing import List
from collections import deque

class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        queue = deque()
        fresh_count = 0

        # Bước 1: Tìm tất cả cam thối (nguồn BFS) và đếm cam tươi
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 2:
                    queue.append((r, c))  # cam thối → vào queue
                elif grid[r][c] == 1:
                    fresh_count += 1  # đếm cam tươi

        # Edge case: không có cam tươi → 0 phút
        if fresh_count == 0:
            return 0

        minutes = 0
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        # Bước 2: BFS theo level (mỗi level = 1 phút)
        while queue:
            # Xử lý hết level hiện tại
            level_size = len(queue)
            has_rotted = False  # có cam nào bị thối trong phút này không?

            for _ in range(level_size):
                r, c = queue.popleft()

                for dr, dc in directions:
                    nr, nc = r + dr, c + dc

                    # Kiểm tra: trong biên VÀ là cam tươi
                    if (0 <= nr < rows and 0 <= nc < cols
                            and grid[nr][nc] == 1):
                        grid[nr][nc] = 2  # cam tươi → thối
                        fresh_count -= 1
                        queue.append((nr, nc))
                        has_rotted = True

            if has_rotted:
                minutes += 1

        # Bước 3: Kiểm tra còn cam tươi không
        return minutes if fresh_count == 0 else -1
```

#### Dry run chi tiết

```
grid = [[2,1,1],
        [1,1,0],
        [0,1,1]]

Bước 1: Tìm nguồn
  (0,0) = 2 → queue = [(0,0)]
  fresh_count = 6 (các ô 1)

Phút 1: queue = [(0,0)]
  Xét (0,0):
    (1,0) = 1 → thối! grid[1][0]=2, fresh=5, queue += [(1,0)]
    (0,1) = 1 → thối! grid[0][1]=2, fresh=4, queue += [(0,1)]
  has_rotted = True → minutes = 1
  grid: [[2,2,1],
         [2,1,0],
         [0,1,1]]

Phút 2: queue = [(1,0), (0,1)]
  Xét (1,0):
    (1,1) = 1 → thối! fresh=3, queue += [(1,1)]
  Xét (0,1):
    (0,2) = 1 → thối! fresh=2, queue += [(0,2)]
  minutes = 2
  grid: [[2,2,2],
         [2,2,0],
         [0,1,1]]

Phút 3: queue = [(1,1), (0,2)]
  Xét (1,1):
    (2,1) = 1 → thối! fresh=1, queue += [(2,1)]
  Xét (0,2): không có neighbor tươi
  minutes = 3
  grid: [[2,2,2],
         [2,2,0],
         [0,2,1]]

Phút 4: queue = [(2,1)]
  Xét (2,1):
    (2,2) = 1 → thối! fresh=0, queue += [(2,2)]
  minutes = 4
  grid: [[2,2,2],
         [2,2,0],
         [0,2,2]]

Queue = [(2,2)] → Xét (2,2): không có neighbor tươi → queue rỗng
fresh_count = 0 → Return 4 ✓
```

#### Complexity

|                      | Time     | Space    |
| :------------------- | :------- | :------- |
| **Multi-source BFS** | O(m x n) | O(m x n) |

**Giải thích Time:** Mỗi ô được xử lý tối đa 1 lần (đổi thành 2 rồi không xử lý lại). Tổng: O(m x n).

**Giải thích Space:** Queue chứa tối đa tất cả ô = O(m x n).

#### Lỗi thường gặp

1. **Quên trường hợp `fresh_count == 0` ban đầu:** Nếu không có cam tươi → return 0, không phải -1.
2. **Đếm minutes sai:** Phải đếm khi CÓ cam bị thối (has_rotted), không phải mỗi level. Level cuối (không thối thêm cam nào) không tính.
3. **Quên kiểm tra `fresh_count > 0` ở cuối:** Có cam cô lập (không kề cam thối) → BFS xong vẫn còn cam tươi → return -1.
4. **Chỉ BFS từ 1 cam thối:** Phải đưa TẤT CẢ cam thối vào queue ngay từ đầu (multi-source).

------

### 11.10 LeetCode #323 — Number of Connected Components in an Undirected Graph

**Difficulty:** Medium | [Link bài](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)

#### Đề bài

Cho `n` nodes đánh số từ `0` đến `n-1` và danh sách `edges` (undirected). Đếm số **connected components** trong graph.

**Ví dụ:**

```
Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2
Giải thích:
  Component 1: {0, 1, 2}
  Component 2: {3, 4}
Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
Output: 1 (tất cả connected)
```

#### Phân tích tư duy

Bài này là bài **cơ bản nhất** về connected components. Có 3 cách tiếp cận:

| Cách           | Ý tưởng                                             | Time            |
| :------------- | :-------------------------------------------------- | :-------------- |
| **DFS/BFS**    | Duyệt từ mỗi unvisited node, đếm số lần bắt đầu mới | O(V + E)        |
| **Union-Find** | Union các edges, đếm số roots                       | O(V + E x a(V)) |

**Khi nào dùng cách nào?**

- DFS/BFS: Khi cần xử lý thêm (tìm thành phần lớn nhất, v.v.)
- Union-Find: Khi edges đến **từ từ** (online/streaming) hoặc cần merge/query nhanh

#### Cách 1: DFS

```python
from typing import List
from collections import defaultdict

class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        # Xây adjacency list
        graph = defaultdict(list)
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)  # undirected

        visited = set()
        count = 0

        def dfs(node: int):
            """DFS đánh dấu tất cả nodes trong component."""
            visited.add(node)
            for neighbor in graph[node]:
                if neighbor not in visited:
                    dfs(neighbor)

        # Duyệt từng node
        for i in range(n):
            if i not in visited:
                count += 1  # bắt đầu component mới
                dfs(i)  # duyệt hết component

        return count
```

#### Cách 2: BFS

```python
from typing import List
from collections import defaultdict, deque

class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        graph = defaultdict(list)
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        visited = set()
        count = 0

        for i in range(n):
            if i not in visited:
                count += 1
                # BFS từ node i
                queue = deque([i])
                visited.add(i)

                while queue:
                    node = queue.popleft()
                    for neighbor in graph[node]:
                        if neighbor not in visited:
                            visited.add(neighbor)
                            queue.append(neighbor)

        return count
```

#### Cách 3: Union-Find

```python
from typing import List

class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        parent = list(range(n))
        rank = [0] * n

        def find(x: int) -> int:
            if parent[x] != x:
                parent[x] = find(parent[x])  # path compression
            return parent[x]

        def union(x: int, y: int) -> bool:
            px, py = find(x), find(y)
            if px == py:
                return False  # đã cùng component

            # Union by rank
            if rank[px] < rank[py]:
                px, py = py, px
            parent[py] = px
            if rank[px] == rank[py]:
                rank[px] += 1
            return True

        # Ban đầu: n components (mỗi node là 1 component)
        components = n

        for u, v in edges:
            if union(u, v):
                components -= 1  # merge thành công → giảm 1 component

        return components
```

#### Dry run chi tiết

```
n = 5, edges = [[0,1],[1,2],[3,4]]

Union-Find approach:

Khởi tạo: parent = [0,1,2,3,4], components = 5

Edge [0,1]:
  find(0) = 0, find(1) = 1 → KHÁC → union
  parent[1] = 0 → parent = [0,0,2,3,4]
  components = 4

Edge [1,2]:
  find(1) → parent[1]=0 → find(0) = 0 → return 0
  find(2) = 2 → KHÁC → union
  parent[2] = 0 → parent = [0,0,0,3,4]
  components = 3

Edge [3,4]:
  find(3) = 3, find(4) = 4 → KHÁC → union
  parent[4] = 3 → parent = [0,0,0,3,3]
  components = 2

Return 2 ✓

Components: {0,1,2} và {3,4}
```

#### Complexity

| Cách           | Time                       | Space    |
| :------------- | :------------------------- | :------- |
| **DFS**        | O(V + E)                   | O(V + E) |
| **BFS**        | O(V + E)                   | O(V + E) |
| **Union-Find** | O(V + E x a(V)) ~ O(V + E) | O(V)     |

**So sánh Space:** Union-Find chỉ cần O(V), DFS/BFS cần O(V + E) cho adjacency list. Union-Find thắng khi graph dày (nhiều edges).

#### Lỗi thường gặp

1. **Quên nodes cô lập:** Node không có edge nào vẫn là 1 component. Phải duyệt TẤT CẢ nodes 0 đến n-1.
2. **DFS stack overflow:** Nếu n rất lớn và component rất lớn → DFS recursive bị stack overflow. Nên dùng BFS hoặc iterative DFS.
3. **Undirected nhưng chỉ thêm 1 chiều:** `graph[u].append(v)` mà quên `graph[v].append(u)` → thiếu edges → sai kết quả.
4. **Union-Find quên path compression:** Không sai nhưng chậm. Worst case O(n) mỗi find thay vì O(a(n)).

------

### Tổng kết LeetCode Practice

| #    | Bài                      | Thuật toán chính                   | Difficulty | Pattern                    |
| :--- | :----------------------- | :--------------------------------- | :--------- | :------------------------- |
| 200  | Number of Islands        | DFS/BFS trên grid                  | Medium     | Connected Components       |
| 133  | Clone Graph              | BFS/DFS + HashMap                  | Medium     | Graph Traversal            |
| 207  | Course Schedule          | Topological Sort / Cycle Detection | Medium     | Directed Graph             |
| 210  | Course Schedule II       | Topological Sort (output order)    | Medium     | Directed Graph             |
| 743  | Network Delay Time       | Dijkstra                           | Medium     | Shortest Path              |
| 787  | Cheapest Flights K Stops | Bellman-Ford biến thể              | Medium     | Shortest Path + Constraint |
| 684  | Redundant Connection     | Union-Find                         | Medium     | Cycle Detection            |
| 127  | Word Ladder              | BFS + Pattern matching             | Hard       | Shortest Path (unweighted) |
| 994  | Rotting Oranges          | Multi-source BFS                   | Medium     | BFS trên grid              |
| 323  | Connected Components     | DFS/BFS/Union-Find                 | Medium     | Connected Components       |

**Tips phỏng vấn:**

1. **Nhận diện pattern:** Đọc đề → xác định đây là graph problem → chọn thuật toán phù hợp
2. **Grid = implicit graph:** Bài grid (200, 994) chính là graph ẩn, mỗi ô = node, 4 hướng = edges
3. **Prerequisites = DAG:** Bài dependencies (207, 210) = directed acyclic graph → topological sort
4. **Shortest path:** Unweighted → BFS (127). Weighted non-negative → Dijkstra (743). Weighted + constraints → Bellman-Ford (787)
5. **Connected components:** DFS/BFS đếm component (200, 323). Union-Find khi cần merge online (684)
6. **Clone/Copy:** Hash map để track đã clone chưa, tránh infinite loop do cycle (133)
