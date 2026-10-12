---
title: Module 50 Resource Lesson - Asking for Clarification on Vague Technical Specs
category: 03_Code_Review_Async
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# 50. Asking for Clarification on Vague Specs

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
**Goal**: Equip engineers with the linguistic tools to effectively push back or ask for clarification when Product Managers or stakeholders provide vague, incomplete, or ambiguous technical specifications.

**Engineering Impact**: Prevents wasted engineering cycles, reduces architectural rework, and establishes the engineer as a proactive partner rather than an order-taker.

## 2. 🧊 Warming Up
**Q1**: Have you ever built a feature exactly as requested, only to find out it wasn't what the stakeholder actually wanted? What went wrong?
*Sample Answer*: Yes, early in my career, I assumed the user flow based on a one-line Jira ticket. I should have clarified the edge cases before writing any code.
**Q2**: Why is it difficult to tell a Product Manager that their specification is unclear?
*Sample Answer*: It can feel confrontational or imply that they did a poor job, so engineers often try to guess the missing details instead of asking directly.

## 3. ⚙️ Contrastive Analysis & Theory
When specifications are vague, the goal is to **seek clarity without sounding accusatory**. 
* **Instead of blaming** ("Your ticket is confusing"), **focus on shared goals** ("To ensure we hit the sprint goal, I need a bit more clarity").
* **Use softening phrases**: "Could we clarify...", "Just to make sure we're aligned...", "I'm looking at the spec and had a few questions about..."
* **Propose options**: Don't just say "I don't know what to do." Provide A/B options to make it easier for the stakeholder to decide.

## 4. 🛠️ Real-World Engineering Context Comparison

| Junior/B1 (Accusatory / Passive) | Senior/C1 (Collaborative / Proactive) | Principal/C2 (Strategic / Option-Oriented) |
| :--- | :--- | :--- |
| I don't understand this ticket. | Could we clarify a few points on this ticket before I start development? | To ensure we build exactly what you need, could we align on the edge cases for this workflow? |
| What should happen if the user logs out? | The spec doesn't mention the logout flow. Should we redirect to home? | I noticed the logout flow isn't covered. I propose we redirect to the login screen and clear the JWT token—does that align with your vision? |
| This spec is too vague, I can't work on it. | I need a bit more detail on the acceptance criteria before I can estimate this accurately. | I see a few architectural ambiguities here. Let's briefly sync so I can unblock this ticket without risking rework later. |
| Tell me how you want the error message to look. | Do we have mockups for the error state? | For the error handling, should we fail gracefully with a generic toast, or do we need specific error codes mapped to UI alerts? |

## 5. 🎭 Role-Play Dialogue
**Context**: An engineer is reviewing a new Jira epic for a "One-Click Checkout" feature. The spec simply says "Users should be able to checkout with one click."

**Engineer (Alex)**: "Hey Sarah, I was reviewing the 'One-Click Checkout' epic. I love the concept, but I wanted to make sure we're fully aligned before I start architecture design."

**PM (Sarah)**: "Sure, what's missing?"

**Engineer (Alex)**: "The core flow is clear, but I noticed we haven't defined the behavior for expired credit cards. Should we prompt them for a new card inline, or fail the transaction and send an email?"

**PM (Sarah)**: "Oh, good catch. I'd say prompt them inline so we don't lose the conversion."

**Engineer (Alex)**: "Perfect. Also, regarding the inventory lock—if two people click at the exact same time, we could oversell. I propose we implement a 5-minute optimistic lock on the item. Does that sound reasonable?"

**PM (Sarah)**: "Yes, let's go with the optimistic lock. Can you update the ticket with those details?"

**Engineer (Alex)**: "Will do. Thanks for clarifying!"

## 6. 💬 Let's talk about the role play
1. How does Alex soften the introduction before pointing out the missing details?
2. Instead of just asking what to do about inventory locks, what strategy does Alex use?
3. Why is this approach better than leaving a comment saying "Spec is missing expired card handling"?

