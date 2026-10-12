
document.addEventListener("nav", () => {
  setupMobileFloatBar();
});

function setupMobileFloatBar() {
  const bar = document.querySelector(".mobile-float-bar");
  if (!bar) return;

  // 1. Search Trigger
  const searchBtn = document.getElementById("float-search-trigger");
  if (searchBtn) {
    searchBtn.onclick = (e) => {
      e.preventDefault();
      const actualSearchBtn = document.querySelector(".search-button");
      if (actualSearchBtn) {
        actualSearchBtn.click();
      } else {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
      }
    };
  }

  // 2. TOC Trigger (Opens Mobile TOC Drawer)
  const tocBtn = document.getElementById("float-toc-trigger");
  if (tocBtn) {
    tocBtn.onclick = (e) => {
      e.preventDefault();
      if (typeof window.openMobileTOC === "function") {
        window.openMobileTOC();
      }
    };
  }

  // 3. Focus / Fullscreen Trigger
  const focusBtn = document.getElementById("float-focus-trigger");
  const exitFocusBtn = document.getElementById("exit-focus-btn");
  if (focusBtn) {
    focusBtn.onclick = (e) => {
      e.preventDefault();
      const isFocus = document.body.classList.toggle("focus-reading-mode");
      if (exitFocusBtn) {
        exitFocusBtn.classList.toggle("hidden", !isFocus);
      }
    };
  }

  // 4. Graph Trigger
  const graphBtn = document.getElementById("float-graph-trigger");
  if (graphBtn) {
    graphBtn.onclick = (e) => {
      e.preventDefault();
      if (typeof window.triggerGraphLoad === "function") {
        window.triggerGraphLoad();
      }
      const graphOuter = document.querySelector(".graph");
      if (graphOuter) {
        graphOuter.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
  }

  // 5. Tools & Settings Trigger (Opens Feature Menu)
  const toolsBtn = document.getElementById("float-tools-trigger");
  if (toolsBtn) {
    toolsBtn.onclick = (e) => {
      e.preventDefault();
      if (typeof window.openFeatureMenu === "function") {
        window.openFeatureMenu();
      }
    };
  }

  // 6. Top Trigger
  const topBtn = document.getElementById("float-top-trigger");
  if (topBtn) {
    topBtn.onclick = (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }

  // Hide float bar while scrolling down fast, show on scroll up
  let lastScrollY = window.scrollY;
  const onScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 150 && currentScrollY > lastScrollY + 10) {
      bar.classList.add("float-hidden");
    } else if (currentScrollY < lastScrollY - 8) {
      bar.classList.remove("float-hidden");
    }
    lastScrollY = currentScrollY;
  };

  window.removeEventListener("scroll", window._floatBarScrollHandler);
  window._floatBarScrollHandler = onScroll;
  window.addEventListener("scroll", onScroll, { passive: true });
}


(()=>{
  const STORAGE_KEY_SOLVED = "graphmind_solved_notes";
  const STORAGE_KEY_REVIEW = "graphmind_review_notes";

  const getStorageSet = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? new Set(JSON.parse(data)) : new Set();
    } catch {
      return new Set();
    }
  };

  const saveStorageSet = (key, set) => {
    try {
      localStorage.setItem(key, JSON.stringify([...set]));
    } catch {}
  };

  const initHUD = () => {
    const hud = document.querySelector(".mastery-hud-container");
    if (!hud) return;

    const slug = hud.getAttribute("data-slug");
    if (!slug) return;

    const solvedSet = getStorageSet(STORAGE_KEY_SOLVED);
    const reviewSet = getStorageSet(STORAGE_KEY_REVIEW);

    const statusBtn = hud.querySelector("#hud-toggle-status");
    const reviewBtn = hud.querySelector("#hud-toggle-review");
    const statusText = hud.querySelector(".status-text");
    const countSolved = document.querySelector(".count-solved");
    const countReview = document.querySelector(".count-review");

    const updateTicker = () => {
      const currentSolved = getStorageSet(STORAGE_KEY_SOLVED).size;
      const currentReview = getStorageSet(STORAGE_KEY_REVIEW).size;
      if (countSolved) countSolved.textContent = currentSolved;
      if (countReview) countReview.textContent = currentReview;
    };

    const updateStatusUI = (solved) => {
      if (!statusBtn) return;
      if (solved) {
        statusBtn.classList.add("is-solved");
        if (statusText) statusText.textContent = "Solved";
      } else {
        statusBtn.classList.remove("is-solved");
        if (statusText) statusText.textContent = "Unsolved";
      }
    };

    const updateReviewUI = (review) => {
      if (!reviewBtn) return;
      if (review) {
        reviewBtn.classList.add("is-review");
      } else {
        reviewBtn.classList.remove("is-review");
      }
    };

    updateStatusUI(solvedSet.has(slug));
    updateReviewUI(reviewSet.has(slug));
    updateTicker();

    if (statusBtn && !statusBtn._bound) {
      statusBtn._bound = true;
      statusBtn.addEventListener("click", () => {
        const set = getStorageSet(STORAGE_KEY_SOLVED);
        const willSolve = !set.has(slug);
        if (willSolve) set.add(slug);
        else set.delete(slug);
        saveStorageSet(STORAGE_KEY_SOLVED, set);
        updateStatusUI(willSolve);
        updateTicker();
      });
    }

    if (reviewBtn && !reviewBtn._bound) {
      reviewBtn._bound = true;
      reviewBtn.addEventListener("click", () => {
        const set = getStorageSet(STORAGE_KEY_REVIEW);
        const willReview = !set.has(slug);
        if (willReview) set.add(slug);
        else set.delete(slug);
        saveStorageSet(STORAGE_KEY_REVIEW, set);
        updateReviewUI(willReview);
        updateTicker();
      });
    }
  };

  document.addEventListener("DOMContentLoaded", initHUD);
  document.addEventListener("nav", initHUD);
  initHUD();
})();


