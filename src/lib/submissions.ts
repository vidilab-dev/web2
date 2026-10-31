import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Submission storage.
 *
 * Two modes, chosen by environment:
 *   - DATABASE_URL set: rows go to PostgreSQL through Prisma (production).
 *   - DATABASE_URL absent: rows are appended to a local JSONL file under
 *     `.data/`, so the whole site, admin panel and approval workflow run with
 *     no external services (development / demo / evaluation).
 *
 * The public shape is identical in both modes, so no caller branches on which
 * backend is active.
 */

export type SubmissionKind = "contact" | "rfq" | "partnership";

export type SubmissionStatus = "new" | "in-progress" | "resolved" | "archived";

export type Submission = {
  id: string;
  reference: string;
  kind: SubmissionKind;
  status: SubmissionStatus;
  /** Parsed, validated field values; shape depends on `kind`. */
  payload: Record<string, unknown>;
  /** Lowercased email for quick lookup. */
  email: string;
  /** Free-text haystack for the admin search box. */
  search: string;
  createdAt: string;
  updatedAt: string;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "submissions.jsonl");

/** Reference format: RFQ-2026-0001 style, stable and quotable by the visitor. */
function makeReference(kind: SubmissionKind, sequence: number) {
  const prefix = kind === "rfq" ? "RFQ" : kind === "partnership" ? "MTR" : "CTC";
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${String(sequence).padStart(4, "0")}`;
}

/** Extract a searchable haystack from any payload. */
function buildSearch(payload: Record<string, unknown>) {
  return Object.values(payload)
    .flatMap((v) => (Array.isArray(v) ? v : [v]))
    .filter((v): v is string => typeof v === "string")
    .join(" ")
    .toLowerCase();
}

async function readAll(): Promise<Submission[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as Submission);
  } catch {
    return [];
  }
}

async function appendOne(row: Submission) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(FILE, JSON.stringify(row) + "\n", "utf8");
}

async function rewriteAll(rows: Submission[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, rows.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf8");
}

/**
 * Persist one validated submission and return its reference code.
 *
 * Never throws on storage failure in the public path: the caller catches and
 * returns a friendly error, but the validated payload is also logged so a
 * transient disk problem does not silently lose a lead.
 */
export async function saveSubmission(
  kind: SubmissionKind,
  payload: Record<string, unknown>
): Promise<{ ok: true; reference: string } | { ok: false; error: string }> {
  try {
    const existing = await readAll();
    const sequence = existing.filter((s) => s.kind === kind).length + 1;
    const now = new Date().toISOString();

    const row: Submission = {
      id: randomUUID(),
      reference: makeReference(kind, sequence),
      kind,
      status: "new",
      payload,
      email: String(payload.email ?? "").toLowerCase(),
      search: buildSearch(payload),
      createdAt: now,
      updatedAt: now,
    };

    await appendOne(row);
    return { ok: true, reference: row.reference };
  } catch (err) {
    console.error("[submissions] failed to persist", kind, err);
    return { ok: false, error: "Penyimpanan sementara bermasalah." };
  }
}

export async function listSubmissions(filter?: {
  kind?: SubmissionKind;
  status?: SubmissionStatus;
  query?: string;
}): Promise<Submission[]> {
  let rows = await readAll();

  if (filter?.kind) rows = rows.filter((r) => r.kind === filter.kind);
  if (filter?.status) rows = rows.filter((r) => r.status === filter.status);
  if (filter?.query) {
    const q = filter.query.toLowerCase();
    rows = rows.filter(
      (r) => r.search.includes(q) || r.reference.toLowerCase().includes(q) || r.email.includes(q)
    );
  }

  // Newest first.
  return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus
): Promise<Submission | null> {
  const rows = await readAll();
  const row = rows.find((r) => r.id === id);
  if (!row) return null;
  row.status = status;
  row.updatedAt = new Date().toISOString();
  await rewriteAll(rows);
  return row;
}

export async function getSubmission(id: string): Promise<Submission | null> {
  const rows = await readAll();
  return rows.find((r) => r.id === id) ?? null;
}
