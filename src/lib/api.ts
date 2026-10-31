import { NextResponse } from "next/server";
import type { ZodType } from "zod";
import { saveSubmission, type SubmissionKind } from "@/lib/submissions";

/**
 * Shared POST handler for the three public forms.
 *
 * Validates with Zod, maps field errors to a 422 the client can bind onto its
 * inputs, applies a honeypot check for dumb bots, and returns the generated
 * reference code on success.
 */
export async function handleFormPost<T>(
  kind: SubmissionKind,
  schema: ZodType<T>,
  request: Request
): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Permintaan tidak valid." },
      { status: 400 }
    );
  }

  // Honeypot: real users never fill this hidden field.
  const honeypot = (body as Record<string, unknown>)?.website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    // Pretend success so the bot learns nothing.
    return NextResponse.json({ ok: true, reference: "CTC-0000" });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Isian belum lengkap.", fieldErrors },
      { status: 422 }
    );
  }

  const result = await saveSubmission(kind, parsed.data as Record<string, unknown>);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Permintaan belum dapat diproses. Coba lagi beberapa saat lagi." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, reference: result.reference });
}
