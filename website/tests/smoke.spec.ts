import { expect, test } from "@playwright/test";
import { waitForLoader } from "./helpers";

test("home page loads, the loading screen clears, and the main call to action works", async ({ page }) => {
  await page.goto("/");
  await waitForLoader(page);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: "Request a ride", exact: false }).first().click();
  await expect(page).toHaveURL(/\/request-a-ride$/);
});

test("main navigation reaches every top-level page", async ({ page }) => {
  await page.goto("/");
  await waitForLoader(page);
  for (const [label, path] of [
    ["Services", "/services"],
    ["Service area", "/service-area"],
    ["FAQ", "/faq"],
    ["Contact", "/contact"],
  ] as const) {
    await page.getByRole("link", { name: label, exact: true }).first().click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
  }
});

test("an unknown URL shows the not-found page instead of an error", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await waitForLoader(page);
  await expect(page.getByRole("heading", { name: /could not find that page/i })).toBeVisible();
  await page.getByRole("link", { name: "Request a ride", exact: false }).first().click();
  await expect(page).toHaveURL(/\/request-a-ride$/);
});

test("the guides index links to every guide, and each one links back", async ({ page }) => {
  await page.goto("/guides");
  await waitForLoader(page);
  const links = page.getByRole("main").getByRole("link");
  await expect(links).toHaveCount(6); // 3 titles + 3 "Read" links, one pair per guide

  await page.getByRole("link", { name: "How to book a ride to dialysis" }).click();
  await expect(page).toHaveURL(/\/guides\/booking-a-ride-to-dialysis$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("How to book a ride to dialysis");
  await page.getByRole("link", { name: "More guides" }).click();
  await expect(page).toHaveURL(/\/guides$/);
});

test("robots.txt and sitemap.xml are served, and the sitemap lists the guides", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Sitemap:");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const body = await sitemap.text();
  expect(body).toContain("<urlset");
  expect(body).toContain("/guides/booking-a-ride-to-dialysis");
});

const everyPage = [
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

test("no page ever scrolls horizontally, across common phone widths", async ({ page }) => {
  test.setTimeout(90_000); // 15 pages x 6 widths, well past the 30s default
  // Regression test, two bugs caught this way:
  //  1. Adding the theme toggle to the header once overflowed every page by
  //     ~30px at 360-414px wide — the single most common phone width range
  //     (iPhone 12/13/14 at 390, many Android phones at 360/412) — because
  //     there wasn't room for it next to the brand name and Menu button.
  //     Fixed by moving it into the menu panel below sm:.
  //  2. A single long word in a page title ("Nondiscrimination", with
  //     nothing shorter to break to) silently painted past the edge of a
  //     320px screen without making its own box measure any wider. Fixed
  //     with overflow-wrap on headings (globals.css) — this check is what
  //     would catch the next page that runs into the same thing.
  for (const width of [320, 360, 375, 390, 414, 428]) {
    await page.setViewportSize({ width, height: 700 });
    for (const path of everyPage) {
      await page.goto(path);
      await waitForLoader(page);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${path} at ${width}px wide: page is ${overflow}px wider than the viewport`).toBeLessThanOrEqual(0);
    }
  }
});

test("on a narrow phone, the theme toggle lives in the menu panel instead of the header", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 700 });
  await page.goto("/");
  await waitForLoader(page);

  await expect(page.getByRole("button", { name: "Switch to dark theme" })).toBeHidden();
  await page.getByRole("button", { name: "Menu" }).click();

  const toggle = page.getByRole("button", { name: "Switch to dark theme" });
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
});

test("security headers are present", async ({ request }) => {
  const response = await request.get("/");
  const headers = response.headers();
  expect(headers["content-security-policy"]).toContain("default-src 'self'");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["x-content-type-options"]).toBe("nosniff");
});
