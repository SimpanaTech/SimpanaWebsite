import ProductVisual, { getProductScenes } from "@/components/ui/ProductVisual";

/**
 * The foreground image in a product detail hero: a floating "screen" card
 * over the navy band, plus two small chips pulled straight from the
 * product's own data (status, first chip) - nothing invented.
 */
export default function HeroProductCard({ product }) {
  const scene = getProductScenes(product)[0];
  const status = product.status.split("/")[0].trim();
  const chip = product.chips?.[0];

  return (
    <div className="hero-visual-float relative w-[320px]">
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br
                   from-brand-400/30 via-leaf-400/10 to-transparent blur-2xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl">
        <ProductVisual product={product} variant={scene} className="h-64" />
      </div>

      <span
        className="absolute -bottom-4 -left-4 inline-flex items-center gap-2
                   rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-lg"
      >
        <span className="h-2 w-2 rounded-full bg-leaf-500" />
        <span className="text-xs font-semibold tracking-wide text-ink-800">
          {status}
        </span>
      </span>

      {chip ? (
        <span
          className="absolute -top-3 -right-3 rounded-full border border-line
                     bg-white px-3 py-1.5 text-xs font-medium text-brand-700 shadow-lg"
        >
          {chip}
        </span>
      ) : null}
    </div>
  );
}
