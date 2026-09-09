import Link from "next/link";
import { LogoMark } from "@/components/layout/Logo";
import Container from "@/components/ui/Container";
import { CONTACT, FOOTER_NAV, SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-200">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark />
              <span className="font-display text-[22px] font-bold tracking-tight text-white">
                {SITE.shortName}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              IT support, consulting, and solutions from Pune, India — plus
              seven supply-chain and business systems we built ourselves.
            </p>
          </div>

          {FOOTER_NAV.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-xs font-semibold tracking-[0.14em] text-white uppercase">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}-${link.label}`}>
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        className="text-sm transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm break-words transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7
                     text-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            © {SITE.name} {new Date().getFullYear()}. All rights reserved.
          </p>
          <p className="text-brand-300">
            {CONTACT.office} · {CONTACT.phone}
          </p>
        </div>
      </Container>
    </footer>
  );
}
