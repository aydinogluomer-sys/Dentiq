import React, { useEffect, useRef, useState } from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  /**
   * Animasyon tipi. CSS dosyasındaki .reveal-* sınıflarıyla eşleşir.
   */
  animation?: 'up' | 'fade' | 'left' | 'right' | 'scale';
  className?: string;
  /**
   * Animasyonun gecikme süresi (ms cinsinden)
   */
  delay?: number;
  /**
   * Elementin yüzde kaçı görünür olduğunda animasyon tetiklensin (0 ile 1 arası)
   */
  threshold?: number;
  /**
   * Animasyon sadece bir kere mi çalışsın?
   */
  once?: boolean;
  key?: React.Key;
}

export function AnimateOnScroll({
  children,
  animation = 'up',
  className = '',
  delay = 0,
  threshold = 0.1,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Element ekrana girmeden 50px önce tetikle
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  const animationClass = `reveal-${animation}`;

  return (
    <div
      ref={ref}
      className={`${animationClass} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
