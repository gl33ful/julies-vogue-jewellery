import { Star } from 'lucide-react';

export function StarRating({
  rating,
  size = 14,
  className = '',
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(rating)
              ? 'fill-champagne-400 text-champagne-400'
              : 'fill-transparent text-champagne-300/40'
          }
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}
