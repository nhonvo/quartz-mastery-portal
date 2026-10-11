import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export const MasteryHUD: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  // Only render on actual individual problem solution notes with difficulty frontmatter
  const hasDifficulty = Boolean(fileData.frontmatter?.difficulty)
  const isProblemNote = (fileData.slug?.includes("leetcode_solutions/") || 
    fileData.slug?.includes("neetcode_solutions/") || 
    fileData.slug?.includes("07_interview_cake_solutions/") ||
    fileData.slug?.includes("leetcode_sql/")) && !fileData.slug?.endsWith("/index")

  if (!hasDifficulty && !isProblemNote) return null

  const difficulty = (fileData.frontmatter?.difficulty as string) || "Medium"
  const diffClass = difficulty.toLowerCase()
  const title = (fileData.frontmatter?.title as string) || "Problem"

  return (
    <div class="mastery-hud-container" data-slug={fileData.slug}>
      <div class="hud-pill-group">
        <span class={`hud-badge difficulty-${diffClass}`}>
          <span class="hud-dot"></span>
          {difficulty}
        </span>
        <button class="hud-btn hud-status-btn" id="hud-toggle-status" aria-label="Toggle Solved Status">
          <svg class="status-icon icon-unsolved" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          <svg class="status-icon icon-solved" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span class="status-text">Unsolved</span>
        </button>
        <button class="hud-btn hud-review-btn" id="hud-toggle-review" aria-label="Mark for Spaced Repetition">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span class="review-text">Review</span>
        </button>
      </div>
      <div class="hud-stats-ticker">
        <span class="ticker-item"><span class="ticker-count count-solved">0</span> Solved</span>
        <span class="ticker-sep">·</span>
        <span class="ticker-item"><span class="ticker-count count-review">0</span> Review Due</span>
      </div>
    </div>
  )
}

MasteryHUD.css = `
.mastery-hud-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  margin: 0.8rem 0 1.25rem 0;
  background: color-mix(in srgb, var(--lightgray) 25%, var(--light));
  border: 1px solid var(--lightgray);
  border-radius: 10px;
  backdrop-filter: blur(8px);
  font-family: var(--bodyFont);
}

.hud-pill-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hud-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.22rem 0.65rem;
  border-radius: 9999px;
  text-transform: capitalize;
}

.hud-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.difficulty-easy {
  background: color-mix(in srgb, #10b981 18%, transparent);
  color: #10b981;
  border: 1px solid color-mix(in srgb, #10b981 35%, transparent);
}
.difficulty-easy .hud-dot { background: #10b981; }

.difficulty-medium {
  background: color-mix(in srgb, #f59e0b 18%, transparent);
  color: #f59e0b;
  border: 1px solid color-mix(in srgb, #f59e0b 35%, transparent);
}
.difficulty-medium .hud-dot { background: #f59e0b; }

.difficulty-hard {
  background: color-mix(in srgb, #ef4444 18%, transparent);
  color: #ef4444;
  border: 1px solid color-mix(in srgb, #ef4444 35%, transparent);
}
.difficulty-hard .hud-dot { background: #ef4444; }

.hud-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  background: var(--light);
  border: 1px solid var(--lightgray);
  color: var(--darkgray);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--highlight);
    border-color: var(--secondary);
    color: var(--dark);
  }
}

.hud-status-btn.is-solved {
  background: color-mix(in srgb, #10b981 15%, var(--light));
  border-color: #10b981;
  color: #10b981;

  .icon-unsolved { display: none; }
  .icon-solved { display: inline-block; stroke: #10b981; }
}

.hud-status-btn:not(.is-solved) {
  .icon-unsolved { display: inline-block; stroke: var(--darkgray); }
  .icon-solved { display: none; }
}

.hud-review-btn.is-review {
  background: color-mix(in srgb, #f59e0b 15%, var(--light));
  border-color: #f59e0b;
  color: #f59e0b;

  svg {
    fill: #f59e0b;
    stroke: #f59e0b;
  }
}

.hud-stats-ticker {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: var(--gray);
}

.ticker-count {
  font-weight: 700;
  color: var(--dark);
}
`

MasteryHUD.afterDOMLoaded = `
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
`

export default (() => MasteryHUD) satisfies QuartzComponentConstructor
