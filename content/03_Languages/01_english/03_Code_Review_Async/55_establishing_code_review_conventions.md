---
title: Module 55 Resource Lesson - Establishing Team Code Review Conventions
category: 03_Code_Review_Async
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# 🚀 55. Establishing Code Review Conventions

## 🎯 1. Executive Summary & Objectives
**Goal:** Master the linguistic skills and structures needed to establish, document, and enforce code review conventions asynchronously within an engineering team.
**Engineering Impact:** Reduces PR friction, standardizes communication, prevents misunderstandings, and accelerates code integration through clear, empathetic, and unambiguous asynchronous feedback.

## 🧊 2. Warming Up
- **Question 1:** How do you feel when you receive a PR comment that just says "Fix this"?
  - *Sample Answer:* It feels abrasive and unhelpful. Without context or a proposed solution, it creates a defensive atmosphere rather than a collaborative one.
- **Question 2:** Why is it important to differentiate between blocking issues and minor suggestions in asynchronous text?
  - *Sample Answer:* To prioritize the author's time. A minor stylistic preference shouldn't block a critical hotfix, and clearly marking it prevents unnecessary delays.

## ⚙️ 3. Contrastive Analysis & Theory
### Conventional Comments Framework
Using prefixes helps immediately clarify the intent of a comment:
- **`issue:`** A blocking problem that must be resolved (e.g., bug, security flaw, anti-pattern).
- **`suggestion:`** A proposed improvement that is non-blocking but highly recommended.
- **`question:`** A request for clarification without implying a required change.
- **`nit:`** A trivial preference (e.g., typo, formatting) that shouldn't block the PR.
- **`praise:`** Highlighting exceptionally good code.

### Linguistic Softening (Mitigation Strategies)
- **Modal Verbs:** Using *could, might, would* instead of *must, have to, should*. (e.g., "We might want to extract this...")
- **First-Person Plural (We):** Using "we" instead of "you" to frame the code as a collective responsibility. (e.g., "How can we optimize this?" vs "How can you optimize this?")
- **Tentative Language:** "It seems like", "I'm wondering if", "Perhaps".

## 🛠️ 4. Real-World Engineering Context Comparison

| Junior Engineer (B1/B2) | Senior Engineer (C1/C2) | Analysis / Why it's better |
| :--- | :--- | :--- |
| "You need to add tests for this function." | "**issue (non-blocking):** We might want to add test coverage for this edge case to prevent regressions." | Uses "we", a conventional prefix, and explains the *why* (prevent regressions). |
| "This is wrong. The API doesn't work like this." | "**question:** I noticed we're calling the API synchronously here. I'm wondering if this might cause thread-blocking under load?" | Softens the critique by framing it as a question and highlighting the systemic impact. |
| "Change the variable name." | "**nit:** Minor suggestion—perhaps we could rename `x` to `retryCount` for clarity?" | Uses a `nit` prefix, offers a specific alternative, and uses tentative language. |
| "Don't use a List here, use a Set." | "**suggestion:** Since we require unique elements, using a `Set` here could improve lookup performance from O(n) to O(1)." | Provides concrete engineering justification (Big O notation) alongside the suggestion. |

## 🎭 5. Role-Play Dialogue
*Context: Tech Lead (Alex) is discussing establishing new PR guidelines with an Engineering Manager (Sam).*

**Alex (Tech Lead):** "Hey Sam, regarding our async workflows, I've noticed our PR review cycles are stretching out longer than usual. I think we'd benefit from adopting Conventional Comments."
**Sam (Engineering Manager):** "I've seen the metrics on the bottleneck. What specific convention are you proposing we implement?"
**Alex:** "I suggest we mandate prefixes like `issue:`, `suggestion:`, and `nit:`. Currently, developers are treating minor stylistic nits as blocking issues, which stalls delivery. This framework clarifies intent upfront."
**Sam:** "That sounds like a solid structural improvement. How do we ensure the tone remains constructive? Sometimes blunt prefixes can still come across as abrasive."
**Alex:** "Good point. Alongside the prefixes, I want to document guidelines on linguistic softening—encouraging the team to use 'we' instead of 'you' and to always attach the 'why' to any blocking issue."
**Sam:** "Agreed. Let's draft an RFC (Request for Comments) this afternoon and solicit feedback from the principal engineers before rolling it out."

## 💬 6. Let's talk about the role play
1. Why does Alex suggest using Conventional Comments?
2. How does Sam validate Alex's concern before asking for the specific proposal?
3. What is the final action item they agree on to roll out the new conventions?

