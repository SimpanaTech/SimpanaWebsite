"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  // Close the drawer whenever the route changes.
  useEffect(() => close(), [pathname, close]);

  // Don't let the page scroll behind an open drawer.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The bar only earns its shadow once there is content behind it: flat while
  // the page sits at the top, lifted as soon as it scrolls under.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-shadow duration-200 ${
        scrolled
          ? "border-line bg-white/95 shadow-[var(--shadow-header)]"
          : "border-transparent bg-white/85"
      } backdrop-blur-md`}
    >
      <Container>
        {/*
          Mobile is a simple row (logo | burger). From lg it becomes a three
          column grid whose middle column takes the slack, so the nav is
          centred on the page rather than in whatever space happens to be left
          between the logo and the CTA.
        */}
        <div
          className="flex h-[72px] items-center justify-between gap-6
                     lg:grid lg:grid-cols-[auto_1fr_auto]"
        >
          <Logo />

          <nav aria-label="Primary" className="hidden lg:flex lg:justify-center">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative block rounded-lg px-3.5 py-2 text-[15px]
                                  font-medium transition-colors duration-200 ${
                                    active
                                      ? "text-brand-700"
                                      : "text-ink-600 hover:bg-brand-50/70 hover:text-brand-700"
                                  }`}
                    >
                      {item.label}
                      {/* Sits inside the link's horizontal padding so it spans
                          the label itself, and grows from the left on hover. */}
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-x-3.5 bottom-1 h-[2px]
                                    origin-left rounded-full bg-brand-600
                                    transition-transform duration-200 ${
                                      active
                                        ? "scale-x-100"
                                        : "scale-x-0 group-hover:scale-x-100"
                                    }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden lg:flex lg:justify-end">
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
            className="flex h-10 w-10 items-center justify-center rounded-lg border
                       border-line text-ink-700 transition-colors hover:border-brand-300
                       hover:text-brand-700 lg:hidden"
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
        <Container className="py-3">
          <ul className="flex flex-col">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-[17px]
                                font-medium transition-colors ${
                                  active
                                    ? "bg-brand-50 text-brand-700"
                                    : "text-ink-700 hover:bg-surface-2"
                                }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-5 w-[3px] flex-none rounded-full transition-colors ${
                        active ? "bg-brand-600" : "bg-transparent"
                      }`}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button
            href="/contact"
            size="lg"
            className="mt-4 mb-2 w-full"
            onClick={close}
          >
            Contact us
          </Button>
        </Container>
      </div>
    </header>
  );
}
