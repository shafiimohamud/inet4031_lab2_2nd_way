import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Result } from "axe-core";
import { waitForLoader } from "./helpers";

/**
 * Automated accessibility checks (blueprint: "automated axe checks in CI").
 *
 * This catches real WCAG violations (missing labels, bad contrast, invalid
 * ARIA, etc.) automatically, but it is not a substitute for the manual
 * keyboard and screen-reader pass the Accessibility page itself asks for:
 * axe can only check what a machine can verify.
 */

const pages = [
  "/",
  "/request-a-ride",
  "/services",
  "/service-area",
  "/medicaid-and-insurance",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
  "/nondiscrimination",
  "/guides",
  "/guides/booking-a-ride-to-dialysis",
  "/guides/wheelchair-transportation-what-to-expect",
  "/guides/questions-to-ask-an-nemt-provider",
];

for (const path of pages) {
  test(`${path} has no automatically detectable accessibility violations`, async ({ page }) => {
    await page.goto(path);
    await waitForLoader(page);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
    expect(results.violations, summarize(results.violations)).toEqual([]);
  });
}

test("the 404 page is also accessible", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  await waitForLoader(page);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
  expect(results.violations, summarize(results.violations)).toEqual([]);
});

// Dark mode is opt-in (the ThemeToggle), so it needs its own pass: the
// pages above only ever run in the default light theme. One test per path
// (rather than a loop inside a single test) so each gets its own timeout
// and its own worker, instead of forcing two full page loads and two axe
// scans to share one budget.
for (const path of ["/", "/request-a-ride"]) {
  test(`${path} in dark mode has no automatically detectable accessibility violations`, async ({ page }) => {
    await page.goto(path);
    await waitForLoader(page);
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
    expect(results.violations, summarize(results.violations)).toEqual([]);
  });
}

function summarize(violations: Result[]): string {
  if (violations.length === 0) return "";
  return violations
    .map((v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => JSON.stringify(n.target)).join("\n  ")}`)
    .join("\n\n");
}
