---
name: cloudflare-docs-style
description: 完全初心者向け日本語技術ドキュメントの作成・刷新・構成レビュー時に使用する。Cloudflare Docs風の読みやすい構造を基礎に、概念、専門用語、コマンド、コード、実行結果、検証、エラー、理由まで段階的に説明する。
--------------------------------------------------------------------------------------------------------------------------

# 完全初心者向け技術Docs

Cloudflare Developer Docsのような簡潔で探索しやすい構造を基礎にしながら、対象技術を初めて利用する読者でも理解できる技術ドキュメントを作成する。

このSkillの目的は、読者にCommandやCodeをコピーさせることではない。

読者が最終的に、

* 今何をしているか説明できる
* Commandの意味をある程度推測できる
* Codeの処理を追える
* Error Messageの重要部分を読める
* 問題が起きたとき確認すべき場所を判断できる
* 公式Documentationを読み始められる
* 新しいToolを自力で学び始められる

状態を目標にする。

## 対象読者

各ページの読者は、そのページで扱う技術、言語、Library、CLI、Toolを初めて利用する人として扱う。

次の知識を前提にしない。

* 専門用語
* Command Line操作
* Programming Languageの構文
* Package Manager
* Version Control
* Build
* Compile
* Runtime
* Dependency
* Environment Variable
* File / Directory構造
* 開発Tool固有の慣習

一般的な開発者には常識であっても、そのページで初めて必要になる概念は説明する。

ただし、理解に不要な基礎知識まで遡って説明しない。

現在の操作を理解するために必要な知識だけを説明する。

## 基本原則

原則として次の順番で説明する。

1. 何をするのか
2. それは何なのか
3. なぜ必要なのか
4. 最小の例
5. 実行方法
6. CommandやCodeの各要素の意味
7. 実行すると何が起きるのか
8. 成功を確認する方法
9. よくあるError
10. 実際の開発でどう使うのか
11. 必要な場合のみ発展内容

読者に意味が分からないCommandを先に実行させ、その説明を大幅に後回しにしない。

説明のために操作の流れが過度に分断される場合は、操作直前に最低限必要な意味だけ説明し、詳細を後続Sectionで補足する。

## 全ページ共通

* 日本語で書く。
* Product名、Command名、API名などの正式名称は維持する。
* 冒頭で「何のページか」「何ができるようになるか」を説明する。
* 初出の重要専門用語は定義する。
* CommandやCodeを説明なしで掲載しない。
* 操作には成功確認方法を付ける。
* 理由が重要な操作では「なぜ」を説明する。
* Errorでは原因だけでなく確認方法を説明する。
* 本筋に不要な詳細は後ろへ分離する。
* ページ末尾には必要に応じて `Next steps` を置く。

## ページ種別

ページは主に次の3種類に分類する。

1. Overview
2. Tutorial / Guide
3. Reference

複数の性質を持つ場合は、そのページの主要目的で分類する。

---

# Overview

Overviewは「その技術が何なのか」を理解するためのページ。

原則として次の順番にする。

1. 概要
2. 何ができるか
3. 主要概念
4. 全体の仕組み
5. 最小例
6. どのような場合に使うか
7. Next steps

## 概要

冒頭2〜4文程度で次を説明する。

* 何なのか
* 何のために使うのか
* 読み終えると何が分かるのか

例:

> GitはFileの変更履歴を記録するためのVersion Control Systemです。このページではGitが何を管理しているのかを理解し、RepositoryやCommitなど、以降の操作で必要になる基本概念を学びます。

「高速」「簡単」「強力」など抽象的な宣伝表現だけで説明しない。

## 主要概念

その技術を理解するために必須の概念だけを説明する。

Gitなら例えば、

* Repository
* Working Tree
* Commit
* Local Repository
* Remote Repository

Python Package管理なら、

* Package
* Dependency
* Virtual Environment
* Package Manager

すべての用語を網羅する必要はない。

次のページを理解するために必要なものだけ扱う。

## 全体像

複数の要素が関係する場合は簡単な図を使う。

```text
Local PC
  |
  | git push
  v
GitHub Repository
```

内部実装を簡略化した図なら、そのことが誤解されないよう説明する。

---

# Tutorial / Guide

Tutorialは読者が実際に作業を完了するためのページ。

基本構造:

```text
目的
↓
必要な概念
↓
前提確認
↓
操作
↓
成功確認
↓
必要な理由の補足
↓
Troubleshooting
↓
実運用
↓
Next steps
```

## 導入

最初に次を説明する。

