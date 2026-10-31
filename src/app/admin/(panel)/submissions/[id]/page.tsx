import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CircleDot, Clock, CheckCircle2, Archive } from "lucide-react";
import { getSubmission, type Submission } from "@/lib/submissions";
import { formatDate } from "@/lib/utils";
import { setStatusAction } from "../../../actions";

export const dynamic = "force-dynamic";

const statusMeta: Record<Submission["status"], { label: string; icon: typeof CircleDot }> = {
  new: { label: "Baru", icon: CircleDot },
  "in-progress": { label: "Diproses", icon: Clock },
  resolved: { label: "Selesai", icon: CheckCircle2 },
  archived: { label: "Diarsipkan", icon: Archive },
};

const kindMeta: Record<Submission["kind"], string> = {
  contact: "Kontak",
  rfq: "Permintaan Penawaran",
  partnership: "Registrasi Kemitraan",
};

/** Order of fields as they should read in the detail view. */
const FIELD_ORDER: Record<Submission["kind"], string[]> = {
  contact: ["name", "organization", "email", "phone", "subject", "message"],
  rfq: [
    "name",
    "organization",
    "email",
    "phone",
    "region",
    "landType",
    "area",
    "products",
    "quantity",
    "message",
  ],
  partnership: [
    "name",
    "businessName",
    "email",
    "phone",
    "city",
    "province",
    "channel",
    "experience",
    "message",
  ],
};

const FIELD_LABELS: Record<string, string> = {
  name: "Nama lengkap",
  organization: "Perusahaan / organisasi",
  email: "Email",
  phone: "Telepon",
  subject: "Topik",
  message: "Pesan",
  region: "Wilayah operasional",
  landType: "Jenis lahan",
  area: "Luas lahan (ha)",
  products: "Produk diminati",
  quantity: "Perkiraan kebutuhan",
  businessName: "Nama usaha / toko",
  city: "Kota / kabupaten",
  province: "Provinsi",
  channel: "Kanal usaha",
  experience: "Pengalaman usaha",
};

function renderValue(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "string" && value.length > 120) {
    return <span className="whitespace-pre-wrap">{value}</span>;
  }
  if (typeof value === "string" && value === "") return <span className="text-ink-2">—</span>;
  return String(value ?? "");
}

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await getSubmission(id);
  if (!submission) notFound();

  const st = statusMeta[submission.status];
  const order = FIELD_ORDER[submission.kind];

  return (
    <div className="space-y-8">
      <Link href="/admin/submissions" className="link-arrow inline-flex">
        <ArrowLeft aria-hidden className="size-4" />
        Kembali ke daftar
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[0.875rem] font-bold text-accent">{kindMeta[submission.kind]}</p>
          <h1 className="mt-1 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-none">
            {submission.reference}
          </h1>
          <p className="mt-3 text-[0.9375rem] text-ink-2">
            Masuk {formatDate(submission.createdAt)} · Diperbarui {formatDate(submission.updatedAt)}
          </p>
        </div>

        <span className="inline-flex items-center gap-2 bg-deep px-4 py-2.5 text-[0.875rem] font-bold text-ground">
          <st.icon aria-hidden className="size-4 text-fresh" />
          {st.label}
        </span>
      </header>

      {/* Workflow actions — the Draft → Review → Approved → Published flow for inbound work. */}
      <section aria-labelledby="workflow-heading" className="bg-ground p-6">
        <h2 id="workflow-heading" className="text-[1.0625rem] font-bold tracking-[-0.02em]">
          Alur Tindak Lanjut
        </h2>
        <form action={setStatusAction} className="mt-4 flex flex-wrap gap-2">
          <input type="hidden" name="id" value={submission.id} />
          {(["new", "in-progress", "resolved", "archived"] as const).map((target) => (
            <button
              key={target}
              type="submit"
              name="status"
              value={target}
              disabled={submission.status === target}
              className={`rounded-[2px] px-4 py-2 text-[0.875rem] font-semibold transition-colors duration-200 disabled:opacity-40 ${
                submission.status === target
                  ? "bg-deep text-ground"
                  : "bg-ground-2 text-ink hover:bg-deep hover:text-ground"
              }`}
            >
              {statusMeta[target].label}
            </button>
          ))}
        </form>
      </section>

      {/* Payload as a definition list. */}
      <section aria-labelledby="detail-heading" className="bg-ground p-6 md:p-8">
        <h2 id="detail-heading" className="text-[1.0625rem] font-bold tracking-[-0.02em]">
          Isian Formulir
        </h2>
        <dl className="mt-6 space-y-5">
          {order.map((key) => {
            const value = (submission.payload as Record<string, unknown>)[key];
            if (value === undefined || value === null) return null;
            return (
              <div key={key} className="grid gap-1 md:grid-cols-12 md:gap-6">
                <dt className="text-[0.875rem] font-semibold text-ink-2 md:col-span-4">
                  {FIELD_LABELS[key] ?? key}
                </dt>
                <dd className="text-[1rem] leading-relaxed md:col-span-8">{renderValue(value)}</dd>
              </div>
            );
          })}
        </dl>
      </section>
    </div>
  );
}
