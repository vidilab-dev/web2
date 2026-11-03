import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { getPageContent } from "@/lib/pages";
import { sustainabilitySpec } from "@/lib/page-specs";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Keberlanjutan",
  description:
    "Komitmen keberlanjutan PT Bio Industri Nusantara: pertanian berkelanjutan, pemanfaatan bahan organik, efisiensi sumber daya, dan pengembangan ekosistem bio-agribisnis.",
  path: "/sustainability",
  image: "/images/rice-terraces.jpg",
  imageAlt: "Terras sawah di Bali",
});

export default async function SustainabilityPage() {
  const c = await getPageContent(sustainabilitySpec);

  return (
    <>
      <PageHeader
        title={c.headerTitle}
        lede={c.headerLede}
        crumbs={[{ label: "Keberlanjutan" }]}
        variant="photo"
        photo={c.headerPhoto}
      />

      {/* The five pillars as full-width bands with alternating tone. */}
      <ul>
        {c.pillars.map((p, i) => {
          const dark = i % 2 === 1;
          return (
            <li key={p.title} className={dark ? "bg-deep text-ground" : "bg-ground"}>
              <div className="frame section-y-tight">
                <div className="grid gap-y-5 md:grid-cols-12 md:gap-x-10">
                  <Reveal
                    className={
                      i % 2 === 0 ? "md:col-span-5" : "md:col-span-5 md:col-start-8 md:row-start-1"
                    }
                  >
                    <h2 className="text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.04]">
                      {p.title}
                    </h2>
                  </Reveal>
                  <Reveal
                    delay={80}
                    className={
                      i % 2 === 0 ? "md:col-span-6 md:col-start-7" : "md:col-span-6 md:col-start-1 md:row-start-1"
                    }
                  >
                    <p
                      className={`text-[1.0625rem] leading-relaxed md:text-[1.1875rem] ${
                        dark ? "text-ground/75" : "text-ink-2"
                      }`}
                    >
                      {p.description}
                    </p>
                  </Reveal>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Commitments: concrete actions, not slogans. */}
      <section className="bg-ground-2 section-y" aria-labelledby="commitments-heading">
        <div className="frame grid gap-y-12 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-5">
            <h2 id="commitments-heading" className="text-h3">
              {c.commitmentsHeading}
            </h2>
            <p className="lede mt-6 max-w-md text-ink-2">
              {c.commitmentsLede}
            </p>
            <Reveal delay={120} className="mt-8">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden bg-ground-3">
                  <Image
                    src={c.commitmentsPhoto.src}
                    alt={c.commitmentsPhoto.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    quality={76}
                    className="photo"
                  />
                </div>
                <figcaption className="meta mt-3">
                  {c.commitmentsCaption}
                </figcaption>
              </figure>
            </Reveal>
          </Reveal>

          <ul className="space-y-5 md:col-span-6 md:col-start-7">
            {c.commitments.map((k, i) => (
              <Reveal as="li" key={k.title} delay={i * 60} className="bg-ground p-7">
                <h3 className="font-display text-[1.1875rem] font-bold tracking-[-0.024em]">
                  {k.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-ink-2">{k.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ground-3 section-y-tight">
        <div className="frame flex flex-wrap items-center justify-between gap-6">
          <p className="statement max-w-2xl">
            {c.closingStatement}
          </p>
          <Link href="/partnership" className="btn btn-primary press">
            Jadi Mitra <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
