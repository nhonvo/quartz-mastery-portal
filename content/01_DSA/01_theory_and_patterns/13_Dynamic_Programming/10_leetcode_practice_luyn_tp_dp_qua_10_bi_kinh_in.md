---


title: "10 leetcode practice luyn tp dp qua 10 bi kinh in"
tags: [dsa, algorithms, computer-science, learning-note]
---

## 10. LeetCode Practice — Luyện tập DP qua 10 bài kinh điển

> **"Học DP mà không luyện LeetCode thì giống như học bơi trên cạn."**

Bạn đã nắm vững lý thuyết DP rồi. Giờ là lúc **thực chiến**! Mình đã chọn 10 bài LeetCode kinh điển, sắp xếp từ dễ đến khó, bao phủ tất cả các pattern DP quan trọng. Mỗi bài mình sẽ phân tích **cực kỳ chi tiết** — từ tư duy, định nghĩa state, công thức chuyển trạng thái, đến nhiều cách tiếp cận và dry run bảng DP.

| #    | Bài                                  | Pattern                       | Difficulty |
| :--- | :----------------------------------- | :---------------------------- | :--------- |
| 1    | #70 Climbing Stairs                  | 1D DP (Fibonacci variant)     | Easy       |
| 2    | #198 House Robber                    | 1D DP (chọn/bỏ)               | Medium     |
| 3    | #121 Best Time to Buy and Sell Stock | State Machine DP              | Easy       |
| 4    | #62 Unique Paths                     | 2D Grid DP                    | Medium     |
| 5    | #322 Coin Change                     | Unbounded Knapsack            | Medium     |
| 6    | #518 Coin Change 2                   | Unbounded Knapsack (đếm cách) | Medium     |
| 7    | #300 Longest Increasing Subsequence  | LIS Pattern                   | Medium     |
| 8    | #1143 Longest Common Subsequence     | LCS Pattern                   | Medium     |
| 9    | #72 Edit Distance                    | DP on Strings                 | Medium     |
| 10   | #416 Partition Equal Subset Sum      | 0/1 Knapsack                  | Medium     |

------

### Bài 1: #70 Climbing Stairs (Easy)

> [LeetCode 70 — Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)

#### De bai (Problem Statement)

Bạn đang leo cầu thang. Cần `n` bước để lên đến đỉnh. Mỗi lần bạn có thể leo **1 bước** hoặc **2 bước**. Hỏi có bao nhiêu **cách khác nhau** để leo lên đỉnh?

**Ví dụ:**

- `n = 2` → Output: `2` (1+1 hoặc 2)
- `n = 3` → Output: `3` (1+1+1, 1+2, 2+1)

#### Phan tich tu duy (Thought Process)

**Bước 1: Hiểu bài toán**

Mình đang đứng ở bậc 0, muốn lên bậc `n`. Mỗi lần bước 1 hoặc 2. Đếm tổng số cách.

**Bước 2: Tìm cấu trúc đệ quy**

Để lên bậc `n`, mình phải đến từ **một trong hai nơi**:

- Bậc `n-1` (bước 1 bước lên)
- Bậc `n-2` (bước 2 bước lên)

→ Số cách lên bậc `n` = số cách lên bậc `n-1` + số cách lên bậc `n-2`

**Bước 3: Nhận ra đây là Fibonacci!**

`f(n) = f(n-1) + f(n-2)` với `f(1) = 1, f(2) = 2` — đây chính là dãy Fibonacci dịch đi một chút!

**Bước 4: Overlapping subproblems?**

```
f(5) = f(4) + f(3)
     = [f(3) + f(2)] + [f(2) + f(1)]
     = [[f(2) + f(1)] + f(2)] + [f(2) + f(1)]
→ f(2) tính 3 lần, f(1) tính 2 lần → CÓ overlapping!
```

→ Dùng DP được!

#### Dinh nghia DP (State Definition)

| Thành phần     | Giá trị                                  |
| :------------- | :--------------------------------------- |
| **State**      | `dp[i]` = số cách để leo lên bậc thứ `i` |
| **Transition** | `dp[i] = dp[i-1] + dp[i-2]`              |
| **Base case**  | `dp[1] = 1, dp[2] = 2`                   |
| **Answer**     | `dp[n]`                                  |

#### Cach 1: Brute Force (De quy thuan)

```python
# Time: O(2^n) — MỖI bậc thang phân nhánh thành 2 lựa chọn
# Space: O(n) — chiều sâu stack đệ quy

def climbStairs(n: int) -> int:
    # Base cases
    if n <= 2:
        return n
    # Bậc n = đến từ bậc n-1 (bước 1) + bậc n-2 (bước 2)
    return climbStairs(n - 1) + climbStairs(n - 2)

# ❌ CHẬM! Với n=45, phải tính hơn 2 tỷ lần gọi hàm
```

#### Cach 2: Memoization (Top-down DP)

```python
# Time: O(n) — mỗi bậc chỉ tính MỘT lần
# Space: O(n) — memo array + call stack

def climbStairs(n: int) -> int:
    memo = {}  # Bộ nhớ cache: bậc → số cách

    def dp(i):
        # Base cases: bậc 1 có 1 cách, bậc 2 có 2 cách
        if i <= 2:
            return i
        # Nếu đã tính rồi → trả về kết quả từ cache
        if i in memo:
            return memo[i]
        # Chưa tính → tính và lưu vào cache
        memo[i] = dp(i - 1) + dp(i - 2)
        return memo[i]

    return dp(n)
```

#### Cach 3: Tabulation (Bottom-up DP)

```python
# Time: O(n) — duyệt từ bậc 3 đến n
# Space: O(n) — mảng dp kích thước n+1

def climbStairs(n: int) -> int:
    if n <= 2:
        return n

    # Tạo bảng DP
    dp = [0] * (n + 1)
    dp[1] = 1  # 1 cách leo lên bậc 1
    dp[2] = 2  # 2 cách leo lên bậc 2

    # Điền bảng từ dưới lên
    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]
```

#### Cach 4: Space Optimized

```python
# Time: O(n)
# Space: O(1) — chỉ cần 2 biến!

def climbStairs(n: int) -> int:
    if n <= 2:
        return n

    # Chỉ cần nhớ 2 giá trị trước đó
    prev2 = 1  # dp[i-2], bắt đầu = dp[1]
    prev1 = 2  # dp[i-1], bắt đầu = dp[2]

    for i in range(3, n + 1):
        curr = prev1 + prev2  # dp[i] = dp[i-1] + dp[i-2]
        prev2 = prev1         # dịch cửa sổ
        prev1 = curr

    return prev1
```

#### Dry Run — Bang DP (n = 5)

```
Bảng DP được điền từ trái sang phải:

i   | 1 | 2 | 3 | 4 | 5 |
----|---|---|---|---|---|
dp  | 1 | 2 | 3 | 5 | 8 |

Bước 1: dp[1] = 1 (base case)
Bước 2: dp[2] = 2 (base case)
Bước 3: dp[3] = dp[2] + dp[1] = 2 + 1 = 3
Bước 4: dp[4] = dp[3] + dp[2] = 3 + 2 = 5
Bước 5: dp[5] = dp[4] + dp[3] = 5 + 3 = 8

→ Kết quả: 8 cách leo 5 bậc thang

Liệt kê cả 8 cách:
1. 1+1+1+1+1
2. 1+1+1+2
3. 1+1+2+1
4. 1+2+1+1
5. 2+1+1+1
6. 1+2+2
7. 2+1+2
8. 2+2+1
```

#### Complexity Analysis

| Approach        | Time   | Space |
| :-------------- | :----- | :---- |
| Brute Force     | O(2^n) | O(n)  |
| Memoization     | O(n)   | O(n)  |
| Tabulation      | O(n)   | O(n)  |
| Space Optimized | O(n)   | O(1)  |

#### Loi hay mac & Edge Cases

- **n = 1**: Chỉ có 1 cách → đừng quên xử lý base case
- **Nhầm base case**: `dp[0] = 1` hay `dp[0] = 0`? Tùy cách định nghĩa. Nếu `dp[0]` là "đứng ở mặt đất, có 1 cách = không bước" thì `dp[0] = 1`
- **Nhầm với Fibonacci**: Climbing Stairs bắt đầu `1, 2, 3, 5, 8` (không phải `0, 1, 1, 2, 3, 5`)

------

### Bài 2: #198 House Robber (Medium)

