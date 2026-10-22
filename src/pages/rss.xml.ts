import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const writing = await getCollection("writing", ({ data }) => !data.draft);
  const decisions = await getCollection("decisions");

  return rss({
    title: "Don Shammah — Systems Engineering & ADRs",
    description:
      "Essays and Architecture Decision Records on distributed systems, event-driven backends, and Build Market.",
    site: context.site!,
    items: [
      ...writing.map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/writing/${post.id}`,
      })),
      ...decisions.map((adr) => ({
        title: `${adr.data.adrId}: ${adr.data.title}`,
        pubDate: adr.data.date,
        description: adr.data.description,
        link: `/decisions/${adr.id}`,
      })),
    ],
  });
}
