import { SITE } from "@/data/site";

// Metadata routes are Route Handlers; static export needs them pinned
// to build time rather than left dynamic.
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
