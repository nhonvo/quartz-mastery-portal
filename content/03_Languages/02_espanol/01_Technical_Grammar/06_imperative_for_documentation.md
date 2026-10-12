---
title: "06. Imperative for Documentation"
category: "01_Technical_Grammar"
tags: ["espanol","spanish-communication","dele-b2-c1","languages","learning-note"]
language: "espanol"
type: "resource-lesson"
---

# 06. Imperative for Documentation

## Part 1: Resource Lesson (Deep Dive Theory)

### 🎯 Executive Summary & Objectives
**Goal**: Master the *Imperative* mood and the *Infinitive* form to write clear, professional, and standardized technical documentation (READMEs, API specs, runbooks).

**Engineering Impact**: Poorly written documentation causes friction in developer onboarding and system operations. Knowing whether to use formal imperative (usted), informal (tú), or the impersonal infinitive guarantees consistency and a C1/C2 level of polish in technical writing.

### ⚙️ Contrastive Analysis & Theory
When writing documentation or UI copy in Spanish, there are three main approaches for commands:
1. **Infinitive (Highly Recommended for Docs)**: Neutral, objective, standard in modern technical writing (READMEs). 
   - *Example*: **Ejecutar** el script de instalación. (Run the install script).
2. **Formal Imperative (Usted)**: Used in formal UI prompts and corporate user manuals.
   - *Example*: **Haga** clic aquí para continuar. (Click here to continue).
3. **Informal Imperative (Tú)**: Used in modern, friendly consumer apps (e.g., Duolingo style) or internal team wikis.
   - *Example*: **Haz** clic aquí. (Click here).

**Bilingual Context (EN/ES/VN)**: 
*EN*: "Configure the database credentials." 
*ES (Infinitive)*: "**Configurar** las credenciales de la base de datos."
*ES (Usted)*: "**Configure** las credenciales..."
*VN*: "**Cấu hình** thông tin đăng nhập cơ sở dữ liệu." (Vietnamese uses the base verb form natively, similar to the Spanish infinitive approach for neutral instructions).

### 🛠️ Real-World Engineering Context Comparison
- **Junior (B1)**: Tú debes correr el docker-compose up. (Too conversational for a README).
- **Senior (C1/C2)**: **Ejecutar** `docker-compose up` para **levantar** los contenedores. (Clean, infinitive-based instruction).
- **LATAM vs Spain Lexical Callout**:
  - *Spain (UI)*: **Pinchad / Haced clic** en el enlace. (Plural informal "vosotros").
  - *LATAM (UI)*: **Hagan clic** en el enlace. (Plural "ustedes").
  - *Standard Tech Writing (Both)*: **Hacer clic** en el enlace. (Infinitive is universally understood and safe).

### 🎭 Role-Play Dialogue (Reviewing a README)
**Tech Lead (Sofia)**: El README está un poco informal. En lugar de decir "clona el repo", ¿podemos usar el infinitivo? (The README is a bit informal. Instead of saying "clone the repo", can we use the infinitive? / README hơi thiếu trang trọng. Thay vì nói "clone repo", chúng ta dùng động từ nguyên thể được không?)

**Dev (Luis)**: Ah, claro. Entonces lo cambio a "**Clonar** el repositorio y luego **instalar** las dependencias". (Ah, sure. Then I'll change it to "Clone the repository and then install the dependencies". / À, tất nhiên. Vậy tôi sẽ đổi thành "Clone repository và sau đó install (cài đặt) các dependencies (phụ thuộc)".)

**Tech Lead (Sofia)**: Exacto. Así suena mucho más profesional para los clientes externos. (Exactly. It sounds much more professional for external clients that way. / Chính xác. Nghe chuyên nghiệp hơn nhiều đối với khách hàng bên ngoài.)

### 📚 Bilingual Technical Vocabulary
| Español (ES) | English (EN) | Tiếng Việt (VN) |
| :--- | :--- | :--- |
| Ejecutar | To run / execute | Chạy / Thực thi |
| Configurar | To configure | Cấu hình |
| Desplegar | To deploy | Triển khai |
| Hacer clic / Pulsar | To click / press | Nhấp (chuột) / Nhấn |
| Clonar el repositorio | To clone the repository| Clone (sao chép) repository |

### 🚫 Common Anti-Patterns
- ❌ *Corres el script.* (Using present tense instead of command/infinitive).
- ✅ *Ejecutar el script.* (Infinitive for docs).
- ❌ *Mezclando tonos:* "Primero **clona** (tú) el repo y luego **configure** (usted) las variables."
- ✅ *Tono consistente:* "**Clonar** el repo y luego **configurar** las variables."

---

## Part 2: Practice Workspace

### Scenario & Context
You are writing a short setup guide for a new microservice. You need to tell the user to 1) Clone the repository, 2) Set up the environment variables, and 3) Run the server. You must use the impersonal *Infinitive* style.

