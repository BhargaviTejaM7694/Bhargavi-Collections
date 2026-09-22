import Link from "next/link";
import { categories } from "@/data/categories";

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
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-[3px] border-brand-green/20 group-hover:border-gold transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
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
