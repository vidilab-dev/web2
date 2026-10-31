import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  getProduct as getLocalProduct,
  products as localProducts,
  type Product as LocalProduct,
} from "@/content/products";

/**
 * Product data layer.
 *
 * Reads from Supabase/PostgreSQL when DATABASE_URL is set, otherwise falls
 * back to the typed local content layer. The public shape always matches the
 * local Product type plus the six datasheet specification fields, so callers
 * never branch on which backend is active.
 */

export type ProductSpec = {
  composition: string | null;
  dosage: string | null;
  application: string | null;
  packaging: string | null;
  shelfLife: string | null;
  registrationNumber: string | null;
};

export type ProductWithSpec = LocalProduct & ProductSpec;

const specFields = [
  "composition",
  "dosage",
  "application",
  "packaging",
  "shelfLife",
  "registrationNumber",
] as const;

/** Validation for the admin datasheet form. Every field optional except the status flag. */
export const productSpecSchema = z.object({
  composition: z.string().trim().max(2000).optional().or(z.literal("")),
  dosage: z.string().trim().max(2000).optional().or(z.literal("")),
  application: z.string().trim().max(2000).optional().or(z.literal("")),
  packaging: z.string().trim().max(500).optional().or(z.literal("")),
  shelfLife: z.string().trim().max(500).optional().or(z.literal("")),
  registrationNumber: z.string().trim().max(500).optional().or(z.literal("")),
  dataStatus: z.enum(["placeholder", "verified"]),
});

export type ProductSpecInput = z.infer<typeof productSpecSchema>;

const emptySpec: ProductSpec = {
  composition: null,
  dosage: null,
  application: null,
  packaging: null,
  shelfLife: null,
  registrationNumber: null,
};

function withLocalSpec(p: LocalProduct): ProductWithSpec {
  return { ...p, ...emptySpec };
}

function blankToNull(v: string | undefined): string | null {
  const t = (v ?? "").trim();
  return t.length > 0 ? t : null;
}

/** Seed one local product into the database so it becomes editable. */
async function seedProduct(slug: string): Promise<void> {
  const db = prisma();
  if (!db) return;
  const local = getLocalProduct(slug);
  if (!local) return;

  const categoryMap: Record<string, "PUPUK_ORGANIK" | "PUPUK_HAYATI" | "PENGENDALI_HAYATI"> = {
    "pupuk-organik": "PUPUK_ORGANIK",
    "pupuk-hayati": "PUPUK_HAYATI",
    "pengendali-hayati": "PENGENDALI_HAYATI",
  };

  await db.product.upsert({
    where: { slug },
    update: {},
    create: {
      slug: local.slug,
      name: local.name,
      category: categoryMap[local.category] ?? "PUPUK_ORGANIK",
      summary: local.summary,
      description: local.description,
      focus: local.focus,
      plate: local.plate,
      dataStatus: local.dataStatus,
      status: "PUBLISHED",
    },
  });
}

export async function getProductWithSpec(slug: string): Promise<ProductWithSpec | null> {
  const local = getLocalProduct(slug);
  if (!local) return null;

  const db = prisma();
  if (!db) return withLocalSpec(local);

  try {
    let row = await db.product.findUnique({ where: { slug } });
    if (!row) {
      await seedProduct(slug);
      row = await db.product.findUnique({ where: { slug } });
    }
    if (!row) return withLocalSpec(local);

    return {
      ...local,
      name: row.name,
      summary: row.summary,
      description: row.description,
      dataStatus: (row.dataStatus as LocalProduct["dataStatus"]) ?? local.dataStatus,
      composition: row.composition,
      dosage: row.dosage,
      application: row.application,
      packaging: row.packaging,
      shelfLife: row.shelfLife,
      registrationNumber: row.registrationNumber,
    };
  } catch (err) {
    console.error("[products] database read failed, using local content", slug, err);
    return withLocalSpec(local);
  }
}

export async function listProductsWithSpec(): Promise<ProductWithSpec[]> {
  const out: ProductWithSpec[] = [];
  for (const p of localProducts) {
    const full = await getProductWithSpec(p.slug);
    out.push(full ?? withLocalSpec(p));
  }
  return out;
}

/** Persist datasheet fields from the admin form. Returns field errors on invalid input. */
export async function saveProductSpec(
  slug: string,
  input: unknown
): Promise<{ ok: true } | { ok: false; fieldErrors: Record<string, string> }> {
  const parsed = productSpecSchema.safeParse(input);
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
    await seedProduct(slug);
    await db.product.update({
      where: { slug },
      data: {
        composition: blankToNull(d.composition),
        dosage: blankToNull(d.dosage),
        application: blankToNull(d.application),
        packaging: blankToNull(d.packaging),
        shelfLife: blankToNull(d.shelfLife),
        registrationNumber: blankToNull(d.registrationNumber),
        dataStatus: d.dataStatus,
      },
    });
    return { ok: true };
  } catch (err) {
    console.error("[products] database write failed", slug, err);
    return { ok: false, fieldErrors: { form: "Gagal menyimpan ke database." } };
  }
}

export { specFields };
