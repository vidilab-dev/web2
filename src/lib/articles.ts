import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  articles as localArticles,
  getArticle as getLocalArticle,
  type Article as LocalArticle,
  type ArticleCategory,
} from "@/content/news";

/**
 * Article data layer.
 *
 * Reads from Supabase/PostgreSQL when DATABASE_URL is set, otherwise falls
 * back to the typed local content layer. DB rows carry status PUBLISHED and
 * sample=false; local sample articles are merged in so nothing disappears
 * before migration. New articles created from the admin panel live in the DB.
 */

export type ArticleWithMeta = LocalArticle & { id?: string };

/** Validation for the admin article form. */
export const articleSchema = z.object({
  title: z.string().trim().min(10, "Judul minimal 10 karakter.").max(160, "Judul maksimal 160 karakter."),
  category: z.enum(
    [
      "Berita Perusahaan",
      "Aktivitas Perusahaan",
      "Inovasi Produk",
      "Edukasi Pertanian",
      "Kegiatan Penelitian",
      "Artikel Agribisnis",
    ],
    { message: "Pilih salah satu kategori." }
  ),
  excerpt: z.string().trim().min(40, "Ringkasan minimal 40 karakter.").max(400, "Ringkasan maksimal 400 karakter."),
  body: z
    .string()
    .trim()
    .min(100, "Isi artikel minimal 100 karakter.")
    .max(20000, "Isi artikel maksimal 20.000 karakter."),
  imageUrl: z
    .string()
    .trim()
    .max(2000)
    .refine((v) => v === "" || v.startsWith("/") || v.startsWith("https://"), {
      message: "Isi path lokal (/images/...) atau URL https.",
    })
    .optional()
    .or(z.literal("")),
  imageAlt: z.string().trim().max(300).optional().or(z.literal("")),
  authorName: z.string().trim().min(2, "Nama penulis wajib diisi.").max(100),
});

export type ArticleInput = z.infer<typeof articleSchema>;

const categoryToEnum: Record<ArticleCategory, "BERITA_PERUSAHAAN" | "AKTIVITAS_PERUSAHAAN" | "INOVASI_PRODUK" | "EDUKASI_PERTANIAN" | "KEGIATAN_PENELITIAN" | "ARTIKEL_AGRIBISNIS"> = {
  "Berita Perusahaan": "BERITA_PERUSAHAAN",
  "Aktivitas Perusahaan": "AKTIVITAS_PERUSAHAAN",
  "Inovasi Produk": "INOVASI_PRODUK",
  "Edukasi Pertanian": "EDUKASI_PERTANIAN",
  "Kegiatan Penelitian": "KEGIATAN_PENELITIAN",
  "Artikel Agribisnis": "ARTIKEL_AGRIBISNIS",
};

const enumToCategory: Record<string, ArticleCategory> = {
  BERITA_PERUSAHAAN: "Berita Perusahaan",
  AKTIVITAS_PERUSAHAAN: "Aktivitas Perusahaan",
  INOVASI_PRODUK: "Inovasi Produk",
  EDUKASI_PERTANIAN: "Edukasi Pertanian",
  KEGIATAN_PENELITIAN: "Kegiatan Penelitian",
  ARTIKEL_AGRIBISNIS: "Artikel Agribisnis",
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function blankToNull(v: string | undefined): string | null {
  const t = (v ?? "").trim();
  return t.length > 0 ? t : null;
}

function estimateReadingMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

type DbArticle = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: unknown;
  authorName: string;
  readingMinutes: number;
  imageUrl: string | null;
  imageAlt: string | null;
  publishedAt: Date | null;
};

function dbToArticle(row: DbArticle): ArticleWithMeta {
  const paragraphs = Array.isArray(row.body)
    ? (row.body as unknown[]).map(String)
    : [String(row.body ?? "")];
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: enumToCategory[row.category] ?? "Artikel Agribisnis",
    excerpt: row.excerpt,
    body: paragraphs,
    publishedAt: row.publishedAt
      ? row.publishedAt.toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    readingMinutes: row.readingMinutes,
    image:
      row.imageUrl != null
        ? { src: row.imageUrl, alt: row.imageAlt ?? row.title }
        : undefined,
    author: row.authorName,
    sample: false,
  };
}

