import type { NextConfig } from "next";

// The install commands need an absolute origin at build time. Hardcoded rather
// than read from VERCEL_PROJECT_PRODUCTION_URL, which resolves to the
// *.vercel.app host unless the custom domain is the assigned production one.
const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://www.shoots-ai.com";

const nextConfig: NextConfig = {
  // Pin the workspace root: a sibling package-lock.json in the repo root would
  // otherwise make Next infer the wrong root and widen filesystem watching.
  turbopack: { root: __dirname },
  env: { NEXT_PUBLIC_SITE_ORIGIN: siteOrigin }
};

export default nextConfig;
