/**
 * ToolMotif — a tool-room pegboard behind the Tools Management (TMS) hero.
 *
 * A grid of peg slots sits inside the hero's visible window (right side of
 * the band). One slot is flagged as the item currently under calibration and
 * pulses with expanding rings. Two belts above and below the board carry a
 * borrow-out and a return-in packet, echoing check-out / check-in flow.
 *
 * Self-contained: same 1200x620 canvas + Canvas helper as heroFields.jsx,
 * currentColor only, no randomness — geometry is index math so server and
 * client markup always match.
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

/* ------------------------------------------------------------------ *
 * pegboard grid — slots concentrated in the 650-1150 visibility window
 * ------------------------------------------------------------------ */
const COLS = 6;
const ROWS = 5;
const GRID_X0 = 720;
const GRID_X_STEP = 76;
const GRID_Y0 = 150;
const GRID_Y_STEP = 68;
const HOLE = 30;

// the slot currently pulled for calibration
const ACCENT_ROW = 2;
const ACCENT_COL = 3;

const SLOTS = [];
for (let r = 0; r < ROWS; r += 1) {
  for (let c = 0; c < COLS; c += 1) {
    SLOTS.push({
      x: GRID_X0 + c * GRID_X_STEP,
      y: GRID_Y0 + r * GRID_Y_STEP,
      accent: r === ACCENT_ROW && c === ACCENT_COL,
    });
  }
}
const ACCENT = SLOTS.find((s) => s.accent);

/* two belts: borrow-out (upper) and return-in (lower) */
const OUT_Y = 104;
const IN_Y = 462;

export default function ToolMotif() {
  return (
    <Canvas>
      {/* pegboard frame */}
      <rect
        x={GRID_X0 - 54}
        y={GRID_Y0 - 54}
        width={(COLS - 1) * GRID_X_STEP + 108}
        height={(ROWS - 1) * GRID_Y_STEP + 108}
        rx="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.28"
      />

      {/* peg holes (static) + hung tools (animated) */}
      <g>
        {SLOTS.map((s, i) => (
          <rect
            key={`hole-${i}`}
            x={s.x - HOLE / 2}
            y={s.y - HOLE / 2}
            width={HOLE}
            height={HOLE}
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}
      </g>
      <g>
        {SLOTS.map((s, i) => (
          <circle
            key={`peg-${i}`}
            className={`hero-node${s.accent ? " hero-node--accent" : ""}`}
            style={{ animationDelay: `${(i % 5) * 1.4}s` }}
            cx={s.x}
            cy={s.y}
            r={s.accent ? 6 : 3.6}
          />
        ))}
      </g>

      {/* calibration pulse on the flagged slot */}
      {[0, 1, 2].map((i) => (
        <circle
          key={`ring-${i}`}
          className="hero-ring"
          style={{ animationDelay: `-${i * 2.6}s` }}
          cx={ACCENT.x}
          cy={ACCENT.y}
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      ))}

      {/* borrow-out belt */}
      <line
        x1="80"
        y1={OUT_Y}
        x2="1120"
        y2={OUT_Y}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <circle
        className="hero-packet"
        style={{ animationDelay: "0s" }}
        cy={OUT_Y}
        r="5.5"
        fill="currentColor"
      />

      {/* return-in belt */}
      <line
        x1="80"
        y1={IN_Y}
        x2="1120"
        y2={IN_Y}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <circle
        className="hero-packet"
        style={{ animationDelay: "-4.5s" }}
        cy={IN_Y}
        r="5.5"
        fill="currentColor"
      />
    </Canvas>
  );
}
