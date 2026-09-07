import Button from "@/components/ui/Button";
import CheckList from "@/components/ui/CheckList";
import Container from "@/components/ui/Container";
import HeroBackdrop from "@/components/ui/HeroBackdrop";
import Icon from "@/components/ui/Icon";
import { OPS_STAGES } from "@/data/site";

/**
 * Home page hero. Navy band, headline left, a quiet "operation flow" diagram
 * right so the supply-chain focus reads before anyone scrolls.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-900">
      <HeroBackdrop variant="aisle" />

      <Container className="relative py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="animate-rise">
            <p className="eyebrow text-brand-300">
              Supply-chain software · Pune, India
            </p>

            <h1 className="mt-4 text-4xl text-white sm:text-5xl lg:text-[56px]">
              Warehouse software that keeps up with your floor.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-200">
              Simpana builds and operates real-time warehouse, inventory, and
              logistics systems for 3PLs, distributors, and manufacturers — one
              connected operation instead of five disconnected tools.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Book a consultation
              </Button>
              <Button href="/products" variant="ghost" size="lg">
                Explore the products
              </Button>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <CheckList
                onDark
                className="sm:grid sm:grid-cols-2 sm:gap-x-8 sm:space-y-0 sm:[&>li]:mb-3"
                items={[
                  "Role-based screens that cut training time",
                  "Audit trails and approval workflows built in",
                  "Barcode and batch traceability end to end",
                  "Deployed and supported, not just delivered",
                ]}
              />
            </div>
          </div>

          {/* Operation flow — the six stages one order passes through. */}
          <div className="animate-rise [animation-delay:120ms]">
            <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold tracking-[0.14em] text-brand-300 uppercase">
                  Operation flow
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-medium text-leaf-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-leaf-400" />
                  Connected
                </span>
              </div>

              <ol className="mt-7 space-y-3">
                {OPS_STAGES.map((stage, i) => (
                  <li
                    key={stage.code}
                    className="flex items-center gap-4 rounded-xl border border-white/10
                               bg-white/[0.04] px-4 py-3"
                  >
                    <span
                      className="flex h-9 w-9 flex-none items-center justify-center
                                 rounded-lg bg-brand-600/40 text-xs font-bold text-white"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[15px] font-medium text-white">
                      {stage.label}
                    </span>
                    <span className="text-xs tracking-wider text-brand-300">
                      {stage.code}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                {["Real-time", "Role-based", "Audit trail", "Barcode"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 px-3 py-1
                               text-xs font-medium text-brand-200"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs text-brand-300">
              <Icon name="chart" className="h-4 w-4" />
              One record follows the goods from receipt to dispatch.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
