import Link from "next/link";
import {
  Inbox,
  Package,
  Newspaper,
  ArrowRight,
  CircleDot,
  Clock,
  CheckCircle2,
  Archive,
} from "lucide-react";
import { listSubmissions, type Submission } from "@/lib/submissions";
import { products } from "@/content/products";
import { articles } from "@/content/news";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statusMeta: Record<Submission["status"], { label: string; icon: typeof CircleDot }> = {
  new: { label: "Baru", icon: CircleDot },
  "in-progress": { label: "Diproses", icon: Clock },
  resolved: { label: "Selesai", icon: CheckCircle2 },
  archived: { label: "Diarsipkan", icon: Archive },
};

const kindMeta: Record<Submission["kind"], string> = {
  contact: "Kontak",
  rfq: "Penawaran",
  partnership: "Kemitraan",
};

export default async function AdminDashboardPage() {
  const submissions = await listSubmissions();
  const counts = {
    all: submissions.length,
    new: submissions.filter((s) => s.status === "new").length,
    inProgress: submissions.filter((s) => s.status === "in-progress").length,
    resolved: submissions.filter((s) => s.status === "resolved").length,
  };

  const needsVerification = products.filter((p) => p.dataStatus === "placeholder").length;
  const sampleArticles = articles.filter((a) => a.sample).length;

  const stats = [
    { label: "Permintaan masuk", value: counts.all, href: "/admin/submissions", icon: Inbox },
    { label: "Produk (menunggu data)", value: needsVerification, href: "/admin/products", icon: Package },
    { label: "Artikel contoh", value: sampleArticles, href: "/admin/news", icon: Newspaper },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-none">Dashboard</h1>
        <p className="mt-3 text-[1rem] text-ink-2">
          Ringkasan permintaan masuk dan status konten situs.
        </p>
      </header>

      {/* Stat tiles */}
      <ul className="grid gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <li key={s.label}>
            <Link
              href={s.href}
              className="group flex h-full flex-col justify-between bg-ground p-6 transition-colors duration-300 hover:bg-deep hover:text-ground"
            >
              <s.icon aria-hidden className="size-6 text-accent transition-colors duration-300 group-hover:text-fresh" />
              <div className="mt-8">
                <p className="font-display text-[2.5rem] font-extrabold leading-none tabular-nums tracking-[-0.04em]">
                  {s.value}
                </p>
                <p className="mt-2 text-[0.9375rem] text-ink-2 transition-colors duration-300 group-hover:text-ground/70">
                  {s.label}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Workflow breakdown */}
      <section aria-labelledby="workflow-heading">
        <h2 id="workflow-heading" className="text-[1.125rem] font-bold tracking-[-0.02em]">
          Alur Kerja Permintaan
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Baru", value: counts.new, icon: CircleDot },
            { label: "Diproses", value: counts.inProgress, icon: Clock },
            { label: "Selesai", value: counts.resolved, icon: CheckCircle2 },
          ].map((w) => (
            <li key={w.label} className="flex items-center gap-4 bg-ground p-5">
              <w.icon aria-hidden className="size-5 shrink-0 text-accent" />
              <div>
                <p className="font-display text-[1.5rem] font-bold leading-none tabular-nums">
                  {w.value}
                </p>
                <p className="mt-1 text-[0.875rem] text-ink-2">{w.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Recent submissions */}
      <section aria-labelledby="recent-heading">
        <div className="flex items-center justify-between">
          <h2 id="recent-heading" className="text-[1.125rem] font-bold tracking-[-0.02em]">
            Permintaan Terbaru
          </h2>
          <Link href="/admin/submissions" className="link-arrow">
            Lihat semua <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        {submissions.length === 0 ? (
          <div className="mt-5 bg-ground p-10 text-center">
            <p className="text-[1rem] text-ink-2">Belum ada permintaan masuk.</p>
            <p className="mt-2 text-[0.875rem] text-ink-2">
              Kirim formulir kontak atau RFQ di situs publik untuk melihatnya di sini.
            </p>
          </div>
        ) : (
          <ul className="mt-5 space-y-3">
            {submissions.slice(0, 6).map((s) => {
              const st = statusMeta[s.status];
              return (
                <li key={s.id}>
                  <Link
                    href={`/admin/submissions/${s.id}`}
                    className="flex items-center justify-between gap-4 bg-ground p-5 transition-colors duration-200 hover:bg-ground-2"
                  >
                    <div className="min-w-0">
                      <p className="font-display text-[0.9375rem] font-bold">
                        {s.reference}
                        <span className="ml-3 text-[0.8125rem] font-semibold text-accent">
                          {kindMeta[s.kind]}
                        </span>
                      </p>
                      <p className="mt-1 truncate text-[0.875rem] text-ink-2">{s.email}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                      <span className="hidden text-[0.8125rem] text-ink-2 sm:inline">
                        {formatDate(s.createdAt)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold">
                        <st.icon aria-hidden className="size-4 text-accent" />
                        {st.label}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
