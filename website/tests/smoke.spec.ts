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

test("security headers are present", async ({ request }) => {
  const response = await request.get("/");
  const headers = response.headers();
  expect(headers["content-security-policy"]).toContain("default-src 'self'");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["x-content-type-options"]).toBe("nosniff");
});
