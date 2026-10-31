"use client";

import { useCallback, useState } from "react";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

/**
 * Shared submission state for the three public forms.
 *
 * POSTs JSON to an API route, maps server-side field errors back onto the form
 * when the server returns 422, and keeps a single honest status the UI can
 * render (loading, success with a reference code, or an error that never loses
 * what the visitor already typed).
 */
export function useFormSubmit() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const submit = useCallback(async (url: string, data: unknown) => {
    setStatus("submitting");
    setServerError(null);
    setFieldErrors({});

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reference?: string;
        error?: string;
        fieldErrors?: Record<string, string>;
      };

      if (res.status === 422 && body.fieldErrors) {
        setFieldErrors(body.fieldErrors);
        setStatus("error");
        setServerError("Beberapa isian perlu diperbaiki. Silakan periksa kembali.");
        return;
      }

      if (!res.ok || !body.ok) {
        setStatus("error");
        setServerError(
          body.error ??
            "Pesan belum dapat dikirim. Silakan coba lagi beberapa saat lagi."
        );
        return;
      }

      setReference(body.reference ?? null);
      setStatus("success");
    } catch {
      setStatus("error");
      setServerError(
        "Koneksi bermasalah. Periksa jaringan Anda lalu coba kirim ulang."
      );
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setReference(null);
    setServerError(null);
    setFieldErrors({});
  }, []);

  return { status, reference, serverError, fieldErrors, submit, reset };
}
