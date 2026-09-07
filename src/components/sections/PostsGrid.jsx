import Card from "@/components/ui/Card";
import { formatDate } from "@/lib/format";

export default function PostsGrid({ posts = [], columns = 3 }) {
  const cols =
    columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-6 ${cols}`}>
      {posts.map((post) => (
        <Card key={post.slug} href={`/blog/${post.slug}`} className="p-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
            <span className="font-semibold tracking-wide text-brand-600 uppercase">
              {post.topic}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} read</span>
          </div>

          <h3 className="mt-4 text-lg">{post.title}</h3>
          <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-600">
            {post.excerpt}
          </p>

          <span
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold
                       text-brand-600 transition-colors group-hover:text-brand-800"
          >
            Read article
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
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
        </Card>
      ))}
    </div>
  );
}
