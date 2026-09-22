"use client";

import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}>
        {/* Top announcement bar */}
        <div className="bg-gradient-to-r from-burgundy-dark via-burgundy to-burgundy-dark text-center text-sm py-1.5 px-4">
          <span className="text-gold-light tracking-wide">
            Free Delivery on Orders Above ₹999
          </span>
          <span className="text-gold-light/50 mx-2">|</span>
          <a href="tel:+918978777800" className="text-white hover:text-gold-light transition-colors">
            Call: +91 8978777800
          </a>
        </div>

        {/* Main header */}
        <div className="header-ornate relative overflow-hidden">
          {/* Ornamental background pattern */}
          <div className="absolute inset-0 opacity-[0.08]">
            <svg className="w-full h-full" viewBox="0 0 1200 80" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="mandala-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <circle cx="40" cy="40" r="35" fill="none" stroke="#D4A843" strokeWidth="0.5" />
                  <circle cx="40" cy="40" r="25" fill="none" stroke="#D4A843" strokeWidth="0.5" />
                  <circle cx="40" cy="40" r="15" fill="none" stroke="#D4A843" strokeWidth="0.5" />
                  <circle cx="40" cy="40" r="5" fill="#D4A843" opacity="0.3" />
                  <path d="M40 5 L45 35 L40 40 L35 35 Z" fill="#D4A843" opacity="0.2" />
                  <path d="M75 40 L45 45 L40 40 L45 35 Z" fill="#D4A843" opacity="0.2" />
                  <path d="M40 75 L35 45 L40 40 L45 45 Z" fill="#D4A843" opacity="0.2" />
                  <path d="M5 40 L35 35 L40 40 L35 45 Z" fill="#D4A843" opacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mandala-pattern)" />
            </svg>
          </div>

          {/* Gold border accents */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-light to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-light to-transparent" />

          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative z-10">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-gold-light hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Left nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-cream/90 hover:text-gold-light font-medium tracking-wide uppercase text-sm transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Center logo */}
            <Link href="/" className="flex flex-col items-center group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gold/50 flex items-center justify-center mb-1 group-hover:border-gold transition-colors">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zM8.5 9.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm5 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zM12 17c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4z" />
                </svg>
              </div>
              <span className="font-heading text-2xl md:text-3xl header-brand-text font-bold leading-tight">
                Bhargavi
              </span>
              <span className="font-heading text-sm md:text-base text-gold-light tracking-[0.3em] uppercase leading-tight">
                Collections
              </span>
            </Link>

            {/* Right nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-cream/90 hover:text-gold-light font-medium tracking-wide uppercase text-sm transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Order bag icon */}
            <div className="flex items-center gap-4">
              <Link
                href="/order"
                className="text-gold-light hover:text-gold transition-colors"
                aria-label="Place Order"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} links={navLinks} />
    </>
  );
}
