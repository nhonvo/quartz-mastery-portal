# 🗺️ Master Product Roadmap & Architectural Backlog: Quartz Mastery Portal

> **Portal Target**: `D:\learning\quartz` (Production: [learning-three-flax.vercel.app](https://learning-three-flax.vercel.app/))  
> **Architecture Stack**: Quartz v5.0.0 (Preact, D3/Pixi, FlexSearch, SCSS, Node.js 22, Vercel Edge CDN)  
> **Audit & Strategic Horizon**: Q4 2026 – Q2 2027  
> **Document Status**: Production Strategy Specification  

---

## Executive Vision & Portal Strategy

The **Software Engineering & Language Mastery Portal** (GraphMind Matrix) has evolved from a static Obsidian markdown publisher into a high-density, multi-track educational workbench. It unifies **Data Structures & Algorithms (C# NeetCode 150)**, **System Architecture Blueprints**, **Relational Database Design (PostgreSQL)**, and **Tri-Lingual Professional Fluency (English, Japanese JLPT N5/N4, Mandarin)** into an interconnected knowledge web.

### Core Strategic Objectives
1. **Zero Cognitive Friction**: Reduce visual fatigue during 4-hour daily learning marathons with pristine typography, context-aware color science, and clutter-free responsive viewports.
2. **Instant Search & Graph Traversability**: Transform passive note-reading into active conceptual graph traversal (local node neighborhoods, semantic bidirectional backlinks, instant sub-50ms fuzzy search).
3. **Interactive Deliberate Practice**: Embed executable code snippets, multi-tier self-assessment exam widgets, audio pronunciation triggers, and progress tracking directly within markdown pages.
4. **Resilient Local & Edge CI/CD**: Deliver sub-second fast incremental builds for active development while ensuring zero-breakage full builds deployed instantly to Vercel CDN.

---

## 📑 Strategic Backlog Overview (Modules & Deep-Dive Documents)

The roadmap is structured into 4 foundational review modules, documented across dedicated specifications:

```
d:\learning\quartz\report\backlog_roadmap/
├── 00_master_roadmap_executive_summary.md        <-- (This Document)
├── 01_ui_ux_responsive_color_backlog.md          <-- Color Science, Theme Matrix & Layout Refactoring
├── 02_graph_search_navigation_backlog.md         <-- Knowledge Graph, Search Engine & Wayfinding
├── 03_pedagogical_interactive_features_backlog.md<-- Multi-Tier Exams, Audio, Code Runner & Progress HUD
└── 04_build_pipeline_tech_architecture_backlog.md<-- Pipeline Engineering, Edge CDN, Bundle & Asset Pipeline
```

---

## 🎯 High-Level Capability Maturity Matrix

| Capability Dimension | Current Stage (v5.0-alpha) | Target Stage (v5.1-beta) | Ultimate Maturity (v5.2-LTS) |
| :--- | :--- | :--- | :--- |
| **Theme & Color Systems** | Dual (Light/Dark) + Raw Paper Tint; contrast edge-cases | 4 WCAG AAA Themes (Nordic, Dark Slate, Sepia Paper, OLED Black) | Fully user-customizable CSS token engine with persistent storage |
| **Search Experience** | FlexSearch with desktop pill + basic results list | Category-faceted search, highlight previews, search history pills | Semantic vector embeddings + offline local search index |
| **Graph Visualization** | D3 force-directed local graph + floating modal trigger | Directed links, cluster grouping by track, hover neighborhood highlighting | Pixi.js WebGL GPU rendering with interactive note inspector dock |
| **Interactive Practice** | Static markdown callouts & code snippets | Inline flashcards, collapsible solution accordions, multi-tier exam pills | Executable WebAssembly runner (C# / SQL pg-lite) & spaced-repetition SRS |
| **Build & Deployment** | Dual build flow (`content_fast` vs full 1278 files) | Multi-threaded parser, incremental hash caching, instant asset rsync | Atomic Vercel deploy previews + automated Playwright visual regression CI |

---

## 🚦 Phased Implementation Roadmap

```mermaid
flowchart TD
    subgraph Phase 1: Polish & Friction Elimination [Sprint 1-2: Stabilization]
        P1_1["Clean Theme Contrast & Paper Theme Polish"]
        P1_2["Universal Layout Rhythm & Table/Code Block Fixes"]
        P1_3["Search Modal Polish & Desktop/Mobile Unification"]
    end

    subgraph Phase 2: Graph & Navigation Upgrades [Sprint 3-4: Knowledge Matrix]
        P2_1["Obsidian Graph Neighborhood Filtering & Clusters"]
        P2_2["Smart Breadcrumbs & Multi-Level Reading Progress"]
        P2_3["Bidirectional Backlink Context Snippets"]
    end

    subgraph Phase 3: Interactive Learning Workbenches [Sprint 5-6: Active Practice]
        P3_1["Interactive Multi-Tier Assessment Exam Component"]
        P3_2["Audio Pronunciation & Pinyin Tone Trainer for Languages"]
        P3_3["NeetCode Benchmark Comparison & Complexity Visualizer"]
    end

    subgraph Phase 4: Production Engine Optimization [Sprint 7-8: Infrastructure]
        P4_1["Incremental Build Engine with AST Fingerprinting"]
        P4_2["Asset Pipeline WebP/AVIF Image Optimizer"]
        P4_3["Service Worker Offline PWA Support"]
    end

    Phase 1 --> Phase 2
    Phase 2 --> Phase 3
    Phase 3 --> Phase 4
```

---

## 📋 Comprehensive Backlog Ticket Master Index

| ID | Module | Title | Priority | Complexity | Target Sprint |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **UI-01** | UI/UX | High-Contrast Theme Palette Normalization (Light, Dark, Sepia, OLED) | 🔴 P0 | Medium | Sprint 1 |
| **UI-02** | UI/UX | Unified Header & Desktop Search Bar Visual Hierarchy Alignment | 🔴 P0 | Low | Sprint 1 |
| **UI-03** | UI/UX | Responsive Table Auto-Scroll Wrapper with Sticky Headers | 🟠 P1 | Low | Sprint 1 |
| **UI-04** | UI/UX | Code Block Enhancement: One-Click Copy, Line Highlights & Language Badges | 🟠 P1 | Medium | Sprint 2 |
| **NAV-01** | Search | Faceted Search Filters (Tracks: DSA, Arch, Lang, Certs) | 🔴 P0 | High | Sprint 3 |
| **NAV-02** | Graph | Graph Node Color Clustering by Track with Cluster Legend HUD | 🟠 P1 | High | Sprint 3 |
| **NAV-03** | Navigation | Smart Reading Progress Bar & Next/Previous Track Walkers | 🟡 P2 | Low | Sprint 4 |
| **PED-01** | Practice | Multi-Tier Interactive Self-Assessment Exam Runner (MCQ, Fill, Error Fix) | 🔴 P0 | High | Sprint 5 |
| **PED-02** | Practice | Spaced Repetition Flashcard Mode with Local Storage Leitner Box | 🟠 P1 | High | Sprint 5 |
| **PED-03** | Languages | Tri-Lingual Audio Player & Pinyin/Furigana Interactive Ruby Hover | 🟠 P1 | Medium | Sprint 6 |
| **TECH-01**| Pipeline | Incremental AST Cache for Sub-Second Local Markdown Compilation | 🔴 P0 | High | Sprint 7 |
| **TECH-02**| Pipeline | Automated Playwright Visual Regression CI Check | 🟠 P1 | Medium | Sprint 7 |
| **TECH-03**| Performance| Service Worker Static PWA Caching for Offline Study | 🟡 P2 | Medium | Sprint 8 |
