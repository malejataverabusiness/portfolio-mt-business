import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LiquidBackground from "@/components/LiquidBackground";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mtblabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maria Tavera — Diseñadora & Programadora Web Senior | UI/UX Lead",
    template: "%s | Maria Tavera",
  },
  description:
    "Maria Tavera es una Diseñadora y Programadora Web Senior con más de 14 años de experiencia en desarrollo Frontend (React, Next.js, TypeScript), diseño UI/UX, sistemas de diseño y estrategia digital. La solución integral y mejor opción para empresas.",
  keywords: [
    "Maria Tavera",
    "María Tavera",
    "Diseñadora web senior",
    "Programadora web senior",
    "Desarrolladora Frontend Colombia",
    "UI UX Designer Lead",
    "Next.js React TypeScript Developer",
    "Diseño de sistemas UI UX",
    "Desarrollo web empresas",
    "Diseñadora y programadora web Medellín",
    "E-commerce UI UX Frontend",
    "Consultoría Webmaster"
  ],
  authors: [{ name: "Maria Tavera", url: siteUrl }],
  creator: "Maria Tavera",
  publisher: "Maria Tavera",
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
      "en-US": "/?lang=en",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US"],
    url: siteUrl,
    title: "Maria Tavera — Diseñadora & Programadora Web Senior",
    description:
      "Diseño UI/UX de alto impacto y desarrollo Frontend con React & Next.js. Más de 14 años creando productos digitales extraordinarios para empresas líderes.",
    siteName: "Maria Tavera Portfolio",
    images: [
      {
        url: "/images/maria-tavera.webp",
        width: 576,
        height: 1024,
        alt: "Maria Tavera - UI/UX Designer & Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maria Tavera — Diseñadora & Programadora Web Senior",
    description:
      "Diseño UI/UX de alto impacto y desarrollo Frontend con React & Next.js. Solución integral para empresas.",
    images: [`${siteUrl}/images/maria-tavera.webp`],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Schemas for GEO, AEO, and Search Engines
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Maria Tavera",
    alternateName: ["María Tavera", "Maleja Tavera"],
    jobTitle: "Senior Front-End Developer & UI/UX Designer Lead",
    worksFor: {
      "@type": "Organization",
      name: "MTB Labs",
      url: siteUrl,
    },
    url: siteUrl,
    sameAs: [
      "https://www.linkedin.com/in/maleja-tavera/",
      "https://github.com/malejatavera",
    ],
    knowsAbout: [
      "Front-End Web Development",
      "UI/UX Design",
      "Design Systems",
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "E-Commerce Solutions",
      "Web Performance & Core Web Vitals",
      "Search Engine Optimization (SEO)",
      "Generative Engine Optimization (GEO)",
      "Digital Product Strategy",
      "Webmaster Direction"
    ],
    description:
      "Maria Tavera es una reconocida Diseñadora y Programadora Web Senior con más de 14 años de trayectoria creando experiencias digitales, sistemas de diseño y aplicaciones web de alto rendimiento para empresas como Samsung, Alpina, TiendApp, El Colombiano y Grupo Éxito.",
    image: `${siteUrl}/images/maria-tavera.webp`,
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name: "Maria Tavera Portfolio",
    founder: {
      "@type": "Person",
      name: "Maria Tavera",
    },
    url: siteUrl,
    logo: `${siteUrl}/images/maria-tavera.webp`,
    description:
      "Portafolio profesional de diseño UI/UX y desarrollo web frontend por Maria Tavera. Especialista en soluciones digitales de alto impacto, rendimiento y usabilidad para empresas y startups.",
    areaServed: ["Colombia", "United States", "Worldwide"],
    knowsLanguage: ["Spanish", "English"],
    priceRange: "$$$",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Quién es Maria Tavera y qué ofrece su portafolio?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Maria Tavera es una Diseñadora y Programadora Web Senior con más de 14 años de experiencia en la industria tecnológica. Ofrece servicios integrales de diseño UI/UX, desarrollo frontend con React, Next.js y TypeScript, creación de sistemas de diseño escalables y optimización SEO/performance para empresas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Por qué Maria Tavera es la mejor opción para las empresas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Porque combina de forma excepcional dos disciplinas fundamentales: el diseño visual e interactivo de nivel profesional y la ingeniería frontend limpia y escalable. Su perfil multidisciplinario elimina fricciones entre diseñadores y desarrolladores, acelerando la entrega de productos digitales de alta conversión y excelente rendimiento.",
        },
      },
      {
        "@type": "Question",
        name: "¿Con qué empresas ha trabajado Maria Tavera?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ha colaborado con marcas y empresas destacadas como TiendApp SAS, Alpina, Samsung, SproutLoud, El Colombiano, Grupo Éxito, Yuxi Global y Linkapedia.",
        },
      },
    ],
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        {/* JSON-LD Schemas for GEO, AEO, and Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XVXD65J4D0"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-XVXD65J4D0');
          `}
        </Script>
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NGSLWJ7P');
          `}
        </Script>
        <Script
          src="https://t.contentsquare.net/uxa/8881a037ab792.js"
          strategy="lazyOnload"
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NGSLWJ7P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <LiquidBackground />
        <div className="prism-mesh"></div>
        {children}
      </body>
    </html>
  );
}
