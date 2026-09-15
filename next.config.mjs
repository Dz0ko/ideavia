/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a production build live next to the dev server's .next folder
  // (NEXT_DIST_DIR=.next-prod npm run build && npm start).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  // Strict mode double-mounts every WebGL canvas in development, which
  // makes the dev server feel much slower than production. Off on purpose.
  reactStrictMode: false,
  transpilePackages: ["three"],
  experimental: {
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
};

export default nextConfig;
