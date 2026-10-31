import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { capabilities } from "@/content/home";
import { Reveal } from "@/components/motion/reveal";

export function Capabilities() {
  const [lead, ...rest] = capabilities;
  const featured = rest.pop(); // the integrated solution breaks the rhythm below

  return (
    <section aria-labelledby="capabilities-heading" className="bg-ground-2 section-y">
      <div className="frame grid gap-y-12 md:grid-cols-12 md:gap-x-10">
        <Reveal className="md:col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="capabilities-heading">Yang Kami Kerjakan</h2>
            <p className="lede mt-6 max-w-sm text-ink-2">
              Lima bidang kompetensi yang saling terhubung, dari produksi
              sampai penerapan di lapangan.
            </p>
          </div>
        </Reveal>

        {/* An editorial index, not a row of identical cards. */}
        <ol className="md:col-span-12 lg:col-span-7 lg:col-start-6">
          {[lead, ...rest].map((cap, i) => (
            <Reveal
              as="li"
              key={cap.title}
              delay={i * 70}
              className="group py-8 first:pt-0 md:py-10"
            >
              <Link
                href={cap.href}
                className="block rounded-[2px] transition-colors duration-300"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="font-display text-[1.5rem] font-bold tracking-[-0.028em] transition-colors duration-300 group-hover:text-accent md:text-[1.875rem]">
                    {cap.title}
                  </h3>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 shrink-0 text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2">
                  {cap.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                  {cap.focus.map((f) => (
                    <li key={f} className="meta">
                      {f}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* The fifth capability gets its own full-width treatment, a change of field, not a fifth row. */}
      {featured && (
        <Reveal delay={80} className="mt-16 md:mt-20">
          <div className="frame">
            <Link
              href={featured.href}
              className="group grid items-stretch gap-0 overflow-hidden bg-deep text-ground md:grid-cols-12"
            >
              <div className="relative min-h-[16rem] md:col-span-4 md:min-h-[22rem]">
                <Image
                  src="/images/plantation-stages.jpg"
                  alt="Areal perkebunan kelapa sawit dengan berbagai fase pertumbuhan tanaman"
                  fill
                  sizes="(max-width: 768px) 100vw, 34vw"
                  quality={78}
                  className="photo transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:col-span-8 md:p-12 lg:p-16">
                <h3 className="font-display text-[1.75rem] font-bold leading-[1.06] tracking-[-0.03em] lg:text-[2.5rem]">
                  {featured.title}
                </h3>
                <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ground/75">
                  {featured.description}
                </p>
                <span className="btn btn-on-dark press mt-9 w-fit">
                  Lihat Pendekatannya <ArrowRight aria-hidden className="size-4" />
                </span>
              </div>
            </Link>
          </div>
        </Reveal>
      )}
    </section>
  );
}
