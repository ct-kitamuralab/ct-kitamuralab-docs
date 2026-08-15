---
title: Workspaceを作成する
description: Coderへログインし、研究用のWorkspaceを作成する手順です。
---

Coderへログインしたら、自分専用の開発環境となるWorkspaceを作成します。本ガイドを完了すると、VS Code Webから研究コードの実行を開始できます。

## 作成手順

1. CoderのDashboardで **New workspace** をクリックします。

![New workspaceダイアログでTemplateを選択](../../../assets/screenshots/coder-new-workspace.png)

2. 管理者から案内されたTemplateを選択します。

3. Workspace名を入力します。ランダムに生成された名前でも構いません。

![Workspace名、実行ノード、オプションの設定](../../../assets/screenshots/coder-create-workspace-form.png)

4. 実行先（実行ノード）を、案内された選択肢から選択します。
5. **Create workspace** をクリックして作成を実行し、Workspaceが起動するまで待ちます。

初回はContainer Imageの取得や初期化により、起動までに数分かかることがあります。

![Workspaceが起動し、VS Code WebやTerminalを開ける状態になります](../../../assets/screenshots/coder-workspace-running.png)

## 実行先の選択

実行先は **alpha - RTX A2000 12GB** と **beta - RTX A2000 12GB** の2択で、どちらもスペックは同じです。同じ実行先で複数の利用者がGPUを使用すると、処理速度に影響します。

どの実行先が比較的空いているか判断できない場合は、管理者へ確認してください。

:::caution
作成後にWorkspaceの実行先を変更することはできません。変更が必要な場合は、新しいWorkspaceを作成してデータを移行します。詳細は[Workspaceの操作](../../coder/lifecycle/)を参照してください。
:::

## 作成後の確認

Workspaceが起動したら、次の手順で動作を確認します。

1. WorkspaceのTerminalを開き、`ls /home/coder` を実行してHome Directoryの中身が表示されることを確認します。
2. [VS Code Web](../../coder/vscode-web/)を開いて、Editorが表示されることを確認します。
3. DashboardのWorkspace項目で、CPU、RAM、Disk、GPUのUsage表示が更新されていることを確認します。

Workspaceが長時間Startingのままになる場合は、Deleteせず、[トラブルシューティング](../../operations/troubleshooting/)に従って管理者へWorkspace名と表示状態を伝えてください。

## Next steps

- [VS Code Web](../../coder/vscode-web/) — Coder Workspaceをブラウザ上のVS Code Webで開く方法を説明します。
- [ファイルと永続化](../../coder/persistence/) — Workspace内で保持されるファイルの保存先とBackup方法を説明します。
