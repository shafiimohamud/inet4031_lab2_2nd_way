import type { Metadata } from "next";
import { ContactLine } from "@/components/ContactLine";
import { LegalPage } from "@/components/LegalPage";
import { NeedsInput } from "@/components/review";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Lakebound Transportation wants everyone to be able to use this website. How we approach accessibility and how to get help.",
};

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility" lead="We want everyone to be able to use this website and book a ride.">
      <h2>Our goal</h2>
      <p>
        We aim for this website to meet the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA. We keep checking it and
        fixing problems as we find them.
      </p>

      <h2>What we have done</h2>
      <ul>
        <li>Large text and large buttons that are easy to tap</li>
        <li>Colors with strong contrast, in both light and dark mode</li>
        <li>Every page works with a keyboard alone, with a visible outline showing where you are</li>
        <li>Form fields have clear labels, and error messages say what to fix</li>
        <li>Headings and page structure that screen readers can follow</li>
        <li>Animation is reduced when your device asks for less motion</li>
      </ul>
      <NeedsInput>
        Before launch, test with VoiceOver and NVDA and with a keyboard only, then list here anything that still needs work.
      </NeedsInput>

      <h2>You can always do it by phone</h2>
      <p>
        Anything you can do on this website, you can do by phone. If the website is hard to use, <ContactLine /> and we will
        take your ride request or answer your question in person.
      </p>

      <h2>Tell us about a problem</h2>
      <p>
        If something on this website does not work for you, please tell us what page you were on and what went wrong. You can{" "}
        <ContactLine />. We will work to fix it.
      </p>
    </LegalPage>
  );
}
