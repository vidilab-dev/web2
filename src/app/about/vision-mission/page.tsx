import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { getPageContent } from "@/lib/pages";
import { visionMissionSpec } from "@/lib/page-specs";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Visi & Misi",
  description:
    "Visi dan misi PT Bio Industri Nusantara sebagai perusahaan bio-agribisnis yang berkomitmen pada pertanian berkelanjutan berbasis teknologi mikroorganisme.",
  path: "/about/vision-mission",
});

export default async function VisionMissionPage() {
  const c = await getPageContent(visionMissionSpec);

  return (
    <>
      <PageHeader
        title={c.headerTitle}
        lede={c.headerLede}
        crumbs={[
          { label: "Tentang Kami", href: "/about" },
          { label: "Visi & Misi" },
        ]}
        variant="photo"
        photo={c.headerPhoto}
      />

      {/* Vision — one large statement, given the whole width to itself. */}
      <section className="bg-ground section-y" aria-labelledby="vision-heading">
        <div className="frame grid gap-y-8 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-3">
            <h2 id="vision-heading" className="text-h3 text-accent">
              {c.visionHeading}
            </h2>
          </Reveal>
          <div className="md:col-span-9">
            <Reveal delay={70}>
              <p className="statement text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.06]">
                {c.visionStatement}
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="meta mt-6 max-w-lg">{c.visionNote}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission — a real ordered list, numbered because order and count matter. */}
      <section className="bg-ground-2 section-y" aria-labelledby="mission-heading">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 id="mission-heading" className="text-h3 text-accent">
                {c.missionHeading}
              </h2>
              <p className="lede mt-6 max-w-sm text-ink-2">
                {c.missionLede}
              </p>
            </div>
          </Reveal>

          <ol className="md:col-span-8">
            {c.mission.map((m, i) => (
              <Reveal
                as="li"
                key={i}
                delay={i * 70}
                className="flex gap-6 py-7 first:pt-0 md:gap-9 md:py-9"
              >
                <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-deep font-display text-[0.9375rem] font-bold tabular-nums text-ground">
                  {i + 1}
                </span>
                <p className="max-w-2xl text-[1.0625rem] leading-relaxed md:text-[1.1875rem]">
                  {m}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-deep text-ground section-y-tight">
        <div className="frame flex flex-wrap items-center justify-between gap-6">
          <p className="statement max-w-2xl">
            {c.closingStatement}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/about/values" className="btn btn-on-dark press">
              Nilai Perusahaan <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/about/organization" className="btn btn-ghost-dark press">
              Struktur Organisasi
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
