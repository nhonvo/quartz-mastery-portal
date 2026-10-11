#!/usr/bin/env pwsh
# ============================================================
# Start-DependabotStudy.ps1
# Interactive Dependabot CLI Study Session
# ============================================================
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# ── Color helpers ────────────────────────────────────────────
function Write-Header($text) {
    Write-Host "`n$('─' * 60)" -ForegroundColor DarkCyan
    Write-Host "  $text" -ForegroundColor Cyan
    Write-Host "$('─' * 60)" -ForegroundColor DarkCyan
}
function Write-Q($n, $text) {
    Write-Host "`n  Q$n. " -ForegroundColor Yellow -NoNewline
    Write-Host $text -ForegroundColor White
}
function Write-A($text) {
    Write-Host "`n  ✅ " -ForegroundColor Green -NoNewline
    Write-Host $text -ForegroundColor Green
}
function Write-Wrong() {
    Write-Host "`n  ❌ Incorrect." -ForegroundColor Red
}
function Write-Hint($text) {
    Write-Host "  💡 Hint: $text" -ForegroundColor DarkYellow
}
function Pause-Next {
    Write-Host "`n  [Press ENTER for next question]" -ForegroundColor DarkGray
    Read-Host | Out-Null
}

# ── Flashcard data ───────────────────────────────────────────
$flashcards = @(
    @{ Q = "What are the 3 main Dependabot features?";
       A = "1. Alerts (notify CVEs)  2. Security Updates (auto-fix PRs)  3. Version Updates (keep deps current)" },
    @{ Q = "Which Dependabot feature requires a dependabot.yml file?";
       A = "Version Updates only. Alerts & Security Updates are enabled in repo Settings." },
    @{ Q = "What must be enabled BEFORE Dependabot can work?";
       A = "The Dependency Graph (Settings → Code Security and Analysis)" },
    @{ Q = "Where must dependabot.yml be placed?";
       A = "In the .github/ directory: .github/dependabot.yml" },
    @{ Q = "What are the 3 REQUIRED keys under each 'updates' entry?";
       A = "package-ecosystem, directory, schedule" },
    @{ Q = "What are the valid schedule.interval values?";
       A = "daily, weekly, monthly" },
    @{ Q = "How do you disable version update PRs without disabling security updates?";
       A = "Set open-pull-requests-limit: 0 in dependabot.yml" },
    @{ Q = "What does the 'groups' key do?";
       A = "Batches multiple dependency updates into a single PR to reduce noise" },
    @{ Q = "What package-ecosystem value is used for GitHub Actions?";
       A = "github-actions" },
    @{ Q = "What package-ecosystem value is used for Docker?";
       A = "docker" },
    @{ Q = "What package-ecosystem value is used for Python pip?";
       A = "pip" },
    @{ Q = "What package-ecosystem value is used for Terraform?";
       A = "terraform" },
    @{ Q = "What does CVE stand for?";
       A = "Common Vulnerabilities and Exposures — a unique ID for a security flaw" },
    @{ Q = "What does CVSS stand for and what is its range?";
       A = "Common Vulnerability Scoring System — scores 0.0 to 10.0" },
    @{ Q = "What is a Critical CVSS score range?";
       A = "9.0 – 10.0" },
    @{ Q = "What does EPSS stand for?";
       A = "Exploit Prediction Scoring System — probability a CVE is exploited in 30 days" },
    @{ Q = "What GitHub Action provides Dependabot PR metadata (update-type)?";
       A = "dependabot/fetch-metadata" },
    @{ Q = "What is the update-type value for a patch-level semver bump?";
       A = "version-update:semver-patch" },
    @{ Q = "What does the github/dependency-review-action do?";
       A = "Blocks PRs that introduce new vulnerable dependencies before they are merged" },
    @{ Q = "What is the recommended SLA for Critical vulnerabilities?";
       A = "Remediate within 7 days" },
    @{ Q = "What permissions does a workflow need to auto-merge Dependabot PRs?";
       A = "contents: write  AND  pull-requests: write" },
    @{ Q = "What are auto-triage rules?";
       A = "Rules that automatically dismiss/snooze Dependabot alerts to reduce false positives and alert fatigue" }
)

