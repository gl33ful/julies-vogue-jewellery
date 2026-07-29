import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatNaira, wishStore, useWishlist, cartStore } from '@/lib/store';
import { navigate } from '@/lib/router';
import { StarRating } from './StarRating';

export function ProductCard({ product }: { product: Product }) {
  const wishlist = useWishlist();
  const wished = wishlist.includes(product.id);
  const lowStock = product.stock > 0 && product.stock <= product.low_stock_threshold;
  const soldOut = product.stock === 0;
  const discount =
    product.compare_at_price
      ? Math.round(
          ((product.compare_at_price - product.price) /
            product.compare_at_price) *
            100
        )
      : null;

  const secondImage = product.gallery?.[0] || product.image_url;

  return (
    <div className="card-product group flex flex-col">
      <div className="relative img-zoom bg-cream aspect-[3/4] overflow-hidden">
        <button
          onClick={() => navigate(`/product/${product.slug}`)}
          className="block w-full h-full"
          aria-label={product.name}
        >
          {/* Main Image */}
          <img
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out group-hover:opacity-0"
            loading="lazy"
          />
          
          {/* Second Image */}
          <img
            src={secondImage}
            alt={`${product.name} - alternate view`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out opacity-0 group-hover:opacity-100"
            loading="lazy"
          />
        </button>

        {/* Rest of your component remains the same */}
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


/*import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatNaira, wishStore, useWishlist, cartStore } from '@/lib/store';
import { navigate } from '@/lib/router';
import { StarRating } from './StarRating';

export function ProductCard({ product }: { product: Product }) {
  const wishlist = useWishlist();
  const wished = wishlist.includes(product.id);
  const lowStock = product.stock > 0 && product.stock <= product.low_stock_threshold;
  const soldOut = product.stock === 0;
  const discount =
    product.compare_at_price
      ? Math.round(
          ((product.compare_at_price - product.price) /
            product.compare_at_price) *
            100
        )
      : null;

  // Get the second image from gallery or fallback to main image
  const secondImage = product.gallery?.[0] || product.image_url;

  return (
    <div className="card-product group flex flex-col">
      <div className="relative img-zoom bg-cream aspect-[3/4] overflow-hidden">
        <button
          onClick={() => navigate(`/product/${product.slug}`)}
          className="block w-full h-full"
          aria-label={product.name}
        >
          {/* Main Image - fades out on hover *//*}
          <img
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            loading="lazy"
          />
          
          {/* Second Image - fades in on hover *//*}
          <img
            src={secondImage}
            alt={`${product.name} - alternate view`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
            loading="lazy"
          />
        </button>

        {/* Badges *//*}
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

        {/* Wishlist *//*}
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

        {/* Stock flag *//*}
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

        {/* Quick add *//*}
        {!soldOut && (
          <button
            onClick={() => cartStore.add(product)}
            className="absolute bottom-0 inset-x-0 bg-ink text-ivory py-3 text-[0.68rem] tracking-wider2 uppercase font-medium flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-luxe z-10"
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

/*import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatNaira, wishStore, useWishlist, cartStore } from '@/lib/store';
import { navigate } from '@/lib/router';
import { StarRating } from './StarRating';

export function ProductCard({ product }: { product: Product }) {
  const wishlist = useWishlist();
  const wished = wishlist.includes(product.id);
  const lowStock = product.stock > 0 && product.stock <= product.low_stock_threshold;
  const soldOut = product.stock === 0;
  const discount =
  product.compare_at_price
    ? Math.round(
        ((product.compare_at_price - product.price) /
          product.compare_at_price) *
          100
      )
    : null;

  return (
    <div className="card-product group flex flex-col">
      <div className="relative img-zoom bg-cream aspect-[3/4]">
        <button
          onClick={() => navigate(`/product/${product.slug}`)}
          className="block w-full h-full"
          aria-label={product.name}
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
            <img
            src={product.gallery?.[0] || product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            loading="lazy"
  />
        </button>

        {/* Badges/* */ /*}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
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

        {/* Wishlist *//*}
        <button
          onClick={() => wishStore.toggle(product.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-ivory/90 backdrop-blur flex items-center justify-center hover:bg-ivory transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={wished ? 'fill-champagne-500 text-champagne-500' : 'text-ink'}
          />
        </button>

        {/* Stock flag *//*}
        {lowStock && (
          <div className="absolute bottom-3 left-3 right-3 bg-ink/85 text-ivory text-[0.6rem] tracking-wider2 uppercase text-center py-1.5">
            Only {product.stock} left
          </div>
        )}
        {soldOut && (
          <div className="absolute inset-0 bg-ivory/50 flex items-center justify-center">
            <span className="bg-ink text-ivory text-xs tracking-luxe uppercase px-4 py-2">
              Sold Out
            </span>
          </div>
        )}

        {/* Quick add *//*}
        {!soldOut && (
          <button
            onClick={() => cartStore.add(product)}
            className="absolute bottom-0 inset-x-0 bg-ink text-ivory py-3 text-[0.68rem] tracking-wider2 uppercase font-medium flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-luxe"
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
*/