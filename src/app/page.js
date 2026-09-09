import Image from "next/image";
import CTABand from "@/components/sections/CTABand";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";
import Hero from "@/components/sections/Hero";
import NumberedSteps from "@/components/sections/NumberedSteps";
import OperationFlow from "@/components/sections/OperationFlow";
import PillarsGrid from "@/components/sections/PillarsGrid";
import ProductsGrid from "@/components/sections/ProductsGrid";
import TrustStrip from "@/components/sections/TrustStrip";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  AUDIENCE,
  ENGAGEMENT,
  HERO_TRUST,
  HOUSE_RULES,
  PRIMARY_CTA,
} from "@/data/content";
import { INDUSTRIES } from "@/data/site";

const TITLE = "IT Support, Consulting & Solutions in Pune | Simpana Technologies";
const DESCRIPTION =
  "Pune-based IT company offering managed IT support, business consulting, and custom software — including seven deployed warehouse, inventory, and POS systems.";

export const metadata = {
  // Written out in full: Next applies a layout's `title.template` to child
  // segments only, and this page shares the root segment with that layout.
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  // Overrides the root layout's warehouse-led defaults, which would otherwise
  // put the old positioning on every share of the home page.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
  },
};

/**
 * Services lead, products prove.
 *
 * The seven shipped systems are no longer the offer - they are the reason to
 * believe the three service pillars above them, which is something no other
 * IT support shop in Pune can claim. Section order follows homepage copy v2.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip label={null} items={HERO_TRUST} />

      <Section space="lg">
        <SectionHeading
          eyebrow="What we do"
          title="Three ways we work with a business."
          intro="Keep the environment running. Build what it needs next. Question how it runs today."
        />

        {/* Overview first, then the detail. The diagram's three panels are the
            same three pillars as the cards below it. */}
        <figure className="mt-12 overflow-hidden rounded-2xl border border-line shadow-[var(--shadow-card)]">
          <Image
            src="/images/what-we-do.webp"
            alt="Three panels: Keep It Running — helpdesk and monitoring across servers; Fix What Doesn't — cloud migration and custom builds; Build What's Missing — the Simpana products WMS, IMS, TMS, and CWMS, all wired together."
            width={2200}
            height={1233}
            sizes="(min-width: 1200px) 1136px, 100vw"
            className="h-auto w-full"
          />
        </figure>

        <div className="mt-12">
          <PillarsGrid />
        </div>
      </Section>

      <Section tone="tint" space="lg" bordered>
        <SectionHeading
          eyebrow="Proof"
          title="We don't just recommend systems. We've shipped seven."
          intro="Every one of these is live in a real operation. Role-based access, activity logging, approval workflows, and reporting come standard. Run one, or connect several across the same business."
        />
        <div className="mt-12">
          <ProductsGrid />
        </div>

        {/* The operation-flow panel belongs to WMS, so it sits with the
            products rather than above the fold. */}
        <div className="relative mt-14 overflow-hidden rounded-2xl bg-brand-900 px-7 py-10 sm:px-12 sm:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-16 h-80 w-80
                       rounded-full bg-brand-600/30 blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-14">
            <div>
              <p className="eyebrow text-brand-300">Inside WMS</p>
              <h3 className="mt-3 text-2xl text-white sm:text-3xl">
                Goods in to dispatch, on one record.
              </h3>
              <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-brand-200">
                Building these is why our consulting isn&apos;t theoretical.
                We&apos;ve had to make these decisions on our own systems first.
              </p>
              <div className="mt-8">
                <Button href="/products">Explore the products</Button>
              </div>
            </div>

            <OperationFlow />
          </div>
        </div>
      </Section>

      <Section space="lg">
        <SectionHeading
          eyebrow="How we work"
          title="Three rules we hold ourselves to."
        />
        <div className="mt-12">
          <NumberedSteps steps={HOUSE_RULES} />
        </div>
      </Section>

      <Section tone="tint" space="lg" bordered>
        <SectionHeading
          eyebrow="Case studies"
          title="Work that shipped."
          intro="Real systems, real operations. Full write-ups on request."
        />
        <div className="mt-12">
          <CaseStudiesGrid />
        </div>
      </Section>

      <Section space="lg">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Who we work with</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px]">
              {AUDIENCE.title}
            </h2>
          </div>
          <div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {INDUSTRIES.map((industry) => (
                <li
                  key={industry}
                  className="font-display text-[15px] font-semibold text-ink-700"
                >
                  {industry}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-600">
              {AUDIENCE.body}
            </p>
          </div>
        </div>
      </Section>

      <Section tone="tint" space="lg" bordered>
        <SectionHeading
          eyebrow="Engagement"
          title="How an engagement starts."
        />
        <div className="mt-12">
          <NumberedSteps steps={ENGAGEMENT} columns={4} />
        </div>
      </Section>

      <CTABand
        title="Tell us what's not working."
        copy="Whether it's an environment that keeps interrupting people, a process nobody trusts, or a system that needs building — describe it and we'll come back with how we'd approach it. No obligation, no scripted discovery call."
        action={PRIMARY_CTA}
      />
    </>
  );
}
