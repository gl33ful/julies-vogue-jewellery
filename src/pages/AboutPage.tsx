import { useReveal } from '@/lib/store';
import { navigate } from '@/lib/router';
import { Heart } from 'lucide-react';

const STORY_IMAGES = [
  '/images/julies-vogue/julies_image_4.png',
  '/images/julies-vogue/lady_in_satin.png',
  'https://images.pexels.com/photos/31757540/pexels-photo-31757540.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/36324989/pexels-photo-36324989.jpeg?auto=compress&cs=tinysrgb&w=800',
  
  
];

export function AboutPage() {
  useReveal();
  return (
    <div className="pt-28 md:pt-32">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/images/julies-vogue/juliesvogue_jewelry_necklace.png"
            alt="Julies Vogue"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink/55" />
        </div>
        <div className="relative container-luxe text-center text-ivory">
          <p className="eyebrow !text-champagne-200 mb-4">The House of Julies Vogue</p>
          <h1 className="font-serif text-4xl md:text-6xl">Our Story</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 md:py-28 bg-ivory">
        <div className="container-luxe max-w-3xl text-center">
          <p className="eyebrow mb-5 reveal">Born In Nigeria</p>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight reveal">
            Jewelry That Carries A Feeling
          </h2>
          <div className="hairline w-20 mx-auto my-8" />
          <p className="text-ink/75 text-lg leading-relaxed font-light reveal">
            Julies Vogue began with a simple belief — that every woman deserves to feel elegant,
            confident, and seen. What started as a love for beautiful things became a mission to
            bring affordable luxury to women across Nigeria.
          </p>
          <p className="text-ink/65 leading-relaxed mt-6 font-light reveal">
            We source, design, and finish each piece with intention. From the warmth of the gold to
            the weight of the clasp, every detail is considered — because the jewelry you wear
            should feel like it was made for you.
          </p>
        </div>
      </section>

      {/* Image strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-ivory">
        {STORY_IMAGES.map((src, i) => (
          <div key={i} className="aspect-[4/5] md:aspect-[3/4] overflow-hidden img-zoom">
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container-luxe">
          <div className="text-center mb-14 reveal">
            <p className="eyebrow mb-4">What We Believe</p>
            <h2 className="font-serif text-3xl md:text-5xl">Our Values</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              { title: 'Elegance For Everyone', text: 'Luxury should not be out of reach. We craft pieces that feel premium without the premium price.' },
              { title: 'Crafted With Intention', text: 'Every piece is selected and finished with care, because the details are what make it yours.' },
              { title: 'Built On Trust', text: 'From WhatsApp orders to doorstep delivery, we treat every customer the way we would want to be treated.' },
            ].map((v, i) => (
              <div key={v.title} className="text-center reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="w-12 h-12 mx-auto rounded-full border border-champagne-400/50 flex items-center justify-center mb-5 text-champagne-600">
                  <Heart size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl mb-3">{v.title}</h3>
                <p className="text-sm text-ink/65 leading-relaxed font-light">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-ink text-ivory text-center">
        <div className="container-luxe reveal">
          <h2 className="font-serif text-3xl md:text-5xl">Discover The Collection</h2>
          <p className="text-ivory/65 mt-5 max-w-md mx-auto font-light">
            Every piece tells a story. Find the one that tells yours.
          </p>
          <button onClick={() => navigate('/shop')} className="btn-gold mt-9">
            Shop Julies Vogue
          </button>
        </div>
      </section>
    </div>
  );
}
