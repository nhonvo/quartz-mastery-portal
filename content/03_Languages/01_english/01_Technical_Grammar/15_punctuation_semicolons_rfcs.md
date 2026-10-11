---
title: Module 15 Resource Lesson - Punctuation & Semi-colons in Technical RFCs
category: 01_Technical_Grammar
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# 🚀 15. Punctuation & Semicolons in RFCs & ADRs

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
**Goal**: Master the use of semicolons, colons, and advanced punctuation to structure complex technical ideas, especially when writing Architecture Decision Records (ADRs) or Requests for Comments (RFCs).
**Engineering Impact**: Proper punctuation distinguishes amateur technical writing from C1/C2 executive communication. Semicolons help group related clauses tightly, avoiding choppy sentences or run-on comma splices, which is crucial for articulating system design trade-offs and multi-step workflows concisely.

## 2. 🧊 Warming Up
**Question**: Have you ever struggled to format a long list of technical features or explain a two-part architectural decision without making the sentence too long?
*Sample Answer*: Yes, usually I just use commas, but when the items themselves have commas, it gets very confusing. Sometimes I break them into short sentences, but it feels less professional.

**Question**: Do you know when to use a semicolon versus a colon in technical documentation?
*Sample Answer*: I think a colon introduces a list, but I rarely use semicolons because I'm not entirely sure of the exact rule.

## 3. ⚙️ Contrastive Analysis & Theory

### The Semicolon (;)
**Rule 1: Linking closely related independent clauses.**
Use a semicolon to connect two sentences that are closely related in meaning, instead of using a period or a coordinating conjunction (and, but, so).
*Formula*: `[Independent Clause 1] ; [Independent Clause 2]`
*Example*: The primary database handles write operations; the read replicas manage all GET requests.

**Rule 2: Complex or Internal Lists (The Super-Comma).**
Use semicolons to separate items in a list when the items themselves contain commas.
*Example*: We evaluated three cloud providers: AWS, for its extensive ecosystem; GCP, particularly for Kubernetes native support; and Azure, due to existing enterprise discounts.

### The Colon (:)
**Rule**: Use a colon to introduce a list, an explanation, a definition, or a block quote. The clause before the colon *must* be an independent clause (a complete sentence).
*Example*: The new caching strategy provides three major benefits: reduced latency, lower database load, and improved user experience.

### The Dash (—) (Em Dash)
**Rule**: Use an em dash to emphasize a point, insert an abrupt thought, or clarify a preceding statement. It's less formal than a colon but highly effective in RFCs for adding crucial context.
*Example*: The migration requires zero downtime—a mandatory constraint given our SLA—and will be executed at midnight.

## 4. 🛠️ Real-World Engineering Context Comparison

| Scenario | Junior/B1 Phrasing (Choppy, Comma Splices) | Senior/C1/C2 Phrasing (Advanced Punctuation) |
| :--- | :--- | :--- |
| **Explaining a trade-off** | We chose Kafka, it is very fast. RabbitMQ is good but too slow for this. | We selected Kafka for its high throughput; RabbitMQ, while reliable, cannot meet our latency SLA. |
| **Listing components with commas** | The stack includes Next.js for the frontend, Node.js, which is fast, for the backend, and Postgres, our database. | The stack includes Next.js for the frontend; Node.js, chosen for its non-blocking I/O, for the backend; and PostgreSQL for data persistence. |
| **Adding emphasis** | We need to migrate the database. This is a critical blocker. | We must migrate the legacy database—a critical blocker for the V2 release—before Q3. |
| **Introducing outcomes** | The RFC proposes three things. Better caching, a new CDN, and smaller images. | This RFC proposes three core architectural changes: an aggressive caching tier, a global CDN deployment, and automated image compression. |

## 5. 🎭 Role-Play Dialogue
**Context**: A Principal Engineer (Sarah) is reviewing an RFC draft with a Senior Backend Engineer (David) regarding a microservices extraction.

