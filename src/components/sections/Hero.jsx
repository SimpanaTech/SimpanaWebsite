import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import HeroBackdrop from "@/components/ui/HeroBackdrop";
import { HERO, PRIMARY_CTA, SECONDARY_CTA } from "@/data/content";

/**
 * Home page hero. Services-led: the headline maps one clause to each of the
 * three pillars, with the third - the part competitors cannot claim - set in
 * brand blue.
 *
 * Copy left, photograph right, figures along the bottom of the copy column.
 * The figures are unverified claims; see the warning on HERO.stats.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-900">
      <HeroBackdrop variant="aisle" />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="animate-rise">
            <p className="eyebrow text-brand-300">{HERO.eyebrow}</p>

            {/* One heading, three lines - the break is typographic, so the
                spans stay inside a single h1.

                Face, weight, tracking and leading come from `.hero-title`,
                shared with every interior page header.

                Size is fluid and capped lower than Manrope was: Carter One
                sets roughly 20% wider per character, so at a fixed 48px the
                longest clause overruns this ~590px column and the three-line
                structure collapses. It carries the same visual weight at 40px
                that Manrope had at 48px. */}
            <h1
              className="hero-title mt-5 text-[clamp(1.625rem,3.2vw,3.5rem)] text-white"
            >
              {HERO.title.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="hero-title-accent">{HERO.title.accent}</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-brand-200">
              {HERO.intro}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={PRIMARY_CTA.href} size="lg">
                {PRIMARY_CTA.label}
              </Button>
              <Button href={SECONDARY_CTA.href} variant="ghost" size="lg">
                {SECONDARY_CTA.label}
              </Button>
            </div>

            <dl className="mt-11 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {HERO.stats.map((stat) => (
                // Reversed so the figure reads first but the markup stays a
                // real term/description pair rather than a duplicated label.
                <div key={stat.label} className="flex flex-col-reverse gap-1.5">
                  <dt className="text-sm leading-snug text-brand-300">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-rise relative [animation-delay:120ms]">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br
                         from-brand-400/25 via-leaf-400/10 to-transparent blur-2xl"
            />

            <div className="relative overflow-hidden rounded-2xl border border-white/12 shadow-2xl">
              <Image
                src={HERO.image}
                alt={HERO.imageAlt}
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-full w-full object-cover"
                priority
              />
            </div>

            {/* Sits on the panel's lower-left corner. Hidden below sm, where
                it would cover most of the photograph. */}
            <div
              className="absolute -bottom-5 left-4 hidden rounded-xl bg-white px-4 py-3
                         shadow-lg sm:left-6 sm:block"
            >
              <p className="flex items-center gap-2 text-[15px] font-semibold text-ink-900">
                <span className="h-2.5 w-2.5 rounded-full bg-leaf-500" />
                {HERO.badge.title}
              </p>
              <p className="mt-0.5 text-sm text-ink-600">{HERO.badge.body}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