# ── Multiple choice quiz ──────────────────────────────────────
$quizQuestions = @(
    @{
        Q = "Dependabot Security Updates require which of the following to be configured?"
        Options = @("A) .github/dependabot.yml", "B) Dependency Graph enabled in Settings", "C) A GitHub Actions workflow", "D) A CODEOWNERS file")
        Answer = "B"
        Explanation = "Security Updates only need the Dependency Graph + Alerts enabled in repo settings. No dependabot.yml required."
    },
    @{
        Q = "Which YAML key batches multiple packages into a single Dependabot PR?"
        Options = @("A) ignore", "B) allow", "C) groups", "D) merge")
        Answer = "C"
        Explanation = "The 'groups' key lets you define named groups of packages that will be updated together in one PR."
    },
    @{
        Q = "A CVSS score of 8.7 corresponds to which severity level?"
        Options = @("A) Low", "B) Medium", "C) High", "D) Critical")
        Answer = "C"
        Explanation = "High = 7.0–8.9. Critical starts at 9.0. CVSS 8.7 = High severity."
    },
    @{
        Q = "You want Dependabot to update terraform modules in /infra/. Which directory value do you use?"
        Options = @("A) /", "B) ./infra", "C) /infra", "D) infra/")
        Answer = "C"
        Explanation = "Dependabot directory paths must start with /. Use '/infra' for a subdirectory."
    },
    @{
        Q = "Which GitHub event should trigger a Dependabot auto-merge workflow?"
        Options = @("A) push", "B) workflow_dispatch", "C) pull_request", "D) schedule")
        Answer = "C"
        Explanation = "Dependabot creates PRs, so 'pull_request' is the correct trigger. Check 'github.actor == dependabot[bot]' to scope it."
    },
    @{
        Q = "What does EPSS provide that CVSS does NOT?"
        Options = @("A) Severity score", "B) Probability of exploitation in the wild", "C) Patch availability", "D) Dependency graph")
        Answer = "B"
        Explanation = "EPSS predicts the probability (0-1) that a CVE will be exploited within 30 days. CVSS only scores severity."
    },
    @{
        Q = "Which Dependabot feature acts as a 'shift-left' gate to prevent vulnerable deps from being merged?"
        Options = @("A) Dependabot Alerts", "B) Dependabot Security Updates", "C) Dependency Review Action", "D) Auto-triage rules")
        Answer = "C"
        Explanation = "The Dependency Review Action (github/dependency-review-action) runs on PRs and blocks merges that would introduce new vulnerable dependencies."
    },
    @{
        Q = "Setting open-pull-requests-limit to 0 in dependabot.yml does what?"
        Options = @("A) Disables Dependabot entirely", "B) Disables only security update PRs", "C) Disables only version update PRs", "D) Enables unlimited PRs")
        Answer = "C"
        Explanation = "open-pull-requests-limit: 0 disables Version Update PRs only. Dependabot Security Updates still create PRs independently."
    }
)

# ── Main menu ─────────────────────────────────────────────────
Clear-Host
Write-Host @"
╔══════════════════════════════════════════════════════════════╗
║          🤖  DEPENDABOT STUDY SESSION  🤖                    ║
║   Supply Chain Security · Configuration · GitHub Actions      ║
╚══════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

Write-Host "`n  Select a study mode:" -ForegroundColor White
Write-Host "  [1] Flashcards — Q&A review (all cards)" -ForegroundColor Yellow
Write-Host "  [2] Multiple Choice Quiz (scored)" -ForegroundColor Yellow
Write-Host "  [3] Random Flashcards (shuffled)" -ForegroundColor Yellow
Write-Host "  [4] Quick Reference Cheat Sheet" -ForegroundColor Yellow
Write-Host "  [Q] Quit`n" -ForegroundColor DarkGray

$mode = (Read-Host "  Enter choice").Trim().ToUpper()

# ── MODE 1: Sequential Flashcards ────────────────────────────
if ($mode -eq "1") {
    Write-Header "FLASHCARD MODE — $($flashcards.Count) cards"
    $correct = 0
    foreach ($i in 0..($flashcards.Count - 1)) {
        $card = $flashcards[$i]
        Write-Q ($i + 1) $card.Q
        Write-Host "  [Press ENTER to reveal answer]" -ForegroundColor DarkGray
        Read-Host | Out-Null
        Write-A $card.A
        Write-Host ""
        $grade = Read-Host "  Did you get it right? [Y/N]"
        if ($grade.ToUpper() -eq "Y") { $correct++ }
    }
    Write-Header "RESULTS"
    Write-Host "  Score: $correct / $($flashcards.Count)" -ForegroundColor Cyan
    $pct = [Math]::Round(($correct / $flashcards.Count) * 100)
    if ($pct -ge 80) {
        Write-Host "  🏆 Excellent! ($pct%) — You're ready for the exam!" -ForegroundColor Green
    } elseif ($pct -ge 60) {
        Write-Host "  📚 Good ($pct%) — Review the cards you missed and try again." -ForegroundColor Yellow
    } else {
        Write-Host "  🔄 Keep studying ($pct%) — Focus on Core Concepts and Configuration." -ForegroundColor Red
    }
}

