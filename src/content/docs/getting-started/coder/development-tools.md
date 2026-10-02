---
title: 開発ツール
description: Coder Workspaceに標準で導入される開発ツールと、用途別の公式ドキュメントを紹介します。
---

Coder Workspaceには、研究コードの開発・管理に必要な基本ツールが導入されています。Workspaceの起動直後から利用できるため、手元のPCに同じ環境を構築する必要はありません。

## 利用できるツール

| ツール | 用途 | 公式情報(使い方Docs) |
| --- | --- | --- |
| [Git](https://git-scm.com/) | コードの変更履歴を管理する | [Pro Git](https://git-scm.com/book/ja/v2) |
| [GitHub CLI](https://cli.github.com/) | TerminalからGitHubを操作する | [公式マニュアル](https://cli.github.com/manual/) |
| [Node.js](https://nodejs.org/) 24 | JavaScript・TypeScriptの実行環境 | [Node.js Docs](https://nodejs.org/docs/latest/api/) |
| [npm](https://www.npmjs.com/) | Node.js Packageを管理する | [npm Docs](https://docs.npmjs.com/) |
| [NVM](https://github.com/nvm-sh/nvm) | Node.jsのVersionを管理する | [NVM README](https://github.com/nvm-sh/nvm#readme) |
| [TeX Live](https://www.tug.org/texlive/) | 論文などの文書を書く（LaTeX） | [日本語TeXユーザーグループ](https://www.tex.jp/) |
| [Typst](https://typst.app/) | 文書を書く（LaTeXの代替） | [Typst Docs](https://typst.app/docs/) |
| [latexmk](https://ctan.org/pkg/latexmk) | LaTeXのコンパイルを自動で実行する | [CTANページ](https://ctan.org/pkg/latexmk) |
| [chktex](https://ctan.org/pkg/chktex) | LaTeXソースの誤りをチェックする | [CTANページ](https://ctan.org/pkg/chktex) |
| [CMake](https://cmake.org/) | C/C++のProjectをビルドする | [CMake Documentation](https://cmake.org/documentation/) |
| [ccache](https://ccache.dev/) | C/C++のCompileを高速化する | [ccache公式](https://ccache.dev/) |
| [build-essential](https://packages.ubuntu.com/noble/build-essential) | CコンパイラのToolchain（gcc、g++、make） | [UbuntuのPackageページ](https://packages.ubuntu.com/noble/build-essential) |
| [VS Code](https://code.visualstudio.com/) | コードを編集する | [VS Code Docs](https://code.visualstudio.com/docs) |
| AI Coding Agent | AIを使ったコード作成・レビュー支援 | [AI Coding Agent](../../../guides/ai-coding-agents/) |

PythonのProject環境は、[Python環境](../../../guides/python/)を参照してください。

Workspace作成時にzsh-dotfilesを有効にすると、zshと研究室向けの設定を利用できます。

## バージョンを確認する

WorkspaceのTerminalで、導入済みのツールとバージョンを確認できます。

```bash
git --version
gh --version
node --version
npm --version
nvm --version
latexmk -v
typst --version
cmake --version
ccache --version
```

各ツールでバージョン情報が表示されれば、そのまま利用できます。`command not found` などのエラーが表示された場合は、Workspace名とエラー内容で管理者へ連絡してください。

:::note
一部ツール（TeX、Typstなど）のバージョンは、Workspaceの起動時にも「環境設定」のScript出力で表示されます。
:::

## Node.jsとnpmを使う

Node.js Projectは、永続化される`/home/coder`以下に作成します。

```bash
mkdir -p /home/coder/projects/my-project
cd /home/coder/projects/my-project
npm init -y
```

依存Packageを導入したら、`package.json`とLock FileをGitへCommitします。`node_modules`は通常Git管理しません。詳しくは[npmのpackage.jsonガイド](https://docs.npmjs.com/cli/v11/configuring-npm/package-json)を参照してください。

## 文書を書く（TeX/Typst）

Workspaceには、LaTeX用の[TeX Live](https://www.tug.org/texlive/)と、[Typst](https://typst.app/)が導入されています。日本語フォント（IPA Gothic、IPA Mincho）も揃っているため、論文などの文書を作成してPDFに出力できます。

### LaTeX（.texファイル）で書く

`main.tex` というファイルを作成し、次のように記述します。

```latex
\documentclass{article}
\usepackage{luatexja}
\setmainluatexjafont{IPA Mincho}
\begin{document}
こんにちは、LaTeX!
\end{document}
```

- `\documentclass{article}`: 文書の種類（article = 論文・レポート向け）を宣言します
- `\usepackage{luatexja}`: LuaLaTeXで日本語を組版できるようにするPackage
- `\setmainluatexjafont{IPA Mincho}`: 日本語フォントをIPA Minchoに指定します（Workspaceに導入済み）
- `\begin{document}` / `\end{document}`: この間が文書本文です

Terminalから次のコマンドでコンパイルします。

```bash
latexmk -lualatex main.tex
```

- `latexmk`: 必要な回数だけLaTeXを自動で繰り返し実行するツールです
- `-lualatex`: LuaLaTeXというエンジンを使うことを指定します
- `main.tex`: コンパイルするSourceファイルの名前です

成功すると、同じフォルダに`main.pdf`が生成されます。

:::note
コンパイルで生成される補助ファイル（`.aux`、`.log`など）を削除するには、`latexmk -c` を実行します。Gitで管理する場合は、通常は`.tex`のSourceをCommitし、補助ファイルやPDFはCommitしません。
:::

### Typst（.typファイル）で書く

Typstは、LaTeXよりシンプルな記述で文書を作成できるシステムです。`main.typ` というファイルを作成し、次のように記述します。

```typ
#set page(paper: "a4")

こんにちは、Typst!
```

- `#`: Typstの設定・関数の前に付ける記号です
- `#set page(paper: "a4")`: 用紙サイズをA4に設定します

Terminalから次のコマンドでコンパイルします。

```bash
typst compile main.typ
```

- `typst compile`: SourceファイルをPDFへ変換するコマンドです
- `main.typ`: コンパイルするSourceファイルの名前です

成功すると、同じフォルダに`main.pdf`が生成されます。編集しながら作る場合は、`typst watch main.typ` を実行すると、ファイルの保存ごとに自動で再コンパイルされます。

LaTeXの詳しい書き方は[日本語TeXユーザーグループ](https://www.tex.jp/)、Typstの書き方は[Typst Docs](https://typst.app/docs/)を参照してください。

## GitHub CLIを使う

`gh`はTerminalからRepository、Issue、Pull Requestを操作できます。Gitで作成したCommitをGitHubへ保存する基本操作は、[GitHubへ保存する](../../../guides/github/)で説明しています。

:::caution
公開Repositoryへ研究データや秘密情報をpushしないよう、[GitHubへ保存する](../../../guides/github/)の注意事項も確認してください。
:::

## 保存場所

Project、設定、Virtual Environmentなどは`/home/coder`以下へ保存してください。保存先のルールは[ファイルと永続化](../persistence/)で説明しています。

## Next steps

- [Python環境](../../../guides/python/) — Workspace内に再現可能なPython Virtual Environmentを構築する方法です。
- [AI Coding Agent](../../../guides/ai-coding-agents/) — Workspaceに導入されているAI Coding Agentの用途、安全な利用方法、公式ドキュメントを案内します。
