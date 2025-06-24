# 実装計画書（GitHub Copilot Instructions）

---

## プロジェクト概要

Google Fit の REST API を利用し、過去 1 週間分の歩数データを取得・表示する Web アプリケーション（Next.js + Tailwind CSS）。

---

## 実装計画

### 1. 開発フロー

-   機能追加・バグ修正ごとに GitHub Issue を作成し、必ずその Issue に紐づく Pull Request を作成する
-   作業ごと（機能単位・バグ単位）にコミットを分割する
-   コミットメッセージは簡潔かつ内容が分かるように記載する
-   main ブランチへの直接コミットは禁止。必ず Pull Request 経由でマージする

### 2. 技術スタック・ルール

-   Next.js（App Router 推奨）
-   UI は Tailwind CSS（Flost や daisyUI 等のラッパー利用可）
-   チャート描画は Chart.js または Recharts
-   Google OAuth 2.0 認証を利用
-   デプロイは GitHub Pages

### 3. コーディングルール

-   TypeScript を利用する
-   コード整形は Prettier、静的解析は ESLint を利用する
-   1 ファイル 1 責任の原則を意識する
-   変数・関数・コンポーネント名は意味が分かる英語で記述する
-   コメントは必要最小限、分かりやすく
-   機能追加・バグ修正ごとにコミットを分ける

### 4. ディレクトリ構成（例）

-   `/app` ... Next.js App Router 配下
-   `/components` ... UI コンポーネント
-   `/lib` ... API ラッパーやユーティリティ
-   `/styles` ... Tailwind 等のスタイル
-   `/public` ... 静的ファイル

### 5. その他

-   Issue/Pull Request のテンプレートを活用する
-   README や設計書、instructions ファイルは常に最新に保つ

---

## 参考

-   [Copilot instructions 公式ドキュメント](https://code.visualstudio.com/docs/copilot/copilot-customization#_use-instructionsmd-files)
-   [Google Fit REST API](https://developers.google.com/fit/rest)

---

## 不明点・今後詰めるべき点

-   Issue/Pull Request の運用詳細（ラベル運用、レビュー体制など）
-   テスト方針
-   UI ラッパーの最終選定

---

このファイルはプロジェクトの実装方針・ルールを記載したものです。内容は随時更新してください。
