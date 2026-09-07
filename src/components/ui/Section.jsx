import Container from "@/components/ui/Container";

/**
 * A page section with consistent vertical rhythm and an optional background
 * tone. `tone` keeps alternating light/dark bands consistent across pages.
 */
const TONES = {
  white: "bg-white",
  tint: "bg-surface-2",
  edge: "bg-surface-3",
  navy: "bg-brand-900 text-brand-100",
};

const SPACING = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-20 sm:py-28",
};

export default function Section({
  tone = "white",
  space = "md",
  bordered = false,
  className = "",
  containerClassName = "",
  children,
  ...rest
}) {
  return (
    <section
      className={`${TONES[tone]} ${SPACING[space]} ${
        bordered ? "border-t border-line" : ""
      } ${className}`}
      {...rest}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
