import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://ct-kitamuralab.github.io",
  base: process.env.BASE_PATH ?? "/",
  integrations: [
    starlight({
      title: "喜多村研究室 Docs",
      description: "喜多村研究室が提供する開発環境、GPU、AI研究基盤の利用ドキュメント",
      favicon: "/favicon.svg",
      locales: {
        root: {
          label: "日本語",
          lang: "ja",
        },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/ct-kitamuralab/ct-kitamuralab-docs",
        },
      ],
      customCss: ["./src/styles/docs.css"],
      components: {
        Header: "./src/components/DocsHeader.astro",
      },
      lastUpdated: true,
      sidebar: [
        { label: "概要", slug: "index" },
        {
          label: "利用を始める",
          items: [
            { label: "利用対象と申請", slug: "getting-started/application" },
            { label: "利用前の準備", slug: "getting-started/prerequisites" },
            { label: "初回ログイン", slug: "getting-started/first-login" },
            { label: "Workspaceを作成する", slug: "getting-started/create-workspace" },
          ],
        },
        {
          label: "Coder Workspace",
          items: [
            { label: "概要", slug: "coder" },
            { label: "VS Code Web", slug: "coder/vscode-web" },
            { label: "VS Code Desktop", slug: "coder/vscode-desktop" },
            { label: "ファイルと永続化", slug: "coder/persistence" },
            { label: "Workspaceの操作", slug: "coder/lifecycle" },
          ],
        },
        {
          label: "開発ガイド",
          items: [
            { label: "GPUを利用する", slug: "guides/gpu" },
            { label: "GitとGitHub", slug: "guides/git-github" },
            { label: "Python環境", slug: "guides/python" },
            { label: "開発ツール", slug: "guides/development-tools" },
            { label: "AI Coding Agent", slug: "guides/ai-coding-agents" },
          ],
        },
        {
          label: "運用と安全",
          items: [
            { label: "利用ルール", slug: "operations/rules" },
            { label: "トラブルシューティング", slug: "operations/troubleshooting" },
          ],
        },
        {
          label: "研究システム",
          items: [
            { label: "システム一覧", slug: "systems" },
            { label: "提供状況", slug: "systems/status" },
          ],
        },
      ],
    }),
  ],
});
