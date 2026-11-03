"use client";

import { useActionState, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { savePageContentAction, uploadPagePhotoAction } from "@/app/admin/actions";
import type { FieldSpec, PageSpec, PageValue } from "@/lib/page-specs";
import { PhotoPicker } from "./photo-picker";

type FormState =
  | { ok?: boolean; fieldErrors?: Record<string, string | undefined> }
  | undefined;

type ItemRow = Record<string, string>;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[0.875rem] font-semibold text-red-800">
      {message}
    </p>
  );
}

function asText(value: PageValue | undefined): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map((v) => (typeof v === "string" ? v : "")).join("\n");
  return "";
}

function FieldEditor({
  spec,
  field,
  value,
  error,
}: {
  spec: PageSpec;
  field: FieldSpec;
  value: PageValue | undefined;
  error?: string;
}) {
  const id = `pf-${field.key}`;
  const errId = `${id}-error`;

  if (field.kind === "items") {
    return <ItemEditor field={field} value={value} error={error} />;
  }

  if (field.kind === "image") {
    const photo =
      value && typeof value === "object" && !Array.isArray(value) && "src" in value
        ? (value as { src: string; alt: string })
        : { src: "", alt: "" };
    return (
      <div>
        <label htmlFor={`${id}-src`} className="font-display text-[0.9375rem] font-bold text-ink">
          {field.label}
        </label>
        {field.hint && <p className="meta mt-1">{field.hint}</p>}
        <ImageField spec={spec} field={field} initial={photo} />
        <FieldError id={errId} message={error} />
      </div>
    );
  }

  const common =
    "mt-2 w-full rounded-[2px] border border-ink/20 bg-white p-3 text-[0.9375rem] text-ink placeholder:text-ink/35 focus:border-accent focus:outline-none";

  if (field.kind === "paragraphs" || field.kind === "list") {
    const paragraphs = field.kind === "paragraphs";
    const defaultValue = Array.isArray(value)
      ? (value as string[]).join(paragraphs ? "\n\n" : "\n")
      : "";
    return (
      <div>
        <label htmlFor={id} className="font-display text-[0.9375rem] font-bold text-ink">
          {field.label}
        </label>
        {field.hint && <p className="meta mt-1">{field.hint}</p>}
        <textarea
          id={id}
          name={field.key}
          rows={paragraphs ? 8 : 6}
          defaultValue={defaultValue}
          aria-invalid={Boolean(error)}
          className={`${common} leading-relaxed`}
        />
        <FieldError id={errId} message={error} />
      </div>
    );
  }

  if (field.kind === "text") {
    return (
      <div>
        <label htmlFor={id} className="font-display text-[0.9375rem] font-bold text-ink">
          {field.label}
        </label>
        {field.hint && <p className="meta mt-1">{field.hint}</p>}
        <input
          id={id}
          name={field.key}
          type="text"
          defaultValue={asText(value)}
          aria-invalid={Boolean(error)}
          className={common}
        />
        <FieldError id={errId} message={error} />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id} className="font-display text-[0.9375rem] font-bold text-ink">
        {field.label}
      </label>
      {field.hint && <p className="meta mt-1">{field.hint}</p>}
      <textarea
        id={id}
        name={field.key}
        rows={4}
        defaultValue={asText(value)}
        aria-invalid={Boolean(error)}
        className={`${common} leading-relaxed`}
      />
      <FieldError id={errId} message={error} />
    </div>
  );
}

/** Image field: upload picker + path + alt, submitted as two named inputs. */
function ImageField({
  spec,
  field,
  initial,
}: {
  spec: PageSpec;
  field: FieldSpec;
  initial: { src: string; alt: string };
}) {
  const [src, setSrc] = useState(initial.src);

  return (
    <>
      <PhotoPicker
        action={uploadPagePhotoAction.bind(null, spec.path)}
        initialUrl={src}
        onPick={setSrc}
        label="Unggah foto"
        previewAlt={`Pratinjau ${field.label.toLowerCase()}`}
      />
      <div className="mt-4">
        <label
          htmlFor={`pf-${field.key}-src`}
          className="font-display text-[0.9375rem] font-bold text-ink"
        >
          Path foto
        </label>
        <input
          id={`pf-${field.key}-src`}
          name={`${field.key}__src`}
          type="text"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          placeholder="/images/… atau https://…"
          className="mt-2 w-full rounded-[2px] border border-ink/20 bg-white p-3 text-[0.875rem] tracking-[-0.01em] text-ink placeholder:text-ink/35 focus:border-accent focus:outline-none"
        />
      </div>
      <div className="mt-3">
        <label
          htmlFor={`pf-${field.key}-alt`}
          className="font-display text-[0.9375rem] font-bold text-ink"
        >
          Teks alt foto
        </label>
        <input
          id={`pf-${field.key}-alt`}
          name={`${field.key}__alt`}
          type="text"
          defaultValue={initial.alt}
          placeholder="Deskripsi singkat foto untuk pembaca layar"
          className="mt-2 w-full rounded-[2px] border border-ink/20 bg-white p-3 text-[0.9375rem] text-ink placeholder:text-ink/35 focus:border-accent focus:outline-none"
        />
      </div>
    </>
  );
}

