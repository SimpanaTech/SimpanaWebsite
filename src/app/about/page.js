import CTABand from "@/components/sections/CTABand";
import StatsBand from "@/components/sections/StatsBand";
import TrustStrip from "@/components/sections/TrustStrip";
import Card from "@/components/ui/Card";
import CheckList from "@/components/ui/CheckList";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { VALUES } from "@/data/content";

export const metadata = {
  title: "About",
  description:
    "Simpana is built on excellence, focus, and flexibility — IT consulting, offshore software development, testing, and interface design for the supply-chain world.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        backdrop="network"
        crumbs={[{ label: "About" }]}
        title="A team that treats software"
        accent="like operations."
        intro="Simpana is built on excellence, focus, and flexibility. We deliver IT consulting, offshore software development, testing, and interface design — mostly for the supply-chain world."
      />

      <TrustStrip label="We work in" />

      <Section space="lg">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-3">What we do</p>
            <h2 className="text-3xl sm:text-4xl">
              Warehousing, inventory, and the consulting around them.
            </h2>
            <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink-600">
              <p>
                We specialise in warehouse and inventory management systems,
                plus transportation tracking and scheduling. Alongside that we
                take on business-consulting work — studying how an operation
                actually runs, then finding where to improve and optimise it.
              </p>
              <p>
                Our projects range from simple information systems and websites
                to complex enterprise architectures — desktop and web apps,
                traditional n-tier, and service-oriented builds.
              </p>
            </div>
          </div>

          <Card className="p-8">
            <p className="eyebrow mb-5">The three rules</p>
            <CheckList
              items={[
                "On time. Dates are commitments, not estimates that drift.",
                "In scope. What was agreed is what ships — changes get discussed, not absorbed.",
                "Best work we can do. Including the parts nobody demos: logs, roles, reports, handover.",
              ]}
            />
          </Card>
        </div>
      </Section>

      <Section tone="tint" space="lg" bordered>
        <SectionHeading
          eyebrow="How we operate"
          title="Mission, vision, delivery."
          intro="Our mission combines work and talent. The rest follows from that."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value) => (
            <Card key={value.no} className="p-7" interactive>
              <span className="font-display text-3xl font-bold text-brand-200">
                {value.no}
              </span>
              <h3 className="mt-4 text-lg">{value.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-600">
                {value.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section space="lg">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="eyebrow mb-3">IT support &amp; solutions</p>
            <h3 className="text-2xl">A more robust environment</h3>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-600">
              With top-tier staff and personable IT support you get faster
              performance, less downtime, and fewer interruptions. We help
              implement a preventative and proactive maintenance programme that
              minimises the need to escalate time-sensitive issues, and respond
              quickly when something breaks.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">End to end</p>
            <h3 className="text-2xl">Systems that hold up</h3>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-600">
              We provide end-to-end services that empower employees, keep
              networks performing, and improve workflow. Through strategic
              deployment you see optimal uptime in mission-critical areas and
              seamless continuity — without an unreasonable bill.
            </p>
          </div>
        </div>
      </Section>

      <StatsBand />

      <CTABand
        title="Want to know how we would run it?"
        copy="Send us the operation and the constraint. We will come back with an approach, a shape, and an honest view on effort."
      />
    </>
  );
}
