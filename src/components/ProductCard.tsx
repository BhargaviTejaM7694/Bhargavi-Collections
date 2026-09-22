"use client";

import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleItem, isSelected } = useCart();
  const selected = isSelected(product.id);

  const handleCheckbox = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock) {
      toggleItem(product);
    }
  };

  return (
    <div className="relative group">
      {/* Checkbox overlay */}
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
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {!product.inStock && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Sold Out
            </div>
          )}
          {selected && (
            <div className="absolute top-2 right-2 bg-burgundy text-white text-xs px-2 py-1 rounded">
              Selected
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-800 group-hover:text-burgundy transition-colors line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-gold font-bold text-lg">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>
      </Link>
    </div>
  );
}
