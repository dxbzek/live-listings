# Abdul Kadir Faizal — Dubai Property Landing Page

A single-page marketing site for **Abdul Kadir Faizal**, an independent Dubai
real-estate agent. Every interaction funnels into **WhatsApp** — there is no
backend; all "submit" actions deep-link to `wa.me`.

Built with **Next.js (App Router) + TypeScript**, ready to deploy on **Vercel**.

## Sections
Announcement bar · sticky header with a Listings mega-dropdown · hero ·
filterable listings grid (Rent / Buy / Commercial rent / Commercial buy,
grouped & sorted by price) · WhatsApp lead-qualifier form · "Why Dubai now"
stats band · FAQ accordion · contact section with agent card · footer ·
sticky WhatsApp FAB · full-screen photo lightbox · per-listing detail pages
with shareable clean URLs and embedded brochures.

## Listing pages, share links & brochures
Every listing has its own clean URL at `/listing/<slug>` (slug derived from
the listing name), with photo gallery, WhatsApp CTA and rich link previews
(Open Graph) so shared links show the cover photo on WhatsApp/social.

Each card and detail page has a **Share** button — native share sheet on
mobile, copy-to-clipboard on desktop.

**Brochures:** drop a PDF into [`public/brochures/`](public/brochures/) named
after the listing `id` (e.g. `r-01-springs8.pdf`) and it automatically shows
up on that listing's page as an embedded viewer + download button after the
next deploy. See [`public/brochures/README.md`](public/brochures/README.md)
for the upload steps (GitHub → Add file → Upload files). Listings without a
brochure show a "Brochure on request" WhatsApp button instead.

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build
```bash
npm run build
npm run start
```

## Deploy to Vercel
1. Push this repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new) — Vercel
   auto-detects Next.js; no configuration needed.
3. Deploy.

Or from the CLI: `npx vercel` (and `npx vercel --prod` for production).

## Editing listings
All listing data lives in [`lib/listings.ts`](lib/listings.ts) (the `RAW`
array and `GROUPS`). Each listing carries 3 photos (currently hosted on the
PropertyFinder CDN; swap them for your own hosted image URLs over time).
Note: a listing's URL slug is derived from its `name`, so renaming a listing
changes its share URL.

The WhatsApp number is the `WA` constant in `lib/listings.ts`.

## Notes
The original design handoff included prototype-only, in-browser image-replace /
"Add Photo" controls (an `<image-slot>` web component). Per the handoff, those
were dropped here — photos come from the data source instead.