(()=>{
  const initCodeBlocks = () => {
    const preBlocks = document.querySelectorAll("pre:not(.enhanced-code)");
    preBlocks.forEach((pre) => {
      pre.classList.add("enhanced-code");
      const code = pre.querySelector("code");
      if (!code) return;

      // Extract language
      const langClass = Array.from(code.classList).find(c => c.startsWith("language-") || c.startsWith("lang-"));
      let lang = "code";
      if (langClass) {
        lang = langClass.replace(/^(language-|lang-)/, "");
      }

      // Create header bar
      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";
      
      const headerBar = document.createElement("div");
      headerBar.className = "code-header-bar";
      
      const langTag = document.createElement("span");
      langTag.className = "code-lang-tag";
      langTag.textContent = lang;

      const copyBtn = document.createElement("button");
      copyBtn.className = "code-copy-btn";
      copyBtn.setAttribute("aria-label", "Copy code snippet");
      copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> <span>Copy</span>';

      copyBtn.addEventListener("click", async () => {
        const textToCopy = code.innerText || code.textContent || "";
        try {
          await navigator.clipboard.writeText(textToCopy);
          copyBtn.classList.add("copied");
          copyBtn.querySelector("span").textContent = "Copied!";
          setTimeout(() => {
            copyBtn.classList.remove("copied");
            copyBtn.querySelector("span").textContent = "Copy";
          }, 2000);
        } catch (err) {
          console.error("Clipboard copy failed", err);
        }
      });

      headerBar.appendChild(langTag);
      headerBar.appendChild(copyBtn);

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(headerBar);
      wrapper.appendChild(pre);
    });
  };

  document.addEventListener("DOMContentLoaded", initCodeBlocks);
  document.addEventListener("nav", initCodeBlocks);
  initCodeBlocks();
})();


document.addEventListener("nav", () => {
  setupObsidianGraph();
});

