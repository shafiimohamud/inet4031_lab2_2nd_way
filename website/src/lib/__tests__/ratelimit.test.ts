import { describe, expect, it } from "vitest";
import { createRateLimiter } from "../ratelimit";

describe("createRateLimiter", () => {
  it("allows requests up to the limit", () => {
    const limiter = createRateLimiter({ limit: 3, windowMs: 1000 });
    const now = 1_000_000;
    expect(limiter.check("1.2.3.4", now).allowed).toBe(true);
    expect(limiter.check("1.2.3.4", now).allowed).toBe(true);
    expect(limiter.check("1.2.3.4", now).allowed).toBe(true);
  });

  it("blocks the request after the limit is reached, within the window", () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000 });
    const now = 1_000_000;
    limiter.check("1.2.3.4", now);
    limiter.check("1.2.3.4", now);
    const result = limiter.check("1.2.3.4", now + 10);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("tracks each key independently", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    const now = 1_000_000;
    expect(limiter.check("1.2.3.4", now).allowed).toBe(true);
    expect(limiter.check("5.6.7.8", now).allowed).toBe(true);
    expect(limiter.check("1.2.3.4", now).allowed).toBe(false);
  });

  it("allows requests again once the window has passed", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    const now = 1_000_000;
    limiter.check("1.2.3.4", now);
    expect(limiter.check("1.2.3.4", now + 999).allowed).toBe(false);
    expect(limiter.check("1.2.3.4", now + 1001).allowed).toBe(true);
  });

  it("reports a sensible retry-after that shrinks as time passes", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 10_000 });
    const now = 1_000_000;
    limiter.check("1.2.3.4", now);
    const soon = limiter.check("1.2.3.4", now + 100).retryAfterSeconds;
    const later = limiter.check("1.2.3.4", now + 8000).retryAfterSeconds;
    expect(soon).toBeGreaterThan(later);
  });
});
