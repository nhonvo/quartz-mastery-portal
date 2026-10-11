---
title: "19. Relative Pronouns (Pronombres Relativos)"
category: "01_Technical_Grammar"
tags: ["espanol","spanish-communication","dele-b2-c1","languages","learning-note"]
language: "espanol"
type: "resource-lesson"
---

# 19. Relative Pronouns (Pronombres Relativos)

## Part 1: Resource Lesson (Deep Dive Theory)

### 🎯 Executive Summary & Objectives
**Goal**: Master relative pronouns (*que*, *quien*, *el cual*, *cuyo*, *lo que*) to connect complex ideas and write sophisticated technical specifications, documentation, and architectural proposals.
**Engineering Impact**: Senior engineers don't write entirely in simple sentences. Instead of saying "The bug is fixed. The bug caused the outage," they write, "The bug *that* caused the outage, *which* was reported yesterday, has been fixed." Mastering relative pronouns elevates your Spanish from basic to C1/C2 professional fluency.

### ⚙️ Contrastive Analysis & Theory
Relative pronouns connect a dependent clause to a main clause, referring back to a noun (the antecedent).

1. **Que (That, Which, Who)**: The most common. Used for people and things. NEVER omit it in Spanish (unlike English "The book [that] I read").
2. **Quien / Quienes (Who, Whom)**: Used ONLY for people, typically after a preposition (a, de, con) or commas.
3. **El que / El cual / Los cuales (Which, Who)**: Formal. Used after prepositions or to clarify ambiguity. "El cual" is heavily used in formal technical writing (RFCs, patents).
4. **Cuyo / Cuya (Whose)**: Expresses possession. Agrees in gender/number with the noun it modifies, NOT the owner.
5. **Lo que / Lo cual (Which, What)**: Refers to an abstract idea, a situation, or a previous concept (not a specific noun).

### 🛠️ Real-World Engineering Context Comparison
| Scenario | Junior / Non-Native (Choppy sentences) | Senior (B1/B2) (Basic Relatives) | Tech Lead (C1/C2) (Nuanced Relatives) | LATAM vs Spain Lexical Callouts |
| :--- | :--- | :--- | :--- | :--- |
| **Describing an Architecture** | Usamos un servidor. El servidor es rápido. / *Chúng ta dùng một server. Server đó nhanh.* | Usamos un servidor que es muy rápido. / *Chúng ta dùng một server rất nhanh.* | Implementamos una capa de caché, la cual reduce drásticamente la latencia de lectura. / *Chúng ta triển khai một tầng cache, cái mà giảm đáng kể độ trễ đọc.* | LATAM & Spain: *capa* (layer). |
| **Referencing a Concept** | Falló la red. Eso causó problemas. / *Mạng bị lỗi. Điều đó gây ra vấn đề.* | Falló la red, lo que causó problemas. / *Mạng bị lỗi, điều đó gây ra vấn đề.* | Experimentamos una partición de red, lo cual desencadenó una cascada de fallos. / *Chúng ta gặp tình trạng phân vùng mạng, điều này kích hoạt một chuỗi lỗi dây chuyền.* | Spain: *fallos*. LATAM: *fallas*. |
| **Possession / Dependencies** | El cliente tiene una API. La API es lenta. / *Khách hàng có một API. API đó chậm.* | El cliente cuya API es lenta se quejó. / *Khách hàng có API chậm đã phàn nàn.* | El proveedor externo, cuya latencia excede los SLAs acordados, será reemplazado. / *Nhà cung cấp bên ngoài, có độ trễ vượt mức SLA thỏa thuận, sẽ bị thay thế.* | Spain & LATAM: *SLA (Acuerdo de Nivel de Servicio)*. |

### 🎭 Role-Play Dialogue (LATAM Tech Workplace)
**Context**: A system design review discussing an external vendor dependency.

**Carla (Architect)**: Necesitamos auditar al proveedor de pagos **con el cual** (with whom/which) estamos integrados. La API **que** (that) nos proveen es inestable, **lo que** (which) está afectando el checkout.
*(We need to audit the payment provider with whom we are integrated. The API that they provide is unstable, which is affecting checkout.)*
*(Chúng ta cần kiểm toán nhà cung cấp thanh toán mà chúng ta đang tích hợp. API mà họ cung cấp không ổn định, điều này đang ảnh hưởng đến checkout.)*

**Mateo (Backend Dev)**: Estoy de acuerdo. El desarrollador **cuyo** (whose) código maneja la integración ya no está en la empresa.
*(I agree. The developer whose code handles the integration is no longer with the company.)*
*(Tôi đồng ý. Lập trình viên có code xử lý phần tích hợp đó không còn làm ở công ty nữa.)*

