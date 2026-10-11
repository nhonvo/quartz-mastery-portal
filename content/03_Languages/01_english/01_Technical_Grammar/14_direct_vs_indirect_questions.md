---
title: Module 14 Resource Lesson - Direct vs. Indirect Questions in Async Syncs
category: 01_Technical_Grammar
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# 14. Direct vs. Indirect Questions: Linguistic Softening for Code Reviews & Async Communication

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
**Goal:** Master the grammatical shift from direct questions (which can sound aggressive or demanding) to indirect questions (which soften requests, preserve psychological safety, and foster collaborative problem-solving) in asynchronous channels and code reviews.
**Engineering Impact:** Indirect questions are the cornerstone of senior engineering communication. By employing "linguistic softening," you reduce defensiveness in PR reviews, make cross-functional requests sound more polite, and navigate blameless post-mortems with a high degree of executive presence (C1/C2 level).

## 2. 🧊 Warming Up
**Reflective Questions:**
*   Have you ever received a PR comment that felt overly aggressive, even if technically correct? How did it make you feel?
*   How do you politely ask a Senior Engineer why they chose a specific database index without sounding like you are questioning their competence?

**Sample Answers:**
*   *Yes, comments like "Why did you do this?" can feel like an attack. It puts the author on the defensive.*
*   *Instead of "Why did you use a B-tree?", I might ask, "Could you share the reasoning behind selecting a B-tree here?"*

## 3. ⚙️ Contrastive Analysis & Theory

**Direct Questions**
*   **Formula:** (Wh- word) + Auxiliary Verb + Subject + Main Verb
*   **Usage:** Good for close colleagues, simple fact-finding, or urgent incidents.
*   **Example:** "Why did the pipeline fail?" / "When will the deployment finish?"

**Indirect Questions**
*   **Formula:** Introductory Phrase + (Wh- word / if / whether) + Subject + Verb + (Auxiliary)
    *   *Notice the word order changes to standard statement order (Subject + Verb) after the introductory phrase.*
*   **Usage:** Essential for PR reviews, stakeholder updates, probing architectural decisions, and avoiding blame.
*   **Example Introductory Phrases:**
    *   "Could you clarify..."
    *   "I was wondering if..."
    *   "Do you know why..."
    *   "Would it make sense to..."
    *   "Can you elaborate on..."

**The Golden Rule:** When shifting from direct to indirect, drop the "do/does/did" auxiliary verb used for questions and ensure the subject precedes the verb.
*   *Direct:* Why **did it** crash? -> *Indirect:* Could you clarify why **it crashed**? (Not: *Could you clarify why did it crash?*)

## 4. 🛠️ Real-World Engineering Context Comparison

| Context | Junior (B1/B2) - Direct / Abrasive | Senior/Staff (C1/C2) - Indirect / Softened |
| :--- | :--- | :--- |
| **PR Review: Questioning Logic** | Why did you use a nested loop here? It's O(N^2). | **Could you walk me through** the decision to use a nested loop here? **I'm wondering if** a hash map might be more performant. |
| **Incident Response: Finding Cause** | Who broke the production database? | **Do we have any insight into** what triggered the database lock? |
| **Status Update: Asking for ETA** | When will the API be ready? | **Could you give me an estimate on** when the API endpoint might be available? |
| **Architecture Review: Challenging** | Why didn't you use Kafka? | **I'm curious whether** Kafka was considered for the event bus, given our throughput needs? |

## 5. 🎭 Role-Play Dialogue
*Context: A code review sync between a Mid-Level Engineer (Alex) and a Senior Engineer (Sarah) regarding a recent microservice PR.*

**Alex:** Sarah, I saw your comments on my PR for the auth service. You left a lot of feedback on the caching layer. Why is my Redis implementation wrong?
**Sarah:** It’s not necessarily wrong, Alex. **I was just wondering if** we had considered the memory implications of caching every single user token indefinitely.
**Alex:** Oh, I didn't set a TTL? Let me check. But why do we need a TTL if the cache is large enough?
**Sarah:** **Could you clarify** how large our Redis instance currently is? Even with a large cache, without eviction policies, we risk an OOM crash. **Would it make sense to** implement an LRU eviction strategy alongside a 24-hour TTL?
**Alex:** I see your point. That makes sense. I’ll update the PR.

## 6. 💬 Let's talk about the role play
1.  How did Alex initially approach the PR feedback? How could Alex have used an indirect question to sound less defensive?
2.  Identify the indirect questions Sarah used. How did these phrases help keep the conversation constructive?

