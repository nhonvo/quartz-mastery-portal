---
title: "\ude80 Topic Vocab 9: Testing y Control de Calidad (Testing & QA)"
category: "02_IT_Vocabulary"
tags: ["espanol","spanish-communication","dele-b2-c1","languages","learning-note"]
language: "espanol"
type: "resource-lesson"
---

# 🚀 Topic Vocab 9: Testing y Control de Calidad (Testing & QA)

## Part 1: Resource Lesson (Deep Dive Theory)

### 🎯 Executive Summary & Objectives
**Goal**: Discuss various testing strategies, QA processes, bug tracking, and code coverage with native Spanish fluency.
**Engineering Impact**: Communicating bug reproduction steps and validating test criteria avoids misunderstandings between QA engineers and developers.

### ⚙️ Contrastive Analysis & Theory
- *Testing* -> *Pruebas*.
- *Unit test* -> *Prueba unitaria*.
- *Integration test* -> *Prueba de integración*.
- *End-to-End (E2E)* -> *Pruebas de extremo a extremo*.
- *Mock* -> *Simulación* / *Objeto simulado* (El término *mock* se usa mucho verbalmente, pero en documentación es mejor "simular").

**🌍 LATAM vs. Spain Lexical Callouts:**
- **To Test:** En LATAM es frecuente escuchar el anglicismo *testear*, mientras que en España se insiste en *probar* o *realizar pruebas*.
- **Bug/Ticket:** *Tiquete* o *Ticket* (LATAM) vs *Incidencia* (España, muy común en JIRA).
- **Staging:** *Ambiente de pruebas/QA* (LATAM) vs *Entorno de preproducción* (España).

### 🛠️ Real-World Engineering Context Comparison
- **Junior (B1)**: "El test pasó, pero el app falla."
  *(VN: Test đã pass, nhưng ứng dụng bị lỗi.)*
- **Senior / Executive Lead (C1/C2)**: "Aunque las pruebas unitarias se ejecutaron con éxito, los tests de integración revelaron una inconsistencia crítica en el flujo de datos. Requerimos escalar la cobertura de código al 90% para mitigar riesgos antes del paso a producción."
  *(VN: Mặc dù các bài kiểm thử đơn vị đã chạy thành công, nhưng kiểm thử tích hợp đã phát hiện một sự thiếu đồng nhất nghiêm trọng trong luồng dữ liệu. Chúng ta cần nâng độ bao phủ mã lên 90% để giảm thiểu rủi ro trước khi đưa lên production.)*

### 🎭 Role-Play Dialogue
**Contexto:** Revisión de un reporte de error crítico en JIRA.
**Carlos (QA Engineer):** He abierto una *incidencia* (ticket) de prioridad alta. Los pasos para reproducir el fallo indican que el formulario de pago no valida los campos vacíos en el *entorno de preproducción* (staging).
*(VN: Tôi đã mở một ticket ưu tiên cao. Các bước để tái hiện lỗi chỉ ra rằng form thanh toán không validate các trường trống trên môi trường staging.)*
**Laura (Tech Lead):** Gracias, Carlos. Implementaré una *prueba unitaria* (unit test) robusta para cubrir ese *caso límite* (edge case), y usaré un *objeto simulado* (mock) para aislar la respuesta de la pasarela de pagos.
*(VN: Cảm ơn Carlos. Tôi sẽ implement một unit test mạnh mẽ để bao phủ edge case đó, và sẽ dùng một mock object để cô lập phản hồi từ cổng thanh toán.)*

### 📚 Bilingual Technical Vocabulary
| Español | English | Tiếng Việt | Context/Usage |
| :--- | :--- | :--- | :--- |
| Pruebas unitarias | Unit tests | Kiểm thử đơn vị | Test de componentes individuales |
| Cobertura de código | Code coverage | Độ bao phủ mã | % de código probado |
| Caso extremo / límite | Edge case | Trường hợp ngoại lệ | Escenarios inusuales |
| Entorno de pruebas | Staging / Test environment | Môi trường test | Servidor previo a producción |
| Simulación | Mock / Stub | Giả lập / Mock | Objeto falso para pruebas |
| Reproducir un fallo | Reproduce a bug | Tái tạo lỗi | Pasos para ver el error |

### 🚫 Common Anti-Patterns
- ❌ "Los tests pasaron" -> ✅ "Las pruebas fueron exitosas / pasaron".
- ❌ "Estoy mockeando la API" -> ✅ "Estoy simulando las respuestas de la API".

---

## Part 2: Practice Workspace

### Scenario & Context
A QA engineer reports a bug, but you cannot reproduce it on your local machine. Ask them in Spanish to provide the exact steps to reproduce the error and details about the environment they tested on.

### User Practice Area
*(Escribe tu respuesta aquí / Write your response here)*
> 

### Progressive Socratic Hints
1. "Reproduce the bug" -> "Reproducir el error/fallo".
2. "Exact steps" -> "Los pasos exactos".
3. "Environment" -> "El entorno (sistema operativo, navegador, etc.)".

---

## Part 3: Assessment Exam

### ❓ MCQs
1. "Unit test" translates formally to:
   - [ ] A. Examen individual
   - [ ] B. Prueba unitaria
   - [ ] C. Test de uno
2. What is an "Edge case" in Spanish?
   - [ ] A. Caso extremo / caso límite
   - [ ] B. Caso borde
   - [ ] C. Caso raro
3. "Code coverage" refers to:
   - [ ] A. Tapar el código
   - [ ] B. Cobertura de código
   - [ ] C. Protección de datos
4. "Staging environment" is often called:
   - [ ] A. Escenario
   - [ ] B. Entorno de preproducción o pruebas
   - [ ] C. Servidor intermedio
5. To "Mock" a dependency is to:
   - [ ] A. Burlarse
   - [ ] B. Simularla
   - [ ] C. Clonarla

### 🧪 Fill-in-the-Blanks
1. Necesitamos aumentar la __________ (coverage) de nuestras pruebas.
2. ¿Puedes documentar los pasos para __________ (reproduce) el error?
3. Las __________ __________ (unit tests) se ejecutan automáticamente en el CI.
4. Tuvimos un fallo en un __________ __________ (edge case).
5. Vamos a __________ (mock) el comportamiento del servicio externo.

### 🔍 Error Refactoring
*(C1/C2 Focus: Elevate QA terminology & eliminate blatant Spanglish)*
1. "Haz los unit tests para el code de mañana." -> 
2. "No puedo reproducir el bug en mi local, ciérralo." -> 
3. "El test environment está caído y no podemos pushear." -> 
4. "Estamos mockeando el database para el E2E." -> 
5. "Este edge case rompe todo el release." -> 

### 🗣️ Roleplay Short Answer
**Situation:** Explain to your manager why investing time in writing End-to-End (E2E) tests is crucial before a major release.
> *Your Answer:* 

### 🏆 Model DELE C1/C2 Benchmarks
*Senior Technical Lead Models:*
- "La implementación de pruebas de extremo a extremo garantizará que todo el flujo del usuario funcione correctamente desde la interfaz hasta la base de datos, mitigando drásticamente el riesgo de regresiones en el entorno de producción."

### 📊 Self-Assessment Rubric
- [ ] Used *pruebas de extremo a extremo*, *flujo del usuario*, *regresiones*.
- [ ] Conveys the ROI of testing clearly and formally.
