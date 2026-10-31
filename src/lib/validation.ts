import { z } from "zod";

/**
 * Form validation schemas.
 *
 * Every message is written in Indonesian, is specific about what is wrong, and
 * is bound to its field with aria-describedby so it reaches screen readers.
 */

const required = (label: string, min = 1) =>
  z.string().trim().min(min, `${label} wajib diisi.`);

export const contactSchema = z.object({
  name: required("Nama lengkap"),
  organization: z.string().trim().optional(),
  email: z.email("Masukkan alamat email yang valid.").min(1, "Email wajib diisi."),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{6,20}$/, "Masukkan nomor telepon yang valid.")
    .optional()
    .or(z.literal("")),
  subject: z.enum(["Umum", "Produk", "Kemitraan", "Distribusi", "Riset & Kolaborasi"], {
    message: "Pilih salah satu topik.",
  }),
  message: z.string().trim().min(20, "Sampaikan kebutuhan Anda dalam minimal 20 karakter."),
});

export const rfqSchema = z.object({
  name: required("Nama lengkap"),
  organization: required("Nama perusahaan / organisasi"),
  email: z.email("Masukkan alamat email yang valid.").min(1, "Email wajib diisi."),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{6,20}$/, "Masukkan nomor telepon yang valid.")
    .min(6, "Nomor telepon wajib diisi."),
  region: required("Wilayah operasional"),
  landType: z.enum(["Perkebunan", "Lahan pertanian", "Distributor / toko", "Penelitian", "Lainnya"], {
    message: "Pilih salah satu jenis lahan.",
  }),
  area: z.string().trim().optional(),
  products: z.array(z.string()).min(1, "Pilih setidaknya satu produk."),
  quantity: required("Perkiraan kebutuhan"),
  message: z.string().trim().max(1500, "Uraian maksimal 1.500 karakter.").optional(),
});

export const distributorSchema = z.object({
  name: required("Nama lengkap"),
  businessName: required("Nama usaha / toko"),
  email: z.email("Masukkan alamat email yang valid.").min(1, "Email wajib diisi."),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{6,20}$/, "Masukkan nomor telepon yang valid.")
    .min(6, "Nomor telepon wajib diisi."),
  city: required("Kota / kabupaten"),
  province: required("Provinsi"),
  channel: z.enum(["Toko pertanian", "Distributor wilayah", "Koperasi", "Perusahaan agribisnis", "Lainnya"], {
    message: "Pilih salah satu kanal usaha.",
  }),
  experience: z.enum(["Baru", "1–3 tahun", "3–10 tahun", "Lebih dari 10 tahun"], {
    message: "Pilih lama pengalaman usaha.",
  }),
  message: z.string().trim().max(1500, "Uraian maksimal 1.500 karakter.").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type RfqInput = z.infer<typeof rfqSchema>;
export type DistributorInput = z.infer<typeof distributorSchema>;
