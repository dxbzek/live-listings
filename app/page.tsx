import Header from "@/components/Header";
import Collection from "@/components/Collection";
import LeadForm from "@/components/LeadForm";
import { WhatsAppIcon } from "@/components/icons";
import { LISTINGS, WA } from "@/lib/listings";

const heroSrc = LISTINGS.find((l) => l.id === "r-03-frond-e")?.src ?? null;

const FAQ = [
  {
    q: "Can foreigners actually own property in Dubai?",
    a: (
      <>
        Yes. In Dubai&apos;s designated <b>freehold areas</b>, Palm Jumeirah, Dubai Marina,
        Downtown and most communities you&apos;ll see here, overseas buyers get full, registered
        title in their own name. No local partner, no leasehold workaround.
      </>
    ),
    open: true,
  },
  {
    q: "Do I need to be in Dubai to buy?",
    a: (
      <>
        No. I close deals with clients I&apos;ve never met in person. Viewings can be done by video,
        paperwork is handled remotely, and you can buy and complete{" "}
        <b>without ever boarding a flight</b>, though you&apos;re always welcome to come see it.
      </>
    ),
    open: false,
  },
  {
    q: "What does it actually cost on top of the price?",
    a: (
      <>
        For a cash purchase, budget roughly <b>6.5% on top</b> of the price: 4% Dubai Land
        Department fee, ~2% agency, plus a trustee fee (~AED 4,200). Mortgage buyers add bank and
        registration fees on top, I&apos;ll walk you through the exact numbers for your deal before
        you commit.
      </>
    ),
    open: false,
  },
  {
    q: "Is my money safe on an off-plan purchase?",
    a: (
      <>
        Off-plan payments go into a <b>RERA-regulated escrow account</b> tied to construction
        milestones, the developer can&apos;t simply take the money up front. I still stress-test the
        developer&apos;s track record and the payment plan before recommending anything off-plan.
      </>
    ),
    open: false,
  },
  {
    q: "Should I buy now or wait for prices to fall further?",
    a: (
      <>
        Depends on your horizon. If you&apos;re holding three years or more, today&apos;s
        buyer&apos;s market, more supply, motivated sellers, real negotiating room, is the most
        thoughtful entry Dubai has offered in years. Message me your situation and I&apos;ll give
        you an <b>honest read</b>, even if that read is &quot;wait.&quot;
      </>
    ),
    open: false,
  },
];