> [LeetCode 198 — House Robber](https://leetcode.com/problems/house-robber/)

#### De bai (Problem Statement)

Bạn là tên trộm chuyên nghiệp, lên kế hoạch cướp nhà dọc theo một con phố. Mỗi nhà có một số tiền nhất định. Hạn chế duy nhất: **không được cướp hai nhà liền kề** (vì hệ thống báo động sẽ kích hoạt). Tìm **số tiền tối đa** có thể cướp.

**Ví dụ:**

- `nums = [1,2,3,1]` → Output: `4` (cướp nhà 0 và nhà 2: 1+3=4)
- `nums = [2,7,9,3,1]` → Output: `12` (cướp nhà 0, 2, 4: 2+9+1=12)

#### Phan tich tu duy (Thought Process)

**Bước 1: Tại sao không dùng Greedy?**

Greedy (luôn chọn nhà có giá trị cao nhất) **KHÔNG** hoạt động! Ví dụ: `[2, 1, 1, 2]` — greedy chọn nhà 0 (2) rồi nhà 3 (2) = 4, nhưng thực ra chọn nhà 0 (2) + nhà 3 (2) = 4 hoặc nhà 0 + nhà 2 = 3. Greedy có thể bỏ qua tổ hợp tối ưu.

**Bước 2: Xây dựng đệ quy**

Với mỗi nhà `i`, mình có **2 lựa chọn**:

- **Cướp nhà `i`**: Lấy `nums[i]` tiền, nhưng phải **bỏ qua** nhà `i-1` → subproblem là nhà `i-2` trở về trước
- **Bỏ qua nhà `i`**: Không lấy tiền → subproblem là nhà `i-1` trở về trước

→ `f(i) = max(nums[i] + f(i-2), f(i-1))`

**Bước 3: Overlapping subproblems?**

```
f(5) = max(nums[5] + f(3), f(4))
f(4) = max(nums[4] + f(2), f(3))  ← f(3) xuất hiện ở cả f(5) và f(4)!
```

→ Có overlapping → Dùng DP!

#### Dinh nghia DP (State Definition)

| Thành phần     | Giá trị                                             |
| :------------- | :-------------------------------------------------- |
| **State**      | `dp[i]` = số tiền tối đa khi xét từ nhà 0 đến nhà i |
| **Transition** | `dp[i] = max(dp[i-1], nums[i] + dp[i-2])`           |
| **Base case**  | `dp[0] = nums[0]`, `dp[1] = max(nums[0], nums[1])`  |
| **Answer**     | `dp[n-1]`                                           |

**Giải thích transition**: Tại nhà `i`, so sánh 2 phương án:

- `dp[i-1]`: bỏ qua nhà i, giữ kết quả tốt nhất đến nhà i-1
- `nums[i] + dp[i-2]`: cướp nhà i, cộng với kết quả tốt nhất đến nhà i-2

#### Cach 1: Brute Force (De quy)

```python
# Time: O(2^n) — mỗi nhà có 2 lựa chọn
# Space: O(n) — chiều sâu đệ quy

def rob(nums: list[int]) -> int:
    def helper(i):
        # Nếu không còn nhà nào
        if i < 0:
            return 0
        # Lựa chọn: cướp nhà i (bỏ i-1) HOẶC bỏ qua nhà i
        return max(
            nums[i] + helper(i - 2),  # cướp nhà i
            helper(i - 1)              # bỏ qua nhà i
        )

    return helper(len(nums) - 1)
```

#### Cach 2: Memoization (Top-down DP)

```python
# Time: O(n) — mỗi nhà tính 1 lần
# Space: O(n) — memo + call stack

def rob(nums: list[int]) -> int:
    memo = {}

    def dp(i):
        if i < 0:
            return 0
        if i in memo:
            return memo[i]
        # Cướp nhà i hay bỏ qua? Chọn phương án cho tiền nhiều hơn
        memo[i] = max(nums[i] + dp(i - 2), dp(i - 1))
        return memo[i]

    return dp(len(nums) - 1)
```

#### Cach 3: Tabulation (Bottom-up DP)

```python
# Time: O(n)
# Space: O(n)

def rob(nums: list[int]) -> int:
    n = len(nums)
    if n == 0: return 0
    if n == 1: return nums[0]

    dp = [0] * n
    dp[0] = nums[0]                    # Nhà đầu tiên: chỉ có thể cướp nó
    dp[1] = max(nums[0], nums[1])      # Hai nhà đầu: chọn nhà giá trị hơn

    for i in range(2, n):
        # Cướp nhà i (+ best đến i-2) hay bỏ qua (giữ best đến i-1)?
        dp[i] = max(dp[i - 1], nums[i] + dp[i - 2])

    return dp[n - 1]
```

#### Cach 4: Space Optimized

```python
# Time: O(n)
# Space: O(1) — chỉ cần 2 biến

def rob(nums: list[int]) -> int:
    if not nums: return 0
    if len(nums) == 1: return nums[0]

    prev2 = nums[0]                    # dp[i-2]
    prev1 = max(nums[0], nums[1])      # dp[i-1]

    for i in range(2, len(nums)):
        curr = max(prev1, nums[i] + prev2)
        prev2 = prev1
        prev1 = curr

    return prev1
```

#### Dry Run — Bang DP (nums = [2, 7, 9, 3, 1])

```
i      | 0 | 1 | 2  | 3  | 4  |
nums   | 2 | 7 | 9  | 3  | 1  |
-------|---|---|----|----|-----|
dp     | 2 | 7 | 11 | 11 | 12 |

Bước 1: dp[0] = nums[0] = 2
         (Chỉ có nhà 0 → cướp nó = 2)

Bước 2: dp[1] = max(nums[0], nums[1]) = max(2, 7) = 7
         (Hai nhà đầu → chọn nhà 7)

Bước 3: dp[2] = max(dp[1], nums[2] + dp[0])
              = max(7, 9 + 2) = max(7, 11) = 11
         (Cướp nhà 2 + nhà 0 = 9+2=11 > bỏ qua = 7 → CƯỚP)

Bước 4: dp[3] = max(dp[2], nums[3] + dp[1])
              = max(11, 3 + 7) = max(11, 10) = 11
         (Cướp nhà 3 + best đến nhà 1 = 10 < bỏ qua = 11 → BỎ QUA)

Bước 5: dp[4] = max(dp[3], nums[4] + dp[2])
              = max(11, 1 + 11) = max(11, 12) = 12
         (Cướp nhà 4 + best đến nhà 2 = 12 > bỏ qua = 11 → CƯỚP)

→ Kết quả: 12 (cướp nhà 0, 2, 4: 2 + 9 + 1 = 12)
```

#### Complexity Analysis

| Approach        | Time   | Space |
| :-------------- | :----- | :---- |
| Brute Force     | O(2^n) | O(n)  |
| Memoization     | O(n)   | O(n)  |
| Tabulation      | O(n)   | O(n)  |
| Space Optimized | O(n)   | O(1)  |

#### Loi hay mac & Edge Cases

- **Mảng rỗng hoặc 1 phần tử**: Đừng quên xử lý
- **Nhầm base case dp[1]**: `dp[1] = nums[1]` là SAI! Phải là `max(nums[0], nums[1])` vì tại vị trí 1 bạn có thể chọn nhà 0 hoặc nhà 1
- **Biến thể**: House Robber II (nhà xếp vòng tròn), House Robber III (nhà trên cây)

------

### Bài 3: #121 Best Time to Buy and Sell Stock (Easy)

> [LeetCode 121 — Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

#### De bai (Problem Statement)

Cho mảng `prices` trong đó `prices[i]` là giá cổ phiếu ngày thứ `i`. Bạn muốn **mua 1 ngày** và **bán 1 ngày sau đó** để tối đa hóa lợi nhuận. Trả về lợi nhuận tối đa. Nếu không thể kiếm lời, trả về `0`.

**Ví dụ:**

- `prices = [7,1,5,3,6,4]` → Output: `5` (mua ngày 1 giá 1, bán ngày 4 giá 6 → lời 5)
- `prices = [7,6,4,3,1]` → Output: `0` (giá giảm dần, không nên mua)

#### Phan tich tu duy (Thought Process)

**Bước 1: Brute force là gì?**

Thử tất cả cặp (mua, bán) với mua < bán → O(n^2). Quá chậm!

**Bước 2: Quan sát then chốt**

Để tối đa lợi nhuận khi bán ngày `i`, mình cần biết **giá thấp nhất trước ngày i**.

→ `max_profit = max(prices[i] - min_price_so_far)` với mọi i

**Bước 3: Đây là State Machine DP!**

Mình có 2 trạng thái:

- **Chưa mua** (not holding): lợi nhuận = 0
- **Đang giữ** (holding): lợi nhuận = -buy_price

Chuyển trạng thái:

- Chưa mua → Mua: profit -= prices[i]
- Đang giữ → Bán: profit += prices[i]

#### Dinh nghia DP (State Definition)

| Thành phần     | Giá trị                                                      |
| :------------- | :----------------------------------------------------------- |
| **State**      | `min_price` = giá thấp nhất từ ngày 0 đến ngày i             |
| **Transition** | `min_price = min(min_price, prices[i])`, `max_profit = max(max_profit, prices[i] - min_price)` |
| **Base case**  | `min_price = prices[0]`, `max_profit = 0`                    |
| **Answer**     | `max_profit`                                                 |

#### Cach 1: Brute Force

```python
# Time: O(n^2) — thử tất cả cặp mua/bán
# Space: O(1)

def maxProfit(prices: list[int]) -> int:
    max_profit = 0
    n = len(prices)

    for buy in range(n):          # Ngày mua
        for sell in range(buy + 1, n):  # Ngày bán (sau ngày mua)
            profit = prices[sell] - prices[buy]
            max_profit = max(max_profit, profit)

    return max_profit
```

#### Cach 2: Memoization (State Machine DP)

```python
# Time: O(n)
# Space: O(n) — memo + call stack

def maxProfit(prices: list[int]) -> int:
    n = len(prices)
    memo = {}

    def dp(i, holding):
        """
        i: ngày hiện tại
        holding: True nếu đang giữ cổ phiếu, False nếu chưa mua
        """
        if i == n:
            return 0  # Hết ngày → lợi nhuận thêm = 0

        if (i, holding) in memo:
            return memo[(i, holding)]

        # Lựa chọn 1: Không làm gì (skip ngày i)
        result = dp(i + 1, holding)

        if holding:
            # Đang giữ → có thể BÁN hôm nay
            result = max(result, prices[i] + dp(i + 1, False))
        else:
            # Chưa mua → có thể MUA hôm nay
            result = max(result, -prices[i] + dp(i + 1, True))

        memo[(i, holding)] = result
        return result

    return dp(0, False)  # Bắt đầu ngày 0, chưa giữ cổ phiếu
```

#### Cach 3: Tabulation (One Pass — Optimal)

```python
# Time: O(n) — duyệt mảng 1 lần
# Space: O(1) — chỉ 2 biến

def maxProfit(prices: list[int]) -> int:
    min_price = float('inf')   # Giá thấp nhất gặp được
    max_profit = 0             # Lợi nhuận tối đa

    for price in prices:
        # Cập nhật giá thấp nhất
        min_price = min(min_price, price)
        # Nếu bán hôm nay, lời bao nhiêu? Có phải max không?
        max_profit = max(max_profit, price - min_price)

    return max_profit
```

#### Dry Run — Theo doi tung buoc (prices = [7, 1, 5, 3, 6, 4])

```
Ngày | price | min_price | price - min_price | max_profit
-----|-------|-----------|-------------------|----------
  0  |   7   |     7     |      7-7=0        |    0
  1  |   1   |     1     |      1-1=0        |    0
  2  |   5   |     1     |      5-1=4        |    4
  3  |   3   |     1     |      3-1=2        |    4
  4  |   6   |     1     |      6-1=5        |    5  ← MAX!
  5  |   4   |     1     |      4-1=3        |    5

→ Kết quả: 5 (mua ngày 1 giá 1, bán ngày 4 giá 6)
```

#### Complexity Analysis

| Approach             | Time   | Space |
| :------------------- | :----- | :---- |
| Brute Force          | O(n^2) | O(1)  |
| Memo (State Machine) | O(n)   | O(n)  |
| One Pass (Optimal)   | O(n)   | O(1)  |

#### Loi hay mac & Edge Cases

- **Giá giảm liên tục** `[7,6,4,3,1]`: max_profit = 0, đừng trả về số âm
- **Mảng 1 phần tử**: Không thể mua bán → return 0
- **Nhầm: bán trước mua**: Luôn đảm bảo sell > buy
- **Biến thể**: #122 (nhiều giao dịch), #123 (tối đa 2 giao dịch), #188 (tối đa k giao dịch), #309 (có cooldown)

------

### Bài 4: #62 Unique Paths (Medium)

> [LeetCode 62 — Unique Paths](https://leetcode.com/problems/unique-paths/)

#### De bai (Problem Statement)

Một robot ở góc trên trái của lưới `m x n`. Robot chỉ có thể đi **xuống** hoặc đi **phải** tại mỗi bước. Hỏi có bao nhiêu **đường đi khác nhau** để robot đến góc dưới phải?

**Ví dụ:**

- `m = 3, n = 7` → Output: `28`
- `m = 3, n = 2` → Output: `3`

#### Phan tich tu duy (Thought Process)

**Bước 1: Vẽ lưới và suy nghĩ**

```
Robot ở (0,0) muốn đến (m-1, n-1)
Mỗi bước: đi phải (+1 cột) hoặc đi xuống (+1 hàng)

Lưới 3x3:
S . .
. . .
. . E
```

**Bước 2: Để đến ô (i, j), robot phải đến từ đâu?**

Chỉ có 2 cách đến ô (i, j):

- Từ ô phía **trên** (i-1, j) — đi xuống
- Từ ô bên **trái** (i, j-1) — đi phải

→ `f(i, j) = f(i-1, j) + f(i, j-1)`

**Bước 3: Base cases**

- Hàng đầu tiên (i=0): Chỉ có 1 cách đến mỗi ô (đi phải suốt) → `f(0, j) = 1`
- Cột đầu tiên (j=0): Chỉ có 1 cách đến mỗi ô (đi xuống suốt) → `f(i, 0) = 1`

#### Dinh nghia DP (State Definition)

| Thành phần     | Giá trị                                             |
| :------------- | :-------------------------------------------------- |
| **State**      | `dp[i][j]` = số đường đi từ (0,0) đến (i,j)         |
| **Transition** | `dp[i][j] = dp[i-1][j] + dp[i][j-1]`                |
| **Base case**  | `dp[0][j] = 1` (hàng đầu), `dp[i][0] = 1` (cột đầu) |
| **Answer**     | `dp[m-1][n-1]`                                      |

#### Cach 1: Brute Force (De quy)

```python
# Time: O(2^(m+n)) — mỗi ô phân nhánh 2 hướng
# Space: O(m+n) — chiều sâu đệ quy

def uniquePaths(m: int, n: int) -> int:
    def helper(i, j):
        # Đến biên → chỉ có 1 cách
        if i == 0 or j == 0:
            return 1
        # Tổng số cách = từ trên xuống + từ trái sang
        return helper(i - 1, j) + helper(i, j - 1)

    return helper(m - 1, n - 1)
```

#### Cach 2: Memoization (Top-down DP)

```python
# Time: O(m * n) — mỗi ô tính 1 lần
# Space: O(m * n) — memo + call stack

def uniquePaths(m: int, n: int) -> int:
    memo = {}

    def dp(i, j):
        if i == 0 or j == 0:
            return 1
        if (i, j) in memo:
            return memo[(i, j)]

        memo[(i, j)] = dp(i - 1, j) + dp(i, j - 1)
        return memo[(i, j)]

    return dp(m - 1, n - 1)
```

#### Cach 3: Tabulation (Bottom-up DP)

```python
# Time: O(m * n)
# Space: O(m * n)

def uniquePaths(m: int, n: int) -> int:
    # Tạo bảng DP m x n
    dp = [[1] * n for _ in range(m)]
    # Hàng 0 và cột 0 đã là 1 (base case)

    # Điền bảng từ (1,1)
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]

    return dp[m - 1][n - 1]
```

#### Cach 4: Space Optimized

```python
# Time: O(m * n)
# Space: O(n) — chỉ cần 1 hàng!

def uniquePaths(m: int, n: int) -> int:
    # Chỉ lưu hàng hiện tại
    row = [1] * n  # Hàng đầu tiên toàn 1

    for i in range(1, m):
        for j in range(1, n):
            # row[j] cũ = dp[i-1][j] (từ trên)
            # row[j-1] mới = dp[i][j-1] (từ trái)
            row[j] = row[j] + row[j - 1]

    return row[n - 1]
```

#### Dry Run — Bang DP (m=3, n=4)

```
Bảng DP 3x4:

      j=0  j=1  j=2  j=3
i=0 |  1  |  1  |  1  |  1  |   ← base case (hàng đầu)
i=1 |  1  |  2  |  3  |  4  |
i=2 |  1  |  3  |  6  | 10  |
      ↑ base case (cột đầu)

Quá trình điền bảng:
dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2
dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3
dp[1][3] = dp[0][3] + dp[1][2] = 1 + 3 = 4
dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3
dp[2][2] = dp[1][2] + dp[2][1] = 3 + 3 = 6
dp[2][3] = dp[1][3] + dp[2][2] = 4 + 6 = 10

→ Kết quả: 10 đường đi
```

#### Complexity Analysis

| Approach        | Time       | Space  |
| :-------------- | :--------- | :----- |
| Brute Force     | O(2^(m+n)) | O(m+n) |
| Memoization     | O(m*n)     | O(m*n) |
| Tabulation      | O(m*n)     | O(m*n) |
| Space Optimized | O(m*n)     | O(n)   |

#### Loi hay mac & Edge Cases

- **m=1 hoặc n=1**: Chỉ có 1 đường (đi thẳng) → return 1
- **Nhầm hướng**: Robot chỉ đi phải/xuống, KHÔNG đi trái/lên
- **Toán học**: Đáp án = C(m+n-2, m-1) = (m+n-2)! / ((m-1)! * (n-1)!) — nhưng dùng DP dễ hiểu hơn
- **Biến thể**: #63 Unique Paths II (có chướng ngại vật)

------

### Bài 5: #322 Coin Change (Medium)

> [LeetCode 322 — Coin Change](https://leetcode.com/problems/coin-change/)

#### De bai (Problem Statement)

Cho mảng `coins` chứa mệnh giá các đồng xu và một số tiền `amount`. Trả về **số đồng xu ít nhất** cần dùng để tạo ra `amount`. Mỗi loại đồng xu có **vô hạn**. Nếu không thể tạo ra `amount`, trả về `-1`.

**Ví dụ:**

- `coins = [1,5,11], amount = 15` → Output: `3` (5+5+5)
- `coins = [2], amount = 3` → Output: `-1` (không thể tạo số lẻ từ đồng xu 2)

#### Phan tich tu duy (Thought Process)

**Bước 1: Tại sao Greedy THẤT BẠI?**

Greedy: luôn chọn đồng xu lớn nhất trước.

- `coins = [1, 5, 11], amount = 15`
- Greedy: 11 + 1 + 1 + 1 + 1 = 5 đồng xu
- Optimal: 5 + 5 + 5 = 3 đồng xu ← Greedy SAI!

**Bước 2: Xây dựng đệ quy**

Để tạo ra `amount`, mình thử **từng loại đồng xu**:

- Dùng đồng xu `c` → còn lại `amount - c` → giải bài toán con `f(amount - c)`
- `f(amount) = 1 + min(f(amount - c))` với mọi đồng xu `c` mà `c <= amount`

**Bước 3: Base cases**

- `f(0) = 0` — cần 0 đồng xu để tạo ra 0
- `f(negative) = ∞` — không thể tạo ra số âm

#### Dinh nghia DP (State Definition)

| Thành phần     | Giá trị                                                   |
| :------------- | :-------------------------------------------------------- |
| **State**      | `dp[i]` = số đồng xu ít nhất để tạo ra số tiền `i`        |
| **Transition** | `dp[i] = min(dp[i - c] + 1)` với mọi coin `c` mà `c <= i` |
| **Base case**  | `dp[0] = 0`                                               |
| **Answer**     | `dp[amount]` (nếu = ∞ thì return -1)                      |

#### Cach 1: Brute Force (De quy)

```python
# Time: O(S^n) — S = amount, n = số loại coin (cực chậm!)
# Space: O(S) — chiều sâu đệ quy

def coinChange(coins: list[int], amount: int) -> int:
    def helper(remaining):
        # Base cases
        if remaining == 0:
            return 0        # Tạo xong! Cần 0 đồng thêm
        if remaining < 0:
            return float('inf')  # Không hợp lệ

        # Thử từng loại đồng xu, lấy min
        min_coins = float('inf')
        for coin in coins:
            result = helper(remaining - coin)
            min_coins = min(min_coins, result + 1)

        return min_coins

    ans = helper(amount)
    return ans if ans != float('inf') else -1
```

#### Cach 2: Memoization (Top-down DP)

```python
# Time: O(amount * len(coins)) — mỗi amount tính 1 lần, mỗi lần thử len(coins) đồng
# Space: O(amount) — memo + call stack

def coinChange(coins: list[int], amount: int) -> int:
    memo = {}

    def dp(remaining):
        if remaining == 0:
            return 0
        if remaining < 0:
            return float('inf')
        if remaining in memo:
            return memo[remaining]

        # Thử tất cả đồng xu, lấy min
        min_coins = float('inf')
        for coin in coins:
            result = dp(remaining - coin)
            min_coins = min(min_coins, result + 1)

        memo[remaining] = min_coins
        return min_coins

    ans = dp(amount)
    return ans if ans != float('inf') else -1
```

#### Cach 3: Tabulation (Bottom-up DP)

```python
# Time: O(amount * len(coins))
# Space: O(amount)

def coinChange(coins: list[int], amount: int) -> int:
    # dp[i] = số đồng xu ít nhất để tạo ra i
    # Khởi tạo = amount + 1 (giá trị "vô cực" — vì đáp án tối đa = amount)
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0  # Base case: 0 đồng xu cho số tiền 0

    # Điền bảng từ 1 đến amount
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                # Dùng đồng xu này → cần thêm dp[i - coin] đồng nữa
                dp[i] = min(dp[i], dp[i - coin] + 1)

    # Nếu dp[amount] vẫn là "vô cực" → không thể tạo ra amount
    return dp[amount] if dp[amount] <= amount else -1
```

#### Dry Run — Bang DP (coins = [1, 5, 11], amount = 15)

```
Bảng DP:

i    | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
-----|---|---|---|---|---|---|---|---|---|---|----|----|----|----|----|----|
dp   | 0 | 1 | 2 | 3 | 4 | 1 | 2 | 3 | 4 | 5 | 2  | 1  | 2  | 3  | 4  | 3  |

Quá trình điền chi tiết (chỉ show các bước thú vị):

dp[1]: thử coin=1 → dp[0]+1=1    → dp[1]=1
dp[5]: thử coin=1 → dp[4]+1=5
       thử coin=5 → dp[0]+1=1    → dp[5]=1  ← dùng 1 đồng 5!
dp[10]: thử coin=1 → dp[9]+1=6
        thử coin=5 → dp[5]+1=2   → dp[10]=2  ← dùng 2 đồng 5!
dp[11]: thử coin=1  → dp[10]+1=3
        thử coin=5  → dp[6]+1=3
        thử coin=11 → dp[0]+1=1  → dp[11]=1  ← dùng 1 đồng 11!
dp[15]: thử coin=1  → dp[14]+1=5
        thử coin=5  → dp[10]+1=3 → dp[15]=3  ← dùng 3 đồng 5!
        thử coin=11 → dp[4]+1=5

→ Kết quả: 3 (ba đồng 5)
```

#### Complexity Analysis

| Approach    | Time     | Space |
| :---------- | :------- | :---- |
| Brute Force | O(S^n)   | O(S)  |
| Memoization | O(S * n) | O(S)  |
| Tabulation  | O(S * n) | O(S)  |

(S = amount, n = len(coins))

#### Loi hay mac & Edge Cases

- **amount = 0**: Return 0 (không cần đồng xu nào)
- **Không thể tạo ra amount**: Return -1. Ví dụ `coins=[2], amount=3`
- **Dùng `float('inf')` thay vì `-1`** trong quá trình DP để dễ so sánh min. Chuyển sang -1 ở cuối
- **Greedy không hoạt động**: Đây là ví dụ kinh điển cho thấy tại sao cần DP thay vì Greedy

------

### Bài 6: #518 Coin Change 2 (Medium)

> [LeetCode 518 — Coin Change 2](https://leetcode.com/problems/coin-change-ii/)

#### De bai (Problem Statement)

Cho mảng `coins` và số tiền `amount`. Trả về **số cách khác nhau** để tạo ra `amount`. Mỗi loại đồng xu có vô hạn. Nếu không thể → return 0.

**Ví dụ:**

- ```
  coins = [1,2,5], amount = 5
  ```

   

  → Output:

   

  ```
  4
  ```

  - 5 = 5
  - 5 = 2+2+1
  - 5 = 2+1+1+1
  - 5 = 1+1+1+1+1

**Lưu ý**: `1+2+2` và `2+1+2` là **CÙNG MỘT cách** (khác Climbing Stairs — ở đây thứ tự không quan trọng!)

#### Phan tich tu duy (Thought Process)

**Bước 1: Coin Change vs Coin Change 2**

|          | Coin Change (#322)     | Coin Change 2 (#518)           |
| :------- | :--------------------- | :----------------------------- |
| Hỏi gì?  | Số đồng xu **ít nhất** | Số **cách** khác nhau          |
| DP value | min                    | count (sum)                    |
| Thứ tự?  | Không quan trọng       | Không quan trọng (combination) |

**Bước 2: Tại sao KHÔNG thể duyệt amount trước?**

Nếu duyệt amount ở vòng ngoài, coins ở vòng trong:

```python
for i in range(1, amount+1):
    for coin in coins:
        dp[i] += dp[i - coin]
```

→ Sẽ đếm **permutation** (1+2 và 2+1 là 2 cách khác nhau) — SAI!

**Bước 3: Duyệt coin trước!**

Duyệt coin ở vòng ngoài → đảm bảo mỗi coin chỉ được "thêm vào" theo thứ tự → tránh trùng lặp:

```python
for coin in coins:
    for i in range(coin, amount+1):
        dp[i] += dp[i - coin]
```

→ Đếm **combination** — ĐÚNG!

#### Dinh nghia DP (State Definition)

| Thành phần     | Giá trị                                                    |
| :------------- | :--------------------------------------------------------- |
| **State**      | `dp[i]` = số cách tạo ra số tiền `i` bằng các coins đã xét |
| **Transition** | `dp[i] += dp[i - coin]` (với mỗi coin)                     |
| **Base case**  | `dp[0] = 1` (1 cách tạo ra 0: không dùng đồng nào)         |
| **Answer**     | `dp[amount]`                                               |

#### Cach 1: Memoization (Top-down DP)

```python
# Time: O(amount * len(coins))
# Space: O(amount * len(coins))

def change(amount: int, coins: list[int]) -> int:
    memo = {}

    def dp(idx, remaining):
        """
        idx: đang xét coin thứ idx (chỉ dùng coins[idx:] để tránh trùng)
        remaining: số tiền còn lại cần tạo
        """
        if remaining == 0:
            return 1  # Tìm được 1 cách!
        if remaining < 0 or idx == len(coins):
            return 0  # Không hợp lệ

        if (idx, remaining) in memo:
            return memo[(idx, remaining)]

        # Lựa chọn:
        # 1. Dùng coins[idx] (KHÔNG tăng idx vì unbounded)
        # 2. Bỏ qua coins[idx] (tăng idx)
        memo[(idx, remaining)] = (
            dp(idx, remaining - coins[idx]) +  # Dùng coin này
            dp(idx + 1, remaining)              # Bỏ qua coin này
        )
        return memo[(idx, remaining)]

    return dp(0, amount)
```

#### Cach 2: Tabulation (Bottom-up DP) — 2D

```python
# Time: O(amount * len(coins))
# Space: O(amount * len(coins))

def change(amount: int, coins: list[int]) -> int:
    n = len(coins)
    # dp[i][j] = số cách tạo ra j dùng coins[0..i-1]
    dp = [[0] * (amount + 1) for _ in range(n + 1)]

    # Base case: dp[i][0] = 1 (1 cách tạo ra 0 = không dùng đồng nào)
    for i in range(n + 1):
        dp[i][0] = 1

    for i in range(1, n + 1):         # Xét từng coin
        coin = coins[i - 1]
        for j in range(amount + 1):   # Xét từng amount
            dp[i][j] = dp[i - 1][j]   # Không dùng coin i
            if j >= coin:
                dp[i][j] += dp[i][j - coin]  # Dùng coin i (unbounded → dp[i])

    return dp[n][amount]
```

#### Cach 3: Space Optimized (1D)

```python
# Time: O(amount * len(coins))
# Space: O(amount) — chỉ cần 1 mảng!

def change(amount: int, coins: list[int]) -> int:
    dp = [0] * (amount + 1)
    dp[0] = 1  # Base case: 1 cách tạo ra 0

    # QUAN TRỌNG: duyệt COIN ở vòng NGOÀI!
    for coin in coins:
        # Duyệt XUÔI (unbounded knapsack)
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]

    return dp[amount]
```

#### Dry Run — Bang DP (coins = [1, 2, 5], amount = 5)

```
Space Optimized — theo dõi dp[] sau mỗi coin:

Ban đầu:  dp = [1, 0, 0, 0, 0, 0]

Sau coin = 1:
  dp[1] += dp[0] = 0+1 = 1    dp = [1, 1, 0, 0, 0, 0]
  dp[2] += dp[1] = 0+1 = 1    dp = [1, 1, 1, 0, 0, 0]
  dp[3] += dp[2] = 0+1 = 1    dp = [1, 1, 1, 1, 0, 0]
  dp[4] += dp[3] = 0+1 = 1    dp = [1, 1, 1, 1, 1, 0]
  dp[5] += dp[4] = 0+1 = 1    dp = [1, 1, 1, 1, 1, 1]
  (Chỉ dùng xu 1 → mỗi amount có đúng 1 cách: toàn xu 1)

Sau coin = 2:
  dp[2] += dp[0] = 1+1 = 2    dp = [1, 1, 2, 1, 1, 1]
  dp[3] += dp[1] = 1+1 = 2    dp = [1, 1, 2, 2, 1, 1]
  dp[4] += dp[2] = 1+2 = 3    dp = [1, 1, 2, 2, 3, 1]
  dp[5] += dp[3] = 1+2 = 3    dp = [1, 1, 2, 2, 3, 3]
  (Thêm xu 2: amount=2 có 2 cách: {1+1, 2})

Sau coin = 5:
  dp[5] += dp[0] = 3+1 = 4    dp = [1, 1, 2, 2, 3, 4]
  (Thêm xu 5: amount=5 thêm 1 cách: {5})

→ Kết quả: dp[5] = 4

4 cách:
1. 1+1+1+1+1
2. 1+1+1+2
3. 1+2+2
4. 5
```

#### Complexity Analysis

| Approach        | Time     | Space    |
| :-------------- | :------- | :------- |
| Memoization     | O(S * n) | O(S * n) |
| Tabulation 2D   | O(S * n) | O(S * n) |
| Space Optimized | O(S * n) | O(S)     |

(S = amount, n = len(coins))

#### Loi hay mac & Edge Cases

- **Thứ tự vòng lặp**: COIN ngoài, AMOUNT trong. Đảo ngược = đếm permutation!
- **Duyệt xuôi** (unbounded): Vì mỗi coin dùng vô hạn lần. Nếu 0/1 knapsack thì duyệt ngược
- **amount = 0**: Return 1 (1 cách = không dùng gì)
- **Phân biệt**: Coin Change 1 hỏi MIN, dùng `min()`. Coin Change 2 hỏi COUNT, dùng `+=`

------

### Bài 7: #300 Longest Increasing Subsequence (Medium)

> [LeetCode 300 — Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)

#### De bai (Problem Statement)

Cho mảng số nguyên `nums`, tìm độ dài của **dãy con tăng dài nhất** (Longest Increasing Subsequence — LIS). Dãy con không cần liên tiếp.

**Ví dụ:**

- `nums = [10,9,2,5,3,7,101,18]` → Output: `4` (LIS: [2,3,7,101] hoặc [2,3,7,18])
- `nums = [0,1,0,3,2,3]` → Output: `4` (LIS: [0,1,2,3])

#### Phan tich tu duy (Thought Process)

**Bước 1: Subsequence vs Subarray**

- **Subarray**: phần tử liên tiếp [2,5,3] ✓
- **Subsequence**: phần tử theo thứ tự nhưng KHÔNG cần liên tiếp [2,5,7] ✓

**Bước 2: Xây dựng đệ quy**

Xét phần tử `nums[i]`. LIS kết thúc tại `i` = ?

Duyệt tất cả `j < i`: nếu `nums[j] < nums[i]`, thì mình có thể **nối** `nums[i]` vào LIS kết thúc tại `j`.

→ `dp[i] = max(dp[j] + 1)` với mọi `j < i` mà `nums[j] < nums[i]`

**Bước 3: Tại sao dp[i] = LIS kết thúc tại i (không phải LIS trong nums[0..i])?**

Vì mình cần biết phần tử cuối cùng là gì để quyết định có nối thêm phần tử mới không. Nếu `dp[i]` = LIS trong `nums[0..i]`, mình không biết phần tử cuối → không biết có nối được không.

#### Dinh nghia DP (State Definition)

| Thành phần     | Giá trị                                                      |
| :------------- | :----------------------------------------------------------- |
| **State**      | `dp[i]` = độ dài LIS **kết thúc tại** `nums[i]`              |
| **Transition** | `dp[i] = max(dp[j] + 1)` với mọi `j < i` mà `nums[j] < nums[i]` |
| **Base case**  | `dp[i] = 1` (mỗi phần tử tự nó là LIS dài 1)                 |
| **Answer**     | `max(dp[i])` với mọi i                                       |

#### Cach 1: Brute Force (De quy)

```python
# Time: O(2^n) — thử tất cả subsequence
# Space: O(n)

def lengthOfLIS(nums: list[int]) -> int:
    def helper(idx, prev):
        if idx == len(nums):
            return 0

        # Lựa chọn 1: Bỏ qua nums[idx]
        skip = helper(idx + 1, prev)

        # Lựa chọn 2: Chọn nums[idx] (nếu > prev)
        take = 0
        if nums[idx] > prev:
            take = 1 + helper(idx + 1, nums[idx])

        return max(skip, take)

    return helper(0, float('-inf'))
```

#### Cach 2: Tabulation (Bottom-up DP) — O(n^2)

```python
# Time: O(n^2) — 2 vòng lặp lồng nhau
# Space: O(n) — mảng dp

def lengthOfLIS(nums: list[int]) -> int:
    n = len(nums)
    dp = [1] * n  # Mỗi phần tử tự nó là LIS dài 1

    for i in range(1, n):
        for j in range(i):
            # Nếu nums[j] < nums[i], có thể nối nums[i] vào LIS kết thúc tại j
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)  # LIS dài nhất có thể kết thúc ở bất kỳ vị trí nào
```

#### Cach 3: Binary Search — O(n log n)

```python
# Time: O(n log n) — duyệt n phần tử, mỗi lần binary search O(log n)
# Space: O(n) — mảng tails

import bisect

def lengthOfLIS(nums: list[int]) -> int:
    # tails[i] = phần tử nhỏ nhất mà LIS dài i+1 có thể kết thúc
    tails = []

    for num in nums:
        # Tìm vị trí chèn num vào tails (duy trì sorted)
        pos = bisect.bisect_left(tails, num)

        if pos == len(tails):
            # num lớn hơn tất cả → kéo dài LIS
            tails.append(num)
        else:
            # Thay thế tails[pos] bằng num (giá trị nhỏ hơn → "tiềm năng" hơn)
            tails[pos] = num

    # Độ dài tails = độ dài LIS
    return len(tails)
```

#### Dry Run — Bang DP (nums = [10, 9, 2, 5, 3, 7, 101, 18])

```
Cách O(n^2) — bảng dp:

i     | 0  | 1 | 2 | 3 | 4 | 5 | 6   | 7  |
nums  | 10 | 9 | 2 | 5 | 3 | 7 | 101 | 18 |
------|----|----|---|---|---|---|-----|----|
dp    | 1  | 1 | 1 | 2 | 2 | 3 | 4   | 4  |

Chi tiết:
dp[0] = 1 (10 tự nó)
dp[1] = 1 (9 < 10 → không nối được vào ai → tự nó)
dp[2] = 1 (2 < tất cả trước → tự nó)
dp[3] = max(dp[2]+1) = 2 vì nums[2]=2 < nums[3]=5 → dp[3] = dp[2]+1 = 2
        (LIS: [2, 5])
dp[4] = max(dp[2]+1) = 2 vì nums[2]=2 < nums[4]=3 → dp[4] = dp[2]+1 = 2
        (LIS: [2, 3])
dp[5] = max(dp[2]+1, dp[3]+1, dp[4]+1) = max(2, 3, 3) = 3
        vì 2<7, 5<7, 3<7 → dp[5] = dp[3]+1 = 3 hoặc dp[4]+1 = 3
        (LIS: [2, 5, 7] hoặc [2, 3, 7])
dp[6] = max(dp[0]+1, dp[1]+1, dp[2]+1, dp[3]+1, dp[4]+1, dp[5]+1) = 4
        vì 10<101, 9<101, 2<101, 5<101, 3<101, 7<101
        → dp[6] = dp[5]+1 = 4  (LIS: [2, 3, 7, 101])
dp[7] = max(dp[2]+1, dp[3]+1, dp[4]+1, dp[5]+1) = 4
        vì 2<18, 5<18, 3<18, 7<18 → dp[7] = dp[5]+1 = 4
        (LIS: [2, 3, 7, 18])

→ max(dp) = 4

---

Cách O(n log n) — theo dõi mảng tails:

num=10:  tails=[] → pos=0, append  → tails=[10]
num=9:   tails=[10] → pos=0, replace  → tails=[9]
num=2:   tails=[9] → pos=0, replace  → tails=[2]
num=5:   tails=[2] → pos=1, append  → tails=[2,5]
num=3:   tails=[2,5] → pos=1, replace  → tails=[2,3]
num=7:   tails=[2,3] → pos=2, append  → tails=[2,3,7]
num=101: tails=[2,3,7] → pos=3, append  → tails=[2,3,7,101]
num=18:  tails=[2,3,7,101] → pos=3, replace  → tails=[2,3,7,18]

→ len(tails) = 4
```

#### Complexity Analysis

| Approach      | Time       | Space |
| :------------ | :--------- | :---- |
| Brute Force   | O(2^n)     | O(n)  |
| DP (O(n^2))   | O(n^2)     | O(n)  |
| Binary Search | O(n log n) | O(n)  |

#### Loi hay mac & Edge Cases

- **Mảng đã tăng dần**: LIS = n (cả mảng)
- **Mảng đã giảm dần**: LIS = 1 (chỉ 1 phần tử)
- **Tất cả giống nhau** `[7,7,7,7]`: LIS = 1 (tăng **nghiêm ngặt**, không phải `>=`)
- **Binary search**: `tails` cuối cùng KHÔNG phải LIS thực tế! Chỉ có **độ dài** là đúng
- **Cẩn thận `bisect_left` vs `bisect_right`**: Dùng `bisect_left` vì strictly increasing

------

### Bài 8: #1143 Longest Common Subsequence (Medium)

> [LeetCode 1143 — Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)

#### De bai (Problem Statement)

Cho 2 chuỗi `text1` và `text2`, trả về độ dài **dãy con chung dài nhất** (LCS). Nếu không có → return 0.

**Ví dụ:**

- `text1 = "abcde", text2 = "ace"` → Output: `3` (LCS: "ace")
- `text1 = "abc", text2 = "def"` → Output: `0` (không có ký tự chung)

#### Phan tich tu duy (Thought Process)

**Bước 1: Hiểu bài toán**

Tìm chuỗi dài nhất là subsequence của CẢ HAI text1 và text2.

- "ace" là subsequence của "abcde" ✓ (bỏ b, d)
- "ace" là subsequence của "ace" ✓

**Bước 2: Xây dựng đệ quy — So sánh từng ký tự**

So sánh `text1[i]` và `text2[j]`:

- **Nếu bằng nhau** (`text1[i] == text2[j]`): Ký tự này thuộc LCS! LCS = 1 + LCS(còn lại) → `f(i, j) = 1 + f(i+1, j+1)`
- **Nếu khác nhau**: Thử 2 cách — bỏ ký tự i của text1 HOẶC bỏ ký tự j của text2 → `f(i, j) = max(f(i+1, j), f(i, j+1))`

**Bước 3: Overlapping subproblems?**

```
f(0,0) gọi f(1,0) và f(0,1)
f(1,0) gọi f(2,0) và f(1,1)
f(0,1) gọi f(1,1) và f(0,2)  ← f(1,1) tính 2 lần!
```

→ Có overlapping → Dùng DP!

#### Dinh nghia DP (State Definition)

| Thành phần     | Giá trị                                                      |
| :------------- | :----------------------------------------------------------- |
| **State**      | `dp[i][j]` = LCS của `text1[0..i-1]` và `text2[0..j-1]`      |
| **Transition** | Nếu `text1[i-1] == text2[j-1]`: `dp[i][j] = dp[i-1][j-1] + 1` |
|                | Nếu khác: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`           |
| **Base case**  | `dp[0][j] = 0`, `dp[i][0] = 0` (chuỗi rỗng → LCS = 0)        |
| **Answer**     | `dp[m][n]` (m = len(text1), n = len(text2))                  |

#### Cach 1: Memoization (Top-down DP)

```python
# Time: O(m * n) — m, n là độ dài 2 chuỗi
# Space: O(m * n) — memo + call stack

def longestCommonSubsequence(text1: str, text2: str) -> int:
    memo = {}

    def dp(i, j):
        # Base case: hết chuỗi
        if i == len(text1) or j == len(text2):
            return 0

        if (i, j) in memo:
            return memo[(i, j)]

        if text1[i] == text2[j]:
            # Ký tự giống → nằm trong LCS, tiến cả 2 con trỏ
            memo[(i, j)] = 1 + dp(i + 1, j + 1)
        else:
            # Ký tự khác → thử bỏ 1 ký tự ở mỗi chuỗi, lấy max
            memo[(i, j)] = max(dp(i + 1, j), dp(i, j + 1))

        return memo[(i, j)]

    return dp(0, 0)
```

#### Cach 2: Tabulation (Bottom-up DP)

```python
# Time: O(m * n)
# Space: O(m * n)

def longestCommonSubsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)

    # dp[i][j] = LCS của text1[0..i-1] và text2[0..j-1]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Điền bảng (hàng 0 và cột 0 đã là 0 — base case)
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1  # Match!
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])  # Bỏ 1 ký tự

    return dp[m][n]
```

#### Cach 3: Space Optimized

```python
# Time: O(m * n)
# Space: O(n) — chỉ cần 2 hàng

def longestCommonSubsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    prev = [0] * (n + 1)  # Hàng trước
    curr = [0] * (n + 1)  # Hàng hiện tại

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                curr[j] = prev[j - 1] + 1  # Chéo trên trái + 1
            else:
                curr[j] = max(prev[j], curr[j - 1])  # Trên hoặc trái
        prev = curr[:]  # Copy hàng hiện tại thành hàng trước

    return prev[n]
```

#### Dry Run — Bang DP (text1 = "abcde", text2 = "ace")

```
Bảng DP (m+1) x (n+1):

         ""   a   c   e
    "" [  0    0   0   0 ]
     a [  0    1   1   1 ]
     b [  0    1   1   1 ]
     c [  0    1   2   2 ]
     d [  0    1   2   2 ]
     e [  0    1   2   3 ]

Quá trình điền chi tiết:

dp[1][1]: text1[0]='a' == text2[0]='a' → dp[0][0]+1 = 1  ← MATCH 'a'
dp[1][2]: 'a' != 'c' → max(dp[0][2], dp[1][1]) = max(0, 1) = 1
dp[1][3]: 'a' != 'e' → max(dp[0][3], dp[1][2]) = max(0, 1) = 1
dp[2][1]: 'b' != 'a' → max(dp[1][1], dp[2][0]) = max(1, 0) = 1
dp[2][2]: 'b' != 'c' → max(dp[1][2], dp[2][1]) = max(1, 1) = 1
dp[2][3]: 'b' != 'e' → max(dp[1][3], dp[2][2]) = max(1, 1) = 1
dp[3][1]: 'c' != 'a' → max(dp[2][1], dp[3][0]) = max(1, 0) = 1
dp[3][2]: text1[2]='c' == text2[1]='c' → dp[2][1]+1 = 2  ← MATCH 'c'
dp[3][3]: 'c' != 'e' → max(dp[2][3], dp[3][2]) = max(1, 2) = 2
dp[4][1]: 'd' != 'a' → max(dp[3][1], dp[4][0]) = max(1, 0) = 1
dp[4][2]: 'd' != 'c' → max(dp[3][2], dp[4][1]) = max(2, 1) = 2
dp[4][3]: 'd' != 'e' → max(dp[3][3], dp[4][2]) = max(2, 2) = 2
dp[5][1]: 'e' != 'a' → max(dp[4][1], dp[5][0]) = max(1, 0) = 1
dp[5][2]: 'e' != 'c' → max(dp[4][2], dp[5][1]) = max(2, 1) = 2
dp[5][3]: text1[4]='e' == text2[2]='e' → dp[4][2]+1 = 3  ← MATCH 'e'

→ dp[5][3] = 3  →  LCS = "ace"
```

#### Complexity Analysis

| Approach        | Time       | Space  |
| :-------------- | :--------- | :----- |
| Brute Force     | O(2^(m+n)) | O(m+n) |
| Memoization     | O(m*n)     | O(m*n) |
| Tabulation      | O(m*n)     | O(m*n) |
| Space Optimized | O(m*n)     | O(n)   |

#### Loi hay mac & Edge Cases

- **Index off-by-one**: `dp[i][j]` tương ứng `text1[i-1]` và `text2[j-1]` (vì hàng/cột 0 là base case)
- **Chuỗi rỗng**: LCS = 0
- **Hai chuỗi giống nhau**: LCS = len(text1)
- **Muốn tìm LCS thực tế (không chỉ độ dài)**: Backtrack từ `dp[m][n]` theo hướng match

------

### Bài 9: #72 Edit Distance (Medium)

> [LeetCode 72 — Edit Distance](https://leetcode.com/problems/edit-distance/)

#### De bai (Problem Statement)

Cho 2 chuỗi `word1` và `word2`, trả về **số phép biến đổi ít nhất** để biến `word1` thành `word2`. Có 3 phép biến đổi:

- **Insert**: Chèn một ký tự
- **Delete**: Xóa một ký tự
- **Replace**: Thay thế một ký tự

**Ví dụ:**

- ```
  word1 = "horse", word2 = "ros"
  ```

   

  → Output:

   

  ```
  3
  ```

  - horse → rorse (replace h→r)
  - rorse → rose (delete r)
  - rose → ros (delete e)

- `word1 = "intention", word2 = "execution"` → Output: `5`

#### Phan tich tu duy (Thought Process)

**Bước 1: Đây là "khoảng cách" giữa 2 chuỗi**

Edit Distance (Levenshtein Distance) đo "bao nhiêu bước để biến chuỗi này thành chuỗi kia". Ứng dụng: spell checker, DNA comparison, diff tools.

**Bước 2: Xây dựng đệ quy — So sánh từng ký tự**

So sánh `word1[i]` và `word2[j]`:

- **Nếu bằng nhau**: Không cần làm gì → `f(i, j) = f(i+1, j+1)`

- Nếu khác nhau

  : 3 lựa chọn, lấy min:

  - **Insert** ký tự `word2[j]` vào word1: `f(i, j+1) + 1`
  - **Delete** ký tự `word1[i]`: `f(i+1, j) + 1`
  - **Replace** `word1[i]` thành `word2[j]`: `f(i+1, j+1) + 1`

**Bước 3: Base cases**

- `word1` hết (`i == m`): Cần insert tất cả ký tự còn lại của word2 → `n - j`
- `word2` hết (`j == n`): Cần delete tất cả ký tự còn lại của word1 → `m - i`

#### Dinh nghia DP (State Definition)

| Thành phần     | Giá trị                                                      |
| :------------- | :----------------------------------------------------------- |
| **State**      | `dp[i][j]` = edit distance giữa `word1[0..i-1]` và `word2[0..j-1]` |
| **Transition** | Nếu `word1[i-1] == word2[j-1]`: `dp[i][j] = dp[i-1][j-1]`    |
|                | Nếu khác: `dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])` |
| **Base case**  | `dp[i][0] = i` (xóa i ký tự), `dp[0][j] = j` (chèn j ký tự)  |
| **Answer**     | `dp[m][n]`                                                   |

**Giải thích transition khi khác nhau:**

- `dp[i-1][j] + 1`: **Delete** word1[i-1] → so sánh word1[0..i-2] với word2[0..j-1]
- `dp[i][j-1] + 1`: **Insert** word2[j-1] → so sánh word1[0..i-1] với word2[0..j-2]
- `dp[i-1][j-1] + 1`: **Replace** word1[i-1] bằng word2[j-1]

#### Cach 1: Memoization (Top-down DP)

```python
# Time: O(m * n)
# Space: O(m * n)

def minDistance(word1: str, word2: str) -> int:
    memo = {}

    def dp(i, j):
        # Base cases
        if i == 0: return j  # Chèn j ký tự
        if j == 0: return i  # Xóa i ký tự

        if (i, j) in memo:
            return memo[(i, j)]

        if word1[i - 1] == word2[j - 1]:
            # Ký tự giống → không cần thao tác
            memo[(i, j)] = dp(i - 1, j - 1)
        else:
            # Ký tự khác → thử 3 thao tác, lấy min
            memo[(i, j)] = 1 + min(
                dp(i - 1, j),      # Delete
                dp(i, j - 1),      # Insert
                dp(i - 1, j - 1)   # Replace
            )

        return memo[(i, j)]

    return dp(len(word1), len(word2))
```

#### Cach 2: Tabulation (Bottom-up DP)

```python
# Time: O(m * n)
# Space: O(m * n)

def minDistance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)

    # Bảng DP (m+1) x (n+1)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases
    for i in range(m + 1):
        dp[i][0] = i  # Xóa i ký tự từ word1
    for j in range(n + 1):
        dp[0][j] = j  # Chèn j ký tự vào word1

    # Điền bảng
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]  # Giống → 0 cost
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # Delete
                    dp[i][j - 1],      # Insert
                    dp[i - 1][j - 1]   # Replace
                )

    return dp[m][n]
