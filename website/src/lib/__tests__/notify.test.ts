import { describe, expect, it } from "vitest";
import { buildRequestEmail, formatDate, formatTime } from "../notify";
import type { RideRequest } from "../schema";

const baseRequest: RideRequest = {
  riderName: "Jamie Rivera",
  phone: "952-555-0123",
  email: "",
  pickup: "123 Example St, Shakopee, MN",
  destination: "Example Clinic, 456 Sample Ave",
  date: "2026-06-15",
  time: "09:30",
  tripType: "round-trip",
  mobility: "wheelchair",
  riders: "2",
  payment: "private",
  notes: "",
};

describe("formatDate", () => {
  it("renders a friendly, unambiguous date", () => {
    expect(formatDate("2026-06-15")).toBe("Monday, June 15, 2026");
  });
});

describe("formatTime", () => {
  it("renders 12-hour times with AM/PM", () => {
    expect(formatTime("09:30")).toBe("9:30 AM");
    expect(formatTime("13:05")).toBe("1:05 PM");
    expect(formatTime("00:00")).toBe("12:00 AM");
    expect(formatTime("12:00")).toBe("12:00 PM");
  });
});

describe("buildRequestEmail", () => {
  it("includes the reference, rider details, and a do-not-book-yet reminder", () => {
    const { subject, text } = buildRequestEmail("LB-ABC123", baseRequest);
    expect(subject).toBe("New ride request LB-ABC123");
    expect(text).toContain("Jamie Rivera");
    expect(text).toContain("952-555-0123");
    expect(text).toContain("Monday, June 15, 2026");
    expect(text).toContain("9:30 AM");
    expect(text).toContain("NOT booked until you confirm");
  });

  it("never lets notes text forge extra header-like lines (plain text only, so nothing to inject)", () => {
    const { text } = buildRequestEmail("LB-ABC123", {
      ...baseRequest,
      notes: "Bcc: attacker@example.com\nSubject: hijacked",
    });
    // The notes are shown verbatim in the body (that's expected and safe for plain text),
    // but the single-line fields above them must never be split by a newline a rider typed.
    const riderLine = text.split("\n").find((line) => line.startsWith("Rider:"));
    expect(riderLine).toBe("Rider:        Jamie Rivera");
  });

  it("keeps single-line fields on one line even if they contain newlines or unicode line separators", () => {
    const { text } = buildRequestEmail("LB-ABC123", {
      ...baseRequest,
      riderName: "Jamie\nRivera",
      pickup: "123 Example St Shakopee",
    });
    const lines = text.split("\n");
    expect(lines.some((line) => line.startsWith("Rider:"))).toBe(true);
    expect(lines.find((line) => line.startsWith("Rider:"))).toBe("Rider:        Jamie Rivera");
    expect(lines.find((line) => line.startsWith("Pickup:"))).toBe("Pickup:       123 Example St Shakopee");
  });

  it("shows '(none given)' for an absent email and '(none)' for empty notes", () => {
    const { text } = buildRequestEmail("LB-ABC123", baseRequest);
    expect(text).toContain("Email:        (none given)");
    expect(text).toContain("(none)");
  });
});
