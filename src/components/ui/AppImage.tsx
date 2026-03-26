import React, { useState } from 'react';

type AppImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /**
   * Resmi saran div için ekstra CSS sınıfları
   */
  wrapperClassName?: string;
  /**
   * Resim yüklenirken gösterilecek arkaplan rengi veya skeleton sınıfı
   */
  placeholderClassName?: string;
};

export function AppImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  placeholderClassName = 'bg-dark-muted/20',
  ...props
}: AppImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${placeholderClassName} ${wrapperClassName}`}>
      <img
        src={src}
        alt={alt || 'Image'}
        className={`w-full h-full object-cover img-fade-in ${isLoaded ? 'loaded' : ''} ${className}`}
        onLoad={() => setIsLoaded(true)}
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
}
