# Google Fit 歩数可視化アプリ

Google Fit の REST API を利用し、過去 1 週間分の歩数データを取得・グラフ表示する Web アプリケーションです。

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
3. Google Cloud Console で OAuth クライアント ID/シークレットを取得し、下記の環境変数を設定
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

## Google 認証・API スコープ

-   Google アカウントでログインし、`https://www.googleapis.com/auth/fitness.activity.read` スコープで歩数データを取得します。
-   Google Cloud Console で「OAuth 同意画面」設定・承認済みリダイレクト URI（例: `http://localhost:3000/api/auth/callback/google`）の登録が必要です。

## 主な技術スタック

-   Next.js (App Router)
-   TypeScript
-   Tailwind CSS + daisyUI
-   next-auth (Google OAuth)
-   Chart.js

## デプロイ

-   GitHub Pages 等で静的デプロイ可能

## Google Fit 認証用デバッグ

-   Google Fit 認証用デバッグページ（`/auth-debug`）を追加し、Google 認証後に`access_token`と`refresh_token`を画面・コンソールに出力できるようにしました
-   `/api/auth/google-token-exchange` API を新規実装し、認可コードからトークンを取得する仕組みを追加
-   これにより、Google Cloud Console でリダイレクト URI に`/auth-debug`を登録し、認証フローを手動で実行 → トークン取得が可能です

## ライセンス

MIT
