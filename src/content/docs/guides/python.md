---
title: Python環境
description: プロジェクトごとにPythonの仮想環境を作成し、Pythonファイルを実行する方法です。
---

Pythonの仮想環境を作成し、Pythonファイルを実行するまでの手順を説明します。ここではPythonに付属する `venv` を使い、プロジェクトごとに環境を分ける仕組みを学びます。

ライブラリの追加や環境の共有は、[Pythonのパッケージ管理：pipとuv](../python-packages/)で説明します。新しいプロジェクトをuvで管理したい場合は、そちらの手順から始めてください。

## 仮想環境とは

仮想環境（Virtual Environment）は、プロジェクト専用のPython実行環境です。Pythonへ追加するライブラリをプロジェクトごとに分けられます。

OS全体でライブラリを共有すると、あるプロジェクトの更新が別のプロジェクトに影響することがあります。仮想環境を分ければ、異なるバージョンが必要なプロジェクトを同じPCで扱えます。

このページでは、次の順番で作業します。

```text
Pythonを確認する → 仮想環境を作る → 有効化する → Pythonファイルを実行する
```

## 1. Pythonを確認する

Coder Workspace、またはPythonが導入されたLinux・macOSのTerminalで実行します。以下の有効化手順はbash・zsh向けです。

```bash
python3 --version
```

`python3` はPythonを起動するコマンド、`--version` はバージョンを表示するオプションです。`Python 3.x.x` の形式で表示されれば利用できます。

`command not found` が表示される場合は、Pythonの導入状況を確認してください。Coder Workspaceでは管理者へ相談してください。

## 2. 仮想環境を作成する

既存プロジェクトではそのフォルダに移動します。練習用に新しく作る場合は、ホームフォルダに `python-practice` を作成します。

```bash
mkdir -p ~/projects/python-practice
cd ~/projects/python-practice
python3 -m venv .venv
```

- `mkdir -p`: フォルダを作成します。途中のフォルダがなければまとめて作成します。
- `~`: 自分のホームフォルダを表します。
- `cd`: 作業するフォルダを移動します。
- `-m venv`: Pythonの標準モジュール `venv` を実行します。モジュールはPythonの機能をまとめたものです。
- `.venv`: 作成する仮想環境のフォルダ名です。

作成後、Pythonの実行ファイルがあることを確認します。

```bash
.venv/bin/python --version
```

Pythonのバージョンが表示されれば、仮想環境内のPythonを起動できています。

## 3. 仮想環境を有効化する

Terminalで `python` と入力したときに、プロジェクトの仮想環境を使うように切り替えます。

```bash
source .venv/bin/activate
```

`source` は設定用のスクリプトを現在のTerminalへ読み込むコマンドです。`.venv/bin/activate` が切り替え用のスクリプトです。

使用中のPythonを確認します。

```bash
python -c "import sys; print(sys.executable)"
```

`-c` は引用符内のPythonコードを実行します。`import sys` はPythonの実行環境を調べる標準モジュールを読み込み、`print(sys.executable)` は使用中のPythonの場所を表示します。表示されたパスが `python-practice/.venv/bin/python` で終われば、この仮想環境を使っています。

:::note
仮想環境の有効化は、現在のTerminalだけに適用されます。新しいTerminalでは、プロジェクトへ移動して再度 `source .venv/bin/activate` を実行してください。
:::

## 4. Pythonファイルを実行する

VS Codeなどのエディタで、プロジェクトのフォルダに `hello.py` を作成し、次の内容を保存します。

```python
print("Hello, Python!")
```

`print()` は文字を画面へ表示する関数です。引用符で囲んだ `"Hello, Python!"` は文字列です。

仮想環境を有効化したTerminalで実行します。

```bash
python hello.py
```

`hello.py` は実行するファイル名です。次の表示が出れば成功です。

```text
Hello, Python!
```

`can't open file` と表示される場合は、Terminalで開いているフォルダと、ファイル名・保存先が一致しているか確認してください。

作業を終えて仮想環境の使用を解除する場合は、次を実行します。ファイルや仮想環境自体は削除されません。

```bash
deactivate
```

`deactivate` は有効化前の状態に戻すコマンドです。再度Pythonの場所を確認すると、仮想環境外のPythonに戻ったことが分かります。環境によっては `python` が見つからなくなるため、その場合は `python3 --version` で確認します。

## 保存場所とGit管理

`.venv` はGitへ保存せず、必要なライブラリの一覧から作り直します。記録するファイルと復元方法は、[パッケージ管理のガイド](../python-packages/)を参照してください。

Coder Workspaceの保存場所については、[ファイルと永続化](../../getting-started/coder/persistence/)を確認してください。

## Next steps

- [Pythonのパッケージ管理：pipとuv](../python-packages/) — ライブラリの追加、依存関係の記録、別の環境での復元を学びます。
- [GPUを利用する](../../getting-started/coder/gpu/) — GPUの確認と、GPU計算に必要なPythonライブラリの注意点を確認します。
- [Python公式のvenvドキュメント](https://docs.python.org/3/library/venv.html) — Windowsなど、ほかのOS・Shellでの有効化方法も確認できます。