## 7. 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| **Linguistic Softening** | The use of phrasing to make requests or questions sound less demanding or aggressive. | Nói giảm nói tránh (trong ngôn ngữ) |
| **Defensiveness** | The quality of being anxious to challenge or avoid criticism. | Sự phòng thủ, tự ái |
| **Blameless Post-mortem** | A review of an incident that focuses on systemic causes rather than individual fault. | Họp rút kinh nghiệm không đổ lỗi |
| **Eviction Policy** | A rule determining which items to remove from a cache when it is full (e.g., LRU). | Chính sách thu hồi/xóa (bộ nhớ đệm) |
| **Elaborate** | To add more detail concerning what has already been said. | Giải thích chi tiết/Làm rõ thêm |

## 8. 🚫 Common Anti-Patterns & Pitfalls

*   **Anti-Pattern 1: The Double Question (Grammar Error)**
    *   *Mistake:* "I was wondering why **did you** choose PostgreSQL?" (Keeping the auxiliary 'did')
    *   *Correction:* "I was wondering why **you chose** PostgreSQL."
*   **Anti-Pattern 2: The Aggressive "Why" in Code Reviews**
    *   *Mistake:* Commenting "Why?" on a line of code. It provides no context and implies the code is bad.
    *   *Correction:* "Could you clarify the logic here? I'm having trouble following the state mutation."
*   **Anti-Pattern 3: Using 'If' vs 'Whether' incorrectly**
    *   *Note:* Both are fine in casual speech, but "whether" sounds more professional in formal engineering contexts, especially when presenting alternatives.
    *   *Example:* "I'm checking **whether** we should scale vertically or horizontally."

---

# Practice Workspace: Direct vs. Indirect Questions

# Part 2: Practice Workspace (Active Execution)

## 1. 🏗️ Scenario & Engineering Context
**Context:** You are reviewing a Pull Request from a peer engineer. They have introduced a new dependency (`lodash`) just to use a single utility function (`_.isEmpty`), which adds unnecessary weight to the bundle size. 

You need to ask them why they added the dependency and suggest using vanilla JavaScript instead.

**Goal:** Write a PR comment using *indirect questions* and *linguistic softening* to avoid sounding aggressive while pointing out the bundle size concern.

## 2. 📝 User Practice Workspace
*(Write your response below)*

> 
> 
> 

## 3. 💡 Progressive Socratic Hints

<details>
<summary><b>Hint 1: Grammar (Word Order)</b></summary>

Avoid starting with "Why did you...". Instead, use an introductory phrase like "I was wondering if..." or "Could you clarify...". Remember to drop the auxiliary "did" and use standard subject-verb order.
</details>

<details>
<summary><b>Hint 2: Lexical (Technical Vocabulary)</b></summary>

Use terms like "bundle size", "dependency overhead", or "vanilla JavaScript". For example, "Could you clarify the reasoning behind introducing `lodash` given our constraints on bundle size?"
</details>

<details>
<summary><b>Hint 3: Tone/Structure (Collaborative Approach)</b></summary>

Frame the alternative as a suggestion rather than an order. Try phrasing it as: "Would it make sense to use native `Object.keys(obj).length === 0` here instead to save on dependency overhead?"
</details>

---

# Assessment Exam: Direct vs. Indirect Questions

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)

**1. Which of the following is a grammatically correct indirect question?**
- [ ] A. Could you clarify why did the server crash?
- [ ] B. I was wondering why the server crashed?
- [ ] C. Could you clarify why the server crashed?
- [ ] D. Do you know when will the deployment finish?

