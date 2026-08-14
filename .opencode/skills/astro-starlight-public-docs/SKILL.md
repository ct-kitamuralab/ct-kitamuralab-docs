---
name: astro-starlight-public-docs
description: Astro/Starlightによる公開ドキュメントサイトの作成・刷新・拡張時に使用する。日本語Docsの文章、Cloudflare Docs風レイアウト、安全なシステム案内、GitHub Pages配信、ビルド検証を扱う。
---

# Astro Starlight 公開Docs

研究基盤や開発ツールを対象に、実用的な日本語ドキュメントサイトを作成する。既存のAstro/Starlightの視覚表現を尊重し、公開サイトの有用性とインフラ情報の安全性を両立する。

## 編集前の確認

1. `astro.config.mjs`、対象のDocsページ、`src/styles/docs.css`を読む。
2. 既存のSidebar、Header、Theme切替、検索、レスポンシブレイアウトは、確立済みの設計体系として扱う。
3. 提供中、準備中、計画中、実験候補のどれに当たるかを確認する。計画中のシステムを利用可能であるように書かない。
4. ツールのバージョンや機能は、Provisioning Templateなどの信頼できるローカルの情報源を基にする。推測で補わない。

## 公開安全性

次の情報は公開しない。

- 内部URL、IP Address、Host名、Tailnet名、Port、SSH設定、Docker Socket、Container Provider設定
- Token、API Key、Password、Secret、非公開Repositoryの場所、認証情報を露出する認証手順
- 権限のないアクセスを可能にする内部運用手順

代わりに、次のように記載する。

- 接続情報は、利用承認後に管理者が個別に案内する。
- アプリの導入や一般的な使い方は、提供元の公式ドキュメントへリンクする。
- 接続URL、招待URL、端末名、接続画面のスクリーンショット、Token、認証Codeを共有しないよう注意する。
- 公開できる製品説明と、非公開の設定手順を明確に分ける。

## Docsの文章

- UIと説明文は日本語で書く。正式名称は維持する: `Coder`、`Workspace`、`GitHub`、`GitHub CLI`、`VS Code Web`、`VS Code Desktop`、`Node.js`、`npm`、`OpenCode`、`Claude Code`、`Codex`、`Tailscale`。
- 各ページの冒頭で、利用者が何をできるようになるか、誰のためのページかを簡潔に示す。
- `準備する`、`確認する`、`使う`、`保存場所`、`困ったとき`のように、作業に沿った見出しを優先する。
- 順番のある操作には番号付きリスト、方針や選択肢には箇条書きを使う。
- 一般利用者が安全に実行できる最小限のCommandだけを載せる。
- 運用上の注意は`:::caution`、復元不能な操作やSecret露出は`:::danger`、提供状況の制約は`:::note`を使う。
- 関連する内部ページは相対Linkで結び、理解を助ける外部情報は公式ドキュメントへLinkする。
- `準備中`や`管理者からの案内に従ってください`のように、制約を明確に書く。

## ページ構成

- 利用者向けの内容は`src/content/docs/`へ置く。
- 導入手順は`getting-started/`、Workspace接続は`coder/`、ツール固有の説明は`guides/`、規約と問題解決は`operations/`へ置く。
- 新規の利用者向けページは、必ず`astro.config.mjs`内の対応する`sidebar` Groupへ追加する。
- 自然に次の作業へ進める場合は、短い`次に読む`Sectionを置く。
- 長い手順を重複させず、既存ページへの相互Linkで補完する。

## 開発ツールの説明

導入済みの開発ツールを説明するときは、次を守る。

1. ツール名、用途、導入確認方法、公式ドキュメントを示す。
2. Project単位で再現できるように、ManifestとLock FileをCommitする方針を説明する。通常、生成された依存Directoryや環境そのものはCommitしない。
3. Projectと永続化する設定は`/home/coder`以下に保存するよう案内する。
4. AI Coding Agentでは、生成された変更とTest結果を確認してから実行・Commitするよう求める。
5. Secret、未公開の研究Data、個人情報を、承認なく外部Serviceへ送信しないよう注意する。
6. 研究室固有のLLM API Endpointや認証設定は、公開が明示的に承認されるまで掲載しない。

## Tailscaleの案内

Tailscaleは、クライアント側で必要な準備として公開レベルの範囲で案内できる。

- `https://tailscale.com/download`と`https://tailscale.com/kb`へLinkする。
- アプリをInstallし、研究室から案内されたAccountでSign inするよう説明する。
- 管理者から案内されたCoder URLを開く前に、Tailscaleが接続済みであることを確認させる。
- Tailnet固有の識別子やCoderの接続先Addressは公開しない。

## レイアウトとComponent

- StarlightのSidebar、ページ内目次、Mobile Menu、検索、前後Navigation、Theme選択を維持する。
- Cloudflare Docs風の密度を維持する: CompactなHeader、読みやすい本文Column、システム概要にはCard、比較にはTable、注意には控えめなCalloutを使う。
- Custom Stylingは`src/styles/docs.css`にまとめる。既存のComponent Patternで必要な場合を除き、場当たり的なInline Styleを追加しない。
- Tableは簡潔にし、狭いMobile画面でも利用できるようにする。
- Light / Dark Themeの両方で十分なColor Contrastを保つ。

## 公式情報

必要に応じて、一次情報を参照先にする。

- Coder: `https://coder.com/docs`
- Visual Studio Code: `https://code.visualstudio.com/docs`
- Git: `https://git-scm.com/book/ja/v2`
- GitHub: `https://docs.github.com/ja`
- GitHub CLI: `https://cli.github.com/manual/`
- Node.js: `https://nodejs.org/docs/latest/api/`
- npm: `https://docs.npmjs.com/`
- Python venv: `https://docs.python.org/3/library/venv.html`
- pip: `https://pip.pypa.io/en/stable/`
- NVIDIA nvidia-smi: `https://docs.nvidia.com/deploy/nvidia-smi/`
- OpenCode: `https://opencode.ai/docs`
- Claude Code: `https://docs.anthropic.com/en/docs/claude-code/overview`
- Codex: `https://developers.openai.com/codex/`

初めて使うURLや、変更されやすい提供元のURLは掲載前に確認する。

## 検証

内容、Navigation、Configurationを変更した後は、次を実施する。

1. `BASE_PATH=/ct-kitamuralab-docs npm run build`を実行する。
2. 想定したページが生成され、PagefindがIndexを作成したことを確認する。
3. Sourceと生成物を対象に、非公開のインフラ情報が含まれていないか検索する。
4. GitHub PagesのBase Path配下で、新しい内部Linkが正しく解決することを確認する。
5. レイアウトやNavigationを変更した場合は、DesktopとMobileで対象ページを確認する。
6. 大きなレイアウト変更ではMobile Lighthouseを実行し、Accessibilityの低下を残さない。

ユーザーから明示的な依頼がない限り、CommitやPushは行わない。
