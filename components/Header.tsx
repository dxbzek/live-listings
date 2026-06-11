"use client";

import { WhatsAppIcon } from "./icons";
import { WA, catCount, type Category } from "@/lib/listings";

function jump(cat: Category | "all") {
  const el = document.getElementById("listings");
  if (el) {
    window.dispatchEvent(new CustomEvent("set-filter", { detail: cat }));
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    // On a listing detail page: go home and let Collection pick up ?cat=.
    window.location.href = cat === "all" ? "/#listings" : `/?cat=${cat}#listings`;
  }
}

export default function Header() {
  return (
    <header className="site">
      <div className="wrap bar">
        <a href="/#top" className="mark">
          ABDUL <span className="accent">FAIZAL</span>
        </a>
        <nav className="nav">
          <div className="nav-dd">
            <button
              type="button"
              className="link nav-dd-trigger"
              onClick={() => jump("all")}
            >
              Listings{" "}
              <span className="dd-caret" aria-hidden="true">
                &#9662;
              </span>
            </button>
            <div className="nav-dd-menu">
              <div className="nav-dd-inner">
                <button type="button" className="dd-item" onClick={() => jump("rent")}>
                  Rent <span className="dd-c">{catCount("rent")}</span>
                </button>
                <button type="button" className="dd-item" onClick={() => jump("buy")}>
                  Buy <span className="dd-c">{catCount("buy")}</span>
                </button>
                <button type="button" className="dd-item" onClick={() => jump("crent")}>
                  Commercial rent <span className="dd-c">{catCount("crent")}</span>
                </button>
                <button type="button" className="dd-item" onClick={() => jump("cbuy")}>
                  Commercial buy <span className="dd-c">{catCount("cbuy")}</span>
                </button>
              </div>
            </div>
          </div>
          <a href="/#match" className="link">
            Get Matched
          </a>
          <a href="/#faq" className="link">
            FAQ
          </a>
          <a
            href={`https://wa.me/${WA}?text=${encodeURIComponent(
              "Hi Abdul, I'd like to talk about Dubai property."
            )}`}
            target="_blank"
            rel="noopener"
            className="btn-wa"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
