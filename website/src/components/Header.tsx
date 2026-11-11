import Link from "next/link";
import { site } from "@/lib/site";
import { CallLink } from "./CallLink";
import { ClockIcon } from "./icons";
import { LogoMark } from "./Logo";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <>
      {/* Top bar: the phone number, large and tap-to-call, plus hours when they are set */}
      <div className="bg-surface text-ink">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-1.5 sm:justify-between">
          <p className="flex items-center gap-2 text-[0.92rem] text-muted">
            {site.hours ? (
              <>
                <ClockIcon />
                {site.hours}
              </>
            ) : (
              <>Rides to medical appointments in {site.serviceArea}</>
            )}
          </p>
          <CallLink
            label="Call"
            className="inline-flex min-h-12 items-center gap-2 text-[1.15rem] font-bold text-ink underline decoration-2 underline-offset-4"
          />
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-page">
        <div className="container-page relative flex items-center justify-between gap-3 py-2.5">
          <Link href="/" className="flex items-center gap-3 rounded-lg text-ink no-underline">
            <LogoMark className="h-12 w-auto shrink-0" />
            {/* On the narrowest phones (320px) the name is kept for screen readers only, so nothing overflows */}
            <span className="leading-tight max-[359px]:sr-only">
              <span className="block text-[1.05rem] font-extrabold tracking-wide">LAKEBOUND</span>
              <span className="block text-[0.72rem] font-bold tracking-[0.14em]">TRANSPORTATION</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <NavLinks itemClassName="flex min-h-12 items-center rounded-lg px-3 font-semibold text-ink hover:bg-surface aria-[current=page]:text-link aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8" />
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/request-a-ride" className="btn btn-primary hidden sm:inline-flex">
              Request a ride
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
