import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, PhoneCall, Star, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/UI/ProductCard';

// Real-time Countdown Timer with Micro-animations
const CountdownTimer: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(9918); // 2h 45m 18s initial

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 9918));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUnit = (num: number) => String(num).padStart(2, '0');

  const hrs = Math.floor(secondsLeft / 3600);
  const mins = Math.floor((secondsLeft % 3600) / 60);
  const secs = secondsLeft % 60;

  const DigitBox = ({ val }: { val: string }) => (
    <div className="flex gap-0.5">
      {val.split('').map((digit, idx) => (
        <AnimatePresence mode="popLayout" key={idx}>
          <motion.span
            key={digit}
            initial={{ y: -8, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 8, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="inline-block bg-[#1A0A00] text-white font-mono text-[14px] font-bold px-2 py-1.5 rounded-md min-w-[20px] text-center"
          >
            {digit}
          </motion.span>
        </AnimatePresence>
      ))}
    </div>
  );

  return (
    <div className="flex items-center gap-1.5 mt-2">
      <DigitBox val={formatUnit(hrs)} />
      <span className="font-bold text-[#1A0A00] font-mono text-[14px] animate-pulse">:</span>
      <DigitBox val={formatUnit(mins)} />
      <span className="font-bold text-[#1A0A00] font-mono text-[14px] animate-pulse">:</span>
      <DigitBox val={formatUnit(secs)} />
    </div>
  );
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Hero slides setup
  const slides = [
    {
      title: 'Crafted in Heaven, Made for You ✦',
      sub: 'Discover authentic Kashmiri handicrafts, pure pashmina, and premium saffron.',
      tag: 'New Collection',
      image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800',
      bgColor: 'from-[#FAF8F5] via-[#FFFFFF] to-[#FAF8F5]'
    },
    {
      title: 'Rare Silk Carpets & Furnishings ✦',
      sub: 'Hand-knotted with over 324 knots per square inch, weaving heritage into geometry.',
      tag: 'Heritage Heirloom',
      image: 'https://images.unsplash.com/photo-1576016770956-debb63d90029?q=80&w=800',
      bgColor: 'from-[#FDFCF7] via-[#FFFFFF] to-[#FDFCF7]'
    },
    {
      title: 'Grade A+ Pampore Saffron ✦',
      sub: 'Harvested under Srinagar autumn skies, carrying Safranal and deep red Crocin.',
      tag: 'Atelier Organic',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800',
      bgColor: 'from-[#FAF6F0] via-[#FFFFFF] to-[#FAF6F0]'
    }
  ];

  // Carousel autoplay every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const categories = [
    { label: 'Pashmina', icon: '🧣', path: '/shop?category=Pashmina' },
    { label: 'Saffron', icon: '🌸', path: '/shop?category=Saffron' },
    { label: 'Dry Fruits', icon: '🥜', path: '/shop?category=Dry Fruits' },
    { label: 'Handicrafts', icon: '🏺', path: '/shop?category=Handicrafts' },
    { label: 'Carpets', icon: '🪺', path: '/shop?category=Carpets' },
    { label: 'More', icon: '⋯', path: '/shop' }
  ];

  const bestDeals = products.filter(p => p.isDeal);
  const recommended = products.filter(p => p.isRecommended);

  return (
    <div className="flex flex-col gap-10 py-6 px-6 max-w-7xl mx-auto text-left">
      
      {/* SECTION 1 — HERO BANNER */}
      <section className="relative w-full h-[380px] rounded-3xl overflow-hidden shadow-xs">
        
        {/* Carousel slide loop */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={`absolute inset-0 w-full h-full bg-gradient-to-r ${slides[currentHeroSlide].bgColor} flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-8`}
          >
            {/* Left side text content */}
            <div className="max-w-lg flex flex-col items-start gap-4 z-10">
              <span className="bg-[#C8860A]/10 text-[#C8860A] text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-saffron-gold/15">
                {slides[currentHeroSlide].tag}
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-[#1A0A00] leading-tight pr-6">
                {slides[currentHeroSlide].title}
              </h2>
              <p className="font-ui text-xs sm:text-sm text-[#6B5E52] leading-relaxed">
                {slides[currentHeroSlide].sub}
              </p>
              <button
                onClick={() => navigate('/shop')}
                className="mt-2 bg-[#C8860A] hover:bg-[#8B5E00] text-white font-ui font-semibold text-[10px] tracking-[0.18em] uppercase px-6 py-3 rounded-full transition-colors duration-300 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Now</span>
                <ArrowRight size={12} />
              </button>
            </div>

            {/* Right side product image container */}
            <div className="relative shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-[#F0EDE8]/80 shadow-md bg-white">
              {/* Soft radial glow behind image */}
              <div className="absolute inset-0 bg-radial-glow z-0" />
              <img
                src={slides[currentHeroSlide].image}
                alt={slides[currentHeroSlide].title}
                className="w-full h-full object-cover z-10 relative"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const el = document.createElement('div');
                    el.className = 'w-full h-full flex items-center justify-center bg-[#C8860A]/5 text-[#C8860A] font-display text-sm uppercase tracking-widest text-center p-6';
                    el.innerText = 'Valley Luxe Craft';
                    parent.appendChild(el);
                  }
                }}
              />
            </div>

            {/* Small Floating Chinar leaf SVG (top right) */}
            <div className="absolute top-8 right-8 text-saffron-gold/25 animate-float pointer-events-none select-none z-10">
              <svg className="w-10 h-10 fill-current" viewBox="0 0 100 100">
                <path d="M50,90 C50,90 53,75 52,65 C54,65 59,71 63,73 C65,74 67,71 65,68 C61,64 57,60 55,57 C58,58 65,62 70,62 C73,62 74,59 71,56 C65,51 58,48 53,46 C56,45 66,48 73,47 C77,47 78,43 74,40 C67,36 59,34 52,34 C54,32 60,30 65,27 C67,26 66,22 63,23 C58,25 53,29 50,32 C47,29 42,25 37,23 C34,22 33,26 35,27 C40,30 46,32 48,34 C41,34 33,36 26,40 C22,43 23,47 27,47 C34,48 44,45 47,46 C42,48 35,51 29,56 C26,59 27,62 30,62 C35,62 42,58 45,57 C43,60 39,64 35,68 C33,71 35,74 37,73 C41,71 46,65 48,65 C47,75 50,90 50,90 Z" />
              </svg>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Carousel indicators dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentHeroSlide === idx ? 'bg-saffron-gold w-6' : 'bg-[#6B5E52]/25'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </section>

      {/* SECTION 2 — CATEGORY ICONS STRIP */}
      <section className="bg-white dark:bg-[#1A0A00] border border-[#F0EDE8] dark:border-saffron-gold/10 p-5 rounded-2xl">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => navigate(cat.path)}
              className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-[#FAFAF8] dark:hover:bg-saffron-gold/5 transition-all group cursor-pointer"
            >
              <span className="text-2xl mb-1.5 transition-transform duration-300 group-hover:scale-120 group-hover:rotate-6">
                {cat.icon}
              </span>
              <span className="font-ui text-[10px] text-[#6B5E52] dark:text-ivory-cream/80 uppercase tracking-widest font-semibold group-hover:text-saffron-gold transition-colors">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 3 — 3 PROMO CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 — Flash Sale */}
        <div className="relative rounded-2xl p-6 bg-[#FFF8EE] border border-[#F6E9D7] flex flex-col justify-between h-[180px] overflow-hidden group">
          <div className="z-10 flex flex-col items-start">
            <span className="bg-[#E53935]/15 text-[#E53935] font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">Flash Sale</span>
            <h3 className="font-display font-medium text-lg text-[#1A0A00] mt-2 leading-tight">
              Up to 30% off on Saffron
            </h3>
            {/* Real-time Ticking Countdown */}
            <CountdownTimer />
          </div>
          {/* Saffron crocus image on right side */}
          <div className="absolute -right-4 -bottom-6 w-28 h-28 opacity-75 group-hover:scale-105 transition-transform duration-500 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=200"
              alt="Kashmir Saffron Crocus"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Card 2 — Free Shipping */}
        <div className="relative rounded-2xl p-6 bg-[#E8F5E9] border border-[#C8E6C9] flex flex-col justify-between h-[180px] overflow-hidden">
          <div className="flex flex-col items-start">
            <span className="bg-emerald-700/10 text-emerald-800 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">Atelier Shipping</span>
            <h3 className="font-display font-medium text-lg text-[#1A0A00] mt-2 leading-tight">
              Free Express Delivery
            </h3>
            <p className="font-ui text-[11px] text-[#6B5E52] mt-1 font-medium">
              On orders above ₹2,000
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[#C8860A] font-semibold text-[10px] font-ui uppercase tracking-wider">
            <Truck size={14} />
            <span>Signature Required</span>
          </div>
        </div>

        {/* Card 3 — New Arrivals */}
        <div className="relative rounded-2xl p-6 bg-[#E3F2FD] border border-[#BBDEFB] flex flex-col justify-between h-[180px] overflow-hidden group">
          <div className="flex flex-col items-start">
            <span className="bg-blue-700/10 text-blue-800 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">Fresh Loom</span>
            <h3 className="font-display font-medium text-lg text-[#1A0A00] mt-2 leading-tight">
              New Arrivals
            </h3>
            <p className="font-ui text-[11px] text-[#6B5E52] mt-1 font-medium">
              Fresh spring Pashmina sets
            </p>
          </div>
          <Link
            to="/shop?new=true"
            className="flex items-center gap-1.5 text-[#C8860A] hover:text-[#8B5E00] font-semibold text-[10px] font-ui uppercase tracking-wider group-hover:translate-x-1 transition-transform"
          >
            <span>Shop Now</span>
            <ArrowRight size={12} />
          </Link>
        </div>

      </section>

      {/* SECTION 4 — BEST DEALS FOR YOU */}
      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display font-light text-2xl text-[#1A0A00] dark:text-ivory-cream uppercase tracking-wider border-l-3 border-[#C8860A] pl-3.5 leading-none">
            Best Deals For You
          </h2>
          <Link
            to="/shop?deals=true"
            className="font-ui text-[10px] uppercase font-bold tracking-widest text-[#C8860A] hover:text-[#8B5E00] flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* Horizontal scroll grid of products */}
        <div className="flex overflow-x-auto gap-5 pb-4 snap-x scroll-smooth scrollbar-thin scrollbar-track-[#FAFAF8] scrollbar-thumb-saffron-gold">
          {bestDeals.map((product) => (
            <div key={product.id} className="w-[240px] shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — RECOMMENDED FOR YOU */}
      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display font-light text-2xl text-[#1A0A00] dark:text-ivory-cream uppercase tracking-wider border-l-3 border-[#6B5E52] pl-3.5 leading-none">
            Recommended For You
          </h2>
          <Link
            to="/shop"
            className="font-ui text-[10px] uppercase font-bold tracking-widest text-[#6B5E52] dark:text-ivory-cream/80 hover:text-saffron-gold flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* Horizontal scroll grid of recommended items */}
        <div className="flex overflow-x-auto gap-5 pb-4 snap-x scroll-smooth scrollbar-thin scrollbar-track-[#FAFAF8] scrollbar-thumb-saffron-gold">
          {recommended.map((product) => (
            <div key={product.id} className="w-[240px] shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — FOOTER TRUST STRIP */}
      <section className="bg-[#F3F1ED] dark:bg-white/5 border border-[#F0EDE8]/60 dark:border-saffron-gold/5 py-6 px-4 rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <ShieldCheck size={18} />, title: 'Secure Payment', desc: '100% safe checkout' },
            { icon: <RefreshCw size={18} />, title: 'Easy Returns', desc: '30-day return policy' },
            { icon: <PhoneCall size={18} />, title: '24/7 Support', desc: 'Always here for you' },
            { icon: <Star size={18} />, title: 'Trusted Brand', desc: '10,000+ happy customers' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 justify-center md:justify-start px-2">
              <div className="text-[#C8860A]">
                {item.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-ui text-[10px] uppercase font-bold tracking-wider text-[#1A0A00] dark:text-ivory-cream leading-tight">
                  {item.title}
                </span>
                <span className="font-ui text-[9px] text-[#6B5E52] dark:text-ivory-cream/55 mt-0.5">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating chinar leaf drift styling */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .bg-radial-glow {
          background: radial-gradient(circle, rgba(200, 134, 10, 0.08) 0%, rgba(255,255,255,0) 70%);
        }
      `}</style>

    </div>
  );
};

export default Home;
