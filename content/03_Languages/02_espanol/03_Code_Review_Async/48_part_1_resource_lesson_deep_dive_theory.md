---
title: "\ude80 Part 1: Resource Lesson (Deep Dive Theory)"
category: "03_Code_Review_Async"
tags: ["espanol","spanish-communication","dele-b2-c1","languages","learning-note"]
language: "espanol"
type: "resource-lesson"
---

# 🚀 Part 1: Resource Lesson (Deep Dive Theory)

## 🎯 Executive Summary & Objectives
**Goal:** Guide peers on code readability and naming conventions (Clean Code) in Spanish using collaborative and descriptive language.
**Engineering Impact:** Reduces cognitive load for future maintainers and ensures adherence to the team's style guide (e.g., camelCase, PascalCase).

## ⚙️ Contrastive Analysis & Theory
Naming is highly subjective. Instead of declaring a name "wrong", express that it is "confusing" to *you* or that a more "descriptive" alternative exists. Use verbs like **"transmitir"** (convey) and **"sugerir"** (suggest). At a C1/C2 level, grounding your feedback in established **Clean Code** principles and the team's domain language (ubiquitous language) elevates the review from a personal opinion to a structural necessity.

**LATAM vs Spain Lexical Callouts:**
- **Computer/System:** When referring to systems running the code, Spain strictly uses **"el ordenador"**, while LATAM uses **"la computadora"** or **"el equipo"**.
- **Clarity/Readability:** While **"legibilidad"** is universal, in Spain you might hear "hacerlo más **diáfano**" (crystal clear) in highly formal corporate tech settings, whereas LATAM prefers "hacerlo más **claro**" or "más **limpio**".

