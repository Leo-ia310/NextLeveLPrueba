"use client";

import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import Image from 'next/image';

type ServiceType = 'marketing' | 'finance' | 'accounting' | 'operations' | 'technology' | 'strategy' | 'webDevelopment';

interface ServiceTestimonialsProps {
  serviceType: ServiceType;
}

const ServiceTestimonials = ({ serviceType }: ServiceTestimonialsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const { language } = useLanguage();
  const t = translations[language];
  
  // Filter testimonials by service category, fallback to marketing if none found
  const filteredTestimonials = t.testimonials.items.filter(
    (testimonial) => testimonial.category === serviceType
  );
  
  // If no testimonials for this category, use marketing testimonials as fallback
  const testimonialsToShow = filteredTestimonials.length > 0 
    ? filteredTestimonials 
    : t.testimonials.items.filter((testimonial) => testimonial.category === 'marketing').slice(0, 2);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === testimonialsToShow.length - 1 ? 0 : prev + 1));
  }, [testimonialsToShow.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsToShow.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // If no testimonials at all, don't render anything
  if (testimonialsToShow.length === 0) {
    return null;
  }

  return (
    <section 
      id="testimonials" 
      className="bg-[#041b45] text-white"
      ref={ref}
    >
      <div className={`mx-auto max-w-7xl px-4 py-16 sm:py-20 md:px-6 lg:py-28 transition-all duration-[1500ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t.testimonials.title} <span className="text-[#009299]">{t.testimonials.titleAccent}</span>
          </h2>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonialsToShow.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="mx-auto max-w-3xl rounded-2xl border border-[#009299]/30 bg-[#052552]/60 p-6 sm:p-8 backdrop-blur-sm">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden border-2 border-[#009299]">
                          <Image
                            src={testimonial.photo}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div>
                            <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                            <p className="text-sm text-[#009299] font-medium">{testimonial.role}</p>
                            <p className="text-sm text-white/70">{testimonial.company}</p>
                          </div>
                          <div className="flex items-center gap-1 justify-center sm:justify-start">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-[#009299] sm:h-5 sm:w-5" fill="currentColor" />
                            ))}
                          </div>
                        </div>
                        
                        <blockquote className="mt-4">
                          <p className="text-base leading-relaxed text-white/85 sm:text-lg">{testimonial.quote}</p>
                        </blockquote>
                        
                        {testimonial.website && (
                          <div className="mt-4">
                            <a
                              href={testimonial.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-md border border-[#009299] bg-[#009299]/10 px-4 py-2 text-sm font-medium text-[#009299] transition hover:bg-[#009299] hover:text-white"
                            >
                              {language === 'es' ? 'Visitar sitio web' : 'Visit website'}
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {testimonialsToShow.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-[#009299]/50 bg-white/10 text-white/90 backdrop-blur transition hover:bg-[#009299] hover:border-[#009299]"
                aria-label={language === 'es' ? 'Anterior' : 'Previous'}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-[#009299]/50 bg-white/10 text-white/90 backdrop-blur transition hover:bg-[#009299] hover:border-[#009299]"
                aria-label={language === 'es' ? 'Siguiente' : 'Next'}
              >
                <ChevronRight size={20} />
              </button>

              <div className="mt-6 flex justify-center gap-2">
                {testimonialsToShow.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2.5 w-2.5 rounded-full border transition ${
                      currentIndex === index ? 'bg-[#009299] border-[#009299]' : 'bg-transparent border-white/60 hover:bg-[#009299]/50'
                    }`}
                    aria-label={`${language === 'es' ? 'Ir al testimonio' : 'Go to testimonial'} ${index + 1}`}
                  ></button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceTestimonials;