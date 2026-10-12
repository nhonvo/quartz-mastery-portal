# 🎨 UI/UX, Color Science & Responsive Layout Backlog Specification

> **Parent Roadmap**: [`00_master_roadmap_executive_summary.md`](file:///d:/learning/quartz/report/backlog_roadmap/00_master_roadmap_executive_summary.md)  
> **Module**: UI/UX & Visual Architecture  
> **Target Files**: `quartz/styles/custom.scss`, `quartz/styles/base.scss`, `quartz/styles/variables.scss`  

---

## 1. Problem Statement & Audit Findings

The portal serves as an intensive learning portal across multiple environments (desktop ultrawide monitors, MacBooks, iPad tablets, and mobile devices in low-light environments). Recent audits revealed critical styling conflicts:
1. **Theme Incoherence**: The Paper and Warm themes lack complete token coverage for Mermaid diagrams, syntax highlighting blocks, callout borders, and Explorer tree hovers.
2. **Mobile/Desktop Search Parity**: While desktop now has a clean search pill, mobile uses a disparate icon button without unified focus states and keyboard accessibility traps.
3. **Viewport Scale & Right-Edge Gap**: Under certain desktop resolutions and Windows scaling factors (125%/150%), the center content container exhibits a right-margin drift caused by `100vw` scrollbar calculations.
4. **Code Block Ergonomics**: Long C# and SQL implementations lack syntax line numbering toggles, language pill indicators, and visual diff highlighting.

---

## 2. Comprehensive Enhancement Backlog

### 🟢 UI-01: High-Contrast Color Token Normalization Matrix (P0)
* **Goal**: Establish a mathematically consistent 4-theme color token architecture satisfying WCAG 2.1 AAA for body text and AA for badges/interactive controls.
* **Themes to Standardize**:
  1. `Light (Nordic Frost)`: Clean white/slate `#faf8f8` with deep midnight slate `#2b59c3` accent and neutral gray borders `#e2e8f0`.
  2. `Dark (Obsidian Slate)`: True deep slate `#161618` with soft cyan/indigo `#7aa2f7` accents and subtle border separators `#27272a`.
  3. `Sepia (Paper Eye-Care)`: Calming warm parchment `#fbf0d9` with walnut text `#433422`, terra-cotta links `#b35d38`, and olive badges.
  4. `OLED Black (Pure Dark)`: Pure `#000000` background for mobile OLED power savings and ultra-contrast late-night studying.
* **Token Standardization Matrix**:
  ```scss
  :root {
    --theme-bg-canvas: var(--light);
    --theme-bg-surface: color-mix(in srgb, var(--light) 95%, transparent);
    --theme-bg-card: color-mix(in srgb, var(--light) 90%, transparent);
    --theme-border-subtle: var(--lightgray);
    --theme-text-primary: var(--dark);
    --theme-text-secondary: var(--darkgray);
    --theme-text-muted: var(--gray);
    --theme-accent-primary: var(--secondary);
    --theme-accent-secondary: var(--tertiary);
  }
  ```

---

### 🟢 UI-02: Universal Code Block Enhancer & Syntax Polish (P1)
* **Goal**: Transform standard markdown fenced code blocks into developer-grade interactive code inspectors.
* **Key Capabilities**:
  - **Language Badge & File Tab Header**: Automatically extract language tags (`csharp`, `sql`, `typescript`, `python`) and render an elegant top tab showing the language logo and file name (if specified in code block metadata).
  - **One-Click Copy with Feedback**: Smooth animated copy icon transitioning into a green checkmark (`Copied!`) with clipboard error handling.
  - **Line Highlighting & Numbers**: Native CSS counters for line numbers that remain non-selectable when copying code snippets.
  - **Horizontal Scroll Hint**: Subtle gradient shadow on overflowing code snippets indicating scrollable lines without unsightly desktop scrollbars.

```
+--------------------------------------------------------+
| 💻 C#  Solution.cs                       [⎘ Copy] [⚙] |
+--------------------------------------------------------+
|  1 | public class Solution {                           |
|  2 |     public bool HasDuplicate(int[] nums) {         |
|  3 |         var seen = new HashSet<int>();            |
|  4 |         foreach (var n in nums) {                 |
|  5 |             if (!seen.Add(n)) return true;        |
|  6 |         }                                         |
|  7 |         return false;                             |
|  8 |     }                                             |
|  9 | }                                                 |
+--------------------------------------------------------+
```

---

### 🟢 UI-03: Responsive Table Auto-Scroll & Mobile Card View (P1)
* **Goal**: Prevent table overflow from breaking page margins on mobile viewports (<800px) and tablet devices.
* **Implementation Plan**:
  - Automatically wrap all markdown `<table>` elements with `<div class="table-container" tabindex="0">` via Rehype AST plugin.
  - Apply sticky headers (`thead th { position: sticky; top: 0; }`) to maintain column context when scrolling through extensive 50-row LeetCode pattern comparison matrices.
  - Optional mobile card fallback: For tables with 3 or fewer columns, apply CSS Grid `@media (max-width: 600px)` transformation to render table rows as distinct, touch-friendly cards.

---

### 🟢 UI-04: Header Layout Geometry & Scrollbar Gap Normalization (P0)
* **Goal**: Permanently eradicate the right-side gap observed between the desktop navbar and right viewport border.
* **Root Cause & Fix**:
  - Replace all occurrences of `width: 100vw;` with `width: 100%;` and `max-width: 100%;` to prevent Windows vertical scrollbar subtraction errors.
  - Replace `overflow-x: hidden;` on body with `overflow-x: clip;` to allow proper sticky positioning while preventing layout jitter.
  - Center `.center` content column with auto-margins and clamp maximum width (`max-width: min(900px, 100% - 4rem)`).

---

### 🟢 UI-05: Dark/Light Mode Theme Transition Optimization (P2)
* **Goal**: Eliminate visual flashes of unstyled content (FOUC) and jarring color snaps when switching themes.
* **Implementation Plan**:
  - Add temporary transition disabling class `theme-transitioning` to root during theme toggle:
    ```js
    document.documentElement.classList.add("theme-transitioning");
    document.documentElement.setAttribute("saved-theme", newTheme);
    requestAnimationFrame(() => {
      document.documentElement.classList.remove("theme-transitioning");
    });
    ```
  - Pre-render color scheme meta tag in `<head>` dynamically based on `localStorage` before paint.
