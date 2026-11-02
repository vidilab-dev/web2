import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleForm } from "@/components/admin/article-form";

export const metadata = {
  title: "Artikel Baru | Admin PT BIN",
  robots: { index: false, follow: false },
};

export default function AdminArticleNewPage() {
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
          Artikel Baru
        </h1>
        <p className="mt-3 text-[1rem] text-ink-2">
          Artikel terbit langsung ke situs setelah disimpan. Tulis dari fakta
          perusahaan yang terverifikasi.
        </p>
      </header>

      <ArticleForm mode="create" saved={false} />
    </div>
  );
}
