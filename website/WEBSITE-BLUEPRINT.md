# Lakebound Transportation: Website Blueprint

The complete build plan for a professional NEMT (Non-Emergency Medical Transportation) website that can compete with the best providers in Minnesota.

How to use this file: work through it top to bottom. Phase 1 is what makes you look legitimate and capture ride requests. Phase 2 and 3 are what separate you from small competitors. Anything marked **VERIFY** is a legal or program rule you must confirm with the source (Minnesota DHS, your attorney, your insurer) before publishing. Do not publish a claim you cannot prove.

---

## 0. Strategy: who the website is for

NEMT websites fail because they speak to one audience. Yours must serve five, and each needs a different door:

| Audience | What they want | Where they land |
|---|---|---|
| **Riders and families** (often older, disabled, stressed, may use a phone only) | "Can you get me to my appointment, safely, and how do I book?" | Home > Request a ride |
| **Clinics, hospitals, social workers, care coordinators** | A dependable partner they can refer patients to, fast | Partners page > Referral form |
| **Medicaid brokers and health plans** (MTM, Modivcare, county agencies) | Proof you are compliant, insured, licensed, and reliable | Compliance page (credentials, insurance, fleet) |
| **Drivers** | A real job with clear pay and requirements | Careers page > Application |
| **You (dispatcher/owner)** | Requests arrive organized, nothing gets lost | Admin dashboard |

**Positioning line (use everywhere):**
> Lakebound Transportation: safe, on-time, door-through-door rides to the care you need. Ambulatory and wheelchair accessible. Serving the Twin Cities metro and Scott County.

**What wins against bigger competitors:** they have scale, you have *reliability and a human voice*. Lead with: on-time pickup, trained and background-checked drivers, a real person answers the phone, wheelchair-accessible vehicles, language access. Never promise what you cannot deliver.

---

## 1. Rules for honest content (read first)

- No fake reviews, fake counts ("10,000 rides"), fake awards, or stock photos presented as your team or vehicles. Use real photos of your vans and drivers (with their permission).
- Every credential shown (USDOT, insurance, MHCP enrollment, certifications) must be real and current. Display only what you can document.
- Testimonials: only real ones, with written permission, first name and last initial. Never include medical details.
- Medicaid riders: booking normally goes through the plan or broker. **VERIFY** the current rule for Minnesota and say so clearly on the site so riders are not confused.

---

## 2. Sitemap

```
/                         Home
/request-a-ride           Ride request (primary conversion page)
/services                 Services overview
/services/ambulatory
/services/wheelchair
/services/round-trip-and-recurring    (dialysis, therapy, standing appointments)
/who-we-serve             Riders, families, facilities, plans
/partners                 For clinics, hospitals, case managers (referral form)
/medicaid-and-insurance   How rides are covered, how to book through your plan
/service-area             Cities and counties served (one page per major city later)
/about                    Story, mission, team, values
/safety-and-quality       Driver screening, training, vehicle standards, insurance
/compliance               Credentials (USDOT, insurance cert download, MHCP, licenses)
/careers                  Driver jobs + application
/faq
/contact                  Phone, hours, dispatch, complaints/feedback
/track                    Ride status lookup (Phase 3)
/privacy  /terms  /accessibility  /nondiscrimination  /sms-terms
/es  /so  /hmn            Translated key pages (Spanish, Somali, Hmong). VERIFY the languages that match your riders.
/admin                    Dispatcher dashboard (private, login required)
```

---

## 3. Page-by-page content spec

### Home
1. **Top bar:** phone number (tap-to-call, large), hours, language switcher.
2. **Hero:** headline + two buttons: **Request a ride** and **Call now**. One real photo of a vehicle or driver helping a rider.
3. **Trust strip:** USDOT number, "Insured", "Background-checked drivers", "Wheelchair accessible", "Serving [counties]". Only true items.
4. **How it works:** 3 steps (request, we confirm by phone, driver arrives).
5. **Services cards.**
6. **Who we serve** (four short blocks linking to pages).
7. **Safety promise** (short, links to Safety page).
8. **Service area map** (simple, not interactive at first).
9. **Real testimonials** (when you have them).
10. **FAQ (top 5).**
11. **Final call to action + footer** (legal name, USDOT, address, phone, email, accessibility/nondiscrimination links, 911 notice).

