import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { articles, getArticle } from "@/content/news";
import { formatDate } from "@/lib/utils";
import { buildPageMetadata } from "@/app/layout";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${article.slug}`,
    image: article.image?.src,
    imageAlt: article.image?.alt,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const others = articles.filter((a) => a.slug !== slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: "PT Bio Industri Nusantara" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        title={
          <span className="text-[clamp(2rem,5vw,4rem)]">{article.title}</span>
        }
        crumbs={[
          { label: "Wawasan", href: "/news" },
          { label: article.category },
          { label: article.title },
        ]}
      />

      {/* Article meta */}
      <div className="bg-ground">
        <div className="frame py-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem] text-ink-2">
            <span className="font-display font-bold text-accent">{article.category}</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>{article.readingMinutes} menit baca</span>
            <span>Oleh {article.author}</span>
          </div>
        </div>
      </div>

      {/* Featured image */}
      {article.image && (
        <div className="bg-ground">
          <div className="frame pb-10">
            <div className="relative aspect-[16/9] overflow-hidden bg-ground-3 md:aspect-[21/9]">
              <Image
                src={article.image.src}
                alt={article.image.alt}
                fill
                priority
                sizes="100vw"
                quality={80}
                className="photo"
              />
            </div>
          </div>
        </div>
      )}

      {/* Body */}
      <article className="bg-ground section-y">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-7 md:col-start-3">
            <div className="space-y-6 text-[1.0625rem] leading-relaxed text-ink-2 md:text-[1.125rem]">
              {article.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          {/* Side panel: related products and CTA */}
          <aside className="md:col-span-3 md:col-start-10">
            <Reveal delay={70}>
              <div className="bg-ground-2 p-7">
                <h2 className="font-display text-[1.0625rem] font-bold tracking-[-0.018em]">
                  Artikel Terkait
                </h2>
                <ul className="mt-5 space-y-4">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/news/${o.slug}`}
                        className="group block text-[0.9375rem] leading-snug"
                      >
                        <span className="font-display font-bold transition-colors duration-200 group-hover:text-accent">
                          {o.title}
                        </span>
                        <span className="meta mt-1 block">{formatDate(o.publishedAt)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-6 bg-deep p-7 text-ground">
                <p className="font-display text-[1.0625rem] font-bold tracking-[-0.018em] text-fresh">
                  Butuh datasheet produk?
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ground/75">
                  Spesifikasi teknis tersedia atas permintaan untuk setiap produk
                  dalam portofolio kami.
                </p>
                <Link href="/rfq" className="btn btn-on-dark press mt-5 w-full">
                  Minta Penawaran
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </article>

      <section className="bg-ground-3 section-y-tight">
        <div className="frame flex flex-wrap items-center justify-between gap-6">
          <Link href="/news" className="btn btn-secondary press">
            <ArrowLeft aria-hidden className="size-4" />
            Kembali ke Wawasan
          </Link>
          <Link href="/products" className="btn btn-primary press">
            Jelajahi Produk <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
