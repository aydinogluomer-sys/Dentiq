import React from 'react';
import { HeroContent } from './Hero/HeroContent';
import { HeroMarquee } from './Hero/HeroMarquee';
import { AppImage } from '../ui/AppImage';

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#14151d] overflow-hidden" id="hero">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop"
          alt="Modern Dental Clinic"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#14151d]/75 via-[#14151d]/45 to-[#14151d]/85" />
        <div className="grain-overlay" />
      </div>

      <HeroContent />
      <HeroMarquee />
    </section>
  );
}
