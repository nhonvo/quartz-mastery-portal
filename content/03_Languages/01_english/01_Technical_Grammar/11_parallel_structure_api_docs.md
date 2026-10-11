---
title: Module 11 Resource Lesson - Parallel Structure in API Documentation
category: 01_Technical_Grammar
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# Resource Lesson: Parallel Structure in API Documentation

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
**Goal:** Master the use of parallel structure (parallelism) when writing API documentation, pull request descriptions, and system design specifications.
**Engineering Impact:** Consistent parallel structure improves readability, reduces cognitive load for other engineers consuming your APIs, and projects a senior, detail-oriented professional image. It ensures lists, endpoints, and bullet points follow a uniform grammatical pattern.

## 2. 🧊 Warming Up
**Question 1:** Why is it frustrating to read documentation where bullet points mix verbs, nouns, and gerunds?
*Sample Answer:* It breaks the reader's mental rhythm. When scanning an API spec, developers want predictable patterns (e.g., all endpoints start with a base verb like "Fetch", "Update", "Delete") so they can quickly extract information.
**Question 2:** Have you ever rewritten someone else's PR description because it felt "clunky"? What did you fix?
*Sample Answer:* I often fix lists where one item is a full sentence and another is a fragment. Aligning them makes the PR look polished and professional.

## 3. ⚙️ Contrastive Analysis & Theory
**What is Parallel Structure?**
Parallelism means using the same pattern of words to show that two or more ideas have the same level of importance. This can happen at the word, phrase, or clause level.

**Formula for API Bullet Points / Endpoint Descriptions:**
* **Base Verbs (Imperative):** `[Verb] + [Object] + [Condition]`
  * *Correct:* Authenticate the user, validate the token, and return the payload.
  * *Incorrect:* Authenticates the user, token validation, and returning the payload.
* **Gerunds (-ing):** `[Gerund] + [Object]`
  * *Correct:* Authenticating the user, validating the token, and returning the payload.
* **Nouns:**
  * *Correct:* User authentication, token validation, and payload delivery.

**Rule of Thumb for Technical Writing:** Stick to the **Imperative Mood** (base verb) for API actions (e.g., *Get, Create, Update, Delete*).

## 4. 🛠️ Real-World Engineering Context Comparison

| Context | Junior (B1/B2) - Lacking Parallelism | Senior (C1/C2) - Parallel Structure Applied |
| :--- | :--- | :--- |
| **API Endpoint List** | The API allows you to create users, deleting profiles, and password resets. | The API allows you to **create** users, **delete** profiles, and **reset** passwords. |
| **Error Handling Steps** | If an error occurs: logging the error, retry the request, and you should notify the user. | If an error occurs: **log** the error, **retry** the request, and **notify** the user. |
| **PR Description** | This PR fixes the memory leak, refactored the auth module, and adding test cases. | This PR **fixes** the memory leak, **refactors** the auth module, and **adds** test cases. |
| **System Design Spec** | The load balancer is responsible for distributing traffic, health checks on nodes, and it manages SSL termination. | The load balancer is responsible for **distributing** traffic, **performing** health checks, and **managing** SSL termination. |

## 5. 🎭 Role-Play Dialogue
**Context:** A Principal Engineer (Sarah) is reviewing an API specification drafted by a Mid-level Engineer (Tom).

**Sarah:** Hey Tom, I reviewed the v2 API spec. The functionality looks solid, but the endpoint descriptions are a bit disjointed.
**Tom:** Oh, really? Which part?
**Sarah:** Take a look at the `/users` endpoints. You have "Gets the user profile," then "Update user details," and finally "For deleting a user." We need to enforce a parallel structure.
**Tom:** Ah, I see. I mixed up the verb forms. Should I use the imperative mood across the board?
**Sarah:** Exactly. Let's standardize on base verbs. So it should be "Retrieve user profile," "Update user details," and "Delete user." It reduces cognitive load for the API consumers.
**Tom:** Makes sense. I'll refactor the document and ensure all bulleted lists follow that pattern as well.
**Sarah:** Perfect. Consistency is key when we publish public-facing docs.

## 6. 💬 Let's talk about the role play
1. **Why did Sarah flag the API spec?** She noticed that the endpoint descriptions lacked grammatical consistency (mixing third-person verbs, base verbs, and prepositional phrases).
2. **What specific grammatical fix did they agree upon?** Standardizing on the imperative mood (base verbs) for all endpoint descriptions.
3. **What is the engineering benefit mentioned?** It reduces cognitive load for the API consumers and provides a consistent, professional developer experience.

