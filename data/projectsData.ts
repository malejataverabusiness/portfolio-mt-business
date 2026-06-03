export interface ProjectDetail {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    role: string;
    technologies: string[];
    liveUrl: string;
    accentColor: string;
    heroGradient: string;
    images: { src: string; alt: string }[];
    features: { icon: string; title: string; description: string }[];
    metrics?: { value: string; label: string }[];
}

export const projects = [
    {
        id: 100,
        slug: "tiendapp",
        title: "TiendApp",
        category: "Web Design, UI/UX, SaaS Platform",
        image: "https://www.tiendapp.co/web/image/2089-8a03e6d2/mockup-sav.svg",
        description: "Plataforma omnicanal de automatización comercial con I.A. — Diseño del sitio web y 4 productos digitales.",
        link: "https://www.tiendapp.co/",
        internalLink: "/tiendapp",
        featured: true
    },
    {
        id: 101,
        slug: "santuario",
        title: "Santuario App",
        category: "UI/UX Design, Front-end Development",
        image: "/santuario/mockup-sos.png",
        description: "Aplicación móvil de regulación emocional y bienestar mental — Tu espacio para respirar.",
        link: "https://santuario-app-sigma.vercel.app/",
        internalLink: "/santuario",
        featured: true
    },
    {
        id: 1,
        slug: "cabana-alpina",
        title: "Cabaña Alpina",
        category: "Graphic Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/10a7c3241831361.Y3JvcCwxNjI3LDEyNzIsMCwxNTQy.png",
        description: "Digital experience design for Cabaña Alpina.",
        link: "https://www.behance.net/gallery/241831361/Cabana-Alpina",
        internalLink: "/projects/cabana-alpina"
    },
    {
        id: 2,
        slug: "upcard",
        title: "Landing UpCard",
        category: "Graphic Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/2b234f241829125.Y3JvcCw0MzIwLDMzNzksMCww.jpg",
        description: "Landing page design for UpCard fintech solution.",
        link: "https://www.behance.net/gallery/241829125/Landing-UpCard",
        internalLink: "/projects/upcard"
    },
    {
        id: 3,
        slug: "piezas-graficas-nova",
        title: "Piezas Gráficas Digitales - Nova",
        category: "Web Design, Branding, Fashion",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/e01900239353155.Y3JvcCwxMDgwLDg0NCwwLDIzMg.png",
        description: "Digital graphic assets and branding for Nova.",
        link: "https://www.behance.net/gallery/239353155/Piezas-Graficas-Digitales-Nova",
        internalLink: "/projects/piezas-graficas-nova"
    },
    {
        id: 4,
        slug: "sitio-web-ecommerce",
        title: "Sitio web E-commerce",
        category: "Graphic Design, Advertising, Product Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/298ccc196617331.Y3JvcCwyODc4LDIyNTEsMCw1MzY0.png",
        description: "Comprehensive e-commerce website design.",
        link: "https://www.behance.net/gallery/196617331/Sitio-web-E-commerce",
        internalLink: "/projects/sitio-web-ecommerce"
    },
    {
        id: 5,
        slug: "mascothings-pet-furniture-store",
        title: "Mascothings - Pet Furniture Store",
        category: "Graphic Design, Illustration, Advertising",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/5aecf0185922065.Y3JvcCw0MjYxLDMzMzMsNTM3LDA.png",
        description: "Pet furniture store branding and web design.",
        link: "https://www.behance.net/gallery/185922065/Mascothings-Pet-Furniture-Store",
        internalLink: "/projects/mascothings-pet-furniture-store"
    },
    {
        id: 6,
        slug: "sitio-web-rethinking-agency",
        title: "Sitio web Rethinking Agency",
        category: "Graphic Design, Web Design, UI/UX",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/28f2ce175337617.Y3JvcCwyMDE1LDE1NzYsMCww.png",
        description: "Agency website redesign focusing on modern aesthetics.",
        link: "https://www.behance.net/gallery/175337617/Sitio-web-Rethinking-Agency",
        internalLink: "/projects/sitio-web-rethinking-agency"
    },
    {
        id: 7,
        slug: "eleden-candles-home-wellness",
        title: "Eleden - Candles & Home wellness",
        category: "Graphic Design, Photography, Advertising",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/ec4d0c185919873.Y3JvcCwxOTk5LDE1NjQsMCwyMTc.png",
        description: "Branding and web design for Eleden home wellness.",
        link: "https://www.behance.net/gallery/185919873/Eleden-Candles-Home-wellness",
        internalLink: "/projects/eleden-candles-home-wellness"
    },
    {
        id: 8,
        slug: "sitio-web-corez-inmobiliaria",
        title: "Sitio Web Corez Inmobiliaria",
        category: "Graphic Design, Photography, Advertising",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/d6f232149696815.Y3JvcCwyODgwLDIyNTIsMCw5MDY.png",
        description: "Real estate website design for Corez Inmobiliaria.",
        link: "https://www.behance.net/gallery/149696815/Sitio-Web-Corez-Inmobiliaria",
        internalLink: "/projects/sitio-web-corez-inmobiliaria"
    },
    {
        id: 9,
        slug: "sitio-web-juan-pablo-gomez",
        title: "Sitio Web Juan Pablo Gómez",
        category: "Photography, Graphic Design, Advertising",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/2da8e0149697561.Y3JvcCwyODgwLDIyNTIsMCww.png",
        description: "Personal portfolio website design.",
        link: "https://www.behance.net/gallery/149697561/Sitio-Web-Juan-Pablo-Gomez",
        internalLink: "/projects/sitio-web-juan-pablo-gomez"
    },
    {
        id: 10,
        slug: "signature-brand",
        title: "Signature Brand",
        category: "Photography, Graphic Design, Product Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/4d7810175334963.Y3JvcCw5ODIsNzY4LDM3MSww.png",
        description: "Brand identity design.",
        link: "https://www.behance.net/gallery/175334963/Signature-Brand",
        internalLink: "/projects/signature-brand"
    },
    {
        id: 11,
        slug: "posts-evento-the-carfest",
        title: "Posts - Evento The Carfest (Fiestas Sabaneta - Ant.)",
        category: "Graphic Design, Illustration, Photography",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/36d10d174575649.Y3JvcCwxMDgwLDg0NCwwLDIyMQ.png",
        description: "Social media posts for The Carfest event.",
        link: "https://www.behance.net/gallery/174575649/Posts-Evento-The-Carfest-(Fiestas-Sabaneta-Ant)",
        internalLink: "/projects/posts-evento-the-carfest"
    },
    {
        id: 12,
        slug: "hotel-parnassus",
        title: "Hotel Parnassus",
        category: "Web Design, UI/UX, Graphic Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/e0605471283379.Y3JvcCwxNTAwLDExNzMsMCwxNA.jpg",
        description: "Hotel branding and website concept.",
        link: "https://www.behance.net/gallery/71283379/Hotel-Parnassus",
        internalLink: "/projects/hotel-parnassus"
    },
    {
        id: 13,
        slug: "social-media-design",
        title: "Social Media Design",
        category: "Graphic Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/1ab121142608527.Y3JvcCwxNjAzLDEyNTQsMCwxOTg.png",
        description: "Creative social media design compilation.",
        link: "https://www.behance.net/gallery/142608527/Social-Media-Design",
        internalLink: "/projects/social-media-design"
    },
    {
        id: 14,
        slug: "rebranding-bbr",
        title: "Rebranding BBR",
        category: "Illustration, Graphic Design, Advertising",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/f1c4a6185921721.Y3JvcCwxNDM4LDExMjUsMzIsMA.png",
        description: "Rebranding project for BBR.",
        link: "https://www.behance.net/gallery/185921721/Rebranding-BBR",
        internalLink: "/projects/rebranding-bbr"
    },
    {
        id: 15,
        slug: "diseno-seccion-perfil",
        title: "Diseño Sección Perfil",
        category: "Graphic Design, Interaction Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/0cd883142608059.Y3JvcCwxNDQwLDExMjYsMCww.png",
        description: "User profile section UI design.",
        link: "https://www.behance.net/gallery/142608059/Diseno-Seccion-Perfil",
        internalLink: "/projects/diseno-seccion-perfil"
    },
    {
        id: 16,
        slug: "diseno-interna-recetas",
        title: "Diseño Interna Recetas",
        category: "Graphic Design, Interaction Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/cd8ac9142608003.Y3JvcCwxNDQwLDExMjYsMCww.png",
        description: "Recipe inner page UI design.",
        link: "https://www.behance.net/gallery/142608003/Diseno-Interna-Recetas",
        internalLink: "/projects/diseno-interna-recetas"
    },
    {
        id: 17,
        slug: "email-marketing",
        title: "Email Marketing",
        category: "Graphic Design, Interaction Design, Advertising",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/7ae800142607825.Y3JvcCwxMDgwLDg0NCwwLDA.png",
        description: "Email marketing campaign designs.",
        link: "https://www.behance.net/gallery/142607825/Email-Marketing",
        internalLink: "/projects/email-marketing"
    },
    {
        id: 18,
        slug: "copper-home-store-branding",
        title: "Copper Home Store - Branding",
        category: "Graphic Design, Photography, Product Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/2cdc09142190917.Y3JvcCwxNzA0LDEzMzMsMTQ3LDA.png",
        description: "Branding for Copper Home Store.",
        link: "https://www.behance.net/gallery/142190917/Copper-Home-Store-Branding",
        internalLink: "/projects/copper-home-store-branding"
    },
    {
        id: 19,
        slug: "diseno-e-implementacion-de-landing-page",
        title: "Diseño e Implementación de Landing Page",
        category: "Painting, Digital Painting, Programming",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/394b10138656605.Y3JvcCwxMjgwLDEwMDEsMCww.png",
        description: "Landing page design and implementation.",
        link: "https://www.behance.net/gallery/138656605/Diseno-e-Implementacion-de-Landing-Page",
        internalLink: "/projects/diseno-e-implementacion-de-landing-page"
    },
    {
        id: 20,
        slug: "diseno-teatro-virtual-fundacion-prolirica-de-antioquia",
        title: "Diseño Teatro Virtual Fundación Prolírica de Antioquia",
        category: "Graphic Design, Programming, Interaction Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/baaf56138656181.Y3JvcCwxMDgwLDg0NSwzMTIsMTA0.png",
        description: "Virtual theater design for Prolírica Foundation.",
        link: "https://www.behance.net/gallery/138656181/Diseno-Teatro-Virtual-Fundacion-Prolirica-de-Antioquia",
        internalLink: "/projects/diseno-teatro-virtual-fundacion-prolirica-de-antioquia"
    },
    {
        id: 21,
        slug: "diseno-sitio-web-kaskey",
        title: "Diseño Sitio Web Kaskey",
        category: "Graphic Design, Interaction Design, Architecture",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/e6cdae138655521.Y3JvcCwxNDQwLDExMjYsMCww.png",
        description: "Website design for Kaskey.",
        link: "https://www.behance.net/gallery/138655521/Diseno-Sitio-Web-Kaskey",
        internalLink: "/projects/diseno-sitio-web-kaskey"
    },
    {
        id: 22,
        slug: "diseno-editorial-para-proyecto-de-bien-social-ceff",
        title: "Diseño Editorial para Proyecto de Bien Social - CEFF",
        category: "Photography, Graphic Design, Illustration",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/5efbf393976663.Y3JvcCwxNDgwLDExNTcsMTk0LDk4.jpg",
        description: "Editorial design for social good project CEFF.",
        link: "https://www.behance.net/gallery/93976663/Diseno-Editorial-para-Proyecto-de-Bien-Social-CEFF",
        internalLink: "/projects/diseno-editorial-para-proyecto-de-bien-social-ceff"
    },
    {
        id: 23,
        slug: "gran-fondo-quindio-strongman",
        title: "Gran Fondo Quindío - Strongman",
        category: "Illustration, Branding, Motion Graphics",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/e5c8a071283757.Y3JvcCw5MDMsNzA2LDE3LDMyNA.jpg",
        description: "Branding for Gran Fondo Quindío event.",
        link: "https://www.behance.net/gallery/71283757/Gran-Fondo-Quindio-Strongman",
        internalLink: "/projects/gran-fondo-quindio-strongman"
    },
    {
        id: 24,
        slug: "cueros-velez-home",
        title: "Cueros Vélez - Home",
        category: "Web Design, Branding, Fashion",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/fac4aa71283469.Y3JvcCwyODc2LDIyNTAsNjQsMA.jpg",
        description: "Home page design for Cueros Vélez.",
        link: "https://www.behance.net/gallery/71283469/Cueros-Vlez-Home",
        internalLink: "/projects/cueros-velez-home"
    },
    {
        id: 25,
        slug: "esensi",
        title: "Esensi",
        category: "Graphic Design, Web Design, UI/UX",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/fd847961513359.Y3JvcCwxNDAzLDEwOTgsMCw5Nw.png",
        description: "Design project for Esensi.",
        link: "https://www.behance.net/gallery/61513359/Esensi",
        internalLink: "/projects/esensi"
    },
    {
        id: 26,
        slug: "kotas",
        title: "+KOTAS",
        category: "Web Design, Graphic Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/1ad66556921227.Y3JvcCwxMTUzLDkwMiwxMzMsMA.png",
        description: "Branding and design for +KOTAS.",
        link: "https://www.behance.net/gallery/56921227/KOTAS",
        internalLink: "/projects/kotas"
    },
    {
        id: 27,
        slug: "grafty",
        title: "Grafty",
        category: "UI/UX, Web Design, Programming",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/2704aa56184131.Y3JvcCw5NzYsNzY0LDEyMCww.png",
        description: "Design project for Grafty.",
        link: "https://www.behance.net/gallery/56184131/Grafty",
        internalLink: "/projects/grafty"
    },
    {
        id: 28,
        slug: "fundacion-oyeme",
        title: "Fundación Óyeme",
        category: "Graphic Design, Web Design, UI/UX",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/a640f354515205.Y3JvcCw6ODcsNTM4LDcxLDE2OA.jpg",
        description: "Design for Fundación Óyeme.",
        link: "https://www.behance.net/gallery/54515205/Fundacion-Oyeme",
        internalLink: "/projects/fundacion-oyeme"
    },
    {
        id: 29,
        slug: "boamar-swimwear",
        title: "Boamar Swimwear",
        category: "UI/UX, Web Design, Graphic Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/91c1c753051803.Y3JvcCwxMDM0LDgwOSwzMjksMjU.jpg",
        description: "Design work for Boamar Swimwear.",
        link: "https://www.behance.net/gallery/53051803/Boamar-Swimwear",
        internalLink: "/projects/boamar-swimwear"
    },
    {
        id: 30,
        slug: "la-bottega-verde",
        title: "La Bottega Verde",
        category: "Web Design, UI/UX, Graphic Design",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/442b6953005159.Y3JvcCw5OTQsNzc4LDQ2LDk.jpg",
        description: "Branding for La Bottega Verde.",
        link: "https://www.behance.net/gallery/53005159/La-Bottega-Verde",
        internalLink: "/projects/la-bottega-verde"
    },
    {
        id: 31,
        slug: "vista-global",
        title: "Vista Global",
        category: "Web Design, UI/UX, Programming",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/687d1f43301295.Y3JvcCwxNDAzLDEwOTgsMCwzNA.jpg",
        description: "Design project for Vista Global.",
        link: "https://www.behance.net/gallery/43301295/Vista-Global",
        internalLink: "/projects/vista-global"
    }
];

