import fs from "fs"
import path from "path"
import { execSync } from "child_process"

const cwd = process.cwd()
const isFastMode = process.argv.includes("--fast") || !process.argv.includes("--full")
const targetDir = path.join(cwd, "quartz", isFastMode ? "content_fast" : "content")

let gitTrackedFiles = new Set()
try {
  console.log("[StageContent] Fetching git tracked files...")
  const gitOutput = execSync('git ls-files', { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 10 })
  gitTrackedFiles = new Set(gitOutput.split('\n').filter(Boolean))
} catch (e) {
  console.warn("[StageContent] Failed to get tracked files", e.message)
}

const ALL_TRACKS = [
  "01_DSA",
  "02_Technical_Skills",
  "03_Languages",
]

const FAST_FILES = [
  "01_DSA/01_theory_and_patterns/01_Basics/00_mastering_big_o_notation_algorithmic_complexity_analysis.md",
  "01_DSA/02_dsa_solutions/neetcode_solutions/01_Arrays_and_Hashing",
  "01_DSA/02_dsa_solutions/neetcode_solutions/02_Two_Pointers",
  "01_DSA/02_dsa_solutions/neetcode_solutions/index.md",
  "01_DSA/02_dsa_solutions/leetcode_solutions/01_Arrays_and_Hashing",
  "01_DSA/02_dsa_solutions/leetcode_solutions/index.md",
  "01_DSA/02_dsa_solutions/index.md",
  "01_DSA/03_interview_cake/01.Merging-Meeting-Times",
  "02_Technical_Skills/01_theory_and_concepts/02_backend_developer_master_roadmap_and_guide.md",
  "02_Technical_Skills/02_system_design_solutions/01.Design-TinyURL-URL-Shortener",
  "02_Technical_Skills/03_sql_solutions/leetcode_sql/01.Recyclable-and-Low-Fat-Products",
  "03_Languages/01_english/README.md",
  "03_Languages/03_japanese/README.md",
  "03_Languages/04_mandarin/README.md",
]

const EXCLUDED_DIRS = new Set(["bin", "obj", ".vs", ".git", "node_modules", "out", "dist", "_archive_extract", "src"])
const EXCLUDED_EXTS = new Set([".dll", ".exe", ".pdb", ".cache", ".user", ".suo"])

function shouldCopy(src) {
  const base = path.basename(src)
  const ext = path.extname(src).toLowerCase()
  if (EXCLUDED_DIRS.has(base)) return false
  if (EXCLUDED_EXTS.has(ext)) return false
  
  if (fs.statSync(src).isFile()) {
    const relPath = path.relative(cwd, src).replace(/\\/g, '/')
    if (gitTrackedFiles.size > 0 && !gitTrackedFiles.has(relPath)) {
      return false
    }
  }
  return true
}


function injectGitDates() {
  console.log(`[StageContent] Fetching Git dates from repository history...`)
  const dates = {}
  try {
    const gitOutput = execSync('git log --name-status --format="COMMIT|%cI"', { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 50 })
    let currentDate = ''
    
    for (const line of gitOutput.split('\n')) {
      if (line.startsWith('COMMIT|')) {
        currentDate = line.substring(7)
      } else if (line.trim()) {
        const parts = line.split('\t')
        if (parts.length >= 2) {
          const filePath = parts[parts.length - 1]
          if (!dates[filePath]) {
            dates[filePath] = { modified: currentDate, created: currentDate }
          } else {
            dates[filePath].created = currentDate
          }
        }
      }
    }
  } catch (e) {
    console.warn("[StageContent] Failed to get git dates:", e.message)
    return
  }

  console.log(`[StageContent] Injecting Git dates into frontmatter of staged files...`)
  let count = 0

  function processDirectory(currentDir) {
    if (!fs.existsSync(currentDir)) return
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)
      if (entry.isDirectory()) {
        processDirectory(fullPath)
      } else if (entry.name.endsWith('.md')) {
        const relativeToContent = path.relative(targetDir, fullPath).replace(/\\/g, '/')
        // The script renames some files to -Solution.md during processFolderIndices.
        // We need to check if the original filename existed in git dates.
        const originalName = relativeToContent.replace(/-Solution\.md$/i, '.md')
        
        const gitInfo = dates[relativeToContent] || dates[originalName]
        
        if (gitInfo) {
          let content = fs.readFileSync(fullPath, 'utf-8')
          let toInject = ""
          if (!/^date:\s/m.test(content)) toInject += `date: ${gitInfo.created}\n`
          if (!/^lastmod:\s/m.test(content)) toInject += `lastmod: ${gitInfo.modified}\n`
          
          if (toInject) {
            if (content.startsWith('---')) {
              content = content.replace(/^---\n/, `---\n${toInject}`)
            } else {
              content = `---\n${toInject}---\n\n${content}`
            }
            fs.writeFileSync(fullPath, content, 'utf-8')
            count++
          }
        }
      }
    }
  }

  processDirectory(targetDir)
  console.log(`[StageContent] ✅ Git dates injected successfully into ${count} files.`)
}

