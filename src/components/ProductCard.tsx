import { useState } from 'react';
import { Heart, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatNaira, wishStore, useWishlist, cartStore } from '@/lib/store';
import { navigate } from '@/lib/router';
import { StarRating } from './StarRating';

export function ProductCard({ product }: { product: Product }) {
  const wishlist = useWishlist();
  const wished = wishlist.includes(product.id);
  const lowStock = product.stock > 0 && product.stock <= product.low_stock_threshold;
  const soldOut = product.stock === 0;
  const [activeImg, setActiveImg] = useState(0);

  const images = [product.image_url, ...(product.gallery || [])].filter(Boolean);

  const discount =
    product.compare_at_price
      ? Math.round(
          ((product.compare_at_price - product.price) /
            product.compare_at_price) *
            100
        )
      : null;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="card-product group flex flex-col">
      <div className="relative img-zoom bg-cream aspect-[3/4] overflow-hidden">
        <button
          onClick={() => navigate(`/product/${product.slug}`)}
          className="block w-full h-full"
          aria-label={product.name}
        >
          <img
            src={images[activeImg] || product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </button>

        {/* Card Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md z-10"
              aria-label="Next image"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>

            {/* Image Dots / View indicator */}
            <div className="absolute bottom-12 inset-x-0 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    activeImg === i ? 'w-5 bg-champagne-500' : 'w-1.5 bg-white/70'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.is_new && (
            <span className="bg-ink text-ivory text-[0.6rem] tracking-wider2 uppercase px-2.5 py-1">
              New
            </span>
          )}
          {discount && (
            <span className="bg-red-600 text-white text-[0.6rem] tracking-wider2 uppercase px-3 py-1 rounded-full shadow-lg">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => wishStore.toggle(product.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-ivory/90 backdrop-blur flex items-center justify-center hover:bg-ivory transition-colors z-10"
          aria-label="Add to wishlist"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={wished ? 'fill-champagne-500 text-champagne-500' : 'text-ink'}
          />
        </button>

        {lowStock && (
          <div className="absolute bottom-3 left-3 right-3 bg-ink/85 text-ivory text-[0.6rem] tracking-wider2 uppercase text-center py-1.5 z-10">
            Only {product.stock} left
          </div>
        )}
        {soldOut && (
          <div className="absolute inset-0 bg-ivory/50 flex items-center justify-center z-10">
            <span className="bg-ink text-ivory text-xs tracking-luxe uppercase px-4 py-2">
              Sold Out
            </span>
          </div>
        )}

        {!soldOut && (
          <button
            onClick={() => cartStore.add(product)}
            className="absolute bottom-0 inset-x-0 bg-ink text-ivory py-3 text-[0.68rem] tracking-wider2 uppercase font-medium flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10"
          >
            <ShoppingBag size={14} strokeWidth={1.5} /> Add to Bag
          </button>
        )}
      </div>

      <div className="pt-4 px-1 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-1">
          <StarRating rating={product.rating} size={12} />
          <span className="text-[0.65rem] text-ink/40">({product.review_count})</span>
        </div>
        <button
          onClick={() => navigate(`/product/${product.slug}`)}
          className="font-serif text-lg text-ink hover:text-champagne-700 transition-colors text-left leading-tight"
        >
          {product.name}
        </button>
        <p className="text-xs text-ink/55 mt-1.5 leading-relaxed line-clamp-2">
          {product.short_description}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="font-medium text-ink">{formatNaira(product.price)}</span>
          {product.compare_at_price && (
            <span className="text-xs text-ink/40 line-through">
              {formatNaira(product.compare_at_price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
