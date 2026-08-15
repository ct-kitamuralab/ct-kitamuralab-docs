---
title: ファイルと永続化
description: Workspace内で保持されるファイルの保存先とBackup方法を説明します。
---
Workspace内では、保存先によってデータが保持されるかどうかが変わります。

## 保持される保存先

WorkspaceをStopしても、次のDirectory以下に保存したデータは保持されます。

```text
/home/coder
```

研究コード、Git Repository、設定ファイル、Notebook、Python Virtual Environmentなどは、原則としてこのDirectory以下へ保存してください。

:::danger
`/home/coder` 以外に保存したデータは、Workspaceの再構築やStopに伴って失われる可能性があります。
:::

## 操作とデータ

| 操作 | `/home/coder`の扱い |
| --- | --- |
| Stop | 保持されます |
| Start | Stop前のデータを再利用します |
| Restart | 基本的に保持されます |
| Delete | Workspaceと保存データが削除される可能性があります |

## Backupする

WorkspaceのStorageだけを唯一の保存先にしないでください。

- 研究コードはGitHubなどのRemote Repositoryへpushする
- Gitで管理しないDataは、承認された別の保存先へ定期的に退避する
- WorkspaceをDeleteする前に、必要なファイルを必ず確認する

:::caution
Deleteの前にBackupを完了してください。削除後の復元を前提に運用しないでください。
:::

## Next steps

- [Workspaceの操作](lifecycle/) — WorkspaceのStart、Stop、Restart、Deleteと日常的な運用方法を説明します。
- [GitとGitHub](../../guides/git-github/) — WorkspaceでGitを設定し、研究コードをGitHubへBackupするための基本方針です。
