import type { Metadata } from "next";
import { Actions, PageHeader, Section } from "@/components/page";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="We could not find that page"
        lead="The link may be old, or the address may have a typing mistake. You can still get where you need to go."
      />
      <Section>
        <Actions />
      </Section>
    </>
  );
}
