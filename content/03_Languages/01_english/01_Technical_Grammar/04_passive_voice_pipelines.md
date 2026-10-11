---
title: Module 04 Resource Lesson - Passive Voice Pipelines (The metric was collected...)
category: 01_Technical_Grammar
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# 🚀 04. Passive Voice in CI/CD Pipelines & Blameless Post-Mortems

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
**Goal:** Master the strategic use of the passive voice in engineering communications, specifically for CI/CD pipeline documentation, incident reports, and blameless post-mortems. 
**Engineering Impact:** Shifting from active to passive voice allows Senior Engineers (C1/C2) to depersonalize failures, focus on systemic issues over individual mistakes, and maintain objectivity during high-stakes incident reviews.

## 2. 🧊 Warming Up
**Q1: Why is saying "John broke the build" counterproductive in modern DevOps culture?**
*Sample Answer:* It assigns blame to an individual rather than addressing the systemic failure that allowed the faulty code to be merged. A better approach is: "The build was broken due to a missed test case."
**Q2: When is the active voice preferred over the passive voice?**
*Sample Answer:* Active voice is preferred for taking ownership of positive actions or outlining direct steps in a tutorial (e.g., "I optimized the query," or "Click the deploy button").

## 3. ⚙️ Contrastive Analysis & Theory
**The Core Shift:** Subject + Verb + Object (Active) $\rightarrow$ Object + *to be* + Past Participle (Passive).
*   **Active:** The junior developer *deleted* the production database. (Focuses on WHO did it).
*   **Passive:** The production database *was deleted*. (Focuses on WHAT happened).
*   **Pipeline Passive:** The artifact *is generated* and *pushed* to the registry. (Focuses on the PROCESS).

**When to Use Passive Voice:**
1.  **Blameless Post-Mortems:** To emphasize the failure in the system, not the human.
2.  **System/Process Descriptions:** When the actor is irrelevant, obvious, or automated (e.g., CI/CD workflows).
3.  **Objective Reporting:** To sound professional and detached from emotional reactions during outages.

## 4. 🛠️ Real-World Engineering Context Comparison

| Context | Junior (B1/B2) - Active / Direct | Senior/Staff (C1/C2) - Passive / Objective |
| :--- | :--- | :--- |
| **Incident Review** | "Someone deployed the wrong config and crashed the pod." | "An incorrect configuration was deployed, resulting in pod failure." |
| **CI/CD Workflow** | "Jenkins builds the image and then it runs the tests." | "The image is built, after which automated tests are executed." |
| **Post-Mortem Root Cause** | "We forgot to add a rate limiter to the API." | "The API was left exposed without rate-limiting measures." |
| **Action Items** | "We need to update the pipeline so it catches this." | "The pipeline must be updated to ensure this edge case is caught." |

## 5. 🎭 Role-Play Dialogue
**Scenario:** A post-mortem meeting following a CI/CD pipeline failure that caused a 30-minute production outage.

**Sarah (Staff Engineer):** "Let’s review the timeline. At 14:00, the deployment pipeline was triggered. However, the integration tests were bypassed."
**David (DevOps Manager):** "Do we know how they were bypassed? Was it a manual override?"
**Sarah:** "Yes, the override flag was used. Moving forward, the manual override feature will be restricted to emergency hotfixes only, and an additional approval layer will be required."
**David:** "Understood. Has the runbook been updated to reflect this new policy?"
**Sarah:** "The draft has been created and is currently being reviewed by the platform team."

## 6. 💬 Let's talk about the role play
1.  Why did Sarah say "the override flag was used" instead of naming the developer who used it?
2.  How does the passive voice help keep the conversation focused on solutions rather than blame?
3.  Identify two passive constructs Sarah used to describe future action items.

## 7. 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| **Post-Mortem** | A process performed after an incident to determine root cause and prevent recurrence. | Buổi họp/báo cáo phân tích sau sự cố |
| **Depersonalize** | To make something objective and remove personal emotional involvement or blame. | Khách quan hóa (loại bỏ yếu tố cá nhân) |
| **Triggered** | Caused (an event or situation) to happen or exist, often automatically. | Được kích hoạt |
| **Bypassed** | Ignored a rule or official system in order to achieve something quicker. | Bỏ qua / Vượt rào |
| **Restricted** | Limited in extent, number, scope, or action. | Bị hạn chế |

## 8. 🚫 Common Anti-Patterns & Pitfalls
*   **The Over-Passive Trap:** Using passive voice everywhere makes writing dull and hard to read. *Anti-pattern:* "The code was written by me." *Correction:* "I wrote the code." (Take ownership of positive contributions).
*   **The Missing Subject in Active Contexts:** Sometimes you *need* to know who did it. "The firewall rules were changed" is bad if security needs an audit trail. Be passive for blame, but ensure logging captures the active actor.
*   **Awkward Continuous Passives:** "The pipeline is being being run." *Correction:* "The pipeline is running."

