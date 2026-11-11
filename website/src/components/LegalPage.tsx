import type { ReactNode } from "react";
import { PageHeader, Section } from "./page";
import { NeedsInput } from "./review";

/** Shared frame for the policy pages. Every one is a draft until an attorney has reviewed it. */
export function LegalPage({ title, lead, children }: { title: string; lead?: string; children: ReactNode }) {
  return (
    <>
      <PageHeader title={title} lead={lead} />
      <Section>
        <div className="prose-page max-w-3xl">
          <NeedsInput>
            This page is a plain-English draft, not legal advice. Have your attorney review it before the site goes live, then
            add the date it takes effect.
          </NeedsInput>
          {children}
        </div>
      </Section>
    </>
  );
}
