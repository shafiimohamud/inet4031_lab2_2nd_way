import { describe, expect, it } from "vitest";
import {
  emptyRideRequest,
  fieldErrors,
  isCalendarDate,
  isoDay,
  isUsPhone,
  rideRequestSchema,
} from "../schema";

describe("isUsPhone", () => {
  it("accepts a plain 10-digit number", () => {
    expect(isUsPhone("9525550123")).toBe(true);
  });
  it("accepts common punctuated formats", () => {
    expect(isUsPhone("(952) 555-0123")).toBe(true);
    expect(isUsPhone("952-555-0123")).toBe(true);
    expect(isUsPhone("952.555.0123")).toBe(true);
  });
  it("accepts a leading country code 1", () => {
    expect(isUsPhone("19525550123")).toBe(true);
    expect(isUsPhone("+1 952 555 0123")).toBe(true);
  });
  it("rejects numbers that are too short or too long", () => {
    expect(isUsPhone("12345")).toBe(false);
    expect(isUsPhone("952555012399999")).toBe(false);
  });
  it("rejects a number starting with 0 or 1 (not a valid US area code)", () => {
    expect(isUsPhone("0525550123")).toBe(false);
    expect(isUsPhone("1525550123")).toBe(false);
  });
  it("rejects non-numeric input", () => {
    expect(isUsPhone("call me maybe")).toBe(false);
    expect(isUsPhone("")).toBe(false);
  });
});

describe("isCalendarDate", () => {
  it("accepts a real calendar date", () => {
    expect(isCalendarDate("2026-03-15")).toBe(true);
  });
  it("accepts leap day on a leap year", () => {
    expect(isCalendarDate("2028-02-29")).toBe(true);
  });
  it("rejects leap day on a non-leap year", () => {
    expect(isCalendarDate("2027-02-29")).toBe(false);
  });
  it("rejects an out-of-range month or day", () => {
    expect(isCalendarDate("2026-13-01")).toBe(false);
    expect(isCalendarDate("2026-00-01")).toBe(false);
    expect(isCalendarDate("2026-04-31")).toBe(false);
  });
  it("rejects malformed strings", () => {
    expect(isCalendarDate("03/15/2026")).toBe(false);
    expect(isCalendarDate("2026-3-5")).toBe(false);
    expect(isCalendarDate("not a date")).toBe(false);
    expect(isCalendarDate("")).toBe(false);
  });
});

describe("isoDay", () => {
  it("formats the given instant as yyyy-mm-dd in UTC", () => {
    expect(isoDay(0, new Date("2026-06-15T23:59:00Z"))).toBe("2026-06-15");
  });
  it("adds the offset in whole days", () => {
    expect(isoDay(1, new Date("2026-06-15T12:00:00Z"))).toBe("2026-06-16");
    expect(isoDay(-1, new Date("2026-06-15T12:00:00Z"))).toBe("2026-06-14");
  });
  it("rolls over a month and year boundary", () => {
    expect(isoDay(1, new Date("2026-12-31T12:00:00Z"))).toBe("2027-01-01");
  });
});

const validRequest = {
  riderName: "Jamie Rivera",
  phone: "952-555-0123",
  email: "",
  pickup: "123 Example St, Shakopee, MN",
  destination: "Example Clinic, 456 Sample Ave",
  date: isoDay(5),
  time: "09:30",
  tripType: "round-trip",
  mobility: "wheelchair",
  riders: "1",
  payment: "private",
  notes: "",
};

describe("rideRequestSchema", () => {
  it("accepts a fully valid request", () => {
    const result = rideRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it("accepts the empty-form defaults for the fields that start blank", () => {
    // emptyRideRequest is meant to fail validation (it is a starting point, not a
    // submittable request) but every one of its keys must exist in the schema.
    const keys = Object.keys(rideRequestSchema.shape).sort();
    expect(Object.keys(emptyRideRequest).sort()).toEqual(keys);
  });

  it("trims whitespace from text fields", () => {
    const result = rideRequestSchema.safeParse({ ...validRequest, riderName: "  Jamie Rivera  " });
    expect(result.success).toBe(true);
    expect(result.success && result.data.riderName).toBe("Jamie Rivera");
  });

  it("rejects a one-character name", () => {
    const result = rideRequestSchema.safeParse({ ...validRequest, riderName: "J" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email but allows an empty one (it is optional)", () => {
    expect(rideRequestSchema.safeParse({ ...validRequest, email: "not-an-email" }).success).toBe(false);
    expect(rideRequestSchema.safeParse({ ...validRequest, email: "" }).success).toBe(true);
    expect(rideRequestSchema.safeParse({ ...validRequest, email: "rider@example.com" }).success).toBe(true);
  });

  it("rejects a date in the past beyond the one-day clock-skew allowance", () => {
    expect(rideRequestSchema.safeParse({ ...validRequest, date: isoDay(-2) }).success).toBe(false);
  });

  it("rejects a date more than a year out", () => {
    expect(rideRequestSchema.safeParse({ ...validRequest, date: isoDay(400) }).success).toBe(false);
  });

  it("rejects a value that is not one of the fixed options", () => {
    expect(rideRequestSchema.safeParse({ ...validRequest, tripType: "teleport" }).success).toBe(false);
    expect(rideRequestSchema.safeParse({ ...validRequest, mobility: "<script>" }).success).toBe(false);
    expect(rideRequestSchema.safeParse({ ...validRequest, payment: "bitcoin" }).success).toBe(false);
    expect(rideRequestSchema.safeParse({ ...validRequest, riders: "99" }).success).toBe(false);
  });

  it("rejects oversized notes", () => {
    expect(rideRequestSchema.safeParse({ ...validRequest, notes: "x".repeat(601) }).success).toBe(false);
    expect(rideRequestSchema.safeParse({ ...validRequest, notes: "x".repeat(600) }).success).toBe(true);
  });

  it("never requires a diagnosis, Medicaid ID, or date of birth (not in the schema at all)", () => {
    const keys = Object.keys(rideRequestSchema.shape);
    for (const forbidden of ["diagnosis", "medicaidId", "dob", "dateOfBirth", "ssn", "insuranceId"]) {
      expect(keys).not.toContain(forbidden);
    }
  });
});

describe("fieldErrors", () => {
  it("keeps only the first message per field", () => {
    const result = rideRequestSchema.safeParse({ ...validRequest, riderName: "", phone: "123" });
    if (result.success) throw new Error("expected validation to fail");
    const errors = fieldErrors(result.error);
    expect(errors.riderName).toBeTruthy();
    expect(errors.phone).toBeTruthy();
    expect(errors.pickup).toBeUndefined();
  });
});
