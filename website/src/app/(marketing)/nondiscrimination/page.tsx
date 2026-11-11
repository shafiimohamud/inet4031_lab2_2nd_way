import type { Metadata } from "next";
import { ContactLine } from "@/components/ContactLine";
import { LegalPage } from "@/components/LegalPage";
import { NeedsInput, Verify } from "@/components/review";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nondiscrimination notice",
  description: "Lakebound Transportation serves every rider with respect and does not discriminate.",
};

export default function NondiscriminationPage() {
  return (
    <LegalPage title="Nondiscrimination notice" lead="Every rider is treated with respect.">
      <h2>Our commitment</h2>
      <p>
        {site.legalName} does not discriminate. We do not turn riders away or treat them differently because of race, color,
        national origin, religion, sex, sexual orientation, gender identity, age, or disability.
        <Verify>Use the exact wording your contracts and Minnesota programs require.</Verify>
      </p>

      <h2>Help in your language</h2>
      <p>If you need help in a language other than English, tell us when you call and we will work with you to arrange it.</p>
      <NeedsInput>How language help is actually provided (interpreter line, bilingual staff), and in which languages.</NeedsInput>

      <h2>Riders with disabilities</h2>
      <p>
        We provide wheelchair accessible rides and door-through-door help. If you need something more to use our service,
        tell us and we will do what we reasonably can.
      </p>

      <h2>If you believe you were treated unfairly</h2>
      <p>
        Please tell us. You can <ContactLine />. Tell us what happened, when, and how to reach you. We take every concern
        seriously.
      </p>
      <NeedsInput>
        Your grievance procedure: who handles it, how fast you respond, and the outside agencies a rider can also contact.
      </NeedsInput>
    </LegalPage>
  );
}
