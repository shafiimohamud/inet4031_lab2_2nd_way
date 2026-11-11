/** Main navigation, shared by the header, the mobile menu and the footer. */
export const mainNav = [
  { href: "/services", label: "Services" },
  { href: "/service-area", label: "Service area" },
  { href: "/medicaid-and-insurance", label: "Medicaid and insurance" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalNav = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of use" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/nondiscrimination", label: "Nondiscrimination notice" },
] as const;
