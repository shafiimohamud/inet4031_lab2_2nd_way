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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1f3d" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
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
