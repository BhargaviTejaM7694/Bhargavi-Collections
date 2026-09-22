# Bhargavi Collections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-page catalogue website for Bhargavi Collections (1 gram imitation jewellery) with category browsing, product details, and an order form that emails the store owner.

**Architecture:** Next.js 14 App Router with static JSON data for products/categories. Client-side EmailJS sends order emails. Cloudinary hosts payment screenshot uploads. No database, no auth — pure catalogue + order form.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, EmailJS, Cloudinary Upload Widget

**Spec:** `docs/superpowers/specs/2026-09-22-bhargavi-collections-design.md`

## Global Constraints

- Node.js >= 18
- Next.js 14 with App Router (`src/app/` directory)
- TypeScript strict mode
- Tailwind CSS v3
- No database — product data lives in `src/data/*.json`
- Mobile-first responsive (375px minimum)
- Color tokens: gold `#B8860B`, burgundy `#800020`, cream `#FFF8DC`, dark-green `#006400`
- Fonts: Playfair Display (headings), Inter (body) via Google Fonts
- Owner email: prasannau.dwh@gmail.com
- Owner phone: +91 8978777800

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, header, footer
│   ├── page.tsx                # Home: hero + collections + featured
│   ├── globals.css             # Tailwind directives + custom properties
│   ├── collections/
│   │   └── [category]/
│   │       └── page.tsx        # Category product grid
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx        # Single product detail
│   ├── order/
│   │   └── page.tsx            # Order form
│   ├── about/
│   │   └── page.tsx            # About page
│   └── contact/
│       └── page.tsx            # Contact page
├── components/
│   ├── Header.tsx              # Sticky nav, logo, links, icons
│   ├── MobileMenu.tsx          # Hamburger slide-out menu
│   ├── Footer.tsx              # Contact, links, copyright
│   ├── HeroSection.tsx         # Full-width hero banner
│   ├── ShopByCollections.tsx   # Circular category thumbnails row
│   ├── FeaturedProducts.tsx    # Product grid on home page
│   ├── ProductCard.tsx         # Reusable product card
│   └── OrderForm.tsx           # Form with validation + upload
├── data/
│   ├── categories.ts           # Category array with types
│   └── products.ts             # Product array with types
├── lib/
│   ├── emailjs.ts              # EmailJS send helper
│   └── cloudinary.ts           # Cloudinary upload config
└── types/
    └── index.ts                # Product, Category, OrderFormData types
```

---

### Task 1: Project Scaffolding + Types + Data

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`
- Create: `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`
- Create: `src/types/index.ts`, `src/data/categories.ts`, `src/data/products.ts`
- Create: `.env.local.example`, `.gitignore`

**Interfaces:**
- Produces: `Category` type, `Product` type, `OrderFormData` type, `categories` array, `products` array — used by every subsequent task.

- [ ] **Step 1: Initialize Next.js project**

```bash
cd "C:/Users/prasa/Vibe Coding/Bhargavi Collections"
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbo
```

When prompted for defaults, accept them. This creates the project skeleton.

- [ ] **Step 2: Install dependencies**

```bash
npm install @emailjs/browser
```

- [ ] **Step 3: Create type definitions**

Create `src/types/index.ts`:

```typescript
export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  description: string;
  inStock: boolean;
}

export interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  selectedProduct: string;
  paymentScreenshot: string;
}
```

- [ ] **Step 4: Create categories data**

Create `src/data/categories.ts`:

```typescript
import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "necklaces",
    name: "Necklaces",
    image: "/images/categories/necklaces.jpg",
    description: "Elegant 1 gram gold necklaces for every occasion",
  },
  {
    id: "earrings",
    name: "Earrings",
    image: "/images/categories/earrings.jpg",
    description: "Beautiful earrings in traditional and modern designs",
  },
  {
    id: "bangles",
    name: "Bangles",
    image: "/images/categories/bangles.jpg",
    description: "Stunning bangles crafted with intricate detailing",
  },
  {
    id: "chains",
    name: "Chains",
    image: "/images/categories/chains.jpg",
    description: "Delicate chains in various patterns and lengths",
  },
  {
    id: "rings",
    name: "Rings",
    image: "/images/categories/rings.jpg",
    description: "Statement rings for traditional and daily wear",
  },
  {
    id: "pendants",
    name: "Pendants",
    image: "/images/categories/pendants.jpg",
    description: "Eye-catching pendants with traditional motifs",
  },
  {
    id: "harams",
    name: "Long Harams",
    image: "/images/categories/harams.jpg",
    description: "Grand long harams for weddings and celebrations",
  },
];
```

