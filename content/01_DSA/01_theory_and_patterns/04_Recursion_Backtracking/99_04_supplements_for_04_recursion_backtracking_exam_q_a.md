---
title: "99.04. 📚 Supplements for 04_recursion_backtracking (Exam, Q&A)"
type: "supplement"
category: "dsa"
tags: [dsa, 04_recursion_backtracking, exam, qa, learning-note]
aliases:
  - 99_04_recursion_backtracking_supplements
---

# 📌 99.04. 📚 Supplements for 04_recursion_backtracking (Exam, Q&A)

## 📌 Connected Resource Graph
- 🟢 **Primary Theory Note**: [[01_DSA/01_theory_and_patterns/04_Recursion_Backtracking/00_overview_04_Recursion_Backtracking]]

---


# 📝 04 Recursion & Backtracking — Comprehensive Module Exam & Self-Assessment

> **Assessment Duration**: 60 Minutes  
> **Total Points**: 100 Points (10 Multiple Choice Questions @ 5 pts each = 50 pts; 2 Coding & Proof Challenges @ 25 pts each = 50 pts)  
> **Passing Score**: 80% (80 / 100)

---

## 📋 Section 1: Multiple Choice Questions (50 Points)

### Question 1
What is the time complexity of generating all subsets of an array containing N distinct elements?
- A) O(N^2)
- B) O(N * 2^N)
- C) O(N!)
- D) O(2^N)
> **Correct Answer**: **B**  
> **Explanation**: There are 2^N subsets, and copying each subset of average size N/2 into the result list takes O(N), yielding O(N * 2^N).

---

### Question 2
Why is Tail Call Optimization (TCO) beneficial in recursive algorithms?
- A) It converts recursion to multi-threading
- B) It reuses the current stack frame, eliminating stack overflow and reducing space to O(1)
- C) It sorts the input array automatically
- D) It avoids base case evaluations
> **Correct Answer**: **B**  
> **Explanation**: TCO replaces a new stack push with a jump instruction, keeping stack memory constant.

---

### Question 3
In Subsets II, which condition correctly skips duplicate branch siblings after sorting?
- A) if (i == start)
- B) if (i > start && nums[i] == nums[i - 1]) continue;
- C) if (nums[i] < 0)
- D) if (i == nums.size() - 1)
> **Correct Answer**: **B**  
> **Explanation**: i > start checks sibling branches at the same depth, preventing identical subtrees.

---

### Question 4
What is the maximum depth of the recursion stack when solving a standard 9x9 Sudoku grid?
- A) 9
- B) 81
- C) 729
- D) 9^9
> **Correct Answer**: **B**  
> **Explanation**: There are at most 81 cells in total; each recursive call fills exactly one empty cell.

---

### Question 5
In N-Queens, how many bits are needed to track diagonal conflicts on an N x N board?
- A) N bits
- B) 2N - 1 bits
- C) N^2 bits
- D) N / 2 bits
> **Correct Answer**: **B**  
> **Explanation**: An N x N board has 2N - 1 main diagonals (r - c + N - 1) and 2N - 1 anti-diagonals (r + c).

---

### Question 6
What is the space complexity of finding all permutations of N items using recursion?
- A) O(N!)
- B) O(N)
- C) O(1)
- D) O(N^2)
> **Correct Answer**: **B**  
> **Explanation**: The auxiliary call stack depth is bounded by N.

---

### Question 7
Which heuristic selects the variable with the fewest remaining legal values in Constraint Satisfaction Backtracking?
- A) Least Constraining Value (LCV)
- B) Minimum Remaining Values (MRV)
- C) Degree Heuristic
- D) A* Search
> **Correct Answer**: **B**  
> **Explanation**: MRV picks the most constrained variable first to induce early failure.

---

### Question 8
In backtracking on a 2D grid (e.g. Word Search), what is the maximum branching factor at each step?
- A) 2
- B) 3 (ignoring the cell came from)
- C) 4
- D) 8
> **Correct Answer**: **B**  
> **Explanation**: From any internal cell, there are 4 directions, but 1 is the parent cell, leaving 3 valid branches.

