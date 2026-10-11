---
title: "\ude80 Part 1: Resource Lesson (Deep Dive Theory)"
category: "03_Code_Review_Async"
tags: ["espanol","spanish-communication","dele-b2-c1","languages","learning-note"]
language: "espanol"
type: "resource-lesson"
---

# 🚀 Part 1: Resource Lesson (Deep Dive Theory)

## 🎯 Executive Summary & Objectives
**Goal:** Effectively suggest and discuss software Design Patterns (Patrones de Diseño) and structural improvements in a codebase using professional Spanish.
**Engineering Impact:** Elevates codebase maintainability (mantenibilidad) and ensures the team adheres to SOLID principles and clean code practices.

## ⚙️ Contrastive Analysis & Theory
When introducing abstract concepts like design patterns, vocabulary precision is key. Use terms like **acoplamiento** (coupling) and **cohesión** (cohesion). We use the subjunctive mood with verbs of suggestion (sugerir, recomendar) to propose architectural changes.
- *Structure:* Recomiendo que + [Subjuntivo]
- *Example:* Te **sugiero que separemos** (Subjunctive) esta lógica. (I suggest we separate this logic.)
- *Passive alternative:* **Sería recomendable** extraer esto a una clase base. (It would be advisable to extract this to a base class.)

## 🛠️ Real-World Engineering Context Comparison
| Level | Feedback Style | Spanish Phrasing (ES) | English (EN) | Vietnamese (VN) |
|---|---|---|---|---|
| **Junior (B1)** | Code-centric | Haz una clase nueva para esto. | Make a new class for this. | Tạo một class mới cho cái này. |
| **Mid (B2)** | Principle-centric | Esto viola SOLID. Deberíamos usar inyección de dependencias. | This violates SOLID. We should use dependency injection. | Cái này vi phạm SOLID. Chúng ta nên dùng dependency injection. |
| **Senior (C1/C2)** | Architecture-centric | Para reducir el fuerte acoplamiento y facilitar el testing, te sugiero que implementemos el patrón Factory aquí. ¿Cómo lo ves? | To reduce tight coupling and ease testing, I suggest we implement the Factory pattern here. How do you see it? | Để giảm sự phụ thuộc chặt chẽ và dễ test hơn, tôi đề xuất áp dụng Factory pattern ở đây. Bạn thấy sao? |

## 🎭 Role-Play Dialogue (LATAM/Spain Context)
**Dev A (Author):** He terminado el controlador. Ahora maneja la validación, el guardado en base de datos y el envío de correos. *(I finished the controller. It now handles validation, DB saving, and email sending. / Tôi đã hoàn thành controller. Hiện tại nó xử lý validation, lưu vào DB, và gửi email.)*
**Dev B (Reviewer):** Excelente progreso. Sin embargo, noté que la clase tiene **múltiples responsabilidades**. **Para cumplir con** el Principio de Responsabilidad Única (SRP), **¿qué opinas de** extraer la lógica de correos a un servicio dedicado usando el patrón Observer o una cola de mensajes? *(Excellent progress. However, I noticed the class has multiple responsibilities. To comply with SRP, what do you think about extracting the email logic to a dedicated service using the Observer pattern or a message queue? / Tiến độ xuất sắc. Tuy nhiên, tôi nhận thấy class này có quá nhiều trách nhiệm. Để tuân thủ nguyên tắc SRP, bạn nghĩ sao về việc tách logic email ra một service riêng biệt bằng cách dùng Observer pattern hoặc message queue?)*
**Dev A:** Es un buen punto. La clase quedó muy grande (God Class). Procederé a desacoplar los servicios. *(Good point. The class became a God Class. I will proceed to decouple the services. / Ý kiến hay. Class này đã trở thành God Class rồi. Tôi sẽ tiến hành phân tách các service.)*

## 📚 Bilingual Technical Vocabulary
| Español (ES) | English (EN) | Tiếng Việt (VN) |
|---|---|---|
| Patrones de diseño | Design patterns | Design patterns (Mẫu thiết kế) |
| Acoplamiento (fuerte/débil) | Coupling (tight/loose) | Sự phụ thuộc (chặt/lỏng) |
| Inyección de dependencias | Dependency injection (DI) | Dependency injection (Tiêm phụ thuộc) |
| Mantenibilidad | Maintainability | Khả năng bảo trì |
| Refactorizar | To refactor | Refactor (Tái cấu trúc mã) |

## 🚫 Common Anti-Patterns
- **Native Speaker Mistake:** Using Spanglish unnecessarily (e.g., "Hagamos un decouple") when strong technical terms exist in Spanish ("Desacoplemos").
- **Non-Native Mistake:** Failing to use the subjunctive after "recomiendo que". "Recomiendo que usas" (Incorrect) vs "Recomiendo que **uses**" (Correct).

---

# 💻 Part 2: Practice Workspace

