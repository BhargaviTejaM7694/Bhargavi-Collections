import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-ornate">
      {/* Subtle decorative accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-burgundy/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-28 flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
        {/* Left: Text content */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-burgundy/60 font-medium tracking-[0.3em] uppercase text-sm mb-3">
            Welcome to
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl hero-brand-text font-bold leading-tight mb-2">
            Bhargavi Teja
          </h1>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl hero-brand-text font-bold leading-tight mb-4">
            Collections
          </h1>
          <p className="text-burgundy/50 tracking-[0.2em] uppercase text-sm md:text-base mb-6 font-medium">
            Discover the Latest Trends in 1 Gram Imitation Jewellery.
          </p>

          <p className="text-burgundy-dark/60 text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
            Exquisite designs crafted with love.
            Traditional elegance at affordable prices.
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

        {/* Right: Overlapping tilted image cards */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-[340px] h-[340px] md:w-[520px] md:h-[440px]">
            {/* Card 1 - Back left, tilted left */}
            <div
              className="absolute -left-4 md:-left-6 top-6 md:top-10 w-52 h-[280px] md:w-64 md:h-[370px] rounded-2xl overflow-hidden shadow-xl"
              style={{
                transform: "rotate(-8deg)",
                border: "4px solid rgba(26,58,42,0.25)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=700&fit=crop&crop=center&auto=format&q=80"
                alt="Gold necklace jewellery"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card 2 - Center front, straight */}
            <div
              className="absolute left-1/2 top-0 w-52 h-[300px] md:w-64 md:h-[400px] rounded-2xl overflow-hidden shadow-2xl z-10"
              style={{
                transform: "translateX(-50%) rotate(2deg)",
                border: "4px solid rgba(26,58,42,0.35)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1758995115518-26f90aa61b97?w=500&h=700&fit=crop&crop=center&auto=format&q=80"
                alt="Elegant Indian bridal jewellery"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card 3 - Back right, tilted right */}
            <div
              className="absolute -right-4 md:-right-6 top-8 md:top-12 w-52 h-[270px] md:w-64 md:h-[360px] rounded-2xl overflow-hidden shadow-xl"
              style={{
                transform: "rotate(8deg)",
                border: "4px solid rgba(26,58,42,0.25)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=700&fit=crop&crop=center&auto=format&q=80"
                alt="Traditional gold bangles"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative gold glow behind cards */}
            <div
              className="absolute inset-0 -z-10 rounded-full opacity-20 blur-3xl"
              style={{
                background: "radial-gradient(circle, rgba(26,58,42,0.3) 0%, transparent 70%)",
              }}
            />
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