- [ ] **Step 5: Create products data**

Create `src/data/products.ts`:

```typescript
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "traditional-gold-necklace",
    name: "Traditional Gold Necklace",
    price: 599,
    category: "necklaces",
    image: "/images/products/traditional-gold-necklace.jpg",
    description:
      "Beautiful 1 gram gold necklace with traditional temple design. Perfect for festivals and celebrations.",
    inStock: true,
  },
  {
    id: "kundan-choker-necklace",
    name: "Kundan Choker Necklace",
    price: 799,
    category: "necklaces",
    image: "/images/products/kundan-choker-necklace.jpg",
    description:
      "Exquisite kundan work choker necklace with intricate stone settings.",
    inStock: true,
  },
  {
    id: "temple-jhumka-earrings",
    name: "Temple Jhumka Earrings",
    price: 399,
    category: "earrings",
    image: "/images/products/temple-jhumka-earrings.jpg",
    description:
      "Classic temple-style jhumka earrings with delicate bell drops.",
    inStock: true,
  },
  {
    id: "chandbali-earrings",
    name: "Chandbali Earrings",
    price: 499,
    category: "earrings",
    image: "/images/products/chandbali-earrings.jpg",
    description:
      "Elegant crescent-shaped chandbali earrings with pearl accents.",
    inStock: true,
  },
  {
    id: "gold-kada-bangles",
    name: "Gold Kada Bangles (Set of 2)",
    price: 699,
    category: "bangles",
    image: "/images/products/gold-kada-bangles.jpg",
    description: "Heavy gold-plated kada bangles with carved floral motifs.",
    inStock: true,
  },
  {
    id: "stone-bangles-set",
    name: "Stone Bangles Set (Set of 4)",
    price: 899,
    category: "bangles",
    image: "/images/products/stone-bangles-set.jpg",
    description:
      "Set of 4 bangles with multicolor stone settings and gold plating.",
    inStock: true,
  },
  {
    id: "thali-chain-gold",
    name: "Thali Chain Gold",
    price: 499,
    category: "chains",
    image: "/images/products/thali-chain-gold.jpg",
    description: "Traditional thali chain in 1 gram gold with secure clasp.",
    inStock: true,
  },
  {
    id: "black-beads-chain",
    name: "Black Beads Mangalsutra Chain",
    price: 599,
    category: "chains",
    image: "/images/products/black-beads-chain.jpg",
    description:
      "Classic black beads mangalsutra chain with gold pendant holder.",
    inStock: true,
  },
  {
    id: "peacock-ring",
    name: "Peacock Design Ring",
    price: 299,
    category: "rings",
    image: "/images/products/peacock-ring.jpg",
    description:
      "Adjustable peacock design ring with green and blue stone work.",
    inStock: true,
  },
  {
    id: "lakshmi-ring",
    name: "Lakshmi Coin Ring",
    price: 349,
    category: "rings",
    image: "/images/products/lakshmi-ring.jpg",
    description:
      "Traditional Lakshmi coin ring in gold finish, adjustable size.",
    inStock: true,
  },
  {
    id: "ruby-pendant",
    name: "Ruby Stone Pendant",
    price: 449,
    category: "pendants",
    image: "/images/products/ruby-pendant.jpg",
    description:
      "Stunning ruby stone pendant with gold frame and matching bail.",
    inStock: true,
  },
  {
    id: "lakshmi-pendant",
    name: "Lakshmi Pendant",
    price: 399,
    category: "pendants",
    image: "/images/products/lakshmi-pendant.jpg",
    description: "Traditional Lakshmi pendant with detailed temple work.",
    inStock: true,
  },
  {
    id: "long-haram-gold",
    name: "Long Haram Gold Set",
    price: 1499,
    category: "harams",
    image: "/images/products/long-haram-gold.jpg",
    description:
      "Grand long haram with matching earrings. Perfect for weddings.",
    inStock: true,
  },
  {
    id: "chandraharam",
    name: "Chandraharam Chain",
    price: 999,
    category: "harams",
    image: "/images/products/chandraharam.jpg",
    description:
      "Multi-layer chandraharam with intricate gold work and stone highlights.",
    inStock: true,
  },
];

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.inStock).slice(0, 8);
}
```

