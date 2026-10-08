import { getCollection, getEntry } from "astro:content";
import { stat } from "node:fs/promises";
import { renderMarkdown } from "../lib/llm-markdown";
import { getRecentUpdates } from "../lib/recent-updates";

export async function GET() {
  const entry = await getEntry("docs", "index");

  if (!entry) {
    return new Response("Not found", { status: 404 });
  }

  const updated = (await stat(entry.filePath!)).mtime.toISOString().slice(0, 10);
  const updates = await getRecentUpdates(await getCollection("docs"));
  return new Response(renderMarkdown(entry, updated, updates), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
