/**
 * CalendarMotif — hero background for the Event Management (EMS) product page.
 *
 * A booking calendar: a month grid of dates sits inside a calendar frame
 * (echoing the product's own line-icon — body + two binder rings). Every
 * date pulses gently as an open slot; one date is a confirmed booking,
 * marked brighter and rippling outward as new bookings arrive.
 *
 * Standalone file — mirrors the pattern in ../heroFields.jsx but does not
 * import from it. Geometry is index math only (no randomness), colour is
 * currentColor only (set by the caller's CSS), animation uses only the
 * existing hero-* classes from src/styles/globals.css.
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

/* Calendar body — sits inside the hero's visible window (x 650-1150, y 90-480). */
const CAL = { x: 660, y: 110, w: 470, h: 350, rx: 16 };

/* Binder rings poking above the frame, echoing the product icon's
 * `M8 3.5v3M16 3.5v3` tabs. */
const RINGS_X = [CAL.x + CAL.w * 0.28, CAL.x + CAL.w * 0.72];

/* Header rule separating the "month label" band from the date grid, echoing
 * the icon's `M3.5 10h17`. */
const HEADER_H = 46;
const GRID_TOP = CAL.y + HEADER_H;
const GRID_PAD = 14;
const GRID_LEFT = CAL.x + GRID_PAD;
const GRID_RIGHT = CAL.x + CAL.w - GRID_PAD;
const GRID_BOTTOM = CAL.y + CAL.h - GRID_PAD;
const GRID_W = GRID_RIGHT - GRID_LEFT;
const GRID_H = GRID_BOTTOM - GRID_TOP;

const COLS = 7;
const ROWS = 5;
const COL_W = GRID_W / COLS;
const ROW_H = GRID_H / ROWS;

/* One date per cell. Row 1 / col 4 (0-indexed) is the confirmed booking. */
const BOOKED_ROW = 1;
const BOOKED_COL = 4;

const DATES = Array.from({ length: ROWS * COLS }, (_, i) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  return {
    cx: GRID_LEFT + COL_W * (col + 0.5),
    cy: GRID_TOP + ROW_H * (row + 0.5),
    booked: row === BOOKED_ROW && col === BOOKED_COL,
  };
});
const BOOKED = DATES.find((d) => d.booked);

function CalendarMotif() {
  return (
    <Canvas>
      {/* calendar body */}
      <rect
        x={CAL.x}
        y={CAL.y}
        width={CAL.w}
        height={CAL.h}
        rx={CAL.rx}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.55"
      />

      {/* binder rings */}
      {RINGS_X.map((x, i) => (
        <line
          key={i}
          x1={x}
          y1={CAL.y - 16}
          x2={x}
          y2={CAL.y + 14}
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.6"
        />
      ))}

      {/* header rule */}
      <line
        x1={GRID_LEFT}
        y1={CAL.y + HEADER_H - 10}
        x2={GRID_RIGHT}
        y2={CAL.y + HEADER_H - 10}
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.6"
      />

      {/* grid dividers */}
      <g opacity="0.2">
        {Array.from({ length: COLS - 1 }, (_, i) => {
          const x = GRID_LEFT + COL_W * (i + 1);
          return (
            <line
              key={`c${i}`}
              x1={x}
              y1={GRID_TOP}
              x2={x}
              y2={GRID_BOTTOM}
              stroke="currentColor"
              strokeWidth="1"
            />
          );
        })}
        {Array.from({ length: ROWS - 1 }, (_, i) => {
          const y = GRID_TOP + ROW_H * (i + 1);
          return (
            <line
              key={`r${i}`}
              x1={GRID_LEFT}
              y1={y}
              x2={GRID_RIGHT}
              y2={y}
              stroke="currentColor"
              strokeWidth="1"
            />
          );
        })}
      </g>

      {/* date slots — every cell pulses softly, one is the confirmed booking */}
      <g>
        {DATES.map((d, i) => (
          <circle
            key={i}
            className={`hero-node${d.booked ? " hero-node--accent" : ""}`}
            style={{ animationDelay: `${(i % 5) * 1.4}s` }}
            cx={d.cx}
            cy={d.cy}
            r={d.booked ? 6 : 3.2}
          />
        ))}
      </g>

      {/* ripples announcing the new booking */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          className="hero-ping"
          style={{ animationDelay: `-${i * 2.9}s` }}
          cx={BOOKED.cx}
          cy={BOOKED.cy}
          r="34"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      ))}
    </Canvas>
  );
}

export default CalendarMotif;
