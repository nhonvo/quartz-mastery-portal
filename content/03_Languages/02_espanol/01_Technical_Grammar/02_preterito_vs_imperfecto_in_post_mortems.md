---
title: "02. Pretérito vs Imperfecto in Post-Mortems"
category: "01_Technical_Grammar"
tags: ["espanol","spanish-communication","dele-b2-c1","languages","learning-note"]
language: "espanol"
type: "resource-lesson"
---

# 02. Pretérito vs Imperfecto in Post-Mortems

## Part 1: Resource Lesson (Deep Dive Theory)

### 🎯 Executive Summary & Objectives
**Goal**: Master the distinction between *Pretérito Indefinido* (completed past) and *Pretérito Imperfecto* (ongoing past/background) for writing incident reports and post-mortems.

**Engineering Impact**: Crucial for establishing accurate timelines in incident reports. Knowing what "was happening" vs. what "happened" helps identify root causes effectively and communicate outages with executive-level clarity.

### ⚙️ Contrastive Analysis & Theory
- **Pretérito Imperfecto**: Used for background context, ongoing states, descriptions, and what was happening *before* or *during* the incident.
  - *Example*: El servidor **funcionaba** bien hasta las 3 PM. (The server was working fine until 3 PM).
- **Pretérito Indefinido**: Used for sudden events, completed actions, specific state changes, and bounded timelines.
  - *Example*: La base de datos **colapsó** a las 3:05 PM. (The DB crashed at 3:05 PM).

**Bilingual Context (EN/ES/VN)**: 
*EN*: "While the system was running, the error occurred." 
*ES*: "Mientras el sistema **funcionaba** (imperfect), **ocurrió** (preterite) el error."
*VN*: "Trong khi hệ thống **đang chạy** (imperfect/background), lỗi **đã xảy ra** (preterite/action)."

### 🛠️ Real-World Engineering Context Comparison
- **Junior (B1)**: El sistema falló porque la memoria terminó. (Unnatural description of state).
- **Senior (C1/C2)**: El sistema **falló** (Indefinido) debido a que el proceso **consumía** (Imperfecto) memoria de forma descontrolada justo antes del pico de tráfico.
- **LATAM vs Spain Lexical Callout**:
  - *Spain*: El ordenador **se colgó** mientras **compilaba**. (The computer froze while compiling).
  - *LATAM*: La máquina / El servidor **se trabó/cayó** mientras **ejecutaba** el build.

### 🎭 Role-Play Dialogue (Spain Tech Workplace)
**SRE (Javier)**: ¿Qué **pasaba** (imperfect) con los pods justo antes de la caída? (What was happening with the pods just before the crash? / Chuyện gì đang xảy ra với các pod ngay trước khi sập?)

**DevOps (Marta)**: El consumo de CPU **aumentaba** (imperfect) constantemente, y de repente, el nodo maestro **reinició** (preterite) todos los servicios. (CPU consumption was increasing steadily, and suddenly, the master node restarted all services. / Mức tiêu thụ CPU đang tăng liên tục, và đột nhiên, node master đã khởi động lại tất cả các dịch vụ.)

### 📚 Bilingual Technical Vocabulary
| Español (ES) | English (EN) | Tiếng Việt (VN) |
| :--- | :--- | :--- |
| Falló / Colapsó | It crashed / failed | Đã sập / Đã lỗi |
| Se estaba ejecutando | It was running | Đang được thực thi / chạy |
| Pico de tráfico | Traffic spike | Lưu lượng tăng vọt |
| Cuello de botella | Bottleneck | Nút thắt cổ chai |
| Tiempo de inactividad | Downtime | Thời gian ngừng hoạt động (downtime) |

### 🚫 Common Anti-Patterns
- ❌ *El servidor fallaba a las 5 PM.* (Using imperfect for a specific, sudden event).
- ✅ *El servidor falló a las 5 PM.* (Correct: preterite for specific events).
- ❌ *Mientras yo desplegué, el sistema rompió.* (Wrong tense for ongoing action).
- ✅ *Mientras yo desplegaba (imperfect), el sistema se rompió (preterite).*

---

## Part 2: Practice Workspace

