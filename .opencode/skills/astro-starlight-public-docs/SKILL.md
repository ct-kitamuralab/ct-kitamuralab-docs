---
name: astro-starlight-public-docs
description: Astro/Starlightによる公開技術ドキュメントサイトの作成・刷新・拡張時に使用する。ページ配置、Sidebar、公開安全性、公式情報、GitHub Pages配信、ビルド・リンク・レスポンシブ検証を扱う。文章構成はcloudflare-docs-styleと併用する。
--------------------------------------------------------------------------------------------------------------------------------------------------------

# Astro Starlight 公開Docs

研究基盤、開発環境、プログラミング、開発ツールを対象とした日本語技術ドキュメントサイトを作成・保守する。

このSkillは主にサイト全体の構造、Astro/Starlight、公開安全性、Navigation、検証を担当する。

個々のページの文章構成、初心者向け説明、コマンドやコードの説明方法については `cloudflare-docs-style` の規則を適用する。

## 編集前の確認

編集前に次を確認する。

1. `astro.config.mjs`
2. 対象のDocsページ
3. `src/styles/docs.css`
4. 関連する既存ページ
5. 対象機能の提供状況
6. 必要に応じて公式ドキュメント

既存のSidebar、Header、Theme切替、検索、ページ内目次、前後Navigation、レスポンシブ設計は確立済みの設計体系として扱う。

既存パターンで解決できる場合、新しい独自実装を追加しない。

## 情報の正確性

ツール、言語、Library、Service、研究基盤について、確認できていない情報を推測で補わない。

特に次の情報は信頼できる情報源で確認する。

* Version
* Command
* Option
* File path
* Configuration
* API
* 利用可能な機能
* 提供状況
* URL
* Platformごとの差異

研究室固有の環境については、Provisioning Template、Configuration、Repository内の設定など、確認可能な一次情報を優先する。

「提供中」「準備中」「計画中」「実験候補」を区別する。

計画中の機能を現在利用可能であるように記述しない。

## 公開安全性

公開ドキュメントには次の情報を掲載しない。

* 内部URL
* IP Address
* Host名
* Tailnet名
* 内部Port
* SSH設定
* Docker Socket
* Container Provider設定
* Token
* API Key
* Password
* Secret
* Private Key
* 認証Code
* 非公開Repositoryの場所
* 非公開の研究Data
* 個人情報
* 権限のないAccessを可能にする内部運用手順

必要な場合は具体値を公開せず、次のように説明する。

* 接続情報は利用承認後に管理者が個別に案内する。
* 研究室固有のURLは管理者から案内されたものを使用する。
* 一般的なInstall方法は公式ドキュメントを参照する。
* Tokenや認証Codeを他人へ共有しない。
* 公開可能な製品説明と内部Infrastructure設定を分離する。

公開安全性を文章の分かりやすさより優先する。

## Docsの対象読者

利用者向けDocsは、そのページで扱う技術、言語、Toolを初めて利用する人を基準にする。

読者がその分野の専門用語、CLI操作、プログラミング構文、開発Toolの慣習を知っているとは仮定しない。

具体的な文章構造と説明方法は `cloudflare-docs-style` に従う。

## ページ配置

利用者向けページは `src/content/docs/` 以下へ配置する。

原則として次の分類を使用する。

* `getting-started/`

  * 初回利用
  * 環境準備
  * 最初に読む内容

* `coder/`

  * Coder
  * Workspace
  * 開発環境への接続

* `guides/`

  * Git
  * GitHub
  * Python
  * Node.js
  * 開発Tool
  * プログラミング
  * Tool固有のTutorial

* `operations/`

  * 共通規約
  * Troubleshooting
  * Security
  * 運用上の注意

分類できない場合は「読者がどの目的でそのページを探すか」で配置を決定する。

技術的な内部構造ではなく、利用者の目的を優先する。

## Sidebar

新しい利用者向けページを追加した場合は、必要に応じて `astro.config.mjs` の対応するSidebar Groupへ追加する。

Sidebarでは次を守る。

* 初心者が読む順番に並べる。
* 基礎ページを応用ページより前に置く。
* Tool名だけでは目的が不明な場合は分かりやすいLabelを使う。
* 同じ内容への重複導線を増やしすぎない。

自然に次の作業へ進める場合はページ末尾に `Next steps` を置く。

長い説明を複数ページへコピーせず、既存ページへのLinkで再利用する。

ただし、そのページを理解するために必要な最低限の説明まで外部ページへ追い出さない。

## Link

