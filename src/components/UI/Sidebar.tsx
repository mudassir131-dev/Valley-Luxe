import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Grid, Tag, Sparkles, Flame, Users, BookOpen, Package, 
  Heart, Ticket, MapPin, Settings, Sun, Moon, HelpCircle 
} from 'lucide-react';
import { useAppSettings } from '../../context/AppSettingsContext';
import { useWishlist } from '../../context/WishlistContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useAppSettings();
  const { wishlistCount } = useWishlist();

  const links = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Collections', path: '/shop', icon: Grid },
    { name: 'Deals', path: '/shop?deals=true', icon: Tag, badge: 'Hot' },
    { name: 'New Arrivals', path: '/shop?new=true', icon: Sparkles },
    { name: 'Best Sellers', path: '/shop?bestseller=true', icon: Flame },
    { name: 'Artisans', path: '/about#artisans', icon: Users },
    { name: 'About Kashmir', path: '/about', icon: BookOpen },
    { name: 'My Orders', path: '/orders', icon: Package },
    { name: 'Wishlist', path: '/wishlist', icon: Heart, countKey: 'wishlist' },
    { name: 'Coupons', path: '/coupons', icon: Ticket },
    { name: 'Addresses', path: '/addresses', icon: MapPin },
    { name: 'Account Settings', path: '/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between py-6 px-6 bg-white dark:bg-[#1A0A00] transition-colors duration-300">
      <div className="flex flex-col gap-8">
        
        {/* Logo Branding */}
        <div className="text-left py-2 border-b border-[#F0EDE8] dark:border-saffron-gold/15">
          <NavLink to="/" className="block" onClick={onClose}>
            <span className="font-display font-light text-xl tracking-[0.25em] text-[#1A0A00] dark:text-ivory-cream uppercase select-none">
              VALLEY LUXE
            </span>
          </NavLink>
        </div>

        {/* Navigation Section */}
        <nav className="flex flex-col gap-1.5 overflow-y-auto max-h-[calc(100vh-230px)] pr-2 scrollbar-thin">
          {links.map((link) => {
            const Icon = link.icon;
            
            // Check custom counts
            let displayCount = 0;
            if (link.countKey === 'wishlist') displayCount = wishlistCount;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) => `
                  group flex items-center justify-between px-3.5 py-2.5 rounded-lg font-ui text-[11px] font-medium tracking-[0.1em] uppercase transition-all duration-200
                  ${isActive 
                    ? 'bg-[#C8860A]/10 text-[#C8860A] border-l-2 border-[#C8860A]' 
                    : 'text-[#6B5E52] dark:text-ivory-cream/65 hover:bg-[#F0EDE8]/45 dark:hover:bg-saffron-gold/5 hover:text-[#1A0A00] dark:hover:text-saffron-gold'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon size={14} className="shrink-0 transition-transform group-hover:scale-110 duration-200" />
                  <span>{link.name}</span>
                </div>
                
                {/* Badges / Counters */}
                {link.badge && (
                  <span className="bg-[#E53935] text-white font-mono text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full animate-pulse">
                    {link.badge}
                  </span>
                )}
                {displayCount > 0 && (
                  <span className="bg-[#C8860A] text-white font-mono text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {displayCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Toggles & Help */}
      <div className="flex flex-col gap-4 border-t border-[#F0EDE8] dark:border-saffron-gold/15 pt-5">
        
        {/* Support Hotline */}
        <NavLink 
          to="/contact" 
          onClick={onClose}
          className="flex items-center gap-3 px-3.5 py-1.5 text-[#6B5E52] dark:text-ivory-cream/60 hover:text-[#C8860A] transition-colors font-ui text-[11px] font-medium tracking-[0.1em] uppercase"
        >
          <HelpCircle size={14} className="shrink-0" />
          <span>Need Help?</span>
        </NavLink>

        {/* Light/Dark Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3.5 py-2 w-full rounded-lg text-[#6B5E52] dark:text-ivory-cream/60 hover:text-[#1A0A00] dark:hover:text-saffron-gold hover:bg-[#F0EDE8]/40 dark:hover:bg-saffron-gold/5 transition-all text-left font-ui text-[11px] font-medium tracking-[0.1em] uppercase cursor-pointer"
        >
          {theme === 'dark' ? (
            <>
              <Sun size={14} className="text-saffron-gold" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={14} />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed left) */}
      <aside className="hidden lg:block fixed top-0 bottom-0 left-0 w-64 bg-white dark:bg-[#1A0A00] border-r border-[#F0EDE8] dark:border-saffron-gold/10 z-30 transition-colors duration-300">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-[#1A0A00]/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={onClose}
          />
          {/* Menu Card */}
          <div className="relative w-64 h-full shadow-2xl z-10 transform transition-transform duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
