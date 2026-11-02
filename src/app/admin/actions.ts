"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSession, destroySession, verifyPassword } from "@/lib/auth";
import { updateSubmissionStatus, type SubmissionStatus } from "@/lib/submissions";
import { saveProductSpec } from "@/lib/products";
import { uploadProductPhoto } from "@/lib/storage";

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
    imageUrl: String(formData.get("imageUrl") ?? ""),
    dataStatus: String(formData.get("dataStatus") ?? "placeholder"),
  });

  if (!result.ok) return { fieldErrors: result.fieldErrors };

  revalidatePath(`/products/${slug}`);
  revalidatePath("/products");
  revalidatePath("/admin/products");
  redirect(`/admin/products/${slug}?saved=1`);
}

/** Uploads a product photo to Supabase Storage and returns its public URL. */
export async function uploadProductPhotoAction(
  slug: string,
  _prev: unknown,
  formData: FormData
) {
  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Pilih berkas foto dulu." };
  }

  const uploaded = await uploadProductPhoto(slug, file);
  if (!uploaded.ok) return { error: uploaded.error };

  const saved = await saveProductSpec(slug, { imageUrl: uploaded.url, dataStatus: "placeholder" });
  if (!saved.ok) return { error: "Foto terunggah, tapi gagal disimpan ke produk." };

  revalidatePath(`/products/${slug}`);
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
