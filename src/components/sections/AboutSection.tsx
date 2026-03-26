import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We need to wait for layout to settle
    let ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024;
      
      if (isDesktop && containerRef.current && textRef.current && rightColRef.current) {
        // Image parallax
        if (imageRef.current) {
          gsap.fromTo(imageRef.current,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top center+=100",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="klinik" ref={containerRef} className="py-32 bg-[#1a1b24] px-4 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left Side: Sticky Text */}
        <div className="lg:h-full relative">
          <div ref={textRef} className="lg:sticky lg:top-32 lg:max-w-md">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight font-heading">
              Sizi hastane soğukluğunda değil, <span className="italic font-light text-white/60">ev konforunda</span> ağırlıyoruz.
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Klinik felsefemiz basit: Size yapılmasını istemediğimiz hiçbir tedaviyi önermiyoruz. 
              En pahalı olanı değil, sağlığınız için en doğru olanı, en şeffaf şekilde planlıyoruz.
            </p>
            <ul className="space-y-6 mb-12">
              {[
                "Uluslararası Sterilizasyon Protokolü",
                "Panoramik & 3D Tomografi Altyapısı",
                "Ağrısız Dijital Anestezi",
                "Aynı Gün Acil Müdahale"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-white font-medium">
                  <div className="w-1.5 h-1.5 bg-[#b38c61] rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Scrolling Images */}
        <div ref={rightColRef} className="space-y-8 lg:space-y-32 lg:mt-32 pb-32">
          <div ref={imageRef} className="aspect-[4/5] w-full overflow-hidden bg-white/5 rounded-2xl border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000" 
              alt="Klinik İçi" 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="aspect-square w-full md:w-4/5 ml-auto overflow-hidden bg-white/5 rounded-2xl border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000" 
              alt="Modern Ekipman" 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="aspect-[4/3] w-full md:w-3/4 overflow-hidden bg-white/5 rounded-2xl border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000" 
              alt="Bekleme Salonu" 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