---

### Question 9
What happens if you forget the backtrack state restoration step (`path.pop_back()`) in combination search?
- A) The program crashes immediately
- B) State modifications pollute subsequent sibling search branches, producing incorrect results
- C) Memory leaks on the heap
- D) Recursion depth doubles
> **Correct Answer**: **B**  
> **Explanation**: State pollution corrupts all subsequent sibling explorations.

---

### Question 10
What is the number of solutions to the 8-Queens problem?
- A) 12
- B) 46
- C) 92
- D) 256
> **Correct Answer**: **C**  
> **Explanation**: The standard 8-Queens problem has exactly 92 distinct solutions (12 fundamental symmetry classes).

---

## 💻 Section 2: Coding & Algorithmic Proof Challenges (50 Points)

### Challenge 1: Generate Parentheses (LeetCode 22) (25 Points)

**Task**: Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses in optimal time.

**Evaluation Rubric**:
- Correct backtracking state transitions: 10 pts
- Open/close count invariant validation: 10 pts
- Clean string state management: 5 pts

#### Model Solution (C++20)
```cpp
#include <vector>
#include <string>

class Solution {
public:
    std::vector<std::string> generateParenthesis(int n) {
        std::vector<std::string> result;
        std::string current;
        auto dfs = [&](auto& self, int open, int close) -> void {
            if (current.size() == 2 * n) {
                result.push_back(current);
                return;
            }
            if (open < n) {
                current.push_back('(');
                self(self, open + 1, close);
                current.pop_back();
            }
            if (close < open) {
                current.push_back(')');
                self(self, open, close + 1);
                current.pop_back();
            }
        };
        dfs(dfs, 0, 0);
        return result;
    }
};
```

#### Model Solution (Python 3.12)
```python
class Solution:
    def generateParenthesis(self, n: int) -> list[str]:
        result = []
        def dfs(open_cnt: int, close_cnt: int, path: list[str]):
            if len(path) == 2 * n:
                result.append("".join(path))
                return
            if open_cnt < n:
                path.append("(")
                dfs(open_cnt + 1, close_cnt, path)
                path.pop()
            if close_cnt < open_cnt:
                path.append(")")
                dfs(open_cnt, close_cnt + 1, path)
                path.pop()
        dfs(0, 0, [])
        return result
```

---

### Challenge 2: Combination Sum (LeetCode 39) (25 Points)

**Task**: Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations where the chosen numbers sum to target. The same number may be chosen unlimited times.

**Evaluation Rubric**:
- Sorting & Bound Pruning: 10 pts
- Unbounded choice state index management: 10 pts
- In-place vector backtracks: 5 pts

#### Model Solution (C++20)
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> combinationSum(std::vector<int>& candidates, int target) {
        std::sort(candidates.begin(), candidates.end());
        std::vector<std::vector<int>> result;
        std::vector<int> current;

        auto dfs = [&](auto& self, int start, int rem) -> void {
            if (rem == 0) {
                result.push_back(current);
                return;
            }
            for (size_t i = start; i < candidates.size(); ++i) {
                if (candidates[i] > rem) break; // Pruning
                current.push_back(candidates[i]);
                self(self, i, rem - candidates[i]); // Re-use index i
                current.pop_back();
            }
        };
        dfs(dfs, 0, target);
        return result;
    }
};
```

#### Model Solution (Python 3.12)
```python
class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        candidates.sort()
        result = []
        def dfs(start: int, rem: int, path: list[int]):
            if rem == 0:
                result.append(list(path))
                return
            for i in range(start, len(candidates)):
                if candidates[i] > rem:
                    break
                path.append(candidates[i])
                dfs(i, rem - candidates[i], path)
                path.pop()
        dfs(0, target, [])
        return result
