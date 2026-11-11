import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon, RepeatIcon, WalkIcon, WheelchairIcon } from "@/components/icons";
import { CtaBand, PageHeader, Section } from "@/components/page";
import { NeedsInput, Verify } from "@/components/review";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Ambulatory rides, wheelchair accessible rides, round trips and regular rides to dialysis, therapy and other medical appointments.",
};

const icons = { walk: WalkIcon, wheelchair: WheelchairIcon, repeat: RepeatIcon } as const;

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our services"
        lead="Non-emergency medical transportation means rides to and from medical appointments. Every ride is door through door."
      />
      <Section>
        <Verify>
          List only the service levels your Minnesota enrollment permits. Remove any service you are not authorized to provide.
        </Verify>
        <div className="space-y-14">
          {services.map((service) => {
            const ServiceIcon = icons[service.icon];
            return (
              <article key={service.id} id={service.id} aria-labelledby={`${service.id}-title`} className="grid gap-6 md:grid-cols-[auto_1fr]">
                <ServiceIcon className="text-link" width="3em" height="3em" />
                <div className="max-w-3xl">
                  <h2 id={`${service.id}-title`} className="text-[1.6rem]">
                    {service.name}
                  </h2>
                  <h3 className="mt-5 text-[1.1rem]">Who it is for</h3>
                  <p className="mt-1">{service.forWho}</p>
                  <h3 className="mt-5 text-[1.1rem]">What is included</h3>
                  <ul className="mt-2 space-y-2">
                    {service.included.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckIcon className="mt-1 flex-none text-link" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <NeedsInput>
                    Vehicle type for {service.name.toLowerCase()} (for example, &quot;sedan&quot; or &quot;ramp-equipped van&quot;), and a
                    real photo of it.
                  </NeedsInput>
                  <Link href="/request-a-ride" className="btn btn-primary mt-6">
                    Request this ride
                    <ArrowRightIcon />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>
      <CtaBand title="Not sure which ride you need?" />
    </>
  );
}
