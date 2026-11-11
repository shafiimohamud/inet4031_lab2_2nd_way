"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useRef, useState, type BaseSyntheticEvent, type ReactNode } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import {
  emptyRideRequest,
  mobilityTypes,
  paymentTypes,
  rideRequestFields,
  rideRequestSchema,
  riderCounts,
  tripTypes,
  type RideRequest,
  type RideRequestInput,
} from "@/lib/schema";
import { CheckIcon } from "./icons";

type Phone = { display: string; href: string } | null;

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; ref: string }
  | { kind: "failed"; message: string };

const fieldLabels: Record<keyof RideRequest, string> = {
  riderName: "Rider's full name",
  phone: "Phone number",
  email: "Email",
  pickup: "Pickup address",
  destination: "Destination",
  date: "Appointment date",
  time: "Appointment time",
  tripType: "One way or round trip",
  mobility: "How the rider gets around",
  riders: "Number of people riding",
  payment: "How the ride will be paid for",
  notes: "Notes",
};

/** Today's date in the visitor's own time zone, as yyyy-mm-dd. */
function localDay(offsetDays = 0): string {
  const day = new Date();
  day.setDate(day.getDate() + offsetDays);
  return `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
}

export function RideRequestForm({ phone }: { phone: Phone }) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const doneHeading = useRef<HTMLHeadingElement>(null);
  const failure = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, submitCount },
  } = useForm<RideRequestInput, unknown, RideRequest>({
    resolver: zodResolver(rideRequestSchema),
    defaultValues: emptyRideRequest,
    mode: "onTouched",
    // We focus the first invalid field ourselves, in true document order (see onInvalid
    // below). React Hook Form's own shouldFocusError follows field *registration* order,
    // which for this form does not match document order: the radio-group fields (built
    // inline via .map(), not through a deferred render-prop like the text fields use)
    // register before any of the text fields do, regardless of where they sit on the page.
    shouldFocusError: false,
  });

  // Move keyboard and screen-reader focus to the result of sending.
  useEffect(() => {
    if (status.kind === "sent") doneHeading.current?.focus();
    if (status.kind === "failed") failure.current?.focus();
  }, [status]);

  const callUs = phone ? (
    <>
      {" "}
      Please call us at{" "}
      <a className="link whitespace-nowrap" href={phone.href}>
        {phone.display}
      </a>
      .
    </>
  ) : null;

  /** After an invalid submit, move focus to the first invalid field as the page shows it, top to bottom. */
  function onInvalid(_errors: FieldErrors<RideRequestInput>, event?: BaseSyntheticEvent) {
    const form = event?.target as HTMLFormElement | undefined;
    requestAnimationFrame(() => {
      form?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    });
  }

  async function onValid(data: RideRequest, event?: BaseSyntheticEvent) {
    setStatus({ kind: "sending" });
    const form = event?.target as HTMLFormElement | undefined;
    const company = (form?.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";
    try {
      const response = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company }),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok: true; ref: string }
        | { ok: false; message?: string; errors?: Partial<Record<keyof RideRequest, string>> }
        | null;

      if (response.ok && result?.ok) {
        setStatus({ kind: "sent", ref: result.ref });
        return;
      }
      if (result && !result.ok && result.errors) {
        for (const name of rideRequestFields) {
          const message = result.errors[name];
          if (message) setError(name, { type: "server", message });
        }
      }
      setStatus({
        kind: "failed",
        message: (result && !result.ok && result.message) || "Something went wrong and your request was not received.",
      });
    } catch {
      setStatus({
        kind: "failed",
        message: "We could not reach our server, so your request was not received. Check your connection and try again.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <section className="rounded-2xl border-2 border-ok-ink bg-ok-bg p-6 text-ok-ink sm:p-8" aria-labelledby={id("done")}>
        <h2 id={id("done")} ref={doneHeading} tabIndex={-1} className="flex items-center gap-3 text-[1.6rem] !text-ok-ink outline-none">
          <CheckIcon />
          We received your request
        </h2>
        <p className="mt-4 text-[1.1rem]">
          Your reference number is <strong className="whitespace-nowrap text-[1.3rem] tracking-wider">{status.ref}</strong>
        </p>
        <h3 className="mt-6 !text-ok-ink">What happens next</h3>
        <ol className="mt-2 list-decimal space-y-2 pl-6">
          <li>We call the phone number you gave us to confirm the details.</li>
          <li>
            <strong>Your ride is not booked until we confirm it with you.</strong>
          </li>
          <li>Keep your reference number. It helps us find your request quickly.</li>
        </ol>
        {phone && (
          <p className="mt-5">
            Need to change something, or is your ride soon?{" "}
            <a className="font-bold underline underline-offset-4" href={phone.href}>
              Call us at <span className="whitespace-nowrap">{phone.display}</span>
            </a>
            .
          </p>
        )}
        <p className="mt-5 font-bold">This is not for emergencies. If you have a medical emergency, call 911.</p>
        <button
          type="button"
          className="btn btn-outline mt-6 !border-ok-ink !text-ok-ink"
          onClick={() => {
            reset(emptyRideRequest);
            setStatus({ kind: "idle" });
          }}
        >
          Request another ride
        </button>
      </section>
    );
  }

  const invalid = Object.keys(errors).length > 0 && submitCount > 0;
  const sending = status.kind === "sending";

  return (
    <form id={id("form")} noValidate onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-10">
      {invalid && <ErrorSummary errors={errors} idFor={id} />}

      {status.kind === "failed" && (
        <div ref={failure} tabIndex={-1} role="alert" className="rounded-xl border-2 border-danger bg-page p-5 outline-none">
          <h2 className="text-[1.25rem] !text-danger">Your request was not sent</h2>
          <p className="mt-2 text-ink">
            {status.message}
            {!status.message.includes("call us") && callUs}
          </p>
        </div>
      )}

      <p className="text-muted">Every field is required unless it says optional.</p>

      <FormSection title="Who is riding">
        <Field id={id("riderName")} label="Rider's full name" error={errors.riderName?.message}>
          {(props) => <input type="text" autoComplete="name" className="field-input" {...props} {...register("riderName")} />}
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id={id("phone")} label="Phone number" hint="We call this number to confirm the ride." error={errors.phone?.message}>
            {(props) => (
              <input type="tel" inputMode="tel" autoComplete="tel" className="field-input" {...props} {...register("phone")} />
            )}
          </Field>
          <Field id={id("email")} label="Email" optional error={errors.email?.message}>
            {(props) => (
              <input type="email" inputMode="email" autoComplete="email" className="field-input" {...props} {...register("email")} />
            )}
          </Field>
        </div>
      </FormSection>

      <FormSection title="Where and when">
        <Field id={id("pickup")} label="Pickup address" hint="Street address, apartment or unit, and city." error={errors.pickup?.message}>
          {(props) => <input type="text" className="field-input" {...props} {...register("pickup")} />}
        </Field>
        <Field id={id("destination")} label="Destination" hint="Clinic or building name and address." error={errors.destination?.message}>
          {(props) => <input type="text" className="field-input" {...props} {...register("destination")} />}
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id={id("date")} label="Appointment date" error={errors.date?.message}>
            {(props) => (
              <input
                type="date"
                className="field-input"
                {...props}
                {...register("date")}
                // Set when the field is used, in the visitor's own time zone.
                onFocus={(event) => {
                  event.currentTarget.min = localDay();
                  event.currentTarget.max = localDay(365);
                }}
              />
            )}
          </Field>
          <Field id={id("time")} label="Appointment time" hint="The time the appointment starts." error={errors.time?.message}>
            {(props) => <input type="time" className="field-input" {...props} {...register("time")} />}
          </Field>
        </div>
        <Choices legend="One way or round trip" id={id("tripType")} error={errors.tripType?.message} columns>
          {tripTypes.map((option) => (
            <label key={option.value} className="choice">
              <input type="radio" value={option.value} {...register("tripType")} />
              <span className="font-semibold">{option.label}</span>
            </label>
          ))}
        </Choices>
      </FormSection>

      <FormSection title="About the ride">
        <Choices legend="How does the rider get around?" id={id("mobility")} error={errors.mobility?.message}>
          {mobilityTypes.map((option) => (
            <label key={option.value} className="choice">
              <input type="radio" value={option.value} {...register("mobility")} />
              <span>
                <span className="block font-semibold">{option.label}</span>
                <span className="block text-[0.92rem] text-muted">{option.hint}</span>
              </span>
            </label>
          ))}
        </Choices>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            id={id("riders")}
            label="Number of people riding"
            hint="Count the rider and anyone coming along."
            error={errors.riders?.message}
          >
            {(props) => (
              <select className="field-input" {...props} {...register("riders")}>
                {riderCounts.map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            )}
          </Field>
          <Field id={id("payment")} label="How will the ride be paid for?" error={errors.payment?.message}>
            {(props) => (
              <select className="field-input" {...props} {...register("payment")}>
                <option value="">Choose one</option>
                {paymentTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>
      </FormSection>

      <FormSection title="Anything else we should know">
        <Field
          id={id("notes")}
          label="Notes"
          optional
          hint="For example: stairs at the entrance, a gate code, or equipment you are bringing. Please do not include medical details or ID numbers. If we need more, we will ask by phone."
          error={errors.notes?.message}
        >
          {(props) => <textarea rows={4} maxLength={600} className="field-input" {...props} {...register("notes")} />}
        </Field>
      </FormSection>

      {/* Spam trap. People never see or reach this field; some bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="space-y-3">
        <button type="submit" className="btn btn-primary w-full text-[1.1rem] sm:w-auto sm:px-10" disabled={sending}>
          {sending ? "Sending your request..." : "Send ride request"}
        </button>
        <p role="status" className="sr-only">
          {sending ? "Sending your request." : ""}
        </p>
        <p className="text-muted">
          Sending this form asks us for a ride. <strong className="text-ink">It is not booked until we call you to confirm.</strong>
        </p>
      </div>
    </form>
  );
}

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-6">
      <h2 className="border-b border-line pb-2 text-[1.35rem]">{title}</h2>
      {children}
    </section>
  );
}

type ControlProps = { id: string; "aria-invalid": boolean; "aria-describedby": string | undefined };

/** Label, optional hint, the control, and its error message, wired together for screen readers. */
function Field({
  id,
  label,
  hint,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  optional?: boolean;
  error?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {hint && (
        <span id={`${id}-hint`} className="field-hint">
          {hint}
        </span>
      )}
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy })}
      {error && (
        <span id={`${id}-error`} className="field-error">
          {error}
        </span>
      )}
    </div>
  );
}

/** A group of radio buttons with one question (legend) and one error message. */
function Choices({
  legend,
  id,
  error,
  columns,
  children,
}: {
  legend: string;
  id: string;
  error?: string;
  columns?: boolean;
  children: ReactNode;
}) {
  return (
    <fieldset
      id={id}
      tabIndex={-1}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className="outline-none"
    >
      <legend className="field-label">{legend}</legend>
      <div className={columns ? "grid gap-3 sm:grid-cols-2" : "grid gap-3"}>{children}</div>
      {error && (
        <span id={`${id}-error`} className="field-error">
          {error}
        </span>
      )}
    </fieldset>
  );
}

/** Lists every problem at the top of the form, each one a link to its field. */
function ErrorSummary({ errors, idFor }: { errors: FieldErrors<RideRequestInput>; idFor: (name: string) => string }) {
  const list = rideRequestFields.filter((name) => errors[name]?.message);
  if (list.length === 0) return null;
  return (
    <div role="alert" className="rounded-xl border-2 border-danger bg-page p-5">
      <h2 className="text-[1.25rem] !text-danger">
        {list.length === 1 ? "Please fix 1 field" : `Please fix ${list.length} fields`}
      </h2>
      <ul className="mt-3 list-disc space-y-1 pl-6">
        {list.map((name) => (
          <li key={name}>
            <a className="link !text-danger" href={`#${idFor(name)}`}>
              {fieldLabels[name]}: {String(errors[name]?.message)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
