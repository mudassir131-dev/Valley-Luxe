import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowUp, Cookie, Package, Heart as HeartIcon, Ticket, MapPin, Settings as SettingsIcon, Check, Copy } from 'lucide-react';

// Context Providers
import { AppSettingsProvider, useAppSettings } from './context/AppSettingsContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider, useWishlist } from './context/WishlistContext';

// UI Layout Components
import { CustomCursor } from './components/UI/CustomCursor';
import { Preloader } from './components/UI/Preloader';
import { Navbar } from './components/UI/Navbar';
import { Sidebar } from './components/UI/Sidebar';
import { CartPanel } from './components/UI/CartPanel';
import { ProductCard } from './components/UI/ProductCard';
import { ToastContainer, showToast } from './components/UI/Toast';
import { Footer } from './components/UI/Footer';

// Page Components
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

import { products } from './data/products';

// Global Scroll Top Manager to reset scroll coordinates on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};



// Background Soundscape Audio Manager
const AudioPlayer: React.FC = () => {
  const { audioPlaying } = useAppSettings();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audioPlaying) {
      audio.play().catch(() => {
        console.log('Audio autoplay prevented by user permissions.');
      });
    } else {
      audio.pause();
    }
  }, [audioPlaying]);

  return (
    <audio
      ref={audioRef}
      src="https://assets.mixkit.co/music/preview/mixkit-zen-meditation-101.mp3"
      loop
      preload="auto"
    />
  );
};

// Interactive Multi-functional Mock Page Component
interface MockPageProps {
  title: string;
  icon: 'package' | 'heart' | 'ticket' | 'map-pin' | 'settings';
  desc?: string;
}

