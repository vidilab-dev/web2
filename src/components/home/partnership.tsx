import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { partnershipTypes } from "@/content/home";
import { Reveal } from "@/components/motion/reveal";

export function Partnership() {
  return (
    <section
      aria-labelledby="partnership-heading"
      className="bg-ground-3 section-y overflow-x-clip"
    >
      <div className="frame grid gap-y-12 md:grid-cols-12 md:gap-x-10">
        <div className="md:col-span-5">
          <Reveal>
            <h2 id="partnership-heading" className="text-[clamp(2.6rem,6.4vw,5.5rem)]">
              Let&apos;s Grow
              <br />
              Together
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lede mt-8 max-w-md text-ink-2">
              Kami membuka empat jalur kerja sama. Pilih yang paling dekat
              dengan posisi Anda, dan kami akan menyusun langkah berikutnya
              bersama.
            </p>
          </Reveal>
          <Reveal delay={140} className="mt-10 flex flex-wrap gap-3">
            <Link href="/partnership" className="btn btn-primary press">
              Jadi Mitra <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/partnership/distributor" className="btn btn-secondary press">
              Registrasi Distributor
            </Link>
          </Reveal>

          <Reveal delay={180} className="mt-12">
            <figure className="relative aspect-[4/3] overflow-hidden bg-ground-2 md:aspect-[3/2]">
              <Image
                src="/images/farmer-harvest.jpg"
                alt="Petani memanen padi di lahan persawahan Indonesia"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={78}
                className="photo"
              />
            </figure>
          </Reveal>
        </div>

        <ul className="md:col-span-6 md:col-start-7 -mx-6 md:-mx-8">
          {partnershipTypes.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 70} className="first:pt-0">
              <Link
                href={p.href}
                className="group flex items-start justify-between gap-6 bg-transparent px-6 py-7 transition-colors duration-300 hover:bg-ground md:px-8 md:py-10"
              >
                <span className="min-w-0">
                  <h3 className="font-display text-[1.375rem] font-bold tracking-[-0.026em] transition-colors duration-300 group-hover:text-accent md:text-[1.75rem]">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-[1rem] leading-relaxed text-ink-2">
                    {p.description}
                  </p>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="mt-2 size-6 shrink-0 text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
