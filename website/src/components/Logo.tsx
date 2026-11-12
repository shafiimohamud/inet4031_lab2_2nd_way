/* eslint-disable @next/next/no-img-element -- small SVG logos; next/image adds nothing for vector files */

/**
 * Both logo files are always in the DOM, stacked in the same grid cell;
 * CSS shows only the one matching the current theme (see globals.css). A
 * <picture>/<source media="(prefers-color-scheme: dark)"> swap can't do
 * this, because it only reads the device's actual setting — never the
 * visitor's manual choice from the theme toggle.
 */

/*
 * The wrapper carries an explicit aspect-ratio matching the artwork, so its
 * width can be derived from a fixed height (e.g. "h-12") the way a plain
 * <img> would — the inner images fill it at 100%, which would otherwise be
 * circular (a grid box sized "auto" from children that are themselves sized
 * as a percentage of that same box).
 */

/** Shield mark. Shows the white-and-teal version on dark backgrounds. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={`grid aspect-[413/454] ${className ?? ""}`}>
      <img
        src="/logo-mark.svg"
        alt=""
        width={413}
        height={454}
        className="lb-logo-light col-start-1 row-start-1 h-full w-full"
      />
      <img
        src="/logo-mark-dark.svg"
        alt=""
        width={413}
        height={454}
        className="lb-logo-dark col-start-1 row-start-1 h-full w-full"
      />
    </span>
  );
}

/** Full lockup: shield mark with the LAKEBOUND TRANSPORTATION wordmark underneath. */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={`grid aspect-[480/583] ${className ?? ""}`}>
      <img
        src="/logo.svg"
        alt="Lakebound Transportation"
        width={480}
        height={583}
        className="lb-logo-light col-start-1 row-start-1 h-full w-full"
      />
      <img
        src="/logo-dark.svg"
        alt="Lakebound Transportation"
        width={480}
        height={583}
        className="lb-logo-dark col-start-1 row-start-1 h-full w-full"
      />
    </span>
  );
}
