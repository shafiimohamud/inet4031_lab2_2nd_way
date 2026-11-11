"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";
import { NavLinks } from "./NavLinks";

/** Menu button and drop-down panel for small screens. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and returns focus to the button.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="btn btn-outline px-3"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
        Menu
      </button>
      <nav
        id={panelId}
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-page shadow-lg"
      >
        <ul className="container-page flex flex-col py-3">
          <NavLinks
            onNavigate={close}
            itemClassName="flex min-h-12 items-center border-b border-line py-2 font-semibold text-ink aria-[current=page]:text-link"
          />
          <li className="pt-4 pb-2">
            <Link href="/request-a-ride" onClick={close} className="btn btn-primary w-full">
              Request a ride
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
