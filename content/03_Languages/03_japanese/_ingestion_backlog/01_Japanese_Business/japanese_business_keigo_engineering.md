---


title: "Advanced Japanese Business Keigo for Software Engineering & IT Operations"
tags: [japanese, keigo, business-japanese, software-engineering, jlpt-n3-n2, languages, learning-note]
category: japanese
type: master-lesson
created: 2026-08-21
updated: 2026-08-21
status: active
---

# 🇯🇵 Advanced Japanese Business Keigo for Software Engineering & IT Operations


A comprehensive master lesson on navigating Japanese corporate engineering environments, conducting pull request code reviews, handling system incident escalations, and writing professional Slack/email communications using business honorifics (敬語 - けいご).

---

## 1. Core Grammar & Vocabulary Breakdown

### 1.1 The Keigo Triad in Software Development
In a Japanese engineering org or client-facing outsourcing environment (SES / Sler), communication level varies based on stakeholder hierarchy.

```
                    ┌─────────────────────────────────────────┐
                    │            KEIGO TRIAD (敬語)           │
                    └────────────────────┬────────────────────┘
                                         │
         ┌───────────────────────────────┼───────────────────────────────┐
         ▼                               ▼                               ▼
┌──────────────────┐           ┌──────────────────┐           ┌──────────────────┐
│  尊敬語 (Sonkei)  │           │  謙譲語 (Kenjou) │           │ 丁寧語 (Teinei)  │
│  Respectful Form │           │   Humble Form    │           │   Polite Form    │
├──────────────────┤           ├──────────────────┤           ├──────────────────┤
│ Client / Lead    │           │ Developer's Own  │           │ Standard baseline│
│ actions          │           │ actions          │           │ politeness       │
└──────────────────┘           └──────────────────┘           └──────────────────┘
```

1. **尊敬語 (Sonkeigo - Respectful Language)**: Elevates the client, Tech Lead, Product Manager, or external team member. Applied to actions performed *by them*.
   - Pattern: `お / ご + Verb Stem + になる` or `受動態 (Passive Verb + られる)` or **Special Honorific Verbs**.
   - *Example*: 「仕様書を**ご覧になりましたか**。」 (*Have you looked at the specification document?*)
2. **謙譲語 (Kenjougo - Humble Language)**: Lowers your own actions, your team's actions, or your company's actions to show respect to the recipient.
   - Pattern: `お / ご + Verb Stem + する / いたす` or **Special Humble Verbs**.
   - *Example*: 「プルリクエストを**拝見いたしました**。」 (*I humbly reviewed the pull request.*)
3. **丁寧語 (Teineigo - Polite Language)**: Polite sentence endings (`です / ます`, `でございます`). Baseline for standard team interactions.
   - *Example*: 「ただいまサーバーのログを確認中で**ございます**。」 (*We are currently checking the server logs.*)

---

### 1.2 Transformation Rules for IT & Engineering Verbs

Software development relies on specialized verbs (many derived from Suru (する) verbs). Mastering their Keigo transformations is vital for code reviews and ticket status updates:

| Base Plain Form | Business Reading | 尊敬語 (Sonkeigo - Client/Lead) | 謙譲語 (Kenjougo - Self/Team) | Engineering Context |
| :--- | :--- | :--- | :--- | :--- |
| **確認する** (かくにんする) | Kakunin suru | ご確認になる / ご確認される | ご確認致す / 確認させていただきます | Checking PRs, design specs, build logs |
| **開発する** (かいはつする) | Kaihatsu suru | ご開発なさる / ご開発される | 開発致す / 開発を進めさせていただきます | Developing features, backend APIs |
| **修正する** (しゅうせいする) | Shuusei suru | ご修正になる / ご修正される | 修正致す / 修正させていただきます | Refactoring, bug fixes, hotfixes |
| **共有する** (きょうゆうする) | Kyouyuu suru | ご共有いただく (Request) | ご共有致す / 共有させていただきます | Sharing Zoom links, API specs, credentials |
| **調査する** (ちょうさする) | Chousa suru | ご調査になる | 調査致す / 調査を進めております | Investigating outages, DB queries |
| **連絡する** (れんらくする) | Renraku suru | ご連絡くださる / ご連絡いただく | ご連絡差し上げる / ご連絡致す | Outage escalation, standup updates |
| **見る** (みる) | Miru | ご覧になる (ごらんになる) | 拝見する (はいけんする) / 拝見致す | Reviewing code, looking at log traces |
| **言う** (いう) | Iu | おっしゃる | 申す (もうす) / 申し上げます | Stating requirements, reporting status |
| **する** | Suru | なさる / される | 致す (いたす) | Doing tasks, executing deployments |
| **行く・来る** | Iku / Kuru | いらっしゃる / おいでになる | 参る (まいる) / 伺う (うかがう) | Visiting client site, joining online sync |

