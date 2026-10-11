import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export const MobileFloatBar: QuartzComponent = () => {
  return (
    <nav class="mobile-float-bar" aria-label="Reader Quick Actions">
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

      <button class="float-btn" id="float-tools-trigger" aria-label="Open Reader Settings">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        <span>Settings</span>
      </button>

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
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9998;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.65rem;
  background: color-mix(in srgb, var(--light) 92%, transparent);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--lightgray);
  border-radius: 9999px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
}

.mobile-float-bar.float-hidden {
  transform: translateY(140%);
  opacity: 0;
  pointer-events: none;
}

.float-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.35rem 0.75rem;
  min-width: 54px;
  border-radius: 999px;
  color: var(--darkgray);
  font-family: var(--bodyFont);
  font-size: 0.72rem;
  font-weight: 600;
  gap: 0.15rem;
  transition: all 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
    stroke: var(--darkgray);
    transition: transform 0.2s ease, stroke 0.2s ease;
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

@media all and (min-width: 801px) {
  .mobile-float-bar.float-hidden {
    transform: translateY(160%) !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
}

@media all and (max-width: 800px) {
  .mobile-float-bar {
    bottom: 1.25rem;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    gap: 0.35rem;
    padding: 0.35rem 0.65rem;
  }

  .mobile-float-bar.float-hidden {
    transform: translate(-50%, 160%) !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
}
`

MobileFloatBar.afterDOMLoaded = `
(function() {
  console.log("[MobileFloatBar] Initializing persistent event delegation & smart scroll hide...");

  // Smart Scroll-Hide: Hide floating bar on scroll down, show on scroll up
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener("scroll", function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const currentScrollY = window.scrollY;
        const bar = document.querySelector(".mobile-float-bar");

        if (bar) {
          // If scrolled down more than 70px and scrolling downwards -> hide bar
          if (currentScrollY > 70 && currentScrollY > lastScrollY + 6) {
            bar.classList.add("float-hidden");
          } 
          // If scrolling upwards or near top of page -> reveal bar
          else if (currentScrollY < lastScrollY - 6 || currentScrollY <= 70) {
            bar.classList.remove("float-hidden");
          }
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
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

  document.addEventListener("click", function(e) {
    const btn = e.target && e.target.closest ? e.target.closest(".float-btn, .exit-focus-btn, .search-button") : null;
    if (!btn) return;

    const id = btn.id;
    const isSearchBtn = btn.classList.contains("search-button") || id === "float-search-trigger";
    console.log("[MobileFloatBar] Clicked element:", id || btn.className);

    if (isSearchBtn) {
      e.preventDefault();
      toggleSearchModal();
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }));
    } else if (id === "float-toc-trigger") {
      e.preventDefault();
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
      e.preventDefault();
      const isFocus = document.body.classList.toggle("focus-reading-mode");
      console.log("[MobileFloatBar] Focus mode toggled:", isFocus);
      const exitFocusBtn = document.getElementById("exit-focus-btn");
      if (exitFocusBtn) {
        exitFocusBtn.classList.toggle("hidden", !isFocus);
      }
    } else if (id === "float-graph-trigger") {
      e.preventDefault();
      if (typeof window.triggerGraphLoad === "function") {
        window.triggerGraphLoad();
      }
      const graphOuter = document.querySelector(".graph, #graph-container, .graph-container, #obsidian-graph-dock");
      if (graphOuter) {
        graphOuter.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (typeof window.openFeatureMenu === "function") {
        window.openFeatureMenu();
      }
    } else if (id === "float-theme-trigger") {
      e.preventDefault();
      const darkmodeBtn = document.querySelector("button.darkmode");
      if (darkmodeBtn) darkmodeBtn.click();
    } else if (id === "float-tools-trigger") {
      e.preventDefault();
      if (typeof window.openFeatureMenu === "function") {
        window.openFeatureMenu();
      } else {
        const modal = document.getElementById("feature-menu-modal");
        if (modal) {
          modal.classList.remove("hidden");
          modal.setAttribute("aria-hidden", "false");
        }
      }
    } else if (id === "float-top-trigger") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // --- Mobile Sidebar Drawer Controller & Dynamic Enhancement ---
  function ensureMobileSidebar() {
    const leftSidebar = document.querySelector(".page > #quartz-body .sidebar.left");
    let backdrop = document.getElementById("mobile-sidebar-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.id = "mobile-sidebar-backdrop";
      backdrop.className = "mobile-sidebar-backdrop";
      if (leftSidebar) {
        leftSidebar.appendChild(backdrop);
      } else {
        document.body.appendChild(backdrop);
      }
      backdrop.addEventListener("click", function() {
        if (typeof window.closeMobileSidebar === "function") {
          window.closeMobileSidebar();
        }
      });
    } else if (leftSidebar && backdrop.parentElement !== leftSidebar) {
      leftSidebar.appendChild(backdrop);
    }

    const explorerContent = document.querySelector(".sidebar.left .explorer-content");
    if (explorerContent) {
      let header = explorerContent.querySelector(".mobile-drawer-header");
      if (!header) {
        header = document.createElement("div");
        header.className = "mobile-drawer-header";
        header.innerHTML = '<div class="mobile-drawer-title"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path></svg><span>Knowledge Explorer</span></div><button type="button" class="mobile-drawer-close" aria-label="Close Explorer">✕</button>';
        explorerContent.insertBefore(header, explorerContent.firstChild);
        const closeBtn = header.querySelector(".mobile-drawer-close");
        if (closeBtn) {
          closeBtn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (typeof window.closeMobileSidebar === "function") {
              window.closeMobileSidebar();
            }
          });
        }
      } else if (explorerContent.firstChild !== header) {
        explorerContent.insertBefore(header, explorerContent.firstChild);
      }
    }

    // Populate right action search button on mobile navbar if .mobile-only exists and is empty
    const mobileOnly = document.querySelector(".sidebar.left .mobile-only");
    if (mobileOnly && !mobileOnly.querySelector(".mobile-nav-search-btn")) {
      mobileOnly.innerHTML = '<button type="button" class="mobile-nav-search-btn" id="mobile-nav-search-btn" aria-label="Search Notes"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>';
      const searchBtn = mobileOnly.querySelector("#mobile-nav-search-btn");
      if (searchBtn) {
        searchBtn.addEventListener("click", function(e) {
          e.preventDefault();
          toggleSearchModal();
          window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }));
        });
      }
    }

    attachExplorerObserver();
  }

  window.openMobileSidebar = function() {
    const explorer = document.querySelector(".sidebar.left .explorer");
    if (!explorer) return;
    explorer.classList.remove("collapsed");
    explorer.setAttribute("aria-expanded", "true");
    const backdrop = document.getElementById("mobile-sidebar-backdrop") || document.querySelector(".mobile-sidebar-backdrop");
    if (backdrop) backdrop.classList.add("active");
    document.documentElement.classList.add("mobile-no-scroll");
    ensureMobileSidebar();
  };

  window.closeMobileSidebar = function() {
    const explorer = document.querySelector(".sidebar.left .explorer");
    if (!explorer) return;
    explorer.classList.add("collapsed");
    explorer.setAttribute("aria-expanded", "false");
    const backdrop = document.getElementById("mobile-sidebar-backdrop") || document.querySelector(".mobile-sidebar-backdrop");
    if (backdrop) backdrop.classList.remove("active");
    document.documentElement.classList.remove("mobile-no-scroll");
  };

  window.toggleMobileSidebar = function() {
    const explorer = document.querySelector(".sidebar.left .explorer");
    if (!explorer) return;
    if (explorer.classList.contains("collapsed")) {
      window.openMobileSidebar();
    } else {
      window.closeMobileSidebar();
    }
  };

  function attachExplorerObserver() {
    const explorer = document.querySelector(".sidebar.left .explorer");
    if (!explorer || explorer._hasObserver) return;
    explorer._hasObserver = true;

    const observer = new MutationObserver(function() {
      const isCollapsed = explorer.classList.contains("collapsed");
      const backdrop = document.getElementById("mobile-sidebar-backdrop") || document.querySelector(".mobile-sidebar-backdrop");
      if (backdrop) {
        backdrop.classList.toggle("active", !isCollapsed);
      }
      document.documentElement.classList.toggle("mobile-no-scroll", !isCollapsed);
      if (!isCollapsed) {
        ensureMobileSidebar();
      }
    });

    observer.observe(explorer, { attributes: true, attributeFilter: ["class"] });
  }

  // Auto-close drawer on mobile when clicking any document link
  document.addEventListener("click", function(e) {
    if (window.innerWidth <= 800) {
      const link = e.target && e.target.closest ? e.target.closest(".explorer-content a") : null;
      if (link) {
        window.closeMobileSidebar();
      }
    }
  });

  // Close drawer on Escape
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      window.closeMobileSidebar();
    }
  });

  // --- Global Swipe Gestures ---
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let isSwiping = false;
  const SWIPE_THRESHOLD = 45;

  function handleSwipeStart(x, y) {
    touchStartX = x;
    touchStartY = y;
    touchStartTime = Date.now();
    isSwiping = true;
  }

  function handleSwipeEnd(x, y) {
    if (!isSwiping) return;
    isSwiping = false;
    const diffX = x - touchStartX;
    const diffY = y - touchStartY;
    const elapsed = Date.now() - touchStartTime;

    // Horizontal swipe must be clearly horizontal
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > SWIPE_THRESHOLD) {
        const explorer = document.querySelector(".sidebar.left .explorer");
        const isSidebarOpen = explorer && !explorer.classList.contains("collapsed");

        // 1. Swipe Right: open left sidebar when starting on left side of viewport (< 160px)
        if (diffX > 0 && touchStartX < 160) {
          window.openMobileSidebar();
          return;
        }

        // 2. Swipe Left: close left sidebar when currently open
        if (diffX < 0 && isSidebarOpen) {
          window.closeMobileSidebar();
          return;
        }

        // 3. Swipe Left from right edge: open tools / feature menu
        if (diffX < 0 && touchStartX > window.innerWidth - 60) {
          if (typeof window.openFeatureMenu === "function") {
            window.openFeatureMenu();
          }
        }
      }
    } else {
      // Vertical swipe down: dismiss modal sheets (TOC, Feature menu)
      if (diffY > Math.abs(diffX) && diffY > 60) {
        const tocModal = document.getElementById("mobile-toc-modal");
        const featureModal = document.getElementById("feature-menu-modal");
        if (tocModal && !tocModal.classList.contains("hidden")) {
          if (typeof window.closeMobileTOC === "function") window.closeMobileTOC();
          else tocModal.classList.add("hidden");
        }
        if (featureModal && !featureModal.classList.contains("hidden")) {
          if (typeof window.closeFeatureMenu === "function") window.closeFeatureMenu();
          else featureModal.classList.add("hidden");
        }
      }
    }
  }

  document.addEventListener("touchstart", function(e) {
    if (e.touches && e.touches[0]) {
      handleSwipeStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  document.addEventListener("touchend", function(e) {
    if (e.changedTouches && e.changedTouches[0]) {
      handleSwipeEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
  }, { passive: true });

  document.addEventListener("mousedown", function(e) {
    handleSwipeStart(e.clientX, e.clientY);
  });

  document.addEventListener("mouseup", function(e) {
    handleSwipeEnd(e.clientX, e.clientY);
  });

  // Ensure sidebar structure on page load and SPA navigations
  document.addEventListener("nav", ensureMobileSidebar);
  document.addEventListener("render", ensureMobileSidebar);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureMobileSidebar);
  } else {
    ensureMobileSidebar();
  }

})();
`

export default (() => MobileFloatBar) satisfies QuartzComponentConstructor
