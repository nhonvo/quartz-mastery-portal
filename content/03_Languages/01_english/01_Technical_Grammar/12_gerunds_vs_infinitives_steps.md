---
title: Module 12 Resource Lesson - Gerunds vs. Infinitives in Algorithmic Steps
category: 01_Technical_Grammar
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# 🚀 Resource Lesson: Gerunds vs. Infinitives (Steps & Operations)

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
**Goal**: Master the critical distinction between gerunds (verb + -ing) and infinitives (to + verb) when describing operational steps, procedures, or system behaviors. 

**Engineering Impact**: Using the wrong form can fundamentally alter the meaning of a technical instruction (e.g., "stop to run the script" vs. "stop running the script"), leading to catastrophic execution errors, misconfigurations, or downtime during incident response.

## 2. 🧊 Warming Up
**Q1: Have you ever written a runbook step that was misinterpreted by a junior engineer? What was it?**
*Sample Answer*: Yes, I once wrote "remember to update the database," but they thought I meant "I remember updating the database" and skipped the step entirely.

**Q2: Why is precision so important when documenting step-by-step procedures in an RFC?**
*Sample Answer*: Ambiguity in steps can lead to race conditions or skipped security checks if engineers interpret a dependency differently than intended.

## 3. ⚙️ Contrastive Analysis & Theory

Some verbs completely change their meaning depending on whether they are followed by a gerund or an infinitive. In engineering workflows, the most critical verbs are **stop, remember, forget, and try**.

