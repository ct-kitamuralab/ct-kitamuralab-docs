---
title: VS Code Desktop
description: 手元のVS Code DesktopからCoder Workspaceへ接続する方法を説明します。
---

普段使用しているVS Code Desktopから、Coder上のWorkspaceへRemote接続できます。手元のPCに開発環境を構築せず、Workspace内のファイルやTerminalをVS Codeで操作できます。ブラウザだけで作業したい場合は[VS Code Web](../vscode-web/)を使います。

## 接続前に準備する

1. [Visual Studio Code](https://code.visualstudio.com/)を手元のPCへインストールします。
2. 日本語で表示したい場合は、VS Code左側の **Extensions** （四角形のアイコン）を開き、`Japanese Language Pack for Visual Studio Code` を検索してインストールします。表示言語の変更を求められたら、画面の案内に従ってVS Codeを再起動します。(ブラウザからInstallも可能です [Japanese Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ja))
3. [Tailscale](https://tailscale.com/)がConnectedであることを確認します。未設定の場合は[利用前の準備](../../prerequisites/)を完了してください。
4. Coderへログインし、接続するWorkspaceがRunningになっていることを確認します。

## Workspaceへ接続する

1. CoderのDashboardで接続するWorkspaceを開きます。
2. Workspace画面から **VS Code Desktop** を選択します。
3. VS Codeを開くか確認する画面が表示されたら、許可します。
4. 初回は、Coder関連の拡張機能のインストールや接続許可を求められることがあります。画面の案内に従って許可してください。

## 接続を確認する

接続に成功すると、VS CodeのRemote WindowとしてWorkspaceが開きます。次の項目を確認してください。

- 左下のRemote接続表示から、Workspaceへ接続していることを確認できる
- 左側のExplorerから、Workspace内のファイルを開ける
- **Terminal** メニューから新しいTerminalを開ける

保持したいファイルは `/home/coder` 以下へ保存してください。保存ルールとBackup方法は[ファイルと永続化](../persistence/)で説明しています。

## 接続できない場合

まず、同じWorkspaceを[VS Code Web](../vscode-web/)で開けるか確認してください。VS Code Webも開けない場合はWorkspaceまたは接続環境、VS Code Desktopだけ開けない場合は手元のVS Codeや拡張機能に問題がある可能性があります。症状別の対応は[トラブルシューティング](../../../operations/troubleshooting/)を参照してください。

## Next steps

- [VS Code Web](../vscode-web/) — Coder Workspaceをブラウザ上のVS Code Webで開く方法を説明します。
- [Workspaceの操作](../lifecycle/) — WorkspaceのStart、Stop、Restart、Deleteと日常的な運用方法を説明します。
