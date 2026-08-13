---
title: GitとGitHub
description: WorkspaceでGitを設定し、研究コードをGitHubへBackupするための基本方針です。
---

研究コードはGitで変更履歴を管理し、GitHubなどのRemote Repositoryへ定期的にpushすることを推奨します。

## 設定を確認する

```bash
git config --global --list
```

必要に応じて、自分の情報を設定します。

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

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
