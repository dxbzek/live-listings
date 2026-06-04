"use client";

import { useState } from "react";
import { WhatsAppIcon, CheckIcon } from "./icons";
import { WA } from "@/lib/listings";

const BUDGETS = [
  "Under AED 1M",
  "AED 1M – 3M",
  "AED 3M – 6M",
  "AED 6M – 12M",
  "AED 12M+",
  "Rental, under AED 250K/yr",
  "Rental, AED 250K – 600K/yr",
  "Rental, AED 600K+/yr",
];

const INTENTS = ["Buy", "Rent", "Invest"] as const;

export default function LeadForm() {
  const [intent, setIntent] = useState<(typeof INTENTS)[number]>("Buy");
  const [budget, setBudget] = useState("");
  const [area, setArea] = useState("");
  const [name, setName] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    let msg = `Hi Abdul, ` + (name.trim() ? `I'm ${name.trim()}. ` : "");
    msg += `I'm looking to ${intent.toLowerCase()} in Dubai.`;
    if (budget) msg += ` Budget: ${budget}.`;
    if (area.trim()) msg += ` Interested in: ${area.trim()}.`;
    msg += ` Please send me the matching options.`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  return (
    <section className="band lead" id="match">
      <div className="wrap lead-grid">
        <div className="lead-copy">
          <h2>
            TELL ME WHAT
            <br />
            YOU&apos;RE <span className="gold">AFTER.</span>
          </h2>
          <p>
            Three quick answers and I&apos;ll send you a tailored shortlist, matched to your budget,
            your goal and the areas that actually fit. Straight to your WhatsApp.
          </p>
          <div className="assure">
            <div className="a">
              <CheckIcon />
              No spam, no call centre, you message me directly
            </div>
            <div className="a">
              <CheckIcon />
              Honest read on every option, including the ones to skip
            </div>
            <div className="a">
              <CheckIcon />
              Remote buyers welcome, deals close without you in Dubai
            </div>
          </div>
        </div>

        <form className="qform" onSubmit={submit}>
          <div className="frow">
            <label>I&apos;m looking to</label>
            <div className="seg">
              {INTENTS.map((v) => (
                <button
                  key={v}
                  type="button"
                  className={intent === v ? "on" : undefined}
                  onClick={() => setIntent(v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className="frow">
            <label htmlFor="q-budget">Budget</label>
            <select id="q-budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="">Select a range</option>
              {BUDGETS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="frow">
            <label htmlFor="q-area">
              Area or property type <span className="opt">(optional)</span>
            </label>
            <input
              id="q-area"
              type="text"
              placeholder="e.g. Palm villa, Marina apartment, off-plan…"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div className="frow">
            <label htmlFor="q-name">
              Your name <span className="opt">(optional)</span>
            </label>
            <input
              id="q-name"
              type="text"
              placeholder="So I know who I'm talking to"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit" className="submit">
            <WhatsAppIcon />
            Send My Shortlist Request
          </button>
          <p className="fineprint">
            Opens WhatsApp with your details pre-filled · No data stored on this page
          </p>
        </form>
      </div>
    </section>
  );
}
