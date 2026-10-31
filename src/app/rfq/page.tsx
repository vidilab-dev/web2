import type { Metadata } from "next";
import { FileText, ClipboardList, Timer } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { RfqForm } from "@/components/forms/rfq-form";
import { Reveal } from "@/components/motion/reveal";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Permintaan Penawaran",
  description:
    "Ajukan permintaan penawaran produk pupuk organik dan hayati dari PT Bio Industri Nusantara untuk kebutuhan perkebunan, lahan pertanian, atau distribusi.",
  path: "/rfq",
});

const steps = [
  {
    icon: ClipboardList,
    title: "Isi formulir",
    description:
      "Sampaikan jenis lahan, produk yang diminati, dan perkiraan kebutuhan Anda.",
  },
  {
    icon: FileText,
    title: "Kami susun penawaran",
    description:
      "Tim kami menyiapkan penawaran beserta datasheet resmi produk yang relevan.",
  },
  {
    icon: Timer,
    title: "Tindak lanjut",
    description:
      "Kami menghubungi Anda melalui email atau telepon dalam 1–2 hari kerja.",
  },
];

export default function RfqPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Permintaan
            <br />
            Penawaran
          </>
        }
        lede="Butuh penawaran harga atau datasheet teknis produk? Isi formulir berikut dan tim kami akan menyiapkan tanggapan yang sesuai dengan kebutuhan lahan Anda."
        crumbs={[{ label: "Permintaan Penawaran" }]}
        variant="photo"
        photo={{
          src: "/images/compost-pile.jpg",
          alt: "Tumpukan kompos organik yang sedang dimatangkan",
        }}
      />

      {/* The three steps, asymmetric so it does not read as a card row. */}
      <section className="bg-ground section-y-tight" aria-labelledby="rfq-steps">
        <div className="frame">
          <h2 id="rfq-steps" className="sr-only">
            Alur permintaan penawaran
          </h2>
          <ol className="grid gap-x-10 gap-y-10 md:grid-cols-12">
            {steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 70}
                className={i === 0 ? "md:col-span-5" : i === 1 ? "md:col-span-4 md:mt-10" : "md:col-span-3 md:mt-20"}
              >
                <s.icon aria-hidden className="size-7 text-accent" />
                <h3 className="mt-4 font-display text-[1.25rem] font-bold tracking-[-0.026em]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  {s.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ground-2 section-y" aria-labelledby="rfq-form-heading">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 id="rfq-form-heading" className="text-h3">
                Formulir Penawaran
              </h2>
              <p className="lede mt-5 max-w-sm text-ink-2">
                Semakin rinci informasi yang Anda berikan, semakin akurat penawaran
                yang dapat kami siapkan.
              </p>
              <p className="meta mt-6 max-w-sm">
                Data Anda hanya digunakan untuk keperluan penawaran dan tidak
                dibagikan kepada pihak ketiga.
              </p>
            </div>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={80}>
              <RfqForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