**Contrastive Examples:**
- *Subjective/Negative (Anti-pattern):* Este nombre es muy malo, no se entiende. (This name is very bad, it is not understood. / *Tên này quá tệ, không hiểu được.*)
- *Objective/Collaborative (LATAM):* Creo que este nombre no **transmite** claramente su propósito. ¿Qué tal si usamos X para mayor **legibilidad**? (I think this name doesn't clearly **convey** its purpose. How about we use X for greater **readability**? / *Tôi nghĩ tên này không truyền tải rõ mục đích. Dùng X để dễ đọc hơn thì sao?*)
- *Professional C1/C2 (Spain):* Para aligerar la **carga cognitiva** y adherirnos al dominio del negocio, sugiero un nombre que sea más **diáfano** respecto a su intención. (To lighten the cognitive load and adhere to the business domain, I suggest a name that is more transparent regarding its intent. / *Để giảm tải nhận thức và tuân thủ ngôn ngữ nghiệp vụ, tôi đề xuất một cái tên rõ ràng hơn về mục đích.*)

## 🛠️ Real-World Engineering Context Comparison
| Level | Feedback Style | Spanish Phrasing (ES) | English (EN) | Vietnamese (VN) |
|---|---|---|---|---|
| **Junior (B1)** | Directive | Cambia el nombre de "x" a "usuario". | Change the name from "x" to "usuario". | Đổi tên "x" thành "usuario". |
| **Mid (B2)** | Style-focused | Por favor usa camelCase para las variables. | Please use camelCase for variables. | Vui lòng dùng camelCase cho biến. |
| **Senior (C1/C2)** | Intent-focused | Para alinearnos con las convenciones y mejorar la legibilidad, te sugiero un nombre más descriptivo que exprese la intención de la variable. | To align with conventions and improve readability, I suggest a more descriptive name that expresses the variable's intent. | Để đúng chuẩn và dễ đọc hơn, tôi đề xuất một cái tên mô tả rõ ràng mục đích của biến hơn. |

## 🎭 Role-Play Dialogue (LATAM/Spain Context)
**Dev A (Author):** He añadido la función `chkUsrSt()`. 
*(EN: I've added the `chkUsrSt()` function. / VN: Tôi vừa thêm hàm `chkUsrSt()`.)*

**Dev B (Reviewer):** Hola. Veo lo que hace la función, pero el nombre **es un poco críptico**. Para mejorar la **legibilidad** y evitar **carga cognitiva**, ¿te parece bien si lo renombramos a `checkUserStatus()`? 
*(EN: Hi. I see what the function does, but the name is a bit cryptic. To improve readability and avoid cognitive load, do you think it's okay if we rename it to `checkUserStatus()`? / VN: Chào bạn. Tôi hiểu hàm này làm gì, nhưng tên hơi khó hiểu (cryptic). Để cải thiện tính dễ đọc và tránh tải nhận thức, bạn thấy sao nếu chúng ta đổi tên thành `checkUserStatus()`?)*

**Dev A:** Totalmente. Tienes razón, las abreviaturas innecesarias hacen el código más difícil de leer. Lo actualizo. 
*(EN: Totally. You're right, unnecessary abbreviations make the code harder to read. I'll update it. / VN: Hoàn toàn đồng ý. Bạn nói đúng, viết tắt không cần thiết làm code khó đọc hơn. Tôi sẽ cập nhật nó.)*

## 📚 Bilingual Technical Vocabulary
| Español (ES) | English (EN) | Tiếng Việt (VN) |
|---|---|---|
| Legibilidad | Readability | Tính dễ đọc |
| Convenciones de nombres | Naming conventions | Quy tắc đặt tên |
| Descriptivo | Descriptive | Mang tính mô tả |
| Carga cognitiva | Cognitive load | Tải nhận thức (Độ khó hiểu) |
| Críptico / Confuso | Cryptic / Confusing | Khó hiểu / Mơ hồ |

## 🚫 Common Anti-Patterns
- **Native Speaker Mistake:** Just saying "Nombre raro" (Weird name) without suggesting an alternative.
- **Non-Native Mistake:** Translating "Readability" directly as "Leabilidad" (does not exist) instead of **Legibilidad**.

---

# 💻 Part 2: Practice Workspace

## Scenario & Context
You notice a boolean variable named `flag`. It controls whether an email should be sent. Suggest a better, more descriptive name following Clean Code practices.

## User Practice Area
> [!NOTE] Write your PR comment in Spanish here:
```markdown
// Your Spanish PR comment goes here...
```

## Progressive Socratic Hints
- *Hint 1:* Address the lack of clarity: "El nombre `flag` es un poco genérico..."
- *Hint 2:* Focus on intent: "...y no transmite claramente la intención de la variable."
- *Hint 3:* Provide a solution: "¿Qué opinas de renombrarla a `shouldSendEmail` para mejorar la legibilidad?"

---

# 📝 Part 3: Assessment Exam

## ❓ MCQs
1. How do you translate "Readability" in Spanish?
   - [ ] A. Leabilidad
   - [ ] B. **Legibilidad**
   - [ ] C. Lectura fácil

2. What is the most polite way to say a variable name is bad?
   - [ ] A. Este nombre es pésimo.
   - [ ] B. **El nombre actual es un poco críptico, sugiero uno más descriptivo.**
   - [ ] C. Tienes que cambiar esto.

3. How do you say "computer" in Spain vs LATAM?
   - [ ] A. Spain: Computadora / LATAM: Ordenador
   - [ ] B. **Spain: Ordenador / LATAM: Computadora o Equipo**
   - [ ] C. Spain: Sistema / LATAM: Máquina

4. At a C1/C2 level, what is the best reason to suggest a variable name change?
   - [ ] A. "Porque no me gusta."
   - [ ] B. **"Para reducir la carga cognitiva y adherirnos al dominio del negocio."**
   - [ ] C. "Porque mi nombre es mejor."

5. Which word is a formal C1/C2 equivalent in Spain for making something "crystal clear"?
   - [ ] A. Transparencia total
   - [ ] B. **Diáfano**
   - [ ] C. Brillante

## 🧪 Fill-in-the-Blanks
1. Debemos seguir las ________ (conventions) de nombres del equipo.
   *(Answer: convenciones)*
2. Usar un nombre completo reduce la ________ (cognitive) de los futuros mantenedores.
   *(Answer: carga cognitiva)*
3. El nombre actual de esta función es un poco ________ (cryptic).
   *(Answer: críptico)*
4. Para mayor ________ (readability), sugiero expandir esta abreviatura.
   *(Answer: legibilidad)*
5. Este método no ________ (convey) claramente su propósito real.
   *(Answer: transmite)*

## 🔍 Error Refactoring
*Refactor these blunt comments into C1/C2 constructive feedback:*
1. "Usa camelCase aquí. Está mal escrito."
   -> *Suggested:* "Para mantener la consistencia con nuestra guía de estilo, ¿podríamos actualizar esta variable para que use camelCase?"
2. "Este nombre no se entiende."
   -> *Suggested:* "Creo que este nombre no transmite claramente su propósito. ¿Qué tal si usamos X para mayor legibilidad?"
3. "No uses la letra 'i' para tu variable."
   -> *Suggested:* "Para evitar ambigüedades, sugiero usar un nombre más descriptivo como `index` o `itemIndex`."
4. "Esto es muy confuso."
   -> *Suggested:* "La lógica es un poco críptica; un nombre de variable más representativo reduciría la carga cognitiva."
5. "Haz que el código sea claro."
   -> *Suggested:* "Alinearnos con el lenguaje del dominio (Clean Code) hará que este bloque sea más diáfano y fácil de mantener."

## 🗣️ Roleplay Short Answer
Suggest renaming `calcDt()` to `calculateDate()` to avoid abbreviations.
*Your Answer (Spanish):* ___________________

## 🏆 Model DELE C1/C2 Benchmarks
**Senior Technical Lead Model:**
"Noté el uso de la variable `flag` aquí. Para reducir la carga cognitiva de futuros desarrolladores y adherirnos a los principios de Clean Code, recomendaría un nombre que exprese claramente su intención (por ejemplo, `shouldSendEmail`). ¿Qué te parece?"

## 📊 Self-Assessment Rubric
- [ ] Did I use the term "legibilidad"?
- [ ] Did I avoid calling the name "malo" or "incorrecto"?
- [ ] Did I suggest a concrete, descriptive alternative?
