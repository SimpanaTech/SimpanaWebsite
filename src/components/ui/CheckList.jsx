/** Bulleted list with the brand's green tick. */
export default function CheckList({
  items = [],
  onDark = false,
  className = "",
}) {
  if (!items.length) return null;

  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            className={`mt-1 h-4 w-4 flex-none ${
              onDark ? "text-leaf-400" : "text-leaf-600"
            }`}
          >
            <path
              d="M4 10.5l4 4 8-9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className={`text-[15px] leading-relaxed ${
              onDark ? "text-brand-100" : "text-ink-600"
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
