---
title: Coder Workspace
description: 喜多村研究室が提供するCoder Workspaceの概要と利用できる機能を説明します。
---

Coderは、Server上に開発用のWorkspaceを作成し、ブラウザやVS Code Desktopから利用できる開発環境管理Platformです。一般的な仕組みは[Coder公式ドキュメント](https://coder.com/docs)でも確認できます。

## Workspaceとは

Workspaceは利用者専用のLinux開発環境です。Containerとして起動し、他の利用者のWorkspaceとはファイル、Process、Editorの接続先が分離されます。

## 利用できる機能

- ブラウザ上のTerminal
- VS Code Web
- VS Code DesktopからのRemote接続
- RTX A2000 12GB GPU
- Workspaceごとの永続Storage
- Gitと一般的な開発Tool

利用者が手元のPCへUbuntu環境を直接構築する必要はありません。Workspaceを作成すると、研究用のLinux環境が自動的に用意されます。

## 基本的な利用の流れ

1. Coderへログインします。
2. Workspaceを作成またはStartします。
3. VS Code Web、Terminal、VS Code Desktopのいずれかで接続します。
4. 永続化される場所にProjectを保存します。
5. 作業終了後にWorkspaceをStopします。

## 次に読む

- 初めてWorkspaceを作る: [Workspaceを作成する](../../getting-started/create-workspace/)
- ブラウザで開発する: [VS Code Web](vscode-web/)
- データの保存先を確認する: [ファイルと永続化](persistence/)
- 標準の開発環境を確認する: [開発ツール](../../guides/development-tools/)
