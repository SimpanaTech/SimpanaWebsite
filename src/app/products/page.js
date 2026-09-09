import CTABand from "@/components/sections/CTABand";
import ProductsGrid from "@/components/sections/ProductsGrid";
import TrustStrip from "@/components/sections/TrustStrip";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import HeroProductStack from "@/components/ui/HeroProductStack";
import Icon from "@/components/ui/Icon";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { PRODUCTS } from "@/data/content";

export const metadata = {
  title: "Products",
  description:
    "Seven deployed systems: warehouse management, inventory, point of sale, chemical warehouse, tools, school, and event management — all role-based with audit trails and reporting.",
  alternates: { canonical: "/products" },
};

const COMMON = [
  {
    icon: "users",
    title: "Role-based access",
    body: "Screens built around the task someone repeats forty times a shift — not around the org chart. It is what cuts training time.",
  },
  {
    icon: "shield",
    title: "Activity logging & approvals",
    body: "Every consequential action is logged and, where it matters, routed through an approval workflow. Auditors read this first.",
  },
  {
    icon: "chart",
    title: "Reporting & alerts",
    body: "Dashboards for the day, periodical reports for the month, and notifications that reach people who never log in.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        backdrop="fleet"
        visual={<HeroProductStack />}
        crumbs={[{ label: "Products" }]}
        title="Seven systems,"
        accent="built for how operations actually run."
        intro="Each product ships with role-based access, activity logging, approval workflows, and reporting. Run one, or connect several across the same operation."
      >
        <div className="flex flex-wrap gap-2">
          {PRODUCTS.map((product) => (
            <Badge key={product.slug} variant="onDark">
              {product.code}
            </Badge>
          ))}
        </div>
      </PageHero>

      <TrustStrip label="Deployed in" />

      <Section space="lg">
        <SectionHeading
          eyebrow="The stack"
          title="One catalogue, one operation."
          intro="Open any product for the full feature list and its brochure."
        />
        <div className="mt-12">
          <ProductsGrid />
        </div>
      </Section>

      <Section tone="tint" space="lg" bordered>
        <SectionHeading
          eyebrow="Common ground"
          title="What every product ships with."
          intro="The parts that never make a demo, and always decide whether a system survives its first audit."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COMMON.map((item) => (
            <Card key={item.title} className="p-7" interactive>
              <span
                className="mb-5 inline-flex h-11 w-11 items-center justify-center
                           rounded-xl bg-brand-50 text-brand-600"
              >
                <Icon name={item.icon} />
              </span>
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-600">
                {item.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <CTABand
        title="Which one fits your operation?"
        copy="Tell us what the floor looks like and where the process breaks. We will say which product applies — or whether it needs a build."
      />
    </>
  );
}
