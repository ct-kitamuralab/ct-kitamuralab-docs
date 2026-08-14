import { getEntry } from "astro:content";

export async function GET() {
  const entry = await getEntry("docs", "index");

  if (!entry) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(entry.body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
