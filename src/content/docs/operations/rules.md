---
title: 利用ルール
description: 共有GPU、研究Data、秘密情報を安全に扱うための利用ルールです。
---

Research Systemsは複数の研究室メンバーが共有する環境です。他の利用者と研究Dataを守るため、次のルールに従ってください。

## 共有Resource

- 作業終了後はWorkspaceをStopする
- GPUを使う重い処理を長時間実行する場合は、他の利用者と調整する
- 不要なProcessやJobを放置しない
- 他の利用者のWorkspaceやProcessへ干渉しない

## Data

- 研究コードはGitHubなどへBackupする
- WorkspaceをDeleteする前に必要なDataを退避する
- 個人情報や未公開の研究Dataは、研究室の方針に従って扱う
- 共有環境であることを前提に、保存する情報を判断する

## 秘密情報

- API Key、Token、Password、秘密鍵をGitへCommitしない
- 秘密情報をSource Codeへ直接書かない
- 接続先URLや招待URLを公開しない
- Credentialを含むScreenshotやLogを共有しない

:::caution
Workspaceは利用者ごとに分離されていますが、物理的には研究室が管理する共有Computer上で動作します。高い機密性が必要なDataを扱う前に、管理者へ確認してください。
:::

## 制限

WorkspaceからHost側のDockerを操作することはできません。これは他の利用者の環境とSystem全体を保護するための設計です。
