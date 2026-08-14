---
title: GPUを利用する
description: Coder WorkspaceからRTX A2000 12GBを確認し、共有GPUを利用する方法です。
---

Coder WorkspaceではRTX A2000 12GBを利用できます。GPUは研究室メンバーで共有するResourceです。`nvidia-smi` の表示項目は[NVIDIAのnvidia-smiドキュメント](https://docs.nvidia.com/deploy/nvidia-smi/)で確認できます。

## GPUを確認する

WorkspaceのTerminalで次のCommandを実行します。

```bash
nvidia-smi
```

RTX A2000 12GBとDriver情報が表示されれば、GPUを利用できます。

## 利用状況を確認する

`nvidia-smi` には、GPU Memoryの使用量や実行中のProcessが表示されます。負荷の高い処理を始める前に、他の利用者がGPUを使用していないか確認してください。

## 利用上の注意

- 長時間の重い処理は、必要に応じて他の利用者と調整する
- 不要なGPU Processを残さない
- 作業終了後はWorkspaceをStopする
- 大量のGPU Memoryを使用する処理では、他のJobへの影響を考慮する

## GPUが表示されない

`nvidia-smi` が見つからない、またはGPUが表示されない場合は、Workspaceを無理にDeleteしないでください。次の情報を管理者へ伝えます。

- Workspace名
- 作成時に選択した実行先
- `nvidia-smi` の出力またはError Message
