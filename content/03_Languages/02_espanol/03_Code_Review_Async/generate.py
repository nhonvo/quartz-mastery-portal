import os

topics = {
    "51": {
        "es": "Sugiriendo Refactorización de Código",
        "en": "Suggesting Code Refactoring",
        "desc": "Master the nuances of asynchronous communication when Sugiriendo Refactorización de Código in a Latin American or Spain engineering context.",
        "grammar": "Conditional (Deberíamos, Podríamos) and Subjunctive (Te sugiero que revises..., Es vital que separemos...).",
        "level_b1": ("Cambia este código porque está repetido.", "Change this code because it's repeated.", "Đổi đoạn mã này vì nó bị lặp."),
        "level_b2": ("Creo que deberías extraer esta lógica para no repetir.", "I think you should extract this logic to avoid repetition.", "Mình nghĩ bạn nên trích xuất logic này để tránh lặp lại."),
        "level_c1": ("Me parece que valdría la pena considerar una refactorización aquí, extrayendo la lógica común a un servicio base, para reducir el acoplamiento y mejorar la mantenibilidad a largo plazo.", "I think it would be worth considering a refactoring here, extracting the common logic to a base service, to reduce coupling and improve long-term maintainability.", "Tôi nghĩ đáng để cân nhắc tái cấu trúc ở đây, trích xuất logic chung vào một dịch vụ cơ sở, nhằm giảm thiểu sự liên kết và cải thiện khả năng bảo trì dài hạn."),
        "latam_es": "En LATAM, es común usar 'refactorizar' y 'probar'. En España, se prefiere 'refactorizar' pero a menudo usan 'testear' o 'hacer pruebas'.",
        "vocab": [
            ("La refactorización", "Refactoring", "Tái cấu trúc"),
            ("El acoplamiento", "Coupling", "Sự kết hợp chặt (Coupling)"),
            ("La mantenibilidad", "Maintainability", "Khả năng bảo trì"),
            ("El código heredado", "Legacy code", "Mã cũ / Legacy"),
            ("Extraer la lógica", "Extract logic", "Trích xuất logic")
        ],
        "scenario": "You are a Senior Engineer reviewing a PR with highly coupled logic and duplicated blocks. You need to suggest a refactor using the Subjunctive and Conditional."
    },
    "52": {
        "es": "Discutiendo Problemas de Rendimiento",
        "en": "Discussing Performance Issues",
        "desc": "Master the nuances of asynchronous communication when Discutiendo Problemas de Rendimiento in a Latin American or Spain engineering context.",
        "grammar": "Conditional (Deberíamos) and Subjunctive (Es importante que optimicemos...).",
        "level_b1": ("Esta consulta es muy lenta. Arréglala.", "This query is very slow. Fix it.", "Truy vấn này quá chậm. Sửa nó đi."),
        "level_b2": ("Te sugiero que optimices esta consulta a la base de datos.", "I suggest you optimize this database query.", "Tôi đề nghị bạn tối ưu hóa truy vấn cơ sở dữ liệu này."),
        "level_c1": ("Dado el volumen de datos esperado en producción, sería prudente que optimizáramos esta consulta agregando índices compuestos, mitigando así posibles cuellos de botella.", "Given the expected data volume in production, it would be prudent for us to optimize this query by adding composite indexes, thereby mitigating potential bottlenecks.", "Với khối lượng dữ liệu dự kiến trên môi trường sản xuất, chúng ta nên thận trọng tối ưu hóa truy vấn này bằng cách thêm các chỉ mục phức hợp, từ đó giảm thiểu các nút thắt cổ chai tiềm ẩn."),
        "latam_es": "LATAM: 'Desempeño' o 'rendimiento'. Spain: Preferiblemente 'rendimiento' y 'cuello de botella'.",
        "vocab": [
            ("El rendimiento", "Performance", "Hiệu suất"),
            ("El cuello de botella", "Bottleneck", "Nút thắt cổ chai"),
            ("La latencia", "Latency", "Độ trễ"),
            ("La consulta (Query)", "Query", "Truy vấn"),
            ("La carga perezosa", "Lazy loading", "Tải lười biếng (Lazy loading)")
        ],
        "scenario": "You are reviewing a PR that introduces an N+1 query problem. Suggest performance improvements smoothly."
    },
    "53": {
        "es": "Revisando Manejo de Errores",
        "en": "Reviewing Error Handling",
        "desc": "Master the nuances of asynchronous communication when Revisando Manejo de Errores in a Latin American or Spain engineering context.",
        "grammar": "Subjunctive (Es crítico que capturemos...) and Conditional.",
        "level_b1": ("Pon un try-catch aquí.", "Put a try-catch here.", "Đặt try-catch ở đây đi."),
        "level_b2": ("Deberías manejar esta excepción para que no falle.", "You should handle this exception so it doesn't fail.", "Bạn nên xử lý ngoại lệ này để nó không bị lỗi."),
        "level_c1": ("Sería ideal que implementáramos un manejo de errores más granular aquí, asegurándonos de que registremos la traza de la pila en el logger sin exponer detalles sensibles al cliente.", "It would be ideal if we implemented more granular error handling here, ensuring we log the stack trace without exposing sensitive details to the client.", "Sẽ rất lý tưởng nếu chúng ta triển khai xử lý lỗi chi tiết hơn ở đây, đảm bảo ghi log stack trace mà không làm lộ các thông tin nhạy cảm cho client."),
        "latam_es": "LATAM: 'Manejo de errores'. Spain: 'Gestión de errores'. 'Traza de la pila' (stack trace) is common in both.",
        "vocab": [
            ("El manejo de errores", "Error handling", "Xử lý lỗi"),
            ("La excepción", "Exception", "Ngoại lệ"),
            ("La traza de la pila", "Stack trace", "Dấu vết ngăn xếp (Stack trace)"),
            ("El registro / El logger", "Logging", "Ghi log"),
            ("Fallar silenciosamente", "Fail silently", "Lỗi âm thầm")
        ],
        "scenario": "A PR swallows exceptions without logging. Request proper error management in C1 Spanish."
    },
    "54": {
        "es": "Comentando sobre la Cobertura de Pruebas",
        "en": "Commenting on Test Coverage",
        "desc": "Master the nuances of asynchronous communication when Comentando sobre la Cobertura de Pruebas in a Latin American or Spain engineering context.",
        "grammar": "Conditional (Podríamos) and Subjunctive (Para que garanticemos...).",
        "level_b1": ("Faltan pruebas.", "Tests are missing.", "Thiếu bài kiểm thử rồi."),
        "level_b2": ("Te sugiero que agregues más pruebas unitarias.", "I suggest you add more unit tests.", "Tôi khuyên bạn nên thêm nhiều unit test hơn."),
        "level_c1": ("Para que garanticemos la robustez del componente, sugeriría que incrementáramos la cobertura de pruebas, contemplando tanto los casos extremos como las rutas felices.", "In order for us to guarantee the component's robustness, I would suggest we increase the test coverage, contemplating both edge cases and happy paths.", "Để đảm bảo tính mạnh mẽ của component, tôi đề xuất chúng ta nên tăng độ bao phủ kiểm thử, cân nhắc cả các trường hợp biên và các luồng chuẩn."),
        "latam_es": "LATAM: 'Casos extremos' o 'edge cases'. Spain: 'Casos límite'.",
        "vocab": [
            ("La cobertura de pruebas", "Test coverage", "Độ bao phủ kiểm thử"),
            ("Los casos límite / extremos", "Edge cases", "Các trường hợp biên"),
            ("La ruta feliz", "Happy path", "Luồng hoạt động chuẩn"),
            ("Las pruebas unitarias", "Unit tests", "Kiểm thử đơn vị"),
            ("Simular (Mockear)", "To mock", "Giả lập (Mock)")
        ],
        "scenario": "A PR adds critical billing logic but no unit tests. Kindly request them."
    },
    "55": {
        "es": "Señalando Problemas de Seguridad",
        "en": "Pointing out Security Issues",
        "desc": "Master the nuances of asynchronous communication when Señalando Problemas de Seguridad in a Latin American or Spain engineering context.",
        "grammar": "Subjunctive (Es imperativo que evitemos...) and Conditional.",
        "level_b1": ("Esto es inseguro.", "This is insecure.", "Cái này không an toàn."),
        "level_b2": ("Creo que deberías ocultar esta contraseña.", "I think you should hide this password.", "Mình nghĩ bạn nên ẩn mật khẩu này đi."),
        "level_c1": ("Es absolutamente crítico que evitemos exponer credenciales en el código fuente; te recomendaría que utilicemos variables de entorno gestionadas por nuestro bóveda de secretos.", "It is absolutely critical that we avoid exposing credentials in the source code; I would recommend we use environment variables managed by our secrets vault.", "Điều tối quan trọng là chúng ta phải tránh để lộ thông tin xác thực trong mã nguồn; tôi khuyên chúng ta nên sử dụng các biến môi trường được quản lý bởi vault lưu trữ bí mật."),
        "latam_es": "LATAM: 'Código fuente', 'Contraseñas'. Spain: 'Código fuente', 'Claves'.",
        "vocab": [
            ("La vulnerabilidad", "Vulnerability", "Lỗ hổng bảo mật"),
            ("Las credenciales expuestas", "Exposed credentials", "Thông tin xác thực bị lộ"),
            ("Las variables de entorno", "Environment variables", "Biến môi trường"),
            ("El cifrado", "Encryption", "Mã hóa"),
            ("El ataque de inyección", "Injection attack", "Tấn công injection")
        ],
        "scenario": "An engineer has hardcoded API keys into the repository. Point it out professionally."
    },
    "56": {
        "es": "Solicitando Cambios de Arquitectura",
        "en": "Requesting Architectural Changes",
        "desc": "Master the nuances of asynchronous communication when Solicitando Cambios de Arquitectura in a Latin American or Spain engineering context.",
        "grammar": "Subjunctive (Dudo que esto escale...) and Conditional.",
        "level_b1": ("La arquitectura está mal.", "The architecture is wrong.", "Kiến trúc sai rồi."),
        "level_b2": ("Creo que deberías usar otro patrón.", "I think you should use another pattern.", "Tôi nghĩ bạn nên dùng một pattern khác."),
        "level_c1": ("Me preocupa que este enfoque monolítico no escale con nuestro tráfico proyectado; valdría la pena que exploráramos un patrón orientado a eventos para desacoplar estos microservicios.", "I worry this monolithic approach won't scale with our projected traffic; it would be worth exploring an event-driven pattern to decouple these microservices.", "Tôi lo ngại rằng cách tiếp cận nguyên khối này sẽ không thể mở rộng theo lưu lượng dự kiến; có lẽ chúng ta nên khám phá mô hình hướng sự kiện (event-driven) để tách rời các microservices này."),
        "latam_es": "LATAM: 'Escalar', 'microservicios'. Spain: Igual, uso de 'desacoplar'.",
        "vocab": [
            ("La escalabilidad", "Scalability", "Khả năng mở rộng"),
            ("El patrón orientado a eventos", "Event-driven pattern", "Mô hình hướng sự kiện"),
            ("El microservicio", "Microservice", "Microservice"),
            ("El monolito", "Monolith", "Nguyên khối (Monolith)"),
            ("El diseño del sistema", "System design", "Thiết kế hệ thống")
        ],
        "scenario": "A new feature is built as a monolith but needs to be a microservice. Request the change."
    },
    "57": {
        "es": "Resolviendo Conflictos de Fusión",
        "en": "Resolving Merge Conflicts",
        "desc": "Master the nuances of asynchronous communication when Resolviendo Conflictos de Fusión in a Latin American or Spain engineering context.",
        "grammar": "Subjunctive (Antes de que fusiones...) and Conditional.",
        "level_b1": ("Tienes conflictos. Arréglalos.", "You have conflicts. Fix them.", "Bạn có conflict kìa. Sửa đi."),
        "level_b2": ("Necesitas resolver los conflictos antes de fusionar.", "You need to resolve the conflicts before merging.", "Bạn cần giải quyết các xung đột trước khi merge."),
        "level_c1": ("Noté que hay conflictos de fusión con la rama principal (main); te pediría que realices un 'rebase' interactivo para que mantengamos el historial de commits limpio antes de integrarlo.", "I noticed there are merge conflicts with the main branch; I'd ask that you perform an interactive rebase so that we keep the commit history clean before integrating it.", "Tôi nhận thấy có một số xung đột merge với nhánh main; tôi muốn nhờ bạn thực hiện rebase tương tác để giữ cho lịch sử commit gọn gàng trước khi tích hợp vào."),
        "latam_es": "LATAM: 'Fusionar' o 'hacer merge'. Spain: 'Integrar' o 'mergear' (slang).",
        "vocab": [
            ("El conflicto de fusión", "Merge conflict", "Xung đột khi gộp (Merge conflict)"),
            ("La rama principal", "Main branch", "Nhánh chính (Main branch)"),
            ("Reorganizar (Rebase)", "Rebase", "Rebase"),
            ("El historial de commits", "Commit history", "Lịch sử commit"),
            ("El árbol de trabajo", "Working tree", "Cây làm việc")
        ],
        "scenario": "A PR is blocked by complex merge conflicts. Advise the developer to rebase."
    },
    "58": {
        "es": "Aprobando Pull Requests",
        "en": "Approving Pull Requests",
        "desc": "Master the nuances of asynchronous communication when Aprobando Pull Requests in a Latin American or Spain engineering context.",
        "grammar": "Present Perfect and Subjunctive (Me alegra que hayas...).",
        "level_b1": ("Está bien. Aprobado.", "It's fine. Approved.", "Được rồi. Đã duyệt."),
        "level_b2": ("Buen trabajo. Voy a aprobar esto.", "Good job. I'm going to approve this.", "Làm tốt lắm. Tôi sẽ duyệt cái này."),
        "level_c1": ("Excelente iniciativa; me parece formidable cómo has estructurado la lógica de negocio. He aprobado el PR, siéntete libre de proceder con el despliegue cuando el pipeline termine.", "Excellent initiative; I find it formidable how you've structured the business logic. I have approved the PR, feel free to proceed with the deployment when the pipeline finishes.", "Sáng kiến tuyệt vời; tôi thấy cách bạn cấu trúc logic nghiệp vụ rất ấn tượng. Tôi đã duyệt PR, cứ thoải mái tiến hành triển khai khi pipeline chạy xong nhé."),
        "latam_es": "LATAM: 'Despliegue'. Spain: 'Pase a producción' or 'Despliegue'.",
        "vocab": [
            ("Aprobar", "To approve", "Duyệt / Chấp thuận"),
            ("La lógica de negocio", "Business logic", "Logic nghiệp vụ"),
            ("El despliegue", "Deployment", "Triển khai"),
            ("El flujo de integración (Pipeline)", "Pipeline", "Đường ống tích hợp (Pipeline)"),
            ("Pasar a producción", "Push to production", "Đưa lên môi trường production")
        ],
        "scenario": "Approve a highly complex and well-written PR, leaving an encouraging note."
    },
    "59": {
        "es": "Dejando Comentarios Constructivos",
        "en": "Leaving Constructive Comments",
        "desc": "Master the nuances of asynchronous communication when Dejando Comentarios Constructivos in a Latin American or Spain engineering context.",
        "grammar": "Conditional and Subjunctive (Quizá sea mejor que...).",
        "level_b1": ("Tu código está desordenado.", "Your code is messy.", "Mã của bạn lộn xộn quá."),
        "level_b2": ("Intenta escribir el código más limpio la próxima vez.", "Try to write cleaner code next time.", "Lần tới cố gắng viết mã sạch hơn nhé."),
        "level_c1": ("Aprecio el esfuerzo en esta entrega. Para futuras iteraciones, sería sumamente provechoso que aplicáramos los principios SOLID, en particular el de Responsabilidad Única, para evitar clases excesivamente largas.", "I appreciate the effort in this delivery. For future iterations, it would be highly beneficial if we applied SOLID principles, in particular Single Responsibility, to avoid excessively long classes.", "Tôi đánh giá cao nỗ lực trong đợt giao code này. Cho các lần lặp lại sau, sẽ rất hữu ích nếu chúng ta áp dụng các nguyên tắc SOLID, đặc biệt là Trách nhiệm Duy nhất (Single Responsibility), để tránh tạo ra các class quá dài."),
        "latam_es": "LATAM: 'Entrega' o 'Release'. Spain: 'Entrega' o 'Pase'.",
        "vocab": [
            ("Los principios SOLID", "SOLID principles", "Các nguyên tắc SOLID"),
            ("La iteración", "Iteration", "Vòng lặp / Lần lặp"),
            ("La responsabilidad única", "Single responsibility", "Trách nhiệm duy nhất"),
            ("La legibilidad", "Readability", "Khả năng đọc hiểu"),
            ("El código limpio", "Clean code", "Mã sạch (Clean code)")
        ],
        "scenario": "A junior developer submitted working but messy code. Leave a constructive, mentorship-focused review."
    },
    "60": {
        "es": "Discutiendo Deuda Técnica",
        "en": "Discussing Technical Debt",
        "desc": "Master the nuances of asynchronous communication when Discutiendo Deuda Técnica in a Latin American or Spain engineering context.",
        "grammar": "Subjunctive (A menos que paguemos...) and Conditional.",
        "level_b1": ("Hay mucha deuda técnica. Tenemos que arreglarla.", "There is a lot of tech debt. We have to fix it.", "Có quá nhiều nợ kỹ thuật. Chúng ta phải sửa thôi."),
        "level_b2": ("Deberíamos dedicar tiempo a reducir la deuda técnica.", "We should dedicate time to reducing technical debt.", "Chúng ta nên dành thời gian để giảm nợ kỹ thuật."),
        "level_c1": ("Comprendo la urgencia de lanzar la funcionalidad, pero a menos que abordemos esta deuda técnica inminente, corremos el riesgo de comprometer la estabilidad del sistema. Sugeriría que dediquemos el 20% del próximo sprint a refactorizar.", "I understand the urgency of releasing the feature, but unless we address this imminent technical debt, we risk compromising system stability. I would suggest we dedicate 20% of the next sprint to refactoring.", "Tôi hiểu sự cấp bách của việc ra mắt tính năng, nhưng trừ khi chúng ta giải quyết món nợ kỹ thuật sắp tới này, chúng ta có nguy cơ làm giảm độ ổn định của hệ thống. Tôi đề xuất dành 20% thời lượng của sprint tiếp theo để tái cấu trúc."),
        "latam_es": "LATAM: 'Deuda técnica', 'Sprint'. Spain: 'Deuda técnica', 'Sprint'.",
        "vocab": [
            ("La deuda técnica", "Technical debt", "Nợ kỹ thuật"),
            ("El sprint", "Sprint", "Sprint (Chu kỳ làm việc)"),
            ("La funcionalidad / característica", "Feature", "Tính năng"),
            ("Abordar", "To address / tackle", "Giải quyết / Bắt tay vào"),
            ("La estabilidad del sistema", "System stability", "Độ ổn định của hệ thống")
        ],
        "scenario": "Convince your Tech Lead to allocate time in the next sprint for tech debt."
    }
}

