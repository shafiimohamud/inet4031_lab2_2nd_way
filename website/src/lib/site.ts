/**
 * Business facts for the whole site, in one place.
 *
 * Honest-content rule (blueprint section 1): nothing here is invented.
 *  - Facts taken from the blueprint are filled in.
 *  - Contact details come from environment variables (see .env.example).
 *  - Every claim in `claims` starts as `false` and stays off the public site
 *    until the owner confirms it can be documented and flips it to `true`.
 */

export type Phone = { display: string; href: string; e164: string };

/** Accepts any common US format and returns null for anything that is not 10 digits. */
export function parsePhone(raw: string | undefined | null): Phone | null {
  if (!raw) return null;
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  if (digits.length !== 10) return null;
  return {
    display: `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`,
    href: `tel:+1${digits}`,
    e164: `+1${digits}`,
  };
}

const clean = (value: string | undefined) => (value && value.trim() ? value.trim() : null);

export const site = {
  name: "Lakebound Transportation",
  legalName: "Lakebound Transportation LLC",
  url: (clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://lakeboundmn.com").replace(/\/$/, ""),
  city: "Shakopee",
  region: "MN",
  usdot: "4465625",
  tagline: "Safe, on-time, door-through-door rides to the care you need.",
  serviceArea: "the Twin Cities metro and Scott County",
  /** Used in search-engine structured data. */
  areaServed: ["Scott County, MN", "Hennepin County, MN"],

  phone: parsePhone(process.env.NEXT_PUBLIC_PHONE),
  email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  /** Example: "Monday to Friday, 6 am to 6 pm". Hidden until set. */
  hours: clean(process.env.NEXT_PUBLIC_HOURS),

  /**
   * Claims that must be documented before they are published.
   * Change a value to `true` only when you can prove it (blueprint sections 1 and 5).
   */
  claims: {
    /** Commercial insurance is active and a certificate can be shown on request. */
    insured: false,
    /** Every driver has passed a background study and driving-record check. */
    backgroundCheckedDrivers: false,
    /** Drivers are trained in passenger assistance and wheelchair securement. */
    trainedDrivers: false,
    /** A person, not a recording, answers the phone during business hours. */
    livePhoneAnswer: false,
  },
} as const;

/**
 * Review mode shows yellow "Verify" and "Needs your input" notes next to
 * content the owner, attorney or insurer still has to confirm. It is on while
 * developing and off on the live site, unless NEXT_PUBLIC_REVIEW_MODE says otherwise.
 */
export const reviewMode = process.env.NEXT_PUBLIC_REVIEW_MODE
  ? process.env.NEXT_PUBLIC_REVIEW_MODE === "1"
  : process.env.NODE_ENV !== "production";

/** Settings the site cannot launch without. */
export function missingSetup(): string[] {
  const missing: string[] = [];
  if (!site.phone) missing.push("phone number (NEXT_PUBLIC_PHONE)");
  if (!site.email) missing.push("contact email (NEXT_PUBLIC_CONTACT_EMAIL)");
  return missing;
}
