import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { execSync } from "child_process"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const QUARTZ_DIR = path.resolve(__dirname, "..")       // d:\learning\quartz
const ROOT_VAULT = path.resolve(__dirname, "../..")    // d:\learning

// Target public repository directory
const TARGET_DIR = process.env.PUBLIC_PORTAL_DIR || path.resolve("D:/quartz-mastery-portal")
const shouldPush = process.argv.includes("--push")
const isDryRun = process.argv.includes("--dry-run")

console.log("=========================================================================")
console.log("       QUARTZ MASTERY PORTAL - LEAK-PROOF SYNC ENGINE                    ")
console.log("=========================================================================")
console.log(`[Sync] Source Vault:     ${ROOT_VAULT}`)
console.log(`[Sync] Quartz Engine:    ${QUARTZ_DIR}`)
console.log(`[Sync] Target Repo:      ${TARGET_DIR}`)
console.log(`[Sync] Auto-Push:        ${shouldPush}`)
console.log(`[Sync] Dry Run:          ${isDryRun}`)
console.log("=========================================================================\n")

// Whitelisted educational content tracks from private vault
const WHITELISTED_TRACKS = [
  "01_DSA",
  "02_Technical_Skills",
  "03_Languages"
]

// Strict directory exclusion blacklist (Confidentiality & Runtime artifacts)
const EXCLUDED_DIRS = new Set([
  ".git",
  ".github",
  ".obsidian",
  ".agents",
  ".vs",
  ".idea",
  ".vscode",
  ".fleet",
  ".cache",
  "node_modules",
  "bin",
  "obj",
  "out",
  "dist",
  "templates",
  "_archive_extract",
  "scraped_question_banks",
  "astro_starlight",
  "algorithm_references",
  "00_Meta",
  "01_plans",
  "02_daily",
  "public",
  "public_fast",
  "content_fast",
  ".fast-content",
  "report"
])

// Strict file extensions blacklist
const EXCLUDED_EXTENSIONS = new Set([
  ".dll",
  ".exe",
  ".pdb",
  ".cache",
  ".user",
  ".suo",
  ".dgspec.json",
  ".cs",
  ".csproj",
  ".sln",
  ".env",
  ".env.local"
])

function isSafeFile(filePath) {
  const base = path.basename(filePath)
  const ext = path.extname(filePath).toLowerCase()

  if (base.startsWith(".") && !base.startsWith(".gitkeep")) return false
  if (EXCLUDED_DIRS.has(base)) return false
  if (EXCLUDED_EXTENSIONS.has(ext)) return false
  if (base.startsWith(".env")) return false
  if (base.toLowerCase().includes("secret") || base.toLowerCase().includes("private_key")) return false

  return true
}

function copyRecursive(src, dest, stats = { copied: 0, skipped: 0 }) {
  if (!fs.existsSync(src)) return stats

  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    const base = path.basename(src)
    if (EXCLUDED_DIRS.has(base) || (base.startsWith(".") && base !== "." && !base.startsWith(".git"))) {
      stats.skipped++
      return stats
    }

    if (!isDryRun && !fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }

    const entries = fs.readdirSync(src)
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry), stats)
    }
  } else {
    if (!isSafeFile(src)) {
      stats.skipped++
      return stats
    }

    const destDir = path.dirname(dest)
    if (!isDryRun) {
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })
      
      let needsCopy = true
      if (fs.existsSync(dest)) {
        const srcMtime = stat.mtimeMs
        const destMtime = fs.statSync(dest).mtimeMs
        if (srcMtime <= destMtime) {
          needsCopy = false
        }
      }

      if (needsCopy) {
        fs.copyFileSync(src, dest)
        stats.copied++
      }
    } else {
      stats.copied++
    }
  }
  return stats
}

/**
 * Ensures folder nodes exhibit expandable tree behavior with explicit child notes in Explorer.
 */
