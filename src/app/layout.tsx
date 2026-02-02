import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.polyforeverwell.com"),
  title: {
    default: "POLY FOREVERWELL 保利永安",
    template: "%s | POLY FOREVERWELL 保利永安"
  },
  description: "POLY FOREVERWELL TOURS AND INVESTMENT COMPANY LIMITED. 致力于在文化旅游投资领域中开拓创新，成为行业的引领者。传承中华文明，弘扬民族文化。",
  keywords: ["Art Auction", "Museum Exhibition", "Cultural Investment", "Poly Foreverwell", "保利永安", "艺术拍卖", "博物馆", "文旅投资"],
  authors: [{ name: "Poly Foreverwell" }],
  openGraph: {
    title: "POLY FOREVERWELL 保利永安",
    description: "致力于在文化旅游投资领域中开拓创新，成为行业的引领者。",
    url: "/",
    siteName: "POLY FOREVERWELL 保利永安",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "POLY FOREVERWELL 保利永安",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "POLY FOREVERWELL 保利永安",
    description: "致力于在文化旅游投资领域中开拓创新，成为行业的引领者。",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
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
        <Footer />
      </body>
    </html>
  );
}
