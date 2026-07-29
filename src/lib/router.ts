import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'shop'; category?: string }
  | { name: 'product'; slug: string }
  | { name: 'about' }
  | { name: 'faq' }
  | { name: 'wishlist' };

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const parts = hash.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'home' };
  if (parts[0] === 'shop') {
    return { name: 'shop', category: parts[1] };
  }
  if (parts[0] === 'product' && parts[1]) {
    return { name: 'product', slug: parts[1] };
  }
  if (parts[0] === 'about') return { name: 'about' };
  if (parts[0] === 'faq') return { name: 'faq' };
  if (parts[0] === 'wishlist') return { name: 'wishlist' };
  return { name: 'home' };
}

export function navigate(to: string) {
  window.location.hash = to;
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseHash());
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

export function hrefFor(route: Route): string {
  switch (route.name) {
    case 'home':
      return '/';
    case 'shop':
      return route.category ? `/shop/${route.category}` : '/shop';
    case 'product':
      return `/product/${route.slug}`;
    case 'about':
      return '/about';
    case 'faq':
      return '/faq';
    case 'wishlist':
      return '/wishlist';
  }
}
