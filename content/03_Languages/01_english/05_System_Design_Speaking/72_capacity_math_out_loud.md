---
title: Module 72 Resource Lesson - Back-of-the-Envelope Capacity Math Out Loud
category: 05_System_Design_Speaking
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# 🚀 Resource Lesson: Capacity Math Out Loud

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
**Goal:** Master the vocabulary, phrasing, and pacing required to confidently calculate and explain system capacity estimations (QPS, storage, bandwidth, and memory) out loud during a System Design interview or architecture review.
**Engineering Impact:** Mumbling or stumbling through basic arithmetic diminishes perceived competence. Conversely, smoothly narrating your capacity math demonstrates clarity of thought, solid fundamentals, and executive presence, establishing you as a C1/C2 senior engineer who can rapidly estimate scale.

## 2. 🧊 Warming Up
* **Q1:** When estimating storage for a new feature, do you calculate silently and just write the final number, or do you explain your steps?
  * *Sample Answer:* I try to explain my steps to show my reasoning, but sometimes I get stuck on how to pronounce "10 to the power of 9" or "gigabytes per second" naturally.
* **Q2:** How do you handle situations where your mental math is slightly off during a live calculation?
  * *Sample Answer:* I usually say "Let me double-check that," and re-calculate out loud to ensure I haven't dropped any zeros.

## 3. ⚙️ Contrastive Analysis & Theory
### Narrating Arithmetic Naturally
In System Design, you need to verbalize approximations using "powers of 10" and standard metric prefixes.
* **Multiplication:** "100 million users times 5 requests per day gives us 500 million requests."
* **Division:** "500 million requests divided by 100,000 seconds in a day yields roughly 5,000 QPS."
* **Powers of 10 / Bytes:**
  * $10^3$ = Kilo (Thousand) = KB
  * $10^6$ = Mega (Million) = MB
  * $10^9$ = Giga (Billion) = GB
  * $10^{12}$ = Tera (Trillion) = TB
  * $10^{15}$ = Peta (Quadrillion) = PB
* **Key Phrasings for Estimation:**
  * "Assuming a rough estimate of..."
  * "For simplicity, let's round up to..."
  * "To make the math easier, let's approximate a day to $10^5$ seconds."
  * "That translates to roughly..."

## 4. 🛠️ Real-World Engineering Context Comparison

| Scenario | Junior Phrasing (B1/B2) | Senior Phrasing (C1/C2) |
| :--- | :--- | :--- |
| **Estimating QPS** | "So 100 million users... times 10 requests... is 1 billion. Divided by 86400 seconds... is around 11000 QPS." | "Assuming 100 million active users generating 10 requests daily, we're looking at 1 billion total requests. Approximating a day to 100,000 seconds, that yields a baseline of 10,000 QPS." |
| **Storage Calculation** | "We have 10000 QPS. Times 10 KB per request. That's 100 MB per second. Times 3 years is 10 PB." | "With 10,000 QPS and an average payload of 10 kilobytes, our ingestion rate sits at roughly 100 megabytes per second. Extrapolating over a 3-year retention period, we'll need to provision around 10 petabytes of total storage." |
| **Handling Peaks** | "The max traffic is times 5. So it's 50000 QPS." | "To accommodate seasonal spikes, we'll factor in a peak-to-average ratio of 5, pushing our peak load to approximately 50,000 QPS." |
| **Rounding Numbers** | "It is 86400 seconds in a day, but I use 100000." | "For the sake of back-of-the-envelope calculations, I'll round a day up to 100,000 seconds, which provides a comfortable safety margin." |

## 5. 🎭 Role-Play Dialogue
**Context:** A Senior Engineer (Alex) is discussing the capacity requirements for a new photo-sharing service with a Staff Architect (Sam).

**Sam:** So, regarding the photo upload service, have we sized the storage layer for the next three years?
**Alex:** Yes. Let's walk through the back-of-the-envelope math. Assuming 10 million Daily Active Users, each uploading an average of 2 photos per day, we're looking at 20 million uploads daily.
**Sam:** Makes sense. What's the average payload size?
**Alex:** We'll assume 2 megabytes per photo. So, 20 million times 2 megabytes gives us roughly 40 terabytes of new data generated per day.
**Sam:** And over three years?
**Alex:** Multiplying 40 terabytes by roughly 1,000 days, that translates to about 40 petabytes of raw storage. Factoring in a replication factor of 3 for durability, we'll ultimately need to provision around 120 petabytes of total capacity.
**Sam:** Perfect. The numbers look solid. Let's move on to bandwidth estimations.

## 6. 💬 Let's talk about the role play
1. **Why did Alex say "Let's walk through the back-of-the-envelope math"?**
   * *Answer:* It sets the expectation that these are approximations and high-level estimations, not precise final numbers, which is standard practice in architecture discussions.
