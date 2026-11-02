import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText, Info } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ProductPlate } from "@/components/products/plate";
import { Reveal } from "@/components/motion/reveal";
import { getCategory, getProduct, products } from "@/content/products";
import { getProductWithSpec, specFields } from "@/lib/products";
import { site } from "@/content/site";
import { buildPageMetadata } from "@/app/layout";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return buildPageMetadata({
    title: `${product.name} — ${getCategory(product.category)?.label ?? "Produk"}`,
    description: product.summary + " " + product.description.slice(0, 120),
    path: `/products/${product.slug}`,
    image: "/images/compost-sieved.jpg",
    imageAlt: "Kompos yang telah diayak sebagai bahan perbaikan tanah",
  });
}

/** Specification rows. Empty values render an explicit pending state, never invented data. */
const specificationLabels: { key: (typeof specFields)[number]; label: string }[] = [
  { key: "composition", label: "Komposisi / kandungan" },
  { key: "dosage", label: "Dosis penggunaan" },
  { key: "application", label: "Cara aplikasi" },
  { key: "packaging", label: "Bentuk & kemasan" },
  { key: "shelfLife", label: "Masa simpan" },
  { key: "registrationNumber", label: "Nomor registrasi" },
];

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductWithSpec(slug);
  if (!product) notFound();

  const localFallback = getProduct(slug);
  if (!localFallback) notFound();

  const category = getCategory(product.category);
  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    brand: { "@type": "Brand", name: site.name },
    category: category?.label,
    manufacturer: { "@type": "Organization", name: site.name },
    url: `${site.url}/products/${product.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        title={product.name}
        lede={product.summary}
        crumbs={[
          { label: "Produk", href: "/products" },
          ...(category ? [{ label: category.label, href: `/products/category/${category.slug}` }] : []),
          { label: product.name },
        ]}
        variant="photo"
        photo={category?.photo ?? {
          src: "/images/compost-sieved.jpg",
          alt: "Kompos yang telah diayak sebagai bahan perbaikan tanah",
        }}
      />

      <section className="bg-ground section-y">
        <div className="frame grid gap-y-12 md:grid-cols-12 md:gap-x-10">
          {/* Description + intent */}
          <div className="md:col-span-7">
            <Reveal>
              <p className="statement max-w-2xl">{product.description}</p>
            </Reveal>

            <Reveal delay={90} className="mt-12">
              <h2 className="text-h3">Area yang dituju</h2>
              <p className="meta mt-3 max-w-xl">
                Dinyatakan sebagai area fokus program, bukan sebagai klaim hasil
                terukur.
              </p>
              <ul className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {product.focus.map((f) => (
                  <li key={f} className="bg-ground-2 p-6">
                    <span className="font-display text-[1.0625rem] font-bold tracking-[-0.018em]">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140} className="mt-12 flex flex-wrap gap-3">
              <Link href="/rfq" className="btn btn-primary press">
                <FileText aria-hidden className="size-4" />
                Minta Datasheet {product.name}
              </Link>
              <Link href="/contact" className="btn btn-secondary press">
                Diskusikan Kebutuhan Lahan
              </Link>
            </Reveal>

            {/* Real product photo once supplied, otherwise the honest editorial placeholder. */}
            <Reveal delay={180} className="mt-12">
              <figure>
                <div className="relative aspect-[16/9] overflow-hidden bg-ground-3">
                  <Image
                    src={product.imageUrl ?? category?.photo.src ?? "/images/compost-sieved.jpg"}
                    alt={
                      product.imageUrl
                        ? `Foto produk ${product.name}`
                        : (category?.photo.alt ?? "Kompos yang telah diayak sebagai bahan perbaikan tanah")
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    quality={76}
                    className="photo"
                  />
                </div>
                <figcaption className="meta mt-3 max-w-2xl">
                  {product.imageUrl ? (
                    <>Foto resmi produk {product.name}.</>
                  ) : (
                    <>
                      Foto suasana {category?.label.toLowerCase() ?? "produk"} di lapangan.
                      Foto produk {product.name} menyusul setelah dokumentasi resmi tersedia.
                    </>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Specification: every field present, every unverified field marked pending. */}
          <aside className="md:col-span-4 md:col-start-9">
            <Reveal delay={70}>
              <div className="bg-ground-2 p-7 md:p-8">
                <h2 className="font-display text-[1.125rem] font-bold tracking-[-0.022em]">
                  Spesifikasi Produk
                </h2>
                <dl className="mt-6 space-y-5">
                  {specificationLabels.map(({ key, label }) => {
                    const value = product[key];
                    return (
                      <div key={key} className="flex items-start justify-between gap-4">
                        <dt className="text-[0.9375rem] text-ink-2">{label}</dt>
                        <dd
                          className={`text-right font-display text-[0.875rem] font-bold ${
                            value ? "text-ink" : "text-earth-2"
                          }`}
                        >
                          {value ?? "Menunggu datasheet"}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
                <p className="mt-7 flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-ink-2">
                  <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>
                    Data di atas sengaja tidak diisi agar tidak ada informasi
                    teknis yang belum terverifikasi beredar di situs.
                  </span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={130}>
              <div className="mt-6 bg-deep p-7 text-ground md:p-8">
                <p className="font-display text-[0.9375rem] font-bold text-fresh">
                  Status data
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ground/75">
                  {product.dataStatus === "verified"
                    ? "Data produk telah diverifikasi."
                    : "Data produk sedang menunggu verifikasi dari dokumen resmi perusahaan."}
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ground-2 section-y" aria-labelledby="related-heading">
          <div className="frame">
            <Reveal>
              <h2 id="related-heading">Produk Lain pada Lini Ini</h2>
            </Reveal>
            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {related.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 70}>
                  <ProductPlate product={p} size="sm" className="min-h-[16rem] h-full" />
                </Reveal>
              ))}
            </ul>
            <Reveal delay={120} className="mt-12">
              <Link href="/products" className="btn btn-secondary press">
                Lihat Seluruh Katalog <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
