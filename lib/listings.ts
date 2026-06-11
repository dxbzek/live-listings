/* ===== ABDUL FAIZAL — listing data + helpers =====
 * Ported from the design handoff (listings.js). The prototype-only
 * image-replace / FileReader affordances are intentionally dropped; photos
 * are served from their hosted (PropertyFinder CDN) URLs. Listing `name`
 * values are kept verbatim from the source PropertyFinder titles.
 */

export const WA = "971508419099";

export type Kind = "rent" | "sale";
export type PropType = "villa" | "apt" | "office";
export type Category = "rent" | "buy" | "crent" | "cbuy";

export interface RawListing {
  kind: Kind;
  name: string;
  area: string;
  type: PropType;
  tag: string;
  deal: string;
  spec: string;
  price: string;
  id: string;
  photos: string[];
  /* Optional explicit brochure URL/path. Usually unnecessary: dropping a PDF
   * named `<id>.pdf` (or `<slug>.pdf`) into public/brochures/ is auto-detected. */
  brochure?: string;
}

export interface Listing extends RawListing {
  src: string | null;
  cat: Category;
  commercial: boolean;
  gallery: string[]; // real, hosted photos only
  slug: string; // clean URL segment for /listing/<slug>
}

/* Real PropertyFinder CDN photos: listing key + image UUIDs.
 * Always the 668x452 JPG thumbnail rendition — the one PropertyFinder serves
 * cross-origin. The larger gallery renditions (e.g. 1312x894 WebP) are
 * hotlink-protected and 403 when embedded off propertyfinder.ae, so don't
 * switch to them here. */
const pfimg = (key: string, uuid: string) =>
  `https://static.shared.propertyfinder.ae/media/images/listing/${key}/${uuid}/668x452.jpg`;
const pf = (key: string, uuids: string[]) => uuids.map((u) => pfimg(key, u));

