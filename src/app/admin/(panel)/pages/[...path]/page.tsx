import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPageSpec } from "@/lib/page-specs";
import { getPageContent } from "@/lib/pages";
import { PageForm } from "@/components/admin/page-form";

export const metadata = {
  title: "Ubah Halaman | Admin PT BIN",
  robots: { index: false, follow: false },
};

/**
 * Generic page editor: the form is generated from the page's field spec, so
 * every public page shares one route and one component.
 *
 * The homepage has no path segment of its own, so it is addressed as
 * "/admin/pages/home" and mapped back to "/" here.
 */
export default async function EditPagePage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const routePath =
    path.length === 1 && path[0] === "home" ? "/" : `/${path.join("/")}`;

  const spec = getPageSpec(routePath);
  if (!spec) notFound();

  const content = await getPageContent(spec);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="meta">{spec.path}</p>
          <h1 className="mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-none">
            {spec.label}
          </h1>
          <p className="mt-3 max-w-2xl text-[1rem] text-ink-2">
            Ubah teks dan foto bagian ini. Setelah disimpan, halaman publik
            langsung menampilkan isi terbaru.
          </p>
        </div>
        <Link href="/admin/pages" className="btn btn-secondary press">
          <ArrowLeft aria-hidden className="size-4" />
          Daftar Halaman
        </Link>
      </header>

      <PageForm spec={spec} current={content} />
    </div>
  );
}
