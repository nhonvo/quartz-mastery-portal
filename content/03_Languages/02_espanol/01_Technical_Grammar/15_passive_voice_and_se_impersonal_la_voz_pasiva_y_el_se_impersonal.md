---
title: "15. Passive Voice and Se Impersonal (La Voz Pasiva y el Se Impersonal)"
category: "01_Technical_Grammar"
tags: ["espanol","spanish-communication","dele-b2-c1","languages","learning-note"]
language: "espanol"
type: "resource-lesson"
---

# 15. Passive Voice and Se Impersonal (La Voz Pasiva y el Se Impersonal)

## Part 1: Resource Lesson (Deep Dive Theory)

### 🎯 Executive Summary & Objectives
**Goal**: Master the Passive Voice (Ser + Participle) and the Impersonal "Se" to write objective, professional technical documentation, release notes, and bug reports without placing personal blame.

**Engineering Impact**: In LATAM and Spain, professional technical writing (Jira tickets, PR descriptions, official docs) relies heavily on passive and impersonal structures. Saying "Juan rompió la base de datos" (Juan broke the database) is aggressive. Saying "Se rompió la base de datos" (The database was broken/broke) maintains psychological safety and objectivity.

### ⚙️ Contrastive Analysis & Theory
English uses the passive voice frequently ("The data was encrypted"). Spanish uses it less in spoken language, favoring the **Impersonal Se** (Se pasivo).

1. **True Passive (Ser + Past Participle + por)**: Used mostly in formal writing, press releases, or when emphasizing the agent (the doer).
   - *El bug **fue arreglado** por el equipo de backend.* (The bug was fixed by the backend team.)
   - *La base de datos **será migrada** mañana.* (The database will be migrated tomorrow.)

2. **Impersonal Se (Se + 3rd Person Verb)**: The absolute standard for technical documentation, menus, UIs, and avoiding blame. The verb must agree with the noun receiving the action.
   - *Singular*: **Se configuró** el servidor. (The server was configured.)
   - *Plural*: **Se corrigieron** los errores. (The errors were corrected. NOT "se corrigió los errores".)
   - *UI Example*: **Se requiere** contraseña. (Password required.)

### 🛠️ Real-World Engineering Context Comparison
| Scenario | Junior / Non-Native (Direct/Active) | Senior (B1/B2) (Se Impersonal) | Tech Lead (C1/C2) (Formal Passive / Se) | LATAM vs Spain Lexical Callouts |
| :--- | :--- | :--- | :--- | :--- |
| **Bug Report (Blameless)** | El becario borró los datos. (Aggressive) / *Thực tập sinh đã xóa dữ liệu.* | Se borraron los datos por accidente. (Objective) / *Dữ liệu đã bị xóa do tai nạn.* | Se eliminaron los registros inadvertidamente; la restauración fue ejecutada por operaciones. / *Các bản ghi đã vô tình bị xóa; việc khôi phục đã được đội ops thực hiện.* | Spain: *becario* (intern). LATAM: *practicante / pasante*. |
| **Release Notes** | Nosotros añadimos soporte para OAuth. / *Chúng tôi đã thêm hỗ trợ OAuth.* | Se añadió soporte para OAuth. / *Hỗ trợ OAuth đã được thêm.* | Se ha implementado compatibilidad total con OAuth 2.0; los tokens de sesión serán gestionados criptográficamente. / *Tương thích toàn diện với OAuth 2.0 đã được triển khai; session tokens sẽ được quản lý bằng mã hóa.* | Spain: *soporte / compatibilidad*. LATAM: *soporte*. |
| **UI Documentation** | Tú tienes que reiniciar el sistema. / *Bạn phải khởi động lại hệ thống.* | Se debe reiniciar el sistema. / *Cần phải khởi động lại hệ thống.* | Se requiere un reinicio del sistema para que los cambios surtan efecto. / *Yêu cầu khởi động lại hệ thống để các thay đổi có hiệu lực.* | LATAM & Spain: *reiniciar*. |

### 🎭 Role-Play Dialogue (LATAM Tech Workplace)
**Context**: A Scrum daily meeting discussing the status of a sprint.

**Diego (Scrum Master)**: Hola equipo, ¿cuál es el estado del ticket 405 sobre la encriptación de contraseñas?
*(Hi team, what is the status of ticket 405 regarding password encryption?)*
*(Chào team, status của ticket 405 về mã hóa mật khẩu thế nào rồi?)*

**Mateo (Backend Dev)**: Ya **se completó** el desarrollo. Los passwords **fueron encriptados** usando bcrypt. Además, **se actualizaron** los tests unitarios.
*(The development is already completed. The passwords were encrypted using bcrypt. Also, the unit tests were updated.)*
*(Quá trình dev đã hoàn tất. Mật khẩu đã được mã hóa bằng bcrypt. Ngoài ra, unit test cũng đã được cập nhật.)*

**Diego**: Perfecto. ¿**Se ha desplegado** en staging?
*(Perfect. Has it been deployed to staging?)*
*(Tuyệt. Nó đã được deploy lên staging chưa?)*

**Mateo**: Aún no. **Se desplegará** esta tarde después de que el QA apruebe.
*(Not yet. It will be deployed this afternoon after QA approves.)*
*(Chưa. Nó sẽ được deploy vào chiều nay sau khi QA duyệt.)*

