import Card from "@/components/ui/Card";
import CheckList from "@/components/ui/CheckList";
import Icon from "@/components/ui/Icon";
import { SERVICES } from "@/data/content";

/** Three-column grid of service cards. `detailed` adds the bullet points. */
export default function ServicesGrid({
  services = SERVICES,
  detailed = false,
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Card key={service.no} className="p-7" interactive>
          <span
            className="mb-5 inline-flex h-11 w-11 items-center justify-center
                       rounded-xl bg-brand-50 text-brand-600
                       transition-colors group-hover:bg-brand-600 group-hover:text-white"
          >
            <Icon name={service.icon} />
          </span>

          <h3 className="text-lg">{service.title}</h3>
          <p className="mt-2.5 text-[15px] leading-relaxed text-ink-600">
            {detailed ? service.body : service.short}
          </p>

          {detailed && service.points?.length ? (
            <CheckList items={service.points} className="mt-5" />
          ) : null}
        </Card>
      ))}
    </div>
  );
}
