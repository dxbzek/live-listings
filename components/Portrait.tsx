"use client";

import { useState } from "react";

/* Renders Abdul's portrait inside the agent card. If the image file isn't
 * present yet, it hides itself and the on-brand placeholder frame shows. */
export default function Portrait({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return <img className="cover" src={src} alt={alt} onError={() => setOk(false)} />;
}
