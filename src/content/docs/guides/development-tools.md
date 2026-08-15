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
| [VS Code](https://code.visualstudio.com/) | コードを編集する | [VS Code Docs](https://code.visualstudio.com/docs) |
| AI Coding Agent | AIを使ったコード作成・レビュー支援 | [AI Coding Agent](../ai-coding-agents/) |

PythonのProject環境は、[Python環境](python/)を参照してください。

## バージョンを確認する

WorkspaceのTerminalで、導入済みのバージョンを確認できます。

```bash
git --version
gh --version
node --version
npm --version
```

## Node.jsとnpmを使う

Node.js Projectは、永続化される`/home/coder`以下に作成します。

```bash
mkdir -p /home/coder/projects/my-project
cd /home/coder/projects/my-project
npm init -y
```

依存Packageを導入したら、`package.json`とLock FileをGitへCommitします。`node_modules`は通常Git管理しません。詳しくは[npmのpackage.jsonガイド](https://docs.npmjs.com/cli/v11/configuring-npm/package-json)を参照してください。

## GitHub CLIを使う

`gh`を使うと、TerminalからRepository、Issue、Pull Requestを操作できます。初回認証が必要な場合は、画面の案内に従ってください。

```bash
gh auth login
gh repo clone OWNER/REPOSITORY
```

:::caution
認証時に表示されるTokenや認証コードは他人に共有しないでください。公開Repositoryへ研究データや秘密情報をpushしないよう、[GitとGitHub](../git-github/)の注意事項も確認してください。
:::

## 保存場所
Project、設定、Virtual Environmentなどは`/home/coder`以下へ保存してください。Workspaceを再構築した場合に失われる可能性がある場所へ、必要なデータを置かないでください。詳細は[ファイルと永続化](../coder/persistence/)を参照してください。

## Next steps

- [Python環境](python/) — Workspace内に再現可能なPython Virtual Environmentを構築する方法です。
- [AI Coding Agent](ai-coding-agents/) — Workspaceに導入されているAI Coding Agentの用途、安全な利用方法、公式ドキュメントを案内します。
