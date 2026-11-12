import type { Metadata } from "next";
import Link from "next/link";
import { GuidePage } from "@/components/GuidePage";

export const metadata: Metadata = {
  title: "Questions to ask any NEMT provider",
  description: "What to check before you trust a non-emergency medical transportation company with someone's care.",
};

export default function QuestionsGuidePage() {
  return (
    <GuidePage
      title="Questions to ask any NEMT provider"
      lead="You are trusting this company with someone getting to the care they need, on time. It is worth a few questions first."
    >
      <p>
        Non-emergency medical transportation, usually shortened to NEMT, means rides to and from medical
        appointments for people who do not need an ambulance but still need a safe, dependable way to get there.
        Not every provider works the same way. Here is what is worth asking, of any company you are considering.
      </p>

      <h2>How the ride works</h2>
      <ul>
        <li>Is help door through door, or just to the curb?</li>
        <li>How far ahead do you need to book?</li>
        <li>How is a ride actually confirmed? (See how we{" "}
          <Link href="/faq">answer this</Link> ourselves.)</li>
        <li>Can a caregiver or companion ride along?</li>
      </ul>

      <h2>The vehicle and the equipment</h2>
      <ul>
        <li>Do you have wheelchair accessible vehicles, not just sedans?</li>
        <li>Is a wheelchair actually secured, or just braked in place?</li>
        <li>Can you accommodate a walker, a cane, or portable oxygen?</li>
      </ul>
      <p>
        Our own answers to these are on the <Link href="/services">services page</Link>.
      </p>

      <h2>Where they actually go</h2>
      <p>
        Ask plainly whether they serve your address, not just the general region. See{" "}
        <Link href="/service-area">where we go</Link>.
      </p>

      <h2>How you pay</h2>
      <p>
        Ask whether they take Medical Assistance (Medicaid) or your health plan, and how that is arranged, versus
        paying directly. See <Link href="/medicaid-and-insurance">Medicaid and insurance</Link> for how this works
        with us.
      </p>

      <h2>What happens when something goes wrong</h2>
      <ul>
        <li>What is the policy if the driver is late, or a ride needs to be cancelled?</li>
        <li>Who do you actually talk to if something goes wrong, and how fast do they respond?</li>
        <li>Can you get help in your own language if you need it?</li>
      </ul>
      <p>
        See our <Link href="/nondiscrimination">nondiscrimination notice</Link> and{" "}
        <Link href="/accessibility">accessibility page</Link> for how we approach this.
      </p>

      <h2>One question that matters more than it sounds</h2>
      <p>
        Does a real person answer the phone? A ride to a medical appointment is not something you want to leave to
        a form that nobody reads in time.
      </p>
    </GuidePage>
  );
}
