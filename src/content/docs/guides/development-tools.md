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
| [VS Code](https://code.visualstudio.com/) | コードを編集する | [VS Code Docs](https://code.visualstudio.com/docs) |
| AI Coding Agent | AIを使ったコード作成・レビュー支援 | [AI Coding Agent](../ai-coding-agents/) |

PythonのProject環境は、[Python環境](../python/)を参照してください。

Workspace作成時にzsh-dotfilesを有効にすると、zshと研究室向けの設定を利用できます。

## バージョンを確認する

WorkspaceのTerminalで、導入済みのツールとバージョンを確認できます。

```bash
git --version
gh --version
node --version
npm --version
nvm --version
```

各ツールでバージョン情報が表示されれば、そのまま利用できます。`command not found` などのエラーが表示された場合は、Workspace名とエラー内容で管理者へ連絡してください。

## Node.jsとnpmを使う

Node.js Projectは、永続化される`/home/coder`以下に作成します。

```bash
mkdir -p /home/coder/projects/my-project
cd /home/coder/projects/my-project
npm init -y
```

依存Packageを導入したら、`package.json`とLock FileをGitへCommitします。`node_modules`は通常Git管理しません。詳しくは[npmのpackage.jsonガイド](https://docs.npmjs.com/cli/v11/configuring-npm/package-json)を参照してください。

## GitHub CLIを使う

`gh`はTerminalからRepository、Issue、Pull Requestを操作できます。初回認証（`gh auth login`）の手順は[GitとGitHub](../git-github/)で説明しています。

:::caution
公開Repositoryへ研究データや秘密情報をpushしないよう、[GitとGitHub](../git-github/)の注意事項も確認してください。
:::

## 保存場所

Project、設定、Virtual Environmentなどは`/home/coder`以下へ保存してください。保存先のルールは[ファイルと永続化](../../coder/persistence/)で説明しています。

## Next steps

- [Python環境](../python/) — Workspace内に再現可能なPython Virtual Environmentを構築する方法です。
- [AI Coding Agent](../ai-coding-agents/) — Workspaceに導入されているAI Coding Agentの用途、安全な利用方法、公式ドキュメントを案内します。