template = """# 🚀 Part 1: Resource Lesson (Deep Dive Theory)

## 🎯 Executive Summary & Objectives
**Goal**: {desc}
**Impact**: Improves technical collaboration, softens criticism, and adheres to DELE C1/C2 standards for professional communication.

## ⚙️ Contrastive Analysis & Theory
In Spanish tech culture (both LATAM and Spain), directness can sometimes be perceived as abrasive. It is crucial to use advanced grammatical structures to soften requests, provide mentorship, and handle complex technical reviews gracefully.

**Grammar Focus**: 
- {grammar}
- **LATAM vs Spain Lexical Differences**: {latam_es}

## 🛠️ Real-World Engineering Context Comparison

| Level | Phrase (ES) | English (EN) | Vietnamese (VN) |
| :--- | :--- | :--- | :--- |
| **Junior (B1)** | {b1[0]} | {b1[1]} | {b1[2]} |
| **Mid (B2)** | {b2[0]} | {b2[1]} | {b2[2]} |
| **Senior (C1/C2)** | *{c1[0]}* | *{c1[1]}* | *{c1[2]}* |

## 🎭 Role-Play Dialogue (LATAM/Spain Tech Workplace)
**Reviewer (Senior)**: Hola, he revisado tu Pull Request. En general, está muy bien estructurado. Sin embargo, en cuanto a {es_lower}, *{c1[0]}*
**Author (Junior)**: ¡Hola! Gracias por la revisión detallada. Entiendo perfectamente. ¿Crees que esto nos tome mucho esfuerzo en el sprint actual?
**Reviewer (Senior)**: No necesariamente. Si abstraemos bien los componentes, *podríamos* lograrlo sin comprometer el pase a producción.

## 📚 Bilingual Technical Vocabulary

| Spanish (ES) | English (EN) | Vietnamese (VN) |
| :--- | :--- | :--- |
{vocab_table}

## 🚫 Common Anti-Patterns
- **Direct Commands**: Using imperative instead of conditional or subjunctive.
- **Literal Translation**: Using Spanglish terms indiscriminately when correct Spanish tech jargon exists.
- **Lack of Empathy**: Failing to acknowledge the effort before suggesting changes.

---

# 🚀 Part 2: Practice Workspace

## 📝 Scenario & Context
{scenario}

## ✍️ User Practice Area
*(Write your response below)*
> 
> 

## 💡 Progressive Socratic Hints
1. **Lexical**: Incorporate C1/C2 vocabulary from the table above.
2. **Grammar**: Use at least one Subjunctive phrase (e.g., *Te recomendaría que...*).
3. **Tone**: Start with positive acknowledgment before critiquing.

---

# 🚀 Part 3: Assessment Exam

## ❓ MCQs
1. Which is the most appropriate way to suggest a change professionally (C1/C2)?
   - [ ] A) {b1[0]}
   - [ ] B) {b2[0]}
   - [ ] C) *{c1[0]}*

2. How do you translate "{vocab[0][1]}"?
   - [ ] A) El código
   - [ ] B) *{vocab[0][0]}*
   - [ ] C) La computadora

3. Which grammar structure best softens a command?
   - [ ] A) Imperative (¡Hazlo!)
   - [ ] B) Present (Lo haces)
   - [ ] C) *Conditional (Lo harías)*

4. Choose the best translation for "{vocab[1][1]}":
   - [ ] A) *{vocab[1][0]}*
   - [ ] B) La prueba
   - [ ] C) La conexión

5. LATAM vs Spain: In Spain, "deploy" is often referred to as "Pase a producción". What is commonly used in LATAM?
   - [ ] A) La subida
   - [ ] B) *El despliegue*
   - [ ] C) El empuje

## 🧪 Fill-in-the-Blanks
*(Fill in the correct Subjunctive or Conditional verb)*
1. Es crítico que nosotros __________ (optimizar - Subjuntivo) este flujo.
2. Yo __________ (sugerir - Condicional) revisar la documentación exhaustivamente.
3. Te recomiendo que __________ (utilizar - Subjuntivo) variables de entorno.
4. ¿Crees que esto __________ (afectar - Subjuntivo) la arquitectura?
5. Valdría la pena que __________ (separar - Imperfecto de Subjuntivo) la lógica.

## 🔍 Error Refactoring
Rewrite these blunt B1 comments into polished C1/C2 Spanish:
1. *Este código es lento.* -> _________________________
2. *Arregla este bug.* -> _________________________
3. *No uses esta librería.* -> _________________________
4. *El PR está mal.* -> _________________________
5. *Haz una prueba.* -> _________________________

## 🗣️ Roleplay Short Answer
Reply to the following PR comment from a Junior Dev: "No estoy seguro de cómo implementar esto aquí. ¿Me ayudas?"
**Your Response (Senior)**:
> 

## 🏆 Model DELE C1/C2 Benchmarks
*"Hola. Comprendo perfectamente tu duda; es una implementación compleja. Lo ideal sería que nos reuniéramos 10 minutos para hacer 'pair programming'. De esta forma, consolidamos la arquitectura y evitamos retrabajos. Avísame cuándo estés disponible."*

## 📊 Self-Assessment Rubric
- [ ] Did I use the Subjunctive mood for suggestions?
- [ ] Did I avoid direct imperatives?
- [ ] Is my vocabulary technically accurate for LATAM/Spain?
- [ ] Did I use the Conditional to soften my tone?
- [ ] Are Vietnamese translations understood correctly in context?

"""

for num, data in topics.items():
    vocab_table = ""
    for v_es, v_en, v_vn in data["vocab"]:
        vocab_table += f"| {v_es} | {v_en} | {v_vn} |\n"
    
    content = template.format(
        desc=data["desc"],
        grammar=data["grammar"],
        latam_es=data["latam_es"],
        b1=data["level_b1"],
        b2=data["level_b2"],
        c1=data["level_c1"],
        es_lower=data["es"].lower(),
        vocab_table=vocab_table.strip(),
        scenario=data["scenario"],
        vocab=data["vocab"]
    )
    
    filename = f"{num}.-Part-1-Resource-Lesson-Deep-Dive-Theory.md"
    filepath = os.path.join(r"D:\learning\03_Languages\02_espanol\03_Code_Review_Async", filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Written {filepath}")
