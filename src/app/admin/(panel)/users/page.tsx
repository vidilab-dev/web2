import { Shield, Users, UserCog, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Pengguna & Peran | Admin PT BIN",
  robots: { index: false, follow: false },
};

/**
 * Role-based access control reference.
 *
 * The four roles below define the permission model for the admin panel. The
 * concrete user records live in PostgreSQL through Prisma; until the database
 * is connected this page documents the model and the current session.
 */
const roles = [
  {
    role: "Administrator",
    icon: Shield,
    permissions: [
      "Kelola pengguna dan peran",
      "Akses semua modul konten",
      "Persetujuan publikasi",
      "Pengaturan sistem",
    ],
    count: 1,
  },
  {
    role: "Editor",
    icon: UserCog,
    permissions: [
      "Buat dan ubah draf produk & artikel",
      "Ajukan untuk ditinjau",
      "Kelola pustaka media",
    ],
    count: 0,
  },
  {
    role: "Reviewer",
    icon: Users,
    permissions: [
      "Tinjau dan ajukan perubahan",
      "Setujui konten untuk publikasi",
      "Kelola permintaan masuk",
    ],
    count: 0,
  },
  {
    role: "Viewer",
    icon: Users,
    permissions: ["Lihat dasbor dan laporan", "Lihat permintaan masuk (baca saja)"],
    count: 0,
  },
];

const workflow = [
  { step: "Draf", description: "Konten dibuat oleh Editor dan belum terlihat publik." },
  { step: "Tinjauan", description: "Editor mengajukan; Reviewer memeriksa akurasi dan kepatuhan." },
  { step: "Disetujui", description: "Reviewer menyetujui; konten siap dipublikasikan." },
  { step: "Dipublikasikan", description: "Konten tayang di situs publik." },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-none">Pengguna &amp; Peran</h1>
        <p className="mt-3 text-[1rem] text-ink-2">
          Model akses berbasis peran untuk panel admin.
        </p>
      </header>

      {/* Connection notice */}
      <div className="flex items-start gap-4 border-l-4 border-earth bg-ground p-5 text-[0.9375rem] leading-relaxed text-ink-2">
        <AlertTriangle aria-hidden className="mt-0.5 size-5 shrink-0 text-earth" />
        <div>
          <p className="font-semibold text-ink">Database belum terhubung</p>
          <p className="mt-1">
            Saat ini panel berjalan tanpa PostgreSQL sehingga akun pengguna nyata
            belum dapat dibuat. Atur <code className="rounded-[2px] bg-ground-2 px-1.5 py-0.5">DATABASE_URL</code>,
            jalankan <code className="rounded-[2px] bg-ground-2 px-1.5 py-0.5">npm run db:push</code>, lalu
            daftarkan akun melalui migrasi awal.
          </p>
        </div>
      </div>

      {/* Roles */}
      <section aria-labelledby="roles-heading">
        <h2 id="roles-heading" className="text-[1.125rem] font-bold tracking-[-0.02em]">
          Peran dan Izin
        </h2>
        <ul className="mt-5 grid gap-5 md:grid-cols-2">
          {roles.map((r) => (
            <li key={r.role} className="bg-ground p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <r.icon aria-hidden className="size-5 text-accent" />
                  <h3 className="font-display text-[1.125rem] font-bold tracking-[-0.022em]">
                    {r.role}
                  </h3>
                </div>
                <span className="rounded-[2px] bg-ground-2 px-2.5 py-1 text-[0.75rem] font-bold tabular-nums">
                  {r.count} pengguna
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {r.permissions.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-2">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* Approval workflow */}
      <section aria-labelledby="approval-heading">
        <h2 id="approval-heading" className="text-[1.125rem] font-bold tracking-[-0.02em]">
          Alur Persetujuan Konten
        </h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.map((w, i) => (
            <li key={w.step} className="bg-ground p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-deep font-display text-[0.875rem] font-bold tabular-nums text-ground">
                  {i + 1}
                </span>
                <h3 className="font-display text-[1rem] font-bold">{w.step}</h3>
              </div>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-2">{w.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
