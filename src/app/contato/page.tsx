import { Reveal } from "@/components/ui/Reveal";
import { Display, Heading, BodyText, Label } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { siteData } from "@/data/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Contato | ${siteData.about.name}`,
  description: "Inicie uma conversa para projetos de arquitetura, archviz ou estratégia com IA.",
};

export default function ContatoPage() {
  return (
    <div className="flex flex-col w-full pb-32">
      {/* Header Spacer */}
      <div className="pt-12 px-6 md:px-12 max-w-4xl mx-auto w-full text-center">
        <Reveal>
          <Display className="mb-6">Iniciar Conversa</Display>
        </Reveal>
        <Reveal delay={0.2}>
          <Heading as="h2" className="text-foreground/70 mb-24">
            Empreendimentos memoráveis começam com o alinhamento da visão.
          </Heading>
        </Reveal>
      </div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Info */}
          <div className="flex flex-col gap-16">
            <Reveal delay={0.3}>
              <Label className="block mb-4">Email</Label>
              <a 
                href="mailto:contato@devsonlisboa.com" 
                className="font-serif text-3xl font-medium tracking-editorial border-b border-foreground/20 hover:border-foreground transition-colors pb-1 inline-block"
              >
                contato@devsonlisboa.com
              </a>
            </Reveal>

            <Reveal delay={0.4}>
              <Label className="block mb-4">Studio</Label>
              <BodyText className="text-foreground/80 max-w-xs">
                Disponível para projetos remotos globalmente e reuniões presenciais mediante agendamento.
              </BodyText>
            </Reveal>

            <Reveal delay={0.5}>
              <Label className="block mb-4">Redes</Label>
              <div className="flex flex-col gap-4">
                <a href="#" className="font-sans font-medium text-lg hover:text-accent-bronze transition-colors flex items-center justify-between group max-w-[200px]">
                  <span>Instagram</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
                <a href="#" className="font-sans font-medium text-lg hover:text-accent-bronze transition-colors flex items-center justify-between group max-w-[200px]">
                  <span>LinkedIn</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
                <a href="#" className="font-sans font-medium text-lg hover:text-accent-bronze transition-colors flex items-center justify-between group max-w-[200px]">
                  <span>Behance</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Contact Form */}
          <Reveal delay={0.4} className="bg-warm-gray p-8 md:p-12">
            <Label className="block mb-8">Novo Projeto</Label>
            <form className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-sans text-sm font-medium">Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  className="bg-transparent border-b border-foreground/20 focus:border-foreground outline-none py-2 font-serif text-lg transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-sans text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="bg-transparent border-b border-foreground/20 focus:border-foreground outline-none py-2 font-serif text-lg transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="interest" className="font-sans text-sm font-medium">Interesse principal</label>
                <select 
                  id="interest" 
                  className="bg-transparent border-b border-foreground/20 focus:border-foreground outline-none py-2 font-serif text-lg transition-colors appearance-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="arq">Projeto Arquitetônico</option>
                  <option value="interiores">Interiores Corporativos</option>
                  <option value="archviz">Visualização (Archviz)</option>
                  <option value="ia">Estratégia com IA</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 mb-8">
                <label htmlFor="message" className="font-sans text-sm font-medium">Mensagem</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="bg-transparent border-b border-foreground/20 focus:border-foreground outline-none py-2 font-serif text-lg transition-colors resize-none"
                  placeholder="Fale um pouco sobre o projeto..."
                />
              </div>

              <div className="flex flex-col">
                <Button variant="primary" className="w-full">
                  Enviar Mensagem
                </Button>
              </div>
            </form>
          </Reveal>
          
        </div>
      </div>
    </div>
  );
}
