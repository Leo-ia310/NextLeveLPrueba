"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import CaseStudyModal from './case-study-modal';

const projectsImages = [
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-18-at-1.51.07-PM-1-1763495512846.jpeg",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-18-at-1.51.07-PM-1763495512917.jpeg",
  "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-11-18-at-1.52.08-PM-1763495546146.jpeg",
];

const ProjectsGrid = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const caseStudiesData = [
    {
      challenge: language === 'es' 
        ? 'Empresa tecnológica con baja visibilidad en el mercado y dificultades para atraer clientes corporativos.' 
        : 'Tech company with low market visibility and difficulties attracting corporate clients.',
      solution: language === 'es'
        ? 'Implementamos una estrategia integral de marketing digital: rebranding, SEO, content marketing y LinkedIn Ads enfocados en decisores empresariales.'
        : 'We implemented a comprehensive digital marketing strategy: rebranding, SEO, content marketing and LinkedIn Ads focused on business decision-makers.',
      methodology: language === 'es'
        ? ['Análisis competitivo y posicionamiento', 'Desarrollo de identidad de marca', 'Campaña de contenido educativo B2B', 'Automatización de marketing y CRM']
        : ['Competitive analysis and positioning', 'Brand identity development', 'B2B educational content campaign', 'Marketing automation and CRM'],
      difficulties: language === 'es'
        ? ['Presupuesto limitado inicial', 'Mercado altamente competitivo', 'Ciclo de ventas largo (3-6 meses)']
        : ['Limited initial budget', 'Highly competitive market', 'Long sales cycle (3-6 months)'],
      results: language === 'es'
        ? ['150% aumento en leads calificados', '85% mejora en tasa de conversión', '3x ROI en campañas digitales', 'Reconocimiento como líder del sector']
        : ['150% increase in qualified leads', '85% improvement in conversion rate', '3x ROI on digital campaigns', 'Recognition as industry leader'],
    },
    {
      challenge: language === 'es'
        ? 'Retail de moda con problemas de flujo de caja y márgenes reducidos debido a mala gestión de inventario.'
        : 'Fashion retail with cash flow problems and reduced margins due to poor inventory management.',
      solution: language === 'es'
        ? 'Implementamos sistema de planificación financiera y optimización de inventario con análisis predictivo de demanda.'
        : 'We implemented financial planning system and inventory optimization with predictive demand analysis.',
      methodology: language === 'es'
        ? ['Auditoría financiera completa', 'Análisis de rotación de inventario', 'Sistema de forecasting estacional', 'Negociación con proveedores']
        : ['Complete financial audit', 'Inventory turnover analysis', 'Seasonal forecasting system', 'Supplier negotiation'],
      difficulties: language === 'es'
        ? ['Resistencia al cambio del equipo', 'Datos históricos inconsistentes', 'Temporalidad del negocio']
        : ['Team resistance to change', 'Inconsistent historical data', 'Business seasonality'],
      results: language === 'es'
        ? ['40% reducción en stock muerto', '25% mejora en márgenes', 'Flujo de caja positivo sostenido', '€200K ahorro anual en costos']
        : ['40% reduction in dead stock', '25% margin improvement', 'Sustained positive cash flow', '€200K annual cost savings'],
    },
    {
      challenge: language === 'es'
        ? 'Startup tecnológica en fase de crecimiento sin estructura contable ni controles financieros adecuados.'
        : 'Tech startup in growth phase without accounting structure or adequate financial controls.',
      solution: language === 'es'
        ? 'Establecimos departamento contable completo: sistemas, procesos, reporting y compliance fiscal desde cero.'
        : 'We established complete accounting department: systems, processes, reporting and tax compliance from scratch.',
      methodology: language === 'es'
        ? ['Implementación de software contable cloud', 'Definición de políticas financieras', 'Automatización de facturación', 'Dashboard financiero en tiempo real']
        : ['Cloud accounting software implementation', 'Financial policy definition', 'Billing automation', 'Real-time financial dashboard'],
      difficulties: language === 'es'
        ? ['Crecimiento rápido (300% anual)', 'Múltiples monedas y países', 'Cambios regulatorios frecuentes']
        : ['Rapid growth (300% annually)', 'Multiple currencies and countries', 'Frequent regulatory changes'],
      results: language === 'es'
        ? ['100% compliance fiscal', '70% reducción en tiempo admin', 'Preparación exitosa para ronda Serie A', 'Visibilidad financiera en tiempo real']
        : ['100% tax compliance', '70% reduction in admin time', 'Successful Series A preparation', 'Real-time financial visibility'],
    },
  ];

  const projectsData = t.projects.items.map((item, index) => ({
    ...item,
    image: projectsImages[index],
    caseStudy: caseStudiesData[index],
  }));

  const handleCaseClick = (index: number) => {
    setSelectedCase(index);
  };

  return (
    <section 
      id="proyectos" 
      className="bg-[#052552] text-neutral-100 scroll-mt-28"
      ref={ref}
      aria-labelledby="proyectos-title"
    >
      <div className={`mx-auto max-w-7xl px-4 py-16 sm:py-20 md:px-6 lg:py-28 transition-all duration-[1500ms] ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h2 id="proyectos-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-white">{t.projects.title}</span> <span className="text-[#009299]">{t.projects.titleAccent}</span>
          </h2>
          <span className="mt-3 block h-[2px] w-20 bg-[#009299] sm:w-24" aria-hidden="true"></span>
        </div>
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {projectsData.map((project, index) => (
            <li key={project.name}>
              <article>
                <button
                  onClick={() => handleCaseClick(index)}
                  aria-label={`${language === 'es' ? 'Ver estudio de caso completo de' : 'View complete case study of'} ${project.name}`}
                  className="group relative block w-full overflow-hidden rounded-3xl bg-[#041b45]/60 shadow-[0_8px_28px_rgba(0,0,0,0.4)] ring-1 ring-[#009299]/20 transition-all hover:ring-[#009299]/40 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2 focus-visible:ring-offset-[#052552]"
                >
                  <h3 className="sr-only">{project.name}</h3>

                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={project.image}
                      alt={`${project.name} - ${project.location}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                      quality={85}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041b45]/50 via-[#041b45]/20 to-transparent"></div>
                  </div>

                  <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-[#009299]/30 bg-[#041b45]/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-neutral-200 backdrop-blur sm:text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#009299]" aria-hidden="true"></span>
                    {t.projects.category}
                  </span>

                  <div className="absolute inset-0 grid place-items-center bg-[#041b45]/80 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
                    <div className="px-5 text-center">
                      <p className="text-lg font-bold text-white sm:text-xl md:text-2xl">{project.name}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#009299] sm:text-[12px]">{project.location}</p>
                      <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#009299] bg-[#009299]/10 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-[#009299] transition hover:bg-[#009299] hover:text-white sm:text-[12px]">
                        {t.projects.viewProject}
                        <ArrowRight className="-mr-0.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 md:hidden">
                    <div className="rounded-2xl border border-[#009299]/20 bg-[#041b45]/80 px-4 py-3 backdrop-blur-[4px]">
                      <p className="text-[15px] font-semibold leading-snug text-white">{project.name}</p>
                      <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-[#009299]">{project.location}</p>
                    </div>
                  </div>
                </button>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {selectedCase !== null && (
        <CaseStudyModal
          isOpen={selectedCase !== null}
          onClose={() => setSelectedCase(null)}
          caseData={{
            name: projectsData[selectedCase].name,
            location: projectsData[selectedCase].location,
            image: projectsData[selectedCase].image,
            ...projectsData[selectedCase].caseStudy,
          }}
        />
      )}
    </section>
  );
};

export default ProjectsGrid;