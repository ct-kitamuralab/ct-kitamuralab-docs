---
title: GitとGitHub
description: WorkspaceでGitを設定し、研究コードをGitHubへBackupするための基本操作です。英語UIの見方と最小ワークフローを画像で説明します。
---

研究コードはGitで変更履歴を管理し、GitHubなどのRemote Repositoryへ定期的にpushすることを推奨します。このページでは、Gitの設定から、英語のGitHub画面の見方、Repositoryの作成、最小ワークフロー（clone→commit→push）までを説明します。Gitの基礎は[Pro Git](https://git-scm.com/book/ja/v2)、Repository運用は[GitHub Docs](https://docs.github.com/ja)を参照してください。

## Gitを設定する

Workspaceでは、利用者の情報からGitのユーザー情報が自動設定されている場合があります。確認するには次を実行します。

```bash
git config --global --list
```

`user.name` や `user.email` が表示されず、自分の情報になっていない場合は、次のように設定します。

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

設定が完了すれば `git status` にエラーが出なくなります。

## 新規Repositoryを作る

まずはGitHub上にRepositoryを作ります。GitHubのアカウントでログインし、右上の **+** メニューから **New repository** を選ぶと、作成フォームが開きます。

- **Repository name**：リポジトリ名（`research-notes` のように英数字で付けます）
- **Description**：説明（任意）
- **Public / Private**：公開するか非公開にするかの切り替え。研究コードが外部に見えたら困る場合は **Private** にします
- **Add a README**：チェックすると空のREADMEが最初にCommitされます

最後に **Create repository** ボタンで確定すると、次の「GitHubの画面」に移動します。

## GitHubの画面

Repositoryページは英語で表示されます。左のファイル一覧、上部のタブ、緑の **Code** ボタンが主な操作入口です。

![GitHubのRepositoryトップ画面](../../../assets/screenshots/github-repo-main-view.png)

- **Code**（緑のボタン）：このリポジトリのコードをダウンロード（clone）するための場所
- **Branch**（`main` と表示）：作業するブランチの選択。通常は `main` のままです
- **Go to file**：リポジトリ内のファイルを名前から検索する欄
- **Issues / Pull requests / Actions**：問題・変更提案・自動処理のタブ。まずは `Code` に絞ります

## Clone URLを取得する

緑の **Code** ボタンを押すと、ドロップダウンが開きます。ここに **Clone用のURL** が表示され、コピーボタンでコピーできます。

![Codeボタンのドロップダウン（Clone URLが表示される）](../../../assets/screenshots/github-code-dropdown.png)

- **HTTPS / GitHub CLI**：上段のタブ。`git clone` には **HTTPS** 側を使う
- **コピーボタン**：URL欄の右にあるアイコンで、URLをコピーします
- このURLを `git clone` の引数に用います

## 最小ワークフロー

clone（手元にコピー）からcommit・pushまでの基本の流れは、次のGIFの通りです。

![gitの最小ワークフロー（cloneからpushまで）](../../../assets/screenshots/git-workflow.gif)

まずはGitHub上のコードを手元のディレクトリにcloneします（新規作成で空のRepositoryの場合は、READMEだけcloneしてもよいです）。

```bash
# Clone URLをコピーしてcloneする
git clone <コピーしたClone URL>
# cloneしたリポジトリに移動する
cd REPOSITORY
```

コードを編集したあと、編集ごとに次を実行します。

```bash
git status            # 変更されたファイルを確認
git add .             # 変更をCommitへ追加
git diff --staged     # Commitに含める内容を確認
git commit -m "change description"
git push              # Remote Repositoryへ保存
```

- `git status`：何が変更されたかを確認します。`modified:` や `Untracked files:` と表示される
- `git add .`：変更をCommitに含める対象へ追加します
- `git commit`：変更を履歴に記録します。`-m` に変更内容の短い説明を書きます
- `git push`：Remote Repository（GitHub側）へ保存します

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

- [開発ツール](../development-tools/) — Coder Workspaceに標準で導入される開発ツールと、用途別の公式ドキュメントを紹介します。
- [ファイルと永続化](../../coder/persistence/) — Workspace内で保持されるファイルの保存先とBackup方法を説明します。
