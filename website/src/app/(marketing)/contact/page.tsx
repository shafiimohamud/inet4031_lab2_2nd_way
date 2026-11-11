import type { Metadata } from "next";
import Link from "next/link";
import { CallLink } from "@/components/CallLink";
import { ClockIcon, MailIcon, PinIcon } from "@/components/icons";
import { PageHeader, Section } from "@/components/page";
import { NeedsInput } from "@/components/review";
import { reviewMode, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call or email Lakebound Transportation in ${site.city}, Minnesota. Request a ride, ask a question, or share feedback.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact us" lead="The fastest way to reach us is by phone." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-[1.5rem]">Call or email</h2>
            <ul className="mt-5 space-y-5">
              <li>
                <CallLink className="btn btn-accent text-[1.15rem]" />
              </li>
              {site.email ? (
                <li className="flex items-center gap-3">
                  <MailIcon className="flex-none text-link" />
                  <a href={`mailto:${site.email}`} className="link break-all">
                    {site.email}
                  </a>
                </li>
              ) : (
                reviewMode && (
                  <li>
                    <NeedsInput>Your contact email address (NEXT_PUBLIC_CONTACT_EMAIL).</NeedsInput>
                  </li>
                )
              )}
              {site.hours ? (
                <li className="flex items-center gap-3">
                  <ClockIcon className="flex-none text-link" />
                  {site.hours}
                </li>
              ) : (
                reviewMode && (
                  <li>
                    <NeedsInput>Your phone hours, and what happens after hours (NEXT_PUBLIC_HOURS).</NeedsInput>
                  </li>
                )
              )}
              <li className="flex items-center gap-3">
                <PinIcon className="flex-none text-link" />
                {site.legalName}, {site.city}, {site.region}
              </li>
            </ul>
            <p className="mt-6 text-muted">
              Please do not email medical details. If we need more information, we will ask by phone.
            </p>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="text-[1.5rem]">Need a ride?</h2>
              <p className="mt-3">The request form takes a few minutes. We call you to confirm.</p>
              <Link href="/request-a-ride" className="btn btn-primary mt-4">
                Request a ride
              </Link>
            </div>
            <div>
              <h2 className="text-[1.5rem]">Clinics, care teams and health plans</h2>
              <p className="mt-3">
                Looking for a transportation partner for your patients, residents or members? Call or email us and tell us
                what you need.
              </p>
            </div>
            <div>
              <h2 className="text-[1.5rem]">Feedback and complaints</h2>
              <p className="mt-3">
                If something went wrong on a ride, we want to know. Call or email us, tell us what happened, and tell us how
                to reach you.
              </p>
              <NeedsInput>The name of the person who handles complaints, and how quickly you respond.</NeedsInput>
            </div>
          </div>
        </div>

        <p className="mt-12 rounded-xl border-2 border-warn-ink bg-warn-bg px-4 py-3 font-bold text-warn-ink">
          This is not an emergency service. If you have a medical emergency, call 911.
        </p>
      </Section>
    </>
  );
}
