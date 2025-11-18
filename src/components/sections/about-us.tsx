"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useEffect, useState } from "react";
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';

type StatCardProps = {
  srLabel: string;
  number: string;
  suffix: string;
  label: string;
  subLabel: string;
  progressPercentage: number;
  isVisible: boolean;
};

const StatCard = ({
  srLabel,
  number,
  suffix,
  label,
  subLabel,
  progressPercentage,
  isVisible,
}: StatCardProps) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  
  useEffect(() => {
    if (!isVisible) {
      setDisplayNumber(0);
      setDisplayProgress(0);
      return;
    }

    const targetNumber = parseInt(number);
    const duration = 2000;
    const steps = 60;
    const increment = targetNumber / steps;
    const progressIncrement = progressPercentage / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayNumber(targetNumber);
        setDisplayProgress(progressPercentage);
        clearInterval(timer);
      } else {
        setDisplayNumber(Math.floor(increment * currentStep));
        setDisplayProgress(Math.floor(progressIncrement * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, number, progressPercentage]);

  return (
    <article className="group rounded-2xl border border-[#009299]/30 bg-[#009299]/10 p-4 text-center backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#009299]/60 hover:bg-[#009299]/15 hover:shadow-[0_0_24px_rgba(0,146,153,0.2)] md:text-left">
      <h3 className="sr-only">{srLabel}</h3>
      <div>
        <div className="flex items-baseline justify-center gap-1 sm:justify-start">
          <span className="text-4xl font-extrabold leading-none tracking-tight sm:text-5xl lg:text-6xl" aria-label={`${displayNumber}${suffix}`}>
            {displayNumber}
          </span>
          <span className="text-lg opacity-80 sm:text-xl" aria-hidden="true">{suffix}</span>
        </div>
        <div className="mx-auto mt-2 h-[2px] w-full bg-white/10 sm:mx-0" role="progressbar" aria-valuenow={displayProgress} aria-valuemin={0} aria-valuemax={100} aria-label={`Progreso: ${displayProgress}%`}>
          <div
            className="h-[2px] bg-[#009299] transition-[width] duration-300"
            style={{ width: `${displayProgress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm opacity-90 sm:text-[15px]">{label}</p>
        <p className="text-xs opacity-70 sm:text-sm">{subLabel}</p>
        <div className="mx-auto mt-3 h-[1px] w-full origin-left scale-x-0 bg-[#009299]/60 transition-transform duration-300 group-hover:scale-x-100 md:mx-0" aria-hidden="true"></div>
      </div>
    </article>
  );
};

const AboutUsSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const { language } = useLanguage();
  const t = translations[language];

  const statsData: Omit<StatCardProps, "isVisible">[] = [
    {
      srLabel: language === 'es' ? "Clientes satisfechos" : "Satisfied clients",
      number: "100",
      suffix: "+",
      label: t.about.stats.years.label,
      subLabel: t.about.stats.years.subLabel,
      progressPercentage: 90,
    },
    {
      srLabel: language === 'es' ? "Servicio" : "Service",
      number: "100",
      suffix: "%",
      label: t.about.stats.service.label,
      subLabel: t.about.stats.service.subLabel,
      progressPercentage: 100,
    },
    {
      srLabel: language === 'es' ? "Asesoramiento personalizado" : "Personalized consulting",
      number: "1",
      suffix: ":1",
      label: t.about.stats.advice.label,
      subLabel: t.about.stats.advice.subLabel,
      progressPercentage: 100,
    },
  ];

  return (
    <section 
      id="nosotros" 
      className="relative scroll-mt-28 bg-[#041b45] text-white"
      ref={ref}
      aria-labelledby="nosotros-title"
    >
      <div className={`relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 md:grid-cols-12 md:gap-12 lg:max-w-7xl lg:px-8 md:py-24 transition-all duration-[1500ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="order-1 md:order-2 md:col-span-6">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-[#009299]/30 md:aspect-[4/3] md:max-w-none">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/DSC00174_V2-1763494790286.jpg"
              alt="Reunión de consultoría empresarial Next Level - Equipo profesional trabajando en estrategias"
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 448px, (max-width: 1024px) 50vw, 600px"
              quality={85}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#041b45]/40 via-transparent to-[#009299]/20"></div>
          </div>
        </div>
        <div className="order-2 text-center md:order-1 md:col-span-6 md:text-left">
          <h2
            id="nosotros-title"
            className="mx-auto mt-4 max-w-xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:mx-0 lg:text-5xl"
          >
            {t.about.title} <span className="text-[#009299]">{t.about.titleAccent}</span>
          </h2>
          <span className="mx-auto mt-4 block h-[2px] w-20 origin-left bg-[#009299] sm:w-24 md:mx-0" aria-hidden="true"></span>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-base md:mx-0">
            {t.about.description}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;