### 📚 Bilingual Technical Vocabulary
| Español (ES) | English (EN) | Tiếng Việt (VN) |
| :--- | :--- | :--- |
| Se requiere / Se necesita | It is required / needed | Được yêu cầu / Cần thiết |
| Se corrigió / Se arregló | It was fixed | Đã được sửa |
| Desplegar / Se desplegó | To deploy / It was deployed | Triển khai / Đã được triển khai |
| Encriptar / Cifrar | To encrypt | Mã hóa |
| Surtir efecto | To take effect | Có hiệu lực |

### 🚫 Common Anti-Patterns
- **Mistake**: *Se actualizó los servidores.* (Plural mismatch).
- **Correction**: *Se **actualizaron** los servidores.*
- **Why**: "Los servidores" is plural, so the verb with "se" must also be plural (3rd person plural).

---

## Part 2: Practice Workspace

### Scenario & Context
You need to write a Release Note for the latest patch. You must objectively state that:
1. 3 critical bugs were fixed. (Use Se impersonal)
2. The user interface was redesigned by the frontend team. (Use True Passive)
3. A system restart is recommended. (Use Se impersonal)

### User Practice Area
*(Write your response in Spanish here...)*

### Progressive Socratic Hints
1. **Hint 1**: "3 bugs were fixed" -> *Se arreglaron / corrigieron 3 bugs críticos.* (Plural verb).
2. **Hint 2**: "The UI was redesigned by..." -> *La interfaz de usuario fue rediseñada por...* (Match gender: interfaz is feminine).
3. **Hint 3**: "It is recommended..." -> *Se recomienda un reinicio...*

---

## Part 4: Assessment Exam

### ❓ MCQs
1. Which sentence uses the Impersonal "Se" correctly for plural nouns?
   - [ ] A. Se borró los archivos temporales.
   - [ ] B. Se borraron los archivos temporales.
   - [ ] C. Se borraron el archivo temporal.
2. Translate using True Passive: "The API was deprecated by Google."
   - [ ] A. La API deprecó Google.
   - [ ] B. La API fue deprecada por Google.
   - [ ] C. Se deprecó la API Google.
3. In technical UI text, how do you say "Files must be uploaded in PDF"?
   - [ ] A. Tú debes subir los archivos en PDF.
   - [ ] B. Los archivos subirán en PDF.
   - [ ] C. Se deben subir los archivos en formato PDF.
4. What is the grammatical gender match requirement in True Passive? (e.g., La base de datos fue...)
   - [ ] A. ...actualizado
   - [ ] B. ...actualizada
   - [ ] C. ...actualizad
5. Why is "Se rompió el entorno" preferred over "Yo rompí el entorno" in an incident report?
   - [ ] A. It's shorter.
   - [ ] B. It maintains objectivity and a blameless culture.
   - [ ] C. It uses advanced vocabulary.

### 🧪 Fill-in-the-Blanks
1. (True Passive) El código fuente ________ ________ (ser modificado) por el arquitecto.
2. (Se Impersonal - Plural) En este sprint, ________ ________ (añadir - past) nuevas funcionalidades.
3. (Se Impersonal - Singular) ________ ________ (Requerir - present) autenticación de dos factores (2FA).
4. (True Passive) Las contraseñas ________ ________ (ser encriptado - past) ayer.
5. (Se Impersonal - Future) Los servidores ________ ________ (reiniciar) a la medianoche.

### 🔍 Error Refactoring
Rewrite these informal, personal statements into objective technical writing (using Se or Passive):
1. *Nosotros creamos un nuevo endpoint.* -> 
2. *El junior introdujo un memory leak.* -> 
3. *Tú necesitas instalar las dependencias con npm.* -> 
4. *Yo cerré todos los tickets duplicados.* -> 
5. *Nosotros migraremos los datos a AWS mañana.* -> 

### 🗣️ Roleplay Short Answer
Write a brief blameless incident summary for a post-mortem. State that the production DB was dropped (eliminada) accidentally, but the data was recovered from a backup. Use "Se impersonal" and "True passive" where appropriate.

### 🏆 Model DELE C1/C2 Benchmarks
- *Durante la ventana de mantenimiento, se eliminó inadvertidamente la base de datos de producción. No obstante, el servicio fue restablecido de forma expedita debido a que los datos fueron recuperados íntegramente desde el respaldo de seguridad automático.*
*(During the maintenance window, the production database was inadvertently deleted. However, the service was rapidly restored because the data was completely recovered from the automated security backup.)*
*(Trong khung giờ bảo trì, database production đã bị xóa do sơ suất. Tuy nhiên, dịch vụ đã được khôi phục nhanh chóng nhờ dữ liệu được khôi phục hoàn toàn từ bản backup tự động.)*

### 📊 Self-Assessment Rubric
- [ ] Correctly matched singular/plural verbs with the "Se" impersonal structure.
- [ ] Correctly matched gender and number in the True Passive (Ser + Participle).
- [ ] Adopted a blameless, objective tone suitable for professional engineering docs.
- [ ] Applied C1/C2 vocabulary (restablecido, inadvertidamente, íntegramente).
