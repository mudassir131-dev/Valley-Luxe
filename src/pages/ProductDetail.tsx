import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Truck, Calendar, Shield, Award, Star, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { showToast } from '../components/UI/Toast';
import { ProductCard } from '../components/UI/ProductCard';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Find the product by ID
  const product = useMemo(() => {
    return products.find((p) => p.id === id);
  }, [id]);

  // Gallery States
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: '50%', y: '50%' });
  const [is360Mode, setIs360Mode] = useState(false);
  const [spinIndex, setSpinIndex] = useState(0);

  // Variant States
  const [selectedVariant, setSelectedVariant] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'story' | 'care' | 'materials'>('story');

  const isFav = isInWishlist(product?.id || '');

  // Reset indices on route change
  useEffect(() => {
    setActiveImageIdx(0);
    setIs360Mode(false);
    setSelectedVariant('Standard');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Image Magnifier Coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x: `${x}%`, y: `${y}%` });
  };

  // 360 Spin simulation logic
  useEffect(() => {
    let interval: any;
    if (is360Mode) {
      interval = setInterval(() => {
        setSpinIndex((prev) => (prev + 1) % 8); // Cycle 8 positions
      }, 250);
    }
    return () => clearInterval(interval);
  }, [is360Mode]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: `${product.id}-${selectedVariant}`,
      name: `${product.name} (${selectedVariant})`,
      price: product.price,
      image: product.images[0],
      badge: product.badge,
      category: product.category,
    });
    showToast(`Added to Bag: ${product.name} (${selectedVariant})`, 'success');
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    toggleWishlist(product.id);
    if (!isFav) {
      showToast(`Saved to Wishlist`, 'success');
    } else {
      showToast('Removed from Wishlist', 'info');
    }
  };

  // WhatsApp Prepopulated Message Link
  const whatsAppLink = useMemo(() => {
    if (!product) return '';
    const number = '919999999999';
    const text = `Hello Valley Luxe! I would like to order the following Kashmiri masterpiece:\n\n*Product:* ${product.name}\n*Variant:* ${selectedVariant}\n*Quantity:* ${quantity}\n*Price:* ₹${(product.price * quantity).toLocaleString('en-IN')}\n\nCould you please confirm the shipping availability for this?`;
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }, [product, selectedVariant, quantity]);

  // Est Delivery Date (6 days from now)
  const estDeliveryDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 6);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  }, []);

  // Filter related products
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="py-32 text-center text-[#1A0A00] dark:text-ivory-cream bg-[#FAFAF8] dark:bg-[#0D0500] min-h-screen flex flex-col items-center justify-center">
        <h2 className="font-display font-light text-3xl text-saffron-gold mb-4 uppercase">Treasury Item Not Found</h2>
        <Link to="/shop" className="text-[#6B5E52] dark:text-ivory-cream/60 hover:text-saffron-gold underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAFAF8] dark:bg-[#0D0500] text-[#1A0A00] dark:text-ivory-cream min-h-screen pt-4 pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 font-ui text-[9px] tracking-widest text-[#6B5E52] dark:text-ivory-cream/50 uppercase mb-6 text-left">
          <Link to="/" className="hover:text-saffron-gold">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-saffron-gold">Shop</Link>
          <span>/</span>
          <span className="text-saffron-gold font-bold">{product.category}</span>
        </div>

        {/* Product Details Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 text-left">
          
          {/* LEFT COLUMN: VISUAL GALLERY & 360 PREVIEWS */}
          <div className="flex flex-col gap-4">
            
            {/* Main Image View Port */}
            <div
              className="relative w-full aspect-square bg-white dark:bg-[#1A0A00] rounded-2xl border border-[#F0EDE8] dark:border-saffron-gold/10 overflow-hidden group cursor-zoom-in shadow-xs"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => {
                setZoomed(false);
                setIs360Mode(false);
              }}
            >
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 bg-[#C8860A] text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
                  {product.badge}
                </div>
              )}

              {/* 360 spin simulation */}
              {is360Mode ? (
                <div className="w-full h-full flex items-center justify-center bg-white dark:bg-[#1A0A00]">
                  <img
                    src={product.images[spinIndex % 2 === 0 ? 0 : 1] || product.images[0]}
                    alt="360 rotation frame"
                    className={`w-full h-full object-cover transition-transform duration-300 ${spinIndex % 2 === 0 ? 'scale-105 rotate-1' : 'scale-105 -rotate-1'}`}
                  />
                  <div className="absolute bottom-4 right-4 bg-[#1A0A00]/80 border border-saffron-gold/30 font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded text-saffron-gold font-bold shadow">
                    360° Rotations Active
                  </div>
                </div>
              ) : (
                <img
                  src={product.images[activeImageIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300"
                  style={{
                    transformOrigin: `${zoomPos.x} ${zoomPos.y}`,
                    transform: zoomed ? 'scale(2.0)' : 'scale(1)',
                    transition: zoomed ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const el = document.createElement('div');
                      el.className = 'w-full h-full flex items-center justify-center bg-[#C8860A]/10 text-saffron-gold font-display text-lg uppercase tracking-wider text-center p-6';
                      el.innerText = product.name;
                      parent.appendChild(el);
                    }
                  }}
                />
              )}
            </div>

            {/* Thumbnail Navigation Indicators & 360 Spin Toggles */}
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIdx(idx);
                    setIs360Mode(false);
                  }}
                  className={`w-16 aspect-square rounded-xl overflow-hidden border transition-all duration-300 bg-white dark:bg-[#1A0A00] cursor-pointer ${
                    activeImageIdx === idx && !is360Mode ? 'border-[#C8860A] scale-105 shadow-sm' : 'border-[#F0EDE8] dark:border-saffron-gold/10 hover:border-saffron-gold/35'
                  }`}
                >
                  <img src={img} alt="item thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
              
              {/* 360 Spin Mode Button */}
              {product.images[1] && (
                <button
                  onClick={() => setIs360Mode(!is360Mode)}
                  className={`w-16 aspect-square rounded-xl flex flex-col items-center justify-center border font-mono text-[8px] tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    is360Mode ? 'border-[#C8860A] text-[#C8860A] bg-saffron-gold/10 scale-105 shadow-sm font-bold' : 'border-[#F0EDE8] dark:border-saffron-gold/10 hover:border-saffron-gold/35 text-[#6B5E52] dark:text-ivory-cream/55 bg-white dark:bg-[#1A0A00]'
                  }`}
                >
                  <RotateCcw size={14} className={`mb-1 ${is360Mode ? 'animate-spin' : ''}`} />
                  <span>360° Spin</span>
                </button>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: DETAIL VALUES & ORDER OPTIONS */}
          <div className="flex flex-col gap-5">
            
            {/* Category & Title */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-saffron-gold font-bold">
                Authentic Kashmiri Handicraft
              </span>
              <h1 className="font-display font-light text-2xl sm:text-3xl lg:text-4xl text-[#1A0A00] dark:text-ivory-cream leading-tight">
                {product.name}
              </h1>
              
              {/* Star Rating Reviews */}
              <div className="flex items-center gap-1.5 mt-1">
                <div className="flex text-saffron-gold gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < Math.floor(product.rating) ? 'fill-saffron-gold text-saffron-gold' : 'text-[#6B5E52]/20 dark:text-white/10'}
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] text-[#6B5E52] dark:text-ivory-cream/50 font-bold">
                  {product.rating} ({product.reviewsCount} Customer Reviews)
                </span>
              </div>
            </div>

            {/* Price Detail */}
            <div className="flex items-center justify-between py-3.5 border-y border-[#F0EDE8] dark:border-saffron-gold/10">
              <div>
                <span className="font-mono text-2xl text-[#C8860A] font-bold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <p className="font-ui text-[9px] text-[#6B5E52] dark:text-ivory-cream/45 uppercase tracking-widest mt-0.5 font-semibold">Inclusive of all local taxes</p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[#C8860A]/20 dark:border-saffron-gold/20 rounded-xl bg-saffron-gold/5">
                <Award size={14} className="text-[#C8860A]" />
                <span className="font-mono text-[9px] tracking-widest text-[#C8860A] uppercase font-bold">GI Certified Origin</span>
              </div>
            </div>

            {/* Swatches (Variants) */}
            <div className="flex flex-col gap-2">
              <span className="font-ui text-[10px] tracking-widest uppercase font-bold text-[#6B5E52]/80 dark:text-ivory-cream/40">Select Swatch</span>
              <div className="flex gap-2.5">
                {['Standard', 'Premium Selection'].map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 border font-ui text-[10px] uppercase font-bold tracking-widest rounded-xl transition-all duration-300 cursor-pointer ${
                      selectedVariant === variant 
                        ? 'border-[#C8860A] text-[#C8860A] bg-saffron-gold/10 shadow-xs' 
                        : 'border-[#F0EDE8] dark:border-saffron-gold/10 text-[#6B5E52] dark:text-ivory-cream/60 hover:border-[#C8860A]/35 bg-white dark:bg-white/2'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity select, Add to bag & wishlist toggle */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mt-3">
              
              {/* Stepper */}
              <div className="flex items-center border border-[#F0EDE8] dark:border-saffron-gold/15 rounded-xl bg-white dark:bg-white/5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2.5 hover:text-saffron-gold border-r border-[#F0EDE8] dark:border-saffron-gold/10 font-mono text-xs cursor-pointer font-bold"
                >
                  -
                </button>
                <span className="px-5 py-2.5 font-mono text-xs font-bold text-[#1A0A00] dark:text-ivory-cream">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2.5 hover:text-saffron-gold border-l border-[#F0EDE8] dark:border-saffron-gold/10 font-mono text-xs cursor-pointer font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={handleAddToCart}
                className="flex-grow py-3.5 bg-[#1A0A00] dark:bg-saffron-gold hover:bg-[#C8860A] dark:hover:bg-deep-gold text-white dark:text-[#1A0A00] font-ui font-semibold text-[10px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-xl shadow-md cursor-pointer"
              >
                <ShoppingBag size={14} /> 
                <span>Add to Bag</span>
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={handleWishlistToggle}
                className={`px-4.5 py-3.5 border rounded-xl transition-colors cursor-pointer ${
                  isFav 
                    ? 'border-saffron-gold text-saffron-gold bg-saffron-gold/5' 
                    : 'border-[#F0EDE8] dark:border-saffron-gold/10 text-[#6B5E52] dark:text-ivory-cream hover:border-[#C8860A]/35'
                }`}
                title="Save to Wishlist"
              >
                <Heart size={14} className={isFav ? 'fill-saffron-gold text-saffron-gold' : ''} />
              </button>
            </div>

            {/* Direct WhatsApp Concierge Order Button */}
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 border border-emerald-500/30 hover:border-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-ui font-bold text-[10px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-xl shadow-xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.402.002 9.791-4.386 9.794-9.789.002-2.618-1.01-5.078-2.852-6.92C16.37 2.05 13.914 1.037 11.298 1.037c-5.405 0-9.8 4.394-9.803 9.799-.001 1.57.416 3.103 1.207 4.468L1.688 21.8l6.393-1.676c1.385.753 2.9.146 3.58-.33l.986.36z" />
              </svg>
              <span>Order via WhatsApp</span>
            </a>

            {/* Delivery Info */}
            <div className="flex flex-col gap-3 bg-[#FAFAF8] dark:bg-white/2 border border-[#F0EDE8] dark:border-saffron-gold/5 p-4 rounded-2xl mt-1 text-left">
              <div className="flex items-center gap-2.5 text-xs text-[#6B5E52] dark:text-ivory-cream/70 font-medium">
                <Truck size={14} className="text-[#C8860A]" />
                <span>Estimated hand delivery by <strong className="text-saffron-gold font-bold">{estDeliveryDate}</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#6B5E52] dark:text-ivory-cream/70 font-medium">
                <Calendar size={14} className="text-[#C8860A]" />
                <span>Free Insured Delivery worldwide on orders above ₹5,000</span>
              </div>
            </div>

            {/* Micro badges trust row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 border-t border-[#F0EDE8] dark:border-saffron-gold/10 pt-5 mt-2">
              {[
                { icon: <Shield size={14} />, label: '100% Authentic' },
                { icon: <Award size={14} />, label: 'Handmade Guild' },
                { icon: <RotateCcw size={14} />, label: 'Free Returns' },
                { icon: <Shield size={14} />, label: 'Secure Checkout' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center gap-1 p-2 bg-white dark:bg-white/2 border border-[#F0EDE8] dark:border-saffron-gold/5 rounded-xl shadow-xs">
                  <div className="text-saffron-gold">{item.icon}</div>
                  <span className="font-ui text-[8px] tracking-wider text-[#6B5E52] dark:text-ivory-cream/70 font-bold uppercase">{item.label}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* TABS VIEW: STORY, CARE, DETAILS */}
        <section className="mt-16 border-t border-[#F0EDE8] dark:border-saffron-gold/10 pt-10 text-left">
          
          <div className="flex gap-6 border-b border-[#F0EDE8] dark:border-saffron-gold/5 pb-3.5 mb-5">
            {[
              { id: 'story', label: 'The Story' },
              { id: 'care', label: 'Care Guides' },
              { id: 'materials', label: 'Materials & Origin' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`font-display text-base tracking-wider uppercase pb-1.5 transition-all duration-300 relative cursor-pointer font-medium ${
                  activeTab === tab.id ? 'text-[#C8860A]' : 'text-[#6B5E52] dark:text-ivory-cream/40'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#C8860A]" />}
              </button>
            ))}
          </div>

          <div className="font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/75 leading-relaxed max-w-3xl font-medium">
            {activeTab === 'story' && (
              <div className="flex flex-col gap-3">
                <p className="font-display italic text-sm text-[#C8860A] font-medium">"{product.description}"</p>
                <p>{product.story}</p>
              </div>
            )}
            {activeTab === 'care' && (
              <p className="whitespace-pre-line leading-loose">{product.care}</p>
            )}
            {activeTab === 'materials' && (
              <div className="flex flex-col gap-4">
                <div>
                  <strong className="text-saffron-gold font-mono text-[9px] tracking-wider uppercase block mb-0.5">Composition Materials</strong>
                  <span>{product.materials}</span>
                </div>
                <div>
                  <strong className="text-saffron-gold font-mono text-[9px] tracking-wider uppercase block mb-0.5">Heritage Origin</strong>
                  <span>{product.origin}</span>
                </div>
              </div>
            )}
          </div>

        </section>

        {/* RELATED COMPLIMENTS STRIP */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 border-t border-[#F0EDE8] dark:border-saffron-gold/10 pt-10 text-left">
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-saffron-gold mb-2 block font-bold">Related Curations</span>
            <h2 className="font-display font-light text-2xl tracking-wider text-[#1A0A00] dark:text-ivory-cream uppercase mb-8 leading-none">
              You May Also Appreciate
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div key={p.id} className="h-full">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;
