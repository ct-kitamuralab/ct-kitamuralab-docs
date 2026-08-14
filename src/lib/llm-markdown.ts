import type { CollectionEntry } from "astro:content";

const site = "https://ct-kitamuralab.github.io";
const base = process.env.BASE_PATH ?? "/ct-kitamuralab-docs";

export const sections = [
  ["利用を始める", "getting-started/"],
  ["Coder Workspace", "coder/"],
  ["開発ガイド", "guides/"],
  ["運用と安全", "operations/"],
  ["研究システム", "systems/"],
] as const;

type DocEntry = CollectionEntry<"docs">;

function pagePath(id: string) {
  return id === "index" ? "/" : `/${id}/`;
}

export function pageUrl(id: string) {
  return new URL(`${base.replace(/\/$/, "")}${pagePath(id)}`, site).href;
}

export function markdownUrl(id: string) {
  return new URL(`${base.replace(/\/$/, "")}${id === "index" ? "/index.md" : `/${id}.md`}`, site).href;
}

export function sectionFor(id: string) {
  return sections.find(([, prefix]) => id === prefix.slice(0, -1) || id.startsWith(prefix));
}

export function sectionLlmsUrl(id: string) {
  const section = sectionFor(id);
  return new URL(
    `${base.replace(/\/$/, "")}/${section ? `${section[1]}llms.txt` : "llms.txt"}`,
    site,
  ).href;
}

function absoluteLinks(body: string, id: string) {
  const currentUrl = pageUrl(id);
  return body.replace(/\]\(([^\s)]+)(\s+"[^"]*")?\)/g, (match, href, title = "") => {
    if (/^(#|https?:|mailto:)/.test(href)) return match;
    return `](${new URL(href, currentUrl).href}${title})`;
  });
}

function statusTable(items: string) {
  const rows = [...items.matchAll(/\{ name: "([^"]+)", status: "[^"]+", label: "([^"]+)", description: "([^"]+)" \}/g)];
  if (rows.length === 0) return "";
  return [
    "| システム | 提供状況 | 説明 |",
    "| --- | --- | --- |",
    ...rows.map(([, name, label, description]) => `| ${name} | ${label} | ${description} |`),
  ].join("\n");
}

function markdownBody(entry: DocEntry) {
  let body = entry.body
    .replace(/^import .*$/gm, "")
    .replace(/<SystemStatus items=\{\[([\s\S]*?)\]\} \/>/g, (_, items) => statusTable(items))
    .replace(
      /<div class="quick-facts">\s*<div><span>([^<]+)<\/span><strong>([^<]+)<\/strong><\/div>\s*<div><span>([^<]+)<\/span><strong>([^<]+)<\/strong><\/div>\s*<div><span>([^<]+)<\/span><strong>([^<]+)<\/strong><\/div>\s*<\/div>/g,
      "| $1 | $3 | $5 |\n| --- | --- | --- |\n| $2 | $4 | $6 |",
    )
    .replace(/<CardGrid>/g, "")
    .replace(/<\/CardGrid>/g, "")
    .replace(/<Card title="([^"]+)"[^>]*>/g, "### $1\n")
    .replace(/<\/Card>/g, "")
    .replace(/<br\s*\/>/g, "\n")
    .replace(/<\/?small>/g, "")
    .replace(/<\/?div[^>]*>/g, "")
    .replace(/<\/?span>/g, "")
    .replace(/<\/?strong>/g, "");

  return absoluteLinks(body.replace(/^ {2,}/gm, "").replace(/\n{3,}/g, "\n\n").trim(), entry.id);
}

export function renderMarkdown(entry: DocEntry, updated: string) {
  const indexUrl = sectionLlmsUrl(entry.id);
  return [
    "---",
    `description: ${entry.data.description}`,
    `title: ${entry.data.title}`,
    "---",
    "",
    "[Skip to content](#main-content)",
    "",
    "> Documentation Index  ",
    `> Fetch the documentation index at: ${indexUrl}  `,
    "> Use this file to discover related pages before exploring further.",
    "",
    `# ${entry.data.title}`,
    "",
    `Last updated ${updated} | Copy as Markdown | [View as Markdown](${markdownUrl(entry.id)})`,
    "",
    markdownBody(entry),
    "",
  ].join("\n");
}

export function renderLlms(entries: DocEntry[], title = "喜多村研究室 Docs") {
  const lines = [
    `# ${title}`,
    "",
    "> 喜多村研究室が提供する開発環境、GPU、AI研究基盤の利用ドキュメントです。接続先や認証情報などの非公開情報は掲載していません。",
    "",
    "各リンクはLLM向けMarkdown版です。準備中・検討中の機能は、利用可能な機能として扱わないでください。",
  ];

  for (const [label, prefix] of sections) {
    const sectionRoot = prefix.slice(0, -1);
    const sectionEntries = entries.filter((entry) => entry.id === sectionRoot || entry.id.startsWith(prefix));
    if (sectionEntries.length === 0) continue;
    lines.push("", `## ${label}`, "");
    for (const entry of sectionEntries) {
      lines.push(`- [${entry.data.title}](${markdownUrl(entry.id)}): ${entry.data.description}`);
    }
  }

  if (title === "喜多村研究室 Docs") {
    lines.push("", "## Optional", "", `- [全ドキュメント](./llms-full.txt): 全ページを連結したLLM向けMarkdownです。`);
  }

  return `${lines.join("\n")}\n`;
}
