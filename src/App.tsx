import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { useRoute } from '@/lib/router';
import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { ProductPage } from '@/pages/ProductPage';
import { AboutPage } from '@/pages/AboutPage';
import { FaqPage } from '@/pages/FaqPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { Preloader } from "@/components/Preloader";

function App() {
  const route = useRoute();
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const alreadyVisited = sessionStorage.getItem("jv-loaded");

  if (alreadyVisited) {
    setLoading(false);
    return;
  }

  const timer = setTimeout(() => {
    setLoading(false);
    sessionStorage.setItem("jv-loaded", "true");
  }, 2200);

  return () => clearTimeout(timer);
}, []);

if (loading) {
  return <Preloader />;
}  

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <Header onOpenCart={() => setCartOpen(true)} />
      <main className="flex-1">
        {route.name === 'home' && <HomePage />}
        {route.name === 'shop' && <ShopPage />}
        {route.name === 'product' && <ProductPage />}
        {route.name === 'about' && <AboutPage />}
        {route.name === 'faq' && <FaqPage />}
        {route.name === 'wishlist' && <WishlistPage />}
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}

export default App;
