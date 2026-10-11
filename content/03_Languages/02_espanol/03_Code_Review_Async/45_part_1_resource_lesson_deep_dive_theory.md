---
title: "\ude80 Part 1: Resource Lesson (Deep Dive Theory)"
category: "03_Code_Review_Async"
tags: ["espanol","spanish-communication","dele-b2-c1","languages","learning-note"]
language: "espanol"
type: "resource-lesson"
---

# 🚀 Part 1: Resource Lesson (Deep Dive Theory)

## 🎯 Executive Summary & Objectives
**Goal:** Confidently identify, explain, and request fixes for security vulnerabilities (e.g., SQL injection, XSS) in Spanish without sounding accusatory.
**Engineering Impact:** Prevents security breaches while maintaining a blameless culture during code reviews.

## ⚙️ Contrastive Analysis & Theory
When dealing with security, the feedback must be direct but depersonalized. We focus on the *code* and the *vulnerability*, not the *developer*. Use terms like "exponer", "vulnerabilidad", and "sanitizar".
- *Accusatory:* Tú introdujiste un fallo de seguridad grave. (You introduced a serious security flaw.)
- *Depersonalized:* **Esta línea expone** la aplicación a una inyección SQL. (**This line exposes** the application to SQL injection.) / **Existe un riesgo** de seguridad aquí. (**There is a security risk** here.)

## 🛠️ Real-World Engineering Context Comparison
| Level | Feedback Style | Spanish Phrasing (ES) | English (EN) | Vietnamese (VN) |
|---|---|---|---|---|
| **Junior (B1)** | Basic | Hay un problema de seguridad. | There is a security problem. | Có một vấn đề bảo mật. |
| **Mid (B2)** | Specific | Esto parece ser vulnerable a inyección SQL. Debes usar consultas parametrizadas. | This seems vulnerable to SQL injection. You must use parameterized queries. | Có vẻ dễ bị SQL injection. Bạn phải dùng truy vấn tham số. |
| **Senior (C1/C2)** | Risk & Mitigation | Concatenar strings en la consulta nos expone a SQL Injection. Para mitigar este riesgo, deberíamos refactorizar usando consultas preparadas (Prepared Statements). | Concatenating strings in the query exposes us to SQL Injection. To mitigate this risk, we should refactor using Prepared Statements. | Nối chuỗi trong câu truy vấn khiến chúng ta dễ bị SQL Injection. Để giảm thiểu rủi ro, nên refactor dùng Prepared Statements. |

## 🎭 Role-Play Dialogue (LATAM/Spain Context)
**Dev A (Author):** Ya está listo el filtro de búsqueda dinámica por nombre de usuario. *(The dynamic search filter by username is ready. / Bộ lọc tìm kiếm động theo tên người dùng đã sẵn sàng.)*
**Dev B (Reviewer):** Revisando la consulta a la base de datos, noto que los parámetros de entrada se están concatenando directamente. **Esto nos hace susceptibles a** ataques de Inyección SQL. **Es imperativo que** saniticemos los datos (sanitize the data). *(Reviewing the DB query, I note the input parameters are being concatenated directly. This makes us susceptible to SQL Injection attacks. It is imperative that we sanitize the data. / Khi xem xét truy vấn DB, tôi nhận thấy các tham số đầu vào đang được nối chuỗi trực tiếp. Điều này khiến chúng ta dễ bị tấn công SQL Injection. Việc làm sạch dữ liệu là bắt buộc.)*
**Dev A:** ¡Uf, tienes toda la razón! Peligro inminente. Lo cambiaré inmediatamente para usar consultas parametrizadas (parameterized queries). *(Oof, you are totally right! Imminent danger. I will change it immediately to use parameterized queries. / Ôi, bạn hoàn toàn đúng! Nguy hiểm cận kề. Tôi sẽ đổi sang dùng truy vấn tham số ngay lập tức.)*

## 📚 Bilingual Technical Vocabulary
| Español (ES) | English (EN) | Tiếng Việt (VN) |
|---|---|---|
| Inyección SQL | SQL Injection | SQL Injection |
| Vulnerabilidad / Brecha | Vulnerability / Breach | Lỗ hổng bảo mật |
| Sanitizar (datos) | To sanitize | Làm sạch dữ liệu (Sanitize) |
| Consultas parametrizadas | Parameterized queries | Truy vấn tham số |
| Exponer | To expose | Phơi bày / Gây rủi ro |

## 🚫 Common Anti-Patterns
- **Native Speaker Mistake:** Overreacting or using alarmist language ("¡Esto es un desastre de seguridad!") which causes panic rather than action.
- **Non-Native Mistake:** Failing to use the correct terminology (e.g. saying "limpiar los datos" instead of the technical term "sanitizar los datos").

