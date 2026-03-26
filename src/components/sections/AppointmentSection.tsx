import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import gsap from 'gsap';
import { AppointmentForm } from './Appointment/AppointmentForm';
import { AppointmentSuccess } from './Appointment/AppointmentSuccess';
import { AppointmentConfirmModal } from './Appointment/AppointmentConfirmModal';
import { AppointmentRestorePrompt } from './Appointment/AppointmentRestorePrompt';

const formSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  dob: z.date({ message: "Geçerli bir tarih seçiniz" }),
  preferredDate: z.date({ message: "Geçerli bir tarih seçiniz" }),
  contactTime: z.string().min(1, "Lütfen tercih ettiğiniz iletişim zamanını seçiniz"),
  areasOfConcern: z.array(z.string()).min(1, "Lütfen en az bir alan seçiniz"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function AppointmentSection() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);
  const [savedData, setSavedData] = useState<FormData | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [pendingData, setPendingData] = useState<FormData | null>(null);
  
  const formRef = useRef<HTMLDivElement>(null);
  const stepContainerRef = useRef<HTMLDivElement>(null);
  
  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      areasOfConcern: []
    }
  });

  const { trigger, reset, watch } = formMethods;
  const formValues = watch();

  useEffect(() => {
    const saved = localStorage.getItem('dentiq_appointment_autosave');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Object.keys(parsed).length > 0 && (parsed.name || parsed.email || parsed.phone)) {
          setSavedData(parsed);
          setShowRestorePrompt(true);
        }
      } catch (e) {
        console.error("Failed to parse autosave data", e);
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (formValues.name || formValues.email || formValues.phone || formValues.notes) {
        localStorage.setItem('dentiq_appointment_autosave', JSON.stringify(formValues));
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [formValues]);

  const handleRestore = () => {
    if (savedData) {
      const restoredData = {
        ...savedData,
        dob: savedData.dob ? new Date(savedData.dob) : undefined,
        preferredDate: savedData.preferredDate ? new Date(savedData.preferredDate) : undefined,
      };
      reset(restoredData);
      setShowRestorePrompt(false);
    }
  };

  const handleDismissRestore = () => {
    setShowRestorePrompt(false);
    localStorage.removeItem('dentiq_appointment_autosave');
  };

  const handleNext = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(['name', 'email', 'phone']);
    } else if (step === 2) {
      isValid = await trigger(['dob', 'preferredDate', 'contactTime', 'areasOfConcern']);
    }

    if (isValid) {
      gsap.to(stepContainerRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        onComplete: () => {
          setStep(s => s + 1);
          gsap.fromTo(stepContainerRef.current,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
          );
        }
      });
    }
  };

  const handleBack = () => {
    gsap.to(stepContainerRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.3,
      onComplete: () => {
        setStep(s => s - 1);
        gsap.fromTo(stepContainerRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    });
  };

  const onSubmit = (data: FormData) => {
    setPendingData(data);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    if (!pendingData) return;
    setIsConfirming(true);
    
    // Placeholder API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Form submitted:", pendingData);
    
    localStorage.removeItem('dentiq_appointment_autosave');
    setShowRestorePrompt(false);
    
    setShowConfirmModal(false);
    setIsConfirming(false);
    
    // GSAP Animation for success message
    gsap.to(formRef.current, { 
      opacity: 0, 
      y: -20, 
      duration: 0.4, 
      onComplete: () => {
        setIsSuccess(true);
      }
    });
  };

  const handleCancelSubmit = () => {
    setShowConfirmModal(false);
    setPendingData(null);
  };

  return (
    <section id="randevu" className="py-32 bg-[#14151d] text-white px-4 border-t border-white/10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight font-heading">
          İlk Adımı <span className="italic font-light text-white/60">Atın</span>
        </h2>
        <p className="text-lg text-white/70 mb-16 max-w-xl mx-auto leading-relaxed">
          Tedavinizi planlamak için detayları bizimle paylaşın, müsaitlik durumunuza göre sizi hemen arayalım.
        </p>

        <div className="bg-[#1a1b24] p-8 md:p-16 border border-white/5 shadow-xl relative min-h-[500px] flex flex-col justify-center overflow-hidden transition-colors duration-300 rounded-2xl">
          
          {/* Step Indicators */}
          {!isSuccess && (
            <div className="flex justify-center gap-2 mb-12">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'w-12 bg-[#b38c61]' : 'w-4 bg-white/10'}`}
                />
              ))}
            </div>
          )}

          {!isSuccess && (
            <div ref={formRef}>
              <AppointmentRestorePrompt 
                show={showRestorePrompt} 
                onRestore={handleRestore} 
                onDismiss={handleDismissRestore} 
              />
              <AppointmentForm 
                step={step}
                formMethods={formMethods}
                onNext={handleNext}
                onBack={handleBack}
                onSubmit={onSubmit}
                stepContainerRef={stepContainerRef}
              />
            </div>
          )}

          <AppointmentSuccess show={isSuccess} />

        </div>
      </div>

      <AppointmentConfirmModal 
        show={showConfirmModal}
        pendingData={pendingData}
        isConfirming={isConfirming}
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
      />
    </section>
  );
}