```

#### Cach 3: Space Optimized

```python
# Time: O(m * n)
# Space: O(n) — chỉ cần 2 hàng

def minDistance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    prev = list(range(n + 1))  # dp[0][0..n] = [0, 1, 2, ..., n]

    for i in range(1, m + 1):
        curr = [0] * (n + 1)
        curr[0] = i  # dp[i][0] = i (base case)

        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                curr[j] = prev[j - 1]  # Chéo trên trái (không cần thao tác)
            else:
                curr[j] = 1 + min(
                    prev[j],      # Delete (trên)
                    curr[j - 1],  # Insert (trái)
                    prev[j - 1]   # Replace (chéo)
                )

        prev = curr

    return prev[n]
```

#### Dry Run — Bang DP (word1 = "horse", word2 = "ros")

```
Bảng DP 6x4:

         ""   r   o   s
    "" [  0    1   2   3 ]
     h [  1    1   2   3 ]
     o [  2    2   1   2 ]
     r [  3    2   2   2 ]
     s [  4    3   3   2 ]
     e [  5    4   4   3 ]

Chi tiết:

Base cases:
  dp[0][0..3] = [0, 1, 2, 3]  ("" → "ros" cần 3 inserts)
  dp[0..5][0] = [0, 1, 2, 3, 4, 5]  ("horse" → "" cần 5 deletes)

