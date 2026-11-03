import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ProductPlate } from "@/components/products/plate";
import { Reveal } from "@/components/motion/reveal";
import { productCategories, products, getProductsByCategory } from "@/content/products";
import { getPageContent } from "@/lib/pages";
import { productsSpec } from "@/lib/page-specs";
import { buildPageMetadata } from "@/app/layout";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Katalog Produk Pupuk Organik & Hayati",
  description:
    "Katalog produk PT Bio Industri Nusantara: MARFU-P, PHE, KOMPOTA, KOMPOTA GLIO, BIOCOMP, BIOBUS, BIORIZ, BIOAGRODECO, dan ASTEMIC dalam lini pupuk organik, pupuk hayati, dan pengendali hayati.",
  path: "/products",
  image: "/images/compost-sieved.jpg",
  imageAlt: "Kompos yang telah diayak dan siap diaplikasikan",
});

/** Uneven spans and offsets so the catalogue reads as a spread, not a card grid. */
const layout = [
  { span: "md:col-span-6 lg:col-span-5", offset: "", height: "min-h-[20rem] lg:min-h-[26rem]" },
  { span: "md:col-span-6 lg:col-span-3", offset: "lg:mt-20", height: "min-h-[17rem] lg:min-h-[21rem]" },
  { span: "md:col-span-6 lg:col-span-4", offset: "", height: "min-h-[18rem] lg:min-h-[24rem]" },
  { span: "md:col-span-6 lg:col-span-4", offset: "lg:mt-14", height: "min-h-[19rem] lg:min-h-[25rem]" },
  { span: "md:col-span-6 lg:col-span-4", offset: "", height: "min-h-[17rem] lg:min-h-[22rem]" },
  { span: "md:col-span-6 lg:col-span-4", offset: "lg:mt-12", height: "min-h-[18rem] lg:min-h-[23rem]" },
  { span: "md:col-span-6 lg:col-span-5", offset: "", height: "min-h-[20rem] lg:min-h-[26rem]" },
  { span: "md:col-span-6 lg:col-span-3", offset: "lg:mt-20", height: "min-h-[17rem] lg:min-h-[21rem]" },
  { span: "md:col-span-6 lg:col-span-4", offset: "", height: "min-h-[18rem] lg:min-h-[24rem]" },
];

export default async function ProductsPage() {
  const c = await getPageContent(productsSpec);

  return (
    <>
      <PageHeader
        title={c.headerTitle}
        lede={c.headerLede}
        crumbs={[{ label: "Produk", href: "/products" }, { label: "Katalog" }]}
        variant="photo"
        photo={c.headerPhoto}
      />

      {/* Categories — three unequal doors, not three equal cards. */}
      <section aria-labelledby="categories-heading" className="bg-ground section-y-tight">
        <div className="frame">
          <h2 id="categories-heading" className="sr-only">
            Kategori produk
          </h2>
          <ul className="grid gap-x-8 gap-y-10 md:grid-cols-12">
            {productCategories.map((cat, i) => {
              const count = getProductsByCategory(cat.slug).length;
              return (
                <Reveal
                  as="li"
                  key={cat.slug}
                  delay={i * 70}
                  className={i === 0 ? "md:col-span-5" : i === 1 ? "md:col-span-4 md:mt-10" : "md:col-span-3 md:mt-20"}
                >
                  <Link
                    href={`/products/category/${cat.slug}`}
                    className="group flex h-full flex-col justify-between bg-ground-2 p-7 transition-colors duration-300 hover:bg-deep hover:text-ground md:p-8"
                  >
                    <div>
                      <h3 className="font-display text-[1.5rem] font-bold tracking-[-0.028em] md:text-[1.875rem]">
                        {cat.label}
                      </h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2 transition-colors duration-300 group-hover:text-ground/75">
                        {cat.description}
                      </p>
                    </div>
                    <p className="mt-7 flex items-center justify-between font-display text-[0.9375rem] font-bold text-accent transition-colors duration-300 group-hover:text-fresh">
                      {count} produk
                      <ArrowUpRight aria-hidden className="size-4" />
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* The full catalogue. */}
      <section aria-labelledby="catalogue-heading" className="bg-ground section-y">
        <div className="frame">
          <Reveal className="grid gap-y-6 md:grid-cols-12 md:gap-x-10">
            <h2 id="catalogue-heading" className="md:col-span-5">
              {c.catalogueHeading}
            </h2>
            <p className="lede self-end text-ink-2 md:col-span-5 md:col-start-8">
              {c.catalogueLede}
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-6 md:mt-20 md:grid-cols-12 md:gap-x-6">
            {products.map((p, i) => {
              const l = layout[i] ?? layout[0];
              return (
                <Reveal
                  as="li"
                  key={p.slug}
                  delay={(i % 3) * 70}
                  className={cn("md:col-span-6", l.span, l.offset)}
                >
                  <ProductPlate product={p} className={cn("h-full", l.height)} />
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Honest specification notice. */}
      <section className="bg-ground-3 section-y-tight" aria-labelledby="datasheet-heading">
        <div className="frame grid gap-y-8 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-5">
            <h2 id="datasheet-heading" className="text-h3">
              {c.datasheetHeading}
            </h2>
          </Reveal>
          <div className="space-y-5 text-[1.0625rem] leading-relaxed text-ink-2 md:col-span-6 md:col-start-7">
            {c.datasheetBody.map((p, i) => (
              <Reveal key={i} delay={i === 0 ? 70 : 130}>
                <p>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={130} className="flex flex-wrap gap-3 pt-2">
              <Link href="/rfq" className="btn btn-primary press">
                <FileText aria-hidden className="size-4" />
                Minta Datasheet &amp; Penawaran
              </Link>
              <Link href="/contact" className="btn btn-secondary press">
                Hubungi Kami <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
