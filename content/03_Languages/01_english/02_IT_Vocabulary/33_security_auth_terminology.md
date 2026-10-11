---
title: Module 33 Resource Lesson - Security & Auth Terminology
category: 02_IT_Vocabulary
tags: ["english", "technical-communication", "cefr-c1", "languages", "learning-note"]
---

# 🚀 33. Security & Authentication Terminology

# Part 1: Resource Lesson (Deep Dive Theory)

## 1. 🎯 Executive Summary & Objectives
**Goal**: Master the exact vocabulary and phrasing required to discuss, design, and defend security and authentication systems at a senior/staff engineering level.
**Engineering Impact**: Clear communication regarding security prevents critical vulnerabilities. Misusing terms like "authorization" instead of "authentication", or vaguely describing "token issues", leads to architecture flaws, compliance violations, and confusing technical specs.

## 2. 🧊 Warming Up
**Q1: How do you explain the difference between Authentication (AuthN) and Authorization (AuthZ) to a non-technical stakeholder?**
*Sample Answer*: "Authentication is verifying *who* you are—like checking your passport at the border. Authorization is verifying *what* you're allowed to do—like checking if your passport allows you to work or just visit as a tourist."

**Q2: What is the primary risk of storing raw JWTs (JSON Web Tokens) in local storage?**
*Sample Answer*: "Storing JWTs in `localStorage` exposes them to Cross-Site Scripting (XSS) attacks. A safer approach is using HTTP-only, secure cookies to prevent JavaScript from accessing the token."

## 3. ⚙️ Terminology Breakdown & Theory
In modern system design, security terminology must be precise.

*   **OAuth 2.0 & OIDC**: OAuth 2.0 is an *authorization* framework (delegated access). OpenID Connect (OIDC) sits on top of OAuth 2.0 to provide *authentication* (identity layer).
*   **JWT (JSON Web Token)**: A stateless token containing claims (data). It is *signed*, not encrypted (by default). Anyone can read the payload, but only the server can verify its integrity.
*   **RBAC vs. ABAC**: 
    *   **RBAC (Role-Based Access Control)**: Access based on user roles (e.g., `admin`, `editor`).
    *   **ABAC (Attribute-Based Access Control)**: Granular access based on attributes (e.g., `document.owner == user.id AND time < 5pm`).
*   **MFA vs. 2FA**: 2FA (Two-Factor) uses exactly two factors. MFA (Multi-Factor) uses two *or more* factors (Knowledge, Possession, Inherence).

## 4. 🛠️ Real-World Engineering Context Comparison

| Context / Scenario | Junior / Mid-Level (B1/B2) | Senior / Staff Engineer (C1/C2) |
| :--- | :--- | :--- |
| **Describing Login Flow** | "The user logs in, we give them a token, and they use it for APIs." | "The client exchanges credentials for an access token via the OIDC authorization code flow, which is then used as a bearer token for subsequent API invocations." |
| **Discussing Token Expiry** | "Tokens expire after an hour so hackers can't use them forever." | "We enforce a short-lived access token strategy coupled with a refresh token rotation mechanism to minimize the attack surface of token exfiltration." |
| **Explaining Roles** | "We have an admin role and a user role to stop users from deleting stuff." | "We implement strict Role-Based Access Control (RBAC) at the API gateway layer to ensure the principle of least privilege is maintained across all endpoints." |
| **Addressing Vulnerabilities** | "We need to fix the code so people can't inject bad SQL." | "We must sanitize and parameterize all downstream inputs to mitigate potential SQL injection vectors, ensuring robust data plane isolation." |

## 5. 🎭 Role-Play Dialogue
**Scenario**: A Staff Engineer (Sarah) is discussing a proposed microservices security model with the Product Manager (David).