Điền bảng:
dp[1][1]: 'h' != 'r' → 1 + min(dp[0][1]=1, dp[1][0]=1, dp[0][0]=0) = 1+0 = 1
          (Replace h→r)
dp[1][2]: 'h' != 'o' → 1 + min(dp[0][2]=2, dp[1][1]=1, dp[0][1]=1) = 1+1 = 2
dp[1][3]: 'h' != 's' → 1 + min(dp[0][3]=3, dp[1][2]=2, dp[0][2]=2) = 1+2 = 3
dp[2][1]: 'o' != 'r' → 1 + min(dp[1][1]=1, dp[2][0]=2, dp[1][0]=1) = 1+1 = 2
dp[2][2]: 'o' == 'o' → dp[1][1] = 1  ← MATCH!
dp[2][3]: 'o' != 's' → 1 + min(dp[1][3]=3, dp[2][2]=1, dp[1][2]=2) = 1+1 = 2
dp[3][1]: 'r' == 'r' → dp[2][0] = 2  ← MATCH!
dp[3][2]: 'r' != 'o' → 1 + min(dp[2][2]=1, dp[3][1]=2, dp[2][1]=2) = 1+1 = 2
dp[3][3]: 'r' != 's' → 1 + min(dp[2][3]=2, dp[3][2]=2, dp[2][2]=1) = 1+1 = 2
dp[4][1]: 's' != 'r' → 1 + min(dp[3][1]=2, dp[4][0]=4, dp[3][0]=3) = 1+2 = 3
dp[4][2]: 's' != 'o' → 1 + min(dp[3][2]=2, dp[4][1]=3, dp[3][1]=2) = 1+2 = 3
dp[4][3]: 's' == 's' → dp[3][2] = 2  ← MATCH!
dp[5][1]: 'e' != 'r' → 1 + min(dp[4][1]=3, dp[5][0]=5, dp[4][0]=4) = 1+3 = 4
dp[5][2]: 'e' != 'o' → 1 + min(dp[4][2]=3, dp[5][1]=4, dp[4][1]=3) = 1+3 = 4
dp[5][3]: 'e' != 's' → 1 + min(dp[4][3]=2, dp[5][2]=4, dp[4][2]=3) = 1+2 = 3

