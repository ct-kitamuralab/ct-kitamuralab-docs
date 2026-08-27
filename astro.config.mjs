import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import mermaid from "astro-mermaid";

export default defineConfig({
  site: "https://ct-kitamuralab.github.io",
  base: process.env.BASE_PATH ?? "/",
  integrations: [
    mermaid({
      autoTheme: true,
      iconPacks: [
        { name: 'mdi', url: 'https://unpkg.com/@iconify-json/mdi@1/icons.json' },
      ],
    }),
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
      editLink: {
        baseUrl: "https://github.com/ct-kitamuralab/ct-kitamuralab-docs/edit/main/",
      },
      customCss: ["./src/styles/docs.css"],
      components: {
        PageFrame: "./src/components/DocsPageFrame.astro",
        TwoColumnContent: "./src/components/DocsTwoColumnContent.astro",
        ContentPanel: "./src/components/DocsContentPanel.astro",
        Head: "./src/components/DocsHead.astro",
        Header: "./src/components/DocsHeader.astro",
        Hero: "./src/components/DocsHero.astro",
        PageTitle: "./src/components/DocsPageTitle.astro",
        PageSidebar: "./src/components/DocsPageSidebar.astro",
        Footer: "./src/components/DocsFooter.astro",
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
            { label: "Linux(Mac OS)ターミナルの基本", slug: "guides/linux-terminal" },
            { label: "GPUを利用する", slug: "guides/gpu" },
            { label: "Gitとは", slug: "guides/git-github" },
            { label: "変更をCommitする", slug: "guides/git-commit" },
            { label: "GitHubへ保存する", slug: "guides/github" },
            { label: "Python環境", slug: "guides/python" },
            { label: "開発ツール", slug: "guides/development-tools" },
            {
              label: "AI Coding Agent",
              items: [
                { label: "概要", slug: "guides/ai-coding-agents" },
                { label: "Codexのログイン", slug: "guides/ai-coding-agents/codex-login" },
              ],
            },
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
