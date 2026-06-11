"use client";

import { useState } from "react";
import type { Listing } from "@/lib/listings";

export default function DetailGallery({ listing }: { listing: Listing }) {
  const photos = listing.gallery;
  const [idx, setIdx] = useState(0);
  const [err, setErr] = useState(false);

  return (
    <div className="dgal">
      <div className="dgal-main">
        <div className="ph">
          <div className="ph-glyph" />
        </div>
        {photos[idx] && !err && (
          <img
            className="cover"
            src={photos[idx]}
            alt={`${listing.name} — photo ${idx + 1} of ${photos.length}`}
            onError={() => setErr(true)}
          />
        )}
        {photos.length > 1 && (
          <div className="dgal-count">
            {idx + 1} / {photos.length}
          </div>
        )}
      </div>
      {photos.length > 1 && (
        <div className="dgal-thumbs">
          {photos.map((src, i) => (
            <button
              key={i}
              type="button"
              className={i === idx ? "on" : undefined}
              aria-label={`Photo ${i + 1}`}
              onClick={() => {
                setIdx(i);
                setErr(false);
              }}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
