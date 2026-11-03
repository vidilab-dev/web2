import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Storage client for product photo uploads.
 *
 * Uses the service-role key server-side only (never exposed to the browser).
 * Photos land in the "product-photos" bucket, which must exist and be public.
 * Filenames are namespaced per product slug: "<slug>/<timestamp>-<name>".
 */

const BUCKET = "product-photos";

/** Buckets used by the admin panel. Created once in Supabase Storage as public. */
export const buckets = {
  products: "product-photos",
  articles: "article-photos",
  pages: "page-photos",
} as const;

function storage(bucket: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key).storage.from(bucket);
}

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const MAX_BYTES = 5 * 1024 * 1024;

function safeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/** Uploads a photo, returns the public URL or a field error. */
export async function uploadPhoto(
  bucket: keyof typeof buckets,
  namespace: string,
  file: File
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  if (!ALLOWED.has(file.type)) {
    return { ok: false, error: "Format harus JPG, PNG, WebP, atau AVIF." };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: "Ukuran maksimal 5 MB." };
  }
  if (file.size === 0) {
    return { ok: false, error: "Berkas kosong." };
  }

  const store = storage(buckets[bucket]);
  if (!store) {
    return { ok: false, error: "Penyimpanan belum tersambung (kunci Supabase belum diisi)." };
  }

  const clean = namespace.replace(/[^a-z0-9-]+/g, "-");
  const path = `${clean}/${Date.now()}-${safeName(file.name)}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error } = await store.upload(path, bytes, {
    contentType: file.type,
    upsert: false,
  });
  if (error) {
    console.error("[storage] upload failed", bucket, namespace, error.message);
    return { ok: false, error: "Gagal mengunggah. Coba lagi." };
  }

  const { data } = store.getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}

/** Uploads a product photo, returns the public URL or a field error. */
export async function uploadProductPhoto(
  slug: string,
  file: File
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  return uploadPhoto("products", slug, file);
}
