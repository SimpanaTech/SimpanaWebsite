const VARIANTS = {
  neutral: "border-line bg-surface-2 text-ink-600",
  brand: "border-brand-200 bg-brand-50 text-brand-700",
  leaf: "border-leaf-300 bg-leaf-50 text-leaf-700",
  onDark: "border-white/20 bg-white/10 text-brand-100",
};

/** Small pill used for tags, product codes, and metadata. */
export default function Badge({
  variant = "neutral",
  className = "",
  children,
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1
                  text-xs font-medium tracking-wide ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
