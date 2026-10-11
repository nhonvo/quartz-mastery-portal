---
title: Module 08 Resource Lesson - Modal Verbs of Deduction in Root Cause Analysis
category: 01_Technical_Grammar
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# 📚 Resource Lesson: Modal Verbs for Root Cause Analysis (Past Modals of Deduction)

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
In engineering, diagnosing system failures, bugs, or outages requires discussing past events with varying degrees of certainty. This lesson focuses on **Past Modals of Deduction** (e.g., *must have, might have, could have, can't have, should have*). 
**Objectives:**
- Express absolute certainty, high probability, and impossibility regarding past outages or bugs.
- Navigate post-mortem discussions blamelessly using speculative language.
- Transition from junior, blunt statements ("You broke it") to senior, analytical deduction ("The memory leak must have originated from the new worker node").

## 2. 🧊 Warming Up
**Question 1:** Think of a recent production bug or incident you had to investigate. How did you discuss the potential causes before you found the actual root cause?
*Sample Answer:* "We didn't know why the database CPU spiked. We thought it might be a bad query, but we weren't sure until we checked the logs."

**Question 2:** Why is it important to use words like "might" or "could" instead of "is" or "did" during an ongoing investigation?
*Sample Answer:* "It prevents finger-pointing and keeps the team focused on gathering evidence rather than making premature assumptions."

## 3. ⚙️ Contrastive Analysis & Theory

When investigating root causes, we use **Modal Verb + have + Past Participle (V3)** to express deduction about the past.

| Degree of Certainty | Structure | Usage | Example |
| :--- | :--- | :--- | :--- |
| **Almost 100% Certain (Positive)** | `Must + have + V3` | You have strong evidence that something happened. | "The API gateway **must have dropped** the connections during the restart." |
| **Almost 100% Certain (Negative)** | `Can't + have + V3` / `Couldn't + have + V3` | You have strong evidence that something did NOT happen. | "The frontend **couldn't have triggered** this; the payload is completely different." |
| **Possibility / Speculation (50%)** | `Might / May / Could + have + V3` | It is possible, but you don't have proof yet. | "A race condition **might have corrupted** the cache." |
| **Missed Obligation / Expectation** | `Should + have + V3` | Something was supposed to happen, but didn't (often used in post-mortems for process improvement). | "The health check **should have caught** the degraded pod sooner." |

## 4. 🛠️ Real-World Engineering Context Comparison

| Scenario | Junior (B1/B2) - Direct/Basic | Senior (C1/C2) - Analytical/Diplomatic |
| :--- | :--- | :--- |
| **Strong suspicion based on logs** | "I'm sure the memory leak happened because of the new loop." | "Given the heap dump, the memory leak **must have originated** in the updated retry loop." |
| **Ruling out a component** | "It's not the database. The database is fine." | "It **can't have been** a database lock, as the metrics show query times remained stable." |
| **Proposing a theory** | "Maybe the third-party API went down." | "An upstream timeout **could have cascaded** and exhausted our connection pool." |
| **Discussing preventative measures** | "We forgot to set a timeout." | "We **should have configured** a circuit breaker to prevent the cascading failure." |

## 5. 🎭 Role-Play Dialogue: The Post-Mortem

**Context:** An engineering team is conducting a post-mortem after a 20-minute checkout page outage.

**Sarah (Lead Architect):** "Alright team, let's establish a timeline for the checkout outage. The latency spikes started at 14:00. What's our current hypothesis?"
**David (Backend Engineer):** "Well, looking at the Datadog graphs, the payment service **must have been** starved of resources. The CPU utilization hit 100% right at 14:01."
**Sarah:** "Interesting. But the payment service scales automatically. It **should have spun up** new instances within a minute."
**David:** "True, but the auto-scaler **might have failed** to provision new nodes due to the AWS zone capacity issue reported yesterday."
**Sarah:** "Ah, that's a solid theory. Let's verify the AWS logs. However, it **couldn't have been** just the capacity issue, because our fallback queue didn't trigger either."
**David:** "You're right. A misconfiguration in the fallback logic **could have prevented** the failover. I'll dig into the Terraform state next."

## 6. 💬 Let's talk about the role play
1. Why did David use "must have been" when discussing the resource starvation? *(He had concrete evidence from Datadog graphs showing 100% CPU).*
2. Why did Sarah use "couldn't have been" regarding the capacity issue alone? *(Because another expected behavior—the fallback queue—also failed, indicating a secondary root cause).*

## 7. 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| **Root Cause** | The fundamental, underlying reason for a problem. | Nguyên nhân gốc rễ |
| **Post-mortem** | A process to analyze an incident after it has been resolved to prevent recurrence. | Phân tích sau sự cố (Họp kiểm thảo) |
| **Hypothesis** | A proposed explanation made on the basis of limited evidence as a starting point for investigation. | Giả thuyết |
| **Cascading failure** | A failure in a system of interconnected parts, where the failure of a part can trigger the failure of successive parts. | Lỗi dây chuyền |
| **Corroborate** | To confirm or give support to a statement, theory, or finding (e.g., using logs). | Củng cố, chứng minh |
| **Misconfiguration** | An incorrect or suboptimal configuration of a system. | Cấu hình sai |

## 8. 🚫 Common Anti-Patterns & Pitfalls

- ❌ **Anti-Pattern:** Using *must to have* or *must had*. 
  - *Incorrect:* The server must to have crashed.
  - *Correct:* The server **must have** crashed.
- ❌ **Anti-Pattern:** Using *should have* to state a fact about the past, rather than a missed expectation.
  - *Incorrect:* The logs show that the error should have started at 2 PM. (Meaning it actually started at 2 PM).
  - *Correct:* The logs show that the error **must have** started at 2 PM.
- ❌ **Anti-Pattern:** Using *can have* for negative deductions.
  - *Incorrect:* It cannot has been the network.
  - *Correct:* It **can't have** been the network.

---

# 🛠️ Practice Workspace: Modal Verbs for Root Cause Analysis

# Part 2: Practice Workspace (Active Execution)

## 1. 🏢 Scenario & Engineering Context

**Context:** 
You are a Senior Site Reliability Engineer (SRE). Yesterday, your company's mobile application experienced a severe degradation: users were unable to upload profile pictures for about 45 minutes. 

You are currently writing a Slack message to the Engineering Manager outlining your initial findings before the formal post-mortem meeting.

**Facts gathered so far:**
- The S3 bucket metrics show normal operation (no AWS outage).
- The image processing microservice's memory usage spiked immediately after a new deployment (v2.4.1).
- The CI/CD pipeline did not run the end-to-end (E2E) UI tests before the deployment due to a skipped step.
- The issue was temporarily resolved by rolling back to v2.4.0.

**Task:**
Write a concise, professional Slack update deducing the root cause based on these facts. Use at least one instance of **must have**, **can't have / couldn't have**, **might have / could have**, and **should have**.

---

## 2. 📝 User Practice Workspace

> **Write your response here:**
> 
> [Draft your Slack message here]

---

## 3. 💡 Progressive Socratic Hints

<details>
<summary><b>Hint 1: Structuring the Deduction (Grammar)</b></summary>
Use `couldn't have been` to rule out AWS S3. 
Use `must have been` or `must have originated` to point to the deployment of v2.4.1.
Use `might have` or `could have` to theorize *why* the microservice's memory spiked (e.g., a memory leak).
Use `should have caught` to discuss the skipped E2E tests.
</details>

<details>
<summary><b>Hint 2: Lexical Upgrades (Vocabulary)</b></summary>
Instead of "It's not AWS," use "We can rule out AWS because..." or "It couldn't have been an S3 outage..."
Instead of "The tests didn't run," use "The E2E test suite was bypassed, which should have prevented this regression."
Instead of "Memory went up," use "Memory utilization spiked," "Memory leak," or "OOM (Out of Memory) conditions."
</details>

<details>
<summary><b>Hint 3: Executive Tone (Structure)</b></summary>
Start with a high-level summary. Follow with the evidence-based deductions. End with an action item.
Example opening: "Hi team, regarding yesterday's image upload degradation, I've conducted a preliminary log analysis..."
</details>

---

# 📝 Assessment Exam: Modal Verbs for Root Cause Analysis

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)

