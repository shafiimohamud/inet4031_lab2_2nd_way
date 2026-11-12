import { expect, test } from "@playwright/test";
import { waitForLoader } from "./helpers";

/**
 * The light/dark toggle (ThemeToggle.tsx): light is the default for every
 * visitor regardless of their device's own setting, and switching to dark
 * is remembered for next time.
 */

test("defaults to light even when the device prefers dark", async ({ browser }) => {
  const context = await browser.newContext({ colorScheme: "dark" });
  const page = await context.newPage();
  await page.goto("/");
  await waitForLoader(page);
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "Switch to dark theme" })).toBeVisible();
  await context.close();
});

test("switches to dark, updates the toggle, and is remembered on the next visit", async ({ page }) => {
  await page.goto("/");
  await waitForLoader(page);

  const toggle = page.getByRole("button", { name: /Switch to (dark|light) theme/ });
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", "dark");

  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#0f1f3d");

  // A full reload, not just client navigation: this is what proves the
  // inline anti-flash script (not just React state) is doing its job.
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();

  // Switch back, and that sticks too.
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "Switch to dark theme" })).toBeVisible();
});

test("the choice carries across pages", async ({ page }) => {
  await page.goto("/");
  await waitForLoader(page);
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.getByRole("link", { name: "Services", exact: true }).first().click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
