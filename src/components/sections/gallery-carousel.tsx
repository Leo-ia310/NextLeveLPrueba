"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';

const galleryImages = [
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1e59a2b4-1255-4495-a26b-2e5ea7a74660/generated_images/business-consulting-meeting-professional-23c0fe0f-20251029233035.jpg",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1e59a2b4-1255-4495-a26b-2e5ea7a74660/generated_images/financial-growth-success-concept-upward--77e9e65b-20251029233035.jpg",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1e59a2b4-1255-4495-a26b-2e5ea7a74660/generated_images/accounting-and-business-management-conce-8c2a96f2-20251029233035.jpg",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1e59a2b4-1255-4495-a26b-2e5ea7a74660/generated_images/modern-digital-marketing-concept-abstrac-167b80a1-20251029233035.jpg"
];

const GalleryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section 
      id="works-gallery" 
      className="bg-[#041b45] py-16 sm:py-20 md:py-28"
      ref={ref}
    >
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-[1500ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.gallery.title}
          </h2>
          <span className="mx-auto mt-4 block h-[2px] w-20 bg-[#009299] sm:w-24"></span>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-[#009299]/20">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {galleryImages.map((src, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Image
                    src={src}
                    alt={`${language === 'es' ? 'Trabajo realizado' : 'Work completed'} ${index + 1}`}
                    width={1216}
                    height={760}
                    className="aspect-[16/10] w-full object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2 sm:mt-8">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`${language === 'es' ? 'Ir al slide' : 'Go to slide'} ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full border transition ${
                  currentIndex === index ? 'bg-[#009299] border-[#009299]' : 'bg-transparent border-white/60 hover:bg-[#009299]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryCarousel;