# Google Fit 歩数取得アプリ 技術詳細ドキュメント

## 1. ディレクトリ構成

```
root/
├─ src/
│  ├─ app/           # Next.js App Router 構成
│  ├─ components/    # UIコンポーネント
│  └─ lib/           # API・認証等のロジック
├─ public/           # 静的ファイル
├─ docs/             # ドキュメント
├─ .github/          # GitHub Actions/設定
├─ package.json      # 依存管理
└─ ...
```

## 2. 主要技術・ライブラリ

| 項目           | 採用技術・バージョン例 | 用途・備考            |
| :------------- | :--------------------- | :-------------------- |
| フレームワーク | Next.js (App Router)   | SSR/SSG, ルーティング |
| 言語           | TypeScript             | 型安全                |
| UI             | Tailwind CSS, daisyUI  | スタイリング          |
| チャート       | Chart.js               | 歩数グラフ            |
| 認証           | Google OAuth 2.0       | Google Fit API 用     |
| 静的解析       | ESLint, Prettier       | コード品質・整形      |
| CI             | GitHub Actions         | Lint/PR Quiz/CI       |

## 3. 認証・API 連携

-   固定アカウントのリフレッシュトークンを環境変数で管理
-   `/api/auth/google-token-exchange` で認可コード → トークン変換
-   `src/lib/getGoogleFitAccessToken.ts` でリフレッシュトークンからアクセストークン自動取得
-   `src/lib/fetchGoogleFitStepsFixedAccount.ts` で歩数データ取得
-   必要なスコープ: `https://www.googleapis.com/auth/fitness.activity.read`

## 4. UI/UX

-   Tailwind CSS + daisyUI でレスポンシブ対応
-   404/500 ページは `src/app/not-found.tsx` / `src/app/error.tsx` でカスタム
-   Chart.js で歩数グラフ描画
-   合算・日別テーブルは `StepsSum.tsx`/`StepsClientView.tsx` で実装

## 5. GitHub Actions/CI

-   `.github/workflows/lint.yml` で ESLint/Prettier チェック
-   `.github/workflows/quiz.yml` で PR Quiz（AI による PR 理解度テスト）
-   main/master 直コミット禁止、PR 経由でマージ

## 6. セキュリティ・運用

-   認証情報は環境変数/Secrets で管理
-   不要な API・認証処理・UI は随時整理
-   README・設計書・instructions は常に最新化

## 7. 今後の技術検討

-   テスト自動化（Jest/Testing Library 等）
-   アクセシビリティ強化
-   CI/CD 拡充

---

> 本ドキュメントは `docs/design_doc.md` と合わせて運用・更新してください。
