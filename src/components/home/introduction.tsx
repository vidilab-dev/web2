import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { HomeContent } from "@/lib/page-specs";

export function Introduction({ c }: { c: HomeContent }) {
  const headingLines = c.introHeading.split("\n");

  return (
    <section aria-labelledby="intro-heading" className="bg-ground section-y">
      <div className="frame grid gap-y-12 md:grid-cols-12 md:gap-x-10">
        {/* The headline holds the left edge of the grid. */}
        <Reveal className="md:col-span-7 lg:col-span-5">
          <h2 id="intro-heading" className="text-[clamp(2.1rem,3.7vw,4.1rem)]">
            {headingLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <Link href="/about" className="link-arrow press mt-8 hidden md:inline-flex">
            {c.introLinkLabel} <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Reveal>

        {/* The narrative answers it across the grid, never an empty half. */}
        <div className="md:col-span-12 md:mt-4 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <Reveal delay={80}>
            <p className="statement">{c.introStatement}</p>
          </Reveal>

          <Reveal delay={160} className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-ink-2 md:mt-10">
            {c.introBody.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={220} className="mt-10 md:hidden">
            <Link href="/about" className="btn btn-secondary press">
              {c.introLinkLabel} <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
        </div>

        {/* Supporting photograph, cropped hard, running to the grid edge. */}
        <Reveal delay={120} className="md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
          <figure className="relative mt-14 md:mt-16">
            <div className="relative aspect-[16/9] overflow-hidden bg-ground-3">
              <Image
                src={c.introPhoto.src}
                alt={c.introPhoto.alt}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                quality={78}
                className="photo"
              />
            </div>
            <figcaption className="meta mt-3 max-w-md">{c.introCaption}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
