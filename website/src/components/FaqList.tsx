import type { Faq } from "@/lib/faq";
import { reviewMode } from "@/lib/site";
import { NeedsInput, Verify } from "./review";

/** Questions and answers as plain headings and text: nothing hidden behind a click. */
export function FaqList({ items, headingLevel = "h2" }: { items: Faq[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const visible = items.filter((item) => item.answer !== null || reviewMode);
  return (
    <div className="divide-y divide-line border-y border-line">
      {visible.map((item) => (
        <div key={item.question} className="py-6">
          <Heading className="text-[1.2rem]">{item.question}</Heading>
          {item.answer ? (
            <p className="mt-2 max-w-3xl">
              {item.answer}
              {item.verify && <Verify>{item.verify}</Verify>}
            </p>
          ) : (
            <NeedsInput>{item.verify ?? "Write the answer to this question."}</NeedsInput>
          )}
        </div>
      ))}
    </div>
  );
}
