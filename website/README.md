# Lakebound Transportation — website

The Lakebound Transportation (NEMT) website, built from `WEBSITE-BLUEPRINT.md`.
This covers **Phase 1** of the blueprint's roadmap (the launchable site: ride
request form, email notification, legal pages, accessibility, tap-to-call),
plus a few Phase 2/SEO items that were low-cost to include now (JSON-LD,
sitemap/robots, security headers, automated tests). Phase 2 proper (database,
admin dashboard, SMS, translations) and Phase 3 (ride tracking, accounts,
broker reports) are **not built yet** — see the blueprint for that roadmap.

## Before this can go live

1. **Fill in `.env.local`.** Copy `.env.example` and set real values — see
   that file for what each one does. Without a phone number and contact
   email, the site runs in a visibly unfinished state on purpose (a yellow
   banner, and "Phone number not set" instead of a dead link) rather than
   showing a placeholder that looks real.
2. **Resolve every yellow note.** Run the site with review mode on (the
   default outside production — see "Review mode" below) and read every
   **VERIFY** and **"needs your input"** note. These mark legal, program-rule,
   or factual claims that only the owner, an attorney, or Minnesota DHS can
   confirm — the blueprint's own rule is "do not publish a claim you cannot
   prove." `src/lib/site.ts` has a `claims` object for the trust-strip
   items (insured, background-checked drivers, etc.) that stay hidden until
   you flip them to `true`.
3. **Add real photos.** No stock photos are used anywhere; the hero and
   services sections have placeholder notes (visible in review mode) marking
   exactly where a real photo of a vehicle or driver belongs.
4. **Have an attorney and your insurer review it**, especially the
   Medicaid/insurance page, the privacy policy, and the safety claims —
   per the blueprint, this is not optional.

## Running it

