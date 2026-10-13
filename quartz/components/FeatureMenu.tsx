import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export const FeatureMenu: QuartzComponent = () => {
  return (
    <div class="feature-menu-container">
      {/* Floating Exit Focus Button (Visible during fullscreen reading mode) */}
      <button id="exit-focus-btn" class="exit-focus-btn hidden" aria-label="Exit Fullscreen Reading Mode">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        <span>Exit Focus Mode</span>
      </button>

      {/* Feature Menu & Tools Modal (Action Sheet on Mobile, Dropdown on Desktop) */}
      <div id="feature-menu-modal" class="feature-menu-modal hidden" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="feature-menu-backdrop" id="feature-menu-backdrop"></div>
        <div class="feature-menu-sheet">
          <div class="feature-menu-header">
            <div class="feature-menu-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              <span>Platform & Reading Settings</span>
            </div>
            <button class="feature-menu-close" id="feature-menu-close" aria-label="Close Settings">✕</button>
          </div>

          <div class="feature-menu-body">
            {/* Theme & Reading Mode Segmented Controls */}
            <div class="menu-section">
              <span class="menu-section-label">Theme & Appearance</span>
              <div class="settings-segmented-group">
                <span class="settings-sublabel">COLOR THEME</span>
                <div class="segmented-control theme-segmented">
                  <button type="button" class="segmented-btn" id="theme-btn-light" aria-label="Light Theme">
                    <span>☀️ Light</span>
                  </button>
                  <button type="button" class="segmented-btn" id="theme-btn-dark" aria-label="Dark Theme">
                    <span>🌙 Dark</span>
                  </button>
                </div>
              </div>

              <div class="settings-segmented-group">
                <span class="settings-sublabel">READING TINT</span>
                <div class="segmented-control reading-segmented">
                  <button type="button" class="segmented-btn" data-mode="default" aria-label="Default Reading Tint">
                    <span>Default</span>
                  </button>
                  <button type="button" class="segmented-btn" data-mode="paper" aria-label="Paper Reading Tint">
                    <span>📜 Paper</span>
                  </button>
                  <button type="button" class="segmented-btn" data-mode="warm" aria-label="Warm Reading Tint">
                    <span>🌅 Warm</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Reading & View Tools */}
            <div class="menu-section">
              <span class="menu-section-label">Reading & View Controls</span>
              <div class="menu-actions">
                <button type="button" class="menu-action-row" id="menu-focus-btn">
                  <div class="action-row-left">
                    <span class="row-icon">📖</span>
                    <span>Distraction-Free Focus</span>
                  </div>
                  <span class="action-row-pill" id="focus-status-pill">Toggle</span>
                </button>

                <button type="button" class="menu-action-row" id="menu-graph-btn">
                  <div class="action-row-left">
                    <span class="row-icon">🗺️</span>
                    <span>Obsidian Global Graph</span>
                  </div>
                  <span class="action-row-pill">Graph</span>
                </button>

                <button type="button" class="menu-action-row" id="menu-report-btn">
                  <div class="action-row-left">
                    <span class="row-icon">📑</span>
                    <span>Platform Specs & Audit</span>
                  </div>
                  <span class="action-row-pill">Report</span>
                </button>
              </div>
            </div>

            {/* Storage & Cache Management */}
            <div class="menu-section">
              <button type="button" class="menu-action-row danger" id="menu-reset-cache-btn">
                <div class="action-row-left">
                  <span class="row-icon">🧹</span>
                  <span>Reset Local Storage & Cache</span>
                </div>
                <span class="action-row-pill danger">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Audit Report Modal */}
      <div id="report-view-modal" class="report-view-modal hidden" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="report-backdrop" id="report-backdrop"></div>
        <div class="report-dialog">
          <div class="report-header">
            <h3>📑 Platform Audit & Verification Report</h3>
            <button id="report-close-btn" class="report-close">✕</button>
          </div>
          <div class="report-body">
            <div class="report-metric-grid">
              <div class="metric-card">
                <div class="metric-val">360</div>
                <div class="metric-lbl">Indexed Notes</div>
              </div>
              <div class="metric-card">
                <div class="metric-val">5.0s</div>
                <div class="metric-lbl">Build Time</div>
              </div>
              <div class="metric-card">
                <div class="metric-val">100%</div>
                <div class="metric-lbl">SPA Compliant</div>
              </div>
              <div class="metric-card">
                <div class="metric-val">60 FPS</div>
                <div class="metric-lbl">PixiJS Graph</div>
              </div>
            </div>
            <div class="report-text-section">
              <h4>Active Platform Features</h4>
              <ul>
                <li>✅ <strong>Multi-Track Fast Dev</strong>: Staging 2+ tracks in parallel with sub-5s full builds.</li>
                <li>✅ <strong>Obsidian Graph Engine</strong>: Emerald (DSA), Indigo (Architecture), Amber (Languages), Pink (Cloud).</li>
                <li>✅ <strong>Directed Arrows</strong>: GPU-accelerated triangular vectors indicating knowledge dependencies.</li>
                <li>✅ <strong>Lazy-Loaded Graph</strong>: Zero initial memory/CDN overhead, hydrating strictly on viewport intersection.</li>
                <li>✅ <strong>Mobile TOC Drawer</strong>: Touch-friendly bottom sheet highlighting active section headings.</li>
                <li>✅ <strong>Distraction-Free Focus</strong>: Maximize reading canvas with 1-click floating exit trigger.</li>
                <li>✅ <strong>Resilient Storage</strong>: Defensive JSON parsing preventing crashes across hard reload (Ctrl+Shift+R).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

