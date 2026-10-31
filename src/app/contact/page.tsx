import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { contact, site } from "@/content/site";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Hubungi Kami",
  description:
    "Hubungi PT Bio Industri Nusantara untuk informasi produk pupuk organik dan hayati, kemitraan, distribusi, serta kolaborasi riset.",
  path: "/contact",
});

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: Phone,
    label: "Telepon",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Alamat",
    value: `${contact.address}, ${contact.city}`,
  },
  {
    icon: Clock,
    label: "Jam Operasional",
    value: contact.hours,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Hubungi
            <br />
            Kami
          </>
        }
        lede="Ada pertanyaan tentang produk, kebutuhan lahan, atau peluang kerja sama? Sampaikan melalui formulir ini atau saluran kontak di samping."
        crumbs={[{ label: "Hubungi Kami" }]}
        variant="photo"
        photo={{
          src: "/images/farmer-planting.jpg",
          alt: "Petani menanam benih padi di lahan persawahan",
        }}
      />

      <section className="bg-ground section-y">
        <div className="frame grid gap-y-14 md:grid-cols-12 md:gap-x-10">
          {/* Contact channels — a definition list, not a card grid. */}
          <Reveal className="md:col-span-4">
            <h2 className="text-h3">Kontak Perusahaan</h2>
            <dl className="mt-9 space-y-7">
              {channels.map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <c.icon aria-hidden className="mt-1 size-5 shrink-0 text-accent" />
                  <div>
                    <dt className="font-display text-[0.875rem] font-bold text-ink-2">
                      {c.label}
                    </dt>
                    <dd className="mt-1 text-[1rem] leading-relaxed">
                      {c.href ? (
                        <a
                          href={c.href}
                          className="font-medium transition-colors duration-200 hover:text-accent"
                        >
                          {c.value}
                        </a>
                      ) : (
                        c.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-10 bg-ground-2 p-7">
              <p className="font-display text-[0.9375rem] font-bold">
                Untuk permintaan penawaran
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                Jika Anda membutuhkan penawaran harga atau datasheet produk, gunakan
                formulir {site.shortName} khusus agar tim kami dapat menyiapkan
                tanggapan yang tepat.
              </p>
              <a href="/rfq" className="link-arrow mt-4 inline-flex">
                Permintaan Penawaran
              </a>
            </div>
          </Reveal>

          {/* The form, given the larger share of the grid. */}
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={80}>
              <h2 className="text-h3">Kirim Pesan</h2>
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
