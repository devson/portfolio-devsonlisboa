import { Reveal } from "@/components/ui/Reveal";
import { Display, Heading, BodyText } from "@/components/ui/Typography";
import { siteData } from "@/data/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Serviços | ${siteData.about.name}`,
  description: "Nossas competências em arquitetura, visualização premium e fluxos de Inteligência Artificial.",
};

export default function ServicosPage() {
  return (
    <div className="flex flex-col w-full pb-32">
      {/* Header Area */}
      <div className="pt-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <Reveal>
          <Display className="mb-4">Competências</Display>
        </Reveal>
        <Reveal delay={0.2}>
          <Heading as="h2" className="max-w-3xl text-foreground/70 mb-24">
            Unindo precisão técnica em arquitetura, direção de arte impecável e fluxos generativos de última geração.
          </Heading>
        </Reveal>
      </div>

      {/* Services List */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-16 gap-y-24">
          {siteData.services.map((service, index) => (
            <Reveal 
              key={service.id} 
              delay={(index % 2) * 0.2}
              className="border-t border-foreground/10 pt-8 flex flex-col group"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-serif text-3xl font-medium tracking-editorial">
                  {service.title}
                </h3>
                <span className="font-sans text-xs uppercase tracking-widest text-foreground/40 group-hover:text-foreground transition-colors mt-2">
                  0{index + 1}
                </span>
              </div>
              <BodyText className="mb-8">
                {service.description}
              </BodyText>
              
              {/* Decorative line replacing an image */}
              <div className="w-12 h-px bg-accent-bronze/50 group-hover:w-full transition-all duration-700 ease-crisp" />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
