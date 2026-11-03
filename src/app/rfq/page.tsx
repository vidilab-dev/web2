import type { Metadata } from "next";
import { FileText, ClipboardList, Timer } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { RfqForm } from "@/components/forms/rfq-form";
import { Reveal } from "@/components/motion/reveal";
import { getPageContent } from "@/lib/pages";
import { rfqSpec } from "@/lib/page-specs";
import { buildPageMetadata } from "@/app/layout";

export const metadata: Metadata = buildPageMetadata({
  title: "Permintaan Penawaran",
  description:
    "Ajukan permintaan penawaran produk pupuk organik dan hayati dari PT Bio Industri Nusantara untuk kebutuhan perkebunan, lahan pertanian, atau distribusi.",
  path: "/rfq",
});

/** Icons stay keyed by step position; extra rows reuse the last icon. */
const stepIcons = [ClipboardList, FileText, Timer];

export default async function RfqPage() {
  const c = await getPageContent(rfqSpec);

  return (
    <>
      <PageHeader
        title={c.headerTitle}
        lede={c.headerLede}
        crumbs={[{ label: "Permintaan Penawaran" }]}
        variant="photo"
        photo={c.headerPhoto}
      />

      {/* The three steps, asymmetric so it does not read as a card row. */}
      <section className="bg-ground section-y-tight" aria-labelledby="rfq-steps">
        <div className="frame">
          <h2 id="rfq-steps" className="sr-only">
            Alur permintaan penawaran
          </h2>
          <ol className="grid gap-x-10 gap-y-10 md:grid-cols-12">
            {c.steps.map((s, i) => {
              const Icon = stepIcons[i] ?? stepIcons[stepIcons.length - 1];
              return (
                <Reveal
                  as="li"
                  key={s.title}
                  delay={i * 70}
                  className={
                    i === 0
                      ? "md:col-span-5"
                      : i === 1
                        ? "md:col-span-4 md:mt-10"
                        : "md:col-span-3 md:mt-20"
                  }
                >
                  <Icon aria-hidden className="size-7 text-accent" />
                  <h3 className="mt-4 font-display text-[1.25rem] font-bold tracking-[-0.026em]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                    {s.description}
                  </p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-ground-2 section-y" aria-labelledby="rfq-form-heading">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 id="rfq-form-heading" className="text-h3">
                {c.formHeading}
              </h2>
              <p className="lede mt-5 max-w-sm text-ink-2">{c.formLede}</p>
              <p className="meta mt-6 max-w-sm">{c.formNote}</p>
            </div>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={80}>
              <RfqForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
