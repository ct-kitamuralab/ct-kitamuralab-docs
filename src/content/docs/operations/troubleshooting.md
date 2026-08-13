---
title: トラブルシューティング
description: Coder、Workspace、VS Code、GPUで問題が発生した場合の確認手順です。
---

問題が発生した場合は、WorkspaceをDeleteする前に状態を確認して管理者へ連絡してください。

## Coderを開けない

1. 管理者から案内された接続環境が有効か確認します。
2. 案内された接続先を使用しているか確認します。
3. ブラウザを再読み込みします。
4. 別のNetworkやブラウザでも確認します。

## ログインできない

- 必要な招待を承認済みか確認する
- 申請時と同じGitHubアカウントを使用する
- ブラウザに別のGitHubアカウントが残っていないか確認する

## Workspaceを利用できない

Workspaceが長時間Startingのまま、またはRunningと表示されても利用できない場合は、無理にDeleteせず管理者へWorkspace名と表示状態を伝えてください。

## VS Code Webを開けない

- ページを再読み込みする
- 別のブラウザまたはPrivate Windowを試す
- WorkspaceのTerminalを開けるか確認する

## VS Code Desktopを開けない

先にVS Code Webを確認します。VS Code Webのみ利用できる場合は、手元のVS Code、Coder関連の拡張機能、認証状態を確認してください。

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

- GitHubユーザー名
- Workspace名
- 問題が発生した時刻
- 画面に表示された状態
- 実行したCommandと出力
- 問題が再現する手順

:::danger
Password、API Key、Token、秘密鍵などのCredentialは送らないでください。ScreenshotやLogを送る前にも秘密情報が含まれていないか確認してください。
:::
