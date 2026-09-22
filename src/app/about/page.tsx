import Link from "next/link";

export const metadata = {
  title: "About Us | Bhargavi Collections",
  description: "Learn about Bhargavi Collections — your trusted source for 1 gram gold imitation jewellery.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">About Us</span>
      </nav>

      <h1 className="section-title">About Bhargavi Collections</h1>

      <div>
        <div className="bg-cream rounded-lg p-8 mb-8">
          <h2 className="font-heading text-2xl text-brand-green mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Bhargavi Collections is your trusted destination for beautiful 1 gram gold imitation jewellery. We believe that every woman deserves to adorn herself with stunning jewellery without breaking the bank.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Our collection features carefully curated pieces — from traditional temple jewellery to contemporary designs — all crafted with attention to detail and quality materials.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg text-brand-green mb-2">Quality Craftsmanship</h3>
            <p className="text-gray-600 text-sm">Each piece is crafted with care using high-quality 1 gram gold plating techniques.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg text-brand-green mb-2">Affordable Prices</h3>
            <p className="text-gray-600 text-sm">Traditional designs at prices that make fine jewellery accessible to everyone.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
              </svg>
            </div>
            <h3 className="font-heading text-lg text-brand-green mb-2">Reliable Delivery</h3>
            <p className="text-gray-600 text-sm">Safe and secure delivery to your doorstep with careful packaging.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
