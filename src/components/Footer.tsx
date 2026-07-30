import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';
import { navigate, hrefFor } from '@/lib/router';
import { whatsappChatLink } from '@/lib/store';

const SHOP_LINKS = [
  { label: 'Necklaces', cat: 'necklaces' },
  { label: 'Earrings', cat: 'earrings' },
  { label: 'Bracelets', cat: 'bracelets' },
  { label: 'Rings', cat: 'rings' },
  { label: 'Sets', cat: 'sets' },
  { label: 'Gift Items', cat: 'gift-items' },
];

const HOUSE_LINKS = [
  { label: 'About', route: hrefFor({ name: 'about' }) },
  { label: 'FAQ', route: hrefFor({ name: 'faq' }) },
  { label: 'Shop All', route: hrefFor({ name: 'shop' }) },
];

export function Footer() {
  return (
    <footer className="bg-ink text-ivory/80">
      <div className="container-luxe py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl text-ivory tracking-wider2 mb-4">JULIES VOGUE</h3>
            <p className="text-sm leading-relaxed text-ivory/60 max-w-xs">
              Affordable luxury jewelry for modern women who want elegance, confidence, and timeless
              beauty.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/juliesvogue_jewelry/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-ivory/70 hover:text-champagne-400 transition-colors"
              >
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61577843279815"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-ivory/70 hover:text-champagne-400 transition-colors"
              >
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a
                href={whatsappChatLink()}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="text-ivory/70 hover:text-champagne-400 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="eyebrow !text-champagne-400 mb-5">Shop</p>
            <ul className="space-y-3">
              {SHOP_LINKS.map((l) => (
                <li key={l.cat}>
                  <button
                    onClick={() => navigate(`/shop/${l.cat}`)}
                    className="text-sm text-ivory/70 hover:text-champagne-400 transition-colors link-underline"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* House */}
          <div>
            <p className="eyebrow !text-champagne-400 mb-5">The House</p>
            <ul className="space-y-3">
              {HOUSE_LINKS.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => navigate(l.route)}
                    className="text-sm text-ivory/70 hover:text-champagne-400 transition-colors link-underline"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow !text-champagne-400 mb-5">Visit Us</p>
            <ul className="space-y-3 text-sm text-ivory/70">
              <li className="flex items-start gap-2">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-champagne-400" />
                <span>Julies Vogue Jewelry,10 Kennedy Ekong Cresent, OsongAma Estate Rd, Uyo 520101, Akwa Ibom, Nigeria</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-champagne-400" />
                <a href={whatsappChatLink()} target="_blank" rel="noreferrer" className="link-underline">
                  Chat with us on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline my-12 opacity-30" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
          <p>© {new Date().getFullYear()} Julies Vogue. All rights reserved.</p>
          <p className="tracking-wider2 uppercase text-[0.65rem]">Crafted with elegance by EddyWebDesignStudio</p>
        </div>
      </div>
    </footer>
  );
}
