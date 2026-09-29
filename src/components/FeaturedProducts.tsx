"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAdminProducts, getAdminCategories } from "@/lib/storage";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";

export default function FeaturedProducts() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [firstCategoryId, setFirstCategoryId] = useState("necklaces");

  useEffect(() => {
    const all = getAdminProducts();
    setFeatured(all.filter((p) => p.inStock).slice(0, 8));
    const cats = getAdminCategories();
    if (cats.length > 0) setFirstCategoryId(cats[0].id);
  }, []);

  if (featured.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-cream/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
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
