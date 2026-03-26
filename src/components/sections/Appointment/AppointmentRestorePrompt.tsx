import React, { useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import gsap from 'gsap';

interface AppointmentRestorePromptProps {
  show: boolean;
  onRestore: () => void;
  onDismiss: () => void;
}

export const AppointmentRestorePrompt: React.FC<AppointmentRestorePromptProps> = ({ show, onRestore, onDismiss }) => {
  const restorePromptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && restorePromptRef.current) {
      gsap.fromTo(restorePromptRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [show]);

  const handleRestoreBtnHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, { scale: 1.05, backgroundColor: 'var(--c-brand-gold)', color: '#14151d', duration: 0.2, ease: "power1.out" });
  };
  const handleDismissBtnHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, { scale: 1.05, color: 'var(--c-brand-gold)', duration: 0.2, ease: "power1.out" });
  };
  const handleBtnLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power1.out", clearProps: "all" });
  };

  if (!show) return null;

  return (
    <div ref={restorePromptRef} className="mb-8 p-4 bg-[#1a1b24] border border-[#b38c61]/20 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 text-left">
        <Clock className="w-5 h-5 text-[#b38c61] shrink-0" />
        <p className="text-sm text-white">
          Önceki ziyaretinizden kaydedilmiş bir formunuz var. Devam etmek ister misiniz?
        </p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button 
          type="button" 
          onClick={onDismiss}
          onMouseEnter={handleDismissBtnHover}
          onMouseLeave={handleBtnLeave}
          className="px-4 py-2 text-xs font-medium text-white/60 transition-colors"
        >
          Yoksay
        </button>
        <button 
          type="button" 
          onClick={onRestore}
          onMouseEnter={handleRestoreBtnHover}
          onMouseLeave={handleBtnLeave}
          className="px-4 py-2 text-xs font-medium bg-white/10 text-white rounded-lg border border-white/10 transition-colors"
        >
          Geri Yükle
        </button>
      </div>
    </div>
  );
};
