import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export const MobileFloatBar: QuartzComponent = () => {
  return (
    <nav class="mobile-float-bar" aria-label="Reader Quick Actions">
      {/* 1. Table of Contents */}
      <button class="float-btn" id="float-toc-trigger" aria-label="Open Table of Contents">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
        <span>TOC</span>
      </button>

      {/* 2. Navigation Sidebar / Files Drawer */}
      <button 
        type="button"
        class="float-btn" 
        id="float-sidebar-trigger" 
        title="Toggle Sidebar Navigation" 
        aria-label="Toggle Sidebar Navigation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <line x1="9" x2="9" y1="3" y2="21"></line>
        </svg>
        <span>Sidebar</span>
      </button>

      {/* 3. Global Knowledge Graph */}
      <button class="float-btn" id="float-graph-trigger" aria-label="Open Knowledge Graph View">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
        <span>Graph</span>
      </button>

      {/* 4. Fullscreen Focus Mode */}
      <button class="float-btn" id="float-focus-trigger" aria-label="Toggle Fullscreen Focus Reading Mode">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
        <span>Focus</span>
      </button>

      {/* 4. Settings / Tools */}
      <button class="float-btn" id="float-tools-trigger" aria-label="Open Reader Settings">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        <span>Tools</span>
      </button>

      {/* 4. Scroll To Top */}
      <button class="float-btn" id="float-top-trigger" aria-label="Scroll to Top">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
        <span>Top</span>
      </button>
    </nav>
  )
}

MobileFloatBar.css = `
.mobile-float-bar {
  position: fixed;
  bottom: 1.25rem;
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 3px 6px;
  background: color-mix(in srgb, var(--light) 92%, transparent);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--lightgray);
  border-radius: 9999px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
  will-change: transform, opacity;
  max-width: calc(100vw - 1.5rem);
}

.mobile-float-bar.float-hidden {
  transform: translate(-50%, 180%) !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

.float-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 3px 0;
  width: 48px;
  min-width: 48px;
  max-width: 48px;
  height: 42px;
  border-radius: 999px;
  color: var(--darkgray);
  font-family: var(--bodyFont);
  font-size: 0.64rem;
  font-weight: 600;
  line-height: 1;
  gap: 2px;
  box-sizing: border-box;
  text-align: center;
  flex: 0 0 48px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-user-select: none;
  transition: all 0.18s ease;

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    stroke: var(--darkgray);
    pointer-events: none !important;
    transition: transform 0.18s ease, stroke 0.18s ease;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    pointer-events: none !important;
  }

  &:hover,
  &:active {
    color: var(--secondary);
    background: color-mix(in srgb, var(--secondary) 12%, transparent);
    svg {
      stroke: var(--secondary);
      transform: translateY(-1px);
    }
  }
}

body.focus-reading-mode #float-focus-trigger {
  color: var(--secondary) !important;
  background: color-mix(in srgb, var(--secondary) 18%, transparent) !important;
  border-radius: 999px;
  svg {
    stroke: var(--secondary) !important;
  }
}

/* Float bar active in Normal Mode (Desktop), Tablet Mode, and Mobile Mode */
@media all and (min-width: 1200px) {
  .mobile-float-bar {
    bottom: 1.5rem;
    gap: 4px;
    padding: 4px 8px;
  }

  .float-btn {
    width: 56px;
    min-width: 56px;
    max-width: 56px;
    height: 46px;
    flex: 0 0 56px;
    font-size: 0.68rem;

    svg {
      width: 17px;
      height: 17px;
    }
  }
}
`