**David (PM)**: "Sarah, for the new B2B portal, can we just use a single API key for each tenant? It seems much faster to build."
**Sarah (Staff Eng)**: "I strongly advise against a static API key approach for this tier of clients. It violates the principle of least privilege and lacks granular auditability. If a key is compromised, the entire tenant is exposed."
**David (PM)**: "What's the alternative that doesn't push our timeline back by weeks?"
**Sarah (Staff Eng)**: "We should federate identity using OAuth 2.0 with their existing Identity Providers (IdPs). We can issue short-lived, scoped JWTs. It decouples authentication from our core services and shifts the credential management liability back to the tenant. We just validate the signature and claims."
**David (PM)**: "Ah, so we don't store their passwords at all. I like the sound of shifting the liability."
**Sarah (Staff Eng)**: "Exactly. It's a zero-trust architecture approach that scales much better as we onboard larger enterprise clients."

## 6. 💬 Let's talk about the role play
1.  Why does Sarah argue against using static API keys for the B2B portal?
2.  What specific architectural pattern does Sarah propose, and what are its main security benefits?
3.  How does Sarah persuade the PM to accept her technical proposal without getting bogged down in implementation details?

## 7. 📚 Bilingual Technical Vocabulary

| English Word | English Definition | Vietnamese Translation |
| :--- | :--- | :--- |
| **Authentication (AuthN)** | The process of verifying the identity of a user or system. | Xác thực (danh tính) |
| **Authorization (AuthZ)** | The process of verifying what an authenticated user is permitted to do. | Phân quyền (cấp phép) |
| **Federated Identity** | Linking a user's identity across multiple separate identity management systems. | Danh tính liên kết |
| **Principle of Least Privilege** | Giving a user/process only those privileges which are essential to perform its intended function. | Nguyên tắc đặc quyền tối thiểu |
| **Zero-Trust Architecture** | A security model requiring strict identity verification for every person and device trying to access resources, regardless of network location. | Kiến trúc Zero-Trust (Không tin cậy) |
| **Exfiltration** | The unauthorized transfer of data from a computer or network. | Đánh cắp/Tuồn dữ liệu ra ngoài |
| **Mitigate** | To make something less severe, harmful, or painful (often referring to risks or attacks). | Giảm nhẹ, giảm thiểu (rủi ro) |

## 8. 🚫 Common Anti-Patterns & Pitfalls
*   **Confusing AuthN and AuthZ**: Saying "The user failed authentication" when they actually got a `403 Forbidden` (which is an Authorization failure). Authentication failure is `401 Unauthorized`.
*   **Using "Encrypted" when you mean "Encoded" or "Hashed"**: Passwords should be *hashed* (one-way), not encrypted (two-way). JWTs are base64 *encoded* and cryptographically *signed*, they are rarely encrypted (JWE).
*   **Vague language**: Using phrases like "make it secure" instead of actionable, precise terms like "implement rate-limiting," "enforce TLS 1.3," or "sanitize inputs."

---

# 💻 Practice Workspace: Security & Authentication

# Part 2: Practice Workspace (Active Execution)

## 1. 🏢 Scenario & Engineering Context
**Context**: You are a Tech Lead undergoing an architectural review for a new highly-sensitive microservice that handles user payment data. The security auditor questions your decision to use standard JWTs with a 24-hour expiration time passed via URL query parameters.

**Your Task**: Formulate a professional, technical response acknowledging the auditor's concerns, explaining why the current implementation is flawed, and outlining your immediate refactoring plan to secure the system using industry best practices.

## 2. 📝 User Practice Workspace

> [!NOTE]
> Write your response below as if you are replying directly to the security auditor in a formal architecture review meeting.

**(Write your answer here...)**

---

## 3. 💡 Progressive Socratic Hints

<details>
<summary><b>Hint 1: Lexical Focus (Terminology)</b></summary>
Make sure to correctly distinguish between terms like *exfiltration*, *authorization code flow*, *bearer token*, and *encryption vs. encoding*. Instead of saying "hackers can steal the token," use terms like "token exfiltration" or "man-in-the-middle (MitM) attacks."
</details>

