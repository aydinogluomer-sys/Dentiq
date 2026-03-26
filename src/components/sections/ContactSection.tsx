import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleMapEnter = () => {
    if (isMapLoaded && iframeRef.current) {
      gsap.to(iframeRef.current, {
        scale: 1.05,
        filter: 'grayscale(0%) contrast(115%) saturate(110%)',
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  const handleMapLeave = () => {
    if (isMapLoaded && iframeRef.current) {
      gsap.to(iframeRef.current, {
        scale: 1,
        filter: 'grayscale(20%) contrast(100%) saturate(100%)',
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (infoRef.current) {
        gsap.fromTo('.contact-animate-item', 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top center+=100",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="iletisim" ref={containerRef} className="py-32 bg-[#14151d] px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Contact Info */}
        <div ref={infoRef} className="space-y-10">
          <div className="contact-animate-item">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight font-heading">
              Bize <span className="italic font-light text-white/60">Ulaşın</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-md">
              Nişantaşı'nın kalbindeki kliniğimizde sizi ağırlamaktan mutluluk duyarız. Sorularınız veya randevu için bizimle iletişime geçin.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 contact-animate-item">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                <MapPin className="w-5 h-5 text-[#b38c61]" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">Adres</h4>
                <p className="text-white/70 leading-relaxed">Valikonağı Cad. No: 123<br/>Nişantaşı, Şişli / İstanbul</p>
              </div>
            </div>

            <div className="flex items-start gap-4 contact-animate-item">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                <Phone className="w-5 h-5 text-[#b38c61]" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">Telefon</h4>
                <p className="text-white/70 leading-relaxed">+90 (212) 555 12 34<br/>+90 (532) 555 12 34</p>
              </div>
            </div>

            <div className="flex items-start gap-4 contact-animate-item">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                <Mail className="w-5 h-5 text-[#b38c61]" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">E-Posta</h4>
                <p className="text-white/70 leading-relaxed">hello@dentiq.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 contact-animate-item">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                <Clock className="w-5 h-5 text-[#b38c61]" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">Çalışma Saatleri</h4>
                <p className="text-white/70 leading-relaxed">Pazartesi - Cumartesi<br/>09:00 - 19:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div 
          className="h-[500px] w-full bg-[#1a1b24] overflow-hidden relative group rounded-2xl border border-white/10 shadow-2xl"
          onMouseEnter={handleMapEnter}
          onMouseLeave={handleMapLeave}
        >
          {!isMapLoaded && (
            <div className="absolute inset-0 overflow-hidden opacity-60">
              {/* Grid Lines */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}></div>

              {/* Fake Water/Landmasses */}
              <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-[#2A3B4C] transform skew-x-12 translate-x-10"></div>
              
              {/* Fake Roads - Major */}
              <div className="absolute top-[40%] left-[-10%] w-[120%] h-6 bg-[#2C2C2C] transform rotate-[-5deg] shadow-sm"></div>
              <div className="absolute top-[-10%] left-[30%] w-8 h-[120%] bg-[#2C2C2C] transform rotate-[15deg] shadow-sm"></div>
              
              {/* Fake Roads - Minor */}
              <div className="absolute top-[60%] left-[-10%] w-[120%] h-3 bg-[#333333] transform rotate-[8deg]"></div>
              <div className="absolute top-[20%] left-[60%] w-3 h-[120%] bg-[#333333] transform rotate-[-20deg]"></div>

              {/* Fake Map Blocks/Buildings */}
              <div className="absolute top-[25%] left-[15%] w-24 h-16 bg-[#3A3A3A] rounded-sm animate-pulse"></div>
              <div className="absolute bottom-[20%] right-[45%] w-32 h-20 bg-[#3A3A3A] rounded-sm animate-pulse" style={{ animationDelay: '150ms' }}></div>
              <div className="absolute top-[55%] left-[40%] w-20 h-24 bg-[#3A3A3A] rounded-sm animate-pulse" style={{ animationDelay: '300ms' }}></div>
              
              {/* Fake Labels */}
              <div className="absolute top-[22%] left-[18%] w-12 h-3 bg-white/20 rounded-full shadow-sm"></div>
              <div className="absolute bottom-[25%] right-[48%] w-16 h-3 bg-white/20 rounded-full shadow-sm"></div>
              
              {/* Fake Pin */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#b38c61]/20 rounded-full animate-ping absolute"></div>
                <div className="w-5 h-5 bg-[#b38c61] rounded-full relative z-10 shadow-lg border-2 border-[#14151d]"></div>
              </div>

              {/* Loading Indicator */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="bg-[#14151d]/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl flex items-center gap-3 border border-white/10">
                  <div className="w-5 h-5 border-2 border-[#b38c61] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium text-white">Harita Yükleniyor...</span>
                </div>
              </div>
            </div>
          )}
          <iframe 
            ref={iframeRef}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.308809490279!2d28.98960131541485!3d41.05139997929658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab70b5d5b76bd%3A0x6b4fb6c1602482!2zTmnFn2FudGHFn8SxLCDFnmnFn2xpL8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1645000000000!5m2!1str!2str" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => {
              setIsMapLoaded(true);
              if (iframeRef.current) {
                gsap.fromTo(iframeRef.current, 
                  { opacity: 0, scale: 1.05, filter: 'grayscale(20%) contrast(100%) saturate(100%)' },
                  { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
                );
              }
            }}
            className="absolute inset-0 transform origin-center opacity-0"
            title="Klinik Konumu"
          ></iframe>
        </div>

      </div>
    </section>
  );
}
