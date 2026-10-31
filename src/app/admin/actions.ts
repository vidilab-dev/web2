"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSession, destroySession, verifyPassword } from "@/lib/auth";
import { updateSubmissionStatus, type SubmissionStatus } from "@/lib/submissions";

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
