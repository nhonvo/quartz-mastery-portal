---
title: Module 44 Resource Lesson - RFC Drafting & Requesting Team Feedback
category: 03_Code_Review_Async
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# 🚀 Resource Lesson: RFC Drafting & Team Feedback

## 🎯 Executive Summary & Objectives
This lesson focuses on drafting Requests for Comments (RFCs) and facilitating team feedback asynchronously. The objective is to establish a structured, persuasive, and collaborative tone when proposing system architecture changes, ensuring alignment among engineering stakeholders while avoiding defensive or aggressive language during feedback loops.

## 🧊 Warming Up
**Question 1:** Why is the tone of an RFC just as important as the technical proposal itself?
*Answer:* A well-toned RFC invites constructive criticism rather than defensive arguments, fostering a collaborative environment for optimal system design.

**Question 2:** How do you handle conflicting feedback from senior engineers on your RFC?
*Answer:* Acknowledge the feedback professionally, evaluate the trade-offs objectively, and document the rationale for the final decision without taking the conflict personally.

## ⚙️ Contrastive Analysis & Theory
When drafting RFCs, use **mitigating language** and **inclusive pronouns** (we, our) to build consensus.
- **Direct/Abrasive:** "I will change the database to PostgreSQL because MongoDB is bad."
- **Mitigated/Collaborative:** "We propose migrating to PostgreSQL to better support relational queries, addressing the consistency issues currently observed with MongoDB."

**Key Formulas:**
- *Proposing:* "This RFC proposes [action] to address [problem]."
- *Soliciting Feedback:* "I'd love to get your thoughts on [specific section]."
- *Handling Pushback:* "That's a valid concern regarding [topic]. What if we mitigated this by [alternative]?"

## 🛠️ Real-World Engineering Context Comparison

| Scenario | Junior (B1/B2) Phrasing | Senior (C1/C2) Phrasing |
| :--- | :--- | :--- |
| **Introducing the RFC** | "Here is my RFC for the new cache. Please read it." | "I've drafted an RFC outlining our proposed caching strategy. I'd appreciate your review, particularly on the eviction policy." |
| **Addressing a flaw found by a peer** | "You are right, I made a mistake there." | "Great catch. I've updated the proposal to account for that edge case." |
| **Declining a suggestion** | "No, that won't work because it's too slow." | "While that approach offers [benefit], I'm concerned about the latency implications. Let's stick with [current choice] for now unless there's a strong workaround." |
| **Closing the feedback loop** | "Thanks for the comments, I will start coding now." | "Thanks everyone for the valuable input. We've reached consensus on the core architecture and I'll proceed with the implementation phase." |

## 🎭 Role-Play Dialogue
**Context:** Async discussion on an RFC PR on GitHub.
**Alice (Author):** "Hi team, I've published the draft RFC for transitioning our monolith to microservices. Please drop your comments inline by Friday."
**Bob (Senior Engineer):** "Thanks for putting this together, Alice. I left a few comments on the data migration strategy. I'm slightly concerned about the potential downtime."
**Alice (Author):** "Appreciate the thorough review, Bob. Regarding the downtime, I've added a section detailing a blue-green deployment approach that should mitigate that risk. Let me know if that addresses your concern."
**Bob (Senior Engineer):** "That looks solid. The blue-green approach makes sense here. Approving from my end."

## 💬 Let's talk about the role play
1. How does Alice invite feedback initially without sounding demanding?
2. What phrase does Alice use to validate Bob's concern while providing a solution?

## 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| Consensus | General agreement among a group. | Sự đồng thuận |
| Mitigate | Make less severe, serious, or painful. | Giảm nhẹ, làm dịu |
| Trade-off | A balance achieved between two desirable but incompatible features. | Sự đánh đổi |
| Stakeholder | A person with an interest or concern in something, especially a business. | Các bên liên quan |
| Granular | Characterized by a high level of detail. | Chi tiết, tỉ mỉ |

## 🚫 Common Anti-Patterns & Pitfalls
- **Being overly defensive:** Taking technical feedback as a personal attack.
- **Using accusatory "You":** E.g., "You didn't read section 3." instead of "Section 3 elaborates on this point."
- **Vague requests for review:** "Thoughts?" instead of directing reviewers to specific areas of concern.

---

# 💻 Practice Workspace: RFC Drafting & Team Feedback

## 🏢 Scenario & Engineering Context
You are proposing a major refactoring of the authentication service to support OAuth 2.0. You need to draft the introduction of the RFC to your engineering team, asking for feedback specifically on the proposed database schema changes. Later, a senior engineer comments: "This schema seems overly normalized. Have we considered the read latency impact?" You must reply asynchronously.

## 📝 User Practice Workspace

**Draft your RFC Introduction here:**
> [!NOTE]
> Write your draft here...

**Draft your reply to the Senior Engineer here:**
> [!NOTE]
> Write your reply here...

## 💡 Progressive Socratic Hints

<details>
<summary><b>Hint 1: Tone & Structure (RFC Intro)</b></summary>
Start by stating the purpose of the RFC clearly. Use collaborative language like "We propose..." and explicitly guide the reviewers to the database schema section.
</details>

