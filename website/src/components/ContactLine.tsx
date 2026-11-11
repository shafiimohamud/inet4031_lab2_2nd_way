import { site } from "@/lib/site";

/** "call us at ... or email ..." with whatever contact details are configured. */
export function ContactLine() {
  if (site.phone && site.email) {
    return (
      <>
        call us at <a href={site.phone.href}>{site.phone.display}</a> or email <a href={`mailto:${site.email}`}>{site.email}</a>
      </>
    );
  }
  if (site.phone) {
    return (
      <>
        call us at <a href={site.phone.href}>{site.phone.display}</a>
      </>
    );
  }
  if (site.email) {
    return (
      <>
        email <a href={`mailto:${site.email}`}>{site.email}</a>
      </>
    );
  }
  return <>contact us</>;
}
