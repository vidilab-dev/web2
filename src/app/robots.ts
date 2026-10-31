import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * robots.txt.
 *
 * Allows all crawlers, points them at the sitemap, and disallows the admin
 * and API surfaces that should not be indexed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
