import { getCollection } from "astro:content";
import { stat } from "node:fs/promises";
import { renderMarkdown } from "../lib/llm-markdown";

export async function GET() {
  const entries = await getCollection("docs");
  const content = await Promise.all(
    entries.map(async (entry) => {
      const updated = (await stat(entry.filePath!)).mtime.toISOString().slice(0, 10);
      return renderMarkdown(entry, updated);
    }),
  );

  return new Response(content.join("\n---\n\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
