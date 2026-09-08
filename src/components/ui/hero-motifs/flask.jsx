/**
 * flask — a containment radius watching over a stored grid (Chemical Warehouse)
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

/* A safety radius pulsing from the storage point, watching a small grid of
 * containers below it — kept inside the window the navy scrim leaves visible
 * (~x 650-1150, y 90-480). */
const BEACON = { x: 970, y: 225 };

const DRUM_COLS = [790, 855, 920];
const DRUM_ROWS = [335, 400];
const DRUM_W = 40;
const DRUM_H = 52;
const DRUM_RX = 7;

function FlaskMotif() {
  const drums = [];
  DRUM_ROWS.forEach((y, r) => {
    DRUM_COLS.forEach((x, c) => {
      drums.push({ x, y, i: r * DRUM_COLS.length + c });
    });
  });
  const approvedIndex = 4; // one drum called out as the compliance highlight

  return (
    <Canvas>
      {/* containment / hazard radius pulsing outward from the storage point */}
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          className="hero-ring"
          style={{ animationDelay: `-${i * 1.9}s` }}
          cx={BEACON.x}
          cy={BEACON.y}
          r="52"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      ))}
      <circle className="hero-node--accent" cx={BEACON.x} cy={BEACON.y} r="6.5" />

      {/* monitoring lines from the storage point to the front row of the grid */}
      {DRUM_COLS.map((x, i) => (
        <line
          key={`edge-${x}`}
          className="hero-edge"
          style={{ animationDelay: `${i * 1.1}s` }}
          x1={BEACON.x}
          y1={BEACON.y}
          x2={x + DRUM_W / 2}
          y2={DRUM_ROWS[0]}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      ))}

      {/* grid of stored containers, each with a monitored status light */}
      {drums.map((d) => (
        <g key={`${d.x}-${d.y}`}>
          <rect
            x={d.x}
            y={d.y}
            width={DRUM_W}
            height={DRUM_H}
            rx={DRUM_RX}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <line
            x1={d.x}
            y1={d.y + 14}
            x2={d.x + DRUM_W}
            y2={d.y + 14}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
          {d.i === approvedIndex ? (
            <circle
              className="hero-node--accent"
              cx={d.x + DRUM_W / 2}
              cy={d.y + 8}
              r="4"
            />
          ) : (
            <circle
              className="hero-dot"
              style={{ animationDelay: `${(d.i % 6) * 0.7}s` }}
              cx={d.x + DRUM_W / 2}
              cy={d.y + 8}
              r="3.4"
              fill="currentColor"
            />
          )}
        </g>
      ))}
    </Canvas>
  );
}

export default FlaskMotif;
