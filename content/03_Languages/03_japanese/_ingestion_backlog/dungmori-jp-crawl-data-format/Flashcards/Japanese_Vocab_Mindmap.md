---


title: Sơ Đồ Cấu Trúc Từ Vựng & Ngữ Pháp Tiếng Nhật Sơ Cấp (N5 - N4 Mindmap)
category: Languages - Japanese Sơ Cấp
tags: [japanese, n5, n4, mindmap, vocab, grammar-architecture, particles, verb-conjugation, languages, learning-note]
---

# 🗺️ Sơ Đồ Cấu Trúc Từ Vựng & Ngữ Pháp Tiếng Nhật Sơ Cấp (N5 - N4 Mindmap)

- 🔗 Related Patterns: [[03_Languages/03_japanese/dungmori-jp-crawl-data-format/Flashcards/01_Flashcards_N5|Flashcards N5]] | [[03_Languages/03_japanese/dungmori-jp-crawl-data-format/Flashcards/02_Flashcards_N4|Flashcards N4]]

---

## 1. Bản Đồ Tổng Quan Hệ Thống Từ Vựng & Ngữ Pháp Sơ Cấp

```mermaid
mindmap
  root((Hệ Thống Tiếng Nhật Sơ Cấp))
    Từ Loại (Từ Vựng N5 - N4)
      Danh từ: Đời sống, Trường học, Công nghệ, Thời gian, Địa điểm
      Động từ: Nhóm 1 (五段), Nhóm 2 (一段), Nhóm 3 (不規則: する/来る)
      Tính từ: Tính từ đuôi い (い形容詞), Tính từ đuôi な (な形容詞)
      Trạng từ: Tần suất, Mức độ, Trạng thái (きっと, ずっと, なかなか, ぜひ)
    Hệ Thống Trợ Từ (助詞 - Particles)
      Trợ từ chủ đề & chủ ngữ: は (Chủ đề / Tương phản), が (Chủ ngữ mới / Tiêu điểm)
      Trợ từ đối tượng & đích đến: を (Tác động), に (Thời gian / Đích đến / Tồn tại), へ (Phương hướng)
      Trợ từ phương tiện & địa điểm: で (Nơi diễn ra hành động / Phương tiện)
      Trợ từ liên kết: と (Và / Cùng với), や (Liệt kê không đầy đủ), から / まで (Từ / Đến)
    Hệ Thống Biến Đổi Động Từ (動詞の活用)
      Thể て (Te): Sai khiến, Nối câu, Đang diễn ra (~ている)
      Thể ない (Nai): Phủ định, Cấm đoán (~ないでください), Bắt buộc (~なければならない)
      Thể た (Ta): Quá khứ, Kinh nghiệm (~たことがある)
      Thể Khả năng (可能形): Có thể làm (~ことができる / ~られる)
      Thể Điều kiện (ば形 / たら): Nếu (~ば, ~たら)
      Thể Ý chí (意向形): Rủ rê, Dự định (~ようと思う)
      Thể Bị động & Sai khiến (受身・使役): Bị/Được (~られる), Bắt/Cho phép (~させる)
```

---

## 2. Lưu Đồ Biến Đổi 7 Thể Động Từ Cốt Lõi (N5 - N4 Verb Conjugation Flowchart)

```mermaid
flowchart TD
    Verb["Động từ dạng từ điển (辞書形)"] --> Group{"Xác định nhóm động từ"}
    
    Group -- "Nhóm 1 (Đuôi -u: 書く, 飲む, 行く)" --> G1["Chuyển âm hàng u:<br/>- Thể Masu: u -> i (書き・飲み)<br/>- Thể Nai: u -> a + nai (書かない・飲まない)<br/>- Thể Khả năng: u -> e + ru (書ける・飲める)<br/>- Thể Điều kiện: u -> e + ba (書けば・飲めば)<br/>- Thể Ý chí: u -> ou (書こう・飲もう)"]
    
    Group -- "Nhóm 2 (Đuôi -eru / -iru: 食べる, 見る)" --> G2["Bỏ đuôi る (ru):<br/>- Thể Masu: 食べます・見ます<br/>- Thể Nai: 食べない・見ない<br/>- Thể Te/Ta: 食べて/食べた<br/>- Thể Khả năng: 食べられる・見られる<br/>- Thể Điều kiện: 食べれば・見れば"]
    
    Group -- "Nhóm 3 (Bất quy tắc)" --> G3["Học thuộc lòng:<br/>- する -> します / しない / して / できる / すれば / しよう<br/>- 来る(くる) -> きます / こない / きて / こられる / くれば / こよう"]
```

---

## 3. Lưu Đồ Phân Biệt Các Cặp Trợ Từ Dễ Nhầm Lẫn

### 3.1 Phân Biệt Trợ Từ 「は」 và 「が」

