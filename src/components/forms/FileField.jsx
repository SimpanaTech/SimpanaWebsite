"use client";

import { useRef } from "react";

const KB = 1024;
const MB = KB * 1024;

const prettySize = (bytes) =>
  bytes >= MB
    ? `${(bytes / MB).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / KB))} KB`;

/**
 * File upload with a real drop zone.
 *
 * The native <input type="file"> stays in the DOM and does the work — it is
 * just visually hidden — so keyboard users, screen readers, and form
 * validation all behave normally. The drop zone is a label bound to it, which
 * is what makes clicking anywhere in the zone open the picker.
 */
export default function FileField({
  id,
  name,
  label,
  accept,
  hint,
  required = false,
  file,
  error,
  touched,
  onSelect,
  onBlur,
}) {
  const inputRef = useRef(null);
  const invalid = Boolean(touched && error);
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const take = (candidate) => onSelect(candidate ?? null);

  const onDrop = (event) => {
    event.preventDefault();
    take(event.dataTransfer.files?.[0]);
  };

  const clear = () => {
    take(null);
    if (inputRef.current) inputRef.current.value = "";
  };

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

      {file ? (
        <div className="flex items-center gap-3 rounded-lg border border-leaf-300 bg-leaf-50 px-4 py-3">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 flex-none text-leaf-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M14 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[15px] font-medium text-ink-800">
              {file.name}
            </span>
            <span className="text-xs text-ink-500">
              {prettySize(file.size)}
            </span>
          </span>
          <button
            type="button"
            onClick={clear}
            className="flex-none rounded-md px-2 py-1 text-sm font-medium
                       text-ink-600 underline underline-offset-2 hover:text-brand-700"
          >
            Remove
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-1.5
                      rounded-lg border border-dashed px-4 py-7 text-center
                      transition-colors hover:border-brand-400 hover:bg-brand-50/50
                      ${invalid ? "border-red-400 bg-red-50/40" : "border-line-strong bg-white"}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-brand-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 16V4m0 0L8 8m4-4 4 4" />
            <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
          </svg>
          <span className="text-[15px] font-medium text-ink-800">
            <span className="text-brand-600">Choose a file</span> or drag it
            here
          </span>
          {hint ? (
            <span id={hintId} className="text-xs text-ink-500">
              {hint}
            </span>
          ) : null}
        </label>
      )}

      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        accept={accept}
        required={required}
        onChange={(e) => take(e.currentTarget.files?.[0])}
        onBlur={onBlur}
        aria-invalid={invalid || undefined}
        aria-describedby={
          [invalid ? errorId : null, hint ? hintId : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className="sr-only"
      />

      {invalid ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
