"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { distributorSchema, type DistributorInput } from "@/lib/validation";
import { FormStatus, SubmitButton } from "./form-status";
import { useFormSubmit } from "./use-form-submit";
import { HoneypotField } from "./field";
import { SelectField, TextAreaField, TextField } from "./fields";

const CHANNELS = [
  "Toko pertanian",
  "Distributor wilayah",
  "Koperasi",
  "Perusahaan agribisnis",
  "Lainnya",
] as const;

const EXPERIENCE = ["Baru", "1–3 tahun", "3–10 tahun", "Lebih dari 10 tahun"] as const;

export function DistributorForm() {
  const { status, reference, serverError, fieldErrors, submit, reset } = useFormSubmit();

  const form = useForm<DistributorInput>({
    resolver: zodResolver(distributorSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      phone: "",
      city: "",
      province: "",
      channel: "Toko pertanian",
      experience: "Baru",
      message: "",
    },
  });

  const { handleSubmit, setError, reset: resetForm } = form;

  const onSubmit = handleSubmit(async (values) => {
    const entries = Object.entries(fieldErrors);
    if (entries.length > 0) {
      for (const [key, msg] of entries) {
        setError(key as keyof DistributorInput, { type: "server", message: msg });
      }
      return;
    }
    const honeypot =
      (document.getElementById("website") as HTMLInputElement | null)?.value ?? "";
    await submit("/api/partnership", { ...values, website: honeypot });
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-8">
        <HoneypotField />
        <FormStatus status={status} reference={reference} error={serverError} />

        <div className="grid gap-7 sm:grid-cols-2">
          <TextField<DistributorInput> label="Nama lengkap" name="name" autoComplete="name" required />
          <TextField<DistributorInput>
            label="Nama usaha / toko"
            name="businessName"
            autoComplete="organization"
            required
          />
          <TextField<DistributorInput>
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField<DistributorInput>
            label="Nomor telepon"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
          />
          <TextField<DistributorInput> label="Kota / kabupaten" name="city" required />
          <TextField<DistributorInput> label="Provinsi" name="province" required />
        </div>

        <div className="grid gap-7 sm:grid-cols-2">
          <SelectField<DistributorInput>
            label="Kanal usaha"
            name="channel"
            options={CHANNELS}
            required
          />
          <SelectField<DistributorInput>
            label="Lama pengalaman usaha"
            name="experience"
            options={EXPERIENCE}
            required
          />
        </div>

        <TextAreaField<DistributorInput>
          label="Catatan tambahan"
          name="message"
          hint="Opsional. Wilayah jangkauan, jaringan pelanggan, atau pertanyaan Anda."
        />

        <div className="flex flex-wrap items-center gap-5">
          <SubmitButton status={status}>Kirim Registrasi</SubmitButton>
          {status === "success" && (
            <button
              type="button"
              onClick={() => {
                reset();
                resetForm();
              }}
              className="link-arrow"
            >
              Kirim registrasi lain
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
