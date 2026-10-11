---
title: Module 42 Resource Lesson - Linguistic Softening & Psychological Safety in PRs
category: 03_Code_Review_Async
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# Resource Lesson: Linguistic Softening in PRs

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
**Goal:** Master the art of linguistic softening (using modal verbs, questions, and hedging) to provide constructive, non-confrontational feedback in Pull Requests (PRs).
**Engineering Impact:** Softening reduces defensiveness, fosters a collaborative engineering culture, and accelerates PR turnaround times by avoiding emotional friction.

## 2. 🧊 Warming Up
**Reflective Questions:**
- Have you ever received a PR comment that felt overly aggressive or dismissive? How did it affect your motivation?
- Why is it important to separate the code from the coder when giving feedback?

**Sample Answers:**
- *Yes, when a reviewer wrote "This is wrong, fix it", I felt defensive. It made me less open to collaboration.*
- *Separating code from the coder ensures the feedback is objective, reducing the ego factor and keeping the focus on improving the software.*

## 3. ⚙️ Contrastive Analysis & Theory
Linguistic softening involves transforming direct, imperative statements into suggestions, questions, or conditional phrases.
- **Direct/Harsh:** Use of "You", imperative verbs ("Do this", "Change this"), and absolute words ("never", "always").
- **Softened/Diplomatic:** Use of "We", modal verbs ("could", "might"), tentative language ("It seems", "I wonder"), and asking questions instead of giving commands.

**Softening Techniques:**
- **Questions instead of statements:** "Could we extract this?" instead of "Extract this."
- **Hedging verbs:** "appear to", "seem to", "tend to".
- **Softeners:** "just", "a little", "maybe", "perhaps".
- **Inclusive pronouns:** "We" instead of "You".

## 4. 🛠️ Real-World Engineering Context Comparison

| Junior (B1/B2) - Direct & Abrasive | Senior/Staff (C1/C2) - Softened & Diplomatic | Why it works better (C1/C2) |
| :--- | :--- | :--- |
| "You need to use a HashMap here because it is faster." | "Would a HashMap be more performant here for O(1) lookups?" | Uses a question and focuses on the technical trade-off rather than giving an order. |
| "This function is too long. Refactor it." | "It looks like this function handles multiple responsibilities. What do you think about extracting the validation logic?" | Uses hedging ("looks like") and asks for the author's opinion, fostering collaboration. |
| "You forgot to handle the null case." | "I might be missing something, but how are we handling the null case here?" | Employs the "assume misunderstanding" technique, saving face if the author did handle it elsewhere. |
| "Change this variable name to `userStatus`." | "Consider renaming this to `userStatus` for better alignment with our naming conventions." | Uses a softer suggestion ("Consider") and provides a clear rationale. |

## 5. 🎭 Role-Play Dialogue
*Context: A Senior Engineer (Alex) is discussing a PR with a Mid-level Engineer (Sam) via a synchronous chat to resolve some architectural concerns.*

**Alex:** "Hey Sam, thanks for the PR on the notification service. The overall structure looks solid. Do you have a few minutes to chat about the caching strategy?"
**Sam:** "Sure, Alex. I just used a simple in-memory cache."
**Alex:** "I noticed that. I'm a bit concerned about how it will scale across multiple instances. Have we considered using Redis here to ensure state consistency?"
**Sam:** "I didn't think it would be an issue right now, to be honest. It's just a small feature."
**Alex:** "That's a fair point, it might be overkill for V1. However, since the load is expected to spike next month, perhaps we could interface the cache layer now? That way, we can easily swap in Redis later without rewriting the core logic."
**Sam:** "Ah, that makes sense. I can abstract it behind an interface today. Good catch."
**Alex:** "Awesome, appreciate your flexibility on this!"

## 6. 💬 Let's talk about the role play
- **Why did Alex start with "The overall structure looks solid"?**
  *To establish psychological safety and validate Sam's effort before offering constructive criticism.*
- **How did Alex suggest using Redis without sounding dictatorial?**
  *By framing it as a question ("Have we considered...") and softening the concern ("I'm a bit concerned...").*
- **Why did Alex use the word "perhaps"?**
  *To present the architectural pivot as an option rather than a mandate, inviting Sam's buy-in.*

