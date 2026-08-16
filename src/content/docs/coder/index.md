---
title: Coder Workspace
description: 喜多村研究室が提供するCoder Workspaceの概要と利用できる機能を説明します。
---

喜多村研究室が提供するCoder Workspaceは、ログインした直後から使えるLinux開発環境です。手元のPCへUbuntu環境を直接構築する作業が不要になり、Workspaceを作成してすぐ研究コードの実行を始められます。一般的な仕組みは[Coder公式ドキュメント](https://coder.com/docs)でも確認できます。

初めて利用する場合は、[利用対象と申請](../getting-started/application/)から進めてください。

## Workspaceとは

Workspaceは利用者専用のLinux開発環境です。Containerとして起動し、他の利用者のWorkspaceとはファイル、Process、Editorの接続先が分離されます。

仕組みを一文でまとめると、Workspaceは必要時に起動され、Stopすると処理は止まりますが、保存されたファイルはWorkspaceごとに保持される、というものです。

## 利用できる機能

- ブラウザ上の[Terminal](../getting-started/create-workspace/)と[VS Code Web](vscode-web/)
- [VS Code Desktop](vscode-desktop/)からのRemote接続
- 共有[GPU（RTX A2000 12GB）](../guides/gpu/)の利用
- Workspaceごとの[永続Storage](persistence/)
- [Git](../guides/git-github/)と一般的な[開発Tool](../guides/development-tools/)

## 基本的な利用の流れ

1. Coderへログインします。
2. Workspaceを作成またはStartします。
3. VS Code Web、Terminal、VS Code Desktopのいずれかで接続します。
4. 永続化される場所にProjectを保存します。
5. 作業終了後にWorkspaceをStopします。

## Next steps

- 初めてWorkspaceを作る: [Workspaceを作成する](../getting-started/create-workspace/)
- ブラウザで開発する: [VS Code Web](vscode-web/)
- データの保存先を確認する: [ファイルと永続化](persistence/)
- 標準の開発環境を確認する: [開発ツール](../guides/development-tools/)
