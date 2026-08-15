---
title: GPUを利用する
description: Coder WorkspaceからRTX A2000 12GBを確認し、共有GPUを利用する方法です。
---

Coder WorkspaceではRTX A2000 12GBを利用できます。GPUは研究室メンバーで共有するResourceで、実行先（alpha/beta）それぞれに1枚ずつ搭載されています。同じ実行先のWorkspaceはGPUを共有するため、利用前の確認とマナーを守って利用してください。

## GPUを確認する

WorkspaceのTerminalで次のCommandを実行します。

```bash
nvidia-smi
```

次のようにRTX A2000とDriver情報が表示されれば、GPUを利用できます。

```text
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI xxx.xx        Driver Version: xxx.xx        CUDA Version: xx.x              |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 | Memory-Usage      | GPU-Util  | Process ID             |
|   0  NVIDIA RTX A2000     | 120MiB / 12288MiB |      0%  | No running processes |
+-----------------------------------------+------------------------+----------------------+
```

表示項目の詳細は[NVIDIAのnvidia-smiドキュメント](https://docs.nvidia.com/deploy/nvidia-smi/)で確認できます。

## 利用状況を確認する

`nvidia-smi` には、次の項目が表示されます。

- `Memory-Usage` — GPU Memoryの使用量（例: `120MiB / 12288MiB`）
- `GPU-Util` — GPUの使用率（%）
- `Process ID` — GPUを使用しているProcess

負荷の高い処理を始める前に、同じ実行先の他の利用者がGPUを使用していないか確認してください。また、CoderのDashboardでもWorkspaceごとのGPUのUsageを確認できます。

## 実際にGPUを使う

PythonでGPUを使う場合は、まずCUDAが利用可能か確認します。

```bash
python -c "import torch; print(torch.cuda.is_available())"
```

`True` が表示されれば、GPUを使用できます。モデルやTensorをGPUへ移す例は次の通りです。

```python
import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
x = torch.randn(1024, 1024, device=device)
print(x @ x)
```

Packageの導入方法は[Python環境](python/)を参照してください。

## 利用上の注意

- 長時間の重い処理は、必要に応じて他の利用者と調整する
- 不要なGPU Processを残さない
- 作業終了後はWorkspaceをStopする
- 大量のGPU Memoryを使用する処理では、他のJobへの影響を考慮する

## GPUが表示されない

`nvidia-smi` が見つからない、またはGPUが表示されない場合は、Workspaceを無理にDeleteしないでください。作成時のテンプレートや実行先の設定に問題がある可能性があります。次の情報を管理者へ伝えます。

- Workspace名
- 作成時に選択した実行先
- `nvidia-smi` の出力またはError Message

## Next steps

- [利用ルール](../../operations/rules/) — 共有GPU、研究Data、秘密情報を安全に扱うための利用ルールです。
- [トラブルシューティング](../../operations/troubleshooting/) — Coder、Workspace、VS Code、GPUで問題が発生した場合の確認手順です。
