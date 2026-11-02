import Link from "next/link";
import { ArrowUpRight, FileText, Plus } from "lucide-react";
import { articleCategories } from "@/content/news";
import { listArticles } from "@/lib/articles";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Berita & Wawasan | Admin PT BIN",
  robots: { index: false, follow: false },
};

export default async function AdminNewsPage() {
  const articles = await listArticles();
  const sampleCount = articles.filter((a) => a.sample).length;

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-none">Berita &amp; Wawasan</h1>
          <p className="mt-3 text-[1rem] text-ink-2">
            {articles.length} artikel, {sampleCount} di antaranya contoh editorial
            yang menunggu konfirmasi perusahaan.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/news/new" className="btn btn-primary press">
            <Plus aria-hidden className="size-4" />
            Artikel Baru
          </Link>
          <Link href="/news" className="btn btn-secondary press">
            Lihat di Situs <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </div>
      </header>

      {/* Workflow note */}
      <div className="border-l-4 border-accent bg-ground p-5 text-[0.9375rem] leading-relaxed text-ink-2">
        <p className="font-semibold text-ink">Alur publikasi</p>
        <p className="mt-1">
          Draf → Tinjauan → Disetujui → Dipublikasikan. Semua artikel di bawah
          bertanda <span className="font-semibold text-earth">contoh</span> dan
          harus diganti atau dihapus sebelum situs diluncurkan.
        </p>
      </div>

      {/* Category breakdown */}
      <section aria-labelledby="cat-breakdown">
        <h2 id="cat-breakdown" className="text-[1.125rem] font-bold tracking-[-0.02em]">
          Kategori
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {articleCategories.map((c) => {
            const count = articles.filter((a) => a.category === c).length;
            return (
              <li
                key={c}
                className="rounded-[2px] bg-ground px-3 py-2 text-[0.8125rem] font-semibold"
              >
                {c} <span className="ml-1.5 tabular-nums text-accent">{count}</span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Article list */}
      <section aria-labelledby="article-list">
        <h2 id="article-list" className="text-[1.125rem] font-bold tracking-[-0.02em]">
          Semua Artikel
        </h2>
        <ul className="mt-5 space-y-3">
          {articles.map((a) => (
            <li key={a.slug} className="bg-ground p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[0.8125rem] font-bold text-accent">{a.category}</p>
                  <h3 className="mt-1.5 font-display text-[1.0625rem] font-bold leading-snug">
                    <Link href={`/news/${a.slug}`} className="hover:text-accent">
                      {a.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[0.875rem] text-ink-2">
                    {formatDate(a.publishedAt)} · {a.readingMinutes} menit baca · {a.author}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  {a.sample ? (
                    <span className="inline-flex items-center gap-1.5 rounded-[2px] bg-earth/15 px-2.5 py-1 text-[0.75rem] font-bold text-earth">
                      <FileText aria-hidden className="size-3.5" />
                      Contoh
                    </span>
                  ) : (
                    <Link
                      href={`/admin/news/${a.slug}`}
                      className="text-[0.8125rem] font-semibold text-accent hover:underline"
                    >
                      Ubah
                    </Link>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-[2px] bg-accent px-2.5 py-1 text-[0.75rem] font-bold text-ground">
                    Dipublikasikan
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
