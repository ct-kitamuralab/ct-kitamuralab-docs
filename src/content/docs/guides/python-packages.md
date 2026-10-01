---
title: Pythonのパッケージ管理：pipとuv
description: pipとuvの特徴・使い分け、パッケージの追加・削除、依存関係の記録と環境の復元を説明します。
---

Pythonへライブラリを追加するためのツール、pipとuvの特徴と使い方を説明します。パッケージの追加だけでなく、使用するバージョンを記録し、別のPCやWorkspaceで環境を作り直せるようになることを目指します。

**既存プロジェクトでは、そのプロジェクトの管理方法に従ってください。** 新しいプロジェクトではuvによる管理をおすすめします。必要なパッケージの記録と仮想環境の準備を、同じツールで行えるためです。

## まず知っておくこと

| 用語 | 意味 |
| --- | --- |
| パッケージ | インストールできる形で配布されたPythonのライブラリやツールです。例として、数値計算用のNumPyがあります。 |
| 依存関係 | プログラムやパッケージが動くために必要な、ほかのパッケージとの関係です。 |
| 仮想環境 | プロジェクト専用にパッケージを分けて保存するPython環境です。通常は `.venv` フォルダに作ります。 |
| パッケージ管理ツール | 必要なパッケージや、その依存先をインストールするツールです。 |
| Lock File | 使用するパッケージの正確なバージョンなどを記録するファイルです。uvでは `uv.lock` を使います。 |

例えばNumPyを追加すると、自分で数値計算の処理をすべて書かなくても、NumPyが提供する機能を使えます。以下では、このNumPyを導入して確認します。

## pipとuvの特徴・使い分け

pipはPythonのパッケージをインストールするツールです。uvはAstralが開発するPython管理ツールで、パッケージのインストールに加え、Pythonの導入や仮想環境・プロジェクトの管理も扱います。

| 比較する点 | pip | uv |
| --- | --- | --- |
| 仮想環境の作成 | `venv` などを別途使います | uvで作成できます |
| パッケージの追加 | `python -m pip install` | プロジェクト管理では `uv add` |
| このページでの依存関係の記録 | `requirements.txt` | `pyproject.toml` と `uv.lock` |
| Python自体の導入・選択 | 別途行います | uvでも管理できます |
| 特徴 | Pythonの公式チュートリアルや既存プロジェクトで広く使われています | Rustで実装され、依存関係の解決・インストールを高速に行う設計です |

uvの速度はパッケージの種類、通信速度、ダウンロード済みのデータの有無などによって変わります。Pythonプログラムそのものの計算が速くなるわけではありません。

最初から両方の手順を実行する必要はありません。`requirements.txt` とpipの手順が案内されているプロジェクトではpipを、`uv.lock` とuvの手順があるプロジェクトではuvを使います。`pyproject.toml` はuv以外でも使われるため、ファイル名だけで判断せずREADMEも確認してください。

## 操作前の確認

以下の例は、Linux・macOSのbash・zsh、またはCoder WorkspaceのTerminal向けです。ダウンロードが必要な操作にはインターネット接続が必要です。

pipの手順では、[Python環境](../python/)の手順で仮想環境を作り、有効化しておきます。プロジェクトのフォルダで次を実行してください。

```bash
python -m pip --version
```

`python -m pip` は、指定したPythonでpipを実行する書き方です。`-m` はモジュールの実行、`--version` はバージョン表示を指定します。pipのバージョンと、`.venv` 内の場所が表示されることを確認してください。`pip` だけで実行するより、使用するPythonとの対応を明確にできます。

uvを使う場合は、導入済みか確認します。

```bash
uv --version
```

