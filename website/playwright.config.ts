import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end and accessibility checks.
 *
 * Run with `npm run test:e2e` (starts its own `next dev` server automatically;
 * see `webServer` below). A single Chromium project is enough here: this is a
 * content-and-forms site with no browser-specific code, and Chromium is the
 * browser this environment has preinstalled. Add Firefox/WebKit projects if
 * you later add something that could behave differently across engines.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:3310",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // A production server, not `next dev`: faster and far steadier under the
    // concurrent requests several parallel test workers send it, and a more
    // faithful rehearsal of what actually ships.
    command: "npm run build && npm run start -- --port 3310",
    url: "http://127.0.0.1:3310",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      // A real phone/email/hours configuration so the UI that depends on them
      // (tap-to-call, the footer, the Contact page) renders the way a launched
      // site would, instead of the "setup is not finished" placeholders.
      NEXT_PUBLIC_PHONE: "952-555-0123",
      NEXT_PUBLIC_CONTACT_EMAIL: "dispatch@example.com",
      NEXT_PUBLIC_HOURS: "Monday to Friday, 6 am to 6 pm",
      NEXT_PUBLIC_SITE_URL: "http://127.0.0.1:3310",
      // No live Resend account here, so let the ride-request flow simulate a
      // successful send and still exercise everything after it (the
      // confirmation screen, the reference number). See src/lib/notify.ts —
      // this must never be set anywhere a real site is actually deployed.
      ALLOW_SIMULATED_EMAIL: "1",
    },
  },
});
