import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import gsap from 'gsap';

interface AppointmentConfirmModalProps {
  show: boolean;
  pendingData: any;
  isConfirming: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AppointmentConfirmModal: React.FC<AppointmentConfirmModalProps> = ({
  show,
  pendingData,
  isConfirming,
  onConfirm,
  onCancel
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && modalRef.current && modalContentRef.current) {
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalContentRef.current, { scale: 0.9, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" });
    }
  }, [show]);

  const handleCancel = () => {
    gsap.to(modalContentRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.3 });
    gsap.to(modalRef.current, { opacity: 0, duration: 0.3, onComplete: onCancel });
  };

  if (!show || !pendingData) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14151d]/80 backdrop-blur-sm opacity-0"
    >
      <div 
        ref={modalContentRef}
        className="bg-[#1a1b24] border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 overflow-hidden opacity-0"
      >
        <h3 className="text-2xl font-bold text-white mb-6 font-heading">Randevu Detayları</h3>
        
        <div className="space-y-4 mb-8 text-left">
          <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-3">
            <span className="text-white/60 font-medium text-sm">Ad Soyad</span>
            <span className="col-span-2 text-white font-medium">{pendingData.name}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-3">
            <span className="text-white/60 font-medium text-sm">E-posta</span>
            <span className="col-span-2 text-white font-medium">{pendingData.email}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-3">
            <span className="text-white/60 font-medium text-sm">Telefon</span>
            <span className="col-span-2 text-white font-medium">{pendingData.phone}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-3">
            <span className="text-white/60 font-medium text-sm">Doğum Tarihi</span>
            <span className="col-span-2 text-white font-medium">{pendingData.dob ? format(pendingData.dob, 'PPP', { locale: tr }) : '-'}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-3">
            <span className="text-white/60 font-medium text-sm">Randevu Tarihi</span>
            <span className="col-span-2 text-white font-medium">{pendingData.preferredDate ? format(pendingData.preferredDate, 'PPP', { locale: tr }) : '-'}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-3">
            <span className="text-white/60 font-medium text-sm">İletişim Zamanı</span>
            <span className="col-span-2 text-white font-medium">
              {pendingData.contactTime === 'morning' ? 'Sabah (09:00 - 12:00)' : 
               pendingData.contactTime === 'afternoon' ? 'Öğleden Sonra (13:00 - 16:00)' : 
               pendingData.contactTime === 'evening' ? 'Akşam (16:00 - 19:00)' : '-'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 pb-3">
            <span className="text-white/60 font-medium text-sm">İlgilenilen Alanlar</span>
            <span className="col-span-2 text-white font-medium">
              {pendingData.areasOfConcern.map((id: string) => {
                const labels: Record<string, string> = {
                  'gum-health': 'Diş Eti Sağlığı',
                  'aesthetics': 'Estetik (Gülüş Tasarımı)',
                  'pain-relief': 'Ağrı Şikayeti',
                  'routine': 'Genel Kontrol',
                  'implant': 'İmplant / Eksik Diş',
                  'orthodontics': 'Ortodonti / Şeffaf Plak'
                };
                return labels[id] || id;
              }).join(', ')}
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            type="button"
            onClick={handleCancel}
            className="flex-1 px-4 py-3 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors rounded-lg uppercase tracking-wider text-sm border border-white/10"
          >
            İptal
          </button>
          <button 
            type="button"
            onClick={onConfirm}
            disabled={isConfirming}
            className="flex-1 px-4 py-3 bg-[#b38c61] text-[#14151d] font-medium hover:bg-[#c9a87c] transition-colors rounded-lg uppercase tracking-wider text-sm disabled:opacity-50"
          >
            {isConfirming ? "Gönderiliyor..." : "Onayla ve Gönder"}
          </button>
        </div>
      </div>
    </div>
  );
};