**Sarah**: David, I'm reviewing the "Monolith Extraction" RFC. The technical approach is solid, but the section on data migration is a bit hard to parse. You have several run-on sentences.
**David**: Ah, I was trying to explain the dual-write mechanism and the backfill process in one go so the reader sees how they are connected.
**Sarah**: I understand. Instead of stringing it together with "and" or commas, try using a semicolon. For example: "The application will dual-write to both databases; meanwhile, a background worker will backfill historical data." 
**David**: That is much cleaner. It separates the two concurrent processes while keeping them conceptually linked. What about the list of affected services? I put commas everywhere.
**Sarah**: Since the services have descriptions, use semicolons as super-commas. Like this: "Impacted systems include the billing service, which requires zero downtime; the notification service, which can tolerate slight delays; and the analytics pipeline."
**David**: Got it. Colons for introducing the list, semicolons to separate the complex items. I'll refactor the document now.

## 6. 💬 Let's talk about the role play
1. Why did Sarah suggest using a semicolon for the dual-write explanation instead of "and"?
2. What punctuation mark did Sarah recommend for separating the list of affected services, and why?
3. How does using advanced punctuation change the tone of the RFC?

## 7. 📚 Bilingual Technical Vocabulary

| English Word / Phrase | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| Independent Clause | A sentence that can stand alone, containing a subject and a verb. | Mệnh đề độc lập |
| Comma Splice | An error where two independent clauses are joined only by a comma. | Lỗi dùng dấu phẩy nối 2 câu độc lập |
| RFC (Request for Comments) | A formal document proposing a technical change or standard. | Đề xuất thảo luận kỹ thuật |
| ADR (Architecture Decision Record) | A document capturing an important architectural decision and its context. | Bản ghi quyết định kiến trúc |
| Super-comma | A colloquial term for using a semicolon to separate complex list items. | Dấu chấm phẩy dùng để phân tách danh sách phức tạp |
| Choppy | Short, disjointed sentences that don't flow smoothly. | Rời rạc, lắt nhắt |
| SLA (Service Level Agreement) | A commitment between a service provider and a client regarding measurable metrics. | Cam kết chất lượng dịch vụ |

## 8. 🚫 Common Anti-Patterns & Pitfalls
- ❌ **The Comma Splice**: "The API is RESTful, it uses JSON." (Incorrect)
  - ✅ **Fix**: "The API is RESTful; it uses JSON."
- ❌ **Colon without an Independent Clause**: "The benefits are: speed, security, and scale." (Incorrect - "The benefits are" is not a complete sentence).
  - ✅ **Fix**: "The architecture provides three benefits: speed, security, and scale." OR "The benefits are speed, security, and scale." (No colon needed).
- ❌ **Capitalizing after a semicolon**: "We use Redis; It is very fast." (Incorrect)
  - ✅ **Fix**: "We use Redis; it is very fast." (Only capitalize if the next word is a proper noun).

---

# 💻 Practice Workspace: Punctuation in RFCs

# Part 2: Practice Workspace (Active Execution)

## 1. 🏢 Scenario & Engineering Context
**Context**: You are authoring an Architecture Decision Record (ADR) to propose migrating from a monolithic PostgreSQL database to a sharded architecture. 

In your draft, you need to write a summary paragraph that accomplishes the following:
1. States the decision to shard the database and explains *why* (linking two closely related ideas).
2. Lists the three main shards you will create, including brief descriptions for each shard, which contain internal commas (e.g., users shard, which is read-heavy; transactions shard, which requires high availability; and the analytics shard).

Your current draft is very choppy and uses too many commas:
> "We decided to shard the PostgreSQL database, the monolithic database is hitting CPU limits. We will create three shards. The shards are the users shard, which is mostly reads, the transactions shard, which needs high availability, and the analytics shard, for offline jobs."

## 2. 📝 User Practice Workspace
*Refactor the choppy draft above into a professional C1/C2 executive paragraph using semicolons and colons appropriately.*

> **Draft Your Refactored Paragraph Here:**
> 
> (Write your response here...)

<br>
<br>
<br>
<br>

---

## 3. 💡 Progressive Socratic Hints

<details>
<summary><b>Hint 1: Fixing the Comma Splice (Grammar)</b></summary>
The first sentence ("We decided to shard..., the monolithic database is hitting...") is a comma splice. Connect these two related independent clauses with a **semicolon** (;) instead of a comma.
</details>

