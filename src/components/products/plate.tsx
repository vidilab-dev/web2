import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { productCategories, type Product } from "@/content/products";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/layout/logo";

const tone: Record<Product["plate"], { plate: string; name: string; meta: string; mark: string; blurb: string }> = {
  deep: {
    plate: "bg-deep text-ground",
    name: "text-ground",
    meta: "text-fresh",
    mark: "text-ground/15",
    blurb: "text-ground/70",
  },
  "ground-2": {
    plate: "bg-ground-2 text-ink",
    name: "text-ink",
    meta: "text-accent",
    mark: "text-deep/10",
    blurb: "text-ink-2",
  },
  ground: {
    plate: "bg-ground-3 text-ink",
    name: "text-ink",
    meta: "text-accent-2",
    mark: "text-deep/10",
    blurb: "text-ink-2",
  },
  earth: {
    plate: "bg-earth text-white",
    name: "text-white",
    meta: "text-white",
    mark: "text-ground/15",
    blurb: "text-white",
  },
};

/**
 * Product identity plate.
 *
 * Deliberately a designed label rather than a fabricated product photograph:
 * PT BIN's actual packaging photography has not been supplied, and inventing
 * product shots would misrepresent what the company makes.
 */
export function ProductPlate({
  product,
  className,
  size = "md",
}: {
  product: Product;
  className?: string;
  size?: "sm" | "md";
}) {
  const t = tone[product.plate];
  const category = productCategories.find((c) => c.slug === product.category);

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-[2px] transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1",
        size === "md" ? "p-7 md:p-9" : "p-6 md:p-7",
        t.plate,
        className
      )}
    >
      <LogoMark
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-12 -right-10 size-40 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 md:size-56",
          t.mark
        )}
      />

      <div className="relative">
        <h3
          className={cn(
            "font-display font-extrabold leading-[0.94] tracking-[-0.038em] decoration-2 underline-offset-8 transition-[text-decoration-color] duration-300 group-hover:underline",
            t.name,
            size === "md"
              ? product.name.length > 8
                ? "text-[2rem] md:text-[2.75rem]"
                : "text-[2.25rem] md:text-[3.25rem]"
              : product.name.length > 8
                ? "text-[1.5rem] md:text-[1.875rem]"
                : "text-[1.75rem] md:text-[2.125rem]"
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
        <p className={cn("max-w-sm text-[0.9375rem] leading-snug", t.blurb)}>
          {/* The line's name folds into the sentence; it is not a label above the title. */}
          <span className={cn("font-display font-bold", t.meta)}>
            {category?.label ?? "Produk"}
          </span>
          {" — "}
          {product.summary}
        </p>
      </div>
    </Link>
  );
}
