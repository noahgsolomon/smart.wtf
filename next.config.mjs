/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
/** @type {import("next").NextConfig} */

import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import slug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [slug, rehypeAutolinkHeadings, rehypeHighlight],
  },
});

const nextConfig = withMDX({
  experimental: {
    webpackBuildWorker: true,
    mdxRs: true,
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    domains: ["img.icons8.con", "img.clerk.com", "images.codefoli.com"],
  },
});

export default nextConfig;
