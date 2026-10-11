---
title: Module 45 Resource Lesson - Rejecting Monolithic Pull Requests Constructively
category: 03_Code_Review_Async
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# Rejecting Monolithic PRs Gracefully

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
In modern CI/CD and DevOps environments, giant monolithic Pull Requests (PRs) (e.g., +5000/-3000 lines) are a massive risk to system stability and velocity. They are impossible to review effectively and often contain hidden bugs or architectural deviations. The objective of this lesson is to equip you with the linguistic tools to safely, respectfully, and decisively reject or request the splitting of large PRs without damaging team morale, using C1/C2 level linguistic softening and objective architectural rationale.

## 2. 🧊 Warming Up
**Question 1:** Why are monolithic PRs considered an anti-pattern in agile software development?
*Sample Answer:* They dramatically increase cognitive load for reviewers, delay the feedback loop, and increase the likelihood of introducing regressions or merge conflicts. Small, iterative PRs are easier to test and revert.

**Question 2:** How do you typically feel when asked to review a 2,000-line PR on a Friday afternoon?
*Sample Answer:* Overwhelmed and hesitant. It’s practically impossible to give it a rigorous architectural review under those conditions, so I usually request that the author breaks it down into smaller, logical commits.

## 3. ⚙️ Contrastive Analysis & Theory: Linguistic Softening & Objective Framing
When rejecting a PR, avoid using aggressive or purely subjective statements ("This is too big", "I refuse to review this"). Instead, use:
*   **Depersonalization:** Focus on the code and process, not the author. (e.g., "The PR" vs "You").
*   **Objective Constraints:** Reference team agreements, CI/CD limits, or cognitive load. (e.g., "To ensure a thorough review...", "Our team guidelines suggest...").
*   **Constructive Directives:** Provide a clear path forward. (e.g., "Could we slice this into...", "I recommend extracting...").
*   **Softening Modifiers:** Use modal verbs and qualifiers (might, could, a bit, perhaps).

## 4. 🛠️ Real-World Engineering Context Comparison

| Junior (B1/B2) | Senior / Staff (C1/C2) | Why C1/C2 is better |
| :--- | :--- | :--- |
| This PR is way too big. I can't review it. You need to split it. | "To ensure this gets the thorough review it deserves, could we look into splitting this PR into smaller, logical chunks? Perhaps we can separate the refactoring from the new feature implementation." | Uses softening ("could we look into"), objective reasoning ("thorough review"), and provides a concrete suggestion ("separate refactoring"). |
| You changed too many files at once. | "Given the blast radius of these changes, I'm concerned about potential regressions. Let's isolate the database schema migrations into a separate PR to de-risk the deployment." | Uses advanced vocabulary ("blast radius", "regressions", "isolate", "de-risk") and justifies the request with architectural safety. |
| Close this and make three smaller PRs. | "I recommend closing this overarching PR and raising sequential, stacked PRs instead. We can start with the interface definitions, then move to the core logic." | Offers a specific workflow solution ("stacked PRs", "sequential") demonstrating senior technical leadership. |
| I don't understand what this PR is trying to do, it's a mess. | "The scope of this PR seems to have expanded beyond the original ticket. To keep our velocity high and reviews focused, let's extract the opportunistic refactoring into a follow-up ticket." | Uses neutral phrasing ("scope expanded", "opportunistic refactoring") without insulting the author's work. |

## 5. 🎭 Role-Play Dialogue
*Context: A mid-level engineer, Alex, has just submitted a massive PR that touches the core authentication service, adds a new feature, and refactors legacy code all at once. Sarah, a Staff Engineer, is responding on a quick sync call.*

