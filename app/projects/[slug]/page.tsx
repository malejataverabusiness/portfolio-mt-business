import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projectsData";
import ProjectPage from "@/components/ProjectPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado | Maria Tavera",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mtblabs.co";
  const projectUrl = `${siteUrl}/projects/${project.slug}`;
  const firstImage = project.images && project.images.length > 0 ? project.images[0].src : "";

  return {
    title: `${project.title} — Maria Tavera`,
    description: `${project.subtitle || project.description.slice(0, 150)}... Caso de estudio de diseño UI/UX y desarrollo frontend por Maria Tavera.`,
    keywords: [
      project.title,
      "Caso de estudio UI UX",
      "Desarrollo Frontend",
      "Maria Tavera",
      "María Tavera",
      ...(project.technologies || []),
    ],
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      type: "article",
      url: projectUrl,
      title: `${project.title} | Maria Tavera`,
      description: project.subtitle || project.description,
      siteName: "Maria Tavera Portfolio",
      images: firstImage ? [{ url: firstImage, alt: project.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Maria Tavera`,
      description: project.subtitle || project.description,
      images: firstImage ? [firstImage] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <ProjectPage
      title={project.title}
      subtitle={project.subtitle}
      description={project.description}
      role={project.role}
      technologies={project.technologies}
      liveUrl={project.liveUrl}
      backHref="/"
      backLabel="Volver al Portafolio"
      accentColor={project.accentColor}
      heroGradient={project.heroGradient}
      images={project.images}
      metrics={project.metrics}
      features={project.features}
    />
  );
}
