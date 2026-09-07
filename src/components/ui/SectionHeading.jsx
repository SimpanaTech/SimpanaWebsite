/**
 * Eyebrow + heading + optional intro.
 *
 * `align="split"` puts the intro beside the heading (the wide layout used on
 * most sections); `align="center"` stacks and centres it.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "split",
  onDark = false,
  className = "",
}) {
  const heading = (
    <h2
      className={`text-3xl sm:text-4xl lg:text-[42px] ${
        onDark ? "text-white" : ""
      }`}
    >
      {title}
    </h2>
  );

  const lead = intro ? (
    <p
      className={`text-[17px] leading-relaxed ${
        onDark ? "text-brand-200" : "text-ink-600"
      }`}
    >
      {intro}
    </p>
  ) : null;

  if (align === "center") {
    return (
      <div className={`mx-auto max-w-3xl text-center ${className}`}>
        {eyebrow ? (
          <p className={`eyebrow mb-3 ${onDark ? "text-brand-300" : ""}`}>
            {eyebrow}
          </p>
        ) : null}
        {heading}
        {lead ? <div className="mt-4">{lead}</div> : null}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16 ${className}`}
    >
      <div>
        {eyebrow ? (
          <p className={`eyebrow mb-3 ${onDark ? "text-brand-300" : ""}`}>
            {eyebrow}
          </p>
        ) : null}
        {heading}
      </div>
      {lead}
    </div>
  );
}