→ dp[5][3] = 3

Các bước: horse → rorse (replace) → rose (delete) → ros (delete)
```

#### Complexity Analysis

| Approach        | Time       | Space  |
| :-------------- | :--------- | :----- |
| Brute Force     | O(3^(m+n)) | O(m+n) |
| Memoization     | O(m*n)     | O(m*n) |
| Tabulation      | O(m*n)     | O(m*n) |
| Space Optimized | O(m*n)     | O(n)   |

#### Loi hay mac & Edge Cases

- **Chuỗi rỗng**: `minDistance("", "abc") = 3`, `minDistance("abc", "") = 3`
- **Chuỗi giống nhau**: `minDistance("abc", "abc") = 0`
- **Off-by-one**: `dp[i][j]` dùng `word1[i-1]` và `word2[j-1]`
- **3 phép toán trong min**: Delete = trên, Insert = trái, Replace = chéo. Nhớ hướng trong bảng DP!
- **Ứng dụng**: `git diff`, spell checker, DNA sequence alignment

------

### Bài 10: #416 Partition Equal Subset Sum (Medium)

> [LeetCode 416 — Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)

#### De bai (Problem Statement)

Cho mảng số nguyên dương `nums`, kiểm tra xem có thể chia mảng thành **2 tập con** sao cho **tổng bằng nhau** không.

**Ví dụ:**

- `nums = [1,5,11,5]` → Output: `True` (chia thành [1,5,5] và [11], tổng đều = 11)
- `nums = [1,2,3,5]` → Output: `False`

#### Phan tich tu duy (Thought Process)

**Bước 1: Chuyển đổi bài toán**

Tổng mảng = S. Chia thành 2 tập bằng nhau → mỗi tập có tổng S/2.

→ Bài toán trở thành: **Có tồn tại tập con có tổng = S/2 không?**

Đây chính là bài **Subset Sum** — một biến thể kinh điển của **0/1 Knapsack**!

**Bước 2: Loại bỏ nhanh**

- Nếu S lẻ → `False` ngay (không thể chia 2 phần bằng nhau)
- Target = S / 2

**Bước 3: Xây dựng đệ quy — 0/1 Knapsack**

Với mỗi phần tử `nums[i]`, mình có 2 lựa chọn:

- **Chọn** nó vào tập con → target giảm `nums[i]`
- **Bỏ qua** nó → target giữ nguyên

```
f(i, target) = f(i+1, target - nums[i]) OR f(i+1, target)
```

#### Dinh nghia DP (State Definition)

| Thành phần     | Giá trị                                                      |
| :------------- | :----------------------------------------------------------- |
| **State**      | `dp[i][j]` = True nếu dùng `nums[0..i-1]` có thể tạo ra tổng `j` |
| **Transition** | `dp[i][j] = dp[i-1][j] OR dp[i-1][j - nums[i-1]]` (nếu `j >= nums[i-1]`) |
| **Base case**  | `dp[i][0] = True` (tổng 0 luôn đạt được = không chọn gì)     |
| **Answer**     | `dp[n][target]`                                              |

#### Cach 1: Memoization (Top-down DP)

```python
# Time: O(n * target)
# Space: O(n * target)