---

### 1.3 Cushion Phrases (クッション言葉) for IT Code Reviews & Slack
Direct feedback in code reviews can sound aggressive in Japanese engineering culture. Soften corrections using **cushion phrases**:

1. **恐れ入りますが (おそれいりますが - Osoreirimasu ga)**: *"I beg your pardon, but..."* (Used before asking questions or reporting issues).
   - *Usage*: 「**恐れ入りますが**、こちらのAPIレスポンスの型定義を再確認していただけますでしょうか。」 (*I am sorry to bother you, but could you please double-check the type definition for this API response?*)
2. **お手数をおかけいたしますが (おてすうをおかけいたしますが - Otesuu o okake itashimasu ga)**: *"I apologize for taking up your time/effort, but..."*
   - *Usage*: 「**お手数をおかけいたしますが**、再テストの実行をお願いできますでしょうか。」 (*Apologies for the extra trouble, but could you please re-run the tests?*)
3. **差し支えなければ (さしつかえなければ - Sashitsukaenakereba)**: *"If it is not inconvenient..."*
   - *Usage*: 「**差し支えなければ**、ベンチマーク結果のログをご共有いただけますと幸いです。」 (*If convenient, we would appreciate it if you could share the benchmark logs.*)

---

## 2. Comprehensive Vocabulary & Grammar Matrix

