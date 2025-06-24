# Google Fit 歩数取得アプリ

Google Fit の REST API を利用し、過去 1 週間分の歩数データを取得・グラフ・合算・一覧表示する Web アプリケーションです。

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
        GOOGLE_FIT_REFRESH_TOKEN=xxxxxxx
        NEXTAUTH_URL=http://localhost:3000
        NEXTAUTH_SECRET=任意のランダム文字列
        ```
4. 認証用デバッグページ（`/auth-debug`）でリフレッシュトークンを取得（詳細は下記参照）
5. 開発サーバー起動
    ```bash
    npm run dev
    ```

## Google Fit認証・トークン取得

-   Google Cloud ConsoleでリダイレクトURIに`http://localhost:3000/auth-debug`を登録
-   `/auth-debug`ページの手順で認可コード→リフレッシュトークンを取得
-   `.env.local`に`GOOGLE_FIT_REFRESH_TOKEN`をセット
-   アクセストークンは自動更新されるため通常は不要

## 主な機能

-   過去7日間の歩数グラフ表示（Chart.js）
-   1〜7日分（今日除く）の歩数合算値をテーブル一覧で表示
-   日別歩数のテーブル一覧
-   固定アカウントの歩数のみ常時表示（認証スキップ・リフレッシュトークン自動更新）
-   Google Fit認証用デバッグページ（`/auth-debug`）

## 技術スタック

-   Next.js (App Router)
-   TypeScript
-   Tailwind CSS + daisyUI
-   Chart.js

## デプロイ

-   GitHub Pages 等で静的デプロイ可能

## ライセンス

MIT