### Scenario & Context
You are writing a Root Cause Analysis (RCA). You need to explain that while the background cron jobs were processing data, a sudden OOM (Out of Memory) error terminated the main application pod.

### User Practice Area
*(Write your response in Spanish here)*
> 

### Progressive Socratic Hints
1. Which tense should you use for "were processing"? (Hint: Imperfect for ongoing background tasks).
2. Which tense for "terminated"? (Hint: Preterite for sudden, completed actions).

---

## Part 3: Assessment Exam

### ❓ MCQs
1. Choose the correct tense to describe a sudden crash:
   - [ ] A. El sistema se caía
   - [ ] B. El sistema se cayó
   - [ ] C. El sistema se ha caído (if yesterday)
   *Answer: b*
2. "The background tasks were running smoothly when..."
   - [ ] A. Las tareas ejecutaron...
   - [ ] B. Las tareas ejecutaban...
   - [ ] C. Las tareas ejecutado...
   *Answer: b*
3. "At 10:00 AM, the database dropped the connection."
   - [ ] A. A las 10:00 AM, la base de datos perdía la conexión.
   - [ ] B. A las 10:00 AM, la base de datos perdió la conexión.
   - [ ] C. A las 10:00 AM, la base de datos pierde la conexión.
   *Answer: b*
4. "The CPU was at 100% capacity."
   - [ ] A. La CPU estuvo al 100%.
   - [ ] B. La CPU estaba al 100%.
   - [ ] C. La CPU está al 100%.
   *Answer: b (imperfect for background state)*
5. "We deployed the hotfix yesterday."
   - [ ] A. Desplegábamos el hotfix ayer.
   - [ ] B. Desplegamos el hotfix ayer.
   - [ ] C. Desplegar el hotfix ayer.
   *Answer: b*

### 🧪 Fill-in-the-Blanks
1. Mientras nosotros ________ (monitorear) los logs, la base de datos ________ (desconectarse).
2. El sistema ________ (funcionar) bien hasta que el hacker ________ (inyectar) el script.
3. Los usuarios ________ (experimentar) latencia, por lo que nosotros ________ (escalar) los recursos.
4. Antes del parche, la aplicación ________ (consumir) demasiada memoria.
5. El nodo ________ (fallar) exactamente a las 02:45 AM.
*(Answers: 1. monitoreábamos / se desconectó, 2. funcionaba / inyectó, 3. experimentaban / escalamos, 4. consumía, 5. falló)*

### 🔍 Error Refactoring
Rewrite to C1 level:
1. *Junior*: El error pasaba cuando yo desplegué el código.
   - *Refactored*: El error **se manifestó** (preterite) mientras **se ejecutaba** (imperfect) el pipeline de despliegue.
2. *Junior*: El servidor caía a las 3 PM.
   - *Refactored*: El servidor **colapsó** abruptamente a las 15:00 horas.
3. *Junior*: Yo miraba los logs y vi que la memoria estaba llena.
   - *Refactored*: Mientras **analizaba** los registros, **identifiqué** que la memoria **había alcanzado** su límite.
4. *Junior*: La red funcionó mal durante todo el día.
   - *Refactored*: La red **presentaba** (imperfect) inestabilidad continua a lo largo de la jornada.
5. *Junior*: El usuario no pudo entrar porque el sistema actualizaba.
   - *Refactored*: El usuario **no logró autenticarse** (preterite) debido a que el sistema **se estaba actualizando** (imperfect).

### 🗣️ Roleplay Short Answer
Explain to stakeholders what was going on in the network just before the outage happened.
*(Provide a paragraph using imperfect for the state and preterite for the crash)*

### 🏆 Model DELE C1/C2 Benchmarks
*Senior SRE model*: "El tráfico de red **fluía** (imperfect) con normalidad y los nodos **procesaban** (imperfect) las peticiones eficientemente, hasta que **recibimos** (preterite) un ataque DDoS a las 14:00, el cual **saturó** (preterite) los balanceadores de carga."

### 📊 Self-Assessment Rubric
- [ ] Preterite used accurately for specific incidents and bounded actions.
- [ ] Imperfect used correctly for background telemetry and states.
- [ ] RCA vocabulary integrated appropriately.
- [ ] Achieved 100% on the 5-5-5 drills.
