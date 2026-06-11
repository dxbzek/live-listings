# Brochures — how to upload

Drop a **PDF** in this folder named after the listing's `id` from
[`lib/listings.ts`](../../lib/listings.ts), for example:

```
public/brochures/r-01-springs8.pdf
public/brochures/s-12-palmcrown.pdf
```

That's it — after the next deploy, the brochure automatically appears on that
listing's page (`/listing/<slug>`) as an embedded viewer plus a download
button. No code changes needed. Naming by the listing's URL slug
(e.g. `renovated-2br-full-sea-view-palm.pdf`) also works.

## Easiest way to upload (no tools needed)

1. Open this folder on GitHub: `public/brochures/`
2. Click **Add file → Upload files**
3. Drag the PDF in (renamed to the listing id, e.g. `r-02-mr6.pdf`)
4. Commit — Vercel redeploys automatically and the brochure goes live.

Until a brochure is uploaded, the listing page shows a
"Brochure on request" button that opens WhatsApp instead.
