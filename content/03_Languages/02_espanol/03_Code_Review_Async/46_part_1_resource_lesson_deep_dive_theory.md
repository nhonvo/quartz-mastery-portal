---
title: "\ude80 Part 1: Resource Lesson (Deep Dive Theory)"
category: "03_Code_Review_Async"
tags: ["espanol","spanish-communication","dele-b2-c1","languages","learning-note"]
language: "espanol"
type: "resource-lesson"
---

# 🚀 Part 1: Resource Lesson (Deep Dive Theory)

## 🎯 Executive Summary & Objectives
**Goal:** Learn how to tactfully block a Pull Request (Request Changes) in Spanish, clearly communicating that the code is not ready to merge without causing offense.
**Engineering Impact:** Maintains project standards and prevents buggy code from reaching production, while preserving psychological safety in the team.

## ⚙️ Contrastive Analysis & Theory
"Requesting Changes" is the most sensitive action in a PR. You must be firm but polite. Use the **impersonal passive** (se necesita) or **first-person plural** (necesitamos / debemos) to frame the required changes as a team standard rather than a personal failure. At a C1/C2 executive level, you are protecting the system's resilience and enforcing SLAs, not just critiquing syntax. Always frame blockers around *business requirements* or *architectural constraints*.

**LATAM vs Spain Lexical Callouts:**
- **Bug/Issue:** In LATAM, devs often use anglicisms like "un issue" or "una falla". In Spain, it is strictly **"una incidencia"**.
- **To review:** LATAM uses "revisar" or "chequear". Spain uses "revisar" or "echar un vistazo".

**Contrastive Examples:**
- *Too direct (Anti-pattern):* Tu PR está mal. Haz los cambios solicitados. (Your PR is bad. Do the requested changes. / *PR của bạn kém. Hãy sửa như yêu cầu.*)
- *Professional & Firm (LATAM):* **Hay un par de cosas que debemos ajustar** antes de aprobar este PR por un tema de rendimiento. (**There are a couple of things we must adjust** before approving this PR due to a performance issue. / *Có một vài điểm chúng ta cần điều chỉnh trước khi duyệt PR này vì vấn đề hiệu năng.*)
- *Professional C1/C2 (Spain):* **Hay un par de incidencias que debemos solventar** antes de dar el visto bueno, para asegurar la escalabilidad. (**There are a couple of incidents we must resolve** before giving the green light, to ensure scalability. / *Có một vài sự cố chúng ta cần giải quyết trước khi đồng ý, để đảm bảo khả năng mở rộng.*)

## 🛠️ Real-World Engineering Context Comparison
| Level | Feedback Style | Spanish Phrasing (ES) | English (EN) | Vietnamese (VN) |
|---|---|---|---|---|
| **Junior (B1)** | Apologetic | Lo siento, no puedo aprobar esto. | Sorry, I can't approve this. | Xin lỗi, tôi không thể duyệt cái này. |
| **Mid (B2)** | Procedural | He solicitado cambios. Por favor revisa mis comentarios. | I have requested changes. Please review my comments. | Tôi đã yêu cầu chỉnh sửa. Vui lòng xem nhận xét của tôi. |
| **Senior (C1/C2)** | Constructive | Buen avance inicial. Sin embargo, para cumplir con los criterios de aceptación, requerimos solventar un par de bloqueos de rendimiento. He dejado el detalle en línea. | Good initial progress. However, to meet the acceptance criteria, we need to resolve a couple of performance blockers. I've left details inline. | Tiến độ ban đầu tốt. Tuy nhiên, để đáp ứng tiêu chí chấp nhận, chúng ta cần giải quyết một vài lỗi hiệu suất chặn lại. Tôi đã ghi chi tiết bên trong. |

## 🎭 Role-Play Dialogue (LATAM/Spain Context)
**Dev A (Author):** Quedo a la espera de sus aprobaciones. 
*(EN: Looking forward to your approvals. / VN: Tôi rất mong nhận được sự phê duyệt từ các bạn.)*

**Dev B (Reviewer):** Hola. **He revisado el código a fondo**. Hay buenas ideas, pero **he marcado "Request Changes" porque** el manejo de excepciones está tragándose los errores en silencio (swallowing errors silently). **Necesitamos que** los errores críticos se registren adecuadamente para poder trazar fallos [ES: incidencias] en producción. 
*(EN: Hi. I've reviewed the code thoroughly. There are good ideas, but I've marked "Request Changes" because the exception handling is swallowing errors silently. We need critical errors to be logged properly to trace failures/incidents in production. / VN: Chào bạn. Tôi đã xem xét mã nguồn kỹ lưỡng. Có những ý tưởng hay, nhưng tôi đã chọn "Request Changes" vì việc xử lý ngoại lệ đang âm thầm nuốt lỗi. Chúng ta cần ghi log các lỗi nghiêm trọng đúng cách để có thể truy vết các sự cố trên production.)*

**Dev A:** Entendido. Tienes razón, eso podría ser un problema grave. Hago las correcciones y te aviso. 
*(EN: Understood. You're right, that could be a serious problem. I'll make the corrections and let you know. / VN: Đã hiểu. Bạn nói đúng, đó có thể là một vấn đề nghiêm trọng. Tôi sẽ sửa đổi và báo lại cho bạn.)*

