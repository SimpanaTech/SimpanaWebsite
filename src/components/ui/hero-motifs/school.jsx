/**
 * SchoolMotif — a timetable grid behind the School Management (SMS) hero.
 *
 * A 5x5 grid of periods (rows) across days (columns) flickers in sequence
 * like a schedule lighting up, while a current-period line sweeps across it.
 * A roster column beside the grid represents enrolled classes, with one
 * node pulsing as a notification.
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
 * timetable grid — days x periods, concentrated in the visibility window
 * ------------------------------------------------------------------ */
const DAYS = 5;
const PERIODS = 5;
const GRID_X0 = 680;
const GRID_X_STEP = 90;
const GRID_Y0 = 140;
const GRID_Y_STEP = 68;
const CELL_W = 64;
const CELL_H = 50;

const CELLS = [];
for (let r = 0; r < PERIODS; r += 1) {
  for (let c = 0; c < DAYS; c += 1) {
    CELLS.push({
      x: GRID_X0 + c * GRID_X_STEP,
      y: GRID_Y0 + r * GRID_Y_STEP,
      d: (r + c) % 9,
    });
  }
}

const GRID_LEFT = GRID_X0 - CELL_W / 2;
const GRID_RIGHT = GRID_X0 + (DAYS - 1) * GRID_X_STEP + CELL_W / 2;
const GRID_TOP = GRID_Y0 - CELL_H / 2;
const GRID_BOTTOM = GRID_Y0 + (PERIODS - 1) * GRID_Y_STEP + CELL_H / 2;

/* roster column — enrolled classes, one flagged for a notification */
const ROSTER_X = 1112;
const ROSTER = [150, 206, 262, 318, 374, 430].map((y, i) => ({
  y,
  accent: i === 3,
}));

export default function SchoolMotif() {
  return (
    <Canvas>
      {/* timetable frame + gridlines (static) */}
      <rect
        x={GRID_LEFT}
        y={GRID_TOP}
        width={GRID_RIGHT - GRID_LEFT}
        height={GRID_BOTTOM - GRID_TOP}
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.3"
      />
      {Array.from({ length: DAYS - 1 }, (_, i) => (
        <line
          key={`col-${i}`}
          x1={GRID_X0 + i * GRID_X_STEP + GRID_X_STEP / 2}
          y1={GRID_TOP}
          x2={GRID_X0 + i * GRID_X_STEP + GRID_X_STEP / 2}
          y2={GRID_BOTTOM}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.18"
        />
      ))}
      {Array.from({ length: PERIODS - 1 }, (_, i) => (
        <line
          key={`row-${i}`}
          x1={GRID_LEFT}
          y1={GRID_Y0 + i * GRID_Y_STEP + GRID_Y_STEP / 2}
          x2={GRID_RIGHT}
          y2={GRID_Y0 + i * GRID_Y_STEP + GRID_Y_STEP / 2}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.18"
        />
      ))}

      {/* periods lighting up in sequence */}
      <g opacity="0.85">
        {CELLS.map((cell, i) => (
          <rect
            key={i}
            className="hero-bar"
            style={{ animationDelay: `${cell.d * 0.5}s` }}
            x={cell.x - CELL_W / 2}
            y={cell.y - CELL_H / 2}
            width={CELL_W}
            height={CELL_H}
            rx="4"
            fill="currentColor"
          />
        ))}
      </g>

      {/* current-period sweep */}
      <line
        className="hero-scanline"
        x1="596"
        y1={GRID_TOP - 20}
        x2="596"
        y2={GRID_BOTTOM + 20}
        stroke="currentColor"
        strokeWidth="2.5"
      />

      {/* roster of enrolled classes, one lit as a notification */}
      <line
        x1={ROSTER_X}
        y1={ROSTER[0].y}
        x2={ROSTER_X}
        y2={ROSTER[ROSTER.length - 1].y}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      {ROSTER.map((n, i) => (
        <circle
          key={i}
          className={`hero-node${n.accent ? " hero-node--accent" : ""}`}
          style={{ animationDelay: `${(i % 5) * 1.4}s` }}
          cx={ROSTER_X}
          cy={n.y}
          r={n.accent ? 6 : 3.6}
        />
      ))}
    </Canvas>
  );
}
