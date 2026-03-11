import { Reveal } from "@/components/ui/Reveal";
import { Display, Heading, BodyText, Label } from "@/components/ui/Typography";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { siteData } from "@/data/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sobre | ${siteData.about.name}`,
  description: siteData.about.description,
};

export default function SobrePage() {
  return (
    <div className="flex flex-col w-full pb-32">
      {/* Header Spacer */}
      <div className="pt-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <Reveal>
          <Display className="mb-8">Visão & Metodologia</Display>
        </Reveal>
      </div>

      {/* Main Profile Image */}
      <Reveal delay={0.2} className="w-full px-6 md:px-12 max-w-7xl mx-auto mb-24">
        <div className="relative aspect-[21/9] w-full bg-warm-gray overflow-hidden">
          <PremiumImage
            src="/placeholders/office.jpg"
            alt="Studio Devson Lisboa"
            fill
            className="grayscale contrast-125 object-cover"
            priority
          />
        </div>
      </Reveal>

      {/* Biography */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
        <div className="md:col-span-4 lg:col-span-3">
          <Reveal delay={0.1}>
            <Label className="block mb-4">O Arquiteto</Label>
            <h2 className="font-serif text-3xl font-medium tracking-editorial">{siteData.about.name}</h2>
            <p className="font-sans text-sm text-foreground/60 mt-2">{siteData.about.subtitle}</p>
          </Reveal>
        </div>
        <div className="md:col-span-8 lg:col-span-7 lg:col-start-5">
          <Reveal delay={0.2}>
            <Heading as="h3" className="mb-8 leading-snug">
              A arquitetura é a materialização do desejo corporativo através da precisão técnica.
            </Heading>
            <div className="flex flex-col gap-6 text-foreground/80 font-sans leading-relaxed text-lg">
              <p>
                {siteData.about.description}
              </p>
              <p>
                Minha formação na interseção entre as artes visuais clássicas e o design algorítmico permite uma abordagem onde a Inteligência Artificial não substitui o traço humano, mas o amplia exponencialmente.
              </p>
              <p>
                Acreditamos que todo grande empreendimento nasce de uma narrativa espacial poderosa. Nosso trabalho é construir essa narrativa visualmente antes mesmo da primeira escavação, garantindo atração, desejo e conversão para nossos parceiros e clientes.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process Methodology */}
      <section className="px-6 md:px-12 py-32 bg-off-white text-black-obsidian">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-20">
            <Label className="block mb-4">Metodologia</Label>
            <Display as="h2">Como trabalhamos</Display>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {siteData.process.map((step, index) => (
              <Reveal 
                key={step.title} 
                delay={index * 0.15}
                className="border-t border-black-obsidian/10 pt-6"
              >
                <span className="font-sans text-xs uppercase tracking-widest text-black-obsidian/40 block mb-4">
                  0{index + 1}
                </span>
                <h3 className="font-serif text-2xl font-medium tracking-editorial mb-4">{step.title}</h3>
                <BodyText className="text-black-obsidian/70 text-sm">
                  {step.description}
                </BodyText>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
