import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.hcfurnituresupply.com"),
  title: {
    default: "HC Furniture Supply | Luxury Furniture",
    template: "%s | HC Furniture Supply"
  },
  description: "Minimalist Italian Design Furniture. Curated collections of luxury handcrafted pieces.",
  keywords: ["Italian Furniture", "Luxury Design", "Minimalist Interior", "Milan Atelier", "HC Furniture Supply", "Furniture", "Design"],
  authors: [{ name: "HC Furniture Supply" }],
  openGraph: {
    title: "HC Furniture Supply | Luxury Furniture",
    description: "Minimalist Italian Design Furniture",
    url: "/",
    siteName: "HC Furniture Supply",
    images: [
      {
        url: "/images/og-image.jpg", // Ensure this image exists or provide a default
        width: 1200,
        height: 630,
        alt: "HC Furniture Supply",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HC Furniture Supply | Luxury Furniture",
    description: "Minimalist Italian Design Furniture",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden" style={{ scrollbarGutter: "stable" }}>
      <body
        className={`${playfair.variable} ${lato.variable} font-sans antialiased bg-stone-50 text-stone-900 overflow-x-hidden`}
      ><Navbar />
        
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
