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
        <div className="bg-burgundy text-white text-center text-sm py-1.5 px-4">
          Free Delivery on Orders Above ₹999 |{" "}
          <a href="tel:+918978777800" className="underline">
            Call: +91 8978777800
          </a>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-700 hover:text-burgundy font-medium transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="flex flex-col items-center">
            <span className="font-heading text-2xl md:text-3xl text-brand-green font-bold leading-tight">Bhargavi</span>
            <span className="font-heading text-lg md:text-xl text-gold leading-tight">Collections</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.slice(2).map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-700 hover:text-burgundy font-medium transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/order" className="text-gray-700 hover:text-burgundy transition-colors" aria-label="Place Order">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} links={navLinks} />
    </>
  );
}
