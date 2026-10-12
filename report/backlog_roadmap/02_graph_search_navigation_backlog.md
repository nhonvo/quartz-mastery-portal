# 🔍 Knowledge Graph, Search Engine & Wayfinding Backlog Specification

> **Parent Roadmap**: [`00_master_roadmap_executive_summary.md`](file:///d:/learning/quartz/report/backlog_roadmap/00_master_roadmap_executive_summary.md)  
> **Module**: Graph Visualization, Search Architecture & Content Navigation  
> **Target Files**: `@quartz-community/search`, `@quartz-community/graph`, `quartz/components/ObsidianGraphDock.tsx`  

---

## 1. Problem Statement & Audit Findings

With over 1,270 markdown files and dense inter-note links spanning DSA algorithms, System Architecture, and multi-language learning, learners face significant cognitive overhead locating precise information:
1. **Unfaceted Search**: FlexSearch returns a flat list of results where a search query like `hash map` mixes C# implementations, theory notes, system design caching techniques, and language vocabulary notes without filter tags.
2. **Graph Visualization Clutter**: In large graph views, unclustered nodes form dense "hairballs" with insufficient visual differentiation between study domains.
3. **Passive Backlinks**: Backlinks at the bottom of pages display only document titles without context surrounding the link, forcing students to open every backlinked note to see why it was referenced.
4. **Wayfinding Gaps**: Navigating sequential learning modules (e.g. Day 1 -> Day 2 -> Day 3) requires constantly re-opening the left Explorer drawer.

---

## 2. Comprehensive Enhancement Backlog

### 🟢 NAV-01: Track-Faceted Search Engine with Instant Filter Chips (P0)
* **Goal**: Provide lightning-fast filtered search results categorized by high-level curriculum domains.
* **Feature Design**:
  - Add quick filter chips directly inside the search modal above the input:
    - `[All]`
    - `[🧠 DSA]` (Filters path: `01_dsa`)
    - `[🏗️ Architecture]` (Filters path: `02_technical_skills` / `system_design`)
    - `[🗣️ Languages]` (Filters path: `03_languages`)
    - `[📜 Daily Agenda]` (Filters path: `07_daily`)
  - Filter chips can be toggled via keyboard shortcuts (`Tab` -> `Enter` or `Alt+1`, `Alt+2`, `Alt+3`).
  - Search results display track badges and highlighted context snippets (showing matches in headings and bold body text).

```
+---------------------------------------------------------------+
|  🔍 [ Search for algorithms, architectures, notes...      ]   |
+---------------------------------------------------------------+
|  Filters: (• All)  [🧠 DSA]  [🏗️ System Design]  [🗣️ Languages] |
+---------------------------------------------------------------+
|  Results (12 matches):                                        |
|  • [DSA] 01. Two Sum (Array & Hashing)                        |
|    "...utilize a single-pass *hash map* to store complements.."|
|                                                               |
|  • [Arch] Consistent Hashing & Distributed Key-Value Store     |
|    "...minimizes key remapping using a virtual node *ring*..." |
+---------------------------------------------------------------+
```

---

### 🟢 NAV-02: GPU-Accelerated Obsidian Knowledge Graph Clustering (P1)
* **Goal**: Upgrade the local and global graph engine with domain cluster coloring and interactive neighborhood exploration.
* **Key Enhancements**:
  - **Color-Coded Domain Clusters**:
    - Emerald Green (`#10b981`): DSA Algorithms & LeetCode Notes
    - Indigo Slate (`#6366f1`): System Architecture & Backend Roads
    - Warm Amber (`#f59e0b`): English, Japanese & Mandarin Language Tracks
    - Amethyst Violet (`#8b5cf6`): Tags & MOC Index Nodes
  - **Neighborhood Hover Highlight**: Hovering over a node dims all unrelated nodes to 15% opacity while highlighting immediate 1-hop and 2-hop connected neighbors.
  - **Quick Inspector Card**: Clicking a graph node pops open the clean Obsidian Inspector Card (`ObsidianGraphDock.tsx`) showing note summary, domain tag, and a 1-click "Open Note" button without forcing an immediate hard page reload.

---

### 🟢 NAV-03: Bidirectional Backlinks with Surrounding Context Snippets (P1)
* **Goal**: Transform passive backlinks into rich contextual references similar to Obsidian Backlink panes.
* **Implementation Plan**:
  - During Quartz AST markdown parsing, capture the 120-character sentence window surrounding each internal wikilink (`[[Note Name]]`).
  - Render backlinks with an expandable preview showing where and why the current note was referenced:
    ```
    Backlinks to this note:
    ▼ NeetCode 150 Master Track
      "...refer to [[Big O Notation]] for time complexity proofs of hash collisions..."
    ```

---

### 🟢 NAV-04: Sequential Module Reading Navigator (Next/Previous Track Walkers) (P2)
* **Goal**: Enable effortless linear study without jumping back and forth to the sidebar explorer.
* **Implementation Plan**:
  - Automatically detect folder sibling order (e.g. `01.Duplicate-Integer` -> `02.Valid-Anagram` -> `03.Two-Sum`).
  - Render an elegant bottom pagination footer on all lesson notes:
    ```
    +------------------------------+  +------------------------------+
    | ◀ Previous: 01. Duplicate Int|  | Next: 03. Two Sum          ▶ |
    +------------------------------+  +------------------------------+
    ```
