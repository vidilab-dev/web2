import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { getPageContent } from "@/lib/pages";
import { demonstrationPlotSpec } from "@/lib/page-specs";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Demonstration Plot",
  description:
    "Uji lapangan terkontrol PT Bio Industri Nusantara untuk mengamati respon tanaman dan tanah terhadap program yang diusulkan.",
  path: "/research/demonstration-plot",
  image: "/images/seedling-facility.jpg",
  imageAlt: "Persemaian tanaman untuk uji lapangan",
});

export default async function DemonstrationPlotPage() {
  const c = await getPageContent(demonstrationPlotSpec);

  return (
    <>
      <PageHeader
        title={c.headerTitle}
        lede={c.headerLede}
        crumbs={[
          { label: "Riset & Inovasi", href: "/research" },
          { label: "Demonstration Plot" },
        ]}
        variant="photo"
        photo={c.headerPhoto}
      />

      <section className="bg-ground section-y">
        <div className="frame grid gap-y-12 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-5">
            <p className="statement">{c.statement}</p>
            <Reveal delay={80} className="mt-6 text-[1.0625rem] leading-relaxed text-ink-2">
              <p>{c.introBody}</p>
            </Reveal>
            <Reveal delay={140} className="mt-8">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden bg-ground-3">
                  <Image
                    src={c.soilPhoto.src}
                    alt={c.soilPhoto.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    quality={76}
                    className="photo"
                  />
                </div>
                <figcaption className="meta mt-3">{c.soilCaption}</figcaption>
              </figure>
            </Reveal>
          </Reveal>

          {/* The four stages as an ordered list. */}
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <h2 className="text-h3">{c.stagesHeading}</h2>
            </Reveal>
            <ol className="mt-10">
              {c.stages.map((s, i) => (
                <Reveal
                  as="li"
                  key={s.stage}
                  delay={i * 60}
                  className="grid gap-y-2 py-7 first:pt-0 md:grid-cols-12 md:gap-x-6"
                >
                  <div className="md:col-span-1">
                    <span className="flex size-9 items-center justify-center rounded-full bg-deep font-display text-[0.9375rem] font-bold tabular-nums text-ground">
                      {i + 1}
                    </span>
                  </div>
                  <div className="md:col-span-11">
                    <h3 className="font-display text-[1.1875rem] font-bold tracking-[-0.024em]">
                      {s.stage}
                    </h3>
                    <p className="mt-2 text-[1rem] leading-relaxed text-ink-2">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-deep text-ground section-y-tight">
        <div className="frame flex flex-wrap items-center justify-between gap-6">
          <p className="statement max-w-2xl">
            {c.closingStatement}
          </p>
          <Link href="/contact" className="btn btn-on-dark press">
            Hubungi Tim Riset <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
