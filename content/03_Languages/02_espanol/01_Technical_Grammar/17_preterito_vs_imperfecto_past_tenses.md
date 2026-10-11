---
title: "17. Pretérito vs Imperfecto (Past Tenses in Post-Mortems)"
category: "01_Technical_Grammar"
tags: ["espanol","spanish-communication","dele-b2-c1","languages","learning-note"]
language: "espanol"
type: "resource-lesson"
---

# 17. Pretérito vs Imperfecto (Past Tenses in Post-Mortems)

## Part 1: Resource Lesson (Deep Dive Theory)

### 🎯 Executive Summary & Objectives
**Goal**: Master the distinction between the Preterite (Pretérito) and the Imperfect (Imperfecto) past tenses to accurately describe system failures, background contexts, and completed actions during incident post-mortems and daily stand-ups.
**Engineering Impact**: When diagnosing a bug, the timeline is crucial. Mixing up "the server *was crashing*" (ongoing context) and "the server *crashed*" (completed event) can mislead debugging efforts.

### ⚙️ Contrastive Analysis & Theory
Spanish has two main simple past tenses:

1. **Imperfecto (The Background / The "Was -ing")**:
   - Used for ongoing actions with no definite beginning or end, background descriptions, habitual actions in the past, time, and age.
   - *El servidor **estaba** lento.* (The server was slow - background state).
   - *Siempre **usábamos** Java.* (We always used Java - habitual).

2. **Pretérito (The Event / The "-ed")**:
   - Used for completed actions, specific events, sequences of events, and actions that interrupt an ongoing background state.
   - *El servidor **se cayó** a las 3 PM.* (The server crashed at 3 PM - specific event).
   - *Yo **desplegué** el código ayer.* (I deployed the code yesterday - completed action).

**The Interruption Pattern**: Imperfecto (ongoing) + *cuando* + Pretérito (interruption).
*Yo **escribía** código cuando la base de datos **falló**.* (I was writing code when the DB failed.)

### 🛠️ Real-World Engineering Context Comparison
| Scenario | Junior / Non-Native (Confusion) | Senior (B1/B2) (Correct usage) | Tech Lead (C1/C2) (Nuanced Phrasing) | LATAM vs Spain Lexical Callouts |
| :--- | :--- | :--- | :--- | :--- |
| **Describing a Bug** | Ayer el sistema estaba cayendo. / *Hôm qua hệ thống đang sập.* | Ayer el sistema se cayó. / *Hôm qua hệ thống đã sập.* | El clúster experimentó una interrupción crítica ayer a mediodía. / *Cluster đã gặp sự cố gián đoạn nghiêm trọng vào trưa hôm qua.* | Spain: *caída / interrupción*. LATAM: *caída / falla*. |
| **Providing Context** | Nosotros tuvimos una carga alta cuando pasó. / *Chúng ta đã có tải cao khi nó xảy ra.* | Teníamos una carga alta cuando el error ocurrió. / *Chúng ta đang có tải cao khi lỗi xảy ra.* | Los servidores operaban al 90% de su capacidad cuando se detonó la excepción de OutOfMemory. / *Các server đang hoạt động ở 90% công suất thì văng lỗi OutOfMemory.* | LATAM & Spain: *carga*. Spain: *picos de tráfico*. |
| **Habitual Past** | Antes usamos SVN. / *Trước đây chúng ta dùng SVN.* | Antes usábamos SVN para el control de versiones. / *Trước đây chúng ta dùng SVN để quản lý phiên bản.* | Antiguamente gestionábamos el control de versiones con SVN, antes de migrar a Git. / *Ngày xưa chúng ta quản lý source bằng SVN, trước khi migrate sang Git.* | Spain: *ficheros*. LATAM: *archivos*. |

### 🎭 Role-Play Dialogue (LATAM Tech Workplace)
**Context**: A daily stand-up meeting discussing a bug that occurred the previous night.

**Diego (Lead)**: Mateo, ¿qué **pasó** (Preterite - Event) con el pipeline anoche?
*(Mateo, what happened with the pipeline last night?)*
*(Mateo, chuyện gì đã xảy ra với pipeline đêm qua?)*

**Mateo (Dev)**: Todo **funcionaba** (Imperfect - Background) bien hasta la medianoche. Yo **monitoreaba** (Imperfect) los logs cuando de repente el job **falló** (Preterite - Interruption).
*(Everything was working fine until midnight. I was monitoring the logs when suddenly the job failed.)*
*(Mọi thứ vẫn đang chạy tốt cho đến nửa đêm. Tôi đang theo dõi log thì đột nhiên job fail.)*

**Diego**: Ya veo. ¿**Encontraste** (Preterite) la causa raíz?
*(I see. Did you find the root cause?)*
*(Tôi hiểu. Bạn đã tìm ra nguyên nhân gốc chưa?)*

**Mateo**: Sí. El disco **estaba** (Imperfect - Condition) lleno, así que **borré** (Preterite - Action) unos contenedores antiguos.
*(Yes. The disk was full, so I deleted some old containers.)*
*(Rồi. Ổ cứng lúc đó đang đầy, nên tôi đã xóa vài container cũ.)*