### User Practice Area
*(Write your 3 bullet points in Spanish here)*
> 

### Progressive Socratic Hints
1. What is the infinitive of "to clone"? (Hint: Clonar)
2. What is the infinitive of "to configure/setup"? (Hint: Configurar)
3. What is the infinitive of "to run"? (Hint: Ejecutar o Iniciar)

---

## Part 3: Assessment Exam

### ❓ MCQs
1. Which is the most appropriate instruction for a public GitHub README?
   - [ ] A. Tú compilas el código.
   - [ ] B. Compilar el código.
   - [ ] C. Compiláis el código.
   *Answer: b*
2. Which form is the formal "Usted" imperative for "Guardar" (Save)?
   - [ ] A. Guarda
   - [ ] B. Guarde
   - [ ] C. Guardar
   *Answer: b*
3. "Press any key to continue" in a formal terminal prompt:
   - [ ] A. Presiona cualquier tecla para continuar.
   - [ ] B. Presione cualquier tecla para continuar.
   - [ ] C. Presionas cualquier tecla...
   *Answer: b*
4. What is the main problem with this doc: "Primero, instala Node. Luego, configure el puerto."?
   - [ ] A. Spelling mistakes
   - [ ] B. Mixing informal "tú" (instala) and formal "usted" (configure).
   - [ ] C. Wrong vocabulary.
   *Answer: b*
5. How do you say "Do not delete this file" using the infinitive in a comment?
   - [ ] A. No borras este archivo.
   - [ ] B. No borrar este archivo.
   - [ ] C. No borre este archivo. (formal, but not infinitive)
   *Answer: b*

### 🧪 Fill-in-the-Blanks
1. (Infinitive) ________ (Añadir) su clave SSH al agente.
2. (Infinitive) ________ (Verificar) que el puerto 8080 esté libre.
3. (Formal Usted) Por favor, ________ (introducir) su contraseña.
4. (Informal Tú - Internal Wiki) ________ (Revisar) los logs antes de preguntar en Slack.
5. (Infinitive) No ________ (modificar) las variables de entorno de producción.
*(Answers: 1. Añadir, 2. Verificar, 3. Introduzca/Introducir, 4. Revisa, 5. modificar)*

### 🔍 Error Refactoring
Rewrite these B1-level instructions to C1-level Infinitive standard for a README:
1. *Junior*: Tú necesitas hacer npm install.
   - *Refactored*: **Ejecutar** `npm install` para instalar las dependencias.
2. *Junior*: Baja la imagen de Docker.
   - *Refactored*: **Descargar** la imagen de Docker desde el registro.
3. *Junior*: Si tú quieres reiniciar, apaga el servidor.
   - *Refactored*: Para reiniciar, **detener** el servidor y **volver a iniciarlo**.
4. *Junior*: No hagas commit en master directamente.
   - *Refactored*: **Evitar / No realizar** commits directos en la rama `master`.
5. *Junior*: Copie (usted) el archivo de config y cambie (usted) el nombre.
   - *Refactored*: **Copiar** el archivo de configuración y **renombrarlo**.

### 🗣️ Roleplay Short Answer
Write a 2-step instruction in Spanish for your team's wiki on how to deploy to staging using the Infinitive mood.
*(Provide two bullet points)*

### 🏆 Model DELE C1/C2 Benchmarks
*Senior Documentation Writer model*: 
"- **Construir** la imagen localmente utilizando el Dockerfile provisto.
- **Validar** los tests unitarios ejecutando el comando de validación.
- **Desplegar** el artefacto en el entorno de staging."

### 📊 Self-Assessment Rubric
- [ ] Used Infinitives correctly for neutral, professional README documentation.
- [ ] Maintained consistent tone (no mixing of tú/usted).
- [ ] Handled negative commands correctly (No + infinitive).
- [ ] Achieved 100% on the 5-5-5 drills.
