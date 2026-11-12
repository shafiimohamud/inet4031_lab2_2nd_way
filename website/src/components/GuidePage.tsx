import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";
import { CtaBand, PageHeader, Section } from "./page";

/** Shared frame for the short helpful/content-marketing pages under /guides. */
export function GuidePage({ title, lead, children }: { title: string; lead?: string; children: ReactNode }) {
  return (
    <>
      <PageHeader title={title} lead={lead} />
      <Section>
        <div className="prose-page max-w-3xl">{children}</div>
        <Link href="/guides" className="link mt-10 inline-flex min-h-11 items-center gap-2">
          <ArrowRightIcon className="rotate-180" />
          More guides
        </Link>
      </Section>
      <CtaBand />
    </>
  );
}