## 7. 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| **Ambiguity** | The quality of being open to more than one interpretation; inexactness. | Sự mơ hồ, không rõ ràng |
| **Acceptance Criteria** | Conditions that a software product must satisfy to be accepted by a user/customer. | Tiêu chí chấp nhận |
| **To align on** | To agree with another person or group about a plan or goal. | Thống nhất (quan điểm/kế hoạch) |
| **Edge case** | A problem or situation that occurs only at an extreme operating parameter. | Trường hợp ngoại lệ |
| **Pushback** | A negative or unfavorable reaction or response. | Sự phản hồi từ chối/trì hoãn (một cách khéo léo) |
| **Unblock** | To remove an obstacle that is preventing progress. | Khơi thông, gỡ rối |

## 8. 🚫 Common Anti-Patterns & Pitfalls
* **The "Blame Game"**: Saying "You didn't write this clearly." (Use passive voice or "we" language instead: "We might be missing some details here.")
* **The "Guessing Game"**: Implementing what you *think* they meant, leading to wasted sprints.
* **Open-Ended Helplessness**: Asking "What should I do?" instead of "Should we do X or Y?" Stakeholders prefer choosing between options over doing the engineering thinking for you.

---

# Practice Workspace: Asking Clarification on Vague Specs

# Part 2: Practice Workspace (Active Execution)

## 1. 🏢 Scenario & Engineering Context
**Context**: You are assigned a ticket titled "Implement Data Export for Dashboard." The description only says: "Users need to be able to download their analytics data. Add a button to the dashboard." 

There is no mention of the file format (CSV, PDF, Excel), the date range limits (can they download 10 years of data?), or what happens if the query takes more than 30 seconds to run.

**Your Task**: Write an async message to your Product Manager on Slack/Teams asking for clarification on these points without sounding dismissive or accusatory. Propose a solution for at least one of the missing details.

## 2. 📝 User Practice Workspace
> ✏️ *Draft your Slack message here...*

```text
[Your draft here]
```

## 3. 💡 Progressive Socratic Hints
<details>
<summary>Hint 1: Tone & Structure</summary>
Start with a positive acknowledgment of the feature, then transition into your questions using a softening phrase like "Just to ensure I have all the requirements..."
</details>
<details>
<summary>Hint 2: The Missing Details (Grammar/Lexis)</summary>
Ask about the file format and date range limits. Instead of "What format do you want?", try "Could you confirm if we are targeting CSV or PDF exports for the MVP?"
</details>
<details>
<summary>Hint 3: Proposing Solutions</summary>
Address the timeout issue by proposing an asynchronous solution. E.g., "For large datasets, queries might timeout. I propose we email them a link to the file once it's ready. Let me know your thoughts."
</details>

---

# Assessment Exam: Asking Clarification on Vague Specs

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)

**1. Which phrase is the most professional way to point out missing information in a spec?**
- [ ] A. Your ticket is missing the error states.
- [ ] B. I can't do this without the error states.
- [ ] C. I noticed the error states aren't defined yet. Should we use the standard toast notifications?
- [ ] D. You forgot to tell me what happens on an error.

<details><summary><b>Answer Key</b></summary>
**Correct Answer: C** - It avoids blame ("I noticed" instead of "You forgot"), points out the issue objectively, and immediately proposes a solution to keep the momentum going.
</details>

**2. What is the main danger of NOT clarifying a vague spec?**
- [ ] A. The PM might get angry.
- [ ] B. You risk building the wrong feature and wasting engineering cycles.
- [ ] C. Jira will automatically reject the ticket.
- [ ] D. You will have to write more unit tests.

<details><summary><b>Answer Key</b></summary>
**Correct Answer: B** - The biggest risk of ambiguity is wasted time and architectural rework.
</details>

**3. If a ticket asks for an "Upload Image" feature but doesn't specify file size limits, what is the best approach?**
- [ ] A. Build it to accept any file size and see if it crashes.
- [ ] B. Block the ticket and wait for the PM to notice.
- [ ] C. Slack the PM: "I'm setting a 5MB limit on image uploads to prevent server overload. Let me know if we need to support larger files."
- [ ] D. Slack the PM: "What is the max file size?"

<details><summary><b>Answer Key</b></summary>
**Correct Answer: C** - This is a C1/C2 proactive approach. You state the problem, propose a reasonable default, and ask for confirmation, rather than waiting for them to do the research (Option D).
</details>

**4. Which word means "The quality of being open to more than one interpretation"?**
- [ ] A. Acceptance
- [ ] B. Clarification
- [ ] C. Ambiguity
- [ ] D. Refactoring

