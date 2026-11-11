import { expect, test } from "@playwright/test";
import { waitForLoader } from "./helpers";

/**
 * End-to-end coverage of the ride request form: the site's "money page"
 * (blueprint section 3). The dev server has no RESEND_API_KEY configured, so
 * src/lib/notify.ts simulates a successful send instead of emailing anyone —
 * exactly the behavior a developer gets when trying the form locally.
 */

test.beforeEach(async ({ page }) => {
  await page.goto("/request-a-ride");
  await waitForLoader(page);
});

test("submitting an empty form lists every problem and focuses the first one", async ({ page }) => {
  await page.getByRole("button", { name: "Send ride request" }).click();

  const summary = page.getByRole("alert").first();
  await expect(summary).toContainText(/Please fix \d+ fields/);

  // Every field the summary names should also show its own inline message.
  const inlineErrors = page.locator(".field-error");
  await expect(inlineErrors).toHaveCount(9);

  // Focus should land on the FIRST invalid field as the page shows it (top to
  // bottom), not in whatever order React Hook Form happened to register the
  // fields internally.
  await expect(page.locator('input[name="riderName"]')).toBeFocused();
});

test("explains exactly what is wrong with bad input", async ({ page }) => {
  await page.fill('input[name="riderName"]', "Test Rider");
  await page.fill('input[name="phone"]', "12345");
  await page.fill('input[name="email"]', "not-an-email");
  await page.fill('input[name="pickup"]', "123 Example St, Shakopee");
  await page.fill('input[name="destination"]', "Example Clinic, 456 Sample Ave");
  await page.fill('input[name="date"]', "2020-01-01");
  await page.fill('input[name="time"]', "10:30");
  await page.getByRole("button", { name: "Send ride request" }).click();

  await expect(page.locator(".field-error")).toContainText([
    /10-digit phone number/,
    /email address like/,
    /today or a future date/,
  ]);
});

test("a complete, valid request is accepted and shows a reference number", async ({ page }) => {
  const future = new Date(Date.now() + 5 * 86_400_000).toISOString().slice(0, 10);

  await page.fill('input[name="riderName"]', "Jamie Rivera");
  await page.fill('input[name="phone"]', "(952) 555-0188");
  await page.fill('input[name="pickup"]', "123 Example St, Shakopee");
  await page.fill('input[name="destination"]', "Example Clinic, 456 Sample Ave");
  await page.fill('input[name="date"]', future);
  await page.fill('input[name="time"]', "09:15");
  await page.getByText("Round trip (there and back)").click();
  await page.getByText("I use a wheelchair").click();
  await page.selectOption('select[name="riders"]', "2");
  await page.selectOption('select[name="payment"]', "private");
  await page.fill('textarea[name="notes"]', "Gate code 1234. Two steps at the front door.");

  await page.getByRole("button", { name: "Send ride request" }).click();

  const heading = page.getByRole("heading", { name: "We received your request" });
  await expect(heading).toBeVisible();
  await expect(heading).toBeFocused();
  // Scoped to the confirmation section: "call 911" and similar also appear
  // elsewhere on the page (the header warning, the footer notice).
  const confirmation = page.locator("section", { has: heading });
  await expect(confirmation.getByText(/LB-[2-9A-HJ-NP-Z]{6}/)).toBeVisible();
  await expect(confirmation.getByText(/not booked until we confirm/i)).toBeVisible();
  await expect(confirmation.getByText(/call 911/i)).toBeVisible();

  await page.getByRole("button", { name: "Request another ride" }).click();
  await expect(page.locator('input[name="riderName"]')).toHaveValue("");
});

test("the server re-validates and rejects what the browser should never send", async ({ request }) => {
  const future = new Date(Date.now() + 5 * 86_400_000).toISOString().slice(0, 10);
  const good = {
    riderName: "Jamie Rivera",
    phone: "952-555-0188",
    email: "",
    pickup: "123 Example St",
    destination: "Example Clinic",
    date: future,
    time: "09:15",
    tripType: "one-way",
    mobility: "ambulatory",
    riders: "1",
    payment: "not-sure",
    notes: "",
  };

  const badPhone = await request.post("/api/request", { data: { ...good, phone: "abc" } });
  expect(badPhone.status()).toBe(400);
  expect((await badPhone.json()).errors.phone).toBeTruthy();

  const fakeOption = await request.post("/api/request", { data: { ...good, payment: "bitcoin" } });
  expect(fakeOption.status()).toBe(400);

  const wrongType = await request.post("/api/request", { data: "not json" as never, headers: { "Content-Type": "text/plain" } });
  expect(wrongType.status()).toBe(415);

  const getNotAllowed = await request.get("/api/request");
  expect(getNotAllowed.status()).toBe(405);
});
