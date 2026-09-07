import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { CASES } from "@/data/content";

export default function CaseStudiesGrid({ cases = CASES }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cases.map((study) => (
        <Card
          key={study.slug}
          href={`/case-studies/${study.slug}`}
          className="p-7"
        >
          <Badge variant="leaf" className="self-start">
            {study.tag}
          </Badge>
          <h3 className="mt-5 text-lg">{study.title}</h3>
          <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-600">
            {study.card}
          </p>
          <span
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold
                       text-brand-600 transition-colors group-hover:text-brand-800"
          >
            Read the case study
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
          </span>
        </Card>
      ))}
    </div>
  );
}
