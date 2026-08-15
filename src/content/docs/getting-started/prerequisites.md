---
title: 利用前の準備
description: Coderを利用する前に必要なアカウント、ブラウザ、エディターを確認します。
---

本ガイドでは、Coderへの初回ログインに必要なアカウントと接続環境を準備します。

管理者から利用承認の案内を受け取ったら、次の項目を順番に確認してください。申請がまだの場合は、[利用対象と申請](application/)から始めてください。

## 必要なもの

| 項目 | 用途 | 必須 |
| --- | --- | --- |
| 対応ブラウザ（Webサイトを開くアプリ） | [Coder](https://coder.com/docs)、Terminal（Commandを入力する画面）、[VS Code Web](https://code.visualstudio.com/docs)を利用する | はい |
| [GitHubアカウント](https://docs.github.com/ja/get-started/start-your-journey/creating-an-account-on-github/about-creating-accounts-on-github)（コードの保存・共同作業Serviceのアカウント） | CoderへのログインとGit Repositoryの利用 | はい |
| [Tailscaleアカウント](https://tailscale.com/kb)（VPN: 安全な仮想ネットワークServiceのアカウント） | 研究室の接続環境を利用する | はい |
| [Tailscaleアプリ](https://tailscale.com/download)（VPN接続を行うアプリ） | 手元のPCからCoderを開くための接続を確立する | はい |
| 管理者からの接続案内（利用承認後に大学アカウント宛に届く案内） | Coderの利用方法と接続先を確認する | はい |
| [VS Code Desktop](https://code.visualstudio.com/docs)（PCにインストールするコード編集アプリ） | 手元のPCのVS Codeから[Workspace](../../coder/)（利用者ごとのLinux開発環境）へ接続する | 任意 |

## 招待を確認する

管理者から届いたアカウントへの招待を承認してください。接続案内は、申請フォームで回答した大学アカウント宛に送信されます。承認していない場合、Coderの認証に成功しないことがあります。

招待のメールが届いていない、または承認できない場合は、管理者へ連絡してください。

## Tailscaleを準備する

研究室のシステムは一般公開されていません。VPN（安全な仮想ネットワーク）である[Tailscale](https://tailscale.com/)を手元のPCに導入し、管理者から案内されたTailscaleアカウントでサインインしてください。

1. [Tailscaleのダウンロードページ](https://tailscale.com/download)から、お使いのOS向けアプリをインストールします。
2. 研究室から案内されたアカウントでサインインします。
3. Tailscaleが接続済みになっていることを確認します。

操作で困った場合は、[Tailscale公式ドキュメント](https://tailscale.com/kb)を参照してください。Tailscaleが接続済みでないと、次の[初回ログイン](first-login/)に進めません。

:::caution
接続先URL、招待URL、接続画面、端末名を不特定多数が閲覧できる場所へ共有しないでください。
:::

## VS Code Desktopを使う場合

[Visual Studio Code](https://code.visualstudio.com/)を手元のPCへインストールします。必要な拡張機能や接続許可は、初回接続時に表示される案内に従って設定してください。基本操作は[Visual Studio Code公式ドキュメント](https://code.visualstudio.com/docs)で確認できます。

## Next steps

- [初回ログイン](first-login/) — 管理者から案内された接続先を使ってCoderへ初めてログインする手順です。
