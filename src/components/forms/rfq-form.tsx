"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rfqSchema, type RfqInput } from "@/lib/validation";
import { products } from "@/content/products";
import { FormStatus, SubmitButton } from "./form-status";
import { useFormSubmit } from "./use-form-submit";
import { HoneypotField } from "./field";
import { CheckboxGroup, SelectField, TextAreaField, TextField } from "./fields";

const LAND_TYPES = ["Perkebunan", "Lahan pertanian", "Distributor / toko", "Penelitian", "Lainnya"] as const;
const PRODUCT_NAMES = products.map((p) => p.name);

export function RfqForm() {
  const { status, reference, serverError, fieldErrors, submit, reset } = useFormSubmit();

  const form = useForm<RfqInput>({
    resolver: zodResolver(rfqSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      organization: "",
      email: "",
      phone: "",
      region: "",
      landType: "Perkebunan",
      area: "",
      products: [],
      quantity: "",
      message: "",
    },
  });

  const { handleSubmit, setError, reset: resetForm } = form;

  const onSubmit = handleSubmit(async (values) => {
    const entries = Object.entries(fieldErrors);
    if (entries.length > 0) {
      for (const [key, msg] of entries) {
        setError(key as keyof RfqInput, { type: "server", message: msg });
      }
      return;
    }
    const honeypot =
      (document.getElementById("website") as HTMLInputElement | null)?.value ?? "";
    await submit("/api/rfq", { ...values, website: honeypot });
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-8">
        <HoneypotField />
        <FormStatus status={status} reference={reference} error={serverError} />

        <div className="grid gap-7 sm:grid-cols-2">
          <TextField<RfqInput> label="Nama lengkap" name="name" autoComplete="name" required />
          <TextField<RfqInput>
            label="Perusahaan / organisasi"
            name="organization"
            autoComplete="organization"
            required
          />
          <TextField<RfqInput> label="Email" name="email" type="email" autoComplete="email" required />
          <TextField<RfqInput>
            label="Nomor telepon"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            hint="Nomor yang dapat dihubungi untuk tindak lanjut."
          />
          <TextField<RfqInput>
            label="Wilayah operasional"
            name="region"
            required
            hint="Provinsi atau wilayah distribusi."
          />
          <TextField<RfqInput>
            label="Perkiraan luas lahan (hektare)"
            name="area"
            hint="Opsional, jika sudah diketahui."
          />
        </div>

        <SelectField<RfqInput>
          label="Jenis lahan / kebutuhan"
          name="landType"
          options={LAND_TYPES}
          required
        />

        <CheckboxGroup<RfqInput>
          label="Produk yang diminati"
          name="products"
          options={PRODUCT_NAMES}
          required
          hint="Pilih satu atau lebih produk untuk dimasukkan dalam penawaran."
        />

        <TextField<RfqInput>
          label="Perkiraan kebutuhan"
          name="quantity"
          required
          hint="Contoh: 5 ton per bulan, atau 20 hektare lahan."
        />

        <TextAreaField<RfqInput>
          label="Uraian kebutuhan"
          name="message"
          hint="Opsional. Informasi tambahan membantu kami menyusun penawaran yang lebih tepat."
        />

        <div className="flex flex-wrap items-center gap-5">
          <SubmitButton status={status}>Kirim Permintaan Penawaran</SubmitButton>
          {status === "success" && (
            <button
              type="button"
              onClick={() => {
                reset();
                resetForm();
              }}
              className="link-arrow"
            >
              Buat permintaan lain
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
