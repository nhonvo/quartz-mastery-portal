---
title: "\ude80 Manejo de Caídas del Sistema y Post-Mortems (Handling System Outages and Post-Mortems)"
category: "04_Technical_Interviews"
tags: ["espanol","spanish-communication","dele-b2-c1","languages","learning-note"]
language: "espanol"
type: "resource-lesson"
---

# 🚀 Manejo de Caídas del Sistema y Post-Mortems (Handling System Outages and Post-Mortems)

## Part 1: Resource Lesson (Deep Dive Theory)

### 🎯 Executive Summary & Objectives
**Goal:** Master the vocabulary and C1/C2 professional discourse required to manage critical incidents, report system outages, and conduct blameless post-mortems in Spanish.
**Engineering Impact:** Crucial for Site Reliability Engineers (SREs) and DevOps professionals when communicating RCA (Root Cause Analysis) to stakeholders in LATAM and Spain.

### ⚙️ Contrastive Analysis & Theory (C1/C2 Level)
- **System Outage:** Caída del sistema / Interrupción del servicio.
- **Root Cause Analysis (RCA):** Análisis de causa raíz.
- **Blameless Post-Mortem:** Post-mortem sin culpa / Análisis retrospectivo sin señalamientos.
- **Mean Time To Recovery (MTTR):** Tiempo medio de recuperación.

### 🛠️ Real-World Engineering Context Comparison (Junior B1 vs. Senior C1/C2)
| Junior (B1) | Senior (C1/C2) | English | Vietnamese |
| :--- | :--- | :--- | :--- |
| El sistema no funciona. | Estamos experimentando una interrupción del servicio de criticidad alta. | We are experiencing a high-criticality service outage. | Chúng ta đang gặp sự cố gián đoạn dịch vụ có độ nghiêm trọng cao. |
| Fue mi culpa que se cayera. | En el post-mortem sin culpa, identificamos que el despliegue introdujo una regresión. | In the blameless post-mortem, we identified that the deployment introduced a regression. | Trong post-mortem không đổ lỗi, chúng tôi xác định rằng việc triển khai đã gây ra hồi quy. |
| Arreglamos el problema rápido. | Logramos minimizar el tiempo medio de recuperación (MTTR) a 15 minutos. | We managed to minimize the mean time to recovery (MTTR) to 15 minutes. | Chúng tôi đã thành công giảm thiểu thời gian trung bình để phục hồi (MTTR) xuống 15 phút. |

### 🎭 Role-Play Dialogue (LATAM vs Spain)
**LATAM SRE:** "Iniciemos el *análisis de causa raíz* para entender por qué tuvimos la interrupción del servicio ayer." (Let's start the root cause analysis to understand why we had the service outage yesterday.) [VN: Hãy bắt đầu phân tích nguyên nhân gốc rễ để hiểu tại sao chúng ta bị gián đoạn dịch vụ hôm qua.]
**Spain Engineering Manager:** "Perfecto. Asegurémonos de que sea un *post-mortem sin culpa*. No busquemos culpables, sino fallos en el proceso o en el *ordenador* de despliegue." (Perfect. Let's make sure it's a blameless post-mortem. Let's not look for culprits, but for flaws in the process or in the deployment computer.) [VN: Tuyệt vời. Hãy đảm bảo đó là một post-mortem không đổ lỗi. Đừng tìm người có lỗi, mà hãy tìm lỗi trong quy trình hoặc máy tính triển khai.]

### 📚 Bilingual Technical Vocabulary
| Español (LATAM/Spain) | English | Vietnamese |
| :--- | :--- | :--- |
| Análisis de causa raíz | Root Cause Analysis (RCA) | Phân tích nguyên nhân gốc rễ |
| Interrupción del servicio | Service Outage | Gián đoạn dịch vụ |
| Post-mortem sin culpa | Blameless Post-Mortem | Post-mortem không đổ lỗi |
| Tiempo medio de recuperación | MTTR | Thời gian phục hồi trung bình |
| Mitigación de impacto | Impact Mitigation | Giảm thiểu tác động |

### 🚫 Common Anti-Patterns
- Translating "Outage" simply as "Apagón" (better for electricity, use "Caída" or "Interrupción" for software).
- Translating "Blameless" as "Sin culpa" is okay, but "Sin señalamientos" sounds more professional in C1/C2 context.

---

## Part 2: Practice Workspace

### Scenario & Context
A faulty database migration caused a 30-minute downtime. You need to write the opening statement for the post-mortem document.

### User Practice Area
[ Escribe tu declaración inicial del post-mortem aquí / Write your opening post-mortem statement here ]

### Progressive Socratic Hints
1. Menciona la "interrupción del servicio". (Mention the "service outage".)
2. Enfatiza que será un análisis "sin señalamientos" o "sin culpa". (Emphasize that it will be a "blameless" analysis.)

---

## Part 3: Assessment Exam

### ❓ MCQs (5 Questions)
1. "Root Cause Analysis" is best translated as:
   - [ ] A. Análisis de problemas b) Análisis de causa raíz c) Causa principal d) Búsqueda de raíz
2. Which term is best for "Blameless Post-Mortem"?
   - [ ] A. Post-mortem feliz b) Post-mortem sin señalamientos c) Post-mortem de sistema d) Retrospectiva culpable
3. "Service Outage" in a professional context is:
   - [ ] A. Apagón b) Interrupción del servicio c) Muerte de red d) Desconexión
4. "MTTR" stands for Mean Time To Recovery. In Spanish:
   - [ ] A. Tiempo medio de recuperación b) Mitigación de tiempo c) Mejora total de red d) Manejo de fallos
5. When the database goes down, we say:
   - [ ] A. La base de datos se cayó b) La base de datos está triste c) La base de datos durmió d) La base de datos apagó

### 🧪 Fill-in-the-Blanks (5 Drills)
1. Estamos investigando la __________ (Root Cause).
2. El equipo logró reducir el __________ (MTTR).
3. Tuvimos una __________ (Service Outage) en producción.
4. Es fundamental realizar un __________ (Blameless Post-Mortem).
5. Implementamos estrategias de __________ (Impact Mitigation).

### 🔍 Error Refactoring (5 Exercises)
Refactor to C1/C2:
1. (B1) "El sistema se rompió por 10 minutos." -> (C1/C2)
2. (B1) "Vamos a ver de quién fue la culpa." -> (C1/C2)
3. (B1) "La causa fue un error de código." -> (C1/C2)
4. (B1) "Tardamos mucho en arreglarlo." -> (C1/C2)
5. (B1) "El apagón afectó a los usuarios." -> (C1/C2)

### 🗣️ Roleplay Short Answer
Describe cómo mitigaste el impacto durante la caída del sistema.

### 🏆 Model DELE C1/C2 Benchmarks
"Para mitigar el impacto durante la interrupción del servicio, procedimos con un rollback inmediato del despliegue, logrando un tiempo medio de recuperación de 5 minutos, tras lo cual iniciamos un análisis de causa raíz sin señalamientos."

### 📊 Self-Assessment Rubric
- [ ] Successfully used C1/C2 RCA vocabulary (causa raíz, mitigación).
- [ ] Maintained a blameless, professional tone.
- [ ] Completed the 5-5-5 drill without errors.
