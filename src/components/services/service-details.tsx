"use client";

import { Check, Target, TrendingUp, Users, Crown, Castle, Shield, Code } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

type ServiceType = 'marketing' | 'finance' | 'accounting' | 'operations' | 'technology' | 'strategy' | 'webDevelopment';

interface ServiceDetailsProps {
  serviceType: ServiceType;
}

const detailsData = {
  marketing: {
    es: {
      methodology: {
        title: 'Nuestra Metodología',
        steps: [
          'Análisis profundo de mercado y competencia',
          'Desarrollo de estrategia personalizada',
          'Implementación de campañas multicanal',
          'Medición continua de resultados (KPIs)',
          'Optimización basada en datos',
        ],
      },
      benefits: {
        title: 'Beneficios',
        items: [
          'Incremento del 40-150% en ventas',
          'Mayor reconocimiento de marca',
          'Posicionamiento digital sólido',
          'ROI medible y transparente',
        ],
      },
      whatWeOffer: {
        title: 'Qué Incluye',
        items: [
          'Marketing Digital y Redes Sociales',
          'Campañas publicitarias en Google y Meta',
          'SEO y posicionamiento web',
          'Content Marketing y estrategia de contenidos',
          'Análisis y reportes mensuales',
        ],
      },
      packages: {
        title: 'Nuestros Paquetes',
        items: [
          {
            name: 'Alfil',
            price: '$299',
            period: '/mes',
            description: 'Ideal para emprendedores y pequeños negocios',
            features: [
              'Gestión de 2 redes sociales',
              '8 publicaciones mensuales',
              'Reporte mensual básico',
              'Asesoría por email',
            ],
            icon: Shield,
          },
          {
            name: 'Torre',
            price: '$599',
            period: '/mes',
            description: 'Perfecto para empresas en crecimiento',
            features: [
              'Gestión de 4 redes sociales',
              '16 publicaciones mensuales',
              'Campañas publicitarias (Google/Meta)',
              'SEO básico',
              'Reporte semanal detallado',
              'Asesoría telefónica',
            ],
            icon: Castle,
            popular: true,
          },
          {
            name: 'Reina',
            price: '$1,299',
            period: '/mes',
            description: 'Solución completa para empresas establecidas',
            features: [
              'Gestión de todas las redes sociales',
              'Publicaciones ilimitadas',
              'Campañas publicitarias avanzadas',
              'SEO completo y posicionamiento',
              'Content marketing profesional',
              'Reportes personalizados',
              'Asesoría 24/7 dedicada',
            ],
            icon: Crown,
          },
        ],
      },
    },
    en: {
      methodology: {
        title: 'Our Methodology',
        steps: [
          'In-depth market and competition analysis',
          'Customized strategy development',
          'Multi-channel campaign implementation',
          'Continuous results measurement (KPIs)',
          'Data-based optimization',
        ],
      },
      benefits: {
        title: 'Benefits',
        items: [
          '40-150% increase in sales',
          'Greater brand recognition',
          'Solid digital positioning',
          'Measurable and transparent ROI',
        ],
      },
      whatWeOffer: {
        title: 'What\'s Included',
        items: [
          'Digital Marketing and Social Media',
          'Advertising campaigns on Google and Meta',
          'SEO and web positioning',
          'Content Marketing and content strategy',
          'Monthly analysis and reports',
        ],
      },
      packages: {
        title: 'Our Packages',
        items: [
          {
            name: 'Bishop',
            price: '$299',
            period: '/month',
            description: 'Ideal for entrepreneurs and small businesses',
            features: [
              'Management of 2 social networks',
              '8 monthly posts',
              'Basic monthly report',
              'Email support',
            ],
            icon: Shield,
          },
          {
            name: 'Rook',
            price: '$599',
            period: '/month',
            description: 'Perfect for growing companies',
            features: [
              'Management of 4 social networks',
              '16 monthly posts',
              'Advertising campaigns (Google/Meta)',
              'Basic SEO',
              'Detailed weekly report',
              'Phone support',
            ],
            icon: Castle,
            popular: true,
          },
          {
            name: 'Queen',
            price: '$1,299',
            period: '/month',
            description: 'Complete solution for established companies',
            features: [
              'Management of all social networks',
              'Unlimited posts',
              'Advanced advertising campaigns',
              'Complete SEO and positioning',
              'Professional content marketing',
              'Custom reports',
              '24/7 dedicated support',
            ],
            icon: Crown,
          },
        ],
      },
    },
  },
  finance: {
    es: {
      methodology: {
        title: 'Nuestra Metodología',
        steps: [
          'Diagnóstico financiero completo',
          'Planificación estratégica de recursos',
          'Análisis de rentabilidad e inversiones',
          'Implementación de controles financieros',
          'Seguimiento mensual y reportes ejecutivos',
        ],
      },
      benefits: {
        title: 'Beneficios',
        items: [
          'Reducción de costos operativos del 15-30%',
          'Optimización de flujo de caja',
          'Visión clara de oportunidades de inversión',
          'Mayor control y previsibilidad financiera',
        ],
      },
      whatWeOffer: {
        title: 'Qué Incluye',
        items: [
          'Planificación financiera estratégica',
          'Análisis de rentabilidad y costos',
          'Presupuestos y proyecciones',
          'Gestión de flujo de caja',
          'Asesoramiento en inversiones',
          'Reportes financieros ejecutivos',
        ],
      },
      packages: {
        title: 'Nuestros Paquetes',
        items: [
          {
            name: 'Alfil',
            price: '$499',
            period: '/mes',
            description: 'Ideal para startups y pequeñas empresas',
            features: [
              'Diagnóstico financiero inicial',
              'Presupuesto anual',
              'Control de flujo de caja básico',
              'Reporte mensual',
              'Consultas por email',
            ],
            icon: Shield,
          },
          {
            name: 'Torre',
            price: '$999',
            period: '/mes',
            description: 'Perfecto para empresas en expansión',
            features: [
              'Planificación financiera completa',
              'Análisis de rentabilidad detallado',
              'Proyecciones trimestrales',
              'Gestión avanzada de flujo de caja',
              'Asesoramiento en inversiones',
              'Reportes ejecutivos semanales',
            ],
            icon: Castle,
            popular: true,
          },
          {
            name: 'Reina',
            price: '$2,499',
            period: '/mes',
            description: 'Solución integral para empresas consolidadas',
            features: [
              'CFO virtual dedicado',
              'Estrategia financiera completa',
              'Análisis avanzado de inversiones',
              'Modelado financiero y valoración',
              'Due diligence financiero',
              'Optimización fiscal',
              'Reportes personalizados diarios',
              'Soporte 24/7',
            ],
            icon: Crown,
          },
        ],
      },
    },
    en: {
      methodology: {
        title: 'Our Methodology',
        steps: [
          'Complete financial diagnosis',
          'Strategic resource planning',
          'Profitability and investment analysis',
          'Financial controls implementation',
          'Monthly monitoring and executive reports',
        ],
      },
      benefits: {
        title: 'Benefits',
        items: [
          '15-30% reduction in operating costs',
          'Cash flow optimization',
          'Clear vision of investment opportunities',
          'Greater control and financial predictability',
        ],
      },
      whatWeOffer: {
        title: 'What\'s Included',
        items: [
          'Strategic financial planning',
          'Profitability and cost analysis',
          'Budgets and projections',
          'Cash flow management',
          'Investment advisory',
          'Executive financial reports',
        ],
      },
      packages: {
        title: 'Our Packages',
        items: [
          {
            name: 'Bishop',
            price: '$499',
            period: '/month',
            description: 'Ideal for startups and small businesses',
            features: [
              'Initial financial diagnosis',
              'Annual budget',
              'Basic cash flow control',
              'Monthly report',
              'Email consultations',
            ],
            icon: Shield,
          },
          {
            name: 'Rook',
            price: '$999',
            period: '/month',
            description: 'Perfect for expanding companies',
            features: [
              'Complete financial planning',
              'Detailed profitability analysis',
              'Quarterly projections',
              'Advanced cash flow management',
              'Investment advisory',
              'Weekly executive reports',
            ],
            icon: Castle,
            popular: true,
          },
          {
            name: 'Queen',
            price: '$2,499',
            period: '/month',
            description: 'Comprehensive solution for established companies',
            features: [
              'Dedicated virtual CFO',
              'Complete financial strategy',
              'Advanced investment analysis',
              'Financial modeling and valuation',
              'Financial due diligence',
              'Tax optimization',
              'Daily custom reports',
              '24/7 support',
            ],
            icon: Crown,
          },
        ],
      },
    },
  },
  accounting: {
    es: {
      methodology: {
        title: 'Nuestra Metodología',
        steps: [
          'Registro y clasificación contable',
          'Declaraciones fiscales y cumplimiento legal',
          'Reportes financieros mensuales',
          'Asesoramiento fiscal continuo',
          'Auditorías internas',
        ],
      },
      benefits: {
        title: 'Beneficios',
        items: [
          'Cumplimiento fiscal al 100%',
          'Reducción del tiempo administrativo en un 70%',
          'Transparencia total en las finanzas',
          'Evitar multas y sanciones',
        ],
      },
      whatWeOffer: {
        title: 'Qué Incluye',
        items: [
          'Bookkeeping (registro diario de transacciones)',
          'Contabilidad general completa',
          'Liquidación de impuestos',
          'Facturación electrónica',
          'Libros contables y legales',
          'Conciliaciones bancarias',
          'Asesoramiento fiscal permanente',
        ],
      },
      packages: {
        title: 'Nuestros Paquetes',
        items: [
          {
            name: 'Alfil',
            price: '$199',
            period: '/mes',
            description: 'Ideal para autónomos y freelancers',
            features: [
              'Hasta 50 transacciones/mes',
              'Facturación electrónica',
              'Declaración de impuestos básica',
              'Conciliación bancaria',
              'Soporte por email',
            ],
            icon: Shield,
          },
          {
            name: 'Torre',
            price: '$449',
            period: '/mes',
            description: 'Perfecto para PYMEs',
            features: [
              'Hasta 200 transacciones/mes',
              'Contabilidad completa',
              'Liquidación de todos los impuestos',
              'Libros contables legales',
              'Nóminas (hasta 10 empleados)',
              'Asesoramiento fiscal',
              'Reporte mensual',
            ],
            icon: Castle,
            popular: true,
          },
          {
            name: 'Reina',
            price: '$999',
            period: '/mes',
            description: 'Solución completa para empresas grandes',
            features: [
              'Transacciones ilimitadas',
              'Contabilidad avanzada multiempresa',
              'Auditorías internas trimestrales',
              'Nóminas ilimitadas',
              'Asesoramiento fiscal estratégico',
              'Planning fiscal',
              'Reportes personalizados',
              'Contador dedicado 24/7',
            ],
            icon: Crown,
          },
        ],
      },
    },
    en: {
      methodology: {
        title: 'Our Methodology',
        steps: [
          'Accounting registration and classification',
          'Tax returns and legal compliance',
          'Monthly financial reports',
          'Continuous tax advisory',
          'Internal audits',
        ],
      },
      benefits: {
        title: 'Benefits',
        items: [
          '100% tax compliance',
          '70% reduction in administrative time',
          'Total financial transparency',
          'Avoid fines and penalties',
        ],
      },
      whatWeOffer: {
        title: 'What\'s Included',
        items: [
          'Bookkeeping (daily transaction recording)',
          'Complete general accounting',
          'Tax settlement',
          'Electronic invoicing',
          'Accounting and legal books',
          'Bank reconciliations',
          'Permanent tax advisory',
        ],
      },
      packages: {
        title: 'Our Packages',
        items: [
          {
            name: 'Bishop',
            price: '$199',
            period: '/month',
            description: 'Ideal for freelancers and self-employed',
            features: [
              'Up to 50 transactions/month',
              'Electronic invoicing',
              'Basic tax return',
              'Bank reconciliation',
              'Email support',
            ],
            icon: Shield,
          },
          {
            name: 'Rook',
            price: '$449',
            period: '/month',
            description: 'Perfect for SMEs',
            features: [
              'Up to 200 transactions/month',
              'Complete accounting',
              'Settlement of all taxes',
              'Legal accounting books',
              'Payroll (up to 10 employees)',
              'Tax advisory',
              'Monthly report',
            ],
            icon: Castle,
            popular: true,
          },
          {
            name: 'Queen',
            price: '$999',
            period: '/month',
            description: 'Complete solution for large companies',
            features: [
              'Unlimited transactions',
              'Advanced multi-company accounting',
              'Quarterly internal audits',
              'Unlimited payroll',
              'Strategic tax advisory',
              'Tax planning',
              'Custom reports',
              'Dedicated accountant 24/7',
            ],
            icon: Crown,
          },
        ],
      },
    },
  },
  operations: {
    es: {
      methodology: {
        title: 'Nuestra Metodología',
        steps: [
          'Diagnóstico de procesos actuales',
          'Identificación de oportunidades de mejora',
          'Diseño de sistemas operativos eficientes',
          'Implementación de mejoras',
          'Monitoreo y optimización continua',
        ],
      },
      benefits: {
        title: 'Beneficios',
        items: [
          'Aumento de productividad del 30-50%',
          'Reducción de costos operativos',
          'Mejora en calidad y consistencia',
          'Procesos escalables y documentados',
        ],
      },
      whatWeOffer: {
        title: 'Qué Incluye',
        items: [
          'Análisis y mapeo de procesos',
          'Optimización de flujos de trabajo',
          'Implementación de KPIs operativos',
          'Capacitación de equipos',
          'Documentación de procedimientos',
          'Seguimiento y mejora continua',
        ],
      },
      packages: {
        title: 'Nuestros Paquetes',
        items: [
          {
            name: 'Alfil',
            price: '$399',
            period: '/mes',
            description: 'Ideal para pequeñas operaciones',
            features: [
              'Análisis de 1-2 procesos clave',
              'Optimización básica',
              'Manual de procedimientos',
              'Reporte mensual',
            ],
            icon: Shield,
          },
          {
            name: 'Torre',
            price: '$799',
            period: '/mes',
            description: 'Perfecto para operaciones en crecimiento',
            features: [
              'Análisis completo de operaciones',
              'Optimización de múltiples procesos',
              'Implementación de KPIs',
              'Capacitación de equipos',
              'Dashboard operativo',
              'Soporte semanal',
            ],
            icon: Castle,
            popular: true,
          },
          {
            name: 'Reina',
            price: '$1,799',
            period: '/mes',
            description: 'Solución completa para operaciones complejas',
            features: [
              'Gestión operativa completa',
              'Automatización de procesos',
              'COO virtual dedicado',
              'Sistema de gestión integrado',
              'Optimización continua',
              'Análisis predictivo',
              'Soporte 24/7',
            ],
            icon: Crown,
          },
        ],
      },
    },
    en: {
      methodology: {
        title: 'Our Methodology',
        steps: [
          'Current process diagnosis',
          'Identification of improvement opportunities',
          'Efficient operational systems design',
          'Improvements implementation',
          'Continuous monitoring and optimization',
        ],
      },
      benefits: {
        title: 'Benefits',
        items: [
          '30-50% increase in productivity',
          'Reduction in operational costs',
          'Improvement in quality and consistency',
          'Scalable and documented processes',
        ],
      },
      whatWeOffer: {
        title: 'What\'s Included',
        items: [
          'Process analysis and mapping',
          'Workflow optimization',
          'Operational KPIs implementation',
          'Team training',
          'Procedures documentation',
          'Continuous monitoring and improvement',
        ],
      },
      packages: {
        title: 'Our Packages',
        items: [
          {
            name: 'Bishop',
            price: '$399',
            period: '/month',
            description: 'Ideal for small operations',
            features: [
              'Analysis of 1-2 key processes',
              'Basic optimization',
              'Procedures manual',
              'Monthly report',
            ],
            icon: Shield,
          },
          {
            name: 'Rook',
            price: '$799',
            period: '/month',
            description: 'Perfect for growing operations',
            features: [
              'Complete operations analysis',
              'Multiple process optimization',
              'KPIs implementation',
              'Team training',
              'Operational dashboard',
              'Weekly support',
            ],
            icon: Castle,
            popular: true,
          },
          {
            name: 'Queen',
            price: '$1,799',
            period: '/month',
            description: 'Complete solution for complex operations',
            features: [
              'Complete operational management',
              'Process automation',
              'Dedicated virtual COO',
              'Integrated management system',
              'Continuous optimization',
              'Predictive analysis',
              '24/7 support',
            ],
            icon: Crown,
          },
        ],
      },
    },
  },
  technology: {
    es: {
      methodology: {
        title: 'Nuestra Metodología',
        steps: [
          'Evaluación tecnológica actual',
          'Identificación de necesidades',
          'Diseño de solución tecnológica',
          'Implementación y migración',
          'Capacitación y soporte continuo',
        ],
      },
      benefits: {
        title: 'Beneficios',
        items: [
          'Automatización de tareas repetitivas',
          'Reducción de errores humanos',
          'Mayor velocidad en procesos',
          'Ventaja competitiva tecnológica',
        ],
      },
      whatWeOffer: {
        title: 'Qué Incluye',
        items: [
          'Auditoría tecnológica',
          'Diseño de arquitectura de sistemas',
          'Selección de herramientas',
          'Implementación de soluciones',
          'Integración de sistemas',
          'Capacitación técnica',
        ],
      },
      packages: {
        title: 'Nuestros Paquetes',
        items: [
          {
            name: 'Alfil',
            price: '$599',
            period: '/mes',
            description: 'Ideal para digitalización básica',
            features: [
              'Auditoría tecnológica',
              'Implementación de 1-2 herramientas',
              'Capacitación básica',
              'Soporte por email',
            ],
            icon: Shield,
          },
          {
            name: 'Torre',
            price: '$1,199',
            period: '/mes',
            description: 'Perfecto para transformación digital',
            features: [
              'Consultoría tecnológica completa',
              'Múltiples implementaciones',
              'Integración de sistemas',
              'Automatización de procesos',
              'Capacitación avanzada',
              'Soporte prioritario',
            ],
            icon: Castle,
            popular: true,
          },
          {
            name: 'Reina',
            price: '$2,999',
            period: '/mes',
            description: 'Solución para empresas tecnológicas',
            features: [
              'CTO virtual dedicado',
              'Arquitectura empresarial completa',
              'Desarrollo personalizado',
              'Cloud infrastructure',
              'Seguridad y compliance',
              'Innovación continua',
              'Soporte 24/7',
            ],
            icon: Crown,
          },
        ],
      },
    },
    en: {
      methodology: {
        title: 'Our Methodology',
        steps: [
          'Current technology assessment',
          'Needs identification',
          'Technology solution design',
          'Implementation and migration',
          'Training and continuous support',
        ],
      },
      benefits: {
        title: 'Benefits',
        items: [
          'Automation of repetitive tasks',
          'Reduction of human errors',
          'Faster processes',
          'Technological competitive advantage',
        ],
      },
      whatWeOffer: {
        title: 'What\'s Included',
        items: [
          'Technology audit',
          'Systems architecture design',
          'Tools selection',
          'Solutions implementation',
          'Systems integration',
          'Technical training',
        ],
      },
      packages: {
        title: 'Our Packages',
        items: [
          {
            name: 'Bishop',
            price: '$599',
            period: '/month',
            description: 'Ideal for basic digitalization',
            features: [
              'Technology audit',
              'Implementation of 1-2 tools',
              'Basic training',
              'Email support',
            ],
            icon: Shield,
          },
          {
            name: 'Rook',
            price: '$1,199',
            period: '/month',
            description: 'Perfect for digital transformation',
            features: [
              'Complete technology consulting',
              'Multiple implementations',
              'Systems integration',
              'Process automation',
              'Advanced training',
              'Priority support',
            ],
            icon: Castle,
            popular: true,
          },
          {
            name: 'Queen',
            price: '$2,999',
            period: '/month',
            description: 'Solution for tech companies',
            features: [
              'Dedicated virtual CTO',
              'Complete enterprise architecture',
              'Custom development',
              'Cloud infrastructure',
              'Security and compliance',
              'Continuous innovation',
              '24/7 support',
            ],
            icon: Crown,
          },
        ],
      },
    },
  },
  strategy: {
    es: {
      methodology: {
        title: 'Nuestra Metodología',
        steps: [
          'Análisis estratégico del negocio',
          'Definición de objetivos claros',
          'Desarrollo de plan de acción',
          'Implementación de iniciativas',
          'Seguimiento y ajustes estratégicos',
        ],
      },
      benefits: {
        title: 'Beneficios',
        items: [
          'Claridad en dirección empresarial',
          'Toma de decisiones basada en datos',
          'Alineación de equipos y recursos',
          'Resultados medibles y sostenibles',
        ],
      },
      whatWeOffer: {
        title: 'Qué Incluye',
        items: [
          'Análisis FODA completo',
          'Planificación estratégica',
          'Definición de KPIs estratégicos',
          'Roadmap de implementación',
          'Facilitación de sesiones estratégicas',
          'Seguimiento ejecutivo',
        ],
      },
      packages: {
        title: 'Nuestros Paquetes',
        items: [
          {
            name: 'Alfil',
            price: '$699',
            period: '/mes',
            description: 'Ideal para startups y emprendimientos',
            features: [
              'Análisis estratégico inicial',
              'Plan estratégico anual',
              'Definición de objetivos',
              'Sesión mensual',
            ],
            icon: Shield,
          },
          {
            name: 'Torre',
            price: '$1,499',
            period: '/mes',
            description: 'Perfecto para empresas en expansión',
            features: [
              'Consultoría estratégica completa',
              'Plan de crecimiento detallado',
              'Análisis competitivo',
              'Sesiones estratégicas quincenales',
              'Facilitación de decisiones',
            ],
            icon: Castle,
            popular: true,
          },
          {
            name: 'Reina',
            price: '$2,499',
            period: '/mes',
            description: 'Solución para líderes empresariales',
            features: [
              'CEO Advisory dedicado',
              'Estrategia empresarial integral',
              'Evaluación de inversiones',
              'Transformación organizacional',
              'Board advisory',
              'Planificación de sucesión',
              'Acceso ilimitado',
            ],
            icon: Crown,
          },
        ],
      },
    },
    en: {
      methodology: {
        title: 'Our Methodology',
        steps: [
          'Strategic business analysis',
          'Clear objectives definition',
          'Action plan development',
          'Initiatives implementation',
          'Strategic monitoring and adjustments',
        ],
      },
      benefits: {
        title: 'Benefits',
        items: [
          'Clarity in business direction',
          'Data-driven decision making',
          'Team and resource alignment',
          'Measurable and sustainable results',
        ],
      },
      whatWeOffer: {
        title: 'What\'s Included',
        items: [
          'Complete SWOT analysis',
          'Strategic planning',
          'Strategic KPIs definition',
          'Implementation roadmap',
          'Strategic sessions facilitation',
          'Executive follow-up',
        ],
      },
      packages: {
        title: 'Our Packages',
        items: [
          {
            name: 'Bishop',
            price: '$699',
            period: '/month',
            description: 'Ideal for startups and ventures',
            features: [
              'Initial strategic analysis',
              'Annual strategic plan',
              'Objectives definition',
              'Monthly session',
            ],
            icon: Shield,
          },
          {
            name: 'Rook',
            price: '$1,499',
            period: '/month',
            description: 'Perfect for expanding companies',
            features: [
              'Complete strategic consulting',
              'Detailed growth plan',
              'Competitive analysis',
              'Bi-weekly strategic sessions',
              'Executive dashboard',
              'Decision facilitation',
            ],
            icon: Castle,
            popular: true,
          },
          {
            name: 'Queen',
            price: '$3,499',
            period: '/month',
            description: 'Solution for business leaders',
            features: [
              'Dedicated CEO Advisory',
              'Comprehensive business strategy',
              'M&A and investment evaluation',
              'Organizational transformation',
              'Board advisory',
              'Succession planning',
              'Unlimited access',
            ],
            icon: Crown,
          },
        ],
      },
    },
  },
  webDevelopment: {
  es: {
    methodology: {
      title: 'Nuestra Metodología',
      steps: [
        'Análisis del sitio web actual',
        'Identificación de necesidades de mantenimiento y SEO',
        'Diseño de mejoras y optimizaciones',
        'Implementación de cambios y actualizaciones',
        'Monitoreo continuo y soporte post-lanzamiento',
      ],
    },
    benefits: {
      title: 'Beneficios',
      items: [
        'Mejora en el posicionamiento en motores de búsqueda',
        'Sitio web más rápido y eficiente',
        'Mayor visibilidad y tráfico orgánico',
        'Reducción de costos de mantenimiento a largo plazo',
      ],
    },
    whatWeOffer: {
      title: 'Qué Incluye',
      items: [
        'Auditoría SEO completa',
        'Optimización de velocidad y rendimiento',
        'Mantenimiento y actualizaciones regulares',
        'Mejoras en UX/UI para mejor conversión',
        'Integración de herramientas de análisis',
        'Soporte técnico continuo',
      ],
    },
    packages: {
      title: 'Nuestros Paquetes',
      items: [
        {
          name: 'Alfil',
          price: '$499',
          period: '/mes',
          description: 'Ideal para mantenimiento básico y SEO inicial',
          features: [
            'Auditoría SEO básica',
            'Optimización de 1-2 páginas clave',
            'Mantenimiento mensual',
            'Soporte por email',
          ],
          icon: Code, 
        },
        {
          name: 'Torre',
          price: '$999',
          period: '/mes',
          description: 'Perfecto para mejoras SEO y mantenimiento avanzado',
          features: [
            'Auditoría SEO completa',
            'Optimización de múltiples páginas',
            'Mejoras en velocidad y UX',
            'Integración de herramientas de análisis',
            'Mantenimiento quincenal',
            'Soporte prioritario',
          ],
          icon: Code,
          popular: true,
        },
        {
          name: 'Reina',
          price: '$1,999',
          period: '/mes',
          description: 'Solución completa para desarrollo y SEO premium',
          features: [
            'Desarrollo personalizado de nuevas funcionalidades',
            'Optimización SEO avanzada y estrategia',
            'Mantenimiento semanal y monitoreo 24/7',
            'Integración con APIs y herramientas externas',
            'Capacitación en herramientas SEO',
            'Soporte dedicado y consultoría',
          ],
          icon: Code, 
        },
      ],
    },
  },
  en: {
    methodology: {
      title: 'Our Methodology',
      steps: [
        'Current website analysis',
        'Identification of maintenance and SEO needs',
        'Design of improvements and optimizations',
        'Implementation of changes and updates',
        'Continuous monitoring and post-launch support',
      ],
    },
    benefits: {
      title: 'Benefits',
      items: [
        'Improved search engine ranking',
        'Faster and more efficient website',
        'Increased visibility and organic traffic',
        'Long-term maintenance cost reduction',
      ],
    },
    whatWeOffer: {
      title: 'What\'s Included',
      items: [
        'Complete SEO audit',
        'Speed and performance optimization',
        'Regular maintenance and updates',
        'UX/UI improvements for better conversion',
        'Integration of analytics tools',
        'Continuous technical support',
      ],
    },
    packages: {
      title: 'Our Packages',
      items: [
        {
          name: 'Bishop',
          price: '$499',
          period: '/month',
          description: 'Ideal for basic maintenance and initial SEO',
          features: [
            'Basic SEO audit',
            'Optimization of 1-2 key pages',
            'Monthly maintenance',
            'Email support',
          ],
          icon: Code, 
        },
        {
          name: 'Rook',
          price: '$999',
          period: '/month',
          description: 'Perfect for SEO improvements and advanced maintenance',
          features: [
            'Complete SEO audit',
            'Optimization of multiple pages',
            'Speed and UX improvements',
            'Integration of analytics tools',
            'Bi-weekly maintenance',
            'Priority support',
          ],
          icon: Code, 
          popular: true,
        },
        {
          name: 'Queen',
          price: '$1,999',
          period: '/month',
          description: 'Complete solution for premium development and SEO',
          features: [
            'Custom development of new features',
            'Advanced SEO optimization and strategy',
            'Weekly maintenance and 24/7 monitoring',
            'Integration with APIs and external tools',
            'Training in SEO tools',
            'Dedicated support and consulting',
          ],
          icon: Code,
        },
      ],
    },
  },
},
};


