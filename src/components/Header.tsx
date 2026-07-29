import { useEffect, useState } from 'react';
import { Menu, ShoppingBag, Heart, X, Search } from 'lucide-react';
import { navigate, useRoute, hrefFor } from '@/lib/router';
import { useCart, useWishlist } from '@/lib/store';

const NAV = [
  { label: 'Home', route: { name: 'home' as const } },
  { label: 'Shop', route: { name: 'shop' as const } },
  { label: 'About', route: { name: 'about' as const } },
  { label: 'FAQ', route: { name: 'faq' as const } },
];

export function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const route = useRoute();
  const cart = useCart();
  const wishlist = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  const isHome = route.name === 'home';
  const dark = isHome && !scrolled;

  const go = (r: Parameters<typeof navigate>[0]) => {
    navigate(r);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-700 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_rgba(20,17,13,0.06)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-luxe flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} className={dark ? 'text-ivory' : 'text-ink'} strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <button
            onClick={() => go('/')}
            className="flex flex-col items-center lg:items-start lg:flex-1 cursor-pointer"
          >
            <span
              className={`font-serif text-xl md:text-2xl tracking-wider2 transition-colors duration-500 ${
                dark ? 'text-ivory' : 'text-ink'
              }`}
            >
              JULIES VOGUE
            </span>
            <span
              className={`hidden md:block text-[0.55rem] tracking-luxe uppercase mt-0.5 transition-colors duration-500 ${
                dark ? 'text-ivory/70' : 'text-champagne-600'
              }`}
            >
              Fine Jewelry
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10 lg:flex-1 justify-center">
            {NAV.map((item) => {
              const active =
                (item.route.name === 'shop' && route.name === 'shop') ||
                (item.route.name === route.name && route.name !== 'shop');
              return (
                <button
                  key={item.label}
                  onClick={() => go(hrefFor(item.route))}
                  className={`text-[0.72rem] tracking-wider2 uppercase font-medium link-underline transition-colors duration-500 ${
                    dark ? 'text-ivory/90' : 'text-ink/80'
                  } ${active ? '!text-champagne-600' : ''}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 lg:gap-4 lg:flex-1 justify-end">
            <button
              onClick={() => go('/wishlist')}
              className="relative p-1.5"
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                strokeWidth={1.5}
                className={`${dark ? 'text-ivory' : 'text-ink'} ${
                  wishlist.length ? 'fill-champagne-400 text-champagne-400' : ''
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-champagne-500 text-ink text-[0.6rem] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={onOpenCart}
              className="relative p-1.5"
              aria-label="Cart"
            >
              <ShoppingBag
                size={20}
                strokeWidth={1.5}
                className={dark ? 'text-ivory' : 'text-ink'}
              />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-champagne-500 text-ink text-[0.6rem] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-500 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute left-0 top-0 h-full w-[82%] max-w-sm bg-ivory shadow-2xl flex flex-col transition-transform duration-500 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-beige">
            <span className="font-serif text-lg tracking-wider2">JULIES VOGUE</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8 gap-6">
            {NAV.map((item) => (
              <button
                key={item.label}
                onClick={() => go(hrefFor(item.route))}
                className="text-left font-serif text-2xl text-ink hover:text-champagne-600 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto px-6 py-8 border-t border-beige">
            <p className="eyebrow mb-3">Need help?</p>
            <button onClick={() => go('/faq')} className="text-sm text-ink/70 link-underline">
              Read our FAQ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
