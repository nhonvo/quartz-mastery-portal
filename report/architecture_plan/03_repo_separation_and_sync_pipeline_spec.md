# 📦 Quartz Separate Public Repository & Content Pipeline Architecture

> **Parent Architecture Spec**: `D:\learning\quartz\report\architecture_plan`  
> **Source Private Repo**: `github.com/nhonvo/learning` (Private Obsidian Vault & Practice Code)  
> **Target Public Repo**: `github.com/nhonvo/quartz-mastery-portal` (Public Web Documentation Portal)  
> **Target Features**: Giscus Discussions / Comments, Community Contributions, Public Vercel CDN  

---

## 1. Why Separate into a Dedicated Public Repository?

Currently, `learning` is a **private GitHub repository** (`nhonvo/learning`) hosting:
1. Private interview notes, personal goals, scratchpads, and uncommitted drafts.
2. Obsidian vault settings, local scripts, and sensitive configurations.

### The Problem with Comments (Giscus) in a Private Repo
Giscus utilizes **GitHub Discussions API** to authenticate users with their personal GitHub accounts and post comments under articles.
* In a private repository, **public visitors cannot authenticate to Giscus or view discussions**, causing the comments feature to permanently fail with `404 Not Found` or permission denied errors.
* Separating Quartz into a dedicated public repository (`nhonvo/quartz-mastery-portal`) instantly activates Giscus comments, public stars, community feedback, and seamless edge hosting.

---

## 2. End-to-End Content Sync & Deployment Architecture

```mermaid
flowchart TD
    subgraph Private Vault: D:\learning (Source of Truth)
        A["Private Repo: nhonvo/learning"]
        B["01_DSA, 02_Technical_Skills, 03_Languages"]
        C["Private Drafts, .obsidian, Scratchpads"]
    end

    subgraph Sync Script: sync_public_portal.js
        D["1. Filter sensitive paths (_archive, private drafts)"]
        E["2. Sanitize frontmatter & normalize wikilinks"]
        F["3. Sync into target standalone repo folder"]
    end

    subgraph Dedicated Public Repo: nhonvo/quartz-mastery-portal
        G["Standalone Quartz v5 Engine"]
        H["Clean content/ folder"]
        I["GitHub Discussions Enabled (Giscus)"]
        J["Vercel Edge CDN (Production)"]
    end

    A --> D
    B --> D
    C -. "Excluded by filter" .-> D
    D --> E --> F
    F --> G
    G --> H
    H --> I
    G --> J
```

---

## 3. Tool & MCP Strategy for End-to-End Execution

| Stage | Action | Primary Tool / MCP | Fallback / Shell |
| :--- | :--- | :--- | :--- |
| **Stage 1** | Create new GitHub public repository `quartz-mastery-portal` | `call_mcp_tool(github, create_repository)` | `gh repo create nhonvo/quartz-mastery-portal --public` |
| **Stage 2** | Initialize standalone git repo at `d:\learning-portal` or `d:\quartz-portal` | `run_command(git init)` | Native PowerShell |
| **Stage 3** | Clone Quartz engine & set upstream | `run_command(git clone ...)` | Native PowerShell |
| **Stage 4** | Build Automated Sync Script (`scripts/sync_public_portal.js`) | `write_to_file` | Node.js File System |
| **Stage 5** | Enable & Configure Giscus Discussions | `replace_file_content(quartz.config.default.yaml)` | GitHub UI / Discussions |
| **Stage 6** | Connect Public Repo to Vercel CDN | Vercel CLI / Webhook | `vercel link` |

---

## 4. Automated Sync Script Specification (`scripts/sync_public_portal.js`)

```javascript
/**
 * Automated Content Sync Pipeline: Private Learning Vault -> Public Quartz Portal
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const SOURCE_DIR = "D:\\learning";
const TARGET_DIR = "D:\\quartz-mastery-portal"; // Standalone public repo

const SYNC_TRACKS = [
  "01_DSA",
  "02_Technical_Skills",
  "03_Languages"
];

const BLACKLIST = [
  "_archive_extract",
  ".vs",
  ".obsidian",
  "private_scratchpad.md",
  "salary_negotiation_private.md"
];

export function runSyncPipeline() {
  console.log("🚀 Starting incremental content synchronization...");
  // 1. Rsync / Copy files with exclusion filter
  // 2. Validate frontmatter integrity
  // 3. Git commit & push to public repo origin main
  // 4. Trigger instant Vercel CDN deployment
}
```
