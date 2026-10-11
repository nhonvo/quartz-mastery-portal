---
title: "20. Commands and Imperative Mode (El Imperativo)"
category: "01_Technical_Grammar"
tags: ["espanol","spanish-communication","dele-b2-c1","languages","learning-note"]
language: "espanol"
type: "resource-lesson"
---

# 20. Commands and Imperative Mode (El Imperativo)

## Part 1: Resource Lesson (Deep Dive Theory)

### 🎯 Executive Summary & Objectives
**Goal**: Master the Imperative mode to give direct instructions in README files, CLI outputs, and urgent incident responses without sounding rude or grammatically incorrect.
**Engineering Impact**: Documentation (READMEs, API docs, CLI tools) heavily relies on imperative commands (e.g., "Run this", "Install that"). Using the wrong form can make your open-source docs sound unprofessional or confusing to native Spanish speakers.

### ⚙️ Contrastive Analysis & Theory
The Imperative is used to give commands, instructions, or advice. In Spanish, it changes depending on formality (Tú vs. Usted) and whether the command is affirmative or negative.

1. **Affirmative Commands**:
   - **Tú (Informal - Peers)**: Same as 3rd person present. (e.g., *Habla*, *Corre*, *Imprime*). Irregulars: *Haz* (hacer), *Pon* (poner), *Ve* (ir/ver), *Di* (decir).
   - **Usted (Formal/Docs)**: Same as Subjunctive. (e.g., *Hable*, *Corra*, *Imprima*). Used in technical manuals and UI.
   - **Nosotros ("Let's")**: Subjunctive. (e.g., *Despleguemos*, *Hagamos*).