<details><summary><b>Answer Key</b></summary>
**Correct Answer: C**
</details>

**5. How can you soften the transition from acknowledging the ticket to asking questions?**
- [ ] A. "But wait..."
- [ ] B. "However, you missed..."
- [ ] C. "Just to make sure we're fully aligned before I start..."
- [ ] D. "Tell me..."

<details><summary><b>Answer Key</b></summary>
**Correct Answer: C** - "Aligning" is a great executive buzzword that framing your questions as a collaborative effort.
</details>

## 🧪 Section 2: Fill-in-the-Blank Technical Drills

1. Could we _______ on the acceptance criteria before I pull this ticket into the sprint?
2. Just to make sure we're fully _______, should the user be redirected to the dashboard after logging in?
3. I noticed the edge _______ for expired accounts wasn't mentioned in the epic.
4. To avoid wasting time on _______, let's sync up for 5 minutes to clarify the data schema.
5. The requirements are a bit _______; I propose we break this down into smaller, defined tasks.

<details><summary><b>Answer Key</b></summary>
1. align
2. aligned
3. cases / case
4. rework
5. vague / ambiguous
</details>

## 🔍 Section 3: Error Identification & Sentence Refactoring
*Refactor these aggressive or poorly phrased sentences into professional, Senior-level communication.*

1. **Original**: This spec is terrible, I don't know what you want me to do.
   **Refactored**: _________________________________________________
2. **Original**: You forgot to include the database schema in the design doc.
   **Refactored**: _________________________________________________
3. **Original**: What do you want to happen if the API fails?
   **Refactored**: _________________________________________________
4. **Original**: I am blocked because the ticket has no details.
   **Refactored**: _________________________________________________
5. **Original**: Tell me the maximum number of users allowed in a group.
   **Refactored**: _________________________________________________

<details><summary><b>Sample C1/C2 Answers</b></summary>
1. I'm having trouble fully understanding the requirements here. Could we jump on a quick call to clarify the expected behavior?
2. I was reviewing the design doc and noticed the database schema section might be missing. Could we add that in?
3. Regarding API failures, should we implement a retry mechanism or surface a generic error to the user?
4. I'm currently blocked on this ticket due to a few missing details in the acceptance criteria. Can we review it together?
5. Could you confirm the maximum number of users allowed per group? I'd suggest capping it at 50 for V1.
</details>

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay
**Scenario**: Your tech lead leaves a comment on your PR asking you to "Make the caching layer more robust." This is highly ambiguous. 

**Task**: Write a reply asking for clarification. Propose two specific options (e.g., adding a TTL, or implementing a Redis fallback) to show proactive thinking.

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

**Scenario**: A PM provides a vague requirement for a new reporting feature.

*   **C1 (Senior Engineer)**: "Hi David, I took a look at the reporting feature ticket. To ensure we're building exactly what you need, could we clarify a few points? Specifically, what data format should the export be in (CSV vs PDF), and are there any constraints on the date range? I'd propose we stick to CSV and a maximum 90-day range for the MVP to speed up delivery. Let me know what you think."
*   **C2 (Principal/Staff Engineer)**: "David, great initiative on the reporting module. Before we commit engineering cycles to this, I want to ensure we're aligned on the edge cases to prevent any architectural rework later. The spec currently leaves the export mechanism open. Given the potential payload size, synchronous downloads might timeout. I strongly recommend we decouple this: we generate the report asynchronously and email the user a secure S3 link. Does this approach satisfy the business requirement?"

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric

| Criteria | B1/B2 (Intermediate) | C1/C2 (Advanced/Executive) | Self-Check |
| :--- | :--- | :--- | :---: |
| **Tone & Diplomacy** | Direct, sometimes blunt ("I need more info") | Diplomatic, collaborative ("To ensure we're aligned...") | [ ] |
| **Proactivity** | Asks open-ended questions ("What should I do?") | Proposes A/B options or default solutions ("I propose we use CSV...") | [ ] |
| **Vocabulary** | Uses basic words (missing, wrong, confusing) | Uses precise terminology (ambiguous, edge cases, align, rework) | [ ] |
| **Focus on Impact** | Complains about the ticket quality | Frames questions around saving time and preventing rework | [ ] |
