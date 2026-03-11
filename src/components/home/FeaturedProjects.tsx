import { Reveal } from "@/components/ui/Reveal";
import { Heading, BodyText, Label } from "@/components/ui/Typography";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { siteData } from "@/data/content";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function FeaturedProjects() {
  const featured = siteData.projects.slice(0, 4);

  return (
    <section className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <Reveal>
            <Label className="mb-4 block">Portfólio</Label>
            <Heading>Obras Selecionadas</Heading>
          </Reveal>
          <Reveal delay={0.2}>
            <Link 
              href="/projetos"
              className="group inline-flex items-center gap-2 font-sans text-sm uppercase tracking-wide-editorial border-b border-foreground/20 pb-1 hover:border-foreground transition-colors"
            >
              Ver todos os projetos
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-8">
          {featured.map((project, index) => {
            // Logic to create an asymmetrical editorial layout
            const colSpan = index === 0 ? "md:col-span-12" : index === 3 ? "md:col-span-8 md:col-start-3" : "md:col-span-6";
            const ratio = index === 0 ? "aspect-[21/9]" : index === 3 ? "aspect-[16/9]" : "aspect-[3/4]";
            const isLarge = index === 0;

            return (
              <Reveal 
                key={project.id} 
                className={`${colSpan} group`}
                delay={index * 0.1}
              >
                <Link href={`/projetos/${project.slug}`} className="block w-full">
                  <div className={`relative w-full ${ratio} mb-6 overflow-hidden bg-warm-gray`}>
                    <PremiumImage
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="group-hover:scale-[1.03] transition-transform duration-700 ease-crisp"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black-obsidian/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="bg-background text-foreground uppercase tracking-widest text-[10px] font-medium py-3 px-6 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-crisp">
                        Explorar
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <Label className="mb-2 block">{project.category}</Label>
                      {isLarge ? (
                        <Heading as="h3">{project.title}</Heading>
                      ) : (
                        <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-editorial">{project.title}</h3>
                      )}
                    </div>
                    {isLarge && (
                      <BodyText className="md:max-w-md text-right">
                        {project.shortDescription}
                      </BodyText>
                    )}
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
