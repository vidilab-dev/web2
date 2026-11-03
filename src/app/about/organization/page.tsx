import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { getPageContent } from "@/lib/pages";
import { organizationSpec } from "@/lib/page-specs";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Struktur Organisasi",
  description:
    "Fungsi-fungsi operasional PT Bio Industri Nusantara, mulai dari riset dan pengembangan, produksi, laboratorium, hingga layanan lapangan.",
  path: "/about/organization",
});

export default async function OrganizationPage() {
  const c = await getPageContent(organizationSpec);

  return (
    <>
      <PageHeader
        title={c.headerTitle}
        lede={c.headerLede}
        crumbs={[{ label: "Tentang Kami", href: "/about" }, { label: "Struktur Organisasi" }]}
        variant="photo"
        photo={c.headerPhoto}
      />

      <section className="bg-ground section-y">
        <div className="frame grid gap-y-12 md:grid-cols-12 md:gap-x-10">
          {/* Functions as a definition list: term and scope always paired. */}
          <dl className="md:col-span-8">
            {c.functions.map((f, i) => (
              <Reveal
                as="div"
                key={f.function}
                delay={i * 55}
                className="grid gap-y-2 py-8 first:pt-0 md:grid-cols-12 md:gap-x-8"
              >
                <dt className="md:col-span-4">
                  <span className="font-display text-[1.1875rem] font-bold tracking-[-0.024em] md:text-[1.375rem]">
                    {f.function}
                  </span>
                </dt>
                <dd className="text-[1rem] leading-relaxed text-ink-2 md:col-span-8">{f.scope}</dd>
              </Reveal>
            ))}
          </dl>

          <aside className="md:col-span-4 md:col-start-9">
            <Reveal delay={80}>
              <div className="bg-ground-2 p-8">
                <h2 className="font-display text-[1.125rem] font-bold tracking-[-0.022em]">
                  {c.noteHeading}
                </h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
                  {c.note}
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <figure className="mt-8">
                <div className="relative aspect-[4/3] overflow-hidden bg-ground-3">
                  <Image
                    src={c.figurePhoto.src}
                    alt={c.figurePhoto.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    quality={76}
                    className="photo"
                  />
                </div>
                <figcaption className="meta mt-3">
                  {c.figureCaption}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={180} className="mt-8">
              <Link href="/partnership" className="btn btn-secondary press">
                Bekerja Sama dengan Kami <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
