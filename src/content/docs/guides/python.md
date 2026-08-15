---
title: Python環境
description: Workspace内に再現可能なPython Virtual Environmentを構築する方法です。
---

PythonのLibraryはProjectごとのVirtual Environmentへ導入します。OS全体へ直接導入するより、依存関係を管理しやすくなります。仕組みの詳細は[Python公式のvenvドキュメント](https://docs.python.org/3/library/venv.html)と[pip公式ドキュメント](https://pip.pypa.io/en/stable/)を参照してください。

## Virtual Environmentを作成する

```bash
# プロジェクトのディレクトリに移動 cd = Change Directoryの略 のハズ
cd /home/coder/projects/my-research
# Pythonの仮想環境(venv = Virtual ENVironment)を作成
python3 -m venv .venv
# 作成した仮想環境の有効化(activate)
source .venv/bin/activate
```

有効化に成功すると、プロンプトの先頭に `.venv` が表示されます。

```text
(.venv) coder@my-workspace:~/projects/my-research$
```

有効化後、Projectに必要なPackageを導入します。

```bash
python -m pip install --upgrade pip
pip install <package-name>
```

:::note
Virtual Environmentの終了は `deactivate` コマンドで実行します。Terminalを閉じても次の起動時に再度 `source .venv/bin/activate` が必要です。
:::

## 依存関係を記録する

Projectに応じて、次のいずれかをRepositoryへ保存してください。

# TODO requirements.txtの自動作成の追加
# TODO uvでの例も追加

- `requirements.txt`
- `pyproject.toml`
- `environment.yml`
- 使用しているPackage ManagerのLock File

:::tip
Virtual Environment自体をGitへCommitするのではなく、依存関係を定義するファイルから再作成できる状態にします。

(例: `pip install -r requirements.txt` requirements.txtで定義したPackageの一括インストール)

参考: .gitignore
:::

## GPUを使う場合

GPUで計算する場合は、CUDA対応のPackageが必要です。導入後は次のコマンドでCUDAが利用可能か確認します。

```bash
python -c "import torch; print(torch.cuda.is_available())"
```

`True` が表示されればGPUを利用できます。GPUの利用方法と確認コマンドの詳細は[GPUを利用する](gpu/)を参照してください。

## 保存場所

Virtual EnvironmentとProjectは、永続化される `/home/coder` 以下へ作成してください。OS全体へ行った変更は、Workspaceの再構築で失われる可能性があります。

## Next steps

- [開発ツール](development-tools/) — Coder Workspaceに標準で導入される開発ツールと、用途別の公式ドキュメントを紹介します。
- [GitとGitHub](git-github/) — WorkspaceでGitを設定し、研究コードをGitHubへBackupするための基本方針です。
