import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TEAM } from '../../constants';
import { TeamMember } from '../../types';

export function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.fromTo(containerRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2, // Card-based stagger
            ease: "power3.out",
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
    <section id="hekimler" className="py-32 bg-[#1a1b24] px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight font-heading">
            Uzman <span className="italic font-light text-white/60">Kadromuz</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Sadece dişlerinizi değil, sizi dinleyen uzman kadromuz. Amacımız size en pahalı tedaviyi değil, en doğru tedaviyi sunmak.
          </p>
        </div>
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {TEAM.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, { scale: 1.01, duration: 0.6, ease: "power2.out" });
    
    // Pronounced stagger effect for text content: slide up and blur, then settle
    if (textContainerRef.current) {
      gsap.killTweensOf(textContainerRef.current.children);
      gsap.set(textContainerRef.current.children, { y: 15, opacity: 0.4, filter: "blur(4px)" });
      gsap.to(textContainerRef.current.children, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  };
  
  const handleMouseLeave = () => {
    gsap.to(imageRef.current, { scale: 1, duration: 0.6, ease: "power2.out" });
    
    if (textContainerRef.current) {
      gsap.killTweensOf(textContainerRef.current.children);
      gsap.to(textContainerRef.current.children, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`${member.name}, ${member.specialty}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
        }
      }}
    >
      <div className="overflow-hidden aspect-[3/4] mb-6 bg-white/5 relative rounded-2xl border border-white/5">
        <img 
          ref={imageRef}
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[#14151d]/40 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      <div ref={textContainerRef} className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
        <p className="text-[#b38c61] font-medium mb-3 uppercase tracking-wider text-sm">{member.title}</p>
        <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">{member.specialty}</p>
      </div>
    </div>
  );
}
