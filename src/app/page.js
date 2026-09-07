import CTABand from "@/components/sections/CTABand";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";
import Hero from "@/components/sections/Hero";
import PostsGrid from "@/components/sections/PostsGrid";
import ProductsGrid from "@/components/sections/ProductsGrid";
import ServicesGrid from "@/components/sections/ServicesGrid";
import StatsBand from "@/components/sections/StatsBand";
import TrustStrip from "@/components/sections/TrustStrip";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { POSTS } from "@/data/content";

export const metadata = {
  title: "Simpana Technologies — warehouse & supply-chain software",
  description:
    "Simpana builds and operates real-time warehouse, inventory, and logistics software for 3PLs, distributors, and manufacturers. Pune, India.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />

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

      <Section tone="tint" space="lg" bordered>
        <SectionHeading
          eyebrow="Services"
          title="Beyond the products."
          intro="Consulting, custom builds, and the infrastructure to keep everything running."
        />
        <div className="mt-12">
          <ServicesGrid />
        </div>
        <div className="mt-10">
          <Button href="/services" variant="secondary">
            All services
          </Button>
        </div>
      </Section>

      <StatsBand tone="navy" />

      <Section space="lg">
        <SectionHeading
          eyebrow="Case studies"
          title="Work that shipped."
          intro="Real systems for real operations. Full write-ups available on request."
        />
        <div className="mt-12">
          <CaseStudiesGrid />
        </div>
      </Section>

      <Section tone="tint" space="lg" bordered>
        <SectionHeading
          eyebrow="Insights"
          title="Notes from the warehouse floor."
          intro="Practical writing on inventory, warehousing, and the software that runs them."
        />
        <div className="mt-12">
          <PostsGrid posts={POSTS.slice(0, 3)} />
        </div>
        <div className="mt-10">
          <Button href="/blog" variant="secondary">
            Read the blog
          </Button>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
