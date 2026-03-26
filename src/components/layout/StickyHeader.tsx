import React, { useState, useEffect } from 'react';
import { Phone, Menu, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MobileDrawer } from './MobileDrawer';

const NAV_LINKS = [
  { label: 'Hizmetler', href: '#hizmetler' },
  { label: 'Nasıl Çalışır', href: '#nasil-calisir' },
  { label: 'Ekibimiz', href: '#ekibimiz' },
  { label: 'Yorumlar', href: '#yorumlar' },
  { label: 'SSS', href: '#sss' },
  { label: 'İletişim', href: '#iletisim' },
];

export function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#14151d]/96 header-blur border-b border-white/5 shadow-[0_4px_30px_-4px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        )}
        role="banner"
      >
        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5">
          <div
            className="h-full bg-[#b38c61] transition-all duration-100"
            style={{ width: `${scrollProgress}%` }}
            aria-hidden="true"
          />
        </div>

        <div className="max-w-[1290px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              aria-label="DentiqClinic ana sayfa"
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b38c61] to-[#dac8b7] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2C8.5 2 6 4.5 6 7.5c0 2 1 3.5 2 4.5L12 22l4-10c1-1 2-2.5 2-4.5C18 4.5 15.5 2 12 2z" fill="white" fillOpacity="0.9"/>
                </svg>
              </div>
              <span className="font-heading text-lg tracking-tight text-white">
                DentiqClinic
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Ana navigasyon">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors duration-300 hover-underline',
                    activeSection === link.href.slice(1)
                      ? 'text-[#b38c61]'
                      : 'text-white/60 hover:text-white'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+902125550100"
                aria-label="Kliniği ara"
                className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-300"
              >
                <Phone size={14} className="text-[#b38c61]" />
                0212 555 01 00
              </a>
              <button
                onClick={() => document.getElementById('randevu')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 bg-[#b38c61] hover:bg-[#c9a87c] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_16px_-4px_rgba(179,140,97,0.4)] hover:shadow-[0_8px_24px_-4px_rgba(179,140,97,0.5)] active:scale-[0.97]"
                aria-label="Randevu al"
              >
                <Calendar size={14} />
                Randevu Al
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/5 transition-colors duration-200"
              onClick={() => setMenuOpen(true)}
              aria-label="Menüyü aç"
              aria-expanded={menuOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeSection={activeSection}
        navLinks={NAV_LINKS}
      />
    </>
  );
}
