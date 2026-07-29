import { useEffect, useSyncExternalStore } from 'react';
import type { Product } from './types';

export const WHATSAPP_NUMBER = '2348167940118';

const DEFAULT_GREETING =
  'Hello Julies Vogue! I found you online and I would love to know more about your jewelry. Thank you.';

export function whatsappOrderLink(items: { name: string; price: number; quantity: number }[], extra?: string) {
  const lines = items.map(
    (i) => `• ${i.name} ×${i.quantity} — ₦${i.price.toLocaleString()}`
  );
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const msg =
    `Hello Julies Vogue! I would like to place an order:%0A%0A${lines.join('%0A')}%0A%0ATotal: ₦${total.toLocaleString()}%0A%0APlease confirm availability and delivery. Thank you!${
      extra ? `%0A%0A${extra}` : ''
    }`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export function whatsappChatLink(text?: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    text || DEFAULT_GREETING
  )}`;
}

/* ---------------- Cart ---------------- */
type CartState = { product: Product; quantity: number }[];

const CART_KEY = 'jv_cart';
const CART_EVENT = 'jv-cart-change';

function readCart(): CartState {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartState) : [];
  } catch {
    return [];
  }
}

let cart: CartState = readCart();

function persist() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_EVENT));
}

export const cartStore = {
  subscribe(listener: () => void) {
    const handler = () => listener();
    window.addEventListener(CART_EVENT, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(CART_EVENT, handler);
      window.removeEventListener('storage', handler);
    };
  },
  getSnapshot() {
    return cart;
  },
  add(product: Product, quantity = 1) {
    const existing = cart.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart = [...cart, { product, quantity }];
    }
    persist();
  },
  remove(productId: string) {
    cart = cart.filter((i) => i.product.id !== productId);
    persist();
  },
  setQuantity(productId: string, quantity: number) {
    if (quantity <= 0) return cartStore.remove(productId);
    cart = cart.map((i) => (i.product.id === productId ? { ...i, quantity } : i));
    persist();
  },
  clear() {
    cart = [];
    persist();
  },
  count() {
    return cart.reduce((s, i) => s + i.quantity, 0);
  },
  total() {
    return cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  },
};

export function useCart() {
  return useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot);
}

/* ---------------- Wishlist ---------------- */
const WISH_KEY = 'jv_wishlist';
const WISH_EVENT = 'jv-wishlist-change';

function readWish(): string[] {
  try {
    const raw = localStorage.getItem(WISH_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

let wishlist: string[] = readWish();

function persistWish() {
  localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  window.dispatchEvent(new Event(WISH_EVENT));
}

export const wishStore = {
  subscribe(listener: () => void) {
    const handler = () => listener();
    window.addEventListener(WISH_EVENT, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(WISH_EVENT, handler);
      window.removeEventListener('storage', handler);
    };
  },
  getSnapshot() {
    return wishlist;
  },
  toggle(productId: string) {
    wishlist = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];
    persistWish();
  },
  has(productId: string) {
    return wishlist.includes(productId);
  },
};

export function useWishlist() {
  return useSyncExternalStore(wishStore.subscribe, wishStore.getSnapshot, wishStore.getSnapshot);
}

/* ---------------- Reveal on scroll ---------------- */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)'));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

export function formatNaira(n: number) {
  return '₦' + n.toLocaleString('en-NG', { maximumFractionDigits: 0 });
}
