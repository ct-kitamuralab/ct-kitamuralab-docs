import { getCollection } from "astro:content";
import { renderLlms } from "../lib/llm-markdown";

export async function GET() {
  const entries = await getCollection("docs");
  return new Response(renderLlms(entries), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
