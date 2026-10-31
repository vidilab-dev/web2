import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { LogoMark } from "@/components/layout/logo";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col justify-center bg-deep text-ground">
      <div className="frame py-20">
        <div className="grid items-center gap-y-12 md:grid-cols-12 md:gap-x-10">
          {/* Big number, treated as an identity moment. */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <LogoMark className="size-12 text-fresh" />
              <span className="font-display text-[clamp(4rem,12vw,9rem)] font-extrabold leading-none tracking-[-0.05em] text-fresh">
                404
              </span>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.98]">
              Halaman tidak
              <br />
              ditemukan
            </h1>
            <p className="lede mt-6 max-w-md text-ground/70">
              Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau
              alamatnya tidak tepat. Coba salah satu jalur berikut.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/" className="btn btn-on-dark press">
                <ArrowLeft aria-hidden className="size-4" />
                Kembali ke Beranda
              </Link>
              <Link href="/products" className="btn btn-ghost-dark press">
                Katalog Produk <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>

            {/* Quick routes so the visitor is never stranded. */}
            <ul className="mt-14 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {[
                { label: "Tentang Kami", href: "/about" },
                { label: "Solusi Terintegrasi", href: "/solutions" },
                { label: "Riset & Inovasi", href: "/research" },
                { label: "Wawasan", href: "/news" },
                { label: "Kemitraan", href: "/partnership" },
                { label: "Hubungi Kami", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block py-2 text-[1rem] text-ground/65 transition-colors duration-200 hover:text-fresh"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
