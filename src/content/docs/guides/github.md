---
title: GitHubへ保存する
description: Gitで記録したCommitをGitHubへ保存し、他の場所で作られた変更を取り込む方法を説明します。
---

GitHubは、Gitで記録したCommitをネットワーク上へ保存・共有するサービスです。GitHubへ保存すると、PCやWorkspace以外にも履歴を置けるため、バックアップや共同作業に利用できます。このページでは、GitHubのRepositoryを作成し、Commitをpush・pullする流れを説明します。

## まず知っておくこと

- **GitHub Repository**: GitHub上でCommitとファイルを保存する場所です。
- **push**: 自分の作業フォルダにあるCommitをGitHubへ送る操作です。
- **pull**: GitHubにある新しいCommitを自分の作業フォルダへ取り込む操作です。
- **clone**: GitHub上のRepositoryを作業フォルダへコピーして、作業を始める操作です。

```text
自分の作業フォルダ
  |  push: Commitを送る
  v
GitHub Repository
  |  pull: 新しいCommitを取り込む
  v
自分の作業フォルダ
```

## 前提条件

- GitHubアカウントで[GitHub](https://github.com/)へログインできること
- Gitで少なくとも1つのCommitを作成済みであること

まだCommitを作っていない場合は、先に[変更をCommitする](../git-commit/)を完了してください。

## 1. GitHubでRepositoryを作る

GitHubの右上にある**+**メニューから**New repository**を選び、Repositoryを作成します。

- **Repository name**: Repositoryの名前です。例では`research-notes`を使います。
- **Description**: Repositoryの説明です。入力は任意です。
- **Public / Private**: 外部へ公開するかを選びます。研究コードや未公開データを含む場合は**Private**を選びます。

:::danger
Public Repositoryの内容は誰でも閲覧できます。API Key、Token、Password、個人情報、未公開の研究データを含むファイルはpushしないでください。一度pushした情報は、ファイルを削除してもCommit履歴に残ることがあります。
:::

ローカルで既にCommitを作成している場合は、**Add a README**を選ばずにRepositoryを作成します。GitHub側で先にCommitを作らないため、その後の接続手順が分かりやすくなります。

## 2. 作業フォルダとGitHubを接続する

作成直後のGitHub Repositoryで、緑色の**Code**ボタンを選び、**HTTPS**のClone URLをコピーします。

![Codeボタンのドロップダウン（Clone URLが表示される）](../../../assets/screenshots/github-code-dropdown.png)

Terminalで作業フォルダへ移動し、コピーしたURLを使って接続します。

```bash
cd /path/to/your-project
git remote add origin https://github.com/YOUR-USERNAME/research-notes.git
```

- `remote`: GitHubのようなネットワーク上のRepositoryを登録するサブコマンドです。
- `add`: 新しい接続先を追加します。
- `origin`: GitHubの接続先に付ける慣例的な名前です。
- URL: GitHubからコピーしたClone URLです。

次のコマンドで、`origin`とURLが表示されることを確認します。

```bash
git remote -v
```

```text
origin  https://github.com/YOUR-USERNAME/research-notes.git (fetch)
origin  https://github.com/YOUR-USERNAME/research-notes.git (push)
```

## 3. GitHubへpushする

最初のpushでは、GitHubへ送るブランチを指定します。

```bash
git push -u origin main
```

- `push`: ローカルのCommitをGitHubへ送るサブコマンドです。
- `-u`: 今後の`git push`で接続先とブランチ名を省略できるよう設定します。
- `origin`: 2で登録したGitHubの接続先です。
- `main`: 送るブランチの名前です。

初回pushが成功した後は、VS Codeのソース管理タブにある**変更の同期**を選ぶか、Terminalで次を実行すると、新しいCommitをGitHubへ送れます。

```bash
git push
```

GitHubのRepositoryページを更新し、CommitしたファイルとCommitメッセージが表示されれば成功です。

![GitHubのRepositoryトップ画面](../../../assets/screenshots/github-repo-main-view.png)

## 4. GitHubの変更をpullする

他のPCや共同作業者がGitHubへ新しいCommitをpushしている場合は、作業を始める前に取り込みます。VS Codeではソース管理タブの**変更の同期**を選びます。Terminalでは次のコマンドを実行します。

```bash
git pull
```

- `pull`: GitHubから新しいCommitを取得し、現在の作業フォルダへ反映するサブコマンドです。

:::caution
未Commitの変更がある状態でpullすると、同じ箇所を変更していた場合に競合することがあります。先に[変更をCommitする](../git-commit/)の手順で作業を記録してからpullしてください。
:::

## GitHub上のRepositoryから始める場合

既にGitHubにあるRepositoryで作業を始める場合は、`git clone`で作業フォルダへコピーします。

```bash
cd /path/to/projects
git clone https://github.com/YOUR-USERNAME/research-notes.git
cd research-notes
```

- `clone`: GitHub RepositoryとそのCommit履歴を作業フォルダへコピーするサブコマンドです。
- `cd research-notes`: cloneで作られたフォルダへ移動します。

cloneしたRepositoryは、最初からGitHubと接続されています。編集後は[変更をCommitする](../git-commit/)を行い、`git push`または**変更の同期**でGitHubへ送ります。

## Next steps

- [変更をCommitする](../git-commit/) - VS Codeのソース管理タブを使って変更を確認し、Commitを作ります。
- [ファイルと永続化](../../coder/persistence/) - Workspace内で保持されるファイルの保存先とBackup方法を説明します。
