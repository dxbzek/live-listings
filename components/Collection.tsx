"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { WhatsAppIcon, CameraIcon } from "./icons";
import ShareButton from "./ShareButton";
import {
  LISTINGS,
  KIND_LABEL,
  catCount,
  groupedListings,
  listingPath,
  waLink,
  type Category,
  type Listing,
} from "@/lib/listings";

type Filter = Category | "all";

const FILTERS: { key: Filter; label: string; count: number }[] = [
  { key: "all", label: "All", count: LISTINGS.length },
  { key: "rent", label: "Rent", count: catCount("rent") },
  { key: "buy", label: "Buy", count: catCount("buy") },
  { key: "crent", label: "Commercial rent", count: catCount("crent") },
  { key: "cbuy", label: "Commercial buy", count: catCount("cbuy") },
];

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

function Card({ l, onOpen }: { l: Listing; onOpen: (l: Listing) => void }) {
  const [coverError, setCoverError] = useState(false);
  const hasGallery = l.gallery.length > 0;
  return (
    <article className="card" data-cat={l.cat}>
      <div
        className={`card-img${hasGallery ? " has-gallery" : ""}`}
        onClick={hasGallery ? () => onOpen(l) : undefined}
      >
        <div className="tag">{l.tag}</div>
        <div className="deal">{l.deal}</div>
        <div className="ph">
          <div className="ph-glyph" />
        </div>
        {l.src && !coverError && (
          <img
            className="cover"
            src={l.src}
            alt={l.name}
            loading="lazy"
            onError={() => setCoverError(true)}
          />
        )}
        {l.gallery.length > 1 && (
          <div className="shots">
            <CameraIcon />
            <span>{l.gallery.length}</span>
          </div>
        )}
        <a
          className="enquire"
          href={waLink(l)}
          target="_blank"
          rel="noopener"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Enquire on WhatsApp</span>
          <WhatsAppIcon />
        </a>
      </div>
      <div className="card-body">
        <div className="card-area">
          <span className={`type-mark type-${l.type}`} />
          {l.area}
        </div>
        <Link className="card-name" href={listingPath(l)}>
          {l.name}
        </Link>
        <div className="card-spec">
          <Spec spec={l.spec} />
        </div>
        <div className="card-foot">
          <div className="card-price">
            <div className="lbl">{l.kind === "rent" ? "AED / Year" : "Asking · AED"}</div>
            <div className="v">{l.price}</div>
          </div>
          <span className={`card-kind ${l.kind}`}>{KIND_LABEL[l.cat]}</span>
        </div>
        <div className="card-links">
          <Link className="card-pf" href={listingPath(l)}>
            Details &amp; brochure <span className="ar">→</span>
          </Link>
          <ShareButton
            url={listingPath(l)}
            title={`${l.name} · ${l.area}`}
            text={`${KIND_LABEL[l.cat]} · ${l.spec} · AED ${l.price}${l.kind === "rent" ? "/yr" : ""} — via Abdul Kadir Faizal`}
            variant="icon"
          />
        </div>
      </div>
    </article>
  );
}

function Lightbox({
  listing,
  photoIdx,
  setPhotoIdx,
  onClose,
}: {
  listing: Listing;
  photoIdx: number;
  setPhotoIdx: (fn: (p: number) => number) => void;
  onClose: () => void;
}) {
  const photos = listing.gallery;
  const total = photos.length;
  const idx = ((photoIdx % total) + total) % total;
  const multi = total > 1;
  const [err, setErr] = useState(false);

  const step = useCallback((d: number) => setPhotoIdx((p) => p + d), [setPhotoIdx]);

  useEffect(() => {
    setErr(false);
  }, [idx]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, step]);

  const priceStr = listing.kind === "rent" ? `AED ${listing.price} / yr` : `AED ${listing.price}`;

  return (
    <div
      className="lightbox open"
      onClick={(e) => {
        const t = e.target as HTMLElement;
        if (t.classList.contains("lightbox") || t.classList.contains("lb-stage")) onClose();
      }}
    >
      <button type="button" className="lb-close" aria-label="Close" onClick={onClose}>
        &times;
      </button>
      {multi && (
        <>
          <button type="button" className="lb-nav lb-prev" aria-label="Previous" onClick={() => step(-1)}>
            &#8249;
          </button>
          <button type="button" className="lb-nav lb-next" aria-label="Next" onClick={() => step(1)}>
            &#8250;
          </button>
        </>
      )}
      <div className="lb-stage">
        <div className="lb-head">
          <div className="lb-title">{listing.name}</div>
          <div className="lb-meta">
            {listing.area} · {priceStr} · {idx + 1}/{total}
          </div>
        </div>
        <div className="lb-imgwrap">
          <img
            className={`lb-img${err ? " lb-img-error" : ""}`}
            src={photos[idx]}
            alt={`${listing.name}, photo ${idx + 1}`}
            onError={() => setErr(true)}
          />
        </div>
        {multi && (
          <div className="lb-thumbs">
            {photos.map((src, i) => (
              <button
                key={i}
                type="button"
                className={`lb-thumb${i === idx ? " on" : ""}`}
                onClick={() => setPhotoIdx(() => i)}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
        <div className="lb-ctas">
          <a className="lb-cta" href={waLink(listing)} target="_blank" rel="noopener">
            <WhatsAppIcon />
            <span>Enquire on WhatsApp</span>
          </a>
          <Link className="lb-pf" href={listingPath(listing)}>
            Details &amp; brochure <span className="ar">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Collection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Listing | null>(null);
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    // Honour ?cat= from header navigation off the listing pages.
    const cat = new URLSearchParams(window.location.search).get("cat");
    if (cat && FILTERS.some((f) => f.key === cat)) setFilter(cat as Filter);
    const onSet = (e: Event) => setFilter((e as CustomEvent<Filter>).detail);
    window.addEventListener("set-filter", onSet);
    return () => window.removeEventListener("set-filter", onSet);
  }, []);

  const grouped = groupedListings();
  const visible = filter === "all" ? grouped : grouped.filter((g) => g.group.key === filter);
  const isEmpty = visible.length === 0;

  const openGallery = (l: Listing) => {
    setOpen(l);
    setPhotoIdx(0);
  };

  return (
    <section className="listings" id="listings">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="l-part">The Collection · For Sale &amp; For Rent</div>
            <h2>
              EVERY <span className="gold">ADDRESS.</span>
            </h2>
          </div>
          <div className="filter">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={filter === f.key ? "active" : undefined}
                onClick={() => setFilter(f.key)}
              >
                {f.label} <span className="c">{f.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid">
          {visible.map(({ group, items }) => (
            <Fragment key={group.key}>
              <div className="inv-divider">
                <span className="inv-n">{group.n}</span>
                <div className="inv-tx">
                  <div className="inv-title">{group.title}</div>
                  <div className="inv-desc">{group.desc}</div>
                </div>
              </div>
              {items.map((l) => (
                <Card key={l.id} l={l} onOpen={openGallery} />
              ))}
            </Fragment>
          ))}
        </div>
        <div className={`empty-note${isEmpty ? " show" : ""}`}>No listings in this view.</div>
      </div>

      {open && (
        <Lightbox
          listing={open}
          photoIdx={photoIdx}
          setPhotoIdx={setPhotoIdx}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