<details>
<summary><b>Hint 2: Grammar & Structure (C1/C2 Tone)</b></summary>
Use the passive voice or formal structures to acknowledge the flaw without being overly defensive.
*Example*: "I acknowledge the vulnerability regarding the token TTL..." instead of "Yeah, that was a bad idea."
Use strong conditional or declarative statements for the remediation plan.
*Example*: "By implementing a refresh token rotation, we will mitigate..."
</details>

<details>
<summary><b>Hint 3: Technical Precision (The "Why")</b></summary>
Explain *why* passing tokens in URL query parameters is bad (they are logged in server logs, browser history, proxy logs). Explain *why* a 24-hour TTL is too long (increases the attack window if compromised). Suggest moving the token to the `Authorization: Bearer` header and reducing the TTL to 15 minutes, paired with a refresh token.
</details>

---

# 📝 Assessment Exam: Security & Authentication Terminology

# Part 3: Assessment Exam (C1/C2 Benchmarks)

## ❓ Section 1: Multiple-Choice Questions (MCQs)

**1. Which term specifically refers to verifying what an entity is allowed to do after their identity is established?**
- [ ] A. Authentication
- [ ] B. Exfiltration
- [ ] C. Authorization
- [ ] D. Federation

<details>
<summary><b>Answer & Explanation</b></summary>
**Correct Answer: C) Authorization**
*Explanation*: Authentication (AuthN) proves *who* you are. Authorization (AuthZ) dictates *what* you can do.
</details>

**2. What is the most accurate way to describe how a standard JWT protects its payload data from being altered?**
- [ ] A. It is encrypted using AES-256.
- [ ] B. It is signed using a cryptographic algorithm like HS256 or RS256.
- [ ] C. It is hashed using bcrypt.
- [ ] D. It is masked using base64 encoding.

<details>
<summary><b>Answer & Explanation</b></summary>
**Correct Answer: B) It is signed using a cryptographic algorithm like HS256 or RS256.**
*Explanation*: Standard JWTs are base64 encoded (not encrypted), meaning anyone can read the payload. The security comes from the *signature*, which prevents tampering.
</details>

**3. In a senior engineering context, which phrase best replaces: "We only give users the permissions they absolutely need"?**
- [ ] A. We enforce the Principle of Least Privilege.
- [ ] B. We maximize the Zero-Trust threshold.
- [ ] C. We mitigate the RBAC framework.
- [ ] D. We authorize minimal data layers.

<details>
<summary><b>Answer & Explanation</b></summary>
**Correct Answer: A) We enforce the Principle of Least Privilege.**
*Explanation*: The Principle of Least Privilege (PoLP) is the exact industry-standard term for this concept.
</details>

**4. When discussing the danger of data being stolen and moved outside your network, the correct term is:**
- [ ] A. Infiltration
- [ ] B. Exfiltration
- [ ] C. Federation
- [ ] D. Injection

<details>
<summary><b>Answer & Explanation</b></summary>
**Correct Answer: B) Exfiltration**
*Explanation*: Exfiltration refers to the unauthorized transfer of data *out* of a system.
</details>

**5. Which protocol is strictly designed as an *authorization* framework, rather than an authentication protocol?**
- [ ] A. OpenID Connect (OIDC)
- [ ] B. SAML
- [ ] C. OAuth 2.0
- [ ] D. LDAP

<details>
<summary><b>Answer & Explanation</b></summary>
**Correct Answer: C) OAuth 2.0**
*Explanation*: OAuth 2.0 provides delegated authorization. OIDC is the identity/authentication layer built on top of it.
</details>

---

## 🧪 Section 2: Fill-in-the-Blank Technical Drills

1. To reduce the risk of a compromised access token being used indefinitely, we must implement a short token TTL and a ________ token rotation mechanism.
2. In a ________ Architecture, we do not inherently trust internal network traffic; every request must be authenticated and authorized.
3. Instead of storing credentials directly, we use ________ Identity to rely on external IdPs like Google or Okta.
4. The system returned a 403 Forbidden error, which indicates an ________ failure, not an authentication failure.
5. We must ________ all user inputs at the API gateway layer to prevent SQL injection attacks.

