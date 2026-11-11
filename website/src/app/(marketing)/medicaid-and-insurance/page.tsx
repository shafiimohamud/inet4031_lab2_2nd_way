import type { Metadata } from "next";
import { CallLink } from "@/components/CallLink";
import { CtaBand, PageHeader, Section } from "@/components/page";
import { NeedsInput, Verify } from "@/components/review";

export const metadata: Metadata = {
  title: "Medicaid and insurance",
  description:
    "How rides to medical appointments are paid for: Medical Assistance (Medicaid), health plans, facilities, and private pay.",
};

export default function MedicaidAndInsurancePage() {
  return (
    <>
      <PageHeader
        title="Medicaid and insurance"
        lead="How rides are paid for, and how to book when a plan covers your ride."
      />
      <Section>
        <div className="prose-page max-w-3xl">
          <h2>If Medical Assistance (Medicaid) or a health plan covers your ride</h2>
          <p>
            Covered rides are usually arranged through your health plan or its transportation service, not directly with the
            transportation company.
            <Verify>The current Minnesota rule for booking covered rides. Say it plainly so riders are not confused.</Verify>
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>Find the member services phone number on your health plan card or Medical Assistance card.</li>
            <li>Call and say you need a ride to a medical appointment.</li>
            <li>Have your appointment date, time and address ready.</li>
          </ol>
          <NeedsInput>
            Whether Lakebound is enrolled with Minnesota Health Care Programs (MHCP), and which plans or brokers you work with.
            Nothing about enrollment is shown until you confirm it.
          </NeedsInput>

          <h2>If you are paying yourself</h2>
          <p>
            You can book directly with us. Send a ride request or call, and we will tell you the cost before you decide.
          </p>
          <NeedsInput>How private-pay rides are priced, and which kinds of payment you accept.</NeedsInput>

          <h2>If a facility or agency is paying</h2>
          <p>
            Clinics, care homes and agencies can arrange rides for the people they serve. Choose &quot;A facility or agency is
            paying&quot; on the request form, or call us to set it up.
          </p>

          <h2>Not sure what you have?</h2>
          <p>Call us. We will help you work out the next step.</p>
          <p>
            <CallLink />
          </p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
