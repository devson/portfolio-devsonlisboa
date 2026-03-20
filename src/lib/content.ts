import { prisma } from "@/lib/prisma";
import { siteData } from "@/data/content";

export async function getSiteContent(): Promise<Record<string, string>> {
  try {
    const items = await (prisma as any).siteContent.findMany();
    const content: Record<string, string> = {};
    items.forEach((item: any) => { content[item.key] = item.value; });
    return content;
  } catch {
    // Fallback to static data if SiteContent table doesn't exist yet
    return {
      hero_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
      hero_subtitle: siteData.about.subtitle,
      hero_title: "Narrativas espaciais, rigor estético.",
      hero_description: "Projetos que traduzem a ambição da sua marca corporativa ou do seu empreendimento em arquitetura de alto valor percebido.",
      hero_cta_primary_text: "Ver Portfólio",
      hero_cta_secondary_text: "Iniciar Conversa",
      about_image: "/images/profile.png",
      about_label: "Visão",
      about_quote: "Arquitetura não é sobre preencher espaços. É sobre narrar o vazio.",
      about_description: siteData.about.description,
      about_cta_text: "Conhecer a Metodologia",
      
      // Page Sobre Defaults
      sobre_hero_title: "Arquiteto e artista visual com mais de 20 anos transformando visão em espaço.",
      sobre_hero_description: "Base sólida em BIM, interiores corporativos e as mais avançadas estratégias de inteligência artificial aplicada à arquitetura.",
      sobre_portrait_image: "/images/profile.png",
      sobre_manifesto_title: "Transformar briefing em conceito legível, narrativa espacial e espaços funcionais.",
      sobre_bio_1: "Arquiteto e artista visual com mais de 20 anos de experiência, com base sólida em BIM (Revit) e interiores corporativos. Uma consistência técnica, documentação bem organizada e direção de arte para transformar briefing em conceito legível, narrativa espacial e espaços funcionais que traduzem a cultura do cliente.",
      sobre_bio_2: "Uso IA e render em tempo real para explorar alternativas, materialidade e atmosfera com velocidade e controle, reduzindo retrabalho e acelerando aprovações sem abrir mão do rigor técnico.",
      sobre_bio_3: "Minha formação na interseção entre as artes visuais clássicas e o design algorítmico permite uma abordagem onde a Inteligência Artificial não substitui o traço humano, mas o amplia exponencialmente.",
      sobre_stats: JSON.stringify([
        { number: 20, suffix: "+", label: "Anos de atuação em arquitetura e artes visuais" },
        { number: 14, suffix: "+", label: "Clientes corporativos e institucionais atendidos" },
        { number: 3, suffix: "", label: "Formações: Belas Artes, Arquitetura, Pós-graduação Digital" },
      ]),
      sobre_timeline: JSON.stringify([
        { period: "2023 — 2025", role: "Arquiteto", company: "IT'S INFORMOV", location: "São Paulo, SP", highlights: ["Conceito e desenvolvimento para ambientes corporativos", "BIM Revit para modelar e documentar", "Integração de workflow BIM + IA"] },
        { period: "2002 — 2022", role: "Arquiteto", company: "UNASP-SP", location: "São Paulo, SP", highlights: ["Desenvolvimento de linguagem arquitetônica", "Visualização 2D e 3D", "Implantação do tombamento público"] },
      ]),
      sobre_education: JSON.stringify([
        { title: "Arquitetura e Projeto na Era Digital", school: "unyleyaI", year: "2023", type: "Especialização" },
        { title: "Arquitetura e Urbanismo", school: "UNASP-SP", year: "2018 — 2022", type: "Graduação" },
      ]),
      sobre_tools: JSON.stringify([
        { name: "Revit", category: "BIM" }, { name: "D5 Render", category: "Render" }, { name: "Rhino", category: "3D" }, { name: "IA Studio", category: "IA" }
      ]),

      services_label: "Competências",
      services_title: "Unindo design de precisão, ferramentas generativas e percepção estética comercial.",
      cta_title: "Pronto para dar materialidade à sua visão?",
      cta_button_text: "Iniciar um Projeto",
    };
  }
}