- [ ] **Step 6: Configure Tailwind with custom theme**

Replace `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#B8860B",
          light: "#D4A843",
          dark: "#8B6914",
        },
        burgundy: {
          DEFAULT: "#800020",
          light: "#A0334D",
          dark: "#5C0017",
        },
        cream: {
          DEFAULT: "#FFF8DC",
          dark: "#F5EDCC",
        },
        "brand-green": {
          DEFAULT: "#006400",
          light: "#228B22",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 7: Set up globals.css**

Replace `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-body text-gray-800 bg-white;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-heading;
  }
}

@layer components {
  .btn-primary {
    @apply bg-burgundy text-white px-6 py-3 rounded-md font-medium
           hover:bg-burgundy-dark transition-colors duration-200;
  }

  .btn-gold {
    @apply bg-gold text-white px-6 py-3 rounded-md font-medium
           hover:bg-gold-dark transition-colors duration-200;
  }

  .section-title {
    @apply font-heading text-3xl md:text-4xl text-brand-green text-center mb-8;
  }
}
```

- [ ] **Step 8: Set up root layout with Google Fonts**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
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
  title: "Bhargavi Collections | 1 Gram Gold Jewellery",
  description:
    "Shop beautiful 1 gram gold imitation jewellery — necklaces, earrings, bangles, chains, rings, pendants, and long harams. Bhargavi Collections.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 9: Create placeholder home page**

Replace `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-heading text-4xl text-brand-green">
        Bhargavi Collections
      </h1>
    </main>
  );
}
```

- [ ] **Step 10: Create placeholder image directories and .env example**

```bash
mkdir -p public/images/categories public/images/products public/images/hero
```

Create `.env.local.example`:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

- [ ] **Step 11: Run dev server and verify**

```bash
npm run dev
```

Open http://localhost:3000. Verify the page loads with "Bhargavi Collections" heading in green serif font on white background.

- [ ] **Step 12: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Bhargavi Collections Next.js project with types, data, and Tailwind theme"
```

---

