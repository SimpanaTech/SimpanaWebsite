/**
 * Site-wide constants: identity, contact details, navigation.
 * Contact details come from simpanacontent.md (Contact + Global Footer).
 */

import { PRODUCTS } from "@/data/content";

export const SITE = {
  name: "Simpana Technologies",
  shortName: "Simpana",
  tagline: "Simplifying Business",
  description:
    "Simpana builds and operates real-time warehouse, inventory, and logistics software for 3PLs, distributors, and manufacturers - one connected system.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://simpanatech.com",
  locale: "en_IN",
  version: "LIVE SYSTEM / WARM / v6",
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
