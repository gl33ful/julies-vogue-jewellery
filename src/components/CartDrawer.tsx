import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart, cartStore, whatsappOrderLink, formatNaira } from '@/lib/store';
import { navigate } from '@/lib/router';

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const cart = useCart();
  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const orderItems = cart.map((i) => ({
    name: i.product.name,
    price: i.product.price,
    quantity: i.quantity,
  }));

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-500 ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-ivory shadow-2xl flex flex-col transition-transform duration-500 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-beige">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} strokeWidth={1.5} className="text-champagne-600" />
            <h2 className="font-serif text-xl">Your Bag</h2>
            <span className="text-xs text-ink/50">({cart.length})</span>
          </div>
          <button onClick={onClose} aria-label="Close cart">
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
            <ShoppingBag size={48} strokeWidth={1} className="text-champagne-300" />
            <p className="font-serif text-xl text-ink">Your bag is empty</p>
            <p className="text-sm text-ink/60 max-w-xs">
              Discover elegant pieces designed to celebrate your beauty and confidence.
            </p>
            <button
              onClick={() => {
                onClose();
                navigate('/shop');
              }}
              className="btn-gold mt-2"
            >
              Shop Collection
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <button
                    onClick={() => {
                      onClose();
                      navigate(`/product/${item.product.slug}`);
                    }}
                    className="w-20 h-24 bg-cream overflow-hidden shrink-0"
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-serif text-base leading-tight">{item.product.name}</h3>
                    <p className="text-xs text-ink/50 mt-0.5">{item.product.material}</p>
                    <p className="text-sm font-medium text-champagne-700 mt-1">
                      {formatNaira(item.product.price)}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-beige">
                        <button
                          onClick={() =>
                            cartStore.setQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-1.5 hover:bg-cream transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} strokeWidth={1.5} />
                        </button>
                        <span className="px-3 text-sm tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() =>
                            cartStore.setQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1.5 hover:bg-cream transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        onClick={() => cartStore.remove(item.product.id)}
                        className="text-ink/40 hover:text-error transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-beige px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Subtotal</span>
                <span className="font-serif text-xl">{formatNaira(total)}</span>
              </div>
              <p className="text-xs text-ink/50">
                Delivery calculated at checkout. Pay via bank transfer, card, or cash on delivery.
              </p>
              <a
                href={whatsappOrderLink(orderItems)}
                target="_blank"
                rel="noreferrer"
                className="btn-gold w-full"
              >
                Order via WhatsApp
              </a>
              <button
                onClick={onClose}
                className="w-full text-xs text-ink/60 link-underline mx-auto block w-fit"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
