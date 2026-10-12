---
title: "03. Present Subjunctive in Code Reviews"
category: "01_Technical_Grammar"
tags: ["espanol","spanish-communication","dele-b2-c1","languages","learning-note"]
language: "espanol"
type: "resource-lesson"
---

# 03. Present Subjunctive in Code Reviews

## Part 1: Resource Lesson (Deep Dive Theory)

### 🎯 Executive Summary & Objectives
**Goal**: Use the *Present Subjunctive* correctly to suggest changes, express doubts, and soften commands during async Code Reviews (PRs).

**Engineering Impact**: Prevents you from sounding too aggressive or dictatorial in PR comments. The subjunctive demonstrates high emotional intelligence and C1/C2 level diplomacy in technical communication.

### ⚙️ Contrastive Analysis & Theory
- **Indicative**: Used for declaring facts and certainties. (e.g., "El código es eficiente" - The code is efficient).
- **Subjunctive**: Triggered by verbs of suggestion, doubt, necessity, and emotion (WEIRDO). Used to soften feedback.
  - *Example*: Te sugiero que **uses** (subjunctive) un mapa aquí. (I suggest you use a map here).
  - *Trigger*: Recomiendo que..., Es mejor que..., Dudo que...

**Bilingual Context (EN/ES/VN)**: 
*EN*: "I recommend that you refactor this." 
*ES*: "Recomiendo que **refactorices** (subjunctive) esto."
*VN*: "Tôi khuyên bạn nên **refactor** (viết lại) phần này." (Vietnamese uses "nên" to soften, Spanish forces the subjunctive mood).

### 🛠️ Real-World Engineering Context Comparison
- **Junior (B1)**: Cambia este bucle. Es lento. (Direct imperative - can sound rude).
- **Senior (C1/C2)**: Es recomendable que **optimices** (subjunctive) este bucle para mejorar la complejidad temporal, quizás usando memoización.
- **LATAM vs Spain Lexical Callout**:
  - *Spain*: Os sugiero que **comprobéis** (vosotros) los logs.
  - *LATAM*: Les sugiero que **revisen** (ustedes) los logs. (Revisar is strongly preferred over comprobar).

### 🎭 Role-Play Dialogue (Async PR Review)
**Reviewer (Sofia)**: Hola equipo, dudo que esta función **maneje** (subjunctive) bien los casos extremos. (Hi team, I doubt this function handles edge cases well. / Chào nhóm, tôi nghi ngờ hàm này xử lý tốt các edge cases (trường hợp biên).)

**Author (Luis)**: Tienes razón. ¿Prefieres que **agregue** (subjunctive) más pruebas unitarias? (You're right. Do you prefer that I add more unit tests? / Bạn nói đúng. Bạn có muốn tôi thêm nhiều unit test hơn không?)

**Reviewer (Sofia)**: Sí, es crucial que el coverage **llegue** (subjunctive) al 80%. (Yes, it's crucial that the coverage reaches 80%. / Đúng vậy, điều cực kỳ quan trọng là coverage đạt đến 80%.)

### 📚 Bilingual Technical Vocabulary
| Español (ES) | English (EN) | Tiếng Việt (VN) |
| :--- | :--- | :--- |
| Sugiero que... | I suggest that... | Tôi đề nghị rằng... |
| Es importante que... | It's important that... | Quan trọng là... |
| Refactorizar | To refactor | Tái cấu trúc mã (Refactor) |
| Casos extremos | Edge cases | Các trường hợp biên / ngoại lệ |
| Pruebas unitarias | Unit tests | Kiểm thử đơn vị |

### 🚫 Common Anti-Patterns
- ❌ *Te recomiendo que usas (indicative) un array.* (Grammatically incorrect, sounds broken).
- ✅ *Te recomiendo que **uses** (subjunctive) un array.* (Correct syntax and tone).

---

## Part 2: Practice Workspace

### Scenario & Context
You are reviewing a Pull Request. A junior developer has written a nested O(n^2) loop that will cause a timeout in production. You want to suggest they use a Hash Map instead, but politely.

### User Practice Area
*(Write your PR comment in Spanish here)*
> 

### Progressive Socratic Hints
1. Start with a trigger phrase: "Te sugiero que..." (I suggest that you...).
2. Conjugate the verb *usar* (to use) in the present subjunctive for 'tú' (uses).

---

## Part 3: Assessment Exam

### ❓ MCQs
1. Which verb completes this sentence correctly? "Es vital que la API ____ segura."
   - [ ] A. es
   - [ ] B. sea
   - [ ] C. estar
   *Answer: b (sea - subjunctive of ser)*
2. "I advise that you update the dependencies." -> "Aconsejo que ____ las dependencias."
   - [ ] A. actualizas
   - [ ] B. actualices
   - [ ] C. actualizar
   *Answer: b*
3. Which of these is a subjunctive trigger?
   - [ ] A. Es obvio que...
   - [ ] B. Creo que...
   - [ ] C. Es posible que...
   *Answer: c (doubt/possibility triggers subjunctive)*
4. "Dudo que el servidor ____ aguantar la carga."
   - [ ] A. pueda
   - [ ] B. puede
   - [ ] C. poder
   *Answer: a*
5. "Prefiero que tú ____ el despliegue."
   - [ ] A. haces
   - [ ] B. hagas
   - [ ] C. hacer
   *Answer: b*

### 🧪 Fill-in-the-Blanks
1. Te recomiendo que ________ (cambiar) el nombre de esa variable.
2. Es necesario que el equipo ________ (documentar) el código.
3. Dudo que este parche ________ (resolver) el memory leak.
4. Nos piden que ________ (nosotros - implementar) un nuevo endpoint.
5. Es esencial que la base de datos ________ (estar) encriptada.
*(Answers: 1. cambies, 2. documente, 3. resuelva, 4. implementemos, 5. esté)*

### 🔍 Error Refactoring
Rewrite to C1 level PR comments using subjunctive:
1. *Junior*: Usa una interfaz aquí.
   - *Refactored*: Sería conveniente que **uses/utilices** una interfaz en esta capa.
2. *Junior*: Creo que tú debes refactorizar esto.
   - *Refactored*: Te sugiero fuertemente que **refactorices** esta lógica.
3. *Junior*: El código necesita que tú añades tests.
   - *Refactored*: Es imprescindible que **añadas/agregues** pruebas exhaustivas.
4. *Junior*: Cambia el bucle a un map.
   - *Refactored*: Recomiendo que **cambies** esta iteración por un hash map para mejorar el rendimiento.
5. *Junior*: Haz commit de tus cambios.
   - *Refactored*: Por favor, asegúrate de que **hagas** commit de todos tus cambios antes de empujar.

### 🗣️ Roleplay Short Answer
Write a polite PR comment asking a colleague to handle null exceptions in their new method.
*(Provide a 2 sentence comment using a subjunctive trigger)*

### 🏆 Model DELE C1/C2 Benchmarks
*Senior Code Review model*: "Gran trabajo en general. Sin embargo, para evitar posibles `NullPointerExceptions` en producción, **te sugiero que valides** si el payload es nulo antes de procesarlo. Además, **es recomendable que extraigas** esta lógica a un servicio independiente."

### 📊 Self-Assessment Rubric
- [ ] Subjunctive triggers used correctly.
- [ ] Verbs conjugated in present subjunctive flawlessly.
- [ ] Maintained a polite, C1-level diplomatic tone in PR reviews.
- [ ] Achieved 100% on the 5-5-5 drills.
