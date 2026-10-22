import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    role: z.string(),
    timeline: z.string(),
    status: z.string(),
    liveUrl: z.string().url(),
    notionMirrorUrl: z.string().url().optional(),
    readingTime: z.string(),
    stack: z.array(z.string()),
    updatedDate: z.coerce.date(),
  }),
});

const decisions = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/decisions" }),
  schema: z.object({
    adrId: z.string(),
    title: z.string(),
    description: z.string(),
    status: z
      .enum(["Ratified", "Superseded", "Deprecated"])
      .default("Ratified"),
    scope: z.enum(["apps/client", "apps/admin", "monorepo", "apps/workers"]),
    date: z.coerce.date(),
    tradeoff: z.string(),
    enforcedBy: z.string(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    readingTime: z.string(),
    tags: z.array(z.string()),
    relatedAdr: z.string().optional(),
    notionMirrorUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, decisions, writing };
