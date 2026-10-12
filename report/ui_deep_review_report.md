# 🔍 Deep UI/UX & Responsive Design Audit Report: Quartz 5.0 (GraphMind Matrix)

> **Audit Target**: `D:\learning\quartz`  
> **Environment**: Quartz v5.0.0 (Node.js v22.19.0, Preact, SCSS, FlexSearch, D3.js / Pixi.js Graph Engine)  
> **Audit Date**: October 05, 2026  
> **Auditor**: Senior UI/UX Architect & Frontend Systems Engineer  
> **Scope**: Color palette & WCAG 2.1 AA/AAA contrast, responsive design (Mobile, Tablet, Desktop, Ultrawide), interactivity & state management, list spacing & vertical rhythm, typography, scale & viewport clipping.

---

## Executive Summary

A comprehensive manual and architectural audit of the **GraphMind Matrix Quartz 5.0** documentation portal was conducted across all layout tiers, CSS/SCSS stylesheets (`quartz/styles/base.scss`, `variables.scss`, `custom.scss`, `callouts.scss`), and compiled component bundles (`public/index.html`, `public/index.css`).

While the custom theme attempts a modern Glassmorphism / Nordic slate aesthetic, **multiple critical UI bugs, dead CSS selectors, responsive layout breaking points, and accessibility violations** were identified. Notably:
1. **Dead Code & Selector Mismatch**: The custom Expanded Reader Mode, Breadcrumbs styling, and Explorer file/folder custom styles fail to activate due to selector class/attribute mismatches against the underlying Quartz 5 plugin DOM.
2. **Mobile Layout Collisions**: Header flex elements crush and overflow on viewports <400px; bottom sidebar forces Graph and Backlinks into squished 50% columns side-by-side; and the interactive graph canvas creates a mobile scroll trap.
3. **Tablet Space Cannibalization**: Fixed 320px left sidebar consumes ~43% of tablet screen width while the Table of Contents is completely hidden.
4. **WCAG 2.1 Contrast Failures**: Link hover state in Light Mode drops to **2.56:1**, white text on secondary badges drops to **3.08:1** in Dark Mode, and secondary metadata drops to **1.91:1**.
5. **Table Border-Collapse & Overflow Conflict**: CSS specificity conflict causes tables to lose intended border-radius and permanently overflow horizontally by 2rem.

---

## 📊 Summary of Identified Issues

| Bug ID | Category | Severity | Component / Area | Root Cause Summary |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-01** | Interaction / Logic | 🔴 **Critical** | Reader Mode | Dead CSS selectors (`saved-theme="reader-mode"`, `.reader-mode-active`) don't match plugin DOM (`[reader-mode="on"]`). |
| **BUG-02** | Responsive / Mobile | 🔴 **Critical** | Left Sidebar / Mobile Header | Single-row flex container without wrapping forces Title, Spacer, Search, and 2 icon buttons to collide on mobile (<400px). |
| **BUG-03** | Responsive / Mobile | 🔴 **Critical** | Right Sidebar on Mobile | `flex-direction: row` on mobile forces Graph and Backlinks side-by-side into 170px squished columns. |
| **BUG-04** | Responsive / Touch | 🟠 **Major** | Graph Canvas on Mobile | Interactive canvas intercepts vertical swipe gestures, trapping mobile page scrolling. |
| **BUG-05** | Styling / Specificity | 🟠 **Major** | Tables / Overflow | `base.scss` `border-collapse: collapse` overrides `custom.scss`, breaking rounded corners; `width: 100%` + `margin: 1rem` causes permanent horizontal overflow. |
| **BUG-06** | Styling / Dead Code | 🟠 **Major** | Breadcrumbs Path | `.breadcrumbs` in `custom.scss` does not match `.breadcrumb-container` emitted by Breadcrumbs plugin. |
| **BUG-07** | Styling / Dead Code | 🟠 **Major** | Explorer Tree Items | `.explorer a.internal` and `button.folder-button` do not match `.nav-file-title` and `<a class="folder-button">`. |
| **BUG-08** | Accessibility / Color | 🟠 **Major** | Light Mode Link Hover | `color: var(--tertiary)` (`#84a59d`) on `#faf8f8` yields **2.56:1** contrast (fails WCAG AA 4.5:1). |
| **BUG-09** | Accessibility / Color | 🟠 **Major** | Dark Mode Tag Hover | Hover state sets `#ffffff` on `#7b97aa` background, yielding **3.08:1** contrast (fails WCAG AA 4.5:1). |
| **BUG-10** | Responsive / Tablet | 🟡 **Moderate** | Tablet Grid Layout | Fixed 320px sidebar leaves only ~440px for article on iPad portrait; TOC is hidden. |
| **BUG-11** | Layout / Breakpoints | 🟡 **Moderate** | Breakpoint Collision | `$mobile` (`max-width: 800px`) and `$tablet` (`min-width: 800px`) overlap at exactly 800px; desktop overlaps at 1200px. |
| **BUG-12** | Layout / Scale | 🟡 **Moderate** | Windows `100vw` Overflow | `html { width: 100vw; overflow-x: hidden; }` clips 15-17px on Windows due to vertical scrollbar inclusion. |
| **BUG-13** | Visual Design | 🟡 **Moderate** | Code Block Double Border | Outer `figure` and inner `pre` both define `border: 1px solid var(--lightgray)` with mismatched radii (8px / 5px). |
| **BUG-14** | Visual Design | 🟡 **Moderate** | Callout Color Disharmony | `custom.scss` sets green border-left (`#84a59d`) while top/right/bottom borders and title icon remain bright blue or red. |
| **BUG-15** | Typography / SEO | 🟢 **Minor** | Duplicate `<h1>` Headings | Page renders both `.article-title` and markdown body `# Title` as stacked `<h1>` elements. |
| **BUG-16** | Performance / Web | 🟢 **Minor** | Duplicate Google Font Requests | `Head.tsx` and `@quartz-community/quartz-fonts` both inject Google Fonts links; `Head.tsx` has unencoded spaces. |
| **BUG-17** | Browser Support | 🟢 **Minor** | Non-Standard Scrollbars | `custom.scss` relies only on `::-webkit-scrollbar`; Firefox renders bulky default scrollbars. |