### Request a ride (the money page)
Keep it short; every extra field costs you requests. Fields (already built in the starter): rider name, phone, optional email, pickup, destination, date, appointment time, one-way/round-trip, mobility type, riders, payment method, notes.

Add in Phase 2:
- **Preferred contact method** (call or text) and **language**.
- **Recurring ride option** (days of week, end date): dialysis and therapy are your steadiest revenue.
- **Companion / personal care attendant riding?** (yes/no)
- **Address autocomplete** (Google Places or Mapbox).
- **Appointment-to-pickup logic:** auto-suggest a pickup time = appointment time minus travel time minus a buffer.
- **Attachments: none.** Do not collect diagnoses, Medicaid ID, or DOB on the public form. If needed, a dispatcher collects them by phone, or via a secure portal later.
- Confirmation screen with a reference number and "what happens next".
- A visible **"For emergencies call 911"** line.

### Services
One section per service: who it is for, what is included (door-through-door help, seat-belt and wheelchair securement, assistance with one companion), vehicle type, and a "Request this ride" button. Do not list a service you are not authorized to provide. **VERIFY** the service levels your Minnesota enrollment permits.

### Partners (this is how you grow volume)
Referral form for clinics and case managers: facility name, contact, number of riders per week, typical destinations, recurring needs. Also a downloadable one-page PDF "Partner packet" (services, area, hours, how to refer, contact). Case managers refer providers they trust, so this page is your sales tool.

### Safety and quality
Describe only what you actually do: driver background studies and driving-record checks, drug testing if you do it, CPR/first-aid, passenger assistance and wheelchair securement training, sensitivity and disability awareness, vehicle inspections and maintenance, insurance, and how you handle complaints. **VERIFY** what Minnesota requires for your service level and mirror those requirements exactly.

### Compliance (for brokers and auditors)
A clean page with: legal name, USDOT 4465625, MC number if any, NPI, insurance certificate download (PDF), MHCP enrollment status, fleet list (vehicle types, not plates), driver requirements, nondiscrimination policy, grievance procedure. This page quietly wins contracts.

