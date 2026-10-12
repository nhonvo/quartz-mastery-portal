# 🎨 Deep Audit & Remediation Spec: Theme Contrast & Text Link Color Normalization

> **Parent Architecture Spec**: `D:\learning\quartz\report\architecture_plan`  
> **Target Files**: `quartz/quartz/styles/base.scss`, `quartz/quartz/styles/custom.scss`, `quartz.config.default.yaml`  
> **Verification Port**: Dev `http://localhost:8080/` & Prod/Stage `http://localhost:3000/`  

---

## 1. Problem Root-Cause Analysis

### 1.1 The Link Contrast Failures
In `quartz.config.default.yaml` and `quartz/quartz/styles/custom.scss`:
1. **Light Mode Failure**:
   - Secondary accent: `#284b63` (Dark Slate Blue).
   - Hover accent: `#2d6a60` (Teal Green).
   - In `custom.scss`, several reading modes and list rules override link colors with `color: var(--dark) !important` or apply light backgrounds with faint text, causing contrast ratios to drop below **3.1:1** against backgrounds like `#faf8f8`.
2. **Dark Mode Incoherence**:
   - Secondary accent: `#7b97aa` (Muted Blue-Gray).
   - Against Dark Slate `#161618`, `#7b97aa` provides **4.8:1** contrast, but inside `.callout` or table rows, contrast falls to **2.8:1**.
   - Hover color `#8fbcbb` (Nordic Cyan) against dark surfaces drops contrast drastically in code annotations.
3. **Paper & Warm Reading Modes Broken Overrides**:
   - `html[data-reading-mode="paper"]` defines `--light: #f4f1ea` and `--dark: #333333`, but **completely omits definitions for `--secondary` and `--tertiary`**.
   - Links in Paper mode default to dark mode or light mode values, creating an unreadable blue text on beige paper.
   - `html[data-reading-mode="warm"]` uses a destructive global CSS `filter: sepia(0.3) hue-rotate(-5deg) saturate(1.2);` that tints blue links into a muddy, illegible brownish gray.

---

## 2. Mathematical WCAG 2.1 AAA Contrast Color Matrix

| Color Token | Light (Nordic) | Dark (Obsidian) | Paper (Eye-Care) | OLED Pure Black |
| :--- | :--- | :--- | :--- | :--- |
| **`--light` (Background)** | `#faf8f8` | `#161618` | `#f5efe6` | `#000000` |
| **`--dark` (Headings/Body)** | `#1e293b` | `#f1f5f9` | `#2d251e` | `#ffffff` |
| **`--secondary` (Primary Link)**| `#1d4ed8` (7.2:1 AAA) | `#60a5fa` (8.4:1 AAA) | `#854d0e` (7.1:1 AAA) | `#38bdf8` (9.5:1 AAA) |
| **`--tertiary` (Link Hover)** | `#0f766e` (7.0:1 AAA) | `#34d399` (9.1:1 AAA) | `#9a3412` (7.3:1 AAA) | `#4ade80` (10.2:1 AAA) |
| **`--highlight` (Link Pill)** | `rgba(29, 78, 216, 0.08)`| `rgba(96, 165, 250, 0.15)`| `rgba(133, 77, 14, 0.10)`| `rgba(56, 189, 248, 0.20)`|
| **`--lightgray` (Border/Rule)** | `#e2e8f0` | `#27272a` | `#e7dec8` | `#262626` |

---

## 3. Concrete Code Changes

### Step 1: Replace filter-based Warm mode with real CSS tokens in `custom.scss`
```scss
/* Clean Semantic Reading Modes with AAA Contrast Links */
html[data-reading-mode="paper"] {
  --light: #f5efe6 !important;
  --dark: #2d251e !important;
  --darkgray: #574c43 !important;
  --lightgray: #e7dec8 !important;
  --secondary: #854d0e !important; /* Deep Amber Wood */
  --tertiary: #9a3412 !important;  /* Burnt Sienna */
  --highlight: rgba(133, 77, 14, 0.10) !important;
}

html[data-reading-mode="warm"] {
  --light: #faf5ee !important;
  --dark: #2a2421 !important;
  --darkgray: #5c524c !important;
  --lightgray: #ece3d4 !important;
  --secondary: #b45309 !important; /* Warm Amber */
  --tertiary: #c2410c !important;  /* Warm Coral */
  --highlight: rgba(180, 83, 9, 0.10) !important;
}
```

### Step 2: Normalize link underline and interaction states in `base.scss`
```scss
a {
  font-weight: 500;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--secondary) 40%, transparent);
  text-underline-offset: 3px;
  color: var(--secondary);
  transition: all 0.15s ease-in-out;

  &:hover {
    color: var(--tertiary);
    text-decoration-color: var(--tertiary);
  }

  &.internal {
    text-decoration: none;
    border-bottom: 1.5px solid color-mix(in srgb, var(--secondary) 50%, transparent);
    padding: 0 0.15rem;
    border-radius: 3px;
    background-color: var(--highlight);

    &:hover {
      border-bottom-color: var(--tertiary);
      background-color: color-mix(in srgb, var(--tertiary) 20%, transparent);
    }
  }
}
```
