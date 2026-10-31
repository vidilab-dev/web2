import Link from "next/link";
import { Search, CircleDot, Clock, CheckCircle2, Archive } from "lucide-react";
import { listSubmissions, type Submission, type SubmissionKind, type SubmissionStatus } from "@/lib/submissions";
import { formatDate } from "@/lib/utils";
import { setStatusAction } from "../../actions";

export const dynamic = "force-dynamic";

const statusMeta: Record<Submission["status"], { label: string; icon: typeof CircleDot; cls: string }> = {
  new: { label: "Baru", icon: CircleDot, cls: "bg-accent text-ground" },
  "in-progress": { label: "Diproses", icon: Clock, cls: "bg-earth text-ground" },
  resolved: { label: "Selesai", icon: CheckCircle2, cls: "bg-deep text-ground" },
  archived: { label: "Diarsipkan", icon: Archive, cls: "bg-ink/10 text-ink-2" },
};

const kindMeta: Record<Submission["kind"], string> = {
  contact: "Kontak",
  rfq: "Penawaran",
  partnership: "Kemitraan",
};

const KINDS: (SubmissionKind | "all")[] = ["all", "contact", "rfq", "partnership"];
const STATUSES: (SubmissionStatus | "all")[] = ["all", "new", "in-progress", "resolved", "archived"];

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string; status?: string; q?: string }>;
}) {
  const { kind, status, q } = await searchParams;

  const submissions = await listSubmissions({
    kind: kind && kind !== "all" ? (kind as SubmissionKind) : undefined,
    status: status && status !== "all" ? (status as SubmissionStatus) : undefined,
    query: q || undefined,
  });

  const buildQuery = (patch: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged = { kind, status, q, ...patch };
    for (const [k, v] of Object.entries(merged)) {
      if (v && v !== "all" && v !== "") params.set(k, v);
    }
    const s = params.toString();
    return s ? `?${s}` : "";
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-none">Permintaan Masuk</h1>
        <p className="mt-3 text-[1rem] text-ink-2">
          Semua formulir kontak, RFQ, dan registrasi mitra yang masuk ke situs.
        </p>
      </header>

      {/* Search + filters */}
      <div className="space-y-4">
        <form method="get" className="flex gap-2">
          <label htmlFor="q" className="sr-only">
            Cari permintaan
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q ?? ""}
            placeholder="Cari nama, email, atau kode referensi…"
            className="w-full max-w-md rounded-[2px] bg-paper px-4 py-2.5 text-[0.9375rem] ring-1 ring-ink/15 outline-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent"
          />
          {/* Preserve current filters across a new search */}
          {kind && kind !== "all" && <input type="hidden" name="kind" value={kind} />}
          {status && status !== "all" && <input type="hidden" name="status" value={status} />}
          <button type="submit" className="btn btn-primary press shrink-0">
            <Search aria-hidden className="size-4" />
            Cari
          </button>
        </form>

        <div className="flex flex-wrap gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[0.8125rem] font-semibold text-ink-2">Jenis:</span>
            {KINDS.map((k) => (
              <Link
                key={k}
                href={buildQuery({ kind: k })}
                className={`rounded-[2px] px-3 py-1.5 text-[0.8125rem] font-semibold transition-colors duration-200 ${
                  (kind ?? "all") === k ? "bg-deep text-ground" : "bg-ground text-ink-2 hover:bg-ground-2"
                }`}
              >
                {k === "all" ? "Semua" : kindMeta[k as SubmissionKind]}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[0.8125rem] font-semibold text-ink-2">Status:</span>
            {STATUSES.map((s) => (
              <Link
                key={s}
                href={buildQuery({ status: s })}
                className={`rounded-[2px] px-3 py-1.5 text-[0.8125rem] font-semibold transition-colors duration-200 ${
                  (status ?? "all") === s ? "bg-deep text-ground" : "bg-ground text-ink-2 hover:bg-ground-2"
                }`}
              >
                {s === "all" ? "Semua" : statusMeta[s as SubmissionStatus].label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      {submissions.length === 0 ? (
        <div className="bg-ground p-14 text-center">
          <p className="text-[1.0625rem] text-ink-2">
            {q || kind || status ? "Tidak ada permintaan yang cocok dengan filter." : "Belum ada permintaan masuk."}
          </p>
          <p className="mt-2 text-[0.875rem] text-ink-2">
            Kirim formulir di situs publik untuk melihatnya muncul di sini.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {submissions.map((s) => {
            const st = statusMeta[s.status];
            const name = String(s.payload.name ?? s.payload.businessName ?? "");
            return (
              <li key={s.id} className="bg-ground">
                <div className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <div className="min-w-0">
                    <p className="font-display text-[0.9375rem] font-bold">
                      <Link href={`/admin/submissions/${s.id}`} className="hover:text-accent">
                        {s.reference}
                      </Link>
                      <span className="ml-3 text-[0.8125rem] font-semibold text-accent">
                        {kindMeta[s.kind]}
                      </span>
                    </p>
                    <p className="mt-1 text-[0.875rem] text-ink-2">
                      {name && <span className="font-medium text-ink">{name}</span>}
                      {name && " · "}
                      {s.email}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[0.8125rem] text-ink-2">{formatDate(s.createdAt)}</span>
                    <span className={`inline-flex items-center gap-1.5 rounded-[2px] px-2.5 py-1 text-[0.75rem] font-bold ${st.cls}`}>
                      <st.icon aria-hidden className="size-3.5" />
                      {st.label}
                    </span>

                    {/* Quick status actions */}
                    <form action={setStatusAction} className="flex gap-1.5">
                      <input type="hidden" name="id" value={s.id} />
                      {(["in-progress", "resolved"] as const).map((target) => (
                        <button
                          key={target}
                          type="submit"
                          name="status"
                          value={target}
                          disabled={s.status === target}
                          className="rounded-[2px] bg-ground-2 px-2.5 py-1 text-[0.75rem] font-semibold transition-colors duration-200 hover:bg-deep hover:text-ground disabled:opacity-40 disabled:hover:bg-ground-2 disabled:hover:text-ink"
                        >
                          {target === "in-progress" ? "Proses" : "Selesai"}
                        </button>
                      ))}
                    </form>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
