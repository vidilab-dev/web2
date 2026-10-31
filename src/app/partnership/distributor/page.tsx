import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Store, Truck, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { DistributorForm } from "@/components/forms/distributor-form";
import { Reveal } from "@/components/motion/reveal";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Registrasi Distributor",
  description:
    "Daftar sebagai distributor atau reseller produk pupuk organik dan hayati PT Bio Industri Nusantara untuk wilayah Anda.",
  path: "/partnership/distributor",
});

const benefits = [
  {
    icon: Store,
    title: "Akses lini produk lengkap",
    description:
      "Distributor resmi mendapat akses ke seluruh lini produk organik dan hayati.",
  },
  {
    icon: Truck,
    title: "Dukungan distribusi",
    description:
      "Koordinasi pengiriman dan ketersediaan stok untuk wilayah jangkauan Anda.",
  },
  {
    icon: Users,
    title: "Pendampingan teknis",
    description:
      "Materi teknis produk dan pendampingan untuk menjawab pertanyaan pelanggan.",
  },
];

export default function DistributorPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Registrasi
            <br />
            Distributor
          </>
        }
        lede="Bergabunglah sebagai distributor resmi produk PT Bio Industri Nusantara dan kembangkan jaringan Anda di sektor agribisnis."
        crumbs={[
          { label: "Kemitraan", href: "/partnership" },
          { label: "Registrasi Distributor" },
        ]}
        variant="photo"
        photo={{
          src: "/images/palm-harvest.jpg",
          alt: "Panen tandan buah segar di perkebunan kelapa sawit",
        }}
      />

      {/* Benefits as an editorial list, not a card grid. */}
      <section className="bg-ground section-y-tight" aria-labelledby="benefits-heading">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-4">
            <h2 id="benefits-heading" className="text-h3">
              Keuntungan Menjadi Distributor
            </h2>
            <Reveal delay={90} className="mt-8">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden bg-ground-3">
                  <Image
                    src="/images/seedling-facility.jpg"
                    alt="Bibit tanaman muda dalam fasilitas persemaian"
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    quality={76}
                    className="photo"
                  />
                </div>
                <figcaption className="meta mt-3">
                  Produk yang Anda distribusikan berawal dari fasilitas seperti ini.
                </figcaption>
              </figure>
            </Reveal>
          </Reveal>
          <ul className="md:col-span-7 md:col-start-6">
            {benefits.map((b, i) => (
              <Reveal
                as="li"
                key={b.title}
                delay={i * 60}
                className="flex items-start gap-5 py-6 first:pt-0"
              >
                <b.icon aria-hidden className="mt-1 size-6 shrink-0 text-accent" />
                <div>
                  <h3 className="font-display text-[1.125rem] font-bold tracking-[-0.022em]">
                    {b.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ink-2">
                    {b.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ground-2 section-y" aria-labelledby="distributor-form-heading">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 id="distributor-form-heading" className="text-h3">
                Formulir Registrasi
              </h2>
              <p className="lede mt-5 max-w-sm text-ink-2">
                Isi data usaha Anda. Tim kami akan meninjau dan menghubungi Anda
                untuk langkah selanjutnya.
              </p>
              <p className="meta mt-6 max-w-sm">
                Data Anda hanya digunakan untuk proses kemitraan ini.
              </p>
            </div>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={80}>
              <DistributorForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ground-3 section-y-tight">
        <div className="frame flex flex-wrap items-center justify-between gap-6">
          <p className="statement max-w-2xl">
            Ingin mendiskusikan produk terlebih dahulu sebelum mendaftar?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-secondary press">
              Lihat Katalog Produk <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/contact" className="btn btn-primary press">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