```mermaid
flowchart TD
    Start["Xác định câu có は hay が"] --> Q1{"Thông tin nào là TRỌNG TÂM của câu?"}
    Q1 -- "Vị ngữ phía sau là trọng tâm (Thông tin mới ở sau)" --> WA["Dùng は (Chủ đề đã biết)<br/>Ví dụ: 私はエンジニアです。<br/>(Tôi thì... là kỹ sư)"]
    Q1 -- "Chủ ngữ phía trước là trọng tâm (Ai/Cái gì làm?)" --> GA["Dùng が (Tiêu điểm ở chủ ngữ)<br/>Ví dụ: だれが来ましたか。-> 田中さんが来ました。<br/>(Chính anh Tanaka là người đã đến)"]
    Start --> Q2{"Hiện tượng tự nhiên khách quan trước mắt?"}
    Q2 -- "Có (Mưa rơi, Tuyết rơi)" --> GA2["Dùng が<br/>Ví dụ: 雨が降っています。/ 花が咲きました。"]
```

---

### 3.2 Phân Biệt Trợ Từ 「に」 và 「で」

```mermaid
flowchart TD
    Check["Xác định dùng に hay で"] --> Act{"Loại hành động / Trạng thái?"}
    Act -- "Hành động có chủ đích diễn ra tại địa điểm" --> DE1["Dùng で<br/>Ví dụ: 会社で仕事をします。(Làm việc tại công ty)"]
    Act -- "Sự tồn tại tĩnh (ở/có tại đâu)" --> NI1["Dùng に (いる/ある/住む)<br/>Ví dụ: ハノイに住んでいます。(Sống ở Hà Nội)"]
    Act -- "Thời gian có con số cụ thể" --> NI2["Dùng に<br/>Ví dụ: 8時に会議が始まります。(8h bắt đầu họp)"]
    Act -- "Phương tiện, công cụ thực hiện" --> DE2["Dùng で<br/>Ví dụ: パソコンでコードを書きます。(Viết code bằng máy tính)"]
```

---

## 4. Ma Trận Ngữ Pháp Trọng Điểm N5 - N4 Dành Cho Kỹ Sư IT

| Mẫu Ngữ Pháp | Cấu Trúc | Ý Nghĩa & Ngữ Cảnh Sử Dụng | Ví Dụ Kỹ Thuật IT Minh Họa |
| :--- | :--- | :--- | :--- |
| **〜てから (Te kara)** | $V_{\text{te}} + \text{から}$ | Sau khi làm V1 thì làm tiếp V2 | *"テストを実行し**てから**、本番環境へデプロイします。"* (Sau khi chạy test xong mới deploy lên production). |
| **〜ほうがいい (Hou ga ii)** | $V_{\text{ta}} / V_{\text{nai}} + \text{ほうがいい}$ | Lời khuyên nên / không nên làm gì | *"データベースのバックアップを取っ**たほうがいい**です。"* (Nên sao lưu cơ sở dữ liệu thì hơn). |
| **〜ことができる (Koto ga dekiru)** | $V_{\text{dictionary}} + \text{ことができる}$ | Diễn tả khả năng có thể làm gì | *"このAPIは1秒間に1万リクエストを処理する**ことができます**。"* (API này có thể xử lý 10,000 req/s). |
| **〜なければならない (Nakereba naranai)** | $V_{\text{nai}} \to \text{なければならない}$ | Bắt buộc phải làm gì (Quy chuẩn) | *"セキュリティ規程に従わ**なければなりません**。"* (Bắt buộc phải tuân thủ quy chuẩn bảo mật). |
| **〜てもいい (Te mo ii)** | $V_{\text{te}} + \text{もいい}$ | Xin phép / Được phép làm gì | *"ステージング環境でテストし**てもいい**ですか。"* (Tôi có thể test trên staging được không?). |
| **〜てはいけない (Te wa ikenai)** | $V_{\text{te}} + \text{はいけない}$ | Cấm đoán không được làm gì | *"本番サーバーで直接ファイルを編集し**てはいけません**。"* (Tuyệt đối không được sửa file trực tiếp trên production server). |
| **〜ようと思う (You to omou)** | $V_{\text{volitional}} + \text{と思う}$ | Dự định, ý chí của bản thân | *"来週からDockerの勉強を始め**ようと思います**。"* (Tôi dự định tuần sau bắt đầu học Docker). |

---

## 5. Thẻ Ghi Nhớ & Tagging Obsidian Cho Spaced Repetition

Khi ôn tập qua Obsidian Flashcards:
- `#japanese/grammar/n5/te_form`: Thể て dùng để nối câu, sai khiến (`〜てください`), đang diễn ra (`〜ています`).
- `#japanese/grammar/n5/nai_form`: Thể ない dùng cho cấm đoán (`〜ないで`), bắt buộc (`〜なければならない`).
- `#japanese/grammar/n4/potential`: Thể khả năng chuyển đuôi hàng `u $\to$ e + ru` (Nhóm 1) hoặc `bỏ ru + rareru` (Nhóm 2).
- `#japanese/grammar/n4/conditional`: Mẫu `〜たら` dùng cho điều kiện xảy ra trong tương lai hoặc giả định.
- `#japanese/particles/wa_vs_ga`: `は` nhấn mạnh vị ngữ phía sau; `が` nhấn mạnh chủ ngữ phía trước hoặc hiện tượng tự nhiên.
