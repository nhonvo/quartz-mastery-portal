---
title: "155.Min-Stack"
tags: [dsa, problem-solving, leetcode, learning-note]
---

# 📌 LeetCode: 155.Min-Stack

## 📋 Problem Statement

---


title: "note"
tags: [dsa, problem-solving, leetcode, learning-note]
---

# Key Notes & Pattern Insights — LC 155 Min Stack

## Linked Theory Resource
- Obsidian Vault Theory Note: [[01_DSA/01_theory_and_patterns/07_Stack_Queue/07_min_stack.md]]

---

## Core Pattern: Two Stacks (Auxiliary Min Stack)

1. **Why standard Stack isn't enough for $O(1)$ `GetMin()`**:
   - Standard stack searching requires scanning all elements ($O(N)$).
   - Auxiliary `_minStack` maintains a running minimum synchronized with every `Push` and `Pop`.

2. **Mathematical / Structural Invariant**:
   $$\text{minStack}[k] = \min(\text{stack}[0 \dots k])$$

3. **Key Pitfall**:
   - Duplicate minimum elements MUST be pushed onto `_minStack` every time `val <= currentMin`.

---

## 💡 Multi-Solution Analysis

---


title: "complexity"
tags: [dsa, problem-solving, leetcode, learning-note]
---

# Complexity Analysis — LC 155 Min Stack

## Time Complexity
- `Push(val)`: $O(1)$ constant time amortized stack operations.
- `Pop()`: $O(1)$ constant time stack pop.
- `Top()`: $O(1)$ constant time peek.
- `GetMin()`: $O(1)$ constant time peek.

## Space Complexity
- Auxiliary Space: $O(N)$ extra space for the `_minStack` parallel structure storing up to $N$ elements.

---

## 🛠️ C# Tips & Common Pitfalls

---


title: "tips"
tags: [dsa, problem-solving, leetcode, learning-note]
---

# Edge Case & Pitfalls Checklist — Min Stack

- [x] **Empty Stack Access**: Ensure operations assume stack is non-empty as per LC constraints or handle empty states gracefully.
- [x] **Duplicate Minimum Values**: When pushing duplicate min values (e.g. push `-2`, push `-2`), ensure `_minStack` retains both so popping one duplicate doesn't corrupt the minimum!
- [x] **Integer Overflow**: When storing difference `val - min` in alternative approaches, watch out for integer underflow/overflow.

---

## 🏋️ Space to Practice

---


title: "practice"
tags: [dsa, problem-solving, leetcode, learning-note]
---

# Practice Scratchpad & Strategy — LC 155 Min Stack

## Strategy Breakdown
- **Goal**: Maintain an auxiliary stack `_minStack` parallel to `_stack` that keeps track of the current minimum element up to the current depth.
- **Push(val)**:
  - Push `val` onto `_stack`.
  - Push `Math.Min(val, _minStack.Peek())` onto `_minStack`.
- **Pop()**:
  - Pop from both `_stack` and `_minStack`.
- **GetMin()**:
  - Peek at top of `_minStack`.

## Alternative Strategy (Space Optimization)
- Store tuples `(val, minSoFar)` in a single stack, or store differences `val - min`.
