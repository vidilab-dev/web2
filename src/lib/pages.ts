import { cache } from "react";
import { prisma } from "@/lib/db";
import { getPageSpec, type PageSpec, type PageValue } from "@/lib/page-specs";

/**
 * Page content store.
 *
 * Every editable page reads through `getPageContent`, which merges the
 * admin-saved override (PageContent row) over the typed defaults declared in
 * its spec. With no DATABASE_URL — or no saved row — the site renders the
 * local defaults, so the site never depends on the database to look right.
 */

export const getPageContent = cache(
  async function getPageContent<T extends Record<string, PageValue>>(
    spec: PageSpec<T>
  ): Promise<T> {
    const db = prisma();
    if (!db) return spec.defaults;

    try {
      const row = await db.pageContent.findUnique({ where: { path: spec.path } });
      if (!row?.data || typeof row.data !== "object" || Array.isArray(row.data)) {
        return spec.defaults;
      }
      return { ...spec.defaults, ...(row.data as Record<string, PageValue>) } as T;
    } catch (err) {
      // Table missing or database unreachable: fall back to local content.
      console.error("[pages] failed to read page content", spec.path, err);
      return spec.defaults;
    }
  }
);

/** Paths that have a saved override, for the "Disunting" badge in admin. */
export async function listEditedPagePaths(): Promise<Set<string>> {
  const db = prisma();
  if (!db) return new Set();
  try {
    const rows = await db.pageContent.findMany({ select: { path: true } });
    return new Set(rows.map((r) => r.path));
  } catch (err) {
    console.error("[pages] failed to list edited pages", err);
    return new Set();
  }
}

/** Upserts the admin's field values for one page. */
export async function savePageContent(
  path: string,
  data: Record<string, PageValue>
): Promise<void> {
  const db = prisma();
  if (!db) throw new Error("DATABASE_URL belum dikonfigurasi.");

  await db.pageContent.upsert({
    where: { path },
    create: { path, data: data as object },
    update: { data: data as object },
  });
}
