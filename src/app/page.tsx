import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { Marquee } from "@/components/ui/Marquee";
import { getSiteContent } from "@/lib/content";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <div className="flex flex-col w-full">
      <Hero content={content} />

      {/* Marquee divider */}
      <Marquee text="Arquitetura" speed={40} className="bg-background -mt-8" />

      <FeaturedProjects />

      <AboutPreview content={content} />

      {/* Marquee divider */}
      <Marquee text="Design" speed={35} className="bg-off-white" />

      <ServicesPreview content={content} />
      <Testimonials />
      
      {/* Contact Call to Action */}
      <section className="py-32 px-6 md:px-12 bg-black-obsidian text-off-white text-center flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-editorial mb-8 max-w-4xl text-balance">
          {content.cta_title || "Pronto para dar materialidade à sua visão?"}
        </h2>
        <a 
          href="/contato" 
          className="inline-flex items-center justify-center gap-2 font-sans font-medium text-sm tracking-wide-editorial uppercase transition-all duration-300 ease-crisp px-8 py-5 relative overflow-hidden group bg-off-white text-black-obsidian hover:bg-off-white/90"
        >
          {content.cta_button_text || "Iniciar um Projeto"}
        </a>
      </section>
    </div>
  );
}
