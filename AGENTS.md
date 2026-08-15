# AGENTS.md

Astro + Starlight で作る**日本語の公開ドキュメントサイト**（喜多村研究室 Docs）。GitHub Pages へ `main` ブランチ push で自動デプロイ（`.github/workflows/deploy.yml`）。

## スキルを使うタイミング（必ず先に読み込む）

- `astro-starlight-public-docs` — サイト自体の変更全般（コンテンツ追加・更新、レイアウト/コンポーネント変更、ビルド検証、公開安全性の確認）を始める前に読み込む。編集前の確認手順、公開してよい/いけない情報の境界、検証手順がここにある。
- `cloudflare-docs-style` — 個別のドキュメントページ（`src/content/docs/` 配下）を新規作成・刷新・構成レビューする前に読み込む。ページ種別（概要/チュートリアル/参照）別の骨格と横断的な文体チェックリストがここにある。

ページ執筆はまず前者（全体ルールと安全性）、文章構成を詰める段階で後者を順に適用する。

## コマンド

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # BASE_PATH はデフォルト /ct-kitamuralab-docs（CI はリポジトリ名を設定）
npm run preview    # dist/ の確認
```

- テスト・lint・typecheck スクリプトは**存在しない**。検証は `npm run build` が成功すること + 生成物（`dist/`）での目視確認 + 非公開情報への grep。
- 本番と同じベースパスで確認する場合は `BASE_PATH=/ct-kitamuralab-docs npm run build`。

## 構造とルール

- コンテンツは `src/content/docs/` 配下の `.md`/`.mdx`。セクションは `getting-started/`・`coder/`・`guides/`・`operations/`・`systems/`。
- **新規ページ追加時は `astro.config.mjs` の `sidebar` に必ず登録する**（登録しただけでは Sidebar に出ない）。
- **新しいセクションディレクトリを作った場合は `src/lib/llm-markdown.ts` の `sections` 配列にも追加する**。この配列が `llms.txt`・`llms-full.txt`・セクション別 `llms.txt` 生成の正。
- `src/lib/llm-markdown.ts` が MDX を LLM 向け Markdown に変換する際に、`SystemStatus`・`quick-facts`・`CardGrid`/`Card` の HTML を正規表現で置換する。**ドキュメントに新しいカスタムコンポーネントや HTML を使うと llms.txt 出力が壊れる**ので、使う前にこの変換ロジックを確認すること。
- カスタムコンポーネントは `src/components/`（`Docs*.astro`）、共通スタイルは `src/styles/docs.css` にまとめる。場当たり的なインラインスタイルは避ける。
- 相対リンクは実際のディレクトリ階層に注意（`guides/ai-coding-agents/codex-login.md` のように深くネストしているページがある）。
- `dist/` と `.astro/` は生成物でコミットしない。`.playwright-mcp/` はブラウザ操作の残骸なので触らない。

## 公開安全性（最重要）

このリポジトリは**公開**リポジトリであり、`ct-kitamuralab-coder-system`（**private**、内部のソース・オブ・トゥルース）とは分ける。公開してはならないもの:

- tailnet URL、内部 IP、内部ホスト名・ポート
- 内部アカウント名、SSH 鍵の場所
- admin 側の Docker/PostgreSQL 操作、テンプレートの内部実装
- Token、API Key、接続URL、招待URL、認証 Code を含むスクリーンショット

代わりに「利用承認後に管理者から個別に案内します」で済ませる。迷ったら `astro-starlight-public-docs` skill の「公開安全性」節を参照。公開前にソースと `dist/` を grep して確認する。

## Git 慣習

- コミットメッセージは Conventional Commits 風 + emoji（例: `docs: 📝 …`、`style: 🎨 …`、`fix: 🐛 …`）。
- 依頼がない限り commit/push しない。push が即本番デプロイになる。
