import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FlaskConical, Microscope, Sprout, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { researchFields, researchPhotos } from "@/content/research";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Riset & Inovasi",
  description:
    "Kegiatan riset dan inovasi PT Bio Industri Nusantara: riset pupuk organik, riset mikroorganisme, pengujian laboratorium, dan demonstration plot.",
  path: "/research",
  image: "/images/lab-microscope.jpg",
  imageAlt: "Peneliti mengamati mikroorganisme di bawah mikroskop",
});

const subPages = [
  {
    href: "/research/laboratory",
    title: "Laboratorium",
    icon: FlaskConical,
    description: "Pengujian dan karakterisasi mikroorganisme sebagai dasar pengembangan produk.",
  },
  {
    href: "/research/demonstration-plot",
    title: "Demonstration Plot",
    icon: Sprout,
    description: "Uji lapangan terkontrol untuk mengamati respon tanaman dan tanah.",
  },
  {
    href: "/research/innovation",
    title: "Inovasi",
    icon: Lightbulb,
    description: "Cara kami mengubah temuan laboratorium menjadi produk yang siap dipasarkan.",
  },
];

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Riset
            <br />&amp; Inovasi
          </>
        }
        lede="Setiap produk dimulai dari pertanyaan yang diuji, bukan dari asumsi yang diulang."
        crumbs={[{ label: "Riset & Inovasi" }]}
        variant="photo"
        photo={researchPhotos.laboratory}
      />

      {/* Research fields as a two-column editorial index. */}
      <section className="bg-ground section-y" aria-labelledby="fields-heading">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-4">
            <h2 id="fields-heading" className="text-h3">
              Bidang Riset
            </h2>
            <p className="lede mt-6 max-w-sm text-ink-2">
              Empat bidang yang menjadi dasar pengembangan produk dan program kami.
            </p>
          </Reveal>
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 md:col-span-8">
            {researchFields.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 60}>
                <h3 className="font-display text-[1.1875rem] font-bold tracking-[-0.024em]">
                  {f.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{f.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Two photographs, one dominant, with a narrative. */}
      <section className="bg-ground-2 section-y" aria-labelledby="research-narrative">
        <div className="frame grid gap-y-12 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-6">
            <figure className="relative aspect-[4/5] overflow-hidden bg-ground-3">
              <Image
                src={researchPhotos.culture.src}
                alt={researchPhotos.culture.alt}
                fill
                sizes="(max-width: 768px) 100vw, 48vw"
                quality={78}
                className="photo"
              />
            </figure>
          </Reveal>
          <div className="md:col-span-5 md:col-start-8 md:self-center">
            <Reveal>
              <h2 id="research-narrative" className="text-h3">
                Dari Laboratorium ke Lapangan
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="statement mt-6">
                Temuan ilmiah hanya berguna ketika sampai ke lahan yang
                membutuhkannya.
              </p>
            </Reveal>
            <Reveal delay={140} className="mt-6 space-y-5 text-[1.0625rem] leading-relaxed text-ink-2">
              <p>
                Riset laboratorium menjadi fondasi, tetapi tidak berhenti di
                sana. Setiap temuan diuji ulang pada kondisi lapangan yang
                sesungguhnya melalui plot demonstrasi.
              </p>
              <p>
                Proses ini memastikan bahwa produk yang akhirnya dipasarkan
                sudah melewati kedua tahap pengujian: ketepatan ilmiah dan
                kecocokan lapangan.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sub-pages as an editorial list with icons. */}
      <section className="bg-ground section-y" aria-labelledby="research-deepdive">
        <div className="frame">
          <Reveal>
            <h2 id="research-deepdive" className="text-h3">
              Jelajahi Lebih Dalam
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {subPages.map((s, i) => (
              <Reveal as="li" key={s.href} delay={i * 70}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col bg-ground-2 p-8 transition-colors duration-300 hover:bg-deep hover:text-ground"
                >
                  <s.icon aria-hidden className="size-7 text-accent transition-colors duration-300 group-hover:text-fresh" />
                  <h3 className="mt-5 font-display text-[1.375rem] font-bold tracking-[-0.026em]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2 transition-colors duration-300 group-hover:text-ground/75">
                    {s.description}
                  </p>
                  <span className="mt-auto pt-6 inline-flex items-center gap-1.5 font-display text-[0.875rem] font-bold text-accent transition-colors duration-300 group-hover:text-fresh">
                    Selengkapnya <ArrowRight aria-hidden className="size-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ground-3 section-y-tight">
        <div className="frame flex flex-wrap items-center justify-between gap-6">
          <p className="statement max-w-2xl">
            Tertarik berkolaborasi dalam penelitian atau pengujian lapangan?
          </p>
          <Link href="/partnership" className="btn btn-primary press">
            Peluang Kolaborasi <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
