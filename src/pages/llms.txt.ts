import { getCollection } from "astro:content";

const sections = [
  ["利用を始める", "getting-started/"],
  ["Coder Workspace", "coder/"],
  ["開発ガイド", "guides/"],
  ["運用と安全", "operations/"],
  ["研究システム", "systems/"],
] as const;

export async function GET() {
  const entries = await getCollection("docs");
  const lines = [
    "# 喜多村研究室 Docs",
    "",
    "> 喜多村研究室が提供する開発環境、GPU、AI研究基盤の利用ドキュメントです。接続先や認証情報などの非公開情報は掲載していません。",
    "",
    "各リンクは、対応するページのMarkdown版です。提供状況が準備中・検討中の機能は、利用可能な機能として扱わないでください。",
  ];

  for (const [label, prefix] of sections) {
    const sectionRoot = prefix.slice(0, -1);
    const sectionEntries = entries.filter(
      (entry) => entry.id === sectionRoot || entry.id.startsWith(prefix),
    );
    if (sectionEntries.length === 0) continue;

    lines.push("", `## ${label}`, "");
    for (const entry of sectionEntries) {
      lines.push(`- [${entry.data.title}](./${entry.id}.md): ${entry.data.description}`);
    }
  }

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
