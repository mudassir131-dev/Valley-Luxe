import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ValleyHeroScene } from '../components/ThreeD/ValleyHeroScene';
export const NotFound: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-[#FAFAF8] dark:bg-[#0D0500] flex flex-col items-center justify-center text-center overflow-hidden z-10 transition-colors duration-300">
      
      {/* 3D Landscape Canvas in the background */}
      <div className="absolute inset-0 opacity-40 dark:opacity-100">
        <ValleyHeroScene />
      </div>

      {/* Floating Error Card */}
      <div className="relative z-10 max-w-md px-8 py-12 rounded-2xl border border-[#F0EDE8] dark:border-saffron-gold/15 bg-white/70 dark:bg-kashmir-night/60 backdrop-blur-xl shadow-sm">
        <span className="font-mono text-[10px] font-bold text-[#C8860A] tracking-[0.3em] uppercase block mb-3">
          Error Code 404
        </span>
        <h1 className="font-display font-light text-4xl sm:text-5xl text-[#1A0A00] dark:text-ivory-cream uppercase tracking-widest mb-4">
          Lost in the Valley
        </h1>
        <p className="font-ui text-sm font-medium text-[#6B5E52] dark:text-ivory-cream/65 leading-relaxed mb-8">
          The sanctuary route you are seeking does not exist. You may have drifted into the uncharted heights of the Himalayas.
        </p>
        <Link to="/" className="inline-block">
          <button className="flex items-center gap-2 px-6 py-4 bg-[#1A0A00] dark:bg-saffron-gold hover:bg-[#C8860A] dark:hover:bg-deep-gold text-white dark:text-[#1A0A00] font-ui font-semibold text-[10px] tracking-[0.2em] uppercase transition-all duration-300 rounded-xl shadow-md cursor-pointer">
            <ArrowLeft size={14} /> Return to Home
          </button>
        </Link>
      </div>
      
    </div>
  );
};

export default NotFound;
