import CTABand from "@/components/sections/CTABand";
import CaseStudiesGrid from "@/components/sections/CaseStudiesGrid";
import StatsBand from "@/components/sections/StatsBand";
import Card from "@/components/ui/Card";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Case studies",
  description:
    "Asset maintenance management, a furniture retailer with eCommerce, and a B2B eCommerce implementation — systems Simpana built and what they fixed.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        backdrop="radar"
        crumbs={[{ label: "Case studies" }]}
        title="Systems we built, and what they fixed."
        intro="A few of the operations we have shipped software for. Get in touch for the full write-ups and references."
      />

      <Section space="lg">
        <SectionHeading
          eyebrow="Selected work"
          title="Three operations, three problems."
          intro="Client names are withheld until we have permission to publish them."
        />
        <div className="mt-12">
          <CaseStudiesGrid />
        </div>

        <Card className="mt-10 border-dashed p-6">
          <p className="text-sm leading-relaxed text-ink-600">
            <span className="font-semibold text-ink-800">Note:</span> full
            case-study write-ups are pending client permission. The pages linked
            above carry what we can publish today.
          </p>
        </Card>
      </Section>

      <StatsBand />

      <CTABand
        title="Got a similar problem?"
        copy="Describe it and we will tell you whether we have solved it before — and what it took."
      />
    </>
  );
}
