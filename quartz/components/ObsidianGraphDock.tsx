import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export const ObsidianGraphDock: QuartzComponent = () => {
  return (
    <div id="obsidian-graph-dock" class="obsidian-graph-dock">
      {/* Node Inspector Card (Obsidian Quick Preview on Click) */}
      <div id="graph-node-inspector" class="graph-node-inspector hidden">
        <div class="inspector-header">
          <div class="inspector-badge">
            <span class="cluster-dot"></span>
            <span class="cluster-label">DSA Solution</span>
          </div>
          <button id="close-inspector-btn" class="inspector-close-btn" aria-label="Close Inspector">✕</button>
        </div>
        <div class="inspector-body">
          <h4 id="inspector-title" class="inspector-title">Note Preview</h4>
          <p id="inspector-slug" class="inspector-slug">04_dsa_solutions/leetcode_solutions</p>
          <div class="inspector-actions">
            <a id="inspector-open-btn" class="inspector-action-btn primary" href="#">📖 Open Note</a>
          </div>
        </div>
      </div>
    </div>
  )
}

ObsidianGraphDock.css = `
/* Obsidian Graph Dock & Inspector Styles */
.obsidian-graph-dock {
  position: relative;
  z-index: 1000;
}

/* Obsidian Local Graph Legend & Controls */
.graph-sideview-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0.4rem 0 0.6rem 0;
  padding: 0.35rem 0.5rem;
  background: color-mix(in srgb, var(--lightgray) 30%, var(--light));
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  font-size: 0.72rem;
  font-family: var(--bodyFont);
}

.graph-legend-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.legend-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--darkgray);
}

.legend-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
}

.legend-dot.dsa { background: #10b981; }
.legend-dot.arch { background: #6366f1; }
.legend-dot.lang { background: #f59e0b; }
.legend-dot.cloud { background: #ec4899; }
.legend-dot.tag { background: #8b5cf6; }

.graph-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
  border: 1px solid var(--lightgray);
  background: var(--light);
  color: var(--darkgray);
  font-size: 0.68rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.graph-toggle-btn:hover {
  background: var(--lightgray);
  color: var(--secondary);
}

.graph-toggle-btn.active {
  background: color-mix(in srgb, var(--secondary) 15%, transparent);
  border-color: var(--secondary);
  color: var(--secondary);
}

/* Node Inspector Card (Obsidian style) */
.graph-node-inspector {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  right: 0.5rem;
  background: color-mix(in srgb, var(--light) 95%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--lightgray);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  padding: 0.65rem 0.85rem;
  z-index: 1001;
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: auto;
}

.graph-node-inspector.hidden {
  opacity: 0;
  transform: translateY(8px);
  pointer-events: none;
}

.inspector-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.3rem;
}

.inspector-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--darkgray);
}

.cluster-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
}

.inspector-close-btn {
  background: transparent;
  border: none;
  color: var(--gray);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
}

.inspector-close-btn:hover {
  background: var(--lightgray);
  color: var(--dark);
}

.inspector-title {
  margin: 0 0 0.2rem 0;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.inspector-slug {
  margin: 0 0 0.5rem 0;
  font-size: 0.7rem;
  font-family: var(--codeFont);
  color: var(--gray);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.inspector-actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.inspector-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.22rem 0.65rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.inspector-action-btn.primary {
  background: var(--secondary);
  color: var(--light);
  border: 1px solid var(--secondary);
}

.inspector-action-btn.primary:hover {
  opacity: 0.9;
}

.inspector-action-btn.secondary {
  background: var(--light);
  color: var(--darkgray);
  border: 1px solid var(--lightgray);
}

.inspector-action-btn.secondary:hover {
  background: var(--lightgray);
  color: var(--dark);
}

/* Side-View Split Panel Mode (Obsidian Linked Pane) */
body.graph-sideview-docked {
  @media all and (min-width: 1200px) {
    .page > #quartz-body {
      grid-template-columns: 280px auto 380px !important;
    }

    .page > #quartz-body .sidebar.right {
      position: sticky !important;
      top: 0 !important;
      height: 100vh !important;
      overflow-y: auto !important;
      padding-top: 2rem !important;

      .graph > .graph-outer {
        height: 420px !important;
        border-color: var(--secondary) !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12) !important;
      }
    }
  }
}
`