**Sarah (Staff):** Hey Alex, thanks for putting together that PR for the Auth module. I took a quick glance, and the scope is quite extensive.
**Alex (Mid-level):** Yeah, while I was in there fixing the token issue, I figured I'd also clean up the legacy error handling and update the dependencies. 
**Sarah:** I appreciate the initiative on the tech debt! However, combining opportunistic refactoring with core feature work significantly increases the blast radius. To de-risk this deployment and ensure a rigorous review, we need to slice this into smaller, atomic changes.
**Alex:** Ah, I see. It's just that it all felt connected. How should I break it down?
**Sarah:** A good rule of thumb is one architectural concern per PR. I suggest we revert the dependency bumps and legacy cleanup for now. Let's isolate the core token fix into its own PR so we can ship it today. Then, you can raise a separate, stacked PR for the refactoring. 
**Alex:** That makes sense. It'll definitely be easier to test that way. I'll close the current PR and split the commits up now.
**Sarah:** Perfect. Ping me when the focused token PR is up, and I'll prioritize the review.

## 6. 💬 Let's talk about the role play
1.  How does Sarah acknowledge Alex's effort before rejecting the current state of the PR?
2.  What specific technical rationale does Sarah provide for wanting to split the PR?
3.  What actionable steps does Sarah give Alex to resolve the situation?

## 7. 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| **Monolithic PR** | A single pull request containing an excessively large number of changes across multiple domains. | PR khổng lồ / PR nguyên khối |
| **Blast Radius** | The potential scope of impact or damage if a change introduces a bug or fails. | Phạm vi ảnh hưởng / Bán kính ảnh hưởng |
| **Opportunistic Refactoring** | Cleaning up or restructuring code simply because you are already working in that area. | Tái cấu trúc ngẫu hứng |
| **Atomic Change** | A change that does exactly one thing, succeeding or failing as a single unit. | Thay đổi nguyên tử (độc lập, duy nhất) |
| **Stacked PRs** | A series of smaller, sequential PRs where each builds upon the previous one. | Các PR xếp chồng / PR nối tiếp |
| **Cognitive Load** | The amount of mental effort required to understand and process information (e.g., reviewing complex code). | Tải trọng nhận thức |
| **To de-risk** | To take steps to make a process or deployment less likely to fail or cause problems. | Giảm thiểu rủi ro |
| **Overarching** | Comprehensive; covering a wide area or scope. | Bao trùm / Toàn diện |

## 8. 🚫 Common Anti-Patterns & Pitfalls
*   **The "Rubber Stamp":** Approving a massive PR without reviewing it simply because it's too big to read. (Anti-pattern: "LGTM!").
*   **Subjective Attacks:** Saying "This is bad code" instead of "This implementation might struggle to scale under high load."
*   **Vague Rejections:** Telling someone to "make it smaller" without suggesting *how* to slice it (e.g., vertically by feature slice, or horizontally by architectural layer).
*   **Tone-Deafness:** Using purely imperative commands ("Split this") rather than collaborative framing ("Let's split this so we can...").

---

# Practice Workspace: Rejecting Monolithic PRs

# Part 2: Practice Workspace (Active Execution)

## 1. 🏗️ Scenario & Engineering Context
**Scenario:** 
You are a Staff Engineer reviewing a Pull Request from a newly hired Mid-level Engineer. The PR is titled "Refactor Authentication & Add OAuth2". 
You notice that the PR contains 85 changed files, +4,200 lines, and -1,100 lines. It includes the new OAuth2 feature, a major refactoring of the user database schema, updates to 15 NPM packages, and a formatting change applied to the entire repository. 

If this PR is merged as-is, it carries a massive risk of regressions, and reviewing it properly would take days of dedicated focus. You need to write a comment on the PR rejecting it in its current state, asking the author to close it and open separate, atomic PRs instead.

**Goal:** Write a professional, empathetic, yet firm PR comment that uses C1/C2 linguistic softening, provides objective architectural rationale (blast radius, cognitive load), and suggests a clear path forward (e.g., stacked PRs).

---

## 2. 📝 User Practice Workspace

> **Write your PR comment here:**
> 
> *(Draft your response below...)*
> 
> 

---

## 3. 💡 Progressive Socratic Hints

<details>
<summary><b>Hint 1: Structural Tone (Depersonalization)</b></summary>
Instead of saying "You made this PR too big" or "You included too many things", focus on the code and the process. Use phrases like "The scope of this PR..." or "Combining these changes increases...".
</details>