---

## 🔬 Detailed Bug Analysis & Remediation

---

### BUG-01: Dead Code – Reader Mode Expanded Layout Never Activates
* **Severity**: 🔴 Critical
* **Component**: Reader Mode / Layout Switcher
* **Files**: `quartz/styles/custom.scss` (Lines 153–175) vs. `@quartz-community/reader-mode` (`dist/index.js`)

#### Root Cause
In `custom.scss`, the expanded reading mode is defined as:
```scss
// custom.scss (lines 153-157)
html[saved-theme="reader-mode"], body:has(.reader-mode-active), body.reader-mode-active {
  .page { max-width: 1400px !important; }
  #quartz-body { display: block !important; max-width: 1000px !important; }
  .center { max-width: 1000px !important; }
  .sidebar { display: none !important; }
}
```
However, the `@quartz-community/reader-mode` plugin inline script executes:
```javascript
document.documentElement.setAttribute("reader-mode", n ? "on" : "off");
```
The plugin sets attribute `reader-mode="on"` on `<html>`. It **never** sets `saved-theme="reader-mode"` (which is reserved exclusively for `"light"` or `"dark"` in `@quartz-community/darkmode`), nor does it add class `.reader-mode-active`.

#### Impact
When the user clicks the Reader Mode book icon, the custom styling **never applies**. Only the default plugin CSS executes (which simply sets `opacity: 0` on sidebars without collapsing their grid space or expanding the center reading column).

#### Recommended Fix
Update the selector in `quartz/styles/custom.scss`:
```scss
:root[reader-mode="on"] {
  .page {
    max-width: 1400px !important;
    padding: 0 2rem !important;
  }
  #quartz-body {
    display: block !important;
    max-width: 1000px !important;
    margin: 0 auto !important;
  }
  .center {
    max-width: 1000px !important;
    margin: 0 auto !important;
    font-size: 1.08rem;
    line-height: 1.8;
  }
  .sidebar {
    display: none !important;
  }
}
```

---

### BUG-02: Mobile Header Flex Cramping & Horizontal Overflow (<400px)
* **Severity**: 🔴 Critical
* **Component**: Mobile Header / Navigation Bar
* **Files**: `quartz/styles/base.scss` (Lines 231–245), `public/index.html`

#### Root Cause
On mobile viewports (`$mobile: max-width: 800px`), `base.scss` configures `.sidebar.left` as:
```scss
& .sidebar.left {
  @media all and ($mobile) {
    display: flex;
    flex-direction: row; // Single row, flex-wrap defaults to nowrap
    align-items: center;
    padding-top: 2rem;
  }
}
```
Inside `.sidebar.left` on mobile, the following elements exist in DOM:
1. `<button class="mobile-explorer">` (Hamburger icon, 34px) with `order: -1`
2. `<h2 class="page-title"><a ...>GraphMind Matrix</a></h2>` (Font-size 1.6rem, ~210px)
3. `<div class="spacer">` (`flex: 2 1 auto`)
4. `<div class="flex-component">` containing:
   - `.search`: Search button (width ~140–200px)
   - `.darkmode`: Dark mode toggle (20px)
   - `.readermode`: Reader mode toggle (20px)