### 📚 Bilingual Technical Vocabulary
| Español (ES) | English (EN) | Tiếng Việt (VN) |
| :--- | :--- | :--- |
| De repente | Suddenly | Đột nhiên |
| Mientras | While | Trong khi |
| Causa raíz | Root cause | Nguyên nhân gốc rễ |
| Funcionar / Estaba funcionando | To work / Was working | Hoạt động / Đang hoạt động |
| Fallar / Falló | To fail / Failed | Lỗi / Đã lỗi |

### 🚫 Common Anti-Patterns
- **Mistake**: *Ayer el servidor era lento.* (Using 'ser' in imperfect for a specific temporary event yesterday).
- **Correction**: *Ayer el servidor **estuvo** lento.* (Preterite of 'estar' for a completed period of time).
- **Why**: If you say "era lento," you mean the server was inherently, historically a slow machine over a long period. "Estuvo lento ayer" means it had a specific period of slowness yesterday.

---

## Part 2: Practice Workspace

### Scenario & Context
You are writing a Jira comment describing a bug you found. You need to explain that you WERE TESTING the login API (background) when you RECEIVED a 500 error (event). You NOTICED (event) that the database WAS locked (state).

### User Practice Area
*(Write your response in Spanish here...)*

### Progressive Socratic Hints
1. **Hint 1**: "I was testing" -> Imperfect of *probar* (*probaba* or *estaba probando*).
2. **Hint 2**: "When I received" -> *cuando recibí* (Preterite).
3. **Hint 3**: "I noticed" -> *noté / me di cuenta de que* (Preterite). "was locked" -> *estaba bloqueada* (Imperfect state).

---

## Part 4: Assessment Exam

### ❓ MCQs
1. Which tense is used for an ongoing background state in a post-mortem?
   - [ ] A. Preterite
   - [ ] B. Imperfect
   - [ ] C. Present
2. "Ayer a las 5 PM, yo ________ (desplegar) el código a producción."
   - [ ] A. desplegaba
   - [ ] B. desplegué
   - [ ] C. despliego
3. "Nosotros ________ (usar) AngularJS antes de cambiar a React." (Habitual past).
   - [ ] A. usábamos
   - [ ] B. usamos (pretérito)
   - [ ] C. usaremos
4. Complete the interruption pattern: "El sistema ________ (compilar) cuando la luz se ________ (ir)."
   - [ ] A. compiló / iba
   - [ ] B. compilaba / fue
   - [ ] C. compiló / fue
5. Why is "Anoche el sistema tenía un error" less accurate than "Anoche el sistema tuvo un error"?
   - [ ] A. "Tuvo" correctly identifies it as a completed event with a specific timeframe.
   - [ ] B. "Tenía" is for the future.
   - [ ] C. Both are exactly the same.

### 🧪 Fill-in-the-Blanks
1. Mientras yo ________ (debuggear) el código, mi jefe me llamó.
2. El año pasado nosotros ________ (migrar) toda la infraestructura a AWS.
3. El servidor ________ (estar) muy lento durante toda la mañana, pero ya se arregló. (Hint: completed block of time = pretérito).
4. Cuando yo entré al equipo, todos ________ (programar) en PHP.
5. De repente, la base de datos ________ (borrarse) por completo.

### 🔍 Error Refactoring
Rewrite these sentences using the correct past tense:
1. *Ayer, yo terminaba el reporte de QA.* (I finished it). -> 
2. *Cuando era junior, yo hice muchos errores cada día.* (Habitual). -> 
3. *Mientras el script corrió, yo tomé un café.* (Ongoing action). -> 
4. *El sistema se caía a las 2:00 AM exactamente.* -> 
5. *Nosotros tuvimos problemas de red antes, frecuentemente.* -> 

### 🗣️ Roleplay Short Answer
Explain to your PM in a stand-up: "I was reviewing the PR when I found a memory leak. I fixed it immediately, and now the tests are passing."

### 🏆 Model DELE C1/C2 Benchmarks
- *Mientras me encontraba revisando la solicitud de cambios (PR), detecté una severa fuga de memoria. Procedí a solucionarlo de inmediato, y en estos momentos la batería de pruebas se ejecuta satisfactoriamente.*
*(While I was reviewing the pull request (PR), I detected a severe memory leak. I proceeded to solve it immediately, and right now the test suite is running successfully.)*
*(Trong khi tôi đang review PR, tôi đã phát hiện ra một lỗi rò rỉ bộ nhớ nghiêm trọng. Tôi đã tiến hành khắc phục ngay lập tức, và hiện tại bộ test đang chạy thành công.)*

### 📊 Self-Assessment Rubric
- [ ] Correctly used Imperfect for background contexts and habitual past.
- [ ] Correctly used Preterite for completed events and interruptions.
- [ ] Mastered the "Mientras [Imperfect], [Preterite]" interruption pattern.
- [ ] Effectively communicated post-mortem incident timelines with C1/C2 vocabulary.
