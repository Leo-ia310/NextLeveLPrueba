"use client";

import React from 'react';
import { Settings, DollarSign, Cpu, Target, TrendingUp } from 'lucide-react';
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import Link from 'next/link';

const serviceIcons = [Settings, DollarSign, Cpu, Target, TrendingUp];
const serviceLinks = [
  '/services/operations',
  '/services/finance',
  '/services/technology',
  '/services/strategy',
  '/services/marketing'
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section 
      id="servicios" 
      className="scroll-mt-28 bg-[#041b45] text-white"
      ref={ref}
    >
      <div className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28 transition-all duration-[1500ms] ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
        <div className="mb-10 text-center lg:mb-12">
          <h2 id="servicios-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t.services.title} <span className="text-[#009299]">{t.services.titleAccent}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {t.services.items.map((service, index) => {
            const IconComponent = serviceIcons[index];
            return (
              <div
                key={`service-${index}`}
                className="group rounded-2xl border border-[#009299]/30 bg-[#009299]/10 p-4 text-center backdrop-blur transition-all lg:p-5 lg:text-left hover:-translate-y-1 hover:border-[#009299]/60 hover:bg-[#009299]/15 hover:shadow-[0_0_24px_rgba(0,146,153,0.2)]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm text-white/90">{`0${index + 1}`}</span>
                  <IconComponent className="h-6 w-6 text-[#009299]" aria-hidden="true" />
                </div>
                <h3 className="mt-2 text-lg font-bold lg:text-xl">{service.title}</h3>
                <p className="mt-2 text-[15px] leading-snug text-white/85">
                  {service.description}
                </p>
                
                <Link
                  href={serviceLinks[index]}
                  className="mt-4 inline-flex items-center gap-2 rounded-md border border-[#009299] bg-[#009299]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#009299] transition hover:bg-[#009299] hover:text-white"
                >
                  {language === 'es' ? 'VER MÁS' : 'LEARN MORE'}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
