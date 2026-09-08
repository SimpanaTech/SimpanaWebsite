/**
 * cart — a transaction moving through checkout (Point of Sale)
 *
 * Standalone hero motif, same authoring rules as src/components/ui/heroFields.jsx:
 * hand-authored SVG on a fixed 1200x620 canvas, animated with CSS classes already
 * defined in src/styles/globals.css, geometry from index maths only (no
 * Math.random/Date.now) so static-export markup always matches the client.
 */

const FIELD_W = 1200;
const FIELD_H = 620;

function Canvas({ children }) {
  return (
    <svg
      className="hero-field"
      viewBox={`0 0 ${FIELD_W} ${FIELD_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* A short checkout path: scan -> payment -> loyalty -> receipt, kept inside
 * the window the navy scrim leaves visible (~x 650-1150, y 90-480). */
const LANE_Y = 300;
const STOPS = [
  { x: 700, label: "scan" },
  { x: 850, label: "payment" },
  { x: 1000, label: "loyalty", accent: true },
  { x: 1130, label: "receipt" },
];

/* Printed line items rising to the right of the final stop. */
const RECEIPT_X0 = 1058;
const RECEIPT_GAP = 15;
const RECEIPT_BASE = 428;
const RECEIPT_BARS = 6;

function CartMotif() {
  return (
    <Canvas>
      {/* connecting lane between stops */}
      {STOPS.slice(0, -1).map((s, i) => (
        <line
          key={`edge-${s.x}`}
          className="hero-edge"
          style={{ animationDelay: `${i * 1.1}s` }}
          x1={s.x}
          y1={LANE_Y}
          x2={STOPS[i + 1].x}
          y2={LANE_Y}
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ))}

      {/* waypoints along the lane */}
      {STOPS.map((s, i) => (
        <g key={s.x}>
          <circle
            className="hero-stop"
            style={{ animationDelay: `${i * 1.6}s` }}
            cx={s.x}
            cy={LANE_Y}
            r="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <line
            x1={s.x}
            y1={LANE_Y - 22}
            x2={s.x}
            y2={LANE_Y + 22}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
          />
        </g>
      ))}

      {/* loyalty stop gets the single highlighted pulse */}
      <circle
        className="hero-node--accent"
        cx={STOPS[2].x}
        cy={LANE_Y}
        r="5.5"
      />

      {/* receipt printing out beside the final stop */}
      {Array.from({ length: RECEIPT_BARS }, (_, i) => {
        const x = RECEIPT_X0 + i * RECEIPT_GAP;
        const h = 16 + Math.abs(Math.sin(i * 1.3)) * 26;
        return (
          <rect
            key={x}
            className="hero-wave"
            style={{
              animationDelay: `${(i % RECEIPT_BARS) * 0.35}s`,
              transformOrigin: `${x}px ${RECEIPT_BASE}px`,
            }}
            x={x}
            y={RECEIPT_BASE - h}
            width="6"
            height={h}
            rx="2"
            fill="currentColor"
          />
        );
      })}
      <line
        x1={RECEIPT_X0 - 10}
        y1={RECEIPT_BASE}
        x2={RECEIPT_X0 + RECEIPT_BARS * RECEIPT_GAP}
        y2={RECEIPT_BASE}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
    </Canvas>
  );
}

export default CartMotif;