## 📚 Bilingual Technical Vocabulary
| Español (ES) | English (EN) | Tiếng Việt (VN) |
|---|---|---|
| Solicitar cambios | Request changes | Yêu cầu thay đổi |
| Criterios de aceptación | Acceptance criteria | Tiêu chí chấp nhận |
| Bloqueo / Problema bloqueante | Blocker / Blocking issue | Lỗi chặn (Blocker) |
| Solventar / Resolver | To resolve / fix | Giải quyết |
| Hacer merge / Fusionar | To merge | Hợp nhất (Merge) |

## 🚫 Common Anti-Patterns
- **Native Speaker Mistake:** Being passive-aggressive ("Si lo mandas a producción así, se va a caer todo").
- **Non-Native Mistake:** Using the verb "Rechazar" (To reject). Do not say "Rechazo tu PR". Say "Solicito cambios" (I request changes).

---

# 💻 Part 2: Practice Workspace

## Scenario & Context
You must block a PR because it breaks a core business logic rule (calculating discounts). Write the summary comment explaining that while the code is well-written, it doesn't meet the business requirements and needs a revision.

## User Practice Area
> [!NOTE] Write your PR comment in Spanish here:
```markdown
// Your Spanish PR comment goes here...
```

## Progressive Socratic Hints
- *Hint 1:* Start positively: "Gracias por el esfuerzo en este PR..."
- *Hint 2:* State the blocker firmly but professionally: "...sin embargo, he notado que el cálculo de descuentos no cumple con la regla de negocio requerida."
- *Hint 3:* Set the next steps: "He solicitado cambios para que podamos corregir este punto crítico antes de proceder con el merge."

---

# 📝 Part 3: Assessment Exam

## ❓ MCQs
1. How do you officially say "Request Changes" in the context of GitHub/GitLab in Spanish?
   - [ ] A. Rechazar código
   - [ ] B. **Solicitar cambios**
   - [ ] C. Pedir modificaciones

2. Which phrasing is best when leaving a blocking review?
   - [ ] A. Tu PR está bloqueado por mí.
   - [ ] B. **Hay algunos puntos críticos que debemos solventar antes de aprobar.**
   - [ ] C. No puedo aceptar esto nunca.

3. At a C1/C2 level, how do you reframe a "bad PR" into a constructive blockage?
   - [ ] A. "Este PR es un desastre en términos de arquitectura."
   - [ ] B. **"Para cumplir con los criterios de aceptación y los SLAs de rendimiento, requerimos solventar estos bloqueos."**
   - [ ] C. "No cumple mis expectativas personales de código limpio."

4. What is a common difference between LATAM and Spain when referring to a "bug" or production "issue"?
   - [ ] A. LATAM: Bicho / Spain: Insecto
   - [ ] B. **LATAM: Falla o issue / Spain: Incidencia**
   - [ ] C. LATAM: Error / Spain: Equivocación

5. How do you express "swallowing errors silently" in Spanish?
   - [ ] A. Comiendo errores sin ruido
   - [ ] B. **Tragándose los errores en silencio**
   - [ ] C. Ocultando fallos intencionalmente

## 🧪 Fill-in-the-Blanks
1. Para cumplir con los criterios de ________ (acceptance), debemos mejorar esto.
   *(Answer: aceptación)*
2. Dejo el PR en estado de "Cambios ________ (Requested)" hasta que resolvamos este problema bloqueante.
   *(Answer: solicitados)*
3. En lugar de decir "rechazo tu PR", decimos "he marcado solicitar ________ (changes)".
   *(Answer: cambios)*
4. Para asegurar la alta disponibilidad, no podemos permitir que el código se esté ________ (swallowing) los errores.
   *(Answer: tragando)*
5. Hay un par de ________ (issues - Spain) que debemos solventar antes de subir a producción.
   *(Answer: incidencias)*

## 🔍 Error Refactoring
*Refactor these comments from blunt/incorrect to C1/C2 Professional:*
1. "Rechazo tu PR. Vuelve a hacerlo."
   -> *Suggested:* "He marcado 'Solicitar cambios' en el PR. Hay varios detalles estructurales que necesitamos corregir antes de que esté listo para el merge. Revisa mis comentarios en línea, por favor."
2. "Tu código está mal y romperá la producción."
   -> *Suggested:* "He notado un par de problemas de rendimiento que podrían impactar producción; he dejado notas para solventarlos antes de aprobar."
3. "No me gusta cómo manejas los errores."
   -> *Suggested:* "Para cumplir con el estándar del equipo, necesitamos que los errores críticos se registren adecuadamente en lugar de tragarlos en silencio."
4. "Esto es un bug grande." (Spain context)
   -> *Suggested:* "He detectado una incidencia bloqueante en este flujo de negocio que debemos mitigar."
5. "Haz los cambios ahora."
   -> *Suggested:* "Quedo a la espera de estas modificaciones para proceder con mi aprobación final."

## 🗣️ Roleplay Short Answer
Explain that you cannot approve the PR because the tests are failing on the CI/CD pipeline.
*Your Answer (Spanish):* ___________________

## 🏆 Model DELE C1/C2 Benchmarks
**Senior Technical Lead Model:**
"Gracias por el envío. La arquitectura general se ve sólida, pero he solicitado cambios porque los flujos alternativos no están siendo manejados y rompen los tests de integración en el pipeline. Una vez solventemos estos bloqueos, estaré encantado de darle otra revisión y aprobar."

## 📊 Self-Assessment Rubric
- [ ] Did I avoid using "rechazar" (reject)?
- [ ] Is the tone collaborative yet firm on standards?
- [ ] Did I clearly define the blockers preventing approval?
