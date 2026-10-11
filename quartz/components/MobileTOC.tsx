import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export const MobileTOC: QuartzComponent = () => {
  return (
    <div id="mobile-toc-modal" class="mobile-toc-modal hidden" aria-hidden="true" role="dialog" aria-modal="true">
      <div class="mobile-toc-backdrop" id="mobile-toc-backdrop"></div>
      <div class="mobile-toc-sheet">
        <div class="mobile-toc-header">
          <div class="mobile-toc-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span>Table of Contents</span>
          </div>
          <button class="mobile-toc-close" id="mobile-toc-close" aria-label="Close Table of Contents">✕</button>
        </div>
        <div class="mobile-toc-body">
          <ul class="mobile-toc-list" id="mobile-toc-list">
            {/* Populated dynamically from article headings */}
          </ul>
        </div>
      </div>
    </div>
  )
}

MobileTOC.css = `
.mobile-toc-modal {
  position: fixed;
  inset: 0;
  z-index: 100000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: auto;
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.25s;
}

.mobile-toc-modal.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.mobile-toc-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.mobile-toc-sheet {
  position: relative;
  width: 100%;
  max-width: 640px;
  max-height: 80vh;
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
}

.mobile-toc-modal.hidden .mobile-toc-sheet {
  transform: translateY(100%);
}

.mobile-toc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem 0.75rem 1.25rem;
  border-bottom: 1px solid var(--lightgray);
}

.mobile-toc-title {
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

.mobile-toc-close {
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
}

.mobile-toc-close:hover {
  background: var(--lightgray);
  color: var(--dark);
}

.mobile-toc-body {
  padding: 0.75rem 1.25rem 2rem 1.25rem;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.mobile-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.mobile-toc-item {
  display: flex;
  align-items: center;
}

.mobile-toc-item a {
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  font-size: 0.88rem;
  color: var(--dark);
  text-decoration: none;
  transition: all 0.15s ease;
  line-height: 1.4;

  &:hover {
    background: color-mix(in srgb, var(--secondary) 12%, transparent);
    color: var(--secondary);
  }

  &.active {
    background: color-mix(in srgb, var(--secondary) 18%, transparent);
    color: var(--secondary);
    font-weight: 600;
  }
}

.mobile-toc-item.depth-1 a {
  font-weight: 600;
  font-size: 0.95rem;
}

.mobile-toc-item.depth-2 a {
  padding-left: 1.25rem;
  font-size: 0.88rem;
}

.mobile-toc-item.depth-3 a {
  padding-left: 2rem;
  font-size: 0.82rem;
  color: var(--darkgray);
}

.mobile-toc-item.depth-4 a {
  padding-left: 2.75rem;
  font-size: 0.78rem;
  color: var(--gray);
}

.mobile-toc-empty {
  padding: 1.5rem;
  text-align: center;
  color: var(--gray);
  font-size: 0.9rem;
}
`

MobileTOC.afterDOMLoaded = `
setupMobileTOC();
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
`

export default (() => MobileTOC) satisfies QuartzComponentConstructor
