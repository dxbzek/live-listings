"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, ShareIcon } from "./icons";

/* Native share sheet where available (mobile), clipboard copy elsewhere. */
export default function ShareButton({
  url,
  title,
  text,
  variant = "label",
}: {
  url: string; // site-relative path, resolved against the current origin
  title: string;
  text?: string;
  variant?: "icon" | "label";
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const share = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const abs = new URL(url, window.location.origin).toString();
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: abs });
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return; // user dismissed sheet
      }
    }
    try {
      await navigator.clipboard.writeText(abs);
    } catch {
      window.prompt("Copy this link:", abs);
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      className={`share-btn ${variant}${copied ? " copied" : ""}`}
      onClick={share}
      aria-label="Share this listing"
      title="Share this listing"
    >
      {copied ? <CheckIcon /> : <ShareIcon />}
      {variant === "label" && <span>{copied ? "Link copied" : "Share"}</span>}
      {variant === "icon" && copied && <span className="share-pop">Link copied</span>}
    </button>
  );
}
