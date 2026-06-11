/* Server-only: resolve a listing's brochure PDF.
 *
 * Upload flow: drop a PDF into public/brochures/ named after the listing id
 * (e.g. "r-01-springs8.pdf") or its slug, redeploy, and it appears on the
 * listing page automatically — no code change needed. A `brochure` field on
 * the listing data overrides detection if you ever need a custom path/URL.
 */
import fs from "fs";
import path from "path";
import type { Listing } from "./listings";

const DIR = path.join(process.cwd(), "public", "brochures");

export function brochureFor(l: Listing): string | null {
  if (l.brochure) return l.brochure;
  let files: string[];
  try {
    files = fs.readdirSync(DIR);
  } catch {
    return null;
  }
  const wanted = new Set([`${l.id}.pdf`, `${l.slug}.pdf`]);
  const hit = files.find((f) => wanted.has(f.toLowerCase()));
  return hit ? `/brochures/${encodeURIComponent(hit)}` : null;
}
