/**
 * FleetMotif — hero background for the Products index page.
 *
 * A composite motif for "Seven systems, built for how operations actually
 * run": the seven Simpana products as nodes in a ring around a single hub,
 * joined by pulsing spokes and labelled with their real product codes. The
 * hub broadcasts outward, reading as one operation coordinating seven
 * connected systems (unlike the single-product motifs elsewhere in this
 * directory / heroFields.jsx, which each represent one product).
 *
 * Standalone file — mirrors the pattern in ../heroFields.jsx (see especially
 * Network and Beacon there) but does not import from it. Geometry is index
 * math only (no randomness), colour is currentColor only (set by the
 * caller's CSS), animation uses only the existing hero-* classes from
 * src/styles/globals.css.
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

/* Hub sits inside the hero's visible window (x 650-1150, y 90-480), with the
 * ring of nodes sized so every node — and its label — stays inside it too. */
const HUB = { x: 900, y: 285 };
const ORBIT_RX = 185;
const ORBIT_RY = 135;

/* All seven products, in catalogue order. */
const CODES = ["WMS", "IMS", "POS", "CWMS", "TMS", "SMS", "EMS"];

const NODES = CODES.map((code, i) => {
  const angle = ((-90 + i * (360 / CODES.length)) * Math.PI) / 180;
  const x = HUB.x + ORBIT_RX * Math.cos(angle);
  const y = HUB.y + ORBIT_RY * Math.sin(angle);
  return { code, x, y, above: y < HUB.y };
});

function FleetMotif() {
  return (
    <Canvas>
      {/* orbit guide */}
      <ellipse
        cx={HUB.x}
        cy={HUB.y}
        rx={ORBIT_RX}
        ry={ORBIT_RY}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
      />

      {/* spokes connecting every product back to the shared hub */}
      <g>
        {NODES.map((n, i) => (
          <line
            key={n.code}
            className="hero-edge"
            style={{ animationDelay: `${i * 1.1}s` }}
            x1={HUB.x}
            y1={HUB.y}
            x2={n.x}
            y2={n.y}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* the seven systems */}
      <g>
        {NODES.map((n, i) => (
          <g key={n.code}>
            <circle
              className="hero-node"
              style={{ animationDelay: `${(i % 5) * 1.4}s` }}
              cx={n.x}
              cy={n.y}
              r="5"
            />
            <text
              x={n.x}
              y={n.y + (n.above ? -16 : 24)}
              fontSize="13"
              textAnchor="middle"
              fill="currentColor"
              opacity="0.85"
            >
              {n.code}
            </text>
          </g>
        ))}
      </g>

      {/* the hub broadcasting to every connected system */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          className="hero-ring"
          style={{ animationDelay: `-${i * 1.6}s` }}
          cx={HUB.x}
          cy={HUB.y}
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      ))}
      <circle className="hero-node--accent" cx={HUB.x} cy={HUB.y} r="7" />
    </Canvas>
  );
}

export default FleetMotif;
