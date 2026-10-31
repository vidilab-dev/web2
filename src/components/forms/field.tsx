"use client";

import { useFormContext, type FieldError, type Path } from "react-hook-form";
import { cn } from "@/lib/utils";

/** Reads the error for a field path and renders it bound via aria-describedby. */
export function useFieldError<T extends object>(name: Path<T>) {
  const {
    formState: { errors },
  } = useFormContext<T>();
  return (errors as Record<string, FieldError | undefined>)[name];
}

type FieldShellProps = {
  label: string;
  name: string;
  error?: FieldError | undefined;
  hint?: string;
  required?: boolean;
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => React.ReactNode;
};

/**
 * Shared label / control / error scaffold.
 *
 * Keeps every control in the same shape, guarantees the label is associated,
 * and ties the error message to the control with aria-describedby.
 */
export function FieldShell({ label, name, error, hint, required, children }: FieldShellProps) {
  const id = `f-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const hasHint = Boolean(hint);
  const describedBy = [hasHint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-display text-[0.9375rem] font-bold tracking-[-0.014em]"
      >
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-accent">
            *
          </span>
        )}
      </label>

      {hasHint && (
        <p id={hintId} className="text-[0.875rem] leading-snug text-ink-2">
          {hint}
        </p>
      )}

      {children({ id, describedBy: describedBy || undefined, invalid: Boolean(error) })}

      <p
        id={errorId}
        role="alert"
        aria-live="polite"
        className={cn("text-[0.875rem] leading-snug", error ? "text-earth" : "sr-only")}
      >
        {error?.message}
      </p>
    </div>
  );
}

export const controlClass = (invalid?: boolean) =>
  cn(
    "w-full rounded-[2px] bg-paper px-4 py-3.5 text-[1rem] text-ink placeholder:text-ink-2/60",
    "transition-colors duration-200 outline-none",
    "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
    invalid ? "ring-2 ring-earth" : "ring-1 ring-ink/15 hover:ring-ink/30"
  );

/**
 * Honeypot. Visually hidden and removed from the accessibility tree; dumb bots
 * fill it, the API route then fakes a success without storing anything.
 * Real users never see or focus it.
 */
export function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
    >
      <label htmlFor="website">Website</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
