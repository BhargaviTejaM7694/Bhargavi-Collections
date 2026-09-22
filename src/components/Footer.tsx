import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-green text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-2xl text-gold mb-3">Bhargavi Collections</h3>
            <p className="text-green-100 text-sm leading-relaxed">
              Your trusted destination for beautiful 1 gram gold imitation jewellery. Quality craftsmanship at affordable prices.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-lg text-gold mb-3">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/collections/necklaces", label: "Shop" },
                { href: "/order", label: "Place Order" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-green-100 hover:text-gold text-sm transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="font-heading text-lg text-gold mb-3">Contact Us</h4>
            <div className="flex flex-col gap-2 text-sm text-green-100">
              <a href="tel:+918978777800" className="hover:text-gold transition-colors">+91 8978777800</a>
              <a href="mailto:Prasannau.dwh@gmail.com" className="hover:text-gold transition-colors">Prasannau.dwh@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="border-t border-green-800 mt-8 pt-6 text-center text-sm text-green-200">
          &copy; {new Date().getFullYear()} Bhargavi Collections. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
