import Image from "next/image";
import { Breadcrumb, type Crumb } from "./breadcrumb";

/**
 * Internal page header.
 *
 * Two variants so internal pages do not all open with the same shape:
 *   - "dark": a deep green field, headline set large and left, lede across the grid.
 *   - "photo": the same header followed by a full-bleed photograph band.
 */
export function PageHeader({
  title,
  lede,
  crumbs,
  variant = "dark",
  photo,
}: {
  title: React.ReactNode;
  lede?: string;
  crumbs: Crumb[];
  variant?: "dark" | "photo";
  photo?: { src: string; alt: string };
}) {
  return (
    <header className="bg-deep text-ground">
      <div className="frame pt-24 pb-12 md:pt-36 md:pb-16">
        <div className="text-ground/65">
          <Breadcrumb items={crumbs} />
        </div>
        <div className="mt-9 grid gap-y-6 md:grid-cols-12 md:gap-x-10 md:mt-12">
          <h1 className="whitespace-pre-line md:col-span-7">{title}</h1>
          {lede && (
            <p className="lede self-end text-ground/70 md:col-span-5 md:pb-2">{lede}</p>
          )}
        </div>
      </div>

      {variant === "photo" && photo && (
        <div className="relative aspect-[21/9] max-h-[34rem] w-full overflow-hidden bg-deep-3">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="100vw"
            quality={80}
            className="photo"
            priority
          />
        </div>
      )}
    </header>
  );
}
