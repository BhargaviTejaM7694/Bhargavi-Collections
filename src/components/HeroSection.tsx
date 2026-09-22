import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-ornate">
      {/* Ornamental corner decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 md:w-64 md:h-64 opacity-[0.12]">
        <svg viewBox="0 0 200 200" className="w-full h-full text-gold">
          <defs>
            <pattern id="corner-pattern-tl" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#corner-pattern-tl)" />
          <circle cx="0" cy="0" r="150" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <circle cx="0" cy="0" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 opacity-[0.12]">
        <svg viewBox="0 0 200 200" className="w-full h-full text-gold">
          <circle cx="200" cy="0" r="150" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <circle cx="200" cy="0" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <circle cx="200" cy="0" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        </svg>
      </div>

      {/* Gold line accents */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-28 flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
        {/* Left: Text content */}
        <div className="flex-1 text-center md:text-left">
          {/* Small jewellery icon */}
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="block w-10 h-[1px] bg-gold-light/60" />
            <svg className="w-6 h-6 text-gold-light" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9 9H2l6 4.5L5.5 22 12 17l6.5 5L16 13.5 22 9h-7L12 2z" />
            </svg>
            <span className="block w-10 h-[1px] bg-gold-light/60" />
          </div>

          <p className="text-gold-light font-medium tracking-[0.3em] uppercase text-sm mb-3">
            Welcome to
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl hero-brand-text font-bold leading-tight mb-2">
            Bhargavi
          </h1>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl hero-brand-text font-bold leading-tight mb-4">
            Collections
          </h1>
          <p className="text-gold-light/80 tracking-[0.4em] uppercase text-sm md:text-base mb-6 font-medium">
            1 Gram Imitation Jewellery
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
            <span className="block w-12 h-[1px] bg-gold/40" />
            <span className="block w-2 h-2 rounded-full bg-gold/60" />
            <span className="block w-20 h-[1px] bg-gold/40" />
            <span className="block w-2 h-2 rounded-full bg-gold/60" />
            <span className="block w-12 h-[1px] bg-gold/40" />
          </div>

          <p className="text-cream/70 text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
            Discover exquisite imitation jewellery crafted with love.
            Traditional designs at affordable prices.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Link
              href="/collections/necklaces"
              className="hero-btn-primary inline-block text-center"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="hero-btn-outline inline-block text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right: Circular image with gold frame */}
        <div className="flex-1 flex justify-center">
          <div className="relative">
            {/* Outer decorative ring */}
            <div className="absolute -inset-4 md:-inset-6 rounded-full border border-gold/20" />
            <div className="absolute -inset-8 md:-inset-10 rounded-full border border-gold/10" />

            {/* Corner ornaments around circle */}
            <div className="absolute -top-3 -right-3 w-8 h-8 md:w-10 md:h-10">
              <svg viewBox="0 0 40 40" className="w-full h-full text-gold/40">
                <path d="M0 0 Q20 0 20 20 Q0 20 0 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="absolute -bottom-3 -left-3 w-8 h-8 md:w-10 md:h-10 rotate-180">
              <svg viewBox="0 0 40 40" className="w-full h-full text-gold/40">
                <path d="M0 0 Q20 0 20 20 Q0 20 0 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Main image circle */}
            <div className="w-72 h-72 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-[5px] border-gold/50 shadow-2xl hero-image-glow">
              <img
                src="https://images.unsplash.com/photo-1758995115518-26f90aa61b97?w=800&h=800&fit=crop&crop=center&auto=format&q=80"
                alt="Beautiful Indian gold jewellery collection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full h-auto" preserveAspectRatio="none">
          <path
            d="M0,40 C360,0 720,60 1080,20 C1260,0 1380,30 1440,40 L1440,60 L0,60 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
