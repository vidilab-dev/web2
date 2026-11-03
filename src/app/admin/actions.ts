"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSession, destroySession, verifyPassword, isAuthenticated } from "@/lib/auth";
import { updateSubmissionStatus, type SubmissionStatus } from "@/lib/submissions";
import { saveProductSpec } from "@/lib/products";
import { createArticle, updateArticle } from "@/lib/articles";
import { uploadPhoto, uploadProductPhoto } from "@/lib/storage";
import { getPageSpec, type PageValue } from "@/lib/page-specs";
import { savePageContent } from "@/lib/pages";

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

function articlePayload(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    category: String(formData.get("category") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    body: String(formData.get("body") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? ""),
    imageAlt: String(formData.get("imageAlt") ?? ""),
    authorName: String(formData.get("authorName") ?? ""),
  };
}

/** Creates a new article from /admin/news/new. */
export async function createArticleAction(_prev: unknown, formData: FormData) {
  const result = await createArticle(articlePayload(formData));
  if (!result.ok) return { fieldErrors: result.fieldErrors };

  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
  redirect(`/admin/news/${result.slug}?saved=1`);
}

/** Updates a DB article from /admin/news/[slug]. */
export async function updateArticleAction(slug: string, _prev: unknown, formData: FormData) {
  const result = await updateArticle(slug, articlePayload(formData));
  if (!result.ok) return { fieldErrors: result.fieldErrors };

  revalidatePath(`/news/${slug}`);
  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
  redirect(`/admin/news/${slug}?saved=1`);
}

/** Uploads a photo to a temp slot and returns its URL for the article form. */
export async function uploadArticlePhotoAction(_prev: unknown, formData: FormData) {
  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Pilih berkas foto dulu." };
  }
  const uploaded = await uploadPhoto("articles", "draft", file);
  if (!uploaded.ok) return { error: uploaded.error };
  return { url: uploaded.url };
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

/** Parses one form field into its stored JSON shape, following the spec. */
function readFieldValue(
  kind: string,
  columns: { key: string; label: string }[] | undefined,
  formData: FormData,
  key: string
): PageValue {
  if (kind === "paragraphs") {
    return String(formData.get(key) ?? "")
      .split(/\n\s*\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (kind === "list") {
    return String(formData.get(key) ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (kind === "items") {
    let rows: unknown[] = [];
    try {
      const parsed: unknown = JSON.parse(String(formData.get(key) ?? "[]"));
      if (Array.isArray(parsed)) rows = parsed;
    } catch {
      rows = [];
    }
    return rows
      .map((row): Record<string, string> => {
        const item: Record<string, string> = {};
        const source =
          row && typeof row === "object" && !Array.isArray(row)
            ? (row as Record<string, unknown>)
            : {};
        for (const col of columns ?? []) {
          item[col.key] = String(source[col.key] ?? "").trim();
        }
        return item;
      })
      .filter((item) => Object.values(item).some(Boolean));
  }
  if (kind === "image") {
    return {
      src: String(formData.get(`${key}__src`) ?? "").trim(),
      alt: String(formData.get(`${key}__alt`) ?? "").trim(),
    };
  }
  return String(formData.get(key) ?? "").trim();
}

/** Saves every field of one public page from /admin/pages/[...path]. */
export async function savePageContentAction(path: string, _prev: unknown, formData: FormData) {
  if (!(await isAuthenticated())) {
    return { fieldErrors: { form: "Sesi berakhir. Masuk kembali." } };
  }

  const spec = getPageSpec(path);
  if (!spec) return { fieldErrors: { form: "Halaman tidak dikenal." } };

  const data: Record<string, PageValue> = {};
  for (const field of spec.fields) {
    data[field.key] = readFieldValue(field.kind, field.columns, formData, field.key);
  }

  if ("headerTitle" in data && !String(data.headerTitle)) {
    return { fieldErrors: { headerTitle: "Judul halaman wajib diisi." } };
  }

  try {
    await savePageContent(path, data);
  } catch (err) {
    console.error("[admin] savePageContent failed", path, err);
    return { fieldErrors: { form: "Gagal menyimpan. Pastikan database tersambung lalu coba lagi." } };
  }

  revalidatePath(path);
  revalidatePath(path === "/" ? "/admin/pages/home" : `/admin/pages${path}`);
  revalidatePath("/admin/pages");
  // The root layout reads /contact content for the footer, so the shared
  // chrome must be invalidated whenever any page changes.
  revalidatePath("/", "layout");
  return { ok: true as const };
}

/** Uploads a page photo to Supabase Storage and returns its public URL. */
export async function uploadPagePhotoAction(path: string, _prev: unknown, formData: FormData) {
  if (!(await isAuthenticated())) return { error: "Sesi berakhir. Masuk kembali." };

  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Pilih berkas foto dulu." };
  }

  const namespace = path === "/" ? "beranda" : path;
  const uploaded = await uploadPhoto("pages", namespace, file);
  if (!uploaded.ok) return { error: uploaded.error };
  return { url: uploaded.url };
}
