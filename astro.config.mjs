import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import mermaid from "astro-mermaid";
import { sidebar } from "./src/lib/navigation.mjs";

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
      description: "研究室システムの利用方法と、研究開発に役立つ汎用的な技術をまとめたドキュメント",
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
      sidebar,
    }),
  ],
});
