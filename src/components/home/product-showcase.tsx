import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import Image from "next/image";
import { productCategories, type Product } from "@/content/products";
import type { ProductWithSpec } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { WatermarkMark } from "@/components/layout/logo";
import type { HomeContent } from "@/lib/page-specs";

const plateTone: Record<Product["plate"], { plate: string; name: string; meta: string; mark: string }> = {
  deep: { plate: "bg-deep text-ground", name: "text-ground", meta: "text-fresh", mark: "text-ground/15" },
  "ground-2": { plate: "bg-ground-2 text-ink", name: "text-ink", meta: "text-accent", mark: "text-deep/10" },
  "ground": { plate: "bg-ground-3 text-ink", name: "text-ink", meta: "text-accent-2", mark: "text-deep/10" },
  earth: { plate: "bg-earth text-white", name: "text-white", meta: "text-white", mark: "text-ground/15" },
};

export function ProductShowcase({ c, products }: { c: HomeContent; products: ProductWithSpec[] }) {
  return (
    <section aria-labelledby="products-heading" className="bg-ground section-y">
      <div className="frame">
        <Reveal className="grid gap-y-6 md:grid-cols-12 md:gap-x-10">
          <h2 id="products-heading" className="md:col-span-6">
            {c.productsHeading}
          </h2>
          <div className="md:col-span-6 md:self-end">
            <p className="lede max-w-md text-ink-2">{c.productsLede}</p>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 auto-rows-fr gap-4 sm:grid-cols-2 md:mt-20 md:gap-6 xl:grid-cols-3">
          {products.map((product, i) => {
            const tone = plateTone[product.plate];
            const category = productCategories.find((c) => c.slug === product.category);

            return (
              <Reveal
                as="li"
                key={product.slug}
                delay={(i % 3) * 70}
                className="h-full"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className={cn(
                    "group relative flex h-full flex-col justify-between overflow-hidden rounded-[2px] p-6 transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 lg:p-8",
                    "min-h-[24rem] md:min-h-[27rem]",
                    tone.plate
                  )}
                >
                  {/* The cycle mark, enlarged to a watermark, the motif carries through.
                      Anchored bottom-right so it never rides over the product name. */}
                  <WatermarkMark
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -bottom-12 -right-2 size-40 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 md:size-56",
                      tone.mark
                    )}
                  />

                  <div className="relative">
                    <h3
                      className={cn(
                        "font-display font-extrabold leading-[0.94] tracking-[-0.038em] decoration-2 underline-offset-8 transition-[text-decoration-color] duration-300 group-hover:underline",
                        tone.name,
                        product.name.length > 8
                          ? "text-[1.5rem] xl:text-[2rem]"
                          : "text-[1.75rem] xl:text-[2.5rem]"
                      )}
                    >
                      {product.name}
                      <ArrowUpRight
                        aria-hidden
                        className="ml-2 inline size-[0.55em] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </h3>
                  </div>

                  {product.imageUrl && (
                    <div className="relative my-4 h-32 w-full shrink-0 md:h-40">
                      <Image
                        src={product.imageUrl}
                        alt={`Kemasan produk ${product.name}`}
                        fill
                        sizes="(max-width: 640px) 85vw, (max-width: 1280px) 45vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                  )}

                  <div className={cn("relative", product.imageUrl ? "mt-2" : "mt-8")}>
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
              <p className="statement">{c.productsStatement}</p>
            </div>
            <div className="space-y-4 text-[1.0625rem] leading-relaxed text-ink-2 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
              {c.productsBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="flex items-start gap-2.5">
                <Info aria-hidden className="mt-1 size-4 shrink-0 text-accent" />
                <span>{c.productsNote}</span>
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
