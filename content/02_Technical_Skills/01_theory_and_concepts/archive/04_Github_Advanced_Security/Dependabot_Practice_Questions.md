---


title: "Dependabot — Practice Questions"
description: "Master-level architecture and implementation guide for Dependabot — Practice Questions covering core theory, runtime mechanics, and production best practices."
category: "Technical Skills & Systems Architecture"
tags: [technical, skills, systems, architecture, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---
# Dependabot — Practice Questions

> Scenario-based and knowledge-check questions covering all Dependabot domains.
> Format: Question → Reveal Answer
> Use alongside `Start-DependabotStudy.ps1` for interactive CLI practice.

---

## 🟢 Tier 1 — Foundational Knowledge

**Q1.** What is the minimum configuration required to enable Dependabot alerts on a repository?
> **A:** No configuration file is needed. Enable **Dependency Graph** and **Dependabot Alerts** in **Settings → Code Security and Analysis**. Alerts are generated automatically based on the repository's dependency graph.

---

**Q2.** A developer asks: "Why isn't Dependabot creating any PRs even though I committed `dependabot.yml`?" What is the most likely root cause?
> **A:** The **Dependency Graph** is not enabled. Dependabot cannot detect dependencies without it. Go to **Settings → Code Security and Analysis → Dependency Graph** and enable it.

---

**Q3.** You have a Node.js project. Which `package-ecosystem` value must you use in `dependabot.yml`?
> **A:** `npm`

---

**Q4.** What is the difference between Dependabot **Security Updates** and **Version Updates**?
> **A:**
> - **Security Updates** → only patches known CVEs; triggers on vulnerability discovery; no `dependabot.yml` required
> - **Version Updates** → keeps all dependencies current regardless of CVEs; requires `dependabot.yml`; runs on a schedule

---

**Q5.** A `dependabot.yml` file is missing the `directory` field. What happens?
> **A:** Dependabot will **fail to process** that update entry. `directory`, `package-ecosystem`, and `schedule` are all **required** fields.

---

**Q6.** What are the three valid values for `schedule.interval`?
> **A:** `daily`, `weekly`, `monthly`

---

**Q7.** How do you stop Dependabot from opening version-update PRs for the `lodash` package?
> **A:** Use the `ignore` key:
> ```yaml
> ignore:
>   - dependency-name: "lodash"
> ```

---

## 🟡 Tier 2 — Configuration & Scenarios

**Q8.** Your team is overwhelmed with 40+ open Dependabot PRs. How do you reduce the noise without disabling security updates?
> **A:** Three strategies:
> 1. Set `open-pull-requests-limit: 5` to cap version-update PRs
> 2. Use `groups` to batch related packages into one PR
> 3. Change `schedule.interval` from `daily` to `weekly` or `monthly`
> Security updates will still come through regardless.

---

**Q9.** Write the YAML snippet to group all `jest*` packages and `@testing-library/*` packages into a single Dependabot PR.
> **A:**
> ```yaml
> groups:
>   test-ecosystem:
>     patterns:
>       - "jest*"
>       - "@testing-library/*"
> ```

---

**Q10.** You need Dependabot to update Docker images in a `./docker` subdirectory. Write the config entry.
> **A:**
> ```yaml
> - package-ecosystem: "docker"
>   directory: "/docker"
>   schedule:
>     interval: "weekly"
> ```

---

**Q11.** Your project uses a private npm registry at `https://registry.mycompany.com`. How do you configure Dependabot to authenticate against it?
> **A:** Define the registry in the `registries` block and reference it in the update entry:
> ```yaml
> registries:
>   company-npm:
>     type: npm-registry
>     url: https://registry.mycompany.com
>     token: ${{ secrets.REGISTRY_TOKEN }}
> updates:
>   - package-ecosystem: "npm"
>     directory: "/"
>     schedule:
>       interval: "weekly"
>     registries:
>       - company-npm
> ```

---

**Q12.** A CVSS score of 9.3 is assigned to a vulnerability. What severity level is this, and what is your recommended SLA?
> **A:** **Critical** (9.0–10.0). Recommended SLA: remediate within **7 days**.

---

**Q13.** What is the EPSS score, and how does it complement CVSS?
> **A:** **EPSS (Exploit Prediction Scoring System)** predicts the probability (0–1) that a vulnerability will be exploited in the next 30 days. CVSS tells you **how bad** a vulnerability is (severity); EPSS tells you **how likely** it is to be used in an attack. Together they enable risk-based prioritization: prioritize CVEs with both high CVSS **and** high EPSS.

---

**Q14.** How do you configure Dependabot to check GitHub Actions workflows for outdated action versions?
> **A:**
> ```yaml
> - package-ecosystem: "github-actions"
>   directory: "/"
>   schedule:
>     interval: "weekly"
> ```

---

## 🔴 Tier 3 — Advanced / GitHub Actions Integration

**Q15.** Write a GitHub Actions workflow that **auto-merges Dependabot PRs** only for **patch-level** semver updates that pass CI.
> **A:**
> ```yaml
> name: Dependabot Auto-Merge
> on: pull_request
> permissions:
>   contents: write
>   pull-requests: write
> jobs:
>   auto-merge:
>     runs-on: ubuntu-latest
>     if: github.actor == 'dependabot[bot]'
>     steps:
>       - uses: dependabot/fetch-metadata@v2
>         id: meta
>       - name: Merge patch updates
>         if: steps.meta.outputs.update-type == 'version-update:semver-patch'
>         run: gh pr merge --auto --merge "${{ github.event.pull_request.html_url }}"
>         env:
>           GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
> ```

---

**Q16.** What is the **Dependency Review Action** and how does it differ from Dependabot Security Updates?
> **A:**
> | | Dependency Review Action | Dependabot Security Updates |
> |---|---|---|
> | **When** | On PR — before merge | After merge (or on alert) |
> | **What** | Blocks PRs introducing new CVEs | Creates fix PRs for existing CVEs |
> | **Config** | `.github/workflows/*.yml` | Repo settings |
> | **Goal** | Shift-left: prevent bad deps entering | Reactive: fix deps already in repo |

---

**Q17.** A security team wants to block any PR that introduces a dependency with a license other than MIT or Apache-2.0. How?
> **A:** Use `deny-licenses` in the Dependency Review Action:
> ```yaml
> - uses: actions/dependency-review-action@v4
>   with:
>     fail-on-severity: high
>     deny-licenses: GPL-2.0, GPL-3.0, AGPL-3.0, LGPL-2.0
>     allow-licenses: MIT, Apache-2.0
> ```

---

**Q18.** What is the security risk of granting `write-all` permissions to a GitHub Actions workflow triggered by Dependabot PRs?
> **A:** Dependabot PRs originate from a **fork-like context** in public repos. Granting excessive permissions (e.g., `write-all`) could allow a supply chain attack to exfiltrate secrets, push malicious code, or modify protected branches. Always apply **Least Privilege**: only `contents: write` + `pull-requests: write` for auto-merge scenarios.

---

**Q19.** Describe the `auto-triage rules` feature and when you would use it.
> **A:** Auto-triage rules automatically **dismiss or snooze** Dependabot alerts based on conditions (e.g., "no fix available" or "only affects test environment"). Use them to:
> 1. Eliminate **false positives** (e.g., a CVE in a dev-only dependency that can't be exploited in production)
> 2. Reduce **alert fatigue** so the team focuses on actionable alerts only
> Configured in **Security → Dependabot → Rules** at org or repo level.

---

**Q20.** Your `dependabot.yml` specifies `rebase-strategy: disabled`. What effect does this have on long-lived Dependabot PRs?
> **A:** Dependabot will **not automatically rebase** its PRs when the target branch receives new commits. This reduces noisy "rebase" commits in PR timelines but means the Dependabot PR may become stale and require manual rebasing before merging if conflicts arise.

---

## 🏆 Bonus — Real-World Scenario

**Q21.** You are a GitHub Admin at a company with 200 repositories. How would you implement a consistent Dependabot policy across all repos without configuring each one individually?
> **A:** Use **GitHub Organization-level** settings:
> 1. **Enable Dependency Graph, Alerts, and Security Updates** at organization level (Settings → Code Security)
> 2. Create a **starter workflow** in the `.github` repository with a standard `dependabot.yml` that auto-applies to all repos
> 3. Use **Organization Custom Policies** (GHAS Enterprise) to enforce security update requirements
> 4. Create an **organization-level auto-triage rule** to standardize alert dismissal logic
> 5. Use **GitHub Actions Required Workflows** to enforce the `dependency-review-action` on all PRs across all repos
