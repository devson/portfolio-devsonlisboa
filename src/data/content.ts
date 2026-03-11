export const siteData = {
  about: {
    name: "Arquiteto Devson Lisboa",
    subtitle: "Arquiteto, Artista Visual, IA para Arquitetura",
    description: "Devson Lisboa é um arquiteto multidisciplinar cuja prática se situa na intersecção entre arquitetura de alto padrão, artes visuais e as mais avançadas estratégias de inteligência artificial. Com o objetivo de não apenas projetar espaços físicos, mas narrativas espaciais e atmosferas memoráveis, seu trabalho traduz rigor técnico e sensibilidade artística em experiências que convertem visão em valor palpável."
  },
  services: [
    {
      id: "arquitetura",
      title: "Projeto Arquitetônico",
      description: "Desenvolvimento completo de projetos arquitetônicos autorais, da concepção à especificação, sempre com rigor técnico e sensibilidade espacial."
    },
    {
      id: "interiores",
      title: "Interiores Corporativos e Comerciais",
      description: "Design de espaços que traduzem a identidade da marca, otimizam o fluxo e criam atmosferas engajadoras para clientes e colaboradores."
    },
    {
      id: "archviz",
      title: "Visualização Arquitetônica Premium",
      description: "Produção de imagens e animações de nível museológico, com forte senso de luz, materialidade e composição editorial."
    },
    {
      id: "ia-estrategia",
      title: "Estratégia Criativa com IA",
      description: "Integração de fluxos avançados de Inteligência Artificial para explorar volumetrias, iterar conceitos rapidamente e elevar a qualidade da entrega visual."
    },
    {
      id: "storytelling",
      title: "Storytelling Visual para Arquitetura",
      description: "Construção da narrativa visual de empreendimentos, conectando projeto arquitetônico e desejo comercial através da direção de arte impecável."
    },
    {
      id: "consultoria",
      title: "Consultoria Criativa",
      description: "Mentoria e direcionamento estético para escritórios e incorporadoras que buscam reposicionar sua linguagem visual no mercado de alto padrão."
    }
  ],
  process: [
    { title: "Conceito", description: "Imersão na essência do projeto." },
    { title: "Estratégia", description: "Definição do caminho visual e narrativo." },
    { title: "Projeto", description: "Desenvolvimento técnico e estético rigoroso." },
    { title: "Visualização", description: "Tradução da arquitetura em imagens icônicas." },
    { title: "Entrega", description: "Apresentação de alto impacto para o cliente." }
  ],
  projects: [
    {
      id: "residencia-minimal",
      title: "Residência Minimal S",
      category: "Arquitetura",
      slug: "residencia-minimal-s",
      thumbnail: "/placeholders/proj-1.jpg", 
      shortDescription: "Um estudo de proporções e luz natural encravado na encosta.",
      challenge: "Criar uma residência que desaparecesse na paisagem, mantendo forte presença brutalista de dentro para fora.",
      concept: "Subtração e materialidade. O projeto se baseia em blocos de concreto exposto que contrastam com painéis de madeira carbonizada, criando uma transição muda com a natureza ao redor.",
      materials: "Concreto aparente, Madeira Shou Sugi Ban, Vidro de alta performance e Aço Corten.",
      gallery: [
        "/placeholders/proj-1-g1.jpg",
        "/placeholders/proj-1-g2.jpg",
        "/placeholders/proj-1-g3.jpg"
      ]
    },
    {
      id: "corporate-hq-nexus",
      title: "Corporate HQ Nexus",
      category: "Interiores",
      slug: "corporate-hq-nexus",
      thumbnail: "/placeholders/proj-2.jpg",
      shortDescription: "Sede corporativa projetada para fomentar a criatividade fluida.",
      challenge: "Transformar 2.000m² de laje tradicional em uma paisagem de trabalho que não parecesse um escritório.",
      concept: "Criar 'bairros corporativos'. Utilizamos elementos cálidos e divisórias translúcidas que respeitam a intimidade acústica sem bloquear a luz abundante de leste a oeste.",
      materials: "Mármore Travertino, Nogueira Americana, Vidro Canelado e Painéis Acústicos Premium.",
      gallery: [
        "/placeholders/proj-2-g1.jpg",
        "/placeholders/proj-2-g2.jpg"
      ]
    },
    {
      id: "torre-aurea",
      title: "Torre Áurea",
      category: "Archviz",
      slug: "torre-aurea",
      thumbnail: "/placeholders/proj-3.jpg",
      shortDescription: "Série de estudos visuais para lançamento de alto padrão.",
      challenge: "Traduzir a monumentalidade da fachada metálica desenvolvida pelo estúdio de arquitetura parceiro, em imagens que encantassem investidores antes das fundações.",
      concept: "Foco na 'Hora Azul' e 'Luz Dourada'. Capturamos a materialidade do edifício refletindo a vibração urbana, com composições que priorizam o vazio e o céu.",
      materials: "Visualização hiper-realista produzida em Unreal Engine e refinada com fluxos de IA generativa.",
      gallery: [
        "/placeholders/proj-3-g1.jpg",
        "/placeholders/proj-3-g2.jpg"
      ]
    },
    {
      id: "pavilhão-da-agua",
      title: "Pavilhão D'água",
      category: "Arquitetura",
      slug: "pavilhao-agua",
      thumbnail: "/placeholders/proj-4.jpg",
      shortDescription: "Estrutura efêmera para exibição de arte contemporânea.",
      challenge: "Desenhar um pavilhão temporário, desmontável e visualmente intrigante.",
      concept: "Superfícies reflexivas. Todo o exterior espelha o espelho d'água existente na praça, fazendo a arquitetura quase flutuar.",
      materials: "Estrutura metálica leve, painéis reflexivos de alumínio composto, piso de pedra basalto.",
      gallery: [
        "/placeholders/proj-4-g1.jpg"
      ]
    },
    {
      id: "ia-volumetria",
      title: "Gen AI: Estudos de Volumetria",
      category: "Fluxos com IA",
      slug: "gen-ai-estudos",
      thumbnail: "/placeholders/proj-5.jpg",
      shortDescription: "Experimentações ágeis de forma e material através de redes neurais.",
      challenge: "Acelerar a etapa inicial (Estudo Preliminar) mantendo alto padrão estético.",
      concept: "Criação de prompts parametrizados combinados com ControlNet para guiar as IAs estruturalmente. O resultado são imagens inspiracionais prontas em horas em vez de semanas.",
      materials: "Fluxos com Midjourney, Stable Diffusion e Nano Banana Pro.",
      gallery: [
        "/placeholders/proj-5-g1.jpg",
        "/placeholders/proj-5-g2.jpg"
      ]
    },
    {
      id: "museu-do-amanha-viz",
      title: "Visual Narrative: The Void",
      category: "Storytelling Visual",
      slug: "visual-narrative-void",
      thumbnail: "/placeholders/proj-6.jpg",
      shortDescription: "Ensaios fotográficos virtuais em arquiteturas impossíveis.",
      challenge: "Explorar as emoções do 'espaço vazio' onde a arquitetura é puramente luz e sombra.",
      concept: "Linguagem editorial absoluta. Alto contraste, granulação intencional, enquadramentos quase abstratos que sugerem mais do que revelam.",
      materials: "Renderização PBR, Pós-produção Cinematográfica.",
      gallery: [
        "/placeholders/proj-6-g1.jpg"
      ]
    }
  ]
}
