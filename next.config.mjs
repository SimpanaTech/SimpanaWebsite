/**
 * Static site. `next build` emits plain HTML/CSS/JS into `out/`, which can be
 * served by any web server or CDN — there is no Node runtime in production.
 *
 * Consequences to remember when editing:
 *   - no route handlers, middleware, rewrites, redirects, or ISR
 *   - every dynamic route needs `generateStaticParams()`
 *   - `next/image` optimisation is off; images are served as authored
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactCompiler: true,

  // Emit `about/index.html` rather than `about.html`, so static hosts that do
  // not rewrite extensionless URLs still resolve every route.
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
