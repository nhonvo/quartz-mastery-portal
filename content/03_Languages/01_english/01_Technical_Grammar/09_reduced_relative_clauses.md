---
title: Module 09 Resource Lesson - Reduced Relative Clauses in Technical Writing
category: 01_Technical_Grammar
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# Resource Lesson: Reduced Relative Clauses

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
**Goal:** Master the use of reduced relative clauses to make technical writing and spoken engineering communication more concise, impactful, and professional.
**Engineering Impact:** In technical documentation (RFCs, ADRs, PR descriptions) and executive summaries, brevity is highly valued. Reducing relative clauses eliminates wordiness, creating crisp, punchy sentences without losing critical context.

## 2. 🧊 Warming Up
*   **Question 1:** When reviewing a PR, how often do you find yourself writing long sentences starting with "The service, which is running on port 8080..."? 
    *   *Sample Answer:* Very often. It feels polite but sometimes overly wordy, especially in quick Slack updates.
*   **Question 2:** Why do you think senior engineers write shorter but denser sentences in design docs?
    *   *Sample Answer:* They want to deliver maximum context with minimum cognitive load for the reader.

## 3. ⚙️ Contrastive Analysis & Theory
A **relative clause** starts with a relative pronoun (who, which, that) and a verb. A **reduced relative clause** removes the pronoun and the "be" verb, leaving either a present participle (V-ing) for active voice or a past participle (V3/ed) for passive voice.

**Formula 1: Active Voice (V-ing)**
*   *Full:* The microservice **that handles** authentication is currently down.
*   *Reduced:* The microservice **handling** authentication is currently down.

**Formula 2: Passive Voice (V3/ed)**
*   *Full:* The payload, **which was generated** by the client, contains malformed JSON.
*   *Reduced:* The payload, **generated** by the client, contains malformed JSON.

**Formula 3: Adjective Phrases (Removing pronoun + to be)**
*   *Full:* The new feature, **which is available** in version 2.0, improves performance.
*   *Reduced:* The new feature, **available** in version 2.0, improves performance.

## 4. 🛠️ Real-World Engineering Context Comparison

| Context | Junior/Mid-Level (B1/B2) - Full Clause | Senior/Staff (C1/C2) - Reduced Clause |
| :--- | :--- | :--- |
| **System Design** | The load balancer, which routes traffic to the pods, is misconfigured. | The load balancer **routing** traffic to the pods is misconfigured. |
| **Code Review** | The function that was implemented yesterday has a memory leak. | The function **implemented** yesterday has a memory leak. |
| **Post-Mortem** | The database index, which is responsible for the query speedup, was dropped. | The database index **responsible** for the query speedup was dropped. |
| **Release Note** | We deprecated the endpoint that is returning the legacy user object. | We deprecated the endpoint **returning** the legacy user object. |

## 5. 🎭 Role-Play Dialogue
**Context:** An Architect (Sarah) and a Lead Engineer (David) are discussing a migration strategy during a technical sync.

**Sarah:** We need to look at the latency spikes. Are the background jobs, **scheduled** for midnight, still causing database locks? *(Reduced passive)*
**David:** Yes. The cron scheduler, **running** on the legacy EC2 instance, seems to be the bottleneck. *(Reduced active)*
**Sarah:** Got it. Let's prioritize migrating the workers **handling** the email queue first. *(Reduced active)*
**David:** Agreed. The migration plan, **proposed** by the SRE team last week, already covers this. I'll get it prioritized. *(Reduced passive)*

## 6. 💬 Let's talk about the role play
1.  *Why did Sarah say "the background jobs, scheduled for midnight" instead of "which are scheduled"?*
    *   It sounds more direct and authoritative, standard for a fast-paced technical discussion.
2.  *How does the use of reduced clauses impact the flow of the conversation?*
    *   It makes the exchange denser with technical facts, minimizing filler words and keeping the focus on the engineering subjects ("scheduler", "workers", "plan").