## Scenario & Context
You are reviewing a class that instantiates its own dependencies internally rather than receiving them via the constructor (violating Dependency Inversion). Propose using Dependency Injection.

## User Practice Area
> [!NOTE] Write your PR comment in Spanish here:
```markdown
// Your Spanish PR comment goes here...
```

## Progressive Socratic Hints
- *Hint 1:* Identify the problem: "Veo que estamos instanciando la base de datos dentro de la clase..."
- *Hint 2:* State the consequence: "...lo cual aumenta el acoplamiento y dificulta los tests unitarios."
- *Hint 3:* Propose the pattern: "Te sugiero que inyectemos esta dependencia por el constructor (Inyección de Dependencias)."

---

# 📝 Part 3: Assessment Exam

## ❓ MCQs
1. How do you say "Loose coupling" in Spanish?
   - [ ] A. Pareja suelta
   - [ ] B. **Bajo acoplamiento / Acoplamiento débil**
   - [ ] C. Conexión libre

2. Complete the sentence grammatically: "Recomiendo que ________ (nosotros, usar) el patrón Singleton."
   - [ ] A. usamos
   - [ ] B. **usemos**
   - [ ] C. usar

3. Which phrase is best used to propose a new architecture pattern gently?
   - [ ] A. Tienes que usar el patrón Factory.
   - [ ] B. **Sería recomendable que implementemos el patrón Factory.**
   - [ ] C. El patrón Factory es obligatorio aquí.

4. How do you translate "Dependency Injection" in a Spanish tech environment?
   - [ ] A. **Inyección de Dependencias**
   - [ ] B. Insertar dependencias
   - [ ] C. Dependencias inyectadas

5. What is the LATAM vs Spain difference for "computer/server" often referenced in architecture?
   - [ ] A. **ordenador (Spain) vs computadora (LATAM)**
   - [ ] B. computadora (Spain) vs ordenador (LATAM)
   - [ ] C. PC (both)

## 🧪 Fill-in-the-Blanks
1. Extraer esta lógica mejorará la ________ (maintainability) del proyecto a largo plazo.
   *(Answer: mantenibilidad)*
2. Para aplicar el principio SRP, debemos evitar tener una clase con múltiples ________ (responsibilities).
   *(Answer: responsabilidades)*
3. Para reducir el fuerte ________ (coupling), sugiero usar interfaces.
   *(Answer: acoplamiento)*
4. Sería recomendable que ________ (nosotros, separar - subjunctive) la lógica de negocio de la vista.
   *(Answer: separemos)*
5. Esto nos ayudará a mantener una alta ________ (cohesion) en los módulos.
   *(Answer: cohesión)*

## 🔍 Error Refactoring
1. *Refactor this comment into professional C1 Spanish applying SRP:*
"Tu clase hace de todo. Sepárala en partes."
-> *Suggested:* "Actualmente la clase tiene demasiadas responsabilidades (violación de SRP). Sería muy beneficioso extraer esta lógica en servicios separados para reducir el acoplamiento."

2. *Refactor this comment:* "Recomiendo que cambias esto porque es un God Class."
-> *Suggested:* "Sugiero que cambiemos esta estructura, ya que actualmente se asemeja a una God Class, lo cual dificulta el mantenimiento a largo plazo."

3. *Refactor this comment:* "El acoplamiento es muy fuerte. Hazlo débil."
-> *Suggested:* "Para reducir el fuerte acoplamiento actual, sería recomendable abstraer estas dependencias usando interfaces (Inversión de Dependencias)."

4. *Refactor this comment:* "Usa inyección de dependencias para los tests."
-> *Suggested:* "¿Qué te parece si utilizamos inyección de dependencias por el constructor? Esto facilitará enormemente la creación de mocks para las pruebas unitarias."

5. *Refactor this comment:* "Es mejor usar el patrón Singleton aquí."
-> *Suggested:* "Dado que solo necesitamos una única instancia en todo el ciclo de vida de la aplicación, considerar la implementación del patrón Singleton podría ser la solución más eficiente."

## 🗣️ Roleplay Short Answer
Propose using the "Strategy" pattern for a switch statement that is getting too long.
*Your Answer (Spanish):* ___________________

## 🏆 Model DELE C1/C2 Benchmarks
**Senior Technical Lead Model:**
"Noté que la creación de objetos está fuertemente acoplada a las implementaciones concretas en este método. Para hacer el código más extensible y facilitar las pruebas unitarias, sugeriría que apliquemos el patrón Factory (o Inyección de Dependencias) para delegar esta responsabilidad. ¿Cómo lo ves?"

## 📊 Self-Assessment Rubric
- [ ] Did I use correct subjunctive verbs for suggestions?
- [ ] Did I correctly use terms like "acoplamiento" or "cohesión"?
- [ ] Is the tone collaborative and focused on long-term code health?
