import ProductVisual, { getProductScenes } from "@/components/ui/ProductVisual";
import { PRODUCTS } from "@/data/content";

/**
 * The foreground image on the products index hero: three of the catalogue's
 * own product screens, fanned like a hand of cards. Picks the first three
 * entries from PRODUCTS so it stays in sync with the catalogue automatically.
 */
const SLOTS = [
  { pos: "left-0 top-9 -rotate-6", z: "z-0" },
  { pos: "left-1/2 top-0 -translate-x-1/2 rotate-0", z: "z-20" },
  { pos: "right-0 top-9 rotate-6", z: "z-0" },
];

export default function HeroProductStack() {
  const picks = PRODUCTS.slice(0, 3);

  return (
    <div className="hero-visual-float relative h-72 w-[400px]">
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br
                   from-brand-400/30 via-leaf-400/10 to-transparent blur-2xl"
      />

      {picks.map((product, i) => (
        <div
          key={product.slug}
          className={`absolute w-48 overflow-hidden rounded-2xl border
                      border-white/15 bg-white shadow-2xl
                      ${SLOTS[i].pos} ${SLOTS[i].z}`}
        >
          <ProductVisual
            product={product}
            variant={getProductScenes(product)[0]}
            className="h-32"
          />
          <div className="border-t border-line px-3 py-2">
            <p className="text-xs font-semibold text-ink-800">{product.code}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
