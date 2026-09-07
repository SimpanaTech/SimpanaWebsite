import Link from "next/link";
import { SITE } from "@/data/site";

/**
 * Logo mark + wordmark.
 *
 * The mark is an SVG interpretation of the brand's interlocking puzzle pieces,
 * drawn in the three logo colours: three cells of a 2×2 grid, tilted, with
 * round tabs where the pieces join. Vector, so it stays crisp at any size and
 * costs no image request.
 *
 * To use the official artwork instead, drop it in `public/` and replace the
 * <svg> in LogoMark with <img src="/logo.svg" alt="" />. Nothing else changes.
 */

const GREEN = "#a9c97e";
const BLUE = "#8dbbd8";
const NAVY = "#1b3a5c";

const CELL = 34; // piece size
const PITCH = 38; // piece size + gap
const TAB = 7; // radius of the interlocking tab

export function LogoMark({ className = "h-9 w-9" }) {
  return (
    <svg viewBox="0 0 116 116" className={className} aria-hidden="true">
      {/*
        The cluster is authored from the origin, then tilted and centred. It is
        centred on the visual centroid of the three pieces rather than the
        bounding box — the empty fourth cell would otherwise drag the mark
        visibly off to one side.
      */}
      <g transform="translate(58 58) rotate(-14) translate(-33 -39)">
        {/* bottom-left — light blue */}
        <rect x="0" y={PITCH} width={CELL} height={CELL} rx="7" fill={BLUE} />
        {/* bottom-right — navy */}
        <rect
          x={PITCH}
          y={PITCH}
          width={CELL}
          height={CELL}
          rx="7"
          fill={NAVY}
        />
        {/* top-left — green */}
        <rect x="0" y="0" width={CELL} height={CELL} rx="7" fill={GREEN} />

        {/* tabs: green reaching down into blue, navy reaching left into blue */}
        <circle cx={CELL / 2} cy={CELL + 2} r={TAB} fill={GREEN} />
        <circle cx={PITCH - 2} cy={PITCH + CELL / 2} r={TAB} fill={NAVY} />
      </g>
    </svg>
  );
}

export default function Logo({ onDark = false, className = "", onClick }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${SITE.name} — home`}
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <LogoMark />
      <span
        className={`font-display text-[22px] font-bold tracking-tight ${
          onDark ? "text-white" : "text-brand-800"
        }`}
      >
        {SITE.shortName}
      </span>
    </Link>
  );
}
