import Link from "next/link";

/** Trail of links ending in the current page. */
export default function Breadcrumb({ items = [], onDark = false }) {
  const muted = onDark ? "text-brand-200/80" : "text-ink-500";
  const current = onDark ? "text-white" : "text-ink-800";

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className={`${muted} hover:underline`}>
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            <span className={muted} aria-hidden="true">
              /
            </span>
            {item.href ? (
              <Link href={item.href} className={`${muted} hover:underline`}>
                {item.label}
              </Link>
            ) : (
              <span className={`font-medium ${current}`} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