function processFolderIndices(dir) {
  if (!fs.existsSync(dir)) return

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const folderName = path.basename(dir)

  const mdFiles = entries.filter(e => !e.isDirectory() && e.name.endsWith(".md"))
  const hasIndex = mdFiles.some(e => e.name.toLowerCase() === "index.md" || e.name.toLowerCase() === "readme.md")
  const sameNameMd = mdFiles.find(e => e.name.toLowerCase() === `${folderName.toLowerCase()}.md`)

  if (sameNameMd && !hasIndex) {
    const originalPath = path.join(dir, sameNameMd.name)
    const childNoteName = `${sameNameMd.name.replace(/\.md$/i, "")}-Solution.md`
    const newChildPath = path.join(dir, childNoteName)
    const indexPath = path.join(dir, "index.md")

    if (!isDryRun) {
      fs.renameSync(originalPath, newChildPath)

      let content = fs.readFileSync(newChildPath, "utf-8")
      if (!content.includes("aliases:")) {
        const aliasString = `aliases:\n  - "${folderName}/${sameNameMd.name}"\n  - "${sameNameMd.name.replace(/\.md$/i, "")}"\n`
        if (content.startsWith("---")) {
          content = content.replace(/^---/, `---\n${aliasString}`)
        } else {
          content = `---\n${aliasString}---\n\n${content}`
        }
        fs.writeFileSync(newChildPath, content, "utf-8")
      }

      const cleanTitle = folderName.replace(/^\d+\./, "").replace(/[-_]/g, " ").trim()
      const indexContent = `---
title: "${cleanTitle || folderName}"
tags: [dsa, solution-index]
---

# 📁 ${cleanTitle || folderName}

- 📄 [[${childNoteName}|${cleanTitle} Solution]]
`
      fs.writeFileSync(indexPath, indexContent, "utf-8")
    }
  }

  for (const entry of entries) {
    if (entry.isDirectory() && !EXCLUDED_DIRS.has(entry.name)) {
      processFolderIndices(path.join(dir, entry.name))
    }
  }
}

