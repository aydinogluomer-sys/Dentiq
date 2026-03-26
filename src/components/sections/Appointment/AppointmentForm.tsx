import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { DatePickerField, handleInputFocus, handleInputBlur } from './DatePickerField';

interface AppointmentFormProps {
  step: number;
  formMethods: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
  onSubmit: (data: any) => void;
  stepContainerRef: React.RefObject<HTMLDivElement>;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  step,
  formMethods,
  onNext,
  onBack,
  onSubmit,
  stepContainerRef
}) => {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = formMethods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto text-left">
      <div ref={stepContainerRef}>
        
        {/* STEP 1: Name, Email & Phone */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="name" className={`block text-sm font-medium uppercase tracking-wider transition-colors ${errors.name ? 'text-red-500' : 'text-white/70'}`}>Adınız Soyadınız</label>
                {errors.name && <span id="name-error" role="alert" className="text-red-500 text-xs font-medium animate-in fade-in slide-in-from-right-2">{errors.name.message as string}</span>}
              </div>
              <input 
                id="name"
                {...register("name")}
                type="text"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                placeholder="Örn: Ahmet Yılmaz"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className={`w-full bg-transparent border-b-2 px-0 py-4 text-white placeholder:text-white/30 focus:outline-none transition-all duration-300 text-xl ${errors.name ? 'border-red-500 animate-shake' : 'border-white/10'}`}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="email" className={`block text-sm font-medium uppercase tracking-wider transition-colors ${errors.email ? 'text-red-500' : 'text-white/70'}`}>E-posta Adresiniz</label>
                {errors.email && <span id="email-error" role="alert" className="text-red-500 text-xs font-medium animate-in fade-in slide-in-from-right-2">{errors.email.message as string}</span>}
              </div>
              <input 
                id="email"
                {...register("email")}
                type="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder="Örn: ahmet@ornek.com"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className={`w-full bg-transparent border-b-2 px-0 py-4 text-white placeholder:text-white/30 focus:outline-none transition-all duration-300 text-xl ${errors.email ? 'border-red-500 animate-shake' : 'border-white/10'}`}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="phone" className={`block text-sm font-medium uppercase tracking-wider transition-colors ${errors.phone ? 'text-red-500' : 'text-white/70'}`}>Telefon Numaranız</label>
                {errors.phone && <span id="phone-error" role="alert" className="text-red-500 text-xs font-medium animate-in fade-in slide-in-from-right-2">{errors.phone.message as string}</span>}
              </div>
              <input 
                id="phone"
                {...register("phone")}
                type="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                placeholder="0555 123 45 67"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className={`w-full bg-transparent border-b-2 px-0 py-4 text-white placeholder:text-white/30 focus:outline-none transition-all duration-300 text-xl ${errors.phone ? 'border-red-500 animate-shake' : 'border-white/10'}`}
              />
            </div>
            <button 
              type="button"
              onClick={onNext}
              className="w-full mt-8 bg-[#b38c61] text-[#14151d] py-4 font-medium hover:bg-[#c9a87c] transition-colors uppercase tracking-wider text-sm rounded-sm"
            >
              Devam Et
            </button>
          </div>
        )}

        {/* STEP 2: DOB, Contact Time & Service */}
        {step === 2 && (
          <div className="space-y-8">
            <DatePickerField 
              control={control} 
              name="dob" 
              label="Doğum Tarihiniz" 
              error={errors.dob} 
            />
            <DatePickerField 
              control={control} 
              name="preferredDate" 
              label="Tercih Edilen Randevu Tarihi" 
              error={errors.preferredDate} 
            />
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="contactTime" className={`block text-sm font-medium uppercase tracking-wider transition-colors ${errors.contactTime ? 'text-red-500' : 'text-white/70'}`}>Tercih Edilen İletişim Zamanı</label>
                {errors.contactTime && <span id="contactTime-error" role="alert" className="text-red-500 text-xs font-medium animate-in fade-in slide-in-from-right-2">{errors.contactTime.message as string}</span>}
              </div>
              <select 
                id="contactTime"
                {...register("contactTime")}
                aria-invalid={!!errors.contactTime}
                aria-describedby={errors.contactTime ? "contactTime-error" : undefined}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className={`w-full bg-transparent border-b-2 px-0 py-4 text-white focus:outline-none transition-all duration-300 text-xl appearance-none cursor-pointer ${errors.contactTime ? 'border-red-500 animate-shake' : 'border-white/10'}`}
              >
                <option value="" disabled selected className="text-[#14151d]">Zaman Seçiniz</option>
                <option value="morning" className="text-[#14151d]">Sabah (09:00 - 12:00)</option>
                <option value="afternoon" className="text-[#14151d]">Öğleden Sonra (13:00 - 16:00)</option>
                <option value="evening" className="text-[#14151d]">Akşam (16:00 - 19:00)</option>
              </select>
            </div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className={`block text-sm font-medium uppercase tracking-wider transition-colors ${errors.areasOfConcern ? 'text-red-500' : 'text-white/70'}`}>İlgilendiğiniz Alanlar</label>
                {errors.areasOfConcern && <span role="alert" className="text-red-500 text-xs font-medium animate-in fade-in slide-in-from-right-2">{errors.areasOfConcern.message as string}</span>}
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl transition-all duration-300 ${errors.areasOfConcern ? 'animate-shake bg-red-900/10 border border-red-900/30' : 'border border-transparent'}`}>
                {[
                  { id: 'gum-health', label: 'Diş Eti Sağlığı' },
                  { id: 'aesthetics', label: 'Estetik (Gülüş Tasarımı)' },
                  { id: 'pain-relief', label: 'Ağrı Şikayeti' },
                  { id: 'routine', label: 'Genel Kontrol' },
                  { id: 'implant', label: 'İmplant / Eksik Diş' },
                  { id: 'orthodontics', label: 'Ortodonti / Şeffaf Plak' }
                ].map((item) => (
                  <label key={item.id} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${errors.areasOfConcern ? 'border-red-900/30 hover:bg-red-900/20' : 'border-white/10 hover:bg-white/5'}`}>
                    <input 
                      type="checkbox" 
                      value={item.id}
                      {...register("areasOfConcern")}
                      className={`w-5 h-5 text-[#b38c61] bg-transparent rounded focus:ring-[#b38c61] bg-[#14151d] ${errors.areasOfConcern ? 'border-red-500' : 'border-white/20'}`}
                    />
                    <span className={`text-sm ${errors.areasOfConcern ? 'text-red-400' : 'text-white'}`}>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button 
                type="button"
                onClick={onBack}
                className="px-8 py-4 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors uppercase tracking-wider text-sm border border-white/10 rounded-sm"
              >
                Geri
              </button>
              <button 
                type="button"
                onClick={onNext}
                className="flex-1 bg-[#b38c61] text-[#14151d] py-4 font-medium hover:bg-[#c9a87c] transition-colors uppercase tracking-wider text-sm rounded-sm"
              >
                Devam Et
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Notes & Submit */}
        {step === 3 && (
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2 uppercase tracking-wider">Ek Notlarınız / Şikayetiniz</label>
              <textarea 
                {...register("notes")}
                placeholder="Bize iletmek istediğiniz detayları buraya yazabilirsiniz..."
                rows={3}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="w-full bg-transparent border-b-2 border-white/10 px-0 py-4 text-white placeholder:text-white/30 focus:outline-none transition-all duration-300 text-xl resize-none"
              />
            </div>
            <div className="flex gap-4 mt-8">
              <button 
                type="button"
                onClick={onBack}
                className="px-8 py-4 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors uppercase tracking-wider text-sm border border-white/10 rounded-sm"
              >
                Geri
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#b38c61] text-[#14151d] py-4 font-medium hover:bg-[#c9a87c] transition-colors disabled:opacity-50 uppercase tracking-wider text-sm rounded-sm"
              >
                {isSubmitting ? "Gönderiliyor..." : "Randevu Talebi Oluştur"}
              </button>
            </div>
          </div>
        )}

      </div>
    </form>
  );
};
