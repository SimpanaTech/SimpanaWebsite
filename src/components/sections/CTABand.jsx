import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { CONTACT } from "@/data/site";

/** The closing contact block that ends every page. */
export default function CTABand({
  title = "Tell us what your warehouse is fighting.",
  copy = "Stock accuracy, dispatch speed, systems that will not talk to each other — send us the problem and we will come back with how we would build it.",
  action = { href: "/contact", label: "Start the conversation" },
}) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-brand-900 px-7 py-12 sm:px-12 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-16 h-80 w-80
                       rounded-full bg-brand-600/30 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <h2 className="max-w-xl text-3xl text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-brand-200">
                {copy}
              </p>
              <div className="mt-8">
                <Button href={action.href} size="lg">
                  {action.label}
                </Button>
              </div>
            </div>

            <dl className="space-y-4 lg:border-l lg:border-white/10 lg:pl-10">
              {[
                {
                  k: "Email",
                  v: CONTACT.email,
                  href: `mailto:${CONTACT.email}`,
                },
                // { k: "Phone", v: CONTACT.phone, href: CONTACT.phoneHref },
                { k: "Office", v: CONTACT.office },
                { k: "Hours", v: CONTACT.hours },
              ].map((row) => (
                <div key={row.k}>
                  <dt className="text-xs font-semibold tracking-[0.14em] text-brand-300 uppercase">
                    {row.k}
                  </dt>
                  <dd className="mt-1 text-[15px] text-white">
                    {row.href ? (
                      <a href={row.href} className="hover:text-brand-200">
                        {row.v}
                      </a>
                    ) : (
                      row.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