def canPartition(nums: list[int]) -> bool:
    total = sum(nums)
    if total % 2 != 0:
        return False  # Tổng lẻ → không chia được

    target = total // 2
    memo = {}

    def dp(idx, remaining):
        # Tìm được tập con có tổng = target!
        if remaining == 0:
            return True
        # Hết phần tử hoặc remaining < 0
        if idx == len(nums) or remaining < 0:
            return False

        if (idx, remaining) in memo:
            return memo[(idx, remaining)]

        # Chọn nums[idx] HOẶC bỏ qua
        memo[(idx, remaining)] = (
            dp(idx + 1, remaining - nums[idx]) or  # Chọn
            dp(idx + 1, remaining)                   # Bỏ qua
        )
        return memo[(idx, remaining)]

    return dp(0, target)
```

#### Cach 2: Tabulation (Bottom-up DP) — 2D

```python
# Time: O(n * target)
# Space: O(n * target)

def canPartition(nums: list[int]) -> bool:
    total = sum(nums)
    if total % 2 != 0:
        return False

    target = total // 2
    n = len(nums)

    # dp[i][j] = có thể tạo tổng j từ nums[0..i-1]?
    dp = [[False] * (target + 1) for _ in range(n + 1)]

    # Base case: tổng 0 luôn đạt được
    for i in range(n + 1):
        dp[i][0] = True

    for i in range(1, n + 1):
        for j in range(1, target + 1):
            # Bỏ qua nums[i-1]
            dp[i][j] = dp[i - 1][j]
            # Chọn nums[i-1] (nếu đủ budget)
            if j >= nums[i - 1]:
                dp[i][j] = dp[i][j] or dp[i - 1][j - nums[i - 1]]

    return dp[n][target]
