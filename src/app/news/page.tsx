import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { articleCategories } from "@/content/news";
import { listArticles } from "@/lib/articles";
import { getPageContent } from "@/lib/pages";
import { newsSpec } from "@/lib/page-specs";
import { formatDate } from "@/lib/utils";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Wawasan & Berita",
  description:
    "Berita perusahaan, aktivitas, inovasi produk, edukasi pertanian, dan artikel agribisnis dari PT Bio Industri Nusantara.",
  path: "/news",
});

export default async function NewsPage() {
  const articles = await listArticles();
  const content = await getPageContent(newsSpec);
  const [lead, ...others] = articles;

  return (
    <>
      <PageHeader
        title={content.headerTitle}
        lede={content.headerLede}
        crumbs={[{ label: "Wawasan" }]}
        variant="photo"
        photo={content.headerPhoto}
      />

      {/* Category strip — a filter view into the archive. */}
      <section className="bg-ground section-y-tight" aria-labelledby="categories-heading">
        <div className="frame">
          <h2 id="categories-heading" className="sr-only">
            Kategori artikel
          </h2>
          <ul className="flex flex-wrap gap-3">
            {articleCategories.map((c) => {
              const count = articles.filter((a) => a.category === c).length;
              if (count === 0) return null;
              return (
                <li key={c}>
                  <span className="inline-flex items-center gap-2 rounded-[2px] bg-ground-2 px-4 py-2.5 font-display text-[0.875rem] font-bold tracking-[-0.012em]">
                    {c}
                    <span className="tabular-nums text-accent">{count}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Lead story, then the rest as a tight list. */}
      <section className="bg-ground section-y" aria-labelledby="latest-heading">
        <div className="frame">
          <h2 id="latest-heading" className="sr-only">
            Artikel terbaru
          </h2>

          <div className="grid gap-y-14 md:grid-cols-12 md:gap-x-10">
            <Reveal className="md:col-span-7">
              <article>
                <Link href={`/news/${lead.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden bg-ground-3">
                    {lead.image && (
                      <Image
                        src={lead.image.src}
                        alt={lead.image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 55vw"
                        quality={78}
                        className="photo transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                    )}
                  </div>
                  <h3 className="font-display text-[1.75rem] font-bold leading-[1.06] tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent md:text-[2.375rem]">
                    {lead.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2">
                    {lead.excerpt}
                  </p>
                  <p className="meta mt-4">
                    <span className="font-display text-[0.8125rem] font-bold text-accent">
                      {lead.category}
                    </span>
                    {" · "}
                    {formatDate(lead.publishedAt)} · {lead.readingMinutes} menit baca
                  </p>
                </Link>
              </article>
            </Reveal>

            <ul className="md:col-span-5">
              {others.map((a, i) => (
                <Reveal as="li" key={a.slug} delay={i * 60}>
                  <article>
                    <Link
                      href={`/news/${a.slug}`}
                      className="group flex items-start gap-5 py-6 first:pt-0 md:gap-6"
                    >
                      <div className="relative hidden aspect-square w-24 shrink-0 overflow-hidden bg-ground-3 sm:block">
                        {a.image && (
                          <Image
                            src={a.image.src}
                            alt={a.image.alt}
                            fill
                            sizes="96px"
                            quality={72}
                            className="photo transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-[1.0625rem] font-bold leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-accent md:text-[1.1875rem]">
                          {a.title}
                        </h3>
                        <p className="meta mt-2">
                          <span className="font-semibold text-accent">{a.category}</span>
                          {" · "}
                          {formatDate(a.publishedAt)}
                        </p>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              ))}
              <Reveal delay={120} className="pt-8">
                <Link href="/products" className="btn btn-secondary press">
                  Jelajahi Produk <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Reveal>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
