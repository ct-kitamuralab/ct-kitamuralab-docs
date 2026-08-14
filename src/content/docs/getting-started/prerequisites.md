---
title: 利用前の準備
description: Coderを利用する前に必要なアカウント、ブラウザ、Editorを確認します。
---

管理者から利用承認の案内を受け取ったら、初回ログイン前に必要な環境を確認します。

## 必要なもの

| 項目 | 用途 | 必須 |
| --- | --- | --- |
| 対応ブラウザ | Coder、Terminal、VS Code Webの利用 | はい |
| GitHubアカウント | CoderへのログインとGitリポジトリの利用 | はい |
| Tailscaleアカウント | 研究室の非公開システムへ安全に接続する | はい |
| Tailscaleアプリ | 手元のPCから接続環境を利用する | はい |
| 管理者からの接続案内 | 非公開システムへの接続 | はい |
| VS Code Desktop | 手元のVS CodeからWorkspaceへ接続 | 任意 |

## 招待を確認する

管理者から届いたアカウントへの招待を承認してください。承認していない場合、Coderの認証に成功しないことがあります。

## Tailscaleを準備する

研究室のシステムは一般公開されていません。手元のPCに[Tailscale](https://tailscale.com/)を導入し、管理者から案内されたTailscaleアカウントでサインインしてください。

1. [Tailscaleのダウンロードページ](https://tailscale.com/download)から、お使いのOS向けアプリをインストールします。
2. 研究室から案内されたアカウントでサインインします。
3. Tailscaleが接続済みになっていることを確認します。

操作で困った場合は、[Tailscale公式ドキュメント](https://tailscale.com/kb)を参照してください。

:::caution
接続先URL、招待URL、接続画面、端末名を不特定多数が閲覧できる場所へ共有しないでください。
:::

## VS Code Desktopを使う場合

[Visual Studio Code](https://code.visualstudio.com/)を手元のPCへインストールします。必要な拡張機能や接続許可は、初回接続時に表示される案内に従って設定してください。基本操作は[Visual Studio Code公式ドキュメント](https://code.visualstudio.com/docs)で確認できます。
