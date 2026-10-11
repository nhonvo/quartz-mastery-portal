---


title: Japanese IT Keigo Practice Drills & Code Review Exercises
category: Languages - Japanese Technical Communication
tags: [japanese, keigo-drills, sonkeigo, kenjougo, business-japanese, uchi-soto, exercises, languages, learning-note]
---

# 💻 Japanese IT Keigo Practice Drills & Code Review Exercises

- 🔗 Related Patterns: [[03_Languages/03_japanese/01_Japanese_Business/01_keigo_qa|Keigo Q&A Bank]] | [[03_Languages/03_japanese/01_Japanese_Business/01_keigo_exam|Keigo Assessment Exam]]

---

## 🛠️ Drill Set 1: Sonkeigo vs. Kenjougo Verb Transformations

### Exercise 1.1: Contextual Verb Selection
Choose the correct Keigo verb form depending on whether the action is performed by the **Client / Listener (Sonkeigo - 尊敬語)** or the **Speaker / In-Group Engineer (Kenjougo - 謙譲語)**.

1. クライアントの田中様が仕様書を（拝見しました / ご覧になりました）。
2. 弊社の開発者が昨日のプルリクエストを（拝見いたしました / ご覧になりました）。
3. 明日のアーキテクチャ設計会議には、弊社のテックリードが（いらっしゃいます / 伺います / 参ります）。
4. 先ほどお客様が（申された / おっしゃった）要件について、確認させていただきたく存じます。
5. 貴社から（いただいた / 差し上げた）APIキーを使用してテストを実行いたしました。
6. このマイクロサービスの障害原因について、すでに（存じ上げております / ご存じでいらっしゃいますか）。

<details><summary>🔍 Solutions & Explanations (Drill Set 1)</summary>

