import Link from "next/link";
import Card from "@/components/ui/Card";
import CheckList from "@/components/ui/CheckList";
import Icon from "@/components/ui/Icon";
import { IT_PILLARS } from "@/data/content";

/**
 * The three service pillars. Each card leads with the promise - the outcome a
 * buyer is actually shopping for - then the reasoning, then what is in scope,
 * then its own way in. Distinct enough from ServicesGrid to be its own thing:
 * the promise line and the per-card CTA are what make it convert.
 */
export default function PillarsGrid({ pillars = IT_PILLARS }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {pillars.map((pillar) => (
        <Card key={pillar.no} className="p-7" interactive>
          <span
            className="mb-5 inline-flex h-11 w-11 items-center justify-center
                       rounded-xl bg-brand-50 text-brand-600
                       transition-colors group-hover:bg-brand-600 group-hover:text-white"
          >
            <Icon name={pillar.icon} />
          </span>

          <h3 className="text-lg">{pillar.title}</h3>

          <p className="mt-2.5 text-[15px] leading-relaxed font-medium text-ink-800">
            {pillar.promise}
          </p>

          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
            {pillar.body}
          </p>

          {pillar.points?.length ? (
            <CheckList items={pillar.points} className="mt-5" />
          ) : null}

          {/* `mt-auto` pins every card's link to the bottom, so the three sit
              on one line however unevenly the copy above them wraps. */}
          <Link
            href={pillar.cta.href}
            className="mt-auto inline-flex items-center gap-1.5 self-start pt-7
                       text-sm font-semibold text-brand-600 transition-colors
                       hover:text-brand-800"
          >
            {pillar.cta.label}
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <path
                d="M3 8h9M8.5 4l4 4-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </Card>
      ))}
    </div>
  );
}
