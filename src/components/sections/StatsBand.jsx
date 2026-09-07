import Section from "@/components/ui/Section";
import Stat from "@/components/ui/Stat";

const DEFAULT_STATS = [
  { countTo: 7, pad: 2, label: "Products shipped and deployed" },
  { countTo: 6, pad: 2, label: "Operation stages in one system" },
  { value: "3PL+", label: "Distribution, manufacturing, fulfilment" },
  { value: "24/7", label: "Managed support and monitoring" },
];

/** Four headline figures on a tinted band. */
export default function StatsBand({ stats = DEFAULT_STATS, tone = "tint" }) {
  const onDark = tone === "navy";

  return (
    <Section tone={tone} space="sm" bordered={!onDark}>
      <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {stats.map((stat) => (
          <Stat key={stat.label} {...stat} onDark={onDark} />
        ))}
      </dl>
    </Section>
  );
}
