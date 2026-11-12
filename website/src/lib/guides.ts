/**
 * Short, helpful content pages (blueprint section 8.6: "Content that earns
 * referrals"). These are generic, genuinely useful guidance, not claims
 * about Lakebound beyond what the rest of the site already says — each
 * links back to the real services/request/FAQ pages rather than repeating
 * or inventing specifics here.
 */
export const guides = [
  {
    slug: "booking-a-ride-to-dialysis",
    title: "How to book a ride to dialysis",
    summary: "What to have ready, how a standing schedule works, and what to expect on the day.",
  },
  {
    slug: "wheelchair-transportation-what-to-expect",
    title: "Wheelchair transportation: what to expect",
    summary: "What a wheelchair accessible ride actually looks like, from pickup to drop-off.",
  },
  {
    slug: "questions-to-ask-an-nemt-provider",
    title: "Questions to ask any NEMT provider",
    summary: "What to check before you trust a transportation company with someone's care.",
  },
] as const;

export type GuideSlug = (typeof guides)[number]["slug"];
