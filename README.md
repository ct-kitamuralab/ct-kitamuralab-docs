# 喜多村研究室 Docs

喜多村研究室が提供する開発環境、GPU、AI研究基盤の利用ドキュメントです。Astro と Starlight で構築し、GitHub Pages で公開します。

## 主な内容

- Coder Workspace の利用開始、接続、永続化、操作方法
- GPU、Python、Git/GitHub、AI Coding Agent などの開発ガイド
- 研究システムの提供状況、利用ルール、トラブルシューティング

接続先や認証情報などの非公開情報はリポジトリに記載しません。利用承認後に管理者から個別に案内します。

## 必要環境

- Node.js
- npm

## 開発

依存関係をインストールします。

```sh
npm install
```

開発サーバーを起動します。

```sh
npm run dev
```

通常は `http://localhost:4321` で確認できます。

GitHub Pages と同じベースパスで本番ビルドを確認する場合は、次を実行します。

```sh
BASE_PATH=/ct-kitamuralab-docs npm run build
```

生成物は `dist/` に出力されます。ローカルで確認するには次を実行します。

```sh
npm run preview
```

## コンテンツの更新

利用者向けドキュメントは `src/content/docs/` に Markdown または MDX で追加・編集します。ページを追加した場合は、`astro.config.mjs` の `sidebar` にも登録してください。

カスタムコンポーネントは `src/components/`、共通スタイルは `src/styles/docs.css` に配置しています。

公開前に、接続 URL、認証情報、内部ホスト名、IP アドレスなどの非公開情報が含まれていないことを確認してください。

## デプロイ

`main` ブランチへの push で `.github/workflows/deploy.yml` が実行され、GitHub Pages へデプロイされます。GitHub Actions 上ではリポジトリ名をベースパスとして自動設定します。

## 技術構成

- [Astro](https://astro.build/)
- [Starlight](https://starlight.astro.build/)
- GitHub Pages

## 関連リンク

- [公開ドキュメント](https://ct-kitamuralab.github.io/ct-kitamuralab-docs/)
- [リポジトリ](https://github.com/ct-kitamuralab/ct-kitamuralab-docs)
- [Coder 環境の詳細な利用者・管理者向けドキュメント](https://github.com/ct-kitamuralab/ct-kitamuralab-coder-system)
