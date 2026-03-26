import React from 'react';
import { Shield, Award, Clock, Heart, CheckCircle2, ThumbsUp } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: Shield, label: '%100 Steril Ortam' },
  { icon: Award, label: 'Uluslararası Sertifikalar' },
  { icon: Clock, label: 'Hızlı ve Ağrısız Tedavi' },
  { icon: Heart, label: 'Hasta Odaklı Yaklaşım' },
  { icon: CheckCircle2, label: 'Garantili İmplantlar' },
  { icon: ThumbsUp, label: '5 Yıldızlı Memnuniyet' },
];

export function TrustStrip() {
  return (
    <div className="bg-[#1a1b24] border-b border-white/5 py-6 overflow-hidden">
      <div className="max-w-[1290px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex overflow-hidden relative">
          {/* Marquee effect container */}
          <div className="flex items-center gap-8 md:gap-12 animate-marquee whitespace-nowrap">
            {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-3 group shrink-0">
                  <Icon size={18} className="text-[#b38c61] group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-[#eae8e8]/70 group-hover:text-[#eae8e8] transition-colors">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
