import Link from "next/link";
import { notFound } from "next/navigation";
import CTABand from "@/components/sections/CTABand";
import PostsGrid from "@/components/sections/PostsGrid";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { POSTS, getPost } from "@/data/content";
import { formatDate, splitHeading } from "@/lib/format";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} — Simpana Technologies`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const heading = splitHeading(post.title);

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        backdrop="pulse"
        crumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
        title={heading.title}
        accent={heading.accent}
        intro={post.excerpt}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="onDark">{post.topic}</Badge>
          <Badge variant="onDark">{formatDate(post.date)}</Badge>
          <Badge variant="onDark">{post.readTime} read</Badge>
        </div>
      </PageHero>

      <Section space="lg">
        <article className="prose-simpana max-w-[68ch]">
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}

          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>

        <Card className="mt-10 max-w-[68ch] border-dashed p-6">
          <p className="text-sm leading-relaxed text-ink-600">
            <span className="font-semibold text-ink-800">Note:</span> sample
            article shipped with the build — replace with your own writing
            before launch.
          </p>
        </Card>
      </Section>

      <Section tone="tint" space="lg" bordered>
        <p className="eyebrow mb-6">Keep reading</p>
        <PostsGrid posts={related} />

        <nav
          aria-label="Blog"
          className="mt-12 flex flex-wrap items-center justify-between gap-4
                     border-t border-line pt-8"
        >
          <Link
            href="/blog"
            className="text-sm font-semibold text-brand-600 hover:text-brand-800"
          >
            ← All posts
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-ink-600 hover:text-brand-700"
          >
            Talk to us →
          </Link>
        </nav>
      </Section>

      <CTABand />
    </>
  );
}
