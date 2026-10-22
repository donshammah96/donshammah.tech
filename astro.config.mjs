import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeMermaid from "rehype-mermaid";
import remarkGfm from "remark-gfm";

export default defineConfig({
  site: "https://donshammah.tech",
  output: "static",
  trailingSlash: "never",
  build: {
    format: "directory",
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/og/"),
    }),
  ],
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid"],
    },
    shikiConfig: {
      themes: {
        light: "github-light-default",
        dark: "github-dark-default",
      },
    },
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [
        rehypeMermaid,
        {
          strategy: "inline-svg",
          dark: true,
          mermaidConfig: {
            theme: "base",
            themeVariables: {
              fontFamily: "DM Mono, ui-monospace, monospace",
              fontSize: "12px",
              primaryColor: "#18181c",
              primaryTextColor: "#f4f4f6",
              primaryBorderColor: "#60a5fa",
              lineColor: "#71717a",
              secondaryColor: "#101013",
              tertiaryColor: "#09090b",
            },
          },
        },
      ],
    ],
  },
});
