"use client";

import Link from "next/link";
import { useProductData } from "@/context/ProductDataContext";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const { products, categories, loading } = useProductData();

  const featured = products.filter((p) => p.inStock).slice(0, 8);
  const firstCategoryId = categories.length > 0 ? categories[0].id : "necklaces";

  if (loading || featured.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-cream/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href={`/collections/${firstCategoryId}`} className="btn-gold inline-block">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
