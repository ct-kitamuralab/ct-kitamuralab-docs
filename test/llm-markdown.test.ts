import { describe, expect, it, vi } from "vitest";
import type { CollectionEntry } from "astro:content";

const SITE = "https://ct-kitamuralab.github.io";
const DEFAULT_BASE = "/ct-kitamuralab-docs";

async function load(base: string) {
  vi.resetModules();
  vi.stubEnv("BASE_PATH", base);
  return import("../src/lib/llm-markdown");
}

function entry(id: string, body: string, data: Record<string, string> = {}): CollectionEntry<"docs"> {
  return {
    id,
    body,
    data: {
      title: "テストページ",
      description: "テスト用の説明です。",
      ...data,
    },
  } as unknown as CollectionEntry<"docs">;
}

describe("llm-markdown: URL helpers", () => {
  it("pageUrl はルートを / へ変換する", async () => {
    const { pageUrl } = await load(DEFAULT_BASE);
    expect(pageUrl("index")).toBe(`${SITE}${DEFAULT_BASE}/`);
  });

  it("pageUrl はネストIDを /id/ 形式へ変換する", async () => {
    const { pageUrl } = await load(DEFAULT_BASE);
    expect(pageUrl("coder/vscode-web")).toBe(`${SITE}${DEFAULT_BASE}/coder/vscode-web/`);
  });

  it("pageUrl は末尾スラッシュ付き BASE_PATH を正規化する", async () => {
    const { pageUrl } = await load("/custom/");
    expect(pageUrl("coder")).toBe(`${SITE}/custom/coder/`);
  });

  it("markdownUrl はルートを /index.md へ変換する", async () => {
    const { markdownUrl } = await load(DEFAULT_BASE);
    expect(markdownUrl("index")).toBe(`${SITE}${DEFAULT_BASE}/index.md`);
  });

  it("markdownUrl はネストIDを /id.md 形式へ変換する", async () => {
    const { markdownUrl } = await load(DEFAULT_BASE);
    expect(markdownUrl("guides/ai-coding-agents/codex-login")).toBe(
      `${SITE}${DEFAULT_BASE}/guides/ai-coding-agents/codex-login.md`,
    );
  });
});

describe("llm-markdown: sections", () => {
  it("sections は 5 セクションを定義する", async () => {
    const { sections } = await load(DEFAULT_BASE);
    expect(sections).toEqual([
      ["利用を始める", "getting-started/"],
      ["Coder Workspace", "coder/"],
      ["開発ガイド", "guides/"],
      ["運用と安全", "operations/"],
      ["研究システム", "systems/"],
    ]);
  });

  it("sectionFor はセクションルートを一致させる", async () => {
    const { sectionFor } = await load(DEFAULT_BASE);
    expect(sectionFor("coder")).toEqual(["Coder Workspace", "coder/"]);
    expect(sectionFor("systems")).toEqual(["研究システム", "systems/"]);
  });

  it("sectionFor はネストIDをセクションへ解決する", async () => {
    const { sectionFor } = await load(DEFAULT_BASE);
    expect(sectionFor("coder/vscode-web")).toEqual(["Coder Workspace", "coder/"]);
    expect(sectionFor("guides/ai-coding-agents/codex-login")).toEqual(["開発ガイド", "guides/"]);
  });

  it("sectionFor はルートindexを解決しない", async () => {
    const { sectionFor } = await load(DEFAULT_BASE);
    expect(sectionFor("index")).toBeUndefined();
  });

  it("sectionLlmsUrl はセクションページの llms.txt を返す", async () => {
    const { sectionLlmsUrl } = await load(DEFAULT_BASE);
    expect(sectionLlmsUrl("coder")).toBe(`${SITE}${DEFAULT_BASE}/coder/llms.txt`);
    expect(sectionLlmsUrl("systems/status")).toBe(`${SITE}${DEFAULT_BASE}/systems/llms.txt`);
  });

  it("sectionLlmsUrl はセクション外をルート llms.txt へ解決する", async () => {
    const { sectionLlmsUrl } = await load(DEFAULT_BASE);
    expect(sectionLlmsUrl("index")).toBe(`${SITE}${DEFAULT_BASE}/llms.txt`);
  });
});

