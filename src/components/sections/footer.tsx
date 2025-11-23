"use client";

import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin, Phone, Linkedin, Youtube } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Enlaces de navegación
  const footerNavItems = [
    { label: t.footer.navItems[0], href: '/' },
    { label: t.footer.navItems[1], href: '/#nosotros' },
    { label: t.footer.navItems[2], href: '/#servicios' },
    { label: t.footer.navItems[4], href: '/#contacto' },
  ];

  // Enlaces dinámicos por idioma
  const phoneNumber = '17202371356'; // para wa.me sin símbolos
  const whatsappText =
    encodeURIComponent(
      t?.contact?.whatsappMessage ||
        (language === 'es'
          ? 'Hola, me gustaría más información sobre sus servicios.'
          : 'Hello, I would like more information about your services.')
    );
  const whatsappHref = `https://wa.me/${phoneNumber}?text=${whatsappText}`;

  const emailTo = 'ceo@nextlevelbusinessco.com';
  const emailSubject = encodeURIComponent(
    language === 'es' ? 'Consulta' : 'Inquiry'
  );
  const emailBody = encodeURIComponent(
    language === 'es'
      ? 'Hola, me gustaría saber más sobre sus servicios.'
      : 'Hello, I would like to know more about your services.'
  );
  // Cambiado de mailto a Gmail compose URL para mejor compatibilidad
  const emailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailTo}&su=${emailSubject}&body=${emailBody}`;

  const mapsQuery = encodeURIComponent(
    language === 'es' ? 'Colorado, Estados Unidos' : 'CO, United States'
  );
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <footer className="bg-[#041b45] text-white border-t border-[#009299]/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-2"
              aria-label={language === 'es' ? 'Ir al inicio' : 'Go to home'}
            >
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Propiedades_del_Logo__3_-imagenes-1-removebg-preview-1762783899440.png?width=8000&height=8000&resize=contain"
                alt="Next Level Logo"
                className="h-8 w-8 flex-shrink-0 object-contain"
              />
              <div className="flex flex-col leading-none">
                <span
                  className="text-[15px] font-bold uppercase tracking-[0.22em] text-white"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  NEXT LEVEL
                </span>
                <span
                  className="text-[10px] font-normal uppercase tracking-[0.22em] text-[#009299]"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  BUSINESS CONSULTING
                </span>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-neutral-400 sm:text-sm">
              {t.footer.tagline}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-10 text-[13px] sm:grid-cols-3 sm:text-sm">
              <div>
                <h3 className="mb-4 font-semibold uppercase tracking-[0.2em] text-neutral-200">
                  {t.footer.navigation}
                </h3>
                <ul className="space-y-3">
                  {footerNavItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        className="text-neutral-400 transition hover:text-[#009299]"
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-semibold uppercase tracking-[0.2em] text-neutral-200">
                  {t.footer.contactTitle}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      className="inline-flex items-center gap-1.5 text-neutral-400 transition hover:text-[#009299]"
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={language === 'es' ? 'Abrir WhatsApp' : 'Open WhatsApp'}
                    >
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span>+1 (720) 237-1356</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="inline-flex items-center gap-1.5 text-neutral-400 transition hover:text-[#009299]"
                      href={emailHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={language === 'es' ? 'Enviar email' : 'Send email'}
                    >
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span>ceo@nextlevelbusinessco.com</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="inline-flex items-start gap-1.5 text-neutral-400 transition hover:text-[#009299]"
                      href={mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={language === 'es' ? 'Abrir mapa' : 'Open map'}
                    >
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>
                        {language === 'es' ? 'CO,\n Estados Unidos' : 'CO,\n United States'}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-semibold uppercase tracking-[0.2em] text-neutral-200">
                  {t.footer.socialTitle}
                </h3>
                <ul className="flex gap-4">
                  <li>
                    <a
                      className="group"
                      aria-label={language === 'es' ? 'Ir a Instagram' : 'Go to Instagram'}
                      href="https://www.instagram.com/nextlevelbusinessco/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="h-6 w-6 text-neutral-400 transition group-hover:text-[#009299]" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="group"
                      aria-label={language === 'es' ? 'Ir a LinkedIn' : 'Go to LinkedIn'}
                      href="https://www.linkedin.com/company/next-level-business-consulting-llc/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-6 w-6 text-neutral-400 transition group-hover:text-[#009299]" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="group"
                      aria-label={language === 'es' ? 'Ir a Facebook' : 'Go to Facebook'}
                      href="https://www.facebook.com/profile.php?id=61580129018061&sk=reels_tab"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="h-6 w-6 text-neutral-400 transition group-hover:text-[#009299]" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="group"
                      aria-label={language === 'es' ? 'Ir a YouTube' : 'Go to YouTube'}
                      href="https://www.youtube.com/@NextLevelBusinessConsult"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="h-6 w-6 text-neutral-400 transition group-hover:text-[#009299]" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="group"
                      aria-label={language === 'es' ? 'Ir a TikTok' : 'Go to TikTok'}
                      href="https://www.tiktok.com/@nextlevelbusinessco"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTiktok className="h-6 w-6 text-neutral-400 transition group-hover:text-[#009299]" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#009299]/20 pt-8">
          <div className="flex flex-col-reverse items-center justify-center gap-4 text-xs text-neutral-400 sm:flex-row">
            <p className="text-center">
              © 2025 NEXTLEVEL. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
