import CTABand from "@/components/sections/CTABand";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";
import Hero from "@/components/sections/Hero";
import LeadingBand from "@/components/sections/LeadingBand";
import Positioning from "@/components/sections/Positioning";
import ProductsGrid from "@/components/sections/ProductsGrid";
import ServicesGrid from "@/components/sections/ServicesGrid";
import StatsBand from "@/components/sections/StatsBand";
import TrustStrip from "@/components/sections/TrustStrip";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { IT_PILLARS, getOfferServices } from "@/data/content";

export const metadata = {
  title: "Simpana Technologies — IT consulting, software, and supply chain",
  description:
    "Simpana delivers IT support, solutions, and consulting alongside real-time warehouse, inventory, and logistics software. Pune, India.",
  alternates: { canonical: "/" },
};

/**
 * Section order follows the live simpanatech.com home page: who we are, our
 * services, case studies, what we can offer, the closing statement, and the
 * contact block. The products section is kept in the middle - it is the part
 * of the catalogue the live site does not show off, and it is the strongest
 * thing on the page.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />

      <Positioning />

      <Section tone="tint" space="lg" bordered>
        <SectionHeading
          eyebrow="Our services"
          title="Support, solutions, and consulting."
          intro="Three ways we work with a business — keeping the environment running, building what it needs next, and questioning how it runs today."
        />
        <div className="mt-12">
          <ServicesGrid services={IT_PILLARS} detailed />
        </div>
      </Section>

      <Section space="lg">
        <SectionHeading
          eyebrow="Products"
          title="Seven systems, one supply chain."
          intro="Each ships with role-based access, activity logging, approval workflows, and reporting. Run one, or connect several across the same operation."
        />
        <div className="mt-12">
          <ProductsGrid />
        </div>
      </Section>

      <StatsBand tone="navy" />

      <Section space="lg">
        <SectionHeading
          eyebrow="Case study"
          title="Work that shipped."
          intro="Real systems for real operations. Full write-ups available on request."
        />
        <div className="mt-12">
          <CaseStudiesGrid />
        </div>
      </Section>

      <Section tone="tint" space="lg" bordered>
        <SectionHeading
          eyebrow="What we can offer you"
          title="Beyond the products."
          intro="Consulting, custom builds, and the infrastructure to keep all of it running."
        />
        <div className="mt-12">
          <ServicesGrid services={getOfferServices()} detailed />
        </div>
        <div className="mt-10">
          <Button href="/services" variant="secondary">
            All services
          </Button>
        </div>
      </Section>

      <LeadingBand />

      <CTABand
        title="Let's connect."
        copy="Tell us what you are trying to fix — an environment that keeps interrupting people, a process nobody trusts, or a system that needs building. We will come back with how we would approach it."
      />
    </>
  );
}
