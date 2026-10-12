# 🎓 Pedagogical & Interactive Learning Workbenches Backlog Specification

> **Parent Roadmap**: [`00_master_roadmap_executive_summary.md`](file:///d:/learning/quartz/report/backlog_roadmap/00_master_roadmap_executive_summary.md)  
> **Module**: Interactive Pedagogy, Self-Assessment & Multi-Track Practice  
> **Target Tracks**: C# DSA (NeetCode 150), System Design Case Studies, Tri-Lingual Fluency (EN, JP, CN)  

---

## 1. Problem Statement & Educational Friction

Currently, the portal hosts world-class structured documentation across DSA, System Architecture, and Language Fluency. However, reading static notes yields significantly lower retention compared to active recall and deliberate practice:
1. **No Active Recall Verification**: Learners read solutions without testing whether they truly mastered the algorithmic invariants or grammar rules.
2. **Language Audio Void**: Pronunciation in Japanese (Pitch accent, Kanji readings) and Mandarin (4 tones + neutral tone sandhi) requires auditory feedback that pure text cannot provide.
3. **Complexity Intuition Gaps**: DSA solutions explain $O(N)$ vs $O(N \log N)$ theoretically, but learners lack visual runtime vs memory benchmarks to solidify the intuition.
4. **No Spaced Repetition (SRS)**: Notes are often read once and forgotten without systematic Leitner box reinforcement.

---

## 2. Comprehensive Pedagogical Enhancement Backlog

### 🟢 PED-01: Multi-Tier Interactive Self-Assessment Exam Runner (P0)
* **Goal**: Embed lightweight, zero-dependency interactive exam widgets into lesson notes, supporting 5 core assessment modalities:
  1. **Multiple Choice Questions (MCQ)**: Instant answer feedback with detailed explanations of why distractors are incorrect.
  2. **Fill-in-the-Blank Code & Grammar Completion**: Tests syntax keywords, method signatures, or grammatical particles.
  3. **Bug Hunter / Error Refactoring**: Presenting flawed code or mispronounced dialogue with inline correction validation.
  4. **STAR Behavioral & Speaking Prompt Timer**: Interactive 2-minute countdown timer with bullet-point self-checklist for English interview prep.
  5. **C1/C2 & System Design Trade-Off Matrix Comparison**: Multi-variable decision matrices testing latency vs throughput trade-offs.

* **Markdown Syntax Spec (Custom Rehype AST Component)**:
  ```markdown
  :::exam[Title: Hash Table Collision Resolutions]
  ? Which collision resolution strategy avoids clustering by probing quadratic intervals?
  - Linear Probing
  + Quadratic Probing (Correct! Reduces primary clustering by adding square increments)
  - Separate Chaining
  :::
  ```

---

### 🟢 PED-02: Tri-Lingual Audio Pronunciation & Interactive Ruby Annotations (P1)
* **Goal**: Transform Language tracks (`03_languages`) into an interactive auditory drill environment.
* **Key Enhancements**:
  - **Browser Web Speech API Synthesis**: Zero-asset audio synthesis button next to Japanese and Mandarin sentences using native browser `speechSynthesis` (with `ja-JP` and `zh-CN` voice fallback).
  - **Interactive Furigana / Pinyin Ruby Toggle**: Clicking a master toggle in the reading toolbar reveals or hides Furigana / Pinyin annotations above Kanji and Chinese characters to facilitate testing one's reading recall before peeking.
  - **Tone Sandhi Visualizer**: Color-coding Mandarin pinyin tones dynamically (e.g. Tone 1: Blue, Tone 2: Green, Tone 3: Orange, Tone 4: Red) for instantaneous visual tone reinforcement.

---

### 🟢 PED-03: Algorithm Complexity & Benchmark Comparison Cards (P1)
* **Goal**: Embed standardized complexity and visual benchmark badges on all 150 NeetCode solution notes.
* **Component Specification**:
  - **Visual Big O Badge Matrix**:
    - Time Complexity: `O(N)` (Emerald Green) vs Brute Force `O(N²)` (Rose Red)
    - Auxiliary Space Complexity: `O(N)` vs In-Place `O(1)`
  - **Leitner Box SRS Mastery Pill**: A 5-stage checkbox (`Stage 1: Learning` -> `Stage 5: Mastered`) that syncs with `localStorage` so students can track which problems they need to revisit this week.

---

### 🟢 PED-04: Daily Study Plan HUD & Multi-Track Completion Tracker (P2)
* **Goal**: Connect daily study notes (`07_daily`) with interactive completion checklists that update progress rings in real time.
* **Features**:
  - Daily Goal Ring in the top header or floating widget displaying daily completed modules (e.g. `2/2 DSA Solved`, `1/1 System Design Blueprint Reviewed`, `20/20 Vocab Drills Completed`).
  - Persistent streak counter saved in browser local storage.
