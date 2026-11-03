import Link from "next/link";
import { ArrowUpRight, Check, Pencil } from "lucide-react";
import { groupPageSpecs, pageEditorHref } from "@/lib/page-specs";
import { listEditedPagePaths } from "@/lib/pages";

export const metadata = {
  title: "Halaman | Admin PT BIN",
  robots: { index: false, follow: false },
};

export default async function AdminPagesPage() {
  const groups = groupPageSpecs();
  const edited = await listEditedPagePaths();
  const editedCount = groups.reduce(
    (n, g) => n + g.specs.filter((s) => edited.has(s.path)).length,
    0
  );
  const total = groups.reduce((n, g) => n + g.specs.length, 0);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-none">Halaman</h1>
          <p className="mt-3 max-w-2xl text-[1rem] text-ink-2">
            {total} halaman publik siap diisi. Klik salah satu untuk mengubah
            teks dan fotonya; perubahan langsung tampil di situs.
          </p>
        </div>
        <Link href="/" className="btn btn-secondary press">
          Lihat di Situs <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </header>

      <div className="border-l-4 border-accent bg-ground p-5 text-[0.9375rem] leading-relaxed text-ink-2">
        <p className="font-semibold text-ink">Cara kerja</p>
        <p className="mt-1">
          Halaman yang belum pernah disunting memakai teks bawaan situs.{" "}
          <span className="font-semibold text-earth">
            {editedCount} dari {total}
          </span>{" "}
          halaman sudah pernah disunting dan menampilkan isi terakhir yang
          disimpan.
        </p>
      </div>

      {groups.map(({ group, specs }) => (
        <section key={group} aria-labelledby={`group-${group}`}>
          <h2
            id={`group-${group}`}
            className="text-[1.125rem] font-bold tracking-[-0.02em]"
          >
            {group}
          </h2>
          <ul className="mt-5 space-y-3">
            {specs.map((spec) => (
              <li key={spec.path} className="bg-ground p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-display text-[1.0625rem] font-bold leading-snug">
                      <Link
                        href={pageEditorHref(spec.path)}
                        className="hover:text-accent"
                      >
                        {spec.label}
                      </Link>
                    </h3>
                    <p className="meta mt-1.5">
                      {spec.path} · {spec.fields.length} bagian dapat diubah
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    {edited.has(spec.path) ? (
                      <span className="inline-flex items-center gap-1.5 rounded-[2px] bg-accent/15 px-2.5 py-1 text-[0.75rem] font-bold text-accent">
                        <Check aria-hidden className="size-3.5" />
                        Disunting
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-[2px] bg-earth/15 px-2.5 py-1 text-[0.75rem] font-bold text-earth">
                        Bawaan
                      </span>
                    )}
                    <Link
                      href={pageEditorHref(spec.path)}
                      className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-accent hover:underline"
                    >
                      <Pencil aria-hidden className="size-3.5" />
                      Ubah
                    </Link>
                    <Link
                      href={spec.path}
                      className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-accent hover:underline"
                    >
                      <ArrowUpRight aria-hidden className="size-3.5" />
                      Lihat
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