## 7. 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| **Bottleneck** | A point of congestion in a system that slows down the overall performance. | Điểm nghẽn |
| **Latency spike** | A sudden, temporary increase in the time it takes for data to transfer across a network. | Hiện tượng tăng độ trễ đột biến |
| **Deprecate** | To discourage the use of a software feature, usually because it has been superseded. | Ngừng hỗ trợ / Không khuyến khích dùng |
| **Payload** | The part of transmitted data that is the actual intended message. | Tải trọng (dữ liệu thực) |
| **Prioritize** | To designate or treat something as being very or most important. | Ưu tiên |

## 8. 🚫 Common Anti-Patterns & Pitfalls
1.  **Reducing when it's not the subject:** You can only reduce relative clauses when the relative pronoun (who, which, that) is the *subject* of the clause.
    *   *Wrong:* The PR reducing by John is merged. (If John is the one who opened it).
    *   *Right:* The PR opened by John is merged. (The PR which was opened...)
2.  **Using V-ing for Passive:** Confusing active and passive reductions.
    *   *Wrong:* The code writing yesterday has bugs.
    *   *Right:* The code **written** yesterday has bugs.
3.  **Dangling Modifiers:** Sometimes over-reducing leads to ambiguous sentences if the subject isn't perfectly clear. Always ensure the noun being modified is immediately adjacent to the reduced phrase.

---

# Practice Workspace: Reduced Relative Clauses

# Part 2: Practice Workspace (Active Execution)

## 1. 🏗️ Scenario & Engineering Context
**Scenario:** You are writing an Incident Report (Post-Mortem) following a brief system outage. The preliminary draft was written by a junior engineer and is very wordy, using full relative clauses everywhere. Your goal is to review and refactor the summary to be punchy, professional, and dense with information—befitting a Senior/Staff Engineer communicating with executives.

**Original Draft (from Junior Engineer):**
> "The outage that happened yesterday was caused by a memory leak. The memory leak, which was introduced in the last deployment, crashed the primary database. The fallback system, which is located in the EU region, took over. However, the requests that were coming from the Asian market timed out."

## 2. 📝 User Practice Workspace

*Write your refactored Incident Report summary here using reduced relative clauses:*

```markdown
### Incident Summary (Draft)
[Your text here...]




```

## 3. 💡 Progressive Socratic Hints

<details>
<summary><b>Hint 1: Grammar (Active vs. Passive)</b></summary>
Identify which clauses are passive (e.g., "which was introduced") and which are active (e.g., "that were coming"). Use V3/ed for the passive ones and V-ing for the active ones.
</details>

<details>
<summary><b>Hint 2: Lexical (Elevating Vocabulary)</b></summary>
Instead of "happened yesterday," can you use "occurring yesterday"? Instead of "which is located," can you just say "located"? 
</details>

<details>
<summary><b>Hint 3: Tone/Structure (Executive Style)</b></summary>
Try this structure:
"The outage **occurring** yesterday was caused by a memory leak **introduced** in the last deployment. This leak crashed the primary database. The fallback system **located** in the EU region took over; however, requests **originating** from the Asian market timed out."
</details>

---

# Assessment Exam: Reduced Relative Clauses

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)
Choose the best option to complete the sentence using a reduced relative clause.

1. The data pipeline, ________ by the data engineering team last quarter, is highly scalable.
   - [ ] A. which building
   - [ ] B. built
   - [ ] C. was built
   - [ ] D. building

2. All incoming requests ________ a specific authentication header will be rejected by the API gateway.
   - [ ] A. lacking
   - [ ] B. lacked
   - [ ] C. which lacked
   - [ ] D. are lacking

3. The bug, ________ in production for three months, was finally patched.
   - [ ] A. hidden
   - [ ] B. hiding
   - [ ] C. was hidden
   - [ ] D. hide

4. Engineers ________ on the legacy monolithic architecture will be transitioned to the new microservices squad.
   - [ ] A. worked
   - [ ] B. working
   - [ ] C. are working
   - [ ] D. work

5. Any logs ________ sensitive user information must be masked before storage.
   - [ ] A. contained
   - [ ] B. containing
   - [ ] C. are containing
   - [ ] D. contain

