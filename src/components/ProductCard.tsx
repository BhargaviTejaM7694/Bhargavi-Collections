"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import OptimizedImage from "./OptimizedImage";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { toggleItem, isSelected } = useCart();
  const selected = isSelected(product.id);
  const [activeImage, setActiveImage] = useState(0);

  const allImages = product.variants && product.variants.length > 0
    ? [product.image, ...product.variants.map(v => v.image)]
    : [product.image];

  useEffect(() => {
    if (allImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveImage(prev => (prev + 1) % allImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [allImages.length]);

  const handleCheckbox = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock) {
      toggleItem(product);
    }
  };

  return (
    <div className="relative group">
      {product.inStock && (
        <button
          onClick={handleCheckbox}
          className={`absolute top-2 left-2 z-10 w-7 h-7 rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
            selected
              ? "bg-burgundy border-burgundy text-white shadow-md"
              : "bg-white/90 border-gray-300 hover:border-burgundy text-transparent hover:bg-white"
          }`}
          aria-label={selected ? `Remove ${product.name} from order` : `Add ${product.name} to order`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      )}

      <Link
        href={`/products/${product.id}`}
        className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <div className="aspect-square bg-cream overflow-hidden relative">
          {allImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ${idx === activeImage ? "opacity-100" : "opacity-0"}`}
            >
              <OptimizedImage
                src={img}
                alt={idx === 0 ? product.name : `${product.name} - ${product.variants?.[idx - 1]?.color ?? ""}`}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                priority={priority && idx === 0}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ))}
          {!product.inStock && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
              Sold Out
            </div>
          )}
          {selected && (
            <div className="absolute top-2 right-2 bg-burgundy text-white text-xs px-2 py-1 rounded z-10">
              Selected
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 group-hover:text-burgundy transition-colors line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-gold-dark font-bold text-lg">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
          {product.variants && product.variants.length > 0 && (
            <div className="flex gap-1.5 mt-2">
              <span
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: "#000000" }}
                title="Black"
              />
              {product.variants.slice(0, 4).map((v, i) => (
                <span
                  key={i}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: v.colorCode }}
                  title={v.color}
                />
              ))}
              {product.variants.length > 4 && (
                <span className="text-xs text-gray-400 self-center">+{product.variants.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
