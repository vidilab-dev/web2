import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { organization } from "@/content/about";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Struktur Organisasi",
  description:
    "Fungsi-fungsi operasional PT Bio Industri Nusantara, mulai dari riset dan pengembangan, produksi, laboratorium, hingga layanan lapangan.",
  path: "/about/organization",
});

export default function OrganizationPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Struktur
            <br />
            Organisasi
          </>
        }
        lede="Tujuh fungsi yang menjalankan riset, produksi, mutu, dan pendampingan lapangan sebagai satu kesatuan operasional."
        crumbs={[{ label: "Tentang Kami", href: "/about" }, { label: "Struktur Organisasi" }]}
        variant="photo"
        photo={{
          src: "/images/lab-sem.jpg",
          alt: "Tim peneliti bekerja menggunakan mikroskop elektron",
        }}
      />

      <section className="bg-ground section-y">
        <div className="frame grid gap-y-12 md:grid-cols-12 md:gap-x-10">
          {/* Functions as a definition list: term and scope always paired. */}
          <dl className="md:col-span-8">
            {organization.functions.map((f, i) => (
              <Reveal
                as="div"
                key={f.function}
                delay={i * 55}
                className="grid gap-y-2 py-8 first:pt-0 md:grid-cols-12 md:gap-x-8"
              >
                <dt className="md:col-span-4">
                  <span className="font-display text-[1.1875rem] font-bold tracking-[-0.024em] md:text-[1.375rem]">
                    {f.function}
                  </span>
                </dt>
                <dd className="text-[1rem] leading-relaxed text-ink-2 md:col-span-8">{f.scope}</dd>
              </Reveal>
            ))}
          </dl>

          <aside className="md:col-span-4 md:col-start-9">
            <Reveal delay={80}>
              <div className="bg-ground-2 p-8">
                <h2 className="font-display text-[1.125rem] font-bold tracking-[-0.022em]">
                  Catatan penyusunan
                </h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
                  {organization.note}
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <figure className="mt-8">
                <div className="relative aspect-[4/3] overflow-hidden bg-ground-3">
                  <Image
                    src="/images/seed-trays.jpg"
                    alt="Baki benih dan media tanam dalam fasilitas pembibitan"
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    quality={76}
                    className="photo"
                  />
                </div>
                <figcaption className="meta mt-3">
                  Fungsi lapangan dan fungsi laboratorium bekerja pada satu program
                  yang sama.
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={180} className="mt-8">
              <Link href="/partnership" className="btn btn-secondary press">
                Bekerja Sama dengan Kami <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
