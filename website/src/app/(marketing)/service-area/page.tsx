import type { Metadata } from "next";
import { Actions, PageHeader, Section } from "@/components/page";
import { NeedsInput } from "@/components/review";
import { ServiceAreaOverview } from "@/components/ServiceAreaOverview";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service area",
  description: `Lakebound Transportation is based in ${site.city}, Minnesota and serves ${site.serviceArea}.`,
};

export default function ServiceAreaPage() {
  return (
    <>
      <PageHeader
        title="Where we go"
        lead={`We are based in ${site.city}, Minnesota, and serve ${site.serviceArea}.`}
      />
      <Section>
        <div className="max-w-3xl">
          <ServiceAreaOverview />
          <NeedsInput>
            The full list of counties and cities you serve (for example Shakopee, Bloomington). This page shows a
            simple overview, not a literal map; a real interactive one (with your exact coverage area) is a Phase
            2/3 addition, per the blueprint.
          </NeedsInput>

          <h2 className="mt-10 text-[1.5rem]">Not sure about your address?</h2>
          <p className="mt-3">
            Ask us. Tell us where you are being picked up and where you are going, and we will tell you right away whether we
            can take you.
          </p>
          <Actions className="mt-6" />
        </div>
      </Section>
    </>
  );
}
