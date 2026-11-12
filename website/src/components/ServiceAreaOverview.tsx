import { PinIcon } from "./icons";
import { site } from "@/lib/site";

/**
 * A simple, honest "where we cover" visual (blueprint section 3: "Service
 * area map (simple, not interactive at first)"). This is deliberately NOT a
 * literal map — building an accurate one means either real county-boundary
 * geographic data (verified, or it risks being quietly wrong) or an
 * embedded Google Maps iframe (a privacy tradeoff worth deciding on
 * purpose, and it would need the CSP's frame-src opened up for it). Until
 * one of those is wanted, a home-base pin plus the service counties as
 * plain, honest, data-driven tags is the common pattern local-service sites
 * use for exactly this, and a real interactive map can replace it later
 * (see the blueprint's own Phase 2/3 plans) without changing anything that
 * reads from it.
 */
export function ServiceAreaOverview({ compact }: { compact?: boolean }) {
  return (
    <div className={`rounded-2xl border border-line bg-page ${compact ? "p-6" : "p-6 sm:p-8"}`}>
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="relative flex h-16 w-16 flex-none items-center justify-center rounded-full before:absolute before:inset-[-10px] before:rounded-full before:border-2 before:border-dashed before:border-line"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-on-brand">
            <PinIcon width="1.6em" height="1.6em" />
          </span>
        </span>
        <div>
          <p className="text-[0.85rem] font-bold uppercase tracking-wide text-muted">Based in</p>
          <p className="text-[1.3rem] font-extrabold text-ink">
            {site.city}, {site.region}
          </p>
        </div>
      </div>

      <p className="mt-6 font-bold text-ink">Serving</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {site.areaServed.map((area) => (
          <li key={area} className="rounded-full border border-line bg-surface px-4 py-1.5 font-semibold text-ink">
            {area.replace(", MN", "")}
          </li>
        ))}
      </ul>
    </div>
  );
}
