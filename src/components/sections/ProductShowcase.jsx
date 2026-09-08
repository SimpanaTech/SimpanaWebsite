import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * The product detail page's photo section: one real image of the operation the
 * product runs in, paired with the four points that matter most about it.
 *
 * Images live in `public/images/products/` as 1600x900 WebP and are Simpana's
 * own assets, reused from the product pages on simpanatech.com. The `sizes`
 * hint is what stops a phone downloading the full-width file - `next/image`
 * runs unoptimised here (static export), so the browser picks by CSS width.
 */
export default function ProductShowcase({ product }) {
  const points = product.keyPoints ?? [];
  if (!product.image) return null;

  return (
    <Section space="lg" bordered>
      <SectionHeading
        eyebrow="Key points"
        title={`What ${product.abbr} changes.`}
        intro={`The four things operations notice first once ${product.abbr} is running. The full feature list is below.`}
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <figure className="relative overflow-hidden rounded-2xl border border-line shadow-[var(--shadow-card)]">
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={1600}
            height={900}
            sizes="(min-width: 1024px) 620px, 100vw"
            className="h-full w-full object-cover"
          />
          <figcaption
            className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg
                       bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-leaf-500" />
            <span className="text-xs font-semibold tracking-wide text-ink-800">
              {product.code} · {product.ref}
            </span>
          </figcaption>
        </figure>

        <ul className="space-y-7">
          {points.map((point, i) => (
            <li key={point.title} className="flex gap-4">
              <span
                className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center
                           rounded-lg bg-brand-50 font-display text-sm font-bold text-brand-600"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg">{point.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">
                  {point.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
