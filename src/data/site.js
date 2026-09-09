/**
 * Site-wide constants: identity, contact details, navigation.
 * Contact details come from simpanacontent.md (Contact + Global Footer).
 */

import { PRODUCTS } from "@/data/content";

export const SITE = {
  name: "Simpana Technologies",
  shortName: "Simpana",
  tagline: "Simplifying Business",
  /** Services lead, products prove - the same order the home page argues in. */
  description:
    "Pune-based IT company delivering managed IT support, business consulting, and custom software - including seven deployed warehouse, inventory, and point-of-sale systems.",
  headline: "IT Support, Consulting & Solutions in Pune",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://simpanatech.com",
  locale: "en_IN",
  /** 1200x630, the size every social platform crops to. */
  ogImage: "/images/og-default.jpg",
  version: "LIVE SYSTEM / WARM / v6",
};

/**
 * Search terms the site should actually rank for, in the order the business
 * cares about: the services first, the products second, the geography woven
 * through both.
 */
export const KEYWORDS = [
  "IT support Pune",
  "managed IT services Pune",
  "IT consulting Pune",
  "IT company in Pune",
  "custom software development Pune",
  "warehouse management system",
  "inventory management system",
  "point of sale software",
  "supply chain software India",
  "3PL software",
  "SAP consulting",
];

/**
 * Facts about the company used to build the Organization structured data.
 * Everything here is taken from the live site - nothing is inferred.
 *
 * TODO: `sameAs` stays empty until there are social profiles to point at, and
 * the postal address has no street line or PIN code. Both matter for local
 * search: a Google Business Profile URL in `sameAs` and a full address are the
 * two highest-value additions to this file.
 */
export const ORGANISATION = {
  legalName: "Simpana Technologies",
  locality: "Pune",
  region: "Maharashtra",
  country: "IN",
  /** Mon-Sat, from CONTACT.hours. */
  opens: "10:00",
  closes: "19:00",
  days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  sameAs: [],
};

export const CONTACT = {
  email: "contact@simpanatech.com",
  phone: "+91-7004681014",
  phoneHref: "tel:+917004681014",
  office: "Wanowarie, Pune, India",
  hours: "Mon-Sat, 10:00-19:00 IST",
};

/**
 * Primary navigation - rendered in the header and the mobile drawer.
 *
 * An item with `children` renders as a dropdown. Products builds its children
 * from the catalogue itself, so adding a product to PRODUCTS puts it in the
 * menu with no second edit. One-way import: content.js holds no site data.
 */
export const NAV = [
  {
    href: "/products",
    label: "Products",
    children: PRODUCTS.map((product) => ({
      href: `/products/${product.slug}`,
      label: product.name,
      code: product.code,
    })),
  },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
];

/** Footer link columns. */
export const FOOTER_NAV = [
  {
    title: "PRODUCTS",
    links: [
      { href: "/products/warehouse-management", label: "Warehouse Management" },
      { href: "/products/inventory-management", label: "Inventory Management" },
      { href: "/products/point-of-sale", label: "Point of Sale" },
      { href: "/products/chemical-warehouse", label: "Chemical Warehouse" },
      { href: "/products", label: "All products" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { href: "/about", label: "About us" },
      { href: "/services", label: "Services" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "CONTACT",
    links: [
      { href: `mailto:${CONTACT.email}`, label: CONTACT.email },
      { href: CONTACT.phoneHref, label: CONTACT.phone },
      { href: "/contact", label: CONTACT.office },
    ],
  },
];

export const INDUSTRIES = [
  "Third-party logistics",
  "Distribution",
  "Manufacturing",
  "Fulfilment",
  "Retail",
  "Education",
];

/** The six stages an order passes through, shown in the home page hero. */
export const OPS_STAGES = [
  { code: "IN", label: "Goods in" },
  { code: "QC", label: "Quality check" },
  { code: "ST", label: "Storage" },
  { code: "PK", label: "Picking" },
  { code: "PA", label: "Packing" },
  { code: "DP", label: "Dispatch" },
];
