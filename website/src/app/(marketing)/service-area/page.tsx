import type { Metadata } from "next";
import { Actions, PageHeader, Section } from "@/components/page";
import { NeedsInput } from "@/components/review";
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
          <h2 className="text-[1.5rem]">Counties we serve</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            {site.areaServed.map((area) => (
              <li key={area}>{area.replace(", MN", "")}</li>
            ))}
          </ul>
          <NeedsInput>
            The full list of counties and cities you serve (for example Shakopee, Bloomington). A simple map and one page per
            major city come later in the plan.
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
