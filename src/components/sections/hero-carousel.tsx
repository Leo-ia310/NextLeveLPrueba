"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';

interface Slide {
  imgSrc: string;
  alt: string;
}

const slideImages: Slide[] = [
  {
    imgSrc: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80",
    alt: "Consultoría de Marketing Estratégico - Crecimiento y Posicionamiento Digital",
  },
  {
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1e59a2b4-1255-4495-a26b-2e5ea7a74660/generated_images/financial-advisory-concept-illustration--17047cd6-20251029233035.jpg",
    alt: "Asesoría Financiera Integral - Planificación y Optimización de Recursos",
  },
  {
    imgSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1e59a2b4-1255-4495-a26b-2e5ea7a74660/generated_images/accounting-and-business-management-conce-8c2a96f2-20251029233035.jpg",
    alt: "Contabilidad y Gestión Empresarial - Control Financiero Profesional",
  }
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();
  const t = translations[language];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slideImages.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const activeSlide = slideImages[currentIndex];
  const slideContent = [t.hero.slide1, t.hero.slide2, t.hero.slide3];
  const activeContent = slideContent[currentIndex];

  return (
    <section className="relative h-screen min-h-[500px] w-full bg-[#041b45] text-white md:min-h-[640px]" aria-label="Servicios destacados de consultoría empresarial">
      <div className="absolute inset-0">
        {slideImages.map((slide, index) => (
          <div
            key={slide.imgSrc}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={slide.imgSrc}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-[#041b45]/60"></div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#041b45]/50 via-[#041b45]/45 to-[#041b45]/70"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:gap-8 lg:px-8">
        <div className="w-full max-w-xl flex-shrink-0 py-20 md:py-0 lg:max-w-2xl">
          <h1 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl xl:leading-[1.05] xl:tracking-[0.02em]">
            {t.hero.title}
          </h1>
          <span className="mt-2 block h-[2px] w-20 origin-left bg-[#009299] sm:mt-3 sm:w-32" aria-hidden="true"></span>

          <div className="mt-2 text-xs text-white/80 transition-opacity duration-500 sm:mt-3 sm:text-sm">
            <div key={`category-${currentIndex}`} className="font-semibold tracking-wide animate-in fade-in duration-500">
              {activeContent.category}
            </div>
          </div>

          <div className="mt-3 w-full max-w-md border border-[#009299]/20 bg-white/5 p-3 backdrop-blur-sm sm:mt-4 sm:p-5">
            <p key={`desc-${currentIndex}`} className="text-xs leading-relaxed text-white/90 animate-in fade-in duration-500 sm:text-sm md:text-[15px]">
              {activeContent.description}
            </p>
          </div>
          <div className="mt-4 sm:mt-6">
            <a
              className="group relative inline-block rounded-md border border-[#009299] bg-[#009299] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-[#009299]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041b45] sm:px-7 sm:text-xs sm:tracking-[0.3em]"
              href="#proyectos"
              aria-label="Ver casos de éxito"
            >
              {t.hero.cta}
            </a>
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end">
          <div className="relative h-[500px] w-[400px] overflow-hidden rounded-3xl border border-[#009299]/20 shadow-[0_8px_32px_rgba(0,146,153,0.3)]">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/DSC00371_V2_-1763494788587.jpg"
              alt="CEO de Next Level Business Consulting - Liderazgo empresarial"
              fill
              className="object-cover object-center"
              priority
              sizes="400px"
              quality={85}
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 z-10 hidden gap-2 sm:bottom-6 sm:right-6 sm:gap-3 md:flex" role="group" aria-label="Controles del carrusel">
        <button
          onClick={prevSlide}
          className="grid h-9 w-9 place-items-center rounded-full border border-[#009299]/50 bg-white/10 text-white/90 transition hover:bg-[#009299] hover:border-[#009299] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041b45]"
          aria-label="Diapositiva anterior"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button
          onClick={nextSlide}
          className="grid h-9 w-9 place-items-center rounded-full border border-[#009299]/50 bg-white/10 text-white/90 transition hover:bg-[#009299] hover:border-[#009299] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041b45]"
          aria-label="Siguiente diapositiva"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 sm:bottom-6" role="tablist" aria-label="Indicadores de diapositivas">
        <div className="flex items-center gap-2">
          {slideImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={currentIndex === index}
              aria-controls={`slide-${index}`}
              className={`h-2 w-2 rounded-full border transition sm:h-2.5 sm:w-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041b45] ${
                currentIndex === index ? 'bg-[#009299] border-[#009299]' : 'bg-transparent border-white/60 hover:bg-[#009299]/50'
              }`}
              aria-label={`Ir a la diapositiva ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;