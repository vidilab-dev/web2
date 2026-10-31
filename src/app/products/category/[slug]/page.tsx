import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ProductPlate } from "@/components/products/plate";
import { Reveal } from "@/components/motion/reveal";
import {
  getProductsByCategory,
  productCategories,
  type ProductCategorySlug,
} from "@/content/products";
import { buildPageMetadata } from "@/app/layout";

const slugs = productCategories.map((c) => c.slug);

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = productCategories.find((c) => c.slug === slug);
  if (!category) return {};
  return buildPageMetadata({
    title: category.label,
    description: category.description,
    path: `/products/category/${category.slug}`,
  });
}

const offsets = ["", "lg:mt-16", "", "lg:mt-12", "", "lg:mt-20", "", "lg:mt-10", ""];

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = productCategories.find((c) => c.slug === slug);
  if (!category) notFound();

  const items = getProductsByCategory(slug as ProductCategorySlug);

  return (
    <>
      <PageHeader
        title={category.label}
        lede={category.description}
        crumbs={[
          { label: "Produk", href: "/products" },
          { label: "Kategori" },
          { label: category.label },
        ]}
        variant="photo"
        photo={category.photo}
      />

      <section className="bg-ground section-y">
        <div className="frame">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="statement">Belum ada produk pada kategori ini.</p>
              <Link href="/products" className="btn btn-secondary press mt-8">
                Lihat Seluruh Katalog <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.slug}
                  delay={(i % 3) * 70}
                  className={offsets[i % offsets.length]}
                >
                  <ProductPlate product={p} className="min-h-[19rem] h-full" />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="bg-ground-3 section-y-tight">
        <div className="frame flex flex-wrap items-center justify-between gap-6">
          <p className="statement max-w-2xl">
            Butuh rekomendasi yang sesuai dengan kondisi lahan Anda?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/rfq" className="btn btn-primary press">
              <FileText aria-hidden className="size-4" />
              Minta Penawaran
            </Link>
            <Link href="/solutions" className="btn btn-secondary press">
              Lihat Solusi <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
