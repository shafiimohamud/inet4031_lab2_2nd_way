import { describe, expect, it } from "vitest";
import { newReference } from "../reference";

describe("newReference", () => {
  it("matches the LB-XXXXXX shape with no ambiguous characters", () => {
    for (let i = 0; i < 200; i++) {
      expect(newReference()).toMatch(/^LB-[2-9A-HJ-NP-Z]{6}$/);
    }
  });

  it("never contains 0, 1, I, L, or O in the random part (easy to mishear on the phone; the literal 'LB-' prefix is exempt)", () => {
    for (let i = 0; i < 200; i++) {
      const randomPart = newReference().slice(3);
      expect(randomPart).not.toMatch(/[01ILO]/);
    }
  });

  it("is not trivially predictable: 50 draws are not all identical", () => {
    const codes = new Set(Array.from({ length: 50 }, () => newReference()));
    expect(codes.size).toBeGreaterThan(1);
  });
});