ObsidianGraphDock.afterDOMLoaded = `
document.addEventListener("nav", () => {
  setupObsidianGraph();
});

function setupObsidianGraph() {
  const inspector = document.getElementById("graph-node-inspector");
  const closeBtn = document.getElementById("close-inspector-btn");
  const openBtn = document.getElementById("inspector-open-btn");

  if (closeBtn && inspector) {
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      inspector.classList.add("hidden");
    };
  }

  // Inject Controls & Legend into .graph
  const graphOuter = document.querySelector(".graph > .graph-outer");
  if (graphOuter && !graphOuter.querySelector(".graph-sideview-controls")) {
    const controls = document.createElement("div");
    controls.className = "graph-sideview-controls";
    controls.innerHTML = '<div class="graph-legend-group"><span class="legend-chip"><span class="legend-dot dsa"></span>DSA</span><span class="legend-chip"><span class="legend-dot arch"></span>Arch</span><span class="legend-chip"><span class="legend-dot lang"></span>Lang</span><span class="legend-chip"><span class="legend-dot tag"></span>Tag</span></div><div style="display:flex;gap:0.3rem;align-items:center;"><button id="toggle-arrows-btn" class="graph-toggle-btn active" title="Toggle Directed Arrows">⇄ Arrows</button></div>';
    graphOuter.parentElement.insertBefore(controls, graphOuter);

    const arrowBtn = controls.querySelector("#toggle-arrows-btn");
    if (arrowBtn) {
      arrowBtn.onclick = () => {
        window.__GRAPH_ARROWS__ = window.__GRAPH_ARROWS__ === false ? true : false;
        arrowBtn.classList.toggle("active", window.__GRAPH_ARROWS__ !== false);
      };
    }
  }

  // Keybinding Listeners for Ctrl+G (Obsidian Modal) & Ctrl+Shift+G (Local Popover)
  if (!window._obsidianGraphHotkeyInitialized) {
    window._obsidianGraphHotkeyInitialized = true;
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "g") {
        e.preventDefault();
        if (e.shiftKey) {
          // Local Graph Popover toggle
          document.body.classList.toggle("graph-sideview-docked");
        } else {
          // Obsidian Fullscreen Graph Modal toggle
          if (typeof window.triggerGraphLoad === "function") {
            window.triggerGraphLoad();
          }
          const graphOuter = document.querySelector(".graph");
          if (graphOuter) {
            graphOuter.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }
    });
  }

  // Hook into node selection
  window.onGraphNodeClick = (nodeId, nodeTitle, rawUrl) => {
    if (!inspector) return false;

    const titleEl = document.getElementById("inspector-title");
    const slugEl = document.getElementById("inspector-slug");
    const openEl = document.getElementById("inspector-open-btn");
    const dotEl = inspector.querySelector(".cluster-dot");
    const labelEl = inspector.querySelector(".cluster-label");

    if (titleEl) titleEl.textContent = nodeTitle || nodeId;
    if (slugEl) slugEl.textContent = nodeId;
    if (openEl) openEl.href = rawUrl;

    const s = (nodeId || "").toLowerCase();
    let domain = "Note", color = "#7b97aa";
    if (nodeId.startsWith("tags/")) { domain = "Tag"; color = "#8b5cf6"; }
    else if (s.includes("dsa") || s.includes("leetcode") || s.includes("grind") || s.includes("neetcode")) { domain = "DSA"; color = "#10b981"; }
    else if (s.includes("system") || s.includes("backend") || s.includes("arch") || s.includes("database") || s.includes("sql")) { domain = "Architecture"; color = "#6366f1"; }
    else if (s.includes("lang") || s.includes("english") || s.includes("japanese") || s.includes("mandarin")) { domain = "Languages"; color = "#f59e0b"; }
    else if (s.includes("cert") || s.includes("cloud") || s.includes("aws") || s.includes("docker")) { domain = "Cloud"; color = "#ec4899"; }

    if (dotEl) dotEl.style.background = color;
    if (labelEl) labelEl.textContent = domain;

    inspector.classList.remove("hidden");
    return true; // handled without hard navigation!
  };
}

`

export default (() => ObsidianGraphDock) satisfies QuartzComponentConstructor
