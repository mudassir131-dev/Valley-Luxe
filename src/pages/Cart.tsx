import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { showToast } from '../components/UI/Toast';

export const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, cartSubtotal, shippingCost, cartTotal, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'VALLEY10') {
      setDiscountPercent(10); // 10% off
      setCouponApplied(true);
      showToast('Coupon "VALLEY10" applied successfully!', 'success');
    } else {
      showToast('Invalid coupon code. Try "VALLEY10"', 'error');
    }
  };

  const discountValue = (cartSubtotal * discountPercent) / 100;
  const finalPrice = cartTotal - discountValue;

  const handleWhatsAppCheckout = () => {
    const number = '919999999999';
    let itemsText = '';
    
    cart.forEach((item, index) => {
      itemsText += `${index + 1}. *${item.name}* (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
    });

    const discountText = couponApplied ? `Discount Applied (10%): -₹${discountValue.toLocaleString('en-IN')}\n` : '';
    const shippingText = shippingCost === 0 ? 'Free Shipping\n' : `Shipping: ₹${shippingCost}\n`;

    const text = `Hello Valley Luxe! I would like to place an order for the following items:\n\n${itemsText}\n${discountText}${shippingText}*Total Amount:* ₹${finalPrice.toLocaleString('en-IN')}\n\nPlease confirm my order. Thank you!`;
    
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank');
    clearCart();
    showToast('Checkout initiated! Redirecting to WhatsApp...', 'success');
  };

  if (cart.length === 0) {
    return (
      <div className="py-24 text-center text-[#1A0A00] dark:text-ivory-cream bg-[#FAFAF8] dark:bg-[#0D0500] min-h-screen flex flex-col items-center justify-center px-6 transition-colors duration-300">
        <div className="w-14 h-14 rounded-full border border-saffron-gold/25 flex items-center justify-center mb-5 text-[#C8860A] animate-bounce">
          <ShoppingBag size={20} />
        </div>
        <h2 className="font-display font-light text-2xl text-[#1A0A00] dark:text-ivory-cream mb-2 uppercase tracking-wider">Your Bag is Empty</h2>
        <p className="font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/50 mb-6 max-w-xs">No Himalayan treasures have been gathered yet. Explore our selections to begin.</p>
        <Link to="/shop">
          <button className="px-6 py-3 bg-[#C8860A] hover:bg-[#8B5E00] text-white font-ui font-semibold text-[10px] tracking-[0.2em] uppercase transition-colors rounded-xl cursor-pointer shadow-md">
            Explore Catalogue
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAFAF8] dark:bg-[#0D0500] text-[#1A0A00] dark:text-ivory-cream min-h-screen pt-4 pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-ui text-[9px] tracking-widest text-[#6B5E52] dark:text-ivory-cream/50 uppercase mb-4 text-left">
          <Link to="/" className="hover:text-saffron-gold">Home</Link>
          <span>/</span>
          <span className="text-saffron-gold font-bold">Shopping Bag</span>
        </div>

        <h1 className="font-display font-light text-2xl sm:text-3xl tracking-wider text-left text-[#1A0A00] dark:text-ivory-cream uppercase mb-8 border-b border-[#F0EDE8] dark:border-saffron-gold/10 pb-3">
          Shopping Bag
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start text-left">
          
          {/* LEFT: CART ITEMS LIST */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border border-[#F0EDE8] dark:border-saffron-gold/10 rounded-2xl bg-white dark:bg-white/2 shadow-xs"
              >
                {/* Image */}
                <div className="w-16 h-16 overflow-hidden rounded-xl border border-[#F0EDE8] dark:border-saffron-gold/5 shrink-0 bg-[#FAFAF8] dark:bg-[#0D0500]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
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
                </div>

                {/* Details */}
                <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-ui text-[8px] text-[#C8860A] uppercase tracking-widest font-bold">{item.category}</span>
                    <h3 className="font-display font-medium text-sm text-[#1A0A00] dark:text-ivory-cream leading-snug line-clamp-1">{item.name}</h3>
                    <span className="font-mono text-xs text-[#1A0A00] dark:text-ivory-cream font-semibold mt-0.5">₹{item.price.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                    <div className="flex items-center border border-[#F0EDE8] dark:border-saffron-gold/15 rounded-lg bg-[#FAFAF8] dark:bg-white/5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1.5 hover:text-saffron-gold border-r border-[#F0EDE8] dark:border-saffron-gold/5 font-mono text-xs cursor-pointer font-bold"
                      >
                        -
                      </button>
                      <span className="px-3.5 py-1.5 font-mono text-xs font-bold text-[#1A0A00] dark:text-ivory-cream">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1.5 hover:text-saffron-gold border-l border-[#F0EDE8] dark:border-saffron-gold/5 font-mono text-xs cursor-pointer font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        showToast('Removed item from bag', 'info');
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors cursor-pointer p-1"
                      title="Remove Item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: ORDER SUMMARY (Sticky) */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 flex flex-col gap-4">
            
            <div className="p-5 border border-[#F0EDE8] dark:border-saffron-gold/15 rounded-2xl bg-white dark:bg-white/2 shadow-xs flex flex-col gap-5">
              <h3 className="font-ui text-[10px] tracking-[0.2em] uppercase text-saffron-gold font-bold border-b border-[#F0EDE8] dark:border-saffron-gold/5 pb-2.5">
                Bag Summary
              </h3>

              {/* Price Details */}
              <div className="flex flex-col gap-2.5 font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/70 border-b border-[#F0EDE8] dark:border-saffron-gold/5 pb-3">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono text-[#1A0A00] dark:text-ivory-cream font-bold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Delivery</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase text-[10px]">
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost.toLocaleString('en-IN')}`}
                  </span>
                </div>
                
                {couponApplied && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Discount (10%)</span>
                    <span className="font-mono">-₹{discountValue.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="VALLEY10"
                    className="w-full bg-[#FAFAF8] dark:bg-white/5 border border-[#F0EDE8] dark:border-saffron-gold/15 outline-none pl-9 pr-3 py-2 font-mono text-xs uppercase tracking-wider text-[#1A0A00] dark:text-ivory-cream rounded-xl"
                    disabled={couponApplied}
                  />
                  <Tag size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5E52]" />
                </div>
                <button
                  type="submit"
                  className={`px-4 py-2 font-ui font-semibold text-[10px] uppercase tracking-widest transition-colors rounded-xl cursor-pointer border ${
                    couponApplied 
                      ? 'border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5' 
                      : 'border-saffron-gold text-saffron-gold hover:bg-saffron-gold hover:text-white dark:hover:text-[#1A0A00]'
                  }`}
                  disabled={couponApplied}
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </form>
              {!couponApplied && (
                <p className="text-[9px] font-mono text-saffron-gold/60 uppercase">Use "VALLEY10" for 10% off your first order.</p>
              )}

              {/* Total Price */}
              <div className="flex justify-between items-baseline pt-2">
                <span className="font-ui text-xs font-semibold text-[#1A0A00] dark:text-ivory-cream uppercase">Total Cost</span>
                <span className="font-mono text-xl text-[#C8860A] font-bold">
                  ₹{finalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 bg-[#C8860A] hover:bg-[#8B5E00] text-white font-ui font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-xl shadow-lg cursor-pointer"
              >
                <span>Proceed via WhatsApp</span>
                <ArrowRight size={12} />
              </button>

              {/* Checkout info */}
              <div className="flex items-center gap-1.5 text-[#6B5E52]/60 dark:text-ivory-cream/40 text-[9px] font-mono justify-center uppercase font-bold">
                <ShieldCheck size={12} className="text-[#C8860A]" />
                <span>Secure Concierge Checkout</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
