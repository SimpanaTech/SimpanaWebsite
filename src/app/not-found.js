import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { NAV } from "@/data/site";
import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl sm:text-5xl">
        That page is not on the floor.
      </h1>
      <p className="mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-ink-600">
        The link is broken or the page has moved. Here is everything else.
      </p>

      <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
        {[...NAV, { href: "/contact", label: "Contact" }].map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex rounded-full border border-line bg-white px-4 py-2
                         text-sm font-medium text-ink-700 transition-colors
                         hover:border-brand-300 hover:text-brand-700"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Button href="/" size="lg">
          Back to home
        </Button>
      </div>
    </Container>
  );
}
