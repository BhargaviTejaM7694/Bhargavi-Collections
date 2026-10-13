import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hero-ornate text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.webp"
                alt="BhargaviTeja Collections Logo"
                className="w-14 h-14 rounded-full object-contain"
                style={{ mixBlendMode: "screen" }}
              />
              <h3 className="font-heading text-2xl text-gold-light font-bold">BhargaviTeja Collections</h3>
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
              <a href="mailto:bhargavitejacollections@gmail.com" className="hover:text-gold transition-colors break-all">bhargavitejacollections@gmail.com</a>
              <a href="https://wa.me/919100369789" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">WhatsApp: +91 91003 69789</a>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://www.instagram.com/bhargavitejacollections/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gold-light/10 flex items-center justify-center hover:bg-gold/20 transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5 text-gold-light" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.youtube.com/@hanumanjunctionvlogs" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gold-light/10 flex items-center justify-center hover:bg-gold/20 transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5 text-gold-light" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://wa.me/919100369789" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gold-light/10 flex items-center justify-center hover:bg-gold/20 transition-colors" aria-label="WhatsApp">
                <svg className="w-5 h-5 text-gold-light" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gold/20 mt-8 pt-6 text-sm text-gold-light/60 space-y-3">
          <p className="text-center">&copy; {new Date().getFullYear()} BhargaviTeja Collections. All rights reserved.</p>
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
