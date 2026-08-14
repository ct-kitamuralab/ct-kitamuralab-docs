---
title: AI Coding Agent
description: Workspaceに導入されているAI Coding Agentの用途、安全な利用方法、公式ドキュメントを案内します。
---

Coder Workspaceには、Terminalから利用するAI Coding Agentが導入されています。コードの説明、下書き、修正案、テスト作成などを支援できますが、生成結果をそのまま実行・Commitせず、必ず内容を確認してください。

## 利用できるAgent

| Agent | 起動Command | 公式ドキュメント |
| --- | --- | --- |
| [OpenCode](https://opencode.ai/) | `opencode` | [OpenCode Docs](https://opencode.ai/docs) |
| [Claude Code](https://www.anthropic.com/claude-code) | `claude` | [Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/overview) |
| [Codex](https://openai.com/codex/) | `codex` | [Codex Docs](https://developers.openai.com/codex/) |

導入済みかどうかは、次のCommandで確認できます。

```bash
opencode --version
claude --version
codex --version
```

## 基本的な使い方

Project Directoryへ移動してから、使用するAgentを起動します。

```bash
cd /home/coder/projects/my-research
opencode
```

Agentには、目的、対象ファイル、期待する動作、制約を具体的に伝えると、結果を確認しやすくなります。変更提案を受けたら、差分とテスト結果を自分で確認してください。

## 安全な利用

- API Key、Token、Password、秘密鍵をPromptへ入力しない
- 未公開の研究データや個人情報を、承認なく外部Serviceへ送信しない
- Agentが実行を提案したCommandと変更内容を確認してから実行する
- 生成コードをCommitする前に、`git diff`とテスト結果を確認する

:::note
研究室向けLLM APIの接続設定は準備中です。認証情報、接続先、利用可否は管理者からの案内に従ってください。
:::

## 次に読む

- PackageやCLIの標準環境を確認する: [開発ツール](../development-tools/)
- 変更履歴とBackupを管理する: [GitとGitHub](../git-github/)
- Python Projectを再現可能にする: [Python環境](../python/)
