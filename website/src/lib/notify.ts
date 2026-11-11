import { Resend } from "resend";
import { labelFor, type RideRequest } from "./schema";

/**
 * Sends a new ride request to dispatch by email.
 *
 * PHASE 1 LIMITATION (blueprint sections 5 and 6): with no database yet, the
 * email has to carry the ride details or the request would be lost. Phase 2
 * stores requests in the database and this email shrinks to
 * "New request LB-XXXXXX, open the dashboard" with no rider details.
 * VERIFY with a healthcare attorney whether this is acceptable before launch.
 */

export type NotifyResult =
  | { ok: true; simulated: boolean }
  | { ok: false; reason: "not-configured" | "send-failed" };

/** Keeps one value on one line so nothing typed into the form can forge extra lines. */
// Line and paragraph separators (U+2028, U+2029) count as line breaks too.
const LINE_BREAKS = new RegExp("[\\r\\n\\t" + String.fromCharCode(0x2028, 0x2029) + "]+", "g");
const oneLine = (value: string) => value.replace(LINE_BREAKS, " ").replace(/\s{2,}/g, " ").trim();

export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function formatTime(time: string): string {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour < 12 ? "AM" : "PM";
  return `${hour % 12 === 0 ? 12 : hour % 12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

/** Plain text only: there is no HTML to inject into. */
export function buildRequestEmail(ref: string, request: RideRequest): { subject: string; text: string } {
  const lines = [
    `New ride request ${ref}`,
    "",
    "Call the rider to confirm. The ride is NOT booked until you confirm it.",
    "",
    `Rider:        ${oneLine(request.riderName)}`,
    `Phone:        ${oneLine(request.phone)}`,
    `Email:        ${request.email ? oneLine(request.email) : "(none given)"}`,
    "",
    `Pickup:       ${oneLine(request.pickup)}`,
    `Destination:  ${oneLine(request.destination)}`,
    `Appointment:  ${formatDate(request.date)} at ${formatTime(request.time)}`,
    `Trip:         ${labelFor.tripType(request.tripType)}`,
    "",
    `Mobility:     ${labelFor.mobility(request.mobility)}`,
    `People:       ${request.riders}`,
    `Payment:      ${labelFor.payment(request.payment)}`,
    "",
    "Notes:",
    request.notes ? request.notes.replace(/\r\n?/g, "\n") : "(none)",
    "",
    "Sent from the ride request form on the Lakebound Transportation website.",
  ];
  // The subject carries the reference only, never the rider's name or destination.
  return { subject: `New ride request ${ref}`, text: lines.join("\n") };
}

/**
 * Whether it is okay to pretend an unconfigured send succeeded, so the rest of
 * the flow (confirmation screen, reference number) can be tried without a
 * live Resend account.
 *
 * `ALLOW_SIMULATED_EMAIL` is explicit and wins either way. Without it, this
 * falls back to the previous behavior: convenient while developing, strict
 * once actually deployed. The explicit flag matters because `next start`
 * always sets `NODE_ENV=production`, including when a developer or an
 * automated test is simply trying a production build locally — that is not
 * the same thing as a real deployment, and that distinction is exactly what
 * this flag is for. It must never be set on a real deployment: that would
 * mean every ride request silently vanishes instead of reaching dispatch.
 */
function allowSimulatedEmail(): boolean {
  if (process.env.ALLOW_SIMULATED_EMAIL === "1") return true;
  if (process.env.ALLOW_SIMULATED_EMAIL === "0") return false;
  return process.env.NODE_ENV !== "production";
}

export async function sendRideRequest(ref: string, request: RideRequest): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.DISPATCH_EMAIL;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !to || !from) {
    if (allowSimulatedEmail()) {
      console.warn(`[ride-request] ${ref}: email is not configured, so nothing was sent (simulated success).`);
      return { ok: true, simulated: true };
    }
    console.error("[ride-request] Email is not configured. Set RESEND_API_KEY, RESEND_FROM and DISPATCH_EMAIL.");
    return { ok: false, reason: "not-configured" };
  }

  try {
    const { subject, text } = buildRequestEmail(ref, request);
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      subject,
      text,
      ...(request.email ? { replyTo: request.email } : {}),
    });
    if (error) {
      // Log the reference and the error type only. Never log the request itself.
      console.error(`[ride-request] ${ref}: email provider rejected the message (${error.name}).`);
      return { ok: false, reason: "send-failed" };
    }
    return { ok: true, simulated: false };
  } catch (error) {
    console.error(`[ride-request] ${ref}: email could not be sent (${error instanceof Error ? error.name : "unknown"}).`);
    return { ok: false, reason: "send-failed" };
  }
}
