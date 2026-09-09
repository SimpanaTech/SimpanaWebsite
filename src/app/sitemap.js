import { CASES, POSTS, PRODUCTS } from "@/data/content";
import { SITE } from "@/data/site";

// Metadata routes are Route Handlers; static export needs them pinned
// to build time rather than left dynamic.
export const dynamic = "force-static";

/** trailingSlash is on, so every URL here needs to match the canonical. */
const withSlash = (path) => (path.endsWith("/") ? path : `${path}/`);

const STATIC_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/products", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/careers", priority: 0.6, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
];

export default function sitemap() {
  const now = new Date();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${SITE.url}${withSlash(route.path)}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...PRODUCTS.map((product) => ({
      url: `${SITE.url}/products/${product.slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...CASES.map((study) => ({
      url: `${SITE.url}/case-studies/${study.slug}/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    })),
    ...POSTS.map((post) => ({
      url: `${SITE.url}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly",
      priority: 0.5,
    })),
  ];
}
