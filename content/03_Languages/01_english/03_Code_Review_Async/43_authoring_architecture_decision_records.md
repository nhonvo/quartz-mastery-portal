---
title: Module 43 Resource Lesson - Authoring Architecture Decision Records (ADRs)
category: 03_Code_Review_Async
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# 🚀 Authoring Architecture Decision Records (ADRs)

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
The goal of this lesson is to master the language and structure necessary to author effective Architecture Decision Records (ADRs). ADRs are critical artifacts in software engineering that document the "why" behind significant architectural choices. You will learn to articulate context neutrally, justify decisions with objective trade-offs, and describe consequences clearly, demonstrating a C1/C2 level of technical communication.

## 2. 🧊 Warming Up
**Reflective Questions:**
- Have you ever had to decipher *why* a previous engineer chose a specific technology, only to find no documentation? How did that impact your work?
- What do you think is the hardest part of explaining a complex architectural decision to both technical and non-technical stakeholders?

*Sample Answer:* 
"Yes, I once spent days reverse-engineering a legacy microservice because there was no historical context for why Kafka was chosen over RabbitMQ. The hardest part of explaining decisions is balancing deep technical details with the high-level business impact so everyone understands the trade-offs."

## 3. ⚙️ Contrastive Analysis & Theory
An ADR typically follows a specific structure: Title, Status, Context, Decision, and Consequences.
- **Context:** Describe the forces at play, including technological, political, and social project context. Use *neutral, objective* language (e.g., "The current system experiences...", not "The old system is terrible...").
- **Decision:** State clearly what is being done. Use active voice and precise verbs (e.g., "We will adopt...", "We have elected to...").
- **Consequences:** Detail the resulting context, both positive (benefits) and negative (trade-offs/risks). Use modal verbs for potential risks (e.g., "This *may* require...", "We *will need* to...").

## 4. 🛠️ Real-World Engineering Context Comparison

| Junior Engineer (B1/B2) | Senior/Staff Engineer (C1/C2) | Why it’s better |
| :--- | :--- | :--- |
| The old database is too slow when we have a lot of users, so we need a new one. | The current monolithic relational database introduces unacceptable read-latency during peak loads, necessitating a transition to a distributed NoSQL solution. | Professional, objective tone; precise technical vocabulary ("read-latency", "distributed"). |
| We will use Redis because it's fast. | We have elected to implement Redis for our caching layer to reduce database read operations and improve overall endpoint response times. | Clearly states the *action* and the specific *architectural benefit*. |
| This is good because it's faster, but bad because we have to learn it. | Positive: Substantial reduction in latency. Negative: Introduces operational overhead and requires team upskilling in key-value store paradigms. | Uses industry-standard terms ("operational overhead", "upskilling"); structured for readability. |
| I decided to split the API. | To decouple deployment cycles and isolate failure domains, we will decompose the unified API gateway into domain-specific microservices. | Focuses on the *architectural drivers* ("decouple deployment cycles", "isolate failure domains") rather than personal preference. |

## 5. 🎭 Role-Play Dialogue
*Context: A Staff Engineer (Sarah) is reviewing a draft ADR with a Senior Engineer (Tom) regarding a shift from REST to GraphQL.*

**Tom:** Hey Sarah, I drafted the ADR for migrating our public API to GraphQL. Could you take a look at the context section?
**Sarah:** Sure, Tom. Let's see... You wrote, "REST is too rigid for our front-end team." It’s a bit informal. We should frame this around the architectural constraints. How about, "The current REST architecture results in significant over-fetching, impacting client-side performance"?
**Tom:** Ah, that sounds much more objective. For the consequences, I put down that it will speed up UI development.
**Sarah:** That’s a valid positive consequence. However, we must also highlight the trade-offs. We need to mention the added complexity of caching and securing a GraphQL endpoint.
**Tom:** Good point. I'll add a bullet point stating: "Negative: Introduces challenges regarding query depth limiting and necessitates a revamped caching strategy."
**Sarah:** Perfect. That demonstrates a mature understanding of the system-wide impact.

## 6. 💬 Let's talk about the role play
- Why did Sarah suggest changing "REST is too rigid" to "results in significant over-fetching"?
- How does adding negative consequences (trade-offs) strengthen an ADR?

