import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { innovationSteps } from "@/content/research";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Inovasi",
  description:
    "Proses inovasi PT Bio Industri Nusantara: dari pertanyaan lapangan, uji konsep, pengembangan produk, validasi, sampai skalabilisasi.",
  path: "/research/innovation",
});

export default function InnovationPage() {
  return (
    <>
      <PageHeader
        title="Inovasi"
        lede="Cara kami mengubah pertanyaan dari lapangan menjadi produk yang siap dipasarkan."
        crumbs={[
          { label: "Riset & Inovasi", href: "/research" },
          { label: "Inovasi" },
        ]}
        variant="photo"
        photo={{
          src: "/images/lab-sem.jpg",
          alt: "Sampel penelitian di bawah mikroskop elektron",
        }}
      />

      {/* The five steps as a full-width band with alternating tone. */}
      <section className="bg-ground section-y" aria-labelledby="innovation-steps">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 id="innovation-steps" className="text-h3">
                Lima Tahap Inovasi
              </h2>
              <p className="lede mt-6 max-w-sm text-ink-2">
                Sebuah proses yang dimulai dari kebutuhan nyata dan berakhir
                dengan produk yang dapat diproduksi secara konsisten.
              </p>
            </div>
          </Reveal>

          <ol className="md:col-span-8">
            {innovationSteps.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 55}
                className="grid gap-y-2 py-8 first:pt-0 md:grid-cols-12 md:gap-x-8"
              >
                <div className="md:col-span-1">
                  <span className="flex size-10 items-center justify-center rounded-full bg-accent font-display text-[1rem] font-bold tabular-nums text-ground">
                    {i + 1}
                  </span>
                </div>
                <div className="md:col-span-11">
                  <h3 className="font-display text-[1.375rem] font-bold tracking-[-0.026em]">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Honest editorial photograph: the laboratory where concepts are tested. */}
        <div className="frame mt-14">
          <Reveal>
            <figure>
              <div className="relative aspect-[21/9] overflow-hidden bg-ground-3">
                <Image
                  src="/images/lab-microscope.jpg"
                  alt="Peneliti mengamati sampel mikroorganisme di bawah mikroskop"
                  fill
                  sizes="100vw"
                  quality={78}
                  className="photo"
                />
              </div>
              <figcaption className="meta mt-3 max-w-2xl">
                Setiap konsep diuji di laboratorium sebelum menjadi produk.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="bg-ground-3 section-y-tight">
        <div className="frame flex flex-wrap items-center justify-between gap-6">
          <p className="statement max-w-2xl">
            Ingin berkolaborasi dalam pengembangan produk hayati?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/partnership" className="btn btn-primary press">
              Peluang Kolaborasi <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/research/laboratory" className="btn btn-secondary press">
              Laboratorium
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
