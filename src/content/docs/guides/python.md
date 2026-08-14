---
title: Python環境
description: Workspace内に再現可能なPython Virtual Environmentを構築する方法です。
---

PythonのLibraryはProjectごとのVirtual Environmentへ導入します。OS全体へ直接導入するより、依存関係を管理しやすくなります。仕組みの詳細は[Python公式のvenvドキュメント](https://docs.python.org/3/library/venv.html)と[pip公式ドキュメント](https://pip.pypa.io/en/stable/)を参照してください。

## Virtual Environmentを作成する

```bash
cd /home/coder/projects/my-research
python3 -m venv .venv
source .venv/bin/activate
```

有効化後、Projectに必要なPackageを導入します。

```bash
python -m pip install --upgrade pip
python -m pip install <package-name>
```

## 依存関係を記録する

Projectに応じて、次のいずれかをRepositoryへ保存してください。

- `requirements.txt`
- `pyproject.toml`
- `environment.yml`
- 使用しているPackage ManagerのLock File

:::tip
Virtual Environment自体をGitへCommitするのではなく、依存関係を定義するファイルから再作成できる状態にします。
:::

## 保存場所

Virtual EnvironmentとProjectは、永続化される `/home/coder` 以下へ作成してください。OS全体へ行った変更は、Workspaceの再構築で失われる可能性があります。