## 7. 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| **Parallelism** | The use of successive verbal constructions that correspond in grammatical structure. | Cấu trúc song song |
| **Imperative mood** | A verb form used to state a command or request (e.g., "Get", "Create"). | Thể mệnh lệnh |
| **Cognitive load** | The total amount of mental effort being used in the working memory. | Tải lượng nhận thức / Áp lực tư duy |
| **Disjointed** | Lacking a coherent sequence or connection. | Rời rạc, thiếu liên kết |
| **Standardize** | Cause to conform to a standard. | Chuẩn hóa |
| **Refactor** | Restructure existing code or text without changing its external behavior. | Tái cấu trúc |

## 8. 🚫 Common Anti-Patterns & Pitfalls
* **The "Accidental Gerund" Swap:** Starting a list with base verbs and randomly throwing in an `-ing` verb. 
  * *Anti-pattern:* `Validate input`, `Sanitize strings`, `Saving to database`.
* **The Noun/Verb Mixup:** Mixing actions (verbs) with objects/states (nouns) in a list of steps.
  * *Anti-pattern:* 1. Initialize the cluster. 2. Configuration of nodes. 3. Deploy the pods.
* **Inconsistent PR Subject Lines:** Mixing past and present tense in commit histories or PR titles.
  * *Anti-pattern:* Added login button, Fix crash on startup, Updating dependencies.
  * *Pro-tip:* Always use the imperative for commits (e.g., Add login button, Fix crash, Update dependencies).

---

# Practice Workspace: Parallel Structure in API Documentation

# Part 2: Practice Workspace (Active Execution)

## 1. 🏢 Scenario & Engineering Context
You are a Senior Backend Engineer writing a pull request description and updating the README for a new microservice that handles user authentication. The current draft was quickly jotted down by a junior team member and it completely lacks parallel structure. 

**Current Draft (To Refactor):**
> *This PR is for implementing the auth service. It will:*
> *- Authenticates the user via OAuth2.*
> *- Token validation and returning a 401 if invalid.*
> *- Generating JWTs.*
> *- Logs all failed attempts to Datadog.*
> *- Cache the session data.*

Your task is to rewrite the bulleted list using strict parallel structure, standardizing on the **imperative mood** (base verbs).

## 2. 📝 User Practice Workspace

> **[Your Refactored Text Goes Here]**
> - ...
> - ...
> - ...
> - ...
> - ...


---

## 3. 💡 Progressive Socratic Hints

<details>
<summary><b>Hint 1: Grammatical Alignment (Imperative Mood)</b></summary>
The imperative mood uses the base form of the verb like a command. E.g., "Authenticate," "Validate," "Generate." Make sure every bullet point starts with this exact verb form.
</details>

<details>
<summary><b>Hint 2: Lexical Consistency</b></summary>
Look at "Token validation and returning a 401 if invalid". Break this down. What is the action? "Validate the token" or "Return a 401". Adjust the phrasing so it matches the pattern `[Verb] + [Object]`.
</details>

<details>
<summary><b>Hint 3: Tone & Structure Check</b></summary>
Ensure consistency down to the punctuation. If you use a period at the end of the first bullet point, use it for all of them. Here is a starter:
- Authenticate the user via OAuth2.
- Validate the token and return a 401 if invalid.
- ... (finish the rest!)
</details>

---

# Assessment Exam: Parallel Structure in API Documentation

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)

**1. Which of the following API endpoints uses correct parallel structure in the imperative mood?**
- [ ] A. Fetching the user data, validate the payload, and return 200.
- [ ] B. Fetch the user data, validate the payload, and return 200.
- [ ] C. Fetch the user data, payload validation, and returning 200.
- [ ] D. Fetches the user data, validates the payload, and returns 200.
<details>
<summary><b>Answer & Explanation</b></summary>
**Correct Answer: B**
*Explanation:* Option B uses the imperative mood consistently (Fetch, validate, return). A mixes gerund and base verbs. C mixes base verb, noun phrase, and gerund. D uses third-person singular, which is less ideal for instructions/commands, though consistent, B is the standard for API docs.
</details>

**2. Why is parallel structure critical in technical documentation?**
- [ ] A. It makes the text look longer.
- [ ] B. It allows the writer to show off a large vocabulary.
- [ ] C. It reduces cognitive load and allows for quick scanning by developers.
- [ ] D. It prevents the compiler from throwing errors.
<details>
<summary><b>Answer & Explanation</b></summary>
**Correct Answer: C**
*Explanation:* Predictable grammatical patterns help readers process information faster without stumbling over disjointed phrasing.
</details>