```

---

---


# 💬 04 Recursion & Backtracking — Master Technical Interview Q&A & System Design Trade-offs

> 📖 **Concept Guide**: [[01_DSA/01_theory_and_patterns/04_Recursion_Backtracking/00_overview_04_recursion_backtracking|04 Recursion & Backtracking Overview]]  
> 🔗 **Resource Sheet**: [[01_DSA/01_theory_and_patterns/04_Recursion_Backtracking/04_recursion_backtracking_resource|04 Recursion & Backtracking Resource Sheet]]  
> 🧩 **Problem Set**: [[01_DSA/01_theory_and_patterns/04_Recursion_Backtracking/04_recursion_backtracking_problems|04 Recursion & Backtracking Problem Set]]  
> 📝 **Module Exam**: [[01_DSA/01_theory_and_patterns/04_Recursion_Backtracking/04_recursion_backtracking_exam|04 Recursion & Backtracking Exam]]

This comprehensive interview guide provides high-level and low-level architectural insights, mathematical proofs, runtime trade-offs, and polyglot code examples expected in senior engineering technical interviews.

---

## ❓ Q1: What is the fundamental difference between Recursion and Backtracking?

### **Deep Technical Answer**:
Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem. Backtracking is an algorithmic paradigm that systematically searches the solution space by building candidates incrementally and abandoning (backtracking) a candidate as soon as it determines the candidate cannot lead to a valid solution. While all backtracking algorithms use recursion (or an explicit stack), not all recursion involves backtracking (e.g. MergeSort is divide-and-conquer recursion without state reversion).

```mermaid
graph TD
    Root[Start State] --> C1[Choice 1: Valid] --> Sub1[Explore Deeper]
    Root --> C2[Choice 2: Invalid (Pruned!)]
    Sub1 --> Back[Undo Choice 1 / Backtrack]
