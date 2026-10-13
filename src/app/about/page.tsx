import Link from "next/link";

export const metadata = {
  title: "About Us",
  description: "Learn about BhargaviTeja Collections from Hanuman Junction, near Vijayawada — your trusted source for wholesale, retail & rental 1 gram gold imitation jewellery in Andhra Pradesh. Quality craftsmanship at affordable prices.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">About Us</span>
      </nav>

      <h1 className="section-title">About BhargaviTeja Collections</h1>

      <div>
        <div className="bg-cream rounded-lg p-8 mb-8">
          <h2 className="font-heading text-2xl text-burgundy mb-4 font-bold">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            BhargaviTeja Collections is your trusted destination for beautiful 1 gram gold imitation jewellery. We offer <strong>wholesale, retail, and rental</strong> services — making it easy for everyone to adorn themselves with stunning jewellery without breaking the bank.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Our collection features carefully curated pieces — from traditional temple jewellery to contemporary designs — all crafted with attention to detail and quality materials. Whether you need <strong>bulk wholesale jewellery</strong> for your boutique, a single piece for a special occasion, or <strong>rental jewellery for weddings and events</strong>, we have you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg text-burgundy mb-2 font-bold">Quality Craftsmanship</h3>
            <p className="text-gray-600 text-sm">Each piece is crafted with care using high-quality 1 gram gold plating techniques.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg text-burgundy mb-2 font-bold">Affordable Prices</h3>
            <p className="text-gray-600 text-sm">Traditional designs at prices that make fine jewellery accessible to everyone.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
              </svg>
            </div>
            <h3 className="font-heading text-lg text-burgundy mb-2 font-bold">Reliable Delivery</h3>
            <p className="text-gray-600 text-sm">Safe and secure delivery to your doorstep with careful packaging.</p>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl text-burgundy mb-4 font-bold">Follow Us</h2>
          <p className="text-gray-600 text-sm mb-5">Stay connected for the latest collections and offers</p>
          <div className="flex items-center justify-center gap-4">
            <a href="https://www.instagram.com/bhargavitejacollections/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center hover:scale-110 transition-transform" aria-label="Instagram">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.youtube.com/@hanumanjunctionvlogs" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition-transform" aria-label="YouTube">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://wa.me/919100369789" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform" aria-label="WhatsApp">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>

        {/* Detailed SEO content */}
        <div className="bg-cream rounded-lg p-8">
          <h2 className="font-heading text-2xl text-burgundy mb-4 font-bold">Best 1 Gram Gold Imitation Jewellery in Vijayawada &amp; Hanuman Junction</h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
              Welcome to <strong>BhargaviTeja Collections</strong>, your trusted destination for premium <strong>1 gram gold imitation jewellery</strong> from <strong>Hanuman Junction</strong>, near <strong>Vijayawada, Andhra Pradesh</strong>. We offer an exquisite range of gold-plated jewellery including necklaces, earrings, bangles, chains, rings, pendants, long harams, chokers, bridal sets, and temple jewellery — available for <strong>wholesale, retail, and rental</strong> at affordable prices.
            </p>
            <p>
              <strong>Wholesale jewellery</strong> — we supply in bulk to jewellery shops, boutiques, and resellers across Andhra Pradesh and Telangana at the best trade prices. <strong>Retail</strong> — buy individual pieces for personal use with free delivery. <strong>Rental jewellery</strong> — rent stunning bridal sets, necklaces, and complete wedding jewellery collections for your special day at a fraction of the cost.
            </p>
            <p>
              Whether you&apos;re looking for <strong>bridal jewellery in Vijayawada</strong>, <strong>artificial jewellery near Hanuman Junction</strong>, or <strong>fashion jewellery in Andhra Pradesh</strong>, we have the perfect collection for every occasion — weddings, festivals, engagements, and everyday wear.
            </p>
            <p>
              We proudly serve customers across <strong>Krishna district</strong> and beyond — including <strong>Vijayawada</strong>, <strong>Gudivada</strong>, <strong>Machilipatnam</strong>, <strong>Tenali</strong>, <strong>Guntur</strong>, <strong>Eluru</strong>, <strong>Rajahmundry</strong>, and all cities in <strong>Andhra Pradesh</strong>. Enjoy <strong>free delivery on all orders</strong> with quality assurance and beautiful packaging.
            </p>
            <p>
              Shop online or call us at <a href="tel:+919100369789" className="text-burgundy font-medium hover:underline">+91 91003 69789</a> to place your order. Experience the elegance of traditional Indian jewellery craftsmanship at unbeatable prices with BhargaviTeja Collections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
