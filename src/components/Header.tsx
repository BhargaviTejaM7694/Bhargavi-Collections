"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useCart } from "@/context/CartContext";
import { getAdminCategories } from "@/lib/storage";
import type { Category } from "@/types";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/order-status", label: "Track Order" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { itemCount } = useCart();
  const shopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getAdminCategories().then(setCategories);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}>
        {/* Top announcement bar */}
        <div className="bg-gradient-to-r from-burgundy-dark via-burgundy to-burgundy-dark text-center text-sm py-1.5 px-4">
          <span className="text-gold-light tracking-wide">
            Free Delivery on All Orders
          </span>
          <span className="text-gold-light/50 mx-2">|</span>
          <a href="tel:+919100369789" className="text-white hover:text-gold-light transition-colors">
            Call: +91 91003 69789
          </a>
        </div>

        {/* Main header */}
        <div className="header-ornate relative border-b border-gray-200">
          {/* Ornamental background pattern */}
          <div className="absolute inset-0 opacity-[0.04]">
            <svg className="w-full h-full" viewBox="0 0 1200 80" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="mandala-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <circle cx="40" cy="40" r="35" fill="none" stroke="#4d1515" strokeWidth="0.5" />
                  <circle cx="40" cy="40" r="25" fill="none" stroke="#4d1515" strokeWidth="0.5" />
                  <circle cx="40" cy="40" r="15" fill="none" stroke="#4d1515" strokeWidth="0.5" />
                  <circle cx="40" cy="40" r="5" fill="#4d1515" opacity="0.3" />
                  <path d="M40 5 L45 35 L40 40 L35 35 Z" fill="#4d1515" opacity="0.2" />
                  <path d="M75 40 L45 45 L40 40 L45 35 Z" fill="#4d1515" opacity="0.2" />
                  <path d="M40 75 L35 45 L40 40 L45 45 Z" fill="#4d1515" opacity="0.2" />
                  <path d="M5 40 L35 35 L40 40 L35 45 Z" fill="#4d1515" opacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mandala-pattern)" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative z-10">
            {/* Left: Hamburger (mobile) + Logo + Nav links */}
            <div className="flex items-center gap-6">
              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 text-burgundy hover:text-burgundy-dark transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.webp"
                  alt="Bhargavi Teja Collections Logo"
                  className="w-11 h-11 md:w-12 md:h-12 rounded-full object-contain flex-shrink-0 bg-burgundy-dark"
                />
                <div className="flex flex-col">
                  <span className="font-heading text-xl md:text-2xl header-brand-text font-bold leading-tight">
                    Bhargavi Teja
                  </span>
                  <span className="font-heading text-[10px] md:text-xs text-burgundy tracking-[0.25em] uppercase leading-tight font-semibold">
                    Collections
                  </span>
                </div>
              </Link>

              {/* Nav links */}
              <nav className="hidden lg:flex items-center gap-6 ml-4">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-burgundy font-medium tracking-wide uppercase text-sm transition-colors duration-200"
                >
                  Home
                </Link>

                {/* Shop dropdown */}
                <div ref={shopRef} className="relative">
                  <button
                    onClick={() => setShopOpen(!shopOpen)}
                    className="flex items-center gap-1 text-gray-700 hover:text-burgundy font-medium tracking-wide uppercase text-sm transition-colors duration-200"
                  >
                    Shop
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {shopOpen && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/collections/${cat.id}`}
                          onClick={() => setShopOpen(false)}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-cream hover:text-burgundy transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/about"
                  className="text-gray-700 hover:text-burgundy font-medium tracking-wide uppercase text-sm transition-colors duration-200"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-burgundy font-medium tracking-wide uppercase text-sm transition-colors duration-200"
                >
                  Contact
                </Link>
                <Link
                  href="/order-status"
                  className="text-gray-700 hover:text-burgundy font-medium tracking-wide uppercase text-sm transition-colors duration-200"
                >
                  Track Order
                </Link>
              </nav>
            </div>

            {/* Right: Cart bag + Admin Login */}
            <div className="flex items-center gap-4">
              <Link
                href="/order"
                className="relative text-burgundy hover:text-burgundy-dark transition-colors"
                aria-label="Place Order"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-burgundy-dark text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              <Link
                href="/admin"
                className="hidden lg:flex items-center gap-1.5 text-burgundy/70 hover:text-burgundy text-sm font-medium tracking-wide uppercase transition-colors duration-200 border border-burgundy/30 hover:border-burgundy/60 rounded-md px-3 py-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
        categories={categories}
      />
    </>
  );
}
