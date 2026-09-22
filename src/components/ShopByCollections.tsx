import Link from "next/link";
import { categories } from "@/data/categories";

const categoryIcons: Record<string, string> = {
  necklaces: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
  earrings: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  bangles: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z",
  chains: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101",
  rings: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z",
  pendants: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  harams: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
};

export default function ShopByCollections() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title">Shop by Collections</h2>
        <div className="flex overflow-x-auto gap-6 md:gap-8 pb-4 scrollbar-hide justify-start md:justify-center">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/collections/${category.id}`}
              className="flex flex-col items-center gap-3 flex-shrink-0 group"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-[3px] border-brand-green/20 group-hover:border-gold transition-all duration-300 bg-gradient-to-br from-cream to-gold/10 flex items-center justify-center group-hover:shadow-lg group-hover:scale-105">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-gold/60 group-hover:text-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={categoryIcons[category.id] || categoryIcons.necklaces} />
                </svg>
              </div>
              <span className="text-sm md:text-base font-medium text-gray-700 group-hover:text-burgundy transition-colors whitespace-nowrap">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
