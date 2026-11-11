import Link from "next/link";
import type { ReactNode } from "react";
import { CallLink } from "./CallLink";
import { ArrowRightIcon } from "./icons";

/** Title block at the top of every inner page. */
export function PageHeader({ title, lead, children }: { title: string; lead?: ReactNode; children?: ReactNode }) {
  return (
    <div className="border-b border-line bg-surface">
      <div className="container-page py-10 sm:py-14">
        <h1 className="max-w-3xl text-[2rem] sm:text-[2.5rem]">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-[1.15rem] text-body">{lead}</p>}
        {children}
      </div>
    </div>
  );
}

export function Section({
  children,
  tinted,
  className = "",
  labelledBy,
}: {
  children: ReactNode;
  tinted?: boolean;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section aria-labelledby={labelledBy} className={`${tinted ? "bg-surface" : ""} py-12 sm:py-16 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/** The two actions offered everywhere: request online, or call. */
export function Actions({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      <Link href="/request-a-ride" className="btn btn-primary">
        Request a ride
        <ArrowRightIcon />
      </Link>
      <CallLink label="Call now" />
    </div>
  );
}

/** Closing call to action used at the bottom of most pages. */
export function CtaBand({ title = "Need a ride to an appointment?" }: { title?: string }) {
  return (
    <Section tinted labelledBy="cta-title">
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="cta-title" className="text-[1.75rem]">
          {title}
        </h2>
        <p className="mt-3 text-[1.1rem]">
          Send a request online or call us. We confirm every ride by phone before it is booked.
        </p>
        <Actions className="mt-6 justify-center" />
      </div>
    </Section>
  );
}
