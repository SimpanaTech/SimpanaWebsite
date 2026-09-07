import Link from "next/link";

const VARIANTS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

const SIZES = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

/**
 * One button for the whole site.
 *
 * Picks the right element automatically: a `next/link` for internal hrefs, an
 * anchor for external or mailto/tel, and a real `<button>` when there is no
 * href - so a form submit is never a div pretending to be a button.
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}) {
  const classes = `btn ${VARIANTS[variant]} ${SIZES[size]} ${className}`.trim();

  if (!href) {
    return (
      <button className={classes} {...rest}>
        {children}
      </button>
    );
  }

  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const isNewTab = href.startsWith("http");

  return (
    <a
      href={href}
      className={classes}
      {...(isNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
