---
title: "Module 41 Resource Lesson - Conventional Comment Tagging ([Blocking], [Suggestion])"
category: 03_Code_Review_Async
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# 🚀 Lesson 41: Conventional Comment Tagging

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
**Goal:** Master the use of Conventional Comments (e.g., `nit:`, `suggestion:`, `question:`, `issue:`) in asynchronous code reviews to clarify intent, reduce friction, and improve team velocity.
**Engineering Impact:** Explicitly tagging the intent of a comment prevents misunderstandings, speeds up the PR review process, and fosters a blameless, psychologically safe engineering culture.

## 2. 🧊 Warming Up
**Reflective Question 1:** Have you ever received a PR comment like "Why did you do this?" and felt defensive?
*Sample Answer:* Yes, it felt like an attack on my design rather than a genuine inquiry. If it were tagged as `question:`, I would have known they just wanted context.
**Reflective Question 2:** How do you separate minor formatting issues from blocking architectural flaws in PRs?
*Sample Answer:* I usually just write comments, but sometimes the author spends hours fixing trivial things before addressing the main flaws. Tagging helps prioritize.

## 3. ⚙️ Contrastive Analysis & Theory
**Conventional Comments Framework:**
- `issue:` - A problem that must be resolved before merging. (Blocking)
- `suggestion:` - A proposed change. The author can accept or reject it. (Non-blocking usually)
- `question:` - A request for clarification or context. (Blocking until answered)
- `nit:` - A trivial preference or minor issue (e.g., typo, formatting). (Non-blocking)
- `praise:` - Positive feedback to encourage good practices. (Non-blocking)
- `chore:` - Administrative tasks related to the PR. (Non-blocking)

*Format:* `<label> [decorations]: <subject>`
*Example:* `suggestion (performance): Consider using a HashSet here instead of a List for O(1) lookups.`

## 4. 🛠️ Real-World Engineering Context Comparison
| Junior (B1/B2) Phrase | Senior/Staff (C1/C2) Phrase with Conventional Tags | Context / Rationale |
| :--- | :--- | :--- |
| "You misspelled this variable name." | `nit:` Typo in the variable name: `configuraton` -> `configuration`. | Clarifies that this is trivial and shouldn't block the PR. |
| "Change this to a dictionary. Lists are slow." | `suggestion (performance):` Using a dictionary here would improve lookup time from O(n) to O(1). WDYT? | Softens the tone, proposes a change without demanding it, and explains the *why*. |
| "This will crash if user is null." | `issue:` Missing null check. If `user` is null, this will throw a NullReferenceException. | Explicitly marks a blocking bug that must be fixed. |
| "Why didn't you use the existing utility function?" | `question:` I noticed we have `StringHelper.Format()`. Is there a specific reason we're not reusing it here? | Removes accusatory tone and genuinely asks for context. |

## 5. 🎭 Role-Play Dialogue
**Scenario:** A Senior Engineer (Alice) is reviewing a PR from a Mid-level Engineer (Bob).

**Alice (Reviewer):** `praise:` Great job breaking down this massive refactor into smaller, manageable commits. It made reviewing much easier!
**Bob (Author):** Thanks, Alice! I tried to keep the blast radius small.
**Alice:** `issue (security):` I noticed we are logging the raw user object here. We need to mask the PII (Personally Identifiable Information) before logging to comply with GDPR.
**Bob:** Good catch. I'll add a masking utility.
**Alice:** `suggestion:` While you're at it, maybe we can move the masking logic into an interceptor so it applies globally? 
**Bob:** I considered that, but I was worried about the performance overhead on all requests. 
**Alice:** `question:` Ah, valid point. Do we have latency metrics for the interceptor approach? If it's under 5ms, it might still be worth the trade-off.
**Bob:** I'll benchmark it and post the results. 
**Alice:** Sounds good! Also, just a `nit:` on line 42, there's a trailing whitespace.

## 6. 💬 Let's talk about the role play
1. **Why did Alice use `praise:` at the beginning?** 
   *Answer:* To set a positive tone and reinforce good engineering practices before pointing out flaws.
2. **How did `suggestion:` change the dynamic compared to an `issue:`?**
   *Answer:* It invited collaboration and allowed Bob to push back with his performance concerns, whereas `issue:` was treated as a mandatory fix.