MobileFloatBar.afterDOMLoaded = `
(function() {
  if (window._mobileFloatBarInitialized) return;
  window._mobileFloatBarInitialized = true;
  console.log("[MobileFloatBar] Initializing persistent event delegation & smart scroll hide...");

  // Smart Scroll-Hide: Hide floating bar on scroll down, show on scroll up
  let lastScrollTop = 0;
  let accumulatedDelta = 0;
  let isTicking = false;
  const HIDE_SCROLL_DOWN_THRESHOLD = 15;
  const SHOW_SCROLL_UP_THRESHOLD = -15;
  const TOP_REVEAL_ZONE = 60;

  function updateFloatBarVisibility() {
    const currentScrollTop = Math.max(0, window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
    const bar = document.querySelector(".mobile-float-bar");

    if (!bar) {
      isTicking = false;
      return;
    }

    const windowHeight = window.innerHeight;
    const documentHeight = Math.max(
      document.body.scrollHeight || 0,
      document.documentElement.scrollHeight || 0
    );
    const isNearBottom = currentScrollTop + windowHeight >= documentHeight - 80;

    const delta = currentScrollTop - lastScrollTop;

    if (currentScrollTop <= TOP_REVEAL_ZONE || isNearBottom) {
      bar.classList.remove("float-hidden");
      accumulatedDelta = 0;
    } else {
      if ((delta > 0 && accumulatedDelta < 0) || (delta < 0 && accumulatedDelta > 0)) {
        accumulatedDelta = 0;
      }
      accumulatedDelta += delta;

      if (accumulatedDelta > HIDE_SCROLL_DOWN_THRESHOLD) {
        bar.classList.add("float-hidden");
      } else if (accumulatedDelta < SHOW_SCROLL_UP_THRESHOLD) {
        bar.classList.remove("float-hidden");
      }
    }

    lastScrollTop = currentScrollTop;
    isTicking = false;
  }

  function handleScroll() {
    if (!isTicking) {
      window.requestAnimationFrame(updateFloatBarVisibility);
      isTicking = true;
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("scroll", handleScroll, { passive: true });

  function resetFloatBar() {
    lastScrollTop = 0;
    accumulatedDelta = 0;
    const bar = document.querySelector(".mobile-float-bar");
    if (bar) bar.classList.remove("float-hidden");
  }
  document.addEventListener("nav", resetFloatBar);
  document.addEventListener("render", resetFloatBar);

  document.addEventListener("mousemove", function(e) {
    if (e.clientY >= window.innerHeight - 70) {
      const bar = document.querySelector(".mobile-float-bar");
      if (bar) bar.classList.remove("float-hidden");
    }
  }, { passive: true });

  function toggleSearchModal() {
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.querySelector(".search-bar, input[name='search']");
    if (!searchContainer) return;

    const isActive = searchContainer.classList.toggle("active");
    console.log("[MobileFloatBar] Search modal active:", isActive);
    if (isActive && searchInput) {
      setTimeout(function() {
        searchInput.focus();
      }, 50);
    }
  }

  // Close search when clicking backdrop or pressing Escape
  document.addEventListener("click", function(e) {
    const searchContainer = document.querySelector(".search-container.active");
    if (searchContainer && e.target === searchContainer) {
      searchContainer.classList.remove("active");
    }
  });

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      const searchContainer = document.querySelector(".search-container.active");
      if (searchContainer) searchContainer.classList.remove("active");
    }
  });

  function handleButtonAction(btn, e) {
    if (!btn) return;
    const id = btn.id;
    const isSearchBtn = btn.classList.contains("search-button") || id === "float-search-trigger";
    console.log("[MobileFloatBar] Action triggered for:", id || btn.className);

    if (isSearchBtn) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      const actualSearchBtn = document.querySelector(".page-header .search-button, .search .search-button");
      if (actualSearchBtn && btn !== actualSearchBtn) {
        actualSearchBtn.click();
      } else {
        toggleSearchModal();
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }));
      }
    } else if (id === "float-toc-trigger") {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      if (typeof window.openMobileTOC === "function") {
        window.openMobileTOC();
      } else {
        const modal = document.getElementById("mobile-toc-modal");
        if (modal) {
          modal.classList.remove("hidden");
          modal.setAttribute("aria-hidden", "false");
          document.documentElement.classList.add("mobile-no-scroll");
        } else {
          const tocEl = document.querySelector(".toc, #toc, article h1, article h2");
          if (tocEl) tocEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else if (id === "float-focus-trigger" || id === "exit-focus-btn") {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      const isFocus = document.body.classList.toggle("focus-reading-mode");
      console.log("[MobileFloatBar] Focus mode toggled:", isFocus);
      const exitFocusBtn = document.getElementById("exit-focus-btn");
      if (exitFocusBtn) {
        exitFocusBtn.classList.toggle("hidden", !isFocus);
      }
    } else if (id === "float-sidebar-trigger") {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      const isMobileOrTablet = window.innerWidth <= 1024 ||
        window.matchMedia("(max-width: 1024px)").matches ||
        document.querySelector("button.mobile-explorer")?.offsetParent !== null;

      if (isMobileOrTablet || typeof window.toggleMobileDrawer === "function") {
        if (typeof window.toggleMobileDrawer === "function") {
          window.toggleMobileDrawer();
        } else {
          const explorer = document.querySelector(".explorer");
          if (explorer) explorer.classList.toggle("collapsed");
          let backdrop = document.getElementById("mobile-sidebar-backdrop");
          if (!backdrop) {
            backdrop = document.createElement("div");
            backdrop.id = "mobile-sidebar-backdrop";
            backdrop.className = "mobile-sidebar-backdrop";
            document.body.appendChild(backdrop);
          }
          backdrop.classList.toggle("active");
          document.documentElement.classList.toggle("mobile-no-scroll");
        }
      } else {
        document.body.classList.toggle("sidebar-left-collapsed");
      }
    } else if (id === "float-graph-trigger") {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
      }
      if (typeof window.openGlobalGraph === "function") {
        window.openGlobalGraph();
      } else {
        const globalGraphBtn = document.querySelector(".global-graph-icon");
        if (globalGraphBtn) {
          globalGraphBtn.click();
        } else {
          window.dispatchEvent(new KeyboardEvent("keydown", { key: "g", ctrlKey: true, bubbles: true }));
        }
      }
    } else if (id === "float-theme-trigger") {
      if (e) e.preventDefault();
      const darkmodeBtn = document.querySelector("button.darkmode");
      if (darkmodeBtn) darkmodeBtn.click();
    } else if (id === "float-tools-trigger") {
      if (e) e.preventDefault();
      if (typeof window.openFeatureMenu === "function") {
        window.openFeatureMenu();
      } else {
        const modal = document.getElementById("feature-menu-modal");
        if (modal) {
          modal.classList.remove("hidden");
          modal.setAttribute("aria-hidden", "false");
          document.documentElement.classList.add("mobile-no-scroll");
        }
      }
    } else if (id === "float-top-trigger") {
      if (e) e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  let touchStartX = 0;
  let touchStartY = 0;
  let touchMoved = false;
  let lastTouchTime = 0;

  document.addEventListener("touchstart", function(e) {
    const btn = e.target && e.target.closest ? e.target.closest(".float-btn, .exit-focus-btn, .search-button") : null;
    if (btn && e.touches && e.touches[0]) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
    }
  }, { passive: true });

  document.addEventListener("touchmove", function(e) {
    if (e.touches && e.touches[0]) {
      if (Math.abs(e.touches[0].clientX - touchStartX) > 12 || Math.abs(e.touches[0].clientY - touchStartY) > 12) {
        touchMoved = true;
      }
    }
  }, { passive: true });

  document.addEventListener("touchend", function(e) {
    if (touchMoved) return;
    const btn = e.target && e.target.closest ? e.target.closest(".float-btn, .exit-focus-btn, .search-button") : null;
    if (!btn) return;
    lastTouchTime = Date.now();
    handleButtonAction(btn, e);
  }, { passive: false });

  document.addEventListener("click", function(e) {
    if (Date.now() - lastTouchTime < 450) {
      // Ignore synthesized ghost click following touch
      return;
    }
    const btn = e.target && e.target.closest ? e.target.closest(".float-btn, .exit-focus-btn, .search-button") : null;
    if (!btn) return;
    handleButtonAction(btn, e);
  });

})();
`

export default (() => MobileFloatBar) satisfies QuartzComponentConstructor
