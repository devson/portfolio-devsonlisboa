import { Reveal } from "@/components/ui/Reveal";
import { Display, Heading, BodyText, Label } from "@/components/ui/Typography";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { Counter } from "@/components/ui/Counter";
import { Marquee } from "@/components/ui/Marquee";
import { siteData } from "@/data/content";
import { getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre | Dêvson Lisboa Arquiteto",
  description: "Arquiteto e artista visual com mais de 20 anos de experiência em BIM, interiores corporativos e IA aplicada à arquitetura.",
};

export default async function SobrePage() {
  const content = await getSiteContent();

  const parseArray = (key: string, defaultValue: any) => {
    try {
      return content[key] ? JSON.parse(content[key]) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const timeline = parseArray("sobre_timeline", [
    { period: "2023 — 2025", role: "Arquiteto", company: "IT'S INFORMOV", location: "São Paulo, SP", highlights: ["Conceito e desenvolvimento para ambientes corporativos", "BIM Revit para modelar e documentar", "Integração de workflow BIM + IA"] },
    { period: "2002 — 2022", role: "Arquiteto", company: "UNASP-SP", location: "São Paulo, SP", highlights: ["Desenvolvimento de linguagem arquitetônica", "Visualização 2D e 3D", "Implantação do tombamento público"] },
  ]);

  const tools = parseArray("sobre_tools", [
    { name: "Revit", category: "BIM" },
    { name: "D5 Render", category: "Render" },
    { name: "Rhino", category: "3D" },
    { name: "Unreal Engine", category: "Render" },
    { name: "SketchUp", category: "3D" },
    { name: "3D Max", category: "3D" },
    { name: "Corona", category: "Render" },
    { name: "V-Ray", category: "Render" },
    { name: "AutoCAD", category: "BIM" },
    { name: "Adobe PS", category: "Pós" },
    { name: "Premiere", category: "Vídeo" },
    { name: "After Effects", category: "Vídeo" },
    { name: "Google AI Studio", category: "IA" },
    { name: "Higgsfield", category: "IA" },
    { name: "Sora", category: "IA" },
    { name: "Freepik", category: "Assets" },
  ]);

  const education = parseArray("sobre_education", [
    { title: "Arquitetura e Projeto na Era Digital", school: "unyleyaI", year: "2023", type: "Especialização" },
    { title: "Arquitetura e Urbanismo", school: "UNASP-SP", year: "2018 — 2022", type: "Graduação" },
    { title: "Artista Plástico — Belas Artes", school: "UFBA", year: "1996 — 2001", type: "Graduação" },
  ]);

  const stats = parseArray("sobre_stats", [
    { number: 20, suffix: "+", label: "Anos de atuação em arquitetura e artes visuais" },
    { number: 14, suffix: "+", label: "Clientes corporativos e institucionais atendidos" },
    { number: 3, suffix: "", label: "Formações: Belas Artes, Arquitetura, Pós-graduação Digital" },
  ]);

  const process = parseArray("sobre_process", siteData.process);

  return (
    <div className="flex flex-col w-full pb-0">

      {/* Hero Statement */}
      <section className="pt-12 pb-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <Reveal>
          <Label className="mb-8 block">Sobre</Label>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-7">
            <Reveal delay={0.2}>
              <Display className="mb-8 leading-[1.1]">
                {content.sobre_hero_title || "Arquiteto e artista visual com mais de 20 anos transformando visão em espaço."}
              </Display>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex items-end">
            <Reveal delay={0.4}>
              <BodyText className="text-foreground/70 text-lg">
                {content.sobre_hero_description || "Base sólida em BIM, interiores corporativos e as mais avançadas estratégias de inteligência artificial aplicada à arquitetura."}
              </BodyText>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Portrait + Stats */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto w-full mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

          {/* Portrait */}
          <Reveal delay={0.1} className="md:col-span-5">
            <div className="relative aspect-[3/4] w-full bg-warm-gray overflow-hidden">
              <PremiumImage
                src={content.sobre_portrait_image || "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop"}
                alt="Dêvson Lisboa — Arquiteto"
                fill
                className="grayscale contrast-110 object-cover"
                priority
              />
              <div className="absolute inset-0 border border-foreground/5 m-4" />
            </div>
          </Reveal>

          {/* Stats Grid */}
          <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center gap-0">
            {stats.map((stat: any, i: number) => (
              <Reveal key={i} delay={0.2 + i * 0.15}>
                <div className="py-8 border-b border-foreground/10 flex items-start gap-8">
                  <span className="font-serif text-6xl md:text-7xl font-medium tracking-editorial text-foreground/90 shrink-0 w-28 text-right">
                    <Counter end={stat.number} suffix={stat.suffix} />
                  </span>
                  <p className="font-sans text-sm text-foreground/60 leading-relaxed pt-4">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Biography block */}
      <section className="px-6 md:px-12 py-32 bg-black-obsidian text-off-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <Label className="block mb-6 text-off-white/40">Manifesto</Label>
              <Heading className="leading-snug text-off-white/90">
                {content.sobre_manifesto_title || "Transformar briefing em conceito legível, narrativa espacial e espaços funcionais."}
              </Heading>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6 flex flex-col gap-8 font-sans text-lg text-off-white/70 leading-relaxed">
            {content.sobre_bio_1 && (
              <Reveal delay={0.15}>
                <p>{content.sobre_bio_1}</p>
              </Reveal>
            )}
            {content.sobre_bio_2 && (
              <Reveal delay={0.25}>
                <p>{content.sobre_bio_2}</p>
              </Reveal>
            )}
            {content.sobre_bio_3 && (
              <Reveal delay={0.35}>
                <p>{content.sobre_bio_3}</p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee text="Experiência" speed={35} className="bg-off-white py-4" />

      {/* Career Timeline */}
      <section className="px-6 md:px-12 py-32 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-20">
            <Label className="block mb-4">Trajetória</Label>
            <Display as="h2">Experiência Profissional</Display>
          </Reveal>

          <div className="flex flex-col">
            {timeline.map((job: any, i: number) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-12 border-t border-black-obsidian/10 group">
                  {/* Period */}
                  <div className="md:col-span-3">
                    <span className="font-mono text-sm text-foreground/40">{job.period}</span>
                  </div>
                  {/* Role & Company */}
                  <div className="md:col-span-3">
                    <h3 className="font-serif text-2xl font-medium tracking-editorial">{job.role}</h3>
                    <p className="font-sans text-sm text-accent-bronze mt-1">{job.company}</p>
                    {job.location && <p className="font-sans text-xs text-foreground/40 mt-1">{job.location}</p>}
                  </div>
                  {/* Highlights */}
                  <div className="md:col-span-6">
                    <ul className="flex flex-col gap-3">
                      {job.highlights && Array.isArray(job.highlights) && job.highlights.map((h: string, j: number) => (
                        <li key={j} className="font-sans text-sm text-foreground/70 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-[1px] before:bg-foreground/30">
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="px-6 md:px-12 py-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <Label className="block mb-4">Formação</Label>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {education.map((edu: any, i: number) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="border-t border-foreground/10 pt-6">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-foreground/40 block mb-3">{edu.type}</span>
                  <h3 className="font-serif text-xl font-medium tracking-editorial mb-2">{edu.title}</h3>
                  <p className="font-sans text-sm text-foreground/50">{edu.school} · {edu.year}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Stack */}
      <section className="px-6 md:px-12 py-24 bg-warm-gray">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <Label className="block mb-4">Stack Técnica</Label>
            <Heading>Ferramentas & Tecnologias</Heading>
          </Reveal>

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 md:gap-12 items-center">
            {tools.map((tool: any, i: number) => {
              const iconSlugs: Record<string, string> = {
                "Revit": "autodeskrevit",
                "Rhino": "rhinoceros",
                "Unreal Engine": "unrealengine",
                "SketchUp": "sketchup",
                "3D Max": "autodesk", 
                "AutoCAD": "autocad",
                "Google AI Studio": "google",
                "Freepik": "freepik"
              };

              const customLogos: Record<string, string> = {
                "D5 Render": "/images/icones/d5.png",
                "Corona": "/images/icones/corona.svg",
                "Higgsfield": "/images/icones/Higgsfield.png",
                "V-Ray": "/images/icones/v-ray.png",
                "Adobe PS": "/images/icones/ps.png",
                "Premiere": "/images/icones/pr.png",
                "After Effects": "/images/icones/ae.png",
                "Sora": "/images/icones/sora.png"
              };
              
              const slug = iconSlugs[tool.name];
              const logoUrl = slug ? `https://cdn.simpleicons.org/${slug}/000000` : (customLogos[tool.name] || tool.logo);

              return (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="group flex flex-col items-center gap-4 text-center opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <div className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center grayscale">
                      {logoUrl ? (
                        <img 
                          src={logoUrl} 
                          alt={tool.name} 
                          className="w-full h-full object-contain" 
                        />
                      ) : (
                        <div className="w-full h-full border border-foreground/20 flex items-center justify-center text-[10px] font-mono text-foreground font-medium">
                          {tool.name.substring(0,2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-sans text-[10px] font-medium tracking-widest uppercase">{tool.name}</span>
                      <span className="font-sans text-[8px] uppercase tracking-widest text-foreground/40">{tool.category}</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Client Logos Marquee */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <Reveal>
            <Label className="block mb-4">Clientes Selecionados</Label>
            <Heading>Confiança de quem transforma mercados.</Heading>
          </Reveal>
        </div>

        {/* Row 1 - left to right */}
        <div className="relative overflow-hidden py-6">
          <div className="flex animate-marquee" style={{ animationDuration: "40s", width: "max-content" }}>
            {[...Array(4)].flatMap((_, dup) =>
              [
                { name: "Stone", file: "stone.png" },
                { name: "Globo", file: "globo.png" },
                { name: "GM Financial", file: "gm-financial.png" },
                { name: "Eleva", file: "eleva.png" },
                { name: "Yeshiva", file: "yeshiva.png" },
                { name: "Hedge", file: "hedge.png" },
                { name: "Ibmec", file: "ibmec.png" },
                { name: "Iron Mountain", file: "iron-mountain.png" },
              ].map((client) => (
                <div key={`${dup}-${client.name}`} className="flex-shrink-0 px-10 md:px-16">
                  <img
                    src={`/images/${client.file}`}
                    alt={client.name}
                    className="h-7 md:h-9 w-auto object-contain opacity-[0.15] hover:opacity-40 transition-opacity duration-500 grayscale"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Row 2 - reverse */}
        <div className="relative overflow-hidden py-6">
          <div className="flex animate-marquee-reverse" style={{ animationDuration: "35s", width: "max-content" }}>
            {[...Array(4)].flatMap((_, dup) =>
              [
                { name: "Volkswagen", file: "vw.png" },
                { name: "NORR", file: "norr.png" },
                { name: "Caixa Seguridade", file: "caixa.png" },
                { name: "Be t Yaacov", file: "be-tyaacov.png" },
                { name: "UNASP", file: "unasp.png" },
                { name: "Safra", file: "safra.png" },
                { name: "Tellus", file: "tellus.png" },
                { name: "NKEY Architects", file: "nkey.png" },
              ].map((client) => (
                <div key={`${dup}-${client.name}`} className="flex-shrink-0 px-10 md:px-16">
                  <img
                    src={`/images/${client.file}`}
                    alt={client.name}
                    className="h-7 md:h-9 w-auto object-contain opacity-[0.15] hover:opacity-40 transition-opacity duration-500 grayscale"
                  />
                </div>
              ))
            )}
          </div>
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
            {process.map((step: any, index: number) => (
              <Reveal key={index} delay={index * 0.15} className="border-t border-black-obsidian/10 pt-6">
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

      {/* CTA */}
      <section className="py-32 px-6 md:px-12 bg-background text-center flex flex-col items-center justify-center min-h-[40vh]">
        <Reveal>
          <Heading className="mb-8 max-w-3xl text-balance">
            {content.cta_title || "Pronto para dar materialidade à sua visão?"}
          </Heading>
          <a href="/contato" className="inline-flex items-center justify-center gap-2 font-sans font-medium text-sm tracking-wide-editorial uppercase transition-all duration-300 ease-crisp px-8 py-5 bg-black-obsidian text-off-white hover:bg-black-obsidian/80">
            {content.cta_button_text || "Iniciar Conversa"}
          </a>
        </Reveal>
      </section>
    </div>
  );
}
