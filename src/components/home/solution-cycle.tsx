"use client";

import { useCallback, useId, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { outcomeDimensions, solutionStages } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * The page's live thing: the five-stage integrated cycle.
 *
 * A real <ol> of ordered stages drives one shared panel. Every stage
 * description and every panel is present in the DOM at all times; scripting
 * only chooses which one is exposed. With scripting off, all five read as a
 * plain stacked list beside a single photograph, still complete, still correct.
 */
export function SolutionCycle() {
  const [active, setActive] = useState(0);
  const uid = useId();

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const last = solutionStages.length - 1;
      let next: number | null = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (index + 1) % solutionStages.length;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft")
        next = (index - 1 + solutionStages.length) % solutionStages.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = last;
      if (next === null) return;
      e.preventDefault();
      setActive(next);
      document.getElementById(`${uid}-tab-${next}`)?.focus();
    },
    [uid]
  );

  return (
    <section aria-labelledby="solution-heading" className="bg-deep text-ground section-y">
      <div className="frame">
        <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-10">
          <h2
            id="solution-heading"
            className="max-w-[16ch] text-[clamp(1.6rem,6.6vw,3.35rem)] md:max-w-none md:col-span-12 lg:col-span-8"
          >
            <span className="whitespace-nowrap">Integrated Bio-Agribusiness</span>
            <br />
            Solution
          </h2>
          <div className="md:col-span-12 lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="lede max-w-lg text-ground/70">
              Kami tidak memulai dari produk. Kami memulai dari lahan, lalu
              menyusun lima tahap yang saling menopang sampai hasil dievaluasi
              dan siklus berikutnya disiapkan.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-y-12 md:mt-20 md:grid-cols-12 md:gap-x-10">
          {/* Ordered stage list, order genuinely matters, so it is a real <ol>. */}
          <ol
            role="tablist"
            aria-label="Tahapan program bio-agribisnis terintegrasi"
            aria-orientation="vertical"
            className="md:col-span-5"
          >
            {solutionStages.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id}>
                  <button
                    id={`${uid}-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${uid}-panel-${i}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={cn(
                      "flex w-full items-start gap-5 py-5 text-left transition-colors duration-300",
                      isActive ? "text-ground" : "text-ground/50 hover:text-ground/80"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full font-display text-[0.9375rem] font-bold tabular-nums transition-colors duration-300",
                        isActive ? "bg-fresh text-deep-3" : "bg-ground/10 text-ground/55"
                      )}
                    >
                      {s.index}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[1.125rem] font-bold leading-tight tracking-[-0.024em] md:text-[1.375rem]">
                        {s.title}
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] leading-snug text-ground/60">
                        {s.description}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Shared panel, all five photographs and descriptions live in the DOM. */}
          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-deep-3 md:aspect-[3/2]">
              {solutionStages.map((s, i) => (
                <div
                  key={s.id}
                  role="tabpanel"
                  id={`${uid}-panel-${i}`}
                  aria-labelledby={`${uid}-tab-${i}`}
                  hidden={i !== active}
                  className="stage-fade absolute inset-0"
                >
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    quality={78}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="photo"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8">
              {solutionStages.map((s, i) => (
                <div key={s.id} hidden={i !== active}>
                  <p className="font-display text-[0.9375rem] font-bold text-fresh">
                    Tahap {s.index}: {s.title}
                  </p>
                  <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-ground/75">
                    {s.detail}
                  </p>
                </div>
              ))}
            </div>

            <a href="/solutions/integrated" className="btn btn-on-dark press mt-9">
              Pelajari Solusi Terintegrasi <ArrowRight aria-hidden className="size-4" />
            </a>
          </div>
        </div>

        {/* Outcome dimensions, named areas of focus, never invented figures. */}
        <div className="mt-20 md:mt-28">
          <h3 className="font-display text-[1.375rem] font-bold tracking-[-0.024em] text-fresh md:text-[1.75rem]">
            Dimensi hasil yang kami tuju
          </h3>
          <dl className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {outcomeDimensions.map((o) => (
              <div key={o.title} className="bg-deep-2 p-7">
                <dt className="font-display text-[1.125rem] font-bold tracking-[-0.022em]">
                  {o.title}
                </dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ground/60">
                  {o.description}
                </dd>
              </div>
            ))}
          </dl>
          <p className="meta mt-10 max-w-2xl text-ground/45">
            Angka dampak spesifik hanya kami publikasikan setelah tersedia data
            lapangan yang terverifikasi.
          </p>
        </div>
      </div>
    </section>
  );
}
