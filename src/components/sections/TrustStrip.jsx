import Container from "@/components/ui/Container";
import { INDUSTRIES } from "@/data/site";

/** Thin band listing the sectors Simpana works in. */
export default function TrustStrip({
  label = "Built for",
  items = INDUSTRIES,
}) {
  return (
    <div className="border-b border-line bg-surface-2">
      <Container className="flex flex-wrap items-center gap-x-8 gap-y-3 py-5">
        {/* The home page passes no label - its items are standalone facts
            rather than a list of one thing. */}
        {label ? (
          <span className="text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase">
            {label}
          </span>
        ) : null}
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="font-display text-[15px] font-semibold text-ink-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
