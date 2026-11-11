/** Shield mark. Switches to the white-and-teal version on dark backgrounds. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <picture>
      <source srcSet="/logo-mark-dark.svg" media="(prefers-color-scheme: dark)" />
      <img src="/logo-mark.svg" alt="" width={413} height={454} className={className} />
    </picture>
  );
}

/** Full lockup: shield mark with the LAKEBOUND TRANSPORTATION wordmark underneath. */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <picture>
      <source srcSet="/logo-dark.svg" media="(prefers-color-scheme: dark)" />
      <img src="/logo.svg" alt="Lakebound Transportation" width={480} height={583} className={className} />
    </picture>
  );
}
