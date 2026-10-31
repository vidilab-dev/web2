import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { products, productCategories } from "@/content/products";
import { articles } from "@/content/news";
import { solutionAudiences } from "@/content/solutions";

/**
 * XML sitemap.
 *
 * Every public route is enumerated from the typed content layer, so adding a
 * product, article or solution automatically adds it here. Admin and API
 * routes are excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about/vision-mission`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/about/values`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/about/organization`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/research/laboratory`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/research/demonstration-plot`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/research/innovation`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/sustainability`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/partnership`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/partnership/distributor`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/rfq`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = productCategories.map((c) => ({
    url: `${base}/products/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const solutionRoutes: MetadataRoute.Sitemap = solutionAudiences.map((s) => ({
    url: `${base}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/news/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...solutionRoutes,
    ...articleRoutes,
  ];
}
