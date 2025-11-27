"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import Link from 'next/link'; // Importar Link para todos los enlaces
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setScrolled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const navItems = [
    { name: t.nav.home, href: '/', active: true },
    { name: t.nav.about, href: '/#nosotros', active: false },
  ];

  const serviceItems = [
    { name: language === 'es' ? 'Gestión de Operaciones' : 'Operations Management', href: '/services/operations' },
    { name: language === 'es' ? 'Finanzas' : 'Finance', href: '/services/finance' },
    { name: language === 'es' ? 'Contabilidad' : 'Accounting', href: '/services/accounting' },
    { name: language === 'es' ? 'Tecnológias' : 'Technologies', href: '/services/technology' },
    { name: language === 'es' ? 'Estratégia' : 'Strategies', href: '/services/strategy' },
    { name: language === 'es' ? 'Marketing' : 'Marketing', href: '/services/marketing' },
    { name: language === 'es' ? 'Desarrollo Web' : 'Web Development', href: '/services/webDevelopment' },
  ];

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
      setServicesOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServicesOpen, handleClickOutside]);

  // Función para manejar clic en servicio: cerrar menú y loggear para debug
  const handleServiceClick = useCallback((href: string) => {
    setServicesOpen(false);
    console.log(`Navegando a: ${href}`); // Agregar log para verificar si se ejecuta
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${isScrolled ? 'bg-[#041b45]' : 'bg-transparent'}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-6" aria-label="Navegación principal">
        <Link href="/" className="flex min-w-0 items-center gap-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041b45] rounded" aria-label="Ir a la página de inicio de Next Level Business Consulting">
          <div className="relative h-14 w-14 flex-shrink-0"> 
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Propiedades_del_Logo__3_-imagenes-1-removebg-preview-1762783899440.png"
              alt="Next Level Business Consulting Logo"
              fill
              className="object-contain"
              sizes="56px" 
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[18px] font-bold uppercase tracking-[0.22em] text-white" style={{ fontFamily: 'Arial, sans-serif' }}>
              NEXT LEVEL
            </span>
            <span className="text-[12px] font-normal uppercase tracking-[0.22em] text-[#009299]" style={{ fontFamily: 'Arial, sans-serif' }}>
              BUSINESS CONSULTING
            </span>
          </div>
        </Link>
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <ul className="flex items-center gap-8" role="list">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`px-2 py-1 text-[12px] font-medium uppercase tracking-[0.28em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041b45] rounded ${item.active ? 'text-white' : 'text-white/85 hover:text-white'}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li 
              ref={servicesRef}
              className="relative"
            >
              <button
                onClick={() => setServicesOpen(!isServicesOpen)}
                className="flex items-center gap-1 px-2 py-1 text-[12px] font-medium uppercase tracking-[0.28em] text-white/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041b45] rounded"
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                aria-label="Menú de servicios"
              >
                {t.nav.services}
                <ChevronDown className={`h-3 w-3 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {isServicesOpen && (
                <div className="absolute left-0 top-full mt-2 w-48 rounded-md border border-[#009299]/30 bg-[#041b45] backdrop-blur-sm shadow-lg">
                  <ul className="py-2" role="menu">
                    {serviceItems.map((service) => (
                      <li key={service.name} role="none">
                        <Link
                          href={service.href}
                          onClick={() => handleServiceClick(service.href)} // Usar función con log
                          className="block px-4 py-2 text-sm text-white/85 transition-colors hover:bg-[#009299]/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-inset"
                          role="menuitem"
                          prefetch
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link
                href="/services/blog"
                className="px-2 py-1 text-[12px] font-medium uppercase tracking-[0.28em] text-white/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041b45] rounded"
              >
                {t.nav.Blog}
              </Link>
            </li>
            <li>
              <Link
                href="/#contacto"
                className="px-2 py-1 text-[12px] font-medium uppercase tracking-[0.28em] text-white/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041b45] rounded"
              >
                {t.nav.contact}
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={toggleLanguage}
            className="inline-flex h-12 items-center gap-2 rounded-md border border-[#009299]/50 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#009299]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041b45]"
            aria-label={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'español'}`}
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            {language === 'es' ? 'EN' : 'ES'}
          </button>
          <Link
            href="/#contacto"
            className="rounded-md border border-[#009299] bg-[#009299] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#009299]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041b45]"
          >
            {t.nav.quote}
          </Link>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleLanguage}
            className="inline-flex h-12 items-center gap-2 rounded-md border border-[#009299]/50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#009299]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041b45]"
            aria-label={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'español'}`}
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            {language === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            className="inline-flex h-14 w-14 items-center justify-center rounded border-white/15 bg-[#041b45]/30 backdrop-blur transition hover:bg-[#041b45]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041b45]"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6 text-white" aria-hidden="true" /> : <Menu className="h-6 w-6 text-white" aria-hidden="true" />}
          </button>
        </div>
      </nav>
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-[#009299]/20 bg-[#041b45]/95 backdrop-blur transition-[max-height] duration-300 lg:hidden ${isMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}
        aria-hidden={!isMenuOpen}
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3" role="list">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="block rounded px-2 py-2 text-sm uppercase tracking-[0.22em] text-white/90 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-inset"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <div className="px-2 py-1 text-xs uppercase tracking-[0.22em] text-white/60">
              {t.nav.services}
            </div>
            <ul className="ml-4" role="list">
              {serviceItems.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="block rounded px-2 py-2 text-sm text-white/85 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-inset"
                    onClick={() => {
                      setMenuOpen(false);
                      console.log(`Navegando a: ${service.href}`); // Log para debug
                    }}
                    prefetch
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link
              href="/services/blog"
              className="block rounded px-2 py-2 text-sm uppercase tracking-[0.22em] text-white/90 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-inset"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.Blog}
            </Link>
          </li>
          <li>
            <Link
              href="/#contacto"
              className="block rounded px-2 py-2 text-sm uppercase tracking-[0.22em] text-white/90 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-inset"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.contact}
            </Link>
          </li>
          <li className="pt-1">
            <Link
              href="/#contacto"
              className="block rounded border border-[#009299] bg-[#009299] px-2 py-2 text-center text-sm uppercase tracking-[0.22em] text-white transition hover:bg-[#009299]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-inset"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.quote}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
