import { notFound } from "next/navigation";
import Link from "next/link";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";

interface CategoryPageProps {
  params: { category: string };
}

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.id === params.category);
  if (!category) return {};
  return {
    title: `${category.name} | Bhargavi Collections`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.id === params.category);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(params.category);

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
              cat.id === params.category
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
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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
