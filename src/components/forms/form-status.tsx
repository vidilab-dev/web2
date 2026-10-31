"use client";

import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import type { SubmitStatus } from "./use-form-submit";

/**
 * Submission status region.
 *
 * Rendered once per form, above the submit button. The success state shows the
 * reference code the visitor can quote; the error state is announced and never
 * clears the form.
 */
export function FormStatus({
  status,
  reference,
  error,
}: {
  status: SubmitStatus;
  reference?: string | null;
  error?: string | null;
}) {
  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-4 bg-deep p-6 text-ground md:p-7"
      >
        <CheckCircle2 aria-hidden className="mt-0.5 size-6 shrink-0 text-fresh" />
        <div>
          <p className="font-display text-[1.0625rem] font-bold tracking-[-0.02em]">
            Permintaan Anda sudah kami terima.
          </p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ground/75">
            Tim kami akan menindaklanjuti melalui email dalam 1–2 hari kerja.
            {reference && (
              <>
                {" "}
                Kode referensi permintaan Anda:{" "}
                <span className="font-display font-bold text-fresh">{reference}</span>
                .
              </>
            )}
          </p>
        </div>
      </div>
    );
  }

  if (status === "error" && error) {
    return (
      <div
        role="alert"
        className="flex items-start gap-4 bg-earth/12 p-6 text-ink md:p-7"
      >
        <TriangleAlert aria-hidden className="mt-0.5 size-6 shrink-0 text-earth" />
        <div>
          <p className="font-display text-[1.0625rem] font-bold tracking-[-0.02em]">
            Permintaan belum terkirim.
          </p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{error}</p>
        </div>
      </div>
    );
  }

  return null;
}

/** Submit button with a busy state; disabled while the request is in flight. */
export function SubmitButton({
  status,
  children,
}: {
  status: SubmitStatus;
  children: React.ReactNode;
}) {
  const busy = status === "submitting";
  return (
    <button
      type="submit"
      disabled={busy}
      aria-busy={busy}
      className="btn btn-primary press disabled:cursor-wait disabled:opacity-70"
    >
      {busy && <Loader2 aria-hidden className="size-4 animate-spin" />}
      {busy ? "Mengirim…" : children}
    </button>
  );
}