## 7. 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| **Trade-off** | A situational decision that involves diminishing or losing one quality, quantity, or property of a set or design in return for gains in other aspects. | Sự đánh đổi |
| **Over-fetching** | Retrieving more data than is strictly necessary for a specific operation or view. | Lấy thừa dữ liệu |
| **Decouple** | To separate components so that they can operate or be developed independently. | Tách rời (giảm phụ thuộc) |
| **Overhead** | The resources (time, memory, effort) required to perform a specific task, distinct from the core computation. | Chi phí/Tài nguyên phát sinh |
| **Domain-specific** | Pertaining to a particular area of interest or functionality within a system. | Đặc thù nghiệp vụ/lĩnh vực |

## 8. 🚫 Common Anti-Patterns & Pitfalls
- **The "Sales Pitch" Anti-pattern:** Writing the ADR to "sell" a technology rather than documenting a decision objectively. Avoid marketing jargon.
- **Ignoring the Negative:** Failing to document the drawbacks or risks of a decision. A C-level engineer knows that *every* decision has trade-offs.
- **Lack of Context:** Stating the decision without explaining the historical or technical constraints that made it necessary. If someone reads it in 2 years, they must understand *why* it was done.
- **Using Subjective Language:** Saying "Framework X is better" instead of "Framework X provides better throughput under high concurrency."

---

# 🛠️ Practice Workspace: Authoring Architecture Decision Records (ADRs)

# Part 2: Practice Workspace (Active Execution)

## 1. 🏢 Scenario & Engineering Context

**Scenario:** You are the Lead Backend Engineer at a mid-sized e-commerce company. The current monolithic PostgreSQL database is struggling to keep up with the read volume during flash sales, resulting in connection timeouts and degraded user experience. 

You need to write an Architecture Decision Record (ADR) proposing the introduction of **Redis** as a distributed caching layer for the product catalog. 

Your task is to draft the **Context**, **Decision**, and **Consequences** (Positive and Negative) sections of the ADR.

## 2. 📝 User Practice Workspace

*Write your ADR draft below this line:*

---

**Title:** Adopt Redis for Product Catalog Caching
**Status:** Proposed

**Context:**
[Draft your context here...]

**Decision:**
[Draft your decision here...]

**Consequences:**
[Draft your consequences here...]

---

## 3. 💡 Progressive Socratic Hints

<details>
<summary><b>Hint 1: Structural Hint (Context)</b></summary>
Focus on the *objective* problem. Don't say "PostgreSQL is bad." Instead, describe the specific technical limitation: "During high-traffic events (e.g., flash sales), the monolithic PostgreSQL instance experiences high read contention, leading to..."
</details>

<details>
<summary><b>Hint 2: Lexical Hint (Decision)</b></summary>
Use active, authoritative phrasing for your decision. Words like "implement," "leverage," "introduce," or "decouple" are highly effective here. E.g., "We have elected to introduce Redis to..."
</details>

<details>
<summary><b>Hint 3: Grammar/Tone Hint (Consequences)</b></summary>
Ensure you list both positive and negative consequences. Use modal verbs for risks. 
*Positive:* "Reduces database read load by X%." 
*Negative:* "Introduces caching invalidation complexity; requires operational overhead to manage the Redis cluster."
</details>

---

# 📝 Assessment Exam: Authoring Architecture Decision Records (ADRs)

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)

**1. Which phrase is the most appropriate for the "Context" section of an ADR?**
- [ ] A. "The old system sucks because it's too slow."
- [ ] B. "Our current architecture experiences significant latency under peak loads."
- [ ] C. "We need a new database to fix the speed issues."
- [ ] D. "The latency is bad so we should change it."
<details><summary><b>Answer Key</b></summary>B) "Our current architecture experiences significant latency under peak loads." - It is objective and uses precise technical terminology.</details>

**2. When writing the "Decision" section, what tone should you adopt?**
- [ ] A. Passive and uncertain (e.g., "Maybe we can use...")
- [ ] B. Sales-oriented and enthusiastic (e.g., "This is the best tool ever!")
- [ ] C. Active and definitive (e.g., "We will adopt...")
- [ ] D. Apologetic (e.g., "Sorry, but we have to change...")
<details><summary><b>Answer Key</b></summary>C) Active and definitive - Decisions should be stated clearly and authoritatively.</details>