async function run() {
  console.log(`[Step 1/5] Ensuring public destination repository directory exists...`)
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true })
  }

  console.log(`[Step 2/5] Synchronizing Quartz engine core files & configs...`)
  const engineFiles = [
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "globals.d.ts",
    "index.d.ts",
    ".node-version",
    ".npmrc",
    "quartz.config.default.yaml",
    "quartz.ts"
  ]

  for (const file of engineFiles) {
    const srcPath = path.join(QUARTZ_DIR, file)
    const destPath = path.join(TARGET_DIR, file)
    if (fs.existsSync(srcPath) && !isDryRun) {
      if (file === "quartz.config.default.yaml") {
        let yamlContent = fs.readFileSync(srcPath, "utf-8")
        // Rewrite baseUrl for GitHub Pages hosting with repository prefix
        yamlContent = yamlContent.replace(
          /baseUrl:\s*.*/,
          "baseUrl: nhonvo.github.io/quartz-mastery-portal"
        )
        fs.writeFileSync(destPath, yamlContent, "utf-8")
        console.log(`  -> Configured baseUrl for GitHub Pages: nhonvo.github.io/quartz-mastery-portal`)
      } else {
        fs.copyFileSync(srcPath, destPath)
      }
    }
  }

  // Copy engine directories (quartz/, scripts/)
  const engineDirs = ["quartz", "scripts"]
  for (const dir of engineDirs) {
    const srcDir = path.join(QUARTZ_DIR, dir)
    const destDir = path.join(TARGET_DIR, dir)
    console.log(`  -> Copying engine directory: ${dir}...`)
    
    // For quartz engine, exclude old content or build folders
    if (dir === "quartz") {
      if (!isDryRun && !fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })
      const entries = fs.readdirSync(srcDir)
      for (const entry of entries) {
        if (entry === "content" || entry === "public" || entry === ".quartz-cache") continue
        copyRecursive(path.join(srcDir, entry), path.join(destDir, entry))
      }
    } else {
      copyRecursive(srcDir, destDir)
    }
  }

  console.log(`[Step 3/5] Synchronizing whitelisted knowledge content to content/...`)
  const targetContentDir = path.join(TARGET_DIR, "content")
  if (!fs.existsSync(targetContentDir) && !isDryRun) {
    fs.mkdirSync(targetContentDir, { recursive: true })
  }

  // Copy home index
  const homeIndexSrc = path.join(ROOT_VAULT, "index_home.md")
  const homeIndexDest = path.join(targetContentDir, "index.md")
  if (fs.existsSync(homeIndexSrc) && !isDryRun) {
    fs.copyFileSync(homeIndexSrc, homeIndexDest)
    console.log(`  -> Synced home portal index: index_home.md -> content/index.md`)
  }

  // Copy tracks
  let totalContentStats = { copied: 0, skipped: 0 }
  for (const track of WHITELISTED_TRACKS) {
    const trackSrc = path.join(ROOT_VAULT, track)
    const trackDest = path.join(targetContentDir, track)
    if (fs.existsSync(trackSrc)) {
      console.log(`  -> Syncing track: ${track}...`)
      const stats = copyRecursive(trackSrc, trackDest)
      totalContentStats.copied += stats.copied
      totalContentStats.skipped += stats.skipped
    }
  }
  console.log(`  -> Content sync complete: ${totalContentStats.copied} files copied/updated.`)

  console.log(`[Step 4/5] Normalizing folder indices and tree nodes in target content...`)
  if (!isDryRun) {
    processFolderIndices(targetContentDir)
  }

  // Create standard .gitignore for public portal
  const gitignoreContent = `# Logs
logs
*.log
npm-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# Dependency directories
node_modules/

# Quartz build output
public/
public_fast/
.quartz-cache/

# OS metadata
.DS_Store
Thumbs.db
ehthumbs.db

# Environment variables
.env
.env*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
`
  if (!isDryRun) {
    fs.writeFileSync(path.join(TARGET_DIR, ".gitignore"), gitignoreContent, "utf-8")
  }

  // Create GitHub Actions deploy workflow
  const githubWorkflowsDir = path.join(TARGET_DIR, ".github", "workflows")
  if (!isDryRun) {
    fs.mkdirSync(githubWorkflowsDir, { recursive: true })
    const deployWorkflowContent = `name: Deploy Quartz to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install Dependencies
        run: npm ci

      - name: Build Quartz
        run: npx quartz build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-22.04
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`
    fs.writeFileSync(path.join(githubWorkflowsDir, "deploy.yml"), deployWorkflowContent, "utf-8")
  }

  // Create public repository README
  const readmeContent = `# Quartz Mastery Portal

Welcome to the public knowledge garden and mastery portal!

## 🌟 Features
- **Interactive Knowledge Graph**: D3-powered relationship graph connecting algorithms, system design architectures, and languages.
- **Dynamic Giscus Comments**: Powered by GitHub Discussions on this repository.
- **Multi-Theme Engine**: Light, Dark, Paper, and Warm reading modes with WCAG AAA link contrast.
- **Structured Tracks**:
  - \`01_DSA\`: NeetCode 150 & LeetCode algorithmic solutions and deep-dives.
  - \`02_Technical_Skills\`: Backend Architecture, Distributed Systems & Database queries.
  - \`03_Languages\`: Technical English, Japanese JLPT N5-N4 & Daily Mandarin.

## 🚀 Local Development
\`\`\`bash
npm install
npm run prebuild
npx quartz build --serve
\`\`\`
`
  if (!isDryRun) {
    fs.writeFileSync(path.join(TARGET_DIR, "README.md"), readmeContent, "utf-8")
  }

  console.log(`[Step 5/5] Git management & sync verification...`)
  if (!isDryRun) {
    try {
      const gitDir = path.join(TARGET_DIR, ".git")
      if (!fs.existsSync(gitDir)) {
        console.log("  -> Initializing git repository...")
        execSync(`git init -b main`, { cwd: TARGET_DIR, stdio: "inherit" })
        execSync(`git remote add origin https://github.com/nhonvo/quartz-mastery-portal.git`, { cwd: TARGET_DIR, stdio: "inherit" })
      }

      execSync(`git config core.longpaths true`, { cwd: TARGET_DIR, stdio: "inherit" })

      if (shouldPush) {
        console.log("  -> Staging files...")
        execSync(`git add .`, { cwd: TARGET_DIR, stdio: "inherit" })
        try {
          execSync(`git commit -m "feat(portal): sync educational tracks and configs from learning vault"`, { cwd: TARGET_DIR, stdio: "inherit" })
        } catch {
          console.log("  -> No new changes to commit.")
        }
        console.log("  -> Pushing to origin main...")
        execSync(`git push -u origin main --force`, { cwd: TARGET_DIR, stdio: "inherit" })
        console.log("  -> Push completed successfully!")
      } else {
        console.log("  -> Skipping git push (run with --push to automatically commit and push).")
      }
    } catch (e) {
      console.warn("  -> Git execution warning:", e.message)
    }
  }

  console.log("\n✅ Quartz Mastery Portal sync finished successfully!")
}

run().catch(err => {
  console.error("❌ Sync failed:", err)
  process.exit(1)
})