<details>
<summary><b>Hint 2: Lexical Focus (Replying to Feedback)</b></summary>
Acknowledge the feedback positively (e.g., "That's a valid point," "Great observation"). Use words like "latency implications," "denormalization," or "caching layer."
</details>

<details>
<summary><b>Hint 3: Grammar (Conditional Mitigation)</b></summary>
Use conditional structures to propose solutions softly: "If we were to denormalize X, we could reduce read latency, though it might impact write consistency. What are your thoughts on implementing a read replica?"
</details>

---

# 📝 Assessment Exam: RFC Drafting & Team Feedback

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)

**1. Which phrase is best for soliciting specific feedback in an RFC?**
- [ ] A. Tell me if this is wrong.
- [ ] B. I'd appreciate your insights on the data modeling section.
- [ ] C. Read the data model and comment.
- [ ] D. Any thoughts?

<details>
<summary><b>Answer Key & Explanation</b></summary>
**Correct Answer: B**
Explanation: Option B is polite, professional, and directs the reviewer to a specific area, saving them time and setting clear expectations.
</details>

**2. How should you respond to critical feedback on an RFC?**
- [ ] A. Defend your original idea forcefully to assert dominance.
- [ ] B. Ignore the feedback if you disagree with it.
- [ ] C. Acknowledge the concern, evaluate trade-offs, and suggest alternatives or mitigations.
- [ ] D. Immediately change your proposal without questioning the feedback.

<details>
<summary><b>Answer Key & Explanation</b></summary>
**Correct Answer: C**
Explanation: Constructive async communication requires evaluating feedback objectively and keeping the discussion collaborative and focused on trade-offs.
</details>

**3. What is a key benefit of using inclusive pronouns like "we" in an RFC?**
- [ ] A. It blames the entire team if something goes wrong.
- [ ] B. It makes the document longer and more formal.
- [ ] C. It fosters a sense of shared ownership and consensus.
- [ ] D. It hides the identity of the author.

<details>
<summary><b>Answer Key & Explanation</b></summary>
**Correct Answer: C**
Explanation: Using "we" instead of "I" shifts the focus from individual performance to team success and collaborative system design.
</details>

**4. If a senior engineer points out a flaw in your RFC, what is the best response?**
- [ ] A. "Great catch. I've updated the proposal to account for that edge case."
- [ ] B. "You didn't understand the context."
- [ ] C. "I will fix it later."
- [ ] D. "That edge case will never happen."

<details>
<summary><b>Answer Key & Explanation</b></summary>
**Correct Answer: A**
Explanation: Acknowledging the find ("Great catch") and immediately integrating the fix demonstrates maturity and adaptability.
</details>

**5. Which anti-pattern should be avoided when drafting an RFC?**
- [ ] A. Providing granular details on implementation.
- [ ] B. Outlining potential trade-offs and risks.
- [ ] C. Taking technical feedback personally and responding defensively.
- [ ] D. Clearly stating the executive summary.

<details>
<summary><b>Answer Key & Explanation</b></summary>
**Correct Answer: C**
Explanation: Defensive reactions hinder constructive dialogue and can delay achieving consensus.

## 🧪 Section 2: Fill-in-the-Blank Technical Drills

1. "To address the performance bottleneck, we ________ transitioning to a message queue architecture." (propose / dictate)
2. "I've updated the document to ________ for the edge cases you mentioned." (account / ignore)
3. "Let's hold off on this change until we reach ________ among the core maintainers." (consensus / argument)
4. "The primary ________ of this approach is the increased operational complexity." (trade-off / benefit)
5. "Could you elaborate on the ________ implications of this API change?" (latency / spelling)

## 🔍 Section 3: Error Identification & Sentence Refactoring

**Refactor the following sentences to sound more professional (C1/C2 level):**
1. *Original:* Your idea is bad because it will crash the server.
2. *Original:* I want everyone to read my RFC now.
3. *Original:* Why didn't you look at the diagram I made?
4. *Original:* We have to use Kafka, there is no other way.
5. *Original:* I fixed the thing you complained about.

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay

**Scenario:** An engineer suggests using a technology stack that the team has no experience with, which adds significant risk to the project timeline.
**Task:** Write a polite but firm comment on their RFC outlining your concerns about the learning curve and project timeline.

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

**C1 (Senior Technical Lead):**
"Thanks for the detailed proposal. While the suggested stack offers great performance benefits, I have concerns regarding our team's current velocity and the steep learning curve involved. Given our tight Q3 deadlines, the operational risk might outweigh the technical gains. Could we explore a phased adoption or stick with our current stack for the initial MVP?"

**C2 (Principal Architect):**
"I appreciate the forward-thinking approach here. The architecture is elegant, but we must evaluate the organizational readiness alongside the technical merits. Introducing an unfamiliar paradigm at this juncture injects substantial delivery risk. I recommend we defer this architectural shift until post-launch, allowing us to build a proof-of-concept in an isolated domain first. Let's align on prioritizing the MVP delivery using our established patterns."

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric

- [ ] **Grammatical Precision:** Uses mitigated language and conditionals to soften critiques (e.g., "I would be concerned about...").
- [ ] **Technical Vocabulary:** Correctly employs terms like *consensus, trade-off, latency implications, organizational readiness*.
- [ ] **Executive Tone:** Remains objective, collaborative, and focuses on the problem rather than the person when discussing feedback.
