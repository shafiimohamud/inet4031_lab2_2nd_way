import type { Metadata } from "next";
import { ContactLine } from "@/components/ContactLine";
import { LegalPage } from "@/components/LegalPage";
import { NeedsInput, Verify } from "@/components/review";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What information Lakebound Transportation collects on this website, why, who sees it, and your choices.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" lead="What we collect on this website, why we collect it, and who sees it.">
      <h2>What we collect</h2>
      <p>When you send a ride request, we collect what you type into the form:</p>
      <ul>
        <li>The rider&apos;s name and phone number, and an email address if you choose to give one</li>
        <li>The pickup address, the destination, and the appointment date and time</li>
        <li>Whether the ride is one way or a round trip, and how many people are riding</li>
        <li>Whether the rider walks or uses a wheelchair</li>
        <li>How the ride will be paid for</li>
        <li>Any notes you add</li>
      </ul>
      <p>
        We do not ask for a diagnosis, a Medicaid or insurance ID number, or a date of birth on this website. Please do not put
        them in the notes. If we need more information to arrange your ride, we ask by phone.
      </p>

      <h2>Why we collect it</h2>
      <p>We use this information for one purpose: to arrange, confirm and provide the ride you asked for.</p>

      <h2>Who sees it</h2>
      <ul>
        <li>Our dispatch staff, and the driver assigned to your ride</li>
        <li>
          The companies that run this website and deliver our email, only so that your request can reach us
          <Verify>Sign a business associate agreement (BAA) with each vendor that handles ride details, if HIPAA applies to you.</Verify>
        </li>
      </ul>
      <p>We do not sell your information, and we do not share it for advertising.</p>

      <h2>Cookies and tracking</h2>
      <p>This website does not use advertising trackers, and it does not need cookies to work.</p>

      <h2>How long we keep it</h2>
      <NeedsInput>
        How long you keep ride records. Minnesota and Medicaid set minimum periods: confirm them and state the period here.
      </NeedsInput>
      <p>We keep ride records for as long as the law and our contracts require, and no longer than we need them.</p>

      <h2>Your choices</h2>
      <p>
        You can ask what information we hold about you, ask us to correct it, or ask us to delete it. We will do so unless the
        law requires us to keep it. To ask, <ContactLine />.
      </p>

      <h2>Text messages</h2>
      <p>We do not send text messages from this website. If that changes, we will ask for your permission first.</p>

      <h2>Changes to this policy</h2>
      <p>If we change this policy, we will post the new version on this page.</p>

      <h2>Contact</h2>
      <p>
        {site.legalName}, {site.city}, {site.region}. Questions about privacy? You can <ContactLine />.
      </p>
    </LegalPage>
  );
}