* このページで行うこと
* 完了すると何ができるか
* 必要なら最終的に作られるもの

## まず知っておくこと

操作に必要な概念を説明する。

ただし、Tutorial開始前に長大な理論説明を置かない。

操作を理解するために最低限必要な概念だけ扱う。

## 全体の流れ

3 Step以上の操作がある場合は、最初に全体像を示す。

例:

```text
Projectを作成
↓
Virtual Environmentを作成
↓
PackageをInstall
↓
Programを実行
```

読者が現在位置を見失わないことを優先する。

## Prerequisites

各前提は可能な限り次の形式で説明する。

1. 何が必要か
2. なぜ必要か
3. 確認方法
4. 正常な状態
5. 満たしていない場合の対応

例:

```bash
python3 --version
```

正常な例:

```text
Python 3.12.4
```

Version番号自体が固定条件でない場合は、特定Versionが必須であるように書かない。

---

# 操作Step

各主要Stepは原則として次の構造にする。

## 1. 何をするか

最初に操作の目的を1〜2文で説明する。

例:

> ProjectごとにPython Packageを分離するため、Virtual Environmentを作成します。

## 2. Command / Code

実行する最小のCommandまたはCodeを示す。

```bash
python3 -m venv .venv
```

## 3. 各要素の意味

そのページで初めて登場するCommand、Option、Argumentを説明する。

例:

* `python3`: Python Interpreterを起動するCommand
* `-m`: Python Moduleを指定して実行するOption
* `venv`: Virtual Environmentを作成する標準Module
* `.venv`: 作成するDirectory名

その後、Command全体の意味を1文でまとめる。

> このCommandはPythonの`venv` Moduleを実行し、現在のDirectoryへ`.venv`というVirtual Environmentを作成します。

毎回すべての既出Optionを再説明する必要はない。

## 4. 実行すると何が起きるか

Command実行によって変化するものを説明する。

* Fileが作られる
* Directoryが作られる
* Processが起動する
* Configurationが変わる
* Network通信が発生する
* Remote ServiceへDataが送られる

など。

必要ならDirectory構造を示す。

```text
my-project/
├── .venv/
└── main.py
```

## 5. 成功を確認する

可能な限り確認Commandを示す。

```bash
ls -a
```

期待される結果:

```text
.venv
```

「Errorが出なければ成功」だけにしない。

利用者が正常状態を観測できるようにする。

## 6. 失敗した場合

そのStepで頻発するErrorがある場合だけ、直後に簡潔な対処を置く。

複雑なTroubleshootingは後ろの専用Sectionへ分離する。

---

# Codeの説明

Programming Codeを掲載する場合、Codeだけを提示しない。

例:

```python
name = "Alice"
print(name)
```

この構文が初出なら、必要に応じて次を説明する。

* `name`: Variable
* `=`: 右側の値を左側のVariableへ代入する
* `"Alice"`: String
* `print()`: 値を標準出力へ表示するFunction

ただし既に説明済みの基本構文を毎回繰り返さない。

## 複雑な処理

複数段階の処理では、先に処理の流れを示す。

```text
Fileを開く
↓
Dataを読み込む
↓
値を変換する
↓
計算する
↓
結果を保存する
```

必要な場合は途中の値、型、入出力も示す。

読者が処理を上から追えることを優先する。

---

# Commandの説明

Commandを掲載する場合、初出の主要Tokenを説明する。

```bash
git commit -m "Add README"
```

例えば、

* `git`: Gitを操作するCommand
* `commit`: 現在Stageされている変更を履歴として記録するSubcommand
* `-m`: Commit MessageをCommand Lineから指定するOption
* `"Add README"`: Commit Message

と説明する。

長いCommandではすべての記号を機械的に説明する必要はない。

読者が意味を理解できない部分を優先する。

## 略語

由来が理解に役立つCommandは説明する。

| Command | 由来                      | 用途              |
| ------- | ----------------------- | --------------- |
| `pwd`   | print working directory | 現在のDirectoryを表示 |
| `cd`    | change directory        | Directoryを移動    |
| `cp`    | copy                    | FileをCopy       |
| `rm`    | remove                  | Fileを削除         |

暗記させるためではなく、Commandを推測できるようにするために説明する。

---

# 「なぜ」の説明

「推奨されています」だけで終わらせない。

可能な場合は、その方法が必要になる理由を説明する。

例:

> Python PackageをOS全体へ直接Installすると、Project AとProject Bが異なるVersionを必要とした場合に競合する可能性があります。そのためProjectごとにVirtual Environmentを分離します。

