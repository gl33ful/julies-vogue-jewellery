import type { Review } from "@/lib/types";

export const reviews: Review[] = [
  {
    id: "1",
    product_id: "1",
    author: "Amara",
    location: "Uyo, Nigeria",
    rating: 5,
    body: "Absolutely beautiful piece. The quality and packaging were amazing.",
    avatar_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    product_id: "2",
    author: "Chisom",
    location: "Lagos, Nigeria",
    rating: 5,
    body: "I loved the design. It looks even better in person.",
    avatar_url: null,
    created_at: new Date().toISOString(),
  },
];