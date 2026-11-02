import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getArticleBySlug } from "@/lib/articles";
import { ArticleForm } from "@/components/admin/article-form";

export const metadata = {
  title: "Edit Artikel | Admin PT BIN",
  robots: { index: false, follow: false },
};

export default async function AdminArticleEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { slug } = await params;
  const { saved } = await searchParams;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const editable = !article.sample;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <Link
          href="/admin/news"
          className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-accent hover:underline"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Semua artikel
        </Link>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-none tracking-[-0.03em]">
          {article.title}
        </h1>
        {!editable && (
          <p role="note" className="mt-4 border-l-4 border-earth bg-ground p-4 text-[0.9375rem] leading-relaxed text-ink-2">
            Ini artikel contoh bawaan dan tidak bisa diubah langsung. Buat artikel
            baru sebagai penggantinya, lalu hapus yang contoh dari daftar konten
            setelah penggantinya terbit.
          </p>
        )}
      </header>

      {editable ? (
        <ArticleForm article={article} mode="edit" saved={saved === "1"} />
      ) : (
        <Link href="/admin/news/new" className="btn btn-primary press">
          Buat Artikel Baru
        </Link>
      )}
    </div>
  );
}
