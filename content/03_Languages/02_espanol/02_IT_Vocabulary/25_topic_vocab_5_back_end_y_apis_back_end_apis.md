---
title: "\ude80 Topic Vocab 5: Back-end y APIs (Back-end & APIs)"
category: "02_IT_Vocabulary"
tags: ["espanol","spanish-communication","dele-b2-c1","languages","learning-note"]
language: "espanol"
type: "resource-lesson"
---

# 🚀 Topic Vocab 5: Back-end y APIs (Back-end & APIs)

## Part 1: Resource Lesson (Deep Dive Theory)

### 🎯 Executive Summary & Objectives
**Goal**: Master terminology for server-side logic, API endpoints, authentication, and microservices in Spanish.

**Engineering Impact**: Clear communication about endpoints, payloads, HTTP verbs, and security ensures seamless integration between frontend and backend teams.

### ⚙️ Contrastive Analysis & Theory
- *Endpoint* -> *Punto de enlace* (aunque "endpoint" es muy común, se aconseja conocer la traducción).
- *Payload* -> *Carga útil*.
- *Request / Response* -> *Petición / Respuesta* o *Solicitud / Respuesta*.
- *Routing* -> *Enrutamiento*.

**🌍 Regional Variations (LATAM vs. Spain):**
- **Request:** *Petición* is prevalent in Spain; *Solicitud* or the Spanglish *el request* is common in LATAM.
- **Parsing:** In Spain, *analizar* or *parsear* (colloquial) is used. LATAM widely adopts *parsear*.
- **Endpoint:** Spain documentation uses *punto de enlace*, while LATAM engineers almost exclusively say *el endpoint*.

### 🛠️ Real-World Engineering Context Comparison
- **Junior (B1)**: "El endpoint no funciona, da error 500."
- **Mid-Level (B2)**: "La solicitud a la API falló con un error de servidor. Revisaré los registros."
- **Senior (C1/C2 Executive)**: "El punto de enlace está arrojando un código de estado 500 debido a una excepción no controlada en la capa de persistencia. Procederé a instrumentar la traza de la pila y validar la estructura de la carga útil (payload)."

### 🎭 Role-Play Dialogue
**Contexto:** Reunión técnica sobre integración de pasarela de pago.
**Andrés (Backend Developer):** La *petición HTTP* (HTTP request) requiere un *token de autorización* en los encabezados (headers). *(VN: Yêu cầu HTTP đòi hỏi phải có một mã thông báo xác thực trong các tiêu đề.)*
**Camila (Tech Lead):** Exacto. Asegúrate de que la *carga útil* (payload) esté cifrada, y que manejemos las *respuestas* (responses) asíncronas mediante webhooks para evitar bloqueos en el *enrutamiento*. *(VN: Chính xác. Hãy đảm bảo rằng tải trọng dữ liệu được mã hóa, và chúng ta xử lý các phản hồi bất đồng bộ thông qua webhooks để tránh tắc nghẽn trong định tuyến.)*

### 📚 Bilingual Technical Vocabulary
| Español | English | Tiếng Việt | Context/Usage |
| :--- | :--- | :--- | :--- |
| Punto de enlace / Endpoint | Endpoint | Điểm cuối (API) | URL de la API |
| Petición / Solicitud | Request | Yêu cầu | Llamada del cliente |
| Respuesta | Response | Phản hồi | Contestación del servidor |
| Carga útil | Payload | Tải trọng (dữ liệu) | Cuerpo del mensaje |
| Enrutamiento | Routing | Định tuyến | Mapeo de URLs |
| Encabezado | Header | Tiêu đề | Metadatos HTTP |

### 🚫 Common Anti-Patterns
- ❌ "Manda un request" -> ✅ "Envía una petición / solicitud".
- ❌ "El response está vacío" -> ✅ "La respuesta está vacía".

---

## Part 2: Practice Workspace

### Scenario & Context
You need to explain that the authentication API endpoint is failing because the JWT token has expired in the request headers.

### User Practice Area
*(Escribe tu respuesta aquí / Write your response here)*
> 

### Progressive Socratic Hints
1. "Authentication API endpoint" -> "El punto de enlace (endpoint) de la API de autenticación".
2. "Is failing" -> "Está fallando / devolviendo error".
3. "Request headers" -> "Los encabezados de la petición".

---

## Part 3: Assessment Exam

### ❓ MCQs
1. "Payload" in formal Spanish networking is:
   - [ ] A. Pago pesado
   - [ ] B. Carga útil
   - [ ] C. Datos extra
2. "Request" is best translated as:
   - [ ] A. Requisito
   - [ ] B. Petición o Solicitud
   - [ ] C. Cuestión
3. A "Header" in an HTTP call is called:
   - [ ] A. Cabeza
   - [ ] B. Sombrero
   - [ ] C. Encabezado o Cabecera
4. "Routing" in backend terms means:
   - [ ] A. Enrutamiento
   - [ ] B. Ruteando
   - [ ] C. Ruta principal
5. Which word is used for API "Endpoint"?
   - [ ] A. Punto final
   - [ ] B. Punto de enlace
   - [ ] C. Meta

### 🧪 Fill-in-the-Blanks
1. La API espera recibir una __________ (request) tipo POST.
2. El servidor envió una __________ (response) con estado 200 OK.
3. Asegúrate de incluir el token en el __________ (header).
4. La __________ __________ (payload) excede el tamaño máximo permitido.
5. El __________ (routing) de esta aplicación se gestiona con Express.js.

### 🔍 Error Refactoring
1. "El request dio timeout." -> 
2. "Mira el payload del response." -> 
3. "Ese endpoint está caído." -> 
4. "Pon el token en los headers." -> 
5. "Falta configurar el routing." -> 

### 🗣️ Roleplay Short Answer
**Situation:** A frontend dev complains they are getting a 403 Forbidden error. Explain to them in Spanish that they need to send a valid Bearer token in the authorization header.
> *Your Answer:* 

### 🏆 Model DELE C1/C2 Benchmarks
*Senior Technical Lead Models:*
- **LATAM (Executive):** "El código de estado 403 denota que la solicitud carece de permisos suficientes; es mandatorio inyectar el Bearer token validado dentro del encabezado de autorización de la API."
- **Spain (Executive):** "El código HTTP 403 refleja que la petición carece de credenciales válidas. Es estrictamente necesario adjuntar el token portador en la cabecera de autorización correspondiente."

### 📊 Self-Assessment Rubric
- [ ] Used *petición*, *respuesta*, *encabezado*.
- [ ] Addressed the technical cause clearly.
