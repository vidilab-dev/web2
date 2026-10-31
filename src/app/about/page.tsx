import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { companyProfile, timeline, vision, values } from "@/content/about";
import { buildPageMetadata } from "@/app/layout";
import Image from "next/image";

export const metadata: Metadata = buildPageMetadata({
  title: "Profil Perusahaan",
  description:
    "Profil PT Bio Industri Nusantara, perusahaan bio-agribisnis yang bergerak di industri pupuk organik, produksi pupuk hayati, dan solusi pertanian berbasis mikroorganisme.",
  path: "/about",
  image: "/images/plantation-stages.jpg",
  imageAlt: "Areal perkebunan kelapa sawit dengan berbagai fase pertumbuhan",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Profil
            <br />
            Perusahaan
          </>
        }
        lede="PT Bio Industri Nusantara membangun industri pupuk organik dan hayati di atas satu keyakinan: tanah yang sehat adalah fondasi produktivitas."
        crumbs={[{ label: "Tentang Kami", href: "/about" }, { label: "Profil Perusahaan" }]}
        variant="photo"
        photo={{
          src: "/images/plantation-stages.jpg",
          alt: "Areal perkebunan kelapa sawit dengan berbagai fase pertumbuhan",
        }}
      />

      {/* Editorial split: statement left, narrative right. */}
      <section className="bg-ground section-y">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-5">
            <p className="statement">{companyProfile.intro}</p>
          </Reveal>

          <div className="space-y-6 text-[1.0625rem] leading-relaxed text-ink-2 md:col-span-6 md:col-start-7">
            {companyProfile.body.map((p, i) => (
              <Reveal key={i} delay={i * 70}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vision band — a change of field. */}
      <section className="bg-deep text-ground section-y" aria-labelledby="vision-preview">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-4">
            <h2 id="vision-preview" className="text-h3 text-fresh">
              Visi
            </h2>
          </Reveal>
          <div className="md:col-span-8">
            <Reveal delay={70}>
              <p className="statement max-w-3xl text-[clamp(1.5rem,3.2vw,2.75rem)]">
                {vision.statement}
              </p>
            </Reveal>
            <Reveal delay={140} className="mt-10 flex flex-wrap gap-3">
              <Link href="/about/vision-mission" className="btn btn-on-dark press">
                Visi &amp; Misi <ArrowRight aria-hidden className="size-4" />
              </Link>
              <Link href="/about/values" className="btn btn-ghost-dark press">
                Nilai Perusahaan
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Development — three unequal beats, not a card row. */}
      <section className="bg-ground-2 section-y" aria-labelledby="development-heading">
        <div className="frame">
          <Reveal>
            <h2 id="development-heading">Arah Pengembangan</h2>
          </Reveal>
          <ol className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-12">
            {timeline.map((t, i) => (
              <Reveal
                as="li"
                key={t.title}
                delay={i * 80}
                className={i === 0 ? "md:col-span-5" : i === 1 ? "md:col-span-4 md:mt-14" : "md:col-span-3 md:mt-28"}
              >
                <p className="font-display text-[0.875rem] font-bold text-accent">{t.period}</p>
                <h3 className="mt-3 font-display text-[1.375rem] font-bold tracking-[-0.026em] md:text-[1.75rem]">
                  {t.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-ink-2">{t.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Values preview with a dominant photograph. */}
      <section className="bg-ground section-y" aria-labelledby="values-preview">
        <div className="frame grid gap-y-12 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-6">
            <figure className="relative aspect-[4/5] overflow-hidden bg-ground-3">
              <Image
                src="/images/farmer-planting.jpg"
                alt="Petani menanam benih padi di sawah Bali"
                fill
                sizes="(max-width: 768px) 100vw, 48vw"
                quality={78}
                className="photo"
              />
            </figure>
          </Reveal>

          <div className="md:col-span-6">
            <Reveal>
              <h2 id="values-preview">Nilai yang Memandu Keputusan</h2>
            </Reveal>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {values.slice(0, 4).map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 60}>
                  <h3 className="font-display text-[1.0625rem] font-bold tracking-[-0.018em]">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                    {v.description}
                  </p>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={120} className="mt-10 flex flex-wrap gap-3">
              <Link href="/about/values" className="btn btn-secondary press">
                Seluruh Nilai <ArrowRight aria-hidden className="size-4" />
              </Link>
              <Link href="/about/organization" className="btn btn-secondary press">
                Struktur Organisasi
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
