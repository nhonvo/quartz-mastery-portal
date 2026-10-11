---


title: "Advanced Game Theory & Combinatorics: Sprague-Grundy Theorem, Nim Games & Combinatorial Identities"
type: "concept_guide"
category: "dsa"
subcategory: "11_advanced_game_theory_and_combinatorics"
created_at: 2026-08-22T00:00:00+07:00
updated_at: 2026-08-26T23:45:00+07:00
tags: [dsa, game-theory, sprague-grundy, nim-game, combinatorial-game-theory, mex-function, catalan-numbers, algorithms, computer-science, learning-note]
---

# ♟️ Advanced Game Theory & Combinatorics: Sprague-Grundy Theorem & Combinatorial Identities

Lý thuyết Trò chơi Tổ hợp (Combinatorial Game Theory - CGT) và Tổ hợp Nâng cao là lĩnh vực toán học thuật toán nghiên cứu các trò chơi hữu hạn, tuần tự, không có yếu tố ngẫu nhiên (Zero Chance) và có thông tin hoàn hảo (Perfect Information) giữa hai người chơi (Player 1 và Player 2).

---

## 1. Trò chơi Nim & Định lý Bouton (1901)

### 1.1 Luật chơi Nim Cổ điển
- Cho $K$ đống sỏi, đống thứ $i$ có $A_i$ viên sỏi.
- Đến lượt của mình, một người chơi chọn một đống bất kỳ và bốc đi ít nhất 1 viên (hoặc có thể bốc hết toàn bộ sỏi trong đống đó).
- Người chơi bốc viên sỏi cuối cùng là người chiến thắng (**Normal Play Convention**).

### 1.2 Nim-Sum & Định lý Bouton
- **Định nghĩa Nim-Sum**: Nim-Sum của trạng thái trò chơi là phép XOR bitwise của số lượng sỏi trong tất cả các đống:
  $$S = A_1 \oplus A_2 \oplus A_3 \oplus \dots \oplus A_K$$
- **Định lý Bouton**:
  - Trạng thái hiện tại là **Trạng thái Thua (P-Position / Losing State)** nếu và chỉ nếu $S = 0$. Bất kỳ nước đi nào từ $S = 0$ cũng sẽ dẫn đến một trạng thái có $S' \ne 0$.
  - Trạng thái hiện tại là **Trạng thái Thắng (N-Position / Winning State)** nếu và chỉ nếu $S 
e 0. Luôn tồn tại ít nhất một nước đi hợp lệ chuyển trạng thái về S' = 0$.

```mermaid
graph LR
    Win["N-Position (Winning State: Nim-Sum != 0)"] -->|Optimal Move| Lose["P-Position (Losing State: Nim-Sum == 0)"]
    Lose -->|Any Legal Move| Win
```

---

## 2. Định lý Sprague-Grundy & Hàm MEX

Định lý Sprague-Grundy là một trong những thành tựu vĩ đại nhất của Lý thuyết Trò chơi Tổ hợp, cho phép quy đổi **mọi trò chơi vô hướng độc lập (Impartial Game)** về một trò chơi Nim tương đương!

### 2.1 Hàm MEX (Minimum Excluded Value)
Cho tập hợp số nguyên không âm $S \subset \mathbb{N}_0$, hàm $\text{mex}(S)$ trả về **số nguyên không âm nhỏ nhất KHÔNG thuộc $S$**:
$$\text{mex}(S) = \min \{ x \in \mathbb{N}_0 \mid x 
otin S \}$$
- Ví dụ: $\text{mex}(\{0, 1, 2, 4, 7\}) = 3$, $\text{mex}(\{1, 2, 3\}) = 0$.

### 2.2 Giá trị Grundy (Grundy Value / Nim-Value)
- Với mọi trạng thái $u$, giá trị Grundy $G(u)$ được định nghĩa đệ quy:
  G(u) = \text{mex}ig( \{ G(v) \mid v \text{ là trạng thái có thể đến được từ } u \} ig)
- Với trạng thái kết thúc (Terminal State không có nước đi hợp lệ): $G(\text{terminal}) = 0$.
- **Định lý Tổng hợp Trò chơi Độc lập**:
  Nếu trò chơi là sự kết hợp của $M$ trò chơi con độc lập $T_1, T_2, \dots, T_M$, thì giá trị Grundy của trò chơi tổng thể chính là Nim-Sum của các trò chơi con:
  $$G_{\text{total}} = G(T_1) \oplus G(T_2) \oplus \dots \oplus G(T_M)$$
- Trò chơi tổng thể ở vị trí Thắng $\iff G_{\text{total}} \ne 0$.

---

## 3. Các Đồng nhất thức Tổ hợp Nâng cao

