/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
/** @type {import("next").NextConfig} */

import nextMDX from "@next/mdx";

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig = {
  experimental: {
    ppr: true,
    mdxRs: true,
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    domains: ["img.icons8.con", "img.clerk.com", "images.codefoli.com"],
  },
};

export default withMDX(nextConfig);
