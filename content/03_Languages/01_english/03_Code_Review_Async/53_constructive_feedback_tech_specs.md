---
title: Module 53 Resource Lesson - Constructive Feedback on Technical Specs & Designs
category: 03_Code_Review_Async
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# 📚 Resource Lesson: Constructive Feedback on Tech Specs & RFCs

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
When reviewing Technical Specifications, Architecture Decision Records (ADRs), or Request for Comments (RFCs), your goal is to identify potential system flaws without discouraging the author. This lesson focuses on **linguistic softening**, **collaborative framing**, and structuring feedback that elevates the engineering culture while ensuring robust system design.

## 2. 🧊 Warming Up
* **Question 1:** Have you ever received a review comment that felt overly harsh or dismissive? How did it affect your motivation?
  * *Sample Answer:* Yes, a senior engineer once wrote "This design will never scale." It made me defensive and less willing to ask for help later.
* **Question 2:** How do you point out a critical flaw (e.g., a single point of failure) in a colleague's design while maintaining a positive relationship?
  * *Sample Answer:* I usually try to ask a question rather than state a fact, like "Have we considered what happens if the cache goes down?"

## 3. ⚙️ Contrastive Analysis & Theory: Linguistic Softening
To transition from a B2 to a C1/C2 level in technical communication, shift from **declarative criticism** to **inquisitive exploration**.

| Strategy | Direct / Blunt (A2/B1) | Softened / Collaborative (C1/C2) |
| :--- | :--- | :--- |
| **Use Modals** | This will cause latency. | This **might** introduce some latency. |
| **Tentative Language** | You missed the edge case. | **It seems like** we might need to handle this edge case. |
| **Inclusive Pronouns** | Your design fails here. | How should **we** handle failure in this scenario? |
| **Socratic Questioning** | Use Redis instead. | **What are your thoughts on** using Redis here to reduce load? |

## 4. 🛠️ Real-World Engineering Context Comparison

| Context | Junior / Direct (B1/B2) | Senior / Diplomatic (C1/C2) |
| :--- | :--- | :--- |
| **Pointing out a bottleneck** | The database schema is wrong. It will be too slow. | I wonder if this schema might become a bottleneck under peak load. Should we consider denormalizing? |
| **Suggesting an alternative** | Don't use REST for this, use gRPC. | Given the strict latency requirements, gRPC might be a better fit than REST here. What do you think? |
| **Highlighting security risks** | You forgot to encrypt the payload. | It looks like the payload is currently unencrypted. We should probably add TLS to comply with security standards. |
| **Rejecting a proposal** | I don't agree with this architecture. | I have some concerns about the operational overhead of this approach. Could we explore a simpler alternative first? |

## 5. 🎭 Role-Play Dialogue: Async Tech Spec Review
*Context: Sarah (Principal Engineer) is leaving comments on Alex's (Senior Engineer) RFC for a new notification service.*

**Alex (Author):** For the datastore, I propose using MongoDB to allow flexible schema changes as we add new notification types.
**Sarah (Reviewer):** Thanks for putting this together, Alex! The overall flow looks really solid. Regarding the datastore, I'm a bit concerned about the lack of ACID transactions, especially since we need to guarantee reliable delivery. Have we evaluated PostgreSQL with JSONB columns as a potential middle ground?
**Alex:** That's a fair point. I was optimizing for write throughput, but reliable delivery is definitely a hard requirement. I'll benchmark Postgres with JSONB and update the doc.
**Sarah:** Sounds like a great plan. Let me know if you want to pair on the benchmarking!

## 6. 💬 Let's talk about the role play
1. **Why did Sarah start her comment with "Thanks for putting this together"?**
   * It builds psychological safety and acknowledges Alex's effort before offering critique.
2. **Instead of saying "MongoDB is the wrong choice," what phrase did Sarah use?**
   * She used tentative language: "I'm a bit concerned about..." and posed an alternative as a question: "Have we evaluated...?"

