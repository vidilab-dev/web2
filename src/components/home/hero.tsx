import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-deep-3"
    >
      {/* Cinematic photography, the subject's own world, shown large. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/plantation-aerial.jpg"
          alt="Pandangan udara atas areal perkebunan kelapa sawit yang membentang hingga batas cakrawala"
          fill
          priority
          sizes="100vw"
          quality={82}
          className="hero-drift photo"
        />
        {/* Neutral scrim for legibility, the one permitted overlay on a photograph.
            Stops are near-neutral (channel spread <= 14) and fade to transparent,
            so it reads as a scrim rather than a decorative gradient. */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "var(--scrim-neutral)" }}
          aria-hidden
        />
      </div>

      <div className="frame pb-14 pt-28 md:pb-20 md:pt-40">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-4xl">
            <h1 id="hero-heading" className="text-ground">
              <Reveal as="span" delay={60} className="block">
                Healthier Soil,
              </Reveal>
              <Reveal as="span" delay={150} className="block">
                Stronger Harvests
              </Reveal>
            </h1>

            <Reveal delay={280} className="mt-7 max-w-xl md:mt-9">
              <p className="lede text-ground/85">
                Pupuk organik dan pupuk hayati dari PT Bio Industri Nusantara
                untuk pertanian dan perkebunan yang produktif, berkelanjutan,
                dan bernilai tambah.
              </p>
            </Reveal>

            <Reveal delay={370} className="mt-9 flex flex-wrap gap-3 md:mt-11">
              <Link href="/products" className="btn btn-on-dark press">
                Jelajahi Produk <ArrowRight aria-hidden className="size-4" />
              </Link>
              <Link href="/about" className="btn btn-ghost-dark press">
                Tentang Kami
              </Link>
            </Reveal>
          </div>

          {/* Identity statement, anchored to the opposite corner, sharing the margin. */}
          <Reveal delay={460} className="shrink-0 lg:max-w-[17rem] lg:text-right">
            <p className="font-display text-[1.0625rem] font-bold leading-tight tracking-[-0.02em] text-ground md:text-[1.25rem]">
              Integrated Bio-Agribusiness Solution
            </p>
            <p className="mt-2.5 text-[0.9375rem] leading-snug text-ground/60">
              Dari asesmen lahan hingga evaluasi kinerja, dalam satu program.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
