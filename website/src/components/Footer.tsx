import Link from "next/link";
import { legalNav, mainNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";
import { LogoLockup } from "./Logo";

const footerLink = "inline-flex min-h-11 items-center text-body underline decoration-1 underline-offset-4 hover:decoration-2";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[auto_1fr_1fr_1fr]">
        <LogoLockup className="h-auto w-36" />

        <div>
          <h2 className="mb-3 text-[1.05rem]">Contact</h2>
          <ul className="space-y-2">
            {site.phone && (
              <li>
                <a href={site.phone.href} className={`${footerLink} gap-2 font-bold`}>
                  <PhoneIcon />
                  {site.phone.display}
                </a>
              </li>
            )}
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className={`${footerLink} gap-2 break-all`}>
                  <MailIcon />
                  {site.email}
                </a>
              </li>
            )}
            {site.hours && (
              <li className="flex items-center gap-2">
                <ClockIcon />
                {site.hours}
              </li>
            )}
            <li className="flex items-center gap-2">
              <PinIcon />
              {site.city}, {site.region}
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-3 text-[1.05rem]">Explore</h2>
          <ul>
            <li>
              <Link href="/request-a-ride" className={footerLink}>
                Request a ride
              </Link>
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/guides" className={footerLink}>
                Guides
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="mb-3 text-[1.05rem]">Policies</h2>
          <ul>
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-page space-y-2 py-6 text-[0.92rem] text-muted">
          <p className="font-bold text-ink">
            This is not an emergency service. If you have a medical emergency, call 911.
          </p>
          <p>
            {site.legalName} · USDOT {site.usdot} · {site.city}, {site.region}
          </p>
          <p>Non-emergency medical transportation: rides to medical appointments. We do not provide medical care.</p>
        </div>
      </div>
    </footer>
  );
}
