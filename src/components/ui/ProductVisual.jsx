import Icon from "@/components/ui/Icon";

/**
 * Abstract UI "screen" mockups standing in for real product screenshots -
 * the site doesn't have any yet. Built entirely from divs so they cost no
 * asset weight, never break in the static export, and always match the
 * brand palette. Purely illustrative: no real numbers or copy, just shape.
 */

const BAR_HEIGHTS = [38, 62, 48, 80, 58, 92, 44, 70];
const ROW_STATUS = ["bg-leaf-500", "bg-brand-400", "bg-leaf-500", "bg-ink-300"];
const KANBAN_COLS = [2, 3, 2];

function Chrome() {
  return (
    <div className="mb-3 flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full bg-ink-900/10" />
      <span className="h-2 w-2 rounded-full bg-ink-900/10" />
      <span className="h-2 w-2 rounded-full bg-ink-900/10" />
      <span className="ml-2 h-4 flex-1 rounded-full border border-line bg-white/80" />
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <div className="mb-2 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md border border-line bg-white p-2">
            <span className="mb-1.5 block h-1.5 w-6 rounded-full bg-brand-200" />
            <span className="block h-2.5 w-8 rounded bg-ink-800/70" />
          </div>
        ))}
      </div>
      <div className="flex h-14 items-end gap-1.5 rounded-md border border-line bg-white p-2 sm:h-20">
        {BAR_HEIGHTS.map((h, i) => (
          <span
            key={i}
            className="min-h-1 flex-1 rounded-sm bg-brand-400"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </>
  );
}

function Table() {
  return (
    <div className="space-y-1.5">
      {ROW_STATUS.map((color, i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-md border border-line bg-white px-2.5 py-2"
        >
          <span className={`h-1.5 w-1.5 flex-none rounded-full ${color}`} />
          <span className="h-1.5 flex-1 rounded-full bg-ink-100" />
          <span className="h-1.5 w-10 flex-none rounded-full bg-brand-100" />
        </div>
      ))}
    </div>
  );
}

function Mobile() {
  return (
    <div className="mx-auto w-28 rounded-2xl border border-line bg-white p-2 shadow-sm">
      <div className="relative mb-2 h-20 overflow-hidden rounded-lg bg-brand-900">
        <span className="absolute left-1.5 top-1.5 h-3 w-3 border-t-2 border-l-2 border-leaf-400" />
        <span className="absolute right-1.5 top-1.5 h-3 w-3 border-t-2 border-r-2 border-leaf-400" />
        <span className="absolute bottom-1.5 left-1.5 h-3 w-3 border-b-2 border-l-2 border-leaf-400" />
        <span className="absolute right-1.5 bottom-1.5 h-3 w-3 border-r-2 border-b-2 border-leaf-400" />
        <span className="hero-scanline absolute inset-x-2 top-1/2 h-px bg-leaf-400" />
      </div>
      <span className="mb-1 block h-1.5 w-full rounded-full bg-ink-100" />
      <span className="block h-1.5 w-2/3 rounded-full bg-ink-100" />
    </div>
  );
}

function Kanban() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {KANBAN_COLS.map((count, colIndex) => (
        <div key={colIndex} className="space-y-1.5">
          <span className="mb-1 block h-1.5 w-6 rounded-full bg-brand-300" />
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="h-6 rounded-md border border-line bg-white" />
          ))}
        </div>
      ))}
    </div>
  );
}

const SCENES = { dashboard: Dashboard, table: Table, mobile: Mobile, kanban: Kanban };

/** Ordered scenes per product icon, so each product's gallery feels distinct. */
const ICON_SCENES = {
  warehouse: ["dashboard", "table", "mobile"],
  box: ["table", "dashboard", "mobile"],
  cart: ["mobile", "table", "dashboard"],
  flask: ["table", "dashboard", "mobile"],
  tool: ["kanban", "table", "dashboard"],
  school: ["kanban", "dashboard", "table"],
  calendar: ["kanban", "dashboard", "table"],
};

const SCENE_LABELS = {
  dashboard: "Live dashboard",
  table: "Daily operations",
  mobile: "Mobile & scanning",
  kanban: "Workflow board",
};

export function getProductScenes(product) {
  return ICON_SCENES[product.icon] ?? ["dashboard", "table", "mobile"];
}

export function getSceneLabel(variant) {
  return SCENE_LABELS[variant] ?? "Overview";
}

export default function ProductVisual({
  product,
  variant = "dashboard",
  className = "",
}) {
  const Scene = SCENES[variant] ?? Dashboard;

  return (
    <div
      className={`relative flex flex-col overflow-hidden bg-gradient-to-br
                  from-brand-50 via-surface-2 to-white ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          color: "var(--color-brand-900)",
        }}
      />

      <div className="relative flex flex-1 flex-col justify-center p-4">
        <Chrome />
        <Scene />
      </div>

      {product ? (
        <span
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center
                     justify-center rounded-lg bg-white text-brand-600 shadow-sm"
        >
          <Icon name={product.icon} className="h-4 w-4" />
        </span>
      ) : null}
    </div>
  );
}
