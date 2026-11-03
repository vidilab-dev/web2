import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { solutionAudiences } from "@/content/solutions";
import { getPageContent } from "@/lib/pages";
import { audienceSpecs } from "@/lib/page-specs";
import { buildPageMetadata } from "@/app/layout";

export function generateStaticParams() {
  return solutionAudiences.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const audience = solutionAudiences.find((a) => a.slug === slug);
  if (!audience) return {};
  return buildPageMetadata({
    title: audience.title,
    description: audience.lede,
    path: `/solutions/${audience.slug}`,
    image: audience.photo.src,
    imageAlt: audience.photo.alt,
  });
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const audience = solutionAudiences.find((a) => a.slug === slug);
  if (!audience) notFound();

  const spec = audienceSpecs.find((s) => s.path === `/solutions/${audience.slug}`);
  if (!spec) notFound();
  const c = await getPageContent(spec);

  // Cross-links read the other audiences' specs so their titles follow edits too.
  const others = (
    await Promise.all(
      solutionAudiences
        .filter((a) => a.slug !== slug)
        .map(async (a) => {
          const otherSpec = audienceSpecs.find((s) => s.path === `/solutions/${a.slug}`);
          if (!otherSpec) return null;
          const other = await getPageContent(otherSpec);
          return { audience: a, content: other };
        })
    )
  ).filter((o): o is { audience: (typeof solutionAudiences)[number]; content: (typeof spec)["defaults"] } => o !== null);

  return (
    <>
      <PageHeader
        title={c.headerTitle}
        lede={c.headerLede}
        crumbs={[
          { label: "Solusi", href: "/solutions" },
          { label: c.headerTitle },
        ]}
        variant="photo"
        photo={c.headerPhoto}
      />

      {/* Headline statement, given the full measure. */}
      <section className="bg-ground section-y">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-7">
            <p className="statement text-[clamp(1.5rem,3.2vw,2.75rem)] leading-[1.08]">
              {c.headline}
            </p>
          </Reveal>
          <Reveal delay={90} className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="text-[1.0625rem] leading-relaxed text-ink-2">{c.forWhom}</p>
          </Reveal>
        </div>
      </section>

      {/* Approach points as an editorial index. */}
      <section className="bg-ground-2 section-y" aria-labelledby="approach-heading">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-4">
            <h2 id="approach-heading" className="text-h3">
              {c.approachHeading}
            </h2>
          </Reveal>
          <ul className="md:col-span-8">
            {c.approach.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 60}
                className="grid gap-y-2 py-7 first:pt-0 md:grid-cols-12 md:gap-x-8"
              >
                <div className="md:col-span-5">
                  <h3 className="font-display text-[1.1875rem] font-bold tracking-[-0.024em]">
                    {p.title}
                  </h3>
                </div>
                <p className="text-[1rem] leading-relaxed text-ink-2 md:col-span-7">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Considerations: honest framing about what the program needs. */}
      <section className="bg-ground section-y" aria-labelledby="considerations-heading">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-5">
            <h2 id="considerations-heading" className="text-h3">
              {c.considerationsHeading}
            </h2>
            <p className="lede mt-6 max-w-md text-ink-2">{c.considerationsLede}</p>
          </Reveal>
          <ul className="space-y-5 md:col-span-6 md:col-start-7">
            {c.considerations.map((item, i) => (
              <Reveal as="li" key={i} delay={i * 60} className="flex items-start gap-4 bg-ground-2 p-6">
                <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
                <span className="text-[1rem] leading-relaxed">{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-deep text-ground section-y-tight">
        <div className="frame flex flex-wrap items-center justify-between gap-6">
          <p className="statement max-w-2xl">{c.ctaLabel}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={audience.cta.href} className="btn btn-on-dark press">
              {c.ctaLabel} <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/products" className="btn btn-ghost-dark press">
              Lihat Katalog Produk
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-links to the other two audiences. */}
      <section className="bg-ground-2 section-y-tight" aria-labelledby="other-solutions">
        <div className="frame">
          <h2 id="other-solutions" className="text-h3">
            {c.othersHeading}
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {others.map((o) => (
              <li key={o.audience.slug}>
                <Link
                  href={`/solutions/${o.audience.slug}`}
                  className="group flex h-full flex-col justify-between bg-ground p-7 transition-colors duration-300 hover:bg-deep hover:text-ground md:p-8"
                >
                  <h3 className="font-display text-[1.375rem] font-bold tracking-[-0.026em]">
                    {o.content.headerTitle}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2 transition-colors duration-300 group-hover:text-ground/75">
                    {o.content.headline}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-display text-[0.875rem] font-bold text-accent transition-colors duration-300 group-hover:text-fresh">
                    Lihat Detail <ArrowRight aria-hidden className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
