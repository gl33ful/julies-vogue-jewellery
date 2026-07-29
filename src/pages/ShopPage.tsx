import { useMemo, useState } from 'react';
import { useProducts, useCategories } from '@/lib/hooks';
import { ProductCard } from '@/components/ProductCard';
import { useReveal } from '@/lib/store';
import { navigate, useRoute } from '@/lib/router';
import { SlidersHorizontal } from 'lucide-react';

const SORTS = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'rating', label: 'Top Rated' },
];

export function ShopPage() {
  useReveal();
  const route = useRoute();
  const activeCat = route.name === 'shop' ? route.category : undefined;
  const { products, loading } = useProducts();
  const categories = useCategories();
  const [sort, setSort] = useState('featured');
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlySale, setOnlySale] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCat) {
      list = list.filter((p) => p.categories?.slug === activeCat);
    }
    if (onlyNew) list = list.filter((p) => p.is_new);
    if (onlySale) list = list.filter((p) => p.compare_at_price);
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [products, activeCat, sort, onlyNew, onlySale]);

  const activeCatName = categories.find((c) => c.slug === activeCat)?.name;

  return (
    <div className="pt-28 md:pt-32">
      {/* Banner */}
      <section className="bg-cream py-14 md:py-20">
        <div className="container-luxe text-center">
          <p className="eyebrow mb-4">The Collection</p>
          <h1 className="font-serif text-4xl md:text-6xl">
            {activeCatName || 'Shop All Jewelry'}
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-ink/60 font-light">
            {activeCat
              ? categories.find((c) => c.slug === activeCat)?.description
              : 'Explore elegant pieces designed to celebrate your beauty, confidence, and unforgettable moments.'}
          </p>
        </div>
      </section>

      {/* Category pills */}
      <section className="border-b border-beige sticky top-16 md:top-20 bg-ivory/95 backdrop-blur z-20">
        <div className="container-luxe py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => navigate('/shop')}
            className={`shrink-0 px-4 py-2 text-[0.7rem] tracking-wider2 uppercase transition-colors ${
              !activeCat ? 'bg-ink text-ivory' : 'text-ink/70 hover:text-champagne-700'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate(`/shop/${c.slug}`)}
              className={`shrink-0 px-4 py-2 text-[0.7rem] tracking-wider2 uppercase transition-colors ${
                activeCat === c.slug ? 'bg-ink text-ivory' : 'text-ink/70 hover:text-champagne-700'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* Toolbar */}
      <section className="container-luxe py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <SlidersHorizontal size={16} strokeWidth={1.5} className="text-ink/50" />
          <button
            onClick={() => setOnlyNew((v) => !v)}
            className={`text-xs tracking-wider2 uppercase px-3 py-1.5 border transition-colors ${
              onlyNew ? 'border-champagne-500 text-champagne-700 bg-champagne-50' : 'border-beige text-ink/60'
            }`}
          >
            New In
          </button>
          <button
            onClick={() => setOnlySale((v) => !v)}
            className={`text-xs tracking-wider2 uppercase px-3 py-1.5 border transition-colors ${
              onlySale ? 'border-champagne-500 text-champagne-700 bg-champagne-50' : 'border-beige text-ink/60'
            }`}
          >
            On Sale
          </button>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs tracking-wider2 uppercase text-ink/50">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs tracking-wider2 uppercase bg-transparent border-b border-beige py-1.5 pr-6 focus:outline-none focus:border-champagne-500"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Grid */}
      <section className="container-luxe pb-24">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-beige/50 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-ink">No pieces match your selection.</p>
            <button onClick={() => navigate('/shop')} className="btn-outline mt-6">
              View All Jewelry
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <div key={p.id} className="reveal" style={{ transitionDelay: `${(i % 8) * 60}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