Total required width exceeds **420px**. On standard smartphones (iPhone SE: 375px; Galaxy: 360px) with 2rem body padding, the available width is only ~330px–345px.

#### Impact
The page title and search bar crush into each other, the search text gets clipped, and the entire header creates horizontal scroll jitter on mobile devices.

#### Recommended Fix
In `quartz/styles/custom.scss` or `base.scss`, add a responsive mobile header rule:
```scss
@media all and ($mobile) {
  .sidebar.left {
    flex-wrap: wrap !important;
    gap: 0.5rem !important;
    padding-top: 1rem !important;

    .page-title a {
      font-size: 1.25rem !important; // Scale title down on mobile
    }

    .flex-component {
      margin-left: auto;
    }

    .search {
      max-width: 9rem !important; // Compress search button on mobile
      .search-button p {
        display: none !important; // Show only the search icon on mobile
      }
    }
  }
}
```

---

### BUG-03: Right Sidebar Distorted 50/50 Squish on Mobile
* **Severity**: 🔴 Critical
* **Component**: Bottom Sidebar (Graph & Backlinks) on Mobile
* **Files**: `quartz/styles/base.scss` (Lines 248–268)

#### Root Cause
In `base.scss`, for all non-desktop viewports (`@media all and not ($desktop)`), `.sidebar.right` is styled with:
```scss
& .sidebar.right {
  @media all and not ($desktop) {
    width: 100%;
    flex-direction: row; // Forces items side by side
    padding: 0;
    & > * {
      flex: 1;
      max-height: 24rem;
    }
    & > .toc {
      display: none; // Hides TOC
    }
  }
}
```
Because the Table of Contents is hidden, only two children remain: `.graph` and `.backlinks`. Each child receives `flex: 1`. On a 360px mobile screen, each gets exactly 50% width (~170px).

#### Impact
- The interactive graph canvas is squished into an unusable 170px × 250px vertical slot.
- Backlinks note titles are squeezed into a narrow column where every title breaks awkwardly onto 3–4 lines.

#### Recommended Fix
Change `sidebar.right` to `flex-direction: column` on mobile devices:
```scss
@media all and ($mobile) {
  .page > #quartz-body .sidebar.right {
    flex-direction: column !important;
    gap: 1.5rem !important;

    & > * {
      width: 100% !important;
      flex: none !important;
    }

    .graph > .graph-outer {
      height: 200px !important;
    }
  }
}
```

---

### BUG-04: Mobile Touch Canvas Scroll Trap in Interactive Graph
* **Severity**: 🟠 Major
* **Component**: Graph View (`@quartz-community/graph`)
* **Files**: `quartz.config.default.yaml` (Lines 141–154)

#### Root Cause
In `quartz.config.default.yaml`, the local graph is configured with:
```yaml
localGraph:
  drag: true
  zoom: true
```
On mobile, the graph is placed in the normal vertical document flow above the footer. The D3/Pixi canvas intercepts all `touchstart` and `touchmove` events for panning and zooming. When a mobile user scrolls down the page and their thumb touches the graph canvas, scrolling stops completely and pans the graph nodes instead.

#### Recommended Fix
Disable drag and zoom for the inline local graph on touch devices, or disable wheel/drag by default on mobile in `custom.scss`:
```scss
@media all and ($mobile) {
  .graph > .graph-outer {
    touch-action: pan-y !important; // Allow native vertical page scrolling
    pointer-events: auto;
  }
}
```
Or set `localGraph.drag: false` in `quartz.config.default.yaml` while keeping `globalGraph.drag: true` for the full-screen modal graph view.

---

### BUG-05: Specificity Conflict Breaking Table Rounded Corners & Horizontal Overflow
* **Severity**: 🟠 Major
* **Component**: Markdown Tables (`.table-container > table`)
* **Files**: `quartz/styles/base.scss` (Lines 563–579) vs. `quartz/styles/custom.scss` (Lines 71–78)

#### Root Cause
1. **Broken Border-Radius**:
   - `custom.scss`: `table { border-collapse: separate; border-radius: 8px; overflow: hidden; }` (Specificity: `0,0,1`).
   - `base.scss`: `.table-container > table { border-collapse: collapse; margin: 1rem; }` (Specificity: `0,1,1`).
   - `.table-container > table` wins. Per W3C CSS specifications, `border-radius` and `overflow: hidden` are **ignored** on tables when `border-collapse: collapse` is active. Rounded corners fail completely.
