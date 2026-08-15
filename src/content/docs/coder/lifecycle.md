---
title: Workspaceの操作
description: WorkspaceのStart、Stop、Restart、Deleteと日常的な運用方法を説明します。
---
WorkspaceはStart、Stop、Restart、Deleteの4つの操作で運用します。

## Start

停止中のWorkspaceを起動します。前回の `/home/coder` を利用して作業を再開できます。

## Stop

実行中のWorkspaceを停止します。日々の作業終了時はStopしてください。`/home/coder` のデータは保持されます。

GPUを使用するProcessを起動したまま放置すると、同じGPUを利用する他のメンバーへ影響します。

:::caution
GPUを使うProcessを起動した状態でStopする場合は、Processを停止してから実行してください。
:::

## Restart

Workspaceの状態が不安定な場合に再起動します。通常、`/home/coder` は保持されますが、実行中のProcessは終了します。

## Delete

不要なWorkspaceを削除します。

:::danger
DeleteによってWorkspaceの保存データが削除される可能性があります。必要なRepositoryをpushし、Gitで管理していないDataも退避してから実行してください。
:::

## 実行先を変更する

既存Workspaceの実行先は簡単に変更できません。

1. 新しい実行先でWorkspaceを作成します。
2. Git Repositoryをcloneします。
3. Gitで管理していないDataを安全な方法で移行します。
4. 新しいWorkspaceで動作とDataを確認します。
5. Backupを確認してから古いWorkspaceを削除します。

## Next steps

- [ファイルと永続化](persistence/) — Workspace内で保持されるファイルの保存先とBackup方法を説明します。
- [トラブルシューティング](../../operations/troubleshooting/) — Coder、Workspace、VS Code、GPUで問題が発生した場合の確認手順です。
