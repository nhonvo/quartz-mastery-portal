---
title: "\ude80 Topic Vocab 6: DevOps y CI/CD (DevOps & CI/CD)"
category: "02_IT_Vocabulary"
tags: ["espanol","spanish-communication","dele-b2-c1","languages","learning-note"]
language: "espanol"
type: "resource-lesson"
---

# 🚀 Topic Vocab 6: DevOps y CI/CD (DevOps & CI/CD)

## Part 1: Resource Lesson (Deep Dive Theory)

### 🎯 Executive Summary & Objectives
**Goal**: Discuss pipelines, continuous integration, automation, and containerization in fluent Spanish.

**Engineering Impact**: Aligning release cycles, explaining build failures, and configuring automated deployments safely requires mastery of DevOps vocabulary.

### ⚙️ Contrastive Analysis & Theory
- *Pipeline* -> *Canalización* / *Flujo de trabajo* (En la práctica se usa "pipeline", pero "canalización" es el término formal).
- *Build* -> *Compilación* (para código) o *Construcción* (para artefactos/imágenes).
- *Container* -> *Contenedor*.
- *Release* -> *Lanzamiento* / *Pase a producción*.
**LATAM vs Spain Lexical Callouts**:
- In LATAM, it's almost universally "el pipeline". In Spain, formal environments might use "la canalización" or "el flujo de integración".
- LATAM tends to use "pase a producción" or "liberación". Spain frequently uses "subida a producción" o "puesta en producción".

### 🛠️ Real-World Engineering Context Comparison
- **Junior (B1)**: "El pipeline falló y no hizo el build. Hay que checar los logs." (Informal, Spanglish)
- **Senior (C1/C2 - Executive Engineering)**: "El proceso de integración continua se interrumpió debido a un error en la compilación; los tests unitarios fallaron, bloqueando el pase a producción. Sugiero aprovisionar mayor memoria al runner de CI para estabilizar la canalización."

### 🎭 Role-Play Dialogue
**Contexto / Context / Bối cảnh:** Investigando un fallo en GitHub Actions (Investigating a GitHub Actions failure / Điều tra lỗi GitHub Actions).
**Héctor (Site Reliability Engineer):** El *flujo de trabajo* (pipeline) de despliegue falló anoche en el paso de *empaquetado*.
*(EN: The deployment workflow failed last night at the packaging step.)*
*(VN: Quy trình triển khai đã thất bại đêm qua ở bước đóng gói.)*
**Elena (DevOps):** Revisé los registros. El problema es que el *contenedor* Docker se quedó sin memoria durante la *construcción* de la imagen. Aumentaré los recursos asignados al entorno de CI.
*(EN: I reviewed the logs. The problem is that the Docker container ran out of memory during the image build. I will increase the resources assigned to the CI environment.)*
*(VN: Tôi đã kiểm tra nhật ký. Vấn đề là container Docker đã hết bộ nhớ trong quá trình xây dựng image. Tôi sẽ tăng tài nguyên được cấp cho môi trường CI.)*

### 📚 Bilingual Technical Vocabulary
| Español | English | Tiếng Việt | Context/Usage |
| :--- | :--- | :--- | :--- |
| Integración continua | Continuous Integration (CI) | Tích hợp liên tục | Merge frecuente |
| Despliegue continuo | Continuous Deployment (CD)| Triển khai liên tục | Release automático |
| Canalización / Flujo | Pipeline | Đường ống | Proceso automatizado |
| Contenedor | Container | Container | Entorno aislado (e.g. Docker) |
| Compilación | Build | Xây dựng / Biên dịch | Código a ejecutable |
| Lanzamiento | Release | Phát hành | Versión de software lista |

### 🚫 Common Anti-Patterns
- ❌ "El pipeline crashó" -> ✅ "El flujo de trabajo falló".
- ❌ "Hacer una release" -> ✅ "Realizar un lanzamiento" o "Desplegar una versión".

---

## Part 2: Practice Workspace

### Scenario & Context
You need to inform the team that the master branch cannot be merged because the CI pipeline failed at the testing stage.

### User Practice Area
*(Escribe tu respuesta aquí / Write your response here)*
> 

### Progressive Socratic Hints
1. "Master branch" -> "La rama principal (master/main)".
2. "Cannot be merged" -> "No se puede fusionar / integrar".
3. "CI pipeline failed" -> "El flujo de integración continua (CI) falló".

---

## Part 3: Assessment Exam

### ❓ MCQs
1. What is the formal Spanish translation for a CI/CD "Pipeline", and how does usage differ regionally?
   - [ ] A. Tubería de datos (Used exclusively in Spain)
   - [ ] B. Canalización / Flujo de trabajo (LATAM favors "pipeline", Spain formalizes as "canalización")
   - [ ] C. Proceso de líneas (Universal)
2. "Container" in DevOps (like Docker) is called:
   - [ ] A. Caja
   - [ ] B. Contenedor
   - [ ] C. Recipiente
3. "To build" software in Spanish, particularly differentiating code vs images:
   - [ ] A. Edificar (for both)
   - [ ] B. Compilar (for code) o Construir (for artifacts/images)
   - [ ] C. Hacer (for scripts)
4. "Release" as a noun (software version/deployment) translates to which regional variants?
   - [ ] A. Relajación (LATAM) / Liberación (Spain)
   - [ ] B. Pase a producción (LATAM) / Subida a producción (Spain)
   - [ ] C. Descarga (Universal)
5. "Continuous Integration" translates exactly to:
   - [ ] A. Integración continua
   - [ ] B. Entrega sin pausa
   - [ ] C. Continuación integrada

### 🧪 Fill-in-the-Blanks
1. Necesitamos automatizar la __________ (build - noun) con Jenkins para reducir el trabajo manual.
2. El __________ (container) de Docker se reinició inesperadamente debido a un Out-of-Memory (OOM).
3. Hemos implementado un robusto proceso de __________ __________ (Continuous Integration) en el monorepo.
4. Mañana realizaremos el __________ (release / pase a producción) de la versión 2.0.
5. El __________ (pipeline / flujo de trabajo) tardó 15 minutos en ejecutarse antes de fallar en el paso de empaquetado.

### 🔍 Error Refactoring
*(Refactor the following Spanglish/B1 sentences into C1/C2 Executive Spanish)*
1. **Spanglish (B1):** "El build falló en el CI."
   - **C1/C2 Refactor:** 
2. **Spanglish (B1):** "Hay que arreglar el docker container que crasheó."
   - **C1/C2 Refactor:** 
3. **Spanglish (B1):** "El pipeline está lento hoy."
   - **C1/C2 Refactor:** 
4. **Spanglish (B1):** "Vamos a hacer deploy de este release a la noche."
   - **C1/C2 Refactor:** 
5. **Spanglish (B1):** "Mergea a master para que empiece el CI/CD."
   - **C1/C2 Refactor:** 

### 🗣️ Roleplay Short Answer
**Situation:** Explain what a Docker container is and why it's beneficial for ensuring code runs the same everywhere to a non-technical PM in Spanish.
> *Your Answer:* 

### 🏆 Model DELE C1/C2 Benchmarks
*Senior Technical Lead Models:*
- "Un contenedor es un paquete de software estándar que aísla el código y sus dependencias, asegurando un comportamiento determinista y consistente independientemente del entorno de ejecución."

### 📊 Self-Assessment Rubric
- [ ] Used *contenedor*, *dependencias*, *entorno*.
- [ ] Professional and accessible tone for a PM.