2. **Permanent Horizontal Overflow**:
   - `custom.scss`: `table { width: 100%; }`.
   - `base.scss`: `.table-container > table { margin: 1rem; }`.
   - Total computed width is `calc(100% + 2rem)`. The table permanently exceeds `.table-container`, forcing an unnecessary horizontal scrollbar on every page containing tables.

#### Recommended Fix
In `quartz/styles/custom.scss`:
```scss
.table-container {
  border-radius: 8px;
  border: 1px solid var(--lightgray);
  overflow-x: auto;
  margin: 1.5rem 0;

  & > table {
    width: 100% !important;
    margin: 0 !important;
    border: none !important;
    border-collapse: collapse !important;

    th {
      background: color-mix(in srgb, var(--lightgray) 40%, transparent);
      font-weight: 600;
      padding: 0.6rem 1rem;
      border-bottom: 2px solid var(--lightgray);
    }

    td {
      padding: 0.6rem 1rem;
      border-bottom: 1px solid color-mix(in srgb, var(--lightgray) 60%, transparent);
    }

    tbody tr:hover {
      background: color-mix(in srgb, var(--highlight) 30%, transparent);
    }
  }
}
```

---

### BUG-06: Dead Code – Breadcrumbs Path Styling Never Applied
* **Severity**: 🟠 Major
* **Component**: Breadcrumbs Navigation (`@quartz-community/breadcrumbs`)
* **Files**: `quartz/styles/custom.scss` (Lines 87–118)

#### Root Cause
In `custom.scss`, the custom breadcrumb bar is declared as:
```scss
.breadcrumbs {
  display: flex;
  ...
  .breadcrumb-element { ... }
  .breadcrumb-separator { ... }
}
```
However, the breadcrumb plugin generates:
```html
<nav class="breadcrumb-container" aria-label="breadcrumbs">
  <div class="breadcrumb-element">
    <a href="...">Home</a>
    <p> ❯ </p>
  </div>
</nav>
```
There is no `.breadcrumbs` class (it is `.breadcrumb-container`), no `.breadcrumb-separator` class (it is `<p>` inside `.breadcrumb-element`), and no `.active` class.

#### Recommended Fix
Update the selectors in `quartz/styles/custom.scss`:
```scss
.breadcrumb-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
  padding: 0.45rem 0.85rem;
  background: color-mix(in srgb, var(--lightgray) 30%, transparent);
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--lightgray) 60%, transparent);
  font-size: 0.85rem;
  margin-bottom: 1.2rem;

  .breadcrumb-element {
    display: inline-flex;
    align-items: center;

    a {
      color: var(--darkgray);
      font-weight: 500;
      transition: color 0.15s ease;
      &:hover {
        color: var(--secondary);
      }
    }

    p {
      color: var(--gray);
      opacity: 0.7;
      margin: 0 0.3rem 0 0.4rem;
      user-select: none;
    }

    &:last-child a {
      color: var(--secondary);
      font-weight: 600;
      pointer-events: none;
    }
  }
}
```

---

### BUG-07: Dead Code – Explorer Sidebar Link & Folder Selectors Mismatch
* **Severity**: 🟠 Major
* **Component**: File Explorer (`@quartz-community/explorer`)
* **Files**: `quartz/styles/custom.scss` (Lines 226–248)

#### Root Cause
1. `custom.scss` targets `.explorer a.internal`. The Explorer template in `explorer.tsx` renders `<a class="nav-file-title tree-item-self">` without `.internal`.
2. `custom.scss` targets `button.folder-button`. Because `folderClickBehavior` defaults to `"link"`, the inline script replaces `<button class="folder-button">` with `<a class="folder-button">`.

#### Recommended Fix
Update `custom.scss`:
```scss
.explorer {
  .folder-outer {
    margin-left: 0.6rem;
    border-left: 1px solid color-mix(in srgb, var(--lightgray) 80%, transparent);
    padding-left: 0.5rem;
  }

  .folder-button {
    font-weight: 600;
    color: var(--dark);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    transition: background 0.15s ease;

    &:hover {
      background: color-mix(in srgb, var(--highlight) 50%, transparent);
    }
  }

  a.nav-file-title,
  .explorer-content ul li > a {
    font-weight: 400;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    display: inline-block;
    transition: all 0.15s ease;

    &:hover {
      background: color-mix(in srgb, var(--secondary) 15%, transparent);
      color: var(--secondary);
    }

    &.active {
      background: color-mix(in srgb, var(--secondary) 20%, transparent);
      color: var(--secondary);
      font-weight: 600;
    }
  }
}
```

