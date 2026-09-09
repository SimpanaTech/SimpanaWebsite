import CTABand from "@/components/sections/CTABand";
import PostsGrid from "@/components/sections/PostsGrid";
import Card from "@/components/ui/Card";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { POSTS } from "@/data/content";
import { formatDate } from "@/lib/format";

export const metadata = {
  title: "Blog",
  description:
    "Practical writing on inventory, warehousing, and the software that runs them — from the team that builds it.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const featured = POSTS.find((p) => p.featured) ?? POSTS[0];
  const rest = POSTS.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <PageHero
        backdrop="waveform"
        crumbs={[{ label: "Blog" }]}
        title="Notes from"
        accent="the warehouse floor."
        intro="Practical writing on inventory, warehousing, and the software that runs them."
      />

      <Section space="lg">
        <Card href={`/blog/${featured.slug}`} className="p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
                <span className="font-semibold tracking-wide text-brand-600 uppercase">
                  {featured.topic}
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={featured.date}>
                  {formatDate(featured.date)}
                </time>
                <span aria-hidden="true">·</span>
                <span>{featured.readTime} read</span>
              </div>

              <h2 className="mt-4 text-2xl sm:text-3xl">{featured.title}</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-ink-600">
                {featured.excerpt}
              </p>
              <span
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold
                           text-brand-600 group-hover:text-brand-800"
              >
                Read the article
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
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
            </div>

            <div className="rounded-xl bg-brand-50 p-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-brand-700 uppercase">
                Featured
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                The piece we point people at most often when they ask which
                system they actually need.
              </p>
            </div>
          </div>
        </Card>

        <Card className="mt-8 border-dashed p-6">
          <p className="text-sm leading-relaxed text-ink-600">
            <span className="font-semibold text-ink-800">Note:</span> these
            articles are sample content shipped with the build — replace them
            with your own writing before launch.
          </p>
        </Card>
      </Section>

      <Section tone="tint" space="lg" bordered>
        <SectionHeading
          eyebrow="All posts"
          title="Everything we have written."
          intro="Short, specific pieces on the problems we keep meeting on site."
        />
        <div className="mt-12">
          <PostsGrid posts={rest} />
        </div>
      </Section>

      <CTABand
        title="Reading this because something is broken?"
        copy="Skip the article. Tell us what the operation is doing and we will answer specifically."
      />
    </>
  );
}
