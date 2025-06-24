---
description: "Google Fit 歩数取得アプリのコーディングルール・運用ルール"
applyTo: "**"
---

# コーディングルール・運用ルール

-   TypeScript を利用し、型安全を徹底する
-   UI は Tailwind CSS（Flost や daisyUI 等のラッパー利用可）
-   コード整形は Prettier、静的解析は ESLint を利用する
-   変数・関数・コンポーネント名は意味が分かる英語で記述する
-   1 ファイル 1 責任の原則を意識する
-   コメントは必要最小限、分かりやすく
-   機能追加・バグ修正ごとにコミットを分ける
-   機能追加・バグ修正ごとに GitHub Issue を作成し、必ず Pull Request を作成する
-   main/master ブランチへの直接コミットは禁止。必ず Pull Request 経由でマージする
-   コミットメッセージは簡潔かつ内容が分かるように記載する
-   README や設計書、instructions ファイルは常に最新に保つ
