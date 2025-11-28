"use client";

import { TrendingUp, DollarSign, Calculator, Settings, Cpu, Target, Code} from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import Image from 'next/image';
type ServiceType = 'marketing' | 'finance' | 'accounting' | 'operations' | 'technology' | 'strategy' | 'webDevelopment' ;

interface ServiceHeroProps {
  serviceType: ServiceType;
}

const serviceData = {
  marketing: {
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&q=90',
    es: {
      title: 'Marketing',
      subtitle: 'Digital ',
      category: 'MARKETING DIGITAL',
      description: 'Impulsamos tu negocio con estrategias de marketing innovadoras y efectivas que generan resultados medibles y crecimiento sostenible.',
    },
    en: {
      title: 'Strategic',
      subtitle: 'Marketing',
      category: 'DIGITAL MARKETING',
      description: 'We boost your business with innovative and effective marketing strategies that generate measurable results and sustainable growth.',
    },
  },
  finance: {
    icon: DollarSign,
    image: 'https://plus.unsplash.com/premium_photo-1661382438837-fc677e625fa9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    es: {
      title: 'Asesoría',
      subtitle: 'Financiera',
      category: '• PLANIFICACIÓN EMPRESARIAL • REPARACIÓN DE • FLUJO DE CAJA',
      description: 'Optimizamos tus finanzas para maximizar rentabilidad y crecimiento sostenible de tu empresa con estrategias personalizadas.',
    },
    en: {
      title: 'Financial',
      subtitle: 'Advisory',
      category: 'CORPORATE FINANCE',
      description: 'We optimize your finances to maximize profitability and sustainable growth of your company with personalized strategies.',
    },
  },
  accounting: {
    icon: Calculator,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1e59a2b4-1255-4495-a26b-2e5ea7a74660/generated_images/business-accounting-workspace-organized--1a256baa-20251030184251.jpg',
    es: {
      title: 'Contabilidad',
      subtitle: 'e Impuestos',
      category: 'CONTABILIDAD INTEGRAL',
      description: 'Mantenemos tus cuentas en orden con transparencia total para que te enfoques en hacer crecer tu negocio sin preocupaciones.',
    },
    en: {
      title: 'Accounting',
      subtitle: '& Taxes',
      category: 'COMPREHENSIVE ACCOUNTING',
      description: 'We keep your accounts in order with total transparency so you can focus on growing your business without worries.',
    },
  },
  operations: {
    icon: Settings,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&h=1080&fit=crop&q=90',
    es: {
      title: 'Gestión de',
      subtitle: 'Operaciones',
      category: 'OPERACIONES EMPRESARIALES',
      description: 'Optimizamos procesos operativos, mejoramos la eficiencia y diseñamos sistemas que escalan con tu negocio para maximizar productividad.',
    },
    en: {
      title: 'Operations',
      subtitle: 'Management',
      category: 'BUSINESS OPERATIONS',
      description: 'We optimize operational processes, improve efficiency and design systems that scale with your business to maximize productivity.',
    },
  },
  technology: {
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&q=90',
    es: {
      title: 'Tecnología',
      subtitle: 'para Empresas',
      category: 'AUTOMATIZACIÓN, CRM, COMERCIO ELECTRÓNICO',
      description: 'Nuestros servicios incluyen comercio electrónico, ERP (Planificación de recursos empresariales), CRM (Gestión de relaciones con el cliente), valuación de ROI (Retorno de inversión) ',
    },
    en: {
      title: 'Technology',
      subtitle: 'for business',
      category: 'AUTOMATION, CRM, E-COMMERCE',
      description: 'Our services include e-commerce, ERP (Enterprise Resource Planning), CRM (Customer Relationship Management), ROI (Return on Investment) valuation',
    },
  },
  strategy: {
    icon: Target,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop&q=90',
    es: {
      title: 'Consultoría',
      subtitle: 'Estratégica',
      category: 'ESTRATEGIA EMPRESARIAL',
      description: 'Es el plan integral que define cómo tu empresa alcanzará sus objetivos a largo plazo. Incluye las decisiones clave sobre qué productos o servicios ofrecer, a qué mercado dirigirse, cómo diferenciarse de la competencia y cómo utilizar los recursos de manera eficiente. Una buena estrategia empresarial guía todas las acciones, alineando operaciones, marketing, finanzas y talento para lograr crecimiento sostenido y ventaja competitiva.',
    },
    en: {
      title: 'Strategy',
      subtitle: 'Consulting',
      category: 'BUSINESS STRATEGY',
      description: 'Its the comprehensive plan that defines how your company will achieve its long-term goals. It includes key decisions about what products or services to offer, which market to target, how to differentiate yourself from the competition, and how to use resources efficiently. A good business strategy guides all actions, aligning operations, marketing, finance, and talent to achieve sustained growth and a competitive advantage.',
    },
  },
  webDevelopment: {
  icon: Code,
  image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop&q=90',
  es: {
    title: 'Desarrollo',
    subtitle: 'Web y SEO',
    category: 'DESARROLLO WEB · MANTENIMIENTO · SEO',
    description: 'Creamos sitios web modernos, rápidos y optimizados, brindando mantenimiento continuo y estrategias SEO que impulsan tu presencia online y atraen más clientes.',
  },
  en: {
    title: 'Web Development',
    subtitle: 'and SEO',
    category: 'WEB DEVELOPMENT · MAINTENANCE · SEO',
    description: 'We build modern, fast, and optimized websites while providing ongoing maintenance and SEO strategies that strengthen your online presence and attract more customers.',
  },
},

};

const ServiceHero = ({ serviceType }: ServiceHeroProps) => {
  const { language } = useLanguage();
  const service = serviceData[serviceType];
  const Icon = service.icon;
  const content = service[language];

  return (
    <section className="relative h-screen min-h-[500px] w-full bg-[#041b45] text-white sm:min-h-[640px]">
      <div className="absolute inset-0">
        <Image
          src={service.image}
          alt={`${content.title} ${content.subtitle}`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#041b45]/60"></div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#041b45]/50 via-[#041b45]/45 to-[#041b45]/70"></div>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-semibold leading-[1.05] tracking-[0.02em] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            {content.title} <span className="text-[#009299]">{content.subtitle}</span>
          </h1>
          
          <span className="mt-2 block h-[2px] w-20 origin-left bg-[#009299] sm:mt-3 sm:w-32"></span>

          <div className="mt-2 text-xs font-semibold tracking-wide text-white/80 sm:mt-3 sm:text-sm">
            {content.category}
          </div>

          <div className="mt-4 max-w-lg border border-[#009299]/20 bg-white/5 p-3 backdrop-blur-sm sm:mt-5 sm:p-5">
            <p className="text-xs leading-relaxed text-white/90 sm:text-sm md:text-[15px]">
              {content.description}
            </p>
          </div>

          <div className="mt-6 sm:mt-8">
            <a
              className="inline-flex items-center gap-2 rounded-md border border-[#009299] bg-[#009299] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.3em] text-white backdrop-blur-sm transition hover:bg-[#009299]/90 sm:gap-3 sm:px-7 sm:py-3 sm:text-xs"
              href="#contacto"
            >
              {language === 'es' ? 'CONTACTAR' : 'CONTACT US'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;