## 📚 7. Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| **Abrasive (adj)** | Showing little concern for the feelings of others; harsh. | Gay gắt, thô lỗ |
| **Nitpick / Nit (n)** | A trivial or minor detail, often used to describe minor code formatting critiques. | Soi mói chi tiết nhỏ |
| **Conventional (adj)** | Based on or in accordance with what is generally done or believed. | Theo quy ước |
| **Mitigation (n)** | The action of reducing the severity, seriousness, or painfulness of something. | Sự giảm nhẹ (giọng điệu/rủi ro) |
| **Mandate (v)** | Require (something) to be done; make mandatory. | Bắt buộc, yêu cầu |
| **Solicit (v)** | Ask for or try to obtain (something) from someone. | Kêu gọi, thu thập (ý kiến) |
| **Asynchronous (adj)** | Not occurring at the same time; communication that doesn't expect an immediate response. | Bất đồng bộ |

## 🚫 8. Common Anti-Patterns & Pitfalls
- **The "You" Attack:** Saying "Your code fails here" instead of "The function throws an exception here". Focus on the code, not the person.
- **Missing the "Why":** Requesting a change without explaining the engineering rationale (e.g., security, performance, readability).
- **Over-Softening:** Using so much polite language that a critical, blocking security flaw sounds like an optional suggestion. (e.g., "If you have time, maybe we could secure this endpoint?").
- **Review Bombing:** Leaving 50 individual `nit` comments on syntax instead of suggesting an automated linter rule.

---

# 💻 Practice Workspace: Establishing Code Review Conventions

## 🏢 1. Scenario & Engineering Context
**Context:** You are a Senior Engineer reviewing a Pull Request (PR) from a newer developer on the team. The PR introduces a new payment processing module. You notice three issues:
1. **Critical Flaw:** The API key is hardcoded directly into the service class instead of being injected via an environment variable.
2. **Performance Issue:** A database query is inside a `for` loop, causing an N+1 query problem.
3. **Stylistic Issue:** The variable `dataArray` is not very descriptive and doesn't follow the team's naming conventions.

**Your Task:** Write three distinct asynchronous PR comments to address these issues. Use the Conventional Comments framework (`issue:`, `suggestion:`, `nit:`) and apply linguistic softening techniques to ensure your feedback is constructive, clear, and empathetic.

---

## ✍️ 2. User Practice Workspace

*(Write your draft PR comments here)*

**Comment 1 (API Key):**


**Comment 2 (N+1 Query):**


**Comment 3 (Variable Naming):**


---

## 💡 3. Progressive Socratic Hints

<details>
<summary><b>Hint 1: Tone & Structure (Conventional Comments)</b></summary>
Use `issue (blocking):` for the API key, `issue:` or `suggestion:` for the N+1 query, and `nit:` for the variable name. Make sure you clearly differentiate between what must be fixed before merging and what is just a recommendation.
</details>

<details>
<summary><b>Hint 2: Lexical (Explaining the 'Why')</b></summary>
For the N+1 query, mention the potential impact on **latency** or **database load**. For the API key, mention **security vulnerabilities** or **credential leaks**. Providing the engineering justification makes the feedback objective.
</details>

<details>
<summary><b>Hint 3: Grammar (Linguistic Softening)</b></summary>
Instead of saying "You hardcoded the API key," try using the passive voice or focusing on the code: "It looks like the API key is hardcoded here." Or use modal verbs: "We should probably inject this via environment variables to avoid..."
</details>

---

# 📝 Assessment Exam: Establishing Code Review Conventions

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)
1. Which conventional prefix is most appropriate for pointing out a minor spelling error in a variable name that doesn't affect compilation?
   - [ ] A. `issue:`
   - [ ] B. `suggestion:`
   - [ ] C. `nit:`
   - [ ] D. `question:`
   <details><summary><b>Answer</b></summary><b>C) nit:</b> A nitpick is a minor, trivial preference that shouldn't block the PR.</details>

2. What is the primary benefit of using "Linguistic Softening" in code reviews?
   - [ ] A. It makes the reviewer look smarter.
   - [ ] B. It prevents the author from feeling defensive, fostering collaboration.
   - [ ] C. It hides serious security vulnerabilities.
   - [ ] D. It reduces the amount of text you have to type.
   <details><summary><b>Answer</b></summary><b>B)</b> It prevents defensiveness and keeps the focus on collaborative problem-solving.</details>

3. Read this comment: "You need to change this algorithm because it's too slow." What is the main anti-pattern here?
   - [ ] A. Using the "You" attack.
   - [ ] B. Over-softening.
   - [ ] C. Review bombing.
   - [ ] D. Missing the "Why".
   <details><summary><b>Answer</b></summary><b>A) Using the "You" attack.</b> It targets the developer rather than the code. It should be refactored to: "This algorithm might cause performance bottlenecks..."</details>