```

#### Cach 3: Space Optimized (1D)

```python
# Time: O(n * target)
# Space: O(target) — chỉ cần 1 mảng!

def canPartition(nums: list[int]) -> bool:
    total = sum(nums)
    if total % 2 != 0:
        return False

    target = total // 2

    # dp[j] = có thể tạo tổng j không?
    dp = [False] * (target + 1)
    dp[0] = True  # Tổng 0 luôn đạt được

    for num in nums:
        # QUAN TRỌNG: Duyệt NGƯỢC! (0/1 Knapsack — mỗi phần tử chỉ dùng 1 lần)
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]

        # Early termination: nếu đã tìm được target
        if dp[target]:
            return True

    return dp[target]
```

#### Dry Run — Bang DP (nums = [1, 5, 11, 5], target = 11)

```
total = 22, target = 11

Space Optimized — theo dõi dp[] sau mỗi num:

Ban đầu:     dp = [T, F, F, F, F, F, F, F, F, F, F, F]
                    0  1  2  3  4  5  6  7  8  9  10 11

Sau num = 1: (duyệt ngược j = 11 → 1)
  dp[1] = dp[1] or dp[0] = F or T = T
  dp =        [T, T, F, F, F, F, F, F, F, F, F, F]
  (Có thể tạo: 0, 1)

