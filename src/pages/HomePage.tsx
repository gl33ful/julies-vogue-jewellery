import { ArrowRight, Sparkles, Truck, Gift, Heart, ShieldCheck, Quote } from 'lucide-react';
import { useProducts, useCategories } from '@/lib/hooks';
import { navigate } from '@/lib/router';
import { useReveal, whatsappChatLink } from '@/lib/store';
import { ProductCard } from '@/components/ProductCard';
import { StarRating } from '@/components/StarRating';

const COLLECTIONS = [
  { key: 'New Arrivals', blurb: 'The latest additions to the Julies Vogue atelier.', filter: (p: any) => p.is_new, image: '/images/julies-vogue/customer.jpg' },
  { key: 'Everyday Elegance', blurb: 'Pieces made to be worn from morning to midnight.', filter: (p: any) => p.collection === 'Everyday Elegance', image: '/images/julies-vogue/juliesvogue_jewelry_set_4.webp' },
  { key: 'Statement Pieces', blurb: 'Bold designs for the moments you want to be seen.', filter: (p: any) => p.collection === 'Statement Pieces', image: '/images/julies-vogue/juliesvogue_jewelry_post_3.webp' },
  { key: 'Gift Collection', blurb: 'Beautifully packaged, ready to be remembered.', filter: (p: any) => p.collection === 'Gift Collection', image: '/images/julies-vogue/juliesvogue_jewelry_hand.webp' },
  { key: 'Wedding & Special Moments', blurb: 'Coordinated sets for your most treasured days.', filter: (p: any) => p.collection === 'Wedding & Special Moments', image: '/images/julies-vogue/juliesvogue_jewelry_post_2025-07-15_.webp' },
];

const TRUST = [
  { icon: Sparkles, title: 'Premium Quality Pieces', text: 'Every piece is hand-finished in warm champagne gold and crafted to last.' },
  { icon: Heart, title: 'Elegant Designs For Every Occasion', text: 'From everyday staples to statement occasions — there is a piece for every woman.' },
  { icon: Truck, title: 'Reliable Delivery', text: 'Fast, tracked delivery across Nigeria. Your order arrives beautifully packaged.' },
  { icon: Gift, title: 'Beautiful Gift Packaging', text: 'Each order is presented in signature Julies Vogue packaging, ready to give.' },
  { icon: ShieldCheck, title: 'Trusted By Fashion Lovers', text: 'Hundreds of women across Nigeria wear and love Julies Vogue every day.' },
];

const TESTIMONIALS = [
  { name: 'Adaeze O.', location: 'Lagos', text: 'I have worn my Aurelia necklace every single day since it arrived. The gold tone looks so rich and it has not tarnished at all. Worth every naira.', rating: 5 },
  { name: 'Halima S.', location: 'Kano', text: 'I bought the Romy pearl set for my wedding and I felt like royalty. The pearls are so luminous. Thank you Julies Vogue.', rating: 5 },
  { name: 'Ngozi E.', location: 'Enugu', text: 'The Sofia tennis bracelet makes me feel like a million dollars. The sparkle is unreal and the clasp feels secure.', rating: 5 },
  { name: 'Bisi O.', location: 'Lagos', text: 'Ordered via WhatsApp and the owner was so patient and kind. The bracelet exceeded my expectations.', rating: 5 },
  { name: 'Yetunde B.', location: 'Lagos', text: 'The set came in a beautiful box ready to gift. I kept it for myself instead. No regrets.', rating: 5 },
  { name: 'Tola A.', location: 'Port Harcourt', text: 'Light as air and so elegant. I wore the Celeste earrings to my sisters wedding and three people asked where I bought them.', rating: 5 },
];

const INSTA = [
  'https://images.pexels.com/photos/31757540/pexels-photo-31757540.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/9509037/pexels-photo-9509037.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/36324989/pexels-photo-36324989.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/27257368/pexels-photo-27257368.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/13152076/pexels-photo-13152076.jpeg?auto=compress&cs=tinysrgb&w=500',
  '/images/julies-vogue/juliesvogue_jewelry_mannequin_1.webp',
];

