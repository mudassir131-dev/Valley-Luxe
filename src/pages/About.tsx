import React, { useEffect, useRef } from 'react';
import { Award, Compass, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Parallax on header scroll
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      gsap.to(header.querySelector('.bg-image'), {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: header,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Timeline line draw animation
  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const ctx = gsap.context(() => {
      const line = timeline.querySelector('.timeline-line');
      if (line) {
        gsap.fromTo(
          line,
          { height: 0 },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: timeline,
              start: 'top 50%',
              end: 'bottom 50%',
              scrub: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const artisans = [
    {
      name: 'Ghulam Rasool',
      role: 'Master Pashmina Weaver',
      bio: 'Weaving for over 42 years, Ghulam inherited the craft from his father. He translates talim (design code) into exquisite Kani shawls on wooden looms.',
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=400'
    },
    {
      name: 'Zeenat Ara',
      role: 'Saffron Harvester',
      bio: 'Zeenat coordinates the autumn crocus harvest in Pampore. She ensures only deep red stigmas are plucked and dried under strict temperature controls.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400'
    },
    {
      name: 'Farooq Ahmad',
      role: 'Paper Mache Painter',
      bio: 'Farooq uses brushes made of camel hair to paint microscopic chinar scrolls and Persian songbirds on lacquered boxes, preserving 15th-century designs.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400'
    }
  ];

  const timelineSteps = [
    { year: '1974', title: 'The First Shuttles', desc: 'Our family setup a single wooden loom in Srinagar Old Town, weaving cashmere wraps for local patrons.' },
    { year: '1998', title: 'Saffron Sourcing Guild', desc: 'We partnered with traditional agricultural collectives in Pampore to bring unadulterated crocus stigmas directly to buyers.' },
    { year: '2012', title: 'The Silk Carpet Alliance', desc: 'Forming a cooperative of rural home weavers, we preserved the rare 324-knot density Persian-Kashmiri weave pattern.' },
    { year: '2026', title: 'Valley Luxe Digital Atelier', desc: 'We launched our modern e-commerce boutique, connecting global luxury seekers directly with generational Himalayan craftsmen.' }
  ];

  return (
    <div className="w-full bg-[#FAFAF8] dark:bg-[#0D0500] text-[#1A0A00] dark:text-ivory-cream min-h-screen overflow-hidden transition-colors duration-300">
      
      {/* Parallax Header */}
      <section ref={headerRef} className="relative w-full h-[40vh] sm:h-[50vh] flex items-center justify-center overflow-hidden bg-white dark:bg-[#1A0A00] border-b border-[#F0EDE8] dark:border-saffron-gold/10">
        <div className="bg-image absolute inset-0 w-full h-[120%] -top-[10%]">
          <img
            src="https://images.unsplash.com/photo-1590004953392-5aba2e72269a?q=80&w=1600"
            alt="Kashmir Himalayan Mountains"
            className="w-full h-full object-cover filter brightness-[0.7] dark:brightness-[0.25]"
          />
        </div>
        <div className="absolute inset-0 bg-white/20 dark:bg-black/35" />
        
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-saffron-gold mb-3.5 block font-bold">
            Crafted in Kashmir Since Generations
          </span>
          <h1 className="font-display font-light text-3xl sm:text-5xl tracking-widest text-[#1A0A00] dark:text-ivory-cream uppercase leading-tight">
            Our Heritage
          </h1>
        </div>
      </section>

      {/* Editorial layout content */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        
        {/* Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 lg:mb-28 text-left">
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-saffron-gold font-bold">The Genesis</span>
            <h2 className="font-display font-light text-2xl sm:text-3xl text-[#1A0A00] dark:text-ivory-cream uppercase tracking-wider leading-tight">
              Where Heaven Meets Your Hands
            </h2>
            <p className="font-display italic text-sm text-[#C8860A] font-medium leading-relaxed">
              "Kashmir is a poem written by the earth. We translate that poetry into objects you can hold."
            </p>
            <p className="font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/70 leading-relaxed font-medium">
              Valley Luxe was born from a desire to safeguard the threatened, micro-artisan heritage 
              of Jammu & Kashmir. High up in the snow-capped borders of India and Tibet, families have 
              developed weaving, agricultural, and carving secrets over half a millennium. We collect 
              these rarities and deliver them in their purest, uncompromised form.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl border border-[#F0EDE8] dark:border-saffron-gold/10 overflow-hidden bg-white dark:bg-[#1A0A00] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800"
              alt="Artisan loom wool close-up"
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 lg:mb-28 text-left">
          <div className="lg:order-2 flex flex-col gap-5">
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-saffron-gold font-bold">Purity & Origins</span>
            <h2 className="font-display font-light text-2xl sm:text-3xl text-[#1A0A00] dark:text-ivory-cream uppercase tracking-wider leading-tight">
              Geographical Integrity
            </h2>
            <p className="font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/70 leading-relaxed font-medium">
              In a marketplace flooded with blended wools and synthetic spices, Valley Luxe stands as a 
              sanctuary of truth. Every shawl carries the GI (Geographical Indication) registry certificate. 
              Our saffron is chemically tested to confirm pure crocin levels. We do not sell copies; we curate 
              the genuine article.
            </p>
          </div>
          <div className="lg:order-1 relative aspect-[4/3] rounded-2xl border border-[#F0EDE8] dark:border-saffron-gold/10 overflow-hidden bg-white dark:bg-[#1A0A00] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800"
              alt="Harvesting saffron fields"
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

      </section>

      {/* Meet the Artisans */}
      <section className="bg-white dark:bg-[#1A0A00] border-t border-b border-[#F0EDE8] dark:border-saffron-gold/10 py-16 lg:py-24 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-saffron-gold mb-2 block font-bold">Atelier Guild</span>
          <h2 className="font-display font-light text-2xl sm:text-3xl text-[#1A0A00] dark:text-ivory-cream uppercase tracking-wider mb-12 leading-none">
            Meet the Masters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artisans.map((art, idx) => (
              <div
                key={idx}
                className="flex flex-col border border-[#F0EDE8] dark:border-saffron-gold/10 rounded-2xl overflow-hidden bg-[#FAFAF8] dark:bg-white/2 text-left hover:border-saffron-gold/30 transition-all duration-300 shadow-xs"
              >
                <div className="aspect-[4/3] overflow-hidden bg-white dark:bg-white/5 border-b border-[#F0EDE8] dark:border-saffron-gold/5">
                  <img src={art.image} alt={art.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col gap-2.5">
                  <div>
                    <h3 className="font-display text-lg text-[#1A0A00] dark:text-ivory-cream font-medium tracking-wide">{art.name}</h3>
                    <p className="font-mono text-[9px] text-[#C8860A] uppercase tracking-wider font-bold mt-0.5">{art.role}</p>
                  </div>
                  <p className="font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/65 leading-relaxed mt-1 font-medium">{art.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Timeline */}
      <section ref={timelineRef} className="py-16 lg:py-24 max-w-4xl mx-auto px-6 text-center relative">
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-saffron-gold mb-2 block font-bold">Atelier Annals</span>
        <h2 className="font-display font-light text-2xl sm:text-3xl text-[#1A0A00] dark:text-ivory-cream uppercase tracking-wider mb-16 leading-none">
          Heritage Timeline
        </h2>

        {/* Timeline track line */}
        <div className="absolute left-[30px] sm:left-1/2 top-36 bottom-10 w-[1px] bg-saffron-gold/20 -translate-x-1/2 hidden sm:block">
          <div className="timeline-line absolute top-0 left-0 w-full bg-saffron-gold origin-top" style={{ height: '0%' }} />
        </div>

        {/* Timeline blocks */}
        <div className="flex flex-col gap-12 relative z-10">
          {timelineSteps.map((step, idx) => (
            <div
              key={idx}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-10 text-left ${
                idx % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
              }`}
            >
              {/* Year Block */}
              <div className="w-full sm:w-1/2 flex justify-start sm:justify-end sm:text-right px-4">
                <span className="font-display text-4xl sm:text-5xl text-saffron-gold font-light tracking-widest font-bold">
                  {step.year}
                </span>
              </div>

              {/* Central node */}
              <div className="absolute left-[30px] sm:left-1/2 w-3.5 h-3.5 rounded-full bg-white dark:bg-[#0D0500] border-2 border-saffron-gold -translate-x-1/2 z-20 hidden sm:block shadow-xs" />

              {/* Text Block */}
              <div className="w-full sm:w-1/2 pl-10 sm:pl-0 px-4 flex flex-col gap-1">
                <h3 className="font-display text-base text-[#1A0A00] dark:text-ivory-cream font-bold uppercase tracking-wider">
                  {step.title}
                </h3>
                <p className="font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/60 leading-relaxed max-w-sm font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#1A0A00] border-t border-[#F0EDE8] dark:border-saffron-gold/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-saffron-gold mb-2 block font-bold">ATELIER ETHICS</span>
          <h2 className="font-display font-light text-2xl sm:text-3xl text-[#1A0A00] dark:text-ivory-cream uppercase tracking-wider mb-12 leading-none">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="border border-[#F0EDE8] dark:border-saffron-gold/10 p-6 rounded-2xl bg-[#FAFAF8] dark:bg-white/2 shadow-xs flex flex-col gap-3">
              <Award className="text-[#C8860A]" size={20} />
              <h3 className="font-display text-base text-[#1A0A00] dark:text-ivory-cream font-bold uppercase tracking-wider">Genuine Purity</h3>
              <p className="font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/60 leading-relaxed font-medium">
                We guarantee 100% genuine products. From fibers to foodstuffs, we verify the geographic origin 
                and hand-spun processes, providing certification credentials with every purchase.
              </p>
            </div>
            <div className="border border-[#F0EDE8] dark:border-saffron-gold/10 p-6 rounded-2xl bg-[#FAFAF8] dark:bg-white/2 shadow-xs flex flex-col gap-3">
              <Compass className="text-[#C8860A]" size={20} />
              <h3 className="font-display text-base text-[#1A0A00] dark:text-ivory-cream font-bold uppercase tracking-wider">Artisan Welfare</h3>
              <p className="font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/60 leading-relaxed font-medium">
                By removing middle-distributors, we direct higher percentages of revenue straight to looms 
                and fields, preserving family craft lines and local agricultural economics.
              </p>
            </div>
            <div className="border border-[#F0EDE8] dark:border-saffron-gold/10 p-6 rounded-2xl bg-[#FAFAF8] dark:bg-white/2 shadow-xs flex flex-col gap-3">
              <Sparkles className="text-[#C8860A]" size={20} />
              <h3 className="font-display text-base text-[#1A0A00] dark:text-ivory-cream font-bold uppercase tracking-wider">Ecological Legacy</h3>
              <p className="font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/60 leading-relaxed font-medium">
                Our practices prioritize seasonal harvest paces, natural vegetable dyes, organic crops, and 
                carbon-sensitive hand spinning over industrial mass production.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
