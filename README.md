# Google Fit 歩数可視化アプリ

Google FitのREST APIを利用し、過去1週間分の歩数データを取得・グラフ表示するWebアプリケーションです。

## セットアップ手順

1. リポジトリをクローン
   ```bash
   git clone https://github.com/shibaTT/google-fit-steps.git
   cd google-fit-steps
   ```
2. 依存パッケージをインストール
   ```bash
   npm install
   ```
3. Google Cloud ConsoleでOAuthクライアントID/シークレットを取得し、下記の環境変数を設定
   - `.env.local` ファイルを作成し、以下を記載
     ```env
     GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
     GOOGLE_CLIENT_SECRET=xxxxxxx
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=任意のランダム文字列
     ```
4. 開発サーバー起動
   ```bash
   npm run dev
   ```

## Google認証・APIスコープ
- Googleアカウントでログインし、`https://www.googleapis.com/auth/fitness.activity.read` スコープで歩数データを取得します。
- Google Cloud Consoleで「OAuth同意画面」設定・承認済みリダイレクトURI（例: `http://localhost:3000/api/auth/callback/google`）の登録が必要です。

## 主な技術スタック
- Next.js (App Router)
- TypeScript
- Tailwind CSS + daisyUI
- next-auth (Google OAuth)
- Chart.js

## デプロイ
- GitHub Pages等で静的デプロイ可能

## ライセンス
MIT