## 7. 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| **RFC (Request for Comments)** | A formal document proposing a technical change, open for peer review. | Tài liệu đề xuất kỹ thuật (yêu cầu góp ý) |
| **Bottleneck** | A component that limits the overall performance of a system. | Điểm nghẽn |
| **Trade-off** | A compromise between two desirable but incompatible features. | Sự đánh đổi |
| **Overhead** | Additional computing resources or effort required to perform a task. | Chi phí/tài nguyên phát sinh |
| **To pair (up)** | To work together directly on a problem or task (Pair programming). | Làm việc cặp |

## 8. 🚫 Common Anti-Patterns & Pitfalls
* **The "You" Attack:** Saying "You forgot..." or "Your design...". **Correction:** Focus on the system: "The design..." or "We might need...".
* **The "Just" Dismissal:** Saying "Just use Kafka." It trivializes the implementation effort. **Correction:** "Kafka could be a strong candidate here because..."
* **Nitpicking without Context:** Leaving dozens of minor comments without acknowledging the big picture. **Correction:** Start with a summary comment praising the overall design before diving into specifics.

---

# 🏋️ Practice Workspace: Constructive Feedback on Tech Specs

## 🏢 Scenario & Engineering Context
Your team is migrating a legacy monolithic application to microservices. A mid-level engineer, David, has just published a Tech Spec for the new `User Authentication` service. 

In his design, David proposes using a **shared database** with the `Order Management` service to "save deployment time and reduce infrastructure costs." 

As a Senior Engineer, you know that sharing a database between microservices creates tight coupling, violates bounded contexts, and introduces a single point of failure. 

**Your Task:** Write an asynchronous review comment on his Tech Spec. You need to point out the architectural flaw and suggest an alternative (independent databases with asynchronous eventual consistency), while keeping the tone encouraging and constructive.

---

## 📝 User Practice Workspace

> **Draft your review comment here:**
> 
> [Start typing your comment...]

---

## 💡 Progressive Socratic Hints

<details>
<summary><b>Hint 1: Structure & Tone (Click to expand)</b></summary>

Start with a positive acknowledgment of his effort or the clarity of the document. Then, transition into your concern using an "I" statement rather than a "You" statement.
</details>

<details>
<summary><b>Hint 2: Grammatical Softening (Click to expand)</b></summary>

Instead of saying "Sharing the database will cause tight coupling," use modal verbs and tentative language:
* "I am slightly concerned that sharing the database **might** introduce..."
* "If we share the database, it **could** lead to..."
</details>

<details>
<summary><b>Hint 3: Socratic Suggestion (Click to expand)</b></summary>

Don't just give the answer; pose the alternative as a collaborative question.
* "What are your thoughts on..."
* "Have we considered giving each service its own datastore and using..."
</details>

---

# 📝 Assessment Exam: Constructive Feedback on Tech Specs

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)

**1. Which of the following is the most constructive way to point out a missing security requirement in an RFC?**
- [ ] A. "You completely forgot to include TLS encryption in this design."
- [ ] B. "This design is insecure without TLS."
- [ ] C. "I noticed TLS encryption isn't mentioned. Should we include it to meet our security standards?"
- [ ] D. "Just add TLS."
<details><summary><b>Answer Key</b></summary>C is correct. It uses tentative language ("I noticed") and a collaborative question ("Should we include").</details>

**2. Why is using the pronoun "we" preferred over "you" in code and design reviews?**
- [ ] A. It sounds more formal.
- [ ] B. It shifts the focus from individual blame to team ownership.
- [ ] C. It is a strict requirement in English grammar.
- [ ] D. It makes the sentence shorter.
<details><summary><b>Answer Key</b></summary>B is correct. "We" frames the problem as a shared team responsibility.</details>

**3. Choose the best phrase to soften a disagreement:**
- [ ] A. "I have a different perspective on this."
- [ ] B. "You are wrong about the latency."
- [ ] C. "That doesn't make any sense."
- [ ] D. "I refuse to approve this."
<details><summary><b>Answer Key</b></summary>A is correct. It states disagreement politely without attacking the author.</details>

**4. What does the term "bottleneck" mean in the context of system design?**
- [ ] A. The fastest part of the system.
- [ ] B. A component that limits the overall throughput or performance.
- [ ] C. The containerization process.
- [ ] D. The database schema.
<details><summary><b>Answer Key</b></summary>B is correct.</details>

