import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { getPageContent } from "@/lib/pages";
import { laboratorySpec } from "@/lib/page-specs";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Laboratorium",
  description:
    "Kegiatan laboratorium PT Bio Industri Nusantara: karakterisasi mikroorganisme, pengujian viabilitas, dan pengujian mutu produk.",
  path: "/research/laboratory",
  image: "/images/lab-microscope.jpg",
  imageAlt: "Peneliti mengamati mikroorganisme di bawah mikroskop",
});

export default async function LaboratoryPage() {
  const c = await getPageContent(laboratorySpec);

  return (
    <>
      <PageHeader
        title={c.headerTitle}
        lede={c.headerLede}
        crumbs={[
          { label: "Riset & Inovasi", href: "/research" },
          { label: "Laboratorium" },
        ]}
        variant="photo"
        photo={c.headerPhoto}
      />

      <section className="bg-ground section-y">
        <div className="frame grid gap-y-12 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-5">
            <figure className="relative aspect-[4/5] overflow-hidden bg-ground-3">
              <Image
                src={c.culturePhoto.src}
                alt={c.culturePhoto.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={78}
                className="photo"
              />
            </figure>
            <Reveal delay={80}>
              <figcaption className="meta mt-3 max-w-sm">
                {c.cultureCaption}
              </figcaption>
            </Reveal>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="statement">{c.statement}</p>
            </Reveal>
            <Reveal delay={80} className="mt-6 text-[1.0625rem] leading-relaxed text-ink-2">
              <p>{c.introBody}</p>
            </Reveal>

            <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {c.aspects.map((a, i) => (
                <Reveal as="li" key={a.title} delay={i * 60}>
                  <h3 className="font-display text-[1.0625rem] font-bold tracking-[-0.018em]">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{a.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-ground-2 section-y-tight">
        <div className="frame flex flex-wrap items-center justify-between gap-6">
          <p className="statement max-w-2xl">
            {c.closingStatement}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/rfq" className="btn btn-primary press">
              Minta Datasheet Produk <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/research/demonstration-plot" className="btn btn-secondary press">
              Demonstration Plot
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
