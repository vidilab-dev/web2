"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSession, destroySession, verifyPassword } from "@/lib/auth";
import { updateSubmissionStatus, type SubmissionStatus } from "@/lib/submissions";
import { saveProductSpec } from "@/lib/products";

/** Verifies the admin password and starts a signed session cookie. */
export async function loginAction(_prev: unknown, formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!verifyPassword(password)) {
    return { error: "Kata sandi salah. Periksa kembali." };
  }

  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

/** Persists the product datasheet form from /admin/products/[slug]. */
export async function saveProductSpecAction(
  slug: string,
  _prev: unknown,
  formData: FormData
) {
  const result = await saveProductSpec(slug, {
    composition: String(formData.get("composition") ?? ""),
    dosage: String(formData.get("dosage") ?? ""),
    application: String(formData.get("application") ?? ""),
    packaging: String(formData.get("packaging") ?? ""),
    shelfLife: String(formData.get("shelfLife") ?? ""),
    registrationNumber: String(formData.get("registrationNumber") ?? ""),
    dataStatus: String(formData.get("dataStatus") ?? "placeholder"),
  });

  if (!result.ok) return { fieldErrors: result.fieldErrors };

  revalidatePath(`/products/${slug}`);
  revalidatePath("/products");
  revalidatePath("/admin/products");
  redirect(`/admin/products/${slug}?saved=1`);
}
/** Moves a submission along the review workflow. */
export async function setStatusAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as SubmissionStatus;

  const allowed: SubmissionStatus[] = ["new", "in-progress", "resolved", "archived"];
  if (!id || !allowed.includes(status)) return;

  await updateSubmissionStatus(id, status);
  revalidatePath("/admin");
  revalidatePath("/admin/submissions");
}
