"use client";

import { useEffect, useActionState, useRef, useState } from "react";
import { Upload } from "lucide-react";

/**
 * Shared photo picker: uploads a file through a server action and hands the
 * resulting public URL back to the parent form field.
 */

type UploadState = { error?: string; url?: string } | undefined;
type UploadAction = (prev: UploadState, formData: FormData) => Promise<UploadState>;

export function PhotoPicker({
  action,
  initialUrl,
  onPick,
  label = "Unggah foto",
  previewAlt = "Pratinjau foto",
}: {
  action: UploadAction;
  initialUrl: string;
  onPick: (url: string) => void;
  label?: string;
  previewAlt?: string;
}) {
  const [state, formAction, pending] = useActionState<UploadState, FormData>(action, undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // When the upload succeeds, hand the URL to the parent form field.
  useEffect(() => {
    if (state?.url && state.url !== initialUrl) onPick(state.url);
  }, [state?.url, initialUrl, onPick]);

  return (
    <div className="mt-3 border border-ink/15 bg-white p-4">
      <p className="font-display text-[0.9375rem] font-bold text-ink">{label}</p>
      {(preview ?? initialUrl) && (
        <figure className="mt-3 max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview ?? initialUrl}
            alt={previewAlt}
            className="w-full rounded-[2px] border border-ink/10"
          />
        </figure>
      )}
      {/* Not a <form>: this picker renders inside the parent page form, and a
          nested form is invalid HTML that breaks hydration. The button
          dispatches the same server action with the picked file directly. */}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          name="photo"
          accept="image/jpeg,image/png,image/webp,image/avif"
          aria-label={label}
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
            void formAction(fd);
          }}
          className="btn btn-secondary press"
        >
          <Upload aria-hidden className="size-4" />
          {pending ? "Mengunggah…" : "Unggah"}
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