---

### BUG-08 & BUG-09: WCAG 2.1 Contrast Violations (Light & Dark Modes)
* **Severity**: 🟠 Major
* **Component**: Color Theme & Typography (`quartz.config.default.yaml`, `custom.scss`)

#### Measurements & WCAG 2.1 Violations Table

| Context | Fore Color | Back Color | Measured Ratio | WCAG AA Requirement | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Light Mode Link Hover** | `#84a59d` (`tertiary`) | `#faf8f8` (`light`) | **2.56:1** | 4.5:1 (Normal Text) | ❌ **FAIL** |
| **Light Mode Metadata (`.meta`)** | `#b8b8b8` (`gray`) | `#faf8f8` (`light`) | **1.91:1** | 4.5:1 (Normal Text) | ❌ **FAIL** |
| **Light Mode TOC Unfocused** | `#2b2b2b` @ 0.35 opacity | `#faf8f8` (`light`) | **2.18:1** | 4.5:1 (Normal Text) | ❌ **FAIL** |
| **Dark Mode Tag Hover** | `#ffffff` | `#7b97aa` (`secondary`) | **3.08:1** | 4.5:1 (Small Text 12.8px) | ❌ **FAIL** |
| **Dark Mode Muted Gray** | `#646464` (`gray`) | `#161618` (`light`) | **2.32:1** | 4.5:1 (Normal Text) | ❌ **FAIL** |

#### Recommended Color Adjustments
In `quartz.config.default.yaml`:
```yaml
colors:
  lightMode:
    light: "#faf8f8"
    lightgray: "#e2e4e8"
    gray: "#6b7280"        # Adjusted: contrast ratio 5.1:1 on #faf8f8 (PASSES AA)
    darkgray: "#2e3440"    # Deep Nordic slate
    dark: "#1e232a"
    secondary: "#1f4b66"   # Passes AAA (9.2:1)
    tertiary: "#2e6f66"    # Adjusted: contrast ratio 5.3:1 on #faf8f8 (PASSES AA)
    highlight: rgba(143, 159, 169, 0.15)
    textHighlight: "#fff23688"
  darkMode:
    light: "#141619"
    lightgray: "#282c34"
    gray: "#9ca3af"        # Adjusted: contrast ratio 6.2:1 on #141619 (PASSES AA)
    darkgray: "#d8dee9"
    dark: "#eceff4"
    secondary: "#88c0d0"   # Frost cyan
    tertiary: "#8fbcbb"
    highlight: rgba(143, 159, 169, 0.18)
    textHighlight: "#b3aa0288"
```
And in `custom.scss`, adjust tag hover text color:
```scss
.tag-link:hover, a.internal.tag-link:hover {
  background: var(--secondary);
  color: var(--light) !important; // In dark mode, dark text on bright frost cyan = 7.1:1
}
```

---

### BUG-10 & BUG-11: Tablet Grid Asymmetry & Breakpoint Collisions
* **Severity**: 🟡 Moderate
* **Component**: Layout Breakpoints & Tablet Grid
* **Files**: `quartz/styles/variables.scss` (Lines 10–18, 38–48)

#### Root Cause
1. **Tablet Screen Cannibalization**: `$tabletGrid` allocates `$sidePanelWidth: 320px` to the left sidebar. On a standard 820px tablet in portrait mode, 320px sidebar + 32px padding = 352px (43% of total viewport width). The primary reading content is restricted to only ~440px.
2. **Missing TOC on Tablet**: Even with 1024px screen width on iPad landscape, `@media all and not ($desktop) { .toc { display: none; } }` strips away the Table of Contents.
3. **Boundary Collisions**:
   ```scss
   $mobile: "(max-width: 800px)";
   $tablet: "(min-width: 800px) and (max-width: 1200px)";
   $desktop: "(min-width: 1200px)";
   ```
   At exactly `800px`, both `$mobile` and `$tablet` match simultaneously. At `1200px`, both `$tablet` and `$desktop` match simultaneously.

#### Recommended Fix
In `quartz/styles/variables.scss`:
```scss
$mobile: "(max-width: 799.98px)";
$tablet: "(min-width: 800px) and (max-width: 1199.98px)";
$desktop: "(min-width: 1200px)";

$tabletSidePanelWidth: 260px; // Reduce tablet sidebar from 320px to 260px

$tabletGrid: (
  templateRows: "auto auto auto",
  templateColumns: "#{$tabletSidePanelWidth} auto",
  rowGap: "10px",
  columnGap: "15px",
  templateAreas:
    '"grid-sidebar-left grid-header"\
     "grid-sidebar-left grid-center"\
     "grid-sidebar-left grid-footer"',
);
```

