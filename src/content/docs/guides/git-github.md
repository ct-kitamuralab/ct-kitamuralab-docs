---
title: GitとGitHub
description: WorkspaceでGitを設定し、研究コードをGitHubへBackupするための基本方針です。
---

研究コードはGitで変更履歴を管理し、GitHubなどのRemote Repositoryへ定期的にpushすることを推奨します。Gitの基礎は[Pro Git](https://git-scm.com/book/ja/v2)、Repository運用は[GitHub Docs](https://docs.github.com/ja)を参照してください。

## 設定を確認する

```bash
git config --global --list
```

必要に応じて、自分の情報を設定します。

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Workspaceでは、GitHub CLI（`gh`）も利用できます。CLIによるGitHub操作は[GitHub CLI公式マニュアル](https://cli.github.com/manual/)を参照してください。

## 推奨する運用

- 作業単位ごとにCommitする
- 研究コードを定期的にRemote Repositoryへpushする
- 大きなDataや生成物を無条件にGitへ追加しない
- `requirements.txt` や `pyproject.toml` など、環境を再現するファイルをCommitする
- `.gitignore` を確認する

## 秘密情報をCommitしない

API Key、Token、Password、個人情報、未公開DataをGit RepositoryへCommitしないでください。

:::danger
秘密情報を一度pushすると、後からファイルを削除しても履歴に残ることがあります。Commit前に `git status` と差分を確認してください。
:::

## Next steps

- [開発ツール](development-tools/) — Coder Workspaceに標準で導入される開発ツールと、用途別の公式ドキュメントを紹介します。
- [ファイルと永続化](../../coder/persistence/) — Workspace内で保持されるファイルの保存先とBackup方法を説明します。
