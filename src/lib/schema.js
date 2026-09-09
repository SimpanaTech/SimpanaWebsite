import { CONTACT, ORGANISATION, SITE } from "@/data/site";

/**
 * JSON-LD builders.
 *
 * Structured data is how a search engine learns that this site belongs to a
 * company in Pune with a phone number and opening hours, rather than guessing
 * it from prose. Everything below is built from data already on the site -
 * none of it asserts anything the pages do not.
 *
 * `@id` values are stable URLs so the graph joins up: a product page points
 * its publisher at the same organisation node the home page defines.
 */

const abs = (path = "/") => new URL(path, SITE.url).toString();

const ORG_ID = `${SITE.url}/#organisation`;

/**
 * The company. `ProfessionalService` rather than plain `Organization` - it is
 * a subtype of LocalBusiness, which is what carries the address, hours and
 * phone into local search results.
 */
export function organisationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: ORGANISATION.legalName,
    url: abs("/"),
    logo: abs("/logo.png"),
    image: abs(SITE.ogImage),
    description: SITE.description,
    slogan: SITE.tagline,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Wanowarie",
      addressLocality: ORGANISATION.locality,
      addressRegion: ORGANISATION.region,
      addressCountry: ORGANISATION.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ORGANISATION.days,
        opens: ORGANISATION.opens,
        closes: ORGANISATION.closes,
      },
    ],
    areaServed: { "@type": "Country", name: "India" },
    ...(ORGANISATION.sameAs.length ? { sameAs: ORGANISATION.sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: abs("/"),
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };
}

/**
 * A product page. These are business systems, so `SoftwareApplication` with a
 * BusinessApplication category - not `Product`, which would invite search
 * engines to look for a price and a stock status that do not exist.
 */
export function productSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${product.name} (${product.code})`,
    alternateName: product.abbr,
    url: abs(`/products/${product.slug}/`),
    description: product.short,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    image: abs(product.ogImage),
    featureList: product.features,
    publisher: { "@id": ORG_ID },
    provider: { "@id": ORG_ID },
  };
}

export function postSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: abs(`/blog/${post.slug}/`),
    datePublished: post.date,
    dateModified: post.date,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
    mainEntityOfPage: abs(`/blog/${post.slug}/`),
  };
}

/**
 * Breadcrumbs, from the same crumb list the visible trail renders. `item` is
 * omitted on the final crumb, which is the current page.
 */
export function breadcrumbSchema(crumbs = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { label: "Home", href: "/" },
      ...crumbs,
    ].map((crumb, index, all) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(index < all.length - 1 && crumb.href
        ? { item: abs(crumb.href.endsWith("/") ? crumb.href : `${crumb.href}/`) }
        : {}),
    })),
  };
}
