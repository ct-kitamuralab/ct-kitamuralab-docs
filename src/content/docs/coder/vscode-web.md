---
title: VS Code Web
description: Coder Workspaceをブラウザ上のVS Code Webで開く方法を説明します。
---

VS Code Webは、ブラウザ上で動作するVisual Studio Code環境です。手元のPCへEditorをインストールせずにWorkspaceを利用できます。Editorの基本操作は[Visual Studio Code公式ドキュメント](https://code.visualstudio.com/docs)を参照してください。

## 開く

1. Coderで利用するWorkspaceをStartします。
2. Workspace画面に表示される **VS Code Web** を選択します。
3. ブラウザ内にEditorが表示されることを確認します。

![VS Code Webエディタ画面](../../../assets/screenshots/vscode-web.png)

## 初回設定

初めて開いたWorkspaceには、個人の拡張機能や設定がまだ存在しない場合があります。研究内容に必要な拡張機能をWorkspaceごとに導入してください。

例えば、Pythonで研究する場合は、左のExtensionsビュー（拡張機能アイコン）からPython拡張機能をインストールすると、シンタックスハイライトやLinterが有効になります。導入した拡張機能はWorkspaceごとなので、WorkspaceをDeleteすると再導入が必要です。

## 作業場所

保持したいファイルは `/home/coder` 以下へ保存してください。保存ルールとDisk使用量の確認方法は[ファイルと永続化](persistence/)で説明しています。

## 開かない場合

次の順番で確認してください。

1. WorkspaceがCoderでRunningになっているか確認する
2. ページを再読み込みする
3. 別のブラウザまたはPrivate Windowで開く
4. 同じWorkspaceのTerminalを開けるか確認する

Terminalも開けない場合は、Workspace自体の接続に問題があると考えられます。[トラブルシューティング](../operations/troubleshooting/)に従って、Workspace名と表示状態を管理者へ伝えてください。

## Next steps

- [VS Code Desktop](vscode-desktop/) — 手元のVS Code DesktopからCoder Workspaceへ接続する方法を説明します。
- [Workspaceの操作](lifecycle/) — WorkspaceのStart、Stop、Restart、Deleteと日常的な運用方法を説明します。
