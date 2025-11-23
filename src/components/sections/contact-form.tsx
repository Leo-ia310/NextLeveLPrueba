"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { ArrowRight, CheckCircle2, Plus, Calendar, Clock } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import { sendToGoogleSheet, SheetFormData, checkAvailabilityInSheet } from '@/lib/google-sheets';
import { CalendarAvailability } from '@/components/ui/calendar-availability';

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  ubicacion: string;
  mensaje: string;
  fecha: string;
  hora: string;
  services: string[];
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    email: "",
    ubicacion: "",
    mensaje: "",
    fecha: "",
    hora: "",
    services: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isAvailable, setIsAvailable] = useState(true);

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: leftColRef, isVisible: leftColVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: rightColRef, isVisible: rightColVisible } = useScrollReveal<HTMLDivElement>();

  const { language } = useLanguage();
  const t = translations[language];

  // Inicializar EmailJS al montar el componente

  // Verificar disponibilidad en Google Sheets cuando cambien fecha o hora
  useEffect(() => {
    if (formData.fecha && formData.hora) {
      checkAvailabilityInSheet(formData.fecha, formData.hora).then((available) => {
        setIsAvailable(available);
      }).catch((error) => {
        console.error('Error checking availability:', error);
        setIsAvailable(false); // Asumir no disponible en caso de error
      });
    }
  }, [formData.fecha, formData.hora]);

  // Generate time slots for 30-minute consultations from 9:00 to 18:00
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get today's date in YYYY-MM-DD format for min attribute
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prevData) => ({
      ...prevData,
      services: prevData.services.includes(service)
        ? prevData.services.filter((s) => s !== service)
        : [...prevData.services, service],
    }));
  };

  const handleAvailabilityCheck = (available: boolean) => {
    setIsAvailable(available);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate that at least one service is selected
    if (formData.services.length === 0) {
      alert(language === 'es' ? 'Por favor, selecciona al menos un servicio.' : 'Please select at least one service.');
      return;
    }

    // Check if time slot is available
    if (!isAvailable && formData.fecha && formData.hora) {
      alert(language === 'es' 
        ? 'El horario seleccionado no está disponible. Por favor, elige otro.'
        : 'The selected time slot is not available. Please choose another one.'
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const { nombre, apellido, email, ubicacion, mensaje, fecha, hora, services } = formData;
    
    try {

        
        
        
        
        
      
      

    
      console.log('📊 Guardando en Google Sheets...');
      const sheetData: SheetFormData = {
        nombre,
        apellido,
        email,
        ubicacion,
        services: services.join(', '),
        fecha,
        hora,
        mensaje,
        timestamp: new Date().toISOString(),
      };
      await sendToGoogleSheet(sheetData);
      console.log('✅ Datos guardados en Google Sheets');

      setSubmitStatus('success');

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('❌ Error al enviar el formulario:', error);
      setSubmitStatus('error');

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section 
      id="contacto" 
      className="relative bg-[#052552] scroll-mt-28"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#052552]/50 via-[#052552]/80 to-[#041b45]"></div>
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="text-center">
          <div 
            ref={badgeRef}
            className={`inline-block transition-all duration-[1500ms] ease-out ${badgeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#009299]">
              {t.contact.badge}
            </span>
          </div>
          <div 
            ref={titleRef}
            className={`transition-all duration-[1500ms] ease-out delay-200 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t.contact.title}{" "}
              <span className="text-[#009299]">{t.contact.titleAccent}</span>
            </h2>
          </div>
        </div>
        <div className="mt-12 rounded-3xl border border-[#009299]/20 bg-[#041b45]/50 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-8 md:p-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
            <div 
              ref={leftColRef}
              className={`md:col-span-5 transition-all duration-[1500ms] ease-out delay-300 ${leftColVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            >
              <h3 className="text-2xl font-bold text-white">
                {t.contact.preferDirect}
              </h3>
              <p className="mt-2 text-base text-neutral-300">
                {t.contact.whatsappPrompt}
              </p>
              <a
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#009299] px-5 py-3 font-bold text-white transition hover:bg-[#009299]/90 sm:w-auto"
                href={`https://wa.me/17202371356?text=${encodeURIComponent(t.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.contact.openChat}
                <ArrowRight className="h-5 w-5" />
              </a>
              <ul role="list" className="mt-8 space-y-4">
                {t.contact.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-[#009299]" />
                    <div>
                      <p className="font-semibold text-white">{feature.title}</p>
                      <p className="text-sm text-neutral-400">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs text-neutral-400">
                {t.contact.formNote}
              </p>
            </div>
            <div 
              ref={rightColRef}
              className={`md:col-span-7 transition-all duration-[1500ms] ease-out delay-400 ${rightColVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            >
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    name="nombre"
                    type="text"
                    placeholder={t.contact.form.firstName}
                    className="w-full rounded-md border border-[#009299]/30 bg-[#041b45]/80 px-4 py-3 text-base text-white/90 ring-offset-[#041b45] placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2"
                    value={formData.nombre}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <input
                    name="apellido"
                    type="text"
                    placeholder={t.contact.form.lastName}
                    className="w-full rounded-md border border-[#009299]/30 bg-[#041b45]/80 px-4 py-3 text-base text-white/90 ring-offset-[#041b45] placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2"
                    value={formData.apellido}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="mt-4">
                  <input
                    name="email"
                    type="email"
                    placeholder={t.contact.form.email}
                    className="w-full rounded-md border border-[#009299]/30 bg-[#041b45]/80 px-4 py-3 text-base text-white/90 ring-offset-[#041b45] placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="mt-4">
                  <input
                    name="ubicacion"
                    type="text"
                    placeholder={t.contact.form.location}
                    className="w-full rounded-md border border-[#009299]/30 bg-[#041b45]/80 px-4 py-3 text-base text-white/90 ring-offset-[#041b45] placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2"
                    value={formData.ubicacion}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Services Selection */}
                <div className="mt-6 rounded-xl border border-[#009299]/30 bg-[#009299]/10 p-5">
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                    {t.contact.form.servicesTitle}
                  </label>
                  <p className="mb-4 text-xs text-white/70">{t.contact.form.servicesNote}</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {Object.entries(t.contact.form.servicesOptions).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleServiceToggle(label)}
                        disabled={isSubmitting}
                        className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition ${
                          formData.services.includes(label)
                            ? 'border-[#009299] bg-[#009299] text-white'
                            : 'border-[#009299]/30 bg-[#041b45]/50 text-white/80 hover:border-[#009299]/60 hover:bg-[#041b45]/80'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            formData.services.includes(label)
                              ? 'border-white bg-white'
                              : 'border-[#009299]/50'
                          }`}>
                            {formData.services.includes(label) && (
                              <CheckCircle2 className="h-3 w-3 text-[#009299]" />
                            )}
                          </div>
                          <span>{label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 rounded-xl border border-[#009299]/30 bg-[#009299]/10 p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[#009299]" />
                    <h4 className="font-semibold text-white">{t.contact.form.reserveTitle}</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fecha" className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                        <Calendar className="h-4 w-4 text-[#009299]" />
                        {t.contact.form.preferredDate}
                      </label>
                      <input
                        id="fecha"
                        name="fecha"
                        type="date"
                        min={getTodayDate()}
                        className="w-full rounded-md border border-[#009299]/30 bg-[#041b45]/80 px-4 py-3 text-base text-white/90 ring-offset-[#041b45] placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2"
                        value={formData.fecha}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="hora" className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                        <Clock className="h-4 w-4 text-[#009299]" />
                        {t.contact.form.preferredTime}
                      </label>
                      <select
                        id="hora"
                        name="hora"
                        className="w-full rounded-md border border-[#009299]/30 bg-[#041b45]/80 px-4 py-3 text-base text-white/90 ring-offset-[#041b45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2"
                        value={formData.hora}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      >
                        <option value="" className="bg-[#041b45] text-neutral-400">
                          {language === 'es' ? 'Seleccionar hora' : 'Select time'}
                        </option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot} className="bg-[#041b45] text-white">
                            {slot} - {slot.split(':')[0]}:{parseInt(slot.split(':')[1]) + 30 < 60 ? (parseInt(slot.split(':')[1]) + 30).toString().padStart(2, '0') : '00'}
                            {language === 'es' ? ' (30 min)' : ' (30 min)'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Calendar Availability Component */}
                  <CalendarAvailability
                    selectedDate={formData.fecha}
                    selectedTime={formData.hora}
                    onAvailabilityCheck={handleAvailabilityCheck}
                  />
                  
                  <div className="mt-3 rounded-lg bg-[#041b45]/60 border border-[#009299]/20 p-3">
                    <p className="text-xs text-neutral-300 flex items-start gap-2">
                      <Clock className="h-3.5 w-3.5 text-[#009299] flex-shrink-0 mt-0.5" />
                      <span>
                        {t.contact.form.scheduleNote}
                        <br />
                        <span className="text-[#009299] font-semibold">
                          {language === 'es' ? '⏱️ Duración: 30 minutos por consulta' : '⏱️ Duration: 30 minutes per consultation'}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <textarea
                    name="mensaje"
                    placeholder={t.contact.form.message}
                    className="min-h-[120px] w-full rounded-md border border-[#009299]/30 bg-[#041b45]/80 px-4 py-3 text-base text-white/90 ring-offset-[#041b45] placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009299] focus-visible:ring-offset-2"
                    value={formData.mensaje}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-green-400">
                          {language === 'es' ? '✅ ¡Formulario enviado exitosamente!' : '✅ Form submitted successfully!'}
                        </p>
                        <p className="text-xs text-white/70 mt-1">
                          {language === 'es' 
                            ? 'Tu consulta ha sido enviada por email, guardada en nuestro sistema y programada en el calendario.'
                            : 'Your inquiry has been sent by email, saved in our system, and scheduled on the calendar.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full border-2 border-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-500 text-xs">!</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-red-400">
                          {language === 'es' ? '⚠️ Hubo un problema al enviar algunos datos' : '⚠️ There was a problem sending some data'}
                        </p>
                        <p className="text-xs text-white/70 mt-1">
                          {language === 'es' 
                            ? 'Pero no te preocupes, abrimos WhatsApp para que puedas contactarnos directamente.'
                            : "But don't worry, we've opened WhatsApp so you can contact us directly."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <p className="mt-4 text-xs text-neutral-400">
                  {t.contact.form.submitNote}
                  <br />
                  {language === 'es' ? 'Destino' : 'Destination'}:{" "}
                  <a
                    href="https://wa.me/17202371356"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[#009299] hover:text-[#00b8c1]"
                  >
                    wa.me/17202371356
                  </a>
                </p>
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || !isAvailable}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-[#009299] bg-[#009299] px-5 py-3 text-sm font-bold uppercase tracking-[0.25em] text-white transition hover:bg-[#009299]/90 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="h-4 w-4 animate-spin" />
                        {language === 'es' ? 'ENVIANDO...' : 'SENDING...'}
                      </>
                    ) : (
                      <>
                        {t.contact.form.submit}
                        <Plus className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;