import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, Tag, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import { showToast } from './Toast';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartPanel: React.FC<CartPanelProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // e.g. 0.1 for 10%

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'VALLEY10') {
      setAppliedDiscount(0.1);
      showToast('Promo Code VALLEY10 Applied (10% Off)', 'success');
    } else {
      showToast('Invalid Promo Code', 'error');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Prefill WhatsApp text
    let message = 'Hello Valley Luxe! I would like to place an order:\n\n';
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (Qty: ${item.quantity}) - ₹${item.price.toLocaleString('en-IN')}\n`;
    });

    const discountAmt = cartTotal * appliedDiscount;
    const finalTotal = cartTotal - discountAmt;

    if (appliedDiscount > 0) {
      message += `\nDiscount Applied (10%): -₹${discountAmt.toLocaleString('en-IN')}`;
    }
    message += '\nShipping: Free';
    message += `\n*Total Amount:* ₹${finalTotal.toLocaleString('en-IN')}`;
    message += '\n\nPlease confirm my order. Thank you!';

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919999999999?text=${encodedMessage}`, '_blank');
    clearCart();
    onClose();
  };

  // Get cross-sell recommendations (exclude items already in cart)
  const cartIds = cart.map(item => item.id);
  const crossSell = products
    .filter(p => !cartIds.includes(p.id))
    .slice(0, 2);

  const recentlyViewed = products
    .filter(p => p.id === 'kani-shawl' || p.id === 'copper-samovar')
    .slice(0, 2);

  const discountAmount = cartTotal * appliedDiscount;
  const netTotal = cartTotal - discountAmount;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A0A00]/30 backdrop-blur-sm z-40 cursor-pointer"
          />

          {/* Cart Panel Slide-in Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[420px] bg-white dark:bg-[#1A0A00] border-l border-[#F0EDE8] dark:border-saffron-gold/15 shadow-2xl z-50 flex flex-col justify-between overflow-y-auto scrollbar-thin"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0EDE8] dark:border-saffron-gold/10">
              <div className="flex items-center gap-2">
                <ShoppingBag size={16} className="text-[#C8860A]" />
                <span className="font-display font-light text-lg text-[#1A0A00] dark:text-ivory-cream uppercase tracking-wider">
                  My Cart ({cart.reduce((acc, curr) => acc + curr.quantity, 0)})
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-[#6B5E52] dark:text-ivory-cream/60 hover:text-[#1A0A00] dark:hover:text-saffron-gold cursor-pointer"
                aria-label="Close Cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Middle Content */}
            <div className="flex-grow overflow-y-auto px-6 py-4 flex flex-col gap-6">
              
              {/* Cart Items list */}
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <ShoppingBag size={48} className="text-[#6B5E52]/20 dark:text-ivory-cream/10" />
                  <span className="font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/45 uppercase tracking-widest">
                    Your bag is empty
                  </span>
                  <button
                    onClick={onClose}
                    className="font-ui text-[10px] uppercase tracking-widest text-[#C8860A] border-b border-[#C8860A] hover:text-[#8B5E00] transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3 border border-[#F0EDE8] dark:border-saffron-gold/10 rounded-xl bg-[#FAFAF8]/50 dark:bg-white/2"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[#F0EDE8] dark:border-saffron-gold/5 bg-[#FAFAF8] dark:bg-white/5">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Replace broken images with placeholder text
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                const el = document.createElement('div');
                                el.className = 'w-full h-full flex items-center justify-center bg-[#C8860A]/10 text-saffron-gold font-display text-[9px] uppercase tracking-wider text-center p-1';
                                el.innerText = item.name.substring(0, 8);
                                parent.appendChild(el);
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#C8860A]/10 text-saffron-gold font-display text-[9px] uppercase tracking-wider text-center p-1">
                            {item.name.substring(0, 8)}
                          </div>
                        )}
                      </div>

                      {/* Info & Adjuster */}
                      <div className="flex-grow flex flex-col justify-between text-left">
                        <div>
                          <h4 className="font-display font-light text-[13px] text-[#1A0A00] dark:text-ivory-cream leading-tight line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="font-ui text-[9px] text-[#6B5E52]/85 dark:text-ivory-cream/50 uppercase tracking-widest block mt-0.5">
                            {item.category}
                          </span>
                        </div>

                        {/* Stepper & Delete */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-[#F0EDE8] dark:border-saffron-gold/10 rounded bg-white dark:bg-white/5">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-1.5 py-1 text-[#6B5E52] dark:text-ivory-cream/60 hover:text-saffron-gold cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="px-2 font-mono text-[10px] text-[#1A0A00] dark:text-ivory-cream">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-1.5 py-1 text-[#6B5E52] dark:text-ivory-cream/60 hover:text-saffron-gold cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] text-[#1A0A00] dark:text-ivory-cream font-medium">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Promo Code Form */}
              {cart.length > 0 && (
                <form onSubmit={handleApplyCoupon} className="border-t border-b border-[#F0EDE8] dark:border-saffron-gold/10 py-4">
                  <span className="font-ui text-[9px] text-[#6B5E52] dark:text-ivory-cream/60 uppercase tracking-widest block text-left mb-2">
                    Enter Atelier Promo Code (Try: VALLEY10)
                  </span>
                  <div className="flex gap-2">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="VALLEY10"
                        className="w-full bg-[#FAFAF8] dark:bg-white/5 border border-[#F0EDE8] dark:border-saffron-gold/15 rounded-lg px-4 py-2 pl-9 font-mono text-xs uppercase tracking-wider outline-none focus:border-saffron-gold"
                      />
                      <Tag size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B5E52]" />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#1A0A00] dark:bg-saffron-gold hover:bg-[#C8860A] dark:hover:bg-deep-gold text-white dark:text-[#1A0A00] px-4 py-2 font-ui font-semibold text-[10px] uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </form>
              )}

              {/* Recommendations Strip (You might also like) */}
              {crossSell.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h4 className="font-display text-xs text-[#1A0A00] dark:text-ivory-cream tracking-widest uppercase text-left border-l-2 border-[#C8860A] pl-2 font-medium">
                    You Might Also Like
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {crossSell.map((product) => (
                      <div
                        key={product.id}
                        className="group flex flex-col border border-[#F0EDE8] dark:border-saffron-gold/10 rounded-xl p-2 bg-[#FAFAF8]/20 dark:bg-white/2"
                      >
                        <div className="aspect-square w-full rounded-lg overflow-hidden bg-white dark:bg-white/5 border border-[#F0EDE8] dark:border-saffron-gold/5">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                const el = document.createElement('div');
                                el.className = 'w-full h-full flex items-center justify-center bg-[#C8860A]/10 text-saffron-gold font-display text-[8px] uppercase tracking-wider text-center p-1';
                                el.innerText = product.name.substring(0, 8);
                                parent.appendChild(el);
                              }
                            }}
                          />
                        </div>
                        <h5 className="font-display font-light text-[10px] text-[#1A0A00] dark:text-ivory-cream mt-2 line-clamp-1 text-left">
                          {product.name}
                        </h5>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-mono text-[9px] text-[#C8860A] font-semibold">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recently Viewed Strip */}
              {recentlyViewed.length > 0 && (
                <div className="flex flex-col gap-3 border-t border-[#F0EDE8] dark:border-saffron-gold/10 pt-4">
                  <h4 className="font-display text-xs text-[#1A0A00] dark:text-ivory-cream tracking-widest uppercase text-left border-l-2 border-[#6B5E52] pl-2 font-medium">
                    Recently Viewed
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {recentlyViewed.map((product) => (
                      <div
                        key={product.id}
                        className="group flex flex-col border border-[#F0EDE8] dark:border-saffron-gold/10 rounded-xl p-2 bg-[#FAFAF8]/20 dark:bg-white/2"
                      >
                        <div className="aspect-square w-full rounded-lg overflow-hidden bg-white dark:bg-white/5 border border-[#F0EDE8] dark:border-saffron-gold/5">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                const el = document.createElement('div');
                                el.className = 'w-full h-full flex items-center justify-center bg-[#C8860A]/10 text-saffron-gold font-display text-[8px] uppercase tracking-wider text-center p-1';
                                el.innerText = product.name.substring(0, 8);
                                parent.appendChild(el);
                              }
                            }}
                          />
                        </div>
                        <h5 className="font-display font-light text-[10px] text-[#1A0A00] dark:text-ivory-cream mt-2 line-clamp-1 text-left">
                          {product.name}
                        </h5>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-mono text-[9px] text-[#6B5E52] font-semibold">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Checkout Section */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#F0EDE8] dark:border-saffron-gold/10 bg-[#FAFAF8] dark:bg-white/2">
                <div className="flex flex-col gap-2.5 mb-6 text-xs text-[#6B5E52] dark:text-ivory-cream/70">
                  <div className="flex justify-between">
                    <span>Bag Subtotal</span>
                    <span className="font-mono text-[#1A0A00] dark:text-ivory-cream">
                      ₹{cartTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                      <span>Promo Discount (10%)</span>
                      <span className="font-mono">
                        -₹{discountAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase text-[10px]">
                      Free Shipping
                    </span>
                  </div>
                  <div className="border-t border-[#F0EDE8] dark:border-saffron-gold/10 my-1" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-ui text-sm font-semibold text-[#1A0A00] dark:text-ivory-cream uppercase">Total</span>
                    <span className="font-mono text-xl font-bold text-[#C8860A]">
                      ₹{netTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Checkout Trigger button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#C8860A] hover:bg-[#8B5E00] text-white font-ui font-semibold text-xs tracking-[0.2em] uppercase rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
                >
                  <span>Checkout via WhatsApp</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 duration-200" />
                </button>

                {/* Secure payments badge and icons */}
                <div className="flex flex-col gap-2.5 items-center justify-center mt-5 text-[10px] text-[#6B5E52]/60 dark:text-ivory-cream/40">
                  <span>Secured payment systems</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono uppercase text-[9px] font-semibold border border-[#F0EDE8] dark:border-saffron-gold/10 px-1.5 py-0.5 rounded">Visa</span>
                    <span className="font-mono uppercase text-[9px] font-semibold border border-[#F0EDE8] dark:border-saffron-gold/10 px-1.5 py-0.5 rounded">Mastercard</span>
                    <span className="font-mono uppercase text-[9px] font-semibold border border-[#F0EDE8] dark:border-saffron-gold/10 px-1.5 py-0.5 rounded">UPI</span>
                    <span className="font-mono uppercase text-[9px] font-semibold border border-[#F0EDE8] dark:border-saffron-gold/10 px-1.5 py-0.5 rounded">Razorpay</span>
                    <span className="font-mono uppercase text-[9px] font-semibold border border-[#F0EDE8] dark:border-saffron-gold/10 px-1.5 py-0.5 rounded">GPay</span>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
