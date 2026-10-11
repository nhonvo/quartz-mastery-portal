---
title: Module 01 Resource Lesson - Present Perfect vs. Past Simple in Incident Reports
category: 01_Technical_Grammar
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# 📘 Module 01: Present Perfect vs. Past Simple in Incident Reports

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
* **Goal:** Master the distinction between Past Simple and Present Perfect to accurately communicate system status and incident timelines.
* **Engineering Impact:** Precision in tenses prevents miscommunication during critical outages. It clarifies whether a system is currently down (Present Perfect) or if the issue is entirely resolved and in the past (Past Simple).

## 2. 🧊 Warming Up
1. **Have you ever struggled to explain an ongoing issue in a daily stand-up?**
   - *Sample response:* Yes, sometimes I say "I fixed the bug," but the fix is still deploying, which confuses my team about the current status.
2. **Why is it critical to be precise about time in Root Cause Analysis (RCA) reports?**
   - *Sample response:* Because stakeholders need an exact timeline of events to understand what happened, while also needing to know the current active state of the system right now.

## 3. ⚙️ Contrastive Analysis & Theory

### The Past Simple (The "Closed Chapter")
* **Formula:** `Subject + V2 (Past form) + Specific Time`
* **Concept:** Describes actions that started and finished at a specific time in the past. There is no connection to the present.
* **Keywords:** *Yesterday, at 3:00 PM, last week, during the outage, in Q3.*
* **Example:** "The server **crashed** at 2:00 AM." (It happened, it's completely over).

### The Present Perfect (The "Bridge to Now")
* **Formula:** `Subject + has/have + V3 (Past Participle)`
* **Concept:** Describes past actions that have a direct result, relevance, or ongoing impact on the *present moment*, often without a specific timestamp.
* **Keywords:** *Just, already, yet, recently, since, so far, up to now.*
* **Example:** "The server **has crashed**." (And it is currently still down / we are dealing with it right now).

## 4. 🛠️ Real-World Engineering Context Comparison

| Junior / Colloquial Phrasing (B1/B2) | Senior Executive Engineering Phrasing (C1/C2) | 🧠 Why it's better (The linguistic shift) |
| :--- | :--- | :--- |
| ❌ *"We fixed the bug."* | ✅ *"We **have deployed** a hotfix to production."* | Focuses on the current state: the environment now contains the fix. Removes the ambiguous "fixed". |
| ❌ *"I restarted the pod, but it didn't work."* | ✅ *"I **have cycled** the pod, but the latency **has not improved**."* | Shows the ongoing nature of the problem. "Cycled" is more professional than "restarted". |
| ❌ *"Did you check the logs yet?"* | ✅ *"**Have** you **audited** the telemetry logs for anomalous spikes?"* | Present Perfect asks about the current state of knowledge, not just a past action. Elevates vocabulary. |
| ❌ *"The database locked up 3 times today."* | ✅ *"The database **has experienced** resource contention three times today."* | "Today" is an unfinished time period. Present perfect is grammatically required. |

## 5. 🎭 Role-Play: The Incident Post-Mortem

**Manager (Sarah):** Good morning, team. Let's discuss yesterday's API outage. David, what exactly happened?
**Engineer (David):** At 14:00 UTC, the primary database node **failed** due to a sudden spike in traffic.
**Manager (Sarah):** I see. And what is the current status? Are we stable?
**Engineer (David):** Yes. Since the crash, we **have migrated** all traffic to the secondary node. We **have also increased** the capacity by 20%. The system is running smoothly now.
**Manager (Sarah):** Excellent work. **Have you updated** the incident log yet?
**Engineer (David):** I **wrote** the initial draft last night, but I **haven't submitted** the final version yet. I will do it right after this meeting.

## 6. 💬 Let's talk about the role play

1. **Why did David use "failed" and "wrote" (Past Simple)?**
    - Because both actions happened at specific, finished times in the past (at 14:00 UTC, and last night). 
2. **Why did David use "have migrated" and "have increased" (Present Perfect)?**
    - Because these past actions are the direct reason the system is currently stable. The focus is on the present result, not the exact time the migration happened.
3. **How did Sarah ask about the incident log?**
    - She asked, *"Have you updated..."* because she wants to know the *current state* of the document right now, not exactly when he typed it.

## 7. 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| --- | --- | --- |
| **Outage** (n.) | A period when a service, such as a website or power supply, is not available. | Sự cố ngừng hoạt động, thời gian gián đoạn |
| **Migrate** (v.) | To move data, software, or traffic from one system or environment to another. | Di chuyển, chuyển đổi (dữ liệu/máy chủ) |
| **Capacity** (n.) | The maximum amount of data or traffic that a system can handle. | Dung lượng, sức chứa, công suất |
| **Draft** (n.) | A preliminary, unfinished version of a piece of writing or code. | Bản nháp |
| **Cycle** (v.) | To turn a device or process off and then back on again (restart). | Khởi động lại (chu kỳ) |
| **Telemetry** (n.) | The automatic collection and transmission of data from remote systems (like logs/metrics). | Dữ liệu từ xa, đo lường từ xa |
| **Contention** (n.) | A conflict over access to a shared resource, such as memory or CPU. | Sự tranh chấp (tài nguyên) |

## 8. 🚫 Common Anti-Patterns & Pitfalls

* **Mistake 1: Using Present Perfect with a specific past time.**
  * ❌ *"We have deployed the service at 5 PM."* 
  * ✅ **Correction:** *"We **deployed** the service at 5 PM."*
* **Mistake 2: Using Past Simple when the time period is unfinished.**
  * ❌ *"Did you see any memory spikes today?"* (If today isn't over).
  * ✅ **Correction:** *"**Have** you **seen** any memory spikes today?"*
* **Native Speaker Insight:** In casual spoken English, native speakers sometimes incorrectly use Past Simple with words like "already" (e.g., "I already did it"). However, in formal engineering environments, strictly use the Present Perfect ("I have already completed it") to project professional C1 competence.

---

# ✍️ Module 01 Practice: Present Perfect vs. Past Simple

# Part 2: Practice Workspace (Active Execution)

## 1. 🏢 Scenario & Engineering Context

**The Situation:** 
You are a Senior Backend Engineer. Two hours ago, the payment processing API started failing due to a misconfigured third-party certificate. It took you 45 minutes to diagnose the issue and another 30 minutes to roll out a fix. 

The system is now fully stable, but your Engineering Manager has just messaged the team on Slack:
> *"Hey team, what is the current status of the payment API outage? Do we know what happened?"*

**Your Task:**
Write a concise, professional Slack response to your manager. 
* Use the **Past Simple** to describe the root cause and exactly when the incident occurred.
* Use the **Present Perfect** to explain the *current state* of the system and the fact that the fix is now live.
* Elevate your vocabulary (avoid basic words like "fixed", "broke", or "checked").

---

## 2. 📝 User Practice Workspace

*(Write your Slack response below this line)*

> 
> 
> 

---

## 3. 💡 Progressive Socratic Hints

*Stuck? Expand the hints below for guidance.*

<details>
<summary><b>Hint 1: Grammar Structure</b></summary>
Try using this structure:<br>
1. "The API <b>[Past Simple verb]</b> because of..."<br>
2. "We <b>[Present Perfect verb]</b> the certificate, and the system..."
</details>

<details>
<summary><b>Hint 2: Lexical (Vocabulary) Upgrade</b></summary>
Instead of "broke", use <i>failed</i> or <i>experienced downtime</i>.<br>
Instead of "fixed", use <i>deployed a patch</i>, <i>rolled out a fix</i>, or <i>resolved</i>.<br>
Instead of "the problem was", use <i>the root cause was</i>.
</details>

<details>
<summary><b>Hint 3: Tone & Structure (C1 Level Example)</b></summary>
A Senior Engineer is definitive but objective. <br>
<i>"The payment API <b>failed</b> at [Time] due to [Reason]. We <b>have deployed</b> a patch to the certificate, and traffic <b>has stabilized</b>."</i>
</details>

---

# 📝 Module 01 Assessment: Present Perfect vs. Past Simple

Complete this 6-section assessment to evaluate your mastery of Present Perfect and Past Simple in technical contexts.

---

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)
*Select the most grammatically correct and professional option for each scenario.*

1. **Which sentence correctly describes a fix that was just deployed and is currently active?**
   - [ ] A. We deployed the hotfix, so it works now.
   - [ ] B. We have deployed a hotfix to production to stabilize the service.
   - [ ] C. We have been deploying the hotfix.
   - [ ] D. We had deployed the hotfix yesterday.

2. **When writing a Root Cause Analysis (RCA) about an event that ended yesterday, you should use:**
   - [ ] A. Present Perfect
   - [ ] B. Past Continuous
   - [ ] C. Past Simple
   - [ ] D. Present Simple

3. **"The database ________ resource contention three times today."**
   - [ ] A. experienced
   - [ ] B. experiences
   - [ ] C. has experienced
   - [ ] D. had experienced

4. **"At exactly 02:00 AM UTC, the primary node ________."**
   - [ ] A. has failed
   - [ ] B. failed
   - [ ] C. was failed
   - [ ] D. has been failing

5. **Which question is best to ask a colleague during an ongoing incident?**
   - [ ] A. Did you audit the telemetry logs yet?
   - [ ] B. Have you audited the telemetry logs?
   - [ ] C. Do you audit the logs?
   - [ ] D. Were you auditing the logs?

<details>
<summary><b>✅ View Answer Key</b></summary>
1. <b>B</b> (Present Perfect connects the past action to the current active state).<br>
2. <b>C</b> (Yesterday is a finished time period).<br>
3. <b>C</b> ("Today" is an unfinished time period).<br>
4. <b>B</b> ("At exactly 02:00 AM" is a specific, finished timestamp).<br>
5. <b>B</b> (Present Perfect is ideal for checking the *current state of knowledge* up to now).
</details>

---

## 🧪 Section 2: Fill-in-the-Blank Technical Drills
*Fill in the blank with either the Past Simple or Present Perfect form of the verb in parentheses.*

1. Yesterday, the migration script ________ (fail) due to a schema mismatch.
2. We ________ (identify) the root cause, and the team is currently drafting the post-mortem.
3. During the Q3 outage, we ________ (lose) connection to the replica set for 40 minutes.
4. So far this week, the latency ________ (drop) by 15% thanks to the new caching layer.
5. I ________ (review) your pull request just now; please check my comments on line 42.

---

## 🔍 Section 3: Error Identification & Sentence Refactoring
*Identify the grammar or tone error in the Junior sentences below and rewrite them to a Senior C1/C2 standard.*

1. **Junior:** "We have migrated the database at 3 PM yesterday."
   - *Your Refactor:* _________________________________________
2. **Junior:** "I checked the logs, the problem is fixed." (Assume the fix is active *now*).
   - *Your Refactor:* _________________________________________
3. **Junior:** "Did you finish the API documentation yet?"
   - *Your Refactor:* _________________________________________
4. **Junior:** "The server broke three times this month."
   - *Your Refactor:* _________________________________________
5. **Junior:** "I restarted the worker node in the morning, but it still doesn't work."
   - *Your Refactor:* _________________________________________

---

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay
**Scenario:** You are leading a post-mortem meeting. A junior engineer says, *"The cache server crashed, so we rebooted it, and it's fine now."* 

**Task:** Rewrite their statement for the official written RCA report. Make sure to clearly delineate the past event from the current system state using proper tenses and senior vocabulary.

*Your Response:*
> 

---

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks
*Compare your roleplay response against these benchmarks.*

* **C1 (Senior Technical Lead):** *"The cache server **crashed** due to memory exhaustion. We **have cycled** the instance, and cache hit rates **have returned** to nominal levels."*
* **C2 (Principal Architect):** *"Following the cache node failure, we **provisioned** a replacement instance. The service **has successfully recovered**, and we **have implemented** stricter memory limits to prevent recurrence."*

---

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric
*Evaluate your practice responses using this checklist.*

- [ ] **Grammatical Precision:** Did I use Past Simple exclusively for specific past timestamps?
- [ ] **State Connection:** Did I use Present Perfect to highlight the *current active state* of the system?
- [ ] **Lexical Elevation:** Did I replace colloquial verbs (broke, fixed, checked) with engineering-grade equivalents (failed, deployed, audited)?
- [ ] **Executive Tone:** Does the sentence sound objective, precise, and emotionally detached (blameless)?
