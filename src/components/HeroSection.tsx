import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-ornate">
      {/* Subtle gold dot pattern background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="gold-dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="#D4A843" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#gold-dots)" />
        </svg>
      </div>

      {/* Subtle decorative accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-28 flex flex-col items-center relative z-10">
        <div className="text-center w-full">
          {/* Logo with golden mandala flower background */}
          <div className="mb-2 flex justify-center">
            <div className="relative flex items-center justify-center w-80 h-80 md:w-[27rem] md:h-[27rem] lg:w-[30rem] lg:h-[30rem]">
              {/* Mandala flower image - blend with hero bg */}
              <div className="absolute inset-0" style={{
                WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)",
                maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/mandala-flower.png"
                  alt=""
                  className="w-full h-full object-contain"
                  aria-hidden="true"
                />
              </div>

              {/* Logo embossed in the center */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.webp"
                alt="Bhargavi Teja Collections Logo"
                className="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full object-cover relative z-10"
                style={{
                  border: "3px solid rgba(212, 168, 67, 0.6)",
                  boxShadow: "0 0 30px rgba(212, 168, 67, 0.3), 0 0 60px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(212, 168, 67, 0.1)",
                }}
              />
            </div>
          </div>

          <p className="text-gold/70 font-medium tracking-[0.3em] uppercase text-sm mb-3">
            Welcome to
          </p>
          <div className="mb-4 overflow-visible">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl hero-brand-text font-bold leading-[1.4] pb-2">
              Bhargavi Teja
            </h1>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl hero-brand-text font-bold leading-[1.4] pb-3">
              Collections
            </h1>
          </div>
          <p className="text-white font-medium tracking-[0.35em] uppercase text-base md:text-lg mb-6">
            Imitation Jewellery
          </p>

          <p className="text-white/60 text-base md:text-lg mb-8 max-w-md mx-auto leading-relaxed">
            Exquisite designs crafted with love.
            Traditional elegance at affordable prices.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
