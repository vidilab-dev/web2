"use client";

import { useEffect, useActionState, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Upload } from "lucide-react";
import {
  createArticleAction,
  updateArticleAction,
  uploadArticlePhotoAction,
} from "@/app/admin/actions";
import { articleCategories } from "@/content/news";
import type { ArticleWithMeta } from "@/lib/articles";

type FormState = { fieldErrors?: Record<string, string> } | undefined;
type UploadState = { error?: string; url?: string } | undefined;

function Error({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[0.875rem] font-semibold text-red-800">
      {message}
    </p>
  );
}

function PhotoPicker({
  initialUrl,
  onPick,
}: {
  initialUrl: string;
  onPick: (url: string) => void;
}) {
  const [state, action, pending] = useActionState<UploadState, FormData>(
    uploadArticlePhotoAction,
    undefined
  );
  const [preview, setPreview] = useState<string | null>(null);

  // When the upload succeeds, hand the URL to the parent form field.
  useEffect(() => {
    if (state?.url && state.url !== initialUrl) onPick(state.url);
  }, [state?.url, initialUrl, onPick]);

  return (
    <div className="mt-3 border border-ink/15 bg-white p-4">
      <p className="font-display text-[0.9375rem] font-bold text-ink">Unggah foto sampul</p>
      {(preview ?? initialUrl) && (
        <figure className="mt-3 max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview ?? initialUrl}
            alt="Pratinjau foto sampul artikel"
            className="w-full rounded-[2px] border border-ink/10"
          />
        </figure>
      )}
      <form action={action} className="mt-3 flex flex-wrap items-center gap-3">
        <input
          type="file"
          name="photo"
          accept="image/jpeg,image/png,image/webp,image/avif"
          aria-label="Pilih berkas foto sampul"
          onChange={(e) => {
            const f = e.target.files?.[0];
            setPreview(f ? URL.createObjectURL(f) : null);
          }}
          className="max-w-full text-[0.875rem] text-ink-2 file:mr-3 file:rounded-[2px] file:border-0 file:bg-deep file:px-4 file:py-2 file:text-[0.875rem] file:font-bold file:text-ground"
        />
        <button type="submit" disabled={pending} className="btn btn-secondary press">
          <Upload aria-hidden className="size-4" />
          {pending ? "Mengunggah…" : "Unggah"}
        </button>
      </form>
      <p className="meta mt-2">JPG, PNG, WebP, atau AVIF · maksimal 5 MB.</p>
      {state?.error && (
        <p role="alert" className="mt-2 text-[0.875rem] font-semibold text-red-800">
          {state.error}
        </p>
      )}
    </div>
  );
}

