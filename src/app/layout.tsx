import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";
import { RouteChrome } from "@/components/layout/route-chrome";
import { MotionInit } from "@/components/motion/motion-init";
import "./globals.css";

/**
 * Display: Plus Jakarta Sans, drawn in Indonesia for the Jakarta city
 * identity, so it carries a genuine local provenance for a national
 * agribusiness brand. Body: Inter, kept for small-size legibility.
 * taste-skill-ignore [default-font]
 */
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

// taste-skill-ignore [default-font] brief fixes the body face; Plus Jakarta Sans carries the character
const inter = Inter({  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#123D2B",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Pupuk Organik & Pupuk Hayati | ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: {
    canonical: "/",
    languages: { "id-ID": "/", "en-US": "/en" },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    alternateLocale: [site.localeAlt],
    url: "/",
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/images/plantation-aerial.jpg",
        width: 1920,
        height: 1275,
        alt: "Areal perkebunan kelapa sawit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: ["/images/plantation-aerial.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: site.shortName,
  description: site.description,
  url: site.url,
  slogan: site.tagline,
  industry: "Agriculture",
  knowsAbout: [
    "Pupuk organik",
    "Pupuk hayati",
    "Biofertilizer",
    "Pengendali hayati",
    "Teknologi pertanian berbasis mikroorganisme",
    "Integrated bio-agribusiness",
  ],
  areaServed: "Indonesia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased">
        <MotionInit />
        <RouteChrome>{children}</RouteChrome>
      </body>
    </html>
  );
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = "/images/plantation-aerial.jpg",
  imageAlt = "Areal perkebunan kelapa sawit",
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path, site.url);
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url,
      title: `${title} · ${site.name}`,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
      images: [image],
    },
  };
}