---

# 💻 Part 2: Practice Workspace

## Scenario & Context
You notice the developer is rendering raw HTML from user input on the frontend, exposing the app to Cross-Site Scripting (XSS). Explain the risk and suggest sanitizing the input.

## User Practice Area
> [!NOTE] Write your PR comment in Spanish here:
```markdown
// Your Spanish PR comment goes here...
```

## Progressive Socratic Hints
- *Hint 1:* Identify the risk: "Renderizar HTML crudo directamente desde la entrada del usuario..."
- *Hint 2:* Name the vulnerability: "...nos expone a vulnerabilidades de tipo XSS (Cross-Site Scripting)."
- *Hint 3:* Provide the solution: "Para evitar esto, necesitamos asegurar que sanitizamos la entrada antes de mostrarla."

---

# 📝 Part 3: Assessment Exam

## ❓ MCQs
1. How do you say "To sanitize data" in professional Spanish?
   - [ ] A. Limpiar los datos
   - [ ] B. **Sanitizar los datos**
   - [ ] C. Lavar la data

2. What is the best translation for "This exposes the system to...":
   - [ ] A. **Esto expone el sistema a...**
   - [ ] B. Esto pone el sistema en...
   - [ ] C. Esto muestra el sistema a...

3. What is the C1/C2 term for "to mitigate the risk"?
   - [ ] A. **mitigar el riesgo**
   - [ ] B. bajar el riesgo
   - [ ] C. cortar el peligro

4. How do you depersonalize a security warning?
   - [ ] A. Has creado un riesgo de seguridad aquí.
   - [ ] B. **Existe un riesgo de seguridad aquí.**
   - [ ] C. Tu código es inseguro.

5. Which term is universally accepted in both LATAM and Spain for a security breach?
   - [ ] A. **brecha de seguridad**
   - [ ] B. hueco de seguridad
   - [ ] C. rotura de sistema

## 🧪 Fill-in-the-Blanks
1. Concatenar queries nos hace vulnerables a una ________ (Injection) SQL.
   *(Answer: inyección)*
2. Es crítico mitigar esta ________ (vulnerability) antes del despliegue.
   *(Answer: vulnerabilidad)*
3. Para proteger los datos de los usuarios, debemos usar consultas ________ (parameterized).
   *(Answer: parametrizadas)*
4. Esto nos hace ________ (susceptible) a ataques maliciosos.
   *(Answer: susceptibles)*
5. Es ________ (imperative) que validemos todos los inputs en el backend.
   *(Answer: imperativo)*

## 🔍 Error Refactoring
1. *Refactor this comment to be professional and depersonalized:*
"Tu código tiene un fallo gigante, nos van a hackear por XSS."
-> *Suggested:* "Hay un riesgo potencial de seguridad aquí. Al no sanitizar este input, el sistema queda expuesto a ataques XSS. Por favor, aseguremos el parseo correcto."

2. *Refactor:* "Has expuesto las contraseñas."
-> *Suggested:* "Existe una brecha de seguridad grave aquí, ya que las contraseñas están siendo expuestas en texto plano (plain text). Sería prudente encriptarlas."

3. *Refactor:* "El input no está limpio y habrá inyección SQL."
-> *Suggested:* "Para prevenir posibles inyecciones SQL, es imperativo sanitizar los inputs utilizando parámetros vinculados (bound parameters)."

4. *Refactor:* "Cuidado, nos van a hacer XSS con esto."
-> *Suggested:* "Esta implementación nos expone a vulnerabilidades de tipo XSS. Por favor, asegurémonos de escapar correctamente la salida HTML."

5. *Refactor:* "Borra esto porque es un riesgo de seguridad."
-> *Suggested:* "Sería recomendable mitigar este riesgo de seguridad refactorizando la lógica para utilizar bibliotecas criptográficas estándar del framework."

## 🗣️ Roleplay Short Answer
Tell the developer to use a standard cryptographic library instead of writing their own hashing function.
*Your Answer (Spanish):* ___________________

## 🏆 Model DELE C1/C2 Benchmarks
**Senior Technical Lead Model:**
"Me preocupa la seguridad en esta línea. Al pasar variables no sanitizadas directamente al DOM, introducimos una vulnerabilidad crítica de XSS. Sugiero encarecidamente utilizar las funciones de sanitización integradas en el framework o una librería especializada antes de proceder."

## 📊 Self-Assessment Rubric
- [ ] Is the feedback depersonalized (focusing on the code/risk, not the author)?
- [ ] Did I use standard infosec vocabulary (vulnerabilidad, sanitizar, inyección)?
- [ ] Did I clearly explain the *why* (the specific risk) alongside the fix?
