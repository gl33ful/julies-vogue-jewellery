import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Necklaces",
    slug: "necklaces",
    description: "Elegant necklaces designed to add timeless beauty to every look.",
    image_url: "/images/julies-vogue/silver_necklace.jpg",
    sort_order: 1,
  },
  {
    id: "2",
    name: "Earrings",
    slug: "earrings",
    description: "Beautiful earrings crafted for everyday elegance and special moments.",
    image_url: "/images/julies-vogue/earrings.jpg",
    sort_order: 2,
  },
  {
    id: "3",
    name: "Bracelets",
    slug: "bracelets",
    description: "Delicate bracelets that complete your jewelry collection.",
    image_url: "/images/julies-vogue/bracelets.jpg",
    sort_order: 3,
  },
  {
    id: "4",
    name: "Rings",
    slug: "rings",
    description: "Statement rings designed to celebrate your unique style.",
    image_url: "/images/julies-vogue/rings.jpg",
    sort_order: 4,
  },
];