import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { SERVICES } from '../../constants';
import * as Icons from 'lucide-react';

export function ServicesSection() {
  return (
    <section id="hizmetler" className="py-32 bg-[#14151d] px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight font-heading">
            Size Özel <span className="italic font-light text-white/60">Tedaviler</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Koltukta saatlerce kalmanıza gerek yok. Dijital anestezi ve modern yöntemlerle tek seansta biten, konforlu tedaviler.
          </p>
        </div>
        
        <Splide
          options={{
            type: 'slide',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            breakpoints: {
              1024: { perPage: 2 },
              640: { perPage: 1 },
            },
            pagination: false,
            arrows: true,
            drag: 'free',
          }}
        >
          {SERVICES.map((service) => {
            // Map the string icon names from JSON to Lucide component names
            const iconMap: Record<string, string> = {
              'implant': 'Activity',
              'smile': 'Smile',
              'align': 'AlignJustify', // Or another appropriate icon
              'sparkles': 'Sparkles'
            };
            const iconName = iconMap[service.icon] || 'Activity';
            const Icon = Icons[iconName as keyof typeof Icons] as React.ElementType;
            return (
              <SplideSlide key={service.id}>
                <div 
                  className="group relative bg-[#1a1b24] h-[450px] overflow-hidden cursor-pointer rounded-2xl border border-white/5"
                  role="button"
                  tabIndex={0}
                  aria-label={`${service.title} hakkında detaylı bilgi`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      // Handle click
                    }
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14151d] via-[#14151d]/80 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                    <div className="transform transition-transform duration-500 translate-y-12 group-hover:translate-y-0">
                      <div className="w-12 h-12 bg-white/5 backdrop-blur-sm flex items-center justify-center mb-6 rounded-full border border-white/10 group-hover:border-[#b38c61]/50 transition-colors duration-500">
                        {Icon && <Icon className="w-6 h-6 text-[#b38c61]" />}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                      <p className="text-white/70 leading-relaxed opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        {service.description}
                      </p>
                      
                      {/* Learn More Link */}
                      <div className="mt-6 flex items-center gap-2 text-[#b38c61] font-medium opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                        <span>Detaylı Bilgi</span>
                        <Icons.ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </section>
  );
}
