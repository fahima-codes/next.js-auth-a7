import Link from 'next/link';

interface Navs {
  slug: string;
  title?: string; // ফলব্যাক ডেটার জন্য
  nameBn?: string; // এপিআই থেকে আসা বাংলা নামের জন্য
  icon?: string; // এপিআই থেকে আসা ইমোজির জন্য
  scrapable: boolean;
}

const fallbackNavs: Navs[] = [
  { slug: 'চাল', title: `🍚 চাল`, scrapable: true },
  { slug: 'ডাল', title: `🫘 ডাল`, scrapable: true },
  { slug: 'তেল', title: `🛢️ তেল`, scrapable: true },
  { slug: 'সবজি', title: `🥬 সবজি`, scrapable: true },
  { slug: 'মাছ', title: `🐟 মাছ`, scrapable: true },
  { slug: 'মাংস', title: `🍗 মাংস`, scrapable: true },
  { slug: 'ডিম-দুধ', title: `🥛 ডিম-দুধ`, scrapable: true },
  { slug: 'মসলা', title: `🌶️ মসলা`, scrapable: true },
];

const NavLinks = async () => {
  let navs: Navs[] = fallbackNavs;

  try {
    const res = await fetch(
      'https://openapi.programming-hero.com/api/bazardor/categories',
      {
        next: { revalidate: 86400 },
        signal: AbortSignal.timeout(15000),
      },
    );

    if (!res.ok) throw new Error('API failed');

    const data = await res.json();
    if (data?.data?.length) {
      navs = data.data.map((item: any) => ({
        ...item,
        scrapable: true,
      }));
    }
  } catch (error) {
    console.log('NavLinks fetch failed, using fallback');
  }

  const filteredNavs = navs.filter(n => n.scrapable);

  return (
    <div className="w-full border-b border-gray-100 pb-5 mt-6">
      <div className="flex justify-center items-center gap-3 px-4 flex-wrap max-w-6xl mx-auto">
        {filteredNavs.map((n, i) => {
          const displayTitle = n.title || `${n.icon || ''} ${n.nameBn || ''}`;

          return (
            <Link
              key={n.slug || i}
              href={`/category/${n.slug}`}
              className="btn btn-sm btn-outline border-gray-200 hover:bg-[#008A43] hover:border-[#008A43] text-gray-700 hover:text-white rounded-xl font-normal transition-all duration-200 shadow-sm px-4 py-1.5 h-auto min-h-0"
            >
              {displayTitle}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavLinks;
