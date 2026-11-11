import type { ReactNode } from "react";
import { missingSetup, reviewMode } from "@/lib/site";

/**
 * Marks a legal or program-rule claim that must be confirmed with the source
 * (Minnesota DHS, an attorney, the insurer) before the site goes live.
 * The note only shows in review mode; the public never sees it.
 */
export function Verify({ children }: { children: ReactNode }) {
  if (!reviewMode) return null;
  return (
    <span className="mx-1 inline-block rounded bg-warn-bg px-2 py-0.5 align-middle text-[0.8rem] font-bold leading-snug text-warn-ink">
      VERIFY: {children}
    </span>
  );
}

/**
 * A place where only the owner knows the answer (a policy, a list, a photo).
 * In review mode it shows what is needed; on the live site it shows nothing,
 * so no placeholder or made-up content is ever published.
 */
export function NeedsInput({ children }: { children: ReactNode }) {
  if (!reviewMode) return null;
  return (
    <p className="my-3 rounded-lg border-2 border-dashed border-warn-ink bg-warn-bg px-4 py-3 text-[0.9rem] font-semibold text-warn-ink">
      NEEDS YOUR INPUT: {children}
    </p>
  );
}

/** Shown on every page until the site has a real phone number and email. */
export function SetupBanner() {
  const missing = missingSetup();
  if (missing.length === 0) return null;
  return (
    <div role="note" className="bg-warn-bg px-4 py-2 text-center text-[0.9rem] font-semibold text-warn-ink">
      Site setup is not finished. Still needed: {missing.join(" and ")}.
    </div>
  );
}
