import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { listArticles } from "@/lib/articles";
import { formatDate } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import type { HomeContent } from "@/lib/page-specs";

export async function News({ c }: { c: HomeContent }) {
  const articles = await listArticles();
  const [lead, ...others] = articles;

  return (
    <section aria-labelledby="news-heading" className="bg-ground section-y">
      <div className="frame">
        <Reveal className="grid gap-y-6 md:grid-cols-12 md:gap-x-10">
          <h2 id="news-heading" className="md:col-span-5">
            {c.newsHeading}
          </h2>
          <div className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="lede text-ink-2">{c.newsLede}</p>
          </div>
        </Reveal>

        {lead && (
          <div className="mt-14 grid gap-y-14 md:mt-20 md:grid-cols-12 md:gap-x-10">
          {/* The lead article carries the most weight, one dominant story. */}
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
                <h3 className="mt-6 font-display text-[1.5rem] font-bold leading-[1.12] tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent md:text-[1.875rem] lg:text-[2.125rem]">
                  {lead.title}
                </h3>
                <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2">
                  {lead.excerpt}
                </p>
                {/* The category rides in the meta line, not as a label above the title. */}
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

          {/* The rest form a tight editorial list, not a second card grid. */}
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
              <Link href="/news" className="btn btn-secondary press">
                Semua Wawasan <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Reveal>
          </ul>
          </div>
        )}
      </div>
    </section>
  );
}
