import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { products, productCategories, type Product } from "@/content/products";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { LogoMark } from "@/components/layout/logo";

/**
 * Editorial layout map. Spans and vertical offsets are deliberately uneven so
 * the catalogue reads as a spread rather than a uniform card grid.
 *
 * The mosaic only engages at lg and up, where each column is wide enough to
 * hold a product name at display size. Below that the catalogue is a plain
 * two-up grid, so a long name like BIOAGRODECO never overhangs its neighbour.
 */
const layout = [
  { span: "lg:col-span-5", offset: "", height: "min-h-[19rem] md:min-h-[24rem]" },
  { span: "lg:col-span-3", offset: "lg:mt-20", height: "min-h-[16rem] md:min-h-[20rem]" },
  { span: "lg:col-span-4", offset: "", height: "min-h-[17rem] md:min-h-[22rem]" },
  { span: "lg:col-span-4", offset: "lg:mt-12", height: "min-h-[18rem] md:min-h-[23rem]" },
  { span: "lg:col-span-4", offset: "", height: "min-h-[16rem] md:min-h-[21rem]" },
  { span: "lg:col-span-4", offset: "lg:mt-14", height: "min-h-[17rem] md:min-h-[22rem]" },
  { span: "lg:col-span-5", offset: "", height: "min-h-[19rem] md:min-h-[24rem]" },
  { span: "lg:col-span-3", offset: "lg:mt-20", height: "min-h-[16rem] md:min-h-[20rem]" },
  { span: "lg:col-span-4", offset: "", height: "min-h-[17rem] md:min-h-[22rem]" },
];

const plateTone: Record<Product["plate"], { plate: string; name: string; meta: string; mark: string }> = {
  deep: { plate: "bg-deep text-ground", name: "text-ground", meta: "text-fresh", mark: "text-ground/15" },
  "ground-2": { plate: "bg-ground-2 text-ink", name: "text-ink", meta: "text-accent", mark: "text-deep/10" },
  "ground": { plate: "bg-ground-3 text-ink", name: "text-ink", meta: "text-accent-2", mark: "text-deep/10" },
  earth: { plate: "bg-earth text-white", name: "text-white", meta: "text-white", mark: "text-ground/15" },
};

export function ProductShowcase() {
  return (
    <section aria-labelledby="products-heading" className="bg-ground section-y">
      <div className="frame">
        <Reveal className="grid gap-y-6 md:grid-cols-12 md:gap-x-10">
          <h2 id="products-heading" className="md:col-span-6">
            Lini Produk
          </h2>
          <div className="md:col-span-6 md:self-end">
            <p className="lede max-w-md text-ink-2">
              Sembilan produk dalam tiga lini: pupuk organik, pupuk hayati, dan
              pengendali hayati. Semuanya dirancang untuk bekerja dalam satu
              program.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20 md:gap-6 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-6">
          {products.map((product, i) => {
            const l = layout[i] ?? layout[0];
            const tone = plateTone[product.plate];
            const category = productCategories.find((c) => c.slug === product.category);

            return (
              <Reveal
                as="li"
                key={product.slug}
                delay={(i % 3) * 70}
                className={cn(l.span, l.offset)}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className={cn(
                    "group relative flex h-full flex-col justify-between overflow-hidden rounded-[2px] p-6 transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 lg:p-8",
                    l.height,
                    tone.plate
                  )}
                >
                  {/* The cycle mark, enlarged to a watermark, the motif carries through.
                      Anchored bottom-right so it never rides over the product name. */}
                  <LogoMark
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -bottom-12 -right-10 size-40 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 md:size-56",
                      tone.mark
                    )}
                  />

                  <div className="relative">
                    <h3
                      className={cn(
                        "font-display font-extrabold leading-[0.94] tracking-[-0.038em] decoration-2 underline-offset-8 transition-[text-decoration-color] duration-300 group-hover:underline",
                        tone.name,
                        product.name.length > 8
                          ? "text-[1.5rem] lg:text-[2.75rem]"
                          : "text-[1.75rem] lg:text-[3.25rem]"
                      )}
                    >
                      {product.name}
                      <ArrowUpRight
                        aria-hidden
                        className="ml-2 inline size-[0.55em] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </h3>
                  </div>

                  <div className="relative mt-8">
                    <p
                      className={cn(
                        "max-w-sm text-[0.9375rem] leading-snug",
                        product.plate === "deep" ? "text-ground/75" : product.plate === "earth" ? "text-white" : "text-ink-2"
                      )}
                    >
                      {/* The line's name folds into the sentence; it is not a label above the title. */}
                      <span className={cn("font-display font-bold", tone.meta)}>
                        {category?.label ?? "Produk"}
                      </span>
                      {" — "}
                      {product.summary}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>

        {/* Honest disclosure, specifications come from the official datasheet, never invented here. */}
        <Reveal delay={120} className="mt-14 md:mt-20">
          <div className="grid gap-8 md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-6 lg:col-span-5">
              <p className="statement">
                Spesifikasi teknis setiap produk tersedia pada datasheet resmi.
              </p>
            </div>
            <div className="space-y-4 text-[1.0625rem] leading-relaxed text-ink-2 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
              <p>
                Komposisi, dosis, cara pakai, dan ketentuan registrasi produk
                hanya kami publikasikan setelah diverifikasi dari dokumen resmi.
                Kami tidak menampilkan angka yang belum dikonfirmasi.
              </p>
              <p className="flex items-start gap-2.5">
                <Info aria-hidden className="mt-1 size-4 shrink-0 text-accent" />
                <span>
                  Minta datasheet lengkap untuk produk yang Anda butuhkan melalui
                  halaman permintaan penawaran.
                </span>
              </p>
              <Link href="/rfq" className="btn btn-primary press mt-2">
                Minta Datasheet &amp; Penawaran
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
