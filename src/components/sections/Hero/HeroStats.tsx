import React from 'react';
import { AnimateOnScroll } from '../../ui/AnimateOnScroll';

const STATS = [
  { value: '20+', label: 'Yıllık Deneyim' },
  { value: '15k+', label: 'Mutlu Hasta' },
  { value: '%99', label: 'Başarı Oranı' },
];

export function HeroStats() {
  return (
    <div className="flex flex-wrap gap-8 md:gap-16 mt-12">
      {STATS.map((stat, index) => (
        <AnimateOnScroll key={index} animation="up" delay={index * 100} className="flex flex-col gap-1">
          <span className="font-heading text-4xl md:text-5xl text-white">{stat.value}</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#b38c61]">{stat.label}</span>
        </AnimateOnScroll>
      ))}
    </div>
  );
}
