import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProductWithSpec } from "@/lib/products";
import { ProductSpecForm } from "@/components/admin/product-spec-form";

export const metadata = {
  title: "Edit Datasheet Produk | Admin PT BIN",
  robots: { index: false, follow: false },
};

export default async function AdminProductEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { slug } = await params;
  const { saved } = await searchParams;
  const product = await getProductWithSpec(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-accent hover:underline"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Semua produk
        </Link>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-none tracking-[-0.03em]">
          {product.name}
        </h1>
        <p className="mt-3 text-[1rem] text-ink-2">
          Isi datasheet dari dokumen resmi produk. Kolom yang dikosongkan tampil
          sebagai “Menunggu datasheet” di situs.
        </p>
      </header>

      <ProductSpecForm product={product} saved={saved === "1"} />
    </div>
  );
}
