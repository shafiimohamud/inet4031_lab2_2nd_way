import type { Metadata } from "next";
import Link from "next/link";
import { GuidePage } from "@/components/GuidePage";

export const metadata: Metadata = {
  title: "Wheelchair transportation: what to expect",
  description: "What a wheelchair accessible ride actually looks like, from pickup to drop-off.",
};

export default function WheelchairGuidePage() {
  return (
    <GuidePage
      title="Wheelchair transportation: what to expect"
      lead="If you have never used a wheelchair accessible ride before, here is what actually happens."
    >
      <h2>What makes a vehicle &quot;wheelchair accessible&quot;</h2>
      <p>
        A wheelchair accessible vehicle has a ramp or lift so you can board without transferring out of your chair,
        and secures your chair in place, along with your own seat belt, before the vehicle ever moves. That part is
        not optional or something a driver skips when they are in a hurry — it happens every time, before the
        vehicle moves.
      </p>

      <h2>From your door to theirs</h2>
      <p>
        A proper wheelchair accessible ride is door through door: your driver meets you at your own door, helps you
        to the vehicle, secures your chair, drives you, and then helps you through the door at the place you are
        going. See our <Link href="/services">services page</Link> for what is included on every ride.
      </p>

      <h2>What to tell us when you book</h2>
      <ul>
        <li>That you use a wheelchair, so a wheelchair accessible vehicle is sent</li>
        <li>The make or type of chair, if it is unusually large or heavy</li>
        <li>Whether you use other equipment too, such as portable oxygen</li>
        <li>Whether a caregiver is riding with you</li>
      </ul>
      <p>
        The more we know ahead of time, the less there is to sort out at the curb.
      </p>

      <h2>Questions worth asking before your ride</h2>
      <ul>
        <li>Will the vehicle have a ramp or a lift?</li>
        <li>Will my chair be secured, not just braked?</li>
        <li>Can someone help me through the door at both ends, not just to the curb?</li>
        <li>Can a caregiver ride along?</li>
      </ul>
      <p>
        <Link href="/guides/questions-to-ask-an-nemt-provider">More questions worth asking any NEMT provider</Link>,
        wheelchair transportation included.
      </p>

      <h2>Ready to book?</h2>
      <p>
        <Link href="/request-a-ride">Request a ride</Link> and choose &quot;I use a wheelchair&quot; on the form, or
        call us and tell us directly.
      </p>
    </GuidePage>
  );
}
