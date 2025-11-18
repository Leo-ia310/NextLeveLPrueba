import Header from '@/components/sections/header';
import HeroCarousel from '@/components/sections/hero-carousel';
import AboutUsSection from '@/components/sections/about-us';
import MissionVisionSection from '@/components/sections/mission-vision';
import ServicesSection from '@/components/sections/services';
import FAQSection from '@/components/sections/faq';
import ProjectsGrid from '@/components/sections/projects-grid';
import Testimonials from '@/components/sections/testimonials';
import ContactForm from '@/components/sections/contact-form';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <div className="overflow-x-hidden w-full">
      <Header />
      <main className="min-h-screen bg-[#041b45] overflow-x-hidden w-full" id="main-content">
        <HeroCarousel />
        <AboutUsSection />
        <MissionVisionSection />
        <ServicesSection />
        <ProjectsGrid />
        <FAQSection />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}