import Section from "@/components/ui/Section";
import { POSITIONING } from "@/data/content";

/**
 * The company statement the live site opens with, paired with the three rules
 * it says the work is held to. Statement on the left, rules on the right, so
 * the claim and the thing that backs it sit on the same screen.
 */
export default function Positioning() {
  return (
    <Section space="lg">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-3">Who we are</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px]">
            Excellence, passion, and flexibility.
          </h2>
          {POSITIONING.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mt-5 text-[17px] leading-relaxed text-ink-600"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="lg:pt-2">
          <p className="eyebrow mb-6">Three rules we work to</p>
          <ol className="space-y-7">
            {POSITIONING.rules.map((rule) => (
              <li key={rule.no} className="flex gap-4">
                <span
                  className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center
                             rounded-lg bg-brand-50 font-display text-sm font-bold
                             text-brand-600"
                >
                  {rule.no}
                </span>
                <div>
                  <h3 className="text-lg">{rule.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">
                    {rule.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