```bash
npm install
cp .env.example .env.local   # then fill it in
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development server. |
| `npm run build` | Production build (also type-checks; fails the build on a type error). |
| `npm run start` | Serves the production build. |
| `npm run lint` | ESLint. |
| `npm run typecheck` | Type-checks without building. |
| `npm test` | Unit tests (Vitest) — pure logic: validation, the rate limiter, reference codes, email formatting. No server needed. |
| `npm run test:e2e` | End-to-end and accessibility tests (Playwright + axe) — starts its own production server automatically. |

Run `npm run typecheck`, `npm run build`, `npm test`, and `npm run test:e2e`
before every deploy; CI should run all four.

### Review mode

Outside of `next build`/`next start`, the site runs in **review mode**: a
yellow "setup is not finished" banner if the phone/email aren't set, and
yellow **VERIFY** / **"needs your input"** notes inline on the page, next to
whatever they apply to. This is how you find everything that still needs the
owner's, the attorney's, or Minnesota DHS's input, in context, rather than
guessing from a separate checklist. It never appears in a real production
build (`next build && next start`), and can be forced off earlier by setting
`NEXT_PUBLIC_REVIEW_MODE="0"`.

Because this reads `NEXT_PUBLIC_REVIEW_MODE`, and every `NEXT_PUBLIC_*`
variable is baked into the build (not read at `next start`), setting it
only changes anything if it is set **before** `npm run build` runs — setting
it only when you `npm run start` has no effect on an already-built site.

### Light and dark mode

Light is the default for every visitor, regardless of their device's own
setting — the moon/sun button in the header is how someone switches to dark,
and their choice is remembered (`localStorage`) for their next visit. See
`src/components/ThemeToggle.tsx` and the comment at the top of
`src/app/globals.css`. An inline script in `layout.tsx` applies a remembered
choice before the first paint, so there is no flash of the wrong theme.

## What's here

```
src/
  app/
    (marketing)/          every public page: home, services, service-area,
                           medicaid-and-insurance, faq, contact, guides
                           (short content/SEO pages), and the
                           privacy/terms/accessibility/nondiscrimination
                           legal pages
    request-a-ride/       the ride request form (the site's "money page")
    api/request/          receives and validates the form, emails dispatch
    layout.tsx            the loading screen, header, footer, skip link,
                           and the inline script that applies a remembered
                           light/dark choice before the first paint
    not-found.tsx, robots.ts, sitemap.ts, icon.svg,
    apple-icon.tsx, opengraph-image.tsx
                           search engines, browser tab/home-screen icons,
                           and the image social platforms show when a link
                           to the site is shared
  components/              shared UI: header/footer/nav, the theme toggle,
                           the ride request form, the testimonials section
                           (off until real ones exist), the service-area
                           overview, the animated logo loader, review-mode
                           notes
  lib/
    schema.ts              the ride request's validation rules — shared by
                           the browser form and the server, so a value is
                           never trusted just because the browser sent it
    notify.ts               builds and sends the dispatch email
    ratelimit.ts             Phase 1's rate limiter (in-memory; see below)
    site.ts                 business facts (phone, email, hours, claims)
                           read from the environment — nothing is hard-coded
    faq.tsx, services.ts, guides.ts, testimonials.ts, nav.ts
                           page content, kept separate from page layout
tests/
  a11y.spec.ts             axe accessibility scan of every public page, in
                           both light and dark mode
  theme.spec.ts            the light/dark toggle: defaults, persistence,
                           and that it carries across page navigation
  ride-request.spec.ts     the form: validation, a full successful request,
                           and the server re-validating what the API receives
  smoke.spec.ts            navigation, the guides, the 404 page,
                           robots/sitemap, headers
```

The logo loader (the animated loading screen) lives in
`src/components/LogoLoader.tsx` and `src/components/logo-paths.ts` — it was
built, tested, and delivered separately; see `../lakebound-loader/README.md`
in this repository for its own notes. `public/logo*.svg` are the same
artwork as standalone files (light and dark versions).

## Design notes for whoever picks this up next

- **The ride request form never asks for a diagnosis, Medicaid ID, insurance
  number, or date of birth** (blueprint section 3: "if needed, a dispatcher
  collects them by phone"). Keep it that way — it's a deliberate privacy
  decision, not an oversight.
- **No database yet.** Every ride request is emailed to dispatch in full
  (blueprint section 6's Phase 2 adds a database; once it exists, the email
  should shrink to "New request LB-XXXXXX, open the dashboard" with no rider
  details in the email body — see the comment at the top of `src/lib/notify.ts`).
- **The rate limiter is in-memory** (`src/lib/ratelimit.ts`), which means it
  resets on every server restart and is tracked per server instance. That's
  fine for a single small deployment; the blueprint's Phase 2 replaces it
  with Upstash Redis once there's more than one server instance.
- **Spam protection is a honeypot field only** (no Turnstile/CAPTCHA yet —
  that's also Phase 2).
- **Testimonials start empty on purpose** (`src/lib/testimonials.ts`) — no
  fake ones were ever added. The whole section stays off the live site until
  there is at least one real entry (written permission, first name and last
  initial, never medical details, per blueprint section 1).
- **The service-area visual is intentionally not a literal map** — it is a
  simple, honest "based in / serving" card (`src/components/ServiceAreaOverview.tsx`),
  not real county-boundary geography or an embedded Google Maps iframe. A
  real map needs either verified boundary data or a deliberate privacy/CSP
  decision (opening up `frame-src` to Google, and Google then seeing every
  visitor); it's a reasonable Phase 2/3 upgrade once that tradeoff is wanted.
- **Guides are generic, not Lakebound-specific claims** (`/guides`, blueprint
  section 8.6). They link back to the real services/FAQ/Medicaid pages for
  anything specific, rather than asserting something here that isn't
  established elsewhere on the site.
- **Colors and type** follow blueprint section 7 exactly: navy `#0f1f3d`,
  teal `#3aa391`, mist `#f4f7f9`, 18px+ body text, 48px minimum tap targets.
  Every text/background color pair is checked for 4.5:1 contrast (3:1 for
  borders and focus rings) in both light and dark mode — see the comment at
  the top of `src/app/globals.css`, and keep new color pairs to that bar.
- **One security footgun already fixed once, worth knowing about:** a
  CSS rule written for long-form legal-page text (`.prose-page a`) can
  silently override a button's own text color if a button ever ends up
  nested inside that prose wrapper, because of plain CSS specificity — not
  anything React- or Tailwind-specific. That's why the button-variant rules
  in `globals.css` are written as `.btn.btn-accent` and not just
  `.btn-accent`. If you add another general content-area style rule, give it
  a moment's thought against anything that might render inside it.

## Still open (not built)

Everything under Phase 2 and Phase 3 of the blueprint: a real database
(rides/partners/applicants tables), the admin dispatcher dashboard, SMS
confirmations, address autocomplete, recurring rides, the partner-referral
and driver-application forms, translated pages, local city landing pages, a
reviews pipeline, ride tracking, and broker reports. Build one phase at a
time, as the blueprint itself says, and run `npm run typecheck`, `npm run
build`, `npm test`, and `npm run test:e2e` after each change.
