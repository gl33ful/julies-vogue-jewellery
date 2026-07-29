import { useState } from 'react';
import { Heart, ShoppingBag, Truck, RefreshCw, ShieldCheck, ChevronRight, Minus, Plus, Check } from 'lucide-react';
import { useProduct, useReviews, useProducts } from '@/lib/hooks';
import { useRoute, navigate } from '@/lib/router';
import { formatNaira, wishStore, useWishlist, cartStore, whatsappOrderLink, whatsappChatLink, useReveal } from '@/lib/store';
import { StarRating } from '@/components/StarRating';
import { ProductCard } from '@/components/ProductCard';

export function ProductPage() {
  useReveal();
  const route = useRoute();
  const slug = route.name === 'product' ? route.slug : undefined;
  const { product, loading } = useProduct(slug);
  const reviews = useReviews(product?.id);
  const { products } = useProducts();
  const wishlist = useWishlist();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState<'details' | 'delivery' | 'reviews'>('details');
  const [added, setAdded] = useState(false);

  if (loading) {
    return (
      <div className="pt-32 container-luxe">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-[4/5] bg-beige/50 animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-beige/50 animate-pulse w-3/4" />
            <div className="h-6 bg-beige/50 animate-pulse w-1/3" />
            <div className="h-24 bg-beige/50 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-40 container-luxe text-center">
        <p className="font-serif text-3xl">Piece not found.</p>
        <button onClick={() => navigate('/shop')} className="btn-outline mt-8">
          Back To Shop
        </button>
      </div>
    );
  }

  const gallery = [product.image_url, ...product.gallery].filter(Boolean);
  const wished = wishlist.includes(product.id);
  const lowStock = product.stock > 0 && product.stock <= product.low_stock_threshold;
  const soldOut = product.stock === 0;
  const related = products
    .filter((p) => p.id !== product.id && p.categories?.slug === product.categories?.slug)
    .slice(0, 4);
  const fallbackRelated = products.filter((p) => p.id !== product.id).slice(0, 4);
  const relatedList = related.length >= 2 ? related : fallbackRelated;

  const addToCart = () => {
    cartStore.add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="pt-24 md:pt-28">
      {/* Breadcrumb */}
      <div className="container-luxe py-5 flex items-center gap-2 text-xs text-ink/50 tracking-wider2 uppercase">
        <button onClick={() => navigate('/')} className="hover:text-champagne-700">Home</button>
        <ChevronRight size={12} strokeWidth={1.5} />
        <button onClick={() => navigate('/shop')} className="hover:text-champagne-700">Shop</button>
        {product.categories && (
          <>
            <ChevronRight size={12} strokeWidth={1.5} />
            <button onClick={() => navigate(`/shop/${product.categories!.slug}`)} className="hover:text-champagne-700">
              {product.categories.name}
            </button>
          </>
        )}
      </div>

      {/* Main */}
      <section className="container-luxe grid md:grid-cols-2 gap-10 lg:gap-16 pb-16">
        {/* Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 overflow-x-auto md:max-h-[600px]">
            {gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-20 h-24 md:w-20 md:h-24 shrink-0 overflow-hidden border transition-colors ${
                  activeImg === i ? 'border-champagne-500' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-[4/5] bg-cream overflow-hidden">
            <img src={gallery[activeImg]} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="md:pt-4">
          {product.is_new && <span className="eyebrow !text-champagne-600">New Arrival</span>}
          <h1 className="font-serif text-3xl md:text-4xl mt-2 leading-tight">{product.name}</h1>
          <div className="flex items-center gap-3 mt-3">
            <StarRating rating={product.rating} size={16} />
            <span className="text-sm text-ink/55">{product.rating} · {product.review_count} reviews</span>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <span className="font-serif text-2xl text-ink">{formatNaira(product.price)}</span>
            {product.compare_at_price && (
              <span className="text-base text-ink/40 line-through">{formatNaira(product.compare_at_price)}</span>
            )}
          </div>

          <p className="mt-6 text-ink/70 leading-relaxed font-light">{product.description}</p>

          {/* Stock */}
          <div className="mt-6">
            {soldOut ? (
              <p className="text-sm text-error tracking-wider2 uppercase">Sold Out</p>
            ) : lowStock ? (
              <p className="text-sm text-champagne-700 tracking-wider2 uppercase">
                Only {product.stock} left — selling fast
              </p>
            ) : (
              <p className="text-sm text-ink/50 tracking-wider2 uppercase">In Stock</p>
            )}
          </div>

          {/* Quantity + actions */}
          {!soldOut && (
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border border-beige">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:bg-cream transition-colors" aria-label="Decrease">
                  <Minus size={14} strokeWidth={1.5} />
                </button>
                <span className="px-4 text-sm tabular-nums">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="p-3 hover:bg-cream transition-colors" aria-label="Increase">
                  <Plus size={14} strokeWidth={1.5} />
                </button>
              </div>
              <button
                onClick={addToCart}
                className="btn-gold flex-1"
              >
                {added ? <><Check size={16} strokeWidth={2} /> Added</> : <><ShoppingBag size={16} strokeWidth={1.5} /> Add to Bag</>}
              </button>
              <button
                onClick={() => wishStore.toggle(product.id)}
                className="w-12 h-12 border border-beige flex items-center justify-center hover:bg-cream transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} strokeWidth={1.5} className={wished ? 'fill-champagne-500 text-champagne-500' : 'text-ink'} />
              </button>
            </div>
          )}

          {/* WhatsApp order */}
          <a
            href={whatsappOrderLink([{ name: product.name, price: product.price, quantity: qty }])}
            target="_blank"
            rel="noreferrer"
            className="mt-3 w-full inline-flex items-center justify-center gap-2 py-3.5 border border-[#25D366] text-[#1a8e3f] text-[0.72rem] tracking-wider2 uppercase font-semibold hover:bg-[#25D366] hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
            Order via WhatsApp
          </a>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { icon: Truck, label: 'Reliable Delivery' },
              { icon: RefreshCw, label: 'Easy Exchange' },
              { icon: ShieldCheck, label: 'Secure Payment' },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-2 py-3 border border-beige">
                <b.icon size={18} strokeWidth={1.5} className="text-champagne-600" />
                <span className="text-[0.6rem] tracking-wider2 uppercase text-ink/60">{b.label}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-10 border-t border-beige">
            <div className="flex gap-6">
              {(['details', 'delivery', 'reviews'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`py-4 text-[0.72rem] tracking-wider2 uppercase border-b-2 transition-colors ${
                    tab === t ? 'border-champagne-500 text-ink' : 'border-transparent text-ink/50 hover:text-ink'
                  }`}
                >
                  {t === 'reviews' ? `Reviews (${reviews.length})` : t}
                </button>
              ))}
            </div>

            <div className="py-6 text-sm text-ink/70 leading-relaxed font-light">
              {tab === 'details' && (
                <div className="space-y-3">
                  <p><span className="text-ink font-medium">Material:</span> {product.material}</p>
                  <p><span className="text-ink font-medium">Details:</span> {product.details}</p>
                </div>
              )}
              {tab === 'delivery' && (
                <div className="space-y-3">
                  <p>Delivery within 2–5 business days across Nigeria. Lagos and Uyo orders typically arrive within 1–2 days.</p>
                  <p>Payment via bank transfer, card, or cash on delivery. WhatsApp orders are confirmed with our team before dispatch.</p>
                  <p>Easy exchange within 7 days for unworn pieces in original packaging.</p>
                </div>
              )}
              {tab === 'reviews' && (
                <div className="space-y-6">
                  {reviews.length === 0 ? (
                    <p>No reviews yet. Be the first to share your experience.</p>
                  ) : (
                    reviews.map((r) => (
                      <div key={r.id} className="border-b border-beige pb-5">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-serif text-base text-ink">{r.author}</p>
                          <StarRating rating={r.rating} size={12} />
                        </div>
                        {r.location && <p className="text-xs text-ink/50 mb-2">{r.location}, Nigeria</p>}
                        <p className="italic">"{r.body}"</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedList.length > 0 && (
        <section className="bg-cream py-16 md:py-24">
          <div className="container-luxe">
            <h2 className="font-serif text-2xl md:text-4xl text-center mb-12">You May Also Love</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedList.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
