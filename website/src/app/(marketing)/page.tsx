import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { ArrowRightIcon, CheckIcon, RepeatIcon, WalkIcon, WheelchairIcon } from "@/components/icons";
import { Actions, CtaBand, Section } from "@/components/page";
import { NeedsInput, Verify } from "@/components/review";
import { faqs } from "@/lib/faq";
import { services } from "@/lib/services";
import { reviewMode, site } from "@/lib/site";

const serviceIcons = { walk: WalkIcon, wheelchair: WheelchairIcon, repeat: RepeatIcon } as const;

const steps = [
  { title: "Ask for a ride", text: "Send the short request form or call us. Tell us where you are going and when." },
  { title: "We call to confirm", text: "We phone you to go over the details. Your ride is booked once we confirm it with you." },
  { title: "Your driver arrives", text: "Your driver comes to your door and helps you all the way through the door where you are going." },
];

const audiences = [
  {
    title: "Riders",
    text: "You have an appointment and need a safe, dependable way to get there and back.",
    href: "/request-a-ride",
    link: "Request a ride",
  },
  {
    title: "Families and caregivers",
    text: "You are arranging a ride for a parent, a partner or someone in your care.",
    href: "/request-a-ride",
    link: "Request a ride for someone",
  },
  {
    title: "Clinics, hospitals and care teams",
    text: "You want a transportation partner your patients and residents can count on.",
    href: "/contact",
    link: "Talk with us",
  },
  {
    title: "Health plans and agencies",
    text: "You need a provider that can show its credentials and keep its word.",
    href: "/contact",
    link: "Contact us",
  },
];

/** Shown only once the owner has confirmed each one can be documented (see src/lib/site.ts). */
const confirmable = [
  { on: site.claims.insured, label: "Insured" },
  { on: site.claims.backgroundCheckedDrivers, label: "Background-checked drivers" },
  { on: site.claims.trainedDrivers, label: "Trained drivers" },
  { on: site.claims.livePhoneAnswer, label: "A real person answers the phone" },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.legalName,
    url: site.url,
    ...(site.phone ? { telephone: site.phone.e164 } : {}),
    ...(site.email ? { email: site.email } : {}),
    address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "US" },
    areaServed: site.areaServed,
    description: "Non-emergency medical transportation, ambulatory and wheelchair accessible.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="bg-surface">
        <div className="container-page grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="font-bold text-link">Non-emergency medical transportation</p>
            <h1 className="mt-2 text-[2.2rem] sm:text-[3rem]">Safe, on-time rides to the care you need.</h1>
            <p className="mt-5 max-w-xl text-[1.15rem]">
              {site.name} takes you to your medical appointments and home again, door through door. Ambulatory and
              wheelchair accessible, serving {site.serviceArea}.
            </p>
            <Actions className="mt-7" />
            <p className="mt-4 text-muted">We confirm every ride by phone before it is booked.</p>
          </div>

          <div className="rounded-2xl border border-line bg-page p-6 sm:p-8">
            <h2 className="text-[1.25rem]">Rides for</h2>
            <ul className="mt-4 space-y-3">
              {["Doctor and clinic visits", "Dialysis", "Therapy appointments", "Other regular medical appointments"].map(
                (item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon className="mt-1 flex-none text-link" />
                    <span>{item}</span>
                  </li>
                ),
              )}
            </ul>
            <NeedsInput>
              Add one real photo here: a vehicle, or a driver helping a rider (with their permission). No stock photos.
            </NeedsInput>
          </div>
        </div>
      </section>

      {/* Trust strip: only items that are true and can be documented */}
      <section aria-label="At a glance" className="border-y border-line">
        <ul className="container-page flex flex-wrap justify-center gap-x-8 gap-y-2 py-5 font-bold text-ink">
          <li>USDOT {site.usdot}</li>
          <li>Wheelchair accessible</li>
          <li>Door-through-door help</li>
          {confirmable.filter((item) => item.on).map((item) => (
            <li key={item.label}>{item.label}</li>
          ))}
        </ul>
        {reviewMode && confirmable.some((item) => !item.on) && (
          <div className="container-page pb-4">
            <NeedsInput>
              These are hidden until you confirm you can document them (edit <code>claims</code> in{" "}
              <code>src/lib/site.ts</code>): {confirmable.filter((item) => !item.on).map((item) => item.label).join(", ")}.
            </NeedsInput>
          </div>
        )}
      </section>

      {/* How it works */}
      <Section labelledBy="how-title">
        <h2 id="how-title" className="text-[1.75rem]">
          How it works
        </h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-line p-6">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-[1.2rem] font-extrabold text-on-brand"
              >
                {index + 1}
              </span>
              <h3 className="mt-4 text-[1.2rem]">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Services */}
      <Section tinted labelledBy="services-title">
        <h2 id="services-title" className="text-[1.75rem]">
          Our services
        </h2>
        <Verify>Confirm each service is one your Minnesota enrollment permits.</Verify>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const ServiceIcon = serviceIcons[service.icon];
            return (
              <li key={service.id} className="flex flex-col rounded-2xl border border-line bg-page p-6">
                <ServiceIcon className="text-link" width="2.2em" height="2.2em" />
                <h3 className="mt-4 text-[1.2rem]">{service.name}</h3>
                <p className="mt-2 flex-1">{service.summary}</p>
                <Link href={`/services#${service.id}`} className="link mt-4 inline-flex min-h-11 items-center gap-2">
                  About {service.name.toLowerCase()}
                  <ArrowRightIcon />
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Who we serve */}
      <Section labelledBy="serve-title">
        <h2 id="serve-title" className="text-[1.75rem]">
          Who we serve
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <li key={audience.title} className="flex flex-col border-t-4 border-accent pt-4">
              <h3 className="text-[1.15rem]">{audience.title}</h3>
              <p className="mt-2 flex-1">{audience.text}</p>
              <Link href={audience.href} className="link mt-3 inline-flex min-h-11 items-center gap-2">
                {audience.link}
                <ArrowRightIcon />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* What to expect */}
      <Section tinted labelledBy="expect-title">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="expect-title" className="text-[1.75rem]">
              What to expect on every ride
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                "Your driver comes to your door and helps you to the vehicle.",
                "Seat belts are fastened, and wheelchairs are secured, before the vehicle moves.",
                "Your driver helps you through the door at the place you are going.",
                "One companion or caregiver is welcome to ride with you.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon className="mt-1 flex-none text-link" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Verify>Describe only what you actually do. Driver screening and training go here once confirmed.</Verify>
          </div>

          <div>
            <h2 className="text-[1.75rem]">Where we go</h2>
            <p className="mt-6">
              We are based in {site.city}, Minnesota, and serve {site.serviceArea}.
            </p>
            <p className="mt-3">Not sure whether we come to your address? Ask us. It only takes a minute.</p>
            <Link href="/service-area" className="link mt-4 inline-flex min-h-11 items-center gap-2">
              See our service area
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </Section>

      {/* Top questions */}
      <Section labelledBy="faq-title">
        <h2 id="faq-title" className="text-[1.75rem]">
          Common questions
        </h2>
        <div className="mt-6">
          <FaqList items={faqs.filter((faq) => faq.top)} headingLevel="h3" />
        </div>
        <Link href="/faq" className="link mt-6 inline-flex min-h-11 items-center gap-2">
          See all questions
          <ArrowRightIcon />
        </Link>
      </Section>

      <CtaBand />
    </>
  );
}
