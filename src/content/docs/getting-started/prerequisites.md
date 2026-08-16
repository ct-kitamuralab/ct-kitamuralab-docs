---
title: 利用前の準備
description: Coderを利用する前に必要なアカウント、ブラウザ、エディターを確認します。
---

本ガイドでは、Coderへの初回ログインに必要なアカウントと接続環境を準備します。このガイドを完了すると、[初回ログイン](../first-login/)の段階で接続環境による障害が起きなくなります。

管理者から利用承認の案内を受け取ったら、次の項目を順番に確認してください。申請がまだの場合は、[利用対象と申請](../application/)から始めてください。

## 必要なもの

| 項目 | 用途 | 必須 |
| --- | --- | --- |
| 対応ブラウザ（Webサイトを開くアプリ） | [Coder](https://coder.com/docs)、Terminal（Commandを入力する画面）、[VS Code Web](https://code.visualstudio.com/docs)を利用する | はい |
| [GitHubアカウント](https://docs.github.com/ja/get-started/start-your-journey/creating-an-account-on-github/about-creating-accounts-on-github)（コードの保存・共同作業Serviceのアカウント） | CoderへのログインとGit Repositoryの利用 | はい |
| [Tailscale](https://tailscale.com/)（VPN: 安全な仮想ネットワークService）アカウント | 研究室の接続環境を利用する。自分のアカウントで、管理者から案内されたShareを承認します | はい |
| [Tailscaleアプリ](https://tailscale.com/download)（VPN接続を行うアプリ） | 手元のPCからCoderを開くための接続を確立する | はい |
| 管理者からの接続案内（利用承認後に届く案内メール） | GitHub Organizationへの招待、Tailscale Share、Coderの接続先が案内されます | はい |
| [VS Code Desktop](https://code.visualstudio.com/docs)（PCにインストールするコード編集アプリ） | 手元のPCのVS Codeから[Workspace](../../coder/)（利用者ごとのLinux開発環境）へ接続する | 任意 |

## 招待を確認する

管理者から届く案内には、次の2つの招待が含まれます。

- **GitHub Organizationへの招待** — Coderのログインは、このOrganizationに所属するGitHubアカウントでのみ可能です。メールから招待を承認してください。
- **Tailscale Share** — 研究室の接続環境への共有です。案内されたURLを開いて承認してください。

招待のメールが届いていない、または承認できない場合は、管理者へ連絡してください。招待を承認していない場合、Coderのログインに失敗します。

## Tailscaleを準備する

研究室のシステムは一般公開されていないため、VPN（安全な仮想ネットワーク）である[Tailscale](https://tailscale.com/)で接続します。手元のPCへ次の手順で準備します。

1. [Tailscaleのダウンロードページ](https://tailscale.com/download)から、お使いのOS向けアプリをインストールします。
2. 自分のTailscaleアカウントでサインインします。新規作成する場合は、GitHubアカウントを使って作成するのがおすすめです。
3. 管理者から案内されたTailscale ShareのURLを開き、共有を承認します。

次のすべてに当てはまれば、Tailscaleの準備は完了です。

- TailscaleアプリのアイコンがConnectedになっている
- 管理者から案内されたCoderの接続先をブラウザで開ける
- Coderのログイン画面が表示される

会社・大学・公共Wi-Fiなどのネットワークでは接続が不安定になることがあります。接続できない場合は、別のネットワークでも試してください。操作で困った場合は、[Tailscale公式ドキュメント](https://tailscale.com/kb)を参照してください。

:::caution
接続先URL、招待URL、接続画面、端末名を不特定多数が閲覧できる場所へ共有しないでください。
:::

## VS Code Desktopを使う場合

[Visual Studio Code](https://code.visualstudio.com/)を手元のPCへインストールします。初回接続では、Coder関連の拡張機能の導入や接続許可を求められることがあります。画面の案内に従ってください。接続手順の詳細は[VS Code Desktop](../../coder/vscode-desktop/)で説明しています。基本操作は[Visual Studio Code公式ドキュメント](https://code.visualstudio.com/docs)で確認できます。

## Next steps

- [初回ログイン](../first-login/) — 管理者から案内された接続先を使ってCoderへ初めてログインする手順です。