1. **ご覧になりました** (Tanaka-sama is client $\to$ Sonkeigo).
2. **拝見いたしました** (Our developer is in-group $\to$ Kenjougo).
3. **参ります** (or **伺います**) (Our tech lead is in-group visiting client $\to$ Kenjougo).
4. **おっしゃった** (Client's statement $\to$ Sonkeigo).
5. **いただいた** (Received from client $\to$ Kenjougo).
6. **ご存じでいらっしゃいますか** (Asking about client's knowledge $\to$ Sonkeigo).
</details>

---

## 🛠️ Drill Set 2: Uchi/Soto (内と外) Error Correction

### Exercise 2.1: Fixing In-Group Honorific Mistakes
Identify the honorific mistake in each sentence spoken by a software engineer to an external Japanese client, and provide the correct corporate phrasing.

1. ❌ *"弊社の山田社長様が、来週貴社にいらっしゃいます。"*  
   - **Correction**: __________________________________________________
2. ❌ *"先ほど、弊社のエンジニアのNguyenさんが仕様書をご覧になりました。"*  
   - **Correction**: __________________________________________________
3. ❌ *"了解しました。すぐにDBを再起動します。"*  
   - **Correction**: __________________________________________________
4. ❌ *"御社のサーバーが落ちたので、私たちが直してあげました。"*  
   - **Correction**: __________________________________________________

<details><summary>🔍 Solutions & Explanations (Drill Set 2)</summary>

1. **Correct**: *"弊社の社長の山田が、来週貴社に**伺います（参ります）**。"*  
   *(Rule: Never attach '様' or use Sonkeigo 'いらっしゃる' for your own CEO in front of clients).*
2. **Correct**: *"先ほど、弊社のエンジニアのNguyenが仕様書を**拝見いたしました**。"*  
   *(Rule: Remove '-san' and use Kenjougo '拝見いたしました').*
3. **Correct**: *"**承知いたしました（かしこまりました）**。直ちにデータベースを再起動いたします。"*  
   *(Rule: Replace '了解しました' with '承知いたしました').*
4. **Correct**: *"貴社のサーバーに障害が発生したため、弊社のチームにて**復旧対応を実施させていただきました**。"*  
   *(Rule: Never use '直してあげる' which sounds condescending).*
</details>

---

## 🛠️ Drill Set 3: Cushion Phrase (クッション言葉) Insertion

### Exercise 3.1: Context Matching
Fill in the blanks with the most appropriate Cushion Phrase from the box below:

```text
[ 恐れ入りますが | お手数をおかけいたしますが | 差し支えなければ | あいにくではございますが | ご検討いただけますと幸いです ]
```

1. （_________________）、ステージング環境の最新アクセスログをご共有いただけますでしょうか。
2. （_________________）、修正いたしましたPRをご確認いただけますでしょうか。
3. （_________________）、ご提示いただいた納期でのリリースは技術的に困難でございます。
4. （_________________）、こちらのAPIトークンを再発行していただけますと助かります。
5. パフォーマンス改善のため、Redisキャッシュの導入を（_________________）。

<details><summary>🔍 Solutions & Explanations (Drill Set 3)</summary>

1. **差し支えなければ** (Politely requesting sensitive logs if permissible).
2. **お手数をおかけいたしますが** (Asking client to review PR).
3. **あいにくではございますが** (Politely declining unrealistic deadline).
4. **恐れ入りますが** (Requesting token reissuance).
5. **ご検討いただけますと幸いです** (Concluding technical recommendation).
</details>

---

## 🛠️ Drill Set 4: Refactoring Blunt Pull Request Comments into Senior Keigo

### Exercise 4.1: Transforming Harsh Code Review Notes
Rewrite the blunt developer comments into softened, collegial Japanese Keigo.

1. **Blunt**: `「このSQLは遅いです。直してください。」`  
   - **Senior Keigo Refactoring**: __________________________________________________
2. **Blunt**: `「テストコードが足りません。もっと書いてください。」`  
   - **Senior Keigo Refactoring**: __________________________________________________
3. **Blunt**: `「変数名xの意味がわかりません。変えてください。」`  
   - **Senior Keigo Refactoring**: __________________________________________________

<details><summary>🔍 Solutions & Explanations (Drill Set 4)</summary>

1. *"**恐れ入りますが**、こちらのSQLクエリは大量データ処理時にボトルネックとなる可能性がございます。インデックスの適用やクエリの最適化を**ご検討いただけますと幸いです**。"*
2. *"**お手数をおかけいたしますが**、例外処理やエッジケースに関する単体テストをいくつか追加**していただけますでしょうか**。品質担保のため、ご協力いただけますと幸甚に存じます。"*
3. *"**[Nitpick]**: 変数名 `x` ですが、可読性向上のため `retryCount` 等のより具体的な命名へのご変更を**ご検討いただけますでしょうか**。"*
</details>

---

## 🛠️ Drill Set 5: Incident Report Slack Message Construction in Keigo

Write a 50–70 word Japanese Slack incident notification to client lead Sato-sama reporting that:
1. The payment gateway experienced connection pool exhaustion at 15:00.
2. Our squad rolled back the deployment and restored service in 10 minutes.
3. Express sincere apologies and promise a full root-cause report by tomorrow.

- **Your Japanese Slack Draft**:  
  ___________________________________________________________________________________  
  ___________________________________________________________________________________  
  ___________________________________________________________________________________  

<details><summary>🔍 Model Incident Slack Notification Solution</summary>

### Model Slack Message:
> *"佐藤様  
> 大変お忙しいところ恐縮でございます。緊急で障害のご報告を申し上げます。  
> 本日15:00頃、決済サービスにおきましてDB接続プールの枯渇による障害が発生いたしました。直ちに弊社のチームにて直前の安定版へのロールバックを実施し、15:10に正常復旧を確認いたしました。  
> 貴社ならびにお客様に多大なるご迷惑をおかけしましたことを、深くお詫び申し上げます。明日正午までに詳細な原因分析と再発防止策をまとめた報告書をご提出申し上げます。"*
</details>

---

## 🛠️ Drill Set 4: Slack & Asynchronous Engineering Communication

Refactor the following casual developer chat messages into polite, professional engineering Japanese for Slack channels with Japanese clients and stakeholders.

### Problem 4.1: Notifying Deployment Completion & Staging Verification
- **Casual Message**: ❌ `「デプロイ終わったので、ステージングで確認してください。」`
- **Professional Keigo Transformation**:
  > ⭕ **「ステージング環境へのデプロイ作業が正常に完了いたしました。大変恐縮ではございますが、お手すきの際にご確認いただけますと幸甚に存じます。何卒よろしくお願い申し上げます。」**
  > *(Grammar Note: Uses 幸甚に存じます as the highest level of polite request, softening the demand on client time).*

### Problem 4.2: Reporting a Breaking API Change Request
- **Casual Message**: ❌ `「仕様変えたので、フロントエンドのAPIパラメータも変えてください。」`
- **Professional Keigo Transformation**:
  > ⭕ **「認証基盤のセキュリティ強化に伴い、APIエンドポイントのパラメータ仕様に一部変更が生じました。フロントエンド側の改修についてご相談させていただきたく存じます。詳細な仕様変更差分をドキュメントにまとめましたので、ご一読いただけますと幸いです。」**

---

## 🛠️ Drill Set 5: Code Review & Constructive Technical Pushback

### Problem 5.1: Pointing out N+1 Query in ORM Repository
- **Context**: In a PR review, you noticed a database query loop inside a `for` loop that causes severe latency.
- **Refactored Keigo Comment**:
  > ⭕ **「実装お疲れ様です。こちらのループ処理内でDBクエリが発行されているため、データ件数が増加した場合にN+1問題によるパフォーマンス低下が懸念されます。`JOIN FETCH` またはバッチ取得（`IN` 句）へのリファクタリングをご検討いただけますでしょうか。ご確認のほどよろしくお願いいたします。」**

### Problem 5.2: Recommending Optimistic Locking for Concurrent Stock Deductions
- **Context**: A teammate implemented a standard `SELECT ... UPDATE` without version checking for inventory counters.
- **Refactored Keigo Comment**:
  > ⭕ **「丁寧なロジック設計をありがとうございます。高負荷時における同時購入リクエスト時のレースコンディションを防ぐため、`@Version` アノテーションによる楽観的ロック（Optimistic Locking）の導入をご検討いただけますと幸いです。参考ドキュメントへのリンクを添付いたします。」**

---

## 🛠️ Drill Set 6: Incident Escalation & On-Call Triage Scenarios

### Problem 6.1: High-Priority P0 Outage Escalation to Executive Client On-Call
- **Scenario**: You are on-call and detected a severe database memory leak causing 503 errors across checkout.
- **Drafting Exercise**: Write a Slack message to the client's Incident Response Team notifying them of active triage, ETA, and mitigation steps.
- **Model Answer (模範解答)**:
  > **「【緊急障害報】決済基盤サービス遅延に関するご報告とお詫び**  
  > 平素より大変お世話になっております。開発チームのオンコール担当でございます。  
  > 本日14時15分頃より、決済マイクロサービスにおきまして接続タイムアウト（HTTP 503）が断続的に発生している事象を確認いたしました。  
  > **現在の対応状況**:  
  > 1. DBコネクションプール枯渇の可能性が高いため、リードレプリカへの参照トラフィック迂回を実施中。  
  > 2. 影響範囲は新規決済リクエストの一部（約3.2%）に限られており、既存データへの破損はございません。  
  > **今後の見通し**:  
  > 14時45分までに暫定復旧を完了予定です。原因究明および恒久対応の詳細につきましては、復旧後に改めて正式なインシデントレポートをご提出申し上げます。多大なるご迷惑をおかけしておりますことを深くお詫び申し上げます。」**

### Problem 6.2: Clarifying Ambiguous Requirements in User Story Specification
- **Context**: The product owner wrote an ambiguous requirement: *"Search should be very fast"*.
- **Refactored Polite Clarification**:
  > **「要件定義書の作成、誠にありがとうございます。検索機能のパフォーマンス要件に関しまして、1点ご相談させていただきたく存じます。現在『高速な検索レスポンス』との記載がございますが、インフラ設計およびインデックス設計を最適化するにあたり、具体的なSLA目標値（例：95パーセンタイルで200ms以内など）をご教示いただくことは可能でしょうか。ご確認のほどよろしくお願い申し上げます。」**

---

## 🛠️ Drill Set 7: Technical Presentation & Cross-Border Standup Practice

### Problem 7.1: Announcing Sprint Goal Completion in Daily Standup
- **Context**: In a daily Scrum meeting with Tokyo stakeholders, present that your team completed all 5 backend user stories and the automated integration test suite passed 100%.
- **Model Answer**:
  > **「おはようございます。昨日のスプリント進捗をご報告いたします。担当しておりましたバックエンドAPIの5つのユーザーストーリーにつきまして、すべての実装および結合テストが正常に完了いたしました。CIパイプラインの自動テストも100%パスしております。本日はステージング環境でのE2Eシナリオ検証を進めてまいります。ブロッカー等は特にございません。よろしくお願いいたします。」**

### Problem 7.2: Requesting Stakeholder Sign-Off on Security Architecture Decision
- **Context**: Request formal sign-off on the OAuth2 PKCE security architecture decision record from the client's Chief Information Security Officer (CISO).
- **Model Answer**:
  > **「OAuth2 PKCE認証基盤のセキュリティ設計方針書（ADR-042）のレビューをいただき、誠にありがとうございます。セキュリティ監査チームからの承認条件をすべて満たしましたので、最終的な承認（サインオフ）を賜りたく存じます。添付の承認申請フォームをご確認いただけますと幸いです。」**

---

## 🛠️ Drill Set 8: Synthesis and Real-Time Translation Drills

### Problem 8.1: Expressing Gratitude and Continued Partnership
Translate into formal Japanese Keigo:
*"Thank you very much for your continuous support during this critical migration phase. Our entire engineering team is dedicated to ensuring 100% stability for your production systems."*

- **Model Answer**:
  > **「平素は格別のご高配を賜り、心より厚く御礼申し上げます。この度の重要マイグレーションにおきまして、弊社開発チーム一同、貴社本番稼働システムの完全な安定性を確保すべく全力を尽くしてまいります。今後とも変わらぬご愛顧を賜りますよう、何卒よろしくお願い申し上げます。」**
