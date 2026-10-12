"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useProductData } from "@/context/ProductDataContext";
import { getProductsByCategory } from "@/lib/storage";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.category as string;
  const { categories, loading: catsLoading } = useProductData();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductsByCategory(categoryId).then((prods) => {
      setCategoryProducts(prods);
      setLoading(false);
    });
  }, [categoryId]);

  const category = categories.find((c) => c.id === categoryId);

  if (loading || catsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-6" />
        <div className="h-10 w-64 bg-gray-200 animate-pulse rounded mx-auto mb-4" />
        <div className="h-4 w-96 max-w-full bg-gray-200 animate-pulse rounded mx-auto mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-square bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-5 bg-gray-200 animate-pulse rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="font-heading text-3xl text-gray-800 mb-4">Category Not Found</h1>
        <Link href="/" className="text-burgundy hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{category.name}</span>
      </nav>

      <h1 className="section-title">{category.name}</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{category.description}</p>

      <div className="flex overflow-x-auto gap-3 mb-8 pb-2 scrollbar-hide justify-center">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/collections/${cat.id}`}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              cat.id === categoryId
                ? "bg-burgundy text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categoryProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No products in this category yet.</p>
          <Link href="/" className="text-burgundy hover:underline mt-2 inline-block">Back to Home</Link>
        </div>
      )}
    </div>
  );
}
