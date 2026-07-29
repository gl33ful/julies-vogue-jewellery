import { useProducts } from '@/lib/hooks';
import { useWishlist } from '@/lib/store';
import { ProductCard } from '@/components/ProductCard';
import { navigate } from '@/lib/router';
import { Heart } from 'lucide-react';

export function WishlistPage() {
  const wishlist = useWishlist();
  const { products, loading } = useProducts();
  const wished = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="pt-28 md:pt-32">
      <section className="bg-cream py-14 md:py-20">
        <div className="container-luxe text-center">
          <p className="eyebrow mb-4">Saved For Later</p>
          <h1 className="font-serif text-4xl md:text-6xl">Your Wishlist</h1>
        </div>
      </section>

      <section className="container-luxe py-16 md:py-24">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-beige/50 animate-pulse" />
            ))}
          </div>
        ) : wished.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} strokeWidth={1} className="text-champagne-300 mx-auto mb-5" />
            <p className="font-serif text-2xl text-ink">Your wishlist is empty.</p>
            <p className="text-ink/55 mt-3 font-light">Tap the heart on any piece to save it here.</p>
            <button onClick={() => navigate('/shop')} className="btn-outline mt-8">
              Explore The Collection
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wished.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
