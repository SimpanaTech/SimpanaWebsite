import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import HeroBackdrop from "@/components/ui/HeroBackdrop";

/**
 * The header every interior page opens with: breadcrumb, H1, intro, and an
 * optional row of chips or buttons. Navy band so it reads as the page's
 * masthead against the white content below.
 */
export default function PageHero({
  crumbs = [],
  title,
  accent,
  intro,
  backdrop = "network",
  visual,
  children,
}) {
  return (
    <header className="relative overflow-hidden bg-brand-900">
      <HeroBackdrop size="sm" variant={backdrop} />

      <Container className="relative py-14 sm:py-20">
        <div
          className={`flex flex-col gap-10 ${
            visual ? "lg:flex-row lg:items-center lg:justify-between" : ""
          }`}
        >
          <div>
            <Breadcrumb items={crumbs} onDark />
            {/* `accent` is the payoff half of the title and is optional:
                pages whose heading is a single name rather than a two-part
                statement - a product, a post, a case study - pass none and
                run in Carter One throughout. */}
            <h1 className="hero-title max-w-4xl text-[clamp(1.75rem,3.4vw,2.75rem)] text-white">
              {title}
              {accent ? (
                <span className="hero-title-accent">{accent}</span>
              ) : null}
            </h1>
            {intro ? (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-200">
                {intro}
              </p>
            ) : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>

          {visual ? (
            <div className="hidden shrink-0 lg:block">{visual}</div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
