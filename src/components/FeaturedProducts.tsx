import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

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
          <Link href="/collections/necklaces" className="btn-gold inline-block">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
