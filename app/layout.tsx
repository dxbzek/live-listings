import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Abdul Faizal, Buy & Rent Dubai's Finest Homes",
    template: "%s · Abdul Faizal",
  },
  description:
    "Hand-picked Dubai homes and investments for sale and rent, curated personally by Abdul Kadir Faizal, 18 years in the Dubai market. WhatsApp direct.",
  metadataBase: new URL("https://abdulfaizal.vercel.app"),
  openGraph: {
    title: "Abdul Faizal, Buy & Rent Dubai's Finest Homes",
    description:
      "Hand-picked Dubai homes and investments for sale and rent, curated personally by Abdul Kadir Faizal.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