function setupObsidianGraph() {
  const inspector = document.getElementById("graph-node-inspector");
  const closeBtn = document.getElementById("close-inspector-btn");
  const sideViewBtn = document.getElementById("inspector-sideview-btn");
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
    controls.innerHTML = `
      <div class="graph-legend-group">
        <span class="legend-chip"><span class="legend-dot dsa"></span>DSA</span>
        <span class="legend-chip"><span class="legend-dot arch"></span>Arch</span>
        <span class="legend-chip"><span class="legend-dot lang"></span>Lang</span>
        <span class="legend-chip"><span class="legend-dot tag"></span>Tag</span>
      </div>
      <div style="display:flex;gap:0.3rem;align-items:center;">
        <button id="toggle-arrows-btn" class="graph-toggle-btn active" title="Toggle Directed Arrows">⇄ Arrows</button>
        <button id="toggle-sideview-btn" class="graph-toggle-btn" title="Toggle Obsidian Side-View Dock">◨ Side-View</button>
      </div>
    `;
    graphOuter.parentElement.insertBefore(controls, graphOuter);

    const arrowBtn = controls.querySelector("#toggle-arrows-btn");
    if (arrowBtn) {
      arrowBtn.onclick = () => {
        window.__GRAPH_ARROWS__ = window.__GRAPH_ARROWS__ === false ? true : false;
        arrowBtn.classList.toggle("active", window.__GRAPH_ARROWS__ !== false);
      };
    }

    const sideBtn = controls.querySelector("#toggle-sideview-btn");
    if (sideBtn) {
      sideBtn.onclick = () => {
        document.body.classList.toggle("graph-sideview-docked");
        sideBtn.classList.toggle("active", document.body.classList.contains("graph-sideview-docked"));
        window.dispatchEvent(new Event("resize"));
      };
    }
  }

  if (sideViewBtn) {
    sideViewBtn.onclick = () => {
      document.body.classList.toggle("graph-sideview-docked");
      window.dispatchEvent(new Event("resize"));
    };
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


document.addEventListener("nav", () => {
  setupMobileTOC();
});

function setupMobileTOC() {
  const modal = document.getElementById("mobile-toc-modal");
  const backdrop = document.getElementById("mobile-toc-backdrop");
  const closeBtn = document.getElementById("mobile-toc-close");
  const listEl = document.getElementById("mobile-toc-list");

  if (!modal || !listEl) return;

  const closeModal = () => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("mobile-no-scroll");
  };

  const openModal = () => {
    // Populate TOC from document headings
    listEl.innerHTML = "";
    const headings = Array.from(document.querySelectorAll("article h1, article h2, article h3, article h4"));

    if (headings.length === 0) {
      listEl.innerHTML = '<li class="mobile-toc-empty">No headings found on this page.</li>';
    } else {
      headings.forEach((h, idx) => {
        const text = (h.textContent || "").replace(/#$/, "").trim();
        if (!text) return;

        if (!h.id) {
          h.id = "heading-" + idx;
        }

        const level = parseInt(h.tagName.substring(1), 10) || 2;
        const li = document.createElement("li");
        li.className = "mobile-toc-item depth-" + (level - 1);

        const a = document.createElement("a");
        a.href = "#" + h.id;
        a.textContent = text;
        a.onclick = (e) => {
          e.preventDefault();
          closeModal();
          h.scrollIntoView({ behavior: "smooth", block: "start" });
          history.pushState(null, "", "#" + h.id);
        };

        li.appendChild(a);
        listEl.appendChild(li);
      });
    }

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("mobile-no-scroll");
  };

  window.openMobileTOC = openModal;
  window.closeMobileTOC = closeModal;

  if (backdrop) backdrop.onclick = closeModal;
  if (closeBtn) closeBtn.onclick = closeModal;

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}


document.addEventListener("nav", () => {
  setupFeatureMenu();
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

  const openMenu = () => {
    if (menuModal) {
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

  // Theme Toggle Button inside Menu
  const themeBtn = document.getElementById("menu-theme-btn");
  if (themeBtn) {
    themeBtn.onclick = () => {
      const darkmodeBtn = document.querySelector("button.darkmode");
      if (darkmodeBtn) darkmodeBtn.click();
      closeMenu();
    };
  }

  // Focus Mode Toggle Button inside Menu
  const focusBtn = document.getElementById("menu-focus-btn");
  const toggleFocus = () => {
    const isFocus = document.body.classList.toggle("focus-reading-mode");
    if (exitFocusBtn) {
      exitFocusBtn.classList.toggle("hidden", !isFocus);
    }
    closeMenu();
  };

  if (focusBtn) focusBtn.onclick = toggleFocus;
  if (exitFocusBtn) exitFocusBtn.onclick = toggleFocus;

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
          sessionStorage.clear();
        } catch (_) {}
        window.location.reload();
      }
    };
  }
}
