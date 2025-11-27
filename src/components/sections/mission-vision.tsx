"use client";

import { Target, Eye, Heart } from 'lucide-react'; // Heart para valores
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import Image from 'next/image';

const MissionVisionSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section 
      id="mision-vision" 
      className="scroll-mt-28 bg-[#041b45] text-white"
      ref={ref}
    >
      <div className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28 transition-all duration-[1500ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-10 text-center lg:mb-12">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#009299]/30 bg-[#009299]/10 px-3 py-1 backdrop-blur">
            <div className="h-1.5 w-1.5 rounded-full bg-[#009299]" aria-hidden="true"></div>
            <span className="text-xs uppercase tracking-[0.28em] text-white/80">
              {t.missionVision.badge}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:gap-12">
          {/* Mission Card */}
          <div className="group rounded-2xl border border-[#009299]/30 bg-[#009299]/10 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-[#009299]/60 hover:bg-[#009299]/15 hover:shadow-[0_0_24px_rgba(0,146,153,0.2)] lg:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
              {/* Image - Left side on desktop */}
              <div className="lg:col-span-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/DSC00111_V2_-1763494429775.jpg?width=8000&height=8000&resize=contain"
                    alt="Mission"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </div>
              
              {/* Content - Right side on desktop */}
              <div className="lg:col-span-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-[#009299]/20 p-3">
                    <Target className="h-6 w-6 text-[#009299]" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold lg:text-3xl">
                    {t.missionVision.mission.title}
                  </h2>
                </div>
                <div className="mb-4 h-[2px] w-20 bg-[#009299]" aria-hidden="true"></div>
                <p className="text-[15px] leading-relaxed text-white/85 lg:text-base">
                  {t.missionVision.mission.description}
                </p>
                {/* Título Valores */}
                <div className="mt-8 mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-[#009299]/20 p-3">
                    <Heart className="h-6 w-6 text-[#009299]" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold lg:text-3xl">
                    {t.missionVision.valuesTitle}
                  </h2>
                </div>
                <div className="mb-4 h-[2px] w-20 bg-[#009299]" aria-hidden="true"></div>
                {/* Lista normal vertical con viñetas */}
                <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-white/85 lg:text-base">
                  {t.missionVision.mission.values.map((value, index) => (
                    <li key={index} className="list-disc list-inside hover:text-[#009299] transition-colors">
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="group rounded-2xl border border-[#009299]/30 bg-[#009299]/10 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-[#009299]/60 hover:bg-[#009299]/15 hover:shadow-[0_0_24px_rgba(0,146,153,0.2)] lg:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
              {/* Content - Left side on desktop */}
              <div className="lg:col-span-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-[#009299]/20 p-3">
                    <Eye className="h-6 w-6 text-[#009299]" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold lg:text-3xl">
                    {t.missionVision.vision.title}
                  </h2>
                </div>
                <div className="mb-4 h-[2px] w-20 bg-[#009299]" aria-hidden="true"></div>
                <p className="text-[15px] leading-relaxed text-white/85 lg:text-base">
                  {t.missionVision.vision.description}
                </p>
                {/* Título Valores */}
                <div className="mt-8 mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-[#009299]/20 p-3">
                    <Heart className="h-6 w-6 text-[#009299]" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold lg:text-3xl">
                    {t.missionVision.valuesTitle}
                  </h2>
                </div>
                <div className="mb-4 h-[2px] w-20 bg-[#009299]" aria-hidden="true"></div>
                {/* Lista normal vertical con viñetas */}
                <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-white/85 lg:text-base">
                  {t.missionVision.vision.values.map((value, index) => (
                    <li key={index} className="list-disc list-inside hover:text-[#009299] transition-colors">
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Image - Right side on desktop */}
              <div className="lg:col-span-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/DSC00394_V2-1763494429466.jpg?width=8000&height=8000&resize=contain"
                    alt="Vision"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