### Task 2: Header + Mobile Menu + Footer

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/MobileMenu.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/app/layout.tsx` — wrap children with Header + Footer

**Interfaces:**
- Consumes: nothing (standalone UI)
- Produces: `Header` component, `Footer` component — used by root layout

- [ ] **Step 1: Create Header component**

Create `src/components/Header.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collections/necklaces", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Top bar */}
        <div className="bg-burgundy text-white text-center text-sm py-1.5 px-4">
          Free Delivery on Orders Above ₹999 |{" "}
          <a href="tel:+918978777800" className="underline">
            Call: +91 8978777800
          </a>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop nav — left */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-burgundy font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo — center */}
          <Link href="/" className="flex flex-col items-center">
            <span className="font-heading text-2xl md:text-3xl text-brand-green font-bold leading-tight">
              Bhargavi
            </span>
            <span className="font-heading text-lg md:text-xl text-gold leading-tight">
              Collections
            </span>
          </Link>

          {/* Desktop nav — right */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-burgundy font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link
              href="/order"
              className="text-gray-700 hover:text-burgundy transition-colors"
              aria-label="Place Order"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
```

- [ ] **Step 2: Create MobileMenu component**

Create `src/components/MobileMenu.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  links,
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slide-out panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="font-heading text-xl text-brand-green font-bold">
              Bhargavi Collections
            </span>
            <button onClick={onClose} aria-label="Close menu" className="p-1">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-lg text-gray-700 hover:text-burgundy py-2 border-b border-gray-100 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/order"
              onClick={onClose}
              className="btn-primary text-center mt-4"
            >
              Place Order
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-green text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl text-gold mb-3">
              Bhargavi Collections
            </h3>
            <p className="text-green-100 text-sm leading-relaxed">
              Your trusted destination for beautiful 1 gram gold imitation
              jewellery. Quality craftsmanship at affordable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg text-gold mb-3">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/collections/necklaces", label: "Shop" },
                { href: "/order", label: "Place Order" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-green-100 hover:text-gold text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg text-gold mb-3">Contact Us</h4>
            <div className="flex flex-col gap-2 text-sm text-green-100">
              <a
                href="tel:+918978777800"
                className="hover:text-gold transition-colors"
              >
                +91 8978777800
              </a>
              <a
                href="mailto:Prasannau.dwh@gmail.com"
                className="hover:text-gold transition-colors"
              >
                Prasannau.dwh@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-6 text-center text-sm text-green-200">
          &copy; {new Date().getFullYear()} Bhargavi Collections. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Add Header and Footer to root layout**

Update `src/app/layout.tsx` — add imports and wrap `{children}`:

```tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  title: "Bhargavi Collections | 1 Gram Gold Jewellery",
  description:
    "Shop beautiful 1 gram gold imitation jewellery — necklaces, earrings, bangles, chains, rings, pendants, and long harams. Bhargavi Collections.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Verify header/footer render**

```bash
npm run dev
```

Verify: sticky header with brand name centered, burgundy top bar, nav links on desktop, hamburger on mobile, green footer with three columns.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.tsx src/components/MobileMenu.tsx src/components/Footer.tsx src/app/layout.tsx
git commit -m "feat: add header with mobile menu and footer components"
```

---

### Task 3: Hero Section + Shop by Collections + Home Page

**Files:**
- Create: `src/components/HeroSection.tsx`
- Create: `src/components/ShopByCollections.tsx`
- Create: `src/components/FeaturedProducts.tsx`
- Create: `src/components/ProductCard.tsx`
- Modify: `src/app/page.tsx` — assemble home page

**Interfaces:**
- Consumes: `categories` from `src/data/categories.ts`, `getFeaturedProducts()` from `src/data/products.ts`, `Category` and `Product` from `src/types`
- Produces: `HeroSection`, `ShopByCollections`, `FeaturedProducts`, `ProductCard` components

- [ ] **Step 1: Create HeroSection component**

Create `src/components/HeroSection.tsx`:

```tsx
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-gold font-medium tracking-widest uppercase text-sm mb-2">
            Welcome to
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-brand-green font-bold leading-tight mb-3">
            Bhargavi
            <br />
            Collections
          </h1>
          <p className="font-heading text-xl md:text-2xl text-gold tracking-[0.2em] uppercase mb-6">
            1 Gram Jewellery
          </p>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto md:mx-0">
            Discover exquisite imitation jewellery crafted with love.
            Traditional designs at affordable prices.
          </p>
          <Link href="/collections/necklaces" className="btn-primary inline-block">
            Shop Now
          </Link>
        </div>

        {/* Hero image placeholder */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-gold/30 bg-gold/10 flex items-center justify-center">
            <span className="text-gold/40 font-heading text-xl text-center px-8">
              Hero Image
            </span>
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,0 720,60 1080,20 C1260,0 1380,30 1440,40 L1440,60 L0,60 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create ShopByCollections component**

Create `src/components/ShopByCollections.tsx`:

```tsx
import Link from "next/link";
import { categories } from "@/data/categories";

export default function ShopByCollections() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title">Shop by Collections</h2>

        <div className="flex overflow-x-auto gap-6 md:gap-8 pb-4 scrollbar-hide justify-start md:justify-center">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/collections/${category.id}`}
              className="flex flex-col items-center gap-3 flex-shrink-0 group"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-3 border-brand-green/20 group-hover:border-gold transition-colors duration-300 bg-cream flex items-center justify-center">
                <span className="text-gold/60 text-xs text-center px-2 font-medium">
                  {category.name}
                </span>
              </div>
              <span className="text-sm md:text-base font-medium text-gray-700 group-hover:text-burgundy transition-colors whitespace-nowrap">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create ProductCard component**

Create `src/components/ProductCard.tsx`:

```tsx
import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Image */}
      <div className="aspect-square bg-cream overflow-hidden flex items-center justify-center">
        <span className="text-gold/40 font-heading text-sm text-center px-4">
          {product.name}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-800 group-hover:text-burgundy transition-colors line-clamp-2 mb-1">
          {product.name}
        </h3>
        <p className="text-gold font-bold text-lg">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
        {!product.inStock && (
          <span className="text-red-500 text-sm font-medium">Out of Stock</span>
        )}
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: Create FeaturedProducts component**

Create `src/components/FeaturedProducts.tsx`:

```tsx
import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-12 md:py-16 bg-cream/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title">Featured Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/collections/necklaces" className="btn-gold inline-block">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Assemble home page**

Replace `src/app/page.tsx`:

```tsx
import HeroSection from "@/components/HeroSection";
import ShopByCollections from "@/components/ShopByCollections";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ShopByCollections />
      <FeaturedProducts />
    </>
  );
}
```

- [ ] **Step 6: Add scrollbar-hide utility to globals.css**

Append to `src/app/globals.css`:

```css
@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

- [ ] **Step 7: Verify home page**

Verify: hero with brand name + tagline + circular placeholder, scrollable collection circles, product card grid with 8 items, all on cream/white backgrounds.

- [ ] **Step 8: Commit**

```bash
git add src/components/HeroSection.tsx src/components/ShopByCollections.tsx src/components/ProductCard.tsx src/components/FeaturedProducts.tsx src/app/page.tsx src/app/globals.css
git commit -m "feat: build home page with hero, shop-by-collections, and featured products"
```

---

### Task 4: Category Page

**Files:**
- Create: `src/app/collections/[category]/page.tsx`

**Interfaces:**
- Consumes: `categories` from `src/data/categories.ts`, `getProductsByCategory()` from `src/data/products.ts`, `ProductCard` from `src/components/ProductCard.tsx`
- Produces: Category listing page at `/collections/[category]`

- [ ] **Step 1: Create category page**

Create `src/app/collections/[category]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";

interface CategoryPageProps {
  params: { category: string };
}

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.id === params.category);
  if (!category) return {};
  return {
    title: `${category.name} | Bhargavi Collections`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.id === params.category);
  if (!category) notFound();

  const products = getProductsByCategory(params.category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{category.name}</span>
      </nav>

      <h1 className="section-title">{category.name}</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        {category.description}
      </p>

      {/* Category filter tabs */}
      <div className="flex overflow-x-auto gap-3 mb-8 pb-2 scrollbar-hide justify-center">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/collections/${cat.id}`}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              cat.id === params.category
                ? "bg-burgundy text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No products in this category yet.</p>
          <Link href="/" className="text-burgundy hover:underline mt-2 inline-block">
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Navigate to http://localhost:3000/collections/necklaces. Verify: breadcrumb, title, category filter tabs (active one highlighted), product grid.

- [ ] **Step 3: Commit**

```bash
git add src/app/collections/
git commit -m "feat: add category listing page with filter tabs"
```

---

### Task 5: Product Detail Page

**Files:**
- Create: `src/app/products/[id]/page.tsx`

**Interfaces:**
- Consumes: `getProductById()` from `src/data/products.ts`, `categories` from `src/data/categories.ts`, `products` array for `generateStaticParams`
- Produces: Product detail page at `/products/[id]` with "Order Now" link passing `?product=id` to `/order`

- [ ] **Step 1: Create product detail page**

Create `src/app/products/[id]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductById } from "@/data/products";
import { categories } from "@/data/categories";

interface ProductPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  if (!product) return {};
  return {
    title: `${product.name} | Bhargavi Collections`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const category = categories.find((c) => c.id === product.category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">
          Home
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/collections/${category.id}`}
              className="hover:text-burgundy transition-colors"
            >
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-800 font-medium">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Product image */}
        <div className="aspect-square bg-cream rounded-lg overflow-hidden flex items-center justify-center">
          <span className="text-gold/40 font-heading text-xl text-center px-8">
            {product.name}
          </span>
        </div>

        {/* Product info */}
        <div className="flex flex-col justify-center">
          <h1 className="font-heading text-3xl md:text-4xl text-gray-900 mb-3">
            {product.name}
          </h1>

          <p className="text-3xl font-bold text-gold mb-4">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          {category && (
            <p className="text-sm text-gray-500 mb-4">
              Category:{" "}
              <Link
                href={`/collections/${category.id}`}
                className="text-burgundy hover:underline"
              >
                {category.name}
              </Link>
            </p>
          )}

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {product.inStock ? (
              <Link
                href={`/order?product=${product.id}`}
                className="btn-primary text-center"
              >
                Order Now
              </Link>
            ) : (
              <span className="bg-gray-300 text-gray-600 px-6 py-3 rounded-md text-center font-medium">
                Out of Stock
              </span>
            )}
            <Link
              href={`/collections/${product.category}`}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-center font-medium hover:border-burgundy hover:text-burgundy transition-colors"
            >
              Back to {category?.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Navigate to http://localhost:3000/products/traditional-gold-necklace. Verify: breadcrumb, image placeholder, name, price in gold, description, "Order Now" button links to `/order?product=traditional-gold-necklace`.

- [ ] **Step 3: Commit**

```bash
git add src/app/products/
git commit -m "feat: add product detail page with order-now link"
```

---

### Task 6: Order Form with Cloudinary Upload + EmailJS

**Files:**
- Create: `src/lib/cloudinary.ts`
- Create: `src/lib/emailjs.ts`
- Create: `src/components/OrderForm.tsx`
- Create: `src/app/order/page.tsx`

**Interfaces:**
- Consumes: `products` from `src/data/products.ts`, `OrderFormData` from `src/types`, URL search param `?product=id`
- Produces: Working order form that uploads payment screenshot to Cloudinary and sends email via EmailJS

- [ ] **Step 1: Create Cloudinary upload helper**

Create `src/lib/cloudinary.ts`:

```typescript
export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary environment variables not configured");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "bhargavi-collections/payments");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data.secure_url;
}
```

- [ ] **Step 2: Create EmailJS send helper**

Create `src/lib/emailjs.ts`:

```typescript
import emailjs from "@emailjs/browser";

interface EmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  productName: string;
  productPrice: string;
  productLink: string;
  paymentScreenshotUrl: string;
}

export async function sendOrderEmail(data: EmailData): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS environment variables not configured");
  }

  await emailjs.send(serviceId, templateId, {
    customer_name: data.customerName,
    customer_email: data.customerEmail,
    customer_phone: data.customerPhone,
    address_line1: data.addressLine1,
    address_line2: data.addressLine2,
    city: data.city,
    state: data.state,
    pincode: data.pincode,
    product_name: data.productName,
    product_price: data.productPrice,
    product_link: data.productLink,
    payment_screenshot: data.paymentScreenshotUrl,
  }, publicKey);
}
```

- [ ] **Step 3: Create OrderForm component**

Create `src/components/OrderForm.tsx`:

```tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { sendOrderEmail } from "@/lib/emailjs";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export default function OrderForm() {
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams.get("product") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    selectedProduct: preselectedProduct,
  });

  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (preselectedProduct) {
      setForm((prev) => ({ ...prev, selectedProduct: preselectedProduct }));
    }
  }, [preselectedProduct]);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);

  const isValidPincode = (pincode: string) => /^\d{6}$/.test(pincode);

  const isFormValid =
    form.name.trim() !== "" &&
    isValidEmail(form.email) &&
    isValidPhone(form.phone) &&
    form.addressLine1.trim() !== "" &&
    form.city.trim() !== "" &&
    form.state !== "" &&
    isValidPincode(form.pincode) &&
    form.selectedProduct !== "" &&
    paymentFile !== null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !paymentFile) return;

    setSubmitting(true);
    setError("");

    try {
      const screenshotUrl = await uploadToCloudinary(paymentFile);

      const selectedProduct = products.find(
        (p) => p.id === form.selectedProduct
      );
      const productLink = `${window.location.origin}/products/${form.selectedProduct}`;

      await sendOrderEmail({
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        productName: selectedProduct?.name || form.selectedProduct,
        productPrice: selectedProduct
          ? `₹${selectedProduct.price.toLocaleString("en-IN")}`
          : "N/A",
        productLink,
        paymentScreenshotUrl: screenshotUrl,
      });

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="font-heading text-2xl text-brand-green mb-2">
          Order Submitted!
        </h2>
        <p className="text-gray-600">
          Thank you for your order. We will contact you shortly to confirm.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Personal Details */}
      <div>
        <h3 className="font-heading text-xl text-brand-green mb-4">
          Personal Details
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email ID *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="yourname@gmail.com"
              className={inputClass}
            />
            {form.email && !isValidEmail(form.email) && (
              <p className="text-red-500 text-xs mt-1">
                Enter a valid email address
              </p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500 text-sm">
                +91
              </span>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                maxLength={10}
                value={form.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className={`${inputClass} rounded-l-none`}
              />
            </div>
            {form.phone && !isValidPhone(form.phone) && (
              <p className="text-red-500 text-xs mt-1">
                Enter a valid 10-digit mobile number
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div>
        <h3 className="font-heading text-xl text-brand-green mb-4">
          Delivery Address
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="addressLine1" className={labelClass}>
              Address Line 1 *
            </label>
            <input
              id="addressLine1"
              name="addressLine1"
              type="text"
              required
              value={form.addressLine1}
              onChange={handleChange}
              placeholder="House/Flat No., Building Name, Street"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="addressLine2" className={labelClass}>
              Address Line 2
            </label>
            <input
              id="addressLine2"
              name="addressLine2"
              type="text"
              value={form.addressLine2}
              onChange={handleChange}
              placeholder="Landmark, Area (optional)"
              className={inputClass}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className={labelClass}>
                City *
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="state" className={labelClass}>
                State *
              </label>
              <select
                id="state"
                name="state"
                required
                value={form.state}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pincode" className={labelClass}>
                Pincode *
              </label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                required
                maxLength={6}
                value={form.pincode}
                onChange={handleChange}
                placeholder="500001"
                className={inputClass}
              />
              {form.pincode && !isValidPincode(form.pincode) && (
                <p className="text-red-500 text-xs mt-1">
                  Enter a valid 6-digit pincode
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Selection */}
      <div>
        <h3 className="font-heading text-xl text-brand-green mb-4">
          Order Details
        </h3>
        <div>
          <label htmlFor="selectedProduct" className={labelClass}>
            Select Item *
          </label>
          <select
            id="selectedProduct"
            name="selectedProduct"
            required
            value={form.selectedProduct}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Choose a product</option>
            {products
              .filter((p) => p.inStock)
              .map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} — ₹
                  {product.price.toLocaleString("en-IN")}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Payment Screenshot */}
      <div>
        <h3 className="font-heading text-xl text-brand-green mb-4">
          Payment
        </h3>
        <div>
          <label htmlFor="paymentScreenshot" className={labelClass}>
            Payment Screenshot *
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Upload a screenshot of your payment (UPI / Bank Transfer)
          </p>
          <input
            id="paymentScreenshot"
            type="file"
            accept="image/*"
            required
            onChange={(e) => setPaymentFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-burgundy file:text-white hover:file:bg-burgundy-dark file:cursor-pointer"
          />
          {paymentFile && (
            <p className="text-green-600 text-sm mt-1">
              Selected: {paymentFile.name}
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isFormValid || submitting}
        className={`w-full py-4 rounded-md text-lg font-medium transition-all duration-200 ${
          isFormValid && !submitting
            ? "bg-burgundy text-white hover:bg-burgundy-dark cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending Order...
          </span>
        ) : (
          "Send Order"
        )}
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Create order page**