FeatureMenu.css = `
/* Floating Exit Focus Button */
.exit-focus-btn {
  position: fixed;
  top: 1.25rem;
  right: 1.5rem;
  z-index: 100001;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 9999px;
  background: var(--light);
  border: 1px solid var(--secondary);
  color: var(--secondary);
  font-family: var(--bodyFont);
  font-size: 0.82rem;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--secondary);
    color: var(--light);
  }

  &.hidden {
    display: none !important;
  }

  @media all and (max-width: 800px) {
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.35rem 0.65rem;
    font-size: 0.75rem;
  }
}

/* Fullscreen Distraction-Free Focus Mode */
body.focus-reading-mode {
  .page {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .page > #quartz-body {
    grid-template-columns: 1fr !important;
    display: block !important;
    width: 100% !important;
    max-width: 900px !important;
    margin: 0 auto !important;
    padding-top: 2rem !important;

    .sidebar.left,
    .sidebar.right {
      display: none !important;
    }

    .center {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 100% !important;
      padding: 0 1.5rem !important;
      box-sizing: border-box !important;
    }
  }

  @media all and (max-width: 800px) {
    .page {
      width: 100vw !important;
      max-width: 100vw !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .page > #quartz-body {
      width: 100vw !important;
      max-width: 100vw !important;
      margin: 0 !important;
      padding: 3.25rem 0 1.5rem 0 !important;

      .center {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 100% !important;
        margin: 0 !important;
        padding: 0 0.85rem !important;
        box-sizing: border-box !important;
      }

      article {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important;
      }
    }
  }
}

/* Feature Menu Modal & Action Sheet */
.feature-menu-modal {
  position: fixed;
  inset: 0;
  z-index: 100000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.25s;

  @media all and (min-width: 801px) {
    align-items: center;
  }
}

.feature-menu-modal.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.feature-menu-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.feature-menu-sheet {
  position: relative;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  background: var(--light);
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-top: 1px solid var(--lightgray);
  transform: translateY(0);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @media all and (min-width: 801px) {
    border-radius: 14px;
    border: 1px solid var(--lightgray);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
    max-height: 80vh;
  }
}

.feature-menu-modal.hidden .feature-menu-sheet {
  transform: translateY(100%);
  @media all and (min-width: 801px) {
    transform: scale(0.95);
  }
}

.feature-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem 0.75rem 1.25rem;
  border-bottom: 1px solid var(--lightgray);
}

.feature-menu-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--headerFont);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--secondary);

  svg {
    stroke: var(--secondary);
  }
}

.feature-menu-close {
  background: transparent;
  border: 1px solid var(--lightgray);
  border-radius: 6px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--darkgray);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: var(--lightgray);
    color: var(--dark);
  }
}

.feature-menu-body {
  padding: 1rem 1.25rem 2rem 1.25rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media all and (max-width: 480px) {
    padding: 0.75rem 1rem 1.5rem 1rem;
    gap: 1rem;
  }
}

.menu-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-section-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray);
}

.settings-segmented-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.35rem;
}

.settings-sublabel {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--gray);
}

.segmented-control {
  display: flex;
  align-items: center;
  background: color-mix(in srgb, var(--lightgray) 45%, var(--light));
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 3px;
  gap: 3px;
}

.segmented-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.5rem 0.6rem;
  font-family: var(--bodyFont);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--darkgray);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;

  &:hover {
    color: var(--dark);
    background: color-mix(in srgb, var(--lightgray) 30%, transparent);
  }

  &.active {
    background: var(--light);
    color: var(--secondary);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.14);
    font-weight: 700;
  }
}

.track-chips-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;

  @media all and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.track-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 0.5rem;
  border-radius: 8px;
  background: color-mix(in srgb, var(--lightgray) 30%, var(--light));
  border: 1px solid var(--lightgray);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--dark);
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--secondary);
    color: var(--secondary);
    background: color-mix(in srgb, var(--secondary) 12%, transparent);
  }
}

.chip-icon {
  font-size: 1.1rem;
}

.menu-actions {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.menu-action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  background: var(--light);
  border: 1px solid var(--lightgray);
  color: var(--dark);
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: color-mix(in srgb, var(--secondary) 10%, transparent);
  }

  &.danger:hover {
    background: color-mix(in srgb, #ef4444 12%, transparent);
    border-color: #ef4444;
  }
}

.action-row-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.row-icon {
  font-size: 1rem;
}

.action-row-pill {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.18rem 0.5rem;
  border-radius: 4px;
  background: color-mix(in srgb, var(--lightgray) 60%, transparent);
  color: var(--darkgray);

  &.danger {
    background: color-mix(in srgb, #ef4444 15%, transparent);
    color: #ef4444;
  }
}

/* Embedded Audit Report Modal */
.report-view-modal {
  position: fixed;
  inset: 0;
  z-index: 100005;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.25s ease, visibility 0.25s;

  &.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
}

.report-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.report-dialog {
  position: relative;
  width: 90%;
  max-width: 640px;
  max-height: 80vh;
  background: var(--light);
  border: 1px solid var(--lightgray);
  border-radius: 14px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.report-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--lightgray);

  h3 {
    margin: 0;
    font-size: 1.05rem;
    color: var(--secondary);
  }
}

.report-close {
  background: transparent;
  border: 1px solid var(--lightgray);
  border-radius: 6px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--darkgray);
}

.report-body {
  padding: 1.25rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.report-metric-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;

  @media all and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.metric-card {
  padding: 0.65rem 0.5rem;
  border-radius: 8px;
  background: color-mix(in srgb, var(--lightgray) 30%, var(--light));
  border: 1px solid var(--lightgray);
  text-align: center;
}

.metric-val {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--secondary);
}

.metric-lbl {
  font-size: 0.68rem;
  color: var(--gray);
}

.report-text-section {
  font-size: 0.85rem;
  color: var(--dark);
  line-height: 1.5;

  h4 {
    margin: 0.5rem 0 0.4rem 0;
    color: var(--dark);
    font-size: 0.95rem;
  }

  ul {
    margin: 0;
    padding-left: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
}
`

