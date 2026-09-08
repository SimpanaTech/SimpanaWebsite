import Link from "next/link";
import { notFound } from "next/navigation";
import CTABand from "@/components/sections/CTABand";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CheckList from "@/components/ui/CheckList";
import HeroProductCard from "@/components/ui/HeroProductCard";
import Icon from "@/components/ui/Icon";
import PageHero from "@/components/ui/PageHero";
import ProductVisual, {
  getProductScenes,
  getSceneLabel,
} from "@/components/ui/ProductVisual";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { PRODUCTS, getProduct } from "@/data/content";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} (${product.code})`,
    description: product.short,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} (${product.code}) — Simpana Technologies`,
      description: product.short,
      url: `/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const index = PRODUCTS.findIndex((p) => p.slug === product.slug);
  const prev = PRODUCTS[(index - 1 + PRODUCTS.length) % PRODUCTS.length];
  const next = PRODUCTS[(index + 1) % PRODUCTS.length];

  return (
    <>
      <PageHero
        backdrop={product.icon}
        visual={<HeroProductCard product={product} />}
        crumbs={[
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
        title={product.name}
        intro={product.short}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="onDark">
            {product.code} · {product.ref}
          </Badge>
          {product.chips.map((chip) => (
            <Badge key={chip} variant="onDark">
              {chip}
            </Badge>
          ))}
        </div>
      </PageHero>

      <Section space="lg">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div>
            <p className="eyebrow mb-3">Overview</p>
            <p className="text-[17px] leading-relaxed text-ink-600">
              {product.summary}
            </p>

            <h2 className="mt-10 text-2xl">Introduction</h2>
            <CheckList items={product.intro} className="mt-5" />
          </div>

          <div className="space-y-6">
            <Card className="p-7">
              <p className="eyebrow mb-4">Status</p>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-leaf-500" />
                <span className="text-sm font-medium text-ink-700">
                  {product.status}
                </span>
              </div>

              <p className="eyebrow mt-7 mb-4">Built for</p>
              <ul className="space-y-2">
                {product.builtFor.map((item) => (
                  <li key={item} className="text-[15px] text-ink-600">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-7">
              <span
                className="mb-5 inline-flex h-11 w-11 items-center justify-center
                           rounded-xl bg-brand-50 text-brand-600"
              >
                <Icon name={product.icon} />
              </span>
              <h3 className="text-lg">Resources</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-600">
                The product brochure covers screens, roles, and the full feature
                matrix.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={product.brochure} size="sm">
                  Brochure (PDF)
                </Button>
                <Button href="/contact" variant="secondary" size="sm">
                  Request a demo
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <Section space="sm" bordered>
        <SectionHeading
          eyebrow="Product tour"
          title={`See ${product.abbr} in your operation.`}
          intro="Representative screens - a look at the shape of the product, not the finished skin. Every deployment is themed to the client."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {getProductScenes(product).map((scene) => (
            <Card key={scene} className="overflow-hidden p-0">
              <ProductVisual product={product} variant={scene} className="h-56" />
              <div className="border-t border-line px-5 py-4">
                <p className="text-sm font-semibold text-ink-800">
                  {getSceneLabel(scene)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tint" space="lg" bordered>
        <SectionHeading
          eyebrow="Features"
          title={`What ${product.abbr} does.`}
          intro="The capabilities that ship with the standard product. Anything beyond this we scope as a build."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {product.features.map((feature) => (
            <Card key={feature} className="flex-row gap-4 p-6">
              <span
                className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center
                           rounded-full bg-leaf-50 text-leaf-700"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10.5l4 4 8-9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="text-[15px] leading-relaxed text-ink-600">
                {feature}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section space="sm">
        <nav
          aria-label="More products"
          className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8"
        >
          <Link
            href={`/products/${prev.slug}`}
            className="text-sm font-medium text-ink-600 hover:text-brand-700"
          >
            ← {prev.name}
          </Link>
          <Link
            href="/products"
            className="text-sm font-semibold text-brand-600 hover:text-brand-800"
          >
            All products
          </Link>
          <Link
            href={`/products/${next.slug}`}
            className="text-sm font-medium text-ink-600 hover:text-brand-700"
          >
            {next.name} →
          </Link>
        </nav>
      </Section>

      <CTABand
        title={`Run ${product.abbr} on your floor.`}
        copy={`Tell us how your operation works today and we will show you ${product.name} against it — not a generic demo.`}
      />
    </>
  );
}