---

# 🛠️ Practice Workspace: Passive Voice in CI/CD

## 1. 📋 Scenario & Engineering Context
**Scenario:** 
You are writing a blameless post-mortem for a recent P1 incident. A junior engineer, Alex, accidentally merged a PR that contained a hardcoded database credential, which was then automatically picked up by the CI/CD pipeline and deployed to a public-facing staging environment. The security scanner caught it 10 minutes later.

Your task is to write a brief summary (3-4 sentences) of how the incident occurred and what the remediation steps are, using the **passive voice** to ensure it remains a *blameless* post-mortem.

## 2. 💻 User Practice Workspace

> **Write your incident summary here:**
> 
> [Your response...]

## 3. 💡 Progressive Socratic Hints

<details>
<summary><b>Hint 1: Grammar (Depersonalization)</b></summary>
Instead of saying "Alex merged the PR," try using the PR as the subject: "A pull request containing... was merged."
</details>

<details>
<summary><b>Hint 2: Lexical (CI/CD Terminology)</b></summary>
Use pipeline-specific verbs in their past participle form: *was deployed, was triggered, was detected, were rotated*.
</details>

<details>
<summary><b>Hint 3: Tone/Structure (Action Items)</b></summary>
For the remediation steps, use modal passives: "Credentials must be rotated," or "Pre-commit hooks should be implemented."
</details>

---

# 📝 Assessment Exam: Passive Voice in Pipelines & Post-Mortems

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)
**1. Which sentence is best suited for a blameless post-mortem?**
- [ ] A. The frontend team pushed a memory leak to production.
- [ ] B. A memory leak was introduced into the production environment.
- [ ] C. We caused a memory leak when deploying the new feature.
- [ ] D. The server crashed because Bob forgot to free up memory.
<details><summary><b>Answer Key & Explanation</b></summary>
**Correct Answer: B**. It uses the passive voice ("was introduced") to focus on the technical issue rather than pointing fingers at a specific team or person.
</details>

*(Assume 4 more MCQs following this pattern)*

## 🧪 Section 2: Fill-in-the-Blank Technical Drills
Complete the sentences using the appropriate passive form of the verbs in brackets.
1. Once the code is pushed to the main branch, a new build __________ (trigger) automatically.
2. The root cause of the latency spike __________ (identify) as an unoptimized SQL query.
3. In the future, secret scanning tools __________ (integrate) directly into the pre-commit hooks.
4. During the outage, all incoming traffic __________ (reroute) to the secondary region.
5. The incident timeline __________ (document) in the shared Confluence page.

## 🔍 Section 3: Error Identification & Sentence Refactoring
Refactor the following active/blame-oriented sentences into professional, passive-voice engineering statements.
1. *Original:* "Someone left the S3 bucket publicly readable, which leaked the user data."
   *Refactored:* _________________________________________________
2. *Original:* "The CI runner failed the build because you didn't update the package.json."
   *Refactored:* _________________________________________________
3. *Original:* "We will deploy the hotfix as soon as the QA team approves it."
   *Refactored:* _________________________________________________

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay
**Scenario:** The VP of Engineering asks you for a quick update on why the deployment pipeline has been locked for the past hour.
**Task:** Write a 2-sentence response using the passive voice to explain that a security vulnerability was found and the pipeline was halted for investigation.

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks
**Scenario:** Explaining a deployment rollback to stakeholders.

**C1 (Senior Technical Lead):**
"During the deployment phase, an unexpected memory leak was detected in the auth service. The rollback protocol was immediately initiated, and the system was successfully restored to the previous stable version. The root cause is currently being investigated by the platform team."

**C2 (Principal Architect):**
"An anomaly in resource consumption was observed shortly after the artifact was promoted to production. To mitigate potential degradation, automated rollback procedures were engaged. System stability has been verified, and the deployment pipeline has been temporarily suspended pending a comprehensive blameless post-mortem."

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric
*   [ ] **Grammatical Precision:** Did I use the `[to be] + [past participle]` structure correctly without dangling modifiers?
*   [ ] **Technical Vocabulary:** Did I incorporate CI/CD-specific terminology (e.g., triggered, deployed, rolled back, mitigated)?
*   [ ] **Executive Tone:** Does the text sound objective, blameless, and focused on systems rather than human error?
*   [ ] **Action-Oriented:** When describing remediation, did I use modal passives (e.g., "must be implemented", "should be reviewed") effectively?