async function readDbArticles(): Promise<ArticleWithMeta[]> {
  const db = prisma();
  if (!db) return [];
  try {
    const rows = await db.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    });
    return rows.map((r) =>
      dbToArticle({
        ...r,
        body: r.body as unknown,
      })
    );
  } catch (err) {
    console.error("[articles] database read failed, using local content", err);
    return [];
  }
}

/** All published articles: DB rows first, then local samples not yet migrated. */
export async function listArticles(): Promise<ArticleWithMeta[]> {
  const fromDb = await readDbArticles();
  const dbSlugs = new Set(fromDb.map((a) => a.slug));
  const local = localArticles.filter((a) => !dbSlugs.has(a.slug));
  return [...fromDb, ...local];
}

export async function getArticleBySlug(slug: string): Promise<ArticleWithMeta | null> {
  const db = prisma();
  if (db) {
    try {
      const row = await db.article.findUnique({ where: { slug } });
      if (row && row.status === "PUBLISHED") {
        return dbToArticle({ ...row, body: row.body as unknown });
      }
    } catch (err) {
      console.error("[articles] database read failed", slug, err);
    }
  }
  return getLocalArticle(slug) ?? null;
}

/** Creates a new published article from the admin form. */
export async function createArticle(
  input: unknown
): Promise<{ ok: true; slug: string } | { ok: false; fieldErrors: Record<string, string> }> {
  const parsed = articleSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors };
  }

  const db = prisma();
  if (!db) return { ok: false, fieldErrors: { form: "Database belum tersambung." } };

  const d = parsed.data;
  let slug = slugify(d.title);
  if (!slug) slug = `artikel-${Date.now()}`;

  try {
    const existing = await db.article.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString(36)}`;

    const paragraphs = d.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    await db.article.create({
      data: {
        slug,
        title: d.title.trim(),
        category: categoryToEnum[d.category as ArticleCategory] ?? "ARTIKEL_AGRIBISNIS",
        excerpt: d.excerpt.trim(),
        body: paragraphs,
        authorName: d.authorName.trim(),
        readingMinutes: estimateReadingMinutes(d.body),
        imageUrl: blankToNull(d.imageUrl),
        imageAlt: blankToNull(d.imageAlt),
        status: "PUBLISHED",
        sample: false,
        publishedAt: new Date(),
      },
    });
    return { ok: true, slug };
  } catch (err) {
    console.error("[articles] database write failed", err);
    return { ok: false, fieldErrors: { form: "Gagal menyimpan ke database." } };
  }
}

/** Updates an existing DB article. Local sample articles cannot be edited until migrated. */
export async function updateArticle(
  slug: string,
  input: unknown
): Promise<{ ok: true } | { ok: false; fieldErrors: Record<string, string> }> {
  const parsed = articleSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors };
  }

  const db = prisma();
  if (!db) return { ok: false, fieldErrors: { form: "Database belum tersambung." } };

  const d = parsed.data;
  try {
    const existing = await db.article.findUnique({ where: { slug } });
    if (!existing) {
      return { ok: false, fieldErrors: { form: "Artikel contoh bawaan hanya bisa diganti, tidak bisa diubah. Buat artikel baru sebagai penggantinya." } };
    }
    const paragraphs = d.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    await db.article.update({
      where: { slug },
      data: {
        title: d.title.trim(),
        category: categoryToEnum[d.category as ArticleCategory] ?? "ARTIKEL_AGRIBISNIS",
        excerpt: d.excerpt.trim(),
        body: paragraphs,
        authorName: d.authorName.trim(),
        readingMinutes: estimateReadingMinutes(d.body),
        imageUrl: blankToNull(d.imageUrl),
        imageAlt: blankToNull(d.imageAlt),
      },
    });
    return { ok: true };
  } catch (err) {
    console.error("[articles] database write failed", slug, err);
    return { ok: false, fieldErrors: { form: "Gagal menyimpan ke database." } };
  }
}
