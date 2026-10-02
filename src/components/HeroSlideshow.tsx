"use client";

import { useState, useEffect } from "react";

const ornamentSvg = (
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
);

export default function HeroSlideshow({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative rounded-2xl p-[6px] lg:p-2" style={{
      background: "linear-gradient(135deg, #f5d778 0%, #D4A843 30%, #B8860B 60%, #D4A843 100%)",
      boxShadow: "0 0 30px rgba(212, 168, 67, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4)",
    }}>
      <div className="rounded-xl overflow-hidden relative w-full h-[400px] lg:h-[500px]" style={{ minWidth: "280px" }}>
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={`${alt} ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
            style={{
              opacity: i === current ? 1 : 0,
              transform: i === current ? "scale(1)" : "scale(1.08)",
            }}
          />
        ))}
      </div>
      {ornamentSvg}
    </div>
  );
}
