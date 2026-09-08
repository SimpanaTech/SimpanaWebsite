/**
 * warehouse — cartons put away along a scanned rack aisle (Warehouse Management)
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

/* A rack of uprights and shelf beams framing the window the navy scrim
 * leaves visible (~x 650-1150, y 90-480), with cartons travelling in along
 * two shelf lanes as they're put away. */
const UPRIGHTS_X = [660, 780, 900, 1020, 1140];
const UPRIGHT_TOP = 100;
const UPRIGHT_BOTTOM = 460;

const SHELVES_Y = [140, 240, 340, 440];
const SHELF_X0 = 650;
const SHELF_X1 = 1150;

/* put-away lanes between shelf levels: cartons carried in from the aisle */
const LANES = [
  { y: 190, count: 3 },
  { y: 390, count: 3 },
];
const CARTON_CYCLE = 16;

/* pick / put-away locations along the rack, pulsing as they're counted */
const STOPS = [
  { x: 780, y: 140 },
  { x: 1020, y: 240 },
  { x: 660, y: 340 },
  { x: 900, y: 440 },
  { x: 1140, y: 140 },
  { x: 780, y: 440 },
];

/* confirmation pulse over the active bay once a put-away is logged */
const PING_C = { x: 900, y: 300 };

function WarehouseMotif() {
  return (
    <Canvas>
      {/* rack structure: uprights (bay dividers) and shelf beams */}
      <g opacity="0.4">
        {UPRIGHTS_X.map((x, i) => (
          <line
            key={`u${i}`}
            x1={x}
            y1={UPRIGHT_TOP}
            x2={x}
            y2={UPRIGHT_BOTTOM}
            stroke="currentColor"
            strokeWidth="1.4"
          />
        ))}
        {SHELVES_Y.map((y, i) => (
          <line
            key={`s${i}`}
            x1={SHELF_X0}
            y1={y}
            x2={SHELF_X1}
            y2={y}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.6"
          />
        ))}
      </g>

      {/* put-away lanes: cartons travelling into the bay */}
      {LANES.map((lane, l) => (
        <g key={l}>
          {Array.from({ length: lane.count }, (_, i) => (
            <rect
              key={i}
              className="hero-carton"
              style={{
                animationDelay: `-${l * 2.3 + (i * CARTON_CYCLE) / lane.count}s`,
                animationDuration: `${CARTON_CYCLE}s`,
              }}
              x="-80"
              y={lane.y - 22}
              width="44"
              height="32"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          ))}
        </g>
      ))}

      {/* barcode scan gate sweeping the aisle as stock moves through */}
      <line
        className="hero-scanline"
        x1="700"
        y1="90"
        x2="700"
        y2="470"
        stroke="currentColor"
        strokeWidth="2.2"
      />

      {/* pick / put-away locations, pulsing as they're counted */}
      {STOPS.map((s, i) => (
        <circle
          key={i}
          className="hero-stop"
          style={{ animationDelay: `${i * 1.5}s` }}
          cx={s.x}
          cy={s.y}
          r="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      ))}

      {/* confirmation ping over the active bay once a put-away logs */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          className="hero-ping"
          style={{ animationDelay: `-${i * 2.9}s` }}
          cx={PING_C.x}
          cy={PING_C.y}
          r="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      ))}
    </Canvas>
  );
}

export default WarehouseMotif;