<details>
<summary><b>Hint 2: Introducing the List (Structure)</b></summary>
To introduce the list of the three shards, use a **colon** (:) after a complete sentence. For example: "We will create three dedicated shards: ..."
</details>

<details>
<summary><b>Hint 3: The Super-Comma (Lexical/Punctuation)</b></summary>
Because the descriptions of the shards contain commas ("users shard, which is mostly reads"), use **semicolons** (;) to separate the three main items in the list to avoid confusion.
</details>

---

# 📝 Assessment Exam: Punctuation & Semicolons in RFCs

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)

**1. Which of the following sentences correctly uses a semicolon?**
- [ ] A. The deployment failed; because the Kubernetes cluster was down.
- [ ] B. The deployment failed; the Kubernetes cluster was down.
- [ ] C. The deployment failed, the Kubernetes cluster was down.
- [ ] D. The deployment failed; and the Kubernetes cluster was down.

<details>
<summary><b>View Answer</b></summary>
<b>Correct Answer: B</b><br>
<i>Explanation:</i> A semicolon links two independent clauses. A is incorrect because "because..." is dependent. C is a comma splice. D is incorrect because you generally don't use a conjunction like "and" immediately after a semicolon connecting two clauses.
</details>

**2. When is it appropriate to use a colon (:) in an ADR?**
- [ ] A. To separate two independent clauses that are contrasting.
- [ ] B. Immediately after a verb like "includes" or "are".
- [ ] C. At the end of a complete independent clause to introduce a list or explanation.
- [ ] D. To separate items in a list that already contain commas.

<details>
<summary><b>View Answer</b></summary>
<b>Correct Answer: C</b><br>
<i>Explanation:</i> A colon must follow a complete sentence (independent clause). Using it right after a verb (B) is a common mistake.
</details>

**3. Choose the sentence with the correct punctuation:**
- [ ] A. The new caching layer provides three benefits: faster reads, reduced DB load, and lower costs.
- [ ] B. The new caching layer provides: faster reads, reduced DB load, and lower costs.
- [ ] C. The new caching layer provides three benefits; faster reads, reduced DB load, and lower costs.
- [ ] D. The new caching layer provides three benefits faster reads; reduced DB load; and lower costs.

<details>
<summary><b>View Answer</b></summary>
<b>Correct Answer: A</b><br>
<i>Explanation:</i> "The new caching layer provides three benefits" is a complete sentence, so the colon is correct. B is incorrect because "provides" is a verb and cannot precede a colon directly in this context.
</details>

**4. What is the primary purpose of using semicolons as "super-commas"?**
- [ ] A. To make the sentence look more academic.
- [ ] B. To separate list items when the items themselves contain internal commas.
- [ ] C. To replace bullet points in markdown files.
- [ ] D. To indicate a pause longer than a period.

<details>
<summary><b>View Answer</b></summary>
<b>Correct Answer: B</b><br>
<i>Explanation:</i> Super-commas resolve ambiguity in complex lists.
</details>

**5. Which sentence uses the em dash (—) correctly to add emphasis?**
- [ ] A. We must fix this bug — before tomorrow.
- [ ] B. The memory leak—which caused the outage—has been resolved.
- [ ] C. The memory leak — has been resolved.
- [ ] D. We need to restart—the server.

<details>
<summary><b>View Answer</b></summary>
<b>Correct Answer: B</b><br>
<i>Explanation:</i> Em dashes are used to set off an interrupting or clarifying thought. B correctly encapsulates the clarifying thought.
</details>

---

## 🧪 Section 2: Fill-in-the-Blank Technical Drills

*Fill in the blanks with the correct punctuation mark (comma, semicolon, colon, or period).*

1. We are migrating to GraphQL ______ it solves our over-fetching problem on the frontend.
2. The proposal covers three core areas ______ authentication, authorization, and audit logging.
3. Our tech stack is heavily specialized: we use Rust for the core engine, which requires high performance ______ Python for data science ______ and TypeScript for the web client.
4. The database was locked ______ therefore, the background jobs timed out.
5. We have one primary constraint ______ the migration must incur zero downtime.

