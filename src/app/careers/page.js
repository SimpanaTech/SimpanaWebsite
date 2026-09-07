import ApplicationForm from "@/components/forms/ApplicationForm";
import CTABand from "@/components/sections/CTABand";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ROLES } from "@/data/content";
import { CONTACT } from "@/data/site";

export const metadata = {
  title: "Careers",
  description:
    "At Simpana we believe everyone is capable of greatness. Open roles in Pune across engineering, QA, design, and our SAP practice.",
  alternates: { canonical: "/careers" },
};

const PERKS = [
  {
    icon: "box",
    title: "Work that ships",
    body: "Our products are deployed and in daily use. What you build gets used on a scanner in a cold aisle, not filed in a backlog.",
  },
  {
    icon: "users",
    title: "Room to grow",
    body: "A supportive workplace where each team member can grow and thrive — across domains, not just up a ladder.",
  },
  {
    icon: "warehouse",
    title: "Real domain depth",
    body: "Supply chain rewards people who understand it. You will learn how warehouses actually work, from people who run them.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        backdrop="orbit"
        crumbs={[{ label: "Careers" }]}
        title="Everyone here is capable of greatness."
        intro="We have built a supportive workplace where each person can grow and do their best work. Send your CV — we will always read a good one."
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="onDark">Pune, India</Badge>
          <Badge variant="onDark">Full-time</Badge>
          <Badge variant="onDark">{CONTACT.email}</Badge>
        </div>
      </PageHero>

      <Section space="lg">
        <SectionHeading
          eyebrow="Open roles"
          title="Join the team at Simpana."
          intro="Every role here works on systems that run real operations — the feedback loop is short and very literal."
        />

        <ul className="mt-12 space-y-4">
          {ROLES.map((role) => (
            <li key={role.id}>
              <Card className="gap-6 p-7 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg">{role.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-500">
                    {role.location} · {role.type} · {role.team}
                  </p>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                    {role.blurb}
                  </p>
                </div>
                <Button
                  href="#apply"
                  variant="secondary"
                  className="sm:flex-none"
                >
                  Apply
                </Button>
              </Card>
            </li>
          ))}
        </ul>

        <Card className="mt-8 border-dashed p-6">
          <p className="text-sm leading-relaxed text-ink-600">
            <span className="font-semibold text-ink-800">Note:</span> these
            listings are placeholders pending confirmation of the real openings.
            Applications still reach us.
          </p>
        </Card>
      </Section>

      <Section tone="tint" space="lg" bordered>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PERKS.map((perk) => (
            <Card key={perk.title} className="p-7" interactive>
              <span
                className="mb-5 inline-flex h-11 w-11 items-center justify-center
                           rounded-xl bg-brand-50 text-brand-600"
              >
                <Icon name={perk.icon} />
              </span>
              <h3 className="text-lg">{perk.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-600">
                {perk.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section space="lg" id="apply">
        <SectionHeading
          eyebrow="Apply"
          title="Send us your work."
          intro={`Prefer email? Send your CV to ${CONTACT.email} and we will pick it up from there.`}
        />
        <Card className="mt-12 max-w-3xl p-8">
          <ApplicationForm />
        </Card>
      </Section>

      <CTABand
        title="Not a role, but still a fit?"
        copy="Open applications are welcome. Tell us what you are good at and where you would want to point it."
        action={{ href: "#apply", label: "Send an open application" }}
      />
    </>
  );
}