**3. Identify the sentence that LACKS parallel structure:**
- [ ] A. The script automates backups, sanitizes databases, and notifies the team.
- [ ] B. The CI/CD pipeline is designed for speed, reliability, and to be scalable.
- [ ] C. We need to refactor the code, update the dependencies, and write new tests.
- [ ] D. The system supports streaming data, caching responses, and balancing loads.
<details>
<summary><b>Answer & Explanation</b></summary>
**Correct Answer: B**
*Explanation:* "speed" (noun), "reliability" (noun), and "to be scalable" (infinitive phrase). It should be "speed, reliability, and scalability."
</details>

**4. What is the most standard verb form for Git commit messages and API endpoint descriptions?**
- [ ] A. Past continuous
- [ ] B. Present perfect
- [ ] C. Imperative mood
- [ ] D. Gerunds
<details>
<summary><b>Answer & Explanation</b></summary>
**Correct Answer: C**
*Explanation:* The imperative mood (e.g., "Add feature," "Fix bug") is the industry standard for commits and APIs.
</details>

**5. How should you correct this bulleted list? "- Migrating the database, - Update the schema, - Restart server."**
- [ ] A. - Migrate the database, - Updating the schema, - Restarting server.
- [ ] B. - Migrate the database, - Update the schema, - Restart the server.
- [ ] C. - Migrates the database, - Updates the schema, - Restarts the server.
- [ ] D. - Database migration, - Update the schema, - Restart server.
<details>
<summary><b>Answer & Explanation</b></summary>
**Correct Answer: B**
*Explanation:* B aligns all points using the imperative base verb (Migrate, Update, Restart).
</details>

---

## 🧪 Section 2: Fill-in-the-Blank Technical Drills

1. To improve performance, we need to ________ the images, cache the assets, and minify the CSS. (compress)
2. The new service is responsible for handling requests, ________ queries, and returning JSON. (process)
3. Ensure the pull request description includes the steps to reproduce the bug, verify the fix, and ________ the changes to production. (deploy)
4. The system architecture guarantees high availability, fault tolerance, and ________. (scalable -> noun form)
5. Please update the README to instruct users to ________ the repo, install dependencies, and start the local server. (clone)

---

## 🔍 Section 3: Error Identification & Sentence Refactoring

**Rewrite the following sentences/lists to ensure strict parallel structure.**

1. *Original:* The background job will be purging old logs, index the new records, and to update the cache.
   *Refactored:* ______________________________________________________________

2. *Original:* This module's responsibilities include user authentication, validating the input, and database connections.
   *Refactored:* ______________________________________________________________

3. *Original:* To deploy, you must build the image, pushing it to the registry, and then you restart the pods.
   *Refactored:* ______________________________________________________________

4. *Original:* The API allows clients to retrieve orders, cancelling an order, and order status updates.
   *Refactored:* ______________________________________________________________

5. *Original:* In this PR, I fixed the null pointer exception, updating the README, and added unit tests.
   *Refactored:* ______________________________________________________________

---

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay

**Scenario:**
You are reviewing a System Design specification written by a peer. Their section on "Data Flow" reads:
* "1. Client sending request to Load Balancer."
* "2. The Load Balancer routes traffic to the API Gateway."
* "3. Authentication of token."
* "4. Fetch data from DB and returning the response."

**Task:**
Leave a polite, professional, and clear comment on their document suggesting they use parallel structure. Refactor the 4 steps for them to show an example of what you mean.

**Your Response:**
> _________________________________________________________________
> _________________________________________________________________

---

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

**Scenario:** Explaining a documentation refactor in a sprint planning meeting.

**Senior Technical Lead (C1):**
> *"I spent some time reviewing the v2 API documentation, and I noticed the endpoint descriptions were a bit inconsistent grammatically. I’m going to open a PR to standardize them using a parallel structure—specifically sticking to the imperative mood. This will make the docs much easier to scan and reduce cognitive load for external developers integrating with our system."*

**Principal Architect (C2):**
> *"During my audit of the API specifications, I identified a lack of structural parallelism across the endpoint definitions. I'll be submitting a revision that standardizes the nomenclature and syntactic structure to the imperative mood. Enforcing this grammatical consistency mitigates cognitive friction for our integrators and elevates the overall professional quality of our developer-facing collateral."*

---

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric

Evaluate your refactored sentences and roleplay responses against this rubric:

* [ ] **Grammatical Precision:** Did I use the exact same grammatical form (e.g., all base verbs, all gerunds, or all nouns) for items in a list or sequence?
* [ ] **Imperative Mastery:** Did I successfully default to the imperative mood for API actions and instructions?
* [ ] **Technical Vocabulary:** Did I use precise terms like "cognitive load," "refactor," and "standardize"?
* [ ] **Executive Tone:** Was my feedback in the roleplay constructive, objective, and focused on the outcome (developer experience) rather than pointing out a "mistake"?