# ── MODE 2: Multiple Choice Quiz ─────────────────────────────
elseif ($mode -eq "2") {
    Write-Header "MULTIPLE CHOICE QUIZ — $($quizQuestions.Count) questions"
    $score = 0
    foreach ($i in 0..($quizQuestions.Count - 1)) {
        $q = $quizQuestions[$i]
        Write-Q ($i + 1) $q.Q
        foreach ($opt in $q.Options) {
            Write-Host "    $opt" -ForegroundColor White
        }
        $ans = (Read-Host "`n  Your answer (A/B/C/D)").Trim().ToUpper()
        if ($ans -eq $q.Answer) {
            Write-Host "  ✅ Correct!" -ForegroundColor Green
            $score++
        } else {
            Write-Wrong
            Write-Host "  ✅ Correct answer: $($q.Answer)" -ForegroundColor Green
        }
        Write-Hint $q.Explanation
        Pause-Next
    }
    Write-Header "FINAL SCORE"
    $pct = [Math]::Round(($score / $quizQuestions.Count) * 100)
    Write-Host "  $score / $($quizQuestions.Count) correct ($pct%)" -ForegroundColor Cyan
    if ($pct -ge 80) { Write-Host "  🏆 Pass — Great work!" -ForegroundColor Green }
    elseif ($pct -ge 60) { Write-Host "  📚 Near Pass — Review explanations and retry." -ForegroundColor Yellow }
    else { Write-Host "  🔄 More study needed — Focus on configuration and security concepts." -ForegroundColor Red }
}

# ── MODE 3: Shuffled Flashcards ──────────────────────────────
elseif ($mode -eq "3") {
    Write-Header "RANDOM FLASHCARDS"
    $shuffled = $flashcards | Sort-Object { Get-Random }
    $correct = 0
    foreach ($i in 0..($shuffled.Count - 1)) {
        $card = $shuffled[$i]
        Write-Q ($i + 1) $card.Q
        Write-Host "  [Press ENTER to reveal answer]" -ForegroundColor DarkGray
        Read-Host | Out-Null
        Write-A $card.A
        $grade = Read-Host "`n  Got it right? [Y/N]"
        if ($grade.ToUpper() -eq "Y") { $correct++ }
        Write-Host ""
    }
    Write-Header "SESSION COMPLETE"
    Write-Host "  Score: $correct / $($shuffled.Count)" -ForegroundColor Cyan
}

# ── MODE 4: Cheat Sheet ───────────────────────────────────────
elseif ($mode -eq "4") {
    Write-Header "DEPENDABOT QUICK REFERENCE"
    Write-Host @"

  ┌─ 3 FEATURES ──────────────────────────────────────────┐
  │  Alerts         → Notify CVEs (no PR, no config file) │
  │  Security Upds  → Auto PR for CVE fixes (no config)   │
  │  Version Upds   → Proactive PRs (needs dependabot.yml)│
  └────────────────────────────────────────────────────────┘

  ┌─ REQUIRED FIELDS in dependabot.yml ───────────────────┐
  │  version: 2                                            │
  │  updates:                                              │
  │    - package-ecosystem: "npm"   # required             │
  │      directory: "/"             # required             │
  │      schedule:                                         │
  │        interval: "weekly"       # required             │
  └────────────────────────────────────────────────────────┘

  ┌─ KEY ECOSYSTEMS ───────────────────────────────────────┐
  │  npm · pip · maven · gradle · bundler · nuget          │
  │  docker · github-actions · terraform · cargo · gomod   │
  └────────────────────────────────────────────────────────┘

  ┌─ CVSS SEVERITY ────────────────────────────────────────┐
  │  Critical  9.0–10.0   SLA: 7 days                      │
  │  High      7.0–8.9    SLA: 30 days                     │
  │  Medium    4.0–6.9    SLA: 90 days                     │
  │  Low       0.1–3.9    SLA: best effort                 │
  └────────────────────────────────────────────────────────┘

  ┌─ GITHUB ACTIONS INTEGRATION ───────────────────────────┐
  │  Trigger:  pull_request + github.actor==dependabot[bot]│
  │  Metadata: dependabot/fetch-metadata                   │
  │  Patch ok: update-type == version-update:semver-patch  │
  │  Gate:     github/dependency-review-action             │
  │  Perms:    contents:write + pull-requests:write        │
  └────────────────────────────────────────────────────────┘

  ┌─ NOISE REDUCTION ──────────────────────────────────────┐
  │  groups: {}               → batch into 1 PR            │
  │  open-pull-requests-limit → cap version update PRs     │
  │  ignore: []               → skip specific packages     │
  │  interval: monthly        → less frequent checks       │
  └────────────────────────────────────────────────────────┘
"@ -ForegroundColor White
}

else {
    Write-Host "`n  Exiting. Good luck with your studies! 🚀" -ForegroundColor Cyan
}

Write-Host "`n$('─' * 60)`n" -ForegroundColor DarkCyan
