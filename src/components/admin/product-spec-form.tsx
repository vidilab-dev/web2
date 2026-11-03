"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { saveProductSpecAction, uploadProductPhotoAction } from "@/app/admin/actions";
import type { ProductWithSpec } from "@/lib/products";

const fields = [
  {
    name: "composition",
    label: "Komposisi / kandungan",
    hint: "Contoh: N 2,1% · P₂O₅ 1,8% · K₂O 1,5% · C-organik 18%",
    rows: 3,
  },
  {
    name: "dosage",
    label: "Dosis penggunaan",
    hint: "Contoh: 2–5 ton/ha untuk tanaman pangan",
    rows: 3,
  },
  {
    name: "application",
    label: "Cara aplikasi",
    hint: "Contoh: disebar merata di zona perakaran, lalu ditutup tanah tipis",
    rows: 3,
  },
  {
    name: "packaging",
    label: "Bentuk & kemasan",
    hint: "Contoh: granul, karung 25 kg dan 50 kg",
    rows: 2,
  },
  {
    name: "shelfLife",
    label: "Masa simpan",
    hint: "Contoh: 12 bulan di tempat kering dan teduh",
    rows: 2,
  },
  {
    name: "registrationNumber",
    label: "Nomor registrasi",
    hint: "Nomor pendaftaran Kementan, hanya jika sudah ada",
    rows: 2,
  },
] as const;

const photoField = {
  name: "imageUrl",
  label: "Foto produk",
  hint: "Path file di pustaka media, contoh: /images/marfu-p.jpg — atau URL https. Kosongkan jika belum ada foto asli.",
} as const;

type State = { fieldErrors?: Record<string, string> } | undefined;
type UploadState = { error?: string } | undefined;

