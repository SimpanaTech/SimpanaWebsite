import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { PRODUCTS } from "@/data/content";

/**
 * Product cards. The flagship (WMS) spans two columns on wide screens so the
 * grid has a clear entry point.
 */
export default function ProductsGrid({ products = PRODUCTS, feature = true }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const wide = feature && product.featured;

        return (
          <Card
            key={product.slug}
            href={`/products/${product.slug}`}
            className={`p-7 ${wide ? "sm:col-span-2" : ""}`}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <span
                className="inline-flex h-11 w-11 items-center justify-center
                           rounded-xl bg-brand-50 text-brand-600
                           transition-colors group-hover:bg-brand-600 group-hover:text-white"
              >
                <Icon name={product.icon} />
              </span>
              <Badge variant="brand">{product.code}</Badge>
            </div>

            <h3 className={wide ? "text-2xl" : "text-lg"}>{product.name}</h3>
            <p
              className={`mt-2.5 leading-relaxed text-ink-600 ${
                wide ? "max-w-2xl text-base" : "text-[15px]"
              }`}
            >
              {product.card}
            </p>

            <div className="mt-auto flex items-center gap-2 pt-6">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf-500" />
              <span className="text-xs font-medium tracking-wide text-ink-500">
                {product.status}
              </span>
            </div>

            <span
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold
                         text-brand-600 transition-colors group-hover:text-brand-800"
            >
              View product
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path
                  d="M3 8h9M8.5 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Card>
        );
      })}
    </div>
  );
}
