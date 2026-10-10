import Link from "next/link";
import HeroSlideshow from "./HeroSlideshow";

const leftImages = ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png"];
const rightImages = ["/6.png", "/7.png", "/8.png", "/9.png", "/10.png"];

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

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 lg:py-12 flex flex-col lg:flex-row items-center gap-6 lg:gap-8 relative z-10">
        {/* Left: Jewellery slideshow - hidden below lg, shown on lg+ */}
        <div className="hidden lg:flex flex-1 justify-center">
          <HeroSlideshow images={leftImages} alt="BhargaviTeja Collections jewellery" />
        </div>

        {/* Center: Text content */}
        <div className="text-center flex-1">
          {/* Brand logo */}
          <div className="mb-4 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-brand.webp"
              alt="BhargaviTeja Collections — Retail, Rental, Wholesale"
              className="w-72 md:w-[26rem] lg:w-[32rem] h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Logo with golden mandala flower background */}
          <div className="mb-2 flex justify-center">
            <div className="relative flex items-center justify-center w-52 h-52 md:w-[22rem] md:h-[22rem] lg:w-[25rem] lg:h-[25rem]">
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

              {/* Logo in the center - fills the mandala circle */}
              <div className="w-[6.5rem] h-[6.5rem] md:w-[10rem] md:h-[10rem] lg:w-[12rem] lg:h-[12rem] relative z-10 rounded-full overflow-hidden flex items-center justify-center" style={{
                border: "3px solid #D4A843",
                boxShadow: "0 0 0 2px #B8860B, 0 0 30px rgba(212, 168, 67, 0.4), 0 0 60px rgba(90, 26, 26, 0.6)",
                background: "radial-gradient(circle, #4d1515 0%, #3a0a0a 100%)",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-hero.webp"
                  alt="BhargaviTeja Collections Logo"
                  className="w-full h-full object-cover scale-[1.08] translate-y-[2px]"
                />
              </div>
            </div>
          </div>

          {/* Mobile/Tablet: Both slideshows side by side */}
          <div className="flex lg:hidden justify-center gap-4 mb-6">
            <HeroSlideshow images={leftImages} alt="BhargaviTeja Collections jewellery" mobile />
            <HeroSlideshow images={rightImages} alt="BhargaviTeja Collections jewellery" mobile />
          </div>

          <p className="text-white font-medium tracking-[0.35em] uppercase text-sm md:text-lg mb-3 md:mb-4">
            Imitation Jewellery
          </p>

          <p className="text-white/60 text-sm md:text-lg mb-6 md:mb-8 max-w-md mx-auto leading-relaxed">
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

        {/* Right: Jewellery slideshow - hidden below lg, shown on lg+ */}
        <div className="hidden lg:flex flex-1 justify-center">
          <HeroSlideshow images={rightImages} alt="BhargaviTeja Collections jewellery" />
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
