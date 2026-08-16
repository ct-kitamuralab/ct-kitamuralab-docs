---
title: VS Code Desktop
description: 手元のVS Code DesktopからCoder Workspaceへ接続する方法を説明します。
---

普段使用しているVS Code Desktopから、Coder上のWorkspaceへRemote接続できます。接続には[Tailscale](https://tailscale.com/)が接続済みであることが必要です。設定方法は[利用前の準備](../../getting-started/prerequisites/)を参照してください。

## 接続する

1. 手元のPCへ[Visual Studio Code](https://code.visualstudio.com/)をインストールします。基本操作は[Visual Studio Code公式ドキュメント](https://code.visualstudio.com/docs)を参照してください。
2. CoderでWorkspaceをStartします。
3. Workspace画面から **VS Code Desktop** を選択します。
4. 初回は、Coder関連の拡張機能のインストールや接続許可を求められることがあります。画面の案内に従って許可してください。

接続に成功すると、VS CodeのRemote WindowとしてWorkspace内が開き、WorkspaceのファイルやTerminalがそのまま操作できます。

:::tip
初回利用時はVS Code WebでWorkspaceが正常に動作することを確認してから、VS Code Desktopを設定すると問題を切り分けやすくなります。
:::

## 切り分け方法

VS Code Desktopから接続できない場合は、先に[VS Code Web](../vscode-web/)を開きます。

- VS Code Webも開かない: Workspaceまたは接続環境の問題が考えられます。
- VS Code Webは開く: 手元のVS Code、拡張機能、認証状態を確認します。

## Next steps

- [VS Code Web](../vscode-web/) — Coder Workspaceをブラウザ上のVS Code Webで開く方法を説明します。
- [Workspaceの操作](../lifecycle/) — WorkspaceのStart、Stop、Restart、Deleteと日常的な運用方法を説明します。
