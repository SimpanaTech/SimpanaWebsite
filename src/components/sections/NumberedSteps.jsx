/**
 * A numbered list of short steps - used for the three house rules and the
 * four engagement stages. Same shape, same markup, two callers.
 *
 * Renders as an <ol> because the order is the content in both cases.
 */
export default function NumberedSteps({ steps = [], columns = 3 }) {
  const cols =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ol className={`grid gap-8 ${cols} lg:gap-10`}>
      {steps.map((step) => (
        <li key={step.no}>
          <span
            className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl
                       bg-brand-50 font-display text-sm font-bold text-brand-600"
          >
            {step.no}
          </span>
          <h3 className="text-lg">{step.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
