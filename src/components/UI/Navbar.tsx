import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Heart, Bell, ShoppingBag, Menu, User, LogOut, Package, MapPin, Settings } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface NavbarProps {
  onMobileMenuToggle: () => void;
  onCartToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle, onCartToggle }) => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [shakeBell, setShakeBell] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Shake bell on cart addition
  useEffect(() => {
    if (cartCount > 0) {
      setShakeBell(true);
      const timer = setTimeout(() => setShakeBell(false), 800);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 right-0 z-20 w-full bg-white dark:bg-[#1A0A00] border-b border-[#F0EDE8] dark:border-saffron-gold/10 px-4 sm:px-6 py-3 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        
        {/* Top Row / Desktop Left */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onMobileMenuToggle}
              className="lg:hidden text-[#1A0A00] dark:text-ivory-cream hover:text-saffron-gold transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu size={20} />
            </button>
            {/* Logo visible only on mobile Navbar */}
            <span className="lg:hidden font-display font-light text-[13px] tracking-[0.2em] text-[#1A0A00] dark:text-ivory-cream uppercase select-none">
              Valley Luxe
            </span>
          </div>

          {/* Mobile Right Actions (Only visible on mobile) */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onCartToggle}
              className="relative p-2 text-[#6B5E52] dark:text-ivory-cream/70 hover:text-saffron-gold transition-colors cursor-pointer"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-saffron-gold text-white font-mono text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Center: Search pill bar (wraps to full width on mobile) */}
        <form onSubmit={handleSearchSubmit} className="w-full sm:flex-grow sm:max-w-md lg:max-w-lg order-last sm:order-none">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shawls, saffron, carpets..."
              className="w-full bg-[#F3F1ED] dark:bg-white/5 border-none outline-none font-ui text-[12px] text-[#1A0A00] dark:text-ivory-cream placeholder-[#6B5E52]/65 px-5 py-2.5 rounded-full pl-11 focus:ring-1 focus:ring-saffron-gold/45 transition-all"
            />
            <Search size={14} className="absolute left-4 text-[#6B5E52] dark:text-ivory-cream/50 pointer-events-none" />
          </div>
        </form>

        {/* Right: Actions bar (Desktop only) */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-3.5">
          {/* Wishlist Heart */}
          <button
            onClick={() => navigate('/wishlist')}
            className="relative p-2 text-[#6B5E52] dark:text-ivory-cream/70 hover:text-saffron-gold transition-colors cursor-pointer"
            aria-label="Open Wishlist"
          >
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-saffron-gold text-white font-mono text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Notifications Bell */}
          <button
            className={`relative p-2 text-[#6B5E52] dark:text-ivory-cream/70 hover:text-saffron-gold transition-colors cursor-pointer ${
              shakeBell ? 'animate-shake' : ''
            }`}
            aria-label="View Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 bg-[#E53935] w-2 h-2 rounded-full" />
          </button>

          {/* Shopping Bag Trigger */}
          <button
            onClick={onCartToggle}
            className="relative p-2 text-[#6B5E52] dark:text-ivory-cream/70 hover:text-saffron-gold transition-colors cursor-pointer"
            aria-label="Open Cart Drawer"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-saffron-gold text-white font-mono text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="w-8 h-8 rounded-full bg-[#F3F1ED] dark:bg-white/10 flex items-center justify-center text-[#6B5E52] dark:text-ivory-cream/80 hover:text-saffron-gold border border-[#F0EDE8] dark:border-saffron-gold/10 transition-colors cursor-pointer overflow-hidden"
              aria-label="User Account Menu"
            >
              <User size={14} />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2.5 w-48 bg-white dark:bg-[#1A0A00] border border-[#F0EDE8] dark:border-saffron-gold/15 shadow-xl rounded-lg py-1.5 z-50 text-left">
                <button
                  onClick={() => { navigate('/settings'); setShowUserDropdown(false); }}
                  className="w-full px-4 py-2 text-[11px] font-ui tracking-wider uppercase text-[#6B5E52] dark:text-ivory-cream/75 hover:bg-[#F3F1ED] dark:hover:bg-saffron-gold/5 hover:text-[#1A0A00] flex items-center gap-2 cursor-pointer"
                >
                  <Settings size={12} />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => { navigate('/orders'); setShowUserDropdown(false); }}
                  className="w-full px-4 py-2 text-[11px] font-ui tracking-wider uppercase text-[#6B5E52] dark:text-ivory-cream/75 hover:bg-[#F3F1ED] dark:hover:bg-saffron-gold/5 hover:text-[#1A0A00] flex items-center gap-2 cursor-pointer"
                >
                  <Package size={12} />
                  <span>My Orders</span>
                </button>
                <button
                  onClick={() => { navigate('/addresses'); setShowUserDropdown(false); }}
                  className="w-full px-4 py-2 text-[11px] font-ui tracking-wider uppercase text-[#6B5E52] dark:text-ivory-cream/75 hover:bg-[#F3F1ED] dark:hover:bg-saffron-gold/5 hover:text-[#1A0A00] flex items-center gap-2 cursor-pointer"
                >
                  <MapPin size={12} />
                  <span>Addresses</span>
                </button>
                <div className="border-t border-[#F0EDE8] dark:border-saffron-gold/10 my-1" />
                <button
                  onClick={() => { navigate('/settings'); setShowUserDropdown(false); }}
                  className="w-full px-4 py-2 text-[11px] font-ui tracking-wider uppercase text-[#E53935] hover:bg-[#F3F1ED] dark:hover:bg-saffron-gold/5 flex items-center gap-2 cursor-pointer"
                >
                  <LogOut size={12} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Dynamic bell shake keyframe injected inline */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          15%, 45%, 75% { transform: rotate(-15deg); }
          30%, 60%, 90% { transform: rotate(15deg); }
        }
        .animate-shake {
          animation: shake 0.6s ease;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