<details>
<summary><b>Answer Key & Explanations</b></summary>
1. **B) built** (Passive voice: The pipeline which was built by...)
2. **A) lacking** (Active voice: The requests which lack a specific header...)
3. **A) hidden** (Passive voice: The bug which was hidden...)
4. **B) working** (Active voice: Engineers who are working...)
5. **B) containing** (Active voice: Logs which contain sensitive information...)
</details>

---

## 🧪 Section 2: Fill-in-the-Blank Technical Drills
Complete the sentence by reducing the relative clause in parentheses into its V-ing or V3/ed form.

1. The hotfix ________ (that was deployed) yesterday solved the memory leak. -> The hotfix **__________** yesterday solved the memory leak.
2. We need to monitor the processes ________ (that consume) the most CPU. -> We need to monitor the processes **__________** the most CPU.
3. The design doc ________ (which was written) by the architect was approved. -> The design doc **__________** by the architect was approved.
4. Services ________ (that fail) to respond within 500ms will trigger an alert. -> Services **__________** to respond within 500ms will trigger an alert.
5. The endpoints ________ (which are exposed) to the public internet need rate limiting. -> The endpoints **__________** to the public internet need rate limiting.

---

## 🔍 Section 3: Error Identification & Sentence Refactoring
Identify the grammar or structural error in the reduced relative clauses below and refactor them.

1. **Incorrect:** The script running by the cron job failed at 2 AM.
   **Refactored:** _________________________________________

2. **Incorrect:** The servers, locating in the US-East region, are experiencing downtime.
   **Refactored:** _________________________________________

3. **Incorrect:** Any developer commits directly to main will be flagged by the system.
   **Refactored:** _________________________________________

4. **Incorrect:** The payload sending from the mobile app is too large.
   **Refactored:** _________________________________________

5. **Incorrect:** The database cluster, was configured last week, is already overloaded.
   **Refactored:** _________________________________________

---

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay
**Scenario:** You are speaking in an architectural review meeting. A stakeholder asks about a new caching layer you want to introduce. 
**Stakeholder:** "Why do we need this new Redis cache?"

**Your Task:** Write a 2-3 sentence response using at least **two** reduced relative clauses to explain that the queries coming from the dashboard are slowing down the system and the cache implemented here will alleviate the load.

**Your Response:**
____________________________________________________________________
____________________________________________________________________

---

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

**Context:** Explaining the architectural decision to introduce the Redis cache.

*   **Senior Technical Lead (C1):** 
    "The primary issue is the high volume of queries **originating** from the analytics dashboard. The new Redis cache, **implemented** as an intermediate layer, will significantly reduce the load on our primary database, resolving the latency spikes."
    *(Clear, professional, and uses reduced clauses effectively for flow).*

*   **Principal Architect (C2):** 
    "The bottlenecks we're seeing stem largely from unoptimized reads **hitting** the DB cluster directly. A distributed caching strategy, **deployed** ahead of the main datastore, will intercept these reads, ensuring the core infrastructure remains highly available under peak load."
    *(Highly dense vocabulary ("stem largely", "intercept", "highly available"), flawless use of reduced clauses).*

---

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric

| Criteria | B2 (Independent) | C1 (Advanced) | C2 (Mastery) |
| :--- | :--- | :--- | :--- |
| **Grammatical Precision** | Can reduce clauses but occasionally confuses active (V-ing) and passive (V3/ed). | Consistently applies active and passive reductions correctly. | Uses reduced clauses intuitively to manage sentence rhythm and emphasize key technical nouns. |
| **Brevity & Density** | Sentences are still somewhat wordy with unnecessary filler. | Sentences are concise; filler words ("which is", "that are") are mostly eliminated. | Utterances are highly dense, packing maximum technical context into tight phrasing. |
| **Technical Vocabulary** | Uses standard tech terms (e.g., "made by", "running"). | Uses elevated tech verbs (e.g., "implemented by", "originating from"). | Uses executive-level phrasing (e.g., "deployed ahead of", "stemming from"). |
