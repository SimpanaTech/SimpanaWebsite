"use client";

/**
 * One labelled control plus its validation message.
 *
 * Children is a render prop so the field owns the label/error wiring while the
 * caller stays in charge of the input itself.
 */
export default function FormField({
  id,
  name,
  label,
  required = false,
  hint,
  error,
  touched,
  children,
}) {
  const invalid = Boolean(touched && error);
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-ink-800"
      >
        {label}
        {required ? (
          <span className="ml-0.5 text-brand-600" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      {children({
        id,
        name,
        "aria-invalid": invalid || undefined,
        "aria-describedby":
          [invalid ? errorId : null, hint ? hintId : null]
            .filter(Boolean)
            .join(" ") || undefined,
        "aria-required": required || undefined,
        className: `w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px]
                    text-ink-800 placeholder:text-ink-400
                    transition-colors outline-none
                    focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20
                    ${invalid ? "border-red-400" : "border-line-strong"}`
          .replace(/\s+/g, " ")
          .trim(),
      })}

      {hint && !invalid ? (
        <p id={hintId} className="mt-1.5 text-xs text-ink-500">
          {hint}
        </p>
      ) : null}
      {invalid ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