export function HomePage() {
  useReveal();
  const { products, loading } = useProducts();
  const categories = useCategories();

  const bestsellers = products.filter((p) => p.is_bestseller).slice(0, 8);

  return (
    <div className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative h-[100svh] min-h-[640px] flex items-center justify-center animate-fadeHero">
        <div className="absolute inset-0">
          <img
            
            src="images/julies-vogue/julies_image.png"
            alt="Woman wearing elegant gold jewelry"
            loading='eager'
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/35 to-ink/70" />
        </div>
        <div className="relative container-luxe text-center text-ivory z-10 pt-16">
          <p className="eyebrow !text-champagne-200 mb-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Julies Vogue · Fine Jewelry
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.05] max-w-3xl mx-auto animate-fadeUp">
            Jewelry That Completes<br />Your Story
          </h1>
          <p className="mt-7 max-w-xl mx-auto text-ivory/85 text-base md:text-lg font-light leading-relaxed animate-fadeUp" style={{ animationDelay: '0.25s' }}>
            Discover elegant pieces designed to celebrate your beauty, confidence, and unforgettable
            moments.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeUp" style={{ animationDelay: '0.4s' }}>
            <button onClick={() => navigate('/shop')} className="btn-gold">
              Shop Collection
            </button>
            <a href={whatsappChatLink()} target="_blank" rel="noreferrer" className="btn-ghost-light">
              Chat With Us
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/60 text-[0.6rem] tracking-luxe uppercase animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          Scroll to explore
        </div>
      </section>

      {/* ===== FEATURED COLLECTIONS ===== */}
      <section className="py-20 md:py-28 bg-ivory">
        <div className="container-luxe">
          <div className="text-center mb-14 reveal">
            <p className="eyebrow mb-4">Curated For You</p>
            <h2 className="font-serif text-3xl md:text-5xl">Featured Collections</h2>
            <div className="hairline w-24 mx-auto mt-6" />
          </div>

          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
            {COLLECTIONS.map((c, i) => (
              <button
                key={c.key}
                onClick={() => navigate('/shop')}
                className={`group relative overflow-hidden img-zoom reveal ${
                  i === 0 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' : 'aspect-[3/4]'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <img src={c.image} alt={c.key} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 text-left text-ivory">
                  <h3 className={`font-serif ${i === 0 ? 'text-2xl md:text-3xl' : 'text-lg'}`}>{c.key}</h3>
                  <p className="text-xs text-ivory/70 mt-1 line-clamp-2 hidden md:block">{c.blurb}</p>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-[0.65rem] tracking-wider2 uppercase text-champagne-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Discover <ArrowRight size={13} strokeWidth={1.5} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEST SELLERS ===== */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container-luxe">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal">
            <div>
              <p className="eyebrow mb-4">Loved By Many</p>
              <h2 className="font-serif text-3xl md:text-5xl">Best Sellers</h2>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 text-sm tracking-wider2 uppercase text-ink/70 hover:text-champagne-700 transition-colors link-underline w-fit"
            >
              View All <ArrowRight size={15} strokeWidth={1.5} />
            </button>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-beige/50 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {bestsellers.map((p, i) => (
                <div key={p.id} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== WHY CHOOSE ===== */}
      <section className="py-20 md:py-28 bg-ink text-ivory">
        <div className="container-luxe">
          <div className="text-center mb-16 reveal">
            <p className="eyebrow !text-champagne-400 mb-4">The Julies Vogue Promise</p>
            <h2 className="font-serif text-3xl md:text-5xl text-ivory">Why Women Choose Us</h2>
            <div className="hairline w-24 mx-auto mt-6" />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {TRUST.map((t, i) => (
              <div key={t.title} className="text-center reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-14 h-14 mx-auto rounded-full border border-champagne-400/40 flex items-center justify-center mb-5 text-champagne-400">
                  <t.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg text-ivory mb-2">{t.title}</h3>
                <p className="text-sm text-ivory/60 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BRAND STORY ===== */}
      <section className="py-20 md:py-32 bg-ivory">
        <div className="container-luxe grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative reveal">
            <div className="img-zoom aspect-[4/5] overflow-hidden">
              <img
                src="https://images.pexels.com/photos/31757540/pexels-photo-31757540.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Julies Vogue jewelry craftsmanship"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-ink text-ivory p-6 max-w-[220px]">
              <p className="font-serif text-3xl text-champagne-400">100%</p>
              <p className="text-xs text-ivory/70 mt-1 tracking-wider2 uppercase">Crafted with intention</p>
            </div>
          </div>
          <div className="reveal">
            <p className="eyebrow mb-4">Our Story</p>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight">
              More Than An Accessory.<br />A Feeling.
            </h2>
            <div className="hairline w-16 my-7" />
            <p className="text-ink/75 leading-relaxed text-lg font-light">
              At Julies Vogue, we believe jewelry is more than an accessory. Every piece represents
              confidence, elegance, and the unforgettable moments that define us.
            </p>
            <p className="text-ink/65 leading-relaxed mt-5 font-light">
              From our atelier to your jewelry box, each piece is selected and finished with one
              promise — that when you wear it, you feel like the most elegant version of yourself.
            </p>
            <button onClick={() => navigate('/about')} className="btn-outline mt-9">
              Read Our Story
            </button>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container-luxe">
          <div className="text-center mb-14 reveal">
            <p className="eyebrow mb-4">Loved Across Nigeria</p>
            <h2 className="font-serif text-3xl md:text-5xl">What Our Customers Say</h2>
            <div className="hairline w-24 mx-auto mt-6" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="bg-ivory p-7 flex flex-col reveal"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <Quote size={26} strokeWidth={1} className="text-champagne-400 mb-4" />
                <StarRating rating={t.rating} size={14} className="mb-3" />
                <p className="text-ink/75 leading-relaxed flex-1 font-light italic">"{t.text}"</p>
                <div className="mt-5 pt-5 border-t border-beige">
                  <p className="font-serif text-base">{t.name}</p>
                  <p className="text-xs text-ink/50 mt-0.5">{t.location}, Nigeria</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INSTAGRAM ===== */}
      <section className="py-20 md:py-28 bg-ivory">
        <div className="container-luxe">
          <div className="text-center mb-12 reveal">
            <p className="eyebrow mb-4">@juliesvogue_jewelry</p>
            <h2 className="font-serif text-3xl md:text-5xl">Follow Our Style Journey</h2>
            <p className="text-ink/60 mt-4 max-w-md mx-auto font-light">
              Tag us and share how you style your Julies Vogue pieces — you might be featured.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {INSTA.map((src, i) => (
              <a
                key={i}
                href="https://www.instagram.com/juliesvogue_jewelry/"
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square overflow-hidden img-zoom reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <img src={src} alt="Instagram showcase" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-500 flex items-center justify-center">
                  <span className="text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs tracking-luxe uppercase">
                    Follow
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-10 reveal">
            <a
              href="https://www.instagram.com/juliesvogue_jewelry/"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              Follow On Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-28 md:py-40 bg-ink text-ivory overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src= "/images/julies-vogue/juliesvogue_jewelry_mannequin_1.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/60" />
        <div className="relative container-luxe text-center reveal">
          <p className="eyebrow !text-champagne-400 mb-5">Your Piece Is Waiting</p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight max-w-2xl mx-auto">
            Find The Piece That Speaks To You
          </h2>
          <p className="mt-6 text-ivory/70 max-w-md mx-auto font-light">
            Explore the full collection and discover jewelry made to celebrate you.
          </p>
          <button onClick={() => navigate('/shop')} className="btn-gold mt-10">
            Shop Julies Vogue
          </button>
        </div>
      </section>
    </div>
  );
}
