import CountUp from "@/components/ui/CountUp";

/**
 * A single headline figure. Pass `countTo` to animate a numeric value, or
 * `value` for anything that is not a plain number ("3PL+", "24/7").
 */
export default function Stat({
  value,
  countTo,
  pad = 0,
  suffix = "",
  label,
  onDark = false,
}) {
  return (
    <div>
      <div
        className={`font-display text-4xl font-bold tracking-tight sm:text-5xl ${
          onDark ? "text-white" : "text-brand-800"
        }`}
      >
        {countTo != null ? (
          <CountUp target={countTo} pad={pad} suffix={suffix} />
        ) : (
          value
        )}
      </div>
      <div
        className={`mt-2 text-sm leading-snug ${
          onDark ? "text-brand-200" : "text-ink-600"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
