/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
/** @type {import("next").NextConfig} */
const withPWA = require("next-pwa")({ dest: "public" });

const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    domains: [
      "img.icons8.con",
      "img.clerk.com",
      "images.codefoli.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "images.smart.wtf",
    ],
  },
};

module.exports = withPWA(nextConfig);
