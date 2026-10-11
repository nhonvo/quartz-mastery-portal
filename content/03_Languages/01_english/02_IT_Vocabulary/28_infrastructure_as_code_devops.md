---
title: Module 28 Resource Lesson - Infrastructure as Code & DevOps Terminology
category: 02_IT_Vocabulary
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# Infrastructure-As-Code & DevOps

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
This lesson focuses on the high-level lexicon and precise C1/C2 English terminology required for Infrastructure-as-Code (IaC) and DevOps engineering. You will learn how to articulate cloud provisioning, state management, continuous integration and delivery (CI/CD) pipelines, and deployment strategies (like Blue/Green and Canary) with executive-level clarity. The objective is to communicate complex infrastructure changes reliably and transparently to cross-functional stakeholders.

## 2. 🧊 Warming Up
**Question 1:** How do you explain the benefit of immutable infrastructure to a product manager?
*Sample Answer:* "Immutable infrastructure ensures that once a server is deployed, it is never modified in place. If an update is needed, we tear it down and replace it with a fresh instance, which eliminates configuration drift and guarantees that our environments are completely reproducible."

**Question 2:** Why is state management critical in tools like Terraform?
*Sample Answer:* "State files act as the source of truth for our infrastructure. Proper state management, such as remote locking and versioning, prevents race conditions when multiple engineers are applying changes simultaneously."

## 3. ⚙️ Contrastive Analysis & Theory
In DevOps communication, precision is non-negotiable. 
- **Provisioning vs. Configuration Management:** Use "provisioning" when creating infrastructure (e.g., Terraform, CloudFormation). Use "configuration management" when setting up the OS and software on existing instances (e.g., Ansible, Chef).
- **Idempotency:** A critical concept. An operation is idempotent if executing it multiple times produces the same result as executing it once. "Our Ansible playbooks are completely idempotent."
- **Configuration Drift:** The phenomenon where servers in an infrastructure become more and more different from one another over time.

## 4. 🛠️ Real-World Engineering Context Comparison

| Concept | B1/B2 (Junior/Mid) Phrasing | C1/C2 (Senior/Staff) Phrasing |
| :--- | :--- | :--- |
| **Deploying Code** | "We will put the new code on the server using the pipeline." | "We will orchestrate a zero-downtime deployment via the CI/CD pipeline." |
| **Fixing State** | "The Terraform state is wrong because someone changed the AWS console manually." | "We're experiencing configuration drift due to out-of-band manual interventions." |
| **Rolling Back** | "If it breaks, we will just go back to the old version." | "In the event of a regression, we will initiate an automated rollback strategy to restore the previous stable baseline." |
| **Scaling** | "We need more servers when there is high traffic." | "We must configure dynamic auto-scaling policies to gracefully accommodate traffic spikes." |

## 5. 🎭 Role-Play Dialogue
**Context:** A post-incident review regarding a failed deployment.
**Alice (Principal Cloud Architect):** "Bob, looking at the post-mortem, it appears the production outage was triggered by configuration drift on the legacy database cluster."
**Bob (DevOps Engineer):** "That's correct. A manual hotfix was applied last month directly in the AWS console, bypassing our Terraform modules. When the pipeline executed yesterday, the state file was out of sync."
**Alice:** "Going forward, we need to strictly enforce immutable infrastructure. Can you ensure we implement state locking and integrate a drift detection workflow into our nightly CI pipeline?"
**Bob:** "Absolutely. I'll configure remote backend state locking via DynamoDB and set up an automated drift reconciliation report by end of day."

## 6. 💬 Let's talk about the role play
1. Why does Alice use the phrase "configuration drift" instead of "servers were different"?
2. What is the impact of Bob acknowledging that the hotfix was "bypassing our Terraform modules"?
3. How does the term "immutable infrastructure" propose a solution to their problem?