const RAW: RawListing[] = [
  // RENT
  { kind: "rent", name: "NEWLY RENOVATED | VACANT | 2 BEDROOM + MAID", area: "The Springs", type: "villa", tag: "Vacant", deal: "NEWLY RENOVATED", spec: "2 Bed + Maid · 3 Bath · 1,630 sqft", price: "190,000", id: "r-01-springs8", photos: pf("K7DMJ0FZB7HAMDPEAS95605RP0", ["54c2b3ec-e92a-4065-ac3e-44d54559d645", "d1429c23-63c7-4457-83a3-71495c781f7b", "c89a69ad-9cf7-4335-8d33-98d3c0546c22"]) },
  { kind: "rent", name: "Renovated 2BR | Full Sea View | Palm", area: "Palm Jumeirah", type: "apt", tag: "Furnished", deal: "FULL SEA VIEW", spec: "2 Bed · 3 Bath · 1,778 sqft · Renovated", price: "250,000", id: "r-02-mr6", photos: [...pf("0725Z7WMTS7PXJH9G4T4ZSVFT0", ["184b2f28-1927-4246-8e76-4264e47452e0", "bbdc58b9-6607-4337-a5fc-e6cc4464c95a"]), "https://graph-images.propertyfinder.ae/ae/building/4331/eca8c2f82be6287878c0cca67f60157f/watermark.jpeg"] },
  { kind: "rent", name: "Beachfront 4BR Villa | Atlantis View | Palm", area: "Palm · Garden Homes E", type: "villa", tag: "Luxe", deal: "ATLANTIS VIEW", spec: "4 Bed + Maid · 5 Bath · 6,698 sqft", price: "1,500,000", id: "r-03-frond-e", photos: pf("FGDEVPPPKVEWEBW0MGZR4D011C", ["09d544aa-e636-43b0-b9be-7754721f81fa", "4e5b9e0d-23b2-4e7a-b1e7-9713e9ccc501", "1ec9a0c2-a597-4ef3-bdf3-d3f296d5a1c1"]) },
  { kind: "rent", name: "Sea View | Elegant 2BR | Prime Location", area: "Palm · Marina Residences 6", type: "apt", tag: "Sea View", deal: "PRIME LOCATION", spec: "2 Bed · 3 Bath · 1,745 sqft · Sea View", price: "230,000", id: "r-07-mr6-2br", photos: pf("R6V3HHRMX1B1KJNZBGP55Y0N3C", ["b8c91d0f-189e-4c2e-ab37-da4ca3559059", "439af097-1f34-48fb-8026-2f54a6f72aa8", "0db8b48e-0e45-4aa0-8879-ad65182aa98d"]) },
  { kind: "rent", name: "Luxury 4BR Villa | Private Beach | Palm", area: "Palm · Garden Homes C", type: "villa", tag: "Furnished", deal: "PRIVATE BEACH", spec: "4 Bed + Maid · 5 Bath · 6,718 sqft", price: "900,000", id: "r-04-frond-c", photos: pf("0MARXYHA1RZT87FPEQ41M91BAM", ["4eca17c3-4244-42b3-b8f7-44bf017989e2", "5bccecc8-f5e5-4101-93a0-eb131dfcca65", "65fd37c7-f62d-4355-88b7-0f7b88a03b56"]) },
  { kind: "rent", name: "MULTIPLE CHEQUES | FULLY FURNISHED | TIME PLACE", area: "Dubai Marina", type: "apt", tag: "Furnished", deal: "MULTIPLE CHEQUES", spec: "1 Bed · 2 Bath · 703 sqft · Fully Furnished", price: "77,000", id: "r-08-timeplace", photos: pf("B0DT4JW3JAWVRS07BV0CSRZJF0", ["4dacac3d-999c-42c2-8e4f-4debc4bfcb57", "d86116ca-d236-4366-bc21-2571e21b4d5c", "4daacf09-1436-432f-82ad-6658b47a78e3"]) },
  { kind: "rent", name: "Luxury Palm Villa | 5BR | Sea View", area: "Palm · Garden Homes E", type: "villa", tag: "Luxe", deal: "PRIVATE BEACH", spec: "5 Bed · 6 Bath · 6,702 sqft · Sea View", price: "1,250,000", id: "r-09-frond-e5", photos: pf("CKD19RCF9CZ1B2RB80RNYTE85C", ["a60145d2-3d0b-4842-90b5-0f62b40ee232", "edef0d88-2529-46ae-8735-454ca2561c81", "5e7f513b-c11a-4c37-9a87-07243027a481"]) },
  { kind: "rent", name: "FULLY UPGRADED | VACANT | ATLANTIS VIEW", area: "Palm · Garden Homes M", type: "villa", tag: "Vacant", deal: "ATLANTIS VIEW", spec: "6 Bed · 6 Bath · 6,699 sqft · Fully Upgraded", price: "2,400,000", id: "r-10-frond-m", photos: pf("W1P1Q6XKNJPRW2XDRFZDHQJQM0", ["d8c9cdfd-1f02-4da8-81ba-303c9c5fa558", "5665ac7d-9c05-4709-9b78-c416fcc6c832", "950fb228-d050-408c-aa05-06c6bdb15ade"]) },
  { kind: "rent", name: "Fully Furnished Villa | Private Beach | Palm", area: "Palm · Signature Villas K", type: "villa", tag: "Furnished", deal: "PRIVATE BEACH", spec: "6 Bed · 7 Bath · 13,401 sqft · Fully Furnished", price: "2,000,000", id: "r-11-sig-k", photos: pf("QNX1NBS7SQ82X8RP4TAEV20R6M", ["54ee5630-7c14-4255-b772-6668d7964c12", "3fdacd56-8bf0-4d30-bbb3-14ecfe3264df", "30a8d339-de1c-4cfe-98fa-6557f433ae50"]) },
  { kind: "rent", name: "FULL SEA VIEW | FULLY FURNISHED | RENOVATED", area: "Palm · Marina Residences 6", type: "apt", tag: "Furnished", deal: "RENOVATED", spec: "3 Bed · 3 Bath · 2,439 sqft · Full Sea View", price: "400,000", id: "r-12-mr6-3br", photos: pf("2YX81WMR6E0ZJTFT5NQ4AXAH3G", ["60ed36be-c483-4bca-af74-c7a1c6babd97", "0081b6b4-f5e1-49be-9b0e-aa6cada6c44c", "9c249ed2-0ddf-41d0-8445-29831da19ee9"]) },
  { kind: "rent", name: "Premium Office Space | Onyx Tower 2 | Fitted", area: "The Greens · Onyx Tower 2", type: "office", tag: "Fitted", deal: "FURNISHED", spec: "Office · Furnished · 1,220 sqft", price: "390,000", id: "r-06-onyx", photos: pf("D5DC62KEJS4RHJRN693G2754PW", ["725081d4-2c9e-4a95-9f5c-621c2915fa38", "d3fe43c9-5509-4339-96ab-1d2ca9f66673", "ba746a17-9b28-4f24-a74d-c408ba5e241e"]) },
  { kind: "rent", name: "Jumeirah Park Villa | Private Pool | Furnished", area: "Jumeirah Park · Regional", type: "villa", tag: "Furnished", deal: "PRIVATE POOL", spec: "4 Bed + Maid · 5 Bath · 7,965 sqft", price: "500,000", id: "r-13-jpark", photos: pf("ZVK4GDWP1BZVKRX60ZR8PY5PXR", ["46b85326-d4a8-489f-a852-bee8343cba09", "d029bf94-a3c6-4387-ae6f-cfe015c2ea2a", "8bc660e7-c0e0-4851-9680-bb01e98f3963"]) },
  { kind: "rent", name: "PRIVATE BEACH | SEA VIEW | PALM JUMEIRAH", area: "Palm · Garden Homes C", type: "villa", tag: "Vacant", deal: "SEA VIEW", spec: "4 Bed + Maid · 5 Bath · 6,718 sqft", price: "900,000", id: "r-14-frond-c2", photos: pf("K94D3E99RYEF4A7DARJ6CE2CX8", ["d53741b3-d854-48c1-9a7b-846539fff26a", "b7736d1b-b4bc-42d7-a1ea-ef1eb92eb685", "5cc428fe-1859-4c81-8c9e-7d7bea1f0340"]) },
  { kind: "rent", name: "BURJ VIEW | MULTIPLE CHEQUES | 2BR", area: "Downtown · Old Town", type: "apt", tag: "Vacant", deal: "BURJ VIEW", spec: "2 Bed · 2 Bath · 1,405 sqft", price: "190,000", id: "r-15-yansoon", photos: pf("133BKZYR6H16M8X5H47NY1Y0N8", ["0d272ce3-42b0-4fef-ab55-f68a935187c0", "3928b882-2626-414a-833d-3c4318e3ea90", "37794e39-9a55-4563-abb1-bf41b0fd1f10"]) },
  { kind: "rent", name: "Renovated 5BR Villa | Large Garden | Vacant", area: "Al Quoz 4", type: "villa", tag: "Vacant", deal: "LARGE GARDEN", spec: "5 Bed · 6 Bath · 10,000 sqft", price: "200,000", id: "r-16-alquoz", photos: pf("5MYAWMG0AMR6AR3NEHXTZK2FZ8", ["07ae87ea-c3b3-461e-9d3d-837144c847e8", "82cf9dc0-33af-4a32-b790-893a24c5bf5f", "489f3541-1d97-4b11-9e7b-1e578bedc7fd"]) },
  { kind: "rent", name: "Luxury Furnished Unit | FIVE Palm | Vacant", area: "Palm · FIVE Palm Jumeirah", type: "apt", tag: "Furnished", deal: "PRIVATE BEACH", spec: "3 Bed · 4 Bath · 2,325 sqft", price: "555,000", id: "r-17-fivepalm", photos: pf("7YMK549WY2GM3TZXQTC8PMMXCC", ["0d49f27d-f497-4e5a-9b95-9daea568a121", "55b6d01d-ceff-471d-874b-2d7ce170e632", "b7fc69f2-5157-4f38-9778-b3cf03d3fba1"]) },
  { kind: "rent", name: "1BR Rent Dubai Marina | 823 Sqft | DEC Towers", area: "Dubai Marina · DEC Towers", type: "apt", tag: "Vacant", deal: "MARINA WALK", spec: "1 Bed · 2 Bath · 823 sqft", price: "90,000", id: "r-18-dec2", photos: pf("V9NQRPCM13J47XHTKQX8E2Q34W", ["22900d15-73dc-4e25-9cf5-4d6eb1dd7d50", "e1771b94-e930-4f30-9335-5e0ae8e6deda", "00261bd1-1a96-4f0a-a38e-83fe1ff9a628"]) },
  { kind: "rent", name: "Property Managed | JVC Serenity Lakes", area: "JVC · Serenity Lakes 5", type: "apt", tag: "Managed", deal: "VACANT", spec: "2 Bed · 2 Bath · 986 sqft", price: "120,000", id: "r-19-serenity", photos: pf("9BGWH018R4WHMA330X84FCYK0R", ["a994c4d1-1ee3-42b6-9c95-971b7a05e989", "e6e9ad40-4542-4a0b-89dd-974166041040", "c33af327-a5f7-45e5-9fda-6efedfb6b61a"]) },
  { kind: "rent", name: "MULTIPLE CHEQUES | FITTED | REDUCED PRICE", area: "Barsha Heights · Cayan Business Center", type: "office", tag: "Fitted", deal: "REDUCED PRICE", spec: "Office · Furnished · 4,767 sqft", price: "1,000,000", id: "r-20-cayan", photos: pf("JDBEAQ6PG8Z1WAZW8C2Q9086WG", ["ee29cf2e-06af-4ccb-813b-047483af1266", "3a0c7e26-7c67-4f98-a8db-45a61154eb9a", "b77d2517-4e88-4c90-a1c4-299f7d6cfc34"]) },
  { kind: "rent", name: "Premium Office | Platinum Tower | JLT", area: "JLT · Platinum Tower", type: "office", tag: "Fitted", deal: "PRIME JLT", spec: "Office · 1,151 sqft", price: "190,000", id: "r-21-platinum", photos: pf("ASY11WKAT9VBS74FGYWYAQZYKM", ["ec443479-3fc0-46c4-89d3-ea20b5d4d299", "d6aa953f-a398-41dc-8090-44d82db1f485", "f4ba4e5b-adba-4174-8ac5-62f775f0c2ef"]) },
  { kind: "rent", name: "Labour Camp | Brand New | Ready to Occupy", area: "Jebel Ali · Industrial 1", type: "office", tag: "Brand New", deal: "READY TO OCCUPY", spec: "Labour Camp · 10 Bath · 19,999 sqft", price: "7,500,000", id: "r-22-mcag", photos: pf("S6H3NET7619FDDFW6C3WQDTDN4", ["536ef698-da75-4f4e-9854-5493531cb0a4", "db14c416-c658-4d73-ae36-7f793f0194ad", "5355a706-afa4-42e8-8236-6fc9b00f1ec0"]) },
  // SALE
  { kind: "sale", name: "Lake View Office Space | Vacant | Prime Location", area: "JLT · Platinum Tower", type: "office", tag: "Vacant", deal: "LAKE VIEW", spec: "Office · 1 Bath · 1,151 sqft", price: "2,750,000", id: "s-16-platinum", photos: pf("9NQB971KY3K48AMW142HDRD2WM", ["8de30ae2-9a39-49fa-b270-0fdc8a43c389", "14907d2a-7762-4f63-a8ee-a0d7e8b1ac08", "d23cb1d0-77fa-42a1-8be2-89a1ada993c2"]) },
  { kind: "sale", name: "2-in-1 Office | Barsha Heights TECOM | Near Metro", area: "Barsha Heights · Cayan Business Center", type: "office", tag: "Fitted", deal: "NEAR METRO", spec: "Office · Fitted · 4,767 sqft", price: "12,000,000", id: "s-17-cayan", photos: pf("M679V9W5Z6VBQ6B5369N409JAM", ["9fcc87a9-fd25-4c5a-a55a-dbdb03fee2b1", "f4311ea5-8055-4685-ac81-45fb168accda", "cf72cf71-7088-4135-9f13-3f004972f289"]) },
  { kind: "sale", name: "PRIVATE BEACH | SUNSET AND SEA VIEWS", area: "Palm · Garden Homes M", type: "villa", tag: "Luxe", deal: "SEA & SUNSET", spec: "4 Bed + Maid · 5 Bath · 7,384 sqft", price: "25,000,000", id: "s-08-frond-m", photos: pf("2BNXBYKMVZ2HCX5202FP9CBR2G", ["50721d57-4c68-4490-9055-4c2f7498ac26", "f4424ba3-bb6d-4394-baa6-3cdf2112e8f8", "6f885ffb-e9ae-4faa-bbd5-89bd04407c1e"]) },
  { kind: "sale", name: "RENOVATED | PRIVATE POOL | FULLY FURNISHED", area: "Jumeirah Park · Regional", type: "villa", tag: "Furnished", deal: "PRIVATE POOL", spec: "4 Bed + Maid · 5 Bath · 7,965 sqft", price: "11,000,000", id: "s-09-jpark", photos: pf("71ASHK8XBZ4MZYAWEN9JP9YTY0", ["4d41a088-362f-4f83-a1bb-e8f8475a5661", "2e11d281-3c77-4512-96f3-379c4767432e", "00847946-fe73-46a5-a560-60a7ea3b7253"]) },
  { kind: "sale", name: "HIGH FLOOR | PALM JUMEIRAH | SEA VIEW", area: "Palm · Marina Residences 6", type: "apt", tag: "Furnished", deal: "SEA VIEW", spec: "2 Bed · 2 Bath · 1,746 sqft", price: "4,500,000", id: "s-10-mr6", photos: pf("8F7DX5SW9KECE5R4N3NJ7MHC8C", ["1b346633-e946-4435-a478-1e61958ea28f", "8b5dd98c-8d28-4074-8911-8e977bd32846", "6de5a062-d157-42d8-b013-942eea35c5dc"]) },
  { kind: "sale", name: "GOLF COURSE VIEW | LARGE LAYOUT | 2 BATHS", area: "Dubai Sports City", type: "apt", tag: "Furnished", deal: "GOLF VIEW", spec: "2 Bed · 2 Bath · 881 sqft", price: "1,100,000", id: "s-11-giovanni", photos: pf("4HWDX73R8GWPGB7K4B44SPWA2M", ["5cad5e70-d529-445c-88e2-2c84986b27a3", "197c0182-382c-4273-bc67-6ec865165ab0", "427df0bd-2bd5-454b-8cb8-87c6b233c9e4"]) },
  { kind: "sale", name: "Luxury Family Villa | Palm Crown | Blue Horizon", area: "Palm · The Palm Crown", type: "villa", tag: "Luxe", deal: "PRIVATE POOL", spec: "6 Bed + Maid · 5 Bath · 7,395 sqft", price: "35,000,000", id: "s-12-palmcrown", photos: pf("S3SK15HPAZH0Z8Y6Q7EH7G8EGW", ["fed20987-b2f9-46f4-9fe3-5cdd0c5049c2", "a8eb7636-a8fa-4dda-9013-766035f27256", "e535292d-c0c6-4391-9446-63e832f74197"]) },
  { kind: "sale", name: "Best Priced 1BR | Vacant | Dubai Marina", area: "Dubai Marina · Time Place", type: "apt", tag: "Furnished", deal: "HIGH ROI", spec: "1 Bed · 1 Bath · 703 sqft", price: "1,100,000", id: "s-13-timeplace", photos: pf("67CHWSBQFNN53AZ2C4H6NWDADG", ["f8e998f1-d373-45c5-9324-885f707bb905", "36ed35b0-d42c-4d36-9dbf-057ade4b3b41", "0123e2b2-6d8b-4ccf-814a-7f897e5eb7ce"]) },
  { kind: "sale", name: "DEC Tower 2 | Vacant | High ROI Opportunity", area: "Dubai Marina · DEC Towers", type: "apt", tag: "Vacant", deal: "HIGH ROI", spec: "1 Bed · 2 Bath · 823 sqft", price: "990,000", id: "s-14-dec2", photos: pf("YKEA4528ZWP92Z34BK8JZ2WKBM", ["637bed23-6033-4e54-b9d7-abd08107c75e", "461e6228-3dd5-4b0a-bf6e-8b5d09201cbe", "b83329f4-a39f-4cc6-affd-72fdedd58219"]) },
  { kind: "sale", name: "Sea View | Type C | Luxury 2BR + Maid’s", area: "Palm · Marina Residences 3", type: "apt", tag: "Sea View", deal: "TYPE C", spec: "2 Bed + Maid · 2 Bath · 1,735 sqft", price: "4,600,000", id: "s-15-mr3", photos: pf("HQKXES0RMNXKY5YDGS4BDC6KMR", ["ffaa4d01-7b96-4f29-9136-a152a389a49b", "5c1ee69f-0fc4-401e-8b12-6cc34cdb838f", "bbd9c053-60c1-403b-a989-56f01ec218cf"]) },
  { kind: "sale", name: "Jumeirah Heights | Investor Deal | Lake View", area: "Jumeirah Islands · Heights", type: "apt", tag: "Furnished", deal: "LAKE VIEW", spec: "3 Bed · 3 Bath · 2,369 sqft", price: "4,600,000", id: "s-16-jheights", photos: pf("NY8MZV7JJ2BYGH0YENNY58F66G", ["0ef127e4-4098-4d25-a17f-6fbd0e83531b", "4ef6338a-4953-49b5-be0d-743e874d06c8", "4ad58c3c-67f3-4be6-9f6d-44631be9d2ee"]) },
  { kind: "sale", name: "Brand New 2BR | Spacious | Aladdin Living Legends", area: "Living Legends · Aladdin", type: "apt", tag: "Brand New", deal: "BRAND NEW", spec: "2 Bed · 3 Bath · 1,446 sqft", price: "1,350,000", id: "s-17-aladdin", photos: pf("JSPZ9TMK5PQVCY0CT3N8BKFN9C", ["d1d15f3f-0a04-49fc-9083-e0a424f85018", "808362a7-727d-4592-939e-11e7de6f1d6e", "8ba66288-d41f-499b-923e-0f8c5ab27ec4"]) },
  { kind: "sale", name: "Full Sea View | Spacious | Marina Residence", area: "Palm · Marina Residences 5", type: "apt", tag: "Sea View", deal: "FULL SEA VIEW", spec: "2 Bed · 2 Bath · 1,735 sqft", price: "4,000,000", id: "s-18-mr5", photos: pf("V6D1J39CS1WEWFGMVW0TB8GFG4", ["3984286c-6239-4ac2-a1f3-a1931d7fb9bd", "fca728a9-b8ce-4f38-9a7f-db5bf76cdac0", "43bb9823-01c3-41a0-acbb-d03cdd56488b"]) },
];

