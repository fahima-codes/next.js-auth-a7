'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import SortDropdown from '@/components/SortDropdown';
import { type Product, type Category } from '@/lib/utils';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [result, setResult] = useState<{
    slug: string;
    products: Product[];
    category: Category | null;
    error: boolean;
  } | null>(null);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategory() {
      try {
        const [productsResponse, categoryResponse] = await Promise.all([
          fetch(
            `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`,
            { signal: controller.signal },
          ),
          fetch(
            `https://api.api-store.workers.dev/api/bazardor/categories/${encodeURIComponent(slug)}`,
            { signal: controller.signal },
          ),
        ]);

        if (!productsResponse.ok || !categoryResponse.ok) {
          throw new Error(
            `Category API request failed (${productsResponse.status}, ${categoryResponse.status})`,
          );
        }

        const [productsData, categoryData] = await Promise.all([
          productsResponse.json(),
          categoryResponse.json(),
        ]);

        if (!Array.isArray(productsData) || productsData.length === 0) {
          setResult({ slug, products: [], category: null, error: false });
          return;
        }

        setResult({
          slug,
          products: productsData as Product[],
          category: categoryData as Category,
          error: false,
        });
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error('Category fetch error:', error);
        setResult({ slug, products: [], category: null, error: true });
      }
    }

    void loadCategory();
    return () => controller.abort();
  }, [slug]);

  const currentResult = result?.slug === slug ? result : null;

  // Sort products — numeric value দিয়ে sort করবে, Bengali numeral নয়
  const sortedProducts = [...(currentResult?.products ?? [])].sort((a, b) => {
    if (sortBy === 'price-asc') return a.today - b.today;
    if (sortBy === 'price-desc') return b.today - a.today;
    return 0; // default — API order
  });

  // Loading State — Skeleton
  if (!currentResult) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="skeleton h-8 w-48 mb-2"></div>
        <div className="skeleton h-4 w-32 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card bg-white border p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="skeleton w-12 h-12 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="skeleton h-4 w-24"></div>
                  <div className="skeleton h-3 w-16"></div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="skeleton h-3 w-16"></div>
                  <div className="skeleton h-6 w-20"></div>
                </div>
                <div className="skeleton h-5 w-14"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error / Empty State — 404 type
  if (currentResult.error || currentResult.products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">😢</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          কোনো পণ্য পাওয়া যায়নি
        </h2>
        <p className="text-gray-500 mb-6">
          এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।
        </p>
        <Link href="/" className="btn btn-success text-white">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>{currentResult.category?.icon}</span>
            {currentResult.category?.nameBn}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            এই ক্যাটাগরিতে মোট {currentResult.products.length}টি পণ্য
          </p>
        </div>
        {/* Sort Dropdown (C1 Challenge) */}
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