理由の説明は次のどれかを明確にする。

* 何を防ぐのか
* 何を簡単にするのか
* 何を再現可能にするのか
* どのような問題が起こるのか

---

# 専門用語

専門用語を避けすぎない。

正しい専門用語を使用し、初出時に定義する。

悪い例:

> Remote RepositoryへPushします。

良い例:

> GitHubなどNetwork上にあるRepositoryをRemote Repositoryと呼びます。`git push`を実行すると、Local RepositoryにあるCommitをRemote Repositoryへ送信できます。

一度定義した後は正式用語を使用する。

---

# 複数の方法

同じ目的を達成する方法が複数ある場合、初心者にすべてを同時に選択させない。

原則:

1. 推奨方法
2. 理由
3. 必要なら代替方法
4. 違い
5. 使い分け

例えばPackage Managerが複数存在しても、ページの目的に1つで十分なら1つを主経路として扱う。

複数記法を並列表示するのは、実際に読者が選択する必要がある場合だけにする。

---

# 間違った例

誤操作が理解に有効な場合は、問題のある例を示してよい。

問題のある例:

```bash
pip install numpy
```

Virtual Environmentを有効化していない場合、意図しないPython EnvironmentへPackageをInstallする可能性がある。

推奨例:

```bash
python -m pip install numpy
```

単に「こちらを使う」とせず、何が違うか説明する。

---

# Error / Troubleshooting

Error説明は可能な限り次の順番にする。

1. 何が起きているか
2. Error Messageのどこを見るか
3. 主な原因
4. 原因を確認するCommand
5. 修正方法
6. 修正できたことを確認する方法

例:

```text
bash: python: command not found
```

このErrorなら、

* Shellが`python`というCommandを見つけられていない
* Python自体が未Installなのか
* `python3`というCommand名なのか
* PATHに問題があるのか

を必要に応じて切り分ける。

原因を確認せずに特定の修正Commandだけを実行させない。

---

# 危険な操作

Data削除、権限変更、Secret、Remote公開などが関係するCommandには実行前に説明を置く。

例:

```bash
rm -rf directory
```

初出なら、

* `rm`: FileやDirectoryを削除
* `-r`: Directory内部を再帰的に削除
* `-f`: 確認なしで強制実行

を説明する。

復元不能な可能性がある場合は `:::danger` を使用する。

意味を理解していない読者へ危険なCommandをコピー&ペーストさせない。

---

# Security

次を扱う場合は明示的に注意する。

* Password
* API Key
* Access Token
* SSH Private Key
* `.env`
* 個人情報
* 未公開研究Data
* Git RepositoryへのCommit
* Public Repository
* 外部ServiceへのUpload
* Networkへの公開

正常に動く方法だけでなく、安全な方法を説明する。

Secretの例では実在する値を使用しない。

---

# 実際の開発では

学習用の最小例と実運用が異なる場合は、その違いを説明する。

例:

> このページでは仕組みを理解するため`venv`と`pip`を使用しています。実際のProjectではDependency管理と環境構築をまとめるため、`uv`などのToolを利用する場合もあります。

必要な場合だけ次を扱う。

* 一般的な方法
* 推奨される方法
* なぜ使われるか
* 学習用例との違い

初心者向けページをBest Practice一覧にしない。

---

# もう一歩踏み込むと

基本操作を理解するために不要な内容は後ろへ分離する。

扱ってよい内容:

* 内部実装
* Architecture
* Performance
* Memory
* Security Detail
* Protocol
* API Design
* 他Toolとの比較

このSectionを読まなくてもTutorial本編を完了できる状態にする。

---

# コラム

本題には必須ではないが理解を助ける内容は独立させる。

例:

```md
### コラム: なぜ `.venv` は `.` から始まるのか
```

コラムによって本編の操作手順を中断しない。

---

# Reference

ReferenceページはTutorialとは異なり、検索性を優先する。

基本構造:

1. H1
2. 短い概要
3. 項目ごとのH2
4. Parameter / Option / Valueの表
5. 最小Example
6. 制約
7. 関連Link

各項目は、

> 1文の説明 → Table → 必要ならExample → 補足

を基本とする。

事実、既定値、型、制約などはTableを優先する。

ただし表だけでは意味が分からない場合は説明文を追加する。

---

# 出力例

Commandと出力は分離する。

Command:

```bash
python3 --version
```

その直後に結果の意味を説明し、出力を`text` Blockで示す。

```text
Python 3.12.4
```

`bash` Block内にCommandと出力を混在させない。