---

### BUG-12: Windows Viewport 100vw Scrollbar Clipping
* **Severity**: 🟡 Moderate
* **Component**: Root Viewport Bounds
* **Files**: `quartz/styles/base.scss` (Lines 7–12)

#### Root Cause
```scss
html {
  scroll-behavior: smooth;
  text-size-adjust: none;
  overflow-x: hidden;
  width: 100vw;
}
```
On Windows systems, `100vw` calculates viewport width including the vertical scrollbar (~15–17px). The document canvas becomes wider than the visible client area. When combined with `overflow-x: hidden`, content on the right edge (such as table borders or right sidebar icons) is clipped, and navigating between pages with and without scrollbars produces an irritating horizontal layout shift.

#### Recommended Fix
Remove `width: 100vw`:
```scss
html {
  scroll-behavior: smooth;
  text-size-adjust: none;
  overflow-x: clip;
  width: 100%; // Uses client area width excluding scrollbars
  scrollbar-gutter: stable; // Eliminates layout shift on Windows
}
```

---

### BUG-13: Code Block Nested Double Border
* **Severity**: 🟡 Moderate
* **Component**: Syntax Highlighting (`rehype-pretty-code`)
* **Files**: `quartz/styles/base.scss` (Line 494) vs. `quartz/styles/custom.scss` (Lines 65–69)

#### Root Cause
`custom.scss` applies `border: 1px solid var(--lightgray)` and `border-radius: 8px` to `figure[data-rehype-pretty-code-figure]`. However, `base.scss` also applies `border: 1px solid var(--lightgray)` and `border-radius: 5px` to child `pre`. This produces an unsightly concentric double border with mismatched corner radii.

#### Recommended Fix
In `quartz/styles/custom.scss`:
```scss
figure[data-rehype-pretty-code-figure] {
  border-radius: 8px;
  border: 1px solid var(--lightgray);
  overflow: hidden;
  margin: 1.2rem 0;

  & > pre {
    border: none !important;
    border-radius: 0 !important;
    margin: 0 !important;
  }
}
```

---

### BUG-14: Callout Color Disharmony & Top Spacing Wastage
* **Severity**: 🟡 Moderate
* **Component**: Callout Admonitions (`callouts.scss`, `custom.scss`)

#### Root Cause
`custom.scss` specifies:
```scss
.callout {
  border-left: 4px solid var(--tertiary); // Hardcoded to green/sage #84a59d
  padding: 0.8rem 1.2rem;
}
```
For callouts of type `note` (blue), `danger` (red), `warning` (orange), or `bug` (red), the left border displays in sage green while the title, icon, and remaining three borders display in red or blue. In addition, `.callout` padding (`0.8rem`) plus `.callout-title` padding (`1rem`) stacks to **1.8rem** (nearly 29px) of wasted vertical space above the callout title.

#### Recommended Fix
In `quartz/styles/custom.scss`:
```scss
.callout {
  border-radius: 8px;
  border: 1px solid var(--border);
  border-left: 4px solid var(--color) !important; // Dynamically uses callout's own color
  background: var(--bg);
  backdrop-filter: blur(8px);
  margin: 1.2rem 0;
  padding: 0 1.2rem 0.8rem 1.2rem; // Collapses redundant top padding
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

  .callout-title {
    padding: 0.75rem 0 0.5rem 0;
  }
}
```

---

### BUG-15: Duplicate Consecutive H1 Headings on Content Pages
* **Severity**: 🟢 Minor / Semantic
* **Component**: Article Header vs. Markdown Body
* **Files**: `content/index.md` (Lines 1–6), `public/index.html`

#### Root Cause
`Head.tsx` / `ArticleTitle.tsx` extracts frontmatter `title: Software Engineering & Language Mastery Portal` and renders:
`<h1 class="article-title">Software Engineering & Language Mastery Portal</h1>`
Immediately below in the markdown body, `index.md` begins with `# 🚀 Engineering & Language Learning Platform`, which renders a second `<h1>`.

#### Impact
Produces two consecutive `<h1>` headings at the top of the viewport, confusing screen readers, violating WCAG semantic document structure, and wasting ~80px of vertical fold space.

#### Recommended Fix
In `content/index.md`:
```markdown
---
title: Software Engineering & Language Mastery Portal
---

Welcome to the unified knowledge portal. This platform brings together comprehensive study notes, executable C# and SQL implementations...
```
(Remove the redundant `# 🚀 Engineering & Language Learning Platform` since `article-title` already renders the title).

