/**
 * The signature graphic behind each hero band — one motif per page.
 *
 * Every motif is hand-authored SVG on the same 1200x620 canvas, animated with
 * CSS only. Geometry is derived from index maths rather than randomness, so the
 * markup a static build emits always matches what the browser renders.
 *
 * Strokes and fills use `currentColor`; the colour (and therefore how loud the
 * motif is) is set per variant in globals.css.
 */

export const FIELD_W = 1200;
export const FIELD_H = 620;

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
 * aisle — warehouse racking in one-point perspective (Home)
 * ------------------------------------------------------------------ */
const VP = { x: 830, y: 300 };
const RAYS = [
  { x: 0, y: 0 },
  { x: FIELD_W, y: 0 },
  { x: 0, y: FIELD_H },
  { x: FIELD_W, y: FIELD_H },
  { x: 0, y: FIELD_H / 2 },
  { x: FIELD_W, y: FIELD_H / 2 },
];
const RIB_CYCLE = 15;

function Aisle() {
  return (
    <Canvas>
      <g className="hero-aisle-rays">
        {RAYS.map((t, i) => (
          <line
            key={i}
            x1={VP.x}
            y1={VP.y}
            x2={t.x}
            y2={t.y}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </g>
      <g>
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            key={i}
            className="hero-rib"
            style={{
              transformOrigin: `${VP.x}px ${VP.y}px`,
              animationDelay: `-${(i * RIB_CYCLE) / 9}s`,
              animationDuration: `${RIB_CYCLE}s`,
            }}
            x="0"
            y="0"
            width={FIELD_W}
            height={FIELD_H}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        ))}
      </g>
    </Canvas>
  );
}

/* ------------------------------------------------------------------ *
 * conveyor — cartons travelling along belts (Products)
 * ------------------------------------------------------------------ */
const BELTS = [150, 300, 450];
const CARTONS_PER_BELT = 6;
const CARTON_CYCLE = 18;

function Conveyor() {
  return (
    <Canvas>
      {BELTS.map((y, b) => (
        <g key={y}>
          {/* belt surface, drawn as two rails so it reads with depth */}
          <line
            x1="0"
            y1={y}
            x2={FIELD_W}
            y2={y}
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.7"
          />
          <line
            x1="0"
            y1={y + 11}
            x2={FIELD_W}
            y2={y + 11}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
          />
          {/* rollers */}
          {Array.from({ length: 30 }, (_, i) => (
            <line
              key={i}
              x1={i * 42}
              y1={y}
              x2={i * 42}
              y2={y + 11}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
            />
          ))}
          {/* cartons travelling the belt */}
          {Array.from({ length: CARTONS_PER_BELT }, (_, i) => (
            <rect
              key={i}
              className="hero-carton"
              style={{
                animationDelay: `-${b * 1.4 + (i * CARTON_CYCLE) / CARTONS_PER_BELT}s`,
                animationDuration: `${CARTON_CYCLE}s`,
              }}
              x="-80"
              y={y - 40}
              width="52"
              height="38"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          ))}
        </g>
      ))}
    </Canvas>
  );
}

/* ------------------------------------------------------------------ *
 * scan — barcode under a moving scanner beam (Product detail)
 * ------------------------------------------------------------------ */
function Scan() {
  const bars = Array.from({ length: 46 }, (_, i) => ({
    x: 120 + i * 22,
    w: 3 + ((i * 7) % 4) * 2.4,
  }));

  return (
    <Canvas>
      <g opacity="0.75">
        {bars.map((b, i) => (
          <rect
            key={i}
            className="hero-bar"
            style={{ animationDelay: `${(i % 9) * 0.5}s` }}
            x={b.x}
            y="180"
            width={b.w}
            height="260"
            fill="currentColor"
          />
        ))}
      </g>
      <line
        className="hero-scanline"
        x1="90"
        y1="0"
        x2="90"
        y2={FIELD_H}
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </Canvas>
  );
}

/* ------------------------------------------------------------------ *
 * flow — one order moving through the stack (Services)
 * ------------------------------------------------------------------ */
const STOPS = [110, 300, 490, 680, 870, 1060];
const FLOW_Y = 310;