<details>
<summary><b>Hint 2: Objective Rationale (Advanced Vocabulary)</b></summary>
Use terms like **blast radius**, **cognitive load**, **opportunistic refactoring**, or **atomic changes**. 
*Example:* "To keep the blast radius contained..." or "To ensure a rigorous review..."
</details>

<details>
<summary><b>Hint 3: Actionable Directives (Stacked PRs)</b></summary>
Don't just say "fix it". Suggest a specific breakdown.
*Example:* "Could we slice this into three stacked PRs? 1. Dependency updates. 2. Schema changes. 3. The core OAuth implementation."
</details>

---

# Assessment Exam: Rejecting Monolithic PRs

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)

**1. Which phrasing is the most professional way to address a massive PR that includes unrelated formatting changes?**
- [ ] A. "Why did you reformat the whole repo? Remove those commits now."
- [ ] B. "This PR is too large. Please take out the formatting changes."
- [ ] C. "Including repository-wide formatting changes here expands the blast radius significantly. Let's isolate the formatting into a separate chore PR."
- [ ] D. "I am not reviewing this until you fix the formatting mess."

<details>
<summary><b>Answer & Explanation</b></summary>
**Correct Answer:** C
**Explanation:** It uses depersonalization ("Including... expands"), advanced vocabulary ("blast radius", "chore PR"), and provides a clear, collaborative path forward ("Let's isolate").
</details>

**2. What is "opportunistic refactoring"?**
- [ ] A. Refactoring code maliciously to cause merge conflicts.
- [ ] B. Cleaning up adjacent code simply because you are already working in that file, expanding the scope of the PR.
- [ ] C. Refactoring code when a manager specifically requests it.
- [ ] D. Using design patterns that are not suited for the current architecture.

<details>
<summary><b>Answer & Explanation</b></summary>
**Correct Answer:** B
**Explanation:** It refers to fixing tech debt "on the fly" while building a feature. While well-intentioned, doing this in a large PR increases risk and makes reviews harder.
</details>

**3. Which of the following is an example of linguistic softening?**
- [ ] A. "You must split this PR."
- [ ] B. "Could we look into splitting this PR into smaller chunks?"
- [ ] C. "Splitting this PR is mandatory."
- [ ] D. "Close this and make it smaller."

<details>
<summary><b>Answer & Explanation</b></summary>
**Correct Answer:** B
**Explanation:** Using modal verbs ("Could we") and collaborative language ("look into") softens the directive without losing the core message.
</details>

**4. Why is a "monolithic PR" dangerous in a CI/CD pipeline?**
- [ ] A. It makes the code run slower in production.
- [ ] B. It takes up too much disk space on GitHub.
- [ ] C. It increases the cognitive load on reviewers and raises the risk of regressions slipping through.
- [ ] D. It usually causes the compiler to crash.

<details>
<summary><b>Answer & Explanation</b></summary>
**Correct Answer:** C
**Explanation:** The primary danger is human error during the review process due to cognitive overload, leading to bugs.
</details>

**5. How should you propose a solution to a developer who needs to split a PR but the changes depend on each other?**
- [ ] A. Tell them to figure it out themselves.
- [ ] B. Suggest they merge it to a development branch first.
- [ ] C. Recommend raising "stacked PRs" where each PR builds on the previous one's branch.
- [ ] D. Allow them to merge the monolithic PR just this once.

<details>
<summary><b>Answer & Explanation</b></summary>
**Correct Answer:** C
**Explanation:** Stacked PRs allow dependent changes to be reviewed and merged sequentially in atomic units.
</details>

---

## 🧪 Section 2: Fill-in-the-Blank Technical Drills

1. To ensure this PR gets a thorough review without causing reviewer fatigue, we need to slice it into smaller, ________ changes.
2. Combining the core feature with opportunistic refactoring significantly increases the ________ radius.
3. I recommend closing this overarching PR and raising ________ PRs instead, starting with the database migrations.
4. Let's ________ the dependency bumps into a separate chore ticket to de-risk the deployment.
5. Given the extensive ________ load required to review 85 files, I'm concerned about potential regressions slipping through.