`uv` とバージョン番号が表示されれば利用できます。このサイトでは、すべてのWorkspaceにuvが導入済みとは仮定しません。見つからない場合は、[uv公式のインストールガイド](https://docs.astral.sh/uv/getting-started/installation/)でOSに合う導入方法を確認してください。管理されたWorkspaceで導入方針が不明な場合は、管理者に相談してください。

## pipの基本操作

全体の流れは「仮想環境を有効化 → パッケージを追加 → 動作確認 → 一覧を記録」です。

### 1. パッケージを追加する

仮想環境にNumPyを追加します。

```bash
python -m pip install numpy
```

`install` はパッケージのインストール、`numpy` は追加するパッケージ名です。必要なファイルをダウンロードし、使用中のPython環境へインストールします。依存先があるパッケージでは、それらも導入されます。

NumPyを読み込めることを確認します。

```bash
python -c "import numpy; print(numpy.__version__)"
```

`-c` は引用符内のPythonコードを実行するオプションです。`import numpy` はNumPyを読み込み、`print(numpy.__version__)` はそのバージョンを表示します。バージョン番号が表示されれば、現在のPythonからNumPyを使えます。

### 2. 一覧を確認する・不要なものを削除する

インストール済みのパッケージを一覧表示します。

```bash
python -m pip list
```

`list` は名前とバージョンを表示します。一覧に `numpy` があることを確認してください。

NumPyが不要になった場合だけ、次を実行します。続く記録の練習で使う場合は、削除せずに進んでください。

```bash
python -m pip uninstall numpy
```

`uninstall` はパッケージを削除します。確認画面で削除対象を確認してから承認してください。再度 `python -m pip list` を実行すると、一覧からなくなったことを確認できます。依存先のパッケージまで自動でまとめて削除されるわけではありません。

### 3. requirements.txtに記録する

現在の環境のパッケージとバージョンを記録します。これは別の環境でインストールするための一覧です。

:::caution
次の `>` は、出力先のファイルを上書きします。既存の `requirements.txt` に手書きの指定やコメントがある場合は、上書きせず内容を確認してください。
:::

```bash
python -m pip freeze > requirements.txt
```

`freeze` はインストール済みのパッケージをバージョン指定付きで表示します。`>` はTerminalへの出力をファイルへ保存するShellの記号です。

エディタで `requirements.txt` を開き、`numpy==...` の形式でバージョンが記録されていることを確認してください。`==` は、そのバージョンを指定する意味です。

`freeze` は直接追加したパッケージだけでなく、依存先も記録します。一覧は現在の環境の記録であり、異なるOSやPythonでも必ず同じように動くことを保証するLock Fileではありません。Pythonのバージョンや必要なOSもREADMEに記録してください。

### 4. 記録から環境を復元する

別のPCなどでは、プロジェクトを用意し、仮想環境を作成・有効化してから実行します。

```bash
python -m pip install -r requirements.txt
```

`-r` は指定したファイルからインストール対象を読み込むオプションです。実行後は `python -m pip list` と、手順1のNumPy読み込みコマンドで確認します。既にある環境に実行しても、一覧にない余分なパッケージは削除されません。

## uvでプロジェクトを管理する

全体の流れは「プロジェクトを作成 → `uv add` で追加 → `uv run` で実行 → ファイルから復元」です。ここではpipの練習環境と分けて、新しいフォルダを作ります。仮想環境の手動作成・有効化は不要です。

### 1. プロジェクトを作成する

```bash
uv init --bare ~/projects/uv-practice
cd ~/projects/uv-practice
```

- `init`: プロジェクトを初期化します。
- `--bare`: サンプルコードなどを作らず、最小の `pyproject.toml` を作ります。
- `~/projects/uv-practice`: 新しいプロジェクトの保存先です。`~` はホームフォルダを表します。
- `cd`: 作業するフォルダへ移動します。

エディタで `pyproject.toml` を開き、プロジェクト名、Pythonの条件を表す `requires-python`、必要なパッケージを表す `dependencies` があることを確認してください。仮想環境は次の操作で準備されます。

既に `pyproject.toml` があるプロジェクトでは、`uv init` を再実行しません。READMEでuvを使うことを確認してから、そのフォルダで作業します。

### 2. パッケージを追加する

```bash
uv add numpy
```

`add` は必要なパッケージをプロジェクトへ追加するコマンドです。通常は次の処理をまとめて行います。

1. `pyproject.toml` にNumPyを必要なパッケージとして記録する。
2. 依存関係を解決し、正確なバージョンなどを `uv.lock` に記録する。
3. `.venv` を準備し、パッケージをインストールする。

必要なPythonが見つからない場合、uvがPythonをダウンロードすることもあります。`pyproject.toml` の `dependencies` に `numpy` が追加され、`uv.lock` と `.venv` が作成されたことを確認してください。

### 3. プロジェクトの環境で実行する

```bash
uv run python -c "import numpy; print(numpy.__version__)"
```

`run` はプロジェクトの環境で、後ろに指定したコマンドを実行します。実行前に依存関係と環境を確認し、必要なら更新します。NumPyのバージョン番号が表示されれば成功です。

ファイルを実行する場合は、エディタで `hello.py` を作成して次の内容を保存します。

```python
import numpy

print(numpy.__version__)
```

`import` でライブラリを読み込み、`print()` でバージョンを表示するコードです。

```bash
uv run python hello.py
```

バージョン番号が表示されます。`uv run` を使えば、毎回 `source .venv/bin/activate` で有効化する必要はありません。

### 4. 保存したファイルから環境を復元する

別のPCや新しいWorkspaceで、Gitに保存したプロジェクトを取得し、`pyproject.toml` と `uv.lock` があるフォルダで実行します。

```bash
uv sync --locked
```

`sync` はプロジェクトの依存関係に合わせて仮想環境を準備します。`--locked` はLock Fileの変更が必要ならエラーにする指定です。記録された依存関係を意図せず変更せずに復元できます。

:::caution
`uv sync` は通常、プロジェクトで管理していない余分なパッケージを仮想環境から削除します。必要なパッケージは `uv add` で記録してください。
:::

復元後、手順3の `uv run` コマンドでNumPyの読み込みを確認します。OSやGPUドライバなど、Pythonパッケージ以外の条件は別途そろえる必要があります。

### 不要なパッケージを削除する

NumPyが不要になった場合は実行します。

```bash
uv remove numpy
```

`remove` はプロジェクトから依存関係を削除し、Lock Fileと環境も更新します。`pyproject.toml` の `dependencies` から `numpy` がなくなったことを確認してください。別のパッケージがNumPyを必要とする場合は、依存先として環境に残ることがあります。

## uv pipとuv addの違い

uvには、pipに似た操作をする `uv pip` コマンドもあります。既存の仮想環境へインストールする例は次のとおりです。

```bash
uv pip install numpy
```

`uv pip install` は仮想環境へパッケージを導入しますが、**`pyproject.toml` や `uv.lock` には追加しません。** `uv add` の代わりに使うと、別のPCで復元できなかったり、`uv sync` で削除されたりします。

uvでプロジェクトを管理している場合は、原則として `uv add` と `uv remove` を使ってください。`uv pip` は既存のpip中心の作業で、インストール操作をuvに置き換えたい場合などに使います。pipを内部で呼び出すコマンドではなく、設定や一部の動作にも違いがあります。

## Gitに保存するもの

仮想環境そのものではなく、作り直すためのファイルを保存します。`.venv` にはPC固有の実行ファイルやパスが含まれるため、丸ごとの共有には向きません。

| 管理方法 | 保存するもの | 保存しないもの |
| --- | --- | --- |
| このページのpip手順 | Pythonコード、`requirements.txt`、環境条件を書いたREADME | `.venv/` |
| uvのプロジェクト管理 | Pythonコード、`pyproject.toml`、`uv.lock`、README | `.venv/` |

uvの `.python-version` がある場合は、プロジェクトで使うPythonの指定として共有できます。`uv.lock` はuvが管理するため、手で編集しません。

エディタで `.gitignore` を開き、次の行を追加します。`.gitignore` はGitの管理対象から除外するファイル・フォルダを指定するものです。

```text
.venv/
__pycache__/
```

`__pycache__` はPythonが生成するキャッシュです。Gitの変更一覧にこれらが出ていないことを確認してください。既にGitへ登録済みのファイルは、`.gitignore` を追加するだけでは除外されません。

:::caution
パッケージ名は公式情報を確認して入力してください。似た名前の別パッケージを導入しないよう注意します。また、依存関係ファイルに認証情報入りのURLや非公開の接続情報が含まれていないか、公開前に確認してください。
:::

## よくあるエラー

### インストールしたのにimportできない

`ModuleNotFoundError: No module named 'numpy'` は、実行中のPythonでNumPyが見つからないことを表します。まず、インストール先と実行先が同じ環境か確認します。

pipを使っている場合は、次でPythonの場所とNumPyの情報を確認します。

```bash
python -c "import sys; print(sys.executable)"
python -m pip show numpy
```

`sys.executable` は使用中のPythonの場所です。`show` はパッケージの詳細を表示し、`Location` がインストール先です。どちらもプロジェクトの `.venv` 内を指しているか確認してください。

別の環境なら、プロジェクトへ移動して仮想環境を有効化し直します。NumPyが未導入なら `python -m pip install numpy` を実行し、読み込み確認をやり直します。

uvの場合は `pyproject.toml` にNumPyが記録されているか確認し、`uv run python ...` で実行します。VS CodeやNotebookから実行する場合も、そのプロジェクトの `.venv` をPython実行環境やカーネルとして選んでください。カーネルはNotebookのコードを実行するPython環境です。

### No module named pip

使用しているPython環境にpipがありません。まず前述の `sys.executable` で対象を確認します。uvで作成した仮想環境には、pipが入っていない場合があります。その場合は、pipを追加する前に `uv add` などuvのコマンドを使ってください。

`venv` で作成した環境なのにpipがない場合は、Pythonの導入方法を確認してください。管理されたWorkspaceでは、エラー内容を添えて管理者に相談してください。

### externally-managed-environment

OSが管理しているPython環境へのインストールを止めるエラーです。仮想環境を使っているつもりでも、別のPythonを実行している可能性があります。

Pythonの場所を確認し、[Python環境](../python/)の手順で仮想環境を作成・有効化してから再実行してください。`sudo pip install` や `--break-system-packages` で制限を回避しないでください。

### uv sync --lockedでエラーになる

`uv.lock` がない、または `pyproject.toml` とLock Fileが一致していない可能性があります。両方のファイルを同じプロジェクトの変更から取得したか確認してください。

自分で依存関係を変更した場合は、`uv add`・`uv remove` の結果として更新された両方のファイルを確認し、共有します。共有済みプロジェクトの復元中なら、むやみにLock Fileを作り直さず、プロジェクトの管理者へ確認してください。

## Next steps

- [GitHubへ保存する](../github/) — コードと依存関係の記録をGitHubへ保存する手順を確認します。
- [GPUを利用する](../gpu/) — PyTorchなど、GPU用パッケージの導入条件を確認します。
- [pip公式ユーザーガイド](https://pip.pypa.io/en/stable/user_guide/) — バージョン指定やインストール方法の詳細を確認できます。
- [uv公式プロジェクトガイド](https://docs.astral.sh/uv/guides/projects/) — プロジェクト管理の全体像と、依存関係の更新方法を確認できます。
- [uv公式のpip互換性の説明](https://docs.astral.sh/uv/pip/compatibility/) — pipから操作を置き換える際の設定・動作の違いを確認できます。
