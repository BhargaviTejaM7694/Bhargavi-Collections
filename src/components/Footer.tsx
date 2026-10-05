import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hero-ornate text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.webp"
                alt="Bhargavi Teja Collections Logo"
                className="w-14 h-14 rounded-full object-contain"
                style={{ mixBlendMode: "screen" }}
              />
              <h3 className="font-heading text-2xl text-gold-light font-bold">Bhargavi Teja Collections</h3>
            </div>
            <p className="text-gold-light/70 text-sm leading-relaxed">
              Your trusted destination for wholesale, retail &amp; rental imitation jewellery. Quality craftsmanship at affordable prices.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-lg text-gold-light font-bold mb-3">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/collections/necklaces", label: "Shop" },
                { href: "/order", label: "Place Order" },
                { href: "/order-status", label: "Track Order" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-gold-light/70 hover:text-gold text-sm transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="font-heading text-lg text-gold-light font-bold mb-3">Policies</h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/customer-support", label: "Customer Support" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/refund-policy", label: "Refund Policy" },
                { href: "/shipping-policy", label: "Shipping Policy" },
                { href: "/terms-of-service", label: "Terms of Service" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-gold-light/70 hover:text-gold text-sm transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="font-heading text-lg text-gold-light font-bold mb-3">Contact Us</h4>
            <div className="flex flex-col gap-2 text-sm text-gold-light/70">
              <a href="tel:+919100369789" className="hover:text-gold transition-colors">+91 91003 69789</a>
              <a href="mailto:bhargavitejacollections@gmail.com" className="hover:text-gold transition-colors">bhargavitejacollections@gmail.com</a>
              <a href="https://wa.me/919100369789" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">WhatsApp: +91 91003 69789</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gold/20 mt-8 pt-6 text-sm text-gold-light/60 space-y-3">
          <p className="text-center">&copy; {new Date().getFullYear()} Bhargavi Teja Collections. All rights reserved.</p>
          <div className="text-center text-xs text-gold-light/50">
            <p>Designed by <span className="text-gold-light/70 font-medium">AI Wealth Creators</span></p>
            <p>
              <a href="mailto:aiwealthcreators6@gmail.com" className="hover:text-gold transition-colors">aiwealthcreators6@gmail.com</a>
              <span className="mx-1">|</span>
              <a href="https://wa.me/918978777800" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">+91 8978777800 (WhatsApp only)</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
