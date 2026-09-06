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

export type Period = "yr" | "mo";

export interface RawListing {
  kind: Kind;
  /* Rent period straight from PropertyFinder (`price.type`): "yr" = yearly,
   * "mo" = monthly. Absent on sale listings. Never assume yearly. */
  per?: Period;
  name: string;
  area: string;
  type: PropType;
  tag: string;
  deal: string;
  spec: string;
  price: string;
  id: string;
  /* Trakheesi / RERA advertisement permit number. Dubai law: shown on every ad. */
  permit: string;
  /* PropertyFinder reference (EH-PF-xxxx). */
  ref: string;
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
  // RENT (residential then commercial)
  { kind: "rent", per: "yr", name: "Vacant | Fully Furnished | Golf View", area: "Dubai Sports City · Giovanni Boutique Suites", type: "apt", tag: "Furnished", deal: "GOLF VIEW", spec: "2 Bed · 2 Bath · 881 sqft · Furnished", price: "80,000", id: "r-eh-pf-1352", permit: "7117764484", ref: "EH-PF-1352", photos: pf("VQJ1DR3NJTGTD055ZM1DSFJQYR", ["bf7c7734-87fe-4aa9-bb1f-9556bd2deaa3", "8ac5fe45-b879-4d03-80db-b71a6570a1c4", "b49cd1d0-103a-4a0b-8674-c45854f88555", "755b814e-9ade-48d9-bf63-439fbe042506", "95d0fd0c-53d9-4bfc-9c4d-258ecf0aec1d", "5cf1a951-c44a-45ae-a5c5-f675d664d20d", "9b4b1ae1-dab9-4094-9a4b-7db24dbb4421", "d81bf469-b336-4752-a521-9bf2e978e9b6"]) },
  { kind: "rent", per: "mo", name: "PRIVATE BEACH | SEA VIEW | PALM JUMEIRAH", area: "Palm Jumeirah · Garden Homes Frond C", type: "villa", tag: "Furnished", deal: "PRIVATE BEACH", spec: "4 Bed · 5 Bath · 6,718 sqft · Furnished", price: "90,000", id: "r-eh-pf-1342", permit: "6953083810", ref: "EH-PF-1342", photos: pf("JSSFJ9V8NW9ZBMBX9FXH9GS378", ["3f3d6bba-d9e5-4506-bc5e-fe2de8eca186", "7b573e66-9ea4-4c14-aebc-5d5269d327cf", "f00668bd-c759-4e2b-962f-ba2de9e1f7b8", "664aed5c-f9df-423d-8f45-09130c603626", "e95c33b4-8f1c-4080-b9d5-c1b16354b3d6", "bdc4969a-ec9b-41ac-b714-4d28958b08a6", "f8e2552d-c6a8-4da7-ab09-2da9e0219975", "0ac0f25b-e73a-4d6b-a7fc-71b80ced3c0a"]) },
  { kind: "rent", per: "mo", name: "BR Signature Villa | Private Beach | Sea View", area: "Palm Jumeirah · Signature Villas Frond N", type: "villa", tag: "Furnished", deal: "PRIVATE BEACH", spec: "5 Bed · 6 Bath · 6,789 sqft · Furnished", price: "150,000", id: "r-eh-pf-1350", permit: "69273471153", ref: "EH-PF-1350", photos: pf("2734MET9TJBQ6C65S1Y2A7FVAG", ["b6c6c6e4-6aac-49d7-af22-ae7b18a9eb3d", "a76803ee-ad79-4bae-bb6e-3f180c403a93", "19aa7e27-d9e7-44dd-a73a-946b9206310a", "fb12eaa9-d2c5-4cd6-bc30-aeb5e90dde53", "e93e30c3-53df-4bc2-8c06-b2ed7dfb6b59", "d6520d7d-cfb1-43cd-b5ed-cefc294a486a", "ee333746-99b4-45f6-9985-e627f643a4fe", "f071fd89-920a-4e24-87df-0eddc0b0e9f8"]) },
  { kind: "rent", per: "yr", name: "5BR Beachfront Villa for Rent | Palm Frond B", area: "Palm Jumeirah · Garden Homes Frond B", type: "villa", tag: "Furnished", deal: "BEACHFRONT", spec: "5 Bed + Maid · 6 Bath · 6,707 sqft · Furnished", price: "1,300,000", id: "r-eh-pf-1346", permit: "6953080400", ref: "EH-PF-1346", photos: pf("7WGFZX0PFRJ71JE1BAGW0MVGK8", ["e43afbc9-678d-40b1-be77-5ced0c43aab2", "8da7a5cc-487d-404a-9f28-fb17e417ea23", "1aa8f3e2-2178-4387-ba6b-850e82bb9cba", "b6f6dd7a-7993-46c0-add8-4e75c2e6cc86", "7ffc8560-61b9-4e0e-a32d-981fb0b8536c", "a299faa5-e1fd-420c-8e12-65ad57f1af9f", "9b56f30d-43fb-42d2-8abc-1d1b7f1b3655", "a2595fe6-3d15-4224-9749-cd666dc72780"]) },
  { kind: "rent", per: "yr", name: "5BR Signature Villa | Beachfront | Frond C", area: "Palm Jumeirah · Signature Villas Frond C", type: "villa", tag: "Furnished", deal: "BEACHFRONT", spec: "5 Bed · 6 Bath · 13,403 sqft · Furnished", price: "1,400,000", id: "r-eh-pf-10633", permit: "6953084080", ref: "EH-PF-10633", photos: pf("8WBXHTV10ZQ4VHN1SXMGWQJNRW", ["24fc65fa-2175-4a28-ab86-7c7d5b0003d5", "65ea573c-7bf3-47b0-9a82-b15c52f9e6c2", "4e174d1a-edd9-441e-9f22-60ff958698a3", "55cbcdc0-7186-4626-b3da-345ac7ed45dd", "41e52357-b5e3-4c3b-9fb9-3d53096b004f", "d025eb28-c9bd-45e4-8ea4-131d26bfee9e", "df262cd8-f0ca-4459-8c40-3eec2aa12d47", "e96b9714-7699-4ba3-aa96-f584175e2928"]) },
  { kind: "rent", per: "yr", name: "Luxury Beachfront Villa | Palm Jumeirah", area: "Palm Jumeirah · Garden Homes Frond E", type: "villa", tag: "Furnished", deal: "BEACHFRONT", spec: "4 Bed · 5 Bath · 6,698 sqft · Furnished", price: "1,400,000", id: "r-eh-pf-10551", permit: "6953093330", ref: "EH-PF-10551", photos: pf("WF27M6JSB8391HG6519RAN3WHW", ["9ba70d9d-3b5e-454e-8a58-f27917d791e3", "0d789be7-e969-4bc9-aabf-22c1888172ef", "3332f3f9-16b4-42d0-a074-3153f9a061c3", "881f0544-405a-4c63-abd3-77a3300ac353", "3ce9cece-ef63-41ce-b77d-830967d9d56d", "8e660b27-a784-4504-8062-d2ccbf467ba4", "a94c6d95-95b2-41a4-8fc1-d651100c9e58", "ebac3d0d-1317-447f-bf0e-7bbdf5dbbd04"]) },
  { kind: "rent", per: "yr", name: "Upgraded Villa | Sea Views | Luxury Modern Living", area: "Palm Jumeirah · Signature Villas Frond N", type: "villa", tag: "Furnished", deal: "SEA VIEW", spec: "5 Bed · 6 Bath · 6,789 sqft · Furnished", price: "3,000,000", id: "r-eh-pf-10448", permit: "69273471153", ref: "EH-PF-10448", photos: pf("H6TYBAFSKW3GZZ89J52XP7PBCC", ["89b88831-0242-4403-ae66-b5a103160b11", "82ddee96-71d5-46e2-a6a1-719ee34f62e7", "11ccbb36-a143-4205-b40e-9e860de9084b", "2329c1aa-c257-452f-a541-07be93c995b8", "508b5980-f530-4492-9df8-c05fbe201ac9", "0a5d69f2-8c79-485c-be8a-3e523ea1e560", "412f97a8-78ae-4f2d-a1eb-d9838a773352", "2dbfc8b0-4596-4d29-88ff-ed00b066c04e"]) },
  { kind: "rent", per: "yr", name: "Lake Plaza Tower | Spacious Office | 1,170 Sqf", area: "Jumeirah Lake Towers · One Lake Plaza", type: "office", tag: "Office", deal: "PRIME LOCATION", spec: "Office · 1,170 sqft", price: "175,000", id: "r-eh-pf-1332", permit: "7122858700", ref: "EH-PF-1332", photos: pf("0AG6V7SE59XPZDYXJMSCZYF4W4", ["db8d12c4-fd61-439b-af83-65abd92b05d9", "82a7bfee-e42b-4675-81d8-a2ce223efa5c", "72b5fbb8-6fa6-4b6d-a875-ca50277792f5", "4cad7994-50ab-47a4-a04f-16810deae7c9", "40ec7478-f6de-451b-9bc1-4ca794c25f01", "2566c906-4318-46c6-9482-9827a8a25409", "33734c54-a329-4238-960b-7093f59c0997", "8dbb6d54-8be9-42fa-99d4-d1d53aa3da23"]) },
  { kind: "rent", per: "yr", name: "Reduced Price | Fitted Office | JLT | 1,151 Sqf", area: "Jumeirah Lake Towers · Platinum Tower (Pt Tower)", type: "office", tag: "Office", deal: "REDUCED PRICE", spec: "Office · 1,151 sqft", price: "180,000", id: "r-eh-pf-1334", permit: "7168259010", ref: "EH-PF-1334", photos: pf("VGZKA4N4JEJY45P6DA4MS9TKXG", ["23ee07f5-3146-42ae-853f-9a4b4e19c7f6", "06e8664f-4186-4088-a26e-bfc95d1afe00", "e440b538-6239-4c91-abbd-8b68a498d9fc", "05e8d328-f488-43f6-8f60-63627bb570cf", "784a2e38-5c48-4b6f-a0bb-b4bf88210dfa", "642e468c-acb6-487d-9bb8-dc1a93f78722", "254aebec-4f77-4280-8c38-9d92e9130f0c", "812cfacb-3feb-48df-983f-6f5715e3fe89"]) },
  { kind: "rent", per: "yr", name: "Premium Office Space| Furnished | Prime Location", area: "Greens · The Onyx Tower 2", type: "office", tag: "Fitted", deal: "FURNISHED", spec: "Office · Fitted · 1,220 sqft", price: "390,000", id: "r-eh-pf-1340", permit: "7117601781", ref: "EH-PF-1340", photos: pf("HKBWNBTP8FFTKX1FFFS9Z409AG", ["c4cf68ec-316c-4ea8-a922-9b0d7a71a758", "9342c7d8-8401-48d4-bebd-31dd6673264a", "fca4ee6f-328a-49cf-bd3c-93e12c00ec74", "74f11fcd-66f1-40cd-8c8c-f6cd94d45a20", "dfbfc44a-cbe1-4d22-853c-47954731ea12", "4c860172-5a0b-4c69-9a1c-b85a9f1b48ca", "d8e3a03e-084f-4dc5-b63a-31e66fd6dce1", "fbd0b5bf-8413-4d71-a345-a369d7b03d57"]) },
  { kind: "rent", per: "yr", name: "Furnished Office | 4 Parking | Emaar Business", area: "Sheikh Zayed Road · Emaar Business Park Building 3", type: "office", tag: "Fitted", deal: "PARKING", spec: "Office · Fitted · 2,724 sqft", price: "994,260", id: "r-eh-pf-10624", permit: "71706868891", ref: "EH-PF-10624", photos: pf("FSVVB1EZGCT6TQB5V74YDQFH8C", ["11d0c32c-793a-4d4e-a73c-969ea6caa39f", "8f13371f-c354-4940-ae85-837f3d08d849", "55e658d8-ab23-4862-9ad7-d90b3fddb3d7", "8db909cd-f64d-449a-9f17-aa29450a9d8e", "bf18b938-19ed-42d4-8283-53ddde878b71", "cdefa076-d229-4c27-b1d6-0999f963c0cb", "c176b123-f0ad-4f4f-8fdb-29f58dfa7a2f", "3e222082-ad54-43d5-a85b-5e49809dbfbe"]) },
  { kind: "rent", per: "yr", name: "Fitted Office for Rent | Vacant | Barsha Heights", area: "Barsha Heights (Tecom) · Cayan Business Center", type: "office", tag: "Fitted", deal: "PARKING", spec: "Office · Fitted · 4,669 sqft", price: "1,400,000", id: "r-eh-pf-10622", permit: "7123731400", ref: "EH-PF-10622", photos: pf("C6MJEYJRCJJPX6GXTVSRRFCFF0", ["f4e9c0dd-e9b3-44ba-ad24-89fef71e8a08", "89d90fd2-6b51-4dfa-9680-2eaa2922a288", "35009af3-91a7-474e-b3c0-8acf1f5ee511", "ab382071-8c2d-4b95-bbd7-3555f8f45d60", "4fca844f-fc48-43c4-bb0b-cf95b6c2ee8c", "4213d4f3-c91b-46a6-8266-32f7e1cac82b", "8306cac3-47c9-442c-9b3d-e2bcfac875d7", "a0e118a0-0925-4ec1-8284-6a38ca7efb2c"]) },
  { kind: "rent", per: "yr", name: "Labour Camp | MOHRE Approved | 188 Rooms", area: "Jebel Ali · Jebel Ali Industrial 1", type: "office", tag: "MOHRE Approved", deal: "MOHRE APPROVED", spec: "Labour Camp · 188 Rooms · 10 Bath · 20,000 sqft", price: "7,500,000", id: "r-eh-pf-1308", permit: "681074266276", ref: "EH-PF-1308", photos: pf("R4DNJ97MW2Z11AFJRMEDQHST48", ["90ec1d71-2835-4863-a952-053fd8433070", "b22b523a-4d96-420a-85ea-0938b05011b2", "229f6213-2746-4f85-8aac-234b4f464d0a", "7730526c-6bd8-4b97-a9e9-f242b6d18b48", "da9cd54d-1670-47bc-9c3b-ba438f66df76", "d068f39d-df8e-4f6f-a7c4-ee52522cd6dc", "cc1d742d-12c5-4a2c-ba94-3197def84138", "35d70309-f2dd-4544-861e-2c9ff4c2cdd6"]) },
  // SALE (residential then commercial)
  { kind: "sale", name: "Brand-New 2BR | Community View | Living Legends", area: "Living Legends · Aladdin", type: "apt", tag: "Unfurnished", deal: "COMMUNITY VIEW", spec: "2 Bed · 3 Bath · 1,446 sqft", price: "1,350,000", id: "s-eh-pf-1290", permit: "7117747581", ref: "EH-PF-1290", photos: pf("NH7EXNX68XR86VH48ASR24TMK4", ["f560f8fe-e1e9-49ae-a50e-3256331375dd", "98b3d237-b12a-4dd1-a78a-fb8ab5ceeb4c", "96d8403a-1cff-4213-9f34-f76a2a804bfb", "cd9b3d62-27ac-4d28-bea3-5dbb21a5b502", "567eb32b-bfdd-4724-a933-dbf31d652b40", "5e0b842e-8ef6-4fd9-a059-26dafa2be72a", "de02b4ff-a929-40f2-9387-7cbb035ed9ac", "6f5b20eb-ee00-407b-80c8-5707bb82bc09"]) },
  { kind: "sale", name: "Spacious | High Floor | Dual Balcony | W/ maids", area: "Town Square · Zahra Breeze Apartments 1B", type: "apt", tag: "Unfurnished", deal: "HIGH FLOOR", spec: "3 Bed + Maid · 3 Bath · 1,408 sqft", price: "2,000,000", id: "s-eh-pf-10068", permit: "7123015292", ref: "EH-PF-10068", photos: pf("K2SW000N1H6HWMNAH9676XWG8G", ["0ea69cf0-7709-44ca-8014-09e4576bc5bc", "70375825-0ea3-410e-b51b-1838e2e52a2f", "151d5107-1c84-4a73-af65-67d2c5403f22", "197f1976-4a98-47fc-a86d-bcb63760e85f", "2ace20c4-fc76-402d-b3a1-d91254597892", "f5678f6e-1a62-4a07-ad74-a78a1c5392f6", "1897ea37-e249-48d4-97ac-6e4bbe974437", "f9e58d20-77af-41c1-b7c8-77bdc581f98a"]) },
  { kind: "sale", name: "Upgraded 3BR + Maid | Marina Residences 6", area: "Palm Jumeirah · Marina Residences 6", type: "apt", tag: "Furnished", deal: "UPGRADED", spec: "3 Bed + Maid · 3 Bath · 2,439 sqft · Furnished", price: "7,500,000", id: "s-eh-pf-1348", permit: "7124925600", ref: "EH-PF-1348", photos: pf("9AZT4CXYH0P0E9FFKCB72KZTZM", ["b6cd02b2-fdbf-475a-83d7-08d227e96dfe", "e7ed7e22-eb75-4b6e-83ac-142ff81d82aa", "58236213-2625-4d07-9c42-ded241e449ed", "5fd326a7-67d8-4786-a5cd-2c23207ca790", "7ca46cc9-2949-432f-a330-b74d234b5957", "88240438-688c-4e7b-ab04-027c3436e917", "58c17ee8-a702-4bf1-b592-7d4b3810068d", "915969f7-644f-4f09-baff-3fd44310204f"]) },
  { kind: "sale", name: "Sea View 3BR | Tiara Ruby | Palm Jumeirah Luxury", area: "Palm Jumeirah · Ruby", type: "apt", tag: "Unfurnished", deal: "SEA VIEW", spec: "3 Bed · 3 Bath · 2,266 sqft", price: "10,250,000", id: "s-eh-pf-1324", permit: "7126593300", ref: "EH-PF-1324", photos: pf("BD3R0SD5S3SQJCXFYFTHNGDFR4", ["2885a02b-0d7f-44c5-b49e-eed379701917", "c69dd881-a80d-4c36-aad9-c0868a0ba0bb", "eb7ef967-d50c-42c1-a164-82ad3b877ab3", "ee2da6b6-ebe4-4d4d-a36f-3b07a0700405", "ac707a18-3c2f-461e-862c-24a2d72af2c0", "a6d146ab-7982-4150-a97b-1dc8a84387a0", "a3a8a11d-f3db-46d0-8b62-a1804fe23c02", "0b135330-e9f9-49b8-b0c7-eccec72597da"]) },
  { kind: "sale", name: "Upgraded 4BR Villa | Lake View | Private Pool", area: "Jumeirah Park · Legacy Nova Villas", type: "villa", tag: "Furnished", deal: "LAKE VIEW", spec: "4 Bed · 5 Bath · 7,965 sqft · Furnished", price: "10,500,000", id: "s-eh-pf-10618", permit: "6513394000", ref: "EH-PF-10618", photos: pf("9JJZ70GPBGT572VB55T6VGEEC4", ["a45f0923-2a07-4701-9733-9cd0a3483f2e", "fd6192b6-dd96-466b-a55c-80065da4bac0", "f68a5e93-b07d-4c64-b1e4-29404455bb0a", "7c2f373a-19ef-48c0-bb70-7d05cbe0ffca", "414651dd-daf7-40ce-add6-e1a99b972be6", "2037f543-3a8f-4ff4-93c6-91df6a1ac2b3", "8397dbff-219a-4932-ac05-2568f5d6cd83", "2fbc9470-cfcd-46f7-aed0-74aceac0b4cb"]) },
  { kind: "sale", name: "Luxury Beachfront Villa | Sea View | Furnished", area: "Palm Jumeirah · Garden Homes Frond M", type: "villa", tag: "Furnished", deal: "BEACHFRONT", spec: "4 Bed · 5 Bath · 7,384 sqft · Furnished", price: "24,900,000", id: "s-eh-pf-1354", permit: "6511413400", ref: "EH-PF-1354", photos: pf("CH85RTCKNWB1YVZ31J8E8F5X7G", ["0d68c5ce-5f51-419c-afce-9312f43ad05b", "5d2047e5-4424-4e0d-b916-a4e23ed558b8", "edbf3963-405f-4199-8e23-9bcd0424a71e", "fbcd6a1d-3786-4461-ae1b-c5c9666965aa", "0014eb22-9938-4572-956e-0049c74e92a9", "be29533f-5f59-44cd-aafb-70564eed4f55", "f4e44a76-a3d6-4ba3-bba0-1c3c61c57fe9", "94c2f303-2179-44e7-b3bb-4bf18c364be4"]) },
  { kind: "sale", name: "Luxury Beachfront Villa | Frond E | Palm Sale", area: "Palm Jumeirah · Garden Homes Frond E", type: "villa", tag: "Furnished", deal: "BEACHFRONT", spec: "4 Bed · 5 Bath · 6,699 sqft · Furnished", price: "65,000,000", id: "s-eh-pf-1302", permit: "6510259600", ref: "EH-PF-1302", photos: pf("0M2JXBX01JZBWAB2SWNZF9Z0RW", ["79ccd69c-8ea4-42e9-8081-13a6a5106454", "41601a0c-133a-4d53-b196-9257895725fd", "2ecee39e-d620-4129-8a6e-a354f3b3a8da", "8c9c94f8-ce4f-4250-a5c6-feccfb48bea0", "5bb721e3-345c-46a0-ab52-81112bda1027", "a5f0ec73-a2d0-433d-a8f7-fdc1066e86c1", "d563769c-6fe8-40c0-a551-1ebcb882ef0d", "cb18557b-a25f-46ba-becf-62920895ad47"]) },
  { kind: "sale", name: "Fitted Office for Sale | Parking | Barsha Heights", area: "Barsha Heights (Tecom) · Cayan Business Center", type: "office", tag: "Fitted", deal: "PARKING", spec: "Office · Fitted · 4,767 sqft", price: "14,000,000", id: "s-eh-pf-10640", permit: "7123731400", ref: "EH-PF-10640", photos: pf("2SEPGTD5FHA8524V0NWW5XCAH4", ["8ed43f87-3bac-4c56-a020-f109ba624e59", "f1a10f66-ca72-4fa3-8ebf-4215a467b9ac", "730f9586-9cfc-42ce-88b0-4e71d0e12a50", "d691420a-0378-4a1a-b872-2134e02ceaad", "141a98b8-3203-4072-bc44-66ef3fba2dc6", "46c4d52c-295a-49c3-aba6-dd1306759cf1", "ff56f9a8-6a3e-4354-b009-86d28bb80c21", "c6bea996-867e-4454-8ba9-05aa59cce2df"]) },
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

/* Single source for how a price reads. Two of the rentals are MONTHLY. */
export const periodWord = (l: Listing) => (l.per === "mo" ? "Month" : "Year");
export const priceLabel = (l: Listing) => (l.kind === "rent" ? `AED / ${periodWord(l)}` : "Asking · AED");
export const priceStr = (l: Listing) =>
  l.kind === "rent" ? `AED ${l.price} / ${l.per === "mo" ? "month" : "yr"}` : `AED ${l.price}`;

export function waLink(l: Listing) {
  const kindWord = l.kind === "rent" ? "rent" : "sale";
  const msg = `Hi Abdul, I'm interested in the ${l.name} (${l.area}) for ${kindWord}, ${priceStr(l)}. Is it still available?`;
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