<details>
<summary><b>Answer Key</b></summary>
1. refresh
2. Zero-Trust
3. Federated
4. authorization
5. sanitize (or validate)
</details>

---

## 🔍 Section 3: Error Identification & Sentence Refactoring

*Refactor the following Junior (B1/B2) sentences into Senior (C1/C2) level engineering statements.*

**1. Junior:** "The JWT is encrypted so the user can't change the data inside it."
**Refactored:** ______________________________________________________________

**2. Junior:** "We got hacked because someone put bad code in the login box."
**Refactored:** ______________________________________________________________

**3. Junior:** "Give the new microservice admin rights so it doesn't crash when talking to the database."
**Refactored:** ______________________________________________________________

**4. Junior:** "OAuth is used to log the user in to our app."
**Refactored:** ______________________________________________________________

**5. Junior:** "We need to fix the app so people can't steal our user data."
**Refactored:** ______________________________________________________________

<details>
<summary><b>Suggested C1/C2 Refactoring</b></summary>
1. "The JWT payload is base64 encoded and cryptographically signed to ensure data integrity and prevent tampering."
2. "We experienced a breach due to an unmitigated Cross-Site Scripting (XSS) or Injection vulnerability on the authentication endpoint."
3. "We must configure granular Role-Based Access Control (RBAC) for the microservice, strictly adhering to the principle of least privilege."
4. "We utilize OpenID Connect (OIDC) on top of the OAuth 2.0 framework to handle user identity federation and authentication."
5. "We need to fortify the application's security posture to mitigate the risk of data exfiltration."
</details>

---

## 🗣️ Section 4: Real-World Scenario & Short Answer Roleplay

**Scenario**: You are presenting a post-mortem to the VP of Engineering after a minor security incident where an expired API key was still being accepted by a legacy service.

**Prompt**: Write a concise, 3-sentence explanation of what went wrong and how you will prevent it, using precise terminology (e.g., *authorization*, *deprecation*, *rotation*, *mitigate*).

---

## 🏆 Section 5: Model C1 & C2 Executive Script Benchmarks

### Scenario: Proposing a shift from Basic Auth to OAuth 2.0 / JWT for a public API.

**C1 (Senior Technical Lead):**
"Currently, our reliance on Basic Authentication exposes us to unnecessary risk, as clients are transmitting credentials with every request. I propose we migrate to an OAuth 2.0 authorization framework with JWT-based access tokens. This will decouple our identity management, allow us to enforce granular scopes, and significantly reduce the attack surface by avoiding persistent credential transmission."

**C2 (Principal Architect):**
"To elevate our platform's security posture and support scalable federated integrations, we must deprecate the legacy Basic Auth model. By implementing an OAuth 2.0 and OIDC-driven architecture utilizing short-lived, cryptographically signed JWTs and robust refresh token rotation, we will inherently enforce a zero-trust model. This strategic shift not only mitigates credential exfiltration vectors but also standardizes our authorization plane for future enterprise tenant onboarding."

---

## 📊 Section 6: CEFR C1/C2 Self-Assessment Evaluation Rubric

Check your responses against this rubric to gauge your fluency level:

| Criteria | B1/B2 (Intermediate) | C1/C2 (Advanced/Mastery) | Self-Check |
| :--- | :--- | :--- | :---: |
| **Lexical Precision** | Uses general terms (hack, secure, bad data) | Uses exact industry terms (exfiltration, zero-trust, sanitize) | [ ] |
| **AuthN vs AuthZ** | Confuses or conflates authentication and authorization | Distinctly separates identity (AuthN) from permissions (AuthZ) | [ ] |
| **Architectural Tone** | Focuses only on the "how" (code level) | Focuses on systemic impact, trade-offs, and "why" (posture) | [ ] |
| **Clarity & Conciseness**| Rambling explanations | High information density, concise, authoritative tone | [ ] |
