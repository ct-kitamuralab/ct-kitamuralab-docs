import { getCollection } from "astro:content";
import { renderLlms, sections } from "../../lib/llm-markdown";

export async function getStaticPaths() {
  const entries = await getCollection("docs");
  return sections.map(([label, prefix]) => ({
    params: { section: prefix.slice(0, -1) },
    props: {
      content: renderLlms(
        entries.filter((entry) => entry.id === prefix.slice(0, -1) || entry.id.startsWith(prefix)),
        `${label} | 喜多村研究室 Docs`,
      ),
    },
  }));
}

export function GET({ props }: { props: { content: string } }) {
  return new Response(props.content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