export const projectDetails: Record<string, Omit<ProjectDetail, "slug">> = {
    "cabana-alpina": {
        title: "Cabaña Alpina",
        subtitle: "Branding & Experiencia de Usuario",
        description: "Diseño integral de la identidad de marca y experiencia de usuario digital para Cabaña Alpina. El proyecto unifica la tradición artesanal de los lácteos y repostería de alta calidad de Alpina con una interfaz web moderna, acogedora y optimizada para pedidos locales.",
        role: "Diseñadora Gráfica & UI/UX",
        technologies: ["Figma", "Adobe Illustrator", "Branding", "UI Design", "UX Research"],
        liveUrl: "https://www.behance.net/gallery/241831361/Cabana-Alpina",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1e1b2e 0%, #2d2640 50%, #3b3455 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/10a7c3241831361.Y3JvcCwxNjI3LDEyNzIsMCwxNTQy.png", alt: "Cabaña Alpina" }],
        features: [
            { icon: "palette", title: "Identidad Tradicional", description: "Fusión de elementos rústicos y tipografías cálidas para evocar el origen artesanal de la marca." },
            { icon: "restaurant_menu", title: "Menú Digital Interactivo", description: "Diseño del catálogo interactivo que facilita la visualización y personalización de postres y productos lácteos." },
            { icon: "shopping_basket", title: "Flujo de Compra Local", description: "Optimización de la experiencia de compra mobile-first para domicilios rápidos y recogida en tienda." }
        ]
    },
    "upcard": {
        title: "Landing UpCard",
        subtitle: "Fintech Landing Page Optimizada",
        description: "Diseño y optimización de conversión de la landing page de UpCard, una fintech innovadora dirigida a startups y jóvenes profesionales que buscan tarjetas corporativas sin fricciones. Se estructuró un onboarding claro y llamadas a la acción directas para maximizar la captación de leads.",
        role: "Diseñadora UI/UX",
        technologies: ["Figma", "Adobe Illustrator", "UX Writing", "Conversion Optimization (CRO)"],
        liveUrl: "https://www.behance.net/gallery/241829125/Landing-UpCard",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1a2332 0%, #243447 50%, #2e4058 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/2b234f241829125.Y3JvcCw0MzIwLDMzNzksMCww.jpg", alt: "Landing UpCard" }],
        features: [
            { icon: "conversion_path", title: "Optimización de Leads", description: "Estructuración en base a patrones de lectura rápidos para maximizar las suscripciones y solicitudes de tarjetas." },
            { icon: "security", title: "Mensajes de Confianza", description: "Integración de insignias de seguridad, testimonios y claridad en las tasas para un onboarding confiable." },
            { icon: "devices", title: "Diseño Ultra Responsivo", description: "Layout adaptado meticulosamente para dispositivos móviles, donde ocurre el 80% del tráfico fintech." }
        ]
    },
    "piezas-graficas-nova": {
        title: "Piezas Gráficas Digitales - Nova",
        subtitle: "Dirección de Arte & Diseño de Campañas",
        description: "Creación de la identidad visual digital y conjunto de piezas de publicidad digital para Nova, marca de moda contemporánea y de alta costura. Se diseñaron plantillas sofisticadas para redes sociales, anuncios pagados y contenido editorial enfocado en el minimalismo y el lujo.",
        role: "Diseño Gráfico & Dirección de Arte",
        technologies: ["Adobe Photoshop", "Figma", "Directing", "Social Media Layouts"],
        liveUrl: "https://www.behance.net/gallery/239353155/Piezas-Graficas-Digitales-Nova",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #2a2520 0%, #3d3027 50%, #504038 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/e01900239353155.Y3JvcCwxMDgwLDg0NCwwLDIzMg.png", alt: "Piezas Gráficas Nova" }],
        features: [
            { icon: "photo_camera", title: "Estética Editorial", description: "Dirección visual centrada en el uso de espacios vacíos y tipografías serif elegantes para destacar los productos de moda." },
            { icon: "auto_awesome", title: "Identidad Dinámica", description: "Creación de layouts versátiles para stories, feeds e email marketing manteniendo una consistencia cromática." },
            { icon: "style", title: "Guías Estacionales", description: "Definición de paletas de color y contrastes acordes con cada colección anual de la marca." }
        ]
    },
    "sitio-web-ecommerce": {
        title: "Sitio web E-commerce",
        subtitle: "Diseño de Producto & E-commerce Integral",
        description: "Ecosistema de comercio electrónico a gran escala diseñado para ofrecer una navegación fluida, pasarelas de pago integradas sin fricción y una arquitectura de información intuitiva que simplifica la experiencia de compra.",
        role: "Diseñadora UI/UX Principal",
        technologies: ["Figma", "Web Design", "Wireframing", "User Testing"],
        liveUrl: "https://www.behance.net/gallery/196617331/Sitio-web-E-commerce",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1e2430 0%, #2a3040 50%, #3a4050 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/298ccc196617331.Y3JvcCwyODc4LDIyNTEsMCw1MzY0.png", alt: "Sitio Web E-commerce" }],
        features: [
            { icon: "shopping_cart", title: "Checkout en Tres Pasos", description: "Optimización del embudo de pago eliminando campos innecesarios para reducir el abandono de carrito." },
            { icon: "grid_view", title: "Filtros Avanzados", description: "Sistema interactivo de filtros de búsqueda que permite encontrar productos específicos en segundos." },
            { icon: "touch_app", title: "Interacciones Micro", description: "Feedback animado al añadir productos al carrito y marcar favoritos, mejorando el engagement." }
        ]
    },
    "mascothings-pet-furniture-store": {
        title: "Mascothings - Pet Furniture Store",
        subtitle: "Branding, Ilustración & E-commerce",
        description: "Branding integral y diseño web para Mascothings, una tienda de mobiliario premium para mascotas. El proyecto combinó la creación de ilustraciones vectoriales personalizadas y lúdicas con una plataforma de e-commerce limpia y moderna, comunicando amor y exclusividad.",
        role: "Diseño de Marca & Ilustración Web",
        technologies: ["Figma", "Adobe Illustrator", "Vector Illustration", "E-commerce Design"],
        liveUrl: "https://www.behance.net/gallery/185922065/Mascothings-Pet-Furniture-Store",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1f2937 0%, #334155 50%, #475569 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/5aecf0185922065.Y3JvcCw0MjYxLDMzMzMsNTM3LDA.png", alt: "Mascothings" }],
        features: [
            { icon: "pets", title: "Estilo Ilustrativo Lúdico", description: "Ilustraciones personalizadas de mascotas interactuando con los muebles para generar conexión emocional." },
            { icon: "style", title: "Identidad de Marca Exclusiva", description: "Logotipo y paleta de colores cálida y moderna que transmite confort, diseño y durabilidad." },
            { icon: "shopping_bag", title: "Ficha de Producto Detallada", description: "Visualización clara de medidas, materiales pet-friendly y guías de ensamblaje interactivo." }
        ]
    },
    "sitio-web-rethinking-agency": {
        title: "Sitio web Rethinking Agency",
        subtitle: "Rediseño Web Corporativo & UI/UX",
        description: "Rediseño visual y funcional del sitio web de Rethinking Agency. Con un estilo Dark Mode futurista y sofisticado, el sitio está optimizado para mostrar el portafolio creativo de la agencia con animaciones fluidas y layouts interactivos de alto rendimiento.",
        role: "Diseñadora Front-end & UI/UX",
        technologies: ["Figma", "React", "Framer Motion", "Tailwind CSS", "CSS Grid"],
        liveUrl: "https://www.behance.net/gallery/175337617/Sitio-web-Rethinking-Agency",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1a1f2e 0%, #2a3040 50%, #3a4558 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/28f2ce175337617.Y3JvcCwyMDE1LDE1NzYsMCww.png", alt: "Rethinking Agency" }],
        features: [
            { icon: "dark_mode", title: "Estilo Neo-brutalista Oscuro", description: "Layouts oscuros prémium con bordes definidos y acentos vibrantes de color neón." },
            { icon: "ads_click", title: "Transiciones Fluidas", description: "Animaciones de entrada y cambio de proyectos altamente interactivas e inmersivas." },
            { icon: "article", title: "Caso de Estudio Dinámico", description: "Estructuración visual de los proyectos de la agencia con foco en métricas y resultados." }
        ]
    },
    "eleden-candles-home-wellness": {
        title: "Eleden - Candles & Home wellness",
        subtitle: "Dirección de Arte, Packaging & Branding",
        description: "Dirección de arte, fotografía de producto y diseño de identidad de marca para Eleden. Se definió una línea editorial sofisticada y natural para el empaque de velas aromáticas y difusores de hogar, acompañada por una interfaz web de comercio electrónico minimalista.",
        role: "Dirección de Arte & Branding",
        technologies: ["Branding", "Packaging Design", "Product Photography", "Figma"],
        liveUrl: "https://www.behance.net/gallery/185919873/Eleden-Candles-Home-wellness",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #2d2428 0%, #3d3438 50%, #504548 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/ec4d0c185919873.Y3JvcCwxOTk5LDE1NjQsMCwyMTc.png", alt: "Eleden" }],
        features: [
            { icon: "spa", title: "Estética Minimalista Natural", description: "Uso de tonos tierra y papel texturizado para proyectar sustentabilidad, paz y bienestar." },
            { icon: "box", title: "Diseño de Packaging", description: "Planificación de cajas y etiquetas autoadhesivas con tipografías sans-serif refinadas y limpias." },
            { icon: "photo_camera", title: "Fotografía de Producto", description: "Estudio fotográfico enfocado en la iluminación natural y texturas de cera orgánica." }
        ]
    },
    "sitio-web-corez-inmobiliaria": {
        title: "Sitio Web Corez Inmobiliaria",
        subtitle: "Plataforma de Búsqueda Inmobiliaria",
        description: "Diseño de la experiencia interactiva del portal de Corez Inmobiliaria. Integra motores de búsqueda rápidos con mapas de ubicación, filtros dinámicos y fichas de propiedades optimizadas para facilitar el contacto directo con asesores.",
        role: "UI/UX & Web Design",
        technologies: ["Figma", "Web Design", "Map Integrations", "Wireframing"],
        liveUrl: "https://www.behance.net/gallery/149696815/Sitio-Web-Corez-Inmobiliaria",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1e2a2a 0%, #2a3a38 50%, #3a4a48 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/d6f232149696815.Y3JvcCwyODgwLDIyNTIsMCw5MDY.png", alt: "Corez Inmobiliaria" }],
        features: [
            { icon: "location_searching", title: "Buscador de Propiedades", description: "Filtros rápidos por tipo, zona, precio y servicios con carga de resultados inmediata." },
            { icon: "map", title: "Integración de Mapas", description: "Geolocalización interactiva de inmuebles destacando áreas de interés cercanas (colegios, parques, transporte)." },
            { icon: "support_agent", title: "Contacto Express", description: "Formularios integrados y accesos directos a chat de WhatsApp por propiedad." }
        ]
    },
    "sitio-web-juan-pablo-gomez": {
        title: "Sitio Web Juan Pablo Gómez",
        subtitle: "Portfolio Digital para Fotógrafo",
        description: "Concepción y diseño del portafolio digital premium para el fotógrafo profesional Juan Pablo Gómez. El sitio web destaca fotografías de gran formato mediante un diseño minimalista, galerías dinámicas en cuadrícula y fondos neutros que realzan el color.",
        role: "Diseño de Interfaz & Portfolio Layout",
        technologies: ["Figma", "Adobe Photoshop", "UX Design", "Image Systems"],
        liveUrl: "https://www.behance.net/gallery/149697561/Sitio-Web-Juan-Pablo-Gomez",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1e1b2e 0%, #2d2640 50%, #3b3455 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/2da8e0149697561.Y3JvcCwyODgwLDIyNTIsMCww.png", alt: "Juan Pablo Gómez" }],
        features: [
            { icon: "fullscreen", title: "Galerías Inmersivas", description: "Visualización de fotografías a pantalla completa con navegación mediante gestos o flechas." },
            { icon: "grid_view", title: "Masonry Grid Flexible", description: "Diseño adaptable que permite combinar formatos verticales y horizontales fluidamente." },
            { icon: "image", title: "Calidad de Imagen Sin Pérdidas", description: "Implementación técnica de carga optimizada para evitar retardos sin restar resolución a las tomas." }
        ]
    },
    "signature-brand": {
        title: "Signature Brand",
        subtitle: "Manual de Identidad & Branding Corporativo",
        description: "Desarrollo completo de la identidad corporativa de Signature Brand, una firma de consultoría y representación de alto perfil. Incluye el diseño del imagotipo responsivo, tipografías corporativas, papelería fina y manual técnico de aplicación de marca.",
        role: "Diseño de Branding & Identidad",
        technologies: ["Adobe Illustrator", "Corporate Branding", "Vector Design", "Editorial Design"],
        liveUrl: "https://www.behance.net/gallery/175334963/Signature-Brand",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1a2332 0%, #243447 50%, #2e4058 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/4d7810175334963.Y3JvcCw5ODIsNzY4LDM3MSww.png", alt: "Signature Brand" }],
        features: [
            { icon: "badge", title: "Imagotipo Adaptable", description: "Creación de un símbolo versátil apto para redes sociales, impresiones de micro-formato y banners." },
            { icon: "menu_book", title: "Manual de Directrices", description: "Guías detalladas de uso correcto de colores, márgenes de seguridad y aplicaciones tipográficas." },
            { icon: "print", title: "Papelería Premium", description: "Layouts listos para impresión de tarjetas personales, hojas membretadas y carpetas de presentación." }
        ]
    },
    "posts-evento-the-carfest": {
        title: "Posts - Evento The Carfest",
        subtitle: "Diseño Gráfico & Social Media Publicitario",
        description: "Diseño de la campaña de publicidad digital e impresos para el evento de automovilismo 'The Carfest' celebrado en Sabaneta. Se crearon banners, flyers informativos y piezas publicitarias dinámicas para Instagram y Facebook con un tono deportivo y de alta velocidad.",
        role: "Diseñadora Gráfica",
        technologies: ["Adobe Photoshop", "Adobe Illustrator", "Social Media Campaigns", "Advertising"],
        liveUrl: "https://www.behance.net/gallery/174575649/Posts-Evento-The-Carfest-(Fiestas-Sabaneta-Ant)",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #2a2520 0%, #3d3027 50%, #504038 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/36d10d174575649.Y3JvcCwxMDgwLDg0NCwwLDIyMQ.png", alt: "The Carfest" }],
        features: [
            { icon: "sports_motorsports", title: "Identidad Deportiva Extrema", description: "Uso de tipografías itálicas gruesas, texturas metálicas y contrastes en rojo fuego y negro." },
            { icon: "campaign", title: "Social Media Ads", description: "Estructuración de carruseles de programación del evento e información de inscripciones." },
            { icon: "directions_car", title: "Material Físico Cohesivo", description: "Diseño de banderines de pista, acreditaciones del personal y banners de entrada." }
        ]
    },
    "hotel-parnassus": {
        title: "Hotel Parnassus",
        subtitle: "Diseño Web de Hospitalidad & UI/UX",
        description: "Concepto y diseño visual de la experiencia web interactiva del Hotel Parnassus. El diseño combina la mitología clásica con la hospitalidad moderna, integrando un motor de búsqueda conceptual de reservas, paseos virtuales y visualización inmersiva de suites.",
        role: "Dirección Creativa & UI/UX",
        technologies: ["Figma", "Branding", "UI/UX Design", "Interactive Layouts"],
        liveUrl: "https://www.behance.net/gallery/71283379/Hotel-Parnassus",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1e2430 0%, #2a3040 50%, #3a4050 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/e0605471283379.Y3JvcCwxNTAwLDExNzMsMCwxNA.jpg", alt: "Hotel Parnassus" }],
        features: [
            { icon: "calendar_month", title: "Reservas Simplificadas", description: "Formularios de fecha y huéspedes integrados en la cabecera del sitio sin entorpecer la visual." },
            { icon: "bed", title: "Showroom de Habitaciones", description: "Módulos flotantes con detalles de servicios de lujo por tipo de habitación." },
            { icon: "explore", title: "Actividades Locales", description: "Sección dedicada a mostrar el día a día de las de forma lúdica." }
        ]
    },
    "social-media-design": {
        title: "Social Media Design",
        subtitle: "Recopilación de Diseño de Contenidos",
        description: "Portafolio de diseño de piezas publicitarias de alto engagement para múltiples clientes de consumo masivo y servicios. La colección abarca desde carruseles informativos de alto valor hasta portadas publicitarias y plantillas corporativas personalizadas.",
        role: "Diseñadora de Contenidos Digitales",
        technologies: ["Adobe Photoshop", "Adobe Illustrator", "Social Media Layouts", "Branding"],
        liveUrl: "https://www.behance.net/gallery/142608527/Social-Media-Design",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1f2937 0%, #334155 50%, #475569 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/1ab121142608527.Y3JvcCwxNjIzLDEyNTQsMCwxOTg.png", alt: "Social Media Design" }],
        features: [
            { icon: "forum", title: "Optimizado para Redes", description: "Layouts con alto porcentaje de lectura optimizando el uso de llamadas a la acción (CTAs)." },
            { icon: "auto_stories", title: "Diseño de Carruseles", description: "Creación de secuencias lógicas de imágenes que aumentan el tiempo de retención del usuario en la red social." },
            { icon: "bolt", title: "Entrega Dinámica", description: "Flujos de exportación rápida de activos optimizados para evitar pérdida de resolución por compresión." }
        ]
    },
    "rebranding-bbr": {
        title: "Rebranding BBR",
        subtitle: "Identidad Visual y Rediseño de Logotipo",
        description: "Rediseño completo de la marca BBR (distribuidora comercial). Se actualizó el logotipo clásico a un isotipo vectorial moderno y simplificado, integrando ilustraciones corporativas personalizadas y una guía de color limpia aplicable a vehículos de despacho y cajas.",
        role: "Diseño de Marca & Rebranding",
        technologies: ["Adobe Illustrator", "Corporate Identity", "Illustration", "Stationery Design"],
        liveUrl: "https://www.behance.net/gallery/185921721/Rebranding-BBR",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1a1f2e 0%, #2a3040 50%, #3a4558 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/f1c4a6185921721.Y3JvcCwxNDM8LDExMjUsMzIsMA.png", alt: "Rebranding BBR" }],
        features: [
            { icon: "cached", title: "Evolución de Logotipo", description: "Simplificación geométrica de la marca antigua para asegurar reproducibilidad digital y física." },
            { icon: "local_shipping", title: "Flotas de Despacho", description: "Diseño publicitario para furgones de carga respetando la nueva distribución visual." },
            { icon: "package", title: "Packaging Sencillo", description: "Rotulación limpia de empaques de distribución facilitando la identificación en bodegas." }
        ]
    },
    "diseno-seccion-perfil": {
        title: "Diseño Sección Perfil",
        subtitle: "UI/UX de Aplicación Web y Móvil",
        description: "Estructuración arquitectónica y diseño de interfaz (UI/UX) para la sección de perfil de usuario en una plataforma colaborativa creativa. El diseño se centró en facilitar la edición fluida, organizar los portafolios de los usuarios e integrar widgets dinámicos de conexión.",
        role: "UI/UX Designer",
        technologies: ["Figma", "User Flow", "Design Systems", "Prototyping"],
        liveUrl: "https://www.behance.net/gallery/142608059/Diseno-Seccion-Perfil",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #2d2428 0%, #3d3438 50%, #504548 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/0cd883142608059.Y3JvcCwxNDQwLDExMjYsMCww.png", alt: "Sección Perfil" }],
        features: [
            { icon: "edit", title: "Edición In-line", description: "Cambio ágil de biografía y enlaces directo en el perfil sin redirigir al panel de configuraciones." },
            { icon: "grid_on", title: "Showcase Modular", description: "Módulos drag-and-drop para que cada creador ordene visualmente sus mejores piezas." },
            { icon: "insights", title: "Estadísticas Rápidas", description: "Visualización limpia de visitas, descargas y likes a través de pequeños widgets adaptables." }
        ]
    },
    "diseno-interna-recetas": {
        title: "Diseño Interna Recetas",
        subtitle: "UI/UX Aplicada a la Cocina",
        description: "Diseño de la página interna detallada de recetas de cocina para una plataforma culinaria interactiva. La interfaz prioriza la lectura fluida en pantallas de tabletas y móviles con salpicaduras de agua, integrando conversión inteligente de porciones e instructivos paso a paso.",
        role: "UI/UX Designer",
        technologies: ["Figma", "UX Research", "Wireframing", "Mobile UI Design"],
        liveUrl: "https://www.behance.net/gallery/142608003/Diseno-Interna-Recetas",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1e2a2a 0%, #2a3a38 50%, #3a4a48 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/cd8ac9142608003.Y3JvcCwxNDQwLDExMjYsMCww.png", alt: "Interna Recetas" }],
        features: [
            { icon: "mic", title: "Modo Manos Libres", description: "Interfaz optimizada para la interacción por voz y gestos de proximidad para evitar tocar la pantalla al cocinar." },
            { icon: "calculate", title: "Conversor de Porciones", description: "Recálculo automático de medidas de ingredientes en base a la cantidad de comensales seleccionados." },
            { icon: "timer", title: "Timers por Etapa", description: "Temporizadores integrados directamente dentro de las instrucciones de texto que se activan con un toque." }
        ]
    },
    "email-marketing": {
        title: "Email Marketing",
        subtitle: "Diseño de Campañas & Conversión",
        description: "Creación de plantillas HTML y layouts gráficos optimizados para email marketing de alto rendimiento. El diseño combina jerarquía tipográfica, llamados a la acción directos y composiciones responsivas para garantizar legibilidad en móviles y altas tasas de clic.",
        role: "Diseñadora Digital & Email Strategist",
        technologies: ["Adobe Photoshop", "HTML/CSS", "Digital Campaigns", "UI Design"],
        liveUrl: "https://www.behance.net/gallery/142607825/Email-Marketing",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1e1b2e 0%, #2d2640 50%, #3b3455 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/7ae800142607825.Y3JvcCwxMDgwLDg0NCwwLDA.png", alt: "Email Marketing" }],
        features: [
            { icon: "touch_app", title: "CTAs Enfocados", description: "Botones contrastados y ubicados estratégicamente para dirigir la navegación del usuario al e-commerce." },
            { icon: "smartphone", title: "Diseño Híbrido", description: "Plantillas codificadas bajo estándares responsivos fluidos adaptados a clientes de correo como Gmail y Outlook." },
            { icon: "format_color_fill", title: "Jerarquía de Color", description: "Distribución de ofertas y cabeceras aplicando contrastes cromáticos llamativos." }
        ]
    },
    "copper-home-store-branding": {
        title: "Copper Home Store - Branding",
        subtitle: "Identidad Corporativa & Packaging",
        description: "Diseño del sistema de branding y marca gráfica para 'Copper Home Store', una boutique de decoración interior de alta gama. El branding incluye logotipos limpios, manuales de marca, empaques ecológicos y etiquetas que evocan metalurgia y elegancia.",
        role: "Diseño de Branding",
        technologies: ["Adobe Illustrator", "Brand Identity", "Packaging", "Figma"],
        liveUrl: "https://www.behance.net/gallery/142190917/Copper-Home-Store-Branding",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1a2332 0%, #243447 50%, #2e4058 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/2cdc09142190917.Y3JvcCwxNzA0LDEzMzMsMTQ3LDA.png", alt: "Copper Home Store" }],
        features: [
            { icon: "texture", title: "Texturas de Cobre", description: "Inclusión de tramas metalizadas en bolsas y manuales para transmitir exclusividad artesanal." },
            { icon: "category", title: "Packaging Elegante", description: "Diseño de etiquetas y cintas de cierre utilizando papeles ecológicos craft." },
            { icon: "style", title: "Estilo Tipográfico", description: "Selección de fuentes serif clásicas balanceadas con sans-serif modernas para una identidad duradera." }
        ]
    },
    "diseno-e-implementacion-de-landing-page": {
        title: "Diseño e Implementación de Landing Page",
        subtitle: "Landing Page Informativa & Desarrollo",
        description: "Creación de un landing page corporativo de alto rendimiento destinado a servicios tecnológicos. Además de un diseño visual limpio con acentos tecnológicos, se programó con código optimizado (SEO), micro-animaciones dinámicas y formularios interactivos seguros.",
        role: "Diseñadora & Desarrolladora Web",
        technologies: ["HTML5", "CSS3", "JavaScript", "SEO", "Responsive Development"],
        liveUrl: "https://www.behance.net/gallery/138656605/Diseno-e-Implementacion-de-Landing-Page",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #2a2520 0%, #3d3027 50%, #504038 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/394b10138656605.Y3JvcCwxMjgwLDEwMDEsMCww.png", alt: "Landing Page" }],
        features: [
            { icon: "code", title: "Desarrollo Semántico", description: "Código limpio y estructurado cumpliendo con buenas prácticas de velocidad de carga." },
            { icon: "ads_click", title: "Captación Inmediata", description: "Formularios de contacto flotantes y modales interactivos para retener al usuario." },
            { icon: "speed", title: "Carga Ligera", description: "Imágenes optimizadas y código JS reducido para obtener puntajes altos de LCP en Lighthouse." }
        ]
    },
    "diseno-teatro-virtual-fundacion-prolirica-de-antioquia": {
        title: "Diseño Teatro Virtual Fundación Prolírica de Antioquia",
        subtitle: "Diseño Front-end & UX en Pandemia",
        description: "Diseño y desarrollo de la plataforma web de 'Teatro Virtual' para la Fundación Prolírica de Antioquia. Este espacio inmersivo permitió transmitir óperas en vivo, adquirir pases digitales de manera segura e interactuar virtualmente con la sala teatral durante el confinamiento.",
        role: "Diseñadora Front-end & UX",
        technologies: ["Figma", "HTML5", "CSS3", "JavaScript", "Interactive Map Design"],
        liveUrl: "https://www.behance.net/gallery/138656181/Diseno-Teatro-Virtual-Fundacion-Prolirica-de-Antioquia",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1e2430 0%, #2a3040 50%, #3a4050 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/baaf56138656181.Y3JvcCwxMDgwLDg0NSwzMTIsMTA0.png", alt: "Teatro Virtual Prolírica" }],
        features: [
            { icon: "theater_comedy", title: "Sala Virtual Inmersiva", description: "Simulación digital de la distribución de asientos de teatro para compra interactiva de entradas." },
            { icon: "videocam", title: "Integración Streaming", description: "Estructuración de reproductores protegidos para evitar grabaciones y asegurar una visualización HD fluida." },
            { icon: "local_activity", title: "Tickets PDF Automatizados", description: "Sistema automático de envío de boletos en PDF tras completar la transacción." }
        ]
    },
    "diseno-sitio-web-kaskey": {
        title: "Diseño Sitio Web Kaskey",
        subtitle: "UI/UX para Estudio de Arquitectura",
        description: "Diseño web de la experiencia del portafolio digital de Kaskey, un estudio boutique de arquitectura e interiorismo. La interfaz prioriza las fotografías de gran formato, planos interactivos y tipografías elegantes para transmitir orden y diseño geométrico.",
        role: "UI/UX Designer",
        technologies: ["Figma", "UI/UX Design", "Architectural Layouts", "Web Design"],
        liveUrl: "https://www.behance.net/gallery/138655521/Diseno-Sitio-Web-Kaskey",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1f2937 0%, #334155 50%, #475569 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/e6cdae138655521.Y3JvcCwxNDQwLDExMjYsMCww.png", alt: "Sitio Web Kaskey" }],
        features: [
            { icon: "architecture", title: "Líneas de Diseño Limpias", description: "Estilo estructurado simulando los cuadernos de dibujo de un arquitecto." },
            { icon: "layers", title: "Planos Interactivos", description: "Superposición de bocetos y planos reales sobre las fotos finales de las obras mediante transiciones de cursor." },
            { icon: "image", title: "Visualización Horizontal", description: "Galerías con scroll horizontal diseñadas para emular una revista editorial física." }
        ]
    },
    "diseno-editorial-para-proyecto-de-bien-social-ceff": {
        title: "Diseño Editorial para Proyecto de Bien Social - CEFF",
        subtitle: "Diagramación & Ilustración Educativa",
        description: "Dirección artística, diseño de personajes y diagramación editorial de cartillas didácticas para la fundación ambiental CEFF. Se estructuró un lenguaje visual de fácil comprensión, con ilustraciones vectoriales amigables orientadas a educar comunidades locales en temas de biodiversidad.",
        role: "Diseñadora Editorial",
        technologies: ["Adobe InDesign", "Adobe Illustrator", "Editorial Illustration", "Branding"],
        liveUrl: "https://www.behance.net/gallery/93976663/Diseno-Editorial-para-Proyecto-de-Bien-Social-CEFF",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1a1f2e 0%, #2a3040 50%, #3a4558 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/5efbf393976663.Y3JvcCwxNDgwLDExNTcsMTk0LDk4.jpg", alt: "Editorial CEFF" }],
        features: [
            { icon: "menu_book", title: "Diagramación Limpia", description: "Organización de textos extensos en bloques y recuadros coloridos para evitar la fatiga visual." },
            { icon: "draw", title: "Ilustración Didáctica", description: "Creación de infografías e ilustraciones de animales y plantas nativas adaptadas a un público infantil." },
            { icon: "print", title: "Control de Color para Imprenta", description: "Preparación de archivos en perfil CMYK con sangrados para imprentas industriales." }
        ]
    },
    "gran-fondo-quindio-strongman": {
        title: "Gran Fondo Quindío - Strongman",
        subtitle: "Branding del Evento & Merchandising",
        description: "Diseño completo de la identidad corporativa y merchandising de la carrera de ciclismo de ruta Gran Fondo Quindío. Se diseñaron el logotipo, maillots (camisetas deportivas), material POP, vallas de meta y piezas publicitarias digitales, coordinando la estética deportiva nacional.",
        role: "Diseñadora Gráfica",
        technologies: ["Adobe Illustrator", "Branding", "Apparel Design", "Advertising"],
        liveUrl: "https://www.behance.net/gallery/71283757/Gran-Fondo-Quindio-Strongman",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #2d2428 0%, #3d3438 50%, #504548 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/e5c8a071283757.Y3JvcCw5MDMsNzA2LDE3LDMyNA.jpg", alt: "Gran Fondo Quindío" }],
        features: [
            { icon: "directions_bike", title: "Maillot Oficial del Evento", description: "Diseño de la indumentaria ciclista usando patrones y telas técnicas con la paleta deportiva de la carrera." },
            { icon: "flag", title: "Material de Competencia", description: "Vallas publicitarias, arcos de meta y señalizaciones de ruta kilométricas unificadas visualmente." },
            { icon: "auto_awesome", title: "Kits de Bienvenida", description: "Layouts de tulas, botellas de agua e instructivo impreso de carrera." }
        ]
    },
    "cueros-velez-home": {
        title: "Cueros Vélez - Home",
        subtitle: "Diseño de Interfaz E-commerce de Moda",
        description: "Dirección de UI/UX para el rediseño conceptual del Home del portal e-commerce de Cueros Vélez. El proyecto buscó reflejar la artesanía, el cuero premium y las tendencias de moda de la marca, estructurando secciones interactivas, sliders editoriales de campaña y accesibilidad optimizada.",
        role: "UI/UX Designer",
        technologies: ["Figma", "Design Systems", "E-commerce Layouts", "Branding"],
        liveUrl: "https://www.behance.net/gallery/71283469/Cueros-Vlez-Home",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1e2a2a 0%, #2a3a38 50%, #3a4a48 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/fac4aa71283469.Y3JvcCwyODc6LDIyNTAsNjQsMA.jpg", alt: "Cueros Vélez" }],
        features: [
            { icon: "style", title: "Línea Editorial de Lujo", description: "Integración fluida de videos de campaña y layouts editoriales que combinan producto e historia artesanal." },
            { icon: "dashboard", title: "Navegación Intuitiva", description: "Mega-menú interactivo optimizado para guiar al usuario por categorías de calzado, bolsos y ropa." },
            { icon: "loyalty", title: "Personalización B2C", description: "Cajas de recomendación de productos sugeridos basadas en visitas previas de clientes." }
        ]
    },
    "esensi": {
        title: "Esensi",
        subtitle: "Branding, UI/UX & E-commerce",
        description: "Identidad visual y diseño web para Esensi, un e-commerce y portal de bienestar enfocado en aceites esenciales y aromaterapia. Se creó una interfaz suave e inmersiva que evoca tranquilidad y naturaleza, optimizando la experiencia de compra de esencias.",
        role: "Diseñadora de Marca & UI/UX",
        technologies: ["Figma", "Adobe Illustrator", "E-commerce Strategy", "Web Design"],
        liveUrl: "https://www.behance.net/gallery/61513359/Esensi",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1e1b2e 0%, #2d2640 50%, #3b3455 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/fd847961513359.Y3JvcCwxNDAzLDEwOTgsMCw5Nw.png", alt: "Esensi" }],
        features: [
            { icon: "spa", title: "Diseño Sensorial", description: "Paleta de tonos pastel orgánicos combinada con espacios limpios que transmiten calma mental." },
            { icon: "quiz", title: "Buscador de Fragancias", description: "Breve test interactivo en la web para sugerir el aceite esencial según el estado de ánimo actual." },
            { icon: "shopping_basket", title: "Ficha Técnica Limpia", description: "Visualización rápida de propiedades terapéuticas e ingredientes orgánicos de cada esencia." }
        ]
    },
    "+KOTAS": {
        title: "+KOTAS",
        subtitle: "Diseño de Marca & Sitio Web",
        description: "Branding, diseño de personajes y sitio web interactivo para +KOTAS, un centro médico y guardería para mascotas. El proyecto proyecta confianza, cuidado especializado y alegría mediante ilustraciones lúdicas y un sistema de reserva de citas en línea sencillo.",
        role: "Diseñadora Web & Brand Creator",
        technologies: ["Adobe Illustrator", "Figma", "Brand Guidelines", "Web Design"],
        liveUrl: "https://www.behance.net/gallery/56921227/KOTAS",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1a2332 0%, #243447 50%, #2e4058 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/1ad66556921227.Y3JvcCwxMTUzLDkwMiwxMzMsMA.png", alt: "+KOTAS" }],
        features: [
            { icon: "pets", title: "Ilustraciones Amigables", description: "Diseño de simpáticos perros y gatos vectoriales integrados en la comunicación corporativa." },
            { icon: "calendar_today", title: "Agendamiento de Citas", description: "Integración de un widget de reservas con calendario interactivo para servicios veterinarios." },
            { icon: "photo_library", title: "Galería de Actividades", description: "Sección dedicada a mostrar el día a día de las mascotas en la guardería de forma lúdica." }
        ]
    },
    "grafty": {
        title: "Grafty",
        subtitle: "UI/UX de Aplicación Móvil",
        description: "Diseño conceptual de interfaz (UI/UX) de Grafty, una aplicación móvil orientada a pizarras colaborativas e ilustración remota en vivo para equipos creativos. La interfaz está especialmente optimizada para tablets, lápices ópticos e incluye menús flotantes minimalistas.",
        role: "Diseñadora de Interfaz de App",
        technologies: ["Figma", "Mobile UI Design", "Interaction Prototyping", "Design Systems"],
        liveUrl: "https://www.behance.net/gallery/56184131/Grafty",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #2a2520 0%, #3d3027 50%, #504038 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/2704aa56184131.Y3JvcCw5NzYsNzY4LDM3MSww.png", alt: "Grafty App" }],
        features: [
            { icon: "gesture", title: "Lápiz Optico Optimizado", description: "Sensibilidad y menús flotantes rápidos diseñados para evitar interferencias de la palma sobre la pantalla." },
            { icon: "group_work", title: "Lienzo Compartido", description: "Visualización en tiempo real de punteros e trazos de otros diseñadores conectados en el lienzo." },
            { icon: "dashboard_customize", title: "Panel de Capas", description: "Herramienta flotante compacta para control de capas, opacidad y colores rápida." }
        ]
    },
    "fundacion-oyeme": {
        title: "Fundación Óyeme",
        subtitle: "Diseño Web Accesible (WCAG)",
        description: "Diseño de la experiencia interactiva y desarrollo del sitio web institucional de la Fundación Óyeme (apoyo a personas con discapacidad auditiva). El desarrollo se centró rigurosamente en la accesibilidad web (WCAG 2.1 AA), asegurando navegación por teclado, alto contraste y transcripciones.",
        role: "UI/UX & Web Developer",
        technologies: ["HTML5", "CSS3", "JavaScript", "Accessibility (WCAG)", "SEO"],
        liveUrl: "https://www.behance.net/gallery/54515205/Fundacion-Oyeme",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1e2430 0%, #2a3040 50%, #3a4050 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/a640f354515205.Y3JvcCw2ODcsNTM4LDcxLDE2OA.jpg", alt: "Fundación Óyeme" }],
        features: [
            { icon: "hearing", title: "Accesibilidad Inclusiva", description: "Cumplimiento de estándares AA de contraste de texto, lector de pantalla alternativo y controles simples." },
            { icon: "videocam", title: "Videos Subtitulados", description: "Integración de intérprete de señas y subtítulos incrustados en todos los recursos interactivos de aprendizaje." },
            { icon: "local_hospital", title: "Donaciones Sencillas", description: "Onboarding transparente para aportantes mediante pasarelas de donación seguras integradas." }
        ]
    },
    "boamar-swimwear": {
        title: "Boamar Swimwear",
        subtitle: "Rediseño E-commerce Premium",
        description: "Rediseño visual e interfaz de usuario del e-commerce premium de trajes de baño de lujo Boamar Swimwear. La web destaca el color caribeño, la frescura costera de las colecciones y la fotografía editorial mediante una navegación elegante, filtros de tallas avanzados y procesos de pago rápidos.",
        role: "Diseñadora UI/UX",
        technologies: ["Figma", "Shopify Layouts", "E-commerce Strategy", "Digital Art"],
        liveUrl: "https://www.behance.net/gallery/53051803/Boamar-Swimwear",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1f2937 0%, #334155 50%, #475569 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/91c1c753051803.Y3JvcCwxMDM0LDgwOSwzMjksMjU.jpg", alt: "Boamar Swimwear" }],
        features: [
            { icon: "straighten", title: "Guía de Tallas Inteligente", description: "Interactivos flotantes detallados que ayudan a las compradoras a seleccionar el bikini ideal según sus medidas." },
            { icon: "photo_library", title: "Lookbooks Editoriales", description: "Sliders interactivos que permiten comprar los productos directamente desde las fotos del portafolio fotográfico." },
            { icon: "shopping_cart", title: "Checkout con Shopify", description: "Optimización de la pasarela de pago para acelerar compras internacionales." }
        ]
    },
    "la-bottega-verde": {
        title: "La Bottega Verde",
        subtitle: "Branding & E-commerce Orgánico",
        description: "Dirección de arte, manual de marca y diseño de interfaz para 'La Bottega Verde', un mercado local de alimentos naturales y productos residuo cero (zero-waste). El proyecto fomenta el consumo responsable mediante una identidad gráfica limpia, verde y natural.",
        role: "Diseño de Marca & Dirección Creativa",
        technologies: ["Figma", "Branding", "Vector Design", "E-commerce Layouts"],
        liveUrl: "https://www.behance.net/gallery/53005159/La-Bottega-Verde",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #1a1f2e 0%, #2a3040 50%, #3a4558 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/442b6953005159.Y3JvcCw5OTQsNzc4LDQ2LDk.jpg", alt: "La Bottega Verde" }],
        features: [
            { icon: "eco", title: "Conciencia Ecológica", description: "Uso de colores tierra y tipografías orgánicas para enfatizar la frescura de los cultivos y sostenibilidad." },
            { icon: "agriculture", title: "Filtros por Origen", description: "Opción de agrupar los vegetales y hortalizas según la granja local proveedora para incentivar el comercio justo." },
            { icon: "recycling", title: "Retornos de Envases", description: "Soporte interactivo para que los compradores programen la recogida de frascos y empaques retornables." }
        ]
    },
    "vista-global": {
        title: "Vista Global",
        subtitle: "Diseño Web Logístico & Desarrollo",
        description: "Concepción visual, UI/UX y programación front-end del sitio web de Vista Global, firma de logística de fletes aéreos y marítimos. Se diseñó un cotizador de envíos automatizado, integrando la API de tarifas y rastreadores dinámicos en tiempo real para sus importadores.",
        role: "Diseñadora Front-end & UX",
        technologies: ["HTML5", "CSS3", "JavaScript", "API Integration", "Web Design"],
        liveUrl: "https://www.behance.net/gallery/43301295/Vista-Global",
        accentColor: "#c9a0a0",
        heroGradient: "linear-gradient(135deg, #2d2428 0%, #3d3438 50%, #504548 100%)",
        images: [{ src: "https://mir-s3-cdn-cf.behance.net/projects/404/687d1f43301295.Y3JvcCwxNDAzLDEwOTgsMCwzNA.jpg", alt: "Vista Global" }],
        features: [
            { icon: "calculate", title: "Cotizador Integrado", description: "Formulario inteligente que calcula instantáneamente el flete estimado por peso, volumen y puerto." },
            { icon: "map", title: "Rastreo de Carga", description: "Mapeo visual de la ubicación física de contenedores y naves conectada con APIs marítimas." },
            { icon: "dashboard", title: "Panel de Importadores", description: "Sección privada donde cada cliente visualiza sus facturas y estado de aduanas." }
        ]
    }
};