const isHosted = (src: string) => /^https?:\/\//i.test(src);

/* Clean URL segment from a listing name: lowercase, ascii, dash-separated,
 * capped at 8 words. e.g. "Renovated 2BR | Full Sea View | Palm"
 * → "renovated-2br-full-sea-view-palm". */
const slugify = (s: string) =>
  s
    .normalize("NFKD")
    .toLowerCase()
    .replace(/['’"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .split("-")
    .slice(0, 8)
    .join("-");

/* Normalize: cover = first hosted photo; derive 4-way category + slug. */
const slugCounts = new Map<string, number>();
export const LISTINGS: Listing[] = RAW.map((l) => {
  const gallery = l.photos.filter(isHosted);
  const commercial = l.type === "office";
  const cat: Category = commercial
    ? l.kind === "rent"
      ? "crent"
      : "cbuy"
    : l.kind === "rent"
    ? "rent"
    : "buy";
  const base = slugify(l.name) || l.id;
  const n = (slugCounts.get(base) ?? 0) + 1;
  slugCounts.set(base, n);
  return {
    ...l,
    gallery,
    src: gallery[0] || null,
    commercial,
    cat,
    slug: n === 1 ? base : `${base}-${n}`,
  };
});

export const bySlug = (slug: string) => LISTINGS.find((l) => l.slug === slug);

export const listingPath = (l: Listing) => `/listing/${l.slug}`;

export interface Group {
  key: Category;
  n: string;
  title: string;
  desc: string;
}

/* Four categories, in dropdown order */
export const GROUPS: Group[] = [
  { key: "rent", n: "01", title: "For Rent", desc: "Annual-lease homes across Palm Jumeirah, The Springs, The Greens and beyond." },
  { key: "buy", n: "02", title: "For Sale", desc: "Buy-side opportunities across Dubai, entry buy-to-let through trophy waterfront, priced low to high." },
  { key: "crent", n: "03", title: "Commercial Rent", desc: "Fitted offices and business space across Dubai’s prime commercial districts." },
  { key: "cbuy", n: "04", title: "Commercial Buy", desc: "Commercial assets available for acquisition across Dubai." },
];

export const KIND_LABEL: Record<Category, string> = {
  rent: "For Rent",
  buy: "For Sale",
  crent: "Commercial Rent",
  cbuy: "Commercial Buy",
};

export const catCount = (k: Category) => LISTINGS.filter((l) => l.cat === k).length;

export function waLink(l: Listing) {
  const kindWord = l.kind === "rent" ? "rent" : "sale";
  const priceStr = l.kind === "rent" ? `AED ${l.price}/yr` : `AED ${l.price}`;
  const msg = `Hi Abdul, I'm interested in the ${l.name} (${l.area}) for ${kindWord}, ${priceStr}. Is it still available?`;
  return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
}

/* Listings grouped by category, each group sorted by price ascending. */
export function groupedListings() {
  return GROUPS.map((g) => ({
    group: g,
    items: LISTINGS.filter((l) => l.cat === g.key).sort(
      (a, b) => parseInt(a.price.replace(/,/g, ""), 10) - parseInt(b.price.replace(/,/g, ""), 10)
    ),
  })).filter((x) => x.items.length > 0);
}
