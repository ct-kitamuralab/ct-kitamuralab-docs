---
title: Linuxターミナルの基本
description: Coder Workspaceでファイル操作や開発コマンドを安全に実行するための、Linuxターミナルの基本を説明します。
---

本ガイドでは、Coder WorkspaceのTerminalでファイルやディレクトリを操作する基本コマンドを使います。作業中のディレクトリを確認しながら操作することで、Projectを整理して安全に扱えます。

この例では、Project用のディレクトリを作成し、ファイルの確認、移動、コピーができるようになります。

## コマンド名の略称

多くのLinuxコマンドは英単語を短くした名前です。意味を知っておくと、初めてのコマンドでも役割を推測しやすくなります。

| コマンド | 由来 | 用途 |
| --- | --- | --- |
| `pwd` | print working directory | 作業中のディレクトリを表示する |
| `ls` | list | ファイルとディレクトリを一覧表示する |
| `cd` | change directory | ディレクトリを移動する |
| `mkdir` | make directory | ディレクトリを作成する |
| `cp` | copy | ファイルやディレクトリをコピーする |
| `mv` | move | ファイルやディレクトリを移動・名前変更する |
| `rm` | remove | ファイルやディレクトリを削除する |
| `touch` | touch | ファイルが存在しない場合、空のファイルを作成する |

## Terminalを開く

WorkspaceでTerminalを開き、次のコマンドを実行してください。`pwd` は現在作業しているディレクトリを表示します。

```bash
pwd
```

次のように `/home/coder` またはその配下のパスが表示されれば、作業を始められます。

```text
/home/coder
```

表示されない場合は、次のコマンドでホームディレクトリへ移動してください。

```bash
cd /home/coder
pwd
```

移動できると、`pwd` は次のように表示します。

```text
/home/coder
```

:::note
コマンドは、Enterを押すまで実行されません。入力した内容と作業中のディレクトリを確認してから実行してください。
:::

## ファイルとディレクトリ

### 一覧を確認する

`ls` は作業中のディレクトリにあるファイルとディレクトリを表示します。`-la` を付けると、隠しファイルを含む詳しい一覧を確認できます。

```bash
ls
```

表示される内容は環境によって異なります。次の例では、`projects` というディレクトリが表示されています。

```text
projects
```

```bash
ls -la
```

`.` と `..` を含む詳しい一覧が表示されます。`projects` がまだない場合も、次の手順で作成できます。

```text
drwxr-xr-x  2 coder coder 4096 Jan  1 12:00 .
drwxr-xr-x  3 coder coder 4096 Jan  1 12:00 ..
drwxr-xr-x  2 coder coder 4096 Jan  1 12:00 projects
```

### 移動と作成

`cd` でディレクトリを移動し、`mkdir -p` でディレクトリを作成します。次の例では、Project用の場所と空のファイルを作成します。

```bash
mkdir -p /home/coder/projects/my-research
cd /home/coder/projects/my-research
touch README.md
ls
```

`README.md` が表示されれば成功です。

```text
README.md
```

パスを間違えた場合は、`pwd` で作業中のディレクトリを確認し、`cd /home/coder/projects/my-research` をもう一度実行してください。

:::tip
`cd ..` は1つ上のディレクトリへ、`cd` だけの実行はホームディレクトリへ移動します。
:::

## ファイル操作

### コピーと名前変更

`cp` はファイルをコピーし、`mv` はファイルの移動または名前変更に使います。操作後に `ls` で結果を確認してください。

```bash
cp README.md README-copy.md
mv README-copy.md NOTES.md
ls
```

`README.md` と `NOTES.md` が表示されれば成功です。

```text
NOTES.md  README.md
```

ディレクトリごとコピーするときは、`cp -r source-directory destination-directory` を使います。

### 削除

不要なファイルは `rm` で削除できます。削除前に `ls` で対象の名前を確認してください。

```bash
rm NOTES.md
ls
```

`NOTES.md` が一覧から消え、`README.md` だけが表示されれば成功です。

```text
README.md
```

対象が見つからないというエラーが表示された場合は、`pwd` と `ls` で作業中のディレクトリと名前を確認してください。

:::danger
`rm` で削除したファイルは通常元に戻せません。特に `rm -r` や `rm -rf` はディレクトリと中身をまとめて削除するため、意味を理解するまで使用しないでください。
:::

## Terminal操作

作業中によく使う操作を確認します。

| 操作 | 用途 |
| --- | --- |
| `Tab` | ファイル名やコマンドを補完する |
| `Ctrl + C` | 実行中のコマンドを中断する |
| `clear` | 画面の表示を消去する |
| `history` | 実行したコマンドの履歴を表示する |

`Tab` を使うと、長いパスの入力ミスを減らせます。補完候補が複数ある場合は、`Tab` をもう一度押して候補を表示してください。

## 保存場所

Project、設定、Virtual Environmentは、永続化される `/home/coder` 以下に保存してください。Workspaceを再構築するとOS全体への変更が失われる場合があります。

[ファイルと永続化](../coder/persistence/)では、Workspaceで保持されるファイルの保存先とBackup方法を説明しています。

## Next steps

- [GitとGitHub](git-github/) — 研究コードの変更履歴を記録し、Remote Repositoryへ保存する基本手順です。
- [Python環境](python/) — ProjectごとにPython Virtual Environmentを作成し、依存関係を再現可能にする方法です。
- [ファイルと永続化](../coder/persistence/) — Workspaceの再構築後も残すべきファイルの保存先を確認できます。