```

### 🛠️ Reference Implementation Snippet:
```cpp
void backtrack(State& state) {
    if (is_solution(state)) { record(state); return; }
    for (auto choice : get_choices(state)) {
        if (!is_valid(choice, state)) continue; // Pruning
        state.apply(choice);   // Move forward
        backtrack(state);      // Explore
        state.revert(choice);  // Backtrack
    }
}
```

---

## ❓ Q2: How does the call stack operate during recursion and what causes StackOverflowException?

### **Deep Technical Answer**:
Each recursive invocation pushes a stack frame onto the thread's execution stack containing the return instruction pointer, function parameters, and local variables. Thread stack size is fixed at thread creation (typically 1MB on Windows, 8MB on Linux). When recursion depth $D$ exceeds stack memory limit ($D \ge 10^5$), a stack overflow hardware trap occurs. Remedies include converting recursion to iteration using an explicit heap-allocated stack, increasing thread stack size, or applying tail-call optimization.

### 🛠️ Reference Implementation Snippet:
```cpp
// Converting recursion to explicit heap stack
std::stack<State> st;
st.push(initial_state);
while (!st.empty()) {
    State curr = st.top(); st.pop();
    // Process state...
}
```

---

## ❓ Q3: What is Tail Recursion and how does the compiler optimize it?

### **Deep Technical Answer**:
A function is tail-recursive if the recursive call is the absolute final action in the function body. Modern optimizing compilers (GCC, Clang, MSVC) can perform Tail Call Elimination (TCE), overwriting the current stack frame with new arguments and jumping to the start of the function via an assembly JMP instruction, transforming an $O(N)$ memory recursion into an $O(1)$ memory loop.

### 🛠️ Reference Implementation Snippet:
```cpp
// Tail-recursive factorial with accumulator
long long fact_tail(int n, long long acc = 1) {
    if (n <= 1) return acc;
    return fact_tail(n - 1, n * acc); // Tail call
}
```

---

## ❓ Q4: How do you eliminate duplicate combinations in backtracking when input array contains duplicate elements?

### **Deep Technical Answer**:
1. Sort the input array so identical elements are contiguous: $A = [1, 2, 2, 3]$.
2. In the choice loop, apply horizontal sibling pruning:
   `if (i > start && nums[i] == nums[i - 1]) continue;`
3. This allows duplicates along the vertical recursion depth (e.g. subset [2, 2]) while skipping duplicate horizontal sibling branches.

### 🛠️ Reference Implementation Snippet:
```cpp
void subsetsWithDup(int start, std::vector<int>& nums, std::vector<int>& path) {
    // record path
    for (int i = start; i < nums.size(); ++i) {
        if (i > start && nums[i] == nums[i - 1]) continue;
        path.push_back(nums[i]);
        subsetsWithDup(i + 1, nums, path);
        path.pop_back();
    }
}
```

---

## ❓ Q5: How does bitmasking optimize constraint checking in N-Queens to O(1) time?

### **Deep Technical Answer**:
Instead of checking 2D board arrays in $O(N)$ time per placement, maintain three 32-bit integers: `cols`, `diag1` (main diagonal $r - c + N$), and `diag2` (anti-diagonal $r + c$). A column $c$ is valid if and only if `((cols | diag1 | diag2) & (1 << c)) == 0`. Finding available columns uses bitwise NOT and AND with lowest set bit extraction `x & (-x)` in 1 CPU cycle.

### 🛠️ Reference Implementation Snippet:
```cpp
int available = ((1 << n) - 1) & ~(cols | diag1 | diag2);
while (available > 0) {
    int lowbit = available & (-available);
    int col = __builtin_ctz(lowbit);
    solve(row + 1, cols | lowbit, (diag1 | lowbit) << 1, (diag2 | lowbit) >> 1);
    available &= (available - 1);
}
```

---

## ❓ Q6: What is the time complexity difference between generating Subsets and generating Permutations?

### **Deep Technical Answer**:
- Subsets (Power Set): Each of the $N$ elements has 2 choices (include or exclude). Total subsets $= 2^N$. Time complexity is $\mathcal{O}(N \cdot 2^N)$ (including copying each subset of average size $N/2$).
- Permutations: There are $N!$ distinct orderings. Time complexity is $\mathcal{O}(N \cdot N!)$.
- For $N = 10$: $2^{10} = 1,024$ subsets vs $10! = 3,628,800$ permutations.

### 🛠️ Reference Implementation Snippet:
```cpp
// Permutations loop explores all unused indices
for (int i = 0; i < n; ++i) {
    if (used[i]) continue;
    used[i] = true;
    path.push_back(nums[i]);
    backtrack(path, used);
    path.pop_back();
    used[i] = false;
}
```

---

## ❓ Q7: How does the Minimum Remaining Values (MRV) heuristic accelerate backtracking in constraint satisfaction problems like Sudoku?

### **Deep Technical Answer**:
In constraint satisfaction problems (CSP), instead of picking the next empty cell in simple row-major order, MRV selects the unassigned cell that has the fewest valid candidate choices. By picking the most constrained variable first, if the current branch is doomed to fail, it fails immediately at shallow recursion depth, pruning massive invalid subtrees before expanding them.

### 🛠️ Reference Implementation Snippet:
```cpp
// Find cell with minimum valid candidates
int min_choices = 10, best_r = -1, best_c = -1;
for (int r = 0; r < 9; ++r) {
    for (int c = 0; c < 9; ++c) {
        if (board[r][c] == '.') {
            int count = CountValid(r, c);
            if (count < min_choices) {
                min_choices = count; best_r = r; best_c = c;
            }
        }
    }
}
```

---

## ❓ Q8: How do you implement Word Search on a 2D grid with in-place backtracking to achieve O(1) space?

### **Deep Technical Answer**:
During DFS traversal, instead of allocating a separate boolean `visited[M][N]` matrix, temporarily modify the board character in-place to a sentinel value (e.g. `char temp = board[r][c]; board[r][c] = '#';`). After the 4-directional recursive calls return, restore `board[r][c] = temp;`. This achieves $\mathcal{O}(L)$ call stack space without extra heap allocation.

### 🛠️ Reference Implementation Snippet:
```cpp
bool dfs(int r, int c, int idx) {
    if (idx == word.size()) return true;
    if (r < 0 || r >= R || c < 0 || c >= C || board[r][c] != word[idx]) return false;
    char temp = board[r][c];
    board[r][c] = '#'; // Mark
    bool found = dfs(r+1,c,idx+1) || dfs(r-1,c,idx+1) || dfs(r,c+1,idx+1) || dfs(r,c-1,idx+1);
    board[r][c] = temp; // Unmark
    return found;
}
```

---

---