| Kanji / Phrase | Reading (Furigana / Romaji) | Form Category | Technical English Meaning | Real-World Engineering Example | Nuance & Business Etiquette Note |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **承知いたしました** | しょうちいたしました<br>*(Shouchi itashimashita)* | Kenjougo (Humble) | Understood / Confirmed | 「仕様変更の件、**承知いたしました**。本日中に修正を実施いたします。」 | **Crucial**: Never use 「了解しました」(Ryookai shimashita) with clients or superiors; it is considered informal/patronizing. |
| **拝見いたしました** | はいけんいたしました<br>*(Haiken itashimashita)* | Kenjougo (Humble) | I have reviewed / looked at | 「ご提出いただいたプルリクエストを**拝見いたしました**。」 | Standard humble phrasing when opening code reviews or design docs. |
| **対応中でございます** | たいおうちゅうでございます<br>*(Taiouchuu de gozaimasu)* | Teinei / State | Currently resolving / handling | 「現在、データベースの接続障害を**対応中でございます**。」 | Keeps management informed during active outages with objective politeness. |
| **ご確認のほどよろしくお願いいたします** | ごかくにんのほどよろしくおねがいいたします<br>*(Go-kakunin no hodo yoroshiku onegai itashimasu)* | Polite Request | Please review / check this | 「コードの修正が完了しましたので、**ご確認のほどよろしくお願いいたします**。」 | Mandatory sign-off sentence when tagging reviewers on GitHub/GitLab PRs. |
| **ご教示いただけますでしょうか** | ごきょうじいただけますでしょうか<br>*(Go-kyouji itadakemasu deshou ka)* | Kenjou Request | Could you please instruct / advise me? | 「環境構築の手順について、**ご教示いただけますでしょうか**。」 | Formal alternative to 教えてください (Oshiete kudasai) for setup instructions. |
| **ご査収のほどよろしくお願いいたします** | ごさしゅうのほどよろしくおねがいいたします<br>*(Go-sashuu no hodo yoroshiku onegai itashimasu)* | Business Formula | Please accept/evaluate the attached file | 「修正後のログファイルを添付いたしました。**ご査収のほどよろしくお願いいたします**。」 | Standard email formula when attaching log archives, diagrams, or CSV metrics. |
| **幸いです** | さいわいです<br>*(Saiwai desu)* | Soft Request | I would be grateful / appreciative | 「本日 17 時までにフィードバックをいただけますと**幸いです**。」 | Creates a polite, non-demanding request cadence in technical Slack channels. |
| **修正を反映いたしました** | しゅうせいをはんえいいいたしました<br>*(Shuusei o han'ei itashimashita)* | Kenjou Statement | Applied / Pushed the requested fix | 「指摘事項に基づき、コードの**修正を反映いたしました**。」 | Standard response in a GitHub PR comment thread after addressing requested changes. |
| **不具合が発生しております** | ふぐあいがはっせいしております<br>*(Fuguai ga hassei shite orimasu)* | Teinei Alert | A bug / glitch has occurred | 「本番環境にてログイン処理の**不具合が発生しております**。」 | Clear, objective phrasing for incident ticket reporting. |
| **再発防止策を検討いたします** | さいはつぼうしさくをけんとういたします<br>*(Saihatsu boushisaku o kentou itashimashita)* | Kenjou Commitment | We will formulate preventative measures | 「ポストモーテムを作成し、**再発防止策を検討いたします**。」 | Used in post-mortem reports to reassure leadership of long-term fixes. |

---

## 3. Real-World Dialogue Scenarios

### Scenario A: Urgent Incident Escalation on Slack (障害発生時の緊急通知)

**Context**: High-priority production outage where the database CPU throttles to 100%. Junior Backend Engineer (Tanaka) escalates to Engineering Lead (Sato).

```
[Slack Channel: #incident-alert-prod]
```

- **田中 (Tanaka - Junior Engineer)**:
  > 佐藤（さとう）さん、お疲れ様（つかれさま）です。
  > 恐（おそ）れ入（い）りますが、本番（ほんばん）環境（かんきょう）のデータベースにて CPU 使用率（しようりつ）が 100% に達（たっ）する障害（しょうがい）が発生（はっせい）しております。
  > ただいま原因（げんいん）のログを調査中（ちょうさちゅう）でございます。
  >
  > *Romaji*: Sato-san, otsukaresama desu. Osoreirimasu ga, homban kankyou no deetabeesu ni te CPU shiyouritsu ga hyakuper sento ni tassuru shougai ga hassei shite orimasu. Tadaima gen'in no rogu o chousachuu de gozaimasu.
  > *English*: Sato-san, thank you for your hard work. I am sorry to interrupt, but an incident has occurred in the production environment where database CPU utilization has reached 100%. We are currently investigating the root cause logs.

- **佐藤 (Sato - Tech Lead)**:
  > 田中さん、報告（ほうこく）ありがとうございます。
  > スロークエリのログは確認（かくにん）されましたか。また、影響（えいきょう）範囲（はんい）はどのサービスに及（およ）んでいますでしょうか。
  >
  > *Romaji*: Tanaka-san, houkoku arigatou gozaimasu. Suroo kueri no rogu wa kakunin saremashita ka. Mata, eikyou han'i wa dono saabisuto ni oyonde imasurou ka.
  > *English*: Tanaka-san, thank you for the report. Have you checked the slow query logs? Also, which services are affected by the scope of this impact?

- **田中 (Tanaka - Junior Engineer)**:
  > はい、確認（かくにん）いたしました。未（み）インデックスの SQL クエリが原因（げんいん）と特定（とくてい）いたしました。
  > 恐（おそ）れ入（い）りますが、該当（がいとう）インデックスの緊急（きんきゅう）追加（ついか）パッチを適用（てきよう）しても差（さ）し支（つか）えないでしょうか。
  >
  > *Romaji*: Hai, kakunin itashimashita. Mi-indekkusuno SQL kueri ga gen'in to tokutei itashimashita. Osoreirimasu ga, gaitou indekkusu no kinkyuu Tsuika pacchi o tekiyou shitemo sashitsukaenakereba deshou ka.
  > *English*: Yes, I have confirmed it. We identified that an unindexed SQL query is the root cause. Pardon me, but would it be acceptable if we apply an emergency patch to add the relevant index?

- **佐藤 (Sato - Tech Lead)**:
  > 承知（しょうち）いたしました。適用（てきよう）を進（すす）めてください。完了（かんりょう）後（ご）、結果（けっか）をご共有（きょうゆう）いただけますと幸（さいわ）いです。
  >
  > *Romaji*: Shouchi itashimashita. Tekiyou o susumete kudasai. Kanryougo, kekka o go-kyouyuu itadakemasu to saiwai desu.
  > *English*: Understood. Please proceed with applying the patch. Once complete, I would appreciate it if you could share the results.

---

### Scenario B: GitHub Pull Request Code Review & Technical Feedback (コードレビュー)

**Context**: Senior Code Reviewer (Suzuki) leaves comments on Developer (Yamada)'s Pull Request regarding cache invalidation.

```
[GitHub PR #142 Comment Thread]
```

- **鈴木 (Suzuki - Reviewer)**:
  > 山田（やまだ）さん、実装（じっそう）お疲れ様（つかれさま）です。
  > プルリクエストを拝見（はいけん）いたしました。全体的（ぜんたいてき）に綺麗（きれい）に設計（せっけい）されていますね。
  > 1 点（てん）だけ恐（おそ）れ入（い）りますが、L45 のキャッシュ削除（さくじょ）処理（しょり）において、非同期（ひどうき）での再試行（さいしこう）ロジックが漏（も）れているように見受（みう）けられます。
  > ネットワーク障害（しょうがい）時（じ）にキャッシュの不整合（ふせいごう）が発生（はっせい）する懸念（けねん）がございますので、ご確認（かくにん）いただけますでしょうか。
  >
  > *Romaji*: Yamada-san, jissou otsukaresama desu. Pururikuesto o haiken itashimashita. Zentaiteki ni kirei ni sekkei sarete imasu ne. Itten dake osoreirimasu ga, L45 no kyasshu sakujo shori ni oite, hidouki de no saishikou rojikku ga morete iru you ni miukeraremasu. Nettowaaku shougaiji ni kyasshu no fuseigou ga hassei suru kenen ga gozaimasu node, go-kakunin itadakemasu deshou ka.
  > *English*: Yamada-san, thank you for your work on the implementation. I have reviewed the pull request. Overall, it is cleanly designed. Pardon me on just one point, but it appears that the asynchronous retry logic in the cache deletion handler at line 45 has been omitted. There is a concern that cache inconsistency might occur during network failures, so could you please check this?

- **山田 (Yamada - PR Author)**:
  > 鈴木（すずき）さん、レビューいただきありがとうございます。
  > ご指摘（してき）の通（とお）り、例外（れいがい）ハンドリングが不十分（ふじゅうぶん）でございました。
  > 指摘（してき）事項（じこう）に基（もと）づき、デッドレターキュー（DLQ）への退避（たいひ）ロジックを追加（ついか）し、修正（しゅうせい）を反映（はんえい）いたしました。
  > 再度（さいど）ご確認（かくにん）のほど、よろしくお願い申し上げます（おねがいもうしあげます）。
  >
  > *Romaji*: Suzuki-san, rebyuu itadaki arigatou gozaimasu. Go-shiteki no通り, reigai handoringu ga fujuubun de gozaimashita. Shiteki jikou ni motozuki, deddo retaa kyuu (DLQ) e no taihi rojikku o tsuika shi, shuusei o han'ei itashimashita. Saido go-kakunin no hodo, yoroshiku onegai moushiagemasu.
  > *English*: Suzuki-san, thank you very much for the review. As you pointed out, the exception handling was insufficient. Based on your feedback, I have added logic to offload failed payloads to a Dead-Letter Queue (DLQ) and pushed the fix. I kindly ask for your re-review.

---

## 4. Interactive Practice & Quizzes

### Exercise 1: Plain/Teinei Form to Business Keigo Conversion
*Convert the following software engineering statements into appropriate Business Keigo (Kenjougo or Sonkeigo as context dictates).*

1. **Plain Statement**: 「明日、仕様書を見ます。」 (*I will look at the spec doc tomorrow.*)
   - ➜ **Kenjou Conversion**: 「明日、仕様書を____________________。」
2. **Plain Statement**: 「クライアントは新機能をテストしましたか。」 (*Did the client test the new feature?*)
   - ➜ **Sonkei Conversion**: 「お客様（おきゃくさま）は新機能（しんきのう）を____________________でしょうか。」
3. **Plain Statement**: 「バグを修正したので、確認してください。」 (*I fixed the bug, so please check it.*)
   - ➜ **Business Slack Formula**: 「不具合（ふぐあい）を修正（しゅうせい）いたしましたので、____________________よろしくお願いいたします。」

---

### Exercise 2: Business Communication Error Identification
*Identify the Keigo mistake in each engineering Slack message and write the correct version.*

1. **Incorrect**: 「お客様、今回の仕様変更の件、**了解しました**。」
   - *Issue*: __________________________________________________
   - *Correction*: 「お客様、今回の仕様変更の件、____________________。」
2. **Incorrect**: 「私がコードを**ご覧になりました**ので、マージします。」
   - *Issue*: __________________________________________________
   - *Correction*: 「私がコードを____________________ので、マージいたします。」

---

### Exercise 3: Dialogue Gap-Fill Exercise
*Select the correct expression from the word bank to complete the incident post-mortem update:*
`[ご査収のほど , 承知いたしました , 発生しております , 拝見いたしました , 検討いたします]`

> 「開発チームの皆様、お疲れ様です。
> 昨日発生いたしましたデータベース障害のポストモーテムを記述し、ドキュメントを添付いたしました。(1) ____________________よろしくお願いいたします。
> 今回の障害原因を踏まえ、来週のスプリントにてインデックス再設計と (2) ____________________。引き続きよろしくお願い申し上げます。」

---

### 🔑 Answer Keys & Linguistic Explanations

#### Answer Key — Exercise 1
1. **拝見いたします** (Haiken itashimashita) / **拝見いたします** (Haiken itashimasu)
   - *Explanation*: Seeing/reviewing your own action towards work items requires humble Kenjougo (拝見する).
2. **テストされました** / **ごテストなさった** (Tesuto saremashita deshou ka)
   - *Explanation*: The client's action requires Sonkeigo (される / なさる).
3. **ご確認のほど** (Go-kakunin no hodo)
   - *Explanation*: Requests to superiors/reviewers use 「ご確認のほどよろしくお願いいたします」 instead of plain 「確認してください」.

#### Answer Key — Exercise 2
1. **Issue**: 「了解しました」(Ryookai shimashita) is improper when speaking to clients or superiors.
   - **Correction**: 「お客様、今回の仕様変更の件、**承知いたしました**（または **かしこまりました**）。」
2. **Issue**: 「ご覧になりました」(Goran ni narimashita) is Sonkeigo (respectful to others). You cannot use it for your own action.
   - **Correction**: 「私がコードを**拝見いたしました**ので、マージいたします。」

#### Answer Key — Exercise 3
- (1) **ご査収のほど** (Go-sashuu no hodo - *Please review/accept the attached file*)
- (2) **再発防止策を検討いたします** (Saihatsu boushisaku o kentou itashimasu - *We will consider preventative measures*)

---

## 5. Memory Hooks & Spaced Repetition Notes

### 5.1 The Directional Keigo Rule for Developers

$$\text{Sonkeigo (尊敬語)} \longrightarrow \text{Elevates OTHER PERSON (Client / Tech Lead)}$$
$$\text{Kenjougo (謙譲語)} \longrightarrow \text{Lowers SELF / YOUR CODE / YOUR TEAM}$$

- **Mnemonic**:
  - *You **LOOK UP** to the lead when they speak* $\rightarrow$ **ご覧になる / おっしゃる** (Sonkei).
  - *You **BOW DOWN** when handing over your PR* $\rightarrow$ **拝見する / 申す / 承知する** (Kenjou).

---

### 5.2 Top 8 Irregular Verbs Cheat Sheet for Tech Engineers

```
 ┌──────────────┬──────────────────┬──────────────────┐
 │ Plain Verb   │ 尊敬語 (Sonkei)  │ 謙譲語 (Kenjou)  │
 ├──────────────┼──────────────────┼──────────────────┤
 │ 言う (Iu)    │ おっしゃる       │ 申す / 申し上げます│
 │ 見る (Miru)  │ ご覧になる       │ 拝見する         │
 │ 聞く (Kiku)  │ お聞きになる     │ 伺う / 拝聴する  │
 │ する (Suru)  │ なさる / される  │ 致す (いたす)    │
 │ 行く (Iku)   │ いらっしゃる     │ 参る / 伺う      │
 │ 知る (Shiru) │ ご存知である     │ 承知する / 存じあげる│
 │ 与える(Give) │ くださる         │ 差し上げる       │
 │ 食べる(Eat)  │ 召し上がる       │ いただく         │
 └──────────────┴──────────────────┴──────────────────┘
```

---

### 5.3 Spaced Repetition Schedule & Obsidian Notes Graph

| Review Interval | Focus Topic | Mastery Checkpoint |
| :--- | :--- | :--- |
| **Day 1** | Keigo Verb Matrix | Memorize 10 core engineering verb transformations. |
| **Day 3** | Cushion Phrases & Slack Etiquette | Practice writing 3 PR code review comments using クッション言葉. |
| **Day 7** | Incident Escalation Dialogue | Recite Incident Escalation Scenario A aloud without looking at script. |
| **Day 14**| Client Email & Post-Mortem | Draft a full incident post-mortem email in business Japanese. |
| **Day 30**| Comprehensive Mock Sync | Simulated 15-minute Japanese daily standup drill. |

---

### 5.4 Related Study Notes & Wiki Links
- [[01_Flashcards_N5]] — Essential N5 vocabulary foundation.
- [[02_Flashcards_N4]] — Intermediate N4 grammar and vocabulary patterns.
- [[N4_Spaced_Repetition]] — Spaced repetition tracker for Japanese N4/N3 mastery.
- [[Japanese_Vocab_Mindmap]] — Comprehensive visual map of Japanese vocabulary clusters.
