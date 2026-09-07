import Link from "next/link";
import { notFound } from "next/navigation";
import CTABand from "@/components/sections/CTABand";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import CheckList from "@/components/ui/CheckList";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { CASES, getCase } from "@/data/content";

export function generateStaticParams() {
  return CASES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) return { title: "Case study not found" };

  return {
    title: study.title,
    description: study.short,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: `${study.title} — Simpana Technologies`,
      description: study.short,
      url: `/case-studies/${study.slug}`,
    },
  };
}

export default async function CaseDetailPage({ params }) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) notFound();

  const index = CASES.findIndex((c) => c.slug === study.slug);
  const next = CASES[(index + 1) % CASES.length];

  return (
    <>
      <PageHero
        backdrop="contours"
        crumbs={[
          { label: "Case studies", href: "/case-studies" },
          { label: study.title },
        ]}
        title={study.title}
        intro={study.short}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="onDark">{study.tag}</Badge>
          {study.featured ? <Badge variant="onDark">Featured</Badge> : null}
        </div>
      </PageHero>

      <Section space="lg">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div>
            <p className="eyebrow mb-3">The work</p>
            <div className="space-y-5 text-[17px] leading-relaxed text-ink-600">
              {study.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <Card className="h-fit p-7">
            <p className="eyebrow mb-5">Highlights</p>
            <CheckList items={study.highlights} />
          </Card>
        </div>
      </Section>

      {study.features?.length ? (
        <Section tone="tint" space="lg" bordered>
          <SectionHeading
            eyebrow="Delivered"
            title="Everything that shipped."
            intro="The high-level feature set implemented in this application."
          />
          <div className="mt-10 flex flex-wrap gap-2.5">
            {study.features.map((feature) => (
              <Badge key={feature} className="bg-white">
                {feature}
              </Badge>
            ))}
          </div>
        </Section>
      ) : null}

      <Section space="sm">
        {study.detailPending ? (
          <Card className="mb-8 border-dashed p-6">
            <p className="text-sm leading-relaxed text-ink-600">
              <span className="font-semibold text-ink-800">Note:</span> summary
              only — the full write-up for this project is pending client
              permission. Ask us for the detail and references.
            </p>
          </Card>
        ) : null}

        <nav
          aria-label="More case studies"
          className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8"
        >
          <Link
            href="/case-studies"
            className="text-sm font-semibold text-brand-600 hover:text-brand-800"
          >
            ← All case studies
          </Link>
          <Link
            href={`/case-studies/${next.slug}`}
            className="text-sm font-medium text-ink-600 hover:text-brand-700"
          >
            {next.title} →
          </Link>
        </nav>
      </Section>

      <CTABand
        title="Want the full story?"
        copy="We will walk you through the build, the constraints, and what we would do differently — and put you in touch with a reference where we can."
      />
    </>
  );
}
