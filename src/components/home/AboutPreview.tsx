import { Reveal } from "@/components/ui/Reveal";
import { Heading, BodyText, Label } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { PremiumImage } from "@/components/ui/PremiumImage";

interface AboutPreviewProps {
  content: Record<string, string>;
}

export function AboutPreview({ content }: AboutPreviewProps) {
  return (
    <section className="py-24 px-6 md:px-12 bg-black-obsidian text-off-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <Reveal className="relative aspect-[3/4] w-full max-w-md mx-auto md:ml-0 overflow-hidden">
            <PremiumImage
              src={content.about_image || "/images/profile.png"}
              alt="Arquiteto Devson Lisboa"
              fill
              className="grayscale contrast-125 object-cover"
            />
            <div className="absolute inset-0 border border-off-white/10 m-4" />
          </Reveal>
        </div>

        <div className="w-full md:w-1/2 order-1 md:order-2">
          <Reveal>
            <Label className="mb-6 block text-off-white/40">
              {content.about_label || "Visão"}
            </Label>
            <Heading className="mb-8 leading-snug">
              {content.about_quote || "Arquitetura não é sobre preencher espaços. É sobre narrar o vazio."}
            </Heading>
          </Reveal>
          
          <Reveal delay={0.2}>
            <BodyText className="text-off-white/70 mb-12">
              {content.about_description || ""}
            </BodyText>
          </Reveal>

          <Reveal delay={0.3}>
             <Button href="/sobre" variant="outline" className="border-off-white/30 text-off-white hover:border-off-white/100">
               {content.about_cta_text || "Conhecer a Metodologia"}
             </Button>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