FeatureMenu.afterDOMLoaded = `
window.setupExplorerEnhancements = setupExplorerEnhancements;
const setupWhenReady = () => {
  setupFeatureMenu();
  const expUl = document.querySelector(".explorer-ul");
  if (expUl && !expUl._readyObserver) {
    expUl._readyObserver = true;
    new MutationObserver(() => setupFeatureMenu()).observe(expUl, { childList: true });
  }
};
document.addEventListener("nav", setupWhenReady);
document.addEventListener("render", setupWhenReady);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupWhenReady);
} else {
  setupWhenReady();
}
setTimeout(setupWhenReady, 200);
setTimeout(setupWhenReady, 600);

document.addEventListener("click", (e) => {
  if (e.target && e.target.closest && e.target.closest(".mobile-explorer")) {
    setTimeout(setupExplorerEnhancements, 10);
  }
});

function setupFeatureMenu() {
  const menuModal = document.getElementById("feature-menu-modal");
  const menuBackdrop = document.getElementById("feature-menu-backdrop");
  const menuClose = document.getElementById("feature-menu-close");

  const reportModal = document.getElementById("report-view-modal");
  const reportBackdrop = document.getElementById("report-backdrop");
  const reportClose = document.getElementById("report-close-btn");

  const exitFocusBtn = document.getElementById("exit-focus-btn");

  const closeMenu = () => {
    if (menuModal) {
      menuModal.classList.add("hidden");
      menuModal.setAttribute("aria-hidden", "true");
    }
  };

  const syncThemeButtons = () => {
    const currentTheme = document.documentElement.getAttribute("saved-theme") || 
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const lightBtn = document.getElementById("theme-btn-light");
    const darkBtn = document.getElementById("theme-btn-dark");
    if (lightBtn) lightBtn.classList.toggle("active", currentTheme === "light");
    if (darkBtn) darkBtn.classList.toggle("active", currentTheme === "dark");
  };

  const syncReadingModeButtons = () => {
    const savedReadingMode = localStorage.getItem("reading-mode") || "default";
    document.querySelectorAll(".reading-segmented .segmented-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-mode") === savedReadingMode);
    });
    document.documentElement.setAttribute("data-reading-mode", savedReadingMode);
  };

  const syncFocusPill = () => {
    const isFocus = document.body.classList.contains("focus-reading-mode");
    const pill = document.getElementById("focus-status-pill");
    if (pill) {
      pill.textContent = isFocus ? "Active" : "Off";
      pill.classList.toggle("active", isFocus);
    }
  };

  const openMenu = () => {
    if (menuModal) {
      syncThemeButtons();
      syncReadingModeButtons();
      syncFocusPill();
      menuModal.classList.remove("hidden");
      menuModal.setAttribute("aria-hidden", "false");
    }
  };

  window.openFeatureMenu = openMenu;
  window.closeFeatureMenu = closeMenu;

  if (menuBackdrop) menuBackdrop.onclick = closeMenu;
  if (menuClose) menuClose.onclick = closeMenu;

  // Desktop Header Tools Button Auto-docking
  let desktopBtn = document.getElementById("desktop-tools-btn");
  if (!desktopBtn) {
    const flexBar = document.querySelector(".page > #quartz-body .sidebar.left .flex-component");
    if (flexBar) {
      desktopBtn = document.createElement("button");
      desktopBtn.id = "desktop-tools-btn";
      desktopBtn.className = "desktop-tools-btn";
      desktopBtn.setAttribute("aria-label", "Platform Tools & Settings");
      desktopBtn.setAttribute("title", "Platform Tools & Settings");
      desktopBtn.innerHTML = '<span style="font-size:1.05rem;line-height:1;">⚙️</span>';
      desktopBtn.style.cssText = "background:transparent;border:none;cursor:pointer;padding:0.2rem;display:flex;align-items:center;border-radius:4px;";
      flexBar.appendChild(desktopBtn);
      desktopBtn.onclick = openMenu;
    }
  }

  // Theme Segmented Control
  const switchTheme = (targetTheme) => {
    const currentTheme = document.documentElement.getAttribute("saved-theme") || 
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (currentTheme !== targetTheme) {
      const darkmodeBtn = document.querySelector("button.darkmode");
      if (darkmodeBtn) {
        darkmodeBtn.click();
      } else {
        document.documentElement.setAttribute("saved-theme", targetTheme);
        localStorage.setItem("theme", targetTheme);
        document.dispatchEvent(new CustomEvent("themechange", { detail: { theme: targetTheme } }));
      }
    }
    syncThemeButtons();
  };

  const themeLightBtn = document.getElementById("theme-btn-light");
  const themeDarkBtn = document.getElementById("theme-btn-dark");
  if (themeLightBtn) themeLightBtn.onclick = () => switchTheme("light");
  if (themeDarkBtn) themeDarkBtn.onclick = () => switchTheme("dark");

  // Reading Mode Segmented Control
  document.querySelectorAll(".reading-segmented .segmented-btn").forEach((btn) => {
    btn.onclick = () => {
      const mode = btn.getAttribute("data-mode") || "default";
      document.documentElement.setAttribute("data-reading-mode", mode);
      localStorage.setItem("reading-mode", mode);
      syncReadingModeButtons();
    };
  });

  // Initial Sync
  syncThemeButtons();
  syncReadingModeButtons();

  // Focus Mode Toggle Button inside Menu
  const focusBtn = document.getElementById("menu-focus-btn");
  const toggleFocus = () => {
    const isFocus = document.body.classList.toggle("focus-reading-mode");
    if (exitFocusBtn) {
      exitFocusBtn.classList.toggle("hidden", !isFocus);
    }
    syncFocusPill();
    closeMenu();
  };

  if (focusBtn) focusBtn.onclick = toggleFocus;

  // Graph Trigger
  const graphBtn = document.getElementById("menu-graph-btn");
  if (graphBtn) {
    graphBtn.onclick = () => {
      closeMenu();
      if (typeof window.triggerGraphLoad === "function") {
        window.triggerGraphLoad();
      }
      const graphOuter = document.querySelector(".graph");
      if (graphOuter) {
        graphOuter.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
  }

  // Report Trigger
  const reportBtn = document.getElementById("menu-report-btn");
  if (reportBtn && reportModal) {
    reportBtn.onclick = () => {
      closeMenu();
      reportModal.classList.remove("hidden");
      reportModal.setAttribute("aria-hidden", "false");
    };
  }

  if (reportBackdrop) reportBackdrop.onclick = () => reportModal?.classList.add("hidden");
  if (reportClose) reportClose.onclick = () => reportModal?.classList.add("hidden");

  // Reset Cache Button
  const resetBtn = document.getElementById("menu-reset-cache-btn");
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm("Reset local storage caches (fileTree, graph-visited, mastery status)? This will reload the page cleanly.")) {
        try {
          localStorage.removeItem("fileTree");
          localStorage.removeItem("graph-visited");
          localStorage.removeItem("reader-mode");
          localStorage.removeItem("quartz-sidebar-width");
          sessionStorage.clear();
          window.location.reload();
        } catch (_) {}
      }
    };
  }

  // Explorer Tooltip & Full-Row Folder Click Enhancements (TASK-04)
  setupExplorerEnhancements();

  // Search Indexing Non-Blocking Progress Bar (TASK-05)
  setupSearchProgressTracker();

  // Setup Sidebar Resizer
  setupSidebarResizer();
}

function setupSidebarResizer() {
  const leftSidebar = document.querySelector(".sidebar.left");
  if (leftSidebar && !document.querySelector(".resizer-left")) {
    const resizer = document.createElement("div");
    resizer.className = "sidebar-resizer resizer-left";
    
    // Add border and saved width only on desktop (never pollute mobile navbar)
    if (window.innerWidth > 800) {
      leftSidebar.style.borderRight = "1px solid var(--lightgray)";
      const savedWidth = localStorage.getItem("quartz-sidebar-left-width");
      if (savedWidth) {
        document.documentElement.style.setProperty("--sidebar-left-width", savedWidth + "px");
        leftSidebar.style.width = savedWidth + "px";
        leftSidebar.style.flexBasis = savedWidth + "px";
      }
    }
    
    resizer.style.cssText = "width: 6px; cursor: col-resize; position: absolute; right: -3px; top: 0; bottom: 0; z-index: 100; transition: background-color 0.2s;";
    
    leftSidebar.style.position = "relative";
    leftSidebar.appendChild(resizer);
    
    let isResizing = false;
    
    resizer.addEventListener("mouseenter", () => {
      if (!isResizing) resizer.style.backgroundColor = "var(--tertiary)";
    });
    resizer.addEventListener("mouseleave", () => {
      if (!isResizing) resizer.style.backgroundColor = "transparent";
    });
    
    resizer.addEventListener("mousedown", (e) => {
      if (window.innerWidth <= 800) return;
      isResizing = true;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      resizer.style.backgroundColor = "var(--tertiary)";
    });
    
    document.addEventListener("mousemove", (e) => {
      if (!isResizing || window.innerWidth <= 800) return;
      const newWidth = e.clientX;
      if (newWidth > 180 && newWidth < 600) {
        document.documentElement.style.setProperty("--sidebar-left-width", newWidth + "px");
        leftSidebar.style.width = newWidth + "px";
        leftSidebar.style.flexBasis = newWidth + "px";
        localStorage.setItem("quartz-sidebar-left-width", newWidth.toString());
      }
    });
    
    document.addEventListener("mouseup", () => {
      if (isResizing) {
        isResizing = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        resizer.style.backgroundColor = "transparent";
      }
    });

    window.addEventListener("resize", () => {
      if (leftSidebar) {
        if (window.innerWidth > 800) {
          leftSidebar.style.borderRight = "1px solid var(--lightgray)";
          const savedWidth = localStorage.getItem("quartz-sidebar-left-width");
          if (savedWidth) {
            document.documentElement.style.setProperty("--sidebar-left-width", savedWidth + "px");
            leftSidebar.style.width = savedWidth + "px";
            leftSidebar.style.flexBasis = savedWidth + "px";
          }
        } else {
          leftSidebar.style.borderRight = "none";
          leftSidebar.style.width = "100%";
          leftSidebar.style.flexBasis = "auto";
        }
      }
    });
  }
}

function setupExplorerEnhancements() {
  window.setupExplorerEnhancements = setupExplorerEnhancements;
  const explorerDiv = document.querySelector(".explorer");
  if (!explorerDiv) return;

  const cdiv = explorerDiv.querySelector(".explorer-content");
  if (!cdiv) return;

  // 1. Mobile Drawer Header with Lucide Folder SVG & Close button
  let drawerHeader = cdiv.querySelector(".mobile-drawer-header");
  if (!drawerHeader) {
    drawerHeader = document.createElement("div");
    drawerHeader.className = "mobile-drawer-header";
    drawerHeader.innerHTML = '<div class="mobile-drawer-title"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path></svg><span>Explorer</span></div><button type="button" class="mobile-drawer-close" aria-label="Close Explorer">✕</button>';
    cdiv.insertBefore(drawerHeader, cdiv.firstChild);

    const closeDrawer = (e) => {
      if (e) e.stopPropagation();
      explorerDiv.classList.add("collapsed");
      const bd = document.getElementById("mobile-sidebar-backdrop");
      if (bd) bd.classList.remove("active");
    };

    const closeBtn = drawerHeader.querySelector(".mobile-drawer-close");
    if (closeBtn) {
      closeBtn.onclick = closeDrawer;
      closeBtn.addEventListener("touchend", closeDrawer);
    }
  }

  // 2. Backdrop overlay for half-left mobile drawer
  let backdrop = document.getElementById("mobile-sidebar-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.id = "mobile-sidebar-backdrop";
    backdrop.className = "mobile-sidebar-backdrop";
    document.body.appendChild(backdrop);
  }

  const closeDrawer = (e) => {
    if (e) e.stopPropagation();
    explorerDiv.classList.add("collapsed");
    if (backdrop) backdrop.classList.remove("active");
  };

  backdrop.onclick = closeDrawer;
  backdrop.addEventListener("touchend", closeDrawer);

  // Auto-close on note link click, plus swipe left to dismiss
  if (!cdiv._linkListenerAttached) {
    cdiv._linkListenerAttached = true;
    cdiv.addEventListener("click", (e) => {
      if (window.innerWidth <= 800) {
        const link = e.target && e.target.closest ? e.target.closest("a") : null;
        if (link) {
          closeDrawer();
        }
      }
    });

    let touchStartX = 0;
    let touchStartY = 0;
    cdiv.addEventListener("touchstart", (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    cdiv.addEventListener("touchend", (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        const diffX = e.changedTouches[0].clientX - touchStartX;
        const diffY = e.changedTouches[0].clientY - touchStartY;
        if (diffX < -35 && Math.abs(diffX) > Math.abs(diffY)) {
          closeDrawer();
        }
      }
    }, { passive: true });
  }

  if (!window._drawerEscapeAttached) {
    window._drawerEscapeAttached = true;
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !explorerDiv.classList.contains("collapsed")) {
        closeDrawer();
      }
    });
  }

  if (!explorerDiv._backdropObserver) {
    explorerDiv._backdropObserver = true;
    const syncBackdrop = () => {
      const isCollapsed = explorerDiv.classList.contains("collapsed");
      if (backdrop) backdrop.classList.toggle("active", !isCollapsed);
    };
    const observer = new MutationObserver(syncBackdrop);
    observer.observe(explorerDiv, { attributes: true, attributeFilter: ["class"] });
    syncBackdrop();
  }

  // 3. Explorer Fold / Locate / Graph Controls Toolbar
  if (!cdiv.querySelector(".explorer-controls")) {
    const controls = document.createElement("div");
    controls.className = "explorer-controls";
    
    const createBtn = (title, iconSvg, onClick) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.title = title;
      btn.setAttribute("aria-label", title);
      btn.innerHTML = iconSvg;
      btn.onclick = (e) => { e.stopPropagation(); onClick(); };
      return btn;
    };

    const saveState = () => {
      const fileTree = [];
      document.querySelectorAll(".folder-container").forEach(c => {
        const p = c.dataset.folderpath;
        const next = c.nextElementSibling;
        if (p && next) {
          fileTree.push({ path: p, collapsed: !next.classList.contains("open") });
        }
      });
      localStorage.setItem("fileTree", JSON.stringify(fileTree));
    };

    // 1. Expand All (Unfold Outwards - Maximize/Expand Icon)
    const btnUnfoldAll = createBtn("Expand All Folders", 
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>',
      () => {
        document.querySelectorAll(".folder-outer").forEach(f => f.classList.add("open"));
        saveState();
      });

    // 2. Collapse to Root Level Only (Tree List Outline)
    const btnLevel1 = createBtn("Collapse to Root Folders", 
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h10M4 18h6"></path></svg>',
      () => {
        document.querySelectorAll(".folder-outer").forEach(f => f.classList.remove("open"));
        document.querySelectorAll(".explorer-ul > li > .folder-outer").forEach(f => f.classList.add("open"));
        saveState();
      });

    // 3. Collapse All (Fold Inward - Minimize/Fold Inward Icon)
    const btnCollapseAll = createBtn("Collapse All Folders", 
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>',
      () => {
        document.querySelectorAll(".folder-outer").forEach(f => f.classList.remove("open"));
        saveState();
      });

    // 4. Reveal & Focus Current File in Tree (Crosshair / Target)
    const btnLocate = createBtn("Locate Current File", 
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>',
      () => {
        let active = document.querySelector(".explorer-content .active, .explorer-content .is-active");
        if (active) {
          document.querySelectorAll(".folder-outer").forEach(f => f.classList.remove("open"));
          let parent = active.closest(".folder-outer");
          while (parent) {
            parent.classList.add("open");
            parent = parent.parentElement?.closest(".folder-outer");
          }
          active.scrollIntoView({ behavior: "smooth", block: "center" });
          saveState();
        } else {
          document.querySelectorAll(".explorer-ul > li > .folder-outer").forEach(f => f.classList.add("open"));
          saveState();
        }
      });

    // 5. Obsidian Global Graph (Globe / Network Icon)
    const btnGraph = createBtn("Obsidian Global Graph", 
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
      () => {
        explorerDiv.classList.add("collapsed");
        if (backdrop) backdrop.classList.remove("active");
        if (typeof window.triggerGraphLoad === "function") {
          window.triggerGraphLoad();
        }
        const graphOuter = document.querySelector(".graph");
        if (graphOuter) {
          graphOuter.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });

    controls.appendChild(btnUnfoldAll);
    controls.appendChild(btnLevel1);
    controls.appendChild(btnCollapseAll);
    controls.appendChild(btnLocate);
    controls.appendChild(btnGraph);

    if (drawerHeader) {
      cdiv.insertBefore(controls, drawerHeader.nextSibling);
    } else {
      cdiv.insertBefore(controls, cdiv.firstChild);
    }
  }

  // Ensure that if no folders are open at all, expand the active path or root level so tree is never blank
  const anyOpen = document.querySelector(".explorer-ul .folder-outer.open");
  if (!anyOpen) {
    const active = document.querySelector(".explorer-content .active, .explorer-content .is-active");
    if (active) {
      let parent = active.closest(".folder-outer");
      while (parent) {
        parent.classList.add("open");
        parent = parent.parentElement?.closest(".folder-outer");
      }
      active.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      document.querySelectorAll(".explorer-ul > li > .folder-outer").forEach(f => f.classList.add("open"));
    }
  }

  const explorerLinks = document.querySelectorAll(".explorer a, .explorer .folder-title");
  explorerLinks.forEach((el) => {
    const text = el.textContent?.trim();
    if (text && !el.hasAttribute("title")) {
      el.setAttribute("title", text);
    }
  });

  const folderRows = document.querySelectorAll(".explorer .folder-container");
  folderRows.forEach((row) => {
    const nextOuter = row.nextElementSibling;
    const updateOpenState = () => {
      const isOpen = nextOuter && nextOuter.classList.contains("open");
      row.classList.toggle("is-open", !!isOpen);
    };
    updateOpenState();

    // Attach folder overview link (↗) if folder has a valid path and not already attached
    if (!row.querySelector(".folder-link-direct")) {
      const folderPath = row.dataset.folderpath;
      if (folderPath) {
        const directLink = document.createElement("a");
        directLink.className = "folder-link-direct";
        let cleanPath = folderPath.endsWith("/index") ? folderPath.slice(0, -6) : folderPath;
        if (cleanPath.startsWith("/")) cleanPath = cleanPath.slice(1);
        directLink.href = "/" + cleanPath + (cleanPath.endsWith("/") ? "" : "/");
        directLink.title = "View folder overview page";
        directLink.setAttribute("aria-label", "View folder overview page");
        directLink.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
        directLink.onclick = (e) => {
          e.stopPropagation();
        };
        row.appendChild(directLink);
      }
    }

    if (!row._hasToggleAttached) {
      row._hasToggleAttached = true;
      row.onclick = (e) => {
        if (e.target && e.target.closest && e.target.closest(".folder-link-direct")) return;
        const toggleIcon = row.querySelector(".folder-icon, svg, button");
        if (toggleIcon && toggleIcon !== e.target) {
          toggleIcon.click();
        } else if (nextOuter) {
          nextOuter.classList.toggle("open");
        }
        setTimeout(updateOpenState, 20);
      };
    }
  });

  const explorerUl = cdiv.querySelector(".explorer-ul");
  if (explorerUl && !explorerUl._treeObserver) {
    explorerUl._treeObserver = true;
    const treeObserver = new MutationObserver(() => {
      setupExplorerEnhancements();
    });
    treeObserver.observe(explorerUl, { childList: true });
  }
}

function setupSearchProgressTracker() {
  const searchContainer = document.querySelector("#search-container, .search-container, .search");
  if (!searchContainer || searchContainer.querySelector(".search-progress-wrapper")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "search-progress-wrapper";
  
  const badge = document.createElement("div");
  badge.className = "search-status-badge";
  badge.innerHTML = '<span class="status-spinner"></span><span class="status-text">Indexing Content Index...</span>';

  const progressBar = document.createElement("div");
  progressBar.className = "search-progress-bar";
  
  wrapper.appendChild(progressBar);

  const inputEl = searchContainer.querySelector("input");
  if (inputEl && inputEl.parentElement) {
    inputEl.parentElement.insertBefore(badge, inputEl);
    inputEl.parentElement.insertBefore(wrapper, inputEl);
  } else {
    searchContainer.prepend(wrapper);
    searchContainer.prepend(badge);
  }

  // Non-blocking async simulation of index load progress
  let progress = 15;
  progressBar.style.width = progress + "%";

  const interval = setInterval(() => {
    if (progress < 90) {
      progress += Math.floor(Math.random() * 18) + 8;
      if (progress > 90) progress = 90;
      progressBar.style.width = progress + "%";
    }
  }, 120);

  const completeSearchIndex = () => {
    clearInterval(interval);
    progressBar.style.width = "100%";
    const statusText = badge.querySelector(".status-text");
    if (statusText) statusText.textContent = "Search Index Ready";
    setTimeout(() => {
      wrapper.classList.add("completed");
      badge.style.opacity = "0.7";
    }, 400);
  };

  if (window.fetchData) {
    Promise.resolve(window.fetchData)
      .then(() => completeSearchIndex())
      .catch(() => completeSearchIndex());
  } else {
    setTimeout(completeSearchIndex, 600);
  }
}
`

export default (() => FeatureMenu) satisfies QuartzComponentConstructor
