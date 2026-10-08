import { describe, expect, it } from "vitest";
import { sidebar, directoryLinks } from "../src/lib/navigation.mjs";
import { renderMarkdown } from "../src/lib/llm-markdown";
import type { CollectionEntry } from "astro:content";

describe("トップページの自動目次", () => {
  it.each([
    ["利用を始める", 5],
    ["開発ガイド", 5],
  ])("%s の最上位項目をサイドバー順に含める", (section, count) => {
    const links = directoryLinks(section as string);
    expect(links).toHaveLength(count as number);
    expect(new Set(links.map((link) => link.slug)).size).toBe(count);
  });

  it("入れ子は最上部の名前だけを表示し概要へリンクする", () => {
    expect(directoryLinks("利用を始める")).toContainEqual({
      label: "Coder Workspace", slug: "getting-started/coder",
    });
    expect(directoryLinks("開発ガイド")).toContainEqual({
      label: "データベース", slug: "guides/database",
    });
    expect(directoryLinks("開発ガイド").map((link) => link.slug)).not.toContain("guides/database/glossary");
  });

  it("サイドバーに追加した記事も目次へ反映する", () => {
    const section = sidebar.find((item) => item.label === "利用を始める")!;
    section.items!.push({ label: "追加記事", slug: "getting-started/example" });
    try {
      expect(directoryLinks("利用を始める").at(-1)).toEqual({
        label: "追加記事", slug: "getting-started/example",
      });
    } finally {
      section.items!.pop();
    }
  });

  it("Markdown版にも同じ目次リンクを出力する", () => {
    const entry = {
      id: "index",
      body: '<SectionDirectory section="利用を始める" />\n<SectionDirectory section="開発ガイド" />',
      data: { title: "目次", description: "テスト" },
    } as CollectionEntry<"docs">;
    const out = renderMarkdown(entry, "2026-10-08");
    for (const section of ["利用を始める", "開発ガイド"]) {
      for (const link of directoryLinks(section)) {
        expect(out).toContain(`[${link.label}](`);
        expect(out).toContain(`/${link.slug}/)`);
      }
    }
    expect(out).not.toContain("<SectionDirectory");
  });
});