const MockPage: React.FC<MockPageProps> = ({ title, icon, desc }) => {
  const { wishlist } = useWishlist();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const getIcon = () => {
    switch (icon) {
      case 'package': return <Package size={32} className="text-[#C8860A]" />;
      case 'heart': return <HeartIcon size={32} className="text-[#E53935]" />;
      case 'ticket': return <Ticket size={32} className="text-[#C8860A]" />;
      case 'map-pin': return <MapPin size={32} className="text-[#C8860A]" />;
      case 'settings': return <SettingsIcon size={32} className="text-[#6B5E52]" />;
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon "${code}" copied to clipboard!`, 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto text-left">
      <div className="flex items-center gap-4 mb-6 border-b border-[#F0EDE8] dark:border-saffron-gold/10 pb-5">
        <div className="p-3 bg-[#FAFAF8] dark:bg-white/5 rounded-xl border border-[#F0EDE8] dark:border-saffron-gold/5">
          {getIcon()}
        </div>
        <div>
          <h1 className="font-display font-light text-3xl text-[#1A0A00] dark:text-ivory-cream uppercase tracking-wider leading-none">
            {title}
          </h1>
          {desc && (
            <p className="font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/50 mt-1.5 font-medium tracking-wide">
              {desc}
            </p>
          )}
        </div>
      </div>

      {/* Render Wishlist Page */}
      {icon === 'heart' && (
        <div>
          {wishlistProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
              <HeartIcon size={48} className="text-[#6B5E52]/20" />
              <h3 className="font-display font-light text-lg text-[#1A0A00] dark:text-ivory-cream tracking-widest uppercase">
                Your Wishlist is Empty
              </h3>
              <p className="font-ui text-[11px] text-[#6B5E52]/80 max-w-xs">
                Explore our fine collections of Pashminas, carpets, and rare saffron to save items here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Render Coupons & Offers */}
      {icon === 'ticket' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {[
            { code: 'VALLEY10', title: 'Atelier Welcome Discount', offer: '10% OFF Storewide', detail: 'Applies to all pashminas, hand carvings, and dry fruits. One use per customer.' },
            { code: 'ROYALSHIP', title: 'Premium Free Delivery', offer: 'Free Express Shipping', detail: 'Guarantees free signature-required shipping on all order values.' },
            { code: 'ARTISAN20', title: 'Artisanal Celebration', offer: '20% OFF on Handicrafts', detail: 'Applies specifically to hand-painted paper mache and carved walnut bowls.' }
          ].map(coupon => (
            <div key={coupon.code} className="border border-[#F0EDE8] dark:border-saffron-gold/10 rounded-2xl p-5 bg-white dark:bg-white/2 shadow-sm flex flex-col justify-between hover:border-[#C8860A]/35 transition-all">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display font-medium text-lg text-[#1A0A00] dark:text-ivory-cream leading-tight">
                    {coupon.title}
                  </h3>
                  <span className="bg-[#C8860A]/10 text-[#C8860A] font-mono text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                    {coupon.offer}
                  </span>
                </div>
                <p className="font-ui text-[11px] text-[#6B5E52] dark:text-ivory-cream/60 leading-relaxed mb-5">
                  {coupon.detail}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#F0EDE8] dark:border-saffron-gold/5 pt-4">
                <div className="bg-[#FAFAF8] dark:bg-white/5 border border-dashed border-saffron-gold/25 px-4 py-2 rounded-lg font-mono text-xs font-bold text-[#C8860A] tracking-widest uppercase">
                  {coupon.code}
                </div>
                <button
                  onClick={() => handleCopyCode(coupon.code)}
                  className="flex items-center gap-1.5 font-ui text-[10px] uppercase font-bold tracking-widest text-[#1A0A00] dark:text-ivory-cream hover:text-[#C8860A] dark:hover:text-saffron-gold transition-colors cursor-pointer"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check size={12} className="text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Render Mock Orders */}
      {icon === 'package' && (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <Package size={48} className="text-[#6B5E52]/20" />
          <h3 className="font-display font-light text-lg text-[#1A0A00] dark:text-ivory-cream tracking-widest uppercase">
            No Placed Orders Yet
          </h3>
          <p className="font-ui text-[11px] text-[#6B5E52]/80 max-w-xs leading-relaxed">
            Your premium orders will display here along with real-time Srinagar courier tracking numbers.
          </p>
        </div>
      )}

      {/* Render Addresses */}
      {icon === 'map-pin' && (
        <div className="border border-[#F0EDE8] dark:border-saffron-gold/10 rounded-2xl p-6 max-w-xl bg-white dark:bg-white/2 text-left">
          <h3 className="font-display font-medium text-sm text-[#1A0A00] dark:text-ivory-cream uppercase tracking-widest mb-4">
            Default Delivery Address
          </h3>
          <div className="font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/70 leading-relaxed flex flex-col gap-1">
            <span className="font-semibold text-[#1A0A00] dark:text-ivory-cream">Aarav Malhotra</span>
            <span>House No. 12, Shalimar Enclave</span>
            <span>Near Mughal Gardens, Boulevard Road</span>
            <span>Srinagar, Jammu & Kashmir — 190001</span>
            <span>India</span>
            <span className="mt-3 block font-mono text-[10px] text-[#6B5E52]/60">+91 98765 43210</span>
          </div>
          <button className="mt-6 bg-[#1A0A00] dark:bg-saffron-gold hover:bg-[#C8860A] dark:hover:bg-deep-gold text-white dark:text-[#1A0A00] px-4 py-2.5 font-ui font-semibold text-[9px] tracking-wider uppercase transition-colors rounded-xl cursor-pointer">
            Edit Address Details
          </button>
        </div>
      )}

      {/* Render Account Settings */}
      {icon === 'settings' && (
        <div className="border border-[#F0EDE8] dark:border-saffron-gold/10 rounded-2xl p-6 max-w-2xl bg-white dark:bg-white/2 text-left">
          <h3 className="font-display font-medium text-sm text-[#1A0A00] dark:text-ivory-cream uppercase tracking-widest mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <span className="font-ui text-[9px] text-[#6B5E52] dark:text-ivory-cream/50 uppercase tracking-widest block mb-1.5 font-bold">First Name</span>
              <input type="text" defaultValue="Aarav" className="w-full bg-[#FAFAF8] dark:bg-white/5 border border-[#F0EDE8] dark:border-saffron-gold/15 rounded-lg px-4 py-2 font-ui text-xs text-[#1A0A00] dark:text-ivory-cream outline-none focus:border-saffron-gold" />
            </div>
            <div>
              <span className="font-ui text-[9px] text-[#6B5E52] dark:text-ivory-cream/50 uppercase tracking-widest block mb-1.5 font-bold">Last Name</span>
              <input type="text" defaultValue="Malhotra" className="w-full bg-[#FAFAF8] dark:bg-white/5 border border-[#F0EDE8] dark:border-saffron-gold/15 rounded-lg px-4 py-2 font-ui text-xs text-[#1A0A00] dark:text-ivory-cream outline-none focus:border-saffron-gold" />
            </div>
            <div className="md:col-span-2">
              <span className="font-ui text-[9px] text-[#6B5E52] dark:text-ivory-cream/50 uppercase tracking-widest block mb-1.5 font-bold">Email Address</span>
              <input type="email" defaultValue="aarav@valleyluxe.com" className="w-full bg-[#FAFAF8] dark:bg-white/5 border border-[#F0EDE8] dark:border-saffron-gold/15 rounded-lg px-4 py-2 font-ui text-xs text-[#1A0A00] dark:text-ivory-cream outline-none focus:border-saffron-gold" />
            </div>
          </div>
          <button className="bg-[#C8860A] hover:bg-[#8B5E00] text-white px-5 py-2.5 font-ui font-semibold text-[9px] tracking-wider uppercase transition-colors rounded-xl cursor-pointer">
            Save Preferences
          </button>
        </div>
      )}

    </div>
  );
};

// Main layout shell housing overlays and triggers
const AppLayout: React.FC = () => {
  const [preloaderActive, setPreloaderActive] = useState(() => {
    return !sessionStorage.getItem('valley_luxe_preloaded');
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(() => {
    return !localStorage.getItem('valley_luxe_cookies');
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePreloaderComplete = () => {
    setPreloaderActive(false);
    sessionStorage.setItem('valley_luxe_preloaded', 'true');
  };

  const handleAcceptCookies = () => {
    localStorage.setItem('valley_luxe_cookies', 'accepted');
    setShowCookieBanner(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const location = useLocation();
  const is404 = location.pathname !== '/' && 
                location.pathname !== '/shop' && 
                !location.pathname.startsWith('/product/') && 
                location.pathname !== '/cart' && 
                location.pathname !== '/about' && 
                location.pathname !== '/contact' &&
                location.pathname !== '/orders' &&
                location.pathname !== '/wishlist' &&
                location.pathname !== '/coupons' &&
                location.pathname !== '/addresses' &&
                location.pathname !== '/settings';

  if (preloaderActive) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#FAFAF8] dark:bg-[#0D0500] text-[#1A0A00] dark:text-ivory-cream selection:bg-saffron-gold selection:text-[#FAFAF8] flex transition-colors duration-300">
      <CustomCursor />
      <AudioPlayer />
      <ScrollToTop />
      <ToastContainer />

      {/* LEFT SIDEBAR (Fixed on desktop, drawer on mobile) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* RIGHT SIDE CONTENT VIEWPORT CONTAINER */}
      <div className="flex-grow flex flex-col min-h-screen max-w-full lg:pl-64">
        
        {/* TOP HEADER NAVBAR */}
        {!is404 && (
          <Navbar 
            onMobileMenuToggle={() => setSidebarOpen(true)} 
            onCartToggle={() => setCartOpen(true)} 
          />
        )}

        {/* PRIMARY ROUTE RENDER PORTS */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* NovaShop Editorial routes */}
            <Route path="/orders" element={<MockPage title="My Orders" icon="package" desc="Track your white-glove custom courier shipments." />} />
            <Route path="/wishlist" element={<MockPage title="My Wishlist" icon="heart" desc="Your saved collection of rare Kashmiri handicrafts." />} />
            <Route path="/coupons" element={<MockPage title="Coupons & Promos" icon="ticket" desc="Use these promo codes at bag checkout for exclusive price adjustments." />} />
            <Route path="/addresses" element={<MockPage title="Shipping Addresses" icon="map-pin" desc="Addresses for your signature-required shipments." />} />
            <Route path="/settings" element={<MockPage title="Account Settings" icon="settings" desc="Manage your personal details and order recommendations." />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* FOOTER */}
        {!is404 && <Footer />}

      </div>

      {/* SLIDE IN RIGHT CART PANEL */}
      <CartPanel isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* FLOATING ACTION INTERFACES */}

      {/* 1. Concierge support widget */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-[990] w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-transform duration-300"
        title="Chat with Concierge"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.402.002 9.791-4.386 9.794-9.789.002-2.618-1.01-5.078-2.852-6.92C16.37 2.05 13.914 1.037 11.298 1.037c-5.405 0-9.8 4.394-9.803 9.799-.001 1.57.416 3.103 1.207 4.468L1.688 21.8l6.393-1.676c1.385.753 2.9.146 3.58-.33l.986.36z" />
        </svg>
      </a>

      {/* 2. Scroll Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[990] w-12 h-12 rounded-full border border-saffron-gold/25 bg-white dark:bg-[#1A0A00] hover:bg-saffron-gold hover:text-white text-[#C8860A] flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp size={16} />
        </button>
      )}

      {/* 3. Luxury Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[1000] p-6 border border-[#F0EDE8] dark:border-saffron-gold/15 bg-white dark:bg-[#1A0A00] text-left shadow-2xl rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="text-saffron-gold mt-1 shrink-0">
              <Cookie size={20} className="animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-display font-medium text-sm tracking-wider uppercase text-saffron-gold">Atelier Access Cookies</h4>
              <p className="font-ui text-[11px] text-[#6B5E52] dark:text-ivory-cream/70 leading-relaxed">
                We use cookies to personalize your exploration path and save items to your bag. By accepting, you consent to our private terms.
              </p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={handleAcceptCookies}
                  className="bg-[#C8860A] hover:bg-[#8B5E00] text-white px-4 py-2 font-ui font-semibold text-[9px] tracking-wider uppercase transition-colors rounded-xl cursor-pointer"
                >
                  Accept Private Terms
                </button>
                <button
                  onClick={() => setShowCookieBanner(false)}
                  className="text-[#6B5E52]/50 hover:text-saffron-gold font-mono text-[9px] tracking-widest uppercase cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppSettingsProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AppSettingsProvider>
  );
};

export default App;