Sau num = 5: (duyệt ngược j = 11 → 5)
  dp[6] = dp[6] or dp[1] = F or T = T
  dp[5] = dp[5] or dp[0] = F or T = T
  dp =        [T, T, F, F, F, T, T, F, F, F, F, F]
  (Có thể tạo: 0, 1, 5, 6)

Sau num = 11: (duyệt ngược j = 11 → 11)
  dp[11] = dp[11] or dp[0] = F or T = T  ← TÌM THẤY!
  → Early termination: return True!

→ Kết quả: True

Tập con: {11} và {1, 5, 5}, cả hai tổng = 11
```

#### Complexity Analysis

| Approach        | Time          | Space         |
| :-------------- | :------------ | :------------ |
| Brute Force     | O(2^n)        | O(n)          |
| Memoization     | O(n * target) | O(n * target) |
| Tabulation 2D   | O(n * target) | O(n * target) |
| Space Optimized | O(n * target) | O(target)     |

#### Loi hay mac & Edge Cases

- **Tổng lẻ → False ngay**: Đây là optimization quan trọng, skip hẳn DP
- **Duyệt NGƯỢC** trong 1D: Vì 0/1 Knapsack, mỗi phần tử dùng 1 lần. Nếu duyệt xuôi → phần tử bị dùng nhiều lần!
- **Early termination**: Kiểm tra `dp[target]` sau mỗi phần tử → thoát sớm
- **Mảng 1 phần tử**: `[1]` → False (không chia được)
- **Phần tử > target**: Skip luôn (nếu `nums[i] > target`, bỏ qua)
- **Biến thể**: #494 Target Sum, #1049 Last Stone Weight II
