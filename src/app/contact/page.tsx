import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { getPageContent } from "@/lib/pages";
import { contactSpec } from "@/lib/page-specs";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Hubungi Kami",
  description:
    "Hubungi PT Bio Industri Nusantara untuk informasi produk pupuk organik dan hayati, kemitraan, distribusi, serta kolaborasi riset.",
  path: "/contact",
});

export default async function ContactPage() {
  const c = await getPageContent(contactSpec);

  const channels = [
    {
      icon: Mail,
      label: "Email",
      value: c.email,
      href: `mailto:${c.email}`,
    },
    {
      icon: Phone,
      label: "Telepon",
      value: c.phone,
      href: `tel:${c.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Alamat",
      value: `${c.address}, ${c.city}`,
    },
    {
      icon: Clock,
      label: "Jam Operasional",
      value: c.hours,
    },
  ];

  return (
    <>
      <PageHeader
        title={c.headerTitle}
        lede={c.headerLede}
        crumbs={[{ label: "Hubungi Kami" }]}
        variant="photo"
        photo={c.headerPhoto}
      />

      <section className="bg-ground section-y">
        <div className="frame grid gap-y-14 md:grid-cols-12 md:gap-x-10">
          {/* Contact channels — a definition list, not a card grid. */}
          <Reveal className="md:col-span-4">
            <h2 className="text-h3">{c.channelsHeading}</h2>
            <dl className="mt-9 space-y-7">
              {channels.map((ch) => (
                <div key={ch.label} className="flex items-start gap-4">
                  <ch.icon aria-hidden className="mt-1 size-5 shrink-0 text-accent" />
                  <div>
                    <dt className="font-display text-[0.875rem] font-bold text-ink-2">
                      {ch.label}
                    </dt>
                    <dd className="mt-1 text-[1rem] leading-relaxed">
                      {ch.href ? (
                        <a
                          href={ch.href}
                          className="font-medium transition-colors duration-200 hover:text-accent"
                        >
                          {ch.value}
                        </a>
                      ) : (
                        ch.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-10 bg-ground-2 p-7">
              <p className="font-display text-[0.9375rem] font-bold">
                {c.rfqBoxHeading}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                {c.rfqBoxBody}
              </p>
              <a href="/rfq" className="link-arrow mt-4 inline-flex">
                Permintaan Penawaran
              </a>
            </div>
          </Reveal>

          {/* The form, given the larger share of the grid. */}
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={80}>
              <h2 className="text-h3">{c.formHeading}</h2>
              <p className="meta mt-3 max-w-xl">
                Semua isian bertanda <span className="text-accent">*</span> wajib diisi.
              </p>
            </Reveal>
            <Reveal delay={140} className="mt-9">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
