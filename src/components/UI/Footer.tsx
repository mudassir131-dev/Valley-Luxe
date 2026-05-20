import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#FAFAF8] dark:bg-[#0D0500] border-t border-[#F0EDE8] dark:border-saffron-gold/10 py-8 text-center transition-colors duration-300 z-10 relative">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="font-ui text-[11px] text-[#6B5E52] dark:text-ivory-cream/60 uppercase tracking-widest font-semibold">
          © {new Date().getFullYear()} Valley Luxe. All rights reserved.
        </p>
        <p className="font-ui text-[10px] text-[#1A0A00] dark:text-saffron-gold uppercase tracking-[0.25em] mt-2 flex items-center gap-1.5 opacity-80">
          Developed and designed by 
          <span className="font-bold border-b border-current pb-0.5">Pixelforgee Studio</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
