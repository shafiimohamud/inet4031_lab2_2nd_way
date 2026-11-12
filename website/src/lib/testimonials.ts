/**
 * Real testimonials only (blueprint section 1): a real rider or family
 * member, written permission to post it, first name and last initial only,
 * and never any medical detail.
 *
 * Starts empty on purpose. The home page's testimonials section stays off
 * the live site entirely until this has at least one entry — nothing here
 * is ever invented to fill the gap. Add one like this once you have real
 * permission:
 *
 *   { quote: "They were right on time and so kind to my mom.", name: "Pat S." }
 */
export type Testimonial = { quote: string; name: string };

export const testimonials: Testimonial[] = [];