## 7. 📚 Bilingual Technical Vocabulary
| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| Blast radius | The scope of impact a change or failure might have on a system. | Phạm vi ảnh hưởng |
| Blocking | An issue that prevents the PR from being merged. | Gây cản trở / Chặn merge |
| Trivial | Of little value or importance (often applied to formatting). | Lặt vặt / Không quan trọng |
| Interceptor | A pattern that intercepts calls to add cross-cutting concerns (like logging). | Bộ đánh chặn |
| Push back | To resist or politely disagree with a suggestion. | Phản biện / Phản đối |

## 8. 🚫 Common Anti-Patterns & Pitfalls
- **The Dictator Anti-pattern:** Using `issue:` for subjective stylistic preferences (e.g., `issue: use single quotes instead of double quotes`). Use `nit:` or let the linter handle it.
- **The Passive-Aggressive `question:`:** Using a question as a disguised demand. (e.g., `question: Why on earth would you write it this way?`). Instead, ask genuinely or make a `suggestion:`.
- **Missing the 'Why':** Tagging something but not explaining the rationale. (e.g., `suggestion: use Map`). Always add context: `suggestion: use Map to guarantee unique keys.`

---

# 💻 Practice Workspace: Conventional Comment Tagging

# Part 2: Practice Workspace (Active Execution)

## 1. 🏗️ Scenario & Engineering Context
**Scenario:** You are a Staff Engineer reviewing a Pull Request from a newly joined developer. The PR implements a new caching layer for the user profile service. You spot several things:
1. A hardcoded connection string in the configuration file (Security Risk - must fix).
2. A monolithic function that handles both fetching and caching data (Design preference - should refactor but not strictly blocking).
3. A poorly named variable `cData` which probably means `cachedData` (Minor).
4. An excellent test suite covering edge cases (Positive feedback).

Your task is to write asynchronous PR comments for each of these findings using Conventional Comments.

## 2. 📝 User Practice Workspace

> [!NOTE]
> Write your Conventional Comments below.

**1. Security Risk (Hardcoded String):**
[Your comment here]

**2. Design Preference (Monolithic Function):**
[Your comment here]

**3. Minor Variable Name Issue:**
[Your comment here]

**4. Positive Feedback (Test Suite):**
[Your comment here]


## 3. 💡 Progressive Socratic Hints

<details>
<summary>Hint 1: Tag Selection (Linguistic)</summary>
- For the security risk, use `issue:` because it must be fixed before merging.
- For the monolithic function, use `suggestion:` as it's an architectural proposal.
- For the variable name, use `nit:`.
- For the tests, use `praise:`.
</details>

<details>
<summary>Hint 2: Softening Language (Tone/Structure)</summary>
For the `suggestion:`, use phrases like "Consider breaking this down...", "It might be cleaner if...", or "What do you think about extracting...".
</details>

<details>
<summary>Hint 3: Providing Rationale (Engineering)</summary>
Don't just point out the hardcoded string. Explain *why* it's bad (e.g., "to prevent credentials from leaking into source control").
</details>

---

# 📝 Assessment Exam: Conventional Comment Tagging

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)
**1. Which tag is most appropriate for a blocking problem that will cause a production outage?**
- [ ] A. `suggestion:`
- [ ] B. `nit:`
- [ ] C. `issue:`
- [ ] D. `question:`
<details><summary>Answer Key</summary>**C) issue:** It clearly indicates a mandatory fix before merging.</details>

**2. What is the primary purpose of the `nit:` tag?**
- [ ] A. To point out critical security flaws.
- [ ] B. To suggest minor, non-blocking improvements like typos or formatting.
- [ ] C. To demand a complete rewrite of a function.
- [ ] D. To ask the author for design context.
<details><summary>Answer Key</summary>**B) To suggest minor, non-blocking improvements.**</details>

**3. How should you format a Conventional Comment that targets a performance suggestion?**
- [ ] A. `suggestion - performance - use caching`
- [ ] B. `suggestion (performance): Consider implementing a cache here.`
- [ ] C. `PERFORMANCE SUGGESTION: cache this.`
- [ ] D. `(performance) suggestion: caching is better`
<details><summary>Answer Key</summary>**B) suggestion (performance): Consider implementing a cache here.** It follows the `<label> [decorations]: <subject>` format.</details>

**4. Why is using `question:` beneficial in code reviews?**
- [ ] A. It proves the reviewer is smarter than the author.
- [ ] B. It forces the author to immediately change their code.
- [ ] C. It replaces accusatory statements with genuine requests for context, fostering psychological safety.
- [ ] D. It acts as a permanent blocker on the PR.
<details><summary>Answer Key</summary>**C) It replaces accusatory statements with genuine requests for context.**</details>

