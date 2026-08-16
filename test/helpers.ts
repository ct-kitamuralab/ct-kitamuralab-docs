import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const root = fileURLToPath(new URL("..", import.meta.url));
export const docsRoot = join(root, "src/content/docs");

export function listDocIds(dir = docsRoot): string[] {
  const ids: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = join(dir, entry.name);
    if (entry.isDirectory()) {
      ids.push(...listDocIds(rel));
    } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
      const relFile = rel.slice(docsRoot.length + 1);
      const id = relFile.replace(/\.(md|mdx)$/, "").replace(/\/index$/, "");
      ids.push(id);
    }
  }
  return ids;
}

export function docBodyPath(id: string): string | null {
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
  return null;
}

export function readDoc(id: string): string {
  const path = docBodyPath(id);
  if (path === null) throw new Error(`content not found for id: ${id}`);
  return readFileSync(path, "utf8");
}

export function frontmatter(id: string): { title: string; description: string } {
  const raw = readDoc(id);
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (match === null) return { title: "", description: "" };
  const title = match[1].match(/^title: (.+)$/m)?.[1]?.trim() ?? "";
  const description = match[1].match(/^description: (.+)$/m)?.[1]?.trim() ?? "";
  return { title, description };
}

export function sidebarSlugs(configPath = join(root, "astro.config.mjs")): string[] {
  const raw = readFileSync(configPath, "utf8");
  return [...raw.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
}

export type LinkRef = { line: number; text: string; href: string };

export function markdownLinks(raw: string): LinkRef[] {
  const links: LinkRef[] = [];
  raw.split("\n").forEach((line, i) => {
    for (const m of line.matchAll(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      links.push({ line: i + 1, text: m[1], href: m[2] });
    }
  });
  return links;
}

const FRONTMATTER_LINK = /(?:link|href):\s*["']?([^"'\s]+)["']?/g;

export function frontmatterLinks(raw: string): LinkRef[] {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (match === null) return [];
  const links: LinkRef[] = [];
  for (const m of match[1].matchAll(FRONTMATTER_LINK)) {
    links.push({ line: 0, text: "", href: m[1] });
  }
  return links;
}
