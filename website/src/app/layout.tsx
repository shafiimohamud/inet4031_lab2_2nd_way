import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LogoLoader } from "@/components/LogoLoader";
import { MobileActionBar } from "@/components/MobileActionBar";
import { SetupBanner } from "@/components/review";
import { site } from "@/lib/site";
import "./globals.css";

const description =
  "Non-emergency medical transportation: safe, on-time, door-through-door rides to medical appointments. Ambulatory and wheelchair accessible. Serving the Twin Cities metro and Scott County, Minnesota.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Rides to medical appointments in ${site.city}, ${site.region}`,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: site.name,
    description,
  },
  formatDetection: { telephone: false },
};

// A single value, not the usual light/dark media-query pair: the browser's
// own chrome (address bar, etc.) follows the visitor's chosen theme, not
// their device's setting — see the inline script below and ThemeToggle.tsx.
// That script updates this same meta tag's content live when dark is chosen.
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Runs before the page paints, so a visitor who previously chose dark never
// sees a flash of the light theme first. Keep this in sync with
// ThemeToggle.tsx, which is the only other place that reads or writes
// localStorage's "lb-theme" key or the data-theme attribute.
const themeInitScript = `
(function () {
  try {
    if (localStorage.getItem('lb-theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      var m = document.querySelector('meta[name="theme-color"]');
      if (m) m.setAttribute('content', '#0f1f3d');
    }
  } catch (e) {}
})();
`.trim();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <LogoLoader />
        <a
          href="#main"
          className="btn btn-primary absolute left-3 top-3 z-50 -translate-y-24 focus-visible:translate-y-0"
        >
          Skip to main content
        </a>
        <SetupBanner />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <MobileActionBar phone={site.phone ? { display: site.phone.display, href: site.phone.href } : null} />
      </body>
    </html>
  );
}
