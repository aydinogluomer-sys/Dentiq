import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import * as Popover from '@radix-ui/react-popover';
import gsap from 'gsap';

export const handleInputFocus = (e: React.FocusEvent<HTMLElement>) => {
  gsap.to(e.currentTarget, { 
    borderColor: 'var(--c-brand-gold)', 
    boxShadow: '0 8px 16px -6px rgba(179,140,97,0.2)', 
    duration: 0.3,
    ease: "power2.out"
  });
};

export const handleInputBlur = (e: React.FocusEvent<HTMLElement>) => {
  gsap.to(e.currentTarget, { 
    duration: 0.3,
    ease: "power2.out",
    clearProps: 'borderColor,boxShadow'
  });
};

export const DatePickerField = ({ control, name, label, error }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className={`block text-sm font-medium uppercase tracking-wider transition-colors ${error ? 'text-red-500' : 'text-white/70'}`}>{label}</label>
            {error && (
              <span role="alert" className="text-red-500 text-xs font-medium animate-in fade-in slide-in-from-right-2">
                {error.message}
              </span>
            )}
          </div>
          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <button 
                type="button"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className={`w-full flex justify-between items-center bg-transparent border-b-2 px-0 py-4 text-white focus:outline-none transition-all duration-300 text-xl text-left ${error ? 'border-red-500 animate-shake' : 'border-white/10'}`}
              >
                {field.value ? format(field.value, 'PPP', { locale: tr }) : <span className="text-white/30">Tarih Seçiniz</span>}
                <CalendarIcon className="w-5 h-5 opacity-50" />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="z-50 bg-[#1a1b24] border border-white/10 shadow-xl rounded-md p-3" sideOffset={5}>
                <style>{`
                  .rdp {
                    --rdp-cell-size: 40px;
                    --rdp-accent-color: var(--c-brand-gold);
                    --rdp-background-color: rgba(179, 140, 97, 0.2);
                    margin: 0;
                  }
                  .rdp-day {
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    color: white;
                  }
                  .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
                    background-color: var(--rdp-accent-color);
                    color: #14151d;
                    transform: scale(1.1);
                    box-shadow: 0 4px 12px rgba(179, 140, 97, 0.3);
                    z-index: 10;
                    position: relative;
                  }
                  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                    background-color: rgba(255,255,255,0.1);
                  }
                `}</style>
                <DayPicker
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpen(false);
                  }}
                  locale={tr}
                  className="text-white"
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      )}
    />
  );
};
