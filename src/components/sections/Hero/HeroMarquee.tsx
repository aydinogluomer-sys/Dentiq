import React from 'react';

export function HeroMarquee() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-y border-white/10 bg-[#14151d]/80 backdrop-blur-md z-10 py-3">
      <div className="marquee-track flex gap-8 items-center">
        {/* Repeat items to ensure smooth infinite scroll */}
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="text-white/40 text-sm font-medium uppercase tracking-[0.2em] whitespace-nowrap">
              Estetik Diş Hekimliği
            </span>
            <span className="text-[#b38c61] text-xs">✦</span>
            <span className="text-white/40 text-sm font-medium uppercase tracking-[0.2em] whitespace-nowrap">
              İmplantoloji
            </span>
            <span className="text-[#b38c61] text-xs">✦</span>
            <span className="text-white/40 text-sm font-medium uppercase tracking-[0.2em] whitespace-nowrap">
              Gülüş Tasarımı
            </span>
            <span className="text-[#b38c61] text-xs">✦</span>
            <span className="text-white/40 text-sm font-medium uppercase tracking-[0.2em] whitespace-nowrap">
              Şeffaf Plak
            </span>
            <span className="text-[#b38c61] text-xs">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
