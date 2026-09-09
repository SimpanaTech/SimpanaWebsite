import ContactForm from "@/components/forms/ContactForm";
import Card from "@/components/ui/Card";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { CONTACT } from "@/data/site";

export const metadata = {
  title: "Contact",
  description:
    "Tell us about the operation and the problem. Simpana Technologies, Wanowarie, Pune — contact@simpanatech.com, +91-7004681014.",
  alternates: { canonical: "/contact" },
};

const STEPS = [
  "We read it — a person, not a queue",
  "We reply with questions or a call slot",
  "You get an honest view on fit and effort",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        backdrop="beacon"
        crumbs={[{ label: "Contact" }]}
        title="Let’s"
        accent="talk."
        intro="Tell us about the operation and the problem — we will come back to you soon."
      />

      <Section space="lg">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <Card className="p-8 sm:p-10">
            <ContactForm />
          </Card>

          <div className="space-y-6">
            <Card className="p-7">
              <p className="eyebrow mb-5">Direct</p>
              <dl className="space-y-5">
                {[
                  {
                    k: "Email",
                    v: CONTACT.email,
                    href: `mailto:${CONTACT.email}`,
                  },
                  { k: "Phone", v: CONTACT.phone, href: CONTACT.phoneHref },
                  { k: "Office", v: CONTACT.office },
                  { k: "Hours", v: CONTACT.hours },
                ].map((row) => (
                  <div key={row.k}>
                    <dt className="text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase">
                      {row.k}
                    </dt>
                    <dd className="mt-1 text-[15px] font-medium text-ink-800">
                      {row.href ? (
                        <a href={row.href} className="hover:text-brand-700">
                          {row.v}
                        </a>
                      ) : (
                        row.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>

            <Card className="p-7">
              <p className="eyebrow mb-5">What happens next</p>
              <ol className="space-y-4">
                {STEPS.map((step, i) => (
                  <li key={step} className="flex gap-3.5">
                    <span
                      className="flex h-6 w-6 flex-none items-center justify-center
                                 rounded-full bg-brand-50 text-xs font-bold text-brand-700"
                    >
                      {i + 1}
                    </span>
                    <span className="text-[15px] leading-relaxed text-ink-600">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-line pt-5 text-sm text-ink-500">
                We do not add you to a mailing list, and we do not pass your
                details on.
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
