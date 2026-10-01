"use client";

import { useState, useEffect } from "react";
import { getBestSellers } from "@/lib/storage";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";

export default function BestSellers() {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
    getBestSellers(8).then(setBestSellers);
  }, []);

  if (bestSellers.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title">Best Sellers</h2>
        <p className="text-center text-gray-500 text-sm md:text-base mb-8 -mt-4">
          Our most loved pieces — chosen by customers like you
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
