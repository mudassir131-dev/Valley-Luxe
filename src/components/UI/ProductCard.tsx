import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { showToast } from './Toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [hovered, setHovered] = useState(false);

  const isFav = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      badge: product.badge,
      category: product.category,
    });
    showToast(`Added to Bag: ${product.name}`, 'success');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    if (!isFav) {
      showToast(`Added to Wishlist`, 'success');
    } else {
      showToast(`Removed from Wishlist`, 'info');
    }
  };

  // Calculate discount percentage
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative flex flex-col w-full h-full bg-white dark:bg-[#1A0A00] border border-[#F0EDE8] dark:border-saffron-gold/10 hover:border-[#C8860A]/35 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image & Overlays */}
      <Link 
        to={`/product/${product.id}`} 
        className="block relative w-full aspect-square overflow-hidden bg-[#FAFAF8] dark:bg-[#0D0500]"
      >
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-4 left-4 z-10 bg-[#E53935] text-white font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm animate-pulse-badge">
            -{discountPercent}%
          </div>
        )}

        {/* Wishlist Heart Toggle */}
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/95 dark:bg-[#1A0A00]/90 shadow-sm border border-[#F0EDE8] dark:border-saffron-gold/15 text-[#6B5E52] hover:text-[#E53935] hover:scale-105 transition-all duration-200 cursor-pointer"
          aria-label="Toggle Wishlist"
        >
          <Heart
            size={14}
            className={`transition-all duration-200 ${isFav ? 'fill-[#E53935] text-[#E53935]' : 'text-[#6B5E52]'}`}
          />
        </button>

        {/* Image Display */}
        <div className="w-full h-full relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 absolute inset-0 ${
              hovered && product.images[1] ? 'opacity-0' : 'opacity-100'
            }`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const el = document.createElement('div');
                el.className = 'w-full h-full flex items-center justify-center bg-[#C8860A]/10 text-saffron-gold font-display text-sm uppercase tracking-wider text-center p-4';
                el.innerText = product.name;
                parent.appendChild(el);
              }
            }}
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} Alternate`}
              loading="lazy"
              className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 absolute inset-0 ${
                hovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow justify-between text-left">
        
        <div>
          {/* Category & Ratings row */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-ui text-[9px] text-[#6B5E52] dark:text-ivory-cream/55 uppercase tracking-widest font-medium">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star size={10} className="fill-saffron-gold text-saffron-gold" />
              <span className="font-mono text-[9px] font-bold text-[#1A0A00] dark:text-ivory-cream">
                {product.rating}
              </span>
              <span className="font-ui text-[9px] text-[#6B5E52]/65 dark:text-ivory-cream/45">
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-display font-medium text-[15px] text-[#1A0A00] dark:text-ivory-cream hover:text-[#C8860A] transition-colors leading-tight line-clamp-1">
              {product.name}
            </h3>
            {/* Short description */}
            <p className="font-ui text-[11px] text-[#6B5E52] dark:text-ivory-cream/60 mt-1 line-clamp-1 leading-relaxed">
              {product.description}
            </p>
          </Link>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-4">
          
          {/* Price Display */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-mono text-[14px] text-[#C8860A] font-bold">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-[11px] text-[#6B5E52]/60 dark:text-ivory-cream/45 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Scale Bouncing Add to Cart */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-[#1A0A00] dark:bg-saffron-gold hover:bg-[#C8860A] dark:hover:bg-deep-gold text-white dark:text-[#1A0A00] font-ui font-semibold text-[10px] tracking-[0.18em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <ShoppingBag size={12} />
            <span>Add to Bag</span>
          </motion.button>

        </div>

      </div>

      <style>{`
        @keyframes pulse-badge {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-badge {
          animation: pulse-badge 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};