**1. The Redis cluster CPU hit 100% and rejected all connections. A runaway script ________ caused this spike.**
- [ ] A. should have
- [ ] B. must have
- [ ] C. can't have
- [ ] D. ought to have
<details>
<summary><b>Answer & Explanation</b></summary>
**B) must have**. We are making a highly confident deduction based on the evidence of 100% CPU. "Should have" implies an unfulfilled expectation.
</details>

**2. The frontend assets were delivered perfectly via the CDN. The latency issue ________ been a frontend caching problem.**
- [ ] A. must have
- [ ] B. couldn't have
- [ ] C. might have
- [ ] D. shouldn't have
<details>
<summary><b>Answer & Explanation</b></summary>
**B) couldn't have**. We are ruling out a possibility based on strong evidence (assets were delivered perfectly).
</details>

**3. The Kafka consumer lag increased around midnight, but we are still missing the container logs. A temporary network partition ________ triggered it, but we need more data.**
- [ ] A. must have
- [ ] B. couldn't have
- [ ] C. could have
- [ ] D. should have
<details>
<summary><b>Answer & Explanation</b></summary>
**C) could have**. We are expressing a 50% possibility/speculation because we lack the logs to be certain.
</details>

**4. The integration tests ________ caught the breaking schema change before it reached staging, but they were disabled in the pipeline.**
- [ ] A. must have
- [ ] B. might have
- [ ] C. shouldn't have
- [ ] D. should have
<details>
<summary><b>Answer & Explanation</b></summary>
**D) should have**. Expressing a missed expectation or failed obligation.
</details>

