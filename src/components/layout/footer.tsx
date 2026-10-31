import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contact, footerNavigation, site } from "@/content/site";
import { imageCredits } from "@/content/image-credits";
import { products } from "@/content/products";
import { LogoMark } from "./logo";

const columns = [
  { heading: "Perusahaan", links: [...footerNavigation.company] },
  { heading: "Jelajahi", links: [...footerNavigation.explore] },
  { heading: "Riset & Wawasan", links: [...footerNavigation.research] },
  { heading: "Hubungi", links: [...footerNavigation.connect] },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep text-ground">
      {/* The name returns at full width, the designed close. */}
      <div className="frame pt-16 md:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex items-center gap-3 md:gap-4">
            <LogoMark className="size-10 md:size-14" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-[1.5rem] font-extrabold tracking-[-0.03em] md:text-[2.25rem]">
                PT BIO INDUSTRI
              </span>
              <span className="mt-1.5 text-[0.75rem] font-semibold tracking-[0.32em] text-fresh md:mt-2.5 md:text-[0.9375rem]">
                NUSANTARA
              </span>
            </div>
          </div>
          <Link href="/rfq" className="btn btn-on-dark press">
            Mulai Percakapan <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </div>

        <p className="lede mt-10 max-w-3xl text-ground/75 md:mt-14">
          Pupuk organik, pupuk hayati, dan solusi pengendali hayati berbasis
          mikroorganisme untuk perkebunan dan pertanian yang produktif,
          berkelanjutan, dan bernilai tambah.
        </p>
      </div>

      <div className="frame mt-14 grid gap-x-10 gap-y-12 pb-16 md:mt-20 md:grid-cols-12 md:pb-24">
        <div className="md:col-span-4 lg:col-span-3">
          <h2 className="font-display text-[0.9375rem] font-bold tracking-[-0.01em] text-fresh">
            {site.name}
          </h2>
          <address className="mt-4 not-italic text-[0.9375rem] leading-relaxed text-ground/70">
            {contact.address}
            <br />
            {contact.city}
          </address>
          <ul className="mt-5 space-y-1.5 text-[0.9375rem]">
            <li>
              <a href={`mailto:${contact.email}`} className="transition-colors duration-200 hover:text-fresh">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="transition-colors duration-200 hover:text-fresh">
                {contact.phone}
              </a>
            </li>
          </ul>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
            {contact.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ground/70 transition-colors duration-200 hover:text-fresh"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="md:col-span-2 lg:col-span-2 lg:col-start-auto">
            <h2 className="font-display text-[0.9375rem] font-bold tracking-[-0.01em] text-fresh">
              {col.heading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-ground/70">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 hover:text-ground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Produk" className="md:col-span-12 lg:col-span-2">
          <h2 className="font-display text-[0.9375rem] font-bold tracking-[-0.01em] text-fresh">
            Produk
          </h2>
          <ul className="mt-4 grid gap-2.5 text-[0.9375rem] text-ground/70 sm:grid-cols-2 lg:grid-cols-1">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="transition-colors duration-200 hover:text-ground"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Photo attribution, every found picture is credited on the page.
          A step in tone marks the transition; no hairline rules. */}
      <div className="bg-deep-2">
        <div className="frame py-9">
          <details className="group">
            <summary className="cursor-pointer list-none font-display text-[0.875rem] font-bold tracking-[-0.01em] text-ground/60 transition-colors duration-200 hover:text-fresh">
              Kredit foto
            </summary>
            <ul className="mt-5 grid gap-x-8 gap-y-3 text-[0.8125rem] leading-snug text-ground/55 md:grid-cols-2">
              {imageCredits.map((c) => (
                <li key={c.file}>
                  <a
                    href={c.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:text-fresh"
                  >
                    &ldquo;{c.title}&rdquo;
                  </a>{" "}
                  oleh {c.creator}, {c.license}, via Wikimedia Commons.
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-3xl text-[0.8125rem] leading-relaxed text-ground/45">
              Foto-foto di atas diambil dari koleksi terbuka dan menggambarkan
              dunia industri perkebunan serta pertanian. Foto tersebut bukan
              dokumentasi fasilitas PT Bio Industri Nusantara.
            </p>
          </details>
        </div>

        <div className="frame flex flex-col gap-3 pb-8 text-[0.8125rem] text-ground/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. Hak cipta dilindungi.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/contact" className="transition-colors duration-200 hover:text-fresh">
                Hubungi Kami
              </Link>
            </li>
            <li>
              <Link href="/rfq" className="transition-colors duration-200 hover:text-fresh">
                Permintaan Penawaran
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="transition-colors duration-200 hover:text-fresh">
                Peta Situs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
