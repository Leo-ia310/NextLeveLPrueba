import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import ServiceHero from '@/components/services/service-hero';
import ServiceDetails from '@/components/services/service-details';
import ServiceFAQ from '@/components/services/service-faq';
import ServiceTestimonials from '@/components/services/service-testimonials';
import ContactForm from '@/components/sections/contact-form';

export default function webDevelopmentPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#041b45]">
        <ServiceHero serviceType="webDevelopment" />
        <ServiceDetails serviceType="webDevelopment" />
        <ServiceFAQ serviceType="webDevelopment" />
        <ServiceTestimonials serviceType="webDevelopment" />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