## 7. 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| **Mitigate** | To make something less severe, harmful, or painful. | Giảm nhẹ, làm dịu |
| **Nitpick (Nit)** | A minor, trivial detail or correction, often related to style rather than logic. | Soi mói, lỗi nhỏ (thường về format) |
| **Defensive** | Behaving in a way that shows you feel people are criticizing you. | Phòng thủ, tự ái |
| **Constructive** | Having or intended to have a useful or beneficial purpose. | Mang tính xây dựng |
| **Rationale** | A set of reasons or a logical basis for a course of action or belief. | Lý do cốt lõi, cơ sở lý luận |

## 8. 🚫 Common Anti-Patterns & Pitfalls
- **The "You" Attack:** Saying "Your code is failing" instead of "The test is failing." Always attack the problem, not the person.
- **The "Obviously/Just" Trap:** Using words like "obviously", "simply", or "just" (e.g., "Just change this"). It minimizes the author's effort and sounds condescending.
- **Sarcasm:** "Did you even test this?" Text lacks tone, making sarcasm incredibly dangerous and unprofessional in async text formats.
- **Unjustified Demands:** Demanding a change without providing the "Why" (the rationale).

---

# Practice Workspace: Linguistic Softening in PRs

# Part 2: Practice Workspace (Active Execution)

## 1. 🏗️ Scenario & Engineering Context
**Context:** 
You are a Senior Engineer reviewing a Pull Request from a newly hired Junior Developer. The PR implements a new API endpoint. However, you notice three issues:
1. They used a synchronous database call inside a loop, which will cause an N+1 query performance bottleneck.
2. The error handling swallows the exception without logging it.
3. They hardcoded a configuration value instead of reading it from the environment variables.

**Task:**
Write three separate PR comments to address these issues. Your goal is to be technically precise but use **linguistic softening** to ensure the feedback is constructive, non-threatening, and encourages learning.

## 2. 📝 User Practice Workspace
> *Write your softened PR comments below:*

### Comment 1: N+1 Query in the loop
(Your response here)

### Comment 2: Swallowed Exception
(Your response here)

### Comment 3: Hardcoded config value
(Your response here)

---

## 3. 💡 Progressive Socratic Hints

<details>
<summary>🔍 Hint 1: Grammar & Phrasing (Softening)</summary>
Instead of saying "You are making a database call in a loop," try using "It looks like..." or asking "What happens if we have 1000 items in this list?"
</details>

<details>
<summary>🧠 Hint 2: Lexical (Vocabulary)</summary>
Use words like `consider`, `might cause`, `potential bottleneck`, or `extract`.
</details>

<details>
<summary>🎭 Hint 3: Tone & Structure (The "Why")</summary>
Always explain the *impact*. Don't just point out the hardcoded value. Say: "If we hardcode this, we won't be able to easily change it across different environments (dev/prod). Could we move this to `.env`?"
</details>

---

# Assessment Exam: Linguistic Softening in PRs

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)
**1. Which of the following is the most diplomatically softened PR comment?**
- [ ] A. You need to extract this logic into a helper service.
- [ ] B. Extract this logic into a helper service.
- [ ] C. What do you think about extracting this logic into a helper service to improve testability?
- [ ] D. This logic is in the wrong place, move it to a helper service.
<details><summary><b>Answer Key</b></summary>C. It frames the suggestion as a collaborative question and provides the rationale ("improve testability").</details>

**2. Why should you avoid using the word "just" (e.g., "Just use a map here") in PR reviews?**
- [ ] A. It is grammatically incorrect.
- [ ] B. It can sound condescending and minimize the complexity of the problem or the author's effort.
- [ ] C. It is too formal for async communication.
- [ ] D. It takes too long to read.
<details><summary><b>Answer Key</b></summary>B. "Just" often implies the solution is trivial, which can be frustrating to a developer who spent hours on the code.</details>

**3. If you spot a minor formatting issue, how should you preface it?**
- [ ] A. MUST-FIX: 
- [ ] B. Nit: 
- [ ] C. URGENT: 
- [ ] D. FYI:
<details><summary><b>Answer Key</b></summary>B. "Nit" (short for nitpick) signals that the comment is minor and non-blocking.</details>

