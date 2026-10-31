"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { FormStatus, SubmitButton } from "./form-status";
import { useFormSubmit } from "./use-form-submit";
import { HoneypotField } from "./field";
import { SelectField, TextAreaField, TextField } from "./fields";

const SUBJECTS = ["Umum", "Produk", "Kemitraan", "Distribusi", "Riset & Kolaborasi"] as const;

export function ContactForm() {
  const { status, reference, serverError, fieldErrors, submit, reset } = useFormSubmit();

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      organization: "",
      email: "",
      phone: "",
      subject: "Umum",
      message: "",
    },
  });

  const { handleSubmit, setError, reset: resetForm } = form;

  const onSubmit = handleSubmit(async (values) => {
    const entries = Object.entries(fieldErrors);
    if (entries.length > 0) {
      for (const [key, msg] of entries) {
        setError(key as keyof ContactInput, { type: "server", message: msg });
      }
      return;
    }
    const honeypot =
      (document.getElementById("website") as HTMLInputElement | null)?.value ?? "";
    await submit("/api/contact", { ...values, website: honeypot });
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-7">
        <HoneypotField />
        <FormStatus status={status} reference={reference} error={serverError} />

        <div className="grid gap-7 sm:grid-cols-2">
          <TextField<ContactInput> label="Nama lengkap" name="name" autoComplete="name" required />
          <TextField<ContactInput>
            label="Perusahaan / organisasi"
            name="organization"
            autoComplete="organization"
            hint="Opsional"
          />
          <TextField<ContactInput>
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField<ContactInput>
            label="Nomor telepon"
            name="phone"
            type="tel"
            autoComplete="tel"
            hint="Opsional"
          />
        </div>

        <SelectField<ContactInput>
          label="Topik"
          name="subject"
          options={SUBJECTS}
          required
        />

        <TextAreaField<ContactInput>
          label="Pesan"
          name="message"
          rows={6}
          required
          hint="Sampaikan kebutuhan Anda selengkap mungkin agar respons kami lebih tepat."
        />

        <div className="flex flex-wrap items-center gap-5">
          <SubmitButton status={status}>Kirim Pesan</SubmitButton>
          {status === "success" && (
            <button
              type="button"
              onClick={() => {
                reset();
                resetForm();
              }}
              className="link-arrow"
            >
              Kirim pesan lain
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
