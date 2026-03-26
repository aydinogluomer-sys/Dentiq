import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { TESTIMONIALS } from '../../constants';
import { Star } from 'lucide-react';

export function ReviewsSection() {
  return (
    <section id="yorumlar" className="py-32 bg-[#14151d] px-4 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight font-heading">
            Hastalarımız <span className="italic font-light text-white/60">Ne Diyor?</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-lg text-white/70">
            <span className="font-bold text-white">5.0</span>
            <div className="flex text-[#b38c61]">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <span>Google Değerlendirmesi</span>
          </div>
          <p className="mt-6 text-white/70 max-w-2xl mx-auto leading-relaxed">
            Bizim değil, koltuğumuzdan gülümseyerek kalkan hastalarımızın anlattıkları.
          </p>
        </div>
        
        <Splide
          options={{
            type: 'loop',
            perPage: 2,
            perMove: 1,
            gap: '2rem',
            breakpoints: {
              768: { perPage: 1 },
            },
            pagination: true,
            arrows: false,
            autoplay: true,
            interval: 5000,
          }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <SplideSlide key={testimonial.id}>
              <div className="bg-[#1a1b24] p-8 md:p-12 h-full border border-white/5 flex flex-col backdrop-blur-sm hover:border-[#b38c61]/30 transition-colors duration-500 rounded-2xl">
                <div className="flex text-[#b38c61] mb-8">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-10 flex-grow">
                  "{testimonial.text}"
                </p>
                <div className="mt-auto border-t border-white/10 pt-6">
                  <p className="font-medium text-white text-lg">{testimonial.author}</p>
                  <p className="text-[#b38c61] text-sm uppercase tracking-wider mt-1">{testimonial.treatment}</p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
}
