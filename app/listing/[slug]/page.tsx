import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import DetailGallery from "@/components/DetailGallery";
import ShareButton from "@/components/ShareButton";
import { DownloadIcon, WhatsAppIcon } from "@/components/icons";
import { brochureFor } from "@/lib/brochures";
import { bySlug, KIND_LABEL, LISTINGS, listingPath, WA, waLink, type Listing } from "@/lib/listings";

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ slug: l.slug }));
}

const priceLine = (l: Listing) => (l.kind === "rent" ? `AED ${l.price} / yr` : `AED ${l.price}`);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = bySlug(slug);
  if (!l) return {};
  const title = `${l.name} · ${l.area}`;
  const description = `${KIND_LABEL[l.cat]} · ${l.spec} · ${priceLine(l)}. Enquire directly with Abdul Kadir Faizal on WhatsApp.`;
  return {
    title,
    description,
    alternates: { canonical: listingPath(l) },
    openGraph: {
      title,
      description,
      url: listingPath(l),
      type: "article",
      images: l.src ? [{ url: l.src, width: 668, height: 452, alt: l.name }] : undefined,
    },
    twitter: { card: "summary_large_image" },
  };
}

function Spec({ spec }: { spec: string }) {
  const parts = spec.split("·");
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {p}
          {i < parts.length - 1 && <span className="sep">·</span>}
        </Fragment>
      ))}
    </>
  );
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = bySlug(slug);
  if (!l) notFound();

  const brochure = brochureFor(l);
  const shareTitle = `${l.name} · ${l.area}`;
  const shareText = `${KIND_LABEL[l.cat]} · ${l.spec} · ${priceLine(l)} — via Abdul Kadir Faizal`;
  const brochureAsk = `https://wa.me/${WA}?text=${encodeURIComponent(
    `Hi Abdul, could you send me the brochure for ${l.name} (${l.area})?`
  )}`;

  return (
    <>
      <div className="announce">JUNE 2026 LISTINGS LIVE</div>

      <Header />

      <main className="detail">
        <div className="wrap">
          <div className="detail-top">
            <Link href="/#listings" className="back">
              <span className="ar">←</span> All listings
            </Link>
            <ShareButton url={listingPath(l)} title={shareTitle} text={shareText} variant="label" />
          </div>

          <div className="detail-grid">
            <div className="detail-media">
              <DetailGallery listing={l} />
            </div>

            <aside className="detail-panel">
              <div className="d-area">
                <span className={`type-mark type-${l.type}`} />
                {l.area}
              </div>
              <h1 className="d-name">{l.name}</h1>
              <div className="d-badges">
                <span className={`card-kind ${l.kind}`}>{KIND_LABEL[l.cat]}</span>
                <span className="d-tag">{l.tag}</span>
                <span className="d-deal">{l.deal}</span>
              </div>
              <div className="d-spec">
                <Spec spec={l.spec} />
              </div>
              <div className="d-price">
                <div className="lbl">{l.kind === "rent" ? "AED / Year" : "Asking · AED"}</div>
                <div className="v">{l.price}</div>
              </div>
              <div className="d-ctas">
                <a className="btn-wa lg" href={waLink(l)} target="_blank" rel="noopener">
                  <WhatsAppIcon />
                  Enquire on WhatsApp
                </a>
                {brochure ? (
                  <a className="btn-dl" href={brochure} download>
                    <DownloadIcon />
                    Download brochure (PDF)
                  </a>
                ) : (
                  <a className="btn-dl ask" href={brochureAsk} target="_blank" rel="noopener">
                    <DownloadIcon />
                    Brochure on request
                  </a>
                )}
              </div>
              <p className="d-note">
                Direct with Abdul Kadir Faizal · 18 years in Dubai · No call centres.
              </p>
            </aside>
          </div>

          {brochure && (
            <section className="brochure">
              <div className="b-head">
                <div>
                  <div className="kicker">Full details</div>
                  <h2>
                    THE <span className="gold">BROCHURE.</span>
                  </h2>
                </div>
                <a className="btn-dl" href={brochure} download>
                  <DownloadIcon />
                  Download PDF
                </a>
              </div>
              <object className="b-frame" data={brochure} type="application/pdf" aria-label={`${l.name} brochure`}>
                <p>
                  Your browser can&apos;t preview PDFs.{" "}
                  <a href={brochure} download>
                    Download the brochure
                  </a>{" "}
                  instead.
                </p>
              </object>
            </section>
          )}
        </div>
      </main>

      <footer className="site">
        <div className="wrap foot-bar">
          <span>Abdul Kadir Faizal · Dubai Real Estate</span>
          <span>Top Listings · June 2026</span>
          <a href="https://instagram.com/akfinspire" target="_blank" rel="noopener">
            @akfinspire
          </a>
        </div>
      </footer>

      <a className="fab" href={waLink(l)} target="_blank" rel="noopener">
        <WhatsAppIcon />
        <span className="lbl">Message Abdul</span>
      </a>
    </>
  );
}
