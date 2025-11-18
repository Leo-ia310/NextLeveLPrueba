import { X } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { useEffect } from 'react';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: {
    name: string;
    location: string;
    image: string;
    challenge: string;
    solution: string;
    methodology: string[];
    difficulties: string[];
    results: string[];
  };
}

export default function CaseStudyModal({ isOpen, onClose, caseData }: CaseStudyModalProps) {
  const { language } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCtaClick = () => {
    onClose();
    // Small delay to ensure modal closes before navigation
    setTimeout(() => {
      window.location.hash = 'contacto';
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#041b45]/95 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#052552] border border-[#009299]/30 rounded-2xl shadow-[0_0_48px_rgba(0,146,153,0.3)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#041b45]/80 border border-[#009299]/50 text-white hover:bg-[#009299] transition"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Image */}
        <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={caseData.image}
            alt={caseData.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#052552] via-[#041b45]/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8 space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-3xl font-bold text-white">{caseData.name}</h2>
            <p className="text-sm uppercase tracking-wide text-[#009299] mt-1">{caseData.location}</p>
          </div>

          {/* Challenge Section */}
          <div>
            <h3 className="text-xl font-bold text-[#009299] mb-2 flex items-center gap-2">
              <span className="h-1 w-8 bg-[#009299]"></span>
              {language === 'es' ? 'EL DESAFÍO' : 'THE CHALLENGE'}
            </h3>
            <p className="text-white/85 leading-relaxed">{caseData.challenge}</p>
          </div>

          {/* Solution Section */}
          <div>
            <h3 className="text-xl font-bold text-[#009299] mb-2 flex items-center gap-2">
              <span className="h-1 w-8 bg-[#009299]"></span>
              {language === 'es' ? 'LA SOLUCIÓN' : 'THE SOLUTION'}
            </h3>
            <p className="text-white/85 leading-relaxed">{caseData.solution}</p>
          </div>

          {/* Methodology Section */}
          <div>
            <h3 className="text-xl font-bold text-[#009299] mb-3 flex items-center gap-2">
              <span className="h-1 w-8 bg-[#009299]"></span>
              {language === 'es' ? 'METODOLOGÍA APLICADA' : 'APPLIED METHODOLOGY'}
            </h3>
            <ul className="space-y-2">
              {caseData.methodology.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-1.5 h-2 w-2 rounded-full bg-[#009299]"></span>
                  <span className="text-white/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Difficulties Section */}
          <div>
            <h3 className="text-xl font-bold text-[#009299] mb-3 flex items-center gap-2">
              <span className="h-1 w-8 bg-[#009299]"></span>
              {language === 'es' ? 'DIFICULTADES SUPERADAS' : 'CHALLENGES OVERCOME'}
            </h3>
            <ul className="space-y-2">
              {caseData.difficulties.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-1.5 h-2 w-2 rounded-full bg-[#009299]/60"></span>
                  <span className="text-white/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Results Section */}
          <div>
            <h3 className="text-xl font-bold text-[#009299] mb-3 flex items-center gap-2">
              <span className="h-1 w-8 bg-[#009299]"></span>
              {language === 'es' ? 'RESULTADOS OBTENIDOS' : 'RESULTS ACHIEVED'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {caseData.results.map((result, index) => (
                <div key={index} className="bg-[#009299]/10 border border-[#009299]/30 rounded-lg p-4">
                  <p className="text-white/90 font-semibold">{result}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 rounded-md border border-[#009299] bg-[#009299] px-8 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-[#009299]/90"
            >
              {language === 'es' ? 'QUIERO RESULTADOS ASÍ' : 'I WANT RESULTS LIKE THIS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}