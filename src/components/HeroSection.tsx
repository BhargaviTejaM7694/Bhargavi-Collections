import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <p className="text-gold font-medium tracking-widest uppercase text-sm mb-2">Welcome to</p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-brand-green font-bold leading-tight mb-3">
            Bhargavi<br />Collections
          </h1>
          <p className="font-heading text-xl md:text-2xl text-gold tracking-[0.2em] uppercase mb-6">
            1 Gram Jewellery
          </p>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto md:mx-0">
            Discover exquisite imitation jewellery crafted with love. Traditional designs at affordable prices.
          </p>
          <Link href="/collections/necklaces" className="btn-primary inline-block">
            Shop Now
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-gold/30 bg-gradient-to-br from-gold/20 to-burgundy/10 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-20 h-20 mx-auto text-gold/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-gold/50 font-heading text-lg">Bhargavi</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0,40 C360,0 720,60 1080,20 C1260,0 1380,30 1440,40 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
