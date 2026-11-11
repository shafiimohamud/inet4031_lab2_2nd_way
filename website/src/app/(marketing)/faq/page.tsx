import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { CtaBand, PageHeader, Section } from "@/components/page";
import { answeredFaqs, faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Questions and answers",
  description:
    "Answers about booking a ride, help at the door, bringing a caregiver, wheelchairs and equipment, Medicaid, cancelling, and more.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answeredFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHeader title="Questions and answers" lead="If your question is not here, call us. We are glad to help." />
      <Section>
        <FaqList items={faqs} />
      </Section>
      <CtaBand />
    </>
  );
}