describe("llm-markdown: renderMarkdown", () => {
  it("frontmatter と Documentation Index ヘッダーを生成する", async () => {
    const { renderMarkdown } = await load(DEFAULT_BASE);
    const out = renderMarkdown(entry("coder", "本文です。"), "2026-08-16");
    expect(out).toContain("---\ndescription: テスト用の説明です。\ntitle: テストページ\n---");
    expect(out).toContain("[Skip to content](#main-content)");
    expect(out).toContain(`> Fetch the documentation index at: ${SITE}${DEFAULT_BASE}/coder/llms.txt  `);
    expect(out).toContain("# テストページ");
    expect(out).toContain(`Last updated 2026-08-16 | Copy as Markdown | [View as Markdown](${SITE}${DEFAULT_BASE}/coder.md)`);
    expect(out).toContain("本文です。");
  });

  it("import 文を除去する", async () => {
    const { renderMarkdown } = await load(DEFAULT_BASE);
    const out = renderMarkdown(
      entry("systems/status", 'import SystemStatus from "../../components/SystemStatus.astro";\n\n本文です。'),
      "2026-08-16",
    );
    expect(out).not.toContain("import SystemStatus");
    expect(out).toContain("本文です。");
  });

  it("SystemStatus をMarkdownテーブルへ変換する", async () => {
    const { renderMarkdown } = await load(DEFAULT_BASE);
    const body = [
      '<SystemStatus items={[',
      '  { name: "Coder Workspace", status: "available", label: "提供中", description: "承認された利用者が利用できます。" },',
      '  { name: "LiteLLM API", status: "preparing", label: "準備中", description: "APIを整備しています。" },',
      "]} />",
    ].join("\n");
    const out = renderMarkdown(entry("systems/status", body), "2026-08-16");
    expect(out).toContain("| システム | 提供状況 | 説明 |");
    expect(out).toContain("| --- | --- | --- |");
    expect(out).toContain("| Coder Workspace | 提供中 | 承認された利用者が利用できます。 |");
    expect(out).toContain("| LiteLLM API | 準備中 | APIを整備しています。 |");
    expect(out).not.toContain("<SystemStatus");
  });

  it("SystemStatus が行にない場合は空に置換する", async () => {
    const { renderMarkdown } = await load(DEFAULT_BASE);
    const out = renderMarkdown(entry("coder", "本文です。"), "2026-08-16");
    expect(out).not.toContain("| システム | 提供状況 | 説明 |");
  });

  it("quick-facts をMarkdownテーブルへ変換する", async () => {
    const { renderMarkdown } = await load(DEFAULT_BASE);
    const body = [
      '<div class="quick-facts">',
      "  <div><span>Development</span><strong>Coder Workspace</strong></div>",
      "  <div><span>Compute</span><strong>RTX A2000 12GB</strong></div>",
      "  <div><span>Access</span><strong>VS Code Web / Desktop</strong></div>",
      "</div>",
    ].join("\n");
    const out = renderMarkdown(entry("index", body), "2026-08-16");
    expect(out).toContain("| Development | Compute | Access |");
    expect(out).toContain("| --- | --- | --- |");
    expect(out).toContain("| Coder Workspace | RTX A2000 12GB | VS Code Web / Desktop |");
    expect(out).not.toContain("quick-facts");
  });

  it("CardGrid と Card を見出しへ変換する", async () => {
    const { renderMarkdown } = await load(DEFAULT_BASE);
    const body = [
      "<CardGrid>",
      '  <Card title="すぐに使える" icon="rocket">',
      "    本文です。",
      "  </Card>",
      "</CardGrid>",
    ].join("\n");
    const out = renderMarkdown(entry("index", body), "2026-08-16");
    expect(out).not.toContain("<CardGrid>");
    expect(out).not.toContain("<Card");
    expect(out).toContain("### すぐに使える\n");
    expect(out).toContain("本文です。");
  });

  it("br / small / div / span / strong タグを除去する", async () => {
    const { renderMarkdown } = await load(DEFAULT_BASE);
    const out = renderMarkdown(entry("coder", "a<br/>b<small>c</small><div>d</div><span>e</span><strong>f</strong>"), "2026-08-16");
    expect(out).toContain("a\nbcdef");
    for (const tag of ["<br", "<small", "<div", "<span", "<strong", "</small", "</div", "</span", "</strong"]) {
      expect(out).not.toContain(tag);
    }
  });

  it("相対リンクを絶対URLへ変換する", async () => {
    const { renderMarkdown } = await load(DEFAULT_BASE);
    const body = "リンク: [申請](getting-started/application/) と [GPU](../guides/gpu/)。";
    const out = renderMarkdown(entry("coder", body), "2026-08-16");
    expect(out).toContain(`[申請](${SITE}${DEFAULT_BASE}/coder/getting-started/application/)`);
    expect(out).toContain(`[GPU](${SITE}${DEFAULT_BASE}/guides/gpu/)`);
  });

  it("外部リンク、アンカー、mailto は変換しない", async () => {
    const { renderMarkdown } = await load(DEFAULT_BASE);
    const body = "外部: [Coder](https://coder.com/docs)、アンカー: [上へ](#top)、メール: [連絡](mailto:lab@example.com)。";
    const out = renderMarkdown(entry("coder", body), "2026-08-16");
    expect(out).toContain("[Coder](https://coder.com/docs)");
    expect(out).toContain("[上へ](#top)");
    expect(out).toContain("[連絡](mailto:lab@example.com)");
  });

  it("タイトル付きリンクの title を保持する", async () => {
    const { renderMarkdown } = await load(DEFAULT_BASE);
    const out = renderMarkdown(entry("coder", '[VS Code](vscode-web/ "VS Code Web")'), "2026-08-16");
    expect(out).toContain(`[VS Code](${SITE}${DEFAULT_BASE}/coder/vscode-web/ "VS Code Web")`);
  });

  it("先頭空白を除去して改行を圧縮する", async () => {
    const { renderMarkdown } = await load(DEFAULT_BASE);
    const body = "  先頭空白行\n\n\n\n\n改行が多い行";
    const out = renderMarkdown(entry("coder", body), "2026-08-16");
    const bodyPart = out.slice(out.indexOf("# テストページ"));
    expect(bodyPart).toContain("先頭空白行\n\n改行が多い行");
    expect(out).not.toMatch(/\n{3,}/);
  });
});

