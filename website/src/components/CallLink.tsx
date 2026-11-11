import { reviewMode, site } from "@/lib/site";
import { PhoneIcon } from "./icons";

type Props = {
  /** Text before the number, for example "Call". */
  label?: string;
  className?: string;
  /** Hide the number itself and show only the label (used where space is tight). */
  labelOnly?: boolean;
};

/**
 * Tap-to-call link. Until a real phone number is configured it renders nothing
 * on the live site, and a clearly marked placeholder in review mode.
 */
export function CallLink({ label = "Call", className = "btn btn-accent", labelOnly = false }: Props) {
  if (!site.phone) {
    if (!reviewMode) return null;
    return (
      <span className={className} aria-disabled="true">
        <PhoneIcon />
        Phone number not set
      </span>
    );
  }
  return (
    <a href={site.phone.href} className={className}>
      <PhoneIcon />
      {labelOnly ? (
        <>
          {label}
          <span className="sr-only"> {site.phone.display}</span>
        </>
      ) : (
        <span>
          {label} <span className="whitespace-nowrap">{site.phone.display}</span>
        </span>
      )}
    </a>
  );
}
