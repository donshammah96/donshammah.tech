import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const workEntries = await getCollection("work");
const decisionEntries = await getCollection("decisions");
const writingEntries = await getCollection("writing");

const pages: Record<string, { title: string; description: string }> = {
  index: {
    title: "Don Shammah — Backend & Systems Engineer",
    description:
      "Distributed, event-driven infrastructure that stays correct under failure. Creator of Build Market.",
  },
  ...Object.fromEntries(
    workEntries.map((entry) => [
      `work/${entry.id}`,
      { title: entry.data.title, description: entry.data.subtitle },
    ]),
  ),
  ...Object.fromEntries(
    decisionEntries.map((entry) => [
      `decisions/${entry.id}`,
      {
        title: `${entry.data.adrId}: ${entry.data.title}`,
        description: entry.data.description,
      },
    ]),
  ),
  ...Object.fromEntries(
    writingEntries.map((entry) => [
      `writing/${entry.id}`,
      { title: entry.data.title, description: entry.data.description },
    ]),
  ),
};

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [
      [9, 9, 11],
      [16, 16, 19],
    ],
    border: { color: [96, 165, 250], width: 8, side: "inline-start" },
    padding: 64,
    font: {
      title: {
        color: [244, 244, 246],
        size: 52,
        weight: "Normal",
      },
      description: {
        color: [161, 161, 170],
        size: 26,
      },
    },
  }),
});