**5. Which of the following is an anti-pattern?**
- [ ] A. Using `praise:` to highlight a well-written test.
- [ ] B. Using `issue:` to enforce personal stylistic preferences not covered by a linter.
- [ ] C. Using `chore:` to ask the author to rebase their branch.
- [ ] D. Using `suggestion:` and providing the exact code snippet to replace the original code.
<details><summary>Answer Key</summary>**B) Using issue: to enforce personal stylistic preferences.** Subjective preferences should be `nit:` or `suggestion:`, not blocking issues.</details>

## 🧪 Section 2: Fill-in-the-Blank Technical Drills
1. `________ (security):` Please remove the hardcoded API key before committing.
2. `________:` The indentation on line 45 is off by two spaces.
3. `________:` I'm not familiar with this library. Could you explain what this method does?
4. `________ (refactor):` We might want to extract this logic into a separate helper class to improve testability. WDYT?
5. `________:` Really elegant solution for handling the concurrency edge case!

<details>
<summary>Answer Key</summary>
1. issue
2. nit
3. question
4. suggestion
5. praise
</details>

## 🔍 Section 3: Error Identification & Sentence Refactoring
**Refactor the following harsh or unclear comments into constructive Conventional Comments.**

1. **Original:** This is completely wrong. You forgot the null check.
   **Refactored:** 
2. **Original:** Change the variable name. `x` is a terrible name.
   **Refactored:** 
3. **Original:** Why did you use a List here instead of a Set? It's so slow.
   **Refactored:** 
4. **Original:** The build is failing because you didn't update the package.json.
   **Refactored:** 
5. **Original:** Nice job on the docs.
   **Refactored:** 

<details>
<summary>Suggested Refactoring</summary>
1. `issue:` Missing a null check here. This could throw a NullReferenceException if the payload is empty.
2. `nit:` Consider renaming `x` to something more descriptive, like `userIndex`.
3. `suggestion (performance):` Using a Set here instead of a List would improve the lookup time to O(1).
4. `issue (build):` The CI pipeline is failing. It looks like the dependencies in `package.json` need to be updated.
5. `praise:` Great job making this documentation so clear and easy to follow!
</details>

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay
**Scenario:** An engineer has submitted a PR that introduces a new dependency to a monolithic repository. You notice that the dependency has a restrictive license (GPL) that conflicts with company policy. Furthermore, the way they initialized the library is not thread-safe.

Draft the review comments you would leave on this PR using Conventional Comments. Ensure you address both the license issue and the thread-safety issue.

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

### C1 (Senior Technical Lead) Benchmark:
> "Hey team, just reviewed the PR. 
> `issue (compliance):` We can't merge this as-is because the new dependency uses a GPL license, which violates our legal guidelines for commercial products. We'll need to find an MIT or Apache-licensed alternative.
> `issue (concurrency):` Also, the initialization pattern used here isn't thread-safe. Under heavy load, this will cause race conditions.
> `suggestion:` Once we find an alternative library, consider using a Singleton pattern or dependency injection to handle the instantiation safely. Let's sync up if you need help finding a replacement library."

### C2 (Principal Architect) Benchmark:
> "Thanks for putting this together. 
> `issue (legal/compliance):` This PR introduces a GPL-licensed package, which introduces significant legal liability for our proprietary codebase. This must be reverted immediately. 
> `issue (thread-safety):` Additionally, the current instantiation logic introduces a race condition in a multi-threaded context. 
> `suggestion (architecture):` Moving forward, I recommend wrapping any third-party integrations behind an interface. This not only abstracts the thread-safety concerns into a managed factory but also makes it trivial to swap out underlying libraries if we run into licensing issues again. Let's huddle to scope out a compliant alternative."

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric
- [ ] **Grammatical Precision:** Did I use the correct conventional comment format `<label> [decorations]:`?
- [ ] **Technical Vocabulary:** Did I accurately use terms like *race condition*, *thread-safe*, *compliance*, or *liability*?
- [ ] **Executive Tone:** Are my `issue:` comments firm but blameless? Are my `suggestion:` comments collaborative (e.g., using "Consider...", "WDYT?")?
- [ ] **Clarity of Intent:** Is it immediately obvious to the author whether a comment is blocking or non-blocking?
