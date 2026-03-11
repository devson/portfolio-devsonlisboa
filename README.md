# Arquiteto Devson Lisboa - Portfólio Premium

Este é o repositório do site de portfólio para Devson Lisboa, focado em alta performance, estética arquitetônica premium e ritmo editorial.

## 🚀 Tecnologias Integradas
- **Next.js 14+** (App Router)
- **React 18**
- **TypeScript** para segurança de tipagem
- **Tailwind CSS v4** para estilização utilitária
- **Framer Motion** para animações baseadas no perfil "Crisp Editorial"
- **Lucide React** para ícones minimalistas

## 📂 Estrutura do Projeto

O site foi estruturado para ser limpo e fácil de atualizar, mesmo sem um CMS complexo. Toda a base de dados do site está em um único arquivo de configuração.

- `src/app/`: Contém todas as páginas e rotas do site (`/`, `/sobre`, `/servicos`, `/projetos`, `/contato`).
- `src/components/layout/`: Elementos estáticos e onipresentes (`Header` e `Footer`).
- `src/components/ui/`: Elementos reutilizáveis como `Button`, `PremiumImage`, `Typography` e as animações de `Reveal`.
- `src/data/content.ts`: **O coração do conteúdo**. Edite este arquivo para adicionar novos projetos, alterar os textos do "Sobre", modificar os serviços ou adicionar links sociais.

## 🖼️ Trocando as Imagens

As imagens atuais estão apontadas para `/placeholders/...`.
Para inserir suas imagens reais do portfólio:

1. Coloque seus arquivos reais (idealmente em `.jpg`, `.webp` ou `.avif`) na pasta `public/placeholders/`.
2. As imagens devem estar otimizadas. Se tiverem mais de 3MB, reduza-as antes, principalmente a da Hero section.
3. Vá no arquivo `src/data/content.ts` e atualize os caminhos (ex: `thumbnail: "/placeholders/minha-imagem-real.jpg"`).

> **Dica de Design**: As proporções sugeridas no grid editorial funcionam melhor com imagens landscape `16:9` e portraits verticais `3:4` ou `4:5`.

## 🛠️ Como rodar o projeto localmente

1. Abra o terminal nesta pasta (`D:\APP\sites`).
2. Instale as dependências (caso não tenha feito):
```bash
npm install
```
3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 🚢 Como fazer o deploy para a internet
Por ser construído em Next.js, a infraestrutura mais recomendada (e com melhor performance/SEO global) é a plataforma da **Vercel**.

1. Crie uma conta no GitHub.
2. Suba essa pasta para um repositório seu no GitHub.
3. Crie uma conta na Vercel (vercel.com) e conecte com seu GitHub.
4. Importe o repositório. O processo é totalmente automático (ele detecta Next.js sozinho e compila o site).
5. Defina o seu domínio de preferência (ex: devsonlisboa.com) no painel da Vercel.

## ✒️ Filosofia de Design Implementada
- **Typography:** Inter (textos bases) e Playfair Display (fontes serifadas robustas para títulos) criando o impacto de uma revista de arquitetura digital.
- **Grids e Respiro:** Utilização de margens assimétricas para as seções de projeto, fugindo dos grids massantes.
- **Motion System:** Utilizamos animações *fast easing* (Cubic-bezier Crisp) para garantir que o movimento sirva para guiar o olhar, e não parecer atrasado ou pesado. Foi evitado a qualquer custo a aparência lúdica ou "app starter", mantendo foco na atmosfera da arquitetura.