Create `src/app/order/page.tsx`:

```tsx
import { Suspense } from "react";
import Link from "next/link";
import OrderForm from "@/components/OrderForm";

export const metadata = {
  title: "Place Order | Bhargavi Collections",
  description: "Place your order for 1 gram gold imitation jewellery from Bhargavi Collections.",
};

export default function OrderPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Place Order</span>
      </nav>

      <h1 className="section-title">Place Your Order</h1>
      <p className="text-center text-gray-600 mb-8">
        Fill in your details below. All fields marked with * are required.
      </p>

      <Suspense fallback={<div className="text-center py-8">Loading form...</div>}>
        <OrderForm />
      </Suspense>
    </div>
  );
}
```

- [ ] **Step 5: Verify**

Navigate to http://localhost:3000/order. Verify: all fields render, validation messages appear for invalid email/phone/pincode, "Send Order" button is disabled until all required fields are filled and a file is selected. Navigate from a product page to verify `?product=id` pre-selects the item.

- [ ] **Step 6: Commit**

```bash
git add src/lib/ src/components/OrderForm.tsx src/app/order/
git commit -m "feat: add order form with validation, Cloudinary upload, and EmailJS integration"
```

---

### Task 7: About + Contact Pages

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/contact/page.tsx`

**Interfaces:**
- Consumes: nothing (static content pages)
- Produces: `/about` and `/contact` pages

- [ ] **Step 1: Create About page**

Create `src/app/about/page.tsx`:

```tsx
import Link from "next/link";

