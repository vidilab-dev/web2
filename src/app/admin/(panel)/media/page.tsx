import Image from "next/image";
import { promises as fs } from "node:fs";
import path from "node:path";
import { ImageIcon, ExternalLink } from "lucide-react";
import { imageCredits } from "@/content/image-credits";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pustaka Media | Admin PT BIN",
  robots: { index: false, follow: false },
};

type MediaFile = {
  name: string;
  src: string;
  bytes: number;
  credit?: { title: string; creator: string; license: string; source: string };
};

/** Reads the real image files from /public/images with their on-disk size. */
async function listMedia(): Promise<MediaFile[]> {
  const dir = path.join(process.cwd(), "public", "images");
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }

  const files = await Promise.all(
    entries
      .filter((e) => /\.(jpe?g|png|webp|avif)$/i.test(e))
      .map(async (name) => {
        const full = path.join(dir, name);
        const stat = await fs.stat(full);
        const publicPath = `/images/${name}`;
        const credit = imageCredits.find((c) => c.file === publicPath);
        return {
          name,
          src: publicPath,
          bytes: stat.size,
          credit,
        };
      })
  );

  return files.sort((a, b) => a.name.localeCompare(b.name));
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function AdminMediaPage() {
  const media = await listMedia();
  const totalBytes = media.reduce((sum, m) => sum + m.bytes, 0);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-none">Pustaka Media</h1>
        <p className="mt-3 text-[1rem] text-ink-2">
          {media.length} berkas gambar · {formatBytes(totalBytes)} total.
        </p>
      </header>

      {/* Honesty notice: these are open-collection photographs, not PT BIN's own. */}
      <div className="border-l-4 border-earth bg-ground p-5 text-[0.9375rem] leading-relaxed text-ink-2">
        <p className="font-semibold text-ink">Catatan sumber gambar</p>
        <p className="mt-1">
          Seluruh foto di situs diambil dari koleksi terbuka (Wikimedia Commons)
          dan menggambarkan dunia industri perkebunan dan pertanian. Foto
          tersebut <span className="font-semibold">bukan</span> dokumentasi fasilitas
          PT BIN. Ganti dengan foto perusahaan sendiri melalui panel ini sebelum
          peluncuran.
        </p>
      </div>

      {/* Upload slot placeholder until object storage is connected. */}
      <div className="flex items-center gap-4 bg-ground p-6 text-ink-2">
        <ImageIcon aria-hidden className="size-6 shrink-0 text-accent" />
        <div>
          <p className="font-semibold text-ink">Unggah media baru</p>
          <p className="mt-1 text-[0.875rem]">
            Hubungkan penyimpanan objek (S3 / Supabase Storage) untuk mengaktifkan
            unggahan dari panel. Saat ini berkas dikelola melalui direktori
            <code className="mx-1 rounded-[2px] bg-ground-2 px-1.5 py-0.5">public/images</code>.
          </p>
        </div>
      </div>

      {/* Media grid with credits */}
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {media.map((m) => (
          <li key={m.name} className="bg-ground">
            <div className="relative aspect-[4/3] overflow-hidden bg-ground-2">
              <Image
                src={m.src}
                alt={m.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                quality={60}
                className="photo"
              />
            </div>
            <div className="p-4">
              <p className="truncate text-[0.8125rem] font-semibold">{m.name}</p>
              <p className="mt-1 text-[0.75rem] text-ink-2">{formatBytes(m.bytes)}</p>
              {m.credit && (
                <p className="mt-2 text-[0.75rem] leading-snug text-ink-2">
                  {m.credit.creator} · {m.credit.license}
                  <a
                    href={m.credit.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 inline-flex items-center gap-0.5 text-accent hover:underline"
                  >
                    sumber <ExternalLink aria-hidden className="size-3" />
                  </a>
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
