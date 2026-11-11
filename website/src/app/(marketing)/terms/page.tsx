import type { Metadata } from "next";
import Link from "next/link";
import { ContactLine } from "@/components/ContactLine";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms for using the Lakebound Transportation website and its ride request form.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" lead="The short version: a request is not a booking, and this is not an emergency service.">
      <h2>A ride request is not a confirmed ride</h2>
      <p>
        Sending the form on this website asks us for a ride. Your ride is booked only after we contact you and confirm it. If
        you have not heard from us, please call.
      </p>

      <h2>Not for emergencies</h2>
      <p>
        {site.name} provides non-emergency medical transportation: rides to and from medical appointments. We do not provide
        medical care or emergency transport. If you have a medical emergency, call 911.
      </p>

      <h2>Give us accurate information</h2>
      <p>
        Please make sure the names, addresses, times and phone numbers you send us are correct. We rely on them to plan your
        ride.
      </p>

      <h2>Information on this website</h2>
      <p>
        We work to keep this website accurate and up to date. Services, service areas and hours can change. If something here
        matters to your decision, please confirm it with us by phone.
      </p>

      <h2>Privacy</h2>
      <p>
        Our <Link href="/privacy">privacy policy</Link> explains what we collect and how we use it.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? You can <ContactLine />.
      </p>
    </LegalPage>
  );
}
