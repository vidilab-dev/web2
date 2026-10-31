"use client";

import { useFormContext, type FieldError, type Path } from "react-hook-form";
import { FieldShell, controlClass, useFieldError } from "./field";

/** Single-line text input bound to the shared field shell. */
export function TextField<T extends object>({
  label,
  name,
  type = "text",
  autoComplete,
  hint,
  required,
}: {
  label: string;
  name: Path<T>;
  type?: string;
  autoComplete?: string;
  hint?: string;
  required?: boolean;
}) {
  const error = useFieldError<T>(name);
  const { register } = useFormContext<T>();
  return (
    <FieldShell label={label} name={String(name)} error={error} hint={hint} required={required}>
      {({ id, describedBy, invalid }) => (
        <input
          id={id}
          type={type}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          autoComplete={autoComplete}
          className={controlClass(invalid)}
          {...register(name)}
        />
      )}
    </FieldShell>
  );
}

/** Multi-line textarea bound to the shared field shell. */
export function TextAreaField<T extends object>({
  label,
  name,
  rows = 5,
  hint,
  required,
}: {
  label: string;
  name: Path<T>;
  rows?: number;
  hint?: string;
  required?: boolean;
}) {
  const error = useFieldError<T>(name);
  const { register } = useFormContext<T>();
  return (
    <FieldShell label={label} name={String(name)} error={error} hint={hint} required={required}>
      {({ id, describedBy, invalid }) => (
        <textarea
          id={id}
          rows={rows}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          className={controlClass(invalid)}
          {...register(name)}
        />
      )}
    </FieldShell>
  );
}

/** Native select bound to the shared field shell. */
export function SelectField<T extends object>({
  label,
  name,
  options,
  hint,
  required,
}: {
  label: string;
  name: Path<T>;
  options: readonly string[];
  hint?: string;
  required?: boolean;
}) {
  const error = useFieldError<T>(name);
  const { register } = useFormContext<T>();
  return (
    <FieldShell label={label} name={String(name)} error={error} hint={hint} required={required}>
      {({ id, describedBy, invalid }) => (
        <select
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          className={controlClass(invalid)}
          {...register(name)}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  );
}

/**
 * Checkbox group for the RFQ product list.
 *
 * Registers each checkbox individually under `name` so React Hook Form keeps
 * them as a real string array, and exposes one shared error message for the
 * whole group.
 */
export function CheckboxGroup<T extends object>({
  label,
  name,
  options,
  hint,
  required,
}: {
  label: string;
  name: Path<T>;
  options: readonly string[];
  hint?: string;
  required?: boolean;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  const error = (errors as Record<string, FieldError | undefined>)[String(name)];
  const id = `f-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="font-display text-[0.9375rem] font-bold tracking-[-0.014em]">
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-accent">
            *
          </span>
        )}
      </legend>

      {hint && (
        <p id={hintId} className="text-[0.875rem] leading-snug text-ink-2">
          {hint}
        </p>
      )}

      <div
        aria-describedby={describedBy || undefined}
        aria-invalid={Boolean(error)}
        className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {options.map((option, i) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 rounded-[2px] bg-paper px-4 py-3 ring-1 ring-ink/15 transition-colors duration-200 hover:ring-ink/30 has-[:checked]:bg-deep has-[:checked]:text-ground has-[:checked]:ring-deep"
          >
            <input
              type="checkbox"
              value={option}
              className="size-4 shrink-0 accent-current"
              {...register(name as Path<T> & string, {
                validate: (v: unknown) =>
                  (Array.isArray(v) && v.length > 0) || "Pilih setidaknya satu produk.",
              })}
              aria-labelledby={`${id}-opt-${i}`}
            />
            <span id={`${id}-opt-${i}`} className="font-display text-[0.9375rem] font-semibold">
              {option}
            </span>
          </label>
        ))}
      </div>

      <p
        id={errorId}
        role="alert"
        aria-live="polite"
        className={`text-[0.875rem] leading-snug ${error ? "text-earth" : "sr-only"}`}
      >
        {error?.message}
      </p>
    </fieldset>
  );
}
