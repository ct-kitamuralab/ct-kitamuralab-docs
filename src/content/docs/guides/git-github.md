---
title: GitとGitHub
description: WorkspaceでGitを設定し、研究コードをGitHubへBackupするための基本方針です。
---

研究コードはGitで変更履歴を管理し、GitHubなどのRemote Repositoryへ定期的にpushすることを推奨します。Gitの基礎は[Pro Git](https://git-scm.com/book/ja/v2)、Repository運用は[GitHub Docs](https://docs.github.com/ja)を参照してください。

## 設定を確認する

Workspaceでは、利用者の情報からGitのユーザー情報が自動設定されている場合があります。確認するには次を実行します。

```bash
git config --global --list
```

`user.name` や `user.email` が表示されず、自分の情報になっていない場合は、次のように設定します。

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## 最小ワークフロー

研究コードをGitHubへ保存する基本の流れは次の通りです。

```bash
# まずGithub上にあるコードを手元のディレクトリにコピー(clone)する。(新規作成する場合はスキップ)
git clone https://github.com/OWNER/REPOSITORY.git
# cloneしたリポジトリに移動する
cd REPOSITORY
```

編集ごとに次を実行します。

```bash
git status            # 変更されたファイルを確認
git add .             # 変更をCommitへ追加
git diff --staged     # Commitに含める内容を確認
git commit -m "change description"
git push              # Remote Repositoryへ保存
```

各コマンドの役割とGitの基礎は[Pro Git](https://git-scm.com/book/ja/v2)で確認できます。

## GitHub CLIを使う

WorkspaceではGitHub CLI（`gh`）も利用できます。初回利用は、次のコマンドでGitHubへ認証します。

```bash
gh auth login
```

画面の案内に従い、GitHubのブラウザ認証を完了します。認証が成功すると、次のようにRepositoryをTerminalからcloneできます。

```bash
gh repo clone OWNER/REPOSITORY
```

CLIによるGitHub操作は[GitHub CLI公式マニュアル](https://cli.github.com/manual/)で確認できます。

:::caution
認証時に表示されるTokenや認証コードは他人に共有しないでください。
:::

## 推奨する運用

- 作業単位ごとにCommitする
- 研究コードを定期的にRemote Repositoryへpushする
- 大きなDataや生成物を無条件にGitへ追加しない
- `requirements.txt` や `pyproject.toml` など、環境を再現するファイルをCommitする
- `.gitignore` を確認する

大きなData（Dataset、モデルの生成物など）はGitへ追加せず、[ファイルと永続化](../../coder/persistence/)で説明する `/home/coder` 以下に保存し、必要に応じて別の保存先へ退避してください。

## 秘密情報をCommitしない

API Key、Token、Password、個人情報、未公開DataをGit RepositoryへCommitしないでください。

:::danger
秘密情報を一度pushすると、後からファイルを削除しても履歴に残ることがあります。Commit前に `git status` と差分を確認してください。
:::

## Next steps

- [開発ツール](development-tools/) — Coder Workspaceに標準で導入される開発ツールと、用途別の公式ドキュメントを紹介します。
- [ファイルと永続化](../../coder/persistence/) — Workspace内で保持されるファイルの保存先とBackup方法を説明します。
