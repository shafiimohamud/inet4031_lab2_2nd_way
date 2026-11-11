import type { Metadata } from "next";
import Link from "next/link";
import { CallLink } from "@/components/CallLink";
import { PageHeader } from "@/components/page";
import { Verify } from "@/components/review";
import { RideRequestForm } from "@/components/RideRequestForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a ride",
  description:
    "Ask Lakebound Transportation for a ride to a medical appointment. Send the short form and we call you to confirm. Ambulatory and wheelchair accessible.",
};

export default function RequestARidePage() {
  return (
    <>
      <PageHeader
        title="Request a ride"
        lead="Tell us where you are going and when. We call you to confirm before anything is booked."
      >
        <p className="mt-5 max-w-2xl rounded-xl border-2 border-warn-ink bg-warn-bg px-4 py-3 font-bold text-warn-ink">
          For emergencies, call 911. This form is for planned rides to medical appointments.
        </p>
      </PageHeader>

      <div className="container-page grid gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-2xl">
          <noscript>
            <p className="mb-8 rounded-xl border-2 border-warn-ink bg-warn-bg px-4 py-3 font-bold text-warn-ink">
              This form needs JavaScript, which is turned off in your browser.
              {site.phone ? ` Please call us at ${site.phone.display} and we will take your request by phone.` : " Please call us and we will take your request by phone."}
            </p>
          </noscript>
          <RideRequestForm phone={site.phone ? { display: site.phone.display, href: site.phone.href } : null} />
        </div>

        <aside aria-label="Other ways to book" className="space-y-6 lg:pt-2">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-[1.2rem]">Prefer to talk to someone?</h2>
            <p className="mt-2">Call us and we will take your request by phone.</p>
            <CallLink className="btn btn-accent mt-4 w-full" />
            {site.hours && <p className="mt-3 text-muted">{site.hours}</p>}
          </div>
          <div className="rounded-2xl border border-line p-6">
            <h2 className="text-[1.2rem]">Is your ride covered by a plan?</h2>
            <p className="mt-2">
              If Medical Assistance (Medicaid) or a health plan pays for your ride, it is usually arranged through your plan.
              <Verify>Minnesota booking rule for covered rides.</Verify>
            </p>
            <Link href="/medicaid-and-insurance" className="link mt-3 inline-flex min-h-11 items-center">
              How covered rides work
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