<details>
<summary><b>View Answers</b></summary>
1. <b>;</b> (semicolon) - linking two independent clauses.
2. <b>:</b> (colon) - introducing a list after a complete sentence.
3. <b>; / ;</b> (semicolons) - separating complex list items containing commas.
4. <b>;</b> (semicolon) - before a conjunctive adverb like 'therefore'.
5. <b>:</b> or <b>—</b> (colon or em dash) - introducing an explanation/emphasis.
</details>

---

## 🔍 Section 3: Error Identification & Sentence Refactoring

*Identify the punctuation errors in the following sentences and rewrite them correctly.*

1. **Original**: We chose MongoDB for the new service, we needed flexible schema design.
   **Refactored**: _________________________________________________________

2. **Original**: The system has three main dependencies: Redis for caching, Postgres, which is our source of truth, for storage, and Kafka for event streaming.
   **Refactored**: _________________________________________________________

3. **Original**: The requirements are: high availability, low latency, and strong consistency.
   **Refactored**: _________________________________________________________

4. **Original**: We will deploy the hotfix today; But the full feature will be delayed.
   **Refactored**: _________________________________________________________

5. **Original**: The CPU usage spiked to 100% the server crashed immediately after.
   **Refactored**: _________________________________________________________

<details>
<summary><b>View Answers</b></summary>
1. <b>Refactored</b>: We chose MongoDB for the new service; we needed flexible schema design. (Fixing comma splice).
2. <b>Refactored</b>: The system has three main dependencies: Redis for caching; Postgres, which is our source of truth, for storage; and Kafka for event streaming. (Using super-commas).
3. <b>Refactored</b>: The requirements are high availability, low latency, and strong consistency. OR The system has three requirements: high availability, low latency, and strong consistency. (Removing colon after a verb).
4. <b>Refactored</b>: We will deploy the hotfix today, but the full feature will be delayed. OR We will deploy the hotfix today; however, the full feature will be delayed. (Do not capitalize 'but' after a semicolon, or use a better conjunctive adverb).
5. <b>Refactored</b>: The CPU usage spiked to 100%; the server crashed immediately after. (Fixing run-on/fused sentence).
</details>

---

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay

**Scenario**: 
You are writing an executive summary for an RFC advocating a move from a REST API to gRPC for internal microservice communication. 
Draft a short 2-sentence summary. 
- In the first sentence, state the decision and the reason using a semicolon. 
- In the second sentence, introduce the three main benefits using a colon, and separate the benefits with semicolons if you include descriptive clauses for each.

**Your Answer**:
> 
> 

---

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

**Scenario**: Writing an executive summary for an RFC advocating a move to gRPC.

- **B2 (Mid-Level) Response**: We should migrate internal APIs from REST to gRPC. REST is becoming too slow for us. The new approach will give us better performance, strong typing with Protobuf, and automatic client generation.
- **C1 (Senior Engineer) Response**: We propose migrating all internal inter-service communication from REST to gRPC; this transition is necessary to address our current latency bottlenecks. The adoption of gRPC yields three critical advantages: significantly reduced payload sizes; strong, contract-driven typing via Protobuf; and automated client SDK generation across our polyglot services.
- **C2 (Principal/Staff) Response**: This RFC advocates standardizing our internal service mesh on gRPC; our existing REST architecture can no longer sustain the required throughput constraints. Transitioning to gRPC delivers three compounding architectural benefits: multiplexed, low-latency streaming; rigid, schema-first contracts enforced by Protobuf; and boilerplate reduction via automated stub generation.

---

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric

| Criteria | B2 (Intermediate) | C1 (Advanced) | C2 (Mastery) |
| :--- | :--- | :--- | :--- |
| **Semicolon Usage** | Relies on commas (comma splices) or conjunctions (and/so). | Correctly uses semicolons to link related independent clauses. | Uses semicolons seamlessly to control pacing and tightly couple complex architectural trade-offs. |
| **List Formatting** | Uses basic commas for all lists, leading to ambiguity in complex descriptions. | Uses colons to introduce lists and semicolons as 'super-commas' accurately. | Employs advanced punctuation (colons, semicolons, em dashes) dynamically to structure highly dense, multi-faceted engineering proposals. |
| **Tone & Cohesion** | Choppy, disjointed sentences. | Smooth, cohesive flow; professional and authoritative tone. | Executive, highly persuasive writing that mimics top-tier FAANG architectural documentation. |
