import Section from "@/components/ui/Section";
import { LEADING } from "@/data/content";

/**
 * The standalone statement the live home page sets as a "leading" callout.
 * Kept white and centred: it sits between a tinted band and the closing
 * contact card, and a third colour there would just make the page noisy.
 */
export default function LeadingBand() {
  return (
    <Section space="md" bordered>
      <div className="mx-auto max-w-3xl text-center">
        <span
          aria-hidden="true"
          className="mx-auto mb-7 block h-1 w-12 rounded-full bg-leaf-500"
        />
        <h2 className="text-3xl sm:text-4xl lg:text-[42px]">{LEADING.title}</h2>
        <p className="mt-5 text-[17px] leading-relaxed text-ink-600">
          {LEADING.body}
        </p>
      </div>
    </Section>
  );
}
