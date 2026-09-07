import Link from "next/link";

/**
 * The site's surface. Becomes a link when `href` is passed, so whole-card
 * links stay real anchors and keep keyboard focus.
 */
export default function Card({
  href,
  as: Tag = "div",
  interactive,
  className = "",
  children,
  ...rest
}) {
  const isLink = Boolean(href);
  const lifts = interactive ?? isLink;

  const classes = `group relative flex flex-col rounded-xl border border-line
                   bg-white shadow-[var(--shadow-card)] transition-all duration-200
                   ${lifts ? "hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-card-hover)]" : ""}
                   ${className}`
    .replace(/\s+/g, " ")
    .trim();

  if (isLink) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
