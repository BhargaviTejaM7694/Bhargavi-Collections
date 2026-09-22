import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductById } from "@/data/products";
import { categories } from "@/data/categories";

interface ProductPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  if (!product) return {};
  return {
    title: `${product.name} | Bhargavi Collections`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const category = categories.find((c) => c.id === product.category);

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
        <div className="aspect-square bg-gradient-to-br from-cream to-gold/10 rounded-lg overflow-hidden flex items-center justify-center">
          <div className="text-center">
            <svg className="w-24 h-24 mx-auto text-gold/30 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="text-gold/40 font-heading text-lg">{product.name}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="font-heading text-3xl md:text-4xl text-gray-900 mb-3">{product.name}</h1>
          <p className="text-3xl font-bold text-gold mb-4">₹{product.price.toLocaleString("en-IN")}</p>
          {category && (
            <p className="text-sm text-gray-500 mb-4">
              Category:{" "}
              <Link href={`/collections/${category.id}`} className="text-burgundy hover:underline">{category.name}</Link>
            </p>
          )}
          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {product.inStock ? (
              <Link href={`/order?product=${product.id}`} className="btn-primary text-center">Order Now</Link>
            ) : (
              <span className="bg-gray-300 text-gray-600 px-6 py-3 rounded-md text-center font-medium">Out of Stock</span>
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
