"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getAdminProducts, getAdminCategories } from "@/lib/storage";
import { useCart } from "@/context/CartContext";
import type { Product, Category } from "@/types";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    Promise.all([getAdminProducts(), getAdminCategories()]).then(([products, categories]) => {
      const found = products.find((p) => p.id === productId) || null;
      setProduct(found);
      if (found) {
        setCategory(categories.find((c) => c.id === found.category) || null);
      }
      setLoading(false);
    });
  }, [productId]);

  const maxQuantity = product?.quantity ?? 10;

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };

  const handleOrderNow = () => {
    if (product) {
      addItem(product, quantity);
      router.push("/order");
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-burgundy border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="font-heading text-3xl text-gray-800 mb-4">Product Not Found</h1>
        <Link href="/" className="text-burgundy hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">
          Home
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/collections/${category.id}`}
              className="hover:text-burgundy transition-colors"
            >
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-800 font-medium">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="aspect-square bg-cream rounded-lg overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="font-heading text-3xl md:text-4xl text-gray-900 mb-3">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-gold mb-4">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
          {category && (
            <p className="text-sm text-gray-500 mb-2">
              Category:{" "}
              <Link
                href={`/collections/${category.id}`}
                className="text-burgundy hover:underline"
              >
                {category.name}
              </Link>
            </p>
          )}
          {product.quantity !== undefined && (
            <p className="text-sm text-gray-500 mb-4">
              {product.inStock
                ? `${product.quantity} piece${product.quantity !== 1 ? "s" : ""} available`
                : "Out of Stock"}
            </p>
          )}
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {product.inStock && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-lg"
                  >
                    −
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center text-gray-900 font-medium border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={quantity >= maxQuantity}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 border border-burgundy text-burgundy px-6 py-2.5 rounded-lg font-medium hover:bg-burgundy hover:text-white transition-colors"
                >
                  Add to cart
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            {product.inStock ? (
              <button
                type="button"
                onClick={handleOrderNow}
                className="btn-primary text-center"
              >
                Order Now
              </button>
            ) : (
              <span className="bg-gray-300 text-gray-600 px-6 py-3 rounded-md text-center font-medium">
                Out of Stock
              </span>
            )}
            <Link
              href={`/collections/${product.category}`}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-center font-medium hover:border-burgundy hover:text-burgundy transition-colors"
            >
              Back to {category?.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