/** Repeatable rows (title/body, period/title/description, …) as hidden JSON. */
function ItemEditor({
  field,
  value,
  error,
}: {
  field: FieldSpec;
  value: PageValue | undefined;
  error?: string;
}) {
  const columns = field.columns ?? [];
  const [rows, setRows] = useState<ItemRow[]>(() => {
    if (!Array.isArray(value)) return [];
    return value
      .filter((v): v is Record<string, string> => Boolean(v) && typeof v === "object" && !Array.isArray(v))
      .map((v) => {
        const row: ItemRow = {};
        for (const col of columns) row[col.key] = String(v[col.key] ?? "");
        return row;
      });
  });

  const update = (index: number, key: string, val: string) =>
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [key]: val } : r)));

  return (
    <fieldset>
      <legend className="font-display text-[0.9375rem] font-bold text-ink">{field.label}</legend>
      {field.hint && <p className="meta mt-1">{field.hint}</p>}
      <input type="hidden" name={field.key} value={JSON.stringify(rows)} />

      <div className="mt-3 space-y-4">
        {rows.map((row, index) => (
          <div key={index} className="border border-ink/15 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="meta">Baris {index + 1}</p>
              <button
                type="button"
                onClick={() => setRows((prev) => prev.filter((_, i) => i !== index))}
                className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-red-800 hover:underline"
              >
                <Trash2 aria-hidden className="size-3.5" />
                Hapus
              </button>
            </div>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {columns.map((col) => (
                <div key={col.key}>
                  <label
                    htmlFor={`pf-${field.key}-${index}-${col.key}`}
                    className="font-display text-[0.875rem] font-bold text-ink"
                  >
                    {col.label}
                  </label>
                  <input
                    id={`pf-${field.key}-${index}-${col.key}`}
                    type="text"
                    value={row[col.key] ?? ""}
                    onChange={(e) => update(index, col.key, e.target.value)}
                    className="mt-1.5 w-full rounded-[2px] border border-ink/20 bg-white p-2.5 text-[0.9375rem] text-ink placeholder:text-ink/35 focus:border-accent focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="border border-dashed border-ink/25 bg-white p-4 text-[0.875rem] text-ink-2">
            Belum ada baris. Tambahkan satu untuk mulai mengisi.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() =>
          setRows((prev) => [
            ...prev,
            Object.fromEntries(columns.map((c) => [c.key, ""])),
          ])
        }
        className="btn btn-secondary press mt-4"
      >
        <Plus aria-hidden className="size-4" />
        Tambah Baris
      </button>
      <FieldError id={`pf-${field.key}-error`} message={error} />
    </fieldset>
  );
}

export function PageForm({ spec, current }: { spec: PageSpec; current: Record<string, PageValue> }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    savePageContentAction.bind(null, spec.path),
    undefined
  );

  // Group fields by section for multi-section specs (e.g. homepage).
  const sections: { name?: string; fields: FieldSpec[] }[] = [];
  for (const field of spec.fields) {
    const last = sections[sections.length - 1];
    if (last && last.name === field.section) {
      last.fields.push(field);
    } else {
      sections.push({ name: field.section, fields: [field] });
    }
  }

  return (
    <form action={formAction} className="space-y-8">
      {state?.ok && (
        <p role="status" className="border-l-4 border-accent bg-ground p-4 text-[0.9375rem] font-semibold text-ink">
          Halaman tersimpan. Tampilan publik sudah diperbarui.
        </p>
      )}
      {state?.fieldErrors?.form && (
        <p role="alert" className="border-l-4 border-red-700 bg-ground p-4 text-[0.9375rem] font-semibold text-red-800">
          {state.fieldErrors.form}
        </p>
      )}

      <div className="space-y-8">
        {sections.map((sec, idx) => (
          <section
            key={sec.name ?? idx}
            className="space-y-7 bg-ground p-6 md:p-8"
            aria-label={sec.name ? `Bagian ${sec.name}` : `Isi halaman ${spec.label}`}
          >
            {sec.name && (
              <p className="font-display text-[1.125rem] font-extrabold tracking-[-0.022em] text-accent">
                {sec.name}
              </p>
            )}
            {sec.fields.map((field) => (
              <FieldEditor
                key={field.key}
                spec={spec}
                field={field}
                value={current[field.key]}
                error={state?.fieldErrors?.[field.key]}
              />
            ))}
          </section>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className="btn btn-primary press">
          <Save aria-hidden className="size-4" />
          {pending ? "Menyimpan…" : "Simpan Halaman"}
        </button>
        <p className="meta">
          Teks yang dikosongkan ikut tersimpan — kosongkan berarti menghapus isinya.
        </p>
      </div>
    </form>
  );
}
