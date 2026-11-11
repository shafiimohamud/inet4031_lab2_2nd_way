import { sendRideRequest } from "@/lib/notify";
import { createRateLimiter } from "@/lib/ratelimit";
import { newReference } from "@/lib/reference";
import { fieldErrors, rideRequestSchema } from "@/lib/schema";
import { site } from "@/lib/site";

/**
 * POST /api/request  -  receives the ride request form.
 *
 * Order of checks: size, format, spam trap, rate limit, validation, then email.
 * Request bodies are never logged.
 */

const MAX_BODY_BYTES = 10_000;
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

const callUs = site.phone ? ` Please call us at ${site.phone.display}.` : " Please call us instead.";

function json(body: unknown, status: number, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return json({ ok: false, message: "This form could not be read." + callUs }, 415);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, message: "This request is too long. Please shorten your notes." }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: "This form could not be read." + callUs }, 400);
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return json({ ok: false, message: "This form could not be read." + callUs }, 400);
  }

  // Spam trap: a field people never see. Bots that fill it get a normal-looking
  // answer, but nothing is sent.
  if (typeof (body as Record<string, unknown>).company === "string" && (body as Record<string, string>).company !== "") {
    return json({ ok: true, ref: newReference() }, 200);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rate = limiter.check(ip);
  if (!rate.allowed) {
    return json(
      { ok: false, message: "Too many requests were sent from this connection. Please wait a few minutes and try again." + callUs },
      429,
      { "Retry-After": String(rate.retryAfterSeconds) },
    );
  }

  const parsed = rideRequestSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, message: "Please check the highlighted fields.", errors: fieldErrors(parsed.error) }, 400);
  }

  const ref = newReference();
  const sent = await sendRideRequest(ref, parsed.data);
  if (!sent.ok) {
    return json({ ok: false, message: "We could not send your request, so it has NOT been received." + callUs }, 502);
  }

  return json({ ok: true, ref }, 200);
}
