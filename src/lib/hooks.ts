import { useState } from 'react';
import type { Product, Category, Review } from './types';

import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { reviews } from '@/data/reviews';


export function useProducts() {
  const [loading] = useState(false);

  return {
    products,
    loading,
  };
}


export function useCategories() {
  return categories;
}


export function useProduct(slug: string | undefined) {
  const [loading] = useState(false);

  const product =
    products.find((p) => p.slug === slug) || null;

  return {
    product,
    loading,
  };
}


export function useReviews(productId: string | undefined) {
  if (!productId) return [];

  return reviews.filter(
    (review) => review.product_id === productId
  );
}
/*import { useEffect, useState } from 'react';
import type { Product, Category, Review } from './types';
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { reviews } from "@/data/reviews";

export function useProducts() {
  return {
    products,
    loading: false,
  };
}

export function useCategories() {
  return categories;
}
export function useProduct(slug: string | undefined) {
  const product =
    products.find((p) => p.slug === slug) ?? null;

  return {
    product,
    loading: false,
  };
}

export function useReviews(productId: string | undefined) {
  return reviews.filter(
    (r) => r.product_id === productId
  );
}
/*
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    supabase
      .from('products')
      .select('*, categories(*)')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (!error && data) setProducts(data as Product[]);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  return { products, loading };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data) setCategories(data as Category[]);
      });
  }, []);
  return categories;
}

export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from('products')
      .select('*, categories(*)')
      .eq('slug', slug)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!error) setProduct((data as Product) || null);
        setLoading(false);
      });
  }, [slug]);
  return { product, loading };
}

export function useReviews(productId: string | undefined) {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    if (!productId) return;
    supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setReviews(data as Review[]);
      });
  }, [productId]);
  return reviews;
}
*/