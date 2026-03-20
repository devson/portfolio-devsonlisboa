const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

const defaultContent = [
  // Hero section
  { key: "hero_image", value: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop" },
  { key: "hero_subtitle", value: "Arquiteto, Artista Visual, IA para Arquitetura" },
  { key: "hero_title", value: "Narrativas espaciais, rigor estético." },
  { key: "hero_description", value: "Projetos que traduzem a ambição da sua marca corporativa ou do seu empreendimento em arquitetura de alto valor percebido." },
  { key: "hero_cta_primary_text", value: "Ver Portfólio" },
  { key: "hero_cta_secondary_text", value: "Iniciar Conversa" },

  // About section
  { key: "about_image", value: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop" },
  { key: "about_label", value: "Visão" },
  { key: "about_quote", value: "Arquitetura não é sobre preencher espaços. É sobre narrar o vazio." },
  { key: "about_description", value: "Devson Lisboa é um arquiteto multidisciplinar cuja prática se situa na intersecção entre arquitetura de alto padrão, artes visuais e as mais avançadas estratégias de inteligência artificial. Com o objetivo de não apenas projetar espaços físicos, mas narrativas espaciais e atmosferas memoráveis, seu trabalho traduz rigor técnico e sensibilidade artística em experiências que convertem visão em valor palpável." },
  { key: "about_cta_text", value: "Conhecer a Metodologia" },

  // Services section
  { key: "services_label", value: "Competências" },
  { key: "services_title", value: "Unindo design de precisão, ferramentas generativas e percepção estética comercial." },

  // Contact CTA section
  { key: "cta_title", value: "Pronto para dar materialidade à sua visão?" },
  { key: "cta_button_text", value: "Iniciar um Projeto" },

  // Site info
  { key: "site_name", value: "Arquiteto Devson Lisboa" },
  { key: "site_description", value: "Arquiteto, Artista Visual e Estrategista Criativo orientado por IA." },
];

async function main() {
  console.log("Seeding default homepage content...");

  for (const item of defaultContent) {
    await prisma.siteContent.upsert({
      where: { key: item.key },
      update: {}, // Don't overwrite if already exists
      create: item,
    });
  }

  console.log(`✅ ${defaultContent.length} content items seeded!`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
