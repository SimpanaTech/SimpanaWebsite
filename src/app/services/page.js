import CTABand from "@/components/sections/CTABand";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { EDUCATION_BLOCKS } from "@/data/content";

export const metadata = {
  title: "Services",
  description:
    "Warehouse and inventory systems, supply-chain management, web development, SAP solutions, hosting and cloud, and managed IT — built around the supply-chain domain.",
  alternates: { canonical: "/services" },
};

const STEPS = [
  { n: "01", label: "Process study on site" },
  { n: "02", label: "Scope, roles, and reporting agreed" },
  { n: "03", label: "Build, with checkpoints against the floor" },
  { n: "04", label: "Pilot on one zone or one client" },
  { n: "05", label: "Rollout, training, and handover" },
  { n: "06", label: "Managed support and monitoring" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        backdrop="flow"
        crumbs={[{ label: "Services" }]}
        title="From consulting to"
        accent="the systems that run daily."
        intro="We focus on the supply-chain domain — warehousing, inventory, transportation — and build the surrounding software and infrastructure to match."
      >
        <div className="flex flex-wrap gap-2">
          {[
            "Warehouse & inventory",
            "Supply chain",
            "Web",
            "SAP",
            "Cloud",
            "Managed IT",
          ].map((tag) => (
            <Badge key={tag} variant="onDark">
              {tag}
            </Badge>
          ))}
        </div>
      </PageHero>

      <Section space="lg">
        <SectionHeading
          eyebrow="Services"
          title="Six ways we work with you."
          intro="Every engagement ends with something running — not a deck."
        />
        <div className="mt-12">
          <ServicesGrid detailed />
        </div>
      </Section>

      <Section tone="tint" space="lg" bordered>
        <SectionHeading
          eyebrow="Education"
          title="A second domain we know well."
          intro="We have delivered medium to large projects across the education sector — from websites to full school management systems."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {EDUCATION_BLOCKS.map((block) => (
            <Card key={block.no} className="p-7" interactive>
              <span
                className="mb-5 inline-flex h-11 w-11 items-center justify-center
                           rounded-xl bg-leaf-50 text-leaf-700"
              >
                <Icon name={block.icon} />
              </span>
              <h3 className="text-lg">{block.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-600">
                {block.body}
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/products/school-management" variant="secondary">
            See the School Management System
          </Button>
        </div>
      </Section>

      <Section space="lg">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-3">How an engagement runs</p>
            <h2 className="text-3xl sm:text-4xl">
              Study the operation, then build to it.
            </h2>
            <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink-600">
              <p>
                Our consulting work starts on the floor: we study existing
                business processes and look for where they can be enhanced,
                improved, and optimised. That work is deep and deliberate —
                planned with precision, delivered with responsibility.
              </p>
              <p>
                Only then do we decide what gets built, what gets configured,
                and what should be left alone. It is the difference between
                software that fits an operation and software an operation works
                around.
              </p>
            </div>
          </div>

          <ol className="space-y-3">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="flex items-center gap-4 rounded-xl border border-line
                           bg-white px-5 py-4"
              >
                <span
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-lg
                             bg-brand-50 text-sm font-bold text-brand-700"
                >
                  {step.n}
                </span>
                <span className="text-[15px] font-medium text-ink-700">
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <CTABand
        title="Not sure which service you need?"
        copy="Describe the operation and the constraint. We will tell you which of these actually applies — including when the answer is none of them."
      />
    </>
  );
}
