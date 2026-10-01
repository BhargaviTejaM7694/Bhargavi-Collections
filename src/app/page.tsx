import HeroSection from "@/components/HeroSection";
import ShopByCollections from "@/components/ShopByCollections";
import BestSellers from "@/components/BestSellers";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Wholesale, Retail & Rental highlight */}
      <section className="py-4" style={{ background: "linear-gradient(90deg, #3a0a0a 0%, #4d1515 50%, #3a0a0a 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center items-center gap-4 md:gap-10">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4z" /></svg>
            <span className="text-gold font-heading text-sm md:text-base font-semibold tracking-wide uppercase">Wholesale</span>
          </div>
          <span className="text-gold/30 text-xl hidden md:inline">|</span>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>
            <span className="text-gold font-heading text-sm md:text-base font-semibold tracking-wide uppercase">Retail</span>
          </div>
          <span className="text-gold/30 text-xl hidden md:inline">|</span>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-2a4 4 0 00-4-4h-2V5a1 1 0 00-1-1H3zm10 3h1a2 2 0 012 2v1h-3V7z" /></svg>
            <span className="text-gold font-heading text-sm md:text-base font-semibold tracking-wide uppercase">Rental</span>
          </div>
        </div>
      </section>

      <ShopByCollections />
      <BestSellers />
      <FeaturedProducts />

      {/* Why Choose Us */}
      <section className="bg-cream py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-burgundy mb-4">
            Why Choose Bhargavi Teja Collections
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Premium <strong>1 gram gold imitation jewellery</strong> from <strong>Hanuman Junction, Vijayawada</strong> — handpicked designs, quality craftsmanship, and <strong>free delivery across Andhra Pradesh</strong>. Traditional elegance at affordable prices.
          </p>
        </div>
      </section>
    </>
  );
}