**Carla**: Exacto. Esa es la razón **por la que** (for which / why) debemos reescribir ese módulo desde cero.
*(Exactly. That is the reason why we must rewrite that module from scratch.)*
*(Chính xác. Đó là lý do tại sao chúng ta phải viết lại module đó từ đầu.)*

### 📚 Bilingual Technical Vocabulary
| Español (ES) | English (EN) | Tiếng Việt (VN) |
| :--- | :--- | :--- |
| Lo que / Lo cual | Which (abstract) | Điều mà / Cái mà |
| El cual / La cual | Which (formal) | Cái mà |
| Cuyo / Cuya | Whose | Của (Sở hữu) |
| Desde cero | From scratch | Từ đầu |
| Desencadenar | To trigger | Kích hoạt / Gây ra |

### 🚫 Common Anti-Patterns
- **Mistake**: *La base de datos (omitted "que") uso es PostgreSQL.* (Direct translation of "The database I use...").
- **Correction**: *La base de datos **que** uso es PostgreSQL.*
- **Why**: "Que" can NEVER be omitted in Spanish, even if "that" or "which" is omitted in English.

---

## Part 2: Practice Workspace

### Scenario & Context
You are writing technical documentation for a new microservice. You need to combine these three choppy sentences into one professional, flowing C1-level sentence:
1. We created a new service.
2. The service handles authentication.
3. The service's (whose) response time is under 10ms, WHICH improves UX.

### User Practice Area
*(Write your response in Spanish here...)*

### Progressive Socratic Hints
1. **Hint 1**: "We created a new service THAT handles..." -> *Creamos un nuevo servicio que maneja...*
2. **Hint 2**: "whose response time" -> *cuyo tiempo de respuesta*.
3. **Hint 3**: "WHICH improves" (referring to the whole idea of 10ms) -> *lo cual / lo que mejora*.

---

## Part 4: Assessment Exam

### ❓ MCQs
1. Why is "El script modifiqué ayer falló" grammatically incorrect?
   - [ ] A. "Modifiqué" is the wrong tense.
   - [ ] B. The relative pronoun "que" cannot be omitted.
   - [ ] C. It should be "lo que".
2. "La empresa ________ API usamos nos cobró de más." (Whose API).
   - [ ] A. que
   - [ ] B. quien
   - [ ] C. cuya
3. "El servidor se cayó, ________ causó pánico." (Referring to the whole situation).
   - [ ] A. lo que / lo cual
   - [ ] B. el cual
   - [ ] C. que
4. When referring to a person after a preposition (e.g., "The manager to WHOM I spoke"), you use:
   - [ ] A. que
   - [ ] B. quien
   - [ ] C. cuyo
5. Translate: "The framework, which is open-source, is very popular."
   - [ ] A. El framework, que es open-source, es muy popular.
   - [ ] B. El framework es open-source, lo cual es muy popular.
   - [ ] C. El framework cuyo open-source es muy popular.

### 🧪 Fill-in-the-Blanks
1. La librería ________ (que/quien) usamos está desactualizada.
2. El ingeniero ________ (cuyo/cuya) código revisé es muy talentoso. (Hint: "código" is masculine).
3. Hubo un fallo en la red, ________ (lo que/el cual) detuvo el pipeline. (Abstract situation).
4. El equipo con ________ (el que / quien) trabajo está en Madrid.
5. Estos son los servidores en ________ (los cuales / lo que) desplegaremos.

### 🔍 Error Refactoring
Combine/Fix these sentences using relative pronouns:
1. *El bug yo arreglé era crítico.* -> 
2. *Usamos Docker. Docker aísla las dependencias.* -> 
3. *El cliente tiene un servidor. El servidor es viejo.* -> 
4. *El PR fue aprobado. Eso me hace feliz.* -> 
5. *Conocí al desarrollador. Su (whose) base de datos fue hackeada.* -> 

### 🗣️ Roleplay Short Answer
Write a brief sentence in a pull request explaining that you removed a dependency, WHICH was causing conflicts, and THAT the new approach, WHOSE performance is better, is now ready.

### 🏆 Model DELE C1/C2 Benchmarks
- *He eliminado la dependencia heredada, la cual estaba causando conflictos de resolución; el nuevo enfoque, cuyo rendimiento ha sido validado empíricamente, está listo para revisión.*
*(I have removed the legacy dependency, which was causing resolution conflicts; the new approach, whose performance has been empirically validated, is ready for review.)*
*(Tôi đã loại bỏ thư viện cũ, cái mà đang gây ra xung đột phiên bản; phương pháp tiếp cận mới, có hiệu suất đã được xác thực thực tế, hiện đã sẵn sàng để review.)*

### 📊 Self-Assessment Rubric
- [ ] Never omitted "que".
- [ ] Correctly used "cuyo/cuya" agreeing with the possessed noun.
- [ ] Used "lo que / lo cual" for abstract concepts/situations.
- [ ] Demonstrated C1/C2 syntactic complexity in technical descriptions.
