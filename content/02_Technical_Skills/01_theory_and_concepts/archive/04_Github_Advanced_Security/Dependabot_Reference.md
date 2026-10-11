---


title: "Dependabot — Complete Reference Guide"
description: "Master-level architecture and implementation guide for Dependabot — Complete Reference Guide covering core theory, runtime mechanics, and production best practices."
category: "Technical Skills & Systems Architecture"
tags: [technical, skills, systems, architecture, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---
# Dependabot — Complete Reference Guide

> **Status:** Complete · **Level:** Intermediate–Advanced · **Scope:** GitHub Supply Chain Security
> **Related:** GHAS · GitHub Actions · CVE/CVSS · Dependency Graph

---

## 📋 Table of Contents

1. [What is Dependabot?](#what-is-dependabot)
2. [Three Pillars](#three-pillars)
3. [How to Enable](#how-to-enable)
4. [dependabot.yml Reference](#dependabotyml-reference)
5. [Supported Ecosystems](#supported-ecosystems)
6. [Security Scoring (CVE/CVSS/EPSS)](#security-scoring)
7. [GitHub Actions Integration](#github-actions-integration)
8. [Best Practices](#best-practices)
9. [Enterprise / Org-level](#enterprise--org-level)
10. [Study Resources](#study-resources)

---

## What is Dependabot?

Dependabot is GitHub's **automated dependency management** service. It monitors your project's dependencies against known vulnerability databases and version registries, then automatically creates pull requests to keep your code safe and up-to-date.

**Why it matters:** The 2021 SolarWinds and Log4Shell incidents proved that supply chain attacks through third-party dependencies are among the most impactful attack vectors. Dependabot directly addresses this by automating remediation.

---

## Three Pillars

### 1. 🔔 Dependabot Alerts
- **What:** Scans the Dependency Graph against the GitHub Advisory Database (GHSA + NVD)
- **How:** Sends notifications (email, Slack, in-app) when a CVE is detected in your deps
- **PRs created:** ❌ No — alerts only
- **Config needed:** ❌ No `dependabot.yml` required
- **Enabled via:** Settings → Code Security and Analysis

### 2. 🛡️ Dependabot Security Updates
- **What:** Automatically creates a PR to update a vulnerable dependency to the minimum safe version
- **When:** Triggered by new vulnerability being published that affects your repo
- **PRs created:** ✅ Yes — auto-creates targeted fix PRs
- **Config needed:** ❌ No `dependabot.yml` required (but supported)
- **Enabled via:** Settings → Code Security and Analysis

### 3. ⬆️ Dependabot Version Updates
- **What:** Proactively keeps all dependencies at their latest versions (not just vulnerable ones)
- **When:** Runs on your configured schedule (daily/weekly/monthly)
- **PRs created:** ✅ Yes — one PR per outdated dependency (or grouped)
- **Config needed:** ✅ **Requires `.github/dependabot.yml`**
- **Enabled via:** Committing `dependabot.yml` to the repo

---

## How to Enable

### Step-by-step
1. Go to **Repository → Settings → Code Security and Analysis**
2. Enable **Dependency Graph** ← *required first*
3. Enable **Dependabot Alerts**
4. Enable **Dependabot Security Updates**
5. For Version Updates: create `.github/dependabot.yml`

### Organization-level
- **Settings → Code security → Global settings** → enable for all repos
- Use **Security Coverage** view to audit which repos have Dependabot enabled

---

## dependabot.yml Reference

### Minimal valid config
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
```

### All configuration options

```yaml
version: 2  # required — always 2

registries:               # optional: private registry credentials
  my-registry:
    type: npm-registry
    url: https://registry.company.com
    token: ${{ secrets.NPM_TOKEN }}

updates:
  - package-ecosystem: "npm"     # required — see Ecosystems table
    directory: "/"               # required — path to manifest file
    
    schedule:                    # required
      interval: "weekly"         # daily | weekly | monthly
      day: "monday"              # for weekly: day of week
      time: "09:00"              # 24h UTC unless timezone set
      timezone: "Asia/Ho_Chi_Minh"

    open-pull-requests-limit: 5  # default: 5; set 0 to disable version updates

    target-branch: "develop"     # default: default branch

    labels:                      # labels to add to PRs
      - "dependencies"

    reviewers:                   # GitHub usernames/teams
      - "security-team"

    assignees:
      - "maintainer-bot"

    milestone: 3                 # milestone number

    rebase-strategy: "auto"      # auto (default) | disabled

    groups:                      # batch multiple deps into one PR
      react-ecosystem:
        patterns:
          - "react*"
          - "@types/react*"
        update-types:
          - "minor"
          - "patch"

    ignore:                      # skip specific packages or versions
      - dependency-name: "lodash"
        versions: ["4.x", "3.x"]
      - dependency-name: "express"
        update-types: ["version-update:semver-major"]

    allow:                       # allowlist (overrides default behavior)
      - dependency-type: "direct"  # direct | indirect | all | production | development

    registries:                  # reference private registries defined above
      - my-registry
```

---

## Supported Ecosystems

| `package-ecosystem` | Language/Tool | Manifest Files |
|---|---|---|
| `npm` | JavaScript/TypeScript | `package.json`, `yarn.lock` |
| `pip` | Python | `requirements.txt`, `Pipfile`, `pyproject.toml` |
| `maven` | Java | `pom.xml` |
| `gradle` | Java/Kotlin | `build.gradle`, `build.gradle.kts` |
| `bundler` | Ruby | `Gemfile` |
| `nuget` | .NET | `*.csproj`, `packages.config` |
| `composer` | PHP | `composer.json` |
| `cargo` | Rust | `Cargo.toml` |
| `gomod` | Go | `go.mod` |
| `pub` | Dart/Flutter | `pubspec.yaml` |
| `swift` | Swift | `Package.swift` |
| `hex` | Elixir | `mix.exs` |
| `docker` | Docker | `Dockerfile` |
| `github-actions` | GitHub Actions | `.github/workflows/*.yml` |
| `terraform` | Terraform | `*.tf` |
| `gitsubmodule` | Git submodules | `.gitmodules` |

---

## Security Scoring

### CVE (Common Vulnerabilities and Exposures)
- Unique identifier for a publicly known security flaw
- Format: `CVE-YEAR-NUMBER` (e.g., `CVE-2021-44228` = Log4Shell)

### CVSS (Common Vulnerability Scoring System)
| Severity | Score Range | Recommended SLA |
|---|---|---|
| **None** | 0.0 | N/A |
| **Low** | 0.1 – 3.9 | Best effort |
| **Medium** | 4.0 – 6.9 | 90 days |
| **High** | 7.0 – 8.9 | **30 days** |
| **Critical** | 9.0 – 10.0 | **7 days** |

### EPSS (Exploit Prediction Scoring System)
- Score: 0.0 – 1.0 (probability of exploitation in next 30 days)
- **Used alongside CVSS** for risk-based prioritization
- A CVE with CVSS 9.0 but EPSS 0.01 is less urgent than CVSS 7.5 + EPSS 0.85

### GHSA (GitHub Security Advisory)
- GitHub's own advisory format that feeds Dependabot
- More context than raw NVD: includes affected versions, patches, severity ratings

---

## GitHub Actions Integration

### Auto-Merge Patch Updates
```yaml
# github/workflows/dependabot-auto-merge.yml
name: Dependabot Auto-Merge
on: pull_request

permissions:
  contents: write
  pull-requests: write

jobs:
  auto-merge:
    runs-on: ubuntu-latest
    if: github.actor == 'dependabot[bot]'
    steps:
      - name: Fetch Dependabot metadata
        id: meta
        uses: dependabot/fetch-metadata@v2

      - name: Auto-approve
        if: steps.meta.outputs.update-type == 'version-update:semver-patch'
        run: gh pr review --approve "${{ github.event.pull_request.html_url }}"
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Auto-merge patch updates
        if: steps.meta.outputs.update-type == 'version-update:semver-patch'
        run: gh pr merge --auto --squash "${{ github.event.pull_request.html_url }}"
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Dependency Review (Block vulnerable PRs before merge)
```yaml
# github/workflows/dependency-review.yml
name: Dependency Review
on: [pull_request]

jobs:
  dependency-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/dependency-review-action@v4
        with:
          fail-on-severity: high
          deny-licenses: GPL-2.0, GPL-3.0, AGPL-3.0
```

### Metadata from `dependabot/fetch-metadata`
| Output | Example Value |
|---|---|
| `update-type` | `version-update:semver-patch` |
| `dependency-names` | `lodash` |
| `dependency-type` | `direct:production` |
| `new-version` | `4.17.21` |
| `previous-version` | `4.17.19` |
| `alert-state` | `OPEN` |
| `ghsa-id` | `GHSA-xxxx-xxxx-xxxx` |
| `cvss` | `7.5` |

---

## Best Practices

### Noise Reduction
- ✅ Use `groups` to batch related packages (e.g., all Jest deps)
- ✅ Set `open-pull-requests-limit: 5` (or less)
- ✅ Use `monthly` for infrastructure/stable deps, `daily` for security
- ✅ Use `ignore` for packages you manage manually

### Security Posture
- ✅ Enable `github-actions` ecosystem — supply chain attacks via Actions are real
- ✅ Implement Dependency Review Action on all repos
- ✅ Set up Auto-Triage Rules to dismiss false positives
- ✅ Use CVSS + EPSS together for prioritization, not CVSS alone
- ✅ Define internal SLAs and track compliance

### Automation Safety
- ✅ Auto-merge **patch** only — never auto-merge major/minor
- ✅ Require CI to pass before any auto-merge
- ✅ Apply Least Privilege to `GITHUB_TOKEN`
- ✅ Use `if: github.actor == 'dependabot[bot]'` to scope automation

---

## Enterprise / Org-level

### Enabling at scale
```
Organization Settings → Code Security → Global Settings
├── Enable Dependency Graph for all repos
├── Enable Dependabot Alerts for all repos
└── Enable Dependabot Security Updates for all repos
```

### Starter Workflows
- Create `.github/dependabot.yml` in the **`.github` repository** at the org level
- This provides a default template but does NOT auto-apply to all repos (each repo needs its own)

### Required Workflows (GitHub Enterprise)
- Enforce `dependency-review-action` across all repos using **Required Workflows**
- Set at Organization level under **Settings → Actions → Required Workflows**

### Security Overview Dashboard
- **Organization → Security** tab shows Dependabot alert counts across all repos
- Filter by severity, ecosystem, repo, or alert age
- Useful for CISO reporting and compliance audits

### Auto-Triage Rules (Organization)
- Create rules at org level that apply to all repos
- Example rule: "Dismiss alerts for dev-only dependencies with no fix available"

---

## Study Resources

| Resource | Path |
|---|---|
| 🗺️ Mindmap | `Reference/Dependabot_Mindmap.md` |
| 🃏 Flashcards | `Reference/Dependabot_Flashcards.md` |
| 🎯 Practice Questions | `Reference/Dependabot_Practice_Questions.md` |
| ⚡ Interactive Quiz | `pwsh Reference/Start-DependabotStudy.ps1` |
| 📖 Official Docs | https://docs.github.com/en/code-security/dependabot |