| Verb + Infinitive (`to + verb`) | Meaning in Tech Context | Verb + Gerund (`verb + -ing`) | Meaning in Tech Context |
| :--- | :--- | :--- | :--- |
| **Stop to do** | Interrupt current action *in order to* do something else. (e.g., Pause CI/CD *to investigate* a failure). | **Stop doing** | Cease an ongoing action completely. (e.g., Terminate a rogue process). |
| **Remember to do** | A future obligation or task that must be done. (e.g., Don't forget *to rotate* keys). | **Remember doing** | A memory of a past action. (e.g., Recalling that you *already rotated* keys). |
| **Forget to do** | Failing to perform a required task. (e.g., Skipped a deployment step). | **Forget doing** | Losing the memory of having done something. (e.g., Did I restart the pod? I forget doing it). |
| **Try to do** | Attempt an action that is difficult or might fail. (e.g., Attempting to reconnect to a downed DB). | **Try doing** | Experiment with a new method as a potential solution. (e.g., Testing a different load balancing algorithm). |

## 4. 🛠️ Real-World Engineering Context Comparison

| Scenario | Junior (B1/B2) | Senior (C1/C2) | Analysis |
| :--- | :--- | :--- | :--- |
| **Halt and investigate** | "We should stop parsing and to check the logs." | "We must **stop to investigate** the memory leak before the service crashes." | C1 correctly uses *stop to investigate* to show purpose. |
| **Ending a bad process** | "We need to stop to use this old API." | "We need to **stop polling** the deprecated endpoint immediately." | C1 uses *stop doing* to indicate ceasing an action. |
| **Task Reminder** | "Please remember closing the port." | "Please **remember to close** the exposed port after debugging." | C1 uses *remember to do* for a future obligation. |
| **Experimentation** | "Let's try to add a cache, maybe it works." | "Let's **try implementing** a Redis cache to see if it alleviates the read contention." | C1 uses *try doing* for experimenting with a solution. |

## 5. 🎭 Role-Play Dialogue

**Context**: A DevOps Engineer (Dev) and a Site Reliability Engineer (SRE) are troubleshooting a production outage caused by a runaway cron job.

**SRE**: "Alerts are blowing up. CPU utilization on the worker nodes is at 99%. Did someone **forget to throttle** the batch processor?"

**Dev**: "I **remember setting** the concurrency limit to 5 yesterday, but it looks like the new deployment overwrote the config."

**SRE**: "Alright. First, we need to **stop executing** new jobs. Terminate the current batch."

**Dev**: "Done. Should we **try to rollback** the deployment?"

**SRE**: "Not yet. The rollback might fail due to database schema locks. Let's **try isolating** the worker nodes from the load balancer first to see if the queue drains."

**Dev**: "Got it. I'll isolate them now, then I'll **stop to review** the migration logs."

## 6. 💬 Let's talk about the role play
1. Why did the SRE say "stop executing" instead of "stop to execute"? 
2. Why did the Dev say "remember setting" instead of "remember to set"?
3. What is the difference between "try to rollback" and "try isolating" in their troubleshooting strategy?

## 7. 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| **Execute** | To run or perform a command, script, or program. | Thực thi, chạy (chương trình) |
| **Throttle** | To intentionally limit the speed or resource usage of a process. | Điều tiết, bóp băng thông/tài nguyên |
| **Rollback** | To revert a system to a previous stable state. | Khôi phục trạng thái cũ |
| **Isolate** | To separate a component from the rest of the system to prevent cascading failures. | Cách ly |
| **Concurrency** | The ability of a system to execute multiple processes or threads simultaneously. | Đồng thời, xử lý song song |

## 8. 🚫 Common Anti-Patterns & Pitfalls

- ❌ **Anti-Pattern**: "I tried to use Docker, and it fixed the problem." (Implies you attempted it but it was difficult/failed).
- ✅ **Correction**: "I **tried using** Docker, and it fixed the problem." (Experimentation).

- ❌ **Anti-Pattern**: "Don't forget running the unit tests before pushing." 
- ✅ **Correction**: "Don't **forget to run** the unit tests before pushing." (Future obligation).

- ❌ **Anti-Pattern**: "We stopped to send emails because the SMTP server is down." (Means you paused other work in order to start sending emails).
- ✅ **Correction**: "We **stopped sending** emails because the SMTP server is down." (Ceased the action).

---

# 💻 Practice Workspace: Gerunds vs. Infinitives (Steps & Operations)

# Part 2: Practice Workspace (Active Execution)

## 1. 🏗️ Scenario & Engineering Context
**Context**: You are a Lead Site Reliability Engineer. During a major incident, a memory leak is causing repeated Out-Of-Memory (OOM) kills on your API gateway pods. The team is panicking and attempting random fixes. 
You need to write a Slack message to coordinate the incident response, instructing the team to:
1. Cease restarting the pods continuously (it's not helping).
2. Experiment with dropping non-essential traffic.
3. Pause their current tasks in order to gather heap dumps.
4. Keep in mind the necessity of scaling the fallback cluster before failing over.

## 2. 📝 User Practice Workspace

> [!NOTE]
> Write your incident response message below. Focus on accurately using gerunds and infinitives with verbs like stop, try, remember, and forget.

```markdown
<!-- WRITE YOUR RESPONSE HERE -->


```

## 3. 💡 Progressive Socratic Hints

<details>
<summary><b>Hint 1: Grammar (Gerund vs Infinitive focus)</b></summary>
- When telling them to cease restarting pods: Use `stop` + `verb-ing` (e.g., stop restarting).
- When telling them to pause their work *in order to* get heap dumps: Use `stop` + `to + verb` (e.g., stop to collect).
- When telling them to experiment with dropping traffic: Use `try` + `verb-ing` (e.g., try dropping).
- When reminding them of a future required task: Use `remember` + `to + verb` (e.g., remember to scale).
</details>

<details>
<summary><b>Hint 2: Lexical (IT Vocabulary)</b></summary>
Use specific operational vocabulary: `OOM kills`, `heap dumps`, `non-essential traffic / payload`, `fallback cluster`, `failover`.
</details>

<details>
<summary><b>Hint 3: Tone/Structure (C1/C2 Executive Engineering)</b></summary>
Instead of a panicked "Please stop to restart pods! Try to drop traffic!", adopt a calm, authoritative C2 tone: 
"Team, we need to immediately **stop restarting** the crashing pods. Instead, let's **try shedding** non-essential traffic. Please **stop to collect** heap dumps before we proceed. Finally, **remember to pre-warm** the fallback cluster before we initiate the failover."
</details>

---

# 📝 Assessment Exam: Gerunds vs. Infinitives (Steps & Operations)

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)

1. The data pipeline is failing. The data engineer says: "Let's _____ the schema validation step to see if it bypasses the error."
- [ ] A. try to disable
- [ ] B. try disabling
- [ ] C. stop to disable
- [ ] D. remember disabling

<details>
<summary><b>Answer Key & Explanation</b></summary>
**Correct Answer: B (try disabling)**
*Explanation*: "Try + gerund" means to experiment with an action as a potential solution. "Try to disable" would imply attempting it because it's difficult. 
</details>

2. During the incident, the team was debugging other issues, but they had to _____ the root cause of the memory leak first.
- [ ] A. stop to investigate
- [ ] B. stop investigating
- [ ] C. remember investigating
- [ ] D. forget to investigate

<details>
<summary><b>Answer Key & Explanation</b></summary>
**Correct Answer: A (stop to investigate)**
*Explanation*: They interrupted their current debugging tasks *in order to* investigate the memory leak.
</details>

3. "I clearly _____ the IAM permissions yesterday, so the 403 error must be a caching issue."
- [ ] A. remember to update
- [ ] B. try updating
- [ ] C. remember updating
- [ ] D. stop updating

<details>
<summary><b>Answer Key & Explanation</b></summary>
**Correct Answer: C (remember updating)**
*Explanation*: "Remember + gerund" is used for recalling a past action that has already been completed.
</details>

4. "Please don't _____ the temporary credentials before you sign off today."
- [ ] A. forget revoking
- [ ] B. forget to revoke
- [ ] C. stop to revoke
- [ ] D. try revoking

<details>
<summary><b>Answer Key & Explanation</b></summary>
**Correct Answer: B (forget to revoke)**
*Explanation*: "Forget to do" refers to failing to perform a required future task or obligation.
</details>

5. "The legacy API is deprecated. We must _____ it by the end of Q3."
- [ ] A. stop supporting
- [ ] B. stop to support
- [ ] C. remember supporting
- [ ] D. try to support

<details>
<summary><b>Answer Key & Explanation</b></summary>
**Correct Answer: A (stop supporting)**
*Explanation*: "Stop + gerund" means to cease an action entirely.
</details>

---

## 🧪 Section 2: Fill-in-the-Blank Technical Drills

1. Before we deploy to production, please remember ________ (run) the integration test suite.
2. The server was overheating, so we stopped ________ (accept) new TCP connections.
3. If the cache invalidation isn't working, try ________ (flush) Redis manually to see if it resolves the stale data.
4. I completely forgot ________ (add) the new environment variables, which caused the pod to crash on startup.
5. While I was reviewing the code, I had to stop ________ (look up) the documentation for that specific API method.

---

## 🔍 Section 3: Error Identification & Sentence Refactoring

Identify the error in each sentence and rewrite it using C1/C2 engineering tone.

1. **Original**: I tried to restart the server, and that fixed the memory issue perfectly.
   **Refactored**: ______________________________________________________________

2. **Original**: Please stop to merge pull requests until the CI/CD pipeline is green again.
   **Refactored**: ______________________________________________________________

3. **Original**: I remember to write that documentation last year, but I can't find it now.
   **Refactored**: ______________________________________________________________

4. **Original**: Don't forget running the database migration script before you start the app.
   **Refactored**: ______________________________________________________________

5. **Original**: We were deploying the hotfix, but we stopped reverting a bad commit in the main branch.
   **Refactored**: ______________________________________________________________

---

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay

**Scenario**: You are a Staff Engineer mentoring a Junior Developer. The junior developer is having trouble with a flaky test. They say: *"I stopped to run the test because it keeps failing, and I tried to add a sleep command, but it didn't help."*

**Task**: Correct their grammar gently while providing technical direction on how to actually fix a flaky test instead of just adding a sleep command. Write your response as if you are speaking to them in a 1-on-1 meeting.

---

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

### Senior Technical Lead (C1)
"I noticed you mentioned you 'stopped to run the test'—just a quick language tip: you probably mean you 'stopped running' it, since you ceased the action. Regarding the fix, rather than trying to add a sleep command, we should try implementing an explicit wait condition. Let's stop relying on arbitrary timeouts and remember to poll the DOM element state instead."

### Principal Architect (C2)
"To clarify your phrasing, saying you 'stopped to run' implies you paused other work in order to execute it. You mean you 'stopped running' it. Architecturally speaking, introducing arbitrary thread sleeps is an anti-pattern for race conditions. Let's try adopting deterministic synchronization. Remember to utilize fluent wait mechanisms so we can decouple the test execution from network latency variations."

---

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric

| Criteria | B2 (Upper Intermediate) | C1 (Advanced) | C2 (Mastery) | Self-Score |
| :--- | :--- | :--- | :--- | :--- |
| **Grammar Precision** | Frequently confuses gerunds and infinitives (e.g., "stop to run" instead of "stop running"). | Correctly distinguishes *stop/remember/try* + gerund vs infinitive in most contexts. | Flawlessly executes complex syntactical shifts with perfect semantic accuracy. | [ ] |
| **Technical Vocabulary** | Uses basic words (e.g., "fix," "wait"). | Uses precise terms (e.g., "implement," "explicit wait"). | Commands authoritative lexicon (e.g., "deterministic synchronization"). | [ ] |
| **Tone & Delivery** | Direct, sometimes clumsy or overly informal. | Professional, clear, and constructive when mentoring. | Highly articulate, diplomatic, and technically authoritative. | [ ] |
