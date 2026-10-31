import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { values } from "@/content/about";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Nilai Perusahaan",
  description:
    "Nilai-nilai yang memandu keputusan teknis dan operasional PT Bio Industri Nusantara dalam mengembangkan produk dan solusi pertanian hayati.",
  path: "/about/values",
});

const tones = ["bg-ground", "bg-ground-2", "bg-ground", "bg-ground-2", "bg-ground"];

export default function ValuesPage() {
  const [lead, ...rest] = values;

  return (
    <>
      <PageHeader
        title={
          <>
            Nilai
            <br />
            Perusahaan
          </>
        }
        lede="Nilai hanya berguna ketika menentukan apa yang kami kerjakan, apa yang kami uji, dan apa yang kami tunda sampai terbukti."
        crumbs={[{ label: "Tentang Kami", href: "/about" }, { label: "Nilai Perusahaan" }]}
        variant="photo"
        photo={{
          src: "/images/farmer-harvest.jpg",
          alt: "Petani memanen padi di lahan persawahan Indonesia",
        }}
      />

      {/* Lead value, given a full change of field. */}
      <section className="bg-deep text-ground section-y" aria-labelledby="value-lead">
        <div className="frame grid gap-y-8 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-5">
            <h2 id="value-lead" className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.96]">
              {lead.title}
            </h2>
          </Reveal>
          <Reveal delay={80} className="md:col-span-6 md:col-start-7 md:self-center">
            <p className="statement text-ground/85">{lead.description}</p>
          </Reveal>
        </div>
      </section>

      {/* Remaining values as full-width bands with alternating tone. */}
      <ul>
        {rest.map((v, i) => (
          <li key={v.title} className={tones[(i + 1) % tones.length]}>
            <div className="frame section-y-tight">
              <div className="grid gap-y-5 md:grid-cols-12 md:gap-x-10">
                <Reveal
                  className={
                    i % 2 === 0 ? "md:col-span-5 md:col-start-1" : "md:col-span-5 md:col-start-8 md:row-start-1"
                  }
                >
                  <h3 className="text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.02]">
                    {v.title}
                  </h3>
                </Reveal>
                <Reveal
                  delay={80}
                  className={
                    i % 2 === 0 ? "md:col-span-6 md:col-start-7" : "md:col-span-6 md:col-start-1 md:row-start-1"
                  }
                >
                  <p className="text-[1.0625rem] leading-relaxed text-ink-2 md:text-[1.1875rem]">
                    {v.description}
                  </p>
                </Reveal>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <section className="bg-ground-3 section-y-tight">
        <div className="frame flex flex-wrap items-center justify-between gap-6">
          <p className="statement max-w-2xl">
            Nilai ini dijalankan oleh fungsi-fungsi di seluruh perusahaan.
          </p>
          <Link href="/about/organization" className="btn btn-primary press">
            Struktur Organisasi <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
