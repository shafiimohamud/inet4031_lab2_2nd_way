import type { Metadata } from "next";
import Link from "next/link";
import { GuidePage } from "@/components/GuidePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to book a ride to dialysis",
  description: "What to have ready, how a standing dialysis ride schedule works, and what to expect on the day.",
};

export default function DialysisGuidePage() {
  return (
    <GuidePage
      title="How to book a ride to dialysis"
      lead="Dialysis only works if the ride there is dependable too. Here is what that actually takes."
    >
      <h2>Why the ride matters as much as the appointment</h2>
      <p>
        Missing or being late to a dialysis session is not like missing an ordinary appointment. Non-emergency
        medical transportation, usually shortened to NEMT, means exactly what it sounds like: a ride to and from a
        medical appointment, for someone who does not need an ambulance but does need to get there reliably. For
        dialysis, that reliability is the whole point.
      </p>

      <h2>What to have ready when you book</h2>
      <ul>
        <li>The treatment center&apos;s name and address</li>
        <li>Your appointment days and times, if they repeat each week</li>
        <li>Whether you walk on your own or use a wheelchair</li>
        <li>Whether a caregiver will be riding with you</li>
        <li>How the ride will be paid for (see our {" "}
          <Link href="/medicaid-and-insurance">Medicaid and insurance page</Link> if a health plan covers it)</li>
      </ul>

      <h2>A standing schedule, not a new request every time</h2>
      <p>
        Dialysis is one of the clearest cases for a regular, repeating ride rather than booking one trip at a time.
        {" "}
        <Link href="/request-a-ride">Send a request</Link> for your first ride, or call us, and tell us your
        treatment schedule. We arrange it as a standing ride so you are not asking again each week.
      </p>

      <h2>What to expect on the day</h2>
      <p>
        Your driver comes to your door, helps you to the vehicle, and helps you through the door at the treatment
        center. The same happens in reverse afterward. If you use a wheelchair, it is secured in place, along with
        your own seat belt, before the vehicle moves. See our <Link href="/services">services page</Link> for more
        on what is included.
      </p>

      <h2>If your schedule changes</h2>
      <p>
        Treatment schedules change. Call us as soon as you know, so your standing ride can change with it.
      </p>

      <p className="font-bold">
        This is not an emergency service. If you have a medical emergency, call 911. For anything else, {" "}
        {site.phone ? (
          <>
            call us at <a href={site.phone.href}>{site.phone.display}</a>
          </>
        ) : (
          "call us"
        )}
        .
      </p>
    </GuidePage>
  );
}
