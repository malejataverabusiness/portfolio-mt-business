import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projectsData";
import ProjectPage from "@/components/ProjectPage";

export async function generateStaticParams() {
    const slugs = getAllProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
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
