import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoPathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if loaded in this session
    const hasPreloaded = sessionStorage.getItem('valley_luxe_preloaded');
    if (hasPreloaded) {
      setVisible(false);
      onComplete();
      return;
    }

    const t1 = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('valley_luxe_preloaded', 'true');
        setVisible(false);
        onComplete();
      }
    });

    // 1. Initial State: SVG path invisible
    const path = logoPathRef.current;
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1
      });

      // 2. Draw Chinar leaf path
      t1.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.inOut'
      });
      // Fill the leaf gold and fade out the stroke
      t1.to(path, {
        fill: '#C8860A',
        stroke: 'transparent',
        duration: 0.5,
        ease: 'power1.out'
      }, '-=0.4');
    }

    // 3. Stagger letters drop in
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll('.char');
      t1.fromTo(chars, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'back.out(1.7)' },
        '-=0.3'
      );
    }

    // 4. Subtitle fade in
    if (subtitleRef.current) {
      t1.fromTo(subtitleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      );
    }

    // 5. Slide curtain up out of view
    if (containerRef.current) {
      t1.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.4
      });
    }

  }, [onComplete]);

  if (!visible) return null;

  const brandName = "VALLEY LUXE";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-kashmir-night flex flex-col items-center justify-center z-99999"
    >
      <div className="flex flex-col items-center max-w-md text-center px-4">
        {/* SVG Chinar Leaf Outline */}
        <svg
          className="w-24 h-24 mb-6"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={logoPathRef}
            stroke="#C8860A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M50,90 C50,90 53,75 52,65 C54,65 59,71 63,73 C65,74 67,71 65,68 C61,64 57,60 55,57 C58,58 65,62 70,62 C73,62 74,59 71,56 C65,51 58,48 53,46 C56,45 66,48 73,47 C77,47 78,43 74,40 C67,36 59,34 52,34 C54,32 60,30 65,27 C67,26 66,22 63,23 C58,25 53,29 50,32 C47,29 42,25 37,23 C34,22 33,26 35,27 C40,30 46,32 48,34 C41,34 33,36 26,40 C22,43 23,47 27,47 C34,48 44,45 47,46 C42,48 35,51 29,56 C26,59 27,62 30,62 C35,62 42,58 45,57 C43,60 39,64 35,68 C33,71 35,74 37,73 C41,71 46,65 48,65 C47,75 50,90 50,90 Z"
          />
        </svg>

        {/* Text Letters Reveal */}
        <div
          ref={textRef}
          className="font-display font-light text-3xl sm:text-4xl tracking-[0.3em] text-ivory-cream mb-2 overflow-hidden flex justify-center"
        >
          {brandName.split("").map((char, index) => (
            <span
              key={index}
              className="char inline-block"
              style={{ marginRight: char === " " ? "0.3em" : "0.02em" }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <div
          ref={subtitleRef}
          className="font-editorial italic text-saffron-gold text-sm tracking-wider opacity-0"
        >
          Where Heaven Meets Your Hands
        </div>
      </div>
    </div>
  );
};
