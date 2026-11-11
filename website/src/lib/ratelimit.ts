/**
 * Small in-memory rate limiter (sliding window).
 *
 * Phase 1 only: memory is per server instance, so on serverless hosting each
 * instance counts separately and the count resets on restart. Phase 2 replaces
 * this with Upstash Redis (blueprint section 6).
 */

type Options = { limit: number; windowMs: number };

export function createRateLimiter({ limit, windowMs }: Options) {
  const hits = new Map<string, number[]>();

  function prune(now: number) {
    for (const [key, times] of hits) {
      const recent = times.filter((time) => now - time < windowMs);
      if (recent.length) hits.set(key, recent);
      else hits.delete(key);
    }
  }

  return {
    /** Records one attempt and says whether it is allowed. */
    check(key: string, now: number = Date.now()): { allowed: boolean; retryAfterSeconds: number } {
      if (hits.size > 5000) prune(now);
      const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000)) };
      }
      recent.push(now);
      hits.set(key, recent);
      return { allowed: true, retryAfterSeconds: 0 };
    },
    size: () => hits.size,
  };
}
