import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/content/site";

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumb nav.
 *
 * Renders as an ordered list so the hierarchy is exposed to assistive
 * technology, with aria-current on the final crumb. A BreadcrumbList
 * JSON-LD graph is emitted alongside so search engines read the same path.
 */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Beranda", href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `${site.url}${item.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.875rem] leading-snug">
        {all.map((item, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="text-current/70 transition-opacity duration-200 hover:opacity-100"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="font-medium">
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight aria-hidden className="size-3.5 shrink-0 opacity-45" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
