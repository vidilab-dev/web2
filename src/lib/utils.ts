import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, resolving Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a Date as a stable, locale-appropriate display string. */
export function formatDate(date: Date | string, locale = "id-ID") {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Normalise an arbitrary string into a URL slug. */
export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Build an absolute URL for metadata, sitemaps and structured data. */
export function absoluteUrl(path: string, base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000") {
  return new URL(path, base).toString();
}
