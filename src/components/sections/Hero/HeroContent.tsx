import React, { useEffect, useRef } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { HeroStats } from './HeroStats';

export function HeroContent() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={contentRef} className="relative z-20 max-w-[1290px] mx-auto px-4 sm:px-6 lg:px-10 pt-32 pb-40 min-h-screen flex flex-col justify-center">
      <div className="max-w-3xl">
        {/* Location Badge */}
        <div className="hero-anim inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-[#b38c61] animate-pulse" />
          <span className="text-xs font-medium tracking-wider text-white/80 uppercase">Nişantaşı, İstanbul</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-anim font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tight mb-6">
          Gülüşünüz <br />
          <span className="text-gold-gradient italic">Sanat Eserimizdir.</span>
        </h1>

        {/* Subheadline */}
        <p className="hero-anim text-lg md:text-xl text-white/60 max-w-xl mb-10 leading-relaxed font-light">
          Modern teknoloji ve uzman kadromuzla, size özel, ağrısız ve kalıcı estetik diş hekimliği çözümleri sunuyoruz.
        </p>

        {/* CTA Buttons */}
        <div className="hero-anim flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => document.getElementById('randevu')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#b38c61] hover:bg-[#c9a87c] text-white font-semibold px-8 py-4 rounded-full shadow-gold hover:shadow-gold-hover transition-all duration-300 active:scale-[0.97]"
          >
            <Calendar size={18} />
            Ücretsiz Muayene
          </button>
          <a
            href="#hizmetler"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors duration-300 btn-arrow"
          >
            Hizmetleri Keşfet
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Stats */}
        <div className="hero-anim">
          <HeroStats />
        </div>
      </div>
    </div>
  );
}
