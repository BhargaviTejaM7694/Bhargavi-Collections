import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Providers from "@/components/Providers";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BhargaviTeja Collections | 1 Gram Gold Imitation Jewellery in Vijayawada & Hanuman Junction",
    template: "%s | BhargaviTeja Collections",
  },
  description:
    "Shop premium 1 gram gold imitation jewellery online at BhargaviTeja Collections, Hanuman Junction near Vijayawada. Wholesale, retail & rental jewellery — necklaces, earrings, bangles, chains, rings, pendants, long harams, chokers & bridal sets. Free delivery across Andhra Pradesh. Affordable gold-plated jewellery in Krishna district.",
  keywords: [
    "1 gram gold jewellery",
    "imitation jewellery Vijayawada",
    "imitation jewellery Hanuman Junction",
    "gold plated jewellery Vijayawada",
    "1 gram gold necklace",
    "1 gram gold earrings",
    "1 gram gold bangles",
    "1 gram gold long haram",
    "1 gram gold choker",
    "bridal imitation jewellery Vijayawada",
    "artificial jewellery Vijayawada",
    "fashion jewellery Andhra Pradesh",
    "gold plated jewellery online",
    "imitation jewellery near me",
    "jewellery shop Hanuman Junction",
    "jewellery shop near Vijayawada",
    "BhargaviTeja Collections",
    "affordable jewellery Vijayawada",
    "one gram gold jewellery online",
    "Krishna district jewellery",
    "imitation jewellery Andhra Pradesh",
    "wholesale jewellery Vijayawada",
    "wholesale imitation jewellery Andhra Pradesh",
    "retail jewellery Hanuman Junction",
    "jewellery rental Vijayawada",
    "rental jewellery for wedding",
    "bridal jewellery rental Vijayawada",
    "wholesale gold plated jewellery",
    "bulk imitation jewellery Andhra Pradesh",
    "gold jewellery Machilipatnam",
    "gold jewellery Gudivada",
    "gold jewellery Eluru",
    "gold jewellery Tenali",
    "gold jewellery Guntur",
    "imitation necklace set online",
    "wedding jewellery Vijayawada",
    "temple jewellery Vijayawada",
  ],
  authors: [{ name: "BhargaviTeja Collections" }],
  creator: "BhargaviTeja Collections",
  publisher: "BhargaviTeja Collections",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "BhargaviTeja Collections",
    title: "BhargaviTeja Collections | Wholesale, Retail & Rental Imitation Jewellery in Vijayawada",
    description:
      "Shop premium 1 gram gold imitation jewellery at BhargaviTeja Collections, Hanuman Junction near Vijayawada. Wholesale, retail & rental — necklaces, earrings, bangles, bridal sets & more. Free delivery across Andhra Pradesh.",
    images: [
      {
        url: "/logo.webp",
        width: 512,
        height: 512,
        alt: "BhargaviTeja Collections Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BhargaviTeja Collections | Wholesale, Retail & Rental Jewellery Vijayawada",
    description:
      "Premium 1 gram gold imitation jewellery from Hanuman Junction, near Vijayawada. Wholesale, retail & rental — necklaces, earrings, bangles & bridal sets at affordable prices.",
    images: ["/logo.webp"],
  },
  alternates: {
    canonical: "/",
  },
  category: "Jewellery",
  other: {
    "geo.region": "IN-AP",
    "geo.placename": "Hanuman Junction, Vijayawada",
    "geo.position": "16.5167;80.8167",
    "ICBM": "16.5167, 80.8167",
    "revisit-after": "7 days",
    "content-language": "en-IN",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "#business",
      name: "BhargaviTeja Collections",
      description:
        "Premium 1 gram gold imitation jewellery shop in Hanuman Junction, near Vijayawada. Wholesale, retail & rental — necklaces, earrings, bangles, chains, rings, pendants, long harams, chokers, bridal sets and temple jewellery at affordable prices with free delivery across Andhra Pradesh.",
      image: "/logo.webp",
      telephone: "+919100369789",
      email: "bhargavitejacollections@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hanuman Junction",
        addressRegion: "Andhra Pradesh",
        addressCountry: "IN",
        postalCode: "521105",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 16.5167,
        longitude: 80.8167,
      },
      areaServed: [
        { "@type": "City", name: "Vijayawada" },
        { "@type": "City", name: "Hanuman Junction" },
        { "@type": "City", name: "Machilipatnam" },
        { "@type": "City", name: "Gudivada" },
        { "@type": "City", name: "Tenali" },
        { "@type": "City", name: "Guntur" },
        { "@type": "City", name: "Eluru" },
        { "@type": "State", name: "Andhra Pradesh" },
      ],
      priceRange: "$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "21:00",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "#website",
      name: "BhargaviTeja Collections",
      description: "Wholesale, Retail & Rental 1 Gram Gold Imitation Jewellery Online Store in Vijayawada & Hanuman Junction, Andhra Pradesh",
      publisher: { "@id": "#business" },
    },
    {
      "@type": "ItemList",
      name: "Jewellery Collections",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Necklaces", url: "/collections/necklaces" },
        { "@type": "ListItem", position: 2, name: "Earrings", url: "/collections/earrings" },
        { "@type": "ListItem", position: 3, name: "Bangles", url: "/collections/bangles" },
        { "@type": "ListItem", position: 4, name: "Chains", url: "/collections/chains" },
        { "@type": "ListItem", position: 5, name: "Rings", url: "/collections/rings" },
        { "@type": "ListItem", position: 6, name: "Pendants", url: "/collections/pendants" },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
