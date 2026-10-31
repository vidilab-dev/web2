import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sustainabilityPillars } from "@/content/home";
import { Reveal } from "@/components/motion/reveal";

export function Sustainability() {
  const [first, ...rest] = sustainabilityPillars;

  return (
    <section aria-labelledby="sustainability-heading" className="bg-ground section-y">
      {/* A field of photography, full width, the one placed rest on this page. */}
      <Reveal>
        <figure className="relative aspect-[21/9] max-h-[32rem] w-full overflow-hidden bg-ground-3">
          <Image
            src="/images/rice-terraces.jpg"
            alt="Terras sawah di Tabanan, Bali, membentang mengikuti kontur lahan"
            fill
            sizes="100vw"
            quality={78}
            className="photo"
          />
        </figure>
      </Reveal>

      <div className="frame mt-14 md:mt-20">
        <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-6">
            <h2 id="sustainability-heading">
              Keberlanjutan
              <br />
              yang Dikerjakan
            </h2>
          </Reveal>
          <Reveal delay={80} className="md:col-span-5 md:col-start-8 md:self-end">
            <p className="lede text-ink-2">
              Bagi kami, keberlanjutan bukan pernyataan. Ia adalah keputusan
              teknis yang diambil di setiap tahap program, dari bahan baku
              sampai cara lahan dikelola.
            </p>
          </Reveal>
        </div>

        {/* Asymmetric 3 + 2, with the lead pillar carrying more weight. */}
        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-12">
          <Reveal className="md:col-span-6 md:row-span-2">
            <div className="flex h-full flex-col justify-between bg-deep p-8 text-ground md:p-12">
              <h3 className="font-display text-[1.75rem] font-bold leading-[1.05] tracking-[-0.03em] md:text-[2.5rem]">
                {first.title}
              </h3>
              <p className="mt-8 max-w-md text-[1.0625rem] leading-relaxed text-ground/70">
                {first.description}
              </p>
            </div>
          </Reveal>

          {rest.map((p, i) => (
            <Reveal
              key={p.title}
              delay={(i % 2) * 70}
              className={i < 2 ? "md:col-span-3" : "md:col-span-4"}
            >
              <div className="h-full bg-ground-2 p-8">
                <h3 className="font-display text-[1.125rem] font-bold tracking-[-0.022em]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  {p.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} className="mt-12">
          <Link href="/sustainability" className="btn btn-secondary press">
            Selengkapnya tentang Keberlanjutan <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