**3. What is a critical component of the "Consequences" section?**
- [ ] A. A list of all the engineers who worked on it.
- [ ] B. Only the positive benefits to justify the decision.
- [ ] C. The cost in dollars of the new software.
- [ ] D. Both positive impacts and negative trade-offs or risks.
<details><summary><b>Answer Key</b></summary>D) Both positive impacts and negative trade-offs or risks. - A mature ADR acknowledges that every architectural choice has trade-offs.</details>

**4. How should you describe a negative consequence related to team skills?**
- [ ] A. "The team doesn't know how to do this."
- [ ] B. "We are too stupid to use this right now."
- [ ] C. "This necessitates upskilling the team in the new paradigm."
- [ ] D. "We have to learn it which is annoying."
<details><summary><b>Answer Key</b></summary>C) "This necessitates upskilling the team in the new paradigm." - Professional and constructive phrasing.</details>

**5. Which of the following is a common anti-pattern in ADRs?**
- [ ] A. Stating the historical constraints that led to the decision.
- [ ] B. Writing a "Sales Pitch" for a specific technology.
- [ ] C. Listing operational overhead as a negative consequence.
- [ ] D. Using active voice for the decision statement.
<details><summary><b>Answer Key</b></summary>B) Writing a "Sales Pitch" for a specific technology. - ADRs should be objective records, not marketing material.</details>

## 🧪 Section 2: Fill-in-the-Blank Technical Drills

1. To ____________ deployment cycles, we will decompose the unified API into microservices.
2. The current architecture results in significant ____________, impacting client-side performance.
3. We have ____________ to implement Redis for our caching layer.
4. Every architectural decision involves a ____________; there is no perfect solution.
5. This new system introduces operational ____________ and requires team upskilling.

<details><summary><b>Answer Key</b></summary>
1. decouple
2. over-fetching
3. elected / decided
4. trade-off
5. overhead
</details>

## 🔍 Section 3: Error Identification & Sentence Refactoring

**Refactor the following B1/B2 sentences into C1/C2 professional engineering phrasing:**

1. **Original:** The old database is too slow when we have a lot of users.
   **Refactored:** __________________________________________________

2. **Original:** We will use Kafka because it's fast and good.
   **Refactored:** __________________________________________________

3. **Original:** This is bad because we have to manage another server.
   **Refactored:** __________________________________________________

4. **Original:** I decided to split the code so it's easier to work on.
   **Refactored:** __________________________________________________

5. **Original:** The frontend is getting too much data that it doesn't need.
   **Refactored:** __________________________________________________

<details><summary><b>Answer Key (Suggested)</b></summary>
1. The current database architecture introduces unacceptable latency during peak user loads.
2. We have elected to adopt Kafka to facilitate high-throughput, low-latency event streaming.
3. A negative consequence is the introduction of additional operational overhead to manage the new infrastructure.
4. To improve maintainability and decouple domains, we will modularize the codebase.
5. The current endpoint design results in significant over-fetching on the client side.
</details>

## 🗣️ Section 4: Real-World Scenario Roleplay

**Scenario:** You are presenting an ADR to your Engineering Manager. You are proposing moving from a managed cloud database to self-hosted database to save costs, but it requires more maintenance.

**Your Task:** Write a short paragraph (3-4 sentences) explaining your decision and acknowledging the trade-offs using C1/C2 language.

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

**Senior Technical Lead (C1):**
"To address the escalating costs of our managed database tier, we propose migrating to a self-hosted solution. While this significantly reduces our monthly infrastructure expenditure, we acknowledge the trade-off: it will increase operational overhead and require dedicated DBA resources to ensure uptime."

**Principal Architect (C2):**
"Given the unsustainable financial trajectory of our current managed data layer, we have elected to transition to a self-hosted deployment strategy. This architectural shift optimizes our operational expenditure (OpEx); however, it introduces systemic complexity regarding disaster recovery and necessitates upskilling our infrastructure team to mitigate the newly introduced operational risks."

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric

- [ ] **Objective Contextualization:** Did I describe the current problem neutrally without emotional language?
- [ ] **Definitive Decision Language:** Did I state the decision using active, authoritative verbs (e.g., "elected to", "will implement")?
- [ ] **Balanced Consequences:** Did I explicitly list both positive architectural benefits and negative trade-offs (e.g., "operational overhead")?
- [ ] **Technical Precision:** Did I use precise terminology (e.g., "latency," "decouple," "contention") instead of basic adjectives ("fast," "slow")?
- [ ] **Executive Tone:** Does the overall tone sound like a confident, mature engineering leader rather than a junior developer complaining?
