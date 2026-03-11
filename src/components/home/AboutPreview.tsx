import { Reveal } from "@/components/ui/Reveal";
import { Heading, BodyText, Label } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { siteData } from "@/data/content";

export function AboutPreview() {
  return (
    <section className="py-24 px-6 md:px-12 bg-black-obsidian text-off-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <Reveal className="relative aspect-[3/4] w-full max-w-md mx-auto md:ml-0 overflow-hidden">
            <PremiumImage
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop"
              alt="Arquiteto Devson Lisboa"
              fill
              className="grayscale contrast-125 object-cover"
            />
            {/* Artistic overlay */}
            <div className="absolute inset-0 border border-off-white/10 m-4" />
          </Reveal>
        </div>

        <div className="w-full md:w-1/2 order-1 md:order-2">
          <Reveal>
            <Label className="mb-6 block text-off-white/40">Visão</Label>
            <Heading className="mb-8 leading-snug">
              Arquitetura não é sobre preencher espaços. É sobre narrar o vazio.
            </Heading>
          </Reveal>
          
          <Reveal delay={0.2}>
            <BodyText className="text-off-white/70 mb-12">
              {siteData.about.description}
            </BodyText>
          </Reveal>

          <Reveal delay={0.3}>
             <Button href="/sobre" variant="outline" className="border-off-white/30 text-off-white hover:border-off-white/100">
               Conhecer a Metodologia
             </Button>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
