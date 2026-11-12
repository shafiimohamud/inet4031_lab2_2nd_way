import { Section } from "./page";
import { NeedsInput } from "./review";
import { reviewMode } from "@/lib/site";
import { testimonials } from "@/lib/testimonials";

/**
 * Shows real testimonials once there are any (see src/lib/testimonials.ts).
 * Until then, renders nothing on the live site — only a review-mode note
 * explaining exactly where and how to add a real one.
 */
export function TestimonialsSection() {
  if (testimonials.length === 0) {
    if (!reviewMode) return null;
    return (
      <Section labelledBy="testimonials-note">
        <NeedsInput>
          Add real testimonials in src/lib/testimonials.ts once you have written permission from a rider or family
          member (first name and last initial only, never medical details). This whole section stays off the site
          until then.
        </NeedsInput>
      </Section>
    );
  }

  return (
    <Section labelledBy="testimonials-title">
      <h2 id="testimonials-title" className="text-[1.75rem]">
        What riders say
      </h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <li key={testimonial.name + testimonial.quote} className="flex flex-col rounded-2xl border border-line bg-page p-6">
            <p className="flex-1 text-[1.05rem]">&ldquo;{testimonial.quote}&rdquo;</p>
            <p className="mt-4 font-bold text-ink">{testimonial.name}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