### Careers
Driver job description, requirements (licence, background study, training), pay range if you can, and an application form (name, phone, licence class, years' experience, availability, resume upload). Hiring is your growth bottleneck, so treat this page seriously.

### FAQ (starter set)
How far ahead do I book? What if I'm running late or the appointment runs long? Do you provide help at the door? Can a caregiver ride with me? Do you carry wheelchairs/walkers/oxygen? What if I need to cancel? Do you take Medicaid? What areas do you serve? What if my driver is late? How do I file a complaint?

---

## 4. Features that set you apart (by phase)

### Phase 1: Launch (week 1 to 2)
- Mobile-first site, ride request form, email notification, privacy policy, accessibility statement, Google Business Profile, tap-to-call everywhere.

### Phase 2: Professional (weeks 3 to 6)
- Database storing every request (nothing lost if email fails).
- Admin dashboard: new/pending/confirmed/completed/cancelled, search, notes, assign driver.
- SMS confirmations and reminders (with proper consent).
- Address autocomplete and recurring rides.
- Partner referral form and driver application form with file upload.
- Spanish, Somali, and Hmong versions of the key pages (**VERIFY** based on your riders).
- Compliance and Safety pages, insurance certificate download.
- Analytics and conversion tracking.

### Phase 3: Best-in-class (months 2 to 4)
- Ride status page ("Your driver is on the way") with a secure link per ride.
- Rider/facility accounts: rebook past trips, manage recurring rides.
- Driver mobile page (assigned rides, tap to navigate, mark picked up/dropped off).
- Automated reminders and no-show tracking.
- Reports for brokers: on-time rate, trip counts, complaints (the data they audit you on).
- Reviews engine: after a ride, ask for a Google review (never offer rewards for reviews).

---

## 5. Compliance checklist (do not skip)

These are the items that expose small NEMT companies to legal and contract risk. Get an attorney and your insurer to review before launch.

- **HIPAA.** If you bill Medicaid electronically you are likely a covered entity. **VERIFY with a healthcare attorney.** Practical rule: treat ride data as sensitive. Do not put rider names + destinations + conditions in plain email. Use email only for "New request #1042, log in to view" and keep details in the database. Sign a **BAA** with any vendor that stores or transmits protected health information (database host, SMS provider, hosting). **VERIFY** which vendor tiers offer a BAA; some require paid plans.
- **TCPA / text messaging.** Get explicit consent before texting. Include a consent checkbox that is *not* pre-checked, store the time and wording of consent, honor STOP/HELP, and publish SMS terms. Register your sending number for A2P 10DLC (Twilio requires this).
- **ADA and accessibility.** Build to **WCAG 2.2 AA**, publish an accessibility statement, and provide a phone alternative for every online action.
- **Nondiscrimination / language access.** Publish a nondiscrimination notice and a way to get help in other languages. **VERIFY** exact wording required by your contracts.
- **Privacy policy and terms.** Plain English. List what you collect, why, who sees it, how long you keep it, and how to request deletion.
- **Record retention.** **VERIFY** how long Minnesota/Medicaid requires you to keep trip records, and set your database retention to match.
- **Cookie/analytics.** Use privacy-friendly analytics (Plausible or Fathom) and avoid advertising pixels on pages where riders may reveal health-related information.
- **Advertising claims.** Nothing that suggests medical services. Say "transportation to medical appointments."

---

## 6. Technology

**Keep what you have:** Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, React Hook Form, Zod.

**Add:**

| Need | Recommended | Notes |
|---|---|---|
| Database | **Postgres** on Neon or Supabase | Use the vendor's HIPAA option if you store ride details. **VERIFY** BAA availability. |
| ORM | **Drizzle ORM** | Type-safe, lightweight |
| Auth (admin, later riders/drivers) | **Auth.js** or **Clerk** | Admin must use MFA |
| Email | Resend (keep) | Notification-only emails |
| SMS | **Twilio** | A2P 10DLC registration, STOP/HELP handling |
| Bot protection | **Cloudflare Turnstile** | Replaces the honeypot over time |
| Rate limiting | **Upstash Redis** | Replaces the in-memory limiter, which resets on each server instance |
| Maps/autocomplete | Google Places or Mapbox | Restrict the API key by domain |
| File uploads | Vercel Blob or S3 | Private bucket for driver applications |
| Translations | **next-intl** | Human-reviewed translations only, not raw machine output |
| Analytics | Plausible | No cookies |
| Errors | **Sentry** | Strip personal data from reports |
| Uptime | Better Stack or UptimeRobot | Alerts to your phone |
| Hosting | **Vercel** | Add a custom domain; consider Pro/Enterprise for BAA needs |
| Testing | Vitest (unit), **Playwright** (end-to-end), axe (accessibility) | Run in CI |

### Folder structure (target)

```
src/
  app/
    (marketing)/             public pages
      page.tsx
      services/...  partners/  careers/  faq/  contact/  ...
    request-a-ride/page.tsx
    track/[token]/page.tsx   (Phase 3)
    admin/                   protected area
      page.tsx  rides/  partners/  applicants/
    api/
      request/route.ts       ride requests
      referral/route.ts      partner referrals
      apply/route.ts         driver applications
      sms/webhook/route.ts   Twilio inbound (STOP/HELP)
  components/                shared UI
  lib/
    schema.ts                Zod rules (shared client/server)
    db/ (schema.ts, index.ts)
    notify.ts  sms.ts  ratelimit.ts  turnstile.ts
  messages/ en.json  es.json  so.json  hmn.json
```

### Database model (Drizzle sketch)

```ts
rides:      id, ref (short code), status, createdAt,
            riderName, phone, email, language, contactPref,
            pickup, destination, apptDate, apptTime, tripType,
            mobility, riders, payment, notes,
            recurringRule (nullable), assignedDriverId, consentAt, consentText
drivers:    id, name, phone, active
partners:   id, facility, contact, phone, email, ridersPerWeek, notes, createdAt
applicants: id, name, phone, email, licenseClass, availability, resumeUrl, createdAt
auditLog:   id, userId, action, entity, entityId, at     // who viewed/changed rides
```

Ride statuses: `new > confirmed > assigned > en_route > picked_up > completed`, plus `cancelled` and `no_show`.

### Notification flow (replaces "email everything")

1. Visitor submits form, server validates (Zod + Turnstile + rate limit).
2. Save to database, get reference number.
3. Email dispatch: "New ride request #REF, open dashboard" (no rider details in the email body).
4. Show the rider a confirmation with the reference number.
5. Dispatcher calls to confirm, updates status.
6. If consent was given, text the rider a confirmation and a reminder.

### Security checklist

- HTTPS only, HSTS, secure headers (CSP, X-Frame-Options, Referrer-Policy) in `next.config.ts`.
- Validate on the server every time; never trust the browser. Escape all values placed in emails.
- Admin login with MFA; role-based access; audit log of who opened which ride.
- Secrets only in environment variables; never in the repo. Rotate keys if ever exposed.
- Private storage for uploads; signed, expiring links.
- Encrypted database; backups daily; test a restore once.
- Least-privilege API keys; domain-restrict map keys.
- Dependabot or Renovate for updates; `npm audit` in CI.
- Do not log request bodies.

---

## 7. Design system

- **Colors (from your logo):** navy `#0f1f3d`, teal `#3aa391`, mist `#f4f7f9`, plus an accessible error red and a warm accent for alerts. Check every text/background pair meets **4.5:1** contrast.
- **Type:** one clean sans-serif (Inter or system). Body text at least **18px**; many riders are older. Line height 1.6.
- **Tap targets:** minimum 48px. Buttons are large and obvious.
- **Layout:** one primary action per screen, generous spacing, no carousels, no auto-playing video, no popups.
- **Imagery:** real photos only: vehicle exterior, ramp/lift in use, driver greeting a rider (with consent). Show wheelchair users with dignity.
- **Tone:** calm, plain, respectful. Short sentences. No jargon ("NEMT" should always be explained as "non-emergency medical transportation").
- **Logo use:** shield mark in the header and favicon; full lockup in footer and print. Export SVG versions.

### Accessibility (WCAG 2.2 AA)
Semantic HTML, labelled form fields, visible focus, keyboard-only navigation, skip link (built), error messages tied to fields, no color-only meaning, reduced-motion support, alt text on real images, screen-reader test with VoiceOver and NVDA, automated axe checks in CI, and a published accessibility statement with a phone number for help.

---

## 8. SEO and local discovery (how new riders and referrals find you)

1. **Google Business Profile**: claim it, correct category ("Non-emergency medical transportation service"), service areas, hours, photos, phone, link to `/request-a-ride`. This is your highest-value free asset. Ask real riders and partners for reviews.
2. **Local landing pages** (one per major city/county you serve): "Wheelchair transportation in Shakopee, MN", "NEMT in Bloomington", etc. Each with unique, useful content, not copy-pasted text.
3. **Structured data** on the home page:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Lakebound Transportation LLC",
  "url": "https://lakeboundmn.com",
  "telephone": "+1-000-000-0000",
  "address": { "@type": "PostalAddress", "addressLocality": "Shakopee", "addressRegion": "MN" },
  "areaServed": ["Scott County, MN", "Hennepin County, MN"],
  "description": "Non-emergency medical transportation, ambulatory and wheelchair accessible."
}
```
Also add `FAQPage` markup on the FAQ page.
4. **Technical SEO:** `sitemap.xml`, `robots.txt`, clean URLs, canonical tags, unique title and description per page, OpenGraph images, fast pages.
5. **Citations:** consistent name/address/phone on Yelp, Bing Places, Apple Business Connect, local chambers, senior-resource directories, county provider lists.
6. **Content that earns referrals:** short helpful pages such as "How to book a ride to dialysis", "Wheelchair transportation: what to expect", "Questions to ask an NEMT provider".
7. **Domains:** make `lakeboundmn.com` primary; redirect `lakeboundtransport.com` (and `ltnemt.com` if you buy it) to it with a 301.

---

## 9. Performance targets

- Lighthouse mobile: **Performance 90+, Accessibility 100, Best Practices 100, SEO 100**.
- LCP under 2.5 s on a mid-range phone on 4G; CLS under 0.1.
- Use `next/image`, WebP/AVIF, and system or self-hosted fonts.
- Page weight under 1 MB for the home page.
- Test on a real older Android phone and a slow connection.

---

## 10. Admin dashboard spec (Phase 2)

- Login with MFA; roles: owner, dispatcher.
- **Today view:** pickups sorted by time, with status chips and one-tap call/text.
- **Ride detail:** all fields, notes, status changes, assigned driver, history log.
- **Filters:** date, status, payment type, mobility.
- **Quick actions:** confirm, reschedule, cancel (reason required), mark no-show.
- **Exports:** CSV by date range for billing and broker reports.
- **Alerts:** new request arrives (email + optional push), and any ride unconfirmed after 1 business hour.
- **Reports:** requests per week, conversion (request to completed), on-time %, cancellations, top destinations.

---

## 11. Measurement

Track: visits, request starts vs. submissions (form drop-off by field), calls from tap-to-call, partner referrals, driver applications, Google Business actions, and review count/rating. Review monthly. If many people start the form and leave, shorten it.

Targets for the first 90 days: form submission rate above 5% of visitors, every request contacted within **1 business hour**, 100% of new requests recorded in the database.

---

## 12. Operations: the website is only half the product

A beautiful site that answers slowly loses to an ugly site that answers fast. Decide now:
- **Who answers requests and by when** (set a response-time promise you can keep).
- **After-hours plan** (voicemail, auto-reply text, or on-call).
- **Cancellation, late, and no-show policy** (written and posted).
- **Complaint process** with a named contact and timeline.
- **Backup dispatcher** when you are away driving OTR.

---

## 13. Launch checklist

- [ ] Real phone number and dispatch email in `.env`; test a real request end to end
- [ ] Logo at `public/logo.png`, favicon, social-share image
- [ ] Real photos; no stock images implying your team
- [ ] Privacy policy, terms, SMS terms, accessibility statement, nondiscrimination notice published
- [ ] Attorney and insurer review of all claims; MHCP/Medicaid wording verified
- [ ] Resend domain verified (SPF, DKIM, DMARC set)
- [ ] Turnstile and Redis rate limiting on
- [ ] Database and backups on; restore tested
- [ ] Admin MFA on; default accounts removed
- [ ] Lighthouse and axe pass; manual keyboard and screen-reader test
- [ ] Google Business Profile claimed and linked; Bing/Apple listings done
- [ ] Analytics and uptime alerts live; errors routed to you
- [ ] Old domain 301-redirects to the new one
- [ ] 404 page, `sitemap.xml`, `robots.txt`
- [ ] Printed QR code (vehicles, business cards, clinic flyers) pointing to `/request-a-ride`

---

## 14. Suggested 12-week roadmap

| Weeks | Goal |
|---|---|
| 1 to 2 | Launch Phase 1; claim Google profile; legal pages; real photos |
| 3 to 4 | Database, admin dashboard, notification-only email |
| 5 to 6 | SMS with consent, address autocomplete, recurring rides |
| 7 to 8 | Partner and careers forms; Compliance and Safety pages; PDF partner packet |
| 9 to 10 | Translations; local city pages; reviews campaign |
| 11 to 12 | Ride tracking page, reports for brokers, performance and accessibility audit |

---

## 15. Instructions for an AI coding assistant (paste this to continue the build)

> You are building the Lakebound Transportation website (NEMT provider, Shakopee MN). Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind 4, React Hook Form, Zod, Resend. Follow `WEBSITE-BLUEPRINT.md`. Rules: server-side validation for every endpoint; never put rider details in email bodies once the database exists; never collect diagnoses, Medicaid IDs, or DOB on public forms; WCAG 2.2 AA; mobile-first; body text 18px+; no invented testimonials, statistics, credentials, or photos; mark any legal or program-rule claim as VERIFY. Implement one phase at a time, run `npm run typecheck` and `npm run build` after each change, and explain how to test each feature in plain English.

---

*This blueprint is a planning and engineering guide, not legal advice. Have a healthcare/transportation attorney and your insurance agent review compliance, HIPAA, TCPA, and Medicaid program items before you publish.*