function Flow() {
  return (
    <Canvas>
      <line
        x1={STOPS[0]}
        y1={FLOW_Y}
        x2={STOPS[STOPS.length - 1]}
        y2={FLOW_Y}
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      {STOPS.map((x, i) => (
        <g key={x}>
          <circle
            className="hero-stop"
            style={{ animationDelay: `${i * 1.6}s` }}
            cx={x}
            cy={FLOW_Y}
            r="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <line
            x1={x}
            y1={FLOW_Y - 26}
            x2={x}
            y2={FLOW_Y + 26}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.35"
          />
        </g>
      ))}
      <circle className="hero-packet" cy={FLOW_Y} r="5.5" fill="currentColor" />
    </Canvas>
  );
}

/* ------------------------------------------------------------------ *
 * network — connected nodes (About)
 * ------------------------------------------------------------------ */
const NODES = [
  { x: 150, y: 120 },
  { x: 320, y: 250 },
  { x: 250, y: 430 },
  { x: 470, y: 90 },
  { x: 520, y: 350 },
  { x: 430, y: 540 },
  { x: 660, y: 210 },
  { x: 700, y: 470 },
  { x: 850, y: 110 },
  { x: 880, y: 330, accent: true },
  { x: 830, y: 545 },
  { x: 1030, y: 230 },
  { x: 1080, y: 450 },
  { x: 1150, y: 130 },
];
const EDGES = [
  [0, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [3, 6],
  [4, 6],
  [4, 7],
  [5, 7],
  [6, 8],
  [6, 9],
  [7, 9],
  [7, 10],
  [8, 11],
  [9, 11],
  [9, 12],
  [10, 12],
  [11, 13],
  [11, 12],
];

function Network() {
  return (
    <Canvas>
      <g opacity="0.7">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            className="hero-edge"
            style={{ animationDelay: `${(i % 6) * 1.1}s` }}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </g>
      <g>
        {NODES.map((n, i) => (
          <circle
            key={i}
            className={`hero-node${n.accent ? " hero-node--accent" : ""}`}
            style={{ animationDelay: `${(i % 5) * 1.4}s` }}
            cx={n.x}
            cy={n.y}
            r={n.accent ? 5 : 3.4}
          />
        ))}
      </g>
    </Canvas>
  );
}

/* ------------------------------------------------------------------ *
 * orbit — people circling a centre (Careers)
 * ------------------------------------------------------------------ */
const ORBITS = [
  { rx: 150, ry: 96, dur: 26 },
  { rx: 240, ry: 152, dur: 34, reverse: true },
  { rx: 330, ry: 208, dur: 44 },
];
const ORBIT_C = { x: 975, y: 300 };

function Orbit() {
  return (
    <Canvas>
      {ORBITS.map((o, i) => (
        <g key={i}>
          <ellipse
            cx={ORBIT_C.x}
            cy={ORBIT_C.y}
            rx={o.rx}
            ry={o.ry}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.45"
          />
          <g
            className={`hero-orbit${o.reverse ? " hero-orbit--rev" : ""}`}
            style={{
              transformOrigin: `${ORBIT_C.x}px ${ORBIT_C.y}px`,
              animationDuration: `${o.dur}s`,
            }}
          >
            <circle
              cx={ORBIT_C.x + o.rx}
              cy={ORBIT_C.y}
              r="5"
              fill="currentColor"
            />
            <circle
              cx={ORBIT_C.x - o.rx}
              cy={ORBIT_C.y}
              r="3.2"
              fill="currentColor"
              opacity="0.6"
            />
          </g>
        </g>
      ))}
      <circle
        cx={ORBIT_C.x}
        cy={ORBIT_C.y}
        r="6"
        className="hero-node--accent"
      />
    </Canvas>
  );
}

/* ------------------------------------------------------------------ *
 * radar — sweeping for signal (Case studies)
 * ------------------------------------------------------------------ */
const RADAR_C = { x: 950, y: 305 };
const BLIPS = [
  { x: 960, y: 220 },
  { x: 745, y: 400 },
  { x: 1010, y: 400 },
  { x: 800, y: 190 },
];

function Radar() {
  return (
    <Canvas>
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          className="hero-ping"
          style={{ animationDelay: `-${i * 2.2}s` }}
          cx={RADAR_C.x}
          cy={RADAR_C.y}
          r="80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      ))}
      <g
        className="hero-sweeper"
        style={{ transformOrigin: `${RADAR_C.x}px ${RADAR_C.y}px` }}
      >
        <line
          x1={RADAR_C.x}
          y1={RADAR_C.y}
          x2={RADAR_C.x + 330}
          y2={RADAR_C.y}
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </g>
      {BLIPS.map((b, i) => (
        <circle
          key={i}
          className="hero-node"
          style={{ animationDelay: `${i * 1.7}s` }}
          cx={b.x}
          cy={b.y}
          r="3.6"
        />
      ))}
    </Canvas>
  );
}

/* ------------------------------------------------------------------ *
 * contours — layered terrain (Case study detail)
 * ------------------------------------------------------------------ */
function Contours() {
  return (
    <Canvas>
      {Array.from({ length: 7 }, (_, i) => {
        const k = i * 26;
        return (
          <path
            key={i}
            className="hero-contour"
            style={{
              animationDelay: `${i * 1.3}s`,
              animationDuration: `${18 + i * 2}s`,
            }}
            d={`M -40 ${200 + k}
                C 220 ${120 + k}, 400 ${300 + k}, 640 ${220 + k}
                S 1000 ${110 + k}, 1240 ${210 + k}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        );
      })}
    </Canvas>
  );
}

/* ------------------------------------------------------------------ *
 * waveform — throughput over time (Blog)
 * ------------------------------------------------------------------ */
function Waveform() {
  const bars = Array.from({ length: 34 }, (_, i) => ({
    x: 70 + i * 33,
    h: 60 + Math.abs(Math.sin(i * 0.55)) * 150,
  }));

  return (
    <Canvas>
      {bars.map((b, i) => (
        <rect
          key={i}
          className="hero-wave"
          style={{
            animationDelay: `${(i % 12) * 0.35}s`,
            transformOrigin: `${b.x}px ${FIELD_H / 2 + 110}px`,
          }}
          x={b.x}
          y={FIELD_H / 2 + 110 - b.h}
          width="7"
          height={b.h}
          rx="3"
          fill="currentColor"
        />
      ))}
      <line
        x1="40"
        y1={FIELD_H / 2 + 110}
        x2={FIELD_W - 40}
        y2={FIELD_H / 2 + 110}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
    </Canvas>
  );
}

/* ------------------------------------------------------------------ *
 * pulse — a dot matrix rippling diagonally (Blog post)
 * ------------------------------------------------------------------ */
function Pulse() {
  const dots = [];
  for (let r = 0; r < 11; r += 1) {
    for (let c = 0; c < 22; c += 1) {
      dots.push({ x: 60 + c * 52, y: 60 + r * 52, d: (r + c) % 12 });
    }
  }

  return (
    <Canvas>
      {dots.map((d, i) => (
        <circle
          key={i}
          className="hero-dot"
          style={{ animationDelay: `${d.d * 0.28}s` }}
          cx={d.x}
          cy={d.y}
          r="2.6"
          fill="currentColor"
        />
      ))}
    </Canvas>
  );
}

/* ------------------------------------------------------------------ *
 * beacon — a signal going out (Contact)
 * ------------------------------------------------------------------ */
const BEACON = { x: 995, y: 305 };

function Beacon() {
  return (
    <Canvas>
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          className="hero-ring"
          style={{ animationDelay: `-${i * 1.6}s` }}
          cx={BEACON.x}
          cy={BEACON.y}
          r="60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      ))}
      <circle className="hero-node--accent" cx={BEACON.x} cy={BEACON.y} r="7" />
    </Canvas>
  );
}

export const HERO_FIELDS = {
  aisle: Aisle,
  conveyor: Conveyor,
  scan: Scan,
  flow: Flow,
  network: Network,
  orbit: Orbit,
  radar: Radar,
  contours: Contours,
  waveform: Waveform,
  pulse: Pulse,
  beacon: Beacon,
};
