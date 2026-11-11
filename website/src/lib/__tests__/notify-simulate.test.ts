import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendRideRequest } from "../notify";
import type { RideRequest } from "../schema";

/**
 * Covers the "pretend an unconfigured send succeeded" decision in
 * sendRideRequest, kept in its own file because it mutates process.env.
 */

const request: RideRequest = {
  riderName: "Jamie Rivera",
  phone: "952-555-0123",
  email: "",
  pickup: "123 Example St",
  destination: "Example Clinic",
  date: "2026-06-15",
  time: "09:30",
  tripType: "one-way",
  mobility: "ambulatory",
  riders: "1",
  payment: "private",
  notes: "",
};

beforeEach(() => {
  // Read by sendRideRequest's "is email configured" check; unset in every
  // test here so that check always fails and the simulate/refuse decision
  // is the only thing under test.
  vi.stubEnv("RESEND_API_KEY", "");
  vi.stubEnv("RESEND_FROM", "");
  vi.stubEnv("DISPATCH_EMAIL", "");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("sendRideRequest, unconfigured", () => {
  it("simulates success when ALLOW_SIMULATED_EMAIL=1, even under a production build", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ALLOW_SIMULATED_EMAIL", "1");
    const result = await sendRideRequest("LB-TEST01", request);
    expect(result).toEqual({ ok: true, simulated: true });
  });

  it("refuses when ALLOW_SIMULATED_EMAIL=0, even outside production", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("ALLOW_SIMULATED_EMAIL", "0");
    const result = await sendRideRequest("LB-TEST02", request);
    expect(result).toEqual({ ok: false, reason: "not-configured" });
  });

  it("without the flag, simulates success outside production (developer convenience)", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const result = await sendRideRequest("LB-TEST03", request);
    expect(result).toEqual({ ok: true, simulated: true });
  });

  it("without the flag, refuses in production (a real deployment must never lose a ride silently)", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const result = await sendRideRequest("LB-TEST04", request);
    expect(result).toEqual({ ok: false, reason: "not-configured" });
  });
});
