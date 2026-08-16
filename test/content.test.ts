import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { sections } from "../src/lib/llm-markdown";
import { docsRoot, frontmatter, listDocIds, markdownLinks, sidebarSlugs } from "./helpers";

function isExternal(href: string) {
  return /^(https?:|mailto:|#)/.test(href);
}

function resolveDocPath(id: string): string {
  const candidates = [
    join(docsRoot, `${id}.md`),
    join(docsRoot, `${id}.mdx`),
    join(docsRoot, id, "index.md"),
    join(docsRoot, id, "index.mdx"),
  ];
  for (const candidate of candidates) {
    try {
      readFileSync(candidate);
      return candidate;
    } catch {
      // try next candidate
    }
  }
  throw new Error(`content not found for id: ${id}`);
}

function stripFrontmatter(raw: string): { frontmatter: string; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (m === null) return { frontmatter: "", body: raw };
  return { frontmatter: m[1], body: raw.slice(m[0].length) };
}

const idSet = new Set(listDocIds());

function resolveDocHref(docId: string, href: string): string | null {
  const clean = href.endsWith("/") ? href.slice(0, -1) : href;
  if (clean === "") return "index";
  const segments = docId === "index" ? [] : docId.split("/");
  let escaped = false;
  for (const part of clean.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") {
      if (segments.length === 0) escaped = true;
      else segments.pop();
    } else segments.push(part);
  }
  if (escaped) return null;
  const target = segments.join("/");
  return idSet.has(target) ? target : null;
}

function resolveAssetLink(baseDir: string, href: string): string | null {
  const clean = href.endsWith("/") ? href.slice(0, -1) : href;
  const target = join(baseDir, clean);
  try {
    readFileSync(target);
    return target;
  } catch {
    return null;
  }
}

