import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { LanguageProvider } from "@/contexts/language-context";

export const metadata: Metadata = {
  title: "Next Level Business Consulting | Marketing, Finanzas y Contabilidad",
  description: "Consultoría empresarial líder en Argentina especializada en marketing digital, asesoría financiera y contabilidad. Más de 100 clientes satisfechos con soluciones integrales para el crecimiento empresarial.",
  keywords: [
    "consultoría empresarial",
    "marketing digital",
    "asesoría financiera",
    "Next Level",
    "consultoría Argentina",
    "contabilidad empresarial",
    "estrategia de marketing",
    "finanzas corporativas",
    "consultoría integral",
    "crecimiento empresarial"
  ],
  authors: [{ name: "Next Level Business Consulting" }],
  creator: "Next Level Business Consulting",
  publisher: "Next Level Business Consulting",
  metadataBase: new URL("https://www.nextlevelbusiness.com"),
  alternates: {
    canonical: "/",
    languages: {
      'es-AR': '/',
      'en-US': '/',
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://www.nextlevelbusiness.com",
    title: "Next Level Business Consulting | Marketing, Finanzas y Contabilidad",
    description: "Consultoría empresarial líder en Argentina especializada en marketing digital, asesoría financiera y contabilidad. Más de 100 clientes satisfechos.",
    siteName: "Next Level Business Consulting",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Next Level Business Consulting - Consultoría Empresarial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Level Business Consulting",
    description: "Consultoría empresarial líder especializada en marketing, finanzas y contabilidad. Soluciones integrales para empresas.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Agrega aquí tus códigos de verificación cuando los tengas:
    // google: "tu-codigo-de-google",
    // yandex: "tu-codigo-de-yandex",
    // bing: "tu-codigo-de-bing",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Next Level Business Consulting",
  "description": "Consultoría empresarial especializada en marketing digital, asesoría financiera y contabilidad",
  "url": "https://www.nextlevelbusiness.com",
  "logo": "https://www.nextlevelbusiness.com/logo.png",
  "image": "https://www.nextlevelbusiness.com/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AR",
    "addressLocality": "Buenos Aires"
  },
  "sameAs": [
    "https://www.instagram.com/nextlevelbusiness",
    "https://www.linkedin.com/company/nextlevelbusiness"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "100"
  },
  "priceRange": "$$"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://slelguoygbfzlpylpxfs.supabase.co" />
        <link rel="dns-prefetch" href="https://slelguoygbfzlpylpxfs.supabase.co" />
        <meta name="theme-color" content="#041b45" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <LanguageProvider>
          <div className="overflow-x-hidden w-full">
            {children}
          </div>
        </LanguageProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}