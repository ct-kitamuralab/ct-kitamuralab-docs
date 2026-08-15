---
title: 利用ルール
description: 共有GPU、研究Data、秘密情報を安全に扱うための利用ルールです。
---

システムは複数の研究室メンバーが共有する環境です。他の利用者と研究Dataを守るため、次のルールに従ってください。

## 共有Resource

GPUやWorkspaceは研究室で共有するResourceです。他の利用者に影響が出ないよう使い分けてください。

- 作業終了後はWorkspaceをStopする
- 不要なProcessやJobを放置しない
- 他の利用者のWorkspaceやProcessへ干渉しない
- GPUを長時間使用する場合は、他の利用者と調整する。確認コマンドとマナーは[GPUを利用する](../guides/gpu/)で説明しています

## Data

研究Dataは失われないよう、共有環境であることを前提に管理してください。

- 研究コードはGitHubなどのRemote RepositoryへBackupする
- WorkspaceをDeleteする前に必要なDataを退避する
- 個人情報や未公開の研究Dataを扱う場合は、事前に管理者へ確認する
- 共有環境であることを前提に、保存する情報を判断する

## 秘密情報
秘密情報はWorkspace内でも扱いに注意してください。

- API Key、Token、Password、秘密鍵をGitへCommitしない
- 秘密情報をSource Codeへ直接書かない
- 接続先URLや招待URLを公開しない
- Credentialを含むScreenshotやLogを共有しない

:::caution
Workspaceは利用者ごとに分離されていますが、物理的には研究室が管理する共有Computer上で動作します。高い機密性が必要なDataを扱う前に、管理者へ確認してください。
:::

## 制限

次の制限は、他の利用者の環境とSystem全体を保護するための設計です。

- WorkspaceからHost側のDockerを操作することはできません
- Workspaceの実行先は作成後に変更できません。変更が必要な場合は新しいWorkspaceへ移行します（[Workspaceの操作](../coder/lifecycle/)を参照）
- Coderへのログインは、許可されたGitHub Organizationのメンバーに限定されています

## Next steps

- [トラブルシューティング](troubleshooting/) — Coder、Workspace、VS Code、GPUで問題が発生した場合の確認手順です。
- [ファイルと永続化](../../coder/persistence/) — Workspace内で保持されるファイルの保存先とBackup方法を説明します。
