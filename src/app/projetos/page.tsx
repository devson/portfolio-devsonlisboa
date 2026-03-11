import { Reveal } from "@/components/ui/Reveal";
import { Display, Heading, BodyText, Label } from "@/components/ui/Typography";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { siteData } from "@/data/content";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Projetos | ${siteData.about.name}`,
  description: "Portfólio de obras selecionadas em arquitetura, interiores e design.",
};

export default function ProjetosPage() {
  const projects = siteData.projects;

  return (
    <div className="flex flex-col w-full pb-32">
      {/* Header Spacer */}
      <div className="pt-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <Reveal>
          <Display className="mb-4">Portfólio</Display>
        </Reveal>
        <Reveal delay={0.2}>
          <Heading as="h2" className="max-w-3xl text-foreground/70 mb-24">
            Obras e Ensaios visuais selecionados.
          </Heading>
        </Reveal>
      </div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
          {projects.map((project, index) => {
            return (
              <Reveal 
                key={project.id} 
                className="group"
                delay={(index % 2) * 0.1}
              >
                <Link href={`/projetos/${project.slug}`} className="block w-full">
                  <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden bg-warm-gray">
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

                  <div className="flex flex-col gap-2">
                    <Label className="mb-2 block">{project.category}</Label>
                    <h3 className="font-serif text-3xl font-medium tracking-editorial">{project.title}</h3>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