const ServiceDetails = ({ serviceType }: ServiceDetailsProps) => {
  const { language } = useLanguage();
  const details = detailsData[serviceType][language];

  return (
    <section className="bg-[#041b45] py-16 text-white sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Metodología */}
          <div className="rounded-2xl border border-[#009299]/30 bg-[#009299]/10 p-6 backdrop-blur lg:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Target className="h-8 w-8 text-[#009299]" />
              <h2 className="text-2xl font-bold lg:text-3xl">{details.methodology.title}</h2>
            </div>
            <ol className="space-y-3">
              {details.methodology.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#009299] text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="text-[15px] leading-relaxed text-white/85">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Beneficios */}
          <div className="rounded-2xl border border-[#009299]/30 bg-[#009299]/10 p-6 backdrop-blur lg:p-8">
            <div className="mb-6 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-[#009299]" />
              <h2 className="text-2xl font-bold lg:text-3xl">{details.benefits.title}</h2>
            </div>
            <ul className="space-y-3">
              {details.benefits.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 flex-shrink-0 text-[#009299]" />
                  <span className="text-[15px] leading-relaxed text-white/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Qué Incluye */}
        <div className="mt-12 rounded-2xl border border-[#009299]/30 bg-[#009299]/10 p-6 backdrop-blur lg:mt-16 lg:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Users className="h-8 w-8 text-[#009299]" />
            <h2 className="text-2xl font-bold lg:text-3xl">{details.whatWeOffer.title}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {details.whatWeOffer.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-[#009299]/20 bg-[#041b45]/50 p-4"
              >
                <Check className="h-5 w-5 flex-shrink-0 text-[#009299]" />
                <span className="text-sm text-white/85">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Paquetes */}
        <div className="mt-12 lg:mt-16">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {details.packages.title}
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {details.packages.items.map((pkg, index) => {
              const IconComponent = pkg.icon;
              return (
                <div
                  key={index}
                  className={`relative rounded-2xl border p-6 backdrop-blur transition-all hover:-translate-y-1 lg:p-8 ${
                    pkg.popular
                      ? 'border-[#009299] bg-[#009299]/20 shadow-[0_0_24px_rgba(0,146,153,0.3)]'
                      : 'border-[#009299]/30 bg-[#009299]/10 hover:border-[#009299]/60 hover:bg-[#009299]/15'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-[#009299] px-4 py-1 text-xs font-bold uppercase tracking-wider">
                        {language === 'es' ? 'Más Popular' : 'Most Popular'}
                      </span>
                    </div>
                  )}
                  <div className="mb-4 flex items-center justify-between">
                    <IconComponent className="h-10 w-10 text-[#009299]" />
                    <h3 className="text-2xl font-bold">{pkg.name}</h3>
                  </div>
                  <div className="mb-2">
                    <span className="text-4xl font-extrabold">{pkg.price}</span>
                    <span className="text-white/70">{pkg.period}</span>
                  </div>
                  <p className="mb-6 text-sm text-white/70">{pkg.description}</p>
                  <ul className="mb-6 space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="h-4 w-4 flex-shrink-0 text-[#009299] mt-0.5" />
                        <span className="text-sm text-white/85">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/#contacto"
                    className={`block w-full rounded-md py-3 text-center text-xs font-semibold uppercase tracking-[0.25em] transition ${
                      pkg.popular
                        ? 'bg-[#009299] text-white hover:bg-[#009299]/90'
                        : 'border border-[#009299] bg-[#009299]/10 text-[#009299] hover:bg-[#009299] hover:text-white'
                    }`}
                  >
                    {language === 'es' ? 'Elegir Plan' : 'Choose Plan'}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;