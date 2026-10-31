import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { researchActivities, researchImages } from "@/content/home";
import { Reveal } from "@/components/motion/reveal";

export function Research() {
  return (
    <section aria-labelledby="research-heading" className="bg-ground-2 section-y">
      <div className="frame grid gap-y-12 md:grid-cols-12 md:gap-x-10">
        {/* Two photographs, one dominant, never six small ones. */}
        <div className="md:col-span-5">
          <Reveal>
            <figure className="relative aspect-[4/5] overflow-hidden bg-ground-3">
              <Image
                src={researchImages[0].src}
                alt={researchImages[0].alt}
                fill
                priority={false}
                sizes="(max-width: 768px) 100vw, 40vw"
                quality={78}
                className="photo"
              />
            </figure>
          </Reveal>
          <Reveal delay={100}>
            <figure className="relative mt-5 aspect-[4/3] overflow-hidden bg-ground-3">
              <Image
                src={researchImages[1].src}
                alt={researchImages[1].alt}
                fill
                sizes="(max-width: 768px) 100vw, 32vw"
                quality={78}
                className="photo"
              />
            </figure>
            <figcaption className="meta mt-3 max-w-sm">
              Kultur mikroorganisme ditelaah sebelum tahap pengembangan produk.
            </figcaption>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <h2 id="research-heading">Riset &amp; Inovasi</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="statement mt-8 max-w-xl">
              Setiap produk dimulai dari pertanyaan yang diuji, bukan dari
              asumsi yang diulang.
            </p>
          </Reveal>
          <Reveal delay={140} className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-2">
            <p>
              Riset menjadi dasar pengembangan produk kami, mulai dari isolasi dan
              karakterisasi mikroorganisme, pengujian laboratorium, sampai uji
              lapangan pada plot demonstrasi.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {researchActivities.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 60}>
                <h3 className="font-display text-[1.0625rem] font-bold tracking-[-0.018em]">
                  {a.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
                  {a.description}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120} className="mt-12">
            <Link href="/research" className="btn btn-secondary press">
              Jelajahi Riset <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
