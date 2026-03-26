import React from 'react';
import { Phone, Calendar, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  navLinks: { label: string; href: string }[];
}

export function MobileDrawer({ isOpen, onClose, activeSection, navLinks }: MobileDrawerProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 lg:hidden transition-all duration-500',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Mobil menü"
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          'absolute right-0 top-0 bottom-0 w-80 bg-[#14151d] flex flex-col transition-transform duration-500',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.6, 0.14, 0, 1)' }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/8">
          <span className="font-heading text-xl text-white">DentiqClinic</span>
          <button
            onClick={onClose}
            aria-label="Menüyü kapat"
            className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/35 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 p-4 flex-1" aria-label="Mobil navigasyon">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                'text-base font-medium px-4 py-3.5 rounded-xl transition-colors',
                activeSection === link.href.slice(1)
                  ? 'text-[#b38c61] bg-[#b38c61]/8'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              )}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-white/8 flex flex-col gap-3">
          <a
            href="tel:+902125550100"
            className="flex items-center gap-3 text-white/75 font-medium px-4 py-3.5 bg-white/4 rounded-xl border border-white/8 hover:border-[#b38c61]/30 transition-colors"
          >
            <Phone size={16} className="text-[#b38c61]" />
            0212 555 01 00
          </a>
          <button
            onClick={() => { onClose(); setTimeout(() => document.getElementById('randevu')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
            className="flex items-center justify-center gap-2 bg-[#b38c61] hover:bg-[#c9a87c] text-white font-semibold px-5 py-3.5 rounded-full transition-all duration-300 w-full"
            aria-label="Randevu al"
          >
            <Calendar size={16} />
            Randevu Al
          </button>
        </div>
      </div>
    </div>
  );
}