export function getProjectBySlug(slug: string): ProjectDetail | null {
    const detail = projectDetails[slug];
    if (!detail) return null;
    return {
        slug,
        ...detail
    };
}

export function getAllProjectSlugs(): string[] {
    return Object.keys(projectDetails);
}

export const projectTranslations: Record<string, {
    title: { en: string; es: string };
    category: { en: string; es: string };
    description: { en: string; es: string };
}> = {
    "tiendapp": {
        title: { en: "TiendApp", es: "TiendApp" },
        category: { en: "Web Design, UI/UX, SaaS Platform", es: "Diseño Web, UI/UX, Plataforma SaaS" },
        description: {
            en: "Omnichannel commercial automation platform with A.I. — Website design and 4 digital products.",
            es: "Plataforma omnicanal de automatización comercial con I.A. — Diseño del sitio web y 4 productos digitales."
        }
    },
    "santuario": {
        title: { en: "Santuario App", es: "Santuario App" },
        category: { en: "UI/UX Design, Front-end Development", es: "Diseño UI/UX, Desarrollo Front-end" },
        description: {
            en: "Mobile emotional regulation and mental well-being app — Your space to breathe.",
            es: "Aplicación móvil de regulación emocional y bienestar mental — Tu espacio para respirar."
        }
    },
    "cabana-alpina": {
        title: { en: "Cabaña Alpina", es: "Cabaña Alpina" },
        category: { en: "Graphic Design", es: "Diseño Gráfico" },
        description: {
            en: "Digital experience design for Cabaña Alpina.",
            es: "Diseño de experiencia digital para Cabaña Alpina."
        }
    },
    "upcard": {
        title: { en: "Landing UpCard", es: "Landing UpCard" },
        category: { en: "Graphic Design", es: "Diseño Gráfico" },
        description: {
            en: "Landing page design for UpCard fintech solution.",
            es: "Diseño de landing page para la solución fintech UpCard."
        }
    },
    "piezas-graficas-nova": {
        title: { en: "Digital Graphic Assets - Nova", es: "Piezas Gráficas Digitales - Nova" },
        category: { en: "Web Design, Branding, Fashion", es: "Diseño Web, Branding, Moda" },
        description: {
            en: "Digital graphic assets and branding for Nova.",
            es: "Activos gráficos digitales y branding para Nova."
        }
    },
    "sitio-web-ecommerce": {
        title: { en: "E-commerce Website", es: "Sitio web E-commerce" },
        category: { en: "Graphic Design, Advertising, Product Design", es: "Diseño Gráfico, Publicidad, Diseño de Producto" },
        description: {
            en: "Comprehensive e-commerce website design.",
            es: "Diseño de sitio web para comercio electrónico."
        }
    },
    "mascothings-pet-furniture-store": {
        title: { en: "Mascothings - Pet Furniture Store", es: "Mascothings - Pet Furniture Store" },
        category: { en: "Graphic Design, Illustration, Advertising", es: "Diseño Gráfico, Ilustración, Publicidad" },
        description: {
            en: "Pet furniture store branding and web design.",
            es: "Diseño web y branding para tienda de muebles de mascotas."
        }
    },
    "sitio-web-rethinking-agency": {
        title: { en: "Rethinking Agency Website", es: "Sitio web Rethinking Agency" },
        category: { en: "Graphic Design, Web Design, UI/UX", es: "Diseño Gráfico, Diseño Web, UI/UX" },
        description: {
            en: "Agency website redesign focusing on modern aesthetics.",
            es: "Rediseño del sitio web de la agencia enfocado en una estética moderna."
        }
    },
    "eleden-candles-home-wellness": {
        title: { en: "Eleden - Candles & Home Wellness", es: "Eleden - Candles & Home wellness" },
        category: { en: "Graphic Design, Photography, Advertising", es: "Diseño Gráfico, Fotografía, Publicidad" },
        description: {
            en: "Branding and web design for Eleden home wellness.",
            es: "Diseño web y branding para Eleden Home Wellness."
        }
    },
    "sitio-web-corez-inmobiliaria": {
        title: { en: "Corez Real Estate Website", es: "Sitio Web Corez Inmobiliaria" },
        category: { en: "Graphic Design, Photography, Advertising", es: "Diseño Gráfico, Fotografía, Publicidad" },
        description: {
            en: "Real estate website design for Corez Inmobiliaria.",
            es: "Diseño de sitio web inmobiliario para Corez Inmobiliaria."
        }
    },
    "sitio-web-juan-pablo-gomez": {
        title: { en: "Juan Pablo Gómez Website", es: "Sitio Web Juan Pablo Gómez" },
        category: { en: "Photography, Graphic Design, Advertising", es: "Fotografía, Diseño Gráfico, Publicidad" },
        description: {
            en: "Personal portfolio website design.",
            es: "Diseño de portafolio web personal."
        }
    },
    "signature-brand": {
        title: { en: "Signature Brand", es: "Signature Brand" },
        category: { en: "Photography, Graphic Design, Product Design", es: "Fotografía, Diseño Gráfico, Diseño de Producto" },
        description: {
            en: "Brand identity design.",
            es: "Diseño de identidad de marca."
        }
    },
    "posts-evento-the-carfest": {
        title: { en: "The Carfest Event Posts", es: "Posts - Evento The Carfest (Fiestas Sabaneta - Ant.)" },
        category: { en: "Graphic Design, Illustration, Photography", es: "Diseño Gráfico, Ilustración, Fotografía" },
        description: {
            en: "Social media posts for The Carfest event.",
            es: "Publicaciones en redes sociales para el evento The Carfest."
        }
    },
    "hotel-parnassus": {
        title: { en: "Hotel Parnassus", es: "Hotel Parnassus" },
        category: { en: "Web Design, UI/UX, Graphic Design", es: "Diseño Web, UI/UX, Diseño Gráfico" },
        description: {
            en: "Hotel branding and website concept.",
            es: "Branding y concepto web para hotel."
        }
    },
    "social-media-design": {
        title: { en: "Social Media Design", es: "Social Media Design" },
        category: { en: "Graphic Design", es: "Diseño Gráfico" },
        description: {
            en: "Creative social media design compilation.",
            es: "Recopilación de diseño creativo para redes sociales."
        }
    },
    "rebranding-bbr": {
        title: { en: "Rebranding BBR", es: "Rebranding BBR" },
        category: { en: "Illustration, Graphic Design, Advertising", es: "Ilustración, Diseño Gráfico, Publicidad" },
        description: {
            en: "Rebranding project for BBR.",
            es: "Proyecto de rebranding para BBR."
        }
    },
    "diseno-seccion-perfil": {
        title: { en: "Profile Section Design", es: "Diseño Sección Perfil" },
        category: { en: "Graphic Design, Interaction Design", es: "Diseño Gráfico, Diseño de Interacción" },
        description: {
            en: "User profile section UI design.",
            es: "Diseño de interfaz para sección de perfil de usuario."
        }
    },
    "diseno-interna-recetas": {
        title: { en: "Recipe Page Design", es: "Diseño Interna Recetas" },
        category: { en: "Graphic Design, Interaction Design", es: "Diseño Gráfico, Diseño de Interacción" },
        description: {
            en: "Recipe inner page UI design.",
            es: "Diseño de interfaz para página de recetas."
        }
    },
    "email-marketing": {
        title: { en: "Email Marketing", es: "Email Marketing" },
        category: { en: "Graphic Design, Interaction Design, Advertising", es: "Diseño Gráfico, Diseño de Interacción, Publicidad" },
        description: {
            en: "Email marketing campaign designs.",
            es: "Diseños de campañas de email marketing."
        }
    },
    "copper-home-store-branding": {
        title: { en: "Copper Home Store - Branding", es: "Copper Home Store - Branding" },
        category: { en: "Graphic Design, Photography, Product Design", es: "Diseño Gráfico, Fotografía, Diseño de Producto" },
        description: {
            en: "Branding for Copper Home Store.",
            es: "Branding para Copper Home Store."
        }
    },
    "diseno-e-implementacion-de-landing-page": {
        title: { en: "Landing Page Design & Implementation", es: "Diseño e Implementación de Landing Page" },
        category: { en: "Painting, Digital Painting, Programming", es: "Pintura, Pintura Digital, Programación" },
        description: {
            en: "Landing page design and implementation.",
            es: "Diseño e implementación de landing page."
        }
    },
    "diseno-teatro-virtual-fundacion-prolirica-de-antioquia": {
        title: { en: "Virtual Theater Design - Prolírica Foundation", es: "Diseño Teatro Virtual Fundación Prolírica de Antioquia" },
        category: { en: "Graphic Design, Programming, Interaction Design", es: "Diseño Gráfico, Programación, Diseño de Interacción" },
        description: {
            en: "Virtual theater design for Prolírica Foundation.",
            es: "Diseño de teatro virtual para la Fundación Prolírica."
        }
    },
    "diseno-sitio-web-kaskey": {
        title: { en: "Kaskey Website Design", es: "Diseño Sitio Web Kaskey" },
        category: { en: "Graphic Design, Interaction Design, Architecture", es: "Diseño Gráfico, Diseño de Interacción, Arquitectura" },
        description: {
            en: "Website design for Kaskey.",
            es: "Diseño de sitio web para Kaskey."
        }
    },
    "diseno-editorial-para-proyecto-de-bien-social-ceff": {
        title: { en: "Editorial Design for Social Good Project - CEFF", es: "Diseño Editorial para Proyecto de Bien Social - CEFF" },
        category: { en: "Photography, Graphic Design, Illustration", es: "Fotografía, Diseño Gráfico, Ilustración" },
        description: {
            en: "Editorial design for social good project CEFF.",
            es: "Diseño editorial para el proyecto de bien social CEFF."
        }
    },
    "gran-fondo-quindio-strongman": {
        title: { en: "Gran Fondo Quindío - Strongman", es: "Gran Fondo Quindío - Strongman" },
        category: { en: "Illustration, Branding, Motion Graphics", es: "Ilustración, Branding, Motion Graphics" },
        description: {
            en: "Branding for Gran Fondo Quindío event.",
            es: "Branding para el evento Gran Fondo Quindío."
        }
    },
    "cueros-velez-home": {
        title: { en: "Cueros Vélez - Home", es: "Cueros Vélez - Home" },
        category: { en: "Web Design, Branding, Fashion", es: "Diseño Web, Branding, Moda" },
        description: {
            en: "Home page design for Cueros Vélez.",
            es: "Diseño de página de inicio para Cueros Vélez."
        }
    },
    "esensi": {
        title: { en: "Esensi", es: "Esensi" },
        category: { en: "Graphic Design, Web Design, UI/UX", es: "Diseño Gráfico, Diseño Web, UI/UX" },
        description: {
            en: "Design project for Esensi.",
            es: "Proyecto de diseño para Esensi."
        }
    },
    "kotas": {
        title: { en: "+Kotas", es: "+KOTAS" },
        category: { en: "Web Design, Graphic Design", es: "Diseño Web, Diseño Gráfico" },
        description: {
            en: "Branding and design for +KOTAS.",
            es: "Branding y diseño para +KOTAS."
        }
    },
    "grafty": {
        title: { en: "Grafty", es: "Grafty" },
        category: { en: "UI/UX, Web Design, Programming", es: "UI/UX, Diseño Web, Programación" },
        description: {
            en: "Design project for Grafty.",
            es: "Proyecto de diseño para Grafty."
        }
    },
    "fundacion-oyeme": {
        title: { en: "Óyeme Foundation", es: "Fundación Óyeme" },
        category: { en: "Graphic Design, Web Design, UI/UX", es: "Diseño Gráfico, Diseño Web, UI/UX" },
        description: {
            en: "Design for Óyeme Foundation.",
            es: "Diseño para la Fundación Óyeme."
        }
    },
    "boamar-swimwear": {
        title: { en: "Boamar Swimwear", es: "Boamar Swimwear" },
        category: { en: "UI/UX, Web Design, Graphic Design", es: "UI/UX, Diseño Web, Diseño Gráfico" },
        description: {
            en: "Design work for Boamar Swimwear.",
            es: "Trabajo de diseño para Boamar Swimwear."
        }
    },
    "la-bottega-verde": {
        title: { en: "La Bottega Verde", es: "La Bottega Verde" },
        category: { en: "Web Design, UI/UX, Graphic Design", es: "Diseño Web, UI/UX, Diseño Gráfico" },
        description: {
            en: "Branding for La Bottega Verde.",
            es: "Branding para La Bottega Verde."
        }
    },
    "vista-global": {
        title: { en: "Vista Global", es: "Vista Global" },
        category: { en: "Web Design, UI/UX, Programming", es: "Diseño Web, UI/UX, Programación" },
        description: {
            en: "Design project for Vista Global.",
            es: "Proyecto de diseño para Vista Global."
        }
    }
};

export function getProjects(language: 'en' | 'es') {
    return projects.map(p => {
        const trans = projectTranslations[p.slug];
        if (trans) {
            return {
                ...p,
                title: trans.title[language] || p.title,
                category: trans.category[language] || p.category,
                description: trans.description[language] || p.description
            };
        }
        return p;
    });
}
