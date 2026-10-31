import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Clock } from "lucide-react";
import { products, productCategories } from "@/content/products";
import { ProductPlate } from "@/components/products/plate";

export const metadata = {
  title: "Produk | Admin PT BIN",
  robots: { index: false, follow: false },
};

export default function AdminProductsPage() {
  const byCategory = productCategories.map((c) => ({
    category: c,
    items: products.filter((p) => p.category === c.slug),
  }));

  const verified = products.filter((p) => p.dataStatus === "verified").length;
  const pending = products.length - verified;

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-none">Produk</h1>
          <p className="mt-3 text-[1rem] text-ink-2">
            Sembilan produk dalam tiga lini. Status data menandai mana yang sudah
            diverifikasi dari datasheet resmi.
          </p>
        </div>
        <Link href="/products" className="btn btn-secondary press">
          Lihat di Situs <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </header>

      {/* Verification status */}
      <ul className="grid gap-4 sm:grid-cols-2">
        <li className="flex items-center gap-4 bg-ground p-5">
          <BadgeCheck aria-hidden className="size-6 shrink-0 text-accent" />
          <div>
            <p className="font-display text-[1.5rem] font-bold leading-none tabular-nums">{verified}</p>
            <p className="mt-1 text-[0.875rem] text-ink-2">Data terverifikasi</p>
          </div>
        </li>
        <li className="flex items-center gap-4 bg-ground p-5">
          <Clock aria-hidden className="size-6 shrink-0 text-earth" />
          <div>
            <p className="font-display text-[1.5rem] font-bold leading-none tabular-nums">{pending}</p>
            <p className="mt-1 text-[0.875rem] text-ink-2">Menunggu verifikasi datasheet</p>
          </div>
        </li>
      </ul>

      {/* Edit workflow note */}
      <div className="border-l-4 border-accent bg-ground p-5 text-[0.9375rem] leading-relaxed text-ink-2">
        <p className="font-semibold text-ink">Alur pengeditan produk</p>
        <p className="mt-1">
          Draf → Tinjauan → Disetujui → Dipublikasikan. Saat ini data produk
          dibaca dari lapisan konten bertipe; hubungkan ke PostgreSQL melalui
          Prisma untuk mengaktifkan penyuntingan penuh dari panel ini.
        </p>
      </div>

      {/* Products grouped by category */}
      {byCategory.map((group) => (
        <section key={group.category.slug} aria-labelledby={`cat-${group.category.slug}`}>
          <h2
            id={`cat-${group.category.slug}`}
            className="text-[1.125rem] font-bold tracking-[-0.02em]"
          >
            {group.category.label}
            <span className="ml-3 text-[0.875rem] font-semibold text-ink-2">
              {group.items.length} produk
            </span>
          </h2>
          <ul className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {group.items.map((p) => (
              <li key={p.slug} className="flex flex-col">
                <ProductPlate product={p} size="sm" className="min-h-[15rem] flex-1" />
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-[2px] px-2.5 py-1 text-[0.75rem] font-bold ${
                      p.dataStatus === "verified" ? "bg-accent text-ground" : "bg-earth/15 text-earth"
                    }`}
                  >
                    {p.dataStatus === "verified" ? "Terverifikasi" : "Menunggu data"}
                  </span>
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-[0.8125rem] font-semibold text-accent hover:underline"
                  >
                    Lihat halaman
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
