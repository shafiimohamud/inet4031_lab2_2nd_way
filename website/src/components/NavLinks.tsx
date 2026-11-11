"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/nav";

/** Navigation links with the current page marked for sighted and screen-reader users. */
export function NavLinks({ itemClassName, onNavigate }: { itemClassName: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {mainNav.map((item) => {
        const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              onClick={onNavigate}
              className={itemClassName}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </>
  );
}
