/**
 * box — a counted catalogue grid with a low-stock alert (Inventory Management)
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

/* A grid of catalogued items kept inside the window the navy scrim leaves
 * visible (~x 650-1150, y 90-480), each with a batch/serial marker, with two
 * items flagged as running low. */
const COLS = 7;
const ROWS = 5;
const CELL = 68;
const BOX = 38;
const ORIGIN_X = 684;
const ORIGIN_Y = 118;

const ITEMS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  return { x: ORIGIN_X + col * CELL, y: ORIGIN_Y + row * CELL, i };
});

/* two items called out as low-stock, each getting an alert ring */
const LOW_STOCK = [16, 32];

/* a short batch/serial barcode label beneath the grid */
const BARCODE_BARS = Array.from({ length: 12 }, (_, i) => ({
  x: 980 + i * 8,
  w: 2 + (i % 3),
}));

function BoxMotif() {
  return (
    <Canvas>
      {/* catalogue grid: one square per stocked item */}
      <g opacity="0.4">
        {ITEMS.map((it) => (
          <rect
            key={it.i}
            x={it.x}
            y={it.y}
            width={BOX}
            height={BOX}
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        ))}
      </g>

      {/* batch / serial markers, one per item; alternating cells pulse so the
          grid doesn't out-animate the other motifs in the set — the rest sit
          as plain static dots to keep the same visual density. */}
      {ITEMS.filter((it) => !LOW_STOCK.includes(it.i)).map((it) =>
        it.i % 2 === 0 ? (
          <circle
            key={it.i}
            className="hero-node"
            style={{ animationDelay: `${(it.i % 5) * 1.4}s` }}
            cx={it.x + 8}
            cy={it.y + 8}
            r="2.4"
          />
        ) : (
          <circle
            key={it.i}
            cx={it.x + 8}
            cy={it.y + 8}
            r="2.4"
            fill="currentColor"
            opacity="0.35"
          />
        )
      )}

      {/* low-stock alerts: brighter marker plus an outward alert ring */}
      {LOW_STOCK.map((idx, li) => {
        const it = ITEMS[idx];
        const cx = it.x + BOX / 2;
        const cy = it.y + BOX / 2;
        return (
          <g key={idx}>
            {[0, 1, 2].map((i) => (
              <circle
                key={i}
                className="hero-ring"
                style={{ animationDelay: `-${li * 2.6 + i * 2.6}s` }}
                cx={cx}
                cy={cy}
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            ))}
            <circle
              className="hero-node--accent"
              style={{ animationDelay: `${li * 0.8}s` }}
              cx={cx}
              cy={cy}
              r="5"
            />
          </g>
        );
      })}

      {/* batch & serial barcode label */}
      <g opacity="0.75">
        {BARCODE_BARS.map((b, i) => (
          <rect
            key={i}
            className="hero-bar"
            style={{ animationDelay: `${(i % 9) * 0.5}s` }}
            x={b.x}
            y="442"
            width={b.w}
            height="26"
            fill="currentColor"
          />
        ))}
      </g>
    </Canvas>
  );
}

export default BoxMotif;
