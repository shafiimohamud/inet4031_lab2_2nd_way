import type { Page } from "@playwright/test";

/** Waits for the animated logo loading screen to finish and remove itself. */
export async function waitForLoader(page: Page) {
  await page.waitForFunction(() => {
    const el = document.getElementById("lb-loader");
    return !el || getComputedStyle(el).display === "none";
  });
}