function headingsWithAnchors(raw: string): Set<string> {
  const anchors = new Set<string>();
  for (const line of raw.split("\n")) {
    const m = line.match(/^#{1,6} (.+)$/);
    if (m === null) continue;
    const text = m[1].replace(/<[^>]+>/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
    const slug = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "-");
    anchors.add(slug);
  }
  return anchors;
}

describe("content: 構成", () => {
  it("docs に十分な数のコンテンツファイルが存在する", () => {
    expect(listDocIds().length).toBeGreaterThanOrEqual(20);
  });

  it("サイドバーの全スラッシュがコンテンツファイルに解決する", () => {
    const slugs = sidebarSlugs();
    expect(slugs.length).toBeGreaterThanOrEqual(20);
    const missing = slugs.filter((slug) => {
      try {
        resolveDocPath(slug);
        return false;
      } catch {
        return true;
      }
    });
    expect(missing).toEqual([]);
  });

  it("全コンテンツファイルがサイドバーに登録されている", () => {
    const slugs = new Set(sidebarSlugs());
    const unregistered = listDocIds().filter((id) => !slugs.has(id));
    expect(unregistered).toEqual([]);
  });

  it("llm-markdown の sections が docs のディレクトリと一致する", () => {
    const dirNames = readdirSync(docsRoot, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort();
    expect(sections.map(([, prefix]) => prefix.slice(0, -1)).sort()).toEqual(dirNames);
  });

  it("各セクションにサイドバー登録ページが少なくとも1つある", () => {
    const slugs = sidebarSlugs();
    const missing = sections
      .filter(([, prefix]) => !slugs.some((slug) => slug === prefix.slice(0, -1) || slug.startsWith(prefix)))
      .map(([label]) => label);
    expect(missing).toEqual([]);
  });
});

describe("content: frontmatter", () => {
  it("全ページに title と description がある", () => {
    const missing: string[] = [];
    for (const id of listDocIds()) {
      const { title, description } = frontmatter(id);
      if (title.length === 0 || description.length === 0) missing.push(id);
    }
    expect(missing).toEqual([]);
  });

  it("title が重複していない", () => {
    const seen = new Map<string, string>();
    const duplicates: string[] = [];
    for (const id of listDocIds()) {
      const { title } = frontmatter(id);
      if (title.length === 0) continue;
      if (seen.has(title)) duplicates.push(`${title} (${seen.get(title)} / ${id})`);
      else seen.set(title, id);
    }
    expect(duplicates).toEqual([]);
  });
});

describe("content: リンク解決", () => {
  it("本文の相対リンクがすべて解決する", () => {
    const broken: string[] = [];
    for (const id of listDocIds()) {
      const path = resolveDocPath(id);
      const { body } = stripFrontmatter(readFileSync(path, "utf8"));
      const baseDir = path.slice(0, path.lastIndexOf("/"));
      const selfAnchors = headingsWithAnchors(body);
      for (const link of markdownLinks(body)) {
        if (isExternal(link.href)) continue;
        const hash = link.href.indexOf("#");
        const anchor = hash === -1 ? "" : link.href.slice(hash + 1);
        const hrefPath = hash === -1 ? link.href : link.href.slice(0, hash);
        if (hrefPath === "" || hrefPath === "#") continue;
        if (/\.[a-zA-Z0-9]{1,5}$/.test(hrefPath)) {
          if (resolveAssetLink(baseDir, hrefPath) === null) {
            broken.push(`${id}:${link.line} [${link.text}](${link.href})`);
          }
          continue;
        }
        const targetId = resolveDocHref(id, hrefPath);
        if (targetId === null) {
          broken.push(`${id}:${link.line} [${link.text}](${link.href})`);
          continue;
        }
        if (anchor.length > 0) {
          const targetBody = stripFrontmatter(readFileSync(resolveDocPath(targetId), "utf8")).body;
          const anchors = targetId === id ? selfAnchors : headingsWithAnchors(targetBody);
          if (!anchors.has(anchor)) broken.push(`${id}:${link.line} [${link.text}](${link.href}) (anchor not found)`);
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it("frontmatter の link がすべて解決する", () => {
    const broken: string[] = [];
    for (const id of listDocIds()) {
      const { frontmatter: fm } = stripFrontmatter(readFileSync(resolveDocPath(id), "utf8"));
      for (const m of fm.matchAll(/(?:link|href):\s*["']?([^"'\s]+)["']?/g)) {
        const href = m[1];
        if (isExternal(href)) continue;
        if (resolveDocHref(id, href) === null) {
          broken.push(`${id} (frontmatter) (${href})`);
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it("Markdown リンク構文の破損がない", () => {
    const broken: string[] = [];
    for (const id of listDocIds()) {
      const { body } = stripFrontmatter(readFileSync(resolveDocPath(id), "utf8"));
      body.split("\n").forEach((line, i) => {
        const stripped = line.replace(/\]\([^()\n]*\)/g, "");
        if (stripped.includes("](")) broken.push(`${id}:${i + 1}`);
      });
    }
    expect(broken).toEqual([]);
  });

  it("外部リンクがすべて有効な URL", () => {
    const bad: string[] = [];
    for (const id of listDocIds()) {
      const { body } = stripFrontmatter(readFileSync(resolveDocPath(id), "utf8"));
      for (const link of markdownLinks(body)) {
        if (!/^https?:/.test(link.href)) continue;
        try {
          const url = new URL(link.href);
          if (url.hostname.length === 0) bad.push(`${id}:${link.href}`);
        } catch {
          bad.push(`${id}:${link.href}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});

describe("content: llms.txt 出力", () => {
  it("全ページを renderLlms / renderMarkdown で処理できる", async () => {
    const { renderLlms, renderMarkdown } = await import("../src/lib/llm-markdown");
    const entries = listDocIds().map((id) => ({
      id,
      body: stripFrontmatter(readFileSync(resolveDocPath(id), "utf8")).body,
      data: frontmatter(id),
    }));
    const root = renderLlms(entries as never);
    for (const [label] of sections) {
      expect(root, `root llms.txt missing section: ${label}`).toContain(`## ${label}`);
    }
    expect(root).toContain("## Optional");
    for (const [, prefix] of sections) {
      const id = prefix.slice(0, -1);
      const sectionEntries = entries.filter((e) => e.id === id || e.id.startsWith(prefix));
      const out = renderLlms(sectionEntries as never, `${id} | 喜多村研究室 Docs`);
      expect(out.length, `empty section llms.txt: ${id}`).toBeGreaterThan(0);
      expect(out).not.toContain("## Optional");
    }
    for (const e of entries) {
      const md = renderMarkdown(e as never, "2026-08-16");
      const mdUrl = e.id === "index" ? "/index.md" : `/${e.id}.md`;
      expect(md.length, `empty markdown for ${e.id}`).toBeGreaterThan(0);
      expect(md).toContain(mdUrl);
      expect(md).toContain(frontmatter(e.id).title);
    }
  });

  it("変換後の出力にHTMLタグが残っていない", async () => {
    const { renderMarkdown } = await import("../src/lib/llm-markdown");
    const leftovers: string[] = [];
    for (const id of listDocIds()) {
      const raw = readFileSync(resolveDocPath(id), "utf8");
      const body = stripFrontmatter(raw).body;
      const md = renderMarkdown({ id, body, data: frontmatter(id) } as never, "2026-08-16");
      const withoutCode = md.replace(/^```[\s\S]*?^```$/gm, "");
      const html = withoutCode.match(/<[a-zA-Z][^>]*>/g);
      if (html) leftovers.push(`${id}: ${html.join(", ")}`);
    }
    expect(leftovers).toEqual([]);
  });
});