## 7. 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| Provisioning | The process of setting up IT infrastructure. | Cấp phát / Thiết lập hạ tầng |
| Idempotent | Operations that yield the same result no matter how many times they run. | Tính lũy đẳng |
| Configuration Drift | When environment configurations diverge from their expected state over time. | Sự sai lệch cấu hình |
| Immutable | Unable to be changed after it is created. | Bất biến / Không thể thay đổi |
| Orchestration | Automated configuration, coordination, and management of systems. | Điều phối tự động hóa |
| Canary Deployment | Rolling out updates to a small subset of users before full deployment. | Triển khai Canary (Thử nghiệm diện hẹp) |

## 8. 🚫 Common Anti-Patterns & Pitfalls
- **Using "Install" instead of "Provision":** We *install* software, but we *provision* infrastructure.
- **Saying "Continuous Deployment" when meaning "Continuous Delivery":** Continuous Delivery means changes are ready to deploy manually; Continuous Deployment means changes go to production automatically without human intervention.
- **Overusing "Script":** Instead of saying "I wrote a script to do it," C2 professionals say "I automated the workflow," or "I authored an Ansible playbook to orchestrate the configuration."

---

# Practice Workspace: Infrastructure-As-Code & DevOps

# Part 2: Practice Workspace (Active Execution)

## 1. Scenario & Engineering Context
**Context:** You are a Senior DevOps Engineer. During a major product launch, the traffic unexpectedly spiked 300%. The system stayed up, but manual changes were made directly to the AWS EC2 instances by another team to keep them alive, causing massive **configuration drift**. You now need to write an update in the engineering Slack channel to explain what happened, the risks of those manual changes, and how you will restore the infrastructure using your Terraform state files without causing downtime.

## 2. User Practice Workspace

> [!NOTE]
> *Draft your Slack message here. Focus on using C1/C2 DevOps vocabulary (e.g., configuration drift, immutable infrastructure, idempotent, orchestrate).*

```markdown
<!-- WRITE YOUR DRAFT HERE -->



```

## 3. Progressive Socratic Hints

<details>
<summary><b>Hint 1: Lexical Hint (Vocabulary)</b></summary>

Instead of saying "the servers are different now," use **"configuration drift"**. Instead of saying "we need to build new servers that don't change," mention **"immutable infrastructure."**
</details>

<details>
<summary><b>Hint 2: Grammar Hint (Passive vs. Active in Incident Blame)</b></summary>

To avoid pointing fingers directly at the other team, use the passive voice for the problem: *"Manual modifications were introduced out-of-band..."* Then use active voice for your solution: *"Our team will orchestrate a zero-downtime redeployment..."*
</details>

<details>
<summary><b>Hint 3: Tone & Structure Hint (Executive Summary)</b></summary>

Start with a reassuring opening. Acknowledge the survival of the system. Then clearly state the technical debt accrued (drift). Finally, present the concrete, automated remediation plan.
</details>

---

# Assessment Exam: Infrastructure-As-Code & DevOps

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)

**1. Which term best describes a system where server instances are never modified after being deployed, but instead are replaced completely with new instances?**
- [ ] A. Idempotent architecture
- [ ] B. Immutable infrastructure
- [ ] C. Configuration management
- [ ] D. Dynamic auto-scaling

<details>
<summary><b>Answer Key</b></summary>
<b>B) Immutable infrastructure</b>
<i>Explanation:</i> Immutable means unable to be changed. If a change is needed, the old instance is destroyed and a new one is provisioned.
</details>

**2. In DevOps, what does it mean if an operation is "idempotent"?**
- [ ] A. It runs automatically on a schedule.
- [ ] B. It can be executed multiple times without changing the result beyond the initial application.
- [ ] C. It prevents manual changes in the cloud console.
- [ ] D. It scales up servers based on CPU load.

<details>
<summary><b>Answer Key</b></summary>
<b>B) It can be executed multiple times without changing the result beyond the initial application.</b>
<i>Explanation:</i> Idempotency guarantees that running a configuration script repeatedly will yield the same final state.
</details>

**3. Choose the most C1/C2 professional phrasing for "We will set up the new servers."**
- [ ] A. We will install the new servers.
- [ ] B. We will make the new servers ready.
- [ ] C. We will provision the new infrastructure.
- [ ] D. We will put the new servers on the cloud.

<details>
<summary><b>Answer Key</b></summary>
<b>C) We will provision the new infrastructure.</b>
<i>Explanation:</i> "Provision" is the standard industry term for allocating and setting up IT infrastructure.
</details>