<details>
<summary><b>Answer Key</b></summary>
1. atomic
2. blast
3. stacked / sequential
4. isolate / extract
5. cognitive
</details>

---

## 🔍 Section 3: Error Identification & Sentence Refactoring

**Refactor the following B1/B2 level sentences into C1/C2 executive engineering statements.**

**1. Original:** This PR is too big. You changed too many things at once.
**Refactored:** 

**2. Original:** I can't review this right now, it will take me hours.
**Refactored:** 

**3. Original:** You need to take out the refactoring parts and make a new PR for them.
**Refactored:** 

**4. Original:** If we merge this giant PR, it might break the website.
**Refactored:** 

**5. Original:** Close this PR and make three smaller ones.
**Refactored:** 

<details>
<summary><b>Suggested C1/C2 Refactorings</b></summary>
1. "The scope of this PR is quite extensive. To ensure a thorough review, could we look into slicing it into more atomic units?"
2. "Given the sheer volume of changes, this PR requires a significant amount of cognitive load to review properly."
3. "Let's extract the opportunistic refactoring into a separate, follow-up PR to keep this review focused on the core feature."
4. "Due to the massive blast radius of these changes, merging this as a single unit introduces a high risk of regressions."
5. "I recommend breaking this overarching PR down into three stacked PRs to facilitate a safer deployment process."
</details>

---

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay

**Scenario:** An engineer pushes back on your request to split their PR, stating: *"But it's much faster for me to just do it all at once and merge it today. Breaking it up will delay the feature."*

**Your Task:** Write a short verbal response (as if speaking in a daily standup or sync call) defending your stance. Emphasize that speed of writing code does not equal speed of safe deployment, and mention the risks to the team.

<details>
<summary><b>Sample C1/C2 Response</b></summary>
"I completely understand the desire to ship this quickly, and I appreciate the effort you've put in. However, while combining it all might speed up the initial coding phase, it significantly bottlenecks the review process and increases our risk of a rollback if a regression slips through. Slicing it into atomic, stacked PRs actually increases our overall deployment velocity because we can review and ship the smaller pieces much faster and more safely."
</details>

---

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

### The Scenario
Rejecting a +3000 line PR that includes feature work, legacy refactoring, and dependency updates.

### C1 Level (Senior Technical Lead)
"Thanks for the hard work on this. Looking at the diff, the scope has expanded quite a bit beyond the original feature. Combining the OAuth implementation with the legacy refactoring and dependency updates creates a pretty massive blast radius. To ensure we can review this rigorously without overwhelming the team, could we isolate the dependency updates and refactoring into separate PRs? Let's keep this one focused purely on the OAuth logic."

### C2 Level (Principal Architect)
"I appreciate the comprehensive approach here, particularly the initiative on addressing the legacy tech debt. That said, aggregating structural refactoring, dependency upgrades, and net-new feature logic into a single monolithic PR introduces an unacceptable level of deployment risk and cognitive overhead for reviewers. Let’s decompose this overarching PR into discrete, atomic units. I recommend establishing a stacked PR sequence: prioritize the dependency upgrades first, follow with the isolated refactoring, and culminate with the core OAuth implementation. This will significantly de-risk the integration and accelerate our review cadence."

---

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric

| Criteria | B2 (Intermediate) | C1 (Advanced) | C2 (Mastery) |
| :--- | :--- | :--- | :--- |
| **Depersonalization** | Focuses on the author ("You made it too big"). | Focuses on the PR ("The scope is large"). | Focuses on system impact ("Aggregating these changes introduces risk"). |
| **Vocabulary** | Uses basic words (big, break, split). | Uses precise tech terms (blast radius, isolate). | Uses executive lexicons (cognitive overhead, discrete, decompose). |
| **Directives** | Imperative commands ("Fix this"). | Collaborative suggestions ("Could we slice this?"). | Strategic architectural paths ("Establish a stacked PR sequence"). |
| **Tone** | Frustrated or blunt. | Professional and constructive. | Empathetic, authoritative, and process-oriented. |
