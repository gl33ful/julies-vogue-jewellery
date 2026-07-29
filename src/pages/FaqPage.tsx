import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useReveal, whatsappChatLink } from '@/lib/store';

const FAQS = [
  {
    q: 'How long does delivery take?',
    a: 'Orders within Lagos and Uyo typically arrive within 1–2 business days. Deliveries to other states take 2–5 business days. You will receive a tracking update once your order is dispatched.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept bank transfer, debit/credit card, and cash on delivery within select cities. For WhatsApp orders, our team will confirm payment details with you directly.',
  },
  {
    q: 'How do I place an order via WhatsApp?',
    a: 'Tap any "Order via WhatsApp" button on the website or the floating WhatsApp button. Your selected items and total are sent straight to our team, who will confirm availability and delivery with you.',
  },
  {
    q: 'What is your returns and exchange policy?',
    a: 'Unworn pieces in their original packaging can be exchanged within 7 days of delivery. Due to hygiene, earrings cannot be returned unless faulty. Please contact us via WhatsApp to begin an exchange.',
  },
  {
    q: 'How should I care for my jewelry?',
    a: 'Keep pieces dry and store them in the pouch or box provided. Avoid contact with perfumes, lotions, and water. Gently wipe with a soft cloth after each wear to maintain the gold finish.',
  },
  {
    q: 'Are your pieces hypoallergenic?',
    a: 'Most of our pieces are crafted with hypoallergenic, nickel-free materials. Product details on each page list the specific material. If you have sensitive skin, reach out and we will guide you to the best options.',
  },
  {
    q: 'Do you offer gift packaging?',
    a: 'Yes. Every order arrives in signature Julies Vogue packaging. Gift sets and selected items include premium gift boxes, ready to give.',
  },
  {
    q: 'Can I order a custom or bulk set for an event?',
    a: 'Absolutely. For weddings, aso-ebi, and gifting, message us on WhatsApp and we will help you curate coordinated sets for your party.',
  },
];

export function FaqPage() {
  useReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="pt-28 md:pt-32">
      <section className="bg-cream py-14 md:py-20">
        <div className="container-luxe text-center">
          <p className="eyebrow mb-4">Help Center</p>
          <h1 className="font-serif text-4xl md:text-6xl">Frequently Asked Questions</h1>
          <p className="mt-5 max-w-xl mx-auto text-ink/60 font-light">
            Everything you need to know about ordering, delivery, and caring for your Julies Vogue
            pieces.
          </p>
        </div>
      </section>

      <section className="container-luxe py-16 md:py-24 max-w-3xl">
        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border border-beige bg-ivory reveal">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-serif text-lg text-ink">{item.q}</span>
                  <span className="shrink-0 text-champagne-600">
                    {isOpen ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-luxe ${
                    isOpen ? 'max-h-60' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-sm text-ink/65 leading-relaxed font-light">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center bg-ink text-ivory py-12 px-6 reveal">
          <h2 className="font-serif text-2xl md:text-3xl">Still Have Questions?</h2>
          <p className="text-ivory/65 mt-3 font-light">
            Our team is one message away and happy to help.
          </p>
          <a href={whatsappChatLink()} target="_blank" rel="noreferrer" className="btn-gold mt-7">
            Chat With Us
          </a>
        </div>
      </section>
    </div>
  );
}