<details>
<summary><b>Answer Key</b></summary>
**Correct Answer: C**
*Explanation:* When forming an indirect question, you must drop the auxiliary verb (did) and use normal statement word order (the server crashed). B is punctuated incorrectly (it's a statement, not a question).
</details>

**2. You want to ask a colleague if they have considered using GraphQL instead of REST. Which option is the most softened and collaborative?**
- [ ] A. Why didn't you use GraphQL here?
- [ ] B. Did you even think about using GraphQL?
- [ ] C. I'm curious whether GraphQL was considered for this endpoint?
- [ ] D. Tell me your reason for not using GraphQL.

<details>
<summary><b>Answer Key</b></summary>
**Correct Answer: C**
*Explanation:* C uses the introductory phrase "I'm curious whether" which removes the accusatory tone found in the direct questions (A, B, and D).
</details>

**3. Choose the correct introductory phrase to soften this direct question: "When is the feature freeze?"**
- [ ] A. I want to know when is...
- [ ] B. Do we have any insight into when...
- [ ] C. Why is...
- [ ] D. Tell me when...

<details>
<summary><b>Answer Key</b></summary>
**Correct Answer: B**
*Explanation:* B is a standard C1/C2 phrase for politely asking for scheduling or factual information without sounding demanding.
</details>

**4. What is the primary purpose of linguistic softening in code reviews?**
- [ ] A. To make the code compile faster.
- [ ] B. To confuse the Junior engineer.
- [ ] C. To reduce defensiveness and foster psychological safety.
- [ ] D. To avoid leaving any comments at all.

<details>
<summary><b>Answer Key</b></summary>
**Correct Answer: C**
*Explanation:* Softening questions helps maintain a collaborative environment rather than an adversarial one.
</details>

**5. Convert the following to an indirect question: "Who approved this PR?"**
- [ ] A. Do you know who did approve this PR?
- [ ] B. Could you let me know who approved this PR?
- [ ] C. I was wondering who approve this PR?
- [ ] D. Can you clarify who did approved this PR?

<details>
<summary><b>Answer Key</b></summary>
**Correct Answer: B**
*Explanation:* B correctly maintains the subject "who" and the verb "approved" without introducing an unnecessary auxiliary verb.
</details>

---

## 🧪 Section 2: Fill-in-the-Blank Technical Drills

1. Instead of asking "Why did the build fail?", you can ask: "Could you clarify what ________ the build failure?"
2. Instead of "When will the migration be done?", ask: "Do you have an estimate on when the migration ________ be completed?"
3. Instead of "Why did you use an array here?", ask: "I was wondering ________ you chose an array for this data structure."
4. Instead of "Is the API down?", ask: "Could you check ________ the API is currently experiencing downtime?"
5. Instead of "What is the root cause?", ask: "Do we have any insight into ________ the root cause might be?"

<details>
<summary><b>Answer Key</b></summary>
1. caused / triggered
2. might / will
3. why
4. if / whether
5. what
</details>

---

## 🔍 Section 3: Error Identification & Sentence Refactoring

Identify the error in each sentence and refactor it into a polished, C1/C2 level indirect question.

1. **Original:** I was wondering why did you revert my commit?
2. **Original:** Could you explain me how does the new queuing system work?
3. **Original:** Do you know when is the database maintenance window?
4. **Original:** I'd like to know if did we run the integration tests.
5. **Original:** Can you clarify why didn't you add pagination to this API?

<details>
<summary><b>Answer Key</b></summary>
1. **Refactored:** I was wondering why you reverted my commit. (Remove 'did')
2. **Refactored:** Could you explain how the new queuing system works? (Remove 'me', remove 'does', change 'work' to 'works')
3. **Refactored:** Do you know when the database maintenance window is? (Move 'is' to the end)
4. **Refactored:** I'd like to know if we ran the integration tests. (Remove 'did', change 'run' to 'ran')
5. **Refactored:** Can you clarify why pagination wasn't added to this API? OR Could you walk me through the decision to omit pagination here? (Remove 'didn't you' and rephrase for a softer tone)
</details>

---

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay

**Scenario:** You are the tech lead. A developer on your team has hardcoded a set of API keys directly into the frontend codebase. This is a severe security risk. You need to address this immediately in the PR review. 

**Task:** Write a comment that addresses the critical security issue without aggressively attacking the developer (e.g., don't just say "Why did you hardcode this?"). Use indirect questions to guide them toward using environment variables.

*(Write your response below)*
> 
> 
> 

---

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

**Scenario:** Addressing the hardcoded API keys from Section 4.

**C1 (Senior Technical Lead):**
> "Thanks for getting this feature out so quickly. I noticed that the API keys are currently hardcoded in the frontend module. **I was wondering if** we could move these into environment variables instead? Exposing them in the client bundle poses a security risk. **Could you let me know if** you need help setting up the `.env` configuration?"

**C2 (Principal Architect):**
> "Great progress on this implementation. Regarding the authentication setup, **could you walk me through** the approach taken with the API keys? Given our security compliance guidelines, **I'm curious whether** we considered injecting these at runtime via environment variables rather than embedding them directly in the source. Let's sync if there are blockers preventing us from externalizing these secrets."

---

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric

| Criteria | B2 (Intermediate) | C1 (Advanced) | C2 (Mastery) | Your Score |
| :--- | :--- | :--- | :--- | :--- |
| **Grammar (Word Order)** | Sometimes leaves the auxiliary 'do/did' in the indirect question. | Consistently drops the auxiliary verb and uses correct statement word order. | Flawless execution of complex structures (e.g., "I'm curious whether we considered..."). | [ ] |
| **Tone & Empathy** | Tries to be polite but can still sound blunt or interrogative. | Successfully uses "Could you clarify" or "I was wondering" to soften feedback. | Masterfully navigates blame-free communication; frames feedback as collaborative inquiry. | [ ] |
| **Technical Vocabulary** | Uses basic words (e.g., "secret", "change"). | Uses professional IT terms (e.g., "environment variables", "security risk"). | Uses precise architectural terms naturally (e.g., "injecting at runtime", "externalizing secrets"). | [ ] |
