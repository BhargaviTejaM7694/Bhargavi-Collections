"use client";

import Link from "next/link";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
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
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 h-full w-72 mobile-menu-ornate z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-heading text-xl header-brand-text font-bold block">Bhargavi</span>
              <span className="font-heading text-sm text-gold-light/80 tracking-[0.2em] uppercase">Collections</span>
            </div>
            <button onClick={onClose} aria-label="Close menu" className="p-1 text-gold-light hover:text-gold transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-2 mb-6">
            <span className="block flex-1 h-[1px] bg-gold/30" />
            <span className="block w-1.5 h-1.5 rounded-full bg-gold/50" />
            <span className="block flex-1 h-[1px] bg-gold/30" />
          </div>

          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-base text-cream/80 hover:text-gold-light py-3 px-3 rounded-md hover:bg-white/5 tracking-wide uppercase transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6">
              <Link
                href="/order"
                onClick={onClose}
                className="hero-btn-primary block text-center rounded-md py-3 font-medium"
              >
                Place Order
              </Link>
            </div>
          </nav>

          {/* Bottom info */}
          <div className="absolute bottom-8 left-6 right-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="block flex-1 h-[1px] bg-gold/20" />
              <span className="block w-1 h-1 rounded-full bg-gold/40" />
              <span className="block flex-1 h-[1px] bg-gold/20" />
            </div>
            <a href="tel:+918978777800" className="text-sm text-gold-light/60 hover:text-gold-light block text-center transition-colors">
              +91 8978777800
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