export function ArticleForm({
  article,
  mode,
  saved,
}: {
  article?: ArticleWithMeta;
  mode: "create" | "edit";
  saved: boolean;
}) {
  const action = mode === "create" ? createArticleAction : updateArticleAction.bind(null, article?.slug ?? "");
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, undefined);
  const [imageUrl, setImageUrl] = useState(article?.image?.src ?? "");
  const urlInputRef = useRef<HTMLInputElement>(null);

  const pick = (url: string) => {
    setImageUrl(url);
    if (urlInputRef.current) urlInputRef.current.value = url;
  };

  const err = (k: string) => state?.fieldErrors?.[k];

  return (
    <form action={formAction} className="space-y-8">
      {saved && (
        <p role="status" className="border-l-4 border-accent bg-ground p-4 text-[0.9375rem] font-semibold text-ink">
          Artikel tersimpan. Halaman publik sudah diperbarui.
        </p>
      )}
      {state?.fieldErrors?.form && (
        <p role="alert" className="border-l-4 border-red-700 bg-ground p-4 text-[0.9375rem] font-semibold text-red-800">
          {state.fieldErrors.form}
        </p>
      )}

      <section className="space-y-6 bg-ground p-6 md:p-8" aria-label="Isi artikel">
        <div>
          <label htmlFor="art-title" className="font-display text-[0.9375rem] font-bold text-ink">
            Judul
          </label>
          <input
            id="art-title"
            name="title"
            type="text"
            defaultValue={article?.title ?? ""}
            placeholder="Contoh: Panen Raya Kelompok Tani Binaan di Musim Hujan"
            aria-invalid={Boolean(err("title"))}
            className="mt-2 w-full rounded-[2px] border border-ink/20 bg-white p-3 text-[0.9375rem] text-ink placeholder:text-ink/35 focus:border-accent focus:outline-none"
          />
          <Error id="art-title-error" message={err("title")} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="art-category" className="font-display text-[0.9375rem] font-bold text-ink">
              Kategori
            </label>
            <select
              id="art-category"
              name="category"
              defaultValue={article?.category ?? ""}
              className="mt-2 w-full rounded-[2px] border border-ink/20 bg-white p-3 text-[0.9375rem] text-ink focus:border-accent focus:outline-none"
            >
              <option value="">Pilih kategori…</option>
              {articleCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <Error id="art-category-error" message={err("category")} />
          </div>
          <div>
            <label htmlFor="art-author" className="font-display text-[0.9375rem] font-bold text-ink">
              Penulis
            </label>
            <input
              id="art-author"
              name="authorName"
              type="text"
              defaultValue={article?.author ?? ""}
              placeholder="Contoh: Tim Agronomi"
              className="mt-2 w-full rounded-[2px] border border-ink/20 bg-white p-3 text-[0.9375rem] text-ink placeholder:text-ink/35 focus:border-accent focus:outline-none"
            />
            <Error id="art-author-error" message={err("authorName")} />
          </div>
        </div>

        <div>
          <label htmlFor="art-excerpt" className="font-display text-[0.9375rem] font-bold text-ink">
            Ringkasan
          </label>
          <textarea
            id="art-excerpt"
            name="excerpt"
            rows={3}
            defaultValue={article?.excerpt ?? ""}
            placeholder="Satu-dua kalimat pembuka yang tampil di daftar artikel (40–400 karakter)."
            className="mt-2 w-full rounded-[2px] border border-ink/20 bg-white p-3 text-[0.9375rem] leading-relaxed text-ink placeholder:text-ink/35 focus:border-accent focus:outline-none"
          />
          <Error id="art-excerpt-error" message={err("excerpt")} />
        </div>

        <div>
          <label htmlFor="art-body" className="font-display text-[0.9375rem] font-bold text-ink">
            Isi artikel
          </label>
          <textarea
            id="art-body"
            name="body"
            rows={12}
            defaultValue={article?.body.join("\n\n") ?? ""}
            placeholder="Tulis isi artikel. Pisahkan paragraf dengan satu baris kosong."
            className="mt-2 w-full rounded-[2px] border border-ink/20 bg-white p-3 text-[0.9375rem] leading-relaxed text-ink placeholder:text-ink/35 focus:border-accent focus:outline-none"
          />
          <p className="meta mt-1.5">Pisahkan tiap paragraf dengan satu baris kosong.</p>
          <Error id="art-body-error" message={err("body")} />
        </div>
      </section>

      <section className="bg-ground p-6 md:p-8" aria-label="Foto sampul">
        <h2 className="font-display text-[1.125rem] font-bold tracking-[-0.02em]">Foto sampul</h2>
        <PhotoPicker initialUrl={imageUrl} onPick={pick} />
        <div className="mt-4">
          <label htmlFor="art-imageUrl" className="font-display text-[0.9375rem] font-bold text-ink">
            Path foto
          </label>
          <input
            ref={urlInputRef}
            id="art-imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="/images/... atau https://..."
            className="mt-2 w-full rounded-[2px] border border-ink/20 bg-white p-3 text-[0.875rem] tracking-[-0.01em] text-ink placeholder:text-ink/35 focus:border-accent focus:outline-none"
          />
          <Error id="art-imageUrl-error" message={err("imageUrl")} />
        </div>
        <div className="mt-4">
          <label htmlFor="art-imageAlt" className="font-display text-[0.9375rem] font-bold text-ink">
            Teks alt foto
          </label>
          <input
            id="art-imageAlt"
            name="imageAlt"
            type="text"
            defaultValue={article?.image?.alt ?? ""}
            placeholder="Deskripsi singkat foto untuk pembaca layar"
            className="mt-2 w-full rounded-[2px] border border-ink/20 bg-white p-3 text-[0.9375rem] text-ink placeholder:text-ink/35 focus:border-accent focus:outline-none"
          />
          <Error id="art-imageAlt-error" message={err("imageAlt")} />
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className="btn btn-primary press">
          <Save aria-hidden className="size-4" />
          {pending ? "Menyimpan…" : mode === "create" ? "Terbitkan Artikel" : "Simpan Perubahan"}
        </button>
        <Link href="/admin/news" className="btn btn-secondary press">
          <ArrowLeft aria-hidden className="size-4" />
          Kembali
        </Link>
      </div>
    </form>
  );
}