**5. Which sentence uses a modal verb effectively to soften a critique?**
- [ ] A. "This will fail under heavy load."
- [ ] B. "This architecture might struggle to scale during peak traffic."
- [ ] C. "This is going to break."
- [ ] D. "Do not use this approach."
<details><summary><b>Answer Key</b></summary>B is correct. "Might" softens the certainty of the failure, making the feedback less aggressive.</details>

---

## 🧪 Section 2: Fill-in-the-Blank Technical Drills

*Fill in the blanks using appropriate softening words or technical vocabulary (e.g., considered, thoughts, might, bottleneck, overhead).*

1. "Have we _______________ using a message queue here to decouple the services?"
2. "I am a bit concerned that the synchronous API calls _______________ introduce significant latency."
3. "What are your _______________ on migrating to a NoSQL database for this feature?"
4. "Adding another caching layer could add unnecessary operational _______________."
5. "If the master node goes down, this component will become a single point of failure and a _______________."

<details>
<summary><b>Answer Key</b></summary>
1. considered
2. might / could
3. thoughts
4. overhead
5. bottleneck
</details>

---

## 🔍 Section 3: Error Identification & Sentence Refactoring

*Identify the aggressive or overly direct phrasing in each sentence and rewrite it to be constructive and collaborative (C1/C2 level).*

1. **Original:** "Your design for the API is too complicated and will take too long to build."
   **Refactored:** ______________________________________________________________

2. **Original:** "You forgot to account for network partitions."
   **Refactored:** ______________________________________________________________

3. **Original:** "Don't use RabbitMQ, use Kafka."
   **Refactored:** ______________________________________________________________

4. **Original:** "This database schema is wrong."
   **Refactored:** ______________________________________________________________

5. **Original:** "I don't like this approach."
   **Refactored:** ______________________________________________________________

<details>
<summary><b>Suggested Answers</b></summary>
1. "I wonder if we could simplify the API design to reduce the implementation time. What do you think?"
2. "It seems like we might need a strategy to handle network partitions. How should we address that?"
3. "Given our throughput requirements, Kafka might be a better fit than RabbitMQ here. Have we evaluated it?"
4. "I have a few concerns about how this schema will perform at scale. Could we review it together?"
5. "I have a different perspective on this approach. Can we explore some alternatives?"
</details>

---

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay

**Scenario:** 
A peer proposes using a third-party API that has a strict rate limit of 100 requests per minute. Your application expects bursts of up to 500 requests per minute. 

**Task:** Write a short, constructive comment on their RFC pointing out the rate limit issue and suggesting the implementation of a queue or a backoff strategy.

*(Write your response below)*

---

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

### C1 (Senior Technical Lead)
> "Great write-up! I noticed the third-party API has a rate limit of 100 req/min. Since we occasionally see bursts of 500 req/min, I'm a bit worried we might hit throttling errors. What are your thoughts on introducing a message queue or implementing exponential backoff to smooth out the traffic spikes?"

### C2 (Principal Architect)
> "Thanks for detailing this approach; the integration flow is very clear. Regarding the third-party dependency, their 100 req/min limit poses a systemic risk given our historical burst traffic of ~500 req/min. To ensure resiliency, we should probably buffer these outbound requests. Could we evaluate an asynchronous queuing mechanism or an aggressive backoff strategy to protect our SLA?"

---

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric

| Criteria | B2 (Intermediate) | C1 (Advanced) | C2 (Mastery) |
| :--- | :--- | :--- | :--- |
| **Tone & Empathy** | Feedback is factual but blunt. | Feedback is polite and acknowledges effort. | Employs high psychological safety, framing critiques as shared challenges. |
| **Linguistic Softening** | Uses basic modals (can, will). | Uses tentative language ("It seems", "might"). | Masters diplomatic phrasing ("I'm slightly concerned", "poses a systemic risk"). |
| **Vocabulary** | Uses general tech words (slow, error). | Uses precise terms (latency, throttle). | Uses architectural vocabulary natively (resiliency, SLA, backoff). |
| **Solution Framing** | Dictates the solution ("Do X"). | Suggests alternatives ("We could do X"). | Fosters Socratic dialogue ("Have we evaluated X?"). |