**5. "The sudden drop in active sessions ________ resulted from the load balancer dropping connections during the config reload."**
- [ ] A. might have
- [ ] B. might to have
- [ ] C. might had
- [ ] D. might has
<details>
<summary><b>Answer & Explanation</b></summary>
**A) might have**. Grammatically, modal verbs are followed by the base form of the auxiliary verb "have" and then the past participle (V3).
</details>

---

## 🧪 Section 2: Fill-in-the-Blank Technical Drills
*Fill in the blanks using the appropriate past modal (must have, might have, couldn't have, should have) + V3.*

1. The data corruption ___________ (originate) from the migration script, as the timestamps align perfectly with its execution.
2. We didn't receive any alerting for the disk space issue. Datadog ___________ (alert) us when the volume reached 90% capacity.
3. The firewall rules ___________ (block) the traffic, because I tested the endpoint locally from outside the VPN and it worked fine.
4. I'm not entirely sure why the pod crashed, but a sudden spike in requests ___________ (exhaust) its memory limits.
5. The unauthorized access ___________ (happen) through the legacy admin portal; it's the only entry point without MFA enforced.

<details>
<summary><b>Answer Key</b></summary>
1. must have originated
2. should have alerted
3. couldn't have blocked / can't have blocked
4. might have exhausted / could have exhausted
5. must have happened
</details>

---

## 🔍 Section 3: Error Identification & Sentence Refactoring
*Identify the grammatical or tonal error in each sentence and rewrite it using C1/C2 engineering English.*

1. **Junior:** The database must crashed because I cannot connect to it.
2. **Junior:** It is not possible that the API was down, I checked the uptime logs.
3. **Junior:** The caching layer should prevented this, but it didn't.
4. **Junior:** Maybe the webhook failed to deliver the payload.
5. **Junior:** The memory leak must to have started after the Monday deployment.

<details>
<summary><b>Suggested Refactoring</b></summary>
1. The database **must have crashed**, as I am unable to establish a connection.
2. The API **couldn't have been down**, as corroborated by the uptime logs.
3. The caching layer **should have prevented** this cascade.
4. The webhook **might have failed** to deliver the payload.
5. The memory leak **must have started** following the Monday deployment.
</details>

---

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay

**Scenario:** You are leading a blameless post-mortem. The issue was a split-brain scenario in your Elasticsearch cluster that led to data inconsistency. You know it was triggered by a brief network partition, but the cluster was supposed to recover gracefully.

**Prompt:** Write a short paragraph explaining the situation to the VP of Engineering. Deduce the cause, rule out human error in configuration, state what was supposed to happen, and suggest a theory for why the recovery failed.

---

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

**C1 (Senior Technical Lead):**
"Based on our telemetry, the split-brain scenario **must have been** triggered by a transient network partition between availability zones at 03:00. We know it **couldn't have been** a manual misconfiguration, as the infrastructure state hasn't changed in weeks. The cluster **should have recovered** automatically once connectivity was restored via the quorum tie-breaker. The fact that it didn't suggests the tie-breaker node **might have experienced** CPU throttling during the partition, preventing it from casting a vote."

**C2 (Principal Architect):**
"Our forensic analysis indicates the split-brain state **must have originated** from a transient network partition across AZs. We can definitively rule out configuration drift; it **couldn't have been** human error given the immutable infrastructure state. Architecturally, the quorum election mechanism **should have gracefully handled** the partition and re-established consensus. The failure of this self-healing mechanism implies that the master-eligible nodes **could have been** starved of I/O resources during the network event, preventing timely leader election."

---

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric

| Criterion | B2 (Upper Intermediate) | C1 (Advanced) | C2 (Mastery) |
| :--- | :--- | :--- | :--- |
| **Grammatical Precision** | Uses basic modals (must have, might have) but makes occasional structural errors (e.g., must to have). | Consistently uses a wide range of past modals accurately without hesitation. | Flawlessly integrates complex modal structures with passive voice (e.g., must have been triggered by). |
| **Technical Vocabulary** | Uses general terms (problem, broke, went down). | Employs specific engineering terms (partition, cascading failure, degradation). | Commands precise architectural terminology (quorum, transient, infrastructure state, starvation). |
| **Executive Tone** | Sounds somewhat blunt or uncertain (I think it broke because...). | Maintains an objective, evidence-based tone (The logs indicate it must have...). | Projects authority and blameless analytical rigor, seamlessly navigating hypotheses and root causes. |