2. **How did Alex handle the time conversion for three years?**
   * *Answer:* Alex explicitly stated "multiplying 40 terabytes by roughly 1,000 days" to make the math easier and transparent, rather than doing complex math with 1095 days in their head.

## 7. 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| **Back-of-the-envelope** | A quick, rough calculation or estimation. | Tính toán nháp, ước lượng nhanh |
| **Yield (verb)** | To produce or provide a result. | Cho ra, mang lại (kết quả) |
| **Extrapolate** | To estimate or conclude something by assuming that existing trends will continue. | Ngoại suy |
| **Baseline** | A minimum or starting point used for comparisons. | Mức cơ sở |
| **Provision** | To allocate or supply resources (like storage or servers). | Cung cấp, cấp phát |
| **Translate to** | To convert or equate to a different form or unit. | Quy đổi thành |
| **Safety margin** | Extra capacity added to an estimate to handle unexpected loads. | Biên độ an toàn |
| **Payload** | The actual data part of a transmission, excluding headers. | Dữ liệu thực (tải trọng) |

## 8. 🚫 Common Anti-Patterns & Pitfalls
* **The "Silent Calculator":** Pausing for 30 seconds to do math silently on a whiteboard without talking.
  * *Correction:* Always narrate your steps. "So if I take 100 million and divide by..."
* **Mispronouncing Units:** Saying "giga-bytes" awkwardly or mixing up MB and Mbps (megabits vs megabytes).
  * *Correction:* Practice saying "megabytes per second" and "gigabits per second" fluidly. Remember: networking is usually bits, storage is bytes.
* **Over-complicating Math:** Trying to divide by 86,400 precisely.
  * *Correction:* Use 100,000 for seconds in a day. It shows seniority and practical focus over pedantry.
* **Dropping the Subject/Verb:** Saying "Times 10 is 100."
  * *Correction:* Use complete, professional phrasing: "Multiplying that by 10 yields 100."

---

# 💻 Practice Workspace: Capacity Math Out Loud

# Part 2: Practice Workspace (Active Execution)

## 1. 🏗️ Scenario & Engineering Context
**Context:** You are in a system design interview, tasked with designing a scalable URL shortening service (like Bitly). The interviewer asks you to estimate the storage and bandwidth requirements for the service over a 5-year period.

**Assumptions given by interviewer:**
- 100 million new URLs generated per month.
- 1 billion URL redirections (reads) per month.
- An average URL mapping takes 500 bytes of storage.
- You need to retain the data for 5 years.

**Your Task:**
Write out (as a script) exactly what you would say out loud to calculate the total storage capacity needed, the read QPS, and the write QPS. Ensure you use C1/C2 executive phrasing, explain your approximations (like rounding a month to 30 days or $2.5 \times 10^6$ seconds), and state your final numbers confidently.

---

## 2. 📝 User Practice Workspace

> **[Write your script here...]**
> 
> 
> 

---

## 3. 💡 Progressive Socratic Hints

<details>
<summary><b>Hint 1: Lexical (Starting the calculation)</b></summary>
Start by setting expectations. Use phrases like: "Let's walk through the back-of-the-envelope math," or "Assuming roughly 100 million new URLs monthly..."
</details>

<details>
<summary><b>Hint 2: Grammar & Math (Converting time)</b></summary>
When converting to QPS, explicitly state your rounding. E.g., "To make the math easier, I'll approximate a month as 30 days, which is roughly 2.5 million seconds."
</details>

<details>
<summary><b>Hint 3: Tone & Structure (Finalizing estimates)</b></summary>
Don't just say "Storage is 3 TB." Say: "Extrapolating over a 5-year retention period, we'll need to provision approximately 3 terabytes of total storage for the mapping data."
</details>

---

# 📝 Assessment Exam: Capacity Math Out Loud

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)

1. When beginning your capacity estimations, which phrase best sets a professional, senior tone?
   - [ ] A. "Okay, I will do some math now."
   - [ ] B. "Let's walk through the back-of-the-envelope math."
   - [ ] C. "Math time. 100 million times 5..."
   - [ ] D. "I need to calculate the numbers precisely."
   <details><summary><b>Answer</b></summary><b>B</b> - It's idiomatic in tech and sets the expectation for high-level estimations rather than exact precision.</details>

2. How should you narrate rounding seconds in a day for easier calculations?
   - [ ] A. "It is 86,400 seconds but I will use 100,000."
   - [ ] B. "Let's approximate a day to 100,000 seconds to simplify the math."
   - [ ] C. "I ignore the 86,400 because it's too hard."
   - [ ] D. "Let's pretend a day is $10^5$ seconds."
   <details><summary><b>Answer</b></summary><b>B</b> - Professional phrasing that explains *why* the approximation is being made.</details>

