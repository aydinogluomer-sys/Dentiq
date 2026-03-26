import React, { useEffect, useState } from 'react';
import { Phone, Calendar, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <>
      {/* Mobile: fixed bottom bar */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-500',
          visible ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        role="complementary"
        aria-label="Hızlı iletişim çubuğu"
      >
        <div className="bg-[#14151d] border-t border-white/10 grid grid-cols-2">
          <a
            href="tel:+902125550100"
            className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-[#eae8e8]/80 hover:text-[#b38c61] transition-colors border-r border-white/10 min-h-[52px]"
            aria-label="Kliniği ara"
          >
            <Phone size={16} className="text-[#b38c61]" />
            Ara
          </a>
          <button
            onClick={() => document.getElementById('randevu')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-white bg-[#b38c61] hover:bg-[#c9a87c] transition-colors min-h-[52px]"
            aria-label="Randevu al"
          >
            <Calendar size={16} />
            Randevu Al
          </button>
        </div>
      </div>

      {/* Desktop: floating pill */}
      <div
        className={cn(
          'fixed bottom-8 right-8 z-40 hidden lg:flex flex-col gap-3 transition-all duration-500',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        role="complementary"
        aria-label="Randevu butonu"
      >
        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="self-end w-6 h-6 rounded-full bg-[#14151d]/60 border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
          aria-label="Kapat"
        >
          <X size={10} />
        </button>

        <a
          href="tel:+902125550100"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#14151d] border border-white/10 shadow-dark hover:border-[#b38c61]/40 transition-all duration-300 group"
          aria-label="Kliniği ara"
        >
          <Phone size={18} className="text-[#b38c61] group-hover:scale-110 transition-transform" />
        </a>
        <button
          onClick={() => document.getElementById('randevu')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 bg-[#b38c61] hover:bg-[#c9a87c] text-white font-semibold px-5 py-3 rounded-full shadow-gold hover:shadow-gold-hover transition-all duration-300 active:scale-[0.97] text-sm"
          aria-label="Randevu al"
        >
          <Calendar size={15} />
          Randevu Al
        </button>
      </div>
    </>
  );
}
