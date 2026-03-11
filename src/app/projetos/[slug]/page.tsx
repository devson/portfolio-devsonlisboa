import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Display, Heading, BodyText, Label } from "@/components/ui/Typography";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { Button } from "@/components/ui/Button";
import { siteData } from "@/data/content";

interface ProjectPageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = siteData.projects.find((p) => p.slug === params.slug);
  
  if (!project) {
    return { title: "Projeto não encontrado" };
  }

  return {
    title: `${project.title} | ${siteData.about.name}`,
    description: project.shortDescription,
  };
}

// Generate static params so Next.js can build these routes at build time
export function generateStaticParams() {
  return siteData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const projectIndex = siteData.projects.findIndex((p) => p.slug === params.slug);
  const project = siteData.projects[projectIndex];

  if (!project) notFound();

  const nextProject = siteData.projects[projectIndex + 1] || siteData.projects[0];

  return (
    <div className="flex flex-col w-full bg-background">
      
      {/* Project Hero (Immersive) */}
      <section className="relative min-h-[85vh] flex flex-col justify-end pb-24 px-6 md:px-12 -mt-24 md:-mt-32">
        <div className="absolute inset-0 z-0">
          <PremiumImage
            src={project.thumbnail}
            alt={project.title}
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-obsidian/90 via-black-obsidian/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full text-off-white">
          <Reveal>
            <Label className="mb-4 block opacity-80">{project.category}</Label>
            <Display as="h1" className="mb-6">{project.title}</Display>
          </Reveal>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          <div className="md:col-span-4 lg:col-span-3">
             <Reveal delay={0.1}>
                <div className="sticky top-32 flex flex-col gap-12">
                  <div>
                    <Label className="block mb-2 text-foreground/50">Serviço</Label>
                    <span className="font-sans font-medium">{project.category}</span>
                  </div>
                  <div>
                    <Label className="block mb-2 text-foreground/50">Materiais</Label>
                    <span className="font-sans text-sm text-foreground/80">{project.materials}</span>
                  </div>
                </div>
             </Reveal>
          </div>

          <div className="md:col-span-8 lg:col-span-8 lg:col-start-5 flex flex-col gap-20">
            <Reveal delay={0.2}>
               <Heading as="h2" className="mb-8">Visão Geral</Heading>
               <BodyText className="text-lg leading-relaxed">{project.shortDescription}</BodyText>
            </Reveal>

            <Reveal delay={0.3}>
               <Heading as="h2" className="mb-8">O Desafio</Heading>
               <BodyText className="text-lg leading-relaxed">{project.challenge}</BodyText>
            </Reveal>

            <Reveal delay={0.4}>
               <Heading as="h2" className="mb-8">Conceito e Lógica</Heading>
               <BodyText className="text-lg leading-relaxed">{project.concept}</BodyText>
            </Reveal>
          </div>

        </div>
      </section>

      {/* Image Gallery */}
      <section className="pb-32 px-6 md:px-12 max-w-[100rem] mx-auto w-full flex flex-col gap-8 md:gap-16">
        {project.gallery.map((image, idx) => {
          // Alternative layout: full width vs contained
          const isWide = idx % 3 === 0;

          return (
            <Reveal 
              key={idx} 
              delay={0.1}
              className={`relative w-full overflow-hidden bg-warm-gray ${
                isWide ? "h-[60vh] md:h-[85vh]" : "h-[50vh] md:h-[70vh] max-w-6xl mx-auto"
              }`}
            >
              <PremiumImage
                src={image}
                alt={`Galeria ${project.title} - ${idx + 1}`}
                fill
              />
            </Reveal>
          );
        })}
      </section>

      {/* Next Project Footer */}
      <section className="py-32 px-6 md:px-12 bg-black-obsidian text-off-white text-center flex flex-col items-center justify-center">
        <Reveal>
          <Label className="block mb-8 text-off-white/50">Próximo Projeto</Label>
          <a href={`/projetos/${nextProject.slug}`} className="group block mb-12">
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-editorial transition-opacity group-hover:opacity-70 text-balance px-4">
              {nextProject.title}
            </h2>
          </a>
          <Button 
            href={`/projetos/${nextProject.slug}`} 
            variant="outline"
            className="border-off-white/30 text-off-white hover:border-off-white/100"
            icon
          >
            Explorar Obra
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