次のような記述は避ける。

```bash
python3 --version
# 出力例
Python 3.12.4
```

---

# Note / Tip / Caution / Danger

本リポジトリではStarlight Asideを使用する。

```md
:::note
補足
```

````

本筋から外れる情報を分離するために使う。

通常の説明をすべてAsideへ入れない。

---

# Link

裸のLinkを置かない。

Linkの前後に、そのページを見る理由を1文で説明する。

例:

> `venv`の全OptionとPlatformごとの仕様はPython公式Documentationで確認できます。

Link先の内容を読まなければ現在ページを理解できない構造は避ける。

現在の操作に必須な情報は現在ページにも書く。

---

# 文体

- 短文・短段落を基本にする。
- 1段落へ複数の話題を詰め込まない。
- 曖昧な代名詞を避ける。
- 操作対象を明示する。
- 「適当に」「普通に」「当然」「簡単に」など、前提知識を要求する表現を避ける。
- 不要な比喩を使わない。
- 正式な専門用語は正しく使用する。
- 説明のためだけの専門用語を増やさない。

## 良くない例

> 普通にvenvを切ってpipで入れます。

## 推奨

> ProjectごとにPython Packageを分離するため、Virtual Environmentを作成します。その後、このEnvironment内へPackageをInstallします。

---

# 情報量の優先順位

説明量は次の順番で優先する。

1. 何をしているか理解できる
2. 自分で実行できる
3. 成功したか判断できる
4. なぜそうするか理解できる
5. Errorをある程度切り分けられる
6. 一般的な開発方法を知る
7. 内部実装を理解する

高度な内容によって初心者向け説明を読みにくくしない。

---

# Tutorial Template

必要なSectionだけ使用する。

```md
# ページタイトル

概要を2〜4文で説明する。

## まず知っておくこと

このページで必要になる概念・専門用語を説明する。

## 全体の流れ

必要な場合のみ示す。

## Prerequisites

必要な環境と確認方法を説明する。

## 1. 最初の操作

何をするのか、なぜ必要なのかを説明する。

```bash
command
````

Commandの各要素を説明する。

実行すると何が起きるか説明する。

### 確認

```bash
verification-command
```

期待される結果:

```text
result
```

## 2. 次の操作

同じ構造を繰り返す。

## なぜこの方法を使うのか

必要な場合のみ背景を説明する。

## よくあるError

原因 → 確認 → 修正 → 再確認。

## 注意

Securityや破壊的操作がある場合。

## 実際の開発では

学習用例との違いがある場合。

## もう一歩踏み込むと

必要な場合のみ。

## Next steps

次に読むページを1文の説明付きで示す。

```

---

# 最終Checklist

ページ作成・刷新後に確認する。

- [ ] 対象読者を完全初心者として扱っている
- [ ] ページの目的が冒頭で分かる
- [ ] 初出の重要専門用語を説明している
- [ ] Commandを説明なしで掲載していない
- [ ] 初出OptionやArgumentの意味を説明している
- [ ] Codeの初出構文を必要な範囲で説明している
- [ ] 操作すると何が変化するか説明している
- [ ] 成功確認方法がある
- [ ] 「なぜ必要か」が重要な操作では理由を書いている
- [ ] Errorでは原因確認方法を書いている
- [ ] 危険な操作を事前に警告している
- [ ] Secretや非公開情報を掲載していない
- [ ] 複数手段がある場合、初心者向けの主経路を明示している
- [ ] 高度な内容が基本操作を邪魔していない
- [ ] Linkだけに説明を依存していない
- [ ] Commandと出力を別Blockにしている
- [ ] 必要に応じてNext stepsがある
:::

この分け方なら、`astro-starlight-public-docs = リポジトリ/公開サイトをどう扱うか`、`cloudflare-docs-style = 中身をどう教えるか` となり、かなり明確になります。
```

[1]: https://github.com/ct-kitamuralab/ct-kitamuralab-docs/blob/main/.opencode/skills/astro-starlight-public-docs/SKILL.md "ct-kitamuralab-docs/.opencode/skills/astro-starlight-public-docs/SKILL.md at main · ct-kitamuralab/ct-kitamuralab-docs · GitHub"
[2]: https://github.com/ct-kitamuralab/ct-kitamuralab-docs/blob/main/.opencode/skills/cloudflare-docs-style/SKILL.md "ct-kitamuralab-docs/.opencode/skills/cloudflare-docs-style/SKILL.md at main · ct-kitamuralab/ct-kitamuralab-docs · GitHub"