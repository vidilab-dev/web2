import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { getPageContent } from "@/lib/pages";
import { partnershipSpec } from "@/lib/page-specs";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Kemitraan",
  description:
    "Peluang kemitraan PT Bio Industri Nusantara: plantation partnership, distribusi pertanian, kolaborasi riset, dan pengembangan agribisnis.",
  path: "/partnership",
});

export default async function PartnershipPage() {
  const c = await getPageContent(partnershipSpec);
  const photos = [c.photo1, c.photo2, c.photo3, c.photo4];

  return (
    <>
      <PageHeader
        title={c.headerTitle}
        lede={c.headerLede}
        crumbs={[{ label: "Kemitraan" }]}
        variant="photo"
        photo={c.headerPhoto}
      />

      {/* The four partnership routes, each given its own band with alternating tone. */}
      <ul>
        {c.types.map((p, i) => {
          const dark = i % 2 === 1;
          const photo = photos[i];
          return (
            <li key={p.title} className={dark ? "bg-deep text-ground" : "bg-ground"}>
              <div className="frame section-y-tight">
                <div className="grid items-center gap-y-8 md:grid-cols-12 md:gap-x-10">
                  <Reveal className={i % 2 === 0 ? "md:col-span-6" : "md:col-span-6 md:col-start-7 md:row-start-1"}>
                    <h2 className="text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.02]">
                      {p.title}
                    </h2>
                    <p
                      className={`mt-6 max-w-xl text-[1.0625rem] leading-relaxed ${
                        dark ? "text-ground/75" : "text-ink-2"
                      }`}
                    >
                      {p.description}
                    </p>

                    {p.href === "/partnership/distributor" ? (
                      <Link
                        href="/partnership/distributor"
                        className={`btn press mt-8 ${dark ? "btn-on-dark" : "btn-primary"}`}
                      >
                        Registrasi Distributor <ArrowRight aria-hidden className="size-4" />
                      </Link>
                    ) : (
                      <Link
                        href="/contact"
                        className={`link-arrow mt-8 inline-flex ${dark ? "text-fresh" : ""}`}
                      >
                        Hubungi Kami <ArrowUpRight aria-hidden className="size-4" />
                      </Link>
                    )}
                  </Reveal>

                  {/* Each route gets a photograph that matches its subject. */}
                  <Reveal
                    delay={90}
                    className={i % 2 === 0 ? "md:col-span-5 md:col-start-8" : "md:col-span-5 md:col-start-1 md:row-start-1"}
                  >
                    <figure className="relative aspect-[4/3] overflow-hidden">
                      {photo?.src ? (
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          quality={76}
                          className="photo"
                        />
                      ) : null}
                    </figure>
                  </Reveal>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <section className="bg-ground-3 section-y-tight">
        <div className="frame flex flex-wrap items-center justify-between gap-6">
          <p className="statement max-w-2xl">
            {c.closingStatement}
          </p>
          <Link href="/contact" className="btn btn-primary press">
            Hubungi Kami <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