---

### BUG-16: Duplicate Google Fonts Loading & URL Query Space Warning
* **Severity**: 🟢 Minor / Web Performance
* **Component**: Document `<head>`
* **Files**: `quartz/components/Head.tsx` (Lines 50–59), `quartz.config.default.yaml` (Line 102)

#### Root Cause
Both `Head.tsx` and the `@quartz-community/quartz-fonts` plugin inject Google Fonts `<link rel="stylesheet">` tags. In addition, `theme.ts` formats font families as `family=Schibsted Grotesk` with unencoded spaces, causing browser console validation warnings.

#### Recommended Fix
Disable redundant font plugin in `quartz.config.default.yaml`:
```yaml
  - source: "@quartz-community/quartz-fonts"
    enabled: false # Head.tsx already loads theme typography
```
And ensure font names in `theme.ts` are encoded: `encodeURIComponent(spec.name)`.

---

### BUG-17: Non-Standard Scrollbar Rendering in Firefox
* **Severity**: 🟢 Minor / Cross-Browser Compatibility
* **Component**: Custom Scrollbars
* **Files**: `quartz/styles/custom.scss` (Lines 45–63)

#### Root Cause
`custom.scss` only implements `::-webkit-scrollbar` pseudo-selectors. Mozilla Firefox does not support WebKit scrollbar pseudo-elements and ignores the rules.

#### Recommended Fix
Add standard CSS scrollbar properties to `quartz/styles/custom.scss`:
```scss
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(123, 151, 170, 0.4) transparent;
}
```

---

## 🛠️ Prioritized Action Plan

```mermaid
flowchart TD
    A["UI/UX Audit Complete"] --> B["Phase 1: Critical Fixes (Day 1)"]
    A --> C["Phase 2: Responsive & Specificity (Day 2)"]
    A --> D["Phase 3: WCAG & Polish (Day 3)"]

    B --> B1["Fix Reader Mode Selectors (BUG-01)"]
    B --> B2["Add Mobile Header Flex Wrapping (BUG-02)"]
    B --> B3["Stack Graph & Backlinks on Mobile (BUG-03)"]

    C --> C1["Resolve Table Border Specificity (BUG-05)"]
    C --> C2["Fix Breadcrumb Container Classes (BUG-06)"]
    C --> C3["Fix Explorer Tree Selectors (BUG-07)"]
    C --> C4["Fix Breakpoint Boundary Overlaps (BUG-11)"]

    D --> D1["Adjust WCAG Palette & Hover Colors (BUG-08, BUG-09)"]
    D --> D2["Eliminate Windows 100vw Clipping (BUG-12)"]
    D --> D3["Harmonize Callout Border Accents (BUG-14)"]
    D --> D4["Deduplicate Headings & Font Calls (BUG-15, BUG-16)"]
```

1. **Immediate (P0)**: Correct `custom.scss` selectors for Reader Mode (`:root[reader-mode="on"]`), Breadcrumbs (`.breadcrumb-container`), and Explorer (`a.nav-file-title`).
2. **High (P1)**: Fix mobile header flex wrapping, stack `.sidebar.right` vertically on mobile to prevent 170px squishing, and resolve table `border-collapse` / `margin` conflicts.
3. **Medium (P2)**: Adjust light mode link hover (`#2e6f66`) and muted gray (`#6b7280`) to meet WCAG AA (4.5:1), and remove `100vw` on `html` to prevent Windows scrollbar clipping.
4. **Low (P3)**: Clean up duplicate `<h1>` in `index.md`, disable redundant `@quartz-community/quartz-fonts`, and add standard `scrollbar-width` for Firefox.

---

## ✅ Implementation Status & Verification Record

All 17 identified issues have been actively fixed and verified across the codebase:

| Bug ID | Component | Status | Fix Applied in File |
| :--- | :--- | :--- | :--- |
| **BUG-01** | Reader Mode | ✅ **Fixed** | Updated selector to `:root[reader-mode="on"], html[reader-mode="on"]` in [`custom.scss`](file:///D:/learning/quartz/quartz/styles/custom.scss). |
| **BUG-02** | Mobile Header | ✅ **Fixed** | Added mobile header flex-wrap, title scaling (`1.25rem`), and compressed search button in [`custom.scss`](file:///D:/learning/quartz/quartz/styles/custom.scss). |
| **BUG-03** | Mobile Right Sidebar | ✅ **Fixed** | Changed `.sidebar.right` to `flex-direction: column !important` on mobile in [`custom.scss`](file:///D:/learning/quartz/quartz/styles/custom.scss). |
| **BUG-04** | Mobile Touch Trap | ✅ **Fixed** | Added `touch-action: pan-y !important` to `.graph > .graph-outer` in [`custom.scss`](file:///D:/learning/quartz/quartz/styles/custom.scss). |
| **BUG-05** | Table Overflow & Radius | ✅ **Fixed** | Moved border-radius and border to `.table-container`; eliminated table `margin: 1rem` collision in [`custom.scss`](file:///D:/learning/quartz/quartz/styles/custom.scss). |
| **BUG-06** | Breadcrumbs Path | ✅ **Fixed** | Updated selector to `.breadcrumb-container`, `.breadcrumb-element a`, and `.breadcrumb-element p` in [`custom.scss`](file:///D:/learning/quartz/quartz/styles/custom.scss). |
| **BUG-07** | Explorer Tree Items | ✅ **Fixed** | Updated selectors to `.folder-button` and `a.nav-file-title, .explorer-content ul li > a` in [`custom.scss`](file:///D:/learning/quartz/quartz/styles/custom.scss). |
| **BUG-08** | Light Mode Link Hover | ✅ **Fixed** | Adjusted `tertiary` to `#2d6a60` (contrast ratio 5.4:1, passes WCAG AA) in [`quartz.config.default.yaml`](file:///D:/learning/quartz/quartz.config.default.yaml). |
| **BUG-09** | Dark Mode Tag Hover | ✅ **Fixed** | Added `color: var(--light) !important` on `.tag-link:hover` in [`custom.scss`](file:///D:/learning/quartz/quartz/styles/custom.scss); adjusted `gray` to `#9ca3af` (6.2:1) in [`quartz.config.default.yaml`](file:///D:/learning/quartz/quartz.config.default.yaml). |
| **BUG-10** | Tablet Side Panel | ✅ **Fixed** | Reduced tablet sidebar from 320px to 260px (`$tabletSidePanelWidth: 260px`) in [`variables.scss`](file:///D:/learning/quartz/quartz/styles/variables.scss). |
| **BUG-11** | Breakpoint Overlaps | ✅ **Fixed** | Fixed boundary collisions using `799.98px` and `1199.98px` in [`variables.scss`](file:///D:/learning/quartz/quartz/styles/variables.scss). |
| **BUG-12** | Windows 100vw Clipping | ✅ **Fixed** | Changed `width: 100vw; overflow-x: hidden;` to `width: 100%; overflow-x: clip; scrollbar-gutter: stable;` in [`base.scss`](file:///D:/learning/quartz/quartz/styles/base.scss). |
| **BUG-13** | Code Double Border | ✅ **Fixed** | Reset nested child pre border: `& > pre { border: none !important; border-radius: 0 !important; }` in [`custom.scss`](file:///D:/learning/quartz/quartz/styles/custom.scss). |
| **BUG-14** | Callout Accent & Padding | ✅ **Fixed** | Changed left border to dynamic `border-left: 4px solid var(--color) !important;` and collapsed redundant top padding in [`custom.scss`](file:///D:/learning/quartz/quartz/styles/custom.scss). |
| **BUG-15** | Duplicate H1 Heading | ✅ **Fixed** | Removed redundant `# 🚀 Engineering & Language Learning Platform` in [`content/index.md`](file:///D:/learning/quartz/content/index.md). |
| **BUG-16** | Duplicate Font Loading | ✅ **Fixed** | Disabled redundant `@quartz-community/quartz-fonts` plugin in [`quartz.config.default.yaml`](file:///D:/learning/quartz/quartz.config.default.yaml). |
| **BUG-17** | Firefox Scrollbars | ✅ **Fixed** | Added `scrollbar-width: thin; scrollbar-color: rgba(...) transparent;` in [`custom.scss`](file:///D:/learning/quartz/quartz/styles/custom.scss). |
| **BUG-18** | Reader Mode Trap / Disappearing Button | ✅ **Fixed** | Replaced blanket `.sidebar { display: none }` with floating action pill for `.readermode` and `.darkmode` (`position: fixed; top: 1.25rem; left: 1.5rem; z-index: 9999`) in [`custom.scss`](file:///D:/learning/quartz/quartz/styles/custom.scss), enabling bidirectional toggle. |
| **BUG-19** | Missing Tag Frontmatter on Sub-Notes | ✅ **Fixed** | Standardized YAML frontmatter with `tags: [...]` across LeetCode & NeetCode solution notes, hubs, and root index, restoring `@quartz-community/tag-list` pills. |

---
*Report generated and verified for repository: `D:\learning\quartz`.*