describe("llm-markdown: renderLlms", () => {
  const entries = [
    entry("index", "", { title: "喜多村研究室 システム" }),
    entry("coder", "", { title: "Coder Workspace" }),
    entry("coder/vscode-web", "", { title: "VS Code Web" }),
    entry("systems", "", { title: "研究システム" }),
    entry("systems/status", "", { title: "提供状況" }),
  ];

  it("ルート llms.txt にセクション順でページを列挙する", async () => {
    const { renderLlms } = await load(DEFAULT_BASE);
    const out = renderLlms(entries);
    expect(out).toContain("# 喜多村研究室 Docs");
    expect(out).toContain("## Coder Workspace");
    expect(out).toContain(`- [Coder Workspace](${SITE}${DEFAULT_BASE}/coder.md): テスト用の説明です。`);
    expect(out).toContain(`- [VS Code Web](${SITE}${DEFAULT_BASE}/coder/vscode-web.md): テスト用の説明です。`);
    expect(out).toContain("## 研究システム");
    expect(out).toContain(`- [提供状況](${SITE}${DEFAULT_BASE}/systems/status.md): テスト用の説明です。`);
    const coderPos = out.indexOf("## Coder Workspace");
    const systemsPos = out.indexOf("## 研究システム");
    expect(coderPos).toBeLessThan(systemsPos);
  });

  it("ルート llms.txt に Optional セクションを含める", async () => {
    const { renderLlms } = await load(DEFAULT_BASE);
    const out = renderLlms(entries);
    expect(out).toContain("## Optional");
    expect(out).toContain("- [全ドキュメント](./llms-full.txt): 全ページを連結したLLM向けMarkdownです。");
  });

  it("セクション llms.txt には Optional を含めない", async () => {
    const { renderLlms } = await load(DEFAULT_BASE);
    const out = renderLlms(entries.filter((e) => e.id === "coder" || e.id.startsWith("coder/")), "Coder Workspace | 喜多村研究室 Docs");
    expect(out).toContain("# Coder Workspace | 喜多村研究室 Docs");
    expect(out).not.toContain("## Optional");
    expect(out).toContain(`- [Coder Workspace](${SITE}${DEFAULT_BASE}/coder.md): テスト用の説明です。`);
  });

  it("空のセクションは省略する", async () => {
    const { renderLlms } = await load(DEFAULT_BASE);
    const out = renderLlms(entries.filter((e) => e.id === "coder" || e.id.startsWith("coder/")), "Coder Workspace | 喜多村研究室 Docs");
    expect(out).not.toContain("## 利用を始める");
    expect(out).not.toContain("## 運用と安全");
    expect(out).not.toContain("## 研究システム");
  });
});
