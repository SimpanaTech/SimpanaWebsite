"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Logo from "@/components/layout/Logo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { NAV } from "@/data/site";
import { useUIStore } from "@/store/uiStore";

const isActive = (pathname, href) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export default function Header() {
  const pathname = usePathname();
  const open = useUIStore((s) => s.mobileNavOpen);
  const toggle = useUIStore((s) => s.toggleMobileNav);
  const close = useUIStore((s) => s.closeMobileNav);

  // Close the drawer whenever the route changes.
  useEffect(() => close(), [pathname, close]);

  // Don't let the page scroll behind an open drawer.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <Container>
        {/*
          Mobile is a simple row (logo | burger). From lg the row becomes a
          three-column grid with equal-width outer columns, so the nav is
          centred on the page rather than in whatever space is left over
          between the logo and the CTA.
        */}
        <div
          className="flex h-[72px] items-center justify-between gap-6
                     "
        >
          <Logo />

          <div
            aria-label="Primary"
            className="hidden lg:block items-center justify-center mt-10"
          >
            <ul className="flex items-center justify-center gap-1">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-md px-3  py-2 text-[15px] items-center justify-center font-medium transition-colors ${
                        active
                          ? "text-brand-700"
                          : "text-ink-600 hover:text-brand-700"
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`mt-1 ml-3 block h-[2px] rounded-full bg-brand-600 transition-transform duration-200  ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="hidden lg:block lg:justify-self-end">
            <Button href="/contact" size="sm">
              Contact us
            </Button>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-lg
                       border border-line text-ink-700 lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-white lg:hidden"
      >
        <Container className="py-4">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={
                    isActive(pathname, item.href) ? "page" : undefined
                  }
                  className={`block border-b border-line py-3.5 text-[17px] font-medium ${
                    isActive(pathname, item.href)
                      ? "text-brand-700"
                      : "text-ink-700"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            href="/contact"
            size="lg"
            className="mt-5 w-full"
            onClick={close}
          >
            Contact us
          </Button>
        </Container>
      </div>
    </header>
  );
}
