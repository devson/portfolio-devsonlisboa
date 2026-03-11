import { Reveal } from "@/components/ui/Reveal";
import { Display, BodyText } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { siteData } from "@/data/content";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-end pb-24 px-6 md:px-12 -mt-24 md:-mt-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <PremiumImage
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop" // Architectural exterior
          alt="Projetos de Arquitetura Devson Lisboa"
          fill
          priority
        />
        {/* Subtle gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black-obsidian/90 via-black-obsidian/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12 text-off-white">
        <div className="max-w-3xl">
          <Reveal delay={0.2} direction="up">
            <span className="font-sans text-xs uppercase tracking-wide-editorial opacity-80 mb-6 block drop-shadow-sm">
              {siteData.about.subtitle}
            </span>
          </Reveal>
          
          <Reveal delay={0.4} direction="up">
            <Display as="h1" className="mb-6 drop-shadow-md">
              Narrativas espaciais,<br />
              <span className="text-off-white/80 italic">rigor estético</span>.
            </Display>
          </Reveal>

          <Reveal delay={0.6} direction="up">
            <BodyText className="text-off-white/80 max-w-xl drop-shadow-md">
              Projetos que traduzem a ambição da sua marca corporativa ou do seu empreendimento em arquitetura de alto valor percebido.
            </BodyText>
          </Reveal>
        </div>

        <Reveal delay={0.8} direction="up" className="md:w-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              href="/projetos" 
              variant="outline" 
              className="border-off-white/30 text-off-white hover:border-off-white/100 hover:bg-off-white/5 backdrop-blur-sm"
              icon
            >
              Ver Portfólio
            </Button>
            <Button 
              href="/contato" 
              className="bg-off-white text-black-obsidian hover:bg-off-white/90"
            >
              Iniciar Conversa
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
