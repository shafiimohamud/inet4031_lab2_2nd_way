"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneIcon } from "./icons";

/**
 * Phones only: the two main actions stay fixed at the bottom of the screen,
 * so "Request a ride" and "Call" are always one tap away, however far the
 * visitor has scrolled. On the request page itself only "Call" is shown.
 */
export function MobileActionBar({ phone }: { phone: { display: string; href: string } | null }) {
  const onRequestPage = usePathname() === "/request-a-ride";
  if (onRequestPage && !phone) return null;

  return (
    <>
      {/* Keeps the end of the page from hiding behind the bar */}
      <div aria-hidden="true" className="h-20 sm:hidden" />
      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-page px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgb(0_0_0/0.12)] sm:hidden"
      >
        <ul className="flex gap-2">
          {!onRequestPage && (
            <li className="flex-1">
              <Link href="/request-a-ride" className="btn btn-primary w-full px-2">
                Request a ride
              </Link>
            </li>
          )}
          {phone && (
            <li className="flex-1">
              <a href={phone.href} className="btn btn-accent w-full px-2">
                <PhoneIcon />
                Call<span className="sr-only"> {phone.display}</span>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
