---
title: ファイルと永続化
description: Workspace内で保持されるファイルの保存先とBackup方法を説明します。
---
Workspace内では、保存先によってデータが保持されるかどうかが変わります。

## 保持される保存先

| 場所 | Stop後に保持されるか | 使い道 |
| --- | --- | --- |
| `/home/coder` 以下 | はい | 研究ファイルはすべてこのDirectory以下へ保存します |
| その他の場所（`/tmp` など） | いいえ | WorkspaceのStopや再構築で失われます |

研究コード、Git Repository、設定ファイル、Notebook、Python Virtual Environmentなどは、原則として `/home/coder` 以下へ保存してください。

:::danger
`/home/coder` 以外に保存したデータは、Workspaceの再構築やStopに伴って失われる可能性があります。
:::

各操作（Start、Stop、Restart、Delete）で `/home/coder` がどのように扱われるかは、[Workspaceの操作](../lifecycle/)で説明しています。

:::caution
Deleteに加え、管理者による保存Volumeの削除でも保存データは失われます。WorkspaceをDeleteする前にBackupを完了してください。
:::

## Disk使用量を確認する

`/home/coder` の使用容量は、WorkspaceのTerminalで次を実行して確認できます。

```bash
df -h /home/coder
```

`Use%` の列で使用率が表示されます。空き容量が少なくなったら、不要なファイルを削除するか、管理者へ相談してください。

## Backupする

WorkspaceのStorageだけを唯一の保存先にしないでください。

- 研究コードはGitHubなどのRemote Repositoryへpushする 詳しくは [GitとGitHub](../../../guides/git-github) を確認してください
- Gitで管理しないDataは、ローカルのPCなど別の保存先へ定期的に退避する
- WorkspaceをDeleteする前に、必要なファイルを必ず確認する

:::caution
Deleteの前にBackupを完了してください。削除後の復元を前提に運用しないでください。
:::

## Next steps

- [Workspaceの操作](../lifecycle/) — WorkspaceのStart、Stop、Restart、Deleteと日常的な運用方法を説明します。
- [GitとGitHub](../../../guides/git-github/) — WorkspaceでGitを設定し、研究コードをGitHubへBackupするための基本方針です。
