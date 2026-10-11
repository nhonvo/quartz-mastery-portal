import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export const CodeEnhancer: QuartzComponent = () => {
  return null
}

CodeEnhancer.css = `
.code-block-wrapper {
  position: relative;
  margin: 1.25rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--lightgray);
  background: var(--light);
}

.code-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.35rem 0.75rem;
  background: color-mix(in srgb, var(--lightgray) 45%, var(--light));
  border-bottom: 1px solid color-mix(in srgb, var(--lightgray) 80%, transparent);
  font-size: 0.75rem;
  font-family: var(--codeFont);
}

.code-lang-tag {
  font-weight: 600;
  color: var(--secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.code-copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--lightgray) 90%, transparent);
  border-radius: 4px;
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  color: var(--darkgray);
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    width: 12px;
    height: 12px;
  }

  &:hover {
    background: var(--light);
    color: var(--secondary);
    border-color: var(--secondary);
  }

  &.copied {
    background: rgba(16, 185, 129, 0.15);
    border-color: #10b981;
    color: #059669;
  }
}
`

CodeEnhancer.afterDOMLoaded = `
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
`

export default (() => CodeEnhancer) satisfies QuartzComponentConstructor
