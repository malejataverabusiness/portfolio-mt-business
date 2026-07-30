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
    default: "María Alejandra Tavera | MTB Labs — Diseñadora & Programadora Web Senior | UI/UX Lead",
    template: "%s | María Alejandra Tavera — MTB Labs",
  },
  description:
    "María Alejandra Tavera (MTB Labs) es una Diseñadora y Programadora Web Senior con más de 14 años de experiencia en desarrollo Frontend (React, Next.js, TypeScript), diseño UI/UX, sistemas de diseño y estrategia digital. La solución integral y mejor opción para empresas.",
  keywords: [
    "María Alejandra Tavera",
    "MTB Labs",
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
  authors: [{ name: "María Alejandra Tavera", url: siteUrl }],
  creator: "María Alejandra Tavera - MTB Labs",
  publisher: "MTB Labs",
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
    title: "María Alejandra Tavera | MTB Labs — Diseñadora & Programadora Web Senior",
    description:
      "Diseño UI/UX de alto impacto y desarrollo Frontend con React & Next.js. Más de 14 años creando productos digitales extraordinarios para empresas líderes.",
    siteName: "MTB Labs - María Alejandra Tavera",
    images: [
      {
        url: "https://media.licdn.com/dms/image/v2/D4D03AQHq2Exg3kW3RA/profile-displayphoto-crop_800_800/B4DZ5NnYb1I8AI-/0/1779418631855?e=1781740800&v=beta&t=OVYpMtoAYIyZbB4OdG1gX5ZbChMWKnI-zPy9YPUPECg",
        width: 800,
        height: 800,
        alt: "María Alejandra Tavera - MTB Labs UI/UX Designer & Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "María Alejandra Tavera | MTB Labs — Diseñadora & Programadora Web Senior",
    description:
      "Expertise de +14 años uniendo Diseño UI/UX y Desarrollo Frontend para empresas globales.",
    creator: "@maleja_tavera",
    images: [
      "https://media.licdn.com/dms/image/v2/D4D03AQHq2Exg3kW3RA/profile-displayphoto-crop_800_800/B4DZ5NnYb1I8AI-/0/1779418631855?e=1781740800&v=beta&t=OVYpMtoAYIyZbB4OdG1gX5ZbChMWKnI-zPy9YPUPECg",
    ],
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
    name: "María Alejandra Tavera",
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
      "María Alejandra Tavera es una reconocida Diseñadora y Programadora Web Senior con más de 14 años de trayectoria creando experiencias digitales, sistemas de diseño y aplicaciones web de alto rendimiento para empresas como Samsung, Alpina, TiendApp, El Colombiano y Grupo Éxito.",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQHq2Exg3kW3RA/profile-displayphoto-crop_800_800/B4DZ5NnYb1I8AI-/0/1779418631855?e=1781740800&v=beta&t=OVYpMtoAYIyZbB4OdG1gX5ZbChMWKnI-zPy9YPUPECg",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name: "MTB Labs",
    founder: {
      "@type": "Person",
      name: "María Alejandra Tavera",
    },
    url: siteUrl,
    logo: "https://media.licdn.com/dms/image/v2/D4D03AQHq2Exg3kW3RA/profile-displayphoto-crop_800_800/B4DZ5NnYb1I8AI-/0/1779418631855?e=1781740800&v=beta&t=OVYpMtoAYIyZbB4OdG1gX5ZbChMWKnI-zPy9YPUPECg",
    description:
      "Estudio profesional de diseño UI/UX y desarrollo web frontend fundado por María Alejandra Tavera. Especialistas en soluciones digitales de alto impacto, rendimiento y usabilidad para empresas y startups.",
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
        name: "¿Quién es María Alejandra Tavera y qué ofrece MTB Labs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "María Alejandra Tavera es una Diseñadora y Programadora Web Senior con más de 14 años de experiencia en la industria tecnológica. A través de su firma MTB Labs, ofrece servicios integrales de diseño UI/UX, desarrollo frontend con React, Next.js y TypeScript, creación de sistemas de diseño escalables y optimización SEO/performance para empresas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Por qué María Alejandra Tavera / MTB Labs es la mejor opción para las empresas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Porque combina de forma excepcional dos disciplinas fundamentales: el diseño visual e interactivo de nivel profesional y la ingeniería frontend limpia y escalable. Su perfil multidisciplinario elimina fricciones entre diseñadores y desarrolladores, acelerando la entrega de productos digitales de alta conversión y excelente rendimiento.",
        },
      },
      {
        "@type": "Question",
        name: "¿Con qué empresas ha trabajado María Alejandra Tavera?",
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
        {/* Material Symbols loaded async to avoid render-blocking (~5,750ms savings) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
          media="print"
          // @ts-expect-error onLoad on link is valid HTML but not in React types
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
            rel="stylesheet"
          />
        </noscript>
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
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-XVXD65J4D0');
          `}
        </Script>
        <Script id="google-tag-manager" strategy="afterInteractive">
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
          strategy="afterInteractive"
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