4. How can you effectively soften a critical blocking issue without losing its urgency?
   - [ ] A. Add "Please" at the end of every sentence.
   - [ ] B. Use the `nit:` prefix to be polite.
   - [ ] C. Use objective language focusing on system impact rather than personal failure.
   - [ ] D. Say "If you have time, fix this."
   <details><summary><b>Answer</b></summary><b>C)</b> Focusing objectively on the system impact (e.g., "This will cause a memory leak in production") maintains urgency without being abrasive.</details>

5. Which of the following is the best example of providing the "Why" in a PR comment?
   - [ ] A. "suggestion: Extract this to a helper method."
   - [ ] B. "issue: Extract this to a helper method because I said so."
   - [ ] C. "suggestion: We might want to extract this to a helper method to improve reusability across different modules."
   - [ ] D. "nit: Extract this."
   <details><summary><b>Answer</b></summary><b>C)</b> It clearly states the engineering rationale (improve reusability).</details>

## 🧪 Section 2: Fill-in-the-Blank Technical Drills
1. "**________:** I noticed this loop runs in O(n^2) time. We might want to optimize it to avoid latency spikes." *(Hint: A prefix for a blocking problem)*
2. Instead of saying "You wrote bad code," try saying, "It ________ like this function could be simplified." *(Hint: Tentative language verb)*
3. "**________:** Minor typo in the documentation on line 42." *(Hint: Prefix for trivial issues)*
4. To avoid sounding abrasive, we often use the pronoun "**________**" instead of "you" to frame the codebase as a shared responsibility.
5. A solid PR comment always includes the engineering **________**, explaining *why* a change is requested.

<details><summary><b>Answers</b></summary>1. issue, 2. seems/looks, 3. nit, 4. we, 5. rationale/context</details>

## 🔍 Section 3: Error Identification & Sentence Refactoring
*Refactor the following abrasive or unclear PR comments into C1/C2 level conventional comments.*

1. **Original:** You didn't handle the null exception here. Fix it.
   **Refactored:** __________________________________________________
2. **Original:** Change the variable name `x` to `userData`.
   **Refactored:** __________________________________________________
3. **Original:** Why did you use a List? A Set is better.
   **Refactored:** __________________________________________________
4. **Original:** Delete this console.log.
   **Refactored:** __________________________________________________
5. **Original:** You must add unit tests before I approve this.
   **Refactored:** __________________________________________________

<details>
<summary><b>Sample Refactorings</b></summary>
1. <b>issue:</b> It looks like we might be missing a null check here. We should probably add one to prevent runtime exceptions.
2. <b>nit:</b> Suggestion: perhaps we could rename `x` to `userData` for better readability?
3. <b>question:</b> I'm wondering if using a `Set` here might improve our lookup performance compared to a `List`?
4. <b>nit (blocking):</b> We should remove this debug `console.log` before merging to production.
5. <b>issue (blocking):</b> We'll need to add unit test coverage for these new edge cases before we can safely merge this.
</details>

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay
**Scenario:** A peer has submitted a PR that contains a brilliant architectural solution to a complex problem, but the code formatting is very messy, and there are several typos in the variable names. 
**Task:** Write a single, well-structured PR summary comment that delivers praise for the architecture while clearly communicating that the formatting needs to be cleaned up before merging.

*(Write your response here)*

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

### Senior Technical Lead (C1)
"Great work on the core algorithm here! The architectural approach is really solid and solves the race condition nicely. 
I've left a few inline comments. Most are just minor `nit`s regarding variable naming and formatting to align with our style guide. There is one `issue` regarding error handling on the database timeout that we'll need to address before we merge. Let me know if you want to pair on that!"

### Principal Architect (C2)
"Excellent architectural design on this module. The abstraction layer you've introduced significantly decouples our service dependencies, which is exactly what we needed.
I've dropped a few `suggestion`s inline regarding test coverage and a couple of `nit`s for stylistic alignment. The only blocking `issue` I noted is around the retry backoff logic, which could potentially overwhelm the downstream service under load. Could we look into implementing an exponential backoff there? Happy to discuss async or hop on a quick call if needed."

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric
| Criteria | B2 (Intermediate) | C1/C2 (Advanced/Executive) | Self-Check |
| :--- | :--- | :--- | :--- |
| **Use of Conventions** | Mixed or absent use of prefixes. | Consistently uses `issue:`, `suggestion:`, `nit:` correctly. | [ ] |
| **Linguistic Softening** | Often uses "you" and direct commands ("Change this"). | Consistently uses "we", modal verbs (might, could), and tentative language. | [ ] |
| **Context & Rationale** | Requests changes without explaining the "why". | Always attaches clear engineering justification (performance, security, readability) to requests. | [ ] |
| **Tone Management** | Can sound unintentionally abrasive or bossy. | Maintains an empathetic, collaborative, and objective tone. | [ ] |
