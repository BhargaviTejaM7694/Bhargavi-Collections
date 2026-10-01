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

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 lg:py-12 flex flex-col md:flex-row items-center gap-6 md:gap-8 relative z-10">
        {/* Left: Jewellery image with ornate gold frame */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative rounded-2xl p-[6px] lg:p-2" style={{
            background: "linear-gradient(135deg, #f5d778 0%, #D4A843 30%, #B8860B 60%, #D4A843 100%)",
            boxShadow: "0 0 30px rgba(212, 168, 67, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)",
          }}>
            <div className="rounded-xl overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=600&fit=crop&crop=center&auto=format&q=80"
                alt="Gold necklace jewellery"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            {/* Ornamental corner & edge designs */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 300" preserveAspectRatio="none" aria-hidden="true">
              {/* Top-left corner */}
              <path d="M10,30 Q10,10 30,10" fill="none" stroke="#f5d778" strokeWidth="1.5" />
              <path d="M15,40 C15,20 20,15 40,15" fill="none" stroke="#D4A843" strokeWidth="1" />
              <circle cx="12" cy="12" r="3" fill="#f5d778" opacity="0.8" />
              <path d="M20,10 C25,5 30,8 28,14 C26,8 22,6 20,10Z" fill="#D4A843" opacity="0.6" />
              <path d="M10,20 C5,25 8,30 14,28 C8,26 6,22 10,20Z" fill="#D4A843" opacity="0.6" />
              {/* Top-right corner */}
              <path d="M190,30 Q190,10 170,10" fill="none" stroke="#f5d778" strokeWidth="1.5" />
              <path d="M185,40 C185,20 180,15 160,15" fill="none" stroke="#D4A843" strokeWidth="1" />
              <circle cx="188" cy="12" r="3" fill="#f5d778" opacity="0.8" />
              <path d="M180,10 C175,5 170,8 172,14 C174,8 178,6 180,10Z" fill="#D4A843" opacity="0.6" />
              <path d="M190,20 C195,25 192,30 186,28 C192,26 194,22 190,20Z" fill="#D4A843" opacity="0.6" />
              {/* Bottom-left corner */}
              <path d="M10,270 Q10,290 30,290" fill="none" stroke="#f5d778" strokeWidth="1.5" />
              <path d="M15,260 C15,280 20,285 40,285" fill="none" stroke="#D4A843" strokeWidth="1" />
              <circle cx="12" cy="288" r="3" fill="#f5d778" opacity="0.8" />
              <path d="M20,290 C25,295 30,292 28,286 C26,292 22,294 20,290Z" fill="#D4A843" opacity="0.6" />
              {/* Bottom-right corner */}
              <path d="M190,270 Q190,290 170,290" fill="none" stroke="#f5d778" strokeWidth="1.5" />
              <path d="M185,260 C185,280 180,285 160,285" fill="none" stroke="#D4A843" strokeWidth="1" />
              <circle cx="188" cy="288" r="3" fill="#f5d778" opacity="0.8" />
              <path d="M180,290 C175,295 170,292 172,286 C174,292 178,294 180,290Z" fill="#D4A843" opacity="0.6" />
              {/* Top center flourish */}
              <path d="M80,6 C90,0 100,3 100,3 C100,3 110,0 120,6" fill="none" stroke="#f5d778" strokeWidth="1" />
              <path d="M90,4 Q100,-2 110,4" fill="none" stroke="#D4A843" strokeWidth="0.8" />
              <circle cx="100" cy="3" r="2" fill="#f5d778" opacity="0.7" />
              {/* Bottom center flourish */}
              <path d="M80,294 C90,300 100,297 100,297 C100,297 110,300 120,294" fill="none" stroke="#f5d778" strokeWidth="1" />
              <circle cx="100" cy="297" r="2" fill="#f5d778" opacity="0.7" />
              {/* Side vine accents */}
              <path d="M4,100 C0,110 2,120 4,130 C0,140 2,150 4,160 C0,170 2,180 4,190" fill="none" stroke="#f5d778" strokeWidth="0.8" opacity="0.5" />
              <path d="M196,100 C200,110 198,120 196,130 C200,140 198,150 196,160 C200,170 198,180 196,190" fill="none" stroke="#f5d778" strokeWidth="0.8" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Center: Text content */}
        <div className="text-center flex-1">
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

              {/* Logo in the center - fills the mandala circle */}
              <div className="w-[10rem] h-[10rem] md:w-[12.5rem] md:h-[12.5rem] lg:w-[14.5rem] lg:h-[14.5rem] relative z-10 rounded-full overflow-hidden flex items-center justify-center" style={{
                border: "3px solid #D4A843",
                boxShadow: "0 0 0 2px #B8860B, 0 0 30px rgba(212, 168, 67, 0.4), 0 0 60px rgba(90, 26, 26, 0.6)",
                background: "radial-gradient(circle, #4d1515 0%, #3a0a0a 100%)",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-hero.webp"
                  alt="Bhargavi Teja Collections Logo"
                  className="w-full h-full object-cover scale-[1.08] translate-y-[2px]"
                />
              </div>
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
          <p className="text-white font-medium tracking-[0.35em] uppercase text-base md:text-lg mb-4">
            Imitation Jewellery
          </p>
          <p className="text-gold/80 font-heading tracking-[0.2em] uppercase text-xs md:text-sm mb-6">
            Wholesale &bull; Retail &bull; Rental
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

        {/* Right: Jewellery image with ornate gold frame */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative rounded-2xl p-[6px] lg:p-2" style={{
            background: "linear-gradient(135deg, #f5d778 0%, #D4A843 30%, #B8860B 60%, #D4A843 100%)",
            boxShadow: "0 0 30px rgba(212, 168, 67, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)",
          }}>
            <div className="rounded-xl overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1758995115518-26f90aa61b97?w=400&h=600&fit=crop&crop=center&auto=format&q=80"
                alt="Elegant Indian bridal jewellery"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            {/* Ornamental corner & edge designs */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 300" preserveAspectRatio="none" aria-hidden="true">
              <path d="M10,30 Q10,10 30,10" fill="none" stroke="#f5d778" strokeWidth="1.5" />
              <path d="M15,40 C15,20 20,15 40,15" fill="none" stroke="#D4A843" strokeWidth="1" />
              <circle cx="12" cy="12" r="3" fill="#f5d778" opacity="0.8" />
              <path d="M20,10 C25,5 30,8 28,14 C26,8 22,6 20,10Z" fill="#D4A843" opacity="0.6" />
              <path d="M10,20 C5,25 8,30 14,28 C8,26 6,22 10,20Z" fill="#D4A843" opacity="0.6" />
              <path d="M190,30 Q190,10 170,10" fill="none" stroke="#f5d778" strokeWidth="1.5" />
              <path d="M185,40 C185,20 180,15 160,15" fill="none" stroke="#D4A843" strokeWidth="1" />
              <circle cx="188" cy="12" r="3" fill="#f5d778" opacity="0.8" />
              <path d="M180,10 C175,5 170,8 172,14 C174,8 178,6 180,10Z" fill="#D4A843" opacity="0.6" />
              <path d="M190,20 C195,25 192,30 186,28 C192,26 194,22 190,20Z" fill="#D4A843" opacity="0.6" />
              <path d="M10,270 Q10,290 30,290" fill="none" stroke="#f5d778" strokeWidth="1.5" />
              <path d="M15,260 C15,280 20,285 40,285" fill="none" stroke="#D4A843" strokeWidth="1" />
              <circle cx="12" cy="288" r="3" fill="#f5d778" opacity="0.8" />
              <path d="M20,290 C25,295 30,292 28,286 C26,292 22,294 20,290Z" fill="#D4A843" opacity="0.6" />
              <path d="M190,270 Q190,290 170,290" fill="none" stroke="#f5d778" strokeWidth="1.5" />
              <path d="M185,260 C185,280 180,285 160,285" fill="none" stroke="#D4A843" strokeWidth="1" />
              <circle cx="188" cy="288" r="3" fill="#f5d778" opacity="0.8" />
              <path d="M180,290 C175,295 170,292 172,286 C174,292 178,294 180,290Z" fill="#D4A843" opacity="0.6" />
              <path d="M80,6 C90,0 100,3 100,3 C100,3 110,0 120,6" fill="none" stroke="#f5d778" strokeWidth="1" />
              <path d="M90,4 Q100,-2 110,4" fill="none" stroke="#D4A843" strokeWidth="0.8" />
              <circle cx="100" cy="3" r="2" fill="#f5d778" opacity="0.7" />
              <path d="M80,294 C90,300 100,297 100,297 C100,297 110,300 120,294" fill="none" stroke="#f5d778" strokeWidth="1" />
              <circle cx="100" cy="297" r="2" fill="#f5d778" opacity="0.7" />
              <path d="M4,100 C0,110 2,120 4,130 C0,140 2,150 4,160 C0,170 2,180 4,190" fill="none" stroke="#f5d778" strokeWidth="0.8" opacity="0.5" />
              <path d="M196,100 C200,110 198,120 196,130 C200,140 198,150 196,160 C200,170 198,180 196,190" fill="none" stroke="#f5d778" strokeWidth="0.8" opacity="0.5" />
            </svg>
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
