import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { sustainabilityPillars } from "@/content/home";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Keberlanjutan",
  description:
    "Komitmen keberlanjutan PT Bio Industri Nusantara: pertanian berkelanjutan, pemanfaatan bahan organik, efisiensi sumber daya, dan pengembangan ekosistem bio-agribisnis.",
  path: "/sustainability",
  image: "/images/rice-terraces.jpg",
  imageAlt: "Terras sawah di Bali",
});

const commitments = [
  {
    title: "Pengurangan limbah organik",
    body: "Lini produk kami diarahkan untuk mengolah bahan organik menjadi produk yang bermanfaat bagi lahan, bukan menjadi beban lingkungan.",
  },
  {
    title: "Penggunaan sumber daya secara efisien",
    body: "Pendekatan terpadu membantu penggunaan input menjadi lebih terarah sehingga sumber daya lahan dimanfaatkan lebih efisien.",
  },
  {
    title: "Pengembangan kapasitas petani",
    body: "Kami berbagi pengetahuan teknis kepada petani dan kelompok tani agar program pemeliharaan lahan dapat dijalankan secara mandiri.",
  },
  {
    title: "Rantai nilai agribisnis yang berkelanjutan",
    body: "Kami membangun jejaring mitra yang menghubungkan produksi, riset, dan pemasaran dalam satu rantai nilai yang saling mendukung.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Keberlanjutan
            <br />yang Dikerjakan
          </>
        }
        lede="Bagi kami, keberlanjutan bukan pernyataan. Ia adalah keputusan teknis yang diambil di setiap tahap program."
        crumbs={[{ label: "Keberlanjutan" }]}
        variant="photo"
        photo={{
          src: "/images/rice-terraces.jpg",
          alt: "Terras sawah di Tabanan, Bali, membentang mengikuti kontur lahan",
        }}
      />

      {/* The five pillars as full-width bands with alternating tone. */}
      <ul>
        {sustainabilityPillars.map((p, i) => {
          const dark = i % 2 === 1;
          return (
            <li key={p.title} className={dark ? "bg-deep text-ground" : "bg-ground"}>
              <div className="frame section-y-tight">
                <div className="grid gap-y-5 md:grid-cols-12 md:gap-x-10">
                  <Reveal
                    className={
                      i % 2 === 0 ? "md:col-span-5" : "md:col-span-5 md:col-start-8 md:row-start-1"
                    }
                  >
                    <h2 className="text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.04]">
                      {p.title}
                    </h2>
                  </Reveal>
                  <Reveal
                    delay={80}
                    className={
                      i % 2 === 0 ? "md:col-span-6 md:col-start-7" : "md:col-span-6 md:col-start-1 md:row-start-1"
                    }
                  >
                    <p
                      className={`text-[1.0625rem] leading-relaxed md:text-[1.1875rem] ${
                        dark ? "text-ground/75" : "text-ink-2"
                      }`}
                    >
                      {p.description}
                    </p>
                  </Reveal>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Commitments: concrete actions, not slogans. */}
      <section className="bg-ground-2 section-y" aria-labelledby="commitments-heading">
        <div className="frame grid gap-y-12 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-5">
            <h2 id="commitments-heading" className="text-h3">
              Komitmen Konkret
            </h2>
            <p className="lede mt-6 max-w-md text-ink-2">
              Empat area di mana keberlanjutan diterjemahkan menjadi tindakan
              yang dapat dipantau.
            </p>
            <Reveal delay={120} className="mt-8">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden bg-ground-3">
                  <Image
                    src="/images/compost-sieved.jpg"
                    alt="Kompos yang telah diayak dan siap diaplikasikan"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    quality={76}
                    className="photo"
                  />
                </div>
                <figcaption className="meta mt-3">
                  Bahan organik diolah menjadi produk yang kembali ke tanah.
                </figcaption>
              </figure>
            </Reveal>
          </Reveal>

          <ul className="space-y-5 md:col-span-6 md:col-start-7">
            {commitments.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 60} className="bg-ground p-7">
                <h3 className="font-display text-[1.1875rem] font-bold tracking-[-0.024em]">
                  {c.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-ink-2">{c.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ground-3 section-y-tight">
        <div className="frame flex flex-wrap items-center justify-between gap-6">
          <p className="statement max-w-2xl">
            Keberlanjutan adalah program jangka panjang yang kami jalankan bersama
            mitra.
          </p>
          <Link href="/partnership" className="btn btn-primary press">
            Jadi Mitra <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
