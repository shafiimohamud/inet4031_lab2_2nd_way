import { z } from "zod";

/**
 * Ride request rules, shared by the form in the browser and the server.
 * The server always validates again: never trust the browser.
 *
 * Privacy: this form deliberately does NOT ask for a diagnosis, Medicaid ID,
 * insurance number or date of birth. If dispatch needs more, they ask by phone.
 */

export const tripTypes = [
  { value: "one-way", label: "One way" },
  { value: "round-trip", label: "Round trip (there and back)" },
] as const;

export const mobilityTypes = [
  { value: "ambulatory", label: "I can walk", hint: "On my own, or with a cane or walker" },
  { value: "wheelchair", label: "I use a wheelchair", hint: "I need a wheelchair accessible vehicle" },
  { value: "not-sure", label: "Not sure", hint: "We will talk it through when we call" },
] as const;

export const paymentTypes = [
  { value: "private", label: "I will pay myself (private pay)" },
  { value: "plan", label: "Medical Assistance (Medicaid) or a health plan" },
  { value: "facility", label: "A facility or agency is paying" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const riderCounts = ["1", "2", "3", "4"] as const;

const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((item) => item.value) as [T[number]["value"], ...T[number]["value"][]];

/** Ten digits, with an optional leading 1. Punctuation and spaces are ignored. */
export function isUsPhone(value: string): boolean {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  return digits.length === 10 && /^[2-9]/.test(digits);
}

/** yyyy-mm-dd for a real calendar day. */
export function isCalendarDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

/** yyyy-mm-dd for "now" shifted by a number of days, in UTC. */
export function isoDay(offsetDays = 0, now: Date = new Date()): string {
  return new Date(now.getTime() + offsetDays * 86_400_000).toISOString().slice(0, 10);
}

const text = (max: number, tooLong: string) => z.string().trim().max(max, tooLong);

export const rideRequestSchema = z.object({
  riderName: text(80, "Please shorten the name to 80 characters or fewer.").min(2, "Enter the rider's full name."),
  phone: z
    .string()
    .trim()
    .max(30, "Enter a 10-digit phone number, like 952-555-0123.")
    .refine(isUsPhone, "Enter a 10-digit phone number, like 952-555-0123."),
  email: text(120, "Please shorten the email address.").refine(
    (value) => value === "" || z.email().safeParse(value).success,
    "Enter an email address like name@example.com, or leave it empty.",
  ),
  pickup: text(200, "Please shorten the pickup address.").min(5, "Enter the pickup address."),
  destination: text(200, "Please shorten the destination.").min(
    5,
    "Enter where the rider is going, such as the clinic name and address.",
  ),
  date: z
    .string()
    .refine(isCalendarDate, "Choose the date of the appointment.")
    // One day of slack: the server clock (UTC) is ahead of Minnesota time.
    .refine((value) => !isCalendarDate(value) || value >= isoDay(-1), "Choose today or a future date.")
    .refine((value) => !isCalendarDate(value) || value <= isoDay(366), "Choose a date within the next 12 months."),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Enter the appointment time."),
  tripType: z.enum(values(tripTypes), "Choose one way or round trip."),
  mobility: z.enum(values(mobilityTypes), "Choose how the rider gets around."),
  riders: z.enum(riderCounts, "Choose how many people are riding."),
  payment: z.enum(values(paymentTypes), "Choose how the ride will be paid for."),
  notes: text(600, "Please shorten your notes to 600 characters or fewer."),
});

export type RideRequestInput = z.input<typeof rideRequestSchema>;
export type RideRequest = z.output<typeof rideRequestSchema>;

export const rideRequestFields = Object.keys(rideRequestSchema.shape) as (keyof RideRequest)[];

/** Empty form. Radio groups start unselected so nobody submits a guess by accident. */
export const emptyRideRequest = {
  riderName: "",
  phone: "",
  email: "",
  pickup: "",
  destination: "",
  date: "",
  time: "",
  tripType: "",
  mobility: "",
  riders: "1",
  payment: "",
  notes: "",
} as unknown as RideRequestInput;

/** First error message per field, in a shape the form can show next to each input. */
export function fieldErrors(error: z.ZodError): Partial<Record<keyof RideRequest, string>> {
  const out: Partial<Record<keyof RideRequest, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof RideRequest | undefined;
    if (key && !(key in out)) out[key] = issue.message;
  }
  return out;
}

export const labelFor = {
  tripType: (value: RideRequest["tripType"]) => tripTypes.find((t) => t.value === value)!.label,
  mobility: (value: RideRequest["mobility"]) => mobilityTypes.find((t) => t.value === value)!.label,
  payment: (value: RideRequest["payment"]) => paymentTypes.find((t) => t.value === value)!.label,
};
