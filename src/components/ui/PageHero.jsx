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
  intro,
  backdrop = "network",
  children,
}) {
  return (
    <header className="relative overflow-hidden bg-brand-900">
      <HeroBackdrop size="sm" variant={backdrop} />

      <Container className="relative py-14 sm:py-20">
        <Breadcrumb items={crumbs} onDark />
        <h1 className="max-w-4xl text-4xl text-white sm:text-5xl lg:text-[52px]">
          {title}
        </h1>
        {intro ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-200">
            {intro}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </header>
  );
}
