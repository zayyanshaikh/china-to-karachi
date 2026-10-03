import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../../../data/products';
import { ArrowLeft, PackageCheck } from 'lucide-react';

export default function CategoryPage({ params }) {
  const categoryId = params.id;
  const category = CATEGORIES.find((c) => c.id === categoryId) || {
    id: categoryId,
    name: categoryId.replace('-', ' ').toUpperCase(),
    description: 'Direct factory imports inspected for Karachi market.',
  };

  const filteredProducts = PRODUCTS.filter((p) => p.category === categoryId);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Karachi Main Hub</span>
      </Link>

      {/* Category Header Banner */}
      <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 backdrop-blur-xl">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Port Qasim Import Category</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {category.name}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Category Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
          <span>Showing {filteredProducts.length} Import Listings</span>
          <span className="text-emerald-400">Cash on Delivery Available</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs bg-slate-900/40 rounded-2xl border border-slate-800">
            No products currently in stock for this category. New container landing at Port Qasim soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