2. **Negative Commands**:
   - **Always use the Subjunctive** for both Tú and Usted.
   - *No corras* (Tú), *No corra* (Usted).
   - *No borres la base de datos.* (Don't delete the DB).

3. **Infinitive as Command**: In technical writing (manuals, signs), the infinitive is often used instead of the imperative for general instructions.
   - *Hacer clic aquí.* (Click here). *No apagar.* (Do not turn off).

### 🛠️ Real-World Engineering Context Comparison
| Scenario | Junior / Non-Native (Syntax errors) | Senior (B1/B2) (Correct Imperative) | Tech Lead (C1/C2) (Nuanced / Blameless) | LATAM vs Spain Lexical Callouts |
| :--- | :--- | :--- | :--- | :--- |
| **README Instructions** | Tú instalas las dependencias. (Indicative) / *Bạn cài các dependency.* | Instale las dependencias con npm. (Usted form) / *Hãy cài các dependency bằng npm.* | Ejecute el siguiente comando para aprovisionar la infraestructura. / *Hãy chạy lệnh sau để cấp phát hạ tầng.* | Spain: *ficheros*. LATAM: *archivos*. |
| **Urgent Incident** | No haces eso! (Indicative) / *Đừng làm thế!* | ¡No hagas eso! (Negative Tú) / *Đừng làm thế!* | Abstente de ejecutar scripts en producción sin previa autorización. / *Hãy hạn chế chạy script trên production mà chưa có ủy quyền.* | Spain/LATAM: *Abstente* (Refrain). |
| **Team Collaboration** | Nosotros hacemos un rollback. (Present) / *Chúng ta rollback thôi.* | Hagamos un rollback. (Nosotros Command) / *Hãy rollback đi.* | Procedamos con la reversión de la versión (rollback) inmediatamente. / *Hãy tiến hành revert phiên bản (rollback) ngay lập tức.* | Spain: *reversión*. LATAM: *rollback*. |

### 🎭 Role-Play Dialogue (Spain Tech Workplace)
**Context**: A severe production incident requiring immediate action over Slack.

**Lucía (DevOps)**: ¡El servidor está cayendo! Javier, **haz** (Informal Aff.) un volcado de memoria (memory dump) y **reinicia** (Informal Aff.) el contenedor.
*(The server is crashing! Javier, do a memory dump and restart the container.)*
*(Server đang sập! Javier, tạo memory dump và khởi động lại container đi.)*

**Javier (Backend)**: Voy. ¡Pero **no toques** (Informal Neg.) el balanceador de carga todavía! **Esperemos** (Nosotros) a tener los logs completos.
*(I'm on it. But don't touch the load balancer yet! Let's wait to have the full logs.)*
*(Đang làm đây. Nhưng đừng đụng vào load balancer vội! Hãy đợi có đầy đủ log đã.)*

**Lucía**: De acuerdo. **Descarga** (Informal Aff.) los logs y **pásamelos** (Aff. + Pronouns).
*(Agreed. Download the logs and pass them to me.)*
*(Đồng ý. Tải log xuống và gửi cho tôi.)*

### 📚 Bilingual Technical Vocabulary
| Español (ES) | English (EN) | Tiếng Việt (VN) |
| :--- | :--- | :--- |
| Ejecute (Usted) / Ejecuta (Tú) | Run / Execute | Chạy / Thực thi |
| No borres (Tú) | Do not delete | Đừng xóa |
| Abstenerse de | To refrain from | Hạn chế / Tránh |
| Volcado de memoria | Memory dump | Bản ghi bộ nhớ (Memory dump) |
| Hacer clic / Pulse | Click / Press | Nhấp / Nhấn |

### 🚫 Common Anti-Patterns
- **Mistake**: *No tocas el código de producción.* (Using present indicative for a negative command).
- **Correction**: *No **toques** el código de producción.*
- **Why**: Negative commands ALWAYS require the subjunctive mood.

---

## Part 2: Practice Workspace

### Scenario & Context
You are writing a section of a `README.md` file for an open-source tool. You need to write formal (Usted) instructions:
1. Clone the repository.
2. Do not modify the config file directly.
3. Run the setup script.

### User Practice Area
*(Write your responses in Spanish here...)*

### Progressive Socratic Hints
1. **Hint 1**: "Clone" -> *Clonar* (Usted imperative: *Clone*).
2. **Hint 2**: "Do not modify" -> *Modificar* (Usted negative imperative / subjunctive: *No modifique*).
3. **Hint 3**: "Run" -> *Ejecutar* (Usted imperative: *Ejecute*).

---

## Part 4: Assessment Exam

### ❓ MCQs
1. Which is the correct INFORMAL (Tú) affirmative command for "Hacer" (to do)?
   - [ ] A. Haces
   - [ ] B. Haga
   - [ ] C. Haz
2. Which is the correct FORMAL (Usted) negative command for "Borrar" (to delete)?
   - [ ] A. No borra
   - [ ] B. No borre
   - [ ] C. No borras
3. In technical manuals, which form is frequently used instead of conjugated imperatives?
   - [ ] A. Preterite (Borraba)
   - [ ] B. Infinitive (Borrar)
   - [ ] C. Future (Borrará)
4. Translate "Let's deploy":
   - [ ] A. Desplegamos
   - [ ] B. Despleguemos
   - [ ] C. Desplegar
5. Where do pronouns go in AFFIRMATIVE commands? (e.g., "Send it to me").
   - [ ] A. Attached to the end (Envíamelo).
   - [ ] B. Before the verb (Me lo envía).
   - [ ] C. They are omitted entirely.

### 🧪 Fill-in-the-Blanks
1. (Tú - Aff) ________ (guardar) los cambios antes de salir.
2. (Tú - Neg) ¡No ________ (hacer) un `git push -f` en la rama principal!
3. (Usted - Aff - README) ________ (instalar) las dependencias usando `pip install`.
4. (Nosotros - Aff) ________ (revisar) este PR juntos.
5. (Usted - Neg - Manual) No ________ (apagar) el equipo durante la actualización.

### 🔍 Error Refactoring
Rewrite these incorrect commands into proper formal (Usted) technical manual instructions:
1. *Tú descargas el archivo ZIP.* -> 
2. *No cambias el puerto por defecto.* -> 
3. *Tú tienes que correr el script de migración.* -> 
4. *No haces commit de tus contraseñas.* -> 
5. *Yo quiero que tú abras una terminal.* -> 

### 🗣️ Roleplay Short Answer
An intern is about to run a massive DELETE query without a WHERE clause on production. Give a short, urgent, informal (Tú) negative command to stop them, and an affirmative command to run a SELECT first.

### 🏆 Model DELE C1/C2 Benchmarks
- *¡Detente! No ejecutes esa consulta bajo ninguna circunstancia. Haz un `SELECT` previo para validar el alcance de la operación antes de proceder.*
*(Stop! Do not execute that query under any circumstances. Do a previous `SELECT` to validate the scope of the operation before proceeding.)*
*(Dừng lại! Tuyệt đối không được chạy query đó trong bất kỳ hoàn cảnh nào. Hãy chạy `SELECT` trước để xác thực phạm vi của thao tác trước khi tiến hành.)*

### 📊 Self-Assessment Rubric
- [ ] Distinguished between Tú and Usted formality contexts.
- [ ] Mastered the rule: Negative commands ALWAYS use Subjunctive.
- [ ] Correctly formulated "Nosotros" (Let's) commands.
- [ ] Produced professional, clear technical documentation instructions.