**4. What is "Configuration Drift"?**
- [ ] A. Moving servers from one cloud provider to another.
- [ ] B. The gradual divergence of an environment's configuration from its documented, desired state.
- [ ] C. The process of load balancing traffic across multiple instances.
- [ ] D. A strategy for zero-downtime deployments.

<details>
<summary><b>Answer Key</b></summary>
<b>B) The gradual divergence of an environment's configuration from its documented, desired state.</b>
</details>

**5. Which deployment strategy involves rolling out an update to a small subset of users before deploying it to the entire infrastructure?**
- [ ] A. Blue/Green Deployment
- [ ] B. Red/Black Deployment
- [ ] C. Canary Deployment
- [ ] D. Immutable Deployment

<details>
<summary><b>Answer Key</b></summary>
<b>C) Canary Deployment</b>
<i>Explanation:</i> Like a canary in a coal mine, this strategy tests the waters with a small user base to detect issues early.
</details>

## 🧪 Section 2: Fill-in-the-Blank Technical Drills

1. To avoid race conditions in our Terraform pipeline, we need to ensure that remote state ________ is enabled in DynamoDB.
2. The manual hotfixes applied during the outage have caused severe configuration ________ across the cluster.
3. Our Ansible playbooks are designed to be ________, meaning we can run them safely every hour without breaking anything.
4. We are moving away from mutating existing servers; our new mandate is to strictly enforce ________ infrastructure.
5. We plan to ________ a zero-downtime deployment by spinning up the green environment before terminating the blue one.

*(Answers: 1. locking, 2. drift, 3. idempotent, 4. immutable, 5. orchestrate)*

## 🔍 Section 3: Error Identification & Sentence Refactoring

**Refactor the following junior-level sentences into C1/C2 professional English:**

1. *Original:* "I wrote a script to install all the AWS servers we need."
   *Refactored:* __________________________________________________________________

2. *Original:* "The servers are different now because John changed things by hand in the UI."
   *Refactored:* __________________________________________________________________

3. *Original:* "When it breaks, we will just go back to the old code."
   *Refactored:* __________________________________________________________________

4. *Original:* "We do continuous deployment, so we click a button to send code to production."
   *Refactored:* __________________________________________________________________

5. *Original:* "Our Terraform files are broken because two people ran them at the same time."
   *Refactored:* __________________________________________________________________

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay

**Scenario:** You are a Lead DevOps Engineer speaking to the VP of Engineering. The VP is frustrated that deployments take so long and asks, "Why can't we just SSH into the servers and update the app directly?" 

**Task:** Write a short, professional response (3-4 sentences) explaining the risks of manual intervention and the benefits of IaC and immutable infrastructure.

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

*For the scenario in Section 4:*

**Senior Technical Lead (C1):** 
"While SSHing into servers is faster in the short term, it introduces severe configuration drift over time. By using Infrastructure-as-Code, we maintain a single source of truth, ensuring that every deployment is reproducible and auditable. This protects us from snowflake servers and makes rollbacks significantly safer."

**Principal Architect (C2):** 
"Direct manual interventions compromise our deployment idempotency and inevitably lead to critical configuration drift. Enforcing an immutable infrastructure paradigm via our CI/CD pipelines guarantees deterministic deployments, comprehensive auditability, and immediate automated rollback capabilities in the event of a regression."

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric

| Criteria | B2 (Upper Intermediate) | C1 (Advanced Engineer) | C2 (Principal/Executive) |
| :--- | :--- | :--- | :--- |
| **Vocabulary Precision** | Uses basic tech words (setup, fix, old version) | Uses industry standards (provision, rollback, drift) | Employs nuanced concepts (idempotency, immutable, orchestrate) |
| **Tone & Objectivity** | Blames individuals ("John changed it") | Focuses on process ("Manual changes occurred") | Focuses on systemic paradigms ("Out-of-band interventions") |
| **Grammar & Flow** | Simple structures, occasionally disjointed | Smooth transitions, uses passive voice appropriately | Complex clause structures, highly persuasive and authoritative |