3. Which term best describes adding extra capacity to handle unexpected traffic spikes?
   - [ ] A. Math buffer
   - [ ] B. Extrapolated excess
   - [ ] C. Safety margin
   - [ ] D. Baseline padding
   <details><summary><b>Answer</b></summary><b>C</b> - "Safety margin" is the standard engineering term for provisioning extra capacity.</details>

4. You calculate 500 million requests divided by $10^5$ seconds. How do you voice the result smoothly?
   - [ ] A. "That yields roughly 5,000 QPS."
   - [ ] B. "The answer is 5,000 QPS."
   - [ ] C. "So we have 5,000 QPS."
   - [ ] D. "Which equals 5,000 queries every second."
   <details><summary><b>Answer</b></summary><b>A</b> - "Yields roughly" is formal and acknowledges the estimation aspect.</details>

5. When projecting data storage for the future, which verb is most appropriate?
   - [ ] A. Guessing
   - [ ] B. Extrapolating
   - [ ] C. Multiplying
   - [ ] D. Assuming
   <details><summary><b>Answer</b></summary><b>B</b> - "Extrapolating" correctly implies projecting future data based on current trends.</details>

---

## 🧪 Section 2: Fill-in-the-Blank Technical Drills

1. "For the sake of ____________ calculations, I'll round a day up to 100,000 seconds." (Hint: rough/quick estimations)
2. "Multiplying 10,000 QPS by 10 kilobytes ____________ a baseline ingestion rate of 100 MB/s." (Hint: produces/gives)
3. "To accommodate seasonal spikes, we should factor in a ____________ of 5, pushing our max load to 50,000 QPS." (Hint: peak-to-average...)
4. "Extrapolating over a 3-year ____________ period, we'll need 5 petabytes of storage." (Hint: keeping data)
5. "We'll ultimately need to ____________ around 120 petabytes of total capacity across our clusters." (Hint: allocate/supply)

---

## 🔍 Section 3: Error Identification & Sentence Refactoring

1. **Error:** "The max traffic is times 5. So it's 50000 QPS."
   **Refactor:** __________________________________________________
2. **Error:** "I calculate 1 billion divided by 100000 is 10000 QPS."
   **Refactor:** __________________________________________________
3. **Error:** "For storage, 100 MB per second times 3 years is 10 PB."
   **Refactor:** __________________________________________________
4. **Error:** "We have 100 million users. Times 10 requests is 1 billion."
   **Refactor:** __________________________________________________
5. **Error:** "It is 86400 seconds in a day, but I use 100000."
   **Refactor:** __________________________________________________

---

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay

**Scenario:** You are explaining the bandwidth requirements for a live streaming service. You need to calculate the outbound bandwidth if there are 1 million concurrent viewers watching a 5 Mbps stream. Write a 3-4 sentence response narrating this calculation to the engineering manager, ensuring you mention your conversion to Tbps (Terabits per second).

**Your Response:**
______________________________________________________________________

---

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

### Senior Technical Lead (C1)
"Let's walk through the capacity estimations. Assuming we have 1 million concurrent viewers, and each stream requires 5 megabits per second, we multiply those out. One million times 5 Mbps yields a baseline of 5 million Mbps. To put that in standard terms, we can divide by a million to get 5 terabits per second. So, we'll need to provision network links capable of handling roughly 5 Tbps of sustained outbound traffic."

### Principal Architect (C2)
"To size the egress bandwidth appropriately, let's run a quick back-of-the-envelope calculation. With a steady state of 1 million concurrent viewers pulling a 5 Mbps stream, the aggregate outbound throughput sits at 5 million megabits per second. Normalizing that to higher-order units, it translates directly to 5 terabits per second. Factoring in a 20% safety margin for sudden traffic bursts, we should architect the edge network to support roughly 6 Tbps of egress capacity."

---

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric

| Criteria | B2 (Intermediate) | C1 (Advanced) | C2 (Mastery) |
| :--- | :--- | :--- | :--- |
| **Vocabulary** | Uses basic words ("times", "divided by", "answer is"). | Uses professional terms ("yields", "extrapolates", "baseline"). | Flawlessly integrates executive terms ("aggregate throughput", "normalize", "back-of-the-envelope"). |
| **Fluency & Pacing** | Pauses often to do math silently. Stumbles on units. | Narrates math aloud smoothly. Explains approximations clearly. | Math narration is seamless, confident, and seamlessly woven into architectural justification. |
| **Approximations** | Struggles with exact numbers, apologizes for rounding. | Confidently rounds numbers (e.g., $10^5$ seconds) to demonstrate practical estimation skills. | Sets baseline and explicitly defines safety margins or peak-to-average ratios dynamically. |
