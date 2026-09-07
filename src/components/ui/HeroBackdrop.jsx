import { HERO_FIELDS } from "@/components/ui/heroFields";

/**
 * Animated backdrop for the navy hero bands.
 *
 * A shared colour base — drifting orbs and a light sweep — with one signature
 * graphic layered on top. Each page picks its own motif via `variant`; the set
 * lives in `heroFields.jsx`.
 *
 * Orb sizes are viewport-relative, because a glow that reads as an accent on a
 * 1440px hero would cover a 390px one entirely. The scrim keeps the left of the
 * band near-solid navy so the decoration can never eat into text contrast.
 *
 * Purely decorative: hidden from assistive tech, and the global reduced-motion
 * rule in globals.css settles every layer.
 */
export default function HeroBackdrop({ size = "lg", variant = "aisle" }) {
  const Field = HERO_FIELDS[variant] ?? HERO_FIELDS.aisle;

  return (
    <div
      aria-hidden="true"
      className={`hero-backdrop pointer-events-none absolute inset-0 overflow-hidden ${
        size === "sm" ? "hero-backdrop--sm" : ""
      }`}
    >
      <div className={`hero-field-wrap hero-field-wrap--${variant}`}>
        <Field />
      </div>

      <span className="hero-orb hero-orb--blue" />
      <span className="hero-orb hero-orb--sky" />
      <span className="hero-orb hero-orb--leaf" />

      <div className="hero-sweep absolute inset-0" />

      {/* Copy scrim. The graphic lives on the right; this keeps the left side —
          where every hero puts its heading and intro — on near-solid navy so
          the decoration can never eat into text contrast. */}
      <div className="hero-scrim absolute inset-0" />

      {/* keeps the band grounded against the content below */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-brand-900 to-transparent" />
    </div>
  );
}
