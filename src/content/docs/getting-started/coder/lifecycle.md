---
title: Workspaceの操作
description: WorkspaceのStart、Stop、Restart、Deleteと日常的な運用方法を説明します。
---
WorkspaceはStart、Stop、Restart、Deleteの4つの操作で運用します。各操作のポイントを先にまとめます。

| 操作 | 実行中のProcess | `/home/coder` | 使う場面 |
| --- | --- | --- | --- |
| Start | 起動します | 保持されたデータを再利用します | 作業を再開する |
| Stop | すべて終了します | 保持されます | 毎日の作業終了時 |
| Restart | すべて終了し、再実行されます | 通常は保持されます | 状態が不安定な場合の再起動 |
| Delete | すべて終了します | 削除される可能性があります | 不要なWorkspaceの削除 |

## Start

停止中のWorkspaceを起動します。前回の `/home/coder` を利用して作業を再開できます。起動には数十秒から数分かかります。

## Stop

実行中のWorkspaceを停止します。日々の作業終了時はStopしてください。`/home/coder` のデータは保持されます。

GPUを使用するProcessを起動したまま放置すると、同じGPUを利用する他のメンバーへ影響します。

:::caution
GPUを使うProcessを起動した状態でStopする場合は、Processを停止してから実行してください。
:::

## Restart

Workspaceの状態が不安定な場合に再起動します。通常、`/home/coder` は保持されますが、実行中のProcessは終了します。Stopで回復しない不具合がある場合に使用します。

## Delete

不要なWorkspaceを削除します。

:::danger
DeleteによってWorkspaceの保存データが削除される可能性があります。必要なRepositoryをpushし、Gitで管理していないDataも退避してから実行してください。
:::

## 実行先を変更する

既存Workspaceの実行先は変更できません。変更が必要な場合は、次の手順で新しいWorkspaceへ移行します。

1. 新しい実行先でWorkspaceを作成します。
2. Gitで管理しているRepositoryは、新しいWorkspaceでcloneします。
3. Gitで管理していないDataは、新しいWorkspaceへファイルとして移し、必要なファイルがすべて移ったことを確認します。移動方法が分からない場合は管理者へ相談してください。
4. 新しいWorkspaceで動作とDataを確認します。
5. 古いWorkspaceのBackupを確認してから削除します。

## Next steps

- [ファイルと永続化](../persistence/) — Workspace内で保持されるファイルの保存先とBackup方法を説明します。
- [トラブルシューティング](../../../operations/troubleshooting/) — Coder、Workspace、VS Code、GPUで問題が発生した場合の確認手順です。
