import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="aspect-square bg-gradient-to-br from-cream to-gold/10 overflow-hidden flex items-center justify-center relative">
        <svg className="w-16 h-16 text-gold/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Sold Out
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-800 group-hover:text-burgundy transition-colors line-clamp-2 mb-1">
          {product.name}
        </h3>
        <p className="text-gold font-bold text-lg">₹{product.price.toLocaleString("en-IN")}</p>
      </div>
    </Link>
  );
}