**4. How can you effectively separate the "code from the coder"?**
- [ ] A. Use the pronoun "You" frequently.
- [ ] B. Focus on the "system" or "the code" instead of the person (e.g., "The query is slow" vs "Your query is slow").
- [ ] C. Add smiley faces to every sentence.
- [ ] D. Avoid reviewing their PR entirely.
<details><summary><b>Answer Key</b></summary>B. Focusing on the artifact (the code) removes personal ego from the critique.</details>

**5. Which modal verb is best used to soften a strong recommendation?**
- [ ] A. Must
- [ ] B. Have to
- [ ] C. Could / Might
- [ ] D. Will
<details><summary><b>Answer Key</b></summary>C. "Could" and "Might" present options rather than rigid commands.</details>

---

## 🧪 Section 2: Fill-in-the-Blank Technical Drills
*Fill in the blanks with appropriate softening words (e.g., consider, might, seems, wonder, perhaps).*

1. It ______ like this function is handling both parsing and validation.
2. I ______ if we could leverage the existing utility class for this instead of rewriting it?
3. ______ we should add a timeout here to prevent the request from hanging indefinitely.
4. ______ extracting this into a constant so we can reuse it across the test suite.
5. This implementation ______ cause a memory leak if the stream isn't closed properly.

<details>
<summary><b>Answer Key</b></summary>
1. seems / looks
2. wonder
3. Perhaps / Maybe
4. Consider
5. might / could
</details>

---

## 🔍 Section 3: Error Identification & Sentence Refactoring
*Refactor these harsh PR comments into softened, C1/C2 level professional feedback.*

1. **Harsh:** You forgot to add unit tests for the edge cases.
   **Refactored:** ___________________________________________________
2. **Harsh:** This algorithm is O(N^2) and it's too slow. Fix it.
   **Refactored:** ___________________________________________________
3. **Harsh:** Don't hardcode the API key here!
   **Refactored:** ___________________________________________________
4. **Harsh:** Your variable names make no sense.
   **Refactored:** ___________________________________________________
5. **Harsh:** I don't understand this block of code. Add comments.
   **Refactored:** ___________________________________________________

<details>
<summary><b>Sample Refactorings</b></summary>
1. "Could we add some unit tests to cover the edge cases for this new logic?"
2. "I noticed this is an O(N^2) approach. Would an O(N) solution using a HashMap be viable here to handle larger datasets?"
3. "For security reasons, we should avoid committing raw API keys. Can we inject this via an environment variable instead?"
4. "To make this more readable for future maintainers, what do you think about renaming `x` to `retryCount`?"
5. "I'm having a little trouble following the logic in this loop. Would you mind adding a brief comment explaining the intent?"
</details>

---

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay
**Scenario:** A peer opens a PR that introduces a new external library to format dates, but your project already uses a standard library (`java.time` or equivalent) that can do the exact same thing without adding a new dependency.

**Task:** Write a PR comment challenging the introduction of the new library. Be polite, provide the rationale (minimizing bundle size/dependencies), and ask for their perspective.

---

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

### Senior Technical Lead (C1)
> "Thanks for the PR! I see you brought in `Moment.js` to handle the date formatting. Since we are trying to keep our bundle size down, I'm wondering if we could achieve this using the native `Intl.DateTimeFormat` API we already use elsewhere in the app? Let me know your thoughts!"

### Principal Architect (C2)
> "Appreciate the effort on this feature. Regarding the new dependency on line 42: our current architectural guideline leans toward minimizing third-party libraries for primitives to reduce audit surface and bundle bloat. Given that the native date API supports this specific formatting requirement, would you be open to refactoring this to use the native implementation? I'm happy to pair on this if the native API syntax is tricky."

---

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric

| Criteria | B2 (Upper Intermediate) | C1 (Advanced) | C2 (Mastery) |
| :--- | :--- | :--- | :--- |
| **Grammatical Softening** | Uses basic polite forms ("Please change this"). | Consistently uses modals, hedging, and questions ("Could we consider changing this?"). | Flawlessly shifts register; uses complex conditionals and passive voice to depersonalize feedback completely. |
| **Tone & Empathy** | Somewhat direct; might sound a bit blunt but not aggressive. | Collaborative and encouraging; actively protects the author's ego. | Highly diplomatic; builds psychological safety while upholding strict technical standards effortlessly. |
| **Technical Rationale** | States the rule ("Do this because of performance"). | Explains the 'Why' clearly and concisely tied to the suggestion. | Contextualizes the feedback within broader system architecture, team velocity, or business impact. |