```mermaid
mindmap
  root((Combinatorial Identities))
    Catalan Numbers
      C_n = (1 / (n+1)) * Binomial(2n, n)
      Valid parenthesis sequences of length 2n
      Number of distinct Binary Search Trees with n keys
      Non-intersecting polygon triangulations
    Stirling Numbers
      S(n, k) of Second Kind: Partitioning n elements into k non-empty sets
      Recurrence: S(n, k) = k * S(n-1, k) + S(n-1, k-1)
    Inclusion-Exclusion Principle
      |Union A_i| = Sum |A_i| - Sum |A_i ∩ A_j| + ...
      Derangements D_n = n! * Sum ((-1)^k / k!)
```

### 3.1 Dãy Số Catalan
Số Catalan thứ $N$ được định nghĩa:
$$C_n = rac{1}{n + 1} inom{2n}{n} = rac{(2n)!}{(n + 1)! \, n!}$$
- $C_0 = 1, C_1 = 1, C_2 = 2, C_3 = 5, C_4 = 14, C_5 = 42, \dots$
- **Ứng dụng thực tế**:
  1. Số lượng chuỗi ngoặc đúng (Valid Parentheses) gồm $n$ cặp ngoặc.
  2. Số lượng Cây Tìm kiếm Nhị phân (BST) khác nhau tạo từ $n$ khóa phân biệt.
  3. Số cách chia đa giác lồi $n+2$ đỉnh thành các tam giác bằng các đường chéo không cắt nhau.

---

## 4. Triển khai Source Code C++20, Python & C# Hoàn chỉnh

### 4.1 C++20 (Sprague-Grundy Solver for Subtraction Game)

```cpp
#include <iostream>
#include <vector>
#include <unordered_set>
#include <numeric>

class SpragueGrundySuite {
public:
    // Compute Grundy values for Subtraction Game with move set S
    static std::vector<int> ComputeGrundy(int max_n, const std::vector<int>& moves) {
        std::vector<int> grundy(max_n + 1, 0);
        
        for (int i = 1; i <= max_n; ++i) {
            std::unordered_set<int> reachable_grundy;
            for (int m : moves) {
                if (i >= m) {
                    reachable_grundy.insert(grundy[i - m]);
                }
            }
            // Compute MEX
            int mex = 0;
            while (reachable_grundy.count(mex)) {
                mex++;
            }
            grundy[i] = mex;
        }
        return grundy;
    }

    // Determine winner of multi-pile game
    static bool CanFirstPlayerWin(const std::vector<int>& piles, const std::vector<int>& moves) {
        int max_pile = *std::max_element(piles.begin(), piles.end());
        auto grundy = ComputeGrundy(max_pile, moves);

        int total_xor = 0;
        for (int p : piles) {
            total_xor ^= grundy[p];
        }
        return total_xor != 0; // True = First player wins, False = Second player wins
    }
};

int main() {
    std::vector<int> piles = {5, 7, 9};
    std::vector<int> moves = {1, 2, 3, 4}; // Players can take 1, 2, 3, or 4 stones

    bool win = SpragueGrundySuite::CanFirstPlayerWin(piles, moves);
    std::cout << "First Player Can Win: " << (win ? "YES" : "NO") << "
";
    return 0;
}
```

### 4.2 Python 3.12 (Catalan Numbers & Derangements)

```python
import math

class CombinatoricsSuite:
    @staticmethod
    def catalan_number(n: int) -> int:
        return math.comb(2 * n, n) // (n + 1)

    @staticmethod
    def count_derangements(n: int) -> int:
        # D_n = (n - 1) * (D_{n-1} + D_{n-2})
        if n == 0: return 1
        if n == 1: return 0
        d_prev2, d_prev1 = 1, 0
        for i in range(2, n + 1):
            d_curr = (i - 1) * (d_prev1 + d_prev2)
            d_prev2, d_prev1 = d_prev1, d_curr
        return d_prev1

if __name__ == "__main__":
    print("Catalan(5):", CombinatoricsSuite.catalan_number(5)) # Expected: 42
    print("Derangements(4):", CombinatoricsSuite.count_derangements(4)) # Expected: 9
```

---

## 5. Kinh nghiệm Xử lý Biên & Bẫy Thường Gặp

1. **Misère Play Convention (Quy ước Bốc Cuối là Thua)**:
   - Trong biến thể Misère Nim (ai bốc viên sỏi cuối cùng là THUA):
   - Chiến lược chơi giống hệt Normal Nim $S \ne 0$ cho đến khi tất cả các đống sỏi còn lại đều có kích thước bằng 1!
   - Khi đó, người chơi đi nước quyết định bốc đống cuối sao cho để lại một số LẺ các đống có 1 viên sỏi.
2. **Quên Khởi tạo Giá trị Cơ sở Trạng thái Kết thúc**:
   - $G(\text{terminal}) = 0$ vì tập hợp các trạng thái đến được là rỗng $\implies \text{mex}(\emptyset) = 0$.

---

## 🔗 Graph-Linked Knowledge Base
- 💬 Q&A Suite: Game Theory Q&A
