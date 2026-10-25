"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useProductData } from "@/context/ProductDataContext";
import { getProductById } from "@/lib/storage";
import { useCart } from "@/context/CartContext";
import OptimizedImage from "@/components/OptimizedImage";
import type { Product } from "@/types";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const { categories } = useProductData();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    getProductById(productId).then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, [productId]);

  const category = product ? categories.find((c) => c.id === product.category) || null : null;

  const allVariantImages = product?.variants && product.variants.length > 0
    ? [{ color: product.defaultColor || "Black", colorCode: product.defaultColorCode || "#000000", image: product.image, quantity: product.quantity }, ...product.variants]
    : [];

  const activeVariant = allVariantImages.length > 0 ? allVariantImages[selectedVariant] : null;
  const displayQuantity = activeVariant?.quantity ?? product?.quantity;
  const maxQuantity = displayQuantity ?? 10;
  const isVariantAvailable = activeVariant ? (activeVariant.quantity ?? 0) > 0 : product?.inStock ?? false;

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };

  const getProductWithSelectedImage = () => {
    if (!product) return product;
    if (allVariantImages.length > 0 && allVariantImages[selectedVariant]) {
      const v = allVariantImages[selectedVariant];
      if (v.color !== "Default") {
        return { ...product, image: v.image, name: `${product.name} (${v.color})` };
      }
    }
    return product;
  };

  const handleOrderNow = () => {
    const p = getProductWithSelectedImage();
    if (p) {
      addItem(p, quantity);
      router.push("/order");
    }
  };

  const handleAddToCart = () => {
    const p = getProductWithSelectedImage();
    if (p) {
      addItem(p, quantity);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-4 w-48 bg-gray-200 animate-pulse rounded mb-6" />
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
          <div className="flex flex-col justify-center space-y-4">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4" />
            <div className="h-20 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
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

  const displayImage = allVariantImages.length > 0
    ? allVariantImages[selectedVariant]?.image ?? product.image
    : product.image;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <span>/</span>
        {category && (
          <>
            <Link href={`/collections/${category.id}`} className="hover:text-burgundy transition-colors">{category.name}</Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-800 font-medium">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Image section */}
        <div className="flex gap-3">
          {/* Vertical thumbnails — only when variants exist */}
          {allVariantImages.length > 1 && (
            <div className="flex flex-col gap-2 w-16 shrink-0">
              {allVariantImages.map((v, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedVariant(i); setQuantity(1); }}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedVariant === i ? "border-burgundy ring-2 ring-burgundy/30" : "border-gray-200 hover:border-gray-400"}`}
                  title={v.color}
                >
                  <OptimizedImage src={v.image} alt={v.color} fill={false} width={64} height={64} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          {/* Main image */}
          <div className="flex-1 aspect-square bg-cream rounded-lg overflow-hidden relative">
            <OptimizedImage
              src={displayImage}
              alt={activeVariant ? `${product.name} - ${activeVariant.color}` : product.name}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
            />
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-col justify-center">
          <h1 className="font-heading text-3xl md:text-4xl text-gray-900 mb-3">{product.name}</h1>
          <p className="text-3xl font-bold text-gold mb-4">₹{product.price.toLocaleString("en-IN")}</p>

          {/* Color swatches */}
          {allVariantImages.length > 1 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Color: <span className="text-gray-900">{allVariantImages[selectedVariant]?.color ?? product.name}</span>
              </p>
              <div className="flex gap-2.5 flex-wrap">
                {allVariantImages.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedVariant(i); setQuantity(1); }}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${selectedVariant === i ? "border-burgundy ring-2 ring-burgundy/20 scale-110" : "border-gray-300 hover:scale-105"}`}
                    style={{ backgroundColor: v.colorCode }}
                    title={v.color}
                  />
                ))}
              </div>
            </div>
          )}

          {category && (
            <p className="text-sm text-gray-500 mb-2">
              Category:{" "}
              <Link href={`/collections/${category.id}`} className="text-burgundy hover:underline">{category.name}</Link>
            </p>
          )}
          {displayQuantity !== undefined && (
            <p className="text-sm text-gray-500 mb-4">
              {isVariantAvailable
                ? `${displayQuantity} piece${displayQuantity !== 1 ? "s" : ""} available`
                : "Out of Stock"}
            </p>
          )}
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Quantity + Add to cart */}
          {product.inStock && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button type="button" onClick={handleDecrement} disabled={quantity <= 1} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-lg">−</button>
                  <span className="w-12 h-10 flex items-center justify-center text-gray-900 font-medium border-x border-gray-300">{quantity}</span>
                  <button type="button" onClick={handleIncrement} disabled={quantity >= maxQuantity} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-lg">+</button>
                </div>
                <button type="button" onClick={handleAddToCart} className="flex-1 border border-burgundy text-burgundy px-6 py-2.5 rounded-lg font-medium hover:bg-burgundy hover:text-white transition-colors">Add to cart</button>
              </div>
            </div>
          )}

          {/* Order Now / Back */}
          <div className="flex flex-col sm:flex-row gap-3">
            {product.inStock ? (
              <button type="button" onClick={handleOrderNow} className="btn-primary text-center">Order Now</button>
            ) : (
              <span className="bg-gray-300 text-gray-600 px-6 py-3 rounded-md text-center font-medium">Out of Stock</span>
            )}
            <Link href={`/collections/${product.category}`} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-center font-medium hover:border-burgundy hover:text-burgundy transition-colors">
              Back to {category?.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
