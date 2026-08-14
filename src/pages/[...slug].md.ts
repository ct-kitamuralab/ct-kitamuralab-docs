import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const entries = await getCollection("docs");

  return entries
    .filter((entry) => entry.id !== "index")
    .map((entry) => ({
      params: { slug: entry.id },
      props: { body: entry.body },
    }));
}

export function GET({ props }: { props: { body: string } }) {
  return new Response(props.body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
