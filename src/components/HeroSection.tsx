import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-ornate">
      {/* Gold ornamental SVG background pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Top-right mandala */}
        <svg
          className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-[0.08]"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="180" stroke="#D4A843" strokeWidth="1" />
          <circle cx="200" cy="200" r="150" stroke="#D4A843" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="120" stroke="#D4A843" strokeWidth="0.6" />
          <circle cx="200" cy="200" r="90" stroke="#D4A843" strokeWidth="0.5" />
          {/* Petals */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 200 200)`}>
              <path
                d="M200 20 Q220 100 200 180 Q180 100 200 20"
                stroke="#D4A843"
                strokeWidth="0.8"
                fill="none"
              />
              <path
                d="M200 50 Q210 120 200 160 Q190 120 200 50"
                stroke="#D4A843"
                strokeWidth="0.5"
                fill="none"
              />
            </g>
          ))}
          {/* Inner star */}
          {[0, 45, 90, 135].map((angle) => (
            <line
              key={`star-${angle}`}
              x1="200"
              y1="80"
              x2="200"
              y2="320"
              stroke="#D4A843"
              strokeWidth="0.4"
              transform={`rotate(${angle} 200 200)`}
            />
          ))}
        </svg>

        {/* Bottom-left mandala */}
        <svg
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] opacity-[0.06]"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="200" r="190" stroke="#D4A843" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="160" stroke="#D4A843" strokeWidth="1" />
          <circle cx="200" cy="200" r="130" stroke="#D4A843" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="100" stroke="#D4A843" strokeWidth="0.6" />
          <circle cx="200" cy="200" r="70" stroke="#D4A843" strokeWidth="0.4" />
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 200 200)`}>
              <path
                d="M200 10 Q215 100 200 190 Q185 100 200 10"
                stroke="#D4A843"
                strokeWidth="0.6"
                fill="none"
              />
            </g>
          ))}
        </svg>

        {/* Scattered gold dots / small circles */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="gold-dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="#D4A843" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#gold-dots)" />
        </svg>
      </div>

      {/* Subtle decorative accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-28 flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
        {/* Left: Text content */}
        <div className="flex-1 text-center">
          {/* Logo with mandala flower background */}
          <div className="mb-2 flex justify-center overflow-visible">
            <div className="relative flex items-center justify-center w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Mandala flower - large, fully visible */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outermost circles */}
                <circle cx="200" cy="200" r="198" stroke="#8B2020" strokeWidth="1.5" opacity="0.5" />
                <circle cx="200" cy="200" r="190" stroke="#8B2020" strokeWidth="1" opacity="0.4" />
                <circle cx="200" cy="200" r="180" stroke="#8B2020" strokeWidth="0.8" opacity="0.35" />

                {/* Large outer petals - pointed lotus style */}
                {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => (
                  <g key={`outer-${angle}`} transform={`rotate(${angle} 200 200)`}>
                    <path
                      d="M200 5 Q222 80 200 160 Q178 80 200 5"
                      stroke="#8B2020"
                      strokeWidth="1"
                      fill="#8B2020"
                      opacity="0.12"
                    />
                  </g>
                ))}

                {/* Mid-ring */}
                <circle cx="200" cy="200" r="160" stroke="#8B2020" strokeWidth="1.2" opacity="0.3" />
                <circle cx="200" cy="200" r="155" stroke="#8B2020" strokeWidth="0.6" opacity="0.2" />

                {/* Medium petals between outer petals */}
                {[11.25, 33.75, 56.25, 78.75, 101.25, 123.75, 146.25, 168.75, 191.25, 213.75, 236.25, 258.75, 281.25, 303.75, 326.25, 348.75].map((angle) => (
                  <g key={`mid-${angle}`} transform={`rotate(${angle} 200 200)`}>
                    <path
                      d="M200 30 Q215 100 200 155 Q185 100 200 30"
                      stroke="#8B2020"
                      strokeWidth="0.8"
                      fill="#8B2020"
                      opacity="0.08"
                    />
                  </g>
                ))}

                {/* Inner decorative rings */}
                <circle cx="200" cy="200" r="140" stroke="#8B2020" strokeWidth="0.8" opacity="0.25" />
                <circle cx="200" cy="200" r="130" stroke="#8B2020" strokeWidth="1.5" opacity="0.3" />
                <circle cx="200" cy="200" r="125" stroke="#8B2020" strokeWidth="0.5" opacity="0.2" />

                {/* Inner petals */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
                  <g key={`inner-${angle}`} transform={`rotate(${angle} 200 200)`}>
                    <path
                      d="M200 70 Q212 120 200 155 Q188 120 200 70"
                      stroke="#8B2020"
                      strokeWidth="0.8"
                      fill="#8B2020"
                      opacity="0.1"
                    />
                  </g>
                ))}

                {/* Radial lines */}
                {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((angle) => (
                  <line
                    key={`line-${angle}`}
                    x1="200"
                    y1="20"
                    x2="200"
                    y2="380"
                    stroke="#8B2020"
                    strokeWidth="0.4"
                    opacity="0.12"
                    transform={`rotate(${angle} 200 200)`}
                  />
                ))}

                {/* Innermost ring around logo */}
                <circle cx="200" cy="200" r="110" stroke="#8B2020" strokeWidth="1.5" opacity="0.25" />
                <circle cx="200" cy="200" r="105" stroke="#8B2020" strokeWidth="0.5" opacity="0.15" />
              </svg>

              {/* Logo image - centered within mandala */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.webp"
                alt="Bhargavi Teja Collections Logo"
                className="w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover shadow-xl shadow-black/40 relative z-10"
                style={{ border: "3px solid rgba(212, 168, 67, 0.5)" }}
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

        {/* Right: Overlapping tilted image cards */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-[340px] h-[340px] md:w-[520px] md:h-[440px]">
            {/* Card 1 - Back left, tilted left */}
            <div
              className="absolute -left-4 md:-left-6 top-6 md:top-10 w-52 h-[280px] md:w-64 md:h-[370px] rounded-2xl overflow-hidden shadow-xl"
              style={{
                transform: "rotate(-8deg)",
                border: "3px solid rgba(212, 168, 67, 0.3)",
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
                border: "3px solid rgba(212, 168, 67, 0.4)",
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
                border: "3px solid rgba(212, 168, 67, 0.3)",
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
                background: "radial-gradient(circle, rgba(212, 168, 67, 0.3) 0%, transparent 70%)",
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
