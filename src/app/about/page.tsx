import Link from "next/link";

export const metadata = {
  title: "About Us",
  description: "Learn about Bhargavi Teja Collections from Hanuman Junction, near Vijayawada — your trusted source for wholesale, retail & rental 1 gram gold imitation jewellery in Andhra Pradesh. Quality craftsmanship at affordable prices.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">About Us</span>
      </nav>

      <h1 className="section-title">About Bhargavi Teja Collections</h1>

      <div>
        <div className="bg-cream rounded-lg p-8 mb-8">
          <h2 className="font-heading text-2xl text-burgundy mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Bhargavi Teja Collections is your trusted destination for beautiful 1 gram gold imitation jewellery. We offer <strong>wholesale, retail, and rental</strong> services — making it easy for everyone to adorn themselves with stunning jewellery without breaking the bank.
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
            <h3 className="font-heading text-lg text-burgundy mb-2">Quality Craftsmanship</h3>
            <p className="text-gray-600 text-sm">Each piece is crafted with care using high-quality 1 gram gold plating techniques.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg text-burgundy mb-2">Affordable Prices</h3>
            <p className="text-gray-600 text-sm">Traditional designs at prices that make fine jewellery accessible to everyone.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
              </svg>
            </div>
            <h3 className="font-heading text-lg text-burgundy mb-2">Reliable Delivery</h3>
            <p className="text-gray-600 text-sm">Safe and secure delivery to your doorstep with careful packaging.</p>
          </div>
        </div>

        {/* Detailed SEO content */}
        <div className="bg-cream rounded-lg p-8">
          <h2 className="font-heading text-2xl text-burgundy mb-4">Best 1 Gram Gold Imitation Jewellery in Vijayawada &amp; Hanuman Junction</h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
              Welcome to <strong>Bhargavi Teja Collections</strong>, your trusted destination for premium <strong>1 gram gold imitation jewellery</strong> from <strong>Hanuman Junction</strong>, near <strong>Vijayawada, Andhra Pradesh</strong>. We offer an exquisite range of gold-plated jewellery including necklaces, earrings, bangles, chains, rings, pendants, long harams, chokers, bridal sets, and temple jewellery — available for <strong>wholesale, retail, and rental</strong> at affordable prices.
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
              Shop online or call us at <a href="tel:+919100369789" className="text-burgundy font-medium hover:underline">+91 91003 69789</a> to place your order. Experience the elegance of traditional Indian jewellery craftsmanship at unbeatable prices with Bhargavi Teja Collections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
