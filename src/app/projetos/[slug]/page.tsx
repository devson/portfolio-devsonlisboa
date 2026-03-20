import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Display, Heading, BodyText, Label } from "@/components/ui/Typography";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import { siteData } from "@/data/content";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  // Try database first
  try {
    const project = await prisma.project.findUnique({ where: { slug } });
    if (project) {
      return {
        ...project,
        gallery: (() => { try { return JSON.parse(project.images || "[]"); } catch { return []; } })(),
        shortDescription: project.challenge?.substring(0, 120) + "..." || "",
      };
    }
  } catch {}

  // Fallback to static data
  return siteData.projects.find((p) => p.slug === slug) || null;
}

async function getNextProject(currentSlug: string) {
  try {
    const all = await prisma.project.findMany({ orderBy: { createdAt: "desc" }, select: { slug: true, title: true } });
    if (all.length > 0) {
      const idx = all.findIndex((p) => p.slug === currentSlug);
      return all[idx + 1] || all[0];
    }
  } catch {}
  const staticIdx = siteData.projects.findIndex((p) => p.slug === currentSlug);
  return siteData.projects[staticIdx + 1] || siteData.projects[0];
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Projeto não encontrado" };

  return {
    title: `${project.title} | Devson Lisboa Arquiteto`,
    description: project.shortDescription || project.challenge || "",
    openGraph: {
      title: `${project.title} | Devson Lisboa Arquiteto`,
      description: project.shortDescription || project.challenge || "",
      images: [{ url: project.thumbnail, width: 1200, height: 630 }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const nextProject = await getNextProject(slug);
  const gallery = "gallery" in project ? project.gallery : (project as any).images ? (() => { try { return JSON.parse((project as any).images); } catch { return []; } })() : [];

  return (
    <div className="flex flex-col w-full bg-background">
      
      {/* Project Hero */}
      <section className="relative min-h-[85vh] flex flex-col justify-end pb-24 px-6 md:px-12 -mt-24 md:-mt-32">
        <div className="absolute inset-0 z-0">
          <PremiumImage src={project.thumbnail} alt={project.title} fill priority />
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
                {"year" in project && project.year && (
                  <div>
                    <Label className="block mb-2 text-foreground/50">Ano</Label>
                    <span className="font-sans font-medium">{project.year}</span>
                  </div>
                )}
                {"location" in project && project.location && (
                  <div>
                    <Label className="block mb-2 text-foreground/50">Localização</Label>
                    <span className="font-sans font-medium">{project.location}</span>
                  </div>
                )}
                <div>
                  <Label className="block mb-2 text-foreground/50">Materiais</Label>
                  <span className="font-sans text-sm text-foreground/80">{project.materials}</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-8 lg:col-span-8 lg:col-start-5 flex flex-col gap-20">
            {"shortDescription" in project && project.shortDescription && (
              <Reveal delay={0.2}>
                <Heading as="h2" className="mb-8">Visão Geral</Heading>
                <BodyText className="text-lg leading-relaxed">{project.shortDescription}</BodyText>
              </Reveal>
            )}
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
        {gallery.map((image: string, idx: number) => {
          const isWide = idx % 3 === 0;
          return (
            <Reveal key={idx} delay={0.1} className={`relative w-full overflow-hidden bg-warm-gray ${isWide ? "h-[60vh] md:h-[85vh]" : "h-[50vh] md:h-[70vh] max-w-6xl mx-auto"}`}>
              <PremiumImage src={image} alt={`Galeria ${project.title} - ${idx + 1}`} fill />
            </Reveal>
          );
        })}
      </section>

      {/* Next Project */}
      <section className="py-32 px-6 md:px-12 bg-black-obsidian text-off-white text-center flex flex-col items-center justify-center">
        <Reveal>
          <Label className="block mb-8 text-off-white/50">Próximo Projeto</Label>
          <a href={`/projetos/${nextProject.slug}`} className="group block mb-12">
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-editorial transition-opacity group-hover:opacity-70 text-balance px-4">
              {nextProject.title}
            </h2>
          </a>
          <Button href={`/projetos/${nextProject.slug}`} variant="outline" className="border-off-white/30 text-off-white hover:border-off-white/100" icon>
            Explorar Obra
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