function cleanAndCopy() {
  const modeLabel = isFastMode ? "⚡ FAST UI DEV MODE (~14 files)" : "📦 FULL WORKSPACE MODE (Incremental Sync)"
  console.log(`[StageContent] Syncing quartz/content directory [${modeLabel}]...`)

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  } else if (isFastMode) {
    fs.rmSync(targetDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
    fs.mkdirSync(targetDir, { recursive: true })
  }

  const homePage = path.join(cwd, "index_home.md")
  if (fs.existsSync(homePage)) {
    fs.copyFileSync(homePage, path.join(targetDir, "index.md"))
  }

  let copiedCount = 0;
  
  function syncDir(srcDir, destDir) {
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    const srcEntries = fs.readdirSync(srcDir, { withFileTypes: true });
    const validNames = new Set();
    
    for (const entry of srcEntries) {
      const srcPath = path.join(srcDir, entry.name);
      const destPath = path.join(destDir, entry.name);
      
      if (!shouldCopy(srcPath)) continue;
      validNames.add(entry.name);
      
      if (entry.isDirectory()) {
        syncDir(srcPath, destPath);
      } else {
        let needsCopy = true;
        if (fs.existsSync(destPath)) {
          const srcStat = fs.statSync(srcPath);
          const destStat = fs.statSync(destPath);
          // If source was modified AFTER destination was last modified, we need to copy
          if (srcStat.mtimeMs <= destStat.mtimeMs) {
            needsCopy = false;
          }
        }
        
        if (needsCopy) {
          fs.copyFileSync(srcPath, destPath);
          copiedCount++;
        }
      }
    }

    // Clean up orphan files and directories in destination that no longer exist in source
    const destEntries = fs.readdirSync(destDir, { withFileTypes: true });
    for (const destEntry of destEntries) {
      if (!validNames.has(destEntry.name) && destEntry.name !== 'index.md') {
        const orphanPath = path.join(destDir, destEntry.name);
        try {
          if (destEntry.isDirectory()) {
            fs.rmSync(orphanPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(orphanPath);
          }
        } catch {}
      }
    }
  }

  if (isFastMode) {
    for (const relPath of FAST_FILES) {
      const src = path.join(cwd, relPath)
      const dest = path.join(targetDir, relPath)
      if (fs.existsSync(src)) {
        if (fs.statSync(src).isDirectory()) {
          syncDir(src, dest)
        } else {
          fs.mkdirSync(path.dirname(dest), { recursive: true })
          fs.copyFileSync(src, dest)
        }
      }
    }
    console.log(`[StageContent] ✅ Fast staging complete.`)
  } else {
    for (const track of ALL_TRACKS) {
      const srcTrack = path.join(cwd, track)
      const destTrack = path.join(targetDir, track)
      if (fs.existsSync(srcTrack)) {
        const startTime = Date.now()
        syncDir(srcTrack, destTrack)
        console.log(`[StageContent] Synced track: ${track} (${Date.now() - startTime}ms)`)
      }
    }
    console.log(`[StageContent] ✅ Incremental sync complete. Copied ${copiedCount} modified files.`)
  }

  // Inject git dates if files were actually copied or if content is missing
  if (copiedCount > 0 || !fs.existsSync(path.join(targetDir, "01_DSA"))) {
    injectGitDates()
  } else {
    console.log(`[StageContent] ⚡ No new files modified. Skipping Git dates.`)
  }
}

cleanAndCopy()