内部ページは可能な限り相対Linkで接続する。

外部情報は一次情報を優先する。

外部Linkだけを置かず、何が書かれているページなのかを1文で説明する。

変更されやすいURLは掲載前に実際に存在することを確認する。

## 開発Toolの説明

導入済みの開発Toolを説明するときは、最低限次を扱う。

1. Toolは何か
2. 何のために使うか
3. この環境で利用できるか
4. 導入確認方法
5. 最小の使用例
6. 公式ドキュメント

Project単位で依存関係を管理するToolでは、必要に応じてManifestとLock Fileの役割を説明する。

通常、生成された依存DirectoryやVirtual EnvironmentそのものをCommitしない。

研究環境で永続化が必要なFileについては、実際のInfrastructure仕様を確認して保存場所を案内する。

AI Coding Agentについて説明する場合は、生成された変更内容とTest結果を確認してから実行・Commitするよう案内する。

Secret、未公開研究Data、個人情報を承認なく外部Serviceへ送信させない。

## Tailscale

Tailscaleについては、Client側で必要な一般的準備のみ公開Docsへ掲載できる。

公開可能な内容:

* Tailscale ClientのInstall
* Sign in
* 接続状態の確認
* 公式Documentation
* Coderへ接続する前にTailscale接続を確認すること

公開しない内容:

* Tailnet固有Identifier
* 内部Address
* Coderの接続先
* 内部DNS名
* 管理設定
* 認証情報

## Starlight Component

Starlight標準機能を優先する。

維持するもの:

* Sidebar
* Page TOC
* Mobile Menu
* Search
* Previous / Next Navigation
* Theme Selector

注意事項にはStarlight Asideを使用する。

```md
:::note
補足情報
```

````

使い分け:

- `note`: 補足、提供状況、前提
- `tip`: 推奨方法
- `caution`: ミスすると問題になる操作
- `danger`: Data消失、Secret漏洩、Security上重大な操作

Calloutを通常説明の代わりに乱用しない。

## Layout

Cloudflare Docsのような情報密度と読みやすさを目標にする。

- HeaderはCompactにする。
- 本文Columnを読みやすい幅に保つ。
- 概念一覧にはCardを利用できる。
- 比較にはTableを利用する。
- 注意事項にはAsideを利用する。
- 長大なTableを避ける。
- Mobileで横幅が破綻しないようにする。

Custom Styleは原則として `src/styles/docs.css` にまとめる。

既存Component Patternで解決できる場合、場当たり的なInline Styleを追加しない。

Light / Dark Themeの双方でContrastを確認する。

## 公式情報

可能な限り一次情報を参照する。

- Coder: `https://coder.com/docs`
- Visual Studio Code: `https://code.visualstudio.com/docs`
- Git: `https://git-scm.com/book/ja/v2`
- GitHub: `https://docs.github.com/ja`
- GitHub CLI: `https://cli.github.com/manual/`
- Node.js: `https://nodejs.org/docs/latest/api/`
- npm: `https://docs.npmjs.com/`
- Python: `https://docs.python.org/ja/`
- Python venv: `https://docs.python.org/3/library/venv.html`
- pip: `https://pip.pypa.io/en/stable/`
- NVIDIA: `https://docs.nvidia.com/deploy/nvidia-smi/`
- OpenCode: `https://opencode.ai/docs`
- Claude Code: `https://docs.anthropic.com/en/docs/claude-code/overview`
- Codex: `https://developers.openai.com/codex/`

URL、Command、仕様、Versionが変更される可能性がある場合は、掲載前に確認する。

## 検証

内容、Navigation、Configurationを変更した後は次を確認する。

1. Build
2. Page生成
3. Search Index
4. Internal Link
5. GitHub PagesのBase Path
6. 非公開情報の混入
7. Desktop Layout
8. Mobile Layout

Build:

```bash
BASE_PATH=/ct-kitamuralab-docs npm run build
````

次を確認する。

* Build Errorがない。
* 対象ページが生成されている。
* PagefindがIndexを作成している。
* Internal LinkがBase Path配下で解決できる。
* Secretや内部Infrastructure情報が生成物へ含まれていない。

LayoutやNavigationを変更した場合はDesktopとMobileの双方で確認する。

大きなLayout変更では必要に応じてMobile Lighthouseを実行し、Accessibilityの明確な低下を残さない。

## Git操作

ユーザーから明示的に依頼されていない限り、CommitやPushを行わない。

変更を行った場合は、変更したFileと検証結果を明確に報告する。
:::