"use client";

import React from 'react';
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ServiceFAQProps {
  serviceType: 'marketing' | 'finance' | 'accounting' | 'operations' | 'technology' | 'strategy' | 'webDevelopment';
}

export const ServiceFAQ = ({ serviceType }: ServiceFAQProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const { language } = useLanguage();
  const t = translations[language];

  // For new services without specific FAQ, use general FAQs
  const faqItems = t.faq[serviceType] || t.faq.general;

  return (
    <section 
      className="scroll-mt-28 bg-[#041b45] text-white"
      ref={ref}
    >
      <div className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28 transition-all duration-[1500ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-10 text-center lg:mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t.faq.title} <span className="text-white/70">{t.faq.titleAccent}</span>
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-20 bg-white/70 sm:w-24 lg:w-32"></div>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-[#009299]/30"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-white hover:text-[#009299] hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-white/85">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ServiceFAQ;