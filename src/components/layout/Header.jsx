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
  /** href of the desktop dropdown that is open, or null. */
  const [menu, setMenu] = useState(null);
  /** href of the expanded section in the mobile drawer, or null. */
  const [section, setSection] = useState(null);

  // Close the drawer whenever the route changes.
  useEffect(() => close(), [pathname, close]);

  // Escape closes the open dropdown, wherever focus happens to be.
  useEffect(() => {
    if (!menu) return;
    const onKey = (event) => {
      if (event.key === "Escape") setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

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
                const hasMenu = Boolean(item.children?.length);
                const isOpen = hasMenu && menu === item.href;

                return (
                  <li
                    key={item.href}
                    className="relative"
                    // Pointer opens on hover; keyboard opens on focus. `onBlur`
                    // fires as focus moves between children too, so the check
                    // below asks whether focus actually left the item.
                    onMouseEnter={hasMenu ? () => setMenu(item.href) : undefined}
                    onMouseLeave={hasMenu ? () => setMenu(null) : undefined}
                    onFocus={hasMenu ? () => setMenu(item.href) : undefined}
                    onBlur={
                      hasMenu
                        ? (event) => {
                            if (!event.currentTarget.contains(event.relatedTarget)) {
                              setMenu(null);
                            }
                          }
                        : undefined
                    }
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenu(null)}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={hasMenu ? isOpen : undefined}
                      aria-controls={hasMenu ? `menu-${item.label}` : undefined}
                      className={`group relative flex items-center gap-1.5 rounded-lg px-3.5
                                  py-2 text-[15px] font-medium transition-colors duration-200 ${
                                    active
                                      ? "text-brand-700"
                                      : "text-ink-600 hover:bg-brand-50/70 hover:text-brand-700"
                                  }`}
                    >
                      {item.label}
                      {hasMenu ? (
                        <svg
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                          className={`h-3 w-3 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            d="M4 6.5l4 4 4-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : null}
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

                    {hasMenu ? (
                      <div
                        id={`menu-${item.label}`}
                        hidden={!isOpen}
                        className="absolute top-full left-1/2 z-10 w-[300px] -translate-x-1/2 pt-2"
                      >
                        <div className="overflow-hidden rounded-xl border border-line bg-white p-2 shadow-[var(--shadow-card-hover)]">
                          <ul className="flex flex-col">
                            {item.children.map((child) => {
                              const childActive = pathname.startsWith(child.href);
                              return (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setMenu(null)}
                                    aria-current={childActive ? "page" : undefined}
                                    className={`flex items-baseline gap-2.5 rounded-lg px-3 py-2
                                                transition-colors ${
                                                  childActive
                                                    ? "bg-brand-50 text-brand-700"
                                                    : "text-ink-700 hover:bg-surface-2 hover:text-brand-700"
                                                }`}
                                  >
                                    <span className="w-11 flex-none font-display text-[11px] font-bold tracking-wide text-brand-500">
                                      {child.code}
                                    </span>
                                    <span className="text-[14.5px] font-medium">
                                      {child.label}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                          <Link
                            href={item.href}
                            onClick={() => setMenu(null)}
                            className="mt-1 flex items-center gap-1.5 border-t border-line px-3 pt-3 pb-1.5
                                       text-sm font-semibold text-brand-600 hover:text-brand-800"
                          >
                            All {item.label.toLowerCase()}
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
                          </Link>
                        </div>
                      </div>
                    ) : null}
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
              const hasMenu = Boolean(item.children?.length);
              const expanded = hasMenu && section === item.href;

              return (
                <li key={item.href}>
                  {/* The row is a link plus, where there are children, a
                      separate toggle - so tapping "Products" still goes to the
                      products page instead of only opening a list. */}
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={`flex flex-1 items-center gap-3 rounded-lg px-3 py-3 text-[17px]
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

                    {hasMenu ? (
                      <button
                        type="button"
                        onClick={() => setSection(expanded ? null : item.href)}
                        aria-expanded={expanded}
                        aria-controls={`drawer-${item.label}`}
                        aria-label={`${expanded ? "Hide" : "Show"} ${item.label.toLowerCase()}`}
                        className="flex h-11 w-11 flex-none items-center justify-center rounded-lg
                                   text-ink-600 transition-colors hover:bg-surface-2 hover:text-brand-700"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                          className={`h-4 w-4 transition-transform duration-200 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            d="M4 6.5l4 4 4-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    ) : null}
                  </div>

                  {hasMenu ? (
                    <ul
                      id={`drawer-${item.label}`}
                      hidden={!expanded}
                      className="mb-1 ml-3 flex flex-col border-l border-line pl-3"
                    >
                      {item.children.map((child) => {
                        const childActive = pathname.startsWith(child.href);
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={close}
                              aria-current={childActive ? "page" : undefined}
                              className={`flex items-baseline gap-2.5 rounded-lg px-3 py-2.5
                                          transition-colors ${
                                            childActive
                                              ? "text-brand-700"
                                              : "text-ink-600 hover:bg-surface-2"
                                          }`}
                            >
                              <span className="w-11 flex-none font-display text-[11px] font-bold tracking-wide text-brand-500">
                                {child.code}
                              </span>
                              <span className="text-[15px] font-medium">
                                {child.label}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
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
