# 🕸️ Deep Graph Feature Review & Single-Node Isolation Fix Spec

> **Parent Architecture Spec**: `D:\learning\quartz\report\architecture_plan`  
> **Target Files**: `quartz.config.default.yaml`, `quartz/quartz/components/ObsidianGraphDock.tsx`, `quartz/quartz/styles/custom.scss`  

---

## 1. Problem Root-Cause Analysis

### 1.1 The "Single Node Island" Symptom
Learners viewing individual notes frequently see **only 1 single lonely node** sitting in the middle of the local graph canvas.

### 1.2 Root Causes Identified
1. **Local Graph `depth: 1` Limitation**:
   - In `quartz.config.default.yaml` line 174:
     ```yaml
     localGraph:
       depth: 1
     ```
   - If a note only has outbound wikilinks to notes that do not link back, or if a note was created recently with no direct outgoing/incoming links at depth 1, the D3 simulation resolves to a single node.
2. **`showTags: false`**:
   - In `quartz.config.default.yaml` lines 181 & 194:
     ```yaml
     showTags: false
     ```
   - By hiding tags from the graph, notes that share identical tags (e.g. `#dsa`, `#leetcode`, `#system-design`, `#japanese`) cannot connect to each other via their shared tag hubs! This creates dozens of disconnected single-node islands.
3. **Folder MOC & Parent Node Back-Propagation**:
   - Many leaf notes (e.g. `01.Duplicate-Integer/index.md`) do not explicitly reference their parent MOC or sibling patterns, isolating them from the main knowledge clusters.
4. **Empty Graph Canvas Real-Estate**:
   - When a note has 0 or 1 node, the local graph takes up 250px-350px of empty space in the right sidebar, giving a broken or incomplete impression.

---

## 2. Solution Architecture

### 2.1 Increase Local Graph Contextual Depth to 2
Set `depth: 2` for `localGraph`. This pulls in 2nd-degree neighbors (e.g., if Note A links to Pattern B, all other problems solving Pattern B appear in Note A's local graph), transforming isolated nodes into meaningful cluster maps.

### 2.2 Re-Enable Tag Hub Connections (`showTags: true` with Tag Blacklist)
Enable `showTags: true` so notes with shared tags naturally cluster together. Exclude trivial tags using `removeTags`:
```yaml
localGraph:
  depth: 2
  showTags: true
  removeTags: ["index", "overview", "portal", "note"]
```

### 2.3 Intelligent Empty/Single-Node Fallback UI
When the local graph contains $\le 1$ node:
- Render a helpful fallback overlay inside `.graph-outer`:
  ```html
  <div class="graph-island-hint">
    <span class="hint-icon">🌱</span>
    <p>Isolated Note</p>
    <small>Connect this note by adding [[wikilinks]] or tags.</small>
    <button class="suggest-links-btn" onclick="openGlobalGraph()">Explore Global Graph 🗺️</button>
  </div>
  ```
- Alternatively, auto-inject the parent directory node into the local neighborhood so the note always connects to its topic cluster.