export default function Page() {
  return (
    <>
      <div className="announce">JUNE 2026 LISTINGS LIVE</div>

      <Header />

      <a id="top" />

      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="pulse" />
              TOP LISTINGS · JUNE 2026
            </div>
            <h1 className="hero-title">
              BUY. RENT.
              <br />
              LIVE
              <br />
              <span className="gold">DUBAI.</span>
            </h1>
            <p className="hero-sub">
              I&apos;m <b>Abdul Kadir Faizal</b>, and for <b>18 years</b> I&apos;ve helped people
              buy, rent and invest across Palm Jumeirah, Dubai Marina and the communities
              everyone&apos;s chasing. No call centres, no runaround.
            </p>
            <div className="hero-cta">
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent(
                  "Hi Abdul, I'd like to talk about your June listings."
                )}`}
                target="_blank"
                rel="noopener"
                className="btn-wa lg"
              >
                <WhatsAppIcon />
                Talk to Abdul
              </a>
              <a href="#listings" className="btn-ghost">
                Browse Listings <span>↓</span>
              </a>
            </div>
            <div className="hero-trust">
              <div className="t">
                <span className="mk" />
                18 Years in Dubai
              </div>
              <div className="t">
                <span className="mk" />
                Dubai Property Specialist
              </div>
              <div className="t">
                <span className="mk" />
                Off-Plan &amp; Luxury Specialist
              </div>
            </div>
          </div>

          <div className="hero-media">
            <div className="ph">
              <div className="ph-glyph" />
            </div>
            {heroSrc && <img className="cover" src={heroSrc} alt="Featured Palm Jumeirah villa" />}
            <div className="badge">Featured · Palm Jumeirah</div>
            <div className="cap">
              <div className="n">Frond E Beach Villa</div>
              <div className="a">Garden Homes · Atlantis View</div>
            </div>
          </div>
        </div>
      </section>

      <Collection />

      <LeadForm />

      {/* WHY DUBAI NOW */}
      <section className="band dark">
        <div className="wrap">
          <div className="band-head center">
            <div className="kicker">Why now</div>
            <h2>
              THE WINDOW IS <span className="gold">OPEN.</span>
            </h2>
            <p>
              After five years of a seller&apos;s market, the leverage has shifted. More supply,
              real negotiating room, and a tax structure that still beats every prime market on
              earth.
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-cell">
              <div className="v">AED 252B</div>
              <div className="l">
                Dubai real-estate transactions, Q1 2026, up 31% year on year
              </div>
              <div className="s">Market data · Q1 2026</div>
            </div>
            <div className="stat-cell">
              <div className="v">0%</div>
              <div className="l">
                Capital-gains, income, property &amp; inheritance tax on your home
              </div>
              <div className="s">UAE tax structure</div>
            </div>
            <div className="stat-cell">
              <div className="v">AED 2M</div>
              <div className="l">Property purchase unlocks a renewable 10-year Golden Visa</div>
              <div className="s">Residency threshold</div>
            </div>
          </div>
          <p className="stats-foot">
            Figures reflect publicly reported Dubai market data · ask Abdul for the current read on
            your tier
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="band" id="faq">
        <div className="wrap">
          <div className="band-head center">
            <div className="kicker">Before you ask</div>
            <h2>
              STRAIGHT <span className="gold">ANSWERS.</span>
            </h2>
          </div>
          <div className="faq-list">
            {FAQ.map((item, i) => (
              <details className="faq-item" key={i} open={item.open}>
                <summary className="faq-q">
                  {item.q}
                  <span className="pm" />
                </summary>
                <div className="faq-a">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="wrap contact-grid">
          <div>
            <h2>
              LET&apos;S TALK <span className="gold">DUBAI.</span>
            </h2>
            <p className="lead-txt">
              Found something you like, or want me to source it off-market? Message me directly and
              I&apos;ll arrange a viewing, share the full pack, and walk you through the numbers.
            </p>
            <div className="cta-row">
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent(
                  "Hi Abdul, I'd like to book a viewing."
                )}`}
                target="_blank"
                rel="noopener"
                className="btn-wa invert lg"
              >
                <WhatsAppIcon />
                WhatsApp Abdul
              </a>
              <a href="mailto:abdul@erehomes.ae" className="btn-line">
                Email
              </a>
            </div>
          </div>

          <div className="agent-card">
            <div className="agent-portrait">
              <div className="ph">
                <div className="ph-glyph" />
              </div>
            </div>
            <div className="agent-info">
              <div className="nm">Abdul Kadir Faizal</div>
              <div className="role">Dubai Real Estate Specialist</div>
              <div className="rows">
                <div className="row">
                  <div className="l">WhatsApp</div>
                  <div className="vv">
                    <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener">
                      +971 50 841 9099
                    </a>
                  </div>
                </div>
                <div className="row">
                  <div className="l">Email</div>
                  <div className="vv">
                    <a href="mailto:abdul@erehomes.ae">abdul@erehomes.ae</a>
                  </div>
                </div>
                <div className="row">
                  <div className="l">Office</div>
                  <div className="vv">602, The Onyx Tower 2 · The Greens</div>
                </div>
                <div className="row">
                  <div className="l">Instagram</div>
                  <div className="vv">
                    <a href="https://instagram.com/akfinspire" target="_blank" rel="noopener">
                      @akfinspire
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site">
        <div className="wrap foot-bar">
          <span>Abdul Kadir Faizal · Dubai Real Estate</span>
          <span>Top Listings · June 2026</span>
          <a href="https://instagram.com/akfinspire" target="_blank" rel="noopener">
            @akfinspire
          </a>
        </div>
      </footer>

      {/* STICKY WHATSAPP FAB */}
      <a
        className="fab"
        href={`https://wa.me/${WA}?text=${encodeURIComponent(
          "Hi Abdul, I'd like to talk about Dubai property."
        )}`}
        target="_blank"
        rel="noopener"
      >
        <WhatsAppIcon />
        <span className="lbl">Message Abdul</span>
      </a>
    </>
  );
}
