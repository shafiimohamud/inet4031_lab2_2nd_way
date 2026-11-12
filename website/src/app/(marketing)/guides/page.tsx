import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { PageHeader, Section } from "@/components/page";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guides",
  description: `Short, plain-English guides about non-emergency medical transportation from ${site.name}.`,
};

export default function GuidesIndexPage() {
  return (
    <>
      <PageHeader
        title="Guides"
        lead="Plain-English answers to the questions people ask us most, before they ever need a ride."
      />
      <Section>
        <ul className="grid gap-6 sm:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.slug} className="flex flex-col rounded-2xl border border-line bg-page p-6">
              <h2 className="text-[1.2rem]">
                <Link href={`/guides/${guide.slug}`} className="text-ink no-underline hover:underline">
                  {guide.title}
                </Link>
              </h2>
              <p className="mt-2 flex-1">{guide.summary}</p>
              <Link href={`/guides/${guide.slug}`} className="link mt-4 inline-flex min-h-11 items-center gap-2">
                Read
                <ArrowRightIcon />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