function PhotoUploader({ slug, current }: { slug: string; current: string | null }) {
  const bound = uploadProductPhotoAction.bind(null, slug);
  const [state, action, pending] = useActionState<UploadState, FormData>(bound, undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Not a <form>: this uploader sits inside the product spec form, and a
  // nested form is invalid HTML that breaks hydration. The button dispatches
  // the upload action directly with the picked file instead.
  return (
    <div className="mt-4 border border-ink/15 bg-white p-4">
        <p className="font-display text-[0.9375rem] font-bold text-ink">Unggah foto baru</p>
        {(preview ?? current) && (
          <figure className="mt-3 max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview ?? current ?? ""}
              alt="Pratinjau foto produk"
              className="w-full rounded-[2px] border border-ink/10"
            />
            <figcaption className="meta mt-2">
              {preview ? "Pratinjau berkas yang dipilih." : "Foto saat ini."}
            </figcaption>
          </figure>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            name="photo"
            accept="image/jpeg,image/png,image/webp,image/avif"
            aria-label="Pilih berkas foto produk"
            onChange={(e) => {
              const f = e.target.files?.[0];
              setPreview(f ? URL.createObjectURL(f) : null);
            }}
            className="max-w-full text-[0.875rem] text-ink-2 file:mr-3 file:rounded-[2px] file:border-0 file:bg-deep file:px-4 file:py-2 file:text-[0.875rem] file:font-bold file:text-ground"
          />
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              const fd = new FormData();
              const file = inputRef.current?.files?.[0];
              if (file) fd.append("photo", file);
              void action(fd);
            }}
            className="btn btn-secondary press"
          >
            <Upload aria-hidden className="size-4" />
            {pending ? "Mengunggah…" : "Unggah & Pasang"}
          </button>
        </div>
        <p className="meta mt-2">JPG, PNG, WebP, atau AVIF · maksimal 5 MB.</p>
        {state?.error && (
          <p role="alert" className="mt-2 text-[0.875rem] font-semibold text-red-800">
            {state.error}
          </p>
        )}
      </div>
  );
}

export function ProductSpecForm({ product, saved }: { product: ProductWithSpec; saved: boolean }) {
  const bound = saveProductSpecAction.bind(null, product.slug);
  const [state, action, pending] = useActionState<State, FormData>(bound, undefined);

  return (
    <form action={action} className="space-y-8">
      {saved && (
        <p role="status" className="border-l-4 border-accent bg-ground p-4 text-[0.9375rem] font-semibold text-ink">
          Datasheet tersimpan. Halaman publik produk ini sudah diperbarui.
        </p>
      )}
      {state?.fieldErrors?.form && (
        <p role="alert" className="border-l-4 border-red-700 bg-ground p-4 text-[0.9375rem] font-semibold text-red-800">
          {state.fieldErrors.form}
        </p>
      )}

      <section className="bg-ground p-6 md:p-8" aria-labelledby="spec-heading">
        <h2 id="spec-heading" className="font-display text-[1.125rem] font-bold tracking-[-0.02em]">
          Kolom datasheet
        </h2>
        <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2">
          Kosongkan kolom yang datanya belum ada — kolom kosong tampil sebagai
          “Menunggu datasheet” di situs, bukan angka karangan.
        </p>

        <div className="mt-6 space-y-6">
          {fields.map((f) => {
            const value = product[f.name] ?? "";
            const error = state?.fieldErrors?.[f.name];
            return (
              <div key={f.name}>
                <label
                  htmlFor={`spec-${f.name}`}
                  className="font-display text-[0.9375rem] font-bold text-ink"
                >
                  {f.label}
                </label>
                <textarea
                  id={`spec-${f.name}`}
                  name={f.name}
                  rows={f.rows}
                  defaultValue={value}
                  placeholder={f.hint}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `spec-${f.name}-error` : `spec-${f.name}-hint`}
                  className="mt-2 w-full rounded-[2px] border border-ink/20 bg-white p-3 text-[0.9375rem] leading-relaxed text-ink placeholder:text-ink/35 focus:border-accent focus:outline-none"
                />
                <p id={`spec-${f.name}-hint`} className="meta mt-1.5">
                  {f.hint}
                </p>
                {error && (
                  <p id={`spec-${f.name}-error`} role="alert" className="mt-1.5 text-[0.875rem] font-semibold text-red-800">
                    {error}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-ground p-6 md:p-8" aria-labelledby="photo-heading">
        <h2 id="photo-heading" className="font-display text-[1.125rem] font-bold tracking-[-0.02em]">
          {photoField.label}
        </h2>
        <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2">
          Unggah langsung dari sini, atau tulis path manual jika berkas sudah ada
          di pustaka media. Hanya foto asli produk — bukan foto suasana atau stok.
        </p>
        <PhotoUploader slug={product.slug} current={product.imageUrl} />
        <div className="mt-4">
          <label
            htmlFor="spec-imageUrl"
            className="font-display text-[0.9375rem] font-bold text-ink"
          >
            Path foto
          </label>
          <input
            id="spec-imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={product.imageUrl ?? ""}
            placeholder={photoField.hint}
            aria-describedby="spec-imageUrl-hint"
            className="mt-2 w-full rounded-[2px] border border-ink/20 bg-white p-3 text-[0.875rem] tracking-[-0.01em] text-ink placeholder:text-ink/35 focus:border-accent focus:outline-none"
          />
          <p id="spec-imageUrl-hint" className="meta mt-1.5">
            {photoField.hint}
          </p>
          {state?.fieldErrors?.imageUrl && (
            <p role="alert" className="mt-1.5 text-[0.875rem] font-semibold text-red-800">
              {state.fieldErrors.imageUrl}
            </p>
          )}
        </div>
      </section>

      <section className="bg-ground p-6 md:p-8" aria-labelledby="status-heading">
        <h2 id="status-heading" className="font-display text-[1.125rem] font-bold tracking-[-0.02em]">
          Status verifikasi
        </h2>
        <fieldset className="mt-4 space-y-3">
          <legend className="sr-only">Status data produk</legend>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="radio"
              name="dataStatus"
              value="placeholder"
              defaultChecked={product.dataStatus !== "verified"}
              className="mt-1 size-4 accent-[#287A4B]"
            />
            <span>
              <span className="font-semibold text-ink">Menunggu data</span>
              <span className="block text-[0.875rem] text-ink-2">
                Spesifikasi tampil sebagai “Menunggu datasheet” di situs.
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="radio"
              name="dataStatus"
              value="verified"
              defaultChecked={product.dataStatus === "verified"}
              className="mt-1 size-4 accent-[#287A4B]"
            />
            <span>
              <span className="font-semibold text-ink">Terverifikasi dari datasheet resmi</span>
              <span className="block text-[0.875rem] text-ink-2">
                Pilih hanya jika setiap kolom yang diisi sudah sesuai dokumen resmi produk.
              </span>
            </span>
          </label>
        </fieldset>
        {state?.fieldErrors?.dataStatus && (
          <p role="alert" className="mt-2 text-[0.875rem] font-semibold text-red-800">
            {state.fieldErrors.dataStatus}
          </p>
        )}
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className="btn btn-primary press">
          <Save aria-hidden className="size-4" />
          {pending ? "Menyimpan…" : "Simpan Datasheet"}
        </button>
        <Link href="/admin/products" className="btn btn-secondary press">
          <ArrowLeft aria-hidden className="size-4" />
          Kembali
        </Link>
        <Link href={`/products/${product.slug}`} className="link-arrow ml-auto">
          Lihat halaman publik
        </Link>
      </div>
    </form>
  );
}
