import {
  formatPrice,
  toBengaliNumber,
  getUnitBn,
  type Product,
} from '@/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getProduct(slug: string): Promise<Product | null> {
  // The API has no slug endpoint, so match the requested slug against its product list.
  const res = await fetch(
    'https://api.api-store.workers.dev/api/bazardor/products',
    { next: { revalidate: 60 } },
  );
  if (!res.ok) return null;
  const products: Product[] = await res.json();
  return products.find(p => p.slug === slug) || null;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const marketPrices = product.markets.flatMap(market => [
    market.min,
    market.max,
  ]);
  const minPrice = marketPrices.length ? Math.min(...marketPrices) : null;
  const maxPrice = marketPrices.length ? Math.max(...marketPrices) : null;
  const avgPrice = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      (product.markets.length || 1),
  );

  return (
    <div className="min-h-[70vh] bg-[#f1f6f1]">
      <div className="mx-auto max-w-3xl px-4 py-5 sm:py-8">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-gray-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-green-700">
                হোম
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link
                href={`/category/${product.category}`}
                className="hover:text-green-700"
              >
                {product.categoryNameBn}
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" className="font-medium">
              {product.nameBn}
            </li>
          </ol>
        </nav>

        <section className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:mb-4 sm:p-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1f6f1] text-2xl">
              {product.image}
            </span>
            <div className="min-w-0">
              <h1 className="text-lg font-bold leading-tight text-gray-800 sm:text-xl">
                {product.nameBn}
              </h1>
              <p className="mt-0.5 text-xs text-gray-500">
                {product.categoryIcon} {product.categoryNameBn} ·{' '}
                {getUnitBn(product.unit)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                সর্বশেষ বাজারদরের তথ্য এক নজরে
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-xl bg-[#f1f6f1] px-3 py-2 text-center">
            <p className="text-[10px] text-gray-500">আজকের দাম</p>
            <p className="text-lg font-bold leading-tight text-gray-800">
              {formatPrice(product.today)}
            </p>
            <p className="text-[10px] text-gray-500">{getUnitBn(product.unit)}</p>
            <p
              className={`text-[10px] font-semibold ${
                product.change.dir === 'down'
                  ? 'text-green-600'
                  : product.change.dir === 'up'
                    ? 'text-red-600'
                    : 'text-gray-500'
              }`}
            >
              {product.change.dir === 'up'
                ? '▲'
                : product.change.dir === 'down'
                  ? '▼'
                  : '—'}{' '}
              {toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <h2 className="mb-2 text-sm font-semibold text-gray-800">
            দামের সারসংক্ষেপ
          </h2>
          <div className="mb-4 grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-gray-200 bg-[#fbfdfb] p-2 sm:p-3">
              <p className="text-[10px] text-gray-600 sm:text-xs">সর্বনিম্ন দাম</p>
              <p className="text-sm font-bold text-green-600 sm:text-base">
                {minPrice === null ? '—' : formatPrice(minPrice)} টাকা
              </p>
              <p className="text-[9px] text-gray-500 sm:text-[10px]">
                বাজারের সর্বনিম্ন দর
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-[#fbfdfb] p-2 sm:p-3">
              <p className="text-[10px] text-gray-600 sm:text-xs">সর্বোচ্চ দাম</p>
              <p className="text-sm font-bold text-red-600 sm:text-base">
                {maxPrice === null ? '—' : formatPrice(maxPrice)} টাকা
              </p>
              <p className="text-[9px] text-gray-500 sm:text-[10px]">
                বাজারের সর্বোচ্চ দর
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-[#fbfdfb] p-2 sm:p-3">
              <p className="text-[10px] text-gray-600 sm:text-xs">গড় দাম</p>
              <p className="text-sm font-bold text-green-600 sm:text-base">
                {product.markets.length ? formatPrice(avgPrice) : '—'} টাকা
              </p>
              <p className="text-[9px] text-gray-500 sm:text-[10px]">
                সব বাজারের গড় দর
              </p>
            </div>
          </div>

          <h2 className="mb-2 text-sm font-semibold text-gray-800">
            বাজারভিত্তিক আজকের দাম
          </h2>
          {product.markets.length ? (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full min-w-[520px] border-collapse text-left text-[11px] sm:text-xs">
                <thead>
                  <tr className="bg-[#f7faf7] text-gray-700">
                    <th className="px-2 py-2 font-semibold">বাজার</th>
                    <th className="px-2 py-2 font-semibold">বিভাগ</th>
                    <th className="px-2 py-2 text-right font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="px-2 py-2 text-right font-semibold">
                      সর্বোচ্চ
                    </th>
                    <th className="px-2 py-2 text-right font-semibold">গড়</th>
                  </tr>
                </thead>
                <tbody>
                  {product.markets.map((market, index) => (
                    <tr
                      key={`${market.division}-${market.market}`}
                      className={`border-t border-gray-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-[#f7faf7]'
                      }`}
                    >
                      <td className="px-2 py-2 font-medium text-gray-700">
                        {market.market}
                      </td>
                      <td className="px-2 py-2 text-gray-600">
                        {market.division}
                      </td>
                      <td className="px-2 py-2 text-right font-medium text-green-700">
                        {formatPrice(market.min)} টাকা
                      </td>
                      <td className="px-2 py-2 text-right font-medium text-red-600">
                        {formatPrice(market.max)} টাকা
                      </td>
                      <td className="px-2 py-2 text-right font-medium text-gray-700">
                        {formatPrice(Math.round((market.min + market.max) / 2))}{' '}
                        টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-lg border border-gray-200 bg-[#fbfdfb] px-3 py-6 text-center text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক দাম এখনো পাওয়া যায়নি।
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
