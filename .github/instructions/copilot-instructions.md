# 実装計画書（GitHub Copilot Instructions）

---

## プロジェクト概要
Google FitのREST APIを利用し、過去1週間分の歩数データを取得・表示するWebアプリケーション（Next.js + Tailwind CSS）。

---

## 実装計画

### 1. 開発フロー
- 機能追加・バグ修正ごとにGitHub Issueを作成し、必ずそのIssueに紐づくPull Requestを作成する
- 作業ごと（機能単位・バグ単位）にコミットを分割する
- コミットメッセージは簡潔かつ内容が分かるように記載する
- mainブランチへの直接コミットは禁止。必ずPull Request経由でマージする

### 2. 技術スタック・ルール
- Next.js（App Router推奨）
- UIはTailwind CSS（FlostやdaisyUI等のラッパー利用可）
- チャート描画はChart.jsまたはRecharts
- Google OAuth 2.0認証を利用
- デプロイはGitHub Pages

### 3. コーディングルール
- TypeScriptを利用する
- コード整形はPrettier、静的解析はESLintを利用する
- 1ファイル1責任の原則を意識する
- 変数・関数・コンポーネント名は意味が分かる英語で記述する
- コメントは必要最小限、分かりやすく
- 機能追加・バグ修正ごとにコミットを分ける

### 4. ディレクトリ構成（例）
- `/app` ... Next.js App Router配下
- `/components` ... UIコンポーネント
- `/lib` ... APIラッパーやユーティリティ
- `/styles` ... Tailwind等のスタイル
- `/public` ... 静的ファイル

### 5. その他
- Issue/Pull Requestのテンプレートを活用する
- READMEや設計書、instructionsファイルは常に最新に保つ

---

## 参考
- [Copilot instructions 公式ドキュメント](https://code.visualstudio.com/docs/copilot/copilot-customization#_use-instructionsmd-files)
- [Google Fit REST API](https://developers.google.com/fit/rest)

---

## 不明点・今後詰めるべき点
- Issue/Pull Requestの運用詳細（ラベル運用、レビュー体制など）
- テスト方針
- UIラッパーの最終選定

---

このファイルはプロジェクトの実装方針・ルールを記載したものです。内容は随時更新してください。
