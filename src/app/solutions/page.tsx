import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { solutionStages } from "@/content/home";
import { solutionAudiences } from "@/content/solutions";
import { getPageContent } from "@/lib/pages";
import { solutionsSpec } from "@/lib/page-specs";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Solusi Bio-Agribisnis Terintegrasi",
  description:
    "Pendekatan lima tahap PT Bio Industri Nusantara: asesmen lahan, perlakuan biologis, perlindungan tanaman, pemantauan lapangan, dan evaluasi kinerja dalam satu program.",
  path: "/solutions",
  image: "/images/plantation-aerial.jpg",
  imageAlt: "Pandangan udara atas areal perkebunan",
});

export default async function SolutionsPage() {
  const c = await getPageContent(solutionsSpec);
  // The admin edits each stage's text; ids, numbering and images stay fixed.
  const stages = solutionStages.map((s, i) => ({ ...s, ...(c.stages[i] ?? {}) }));

  return (
    <>
      <PageHeader
        title={c.headerTitle}
        lede={c.headerLede}
        crumbs={[{ label: "Solusi" }]}
        variant="photo"
        photo={c.headerPhoto}
      />

      {/* The five stages as an ordered narrative — the spine of the approach. */}
      <section className="bg-ground section-y" aria-labelledby="stages-heading">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 id="stages-heading" className="text-h3">
                {c.stagesHeading}
              </h2>
              <p className="lede mt-6 max-w-sm text-ink-2">
                {c.stagesLede}
              </p>
            </div>
          </Reveal>

          <ol className="md:col-span-8">
            {stages.map((s, i) => (
              <Reveal
                as="li"
                key={s.id}
                delay={i * 60}
                className="grid gap-y-3 py-8 first:pt-0 md:grid-cols-12 md:gap-x-8"
              >
                <div className="md:col-span-1">
                  <span className="flex size-10 items-center justify-center rounded-full bg-deep font-display text-[1rem] font-bold tabular-nums text-ground">
                    {s.index}
                  </span>
                </div>
                <div className="md:col-span-11">
                  <h3 className="font-display text-[1.375rem] font-bold tracking-[-0.026em] md:text-[1.625rem]">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2">
                    {s.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* The three audiences as full-width bands, each with its own photograph. */}
      <section aria-labelledby="audiences-heading" className="bg-ground-2 section-y">
        <div className="frame">
          <Reveal>
            <h2 id="audiences-heading">{c.audiencesHeading}</h2>
          </Reveal>
        </div>

        <ul className="mt-14 md:mt-20">
          {solutionAudiences.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 80}>
              <div className="frame">
                <Link
                  href={`/solutions/${a.slug}`}
                  className="group grid items-stretch gap-0 overflow-hidden bg-ground md:grid-cols-12"
                >
                  <div
                    className={`relative min-h-[16rem] md:min-h-[22rem] ${
                      i % 2 === 0 ? "md:col-span-5" : "md:col-span-5 md:col-start-8 md:row-start-1"
                    }`}
                  >
                    <Image
                      src={a.photo.src}
                      alt={a.photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 42vw"
                      quality={78}
                      className="photo transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div
                    className={`flex flex-col justify-center p-8 md:p-12 ${
                      i % 2 === 0 ? "md:col-span-6 md:col-start-7" : "md:col-span-6 md:col-start-1 md:row-start-1"
                    }`}
                  >
                    <h3 className="font-display text-[1.625rem] font-bold leading-[1.06] tracking-[-0.03em] md:text-[2.375rem]">
                      {a.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-2">
                      {a.headline}
                    </p>
                    <span className="btn btn-primary press mt-8 w-fit">
                      Lihat Detail <ArrowRight aria-hidden className="size-4" />
                    </span>
                  </div>
                </Link>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-ground-3 section-y-tight">
        <div className="frame flex flex-wrap items-center justify-between gap-6">
          <p className="statement max-w-2xl">
            {c.closingStatement}
          </p>
          <Link href="/contact" className="btn btn-primary press">
            Mulai Percakapan <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
