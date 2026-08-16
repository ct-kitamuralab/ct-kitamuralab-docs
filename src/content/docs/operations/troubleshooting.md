---
title: トラブルシューティング
description: Coder、Workspace、VS Code、GPUで問題が発生した場合の確認手順です。
---

問題が発生した場合は、WorkspaceをDeleteする前に状態を確認して管理者へ連絡してください。各症状の手順へ進む前に、まず共通の確認項目を済ませてください。

## 共通の確認項目

1. Tailscaleが接続済み（Connected）になっているか確認する
2. CoderのDashboardで、WorkspaceがRunningになっているか確認する

## Coderを開けない

1. Tailscaleが接続済みであることを確認する
2. 管理者から案内された接続先を使用しているか確認する
3. ブラウザを再読み込みする
4. 別のNetworkやブラウザでも確認する

会社・大学・公共Wi-FiなどのNetworkでは接続が不安定になることがあります。Tailscaleは接続されていても接続先が開けない場合は、別のNetworkで試してください。

## ログインできない

- GitHub Organizationへの招待を承認済みか確認する
- Tailscale Shareを承認済みか確認する
- 申請時と同じGitHubアカウントを使用している
- 別のGitHubアカウントがブラウザに残っていない

招待を承認済みでもログインできない場合は、GitHubユーザー名と画面の状態を管理者へ伝えてください。

## Workspaceを利用できない

Workspaceが長時間Startingのまま、またはRunningと表示されても利用できない場合は、無理にDeleteせず管理者へWorkspace名と表示状態を伝えてください。

## VS Code Webを開けない

1. ページを再読み込みする
2. 別のブラウザまたはPrivate Windowで開く
3. WorkspaceのTerminalを開けるか確認する

Terminalも開けない場合はWorkspace自体の接続に問題があると考えられるので、管理者へ連絡してください。

## VS Code Desktopを開けない

先にVS Code Webを確認します。VS Code Webは開けてDesktopだけ開けない場合は、手元のVS Code、Coder関連の拡張機能、認証状態を確認してください。

## GPUを利用できない

Terminalで `nvidia-smi` を実行し、次の情報を管理者へ伝えます。

- Workspace名
- 選択した実行先
- Commandの出力またはError Message

## ファイルが見つからない

- `/home/coder` 以下へ保存していたか確認する
- 別のWorkspaceを開いていないか確認する
- WorkspaceをDeleteしていないか確認する

## 管理者へ伝える情報
管理者へ連絡する際は、問題を特定できる情報を一緒に送ってください。

- GitHubユーザー名
- Workspace名
- 問題が発生した時刻
- 画面に表示された状態
- 実行したCommandと出力
- 問題が再現する手順

:::danger
Password、API Key、Token、秘密鍵などのCredentialは送らないでください。ScreenshotやLogを送る前にも秘密情報が含まれていないか確認してください。
:::

## Next steps

- [利用ルール](../rules/) — 共有GPU、研究Data、秘密情報を安全に扱うための利用ルールです。
- [GPUを利用する](../../guides/gpu/) — Coder WorkspaceからRTX A2000 12GBを確認し、共有GPUを利用する方法です。