export const metadata = {
  title: "About Us | Bhargavi Collections",
  description:
    "Learn about Bhargavi Collections — your trusted source for 1 gram gold imitation jewellery.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">About Us</span>
      </nav>

      <h1 className="section-title">About Bhargavi Collections</h1>

      <div className="prose prose-lg max-w-none">
        <div className="bg-cream rounded-lg p-8 mb-8">
          <h2 className="font-heading text-2xl text-brand-green mb-4">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Bhargavi Collections is your trusted destination for beautiful 1
            gram gold imitation jewellery. We believe that every woman deserves
            to adorn herself with stunning jewellery without breaking the bank.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Our collection features carefully curated pieces — from traditional
            temple jewellery to contemporary designs — all crafted with
            attention to detail and quality materials.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-gold text-2xl">✦</span>
            </div>
            <h3 className="font-heading text-lg text-brand-green mb-2">
              Quality Craftsmanship
            </h3>
            <p className="text-gray-600 text-sm">
              Each piece is crafted with care using high-quality 1 gram gold
              plating techniques.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-gold text-2xl">₹</span>
            </div>
            <h3 className="font-heading text-lg text-brand-green mb-2">
              Affordable Prices
            </h3>
            <p className="text-gray-600 text-sm">
              Traditional designs at prices that make fine jewellery accessible
              to everyone.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-gold text-2xl">🚚</span>
            </div>
            <h3 className="font-heading text-lg text-brand-green mb-2">
              Reliable Delivery
            </h3>
            <p className="text-gray-600 text-sm">
              Safe and secure delivery to your doorstep with careful packaging.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create Contact page**

Create `src/app/contact/page.tsx`:

```tsx
import Link from "next/link";

export const metadata = {
  title: "Contact Us | Bhargavi Collections",
  description: "Get in touch with Bhargavi Collections for queries about 1 gram gold imitation jewellery.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Contact</span>
      </nav>

      <h1 className="section-title">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-cream rounded-lg p-8">
            <h2 className="font-heading text-2xl text-brand-green mb-6">
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-burgundy/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-burgundy"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Phone</h3>
                  <a
                    href="tel:+918978777800"
                    className="text-burgundy hover:underline"
                  >
                    +91 8978777800
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-burgundy/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-burgundy"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Email</h3>
                  <a
                    href="mailto:Prasannau.dwh@gmail.com"
                    className="text-burgundy hover:underline"
                  >
                    Prasannau.dwh@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-burgundy/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-burgundy"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Business Hours</h3>
                  <p className="text-gray-600">Mon – Sat: 10 AM – 7 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-burgundy/5 rounded-lg p-8">
            <h2 className="font-heading text-2xl text-brand-green mb-4">
              How to Order
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-600">
              <li>Browse our collections and pick your favourite piece</li>
              <li>Click &ldquo;Order Now&rdquo; on the product page</li>
              <li>Fill in your delivery details</li>
              <li>Make payment via UPI or bank transfer</li>
              <li>Upload the payment screenshot</li>
              <li>Submit — we&apos;ll confirm and dispatch your order</li>
            </ol>
          </div>

          <Link href="/order" className="btn-primary text-center">
            Place an Order
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify both pages**

Navigate to http://localhost:3000/about and http://localhost:3000/contact. Verify: breadcrumbs, content renders, contact details correct, links work.

- [ ] **Step 4: Commit**

```bash
git add src/app/about/ src/app/contact/
git commit -m "feat: add about and contact pages"
```

---

### Task 8: Responsive Polish + Final Verification

**Files:**
- Modify: multiple component files for responsive tweaks
- Create: `public/images/` placeholder SVGs (so pages render without broken images)

**Interfaces:**
- Consumes: all prior components
- Produces: polished, responsive site ready for content

- [ ] **Step 1: Create SVG placeholder images**

Create `public/images/placeholder.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#FFF8DC"/>
  <text x="200" y="200" text-anchor="middle" dominant-baseline="central" font-family="serif" font-size="16" fill="#B8860B" opacity="0.5">Product Image</text>
</svg>
```

- [ ] **Step 2: Add Next.js image configuration**

Update `next.config.js` (or `next.config.mjs`):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
```

- [ ] **Step 3: Full responsive verification**

Check every page at three widths:
- Mobile (375px): hamburger menu works, forms stack single-column, product grid is 2-column, text is readable
- Tablet (768px): nav still hamburger or transitions, grid is 3-column
- Desktop (1024px+): full nav, 4-column grid, header logo centered with split nav

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: add placeholder images and responsive polish"
```

---
