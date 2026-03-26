import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';

interface AppointmentSuccessProps {
  show: boolean;
}

export const AppointmentSuccess: React.FC<AppointmentSuccessProps> = ({ show }) => {
  const successRef = useRef<HTMLDivElement>(null);
  const checkIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && successRef.current) {
      gsap.fromTo(successRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(successRef.current.children, 
        { opacity: 0, scale: 0.5, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "elastic.out(1, 0.6)" }
      );
      
      if (checkIconRef.current) {
        gsap.to(checkIconRef.current, {
          scale: 1.05,
          boxShadow: "0 0 20px 5px rgba(179, 140, 97, 0.2)",
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "sine.inOut",
          delay: 0.8
        });
      }
    }
  }, [show]);

  return (
    <div 
      ref={successRef} 
      className={`absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[#1a1b24] ${!show ? 'hidden' : ''}`}
    >
      <div ref={checkIconRef} className="w-24 h-24 bg-[#b38c61]/20 text-[#b38c61] rounded-full flex items-center justify-center mb-8 border border-[#b38c61]/30">
        <Check className="w-12 h-12" />
      </div>
      <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white font-heading">Talebiniz Alındı</h3>
      <p className="text-white/70 max-w-sm mx-auto text-lg">
        En kısa sürede sizinle iletişime geçeceğiz. Sağlıklı günler dileriz.
      </p>
    </div>
  );
};
