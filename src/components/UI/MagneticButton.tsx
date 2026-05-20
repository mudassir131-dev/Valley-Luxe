import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  className?: string;
  liquid?: boolean;
  pullStrength?: number; // Adjust the force of pull (default 0.35)
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  liquid = false,
  pullStrength = 0.35,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    // Calculate relative mouse coordinates from the center of the button
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const x = (clientX - centerX) * pullStrength;
    const y = (clientY - centerY) * pullStrength;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const buttonClasses = `
    magnetic-btn relative overflow-hidden font-ui font-medium text-xs tracking-[0.2em] uppercase 
    px-8 py-4 border border-saffron-gold transition-all duration-300 select-none
    ${liquid ? 'liquid-effect bg-transparent text-ivory-cream hover:text-kashmir-night hover:border-transparent z-10' : 'bg-transparent text-saffron-gold hover:bg-saffron-gold hover:text-kashmir-night'}
    ${className}
  `.trim();

  return (
    <motion.button
      ref={buttonRef}
      className={buttonClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
