"use client";

import { useLayoutEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

/**
 * Manual light/dark switch. Light is the default for every visitor, no
 * matter what their device prefers — dark only applies once someone picks
 * it here, and the choice is remembered for their next visit.
 *
 * The inline script in layout.tsx applies a remembered choice before the
 * first paint (see the comment there), so there is no flash of the wrong
 * theme. This component's icon is computed the same way, from the same
 * stored value, so it matches from its very first render too.
 */

const STORAGE_KEY = "lb-theme";
const LIGHT_THEME_COLOR = "#ffffff";
const DARK_THEME_COLOR = "#0f1f3d";

type Theme = "light" | "dark";

/** Reads the same source the inline script in layout.tsx already used, so the two always agree. */
function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    return localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function apply(theme: Theme) {
  if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
  else document.documentElement.removeAttribute("data-theme");
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? DARK_THEME_COLOR : LIGHT_THEME_COLOR);
}

export function ThemeToggle() {
  // A lazy initializer, not an effect: on the server (and on a first,
  // never-visited-before browser) this reads "light", matching the HTML
  // layout.tsx always sends. A returning visitor who chose dark gets "dark"
  // immediately on this component's very first client render, which is
  // expected to differ from that generic server markup — hence
  // suppressHydrationWarning below, the same way layout.tsx uses it on
  // <html> for the same reason.
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  // React's Strict Mode remounts components once in development and resets
  // <html> to only the attributes it manages from JSX, clearing whatever the
  // inline script set. Re-apply it here; this is a no-op in production. See
  // the Next.js "Preventing Flash" guide's section on this exact situation.
  useLayoutEffect(() => {
    if (theme === "dark") apply("dark");
  }, [theme]);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
    try {
      if (next === "dark") localStorage.setItem(STORAGE_KEY, "dark");
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Private browsing or a blocked localStorage: the toggle still works
      // for this visit, it just won't be remembered next time.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "dark"}
      suppressHydrationWarning
      className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border-2 border-ink text-ink hover:bg-surface"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      <span className="sr-only">{theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}</span>
    </button>
  );
}
